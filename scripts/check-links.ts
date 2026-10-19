/**
 * 检查题库里的原文链接是否还有效：npm run content:check-links
 *
 * 需要联网，所以不放在构建里，在更新题库或上线前手动运行。
 * 源站对不存在的地址也返回 200 并显示首页，所以不能只看状态码：
 * 这里用页面标题是否等于首页标题来识别失效的链接，并检查每条引用的小节锚点是否存在。
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseTopic } from "../src/server/content/parser";
import { topicsFileSchema } from "../src/server/content/typed-schema";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
const CONCURRENCY = 6;

const root = process.cwd();
const read = (...segments: string[]) => readFileSync(path.join(root, ...segments), "utf8");

async function fetchPage(url: string): Promise<{ status: number; html: string }> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
      // 核对来源里有外站链接，被限流或临时出错时等一下再试
      if ((response.status === 429 || response.status >= 500) && attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
        continue;
      }
      return { status: response.status, html: await response.text() };
    } catch (error) {
      if (attempt >= 3) return { status: 0, html: String(error) };
    }
  }
}

const titleOf = (html: string) => /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";

async function main(): Promise<void> {
  const topics = topicsFileSchema.parse(JSON.parse(read("content", "topics.json")));

  // 每个页面要检查的锚点，以及是哪些题引用了它
  const pages = new Map<string, { usedBy: Set<string>; anchors: Map<string, Set<string>> }>();
  const addReference = (url: string, by: string) => {
    // 站内 /guides/ 链接不联网检查：校验规则 V17 已保证资料和锚点存在
    if (url.startsWith("/guides/")) return;
    const [page, fragment] = url.split("#");
    const entry = pages.get(page) ?? { usedBy: new Set(), anchors: new Map() };
    entry.usedBy.add(by);
    if (fragment) {
      const users = entry.anchors.get(fragment) ?? new Set();
      users.add(by);
      entry.anchors.set(fragment, users);
    }
    pages.set(page, entry);
  };

  for (const topic of topics) {
    const parsed = parseTopic(
      topic.prefix,
      read("interview-practice", `${topic.slug}.md`),
      read("interview-practice", "answers-xiaolin", `${topic.slug}.md`),
    );
    for (const chapter of parsed.chapters) {
      if (chapter.sourceUrl) addReference(chapter.sourceUrl, chapter.id);
    }
    for (const point of parsed.points) {
      for (const citation of point.citations) addReference(citation.url, point.id);
    }
  }

  const origins = new Set([...pages.keys()].map((url) => new URL(url).origin));
  const homeTitles = new Set<string>();
  for (const origin of origins) {
    const home = await fetchPage(`${origin}/`);
    // 没有标题的首页不能用来识别失效链接，否则同站所有没标题的页面都会被误判
    if (home.status === 200 && titleOf(home.html)) homeTitles.add(titleOf(home.html));
  }

  const problems: string[] = [];
  const queue = [...pages.entries()];
  let checkedAnchors = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (;;) {
        const next = queue.shift();
        if (!next) return;
        const [url, { usedBy, anchors }] = next;
        const sample = [...usedBy].slice(0, 3).join("、");
        const { status, html } = await fetchPage(url);
        if (status !== 200) {
          problems.push(`打不开（状态 ${status}）：${url}　引用它的有 ${sample} 等 ${usedBy.size} 处`);
          continue;
        }
        if (homeTitles.has(titleOf(html))) {
          problems.push(`页面已不存在，显示的是首页：${url}　引用它的有 ${sample} 等 ${usedBy.size} 处`);
          continue;
        }
        for (const [fragment, users] of anchors) {
          checkedAnchors += 1;
          const id = decodeURIComponent(fragment);
          const found = [`id="${id}"`, `id="${fragment}"`, `href="#${fragment}"`, `href="#${id}"`].some(
            (needle) => html.includes(needle),
          );
          if (!found) {
            problems.push(`小节锚点不存在：${url}#${id}　引用它的有 ${[...users].slice(0, 5).join("、")}`);
          }
        }
      }
    }),
  );

  console.log(`检查了 ${pages.size} 个页面、${checkedAnchors} 个小节锚点。`);
  if (problems.length === 0) {
    console.log("全部有效。");
    return;
  }
  for (const problem of problems.sort()) console.error(problem);
  console.error(`\n发现 ${problems.length} 个问题。`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
