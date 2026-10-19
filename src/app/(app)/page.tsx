import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";

async function ModeSelect() {
  const user = await requireUserOrRedirect();

  const topics = getCatalog()
    .listColumns()
    .flatMap((column) => column.topics);
  const stats = [
    { value: topics.length, label: "专题" },
    { value: topics.reduce((n, t) => n + t.chapterCount, 0), label: "章节" },
    { value: topics.reduce((n, t) => n + t.questionCount, 0), label: "题目" },
  ];

  return (
    <div>
      <p className="eyebrow rise mb-3">Mode Select</p>
      <h1 className="rise stagger-1 mb-10 font-head text-4xl leading-tight font-bold tracking-tight italic sm:text-5xl">
        <span className="block max-w-full truncate text-accent sm:inline">{user.username}</span>
        <span className="hidden sm:inline">，</span>选一个模式
      </h1>

      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        {/* 单人：做题模式 */}
        <Link
          href="/practice"
          className="sheet lift slide-in stagger-1 group relative flex min-h-80 flex-col overflow-hidden p-6 sm:p-8"
        >
          <span aria-hidden className="ghost-num absolute -top-4 right-6 text-[9rem] sm:text-[11rem]">
            01
          </span>
          <span className="relative flex items-center gap-2">
            <span className="tag tag-accent font-display tracking-[0.18em]">1P · SOLO</span>
            <span className="tag tag-pass">已开放</span>
          </span>

          <span className="relative mt-auto block pt-16">
            <span className="block font-head text-5xl leading-none font-bold tracking-tight italic sm:text-6xl">
              做题模式
            </span>
            <span className="mt-4 block max-w-md text-ink-soft">
              按章节作答，交卷后看正确率和每道题的解答。做错的题会记下来，也可以自己收进错题本。
            </span>
          </span>

          <span className="relative mt-7 flex flex-wrap items-end justify-between gap-5">
            <span className="flex gap-7">
              {stats.map((stat) => (
                <span key={stat.label} className="block">
                  <span className="display block text-4xl text-ink sm:text-5xl">{stat.value}</span>
                  <span className="mt-1.5 block text-xs tracking-widest text-ink-faint">{stat.label}</span>
                </span>
              ))}
            </span>
            <span className="btn btn-primary mr-1 text-base group-hover:shadow-[5px_5px_0_var(--color-ink)]">
              进入做题 →
            </span>
          </span>
        </Link>

        {/* 多人：对战模式，尚未开放 */}
        <Link
          href="/battle"
          className="sheet hazard-faint slide-in stagger-2 group relative flex min-h-80 flex-col overflow-hidden p-6 transition-colors hover:border-pen sm:p-8"
        >
          <span aria-hidden className="ghost-num absolute -top-4 right-6 text-[9rem] sm:text-[11rem]">
            02
          </span>
          <span className="relative flex items-center gap-2">
            <span className="tag bg-pen font-display tracking-[0.18em] text-accent-ink">VS · ONLINE</span>
          </span>

          <span className="relative mt-auto block pt-16">
            <span className="block font-head text-4xl leading-none font-bold tracking-tight text-ink-soft italic sm:text-5xl">
              对战模式
            </span>
            <span className="mt-4 block text-sm text-ink-faint">多人在线对战，正在筹备中。</span>
          </span>

          <span className="relative mt-7 block">
            <span aria-hidden className="hazard block h-2" />
            <span className="flex items-center justify-between border border-t-0 border-rule bg-paper px-3 py-2 text-xs font-bold tracking-[0.2em]">
              <span className="text-accent">LOCKED · 尚未开放</span>
              <span className="text-ink-faint transition-colors group-hover:text-ink">了解一下 →</span>
            </span>
          </span>
        </Link>
      </div>

      {/* 做题模式下的两个常用去处 */}
      <div className="rise stagger-3 mt-5 grid gap-5 sm:grid-cols-2">
        <Link href="/mistakes" className="sheet lift group flex items-center gap-4 px-5 py-4">
          <span aria-hidden className="display text-3xl text-pen">
            ✕
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-head text-lg font-bold">错题</span>
            <span className="block text-sm text-ink-soft">做错过的题，每道错了几次</span>
          </span>
          <span aria-hidden className="text-ink-faint transition-colors group-hover:text-accent">
            →
          </span>
        </Link>
        <Link href="/notebook" className="sheet lift group flex items-center gap-4 px-5 py-4">
          <span aria-hidden className="display text-3xl text-accent">
            ★
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-head text-lg font-bold">错题本</span>
            <span className="block text-sm text-ink-soft">自己挑出来、想反复练的题</span>
          </span>
          <span aria-hidden className="text-ink-faint transition-colors group-hover:text-accent">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ModeSelect />
    </Suspense>
  );
}
