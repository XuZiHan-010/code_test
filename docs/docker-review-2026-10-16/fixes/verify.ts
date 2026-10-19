/** Run from repo root: npx tsx docs/docker-review-2026-10-16/fixes/verify.ts
 * Only writes this fixes directory. No Docker commands or production bank writes.
 */
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { buildBank } from "../../../src/server/content/build";
import { Catalog } from "../../../src/server/content/catalog";
import { parseTopic } from "../../../src/server/content/parser";
import { topicsFileSchema, typedTopicFileSchema } from "../../../src/server/content/typed-schema";
import type { Question } from "../../../src/server/content/types";

const out = "docs/docker-review-2026-10-16/fixes";
const audit = "docs/docker-review-2026-10-16";
const files = ["interview-practice/docker.md", "interview-practice/answers-xiaolin/docker.md", "content/typed/docker.json"];
const readJson = <T>(file: string): T => JSON.parse(readFileSync(file, "utf8"));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const sha = (file: string) => createHash("sha256").update(readFileSync(file)).digest("hex");
const save = (name: string, value: unknown) => writeFileSync(path.join(out, name), JSON.stringify(value, null, 2) + "\n", "utf8");
const keys = (q: Question) => (q.options ?? []).filter((o) => o.correct).map((o) => o.key).join("");
const counts = (questions: Question[]) => Object.fromEntries(["single", "multiple", "fill", "short", "code"].map((t) => [t, questions.filter((q) => q.type === t).length]));
const officialHosts = new Set(["docs.docker.com", "www.docker.com", "docs.kernel.org", "www.kernel.org", "man7.org", "kubernetes.io"]);
const decodeHtml = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#(?:39|x27);/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const execute = promisify(execFile);

async function pageEvidence(url: string) {
  const dir = path.join(out, "official-pages");
  mkdirSync(dir, { recursive: true });
  const key = createHash("sha256").update(url).digest("hex").slice(0, 20);
  const htmlFile = path.join(dir, key + ".html");
  const metadataFile = path.join(dir, key + ".json");
  let metadata: { url: string; httpStatus: number; effectiveUrl: string; fetchedAt: string; sha256: string; error?: string | null } | undefined;
  if (existsSync(htmlFile) && existsSync(metadataFile)) {
    metadata = readJson(metadataFile);
    if (metadata.url !== url || sha(htmlFile) !== metadata.sha256) throw new Error("引用缓存校验失败：" + url);
  }
  if (!metadata || metadata.httpStatus !== 200 || metadata.error) {
    let status = "0", effectiveUrl = url, error: string | null = null;
    try {
      const response = await execute("curl.exe", ["-sS", "-L", "--connect-timeout", "15", "--max-time", "45", "-o", htmlFile, "-w", "%{http_code}\n%{url_effective}", url], { encoding: "utf8", maxBuffer: 1024 * 1024 });
      [status, effectiveUrl] = response.stdout.trim().split(/\r?\n/);
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
      if (!existsSync(htmlFile)) writeFileSync(htmlFile, "", "utf8");
    }
    metadata = { url, httpStatus: Number(status), effectiveUrl, fetchedAt: new Date().toISOString(), sha256: sha(htmlFile), error };
    writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + "\n", "utf8");
  }
  // Docker minifies attributes such as id=user without quotation marks.
  // Parse actual HTML rather than mistaking these valid anchors for missing IDs.
  const parsed = await execute("python", ["-c", "import json,sys; from pathlib import Path; from bs4 import BeautifulSoup; s=BeautifulSoup(Path(sys.argv[1]).read_text(encoding='utf8'),'html.parser'); print(json.dumps({'title':s.title.get_text(strip=True) if s.title else '', 'ids':[e['id'] for e in s.select('[id]')]},ensure_ascii=True))", htmlFile], { encoding: "utf8", maxBuffer: 2 * 1024 * 1024 });
  const document = JSON.parse(parsed.stdout) as { title: string; ids: string[] };
  const title = decodeHtml(document.title).trim();
  const ids = new Set(document.ids);
  return { ...metadata, title, ids, htmlFile };
}

