import { and, eq, gte, sql } from "drizzle-orm";
import { getEnv } from "@/env";
import { getCatalog } from "@/server/content/catalog";
import { getDb } from "@/server/db/client";
import { attemptAnswers, attempts, type AnswerResponse } from "@/server/db/schema";
import { recordVerdicts } from "@/server/mistakes/service";
import { getGrader, type ShortAnswerGrader } from "./grader";

// 流程见 specs/001-interview-quiz-system/contracts/grading.md 的“评分执行器”。

const MINUTE_MS = 60 * 1000;
/** 第 n 次失败后等多久再试；超过表长后保持最后一个值 */
const BACKOFF_MINUTES = [1, 2, 5, 15, 30];
/** 领取后的保留时间。执行器中途崩溃时，这道题在此之后会被重新领取 */
const LEASE_MS = 2 * MINUTE_MS;
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_CONCURRENCY = 5;
const TIMER_INTERVAL_MS = MINUTE_MS;

export interface GradingRunOptions {
  now?: Date;
  grader?: ShortAnswerGrader;
  dailyCap?: number;
  batchSize?: number;
  concurrency?: number;
}

export interface GradingRunSummary {
  graded: number;
  failed: number;
  /** 本轮开始时当天的评分次数已达上限，没有领取任何题 */
  cappedOut: boolean;
}

interface ClaimedAnswer extends Record<string, unknown> {
  attempt_id: string;
  question_id: string;
  response: AnswerResponse | null;
  grading_tries: number;
}

function backoffMs(tries: number): number {
  const index = Math.min(tries, BACKOFF_MINUTES.length) - 1;
  return BACKOFF_MINUTES[index] * MINUTE_MS;
}

