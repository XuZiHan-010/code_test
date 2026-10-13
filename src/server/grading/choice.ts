import type { QuestionOption } from "@/server/content/types";

export type ChoiceVerdict = "correct" | "incorrect" | "unanswered";

/**
 * 选择题判分。单选和多选用同一条规则：选中的集合与正确选项的集合完全一致才算对，
 * 多选题少选、多选、错选都判错，不给部分分。
 */
export function gradeChoice(
  question: { type: "single" | "multiple"; options: QuestionOption[] },
  selected: string[],
): ChoiceVerdict {
  if (selected.length === 0) return "unanswered";
  const chosen = new Set(selected);
  const correct = question.options.filter((o) => o.correct).map((o) => o.key);
  const same = chosen.size === correct.length && correct.every((key) => chosen.has(key));
  return same ? "correct" : "incorrect";
}
