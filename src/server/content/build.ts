import type { Bank, Chapter, Question, QuestionType } from "./types";
import {
  validateContent,
  type ContentInput,
  type ContentIssue,
} from "./validator";

export interface BuildResult {
  /** 有错误时为 null */
  bank: Bank | null;
  errors: ContentIssue[];
  warnings: ContentIssue[];
}

/**
 * 把 Markdown 知识点和题型数据合并成运行时数据。
 * 只有状态为 approved 的章节进入结果（includeDrafts 为 true 时例外）；调用前应已通过 validateContent。
 */
export function mergeBank(input: ContentInput, builtAt: string): Bank {
  const chapters: Chapter[] = [];
  const questions: Question[] = [];
  const typedByPrefix = new Map(input.typed.map((f) => [f.prefix, f]));

  for (const parsedTopic of input.parsed) {
    const typedFile = typedByPrefix.get(parsedTopic.prefix);
    if (!typedFile) continue;

    for (const parsedChapter of parsedTopic.chapters) {
      const typedChapter = typedFile.chapters[parsedChapter.id];
      if (!typedChapter) continue;
      if (typedChapter.status !== "approved" && !input.includeDrafts) continue;

      const typedById = new Map(typedChapter.questions.map((q) => [q.id, q]));
      chapters.push({
        id: parsedChapter.id,
        topicPrefix: parsedTopic.prefix,
        number: parsedChapter.number,
        title: parsedChapter.title,
        sourceTitle: parsedChapter.sourceTitle,
        sourceUrl: parsedChapter.sourceUrl,
        questionIds: parsedChapter.questionIds,
      });

      // 呈现顺序始终取自 Markdown
      for (const point of parsedTopic.points) {
        if (point.chapterId !== parsedChapter.id) continue;
        const typed = typedById.get(point.id);
        if (!typed) continue;
        const type = typed.type as QuestionType;
        questions.push({
          id: point.id,
          chapterId: point.chapterId,
          section: point.section,
          type,
          stem: typed.stem?.trim() || point.stem,
          ...(type === "fill" ? { blankCount: typed.blankCount, blankOrder: typed.blankOrder } : {}),
          ...(type === "short" || type === "fill" || type === "code"
            ? {}
            : { options: (typed.options ?? []).map((o) => ({ ...o, text: o.text.trim() })) }),
          referenceAnswer: point.referenceAnswer,
          citations: point.citations,
        });
      }
    }
  }

  const topics = [...input.topics].sort((a, b) => a.order - b.order);
  return { builtAt, topics, guides: [...(input.guides ?? [])], chapters, questions };
}

export function buildBank(input: ContentInput, builtAt: string): BuildResult {
  const { errors, warnings } = validateContent(input);
  if (errors.length > 0) return { bank: null, errors, warnings };
  return { bank: mergeBank(input, builtAt), errors, warnings };
}
