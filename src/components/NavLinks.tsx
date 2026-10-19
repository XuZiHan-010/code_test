"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/practice", label: "做题", match: ["/practice", "/attempts"] },
  { href: "/mistakes", label: "错题", match: ["/mistakes"] },
  { href: "/notebook", label: "错题本", match: ["/notebook"] },
];

/** 主导航。当前栏目使用主题重点色与底部指示条。 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const active = link.match.some((prefix) => pathname.startsWith(prefix));
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-full items-center px-1 text-sm font-bold whitespace-nowrap transition-colors ${
              active ? "text-accent" : "text-ink-soft hover:text-ink"
            }`}
          >
            {link.label}
            {active && (
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.75 -skew-x-12 bg-accent" />
            )}
          </Link>
        );
      })}
    </>
  );
}
