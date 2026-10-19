import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { buildBank } from "../../../src/server/content/build";
import { Catalog } from "../../../src/server/content/catalog";
import { parseTopic } from "../../../src/server/content/parser";
import { topicsFileSchema, typedTopicFileSchema } from "../../../src/server/content/typed-schema";
import type { Question, QuestionOption } from "../../../src/server/content/types";

// Run from repository root: npx tsx docs/git-review-2026-10-15/fixes/verify.ts
// Only this fixes directory is written. The production bank and original audit evidence are read-only.
const outputDir = "docs/git-review-2026-10-15/fixes";
const auditDir = "docs/git-review-2026-10-15";
const sourceFiles = ["interview-practice/git.md", "interview-practice/answers-xiaolin/git.md", "content/typed/git.json"];
const execute = promisify(execFile);
const jsonEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const readJson = <T>(file: string): T => JSON.parse(readFileSync(file, "utf8"));
const saveJson = (name: string, value: unknown) => writeFileSync(path.join(outputDir, name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
const correctKeys = (q: Question) => (q.options ?? []).filter((o) => o.correct).map((o) => o.key).join("");
const optionContent = (options?: QuestionOption[]) => (options ?? []).map(({ text, correct }) => ({ text, correct })).sort((a, b) => a.text.localeCompare(b.text));
const distribution = (values: string[]) => values.reduce<Record<string, number>>((all, key) => { all[key] = (all[key] ?? 0) + 1; return all; }, {});
const counts = (questions: Question[]) => Object.fromEntries(["single", "multiple", "fill", "short", "code"].map((type) => [type, questions.filter((q) => q.type === type).length]));
const prefixKeys = (q: Question) => correctKeys(q) === "ABCDEF".slice(0, correctKeys(q).length);
const htmlDecode = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#(?:39|x27);/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const htmlIds = (html: string) => new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((m) => htmlDecode(m[1])));
const titleOf = (html: string) => htmlDecode(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "").trim();

interface LinkPage {
  url: string;
  fetchedAt: string;
  httpStatus: number;
  effectiveUrl: string;
  htmlFile: string;
  sha256: string;
  error: string | null;
}

async function loadPage(url: string): Promise<LinkPage & { html: string; cacheUsed: boolean }> {
  const cacheDir = path.join(outputDir, "official-pages");
  mkdirSync(cacheDir, { recursive: true });
  const base = `${new URL(url).pathname.split("/").filter(Boolean).join("-")}-${sha256(url).slice(0, 12)}`;
  const htmlFile = path.join(cacheDir, `${base}.html`);
  const metaFile = path.join(cacheDir, `${base}.json`);
  if (existsSync(metaFile) && existsSync(htmlFile)) {
    const meta = readJson<LinkPage>(metaFile);
    const html = readFileSync(htmlFile, "utf8");
    if (meta.url !== url || meta.sha256 !== sha256(readFileSync(htmlFile))) throw new Error(`缓存校验失败：${url}`);
    return { ...meta, html, cacheUsed: true };
  }
  let httpStatus = 0;
  let effectiveUrl = url;
  let error: string | null = null;
  try {
    const result = await execute("curl.exe", ["--location", "--silent", "--show-error", "--connect-timeout", "15", "--max-time", "45", "--output", htmlFile, "--write-out", "%{http_code}\n%{url_effective}", url], { encoding: "utf8", maxBuffer: 1024 * 1024 });
    const lines = result.stdout.trim().split(/\r?\n/);
    httpStatus = Number(lines[0]);
    effectiveUrl = lines[1] || url;
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }
  const html = existsSync(htmlFile) ? readFileSync(htmlFile, "utf8") : "";
  const meta: LinkPage = { url, fetchedAt: new Date().toISOString(), httpStatus, effectiveUrl, htmlFile, sha256: sha256(Buffer.from(html, "utf8")), error };
  writeFileSync(metaFile, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
  return { ...meta, html, cacheUsed: false };
}

async function main() {
  mkdirSync(outputDir, { recursive: true });
  const command = "npx tsx docs/git-review-2026-10-15/fixes/verify.ts";
  const evidenceFiles = ["checks.json", "questions.json", "source.html", "audit.ts"].map((file) => path.join(auditDir, file));
  const evidenceHashes = Object.fromEntries(evidenceFiles.map((file) => [file, sha256(readFileSync(file))]));
  const hashes = Object.fromEntries(sourceFiles.map((file) => [file, sha256(readFileSync(file))]));
  const before = readJson<Question[]>(path.join(auditDir, "questions.json"));
  const oldChecks = readJson<{ chapters: { id: string; title: string; status: string; count: number }[]; counts: Record<string, number> }>(path.join(auditDir, "checks.json"));
  const questionMarkdown = readFileSync(sourceFiles[0], "utf8");
  const answerMarkdown = readFileSync(sourceFiles[1], "utf8");
  const parsed = parseTopic("X", questionMarkdown, answerMarkdown);
  const typed = typedTopicFileSchema.parse(readJson(sourceFiles[2]));
  const topics = topicsFileSchema.parse(readJson("content/topics.json")).filter((topic) => topic.prefix === "X");
  const result = buildBank({ topics, parsed: [parsed], typed: [typed], retiredIds: readJson<string[]>("content/retired-ids.json"), requireAll: false, includeDrafts: true }, new Date().toISOString());
  if (!result.bank) throw new Error(`真实buildBank失败：${JSON.stringify(result.errors)}`);
  const bank = result.bank;
  const after = bank.questions;
  const byId = new Map(after.map((q) => [q.id, q]));
  const catalog = new Catalog(bank);
  const checks: { name: string; passed: boolean; details: unknown }[] = [];
  const check = (name: string, passed: boolean, details: unknown = null) => { checks.push({ name, passed, details }); };
  check("真实parser/schema/buildBank（includeDrafts内存合并）", !result.errors.length, { errors: result.errors, warnings: result.warnings });
  check("题目总数252与题型170/30/28/24/0", after.length === 252 && jsonEqual(counts(after), oldChecks.counts), counts(after));
  check("252个题号、题序及唯一性不变", jsonEqual(before.map((q) => q.id), after.map((q) => q.id)) && new Set(after.map((q) => q.id)).size === 252);
  const chapters = parsed.chapters.map((chapter) => ({ id: chapter.id, title: chapter.title, status: typed.chapters[chapter.id].status, count: chapter.questionIds.length }));
  check("4章标题/题数/次序/draft状态不变", chapters.length === 4 && jsonEqual(chapters, oldChecks.chapters.map(({ id, title, status, count }) => ({ id, title, status, count }))) && chapters.every((c) => c.status === "draft"), chapters);
  const sequenceProblems = parsed.chapters.filter((chapter) => !chapter.questionIds.every((id, i) => id === `${chapter.id}-${i + 1}`) || !jsonEqual(chapter.questionIds, typed.chapters[chapter.id].questions.map((q) => q.id))).map((c) => c.id);
  check("Markdown与typed题序一致且章节内连续", sequenceProblems.length === 0, sequenceProblems);
  const invariants = before.flatMap((old) => {
    const q = byId.get(old.id);
    if (!q) return [{ id: old.id, issues: ["缺题"] }];
    const issues: string[] = [];
    if (q.type !== old.type || q.chapterId !== old.chapterId || q.section !== old.section) issues.push("题型/章节/小节改变");
    if (q.options?.length !== old.options?.length) issues.push("选项数量改变");
    if ((q.options ?? []).filter((o) => o.correct).length !== (old.options ?? []).filter((o) => o.correct).length) issues.push("正确选项数量改变");
    if (q.type === "single" && correctKeys(old) !== correctKeys(q)) issues.push("单选正确字母改变");
    if (q.blankCount !== old.blankCount || q.blankOrder !== old.blankOrder) issues.push("填空空数或order改变");
    for (const option of old.options ?? []) {
      const sameText = (q.options ?? []).filter((o) => o.text === option.text);
      if (sameText.some((o) => o.correct !== option.correct)) issues.push(`未改文案的选项真假改变：${option.text}`);
    }
    for (const citation of old.citations) if (!q.citations.some((c) => c.url === citation.url && c.label === citation.label)) issues.push(`原文引用丢失：${citation.url}`);
    return issues.length ? [{ id: q.id, issues }] : [];
  });
  check("逐题结构、正确项数量/单选字母、填空配置、同文选项真假、原文引用保持", invariants.length === 0, invariants);
  const lines = questionMarkdown.split(/\r?\n/);
  const fillProblems = after.filter((q) => q.type === "fill").flatMap((q) => {
    const marker = q.blankOrder === "ordered" ? "[填空题·有序]" : "[填空题·无序]";
    const line = lines.find((entry) => entry.startsWith(`- **${q.id}** `));
    return line === `- **${q.id}** ${marker} ${q.stem}` && (q.stem.match(/____/g) ?? []).length === q.blankCount ? [] : [{ id: q.id, line, runtimeStem: q.stem }];
  });
  check("全部28道填空的题卷标记/stem/空数与运行时一致", after.filter((q) => q.type === "fill").length === 28 && fillProblems.length === 0, fillProblems);
  const leaks = after.flatMap((q) => {
    const answering = catalog.getForAnswering([q.id]);
    if (answering.length !== 1 || answering[0].id !== q.id) return [{ id: q.id, issue: "Catalog未返回准确的一题" }];
    return /"(?:correct|referenceAnswer|citations)"\s*:/.test(JSON.stringify(answering)) ? [{ id: q.id, issue: "交卷前数据泄漏字段" }] : [];
  });
  check("Catalog每题实际返回一题且不泄漏correct/referenceAnswer/citations", leaks.length === 0, leaks);
  const oldPrefix = before.filter((q) => q.type === "multiple" && prefixKeys(q));
  const multipleMoves = oldPrefix.map((old) => { const q = byId.get(old.id)!; return { id: q.id, before: correctKeys(old), after: correctKeys(q), stillPrefix: prefixKeys(q), optionSequenceChanged: !jsonEqual(old.options, q.options), optionContentChanged: !jsonEqual(optionContent(old.options), optionContent(q.options)) }; });
  check("原24道前缀多选均完成重排且不再为连续前缀", oldPrefix.length === 24 && multipleMoves.every((q) => q.optionSequenceChanged && !q.stillPrefix), { beforeDistribution: distribution(multipleMoves.map((q) => q.before)), afterDistribution: distribution(multipleMoves.map((q) => q.after)), questions: multipleMoves });
  const comparisons = before.map((old) => {
    const q = byId.get(old.id)!;
    const fields = { stem: old.stem !== q.stem, optionContent: !jsonEqual(optionContent(old.options), optionContent(q.options)), optionSequence: !jsonEqual(old.options, q.options), referenceAnswer: old.referenceAnswer !== q.referenceAnswer, citations: !jsonEqual(old.citations, q.citations) };
    const changed = Object.values(fields).some(Boolean);
    const classification = !changed ? "未变更" : fields.stem || fields.optionContent || fields.citations || !fields.optionSequence ? "含内容改写" : fields.referenceAnswer ? "选项重排并同步解析（人工复核语义）" : "仅选项顺序变化";
    return { id: q.id, changed, classification, fields, before: old, after: q };
  });
  const positionCandidates = after.flatMap((q) => {
    const matches = [...q.referenceAnswer.matchAll(/(?:前[一二三四五六两\d]+项|第[一二三四五六七八九十\d]+(?:项|个选项)|(?:选项\s*[A-F](?:\s*[、,，和及]\s*[A-F])*)|(?:[A-F](?:\s*[、,，和及]\s*[A-F]){1,5}\s*(?:项|均|都|正确|错误)))/g)];
    return matches.length ? [{ id: q.id, reordered: multipleMoves.some((entry) => entry.id === q.id), matches: matches.map((m) => m[0]), referenceAnswer: q.referenceAnswer, options: q.options }] : [];
  });
  // Candidates require reading their complete answer and options; this is not a semantic correctness test.
  const newOfficial = after.flatMap((q) => q.citations.filter((c) => !before.find((old) => old.id === q.id)!.citations.some((old) => old.url === c.url && old.label === c.label)).map((c) => ({ id: q.id, ...c })));
  const badOfficial = newOfficial.filter((c) => !c.label.startsWith("核对来源：") || new URL(c.url).protocol !== "https:" || new URL(c.url).hostname !== "git-scm.com");
  check("新增引用全部使用核对来源前缀及HTTPS Git官方域名", badOfficial.length === 0, { count: newOfficial.length, invalid: badOfficial });
  const rawOfficialUrls = [...answerMarkdown.matchAll(/\[[^\]]+\]\((https:\/\/git-scm\.com\/[^\s)]+)\)/g)].map((m) => m[1]).sort();
  const parsedOfficialUrls = after.flatMap((q) => q.citations.filter((c) => new URL(c.url).hostname === "git-scm.com").map((c) => c.url)).sort();
  const unparsedOfficial = after.filter((q) => /\[[^\]]+\]\(https:\/\/git-scm\.com\//.test(q.referenceAnswer)).map((q) => q.id);
  check("答案尾部所有官方链接完整解析为citations而非残留正文", jsonEqual(rawOfficialUrls, parsedOfficialUrls) && !unparsedOfficial.length, { rawCount: rawOfficialUrls.length, parsedCount: parsedOfficialUrls.length, unparsedOfficial });
  const citations = after.flatMap((q) => q.citations.map((c) => ({ id: q.id, ...c })));
  const pageUrls = [...new Set(citations.map((c) => { const url = new URL(c.url); url.hash = ""; return url.href; }))];
  const forbiddenUrls = pageUrls.filter((url) => !["git-scm.com", "xiaolincoding.com"].includes(new URL(url).hostname) || new URL(url).protocol !== "https:");
  check("实际引用仅来自授权小林源站与Git官方HTTPS页面", forbiddenUrls.length === 0, forbiddenUrls);
  const pages: unknown[] = [];
  for (let i = 0; i < pageUrls.length; i += 3) {
    const batch = pageUrls.slice(i, i + 3).filter((url) => !forbiddenUrls.includes(url));
    const fetched = await Promise.all(batch.map(loadPage));
    for (const page of fetched) {
      const pageCitations = citations.filter((c) => { const url = new URL(c.url); url.hash = ""; return url.href === page.url; });
      const ids = htmlIds(page.html);
      const fragments = [...new Set(pageCitations.map((c) => new URL(c.url).hash.slice(1)).filter(Boolean))].map((fragment) => ({ fragment, found: ids.has(fragment) || ids.has(decodeURIComponent(fragment)) }));
      const title = titleOf(page.html);
      const official = new URL(page.url).hostname === "git-scm.com";
      const titleValid = official ? /^Git\s*[-–|].*(?:Documentation|Git)/i.test(title) : /Git.*小林coding/.test(title);
      const passed = page.httpStatus === 200 && !page.error && titleValid && fragments.every((f) => f.found) && new URL(page.effectiveUrl).hostname === new URL(page.url).hostname;
      const { html: _html, ...meta } = page;
      void _html;
      const details = { ...meta, title, titleValid, fragments, passed, referencedBy: [...new Set(pageCitations.map((c) => c.id))] };
      pages.push(details);
      check(`引用页及全部锚点：${page.url}`, passed, details);
    }
  }
  const cachedSource = readFileSync(path.join(auditDir, "source.html"), "utf8");
  const sourceIds = htmlIds(cachedSource);
  const originalFragments = [...new Set(before.flatMap((q) => q.citations.map((c) => new URL(c.url).hash.slice(1))))];
  const missingOriginal = originalFragments.filter((fragment) => !sourceIds.has(fragment) && !sourceIds.has(decodeURIComponent(fragment)));
  check("原审源文快照23个原始锚点仍完整保留", originalFragments.length === 23 && !missingOriginal.length, { count: originalFragments.length, missing: missingOriginal });
  check("最终检查期间三份题库文件保持稳定", sourceFiles.every((file) => sha256(readFileSync(file)) === hashes[file]), hashes);
  check("未覆盖或修改原审证据", evidenceFiles.every((file) => sha256(readFileSync(file)) === evidenceHashes[file]), evidenceHashes);
  const changedQuestions = comparisons.filter((q) => q.changed);
  const optionOrderOnlyIds = changedQuestions.filter((q) => q.classification === "仅选项顺序变化").map((q) => q.id);
  const technicalOrExplanationChangedIds = changedQuestions.filter((q) => q.classification !== "仅选项顺序变化").map((q) => q.id);
  const summary = { command, completedAt: new Date().toISOString(), hashes, originalEvidenceHashes: evidenceHashes, questionCount: after.length, counts: counts(after), chapters, modifiedQuestionCount: changedQuestions.length, modifiedQuestionIds: changedQuestions.map((q) => q.id), changeClasses: distribution(changedQuestions.map((q) => q.classification)), exactChangeSplit: { optionOrderOnlyCount: optionOrderOnlyIds.length, optionOrderOnlyIds, technicalOrExplanationChangedCount: technicalOrExplanationChangedIds.length, technicalOrExplanationChangedIds, note: "两组互斥并覆盖全部变更题；解析改字（包括位置指代同步）计入技术内容/解析变动组，不借此断言技术语义改变。" }, singlePositions: distribution(after.filter((q) => q.type === "single").map(correctKeys)), multipleKeys: after.filter((q) => q.type === "multiple").map((q) => ({ id: q.id, keys: correctKeys(q) })), multipleAfterDistribution: distribution(after.filter((q) => q.type === "multiple").map(correctKeys)), positionCandidates, checks, passed: checks.every((entry) => entry.passed), limitations: ["结构检查、链接有效和单元测试不能证明技术语义；全部变更需由主审对照before-after逐题阅读。", "位置指代扫描仅列候选；字母表述、隐含前提、参考答案覆盖必须人工复核。", "未调用DeepSeek；不代表语义评分实测通过。", "本脚本不运行项目级content:validate或test:unit，也不写content/dist/bank.json。", "原audit.ts曾把字符串传给要求数组的getForAnswering；本脚本改用[q.id]并断言每次实际返回一题。"] };
  saveJson("questions-after.json", after);
  saveJson("before-after.json", comparisons);
  saveJson("links-after.json", { checkedAt: summary.completedAt, pages, newOfficial, forbiddenUrls });
  saveJson("checks-after.json", summary);
  const notes = [`# Git修复独立验证`, ``, `执行命令：\`${command}\``, `完成时间：${summary.completedAt}`, ``, `结果：${summary.passed ? "全部自动检查通过" : "存在失败项"}；${checks.filter((c) => c.passed).length}/${checks.length}项通过。`, ``, `使用真实parser、typed schema、buildBank及Catalog；includeDrafts仅在内存启用。`, ``, `变更题数：${changedQuestions.length}。分类：${JSON.stringify(summary.changeClasses)}。完整252题前后题干、全部选项、真假标记、参考答案及引用保存在before-after.json。`, ``, `互斥去重统计：仅选项顺序变化${optionOrderOnlyIds.length}题；技术内容或解析发生文字变动${technicalOrExplanationChangedIds.length}题（包含仅位置指代同步，不以文字变化判断语义变化）。逐题ID见checks-after.json的exactChangeSplit。`, ``, `原24道前缀多选调整后键组：${JSON.stringify(distribution(multipleMoves.map((q) => q.after)))}。`, ``, `位置指代候选：${positionCandidates.length ? positionCandidates.map((q) => q.id).join("、") : "无"}。应结合完整选项与解析人工复核，扫描本身不作语义通过结论。`, ``, ...checks.map((entry) => `- ${entry.passed ? "通过" : "失败"}：${entry.name}`), ``, `## 局限`, ``, ...summary.limitations.map((text) => `- ${text}`), ``].join("\n");
  writeFileSync(path.join(outputDir, "verification-notes.md"), notes, "utf8");
  for (const entry of checks) console.log(`${entry.passed ? "PASS" : "FAIL"} ${entry.name}`);
  console.log(JSON.stringify({ passed: summary.passed, modifiedQuestionCount: changedQuestions.length, counts: summary.counts, positionCandidateIds: positionCandidates.map((q) => q.id), officialPageCount: pages.length }, null, 2));
  if (!summary.passed) process.exitCode = 1;
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
