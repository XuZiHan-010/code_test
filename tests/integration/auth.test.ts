import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { login, register } from "@/server/auth/service";
import {
  createSession,
  deleteSession,
  SESSION_LIFETIME_MS,
  validateSessionToken,
} from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { sessions, users } from "@/server/db/schema";
import { AppError } from "@/server/errors";

const DAY = 24 * 60 * 60 * 1000;

async function expectAppError(promise: Promise<unknown>, code: string, status: number) {
  await expect(promise).rejects.toBeInstanceOf(AppError);
  await expect(promise).rejects.toMatchObject({ code, status });
}

describe("注册", () => {
  it("创建账号并直接登录", async () => {
    const result = await register("alice_01", "correct horse");
    expect(result.user.username).toBe("alice_01");
    expect(await validateSessionToken(result.token)).toEqual(result.user);
  });

  it("允许中文用户名", async () => {
    const result = await register("小林同学", "12345678");
    expect(result.user.username).toBe("小林同学");
  });

  it("大小写不同的用户名视为重复", async () => {
    await register("Alice", "12345678");
    await expectAppError(register("alice", "abcdefgh"), "username_taken", 409);
    await expectAppError(register("ALICE", "abcdefgh"), "username_taken", 409);
  });

  it.each(["ab", "a".repeat(21), "has space", "bad-dash", "邮箱@x", ""])(
    "拒绝不合规的用户名 %j",
    async (username) => {
      await expectAppError(register(username, "12345678"), "invalid_username", 422);
    },
  );

  it("拒绝过短或过长的密码", async () => {
    await expectAppError(register("alice", "1234567"), "password_too_short", 422);
    await expectAppError(register("alice", "x".repeat(73)), "password_too_long", 422);
    await expect(register("alice", "x".repeat(72))).resolves.toBeTruthy();
  });

  it("库里存的是 argon2 哈希，不是明文", async () => {
    await register("alice", "my secret pw");
    const [row] = await getDb().select().from(users).where(eq(users.usernameNormalized, "alice"));
    expect(row.passwordHash).not.toContain("my secret pw");
    expect(row.passwordHash.startsWith("$argon2id$")).toBe(true);
    expect(await verify(row.passwordHash, "my secret pw")).toBe(true);
  });
});

describe("登录", () => {
  it("用户名大小写不敏感，返回可用的会话", async () => {
    const registered = await register("Alice", "12345678");
    const result = await login("alice", "12345678");
    expect(result.user).toEqual(registered.user);
    expect(result.token).not.toBe(registered.token);
    expect(await validateSessionToken(result.token)).toEqual(registered.user);
  });

  it("密码错误和用户名不存在给出同样的错误", async () => {
    await register("alice", "12345678");
    const wrongPassword = login("alice", "wrong password").catch((e) => e);
    const noSuchUser = login("nobody", "12345678").catch((e) => e);
    const [a, b] = await Promise.all([wrongPassword, noSuchUser]);
    expect(a).toMatchObject({ code: "invalid_credentials", status: 401 });
    expect(b).toMatchObject({ code: "invalid_credentials", status: 401 });
    expect(a.message).toBe(b.message);
  });
});

describe("会话", () => {
  it("库里只存令牌的哈希", async () => {
    const { user, token } = await register("alice", "12345678");
    const rows = await getDb().select().from(sessions).where(eq(sessions.userId, user.id));
    expect(rows).toHaveLength(1);
    expect(rows[0].id).not.toBe(token);
    expect(rows[0].id).toMatch(/^[0-9a-f]{64}$/);
  });

  it("没有令牌、乱写的令牌都无效", async () => {
    expect(await validateSessionToken(undefined)).toBeNull();
    expect(await validateSessionToken("not-a-real-token")).toBeNull();
  });

  it("退出后会话失效", async () => {
    const { token } = await register("alice", "12345678");
    await deleteSession(token);
    expect(await validateSessionToken(token)).toBeNull();
  });

  it("过期的会话无效并被清除", async () => {
    const { user } = await register("alice", "12345678");
    const start = new Date("2026-01-01T00:00:00Z");
    const { token } = await createSession(user.id, start);
    const afterExpiry = new Date(start.getTime() + SESSION_LIFETIME_MS + 1000);
    expect(await validateSessionToken(token, afterExpiry)).toBeNull();
    // 即使时间回到有效期内，这条会话也已经不在了
    expect(await validateSessionToken(token, start)).toBeNull();
  });

  it("剩余超过 15 天时访问不改变过期时间", async () => {
    const { user } = await register("alice", "12345678");
    const start = new Date("2026-01-01T00:00:00Z");
    const { token, expiresAt } = await createSession(user.id, start);
    await validateSessionToken(token, new Date(start.getTime() + 10 * DAY));
    const [row] = await getDb().select().from(sessions).where(eq(sessions.expiresAt, expiresAt));
    expect(row).toBeDefined();
  });

  it("剩余不足 15 天时访问即顺延到 30 天后", async () => {
    const { user } = await register("alice", "12345678");
    const start = new Date("2026-01-01T00:00:00Z");
    const { token } = await createSession(user.id, start);
    const visit = new Date(start.getTime() + 20 * DAY);
    expect(await validateSessionToken(token, visit)).toMatchObject({ id: user.id });

    // 原本第 30 天过期；顺延后第 45 天仍然有效
    const day45 = new Date(start.getTime() + 45 * DAY);
    expect(await validateSessionToken(token, day45)).toMatchObject({ id: user.id });
  });
});
