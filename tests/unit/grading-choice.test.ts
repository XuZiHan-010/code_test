import { describe, expect, it } from "vitest";
import { gradeChoice } from "@/server/grading/choice";

const options = (correct: string[]) =>
  ["A", "B", "C", "D"].map((key) => ({ key, text: key, correct: correct.includes(key) }));

describe("gradeChoice：单选", () => {
  const question = { type: "single" as const, options: options(["B"]) };

  it("选中正确选项判对", () => {
    expect(gradeChoice(question, ["B"])).toBe("correct");
  });

  it("选中其他选项判错", () => {
    expect(gradeChoice(question, ["A"])).toBe("incorrect");
  });

  it("没有选任何选项是未答", () => {
    expect(gradeChoice(question, [])).toBe("unanswered");
  });
});

describe("gradeChoice：多选", () => {
  const question = { type: "multiple" as const, options: options(["A", "C"]) };

  it("选中的集合与正确选项完全一致才判对，顺序无关", () => {
    expect(gradeChoice(question, ["A", "C"])).toBe("correct");
    expect(gradeChoice(question, ["C", "A"])).toBe("correct");
  });

  it("少选判错，不给部分分", () => {
    expect(gradeChoice(question, ["A"])).toBe("incorrect");
  });

  it("多选判错", () => {
    expect(gradeChoice(question, ["A", "B", "C"])).toBe("incorrect");
  });

  it("错选判错", () => {
    expect(gradeChoice(question, ["A", "D"])).toBe("incorrect");
    expect(gradeChoice(question, ["B", "D"])).toBe("incorrect");
  });

  it("把全部选项都选上判错", () => {
    expect(gradeChoice(question, ["A", "B", "C", "D"])).toBe("incorrect");
  });

  it("没有选任何选项是未答", () => {
    expect(gradeChoice(question, [])).toBe("unanswered");
  });
});
