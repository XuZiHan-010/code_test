import { and, eq } from "drizzle-orm";
import { getCatalog } from "@/server/content/catalog";
import type { QuestionForAnswering } from "@/server/content/types";
import { getDb, type DbOrTx } from "@/server/db/client";
import { attemptAnswers, attempts, type AnswerResponse } from "@/server/db/schema";
import { AppError, notFound } from "@/server/errors";

export type AttemptRow = typeof attempts.$inferSelect;
export type AttemptScope = { type: "chapter"; chapterId: string };

export interface ScopeView {
  type: "chapter" | "notebook";
  chapterId: string | null;
  title: string;
}

export interface AnsweringQuestion extends QuestionForAnswering {
  inNotebook: boolean;
  response: AnswerResponse | null;
}

export type AttemptForAnswering =
  | {
      id: string;
      status: "in_progress";
      scope: ScopeView;
      lastQuestionId: string | null;
      questions: AnsweringQuestion[];
    }
  | { id: string; status: "submitted" };

/** 简答题答案的长度上限（按字符计） */
export const SHORT_ANSWER_MAX_CHARS = 2000;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const notInProgress = () =>
  new AppError("attempt_not_in_progress", "这次作答已经结束，不能再修改", 409);

function isUniqueViolation(error: unknown): boolean {
  const code =
    (error as { code?: string } | null)?.code ??
    (error as { cause?: { code?: string } } | null)?.cause?.code;
  return code === "23505";
}

/**
 * 取一份属于该用户的作答。不存在、不属于该用户、编号格式不对，都按“不存在”处理，
 * 不向调用方透露别人的作答是否存在。
 */
export async function findAttempt(
  db: DbOrTx,
  userId: string,
  attemptId: string,
  options: { forUpdate?: boolean } = {},
): Promise<AttemptRow> {
  if (!UUID_PATTERN.test(attemptId)) throw notFound("没有找到这次作答");
  const query = db
    .select()
    .from(attempts)
    .where(and(eq(attempts.id, attemptId), eq(attempts.userId, userId)));
  const [row] = options.forUpdate ? await query.for("update") : await query;
  if (!row) throw notFound("没有找到这次作答");
  return row;
}

export function describeScope(attempt: AttemptRow): ScopeView {
  if (attempt.scopeType === "chapter" && attempt.chapterId) {
    const chapter = getCatalog().getChapter(attempt.chapterId);
    return {
      type: "chapter",
      chapterId: attempt.chapterId,
      title: chapter?.title ?? attempt.chapterId,
    };
  }
  return { type: "notebook", chapterId: null, title: "错题本练习" };
}

async function findInProgress(userId: string, scope: AttemptScope): Promise<AttemptRow | undefined> {
  const [row] = await getDb()
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.scopeType, scope.type),
        eq(attempts.chapterId, scope.chapterId),
        eq(attempts.status, "in_progress"),
      ),
    );
  return row;
}

/**
 * 开始一次作答。该范围已有进行中的作答时返回它，不新建。
 * 题目列表和顺序在创建时固定。
 */
export async function startAttempt(
  userId: string,
  scope: AttemptScope,
): Promise<{ attemptId: string; created: boolean }> {
  const chapter = getCatalog().getChapter(scope.chapterId);
  if (!chapter) throw new AppError("chapter_not_found", "没有找到这个章节", 404);

  const existing = await findInProgress(userId, scope);
  if (existing) return { attemptId: existing.id, created: false };

  try {
    const [row] = await getDb()
      .insert(attempts)
      .values({
        userId,
        scopeType: "chapter",
        chapterId: chapter.id,
        questionIds: chapter.questionIds,
        totalCount: chapter.questionIds.length,
      })
      .returning({ id: attempts.id });
    return { attemptId: row.id, created: true };
  } catch (error) {
    // 两个请求同时开始同一章：唯一索引保证只有一个成功，另一个取回已有的那份
    if (!isUniqueViolation(error)) throw error;
    const raced = await findInProgress(userId, scope);
    if (!raced) throw error;
    return { attemptId: raced.id, created: false };
  }
}

/** 交卷前给用户看的作答：题目不含答案，附带已保存的答案和上次所在的题目。 */
export async function getAttemptForAnswering(
  userId: string,
  attemptId: string,
): Promise<AttemptForAnswering> {
  const db = getDb();
  const attempt = await findAttempt(db, userId, attemptId);
  if (attempt.status === "abandoned") throw notFound("没有找到这次作答");
  if (attempt.status === "submitted") return { id: attempt.id, status: "submitted" };

  const saved = await db
    .select({ questionId: attemptAnswers.questionId, response: attemptAnswers.response })
    .from(attemptAnswers)
    .where(eq(attemptAnswers.attemptId, attempt.id));
  const responses = new Map(saved.map((row) => [row.questionId, row.response]));

  return {
    id: attempt.id,
    status: "in_progress",
    scope: describeScope(attempt),
    lastQuestionId: attempt.lastQuestionId,
    questions: getCatalog()
      .getForAnswering(attempt.questionIds)
      .map((question) => ({
        ...question,
        inNotebook: false,
        response: responses.get(question.id) ?? null,
      })),
  };
}

/** 按题型检查并规整答案。清空的答案规整为 null。 */
function normalizeResponse(
  question: { type: string; options?: { key: string }[] },
  response: AnswerResponse | null,
): AnswerResponse | null {
  const invalid = (message: string) => new AppError("invalid_answer", message, 422);
  if (response === null) return null;

  if (question.type === "short") {
    if (!("text" in response)) throw invalid("简答题需要提交文字答案");
    if ([...response.text].length > SHORT_ANSWER_MAX_CHARS) {
      throw invalid(`答案不能超过 ${SHORT_ANSWER_MAX_CHARS} 字`);
    }
    return response.text.trim() === "" ? null : { text: response.text };
  }

  if (!("choice" in response)) throw invalid("选择题需要提交选项");
  const keys = new Set((question.options ?? []).map((o) => o.key));
  const chosen = response.choice;
  if (new Set(chosen).size !== chosen.length || chosen.some((key) => !keys.has(key))) {
    throw invalid("提交的选项不属于这道题");
  }
  if (question.type === "single" && chosen.length > 1) {
    throw invalid("单选题只能选一个选项");
  }
  return chosen.length === 0 ? null : { choice: [...chosen].sort() };
}

/** 保存一道题的答案，并把这道题记为用户当前所在的位置。只有进行中的作答可以保存。 */
export async function saveAnswer(
  userId: string,
  attemptId: string,
  questionId: string,
  response: AnswerResponse | null,
  now: Date = new Date(),
): Promise<void> {
  await getDb().transaction(async (tx) => {
    // 锁住作答这一行，与同时到来的交卷请求排队
    const attempt = await findAttempt(tx, userId, attemptId, { forUpdate: true });
    if (attempt.status !== "in_progress") throw notInProgress();
    if (!attempt.questionIds.includes(questionId)) throw notFound("这道题不在这次作答里");

    const [question] = getCatalog().getForAnswering([questionId]);
    if (!question) throw notFound("这道题已经不存在");
    const normalized = normalizeResponse(question, response);

    await tx
      .insert(attemptAnswers)
      .values({ attemptId: attempt.id, questionId, response: normalized, answeredAt: now })
      .onConflictDoUpdate({
        target: [attemptAnswers.attemptId, attemptAnswers.questionId],
        set: { response: normalized, answeredAt: now },
      });
    await tx
      .update(attempts)
      .set({ lastQuestionId: questionId })
      .where(eq(attempts.id, attempt.id));
  });
}
