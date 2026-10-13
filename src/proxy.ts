import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

const PUBLIC_PATHS = new Set(["/login", "/register"]);

/**
 * 没有会话 Cookie 的访客访问需要登录的页面时，带着原地址去登录页，登录后回到原处。
 * 这里只看 Cookie 在不在；会话是否真的有效由页面和接口各自校验。
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PUBLIC_PATHS.has(pathname) || request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // 接口自己返回 401；静态资源不需要登录
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
