import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { StartAttemptButton } from "@/components/StartAttemptButton";
import { accuracyPercent } from "@/lib/labels";
import { getChapterProgress, type ChapterProgress } from "@/server/attempts/progress";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { getCatalog } from "@/server/content/catalog";
import { getMistakeSummary } from "@/server/mistakes/service";

const STATUS = {
  not_started: { label: "未开始", tag: "tag-plain", action: "开始" },
  in_progress: { label: "进行中", tag: "tag-wait", action: "继续" },
  completed: { label: "已完成", tag: "tag-pass", action: "重做" },
} as const;

function Scores({ progress }: { progress: ChapterProgress }) {
  if (!progress.last || !progress.best) return null;
  return (
    <span className="font-mono text-xs text-ink-soft">
      最近 {accuracyPercent(progress.last.correct, progress.last.total)}% · 最高{" "}
      {accuracyPercent(progress.best.correct, progress.best.total)}%
    </span>
  );
}

async function ChapterList({ params }: { params: Promise<{ topic: string }> }) {
  const user = await requireUserOrRedirect();
  const { topic: slug } = await params;
  const catalog = getCatalog();
  const topic = catalog.getTopicBySlug(slug);
  const chapters = topic ? catalog.listChapters(topic.prefix) : [];
  if (!topic || chapters.length === 0) notFound();

  const [progress, mistakes] = await Promise.all([
    getChapterProgress(user.id, topic.prefix),
    getMistakeSummary(user.id),
  ]);
  const wrongByChapter = new Map(
    mistakes.topics.flatMap((t) => t.chapters.map((c) => [c.id, c.wrongQuestions] as const)),
  );

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
        {chapters.map((chapter) => {
          const state = progress.get(chapter.id)!;
          const status = STATUS[state.status];
          const wrong = wrongByChapter.get(chapter.id) ?? 0;
          return (
            <li key={chapter.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
              <span className="stamp shrink-0">{chapter.id}</span>
              <div className="min-w-0 flex-1 basis-56">
                <h2 className="font-serif text-base font-bold">{chapter.title}</h2>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                  <span className={`tag ${status.tag}`}>{status.label}</span>
                  <span>{chapter.questionIds.length} 题</span>
                  <Scores progress={state} />
                </p>
                <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {chapter.sourceUrl && (
                    <a
                      href={chapter.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      title={chapter.sourceTitle ?? undefined}
                    >
                      读原文
                    </a>
                  )}
                  {state.latestSubmittedAttemptId && (
                    <Link href={`/attempts/${state.latestSubmittedAttemptId}/result`} className="link">
                      最近一次结果
                    </Link>
                  )}
                  {wrong > 0 && (
                    <Link href={`/mistakes/${chapter.id}`} className="link text-pen decoration-pen-soft">
                      本章错题 {wrong}
                    </Link>
                  )}
                </p>
              </div>
              <StartAttemptButton
                scope={{ scope: "chapter", chapterId: chapter.id }}
                label={status.action}
                className={state.status === "completed" ? "btn" : "btn btn-primary"}
              />
            </li>
          );
        })}
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
