import { and, asc, eq, gt } from "drizzle-orm";
import { getCatalog } from "@/server/content/catalog";
import type { Citation, QuestionOption, QuestionType } from "@/server/content/types";
import { getDb } from "@/server/db/client";
import {
  attemptAnswers,
  attempts,
  type AnswerResponse,
  type Verdict,
} from "@/server/db/schema";
import { AppError, notFound } from "@/server/errors";
import { gradeChoice } from "@/server/grading/choice";
import { kickGrading } from "@/server/grading/runner";
import { getWrongCounts, recordVerdicts } from "@/server/mistakes/service";
import { getMembership } from "@/server/notebook/service";
import { describeScope, findAttempt, type ScopeView } from "./service";

/** 同一用户在这段时间内最多交卷这么多次（FR-041） */
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const SUBMIT_LIMIT = 10;

export interface ResultQuestion {
  id: string;
  type: QuestionType;
  stem: string;
  options?: QuestionOption[];
  response: AnswerResponse | null;
  verdict: Verdict;
  feedback: string | null;
  referenceAnswer: string;
  citations: Citation[];
  inNotebook: boolean;
  wrongCount: number;
}

export interface AttemptResult {
  id: string;
  scope: ScopeView;
  submittedAt: string;
  totalCount: number;
  correctCount: number;
  pendingCount: number;
  questions: ResultQuestion[];
}

function judge(
  question: { type: QuestionType; options?: QuestionOption[] },
  response: AnswerResponse | null,
): Verdict {
  if (question.type === "short") {
    const text = response && "text" in response ? response.text.trim() : "";
    // 简答题交卷时先记为待评分，由评分执行器给出最终判定
    return text === "" ? "unanswered" : "pending";
  }
  const selected = response && "choice" in response ? response.choice : [];
  return gradeChoice({ type: question.type, options: question.options ?? [] }, selected);
}

/**
 * 交卷。在一个事务里判选择题、给未答题记“未答”、把简答题记为“待评分”，并写入计数。
 * 有未答题且没有确认时不交卷，抛出带未答数量的错误。
 */
export async function submitAttempt(
  userId: string,
  attemptId: string,
  options: { confirmUnanswered: boolean; now?: Date },
): Promise<void> {
  const now = options.now ?? new Date();

  await getDb().transaction(async (tx) => {
    const attempt = await findAttempt(tx, userId, attemptId, { forUpdate: true });
    if (attempt.status !== "in_progress") {
      throw new AppError("attempt_not_in_progress", "这次作答已经交过卷了", 409);
    }

    const windowStart = new Date(now.getTime() - SUBMIT_WINDOW_MS);
    const recent = await tx
      .select({ submittedAt: attempts.submittedAt })
      .from(attempts)
      .where(and(eq(attempts.userId, userId), gt(attempts.submittedAt, windowStart)))
      .orderBy(asc(attempts.submittedAt));
    if (recent.length >= SUBMIT_LIMIT) {
      const oldest = recent[recent.length - SUBMIT_LIMIT].submittedAt!;
      const retryAfterMs = oldest.getTime() + SUBMIT_WINDOW_MS - now.getTime();
      throw new AppError("too_many_submissions", "交卷太频繁了，请稍后再试", 429, {
        retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
      });
    }

    const saved = await tx
      .select({ questionId: attemptAnswers.questionId, response: attemptAnswers.response })
      .from(attemptAnswers)
      .where(eq(attemptAnswers.attemptId, attempt.id));
    const responses = new Map(saved.map((row) => [row.questionId, row.response]));

    // 作答期间被下架的题不再计入这次作答
    const questions = getCatalog().getWithAnswer(attempt.questionIds);
    const judged = questions.map((question) => {
      const response = responses.get(question.id) ?? null;
      return { questionId: question.id, response, verdict: judge(question, response) };
    });

    const unansweredCount = judged.filter((j) => j.verdict === "unanswered").length;
    if (unansweredCount > 0 && !options.confirmUnanswered) {
      throw new AppError("has_unanswered", `还有 ${unansweredCount} 道题没有作答`, 409, {
        unansweredCount,
      });
    }

    for (const { questionId, response, verdict } of judged) {
      await tx
        .insert(attemptAnswers)
        .values({ attemptId: attempt.id, questionId, response, verdict, answeredAt: now })
        .onConflictDoUpdate({
          target: [attemptAnswers.attemptId, attemptAnswers.questionId],
          set: { verdict },
        });
    }

    // 选择题此刻就有了最终判定，计入题目统计；简答题等评分完成时再计入
    await recordVerdicts(
      tx,
      userId,
      judged.flatMap((j) =>
        j.verdict === "correct" || j.verdict === "incorrect"
          ? [{ questionId: j.questionId, verdict: j.verdict }]
          : [],
      ),
      now,
    );

    await tx
      .update(attempts)
      .set({
        status: "submitted",
        submittedAt: now,
        questionIds: questions.map((q) => q.id),
        totalCount: questions.length,
        correctCount: judged.filter((j) => j.verdict === "correct").length,
        pendingCount: judged.filter((j) => j.verdict === "pending").length,
      })
      .where(eq(attempts.id, attempt.id));
  });

  kickGrading();
}

/** 已交卷作答的结果：计数，以及每道题的答案、判定、正确答案和解答。 */
export async function getAttemptResult(userId: string, attemptId: string): Promise<AttemptResult> {
  const db = getDb();
  const attempt = await findAttempt(db, userId, attemptId);
  if (attempt.status === "abandoned") throw notFound("没有找到这次作答");
  if (attempt.status !== "submitted") {
    throw new AppError("attempt_not_submitted", "这次作答还没有交卷", 409);
  }

  const rows = await db
    .select()
    .from(attemptAnswers)
    .where(eq(attemptAnswers.attemptId, attempt.id));
  const byQuestion = new Map(rows.map((row) => [row.questionId, row]));
  const [wrongCounts, inNotebook] = await Promise.all([
    getWrongCounts(userId, attempt.questionIds),
    getMembership(userId, attempt.questionIds),
  ]);

  const questions: ResultQuestion[] = getCatalog()
    .getWithAnswer(attempt.questionIds)
    .map((question) => {
      const row = byQuestion.get(question.id);
      return {
        id: question.id,
        type: question.type,
        stem: question.stem,
        ...(question.options ? { options: question.options } : {}),
        response: row?.response ?? null,
        verdict: row?.verdict ?? "unanswered",
        feedback: row?.feedback ?? null,
        referenceAnswer: question.referenceAnswer,
        citations: question.citations,
        inNotebook: inNotebook.has(question.id),
        wrongCount: wrongCounts.get(question.id) ?? 0,
      };
    });

  return {
    id: attempt.id,
    scope: describeScope(attempt),
    submittedAt: attempt.submittedAt!.toISOString(),
    totalCount: attempt.totalCount,
    correctCount: attempt.correctCount ?? 0,
    pendingCount: attempt.pendingCount,
    questions,
  };
}
