import { and, eq, inArray } from "drizzle-orm";
import { getCatalog } from "@/server/content/catalog";
import { getDb } from "@/server/db/client";
import { attempts } from "@/server/db/schema";

// 这些状态都不单独存储，由作答记录推导。见 data-model.md 第三节。

export interface Score {
  correct: number;
  total: number;
}

export interface ChapterProgress {
  status: "not_started" | "in_progress" | "completed";
  /** 交卷时间最新的那次作答的成绩 */
  last: Score | null;
  /** 所有已交卷作答里正确率最高的成绩 */
  best: Score | null;
  inProgressAttemptId: string | null;
  latestSubmittedAttemptId: string | null;
}

const ratio = (score: Score) => (score.total === 0 ? 0 : score.correct / score.total);

/** 一个专题下每一章的状态和成绩。没有作答记录的章节也在结果里。 */
export async function getChapterProgress(
  userId: string,
  topicPrefix: string,
): Promise<Map<string, ChapterProgress>> {
  const chapterIds = getCatalog()
    .listChapters(topicPrefix)
    .map((chapter) => chapter.id);
  const progress = new Map<string, ChapterProgress>(
    chapterIds.map((id) => [
      id,
      {
        status: "not_started",
        last: null,
        best: null,
        inProgressAttemptId: null,
        latestSubmittedAttemptId: null,
      },
    ]),
  );
  if (chapterIds.length === 0) return progress;

  const rows = await getDb()
    .select({
      id: attempts.id,
      chapterId: attempts.chapterId,
      status: attempts.status,
      correctCount: attempts.correctCount,
      totalCount: attempts.totalCount,
      submittedAt: attempts.submittedAt,
    })
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.scopeType, "chapter"),
        inArray(attempts.chapterId, chapterIds),
        inArray(attempts.status, ["in_progress", "submitted"]),
      ),
    );

  const latestSubmittedAt = new Map<string, number>();
  for (const row of rows) {
    const entry = row.chapterId ? progress.get(row.chapterId) : undefined;
    if (!entry) continue;

    if (row.status === "in_progress") {
      entry.inProgressAttemptId = row.id;
      continue;
    }

    const score: Score = { correct: row.correctCount ?? 0, total: row.totalCount };
    if (!entry.best || ratio(score) > ratio(entry.best)) entry.best = score;

    const submittedAt = row.submittedAt?.getTime() ?? 0;
    if (submittedAt >= (latestSubmittedAt.get(row.chapterId!) ?? -1)) {
      latestSubmittedAt.set(row.chapterId!, submittedAt);
      entry.last = score;
      entry.latestSubmittedAttemptId = row.id;
    }
  }

  for (const entry of progress.values()) {
    if (entry.inProgressAttemptId) entry.status = "in_progress";
    else if (entry.latestSubmittedAttemptId) entry.status = "completed";
  }
  return progress;
}

/**
 * 每个专题完成了几章。至少交过一次卷的章节算已完成，重做期间也算。
 * 只包含题库里有可用章节的专题。
 */
export async function getTopicProgress(
  userId: string,
): Promise<Map<string, { completed: number; total: number }>> {
  const rows = await getDb()
    .selectDistinct({ chapterId: attempts.chapterId })
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.scopeType, "chapter"),
        eq(attempts.status, "submitted"),
      ),
    );
  const done = new Set(rows.map((row) => row.chapterId));

  const catalog = getCatalog();
  const progress = new Map<string, { completed: number; total: number }>();
  for (const column of catalog.listColumns()) {
    for (const topic of column.topics) {
      const chapters = catalog.listChapters(topic.prefix);
      progress.set(topic.prefix, {
        completed: chapters.filter((chapter) => done.has(chapter.id)).length,
        total: chapters.length,
      });
    }
  }
  return progress;
}
