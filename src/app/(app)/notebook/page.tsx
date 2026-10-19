import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NotebookToggle } from "@/components/NotebookToggle";
import { PageLoading } from "@/components/PageLoading";
import { StartAttemptButton } from "@/components/StartAttemptButton";
import { QUESTION_TYPE_LABEL } from "@/lib/labels";
import { findInProgress } from "@/server/attempts/service";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { listItems } from "@/server/notebook/service";

export const metadata: Metadata = { title: "错题本" };

async function Notebook() {
  const user = await requireUserOrRedirect();
  const [items, inProgress] = await Promise.all([
    listItems(user.id),
    findInProgress(user.id, { type: "notebook" }),
  ]);

  if (items.length === 0 && !inProgress) {
    return (
      <div className="sheet px-6 py-12 text-center">
        <p className="mb-2 font-head text-lg font-bold">错题本还是空的</p>
        <p className="mx-auto mb-2 max-w-md text-sm leading-7 text-ink-soft">
          错题本里的题由你自己挑选。在答题页、交卷后的结果页，或者每章的错题列表里，点题目旁边的
          <span className="mx-1 border border-rule px-1.5 py-0.5 text-xs">☆ 加入错题本</span>
          就能把它收进来。
        </p>
        <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-ink-soft">
          做对但没把握的题也可以加。收进来的题可以单独拿出来反复练。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/practice" className="btn btn-primary">
            去做题
          </Link>
          <Link href="/mistakes" className="btn">
            看看做错过的题
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          共 <b className="font-mono text-base text-ink">{items.length}</b> 道题
          {inProgress && <span className="ml-3 text-wait">有一次练习还没做完</span>}
        </p>
        {inProgress ? (
          <StartAttemptButton scope={{ scope: "notebook" }} label="继续练习" />
        ) : (
          <StartAttemptButton scope={{ scope: "notebook" }} label="开始练习" />
        )}
      </div>
      {inProgress && (
        <p className="text-xs text-ink-faint">
          正在进行的这次练习，题目在开始时已经固定；现在增删错题本，从下一次练习起生效。
        </p>
      )}

      {items.length === 0 ? (
        <p className="sheet px-6 py-10 text-center text-sm text-ink-soft">
          错题本里现在没有题目了。
        </p>
      ) : (
        <ol className="sheet divide-y divide-rule">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap items-start gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 basis-64">
                <p className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="stamp">{item.id}</span>
                  <span className="tag tag-plain">{QUESTION_TYPE_LABEL[item.type]}</span>
                  {item.wrongCount > 0 ? (
                    <span className="tag tag-pen">错 {item.wrongCount} 次</span>
                  ) : (
                    <span className="tag tag-plain">没有错过</span>
                  )}
                </p>
                <p className="font-head leading-7 font-bold">{item.stem}</p>
                <p className="mt-1 text-xs text-ink-faint">
                  <Link href={`/practice/${item.topic.slug}`} className="hover:text-ink hover:underline">
                    {item.topic.title}
                  </Link>
                  <span className="mx-1.5">/</span>
                  {item.chapter.id} {item.chapter.title}
                </p>
              </div>
              <NotebookToggle questionId={item.id} initial refreshOnChange />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function NotebookPage() {
  return (
    <>
      <p className="eyebrow mb-2">错题本</p>
      <h1 className="title mb-8">我挑出来的题</h1>
      <Suspense fallback={<PageLoading />}>
        <Notebook />
      </Suspense>
    </>
  );
}
