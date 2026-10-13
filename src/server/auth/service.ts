import { eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { users } from "@/server/db/schema";
import { AppError } from "@/server/errors";
import { hashPassword, verifyPassword } from "./password";
import { createSession, type SessionUser } from "./session";

// 3 到 20 个字符，允许字母、数字、下划线和中文
const USERNAME_PATTERN = /^[A-Za-z0-9_一-龥]{3,20}$/;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 72;

// 用户名不存在时也做一次同样耗时的校验，避免从响应时间看出用户名是否存在
const DUMMY_HASH =
  "$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHRzb21lc2FsdA$Zk0nV6eN3H3o8mB0yq3n1J1T2v8m3gkq2r3qv0b1Y5c";

export interface AuthResult {
  user: SessionUser;
  token: string;
  expiresAt: Date;
}

function normalizeUsername(username: string): string {
  return username.toLowerCase();
}

function isUniqueViolation(error: unknown): boolean {
  const code =
    (error as { code?: string } | null)?.code ??
    (error as { cause?: { code?: string } } | null)?.cause?.code;
  return code === "23505";
}

export async function register(username: string, password: string): Promise<AuthResult> {
  if (!USERNAME_PATTERN.test(username)) {
    throw new AppError(
      "invalid_username",
      "用户名需为 3 到 20 个字符，只能包含字母、数字、下划线和中文",
      422,
    );
  }
  if (password.length < PASSWORD_MIN) {
    throw new AppError("password_too_short", `密码至少需要 ${PASSWORD_MIN} 位`, 422);
  }
  if (password.length > PASSWORD_MAX) {
    throw new AppError("password_too_long", `密码不能超过 ${PASSWORD_MAX} 位`, 422);
  }

  const passwordHash = await hashPassword(password);
  let user: SessionUser;
  try {
    [user] = await getDb()
      .insert(users)
      .values({ username, usernameNormalized: normalizeUsername(username), passwordHash })
      .returning({ id: users.id, username: users.username });
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new AppError("username_taken", "这个用户名已被占用", 409);
    }
    throw error;
  }

  const session = await createSession(user.id);
  return { user, ...session };
}

export async function login(username: string, password: string): Promise<AuthResult> {
  const [row] = await getDb()
    .select({ id: users.id, username: users.username, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.usernameNormalized, normalizeUsername(username)));

  const ok = await verifyPassword(row?.passwordHash ?? DUMMY_HASH, password);
  if (!row || !ok) {
    throw new AppError("invalid_credentials", "用户名或密码错误", 401);
  }

  const session = await createSession(row.id);
  return { user: { id: row.id, username: row.username }, ...session };
}
