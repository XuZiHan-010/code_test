import { extractHeadingIds } from "../../lib/markdown";
import type { Guide } from "./types";

export const GUIDE_SLUG = /^[a-z0-9-]+$/;

/** 站内引用：/guides/<slug>，可带 #锚点 */
const INTERNAL_GUIDE_URL = /^\/guides\/([a-z0-9-]+)(?:#(.+))?$/;

export function parseGuideUrl(url: string): { slug: string; anchor: string | null } | null {
  const match = INTERNAL_GUIDE_URL.exec(url);
  return match ? { slug: match[1], anchor: match[2] ?? null } : null;
}

/** 读入一份复习资料。标题取自第一个非空行的 `# 标题`，格式不符时抛出错误 */
export function parseGuide(slug: string, markdown: string): Guide {
  if (!GUIDE_SLUG.test(slug)) {
    throw new Error(`复习资料文件名 ${slug}.md 只能由小写字母、数字和连字符组成`);
  }
  const text = markdown.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/).find((line) => line.trim() !== "") ?? "";
  const title = /^#\s+(.+?)\s*$/.exec(firstLine)?.[1]?.replace(/\s*\{#[^}]*\}\s*$/, "").trim();
  if (!title) {
    throw new Error(`复习资料 ${slug}.md 的第一行必须是 "# 标题"`);
  }
  return { slug, title, markdown: text };
}

export function guideAnchors(guide: Guide): Set<string> {
  return new Set(extractHeadingIds(guide.markdown));
}
