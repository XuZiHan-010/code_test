import Link from "next/link";
import type { ReactNode } from "react";

/** 站内资料（/guides/…）用站内跳转；站外原文在新标签页打开并带 ↗ */
export function SourceLink({
  href,
  children,
  className = "link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children} ↗
    </a>
  );
}
