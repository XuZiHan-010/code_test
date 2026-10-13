export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export interface RateLimiter {
  /** 记一次请求并判断是否超限 */
  check(key: string, now?: number): RateLimitResult;
  reset(): void;
}

/**
 * 进程内的滑动窗口限流：同一个 key 在 windowMs 内最多 limit 次。
 * 只在单实例部署下有效；重启后计数清零。
 */
export function createRateLimiter(options: { limit: number; windowMs: number }): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    check(key, now = Date.now()) {
      const windowStart = now - options.windowMs;
      const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);
      if (recent.length >= options.limit) {
        hits.set(key, recent);
        const retryAfterMs = recent[0] + options.windowMs - now;
        return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true };
    },
    reset() {
      hits.clear();
    },
  };
}
