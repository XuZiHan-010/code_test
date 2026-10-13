/**
 * 登录后要回到的地址只接受站内相对路径，其他一律回首页，
 * 避免登录链接被用来把人带到站外。
 */
export function safeNextPath(next: string | null | undefined): string {
  if (!next) return "/";
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  if (next.startsWith("/login") || next.startsWith("/register")) return "/";
  return next;
}
