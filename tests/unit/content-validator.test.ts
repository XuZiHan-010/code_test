import { describe, expect, it } from "vitest";
import { buildBank } from "@/server/content/build";
import type { TypedQuestion, TypedTopicFile } from "@/server/content/typed-schema";
import type { KnowledgePoint, ParsedTopic, Topic } from "@/server/content/types";
import { validateContent, type ContentInput } from "@/server/content/validator";

const topics: Topic[] = [
  { prefix: "X", slug: "x", title: "示例", column: "示例专栏", order: 1 },
];

function point(id: string, chapterId: string): KnowledgePoint {
  return {
    id,
    chapterId,
    section: null,
    stem: `${id} 的原题干？`,
    referenceAnswer: `${id} 的参考答案。`,
    citations: [{ label: "原文§示例", url: "https://example.com/#a" }],
  };
}

function parsedTopic(): ParsedTopic {
  return {
    prefix: "X",
    chapters: [
      {
        id: "X1",
        number: 1,
        title: "第一章",
        sourceTitle: "第一篇",
        sourceUrl: "https://example.com/a.html",
        questionIds: ["X1-1", "X1-2", "X1-3"],
      },
      {
        id: "X2",
        number: 2,
        title: "第二章",
        sourceTitle: "第二篇",
        sourceUrl: "https://example.com/b.html",
        questionIds: ["X2-1"],
      },
    ],
    points: [point("X1-1", "X1"), point("X1-2", "X1"), point("X1-3", "X1"), point("X2-1", "X2")],
  };
}

function options(correct: string[], count = 4) {
  return Array.from({ length: count }, (_, i) => {
    const key = String.fromCharCode(65 + i);
    return { key, text: `选项${key}的内容`, correct: correct.includes(key) };
  });
}

const single = (id: string, correct = "B"): TypedQuestion => ({
  id,
  type: "single",
  stem: `${id} 的单选题干`,
  options: options([correct]),
});
const multiple = (id: string, correct = ["A", "C"]): TypedQuestion => ({
  id,
  type: "multiple",
  stem: `${id} 的多选题干`,
  options: options(correct),
});
const short = (id: string): TypedQuestion => ({ id, type: "short" });

function typedFile(overrides?: {
  x1?: TypedQuestion[];
  x1Status?: "draft" | "approved";
  x2Status?: "draft" | "approved" | null;
}): TypedTopicFile {
  const file: TypedTopicFile = {
    prefix: "X",
    chapters: {
      X1: {
        status: overrides?.x1Status ?? "approved",
        questions: overrides?.x1 ?? [single("X1-1"), multiple("X1-2"), short("X1-3")],
      },
    },
  };
  const x2Status = overrides?.x2Status === undefined ? "approved" : overrides.x2Status;
  if (x2Status) file.chapters.X2 = { status: x2Status, questions: [short("X2-1")] };
  return file;
}

function input(overrides: Partial<ContentInput> = {}): ContentInput {
  return {
    topics,
    parsed: [parsedTopic()],
    typed: [typedFile()],
    retiredIds: [],
    requireAll: false,
    ...overrides,
  };
}

function rulesFor(result: { errors: { rule: string; target: string }[] }) {
  return result.errors.map((e) => `${e.rule}:${e.target}`);
}

describe("validateContent：合格数据", () => {
  it("没有错误和警告", () => {
    expect(validateContent(input())).toEqual({ errors: [], warnings: [] });
  });
});

