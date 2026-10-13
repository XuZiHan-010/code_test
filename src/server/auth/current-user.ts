import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";
import { validateSessionToken, type SessionUser } from "./session";

/** 供页面（服务端组件）使用：读取当前登录用户，未登录返回 null。 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  // 会话校验要读当前时间和数据库，只能在请求到来时进行，不能进入预渲染
  await connection();
  return validateSessionToken(token);
}

/**
 * 供需要登录的页面使用。没有 Cookie 的访客已经在 proxy 里被带到登录页（带着原地址），
 * 这里处理的是 Cookie 还在但会话已失效的情况。
 */
export async function requireUserOrRedirect(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
