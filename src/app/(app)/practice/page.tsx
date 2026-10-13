import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { getTopicProgress } from "@/server/attempts/progress";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";

export const metadata: Metadata = { title: "做题" };

async function TopicList() {
  const user = await requireUserOrRedirect();
  const columns = getCatalog().listColumns();
  const progress = await getTopicProgress(user.id);

  if (columns.length === 0) {
    return (
      <div className="sheet px-6 py-12 text-center text-sm text-ink-soft">
        题库里还没有可以做的章节，稍后再来看看。
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {columns.map((column) => (
        <section key={column.column} className="rise">
          <h2 className="mb-4 flex items-baseline gap-3 border-b border-ink pb-2 font-serif text-lg font-bold">
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
                    className="sheet group flex h-full items-start gap-4 p-5 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="stamp mt-0.5 shrink-0">{topic.prefix}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-lg font-bold group-hover:text-blue">
                        {topic.title}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">
                        {topic.chapterCount} 章 · {topic.questionCount} 题
                      </span>
                      <span className="mt-3 flex items-center gap-3 text-xs text-ink-soft">
                        <span
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-deep"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={topic.chapterCount}
                          aria-valuenow={done}
                          aria-label="已完成章节"
                        >
                          <span className="block h-full bg-ink" style={{ width: `${percent}%` }} />
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
      <p className="eyebrow mb-2">做题模式</p>
      <h1 className="title mb-8">选一个专题</h1>
      <Suspense fallback={<PageLoading />}>
        <TopicList />
      </Suspense>
    </>
  );
}
