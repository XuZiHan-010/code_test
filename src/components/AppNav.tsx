import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/server/auth/current-user";
import { LogoutButton } from "./LogoutButton";
import { NavLinks } from "./NavLinks";
import { AppearanceSettings } from "./AppearanceSettings";

async function CurrentUser() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap sm:gap-3">
      <LogoutButton />
      <span className="max-w-20 truncate font-head text-sm font-bold sm:max-w-40" title={user.username}>
        {user.username}
      </span>
    </div>
  );
}

export function AppNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-stretch gap-x-3 px-4 sm:gap-x-9 sm:px-8">
        <Link href="/" aria-label="面试题练习册首页" className="flex shrink-0 items-center gap-2.5 font-head text-lg font-bold">
          <span aria-hidden className="flex gap-0.75">
            <span className="block h-5 w-1.5 -skew-x-12 bg-accent" />
            <span className="block h-5 w-1.5 -skew-x-12 bg-pen" />
          </span>
          <span className="hidden sm:inline">面试题练习册</span>
        </Link>
        <nav aria-label="主导航" className="flex items-stretch gap-3 sm:gap-6">
          {/* 高亮当前栏目要读地址，放在自己的边界里 */}
          <Suspense fallback={null}>
            <NavLinks />
          </Suspense>
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-4">
          {/* 用户名来自会话，放在自己的边界里，不阻塞导航的其余部分 */}
          <Suspense fallback={<span className="text-sm text-ink-faint">…</span>}>
            <CurrentUser />
          </Suspense>
          <AppearanceSettings />
        </div>
      </div>
    </header>
  );
}
