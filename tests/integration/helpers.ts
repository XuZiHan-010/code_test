import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { register } from "@/server/auth/service";
import { saveAnswer, startAttempt } from "@/server/attempts/service";
import { getDb } from "@/server/db/client";
import { attemptAnswers, attempts, type AnswerResponse } from "@/server/db/schema";

const ORIGIN = "http://localhost";

export async function createUser(username: string) {
  const { user, token } = await register(username, "12345678");
  return { ...user, token };
}

/** 开始一章的作答并按给定的答案逐题保存。返回作答编号。 */
export async function startAndAnswer(
  userId: string,
  chapterId: string,
  answers: Record<string, AnswerResponse | null> = {},
): Promise<string> {
  const { attemptId } = await startAttempt(userId, { type: "chapter", chapterId });
  for (const [questionId, response] of Object.entries(answers)) {
    await saveAnswer(userId, attemptId, questionId, response);
  }
  return attemptId;
}

export async function getAttemptRow(attemptId: string) {
  const [row] = await getDb().select().from(attempts).where(eq(attempts.id, attemptId));
  return row;
}

export async function getAnswerRow(attemptId: string, questionId: string) {
  const [row] = await getDb()
    .select()
    .from(attemptAnswers)
    .where(and(eq(attemptAnswers.attemptId, attemptId), eq(attemptAnswers.questionId, questionId)));
  return row;
}

/** 构造一个发给接口处理函数的请求。默认带上同源的 Origin。 */
export function apiRequest(
  path: string,
  options: {
    method?: string;
    token?: string;
    body?: unknown;
    origin?: string | null;
  } = {},
): NextRequest {
  const headers = new Headers({ host: "localhost" });
  const origin = options.origin === undefined ? ORIGIN : options.origin;
  if (origin) headers.set("origin", origin);
  if (options.token) headers.set("cookie", `quiz_session=${options.token}`);
  if (options.body !== undefined) headers.set("content-type", "application/json");
  return new NextRequest(`${ORIGIN}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
}

export const routeParams = <T extends Record<string, string>>(params: T) => ({
  params: Promise.resolve(params),
});
