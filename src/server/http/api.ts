import { NextResponse, type NextRequest } from "next/server";
import type { z } from "zod";
import { SESSION_COOKIE } from "@/lib/session-cookie";
import { validateSessionToken, type SessionUser } from "@/server/auth/session";
import { AppError } from "@/server/errors";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
// 浏览器允许的 Cookie 最长寿命约 400 天。会话是否有效由服务端的过期时间决定。
const COOKIE_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;

function errorResponse(error: AppError): NextResponse {
  const { retryAfterSeconds, ...extra } = (error.extra ?? {}) as {
    retryAfterSeconds?: number;
  } & Record<string, unknown>;
  const response = NextResponse.json(
    { error: { code: error.code, message: error.message }, ...extra },
    { status: error.status },
  );
  if (retryAfterSeconds !== undefined) {
    response.headers.set("Retry-After", String(retryAfterSeconds));
  }
  return response;
}

/** 修改数据的请求必须来自本站页面 */
function assertSameOrigin(request: NextRequest): void {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {
    originHost = null;
  }
  if (!originHost || !host || originHost !== host) {
    throw new AppError("forbidden_origin", "请求来源不被允许", 403);
  }
}

/**
 * 包装接口处理函数：对修改类请求校验来源，并把 AppError 转成约定的错误响应。
 * 约定见 specs/001-interview-quiz-system/contracts/http-api.md。
 */
export function handle<Context>(
  handler: (request: NextRequest, context: Context) => Promise<Response>,
): (request: NextRequest, context: Context) => Promise<Response> {
  return async (request, context) => {
    try {
      if (MUTATING_METHODS.has(request.method)) assertSameOrigin(request);
      return await handler(request, context);
    } catch (error) {
      if (error instanceof AppError) return errorResponse(error);
      console.error(`[api] ${request.method} ${request.nextUrl.pathname} 出错`, error);
      return errorResponse(new AppError("internal_error", "服务器出了点问题，请稍后再试", 500));
    }
  };
}

export async function requireUser(request: NextRequest): Promise<SessionUser> {
  const user = await validateSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!user) throw new AppError("unauthenticated", "请先登录", 401);
  return user;
}

export async function readJson<T>(request: NextRequest, schema: z.ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new AppError("invalid_json", "请求内容不是合法的 JSON", 400);
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new AppError("invalid_request", "请求内容不符合要求", 422);
  }
  return result.data;
}

export function clientAddress(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}
