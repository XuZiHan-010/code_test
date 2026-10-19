import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ReferenceAnswer, splitReferenceAnswer } from "@/components/result/ReferenceAnswer";
import { ResultQuestion } from "@/components/result/ResultQuestion";
import type { AnsweringQuestion } from "@/server/attempts/service";

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: () => {} }) }));

const question: AnsweringQuestion = {
  id: "R2-31", type: "code", stem: "用任意语言实现快速排序。", inNotebook: false,
  response: { text: "def qs(a):\n    return a" },
};

const card = (response: AnsweringQuestion["response"]) =>
  renderToStaticMarkup(createElement(QuestionCard, {
    question, number: 1, total: 1, response, inNotebook: false, disabled: false,
    onChange: () => {}, onBlur: () => {}, onNotebookChange: () => {},
  }));

describe("代码题作答区", () => {
  it("渲染等宽文本框、恢复已填代码、说明可用任意语言", () => {
    const html = card(question.response);
    expect(html).toContain("<textarea");
    expect(html).toContain("font-mono");
    expect(html).toContain("def qs(a):");
    expect(html).toContain("任意语言");
    expect(html).toContain("代码题");
    // 代码框不设 maxLength，避免粘贴超长代码时被浏览器静默截断
    expect(html).not.toMatch(/maxLength/i);
    expect(html).toContain("/ 8000");
  });

  it("到达上限时计数变红", () => {
    const html = card({ text: "x".repeat(8000) });
    expect(html).toContain("text-pen");
    expect(html).toContain("8000 / 8000");
    expect(html).not.toContain("超出");
  });

  it("超过上限时计数变红并提示超出多少字", () => {
    const html = card({ text: "x".repeat(8005) });
    expect(html).toContain("text-pen");
    expect(html).toContain("8005 / 8000");
    expect(html).toContain("超出 5 字");
    expect(html).toContain("请删减后再交卷");
  });

  it("超出字数按码点计算，不是 UTF-16 单元", () => {
    const html = card({ text: "😀".repeat(8002) });
    expect(html).toContain("超出 2 字");
  });
});

describe("splitReferenceAnswer", () => {
  it("把围栏代码块切成代码段，其余是文字段", () => {
    const segments = splitReferenceAnswer("思路。\n\n```python\ndef f(): pass\n```\n\n要点：O(n)。");
    expect(segments).toEqual([
      { type: "text", content: "思路。" },
      { type: "code", language: "python", content: "def f(): pass" },
      { type: "text", content: "要点：O(n)。" },
    ]);
  });

  it("没有代码块时整段是文字", () => {
    expect(splitReferenceAnswer("只有文字。")).toEqual([{ type: "text", content: "只有文字。" }]);
  });

  it("围栏没有闭合时按普通文字处理，不丢内容、不崩溃", () => {
    const text = "开头\n```python\ndef f(): pass";
    expect(splitReferenceAnswer(text)).toEqual([{ type: "text", content: text }]);
    expect(renderToStaticMarkup(createElement(ReferenceAnswer, { text }))).toContain("def f(): pass");
  });
});

describe("代码题结果展示", () => {
  const result = (extra = {}) =>
    renderToStaticMarkup(createElement(ResultQuestion, {
      question: {
        id: "R2-31", type: "code", stem: "实现快排", options: undefined, verdict: "incorrect",
        response: { text: "def qs(a):\n    return a" }, feedback: "没有划分步骤。",
        referenceAnswer: "思路。\n\n```python\ndef f(): pass\n```\n\n要点：O(n)。",
        citations: [], source: null, wrongCount: 0, inNotebook: false, ...extra,
      },
    }));

  it("用代码样式展示考生代码和参考实现，并提示 AI 判卷仅供参考", () => {
    const html = result();
    expect(html).toContain("<pre");
    expect(html).toContain("def qs(a):");
    expect(html).toContain("def f(): pass");
    expect(html).toContain("没有划分步骤。");
    expect(html).toContain("仅供参考");
  });

  it("没有作答时显示'没有作答'", () => {
    const html = result({ response: null, verdict: "unanswered", feedback: null });
    expect(html).toContain("没有作答");
  });
});