async function main() {
  mkdirSync(out, { recursive: true });
  const checks: { name: string; passed: boolean; details: unknown }[] = [];
  const check = (name: string, passed: boolean, details: unknown = null) => checks.push({ name, passed, details });
  const oldHashes = readJson<{ hashes: Record<string, string> }>(path.join(audit, "checks.json")).hashes;
  const sourceHashes = Object.fromEntries(files.map((f) => [f, sha(f)]));
  const evidenceHashes = readJson<Record<string, string>>(path.join(out, "original-evidence-hashes.json"));
  check("三份修前拷贝与原审哈希一致", files.every((file) => sha(path.join(out, "before", file)) === oldHashes[file]));
  const before = readJson<Question[]>(path.join(audit, "questions.json"));
  const markdown = readFileSync(files[0], "utf8");
  const answerMarkdown = readFileSync(files[1], "utf8");
  const parsed = parseTopic("Y", markdown, answerMarkdown);
  const typed = typedTopicFileSchema.parse(readJson(files[2]));
  const topics = topicsFileSchema.parse(readJson("content/topics.json")).filter((t) => t.prefix === "Y");
  const input = { topics, parsed: [parsed], typed: [typed], retiredIds: readJson<string[]>("content/retired-ids.json"), requireAll: false, includeDrafts: true };
  const built = buildBank(input, new Date().toISOString());
  if (!built.bank) throw new Error(JSON.stringify(built.errors));
  const bank = built.bank;
  const after = bank.questions;
  const afterById = new Map(after.map((q) => [q.id, q]));
  check("真实parser/schema/buildBank无错误及Docker警告", !built.errors.length && !built.warnings.length, { errors: built.errors, warnings: built.warnings });
  check("252题题号/题序/唯一性保持", after.length === 252 && same(before.map((q) => q.id), after.map((q) => q.id)) && new Set(after.map((q) => q.id)).size === 252);
  check("题型162单选37多选28填空25简答保持", same(counts(after), { single: 162, multiple: 37, fill: 28, short: 25, code: 0 }), counts(after));
  const oldTyped = typedTopicFileSchema.parse(readJson(path.join(out, "before", files[2])));
  check("4章状态/章节题序均保持draft", same(Object.keys(typed.chapters), ["Y1", "Y2", "Y3", "Y4"]) && Object.entries(typed.chapters).every(([id, chapter]) => chapter.status === "draft" && same(chapter.questions.map((q) => q.id), oldTyped.chapters[id].questions.map((q) => q.id))));
  check("Markdown与typed题号顺序逐章一致", parsed.chapters.every((c) => same(c.questionIds, typed.chapters[c.id].questions.map((q) => q.id)) && c.questionIds.every((id, i) => id === c.id + "-" + (i + 1))));
  const invariantFailures = before.flatMap((old) => {
    const q = afterById.get(old.id);
    if (!q) return [{ id: old.id, issues: ["缺题"] }];
    const issues: string[] = [];
    if (q.type !== old.type || q.chapterId !== old.chapterId || q.section !== old.section) issues.push("题型/章节/小节改变");
    if (!same(q.options?.map(({ key, correct }) => ({ key, correct })), old.options?.map(({ key, correct }) => ({ key, correct })))) issues.push("选项数量/顺序/正确字母改变");
    if (q.blankCount !== old.blankCount || q.blankOrder !== old.blankOrder) issues.push("填空配置改变");
    if (old.citations.some((c) => !q.citations.some((now) => same(c, now)))) issues.push("原文引用丢失");
    return issues.length ? [{ id: q.id, issues }] : [];
  });
  check("逐题结构/全部选择题正确字母/填空配置/原文引用保持", !invariantFailures.length, invariantFailures);
  const fillMismatches = after.filter((q) => q.type === "fill").filter((q) => {
    const marker = q.blankOrder === "ordered" ? "[填空题·有序]" : "[填空题·无序]";
    return !markdown.split(/\r?\n/).includes(`- **${q.id}** ${marker} ${q.stem}`) || (q.stem.match(/____/g) ?? []).length !== q.blankCount;
  }).map((q) => q.id);
  check("28道填空题卷/stem/空数/顺序同步", after.filter((q) => q.type === "fill").length === 28 && !fillMismatches.length, fillMismatches);
  const catalog = new Catalog(bank);
  const leaks = after.filter((q) => {
    const view = catalog.getForAnswering([q.id]);
    return view.length !== 1 || view[0].id !== q.id || /"(?:correct|referenceAnswer|citations)"\s*:/.test(JSON.stringify(view));
  }).map((q) => q.id);
  check("252题Catalog作答视图实际返回对应题且不含答案字段", !leaks.length, leaks);
  check("252题Catalog答案视图与实际合并结果完全相同", after.every((q) => same(catalog.getWithAnswer([q.id]), [q])));
  const comparisons = before.map((old) => ({ id: old.id, changed: !same(old, afterById.get(old.id)), before: old, after: afterById.get(old.id) }));
  const changed = comparisons.filter((q) => q.changed);
  const findingGroups = readJson<{ groups: { id: string; primaryQuestionIds: string[]; relatedExplanationIds: string[] }[] }>(path.join(audit, "findings.json")).groups;
  const resolutions = findingGroups.map((g) => ({ id: g.id, requiredIds: [...new Set([...g.primaryQuestionIds, ...g.relatedExplanationIds])], unchangedIds: [...g.primaryQuestionIds, ...g.relatedExplanationIds].filter((id) => !changed.some((q) => q.id === id)) }));
  check("16组必修所列44个题号均有内容/解析修订（语义另审）", resolutions.every((g) => !g.unchangedIds.length), resolutions);
  const newCitations = after.flatMap((q) => q.citations.filter((c) => !before.find((old) => old.id === q.id)!.citations.some((old) => same(c, old))).map((c) => ({ id: q.id, ...c })));
  const invalidCitations = newCitations.filter((c) => !c.label.startsWith("核对来源：") || new URL(c.url).protocol !== "https:" || !officialHosts.has(new URL(c.url).hostname));
  check("新增勘误引用使用核对来源前缀及HTTPS官方一级来源", !invalidCitations.length, { count: newCitations.length, invalidCitations });
  const rawOfficial = [...answerMarkdown.matchAll(/\[[^\]]+\]\((https:\/\/[^\s)]+)\)/g)].map((m) => m[1]).filter((url) => officialHosts.has(new URL(url).hostname)).sort();
  const parsedOfficial = after.flatMap((q) => q.citations.filter((c) => officialHosts.has(new URL(c.url).hostname)).map((c) => c.url)).sort();
  check("所有答案尾部官方链接完整解析到citations", same(rawOfficial, parsedOfficial) && after.every((q) => !/\[[^\]]+\]\(https:\/\//.test(q.referenceAnswer)), { raw: rawOfficial.length, parsed: parsedOfficial.length });
  const citations = after.flatMap((q) => q.citations.map((c) => ({ id: q.id, ...c })));
  const pageUrls = [...new Set(citations.map((c) => { const url = new URL(c.url); url.hash = ""; return url.href; }))];
  const badPages = pageUrls.filter((url) => new URL(url).protocol !== "https:" || !(officialHosts.has(new URL(url).hostname) || new URL(url).hostname === "xiaolincoding.com"));
  check("实际引用域名均在原文/官方白名单", !badPages.length, badPages);
  const pages = [];
  for (let i = 0; i < pageUrls.length; i += 3) {
    const batch = await Promise.all(pageUrls.slice(i, i + 3).filter((url) => !badPages.includes(url)).map(pageEvidence));
    for (const page of batch) {
      const relevant = citations.filter((c) => { const url = new URL(c.url); url.hash = ""; return url.href === page.url; });
      const fragments = [...new Set(relevant.map((c) => new URL(c.url).hash.slice(1)).filter(Boolean))].map((fragment) => ({ fragment, found: page.ids.has(fragment) || page.ids.has(decodeURIComponent(fragment)) }));
      const host = new URL(page.url).hostname;
      const titleValid = host === "xiaolincoding.com" ? /Docker.*小林coding/.test(page.title) : host.includes("docker.com") ? /Docker/i.test(page.title) : host === "kubernetes.io" ? /Kubernetes/i.test(page.title) : /Linux|Kernel|manual/i.test(page.title);
      const validHost = new URL(page.effectiveUrl).hostname === host;
      const passed = page.httpStatus === 200 && titleValid && validHost && fragments.every((f) => f.found);
      const { ids: _ids, ...metadata } = page;
      const details = { ...metadata, titleValid, fragments, referencedBy: [...new Set(relevant.map((c) => c.id))], passed };
      pages.push(details);
      check("引用页面及实际小节锚点：" + page.url, passed, details);
    }
  }
  check("检查期间源文件无并发变化", files.every((file) => sha(file) === sourceHashes[file]));
  check("原审证据及分章报告未覆盖", Object.entries(evidenceHashes).every(([file, hash]) => sha(file) === hash));
  const summary = { completedAt: new Date().toISOString(), passed: checks.every((c) => c.passed), sourceHashes, questionCount: after.length, counts: counts(after), changedQuestionCount: changed.length, changedQuestionIds: changed.map((q) => q.id), resolutions, newOfficialCitationCount: newCitations.length, referencePageCount: pages.length, singleKeys: after.filter((q) => q.type === "single").map((q) => ({ id: q.id, key: keys(q) })), checks, limitations: ["内容正确性需独立逐题复审，不能由题号或文字变化证明", "未调用DeepSeek或执行Docker资源操作", "原审脚本哈希/单一引用页假设仅适用于修前材料"] };
  save("questions-after.json", after);
  save("before-after.json", comparisons);
  save("links-after.json", { pages, newCitations });
  save("checks-after.json", summary);
  for (const c of checks) console.log(`${c.passed ? "PASS" : "FAIL"} ${c.name}`);
  console.log(JSON.stringify({ passed: summary.passed, checks: checks.length, changedQuestionCount: changed.length, referencePageCount: pages.length, newOfficialCitationCount: newCitations.length }));
  if (!summary.passed) process.exitCode = 1;
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
