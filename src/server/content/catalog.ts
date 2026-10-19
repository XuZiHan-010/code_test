import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  QUESTION_TYPES,
  type Bank,
  type Chapter,
  type Guide,
  type Question,
  type QuestionForAnswering,
  type QuestionWithAnswer,
  type Topic,
} from "./types";

const bankSchema = z.object({
  builtAt: z.string(),
  topics: z.array(
    z.object({
      prefix: z.string(),
      slug: z.string(),
      title: z.string(),
      column: z.string(),
      order: z.number(),
      guide: z.string().optional(),
    }),
  ),
  // 旧版 bank.json 没有这个字段
  guides: z
    .array(z.object({ slug: z.string(), title: z.string(), markdown: z.string() }))
    .default([]),
  chapters: z.array(
    z.object({
      id: z.string(),
      topicPrefix: z.string(),
      number: z.number(),
      title: z.string(),
      sourceTitle: z.string().nullable(),
      sourceUrl: z.string().nullable(),
      questionIds: z.array(z.string()),
    }),
  ),
  questions: z.array(
    z.object({
      id: z.string(),
      chapterId: z.string(),
      section: z.string().nullable(),
      type: z.enum(QUESTION_TYPES),
      stem: z.string(),
      blankCount: z.number().int().min(1).max(20).optional(),
      blankOrder: z.enum(["ordered", "unordered"]).optional(),
      options: z
        .array(z.object({ key: z.string(), text: z.string(), correct: z.boolean() }))
        .optional(),
      referenceAnswer: z.string(),
      citations: z.array(z.object({ label: z.string(), url: z.string() })),
    }),
  ),
});

export interface TopicSummary extends Topic {
  chapterCount: number;
  questionCount: number;
}

export interface ColumnSummary {
  column: string;
  topics: TopicSummary[];
}

/**
 * 运行时的只读题库。题目对外只有两种形态：
 * getForAnswering（交卷前，不含答案）和 getWithAnswer（交卷后及错题、错题本的查看场景）。
 */
export class Catalog {
  private readonly topics: Topic[];
  private readonly topicsByPrefix = new Map<string, Topic>();
  private readonly topicsBySlug = new Map<string, Topic>();
  private readonly chaptersById = new Map<string, Chapter>();
  private readonly chaptersByTopic = new Map<string, Chapter[]>();
  private readonly questionsById = new Map<string, Question>();
  private readonly guidesBySlug = new Map<string, Guide>();

  constructor(bank: Bank) {
    this.topics = [...bank.topics].sort((a, b) => a.order - b.order);
    for (const topic of this.topics) {
      this.topicsByPrefix.set(topic.prefix, topic);
      this.topicsBySlug.set(topic.slug, topic);
      this.chaptersByTopic.set(topic.prefix, []);
    }
    for (const chapter of bank.chapters) {
      this.chaptersById.set(chapter.id, chapter);
      this.chaptersByTopic.get(chapter.topicPrefix)?.push(chapter);
    }
    for (const chapters of this.chaptersByTopic.values()) {
      chapters.sort((a, b) => a.number - b.number);
    }
    for (const question of bank.questions) {
      this.questionsById.set(question.id, question);
    }
    for (const guide of bank.guides) {
      this.guidesBySlug.set(guide.slug, guide);
    }
  }

  /** 按 slug 取复习资料；资料不受章节 draft/approved 状态影响 */
  getGuide(slug: string): Guide | undefined {
    return this.guidesBySlug.get(slug);
  }

  /** 全部复习资料，按 bank.json 中的顺序；同样不受章节状态影响 */
  listGuides(): Guide[] {
    return [...this.guidesBySlug.values()];
  }

  /** 按专栏分组的专题列表。还没有任何可用章节的专题不出现。 */
  listColumns(): ColumnSummary[] {
    const columns: ColumnSummary[] = [];
    for (const topic of this.topics) {
      const chapters = this.listChapters(topic.prefix);
      if (chapters.length === 0) continue;
      const summary: TopicSummary = {
        ...topic,
        chapterCount: chapters.length,
        questionCount: chapters.reduce((n, c) => n + c.questionIds.length, 0),
      };
      const column = columns.find((c) => c.column === topic.column);
      if (column) column.topics.push(summary);
      else columns.push({ column: topic.column, topics: [summary] });
    }
    return columns;
  }

