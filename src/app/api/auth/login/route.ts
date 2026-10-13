import { NextResponse } from "next/server";
import { z } from "zod";
import { login } from "@/server/auth/service";
import { AppError } from "@/server/errors";
import { clientAddress, handle, readJson, setSessionCookie } from "@/server/http/api";
import { createRateLimiter } from "@/server/http/rate-limit";

const bodySchema = z.object({ username: z.string(), password: z.string() });
// 同一来源 10 分钟内最多尝试登录 10 次
const limiter = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });

export const POST = handle(async (request) => {
  const { username, password } = await readJson(request, bodySchema);

  const limit = limiter.check(clientAddress(request));
  if (!limit.ok) {
    throw new AppError("too_many_requests", "尝试次数过多，请稍后再试", 429, {
      retryAfterSeconds: limit.retryAfterSeconds,
    });
  }

  const result = await login(username, password);
  const response = NextResponse.json({ user: result.user });
  setSessionCookie(response, result.token);
  return response;
});
