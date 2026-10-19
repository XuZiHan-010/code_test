/**
 * 复习资料（content/guides/*.md）用的小型 Markdown 解析器。
 *
 * 只解析一小部分语法，输出的是结构化的语法树而不是 HTML：渲染时由 React 组件逐个节点生成元素，
 * 文本一律经 React 转义，不存在拼接原始 HTML 的环节。
 *
 * 支持：#/##/###（标题末尾可写 {#id} 指定锚点）、段落、无序/有序列表、GFM 表格、
 * 引用块、围栏代码块，以及行内的 **粗体**、`代码`、[文字](链接)。
 */

export type Inline =
  | { t: "text"; text: string }
  | { t: "strong"; children: Inline[] }
  | { t: "code"; text: string }
  | { t: "link"; href: string; children: Inline[] };

export type Block =
  | { t: "heading"; level: 1 | 2 | 3; children: Inline[]; text: string; id?: string }
  | { t: "paragraph"; children: Inline[] }
  | { t: "list"; ordered: boolean; items: Inline[][] }
  | { t: "table"; header: Inline[][]; rows: Inline[][][] }
  | { t: "quote"; blocks: Block[] }
  | { t: "code"; text: string };

const HEADING = /^(#{1,3})\s+(.*?)\s*$/;
const HEADING_ID = /\s*\{#([\p{L}\p{N}_-]+)\}\s*$/u;
const FENCE = /^\s*```/;
const BULLET = /^\s*[-*]\s+(.*)$/;
const ORDERED = /^\s*\d+[.)]\s+(.*)$/;
const QUOTE = /^\s*>\s?(.*)$/;
const TABLE_SEPARATOR = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const INLINE = /`([^`]+)`|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^\s)]+)\)/g;

/** 只允许站外 http(s) 链接、站内绝对路径和页内锚点；其余（javascript: 等）一律当普通文字 */
export function isSafeHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || /^\/(?!\/)/.test(href) || href.startsWith("#");
}

export function parseInline(source: string): Inline[] {
  const result: Inline[] = [];
  const pushText = (text: string) => {
    if (text) result.push({ t: "text", text });
  };

  let last = 0;
  for (const match of source.matchAll(INLINE)) {
    pushText(source.slice(last, match.index));
    last = match.index + match[0].length;
    if (match[1] !== undefined) {
      result.push({ t: "code", text: match[1] });
    } else if (match[2] !== undefined) {
      result.push({ t: "strong", children: parseInline(match[2]) });
    } else if (isSafeHref(match[4])) {
      result.push({ t: "link", href: match[4], children: parseInline(match[3]) });
    } else {
      result.push(...parseInline(match[3]));
    }
  }
  pushText(source.slice(last));
  return result;
}

/** 行内内容的纯文本形式，用于目录和测试 */
export function inlineToText(inlines: Inline[]): string {
  return inlines
    .map((node) => (node.t === "text" || node.t === "code" ? node.text : inlineToText(node.children)))
    .join("");
}

function splitCells(line: string): string[] {
  let text = line.trim();
  if (text.startsWith("|")) text = text.slice(1);
  if (text.endsWith("|") && !text.endsWith("\\|")) text = text.slice(0, -1);
  return text.split(/(?<!\\)\|/).map((cell) => cell.replace(/\\\|/g, "|").trim());
}

const isCjk = (char: string | undefined) => !!char && /[⺀-鿿＀-￯　-〿]/.test(char);

/** 段落里的换行：中文之间直接相连，其余用空格，避免出现多余的空白 */
function joinLines(lines: string[]): string {
  return lines.reduce((joined, line) => {
    if (!joined) return line;
    return isCjk(joined.at(-1)) || isCjk(line[0]) ? joined + line : `${joined} ${line}`;
  }, "");
}

function startsBlock(line: string, next: string | undefined): boolean {
  return (
    HEADING.test(line) ||
    FENCE.test(line) ||
    QUOTE.test(line) ||
    BULLET.test(line) ||
    ORDERED.test(line) ||
    (line.includes("|") && next !== undefined && TABLE_SEPARATOR.test(next) && next.includes("-"))
  );
}

export function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/^﻿/, "").split(/\r?\n/);
  return parseLines(lines);
}

function parseLines(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (FENCE.test(line)) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !FENCE.test(lines[i])) code.push(lines[i++]);
      i += 1; // 跳过结束的围栏；没有结束围栏时读到文末为止
      blocks.push({ t: "code", text: code.join("\n") });
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      const raw = heading[2];
      const idMatch = HEADING_ID.exec(raw);
      const children = parseInline(idMatch ? raw.slice(0, idMatch.index) : raw);
      blocks.push({
        t: "heading",
        level: heading[1].length as 1 | 2 | 3,
        children,
        text: inlineToText(children),
        ...(idMatch ? { id: idMatch[1] } : {}),
      });
      i += 1;
      continue;
    }

    if (QUOTE.test(line)) {
      const inner: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) inner.push(QUOTE.exec(lines[i++])![1]);
      blocks.push({ t: "quote", blocks: parseLines(inner) });
      continue;
    }

    const next = lines[i + 1];
    if (line.includes("|") && next !== undefined && TABLE_SEPARATOR.test(next) && next.includes("-")) {
      const header = splitCells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() !== "" && lines[i].includes("|")) {
        rows.push(splitCells(lines[i++]));
      }
      blocks.push({
        t: "table",
        header: header.map(parseInline),
        // 补齐或截断到表头的列数，保证每行列数一致
        rows: rows.map((row) => header.map((_, col) => parseInline(row[col] ?? ""))),
      });
      continue;
    }

    const listPattern = BULLET.test(line) ? BULLET : ORDERED.test(line) ? ORDERED : null;
    if (listPattern) {
      const items: string[] = [];
      while (i < lines.length) {
        const item = listPattern.exec(lines[i]);
        if (item) {
          items.push(item[1]);
          i += 1;
        } else if (/^\s+\S/.test(lines[i]) && items.length > 0 && !BULLET.test(lines[i]) && !ORDERED.test(lines[i])) {
          // 缩进的续行并入上一条
          items[items.length - 1] = joinLines([items[items.length - 1], lines[i].trim()]);
          i += 1;
        } else {
          break;
        }
      }
      blocks.push({ t: "list", ordered: listPattern === ORDERED, items: items.map(parseInline) });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && (paragraph.length === 0 || !startsBlock(lines[i], lines[i + 1]))) {
      paragraph.push(lines[i++].trim());
    }
    blocks.push({ t: "paragraph", children: parseInline(joinLines(paragraph)) });
  }

  return blocks;
}

/** 资料里显式写了 {#id} 的标题 id；用于校验站内引用的锚点 */
export function extractHeadingIds(markdown: string): string[] {
  const ids: string[] = [];
  const walk = (blocks: Block[]) => {
    for (const block of blocks) {
      if (block.t === "heading" && block.id) ids.push(block.id);
      if (block.t === "quote") walk(block.blocks);
    }
  };
  walk(parseBlocks(markdown));
  return ids;
}
