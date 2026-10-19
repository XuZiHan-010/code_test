import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { getCatalog } from "@/server/content/catalog";
import type { QuestionWithAnswer } from "@/server/content/types";
import { getDb, type DbOrTx } from "@/server/db/client";
import { questionStats } from "@/server/db/schema";
import { getMembership } from "@/server/notebook/service";

// “错题”就是累计错误次数至少为 1 的题。规则见 data-model.md 的 question_stats。

export interface MistakeItem extends QuestionWithAnswer {
  /** 这道题出自哪篇原文 */
  source: { title: string; url: string } | null;
  wrongCount: number;
  /** 最近一次的判定：后来答对了也仍然留在错题里 */
  lastVerdict: "correct" | "incorrect";
  inNotebook: boolean;
}

export interface MistakeSummary {
  /** 错题总数 */
  total: number;
  topics: {
    prefix: string;
    slug: string;
    title: string;
    wrongQuestions: number;
    chapters: { id: string; title: string; wrongQuestions: number }[];
  }[];
}

/**
 * 记下一批判定。只接受答对和答错：未作答和待评分的题不产生也不更新记录。
 * 错误次数只增不减，后来答对只更新“最近一次判定”。
 */
export async function recordVerdicts(
  db: DbOrTx,
  userId: string,
  items: { questionId: string; verdict: "correct" | "incorrect" }[],
  now: Date,
): Promise<void> {
  if (items.length === 0) return;
  await db
    .insert(questionStats)
    .values(
      items.map((item) => ({
        userId,
        questionId: item.questionId,
        wrongCount: item.verdict === "incorrect" ? 1 : 0,
        attemptCount: 1,
        lastVerdict: item.verdict,
        lastAnsweredAt: now,
      })),
    )
    .onConflictDoUpdate({
      target: [questionStats.userId, questionStats.questionId],
      set: {
        wrongCount: sql`${questionStats.wrongCount} + excluded.wrong_count`,
        attemptCount: sql`${questionStats.attemptCount} + 1`,
        lastVerdict: sql`excluded.last_verdict`,
        lastAnsweredAt: sql`excluded.last_answered_at`,
      },
    });
}

/** 给定题号的累计错误次数；没有记录的题不在结果里 */
export async function getWrongCounts(
  userId: string,
  questionIds: string[],
): Promise<Map<string, number>> {
  if (questionIds.length === 0) return new Map();
  const rows = await getDb()
    .select({ questionId: questionStats.questionId, wrongCount: questionStats.wrongCount })
    .from(questionStats)
    .where(and(eq(questionStats.userId, userId), inArray(questionStats.questionId, questionIds)));
  return new Map(rows.map((row) => [row.questionId, row.wrongCount]));
}

/**
 * 某一章里该用户做错过的题，带题目、正确答案和解答。
 * sort 为 order 时按题库顺序，为 wrong 时按错误次数从多到少。
 */
export async function listChapterMistakes(
  userId: string,
  chapterId: string,
  sort: "order" | "wrong",
): Promise<MistakeItem[]> {
  const chapter = getCatalog().getChapter(chapterId);
  if (!chapter) return [];

  const rows = await getDb()
    .select({
      questionId: questionStats.questionId,
      wrongCount: questionStats.wrongCount,
      lastVerdict: questionStats.lastVerdict,
    })
    .from(questionStats)
    .where(
      and(
        eq(questionStats.userId, userId),
        inArray(questionStats.questionId, chapter.questionIds),
        gte(questionStats.wrongCount, 1),
      ),
    );
  const stats = new Map(rows.map((row) => [row.questionId, row]));
  const wrongIds = chapter.questionIds.filter((id) => stats.has(id));
  const inNotebook = await getMembership(userId, wrongIds);

  const items: MistakeItem[] = getCatalog()
    .getWithAnswer(wrongIds)
    .map((question) => {
      const stat = stats.get(question.id)!;
      return {
        ...question,
        source: getCatalog().getSource(question.id),
        wrongCount: stat.wrongCount,
        lastVerdict: stat.lastVerdict === "correct" ? "correct" : "incorrect",
        inNotebook: inNotebook.has(question.id),
      };
    });

  if (sort === "wrong") {
    // sort 是稳定的，错误次数相同的题保持题库顺序
    items.sort((a, b) => b.wrongCount - a.wrongCount);
  }
  return items;
}

/** 按专题和章节汇总错题数量。没有错题的专题和章节不出现。 */
export async function getMistakeSummary(userId: string): Promise<MistakeSummary> {
  const rows = await getDb()
    .select({ questionId: questionStats.questionId })
    .from(questionStats)
    .where(and(eq(questionStats.userId, userId), gte(questionStats.wrongCount, 1)));

  const catalog = getCatalog();
  const perChapter = new Map<string, number>();
  for (const row of rows) {
    const location = catalog.locate(row.questionId);
    if (!location) continue;
    perChapter.set(location.chapter.id, (perChapter.get(location.chapter.id) ?? 0) + 1);
  }

  const summary: MistakeSummary = { total: 0, topics: [] };
  for (const column of catalog.listColumns()) {
    for (const topic of column.topics) {
      const chapters = catalog
        .listChapters(topic.prefix)
        .filter((chapter) => perChapter.has(chapter.id))
        .map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          wrongQuestions: perChapter.get(chapter.id)!,
        }));
      if (chapters.length === 0) continue;
      const wrongQuestions = chapters.reduce((n, c) => n + c.wrongQuestions, 0);
      summary.total += wrongQuestions;
      summary.topics.push({
        prefix: topic.prefix,
        slug: topic.slug,
        title: topic.title,
        wrongQuestions,
        chapters,
      });
    }
  }
  return summary;
}
