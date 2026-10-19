import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GuideMarkdown } from "@/components/guide/GuideMarkdown";
import { extractHeadingIds, inlineToText, parseBlocks, parseInline } from "@/lib/markdown";
import { parseGuide, parseGuideUrl } from "@/server/content/guide";

const render = (markdown: string, omitTitle = false) =>
  renderToStaticMarkup(createElement(GuideMarkdown, { markdown, omitTitle }));

describe("parseBlocks：标题与锚点", () => {
  it("标题末尾的 {#id} 作为锚点并从文字中去掉，没写就没有 id", () => {
    const [a, b, c] = parseBlocks("# 总标题\n\n## 第一节 {#sec-1}\n\n### 细节\n");
    expect(a).toMatchObject({ t: "heading", level: 1, text: "总标题" });
    expect(a).not.toHaveProperty("id");
    expect(b).toMatchObject({ t: "heading", level: 2, text: "第一节", id: "sec-1" });
    expect(c).toMatchObject({ t: "heading", level: 3, text: "细节" });
    expect(c).not.toHaveProperty("id");
  });

  it("渲染成带 id 的标题元素", () => {
    const html = render("## 第一节 {#sec-1}\n\n### 细节\n");
    expect(html).toContain('<h2 id="sec-1"');
    expect(html).toContain("第一节</h2>");
    expect(html).not.toContain("{#");
    expect(html).toMatch(/<h3 class=/);
  });

  it("extractHeadingIds 只返回显式写了 id 的标题，围栏代码里的不算", () => {
    const md = "# T\n\n## A {#a}\n\n## B\n\n> ### 引用里 {#q}\n\n```\n## 代码 {#code}\n```\n";
    expect(extractHeadingIds(md)).toEqual(["a", "q"]);
  });

  it("omitTitle 去掉开头的一级标题", () => {
    const html = render("# 总标题\n\n正文\n", true);
    expect(html).not.toContain("总标题");
    expect(html).toContain("正文");
  });
});

describe("parseInline 与转义", () => {
  it("粗体、行内代码和链接", () => {
    const nodes = parseInline("见 **重点** 与 `code` 以及 [文档](https://example.com/a)");
    expect(nodes.map((n) => n.t)).toEqual(["text", "strong", "text", "code", "text", "link"]);
    expect(inlineToText(nodes)).toBe("见 重点 与 code 以及 文档");
  });

  it("文本中的 HTML 会被转义，不会生成元素", () => {
    const html = render('<script>alert(1)</script> & `<b>x</b>` **<i>y</i>**\n\n| <u>h</u> |\n| --- |\n| <img src=x onerror=alert(1)> |\n');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<u>");
    expect(html).not.toContain("<i>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt; &amp;");
    expect(html).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });

  it("外链在新标签打开，站内链接用站内跳转", () => {
    const html = render("[外](https://example.com/x) 和 [内](/guides/rpa#intro) 和 [页内](#top)");
    expect(html).toMatch(/<a href="https:\/\/example.com\/x" target="_blank" rel="noreferrer"/);
    expect(html).toMatch(/<a [^>]*href="\/guides\/rpa#intro"[^>]*>内<\/a>/);
    expect(html).not.toMatch(/<a [^>]*href="\/guides\/rpa#intro"[^>]*target=/);
  });

  it("不安全的链接地址被当成普通文字", () => {
    const html = render("[点我](javascript:alert(1)) [协议相对](//evil.example/x)");
    expect(html).not.toContain("<a");
    expect(html).toContain("点我");
  });
});

describe("parseBlocks：列表、引用、表格", () => {
  it("无序和有序列表，缩进续行并入上一项", () => {
    const blocks = parseBlocks("- 甲\n- 乙\n  接上文\n\n1. 一\n2. 二\n");
    expect(blocks).toHaveLength(2);
    expect(blocks[0]).toMatchObject({ t: "list", ordered: false });
    expect(blocks[1]).toMatchObject({ t: "list", ordered: true });
    const html = render("- 甲\n- 乙\n  接上文\n\n1. 一\n2. 二\n");
    expect(html).toContain("<ul");
    expect(html).toContain("<ol");
    expect(html).toContain("乙接上文</li>");
    expect(html.match(/<li>/g)).toHaveLength(4);
  });

  it("引用块渲染成提示框，里面可以有多个块", () => {
    const html = render("> **注意**\n> 第二行\n>\n> - 要点\n");
    expect(html).toContain("<aside");
    expect(html).toContain("<strong");
    expect(html).toContain("<ul");
  });

  it("GFM 表格：表头、行、转义的竖线，放在可横向滚动的容器里", () => {
    const html = render("| 名称 | 说明 |\n| :--- | ---: |\n| 甲 | a\\|b |\n| 乙 |\n");
    expect(html).toContain("overflow-x-auto");
    expect(html.match(/<th /g)).toHaveLength(2);
    expect(html.match(/<tr/g)).toHaveLength(3);
    expect(html).toContain("a|b");
    // 缺的单元格补空，每行列数与表头一致
    expect(html.match(/<td /g)).toHaveLength(4);
  });

  it("不是表格的竖线文字仍是段落", () => {
    const blocks = parseBlocks("a | b\n不是分隔行");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].t).toBe("paragraph");
  });

  it("段落里的换行：中文直接相连，英文用空格", () => {
    const texts = parseBlocks("第一行\n第二行\n\nfoo\nbar").map((block) =>
      block.t === "paragraph" ? inlineToText(block.children) : "",
    );
    expect(texts).toEqual(["第一行第二行", "foo bar"]);
  });
});

describe("parseGuide", () => {
  it("标题取自第一行的 # 标题", () => {
    expect(parseGuide("rpa", "\n# RPA 复习资料\n\n正文")).toMatchObject({ slug: "rpa", title: "RPA 复习资料" });
  });

  it("第一行不是 # 标题或文件名不合法时报错", () => {
    expect(() => parseGuide("rpa", "正文\n# 标题")).toThrow(/第一行/);
    expect(() => parseGuide("RPA 资料", "# 标题")).toThrow(/文件名/);
  });

  it("解析站内链接", () => {
    expect(parseGuideUrl("/guides/rpa#intro")).toEqual({ slug: "rpa", anchor: "intro" });
    expect(parseGuideUrl("/guides/rpa")).toEqual({ slug: "rpa", anchor: null });
    expect(parseGuideUrl("https://example.com/guides/rpa")).toBeNull();
    expect(parseGuideUrl("/guides/Bad")).toBeNull();
  });
});
