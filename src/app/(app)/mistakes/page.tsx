import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getMistakeSummary } from "@/server/mistakes/service";

export const metadata: Metadata = { title: "错题" };

async function Summary() {
  const user = await requireUserOrRedirect();
  const summary = await getMistakeSummary(user.id);

  if (summary.total === 0) {
    return (
      <div className="sheet px-6 py-12 text-center">
        <p className="mb-2 font-serif text-lg font-bold">还没有错题</p>
        <p className="mx-auto mb-6 max-w-sm text-sm text-ink-soft">
          做题交卷后，被判错的题会自动记在这里，并统计每道题错了几次。没有作答的题不算错题。
        </p>
        <Link href="/practice" className="btn btn-primary">
          去做题
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink-soft">
        一共做错过 <b className="font-mono text-base text-pen">{summary.total}</b> 道题，分布在{" "}
        {summary.topics.reduce((n, t) => n + t.chapters.length, 0)} 个章节。
      </p>
      {summary.topics.map((topic) => (
        <section key={topic.prefix} className="rise">
          <h2 className="mb-3 flex items-baseline gap-3 border-b border-ink pb-2 font-serif text-lg font-bold">
            <span className="stamp">{topic.prefix}</span>
            {topic.title}
            <span className="ml-auto font-mono text-sm font-normal text-pen">
              {topic.wrongQuestions} 道
            </span>
          </h2>
          <ul className="sheet divide-y divide-rule">
            {topic.chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  href={`/mistakes/${chapter.id}`}
                  className="flex min-h-12 items-center gap-3 px-4 py-3 hover:bg-paper sm:px-6"
                >
                  <span className="stamp shrink-0">{chapter.id}</span>
                  <span className="min-w-0 flex-1 truncate">{chapter.title}</span>
                  <span className="tag tag-pen shrink-0">{chapter.wrongQuestions} 道错题</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function MistakesPage() {
  return (
    <>
      <p className="eyebrow mb-2">错题</p>
      <h1 className="title mb-8">做错过的题</h1>
      <Suspense fallback={<PageLoading />}>
        <Summary />
      </Suspense>
    </>
  );
}
