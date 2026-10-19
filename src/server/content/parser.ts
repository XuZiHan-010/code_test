import type {
  Citation,
  KnowledgePoint,
  ParsedChapter,
  ParsedTopic,
} from "./types";

export class ContentParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentParseError";
  }
}

const CHAPTER_HEADING = /^##\s+(\d+)\.\s+(.+?)\s*$/;
const SECTION_HEADING = /^###\s+(.+?)\s*$/;
const ITEM_LINE = /^-\s+\*\*([A-Z]+)(\d+)-(\d+)\*\*\s+(.*)$/;
// 链接除 http(s) 外，还接受站内复习资料 /guides/<slug>（可带 #锚点）
const LINK_URL = String.raw`(https?:\/\/[^\s)]+|\/guides\/[^\s)]+)`;
const SOURCE_LINE = new RegExp(String.raw`^原文：\[(.+)\]\(${LINK_URL}\)。?\s*$`);
const TRAILING_CITATION = new RegExp(String.raw`\s*\[([^\]]+)\]\(${LINK_URL}\)\s*$`);

interface RawItem {
  id: string;
  chapterNumber: number;
  section: string | null;
  text: string;
}

interface RawChapter {
  number: number;
  title: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
}

interface RawFile {
  chapters: RawChapter[];
  items: RawItem[];
}

function parseFile(markdown: string, prefix: string, label: string): RawFile {
  const chapters: RawChapter[] = [];
  const items: RawItem[] = [];
  let chapter: RawChapter | null = null;
  let section: string | null = null;
  let current = null as RawItem | null;

  const lines = markdown.replace(/^﻿/, "").split(/\r?\n/);
  lines.forEach((line, index) => {
    const where = `${label} 第 ${index + 1} 行`;

    // 题号行之后缩进两个空格的行和其间的空行，属于同一题（代码题的多行答案）
    if (current && (line.startsWith("  ") || line.trim() === "")) {
      current.text += `\n${line.startsWith("  ") ? line.slice(2) : ""}`;
      return;
    }

    const chapterMatch = CHAPTER_HEADING.exec(line);
    if (chapterMatch) {
      chapter = {
        number: Number(chapterMatch[1]),
        title: chapterMatch[2],
        sourceTitle: null,
        sourceUrl: null,
      };
      chapters.push(chapter);
      section = null;
      current = null;
      return;
    }

    const sectionMatch = SECTION_HEADING.exec(line);
    if (sectionMatch) {
      section = sectionMatch[1];
      current = null;
      return;
    }

    const sourceMatch = SOURCE_LINE.exec(line);
    if (sourceMatch && chapter) {
      chapter.sourceTitle = sourceMatch[1];
      chapter.sourceUrl = sourceMatch[2];
      return;
    }

    const itemMatch = ITEM_LINE.exec(line);
    if (!itemMatch) return;

    const [, itemPrefix, group, seq, text] = itemMatch;
    const id = `${itemPrefix}${group}-${seq}`;
    if (!chapter) {
      throw new ContentParseError(`${where}：题目 ${id} 出现在任何章节之前`);
    }
    if (itemPrefix !== prefix) {
      throw new ContentParseError(
        `${where}：题目 ${id} 的前缀不是本专题的 ${prefix}`,
      );
    }
    if (Number(group) !== chapter.number) {
      throw new ContentParseError(
        `${where}：题目 ${id} 不属于所在的第 ${chapter.number} 章`,
      );
    }
    current = { id, chapterNumber: chapter.number, section, text };
    items.push(current);
  });

  return { chapters, items };
}

function splitCitations(text: string): { body: string; citations: Citation[] } {
  const citations: Citation[] = [];
  let body = text;
  for (;;) {
    const match = TRAILING_CITATION.exec(body);
    if (!match) break;
    citations.unshift({ label: match[1], url: match[2] });
    body = body.slice(0, match.index);
  }
  return { body: body.trim(), citations };
}

/**
 * 把一个专题的题卷和答案两份 Markdown 解析成章节和知识点。
 * 题卷和答案的题号集合、顺序必须完全一致，否则抛出 ContentParseError。
 */
export function parseTopic(
  prefix: string,
  questionsMarkdown: string,
  answersMarkdown: string,
): ParsedTopic {
  const questions = parseFile(questionsMarkdown, prefix, "题卷");
  const answers = parseFile(answersMarkdown, prefix, "答案");

  if (questions.items.length !== answers.items.length) {
    throw new ContentParseError(
      `专题 ${prefix}：题卷有 ${questions.items.length} 题，答案有 ${answers.items.length} 条，数量不一致`,
    );
  }

  const seen = new Set<string>();
  const points: KnowledgePoint[] = questions.items.map((question, index) => {
    const answer = answers.items[index];
    if (answer.id !== question.id) {
      throw new ContentParseError(
        `专题 ${prefix}：第 ${index + 1} 题题卷是 ${question.id}，答案是 ${answer.id}，题号或顺序不一致`,
      );
    }
    if (seen.has(question.id)) {
      throw new ContentParseError(`专题 ${prefix}：题号 ${question.id} 重复`);
    }
    seen.add(question.id);

    const { body, citations } = splitCitations(answer.text);
    return {
      id: question.id,
      chapterId: `${prefix}${question.chapterNumber}`,
      section: question.section,
      stem: question.text.trim(),
      referenceAnswer: body,
      citations,
    };
  });

  const answerChapters = new Map(answers.chapters.map((c) => [c.number, c]));
  const chapters: ParsedChapter[] = questions.chapters.map((chapter) => {
    const fromAnswers = answerChapters.get(chapter.number);
    const id = `${prefix}${chapter.number}`;
    return {
      id,
      number: chapter.number,
      title: chapter.title,
      sourceTitle: fromAnswers?.sourceTitle ?? chapter.sourceTitle,
      sourceUrl: fromAnswers?.sourceUrl ?? chapter.sourceUrl,
      questionIds: points.filter((p) => p.chapterId === id).map((p) => p.id),
    };
  });

  return { prefix, chapters, points };
}
