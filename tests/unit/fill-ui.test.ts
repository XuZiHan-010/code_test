import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultQuestion } from "@/components/result/ResultQuestion";
import type { AnsweringQuestion } from "@/server/attempts/service";

// 静态渲染没有 Next 路由上下文；答题输入与结果展示仍使用真实组件。
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: () => {} }) }));

const question: AnsweringQuestion = {
  id: "M1-22", type: "fill", stem: "Harness 六层：____、____、____、____、____、____。",
  blankCount: 6, blankOrder: "unordered", inNotebook: false,
  response: { blanks: ["工具系统", "", "", "", "", ""] },
};

describe("填空题展示", () => {
  it("六空题渲染六个带标签的输入框并恢复已填内容", () => {
    const html = renderToStaticMarkup(createElement(QuestionCard, {
      question, number: 1, total: 1, response: question.response,
      inNotebook: false, disabled: false, onChange: () => {}, onBlur: () => {}, onNotebookChange: () => {},
    }));
    expect(html.match(/type="text"/g)).toHaveLength(6);
    expect(html).toContain('value="工具系统"');
    expect(html).toContain('for="a-M1-22-5"');
    expect(html).toContain("第 6 空");
    expect(html).toContain("顺序不限");
    expect(html).not.toContain("<textarea");
  });

  it("结果页逐空展示答案和未填写的位置，并显示评分反馈", () => {
    const html = renderToStaticMarkup(createElement(ResultQuestion, {
      question: { ...question, options: undefined, verdict: "incorrect", feedback: "缺少其余五层。", referenceAnswer: "六层组成参考解答", citations: [], source: null, wrongCount: 1 },
    }));
    expect(html).toContain("第 1 空：工具系统");
    expect(html).toContain("第 6 空：未填写");
    expect(html).toContain("缺少其余五层。");
    expect(html).toContain("六层组成参考解答");
  });
});
