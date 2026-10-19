import { describe, expect, it } from "vitest";
import { buildBank } from "@/server/content/build";
import { Catalog } from "@/server/content/catalog";
import type { ContentInput } from "@/server/content/validator";

const stem = "用任意语言实现快速排序，对整数数组原地升序排序。";

function input(): ContentInput {
  return {
    topics: [{ prefix: "X", slug: "x", title: "示例", column: "示例", order: 1 }],
    parsed: [{ prefix: "X", chapters: [{ id: "X1", number: 1, title: "示例", sourceTitle: null, sourceUrl: null, questionIds: ["X1-1"] }],
      points: [{ id: "X1-1", chapterId: "X1", section: null, stem, referenceAnswer: "思路。\n\n```python\ndef f(): pass\n```\n\n要点：O(n log n)。", citations: [{ label: "来源", url: "https://example.com" }] }] }],
    typed: [{ prefix: "X", chapters: { X1: { status: "approved", questions: [{ id: "X1-1", type: "code", stem }] } } }],
    retiredIds: [], requireAll: false,
  };
}

describe("代码题内容", () => {
  it("合并后没有选项和填空元数据，作答视图不泄露参考答案", () => {
    const result = buildBank(input(), "today");
    expect(result.errors).toEqual([]);
    const [question] = new Catalog(result.bank!).getForAnswering(["X1-1"]);
    expect(question).toEqual({ id: "X1-1", type: "code", stem });
    expect(JSON.stringify(question)).not.toMatch(/def f|referenceAnswer|citations/);
    expect(result.bank!.questions[0]).not.toHaveProperty("options");
    expect(result.bank!.questions[0]).not.toHaveProperty("blankCount");
  });

  it("V16：题干为空时报错", () => {
    const data = input();
    data.typed[0].chapters.X1.questions[0].stem = "  ";
    data.parsed[0].points[0].stem = "";
    expect(buildBank(data, "today").errors.some((e) => e.rule === "V16")).toBe(true);
  });

  it("代码题不得有选项，也不得设置填空元数据", () => {
    const data = input();
    const question = data.typed[0].chapters.X1.questions[0];
    question.options = [];
    question.blankCount = 2;
    const errors = buildBank(data, "today").errors;
    expect(errors.some((e) => e.rule === "V6")).toBe(true);
    expect(errors.some((e) => e.rule === "V15")).toBe(true);
  });
});
