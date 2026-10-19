import type { Bank, Question } from "@/server/content/types";

const citations = [{ label: "原文§示例", url: "https://example.com/a.html#s" }];

function single(id: string, chapterId: string, correct: string): Question {
  return {
    id,
    chapterId,
    section: null,
    type: "single",
    stem: `${id} 单选题干`,
    options: ["A", "B", "C", "D"].map((key) => ({
      key,
      text: `${id} 选项 ${key}`,
      correct: key === correct,
    })),
    referenceAnswer: `${id} 的参考答案。`,
    citations,
  };
}

function multiple(id: string, chapterId: string, correct: string[]): Question {
  return {
    id,
    chapterId,
    section: "补充考点",
    type: "multiple",
    stem: `${id} 多选题干`,
    options: ["A", "B", "C", "D"].map((key) => ({
      key,
      text: `${id} 选项 ${key}`,
      correct: correct.includes(key),
    })),
    referenceAnswer: `${id} 的参考答案。`,
    citations,
  };
}

function short(id: string, chapterId: string): Question {
  return {
    id,
    chapterId,
    section: null,
    type: "short",
    stem: `${id} 简答题干`,
    referenceAnswer: `${id} 的参考答案。`,
    citations,
  };
}

/**
 * 测试用的小题库：两个专题、三个章节。
 * X1 含三种题型各若干；X2 只有选择题；Y1 属于另一个专题和专栏。
 */
export const fixtureBank: Bank = {
  builtAt: "2026-01-01T00:00:00Z",
  topics: [
    { prefix: "X", slug: "topic-x", title: "专题甲", column: "专栏一", order: 1 },
    { prefix: "Y", slug: "topic-y", title: "专题乙", column: "专栏二", order: 2 },
    { prefix: "Z", slug: "topic-z", title: "尚无章节的专题", column: "专栏二", order: 3 },
  ],
  guides: [{ slug: "guide-x", title: "示例资料", markdown: "# 示例资料\n\n## 第一节 {#one}\n\n正文。\n" }],
  chapters: [
    {
      id: "X1",
      topicPrefix: "X",
      number: 1,
      title: "第一章",
      sourceTitle: "第一篇",
      sourceUrl: "https://example.com/a.html",
      questionIds: ["X1-1", "X1-2", "X1-3", "X1-4", "X1-5"],
    },
    {
      id: "X2",
      topicPrefix: "X",
      number: 2,
      title: "第二章",
      sourceTitle: "第二篇",
      sourceUrl: "https://example.com/b.html",
      questionIds: ["X2-1", "X2-2"],
    },
    {
      id: "Y1",
      topicPrefix: "Y",
      number: 1,
      title: "乙的第一章",
      sourceTitle: "第三篇",
      sourceUrl: "https://example.com/c.html",
      questionIds: ["Y1-1"],
    },
  ],
  questions: [
    single("X1-1", "X1", "B"),
    multiple("X1-2", "X1", ["A", "C"]),
    short("X1-3", "X1"),
    short("X1-4", "X1"),
    single("X1-5", "X1", "D"),
    single("X2-1", "X2", "A"),
    multiple("X2-2", "X2", ["B", "C", "D"]),
    single("Y1-1", "Y1", "C"),
  ],
};
