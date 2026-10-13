import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { StartAttemptButton } from "@/components/StartAttemptButton";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";

async function ChapterList({ params }: { params: Promise<{ topic: string }> }) {
  await requireUserOrRedirect();
  const { topic: slug } = await params;
  const catalog = getCatalog();
  const topic = catalog.getTopicBySlug(slug);
  const chapters = topic ? catalog.listChapters(topic.prefix) : [];
  if (!topic || chapters.length === 0) notFound();

  return (
    <div className="rise">
      <p className="eyebrow mb-2">
        <Link href="/practice" className="hover:text-ink">
          做题模式
        </Link>
        <span className="mx-2">/</span>
        {topic.column}
      </p>
      <h1 className="title mb-8">{topic.title}</h1>

      <ol className="sheet divide-y divide-rule">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
            <span className="stamp shrink-0">{chapter.id}</span>
            <div className="min-w-0 flex-1 basis-56">
              <h2 className="font-serif text-base font-bold">{chapter.title}</h2>
              <p className="mt-0.5 text-sm text-ink-soft">
                {chapter.questionIds.length} 题
                {chapter.sourceUrl && (
                  <>
                    <span className="mx-2 text-rule">|</span>
                    <a
                      href={chapter.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      title={chapter.sourceTitle ?? undefined}
                    >
                      读原文
                    </a>
                  </>
                )}
              </p>
            </div>
            <StartAttemptButton scope={{ scope: "chapter", chapterId: chapter.id }} label="开始" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function TopicPage(props: PageProps<"/practice/[topic]">) {
  return (
    <Suspense fallback={<PageLoading />}>
      <ChapterList params={props.params} />
    </Suspense>
  );
}
