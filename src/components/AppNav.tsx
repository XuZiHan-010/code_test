import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/server/auth/current-user";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/practice", label: "做题" },
  { href: "/mistakes", label: "错题" },
  { href: "/notebook", label: "错题本" },
];

async function CurrentUser() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="max-w-32 truncate text-sm text-ink-soft" title={user.username}>
        {user.username}
      </span>
      <LogoutButton />
    </div>
  );
}

export function AppNav() {
  return (
    <header className="border-b border-rule bg-card/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3">
        <Link href="/" className="font-serif text-lg font-bold tracking-wide text-ink">
          面试题练习册
        </Link>
        <nav aria-label="主导航" className="order-3 flex w-full gap-5 text-sm sm:order-none sm:w-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-1 text-ink-soft underline-offset-8 hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          {/* 用户名来自会话，放在自己的边界里，不阻塞导航的其余部分 */}
          <Suspense fallback={<span className="text-sm text-ink-faint">…</span>}>
            <CurrentUser />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
