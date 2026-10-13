import { and, asc, eq, inArray } from "drizzle-orm";
import { getCatalog } from "@/server/content/catalog";
import type { QuestionType } from "@/server/content/types";
import { getDb } from "@/server/db/client";
import { notebookItems, questionStats } from "@/server/db/schema";
import { AppError } from "@/server/errors";

// 错题本是用户自己手动挑选的题集，每个用户一个。系统不会自动往里加题。

export interface NotebookItem {
  id: string;
  type: QuestionType;
  stem: string;
  topic: { prefix: string; slug: string; title: string };
  chapter: { id: string; title: string };
  wrongCount: number;
  addedAt: string;
}

/** 加入错题本。任何存在的题都可以加，不要求做错过；已经在里面时什么都不做。 */
export async function addItem(
  userId: string,
  questionId: string,
  now: Date = new Date(),
): Promise<void> {
  if (!getCatalog().hasQuestion(questionId)) {
    throw new AppError("question_not_found", "没有找到这道题", 404);
  }
  await getDb()
    .insert(notebookItems)
    .values({ userId, questionId, addedAt: now })
    .onConflictDoNothing();
}

/** 移出错题本。只删这一条，不影响这道题的错误次数；本来就不在里面时什么都不做。 */
export async function removeItem(userId: string, questionId: string): Promise<void> {
  await getDb()
    .delete(notebookItems)
    .where(and(eq(notebookItems.userId, userId), eq(notebookItems.questionId, questionId)));
}

/** 错题本里现有的题号，按加入的先后。已从题库下架的题不在其中。 */
export async function listItemIds(userId: string): Promise<string[]> {
  const rows = await getDb()
    .select({ questionId: notebookItems.questionId })
    .from(notebookItems)
    .where(eq(notebookItems.userId, userId))
    .orderBy(asc(notebookItems.addedAt), asc(notebookItems.questionId));
  const catalog = getCatalog();
  return rows.map((row) => row.questionId).filter((id) => catalog.hasQuestion(id));
}

/** 错题本的全部题目，带所属专题、章节和累计错误次数，按加入的先后。 */
export async function listItems(userId: string): Promise<NotebookItem[]> {
  const rows = await getDb()
    .select({
      questionId: notebookItems.questionId,
      addedAt: notebookItems.addedAt,
      wrongCount: questionStats.wrongCount,
    })
    .from(notebookItems)
    .leftJoin(
      questionStats,
      and(
        eq(questionStats.userId, notebookItems.userId),
        eq(questionStats.questionId, notebookItems.questionId),
      ),
    )
    .where(eq(notebookItems.userId, userId))
    .orderBy(asc(notebookItems.addedAt), asc(notebookItems.questionId));

  const catalog = getCatalog();
  const items: NotebookItem[] = [];
  for (const row of rows) {
    const [question] = catalog.getForAnswering([row.questionId]);
    const location = catalog.locate(row.questionId);
    if (!question || !location) continue;
    items.push({
      id: question.id,
      type: question.type,
      stem: question.stem,
      topic: {
        prefix: location.topic.prefix,
        slug: location.topic.slug,
        title: location.topic.title,
      },
      chapter: { id: location.chapter.id, title: location.chapter.title },
      wrongCount: row.wrongCount ?? 0,
      addedAt: row.addedAt.toISOString(),
    });
  }
  return items;
}

/** 给定的题号里，哪些已经在该用户的错题本中 */
export async function getMembership(userId: string, questionIds: string[]): Promise<Set<string>> {
  if (questionIds.length === 0) return new Set();
  const rows = await getDb()
    .select({ questionId: notebookItems.questionId })
    .from(notebookItems)
    .where(and(eq(notebookItems.userId, userId), inArray(notebookItems.questionId, questionIds)));
  return new Set(rows.map((row) => row.questionId));
}
