import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { requireUserOrRedirect } from "@/server/auth/current-user";

export const metadata: Metadata = { title: "对战模式" };

// 1.0 只保留入口：这里没有任何对战功能，详细需求确定后另行实现。
async function BattlePlaceholder() {
  await requireUserOrRedirect();

  return (
    <div className="rise sheet hazard-faint relative mx-auto max-w-xl overflow-hidden">
      <div aria-hidden className="hazard h-3" />
      <span aria-hidden className="ghost-num absolute top-4 -right-3 text-[12rem]">
        VS
      </span>
      <div className="relative px-6 py-12 sm:px-10">
        <p className="eyebrow mb-4">Locked</p>
        <h1 className="mb-5 font-head text-4xl leading-tight font-bold tracking-tight italic sm:text-5xl">
          对战模式
          <br />
          <span className="text-pen">尚未开放</span>
        </h1>
        <p className="mb-9 max-w-sm text-ink-soft">
          多人在线对战还在筹备中，开放后会出现在这里。现在可以先去做题模式练习。
        </p>
        <Link href="/practice" className="btn btn-primary ml-1 text-base">
          去做题模式 →
        </Link>
      </div>
    </div>
  );
}

export default function BattlePage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <BattlePlaceholder />
    </Suspense>
  );
}
