import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { Catalog, loadBankFile } from "@/server/content/catalog";
import { fixtureBank } from "../fixtures/bank";

const catalog = new Catalog(fixtureBank);

describe("Catalog：浏览", () => {
  it("按专栏分组列出专题，带章节数和题数，没有章节的专题不出现", () => {
    expect(catalog.listColumns()).toEqual([
      {
        column: "专栏一",
        topics: [expect.objectContaining({ prefix: "X", chapterCount: 2, questionCount: 7 })],
      },
      {
        column: "专栏二",
        topics: [expect.objectContaining({ prefix: "Y", chapterCount: 1, questionCount: 1 })],
      },
    ]);
  });

  it("按专题列出章节，按文件名或前缀找到专题", () => {
    expect(catalog.listChapters("X").map((c) => c.id)).toEqual(["X1", "X2"]);
    expect(catalog.getTopicBySlug("topic-y")?.prefix).toBe("Y");
    expect(catalog.getTopic("X")?.title).toBe("专题甲");
    expect(catalog.listChapters("不存在")).toEqual([]);
  });

  it("按编号取章节，按题号定位所属章节和专题", () => {
    expect(catalog.getChapter("X2")?.questionIds).toEqual(["X2-1", "X2-2"]);
    expect(catalog.getChapter("X9")).toBeUndefined();
    expect(catalog.locate("Y1-1")).toMatchObject({
      chapter: { id: "Y1" },
      topic: { prefix: "Y" },
    });
    expect(catalog.locate("Q9-9")).toBeUndefined();
    expect(catalog.hasQuestion("X1-1")).toBe(true);
    expect(catalog.hasQuestion("X1-99")).toBe(false);
  });
});

describe("Catalog：两种视图", () => {
  it("作答视图只有题号、题型、题干和选项的 key 与文字", () => {
    const [single, multiple, short] = catalog.getForAnswering(["X1-1", "X1-2", "X1-3"]);
    expect(single).toEqual({
      id: "X1-1",
      type: "single",
      stem: "X1-1 单选题干",
      options: [
        { key: "A", text: "X1-1 选项 A" },
        { key: "B", text: "X1-1 选项 B" },
        { key: "C", text: "X1-1 选项 C" },
        { key: "D", text: "X1-1 选项 D" },
      ],
    });
    expect(multiple.options).toHaveLength(4);
    expect(short).toEqual({ id: "X1-3", type: "short", stem: "X1-3 简答题干" });
  });

  it("作答视图序列化后不含任何能推出答案的字段", () => {
    const everyId = fixtureBank.questions.map((q) => q.id);
    const serialized = JSON.stringify(catalog.getForAnswering(everyId));
    for (const forbidden of ["correct", "referenceAnswer", "citations", "参考答案"]) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it("结果视图含正确选项、参考答案和引用", () => {
    const [question] = catalog.getWithAnswer(["X1-1"]);
    expect(question.options?.find((o) => o.correct)?.key).toBe("B");
    expect(question.referenceAnswer).toBe("X1-1 的参考答案。");
    expect(question.citations).toHaveLength(1);
  });

  it("两种视图都保持传入的顺序，并跳过不存在的题号", () => {
    const ids = ["X2-1", "不存在", "X1-1"];
    expect(catalog.getForAnswering(ids).map((q) => q.id)).toEqual(["X2-1", "X1-1"]);
    expect(catalog.getWithAnswer(ids).map((q) => q.id)).toEqual(["X2-1", "X1-1"]);
  });
});

describe("Catalog：复习资料", () => {
  it("按 slug 取资料，不存在返回 undefined", () => {
    expect(catalog.getGuide("guide-x")?.title).toBe("示例资料");
    expect(catalog.getGuide("nope")).toBeUndefined();
  });

  it("列出全部资料，与章节状态无关", () => {
    expect(catalog.listGuides().map((g) => g.slug)).toEqual(["guide-x"]);
    expect(new Catalog({ ...fixtureBank, chapters: [], questions: [] }).listGuides()).toHaveLength(1);
  });

  it("旧版 bank.json 没有 guides 字段时按空处理", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "quiz-bank-"));
    const file = path.join(dir, "old.json");
    writeFileSync(file, JSON.stringify({ ...fixtureBank, guides: undefined }), "utf8");
    expect(loadBankFile(file).guides).toEqual([]);
  });
});

describe("loadBankFile", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "quiz-bank-"));

  it("读入合法的题库文件", () => {
    const file = path.join(dir, "bank.json");
    writeFileSync(file, JSON.stringify(fixtureBank), "utf8");
    expect(loadBankFile(file).questions).toHaveLength(fixtureBank.questions.length);
  });

  it("文件不存在时报错并提示先构建", () => {
    expect(() => loadBankFile(path.join(dir, "missing.json"))).toThrow(/content:build/);
  });

  it("格式不符时报错", () => {
    const file = path.join(dir, "broken.json");
    writeFileSync(file, JSON.stringify({ topics: [] }), "utf8");
    expect(() => loadBankFile(file)).toThrow(/格式不符/);
  });
});
