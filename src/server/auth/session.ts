import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { sessions, users } from "@/server/db/schema";

export { SESSION_COOKIE } from "@/lib/session-cookie";

const DAY_MS = 24 * 60 * 60 * 1000;
/** 会话有效期：创建或顺延后 30 天 */
export const SESSION_LIFETIME_MS = 30 * DAY_MS;
/** 剩余不足 15 天时，访问即顺延到 30 天 */
export const SESSION_RENEW_BELOW_MS = 15 * DAY_MS;

export interface SessionUser {
  id: string;
  username: string;
}

/** 数据库只存令牌的 SHA-256，令牌原文只交给浏览器 */
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(
  userId: string,
  now: Date = new Date(),
): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now.getTime() + SESSION_LIFETIME_MS);
  await getDb().insert(sessions).values({ id: hashToken(token), userId, expiresAt });
  return { token, expiresAt };
}

/** 令牌有效时返回用户，并在临近过期时顺延；无效或已过期返回 null。 */
export async function validateSessionToken(
  token: string | undefined,
  now: Date = new Date(),
): Promise<SessionUser | null> {
  if (!token) return null;
  const db = getDb();
  const id = hashToken(token);
  const [row] = await db
    .select({
      userId: users.id,
      username: users.username,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(eq(sessions.id, id));
  if (!row) return null;

  if (row.expiresAt.getTime() <= now.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, id));
    return null;
  }
  if (row.expiresAt.getTime() - now.getTime() < SESSION_RENEW_BELOW_MS) {
    await db
      .update(sessions)
      .set({ expiresAt: new Date(now.getTime() + SESSION_LIFETIME_MS) })
      .where(eq(sessions.id, id));
  }
  return { id: row.userId, username: row.username };
}

export async function deleteSession(token: string | undefined): Promise<void> {
  if (!token) return;
  await getDb().delete(sessions).where(eq(sessions.id, hashToken(token)));
}
