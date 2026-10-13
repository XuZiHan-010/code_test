import { NextResponse } from "next/server";
import { z } from "zod";
import { register } from "@/server/auth/service";
import { AppError } from "@/server/errors";
import { clientAddress, handle, readJson, setSessionCookie } from "@/server/http/api";
import { createRateLimiter } from "@/server/http/rate-limit";

const bodySchema = z.object({ username: z.string(), password: z.string() });
// 同一来源每小时最多注册 5 次
const limiter = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1000 });

export const POST = handle(async (request) => {
  const { username, password } = await readJson(request, bodySchema);

  const limit = limiter.check(clientAddress(request));
  if (!limit.ok) {
    throw new AppError("too_many_requests", "注册过于频繁，请稍后再试", 429, {
      retryAfterSeconds: limit.retryAfterSeconds,
    });
  }

  const result = await register(username, password);
  const response = NextResponse.json({ user: result.user }, { status: 201 });
  setSessionCookie(response, result.token);
  return response;
});
