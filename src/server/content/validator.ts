import { guideAnchors, parseGuideUrl } from "./guide";
import type { TypedQuestion, TypedTopicFile } from "./typed-schema";
import { QUESTION_TYPES, type Guide, type ParsedTopic, type Topic } from "./types";

export interface ContentInput {
  topics: Topic[];
  parsed: ParsedTopic[];
  typed: TypedTopicFile[];
  retiredIds: string[];
  /** content/guides/ 下的复习资料；缺省视为没有 */
  guides?: Guide[];
  /** 为 true 时要求每个章节都已通过抽查（V12） */
  requireAll: boolean;
  /** 仅供本地开发：把 draft 章节也放进运行时数据。不得用于上线构建 */
  includeDrafts?: boolean;
}

export interface ContentIssue {
  /** 规则编号，见 specs/001-interview-quiz-system/contracts/content-format.md */
  rule: string;
  /** 题号、章节编号或专题前缀 */
  target: string;
  message: string;
}

export interface ValidationResult {
  errors: ContentIssue[];
  warnings: ContentIssue[];
}

const SKEW_MIN_QUESTIONS = 10;
const SKEW_THRESHOLD = 0.4;
const LENGTH_RATIO_THRESHOLD = 2;

function average(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function checkQuestion(
  question: TypedQuestion,
  errors: ContentIssue[],
  warnings: ContentIssue[],
): void {
  const { id, type } = question;
  const error = (rule: string, message: string) =>
    errors.push({ rule, target: id, message });

  if (!(QUESTION_TYPES as readonly string[]).includes(type)) {
    error("V3", `题型 "${type}" 不是 single、multiple、short、fill、code 之一`);
    return;
  }

  if (type !== "fill" && (question.blankCount !== undefined || question.blankOrder !== undefined)) {
    error("V15", "只有填空题可以设置空数与顺序要求");
  }

  if (type === "short" || type === "fill" || type === "code") {
    if (question.options !== undefined) error("V6", "简答题、填空题和代码题不得有选项");
    if (type === "code" && !question.stem?.trim()) error("V16", "代码题必须有非空题干");
    if (type === "fill") {
      const count = question.blankCount;
      if (typeof count !== "number" || !Number.isInteger(count) || count < 1 || count > 20) {
        error("V15", "填空题必须有 1 到 20 个空");
      }
      if (!question.blankOrder) error("V15", "填空题必须标明 ordered 或 unordered");
      if (!question.stem?.trim() || (question.stem.match(/____/g) ?? []).length !== count) {
        error("V15", "填空题题干必须用 ____ 标出每个空，数量与 blankCount 一致");
      }
    }
    return;
  }

  if (!question.stem || question.stem.trim() === "") {
    error("V8", "选择题必须有非空题干");
  }

  const options = question.options ?? [];
  const correctCount = options.filter((o) => o.correct).length;

  if (type === "single") {
    if (options.length !== 4 || correctCount !== 1) {
      error(
        "V4",
        `单选题必须恰有 4 个选项且 1 个正确，现在是 ${options.length} 个选项、${correctCount} 个正确`,
      );
    }
  } else if (
    options.length < 4 ||
    options.length > 6 ||
    correctCount < 2 ||
    correctCount === options.length
  ) {
    error(
      "V5",
      `多选题必须有 4 到 6 个选项、至少 2 个正确且不能全部正确，现在是 ${options.length} 个选项、${correctCount} 个正确`,
    );
  }

  const expectedKeys = options.map((_, i) => String.fromCharCode(65 + i));
  const keysOk = options.every((o, i) => o.key === expectedKeys[i]);
  const texts = options.map((o) => o.text.trim());
  const textsOk =
    texts.every((t) => t !== "") && new Set(texts).size === texts.length;
  if (!keysOk) error("V7", "选项的 key 必须从 A 起连续且不重复");
  if (!textsOk) error("V7", "选项文字必须非空且互不相同");

  const correctLengths = options.filter((o) => o.correct).map((o) => o.text.trim().length);
  const wrongLengths = options.filter((o) => !o.correct).map((o) => o.text.trim().length);
  if (
    correctLengths.length > 0 &&
    wrongLengths.length > 0 &&
    average(correctLengths) > LENGTH_RATIO_THRESHOLD * average(wrongLengths)
  ) {
    warnings.push({
      rule: "V14",
      target: id,
      message: "正确选项明显比其他选项长，可能泄露答案",
    });
  }
}

export function validateContent(input: ContentInput): ValidationResult {
  const errors: ContentIssue[] = [];
  const warnings: ContentIssue[] = [];
  const retired = new Set(input.retiredIds);

  // V1、V9、V11：针对 Markdown 题库本身
  const seenIds = new Set<string>();
  for (const topic of input.parsed) {
    for (const point of topic.points) {
      if (seenIds.has(point.id)) {
        errors.push({ rule: "V1", target: point.id, message: "题号在题库中重复" });
      }
      seenIds.add(point.id);

      if (retired.has(point.id)) {
        errors.push({ rule: "V11", target: point.id, message: "题号已退役，不得再次使用" });
      }
      if (point.referenceAnswer.trim() === "") {
        errors.push({ rule: "V9", target: point.id, message: "缺少参考答案" });
      }
      if (point.citations.length === 0) {
        errors.push({ rule: "V9", target: point.id, message: "缺少原文引用" });
      } else if (point.citations.some((c) => !c.url.startsWith("https://") && !parseGuideUrl(c.url))) {
        errors.push({
          rule: "V9",
          target: point.id,
          message: "引用链接必须以 https:// 开头，或是 /guides/<slug> 形式的站内资料链接",
        });
      }
    }
  }

  // V17：站内引用必须指向存在的复习资料和标题锚点
  const anchorsBySlug = new Map((input.guides ?? []).map((g) => [g.slug, guideAnchors(g)]));
  const checkInternalUrl = (target: string, url: string) => {
    const guide = parseGuideUrl(url);
    if (!guide) return;
    const anchors = anchorsBySlug.get(guide.slug);
    if (!anchors) {
      errors.push({ rule: "V17", target, message: `站内引用 ${url} 指向的复习资料 ${guide.slug} 不存在` });
    } else if (guide.anchor !== null && !anchors.has(guide.anchor)) {
      errors.push({
        rule: "V17",
        target,
        message: `站内引用 ${url} 的锚点 #${guide.anchor} 不是复习资料 ${guide.slug} 里的标题 id`,
      });
    }
  };
  for (const topic of input.parsed) {
    for (const chapter of topic.chapters) {
      if (chapter.sourceUrl) checkInternalUrl(chapter.id, chapter.sourceUrl);
    }
    for (const point of topic.points) {
      for (const citation of point.citations) checkInternalUrl(point.id, citation.url);
    }
  }
  for (const topic of input.topics) {
    if (topic.guide !== undefined && !anchorsBySlug.has(topic.guide)) {
      errors.push({ rule: "V17", target: topic.prefix, message: `专题的复习资料 ${topic.guide} 不存在` });
    }
  }

  const parsedByPrefix = new Map(input.parsed.map((t) => [t.prefix, t]));
  const approved = new Set<string>();

  for (const file of input.typed) {
    const parsedTopic = parsedByPrefix.get(file.prefix);
    const singleCorrectKeys: string[] = [];

    for (const [chapterId, chapter] of Object.entries(file.chapters)) {
      const parsedChapter = parsedTopic?.chapters.find((c) => c.id === chapterId);
      if (!parsedChapter) {
        errors.push({
          rule: "V10",
          target: chapterId,
          message: `章节不在专题 ${file.prefix} 的 Markdown 题库中`,
        });
        continue;
      }
      if (chapter.status === "approved") approved.add(chapterId);

      // V2：题号与 Markdown 一一对应
      const expected = new Set(parsedChapter.questionIds);
      const counts = new Map<string, number>();
      for (const q of chapter.questions) {
        counts.set(q.id, (counts.get(q.id) ?? 0) + 1);
      }
      for (const id of expected) {
        const n = counts.get(id) ?? 0;
        if (n === 0) errors.push({ rule: "V2", target: id, message: "typed 文件中缺少这道题" });
        if (n > 1) errors.push({ rule: "V2", target: id, message: `typed 文件中出现了 ${n} 次` });
      }
      for (const id of counts.keys()) {
        if (!expected.has(id)) {
          errors.push({
            rule: "V2",
            target: id,
            message: `题号不属于章节 ${chapterId}`,
          });
        }
      }

      for (const question of chapter.questions) {
        if (retired.has(question.id) && !seenIds.has(question.id)) {
          errors.push({ rule: "V11", target: question.id, message: "题号已退役，不得再次使用" });
        }
        checkQuestion(question, errors, warnings);
        if (question.type === "single") {
          const correct = question.options?.find((o) => o.correct);
          if (correct) singleCorrectKeys.push(correct.key);
        }
      }
    }

    // V13：单选题正确选项位置的偏斜
    if (singleCorrectKeys.length >= SKEW_MIN_QUESTIONS) {
      const tally = new Map<string, number>();
      for (const key of singleCorrectKeys) tally.set(key, (tally.get(key) ?? 0) + 1);
      for (const [key, n] of tally) {
        const share = n / singleCorrectKeys.length;
        if (share > SKEW_THRESHOLD) {
          warnings.push({
            rule: "V13",
            target: file.prefix,
            message: `单选题的正确选项有 ${Math.round(share * 100)}% 落在 ${key}，位置过于集中`,
          });
        }
      }
    }
  }

  // V12：上线构建要求全部章节已通过抽查
  if (input.requireAll) {
    for (const topic of input.parsed) {
      for (const chapter of topic.chapters) {
        if (!approved.has(chapter.id)) {
          errors.push({
            rule: "V12",
            target: chapter.id,
            message: "章节尚未通过抽查（不是 approved）",
          });
        }
      }
    }
  }

  return { errors, warnings };
}
