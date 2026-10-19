export const QUESTION_TYPES = ["single", "multiple", "short", "fill", "code"] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];
export type BlankOrder = "ordered" | "unordered";

export interface Citation {
  label: string;
  url: string;
}

export interface Topic {
  /** 题号前缀字母，如 "B" */
  prefix: string;
  /** Markdown 和 typed 文件的文件名（不含扩展名） */
  slug: string;
  title: string;
  /** 所属专栏 */
  column: string;
  order: number;
  /** 专题的复习资料（content/guides/<guide>.md）；专题页会给出入口 */
  guide?: string;
}

export interface Chapter {
  /** 前缀 + 题组号，如 "B1" */
  id: string;
  topicPrefix: string;
  number: number;
  title: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  /** 按题库原顺序 */
  questionIds: string[];
}

export interface QuestionOption {
  key: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  chapterId: string;
  section: string | null;
  type: QuestionType;
  stem: string;
  /** 仅选择题 */
  options?: QuestionOption[];
  blankCount?: number;
  blankOrder?: BlankOrder;
  referenceAnswer: string;
  citations: Citation[];
}

/** 解析器输出：题库里原有的一对题干和参考答案 */
export interface KnowledgePoint {
  id: string;
  chapterId: string;
  section: string | null;
  stem: string;
  referenceAnswer: string;
  citations: Citation[];
}

export interface ParsedChapter {
  id: string;
  number: number;
  title: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  questionIds: string[];
}

export interface ParsedTopic {
  prefix: string;
  chapters: ParsedChapter[];
  points: KnowledgePoint[];
}

/** 交卷前给用户看的形态：不含任何能推出答案的字段 */
export interface QuestionForAnswering {
  id: string;
  type: QuestionType;
  stem: string;
  options?: { key: string; text: string }[];
  blankCount?: number;
  blankOrder?: BlankOrder;
}

/** 交卷后、错题列表和错题本里给用户看的形态 */
export type QuestionWithAnswer = Question;

/** 站内的复习资料：没有外部原文的专题以它作为出处，页面是 /guides/<slug> */
export interface Guide {
  slug: string;
  title: string;
  markdown: string;
}

export interface Bank {
  builtAt: string;
  topics: Topic[];
  guides: Guide[];
  chapters: Chapter[];
  questions: Question[];
}
