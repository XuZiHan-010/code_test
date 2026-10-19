import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { getTopicProgress } from "@/server/attempts/progress";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";
import type { Guide } from "@/server/content/types";

export const metadata: Metadata = { title: "做题" };

/** 复习资料不受章节状态影响：专题还没有可做的章节时，也从这里进入 */
function GuideList({ guides }: { guides: Guide[] }) {
  if (guides.length === 0) return null;
  return (
    <section className="rise">
      <h2 className="mb-4 flex items-baseline gap-3 border-b border-ink pb-2 font-head text-lg font-bold">
        复习资料
        <span className="font-sans text-xs font-normal text-ink-faint">{guides.length} 份</span>
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="sheet lift group flex h-full items-center p-5">
              <span className="font-head text-lg font-bold group-hover:text-accent">{guide.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function TopicList() {
  const user = await requireUserOrRedirect();
  const catalog = getCatalog();
  const columns = catalog.listColumns();
  const guides = catalog.listGuides();
  const progress = await getTopicProgress(user.id);

  if (columns.length === 0) {
    return (
      <div className="space-y-10">
        <div className="sheet px-6 py-12 text-center text-sm text-ink-soft">
          题库里还没有可以做的章节，稍后再来看看。
        </div>
        <GuideList guides={guides} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <GuideList guides={guides} />
      {columns.map((column) => (
        <section key={column.column} className="rise">
          <h2 className="mb-4 flex items-baseline gap-3 border-b border-ink pb-2 font-head text-lg font-bold">
            {column.column}
            <span className="font-sans text-xs font-normal text-ink-faint">
              {column.topics.length} 个专题
            </span>
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {column.topics.map((topic) => {
              const done = progress.get(topic.prefix)?.completed ?? 0;
              const percent = Math.round((done / topic.chapterCount) * 100);
              return (
                <li key={topic.prefix}>
                  <Link
                    href={`/practice/${topic.slug}`}
                    className="sheet lift group flex h-full items-start gap-4 p-5"
                  >
                    <span className="stamp mt-0.5 shrink-0">{topic.prefix}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-head text-lg font-bold group-hover:text-accent">
                        {topic.title}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">
                        {topic.chapterCount} 章 · {topic.questionCount} 题
                      </span>
                      <span className="mt-3 flex items-center gap-3 text-xs text-ink-soft">
                        <span
                          className="h-1.5 flex-1 overflow-hidden bg-paper-deep"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={topic.chapterCount}
                          aria-valuenow={done}
                          aria-label="已完成章节"
                        >
                          <span className="block h-full bg-accent" style={{ width: `${percent}%` }} />
                        </span>
                        <span className="font-mono">
                          已完成 {done} / {topic.chapterCount} 章
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function PracticePage() {
  return (
    <>
      <p className="eyebrow mb-2">你的面试练习空间</p>
      <h1 className="title mb-3">今天，想练点什么？</h1>
      <p className="mb-10 text-sm text-ink-soft">选择一个专题开始练习，每次作答都会自动保存。</p>
      <Suspense fallback={<PageLoading />}>
        <TopicList />
      </Suspense>
    </>
  );
}
