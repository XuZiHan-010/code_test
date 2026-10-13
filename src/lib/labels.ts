export const QUESTION_TYPE_LABEL = {
  single: "单选题",
  multiple: "多选题",
  short: "简答题",
} as const;

export const VERDICT_LABEL = {
  correct: "答对",
  incorrect: "答错",
  unanswered: "未作答",
  pending: "待评分",
} as const;

export const VERDICT_TAG_CLASS = {
  correct: "tag-pass",
  incorrect: "tag-pen",
  unanswered: "tag-plain",
  pending: "tag-wait",
} as const;

/** 正确率，四舍五入到整数百分比 */
export function accuracyPercent(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
