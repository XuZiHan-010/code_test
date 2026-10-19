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
  const retiredIds: string[] = JSON.parse(read("content", "retired-ids.json"));
  const parsed = topics.map((topic) =>
    parseTopic(
      topic.prefix,
      read("interview-practice", `${topic.slug}.md`),
      read("interview-practice", "answers-xiaolin", `${topic.slug}.md`),
    ),
  );

  // 题库会继续增加章节，所以这里断言的是 1.0 上线时的下限。
  it("解析出全部专题、章节和知识点", () => {
    expect(parsed.length).toBeGreaterThanOrEqual(24);
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

  it("每个知识点都有题干、参考答案和至少一条 https 或站内资料引用", () => {
    for (const point of parsed.flatMap((t) => t.points)) {
      expect(point.stem, point.id).not.toBe("");
      expect(point.referenceAnswer, point.id).not.toBe("");
      expect(point.citations.length, point.id).toBeGreaterThanOrEqual(1);
      for (const citation of point.citations) {
        expect(citation.url, point.id).toMatch(/^(https:\/\/|\/guides\/)/);
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
        expect(chapter.sourceUrl, chapter.id).toMatch(/^(https:\/\/|\/guides\/)/);
        expect(chapter.questionIds.length, chapter.id).toBeGreaterThan(0);
        const sequence = chapter.questionIds.map((id) => Number(id.split("-")[1]));
        expect(sequence, chapter.id).toEqual([...sequence].sort((a, b) => a - b));
        // 退役的题号从题卷里删掉但不复用，所以把它们补回去之后章内编号才是连续的
        const retiredHere = retiredIds
          .filter((id) => id.startsWith(`${chapter.id}-`))
          .map((id) => Number(id.split("-")[1]));
        const numbered = [...sequence, ...retiredHere].sort((a, b) => a - b);
        expect(numbered, chapter.id).toEqual(numbered.map((_, i) => i + 1));
      }
    }
  });

  // MySQL 专题的 SQL 代码题同样使用多行答案
  const multilineInMysql = new Set(["S1-104", "S1-107", "S1-110", "S4-80"]);

  it("除代码题外的参考答案都是单行，多行答案解析没有改变它们", () => {
    for (const topic of parsed.filter((t) => t.prefix !== "R")) {
      for (const point of topic.points) {
        if (multilineInMysql.has(point.id)) continue;
        expect(point.referenceAnswer, point.id).not.toContain("\n");
        expect(point.stem, point.id).not.toContain("\n");
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

describe("parseTopic：多行答案", () => {
  const questions = `## 1. 排序

### 快速排序

- **R1-1** 用任意语言实现快速排序。
- **R1-2** 快排的平均时间复杂度是多少？
`;
  const answers = `## 1. 排序

原文：[数据结构与算法](https://example.com/data.html)。

### 快速排序

- **R1-1** 先选基准再划分。

  \`\`\`python
  def f(xs):
      ## 1. 看起来像标题但有缩进
      return xs

  def g(): pass
  \`\`\`

  要点：O(n log n)。[原文§快速排序](https://example.com/data.html#a)
- **R1-2** O(n log n)。[原文§快速排序](https://example.com/data.html#a)
`;

  it("缩进行和空行并入同一题，缩进被去掉，引用取自最后一行", () => {
    const parsed = parseTopic("R", questions, answers);
    expect(parsed.points).toHaveLength(2);
    const [code, plain] = parsed.points;
    expect(code.referenceAnswer).toBe(
      "先选基准再划分。\n\n```python\ndef f(xs):\n    ## 1. 看起来像标题但有缩进\n    return xs\n\ndef g(): pass\n```\n\n要点：O(n log n)。",
    );
    expect(code.citations).toEqual([{ label: "原文§快速排序", url: "https://example.com/data.html#a" }]);
    expect(plain.referenceAnswer).toBe("O(n log n)。");
    expect(parsed.chapters).toHaveLength(1);
  });

  it("题卷里的缩进行同样并入上一题而不是丢失", () => {
    const withIndent = questions.replace("快速排序。\n", "快速排序。\n  接口：sort(xs)\n");
    const [first] = parseTopic("R", withIndent, answers).points;
    expect(first.stem).toBe("用任意语言实现快速排序。\n接口：sort(xs)");
  });
});

describe("parseTopic：站内复习资料引用", () => {
  const questions = ["## 1. 第一章", "- **X1-1** 什么是甲？", "- **X1-2** 什么是乙？"].join("\n");
  const answers = [
    "## 1. 第一章",
    "",
    "原文：[复习资料：RPA](/guides/rpa#intro)。",
    "",
    "- **X1-1** 甲是一种方法。[原文§概述](/guides/rpa#overview)",
    "- **X1-2** 乙是另一种。[原文§一](/guides/rpa)[对照原文§二](https://example.com/a.html#b)",
  ].join("\n");
  const topic = parseTopic("X", questions, answers);

  it("章节的原文链接可以是 /guides/ 站内路径，锚点保留在地址里", () => {
    expect(topic.chapters[0].sourceTitle).toBe("复习资料：RPA");
    expect(topic.chapters[0].sourceUrl).toBe("/guides/rpa#intro");
  });

  it("行尾引用可以是站内路径，也可以和站外链接混用", () => {
    const [first, second] = topic.points;
    expect(first.referenceAnswer).toBe("甲是一种方法。");
    expect(first.citations).toEqual([{ label: "原文§概述", url: "/guides/rpa#overview" }]);
    expect(second.referenceAnswer).toBe("乙是另一种。");
    expect(second.citations.map((c) => c.url)).toEqual(["/guides/rpa", "https://example.com/a.html#b"]);
  });

  it("其他站内路径不被当成引用，留在答案正文里", () => {
    const other = answers.replace("(/guides/rpa#overview)", "(/other/page)");
    const [first] = parseTopic("X", questions, other).points;
    expect(first.citations).toEqual([]);
    expect(first.referenceAnswer).toContain("(/other/page)");
  });
});