/** 每日上限按 UTC 的自然日计算 */
function startOfUtcDay(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

async function gradedToday(now: Date): Promise<number> {
  const [row] = await getDb()
    .select({ count: sql<number>`count(*)::int` })
    .from(attemptAnswers)
    .where(gte(attemptAnswers.gradedAt, startOfUtcDay(now)));
  return row.count;
}

/**
 * 领取到期的待评分题。领取即把 next_retry_at 推后一个保留时间，
 * 加上 SKIP LOCKED，多个执行器同时运行也不会领到同一道题。
 */
async function claim(now: Date, limit: number): Promise<ClaimedAnswer[]> {
  const leaseUntil = new Date(now.getTime() + LEASE_MS);
  const result = await getDb().execute<ClaimedAnswer>(sql`
    UPDATE attempt_answers AS aa
    SET next_retry_at = ${leaseUntil}
    WHERE (aa.attempt_id, aa.question_id) IN (
      SELECT attempt_id, question_id
      FROM attempt_answers
      WHERE verdict = 'pending'
        AND (next_retry_at IS NULL OR next_retry_at <= ${now})
      ORDER BY answered_at
      LIMIT ${limit}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING aa.attempt_id, aa.question_id, aa.response, aa.grading_tries
  `);
  return result.rows;
}

async function recordSuccess(
  claimed: ClaimedAnswer,
  verdict: "correct" | "incorrect" | "unanswered",
  feedback: string | null,
  now: Date,
): Promise<void> {
  await getDb().transaction(async (tx) => {
    const updated = await tx
      .update(attemptAnswers)
      .set({ verdict, feedback, gradedAt: verdict === "unanswered" ? null : now, nextRetryAt: null })
      .where(
        and(
          eq(attemptAnswers.attemptId, claimed.attempt_id),
          eq(attemptAnswers.questionId, claimed.question_id),
          eq(attemptAnswers.verdict, "pending"),
        ),
      )
      .returning({ questionId: attemptAnswers.questionId });
    if (updated.length === 0) return;

    const [attempt] = await tx
      .update(attempts)
      .set({
        pendingCount: sql`${attempts.pendingCount} - 1`,
        ...(verdict === "correct"
          ? { correctCount: sql`coalesce(${attempts.correctCount}, 0) + 1` }
          : {}),
      })
      .where(eq(attempts.id, claimed.attempt_id))
      .returning({ userId: attempts.userId });

    // 简答题到这里才有最终判定，此时计入题目统计
    if (attempt && verdict !== "unanswered") {
      await recordVerdicts(tx, attempt.userId, [{ questionId: claimed.question_id, verdict }], now);
    }
  });
}

async function recordFailure(claimed: ClaimedAnswer, now: Date): Promise<void> {
  const tries = claimed.grading_tries + 1;
  await getDb()
    .update(attemptAnswers)
    .set({ gradingTries: tries, nextRetryAt: new Date(now.getTime() + backoffMs(tries)) })
    .where(
      and(
        eq(attemptAnswers.attemptId, claimed.attempt_id),
        eq(attemptAnswers.questionId, claimed.question_id),
        eq(attemptAnswers.verdict, "pending"),
      ),
    );
}

async function gradeOne(
  claimed: ClaimedAnswer,
  grader: ShortAnswerGrader,
  now: Date,
): Promise<"graded" | "failed"> {
  const [question] = getCatalog().getWithAnswer([claimed.question_id]);
  const response = claimed.response;
  const text = question?.type === "fill" && response && "blanks" in response
    ? (response.blanks.some(value => value.trim() !== "")
      ? response.blanks.map((value, index) => `第 ${index + 1} 空：${value.trim() || "（未填写）"}`).join("\n") : "")
    : response && "text" in response ? response.text.trim() : "";
  // 题目已下架或没有可评的内容：不调用评分器，按未答结束
  if (!question || text === "") {
    await recordSuccess(claimed, "unanswered", null, now);
    return "graded";
  }

  try {
    const result = await grader.grade({
      type: question.type === "fill" ? "fill" : question.type === "code" ? "code" : "short",
      ...(question.type === "fill" ? { blankCount: question.blankCount, blankOrder: question.blankOrder } : {}),
      stem: question.stem,
      referenceAnswer: question.referenceAnswer,
      userAnswer: text,
    });
    await recordSuccess(claimed, result.verdict, result.feedback, now);
    return "graded";
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(
      `[grading] ${claimed.question_id} 第 ${claimed.grading_tries + 1} 次评分失败：${reason}`,
    );
    await recordFailure(claimed, now);
    return "failed";
  }
}

/** 领取一批到期的待评分题并评出。可以安全地并发调用。 */
export async function runGradingOnce(options: GradingRunOptions = {}): Promise<GradingRunSummary> {
  const now = options.now ?? new Date();
  const dailyCap = options.dailyCap ?? getEnv().GRADING_DAILY_CAP;
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  const concurrency = options.concurrency ?? DEFAULT_CONCURRENCY;
  const grader = options.grader ?? getGrader();

  const remaining = dailyCap - (await gradedToday(now));
  if (remaining <= 0) return { graded: 0, failed: 0, cappedOut: true };

  const claimed = await claim(now, Math.min(batchSize, remaining));
  const summary: GradingRunSummary = { graded: 0, failed: 0, cappedOut: false };

  let next = 0;
  const worker = async () => {
    while (next < claimed.length) {
      const item = claimed[next++];
      summary[await gradeOne(item, grader, now)] += 1;
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, claimed.length) }, worker));
  return summary;
}

const globalForRunner = globalThis as unknown as {
  __quizGradingBusy?: boolean;
  __quizGradingTimer?: ReturnType<typeof setInterval>;
};

/** 持续领取直到没有到期的题。进程内同一时间只跑一轮。 */
async function drain(): Promise<void> {
  if (globalForRunner.__quizGradingBusy) return;
  globalForRunner.__quizGradingBusy = true;
  try {
    for (;;) {
      const summary = await runGradingOnce();
      if (summary.cappedOut || summary.graded + summary.failed < DEFAULT_BATCH_SIZE) break;
    }
  } catch (error) {
    console.error("[grading] 评分执行器出错", error);
  } finally {
    globalForRunner.__quizGradingBusy = false;
  }
}

/** 交卷后调用：不等待，尽快在后台评一轮。测试里通过 GRADING_AUTORUN=off 关闭。 */
export function kickGrading(): void {
  if (process.env.GRADING_AUTORUN === "off") return;
  setImmediate(() => void drain());
}

/** 应用启动时调用：每分钟扫一次，负责失败重试和进程重启后的恢复。 */
export function startGradingTimer(): void {
  if (process.env.GRADING_AUTORUN === "off" || globalForRunner.__quizGradingTimer) return;
  const timer = setInterval(() => void drain(), TIMER_INTERVAL_MS);
  // 不让这个定时器阻止进程退出
  timer.unref();
  globalForRunner.__quizGradingTimer = timer;
}