  getTopic(prefix: string): Topic | undefined {
    return this.topicsByPrefix.get(prefix);
  }

  getTopicBySlug(slug: string): Topic | undefined {
    return this.topicsBySlug.get(slug);
  }

  listChapters(topicPrefix: string): Chapter[] {
    return this.chaptersByTopic.get(topicPrefix) ?? [];
  }

  getChapter(chapterId: string): Chapter | undefined {
    return this.chaptersById.get(chapterId);
  }

  hasQuestion(questionId: string): boolean {
    return this.questionsById.has(questionId);
  }

  /** 题目所属的章节和专题；题号不存在时返回 undefined */
  locate(questionId: string): { chapter: Chapter; topic: Topic } | undefined {
    const question = this.questionsById.get(questionId);
    const chapter = question && this.chaptersById.get(question.chapterId);
    const topic = chapter && this.topicsByPrefix.get(chapter.topicPrefix);
    return chapter && topic ? { chapter, topic } : undefined;
  }

  /** 题目所在章节对应的原文（标题和链接）；没有时返回 null */
  getSource(questionId: string): { title: string; url: string } | null {
    const chapter = this.locate(questionId)?.chapter;
    return chapter?.sourceTitle && chapter.sourceUrl
      ? { title: chapter.sourceTitle, url: chapter.sourceUrl }
      : null;
  }

  /** 交卷前的形态。不存在的题号被跳过。 */
  getForAnswering(questionIds: string[]): QuestionForAnswering[] {
    const result: QuestionForAnswering[] = [];
    for (const id of questionIds) {
      const question = this.questionsById.get(id);
      if (!question) continue;
      result.push({
        id: question.id,
        type: question.type,
        stem: question.stem,
        ...(question.type === "fill" ? { blankCount: question.blankCount, blankOrder: question.blankOrder } : {}),
        ...(question.options
          ? { options: question.options.map(({ key, text }) => ({ key, text })) }
          : {}),
      });
    }
    return result;
  }

  /** 含答案和解答的完整形态。不存在的题号被跳过。 */
  getWithAnswer(questionIds: string[]): QuestionWithAnswer[] {
    const result: QuestionWithAnswer[] = [];
    for (const id of questionIds) {
      const question = this.questionsById.get(id);
      if (question) result.push(question);
    }
    return result;
  }
}

export function loadBankFile(filePath: string): Bank {
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch {
    throw new Error(
      `找不到题库数据 ${filePath}。请先运行 npm run content:build。`,
    );
  }
  const result = bankSchema.safeParse(JSON.parse(raw));
  if (!result.success) {
    throw new Error(`题库数据 ${filePath} 格式不符：${result.error.message}`);
  }
  return result.data;
}

const globalForCatalog = globalThis as unknown as {
  __quizCatalog?: Catalog;
  __quizCatalogMtime?: number;
};

/**
 * 进程内共用的题库目录。首次调用时从 content/dist/bank.json 加载。
 * 生产环境只在启动时读一次；开发时题库文件变了（重新运行过 content:build）就重新加载，不必重启服务。
 */
export function getCatalog(): Catalog {
  const filePath =
    process.env.BANK_PATH ?? path.join(process.cwd(), "content", "dist", "bank.json");
  const mtime =
    process.env.NODE_ENV === "development"
      ? statSync(filePath, { throwIfNoEntry: false })?.mtimeMs
      : undefined;
  // 开发时改了这个文件，热更新会换掉 Catalog 这个类，缓存里的旧对象就不再是它的实例，要重新加载
  if (
    !(globalForCatalog.__quizCatalog instanceof Catalog) ||
    (mtime !== undefined && mtime !== globalForCatalog.__quizCatalogMtime)
  ) {
    globalForCatalog.__quizCatalog = new Catalog(loadBankFile(filePath));
    globalForCatalog.__quizCatalogMtime = mtime;
  }
  return globalForCatalog.__quizCatalog;
}

/** 仅供测试：替换进程内的题库目录 */
export function setCatalogForTesting(catalog: Catalog | undefined): void {
  globalForCatalog.__quizCatalog = catalog;
  globalForCatalog.__quizCatalogMtime = undefined;
}
