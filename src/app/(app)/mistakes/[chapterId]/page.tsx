import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NotebookToggle } from "@/components/NotebookToggle";
import { PageLoading } from "@/components/PageLoading";
import { ResultQuestion } from "@/components/result/ResultQuestion";
import { SourceNotice } from "@/components/result/SourceNotice";
import { StartAttemptButton } from "@/components/StartAttemptButton";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";
import { listChapterMistakes } from "@/server/mistakes/service";

export const metadata: Metadata = { title: "本章错题" };

type Props = PageProps<"/mistakes/[chapterId]">;

async function ChapterMistakes({ params, searchParams }: Pick<Props, "params" | "searchParams">) {
  const user = await requireUserOrRedirect();
  const { chapterId } = await params;
  const sort = (await searchParams).sort === "wrong" ? "wrong" : "order";

  const catalog = getCatalog();
  const chapter = catalog.getChapter(chapterId);
  const topic = chapter && catalog.getTopic(chapter.topicPrefix);
  if (!chapter || !topic) notFound();

  const items = await listChapterMistakes(user.id, chapter.id, sort);
  const sortLink = (value: "order" | "wrong", label: string) =>
    sort === value ? (
      <span className="font-bold text-ink">{label}</span>
    ) : (
      <Link href={`/mistakes/${chapter.id}${value === "wrong" ? "?sort=wrong" : ""}`} className="link">
        {label}
      </Link>
    );

  return (
    <div className="rise space-y-6">
      <header>
        <p className="eyebrow mb-2">
          <Link href="/mistakes" className="hover:text-ink">
            错题
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/practice/${topic.slug}`} className="hover:text-ink">
            {topic.title}
          </Link>
        </p>
        <h1 className="title flex flex-wrap items-center gap-3">
          <span className="stamp">{chapter.id}</span>
          {chapter.title}
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="sheet px-6 py-12 text-center text-sm text-ink-soft">
          这一章还没有做错过的题。
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-ink-soft">
              共 <b className="font-mono text-pen">{items.length}</b> 道错题
              <span className="mx-3 text-rule">|</span>
              排序：{sortLink("order", "按题库顺序")}
              <span className="mx-2 text-rule">·</span>
              {sortLink("wrong", "错得多的在前")}
            </p>
            <StartAttemptButton
              scope={{ scope: "chapter", chapterId: chapter.id }}
              label="重做这一章"
              className="btn"
            />
          </div>

          <ol className="space-y-4">
            {items.map((item) => (
              <li key={item.id}>
                {/* 默认收起，只看题干和错误次数；展开后是完整的题目、正确答案和解答 */}
                <details className="group">
                  <summary className="sheet flex cursor-pointer list-none flex-wrap items-center gap-2 px-5 py-4 group-open:rounded-b-none group-open:border-b-0 sm:px-6">
                    <span className="stamp">{item.id}</span>
                    <span className="tag tag-pen">错 {item.wrongCount} 次</span>
                    <span className={`tag ${item.lastVerdict === "correct" ? "tag-pass" : "tag-plain"}`}>
                      最近一次{item.lastVerdict === "correct" ? "答对" : "答错"}
                    </span>
                    <span className="ml-auto text-xs text-ink-faint group-open:hidden">展开看解答</span>
                    <span className="ml-auto hidden text-xs text-ink-faint group-open:inline">收起</span>
                    <span className="mt-1 w-full font-serif leading-7 font-bold">{item.stem}</span>
                  </summary>
                  <ResultQuestion
                    question={item}
                    actions={<NotebookToggle questionId={item.id} initial={item.inNotebook} />}
                  />
                </details>
              </li>
            ))}
          </ol>
          <SourceNotice />
        </>
      )}
    </div>
  );
}

export default function ChapterMistakesPage(props: Props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <ChapterMistakes params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
