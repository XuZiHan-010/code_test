import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ContentParseError, parseTopic } from "@/server/content/parser";
import { topicsFileSchema } from "@/server/content/typed-schema";

const root = process.cwd();
const read = (...segments: string[]) =>
  readFileSync(path.join(root, ...segments), "utf8");

describe("parseTopic：真实题库", () => {
  const topics = topicsFileSchema.parse(JSON.parse(read("content", "topics.json")));
  const parsed = topics.map((topic) =>
    parseTopic(
      topic.prefix,
      read("interview-practice", `${topic.slug}.md`),
      read("interview-practice", "answers-xiaolin", `${topic.slug}.md`),
    ),
  );

  // 题库会继续增加章节，所以这里断言的是 1.0 上线时的下限。
  it("解析出全部专题、章节和知识点", () => {
    expect(parsed).toHaveLength(15);
    const chapters = parsed.flatMap((t) => t.chapters);
    const points = parsed.flatMap((t) => t.points);
    expect(chapters.length).toBeGreaterThanOrEqual(151);
    expect(points.length).toBeGreaterThanOrEqual(2884);
  });

  it("题号全局唯一，且每个题号都归属于自己的章节", () => {
    const points = parsed.flatMap((t) => t.points);
    expect(new Set(points.map((p) => p.id)).size).toBe(points.length);
    for (const point of points) {
      expect(point.id.startsWith(`${point.chapterId}-`)).toBe(true);
    }
  });

  it("每个知识点都有题干、参考答案和至少一条 https 引用", () => {
    for (const point of parsed.flatMap((t) => t.points)) {
      expect(point.stem, point.id).not.toBe("");
      expect(point.referenceAnswer, point.id).not.toBe("");
      expect(point.citations.length, point.id).toBeGreaterThanOrEqual(1);
      for (const citation of point.citations) {
        expect(citation.url, point.id).toMatch(/^https:\/\//);
      }
    }
  });

  it("参考答案正文里不残留引用链接", () => {
    for (const point of parsed.flatMap((t) => t.points)) {
      expect(point.referenceAnswer, point.id).not.toMatch(/\]\(https?:\/\//);
    }
  });

  it("每个章节都有原文标题和链接，章节内题号按题库顺序排列", () => {
    for (const topic of parsed) {
      for (const chapter of topic.chapters) {
        expect(chapter.sourceTitle, chapter.id).toBeTruthy();
        expect(chapter.sourceUrl, chapter.id).toMatch(/^https:\/\//);
        expect(chapter.questionIds.length, chapter.id).toBeGreaterThan(0);
        const sequence = chapter.questionIds.map((id) => Number(id.split("-")[1]));
        expect(sequence, chapter.id).toEqual(sequence.map((_, i) => i + 1));
      }
    }
  });
});

describe("parseTopic：格式变体", () => {
  const questions = [
    "# 示例专题",
    "",
    "来源：[示例](https://example.com/)。",
    "",
    "## 1. 第一章",
    "",
    "原文：[第一篇](https://example.com/a.html)",
    "",
    "### 入门",
    "- **X1-1** 什么是甲？",
    "- **X1-2** 甲有哪些步骤？",
    "### 补充考点",
    "- **X1-3** 为什么不用乙？",
    "## 2. 第二章",
    "- **X2-1** 丙是什么？",
  ].join("\n");

  const answers = [
    "# 示例专题解答",
    "",
    "## 1. 第一章",
    "",
    "原文：[第一篇 [修订版]](https://example.com/a.html)。",
    "",
    "- **X1-1** 甲是一种方法。[原文§定义](https://example.com/a.html#def)",
    "- **X1-2** 先做一，再做二。[原文§步骤](https://example.com/a.html#s1) [对照原文§另一篇](https://example.com/b.html#s2)",
    "",
    "### 补充考点",
    "",
    "- **X1-3** 因为乙更贵。[原文§取舍](https://example.com/a.html#t)[原文§成本](https://example.com/a.html#c)",
    "",
    "## 2. 第二章",
    "",
    "原文：[第二篇](https://example.com/c.html)。",
    "",
    "- **X2-1** 丙是一个工具。[原文§工具](https://example.com/c.html#tool)",
  ].join("\r\n");

  const topic = parseTopic("X", questions, answers);

  it("按 ## 划分章节，章节编号为前缀加题组号", () => {
    expect(topic.chapters.map((c) => c.id)).toEqual(["X1", "X2"]);
    expect(topic.chapters[0].title).toBe("第一章");
    expect(topic.chapters[0].questionIds).toEqual(["X1-1", "X1-2", "X1-3"]);
    expect(topic.chapters[1].questionIds).toEqual(["X2-1"]);
  });

  it("### 小标题只影响 section，换章后清空", () => {
    const sections = Object.fromEntries(topic.points.map((p) => [p.id, p.section]));
    expect(sections).toEqual({
      "X1-1": "入门",
      "X1-2": "入门",
      "X1-3": "补充考点",
      "X2-1": null,
    });
  });

  it("原文标题和链接取自答案文件，题卷里没有“原文”行也能得到", () => {
    expect(topic.chapters[0].sourceTitle).toBe("第一篇 [修订版]");
    expect(topic.chapters[0].sourceUrl).toBe("https://example.com/a.html");
    expect(topic.chapters[1].sourceTitle).toBe("第二篇");
    expect(topic.chapters[1].sourceUrl).toBe("https://example.com/c.html");
  });

  it("把行尾的一条或多条引用从正文中分离出来", () => {
    const byId = Object.fromEntries(topic.points.map((p) => [p.id, p]));
    expect(byId["X1-1"].referenceAnswer).toBe("甲是一种方法。");
    expect(byId["X1-1"].citations).toEqual([
      { label: "原文§定义", url: "https://example.com/a.html#def" },
    ]);
    expect(byId["X1-2"].referenceAnswer).toBe("先做一，再做二。");
    expect(byId["X1-2"].citations.map((c) => c.label)).toEqual([
      "原文§步骤",
      "对照原文§另一篇",
    ]);
    expect(byId["X1-3"].citations.map((c) => c.url)).toEqual([
      "https://example.com/a.html#t",
      "https://example.com/a.html#c",
    ]);
  });

  it("题干取自题卷", () => {
    expect(topic.points[0].stem).toBe("什么是甲？");
  });
});

describe("parseTopic：不一致的输入", () => {
  const heading = "## 1. 第一章\n";

  it("题卷和答案数量不同时报错", () => {
    expect(() =>
      parseTopic(
        "X",
        `${heading}- **X1-1** 甲？\n- **X1-2** 乙？`,
        `${heading}- **X1-1** 甲。[原文§a](https://example.com/#a)`,
      ),
    ).toThrow(ContentParseError);
  });

  it("题号顺序不同时报错", () => {
    expect(() =>
      parseTopic(
        "X",
        `${heading}- **X1-1** 甲？\n- **X1-2** 乙？`,
        `${heading}- **X1-2** 乙。[原文§b](https://example.com/#b)\n- **X1-1** 甲。[原文§a](https://example.com/#a)`,
      ),
    ).toThrow(/题号或顺序不一致/);
  });

  it("题号重复时报错", () => {
    const body = `${heading}- **X1-1** 甲？\n- **X1-1** 甲？`;
    expect(() => parseTopic("X", body, body)).toThrow(/重复/);
  });

  it("题号前缀不属于本专题时报错", () => {
    const body = `${heading}- **Y1-1** 甲？`;
    expect(() => parseTopic("X", body, body)).toThrow(/前缀/);
  });

  it("题号的题组号与所在章节不符时报错", () => {
    const body = `${heading}- **X2-1** 甲？`;
    expect(() => parseTopic("X", body, body)).toThrow(/不属于所在的第 1 章/);
  });
});
