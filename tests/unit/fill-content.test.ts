import { describe, expect, it } from "vitest";
import { buildBank } from "@/server/content/build";
import { Catalog } from "@/server/content/catalog";
import type { ContentInput } from "@/server/content/validator";

function input(): ContentInput {
  return {
    topics: [{ prefix: "X", slug: "x", title: "示例", column: "示例", order: 1 }],
    parsed: [{ prefix: "X", chapters: [{ id: "X1", number: 1, title: "示例", sourceTitle: null, sourceUrl: null, questionIds: ["X1-1"] }],
      points: [{ id: "X1-1", chapterId: "X1", section: null, stem: "组成：____、____。", referenceAnswer: "检索、生成", citations: [{ label: "来源", url: "https://example.com" }] }] }],
    typed: [{ prefix: "X", chapters: { X1: { status: "approved", questions: [{ id: "X1-1", type: "fill", stem: "组成：____、____。", blankCount: 2, blankOrder: "unordered" }] } } }],
    retiredIds: [], requireAll: false,
  };
}

describe("填空题内容", () => {
  it("合并空数与顺序要求，作答视图不泄露答案", () => {
    const result = buildBank(input(), "today");
    expect(result.errors).toEqual([]);
    const [question] = new Catalog(result.bank!).getForAnswering(["X1-1"]);
    expect(question).toEqual({ id: "X1-1", type: "fill", stem: "组成：____、____。", blankCount: 2, blankOrder: "unordered" });
    expect(JSON.stringify(question)).not.toMatch(/检索|生成|referenceAnswer|citations/);
    expect(result.bank!.questions[0].options).toBeUndefined();
  });

  it.each([0, 1.5, 21, undefined])("拒绝无效空数 %s", (count) => {
    const data = input();
    data.typed[0].chapters.X1.questions[0].blankCount = count;
    expect(buildBank(data, "today").errors.some(e => e.rule === "V15")).toBe(true);
  });

  it("题干空数必须匹配元数据，且不得包含选项", () => {
    const data = input();
    const question = data.typed[0].chapters.X1.questions[0];
    question.stem = "只有一空：____。";
    question.options = [];
    const errors = buildBank(data, "today").errors;
    expect(errors.some(e => e.rule === "V15")).toBe(true);
    expect(errors.some(e => e.rule === "V6")).toBe(true);
  });
});