describe("validateContent：错误规则", () => {
  it("V1 题号在题库中重复", () => {
    const parsed = parsedTopic();
    parsed.points.push(point("X1-1", "X1"));
    expect(rulesFor(validateContent(input({ parsed: [parsed] })))).toContain("V1:X1-1");
  });

  it("V2 typed 文件缺少某道题", () => {
    const typed = typedFile({ x1: [single("X1-1"), multiple("X1-2")] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V2:X1-3"]);
  });

  it("V2 typed 文件里同一题出现两次", () => {
    const typed = typedFile({
      x1: [single("X1-1"), single("X1-1"), multiple("X1-2"), short("X1-3")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V2:X1-1"]);
  });

  it("V2 typed 文件里多出不属于该章的题号", () => {
    const typed = typedFile({
      x1: [single("X1-1"), multiple("X1-2"), short("X1-3"), short("X1-9")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V2:X1-9"]);
  });

  it("V3 题型不是三种之一", () => {
    const typed = typedFile({
      x1: [{ id: "X1-1", type: "essay" }, multiple("X1-2"), short("X1-3")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V3:X1-1"]);
  });

  it("V4 单选题有两个正确选项", () => {
    const bad: TypedQuestion = { ...single("X1-1"), options: options(["A", "B"]) };
    const typed = typedFile({ x1: [bad, multiple("X1-2"), short("X1-3")] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V4:X1-1"]);
  });

  it("V4 单选题不是 4 个选项", () => {
    const bad: TypedQuestion = { ...single("X1-1"), options: options(["A"], 5) };
    const typed = typedFile({ x1: [bad, multiple("X1-2"), short("X1-3")] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V4:X1-1"]);
  });

  it("V5 多选题只有一个正确选项", () => {
    const typed = typedFile({ x1: [single("X1-1"), multiple("X1-2", ["A"]), short("X1-3")] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V5:X1-2"]);
  });

  it("V5 多选题全部选项都正确", () => {
    const typed = typedFile({
      x1: [single("X1-1"), multiple("X1-2", ["A", "B", "C", "D"]), short("X1-3")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V5:X1-2"]);
  });

  it("V5 多选题超过 6 个选项", () => {
    const bad: TypedQuestion = { ...multiple("X1-2"), options: options(["A", "B"], 7) };
    const typed = typedFile({ x1: [single("X1-1"), bad, short("X1-3")] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V5:X1-2"]);
  });

  it("V6 简答题带了选项", () => {
    const bad: TypedQuestion = { ...short("X1-3"), options: options(["A"]) };
    const typed = typedFile({ x1: [single("X1-1"), multiple("X1-2"), bad] });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V6:X1-3"]);
  });

  it("V7 选项 key 不从 A 起连续", () => {
    const opts = options(["B"]);
    opts[2].key = "E";
    const typed = typedFile({
      x1: [{ ...single("X1-1"), options: opts }, multiple("X1-2"), short("X1-3")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V7:X1-1"]);
  });

  it("V7 选项文字重复或为空", () => {
    const duplicated = options(["B"]);
    duplicated[3].text = ` ${duplicated[0].text} `;
    const empty = options(["A", "C"]);
    empty[1].text = "   ";
    const typed = typedFile({
      x1: [
        { ...single("X1-1"), options: duplicated },
        { ...multiple("X1-2"), options: empty },
        short("X1-3"),
      ],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V7:X1-1", "V7:X1-2"]);
  });

  it("V8 选择题没有题干", () => {
    const typed = typedFile({
      x1: [{ ...single("X1-1"), stem: "  " }, { ...multiple("X1-2"), stem: undefined }, short("X1-3")],
    });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V8:X1-1", "V8:X1-2"]);
  });

  it("V9 缺少参考答案、缺少引用或引用不是 https", () => {
    const parsed = parsedTopic();
    parsed.points[0].referenceAnswer = " ";
    parsed.points[1].citations = [];
    parsed.points[2].citations = [{ label: "原文§示例", url: "http://example.com/#a" }];
    expect(rulesFor(validateContent(input({ parsed: [parsed] })))).toEqual([
      "V9:X1-1",
      "V9:X1-2",
      "V9:X1-3",
    ]);
  });

  it("V10 typed 文件里的章节不在 Markdown 中", () => {
    const typed = typedFile();
    typed.chapters.X7 = { status: "draft", questions: [short("X7-1")] };
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V10:X7"]);
  });

  it("V11 题号在退役清单中", () => {
    expect(rulesFor(validateContent(input({ retiredIds: ["X2-1"] })))).toEqual(["V11:X2-1"]);
  });

  it("V12 要求全部通过时，draft 或尚未生成的章节报错", () => {
    const draft = input({ typed: [typedFile({ x2Status: "draft" })], requireAll: true });
    expect(rulesFor(validateContent(draft))).toEqual(["V12:X2"]);
    const missing = input({ typed: [typedFile({ x2Status: null })], requireAll: true });
    expect(rulesFor(validateContent(missing))).toEqual(["V12:X2"]);
    const noFile = input({ typed: [], requireAll: true });
    expect(rulesFor(validateContent(noFile))).toEqual(["V12:X1", "V12:X2"]);
  });

  it("不要求全部通过时，draft 章节不报 V12，但仍检查其中的题目", () => {
    const bad: TypedQuestion = { ...single("X1-1"), options: options(["A", "B"]) };
    const typed = typedFile({ x1: [bad, multiple("X1-2"), short("X1-3")], x1Status: "draft" });
    expect(rulesFor(validateContent(input({ typed: [typed] })))).toEqual(["V4:X1-1"]);
  });
});

describe("validateContent：警告规则", () => {
  function manySingles(correctKeys: string[]) {
    const ids = correctKeys.map((_, i) => `X1-${i + 1}`);
    const parsed: ParsedTopic = {
      prefix: "X",
      chapters: [
        {
          id: "X1",
          number: 1,
          title: "第一章",
          sourceTitle: "第一篇",
          sourceUrl: "https://example.com/a.html",
          questionIds: ids,
        },
      ],
      points: ids.map((id) => point(id, "X1")),
    };
    const typed: TypedTopicFile = {
      prefix: "X",
      chapters: {
        X1: { status: "approved", questions: ids.map((id, i) => single(id, correctKeys[i])) },
      },
    };
    return input({ parsed: [parsed], typed: [typed] });
  }

  it("V13 单选题正确选项过于集中时只警告", () => {
    const skewed = validateContent(
      manySingles(["A", "A", "A", "A", "A", "B", "C", "D", "B", "C"]),
    );
    expect(skewed.errors).toEqual([]);
    expect(skewed.warnings.map((w) => `${w.rule}:${w.target}`)).toEqual(["V13:X"]);
  });

  it("V13 分布均匀时不警告", () => {
    const even = validateContent(
      manySingles(["A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D"]),
    );
    expect(even.warnings).toEqual([]);
  });

  it("V14 正确选项明显更长时只警告", () => {
    const opts = options(["B"]);
    opts[1].text = "这是一个比其他所有选项都要长出许多许多的正确选项文字内容";
    const typed = typedFile({
      x1: [{ ...single("X1-1"), options: opts }, multiple("X1-2"), short("X1-3")],
    });
    const result = validateContent(input({ typed: [typed] }));
    expect(result.errors).toEqual([]);
    expect(result.warnings.map((w) => `${w.rule}:${w.target}`)).toEqual(["V14:X1-1"]);
  });
});

describe("buildBank", () => {
  it("有错误时不产出数据", () => {
    const typed = typedFile({ x1: [single("X1-1"), multiple("X1-2")] });
    const result = buildBank(input({ typed: [typed] }), "2026-01-01T00:00:00Z");
    expect(result.bank).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("只有 approved 的章节进入运行时数据", () => {
    const result = buildBank(
      input({ typed: [typedFile({ x2Status: "draft" })] }),
      "2026-01-01T00:00:00Z",
    );
    expect(result.bank?.chapters.map((c) => c.id)).toEqual(["X1"]);
    expect(result.bank?.questions.map((q) => q.id)).toEqual(["X1-1", "X1-2", "X1-3"]);
  });

  it("题目按 Markdown 的顺序排列，与 typed 文件里的书写顺序无关", () => {
    const typed = typedFile({ x1: [short("X1-3"), single("X1-1"), multiple("X1-2")] });
    const result = buildBank(input({ typed: [typed] }), "2026-01-01T00:00:00Z");
    expect(result.bank?.questions.map((q) => q.id)).toEqual(["X1-1", "X1-2", "X1-3", "X2-1"]);
  });

  it("简答题省略题干时用原题干，选择题用改写后的题干；参考答案和引用取自 Markdown", () => {
    const result = buildBank(input(), "2026-01-01T00:00:00Z");
    const byId = Object.fromEntries(result.bank!.questions.map((q) => [q.id, q]));
    expect(byId["X1-3"].stem).toBe("X1-3 的原题干？");
    expect(byId["X1-3"].options).toBeUndefined();
    expect(byId["X1-1"].stem).toBe("X1-1 的单选题干");
    expect(byId["X1-1"].options).toHaveLength(4);
    expect(byId["X1-1"].referenceAnswer).toBe("X1-1 的参考答案。");
    expect(byId["X1-1"].citations).toHaveLength(1);
  });
});
