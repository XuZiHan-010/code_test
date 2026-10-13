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
    <div className="rise sheet mx-auto max-w-lg border-dashed px-6 py-12 text-center">
      <p className="eyebrow mb-3">Coming Later</p>
      <h1 className="title mb-4">对战模式尚未开放</h1>
      <p className="mx-auto mb-8 max-w-sm text-sm text-ink-soft">
        多人在线对战还在筹备中，开放后会出现在这里。现在可以先去做题模式练习。
      </p>
      <Link href="/practice" className="btn btn-primary">
        去做题模式
      </Link>
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
