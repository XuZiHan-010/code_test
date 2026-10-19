import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { buildBank } from "../../src/server/content/build";
import { Catalog } from "../../src/server/content/catalog";
import { parseTopic } from "../../src/server/content/parser";
import { typedTopicFileSchema } from "../../src/server/content/typed-schema";

async function main() {
  const sources = ["interview-practice/docker.md", "interview-practice/answers-xiaolin/docker.md", "content/typed/docker.json"];
  const hashes = Object.fromEntries(sources.map((file) => [file, createHash("sha256").update(readFileSync(file)).digest("hex")]));
  const parsed = parseTopic("Y", readFileSync(sources[0], "utf8"), readFileSync(sources[1], "utf8"));
  const typed = typedTopicFileSchema.parse(JSON.parse(readFileSync(sources[2], "utf8")));
  const topics = JSON.parse(readFileSync("content/topics.json", "utf8")).filter((topic: { prefix: string }) => topic.prefix === "Y");
  const result = buildBank({ topics, parsed: [parsed], typed: [typed], retiredIds: JSON.parse(readFileSync("content/retired-ids.json", "utf8")), requireAll: false, includeDrafts: true }, new Date().toISOString());
  if (!result.bank) throw new Error(JSON.stringify(result.errors));
  const bank = result.bank;
  const questionLines = readFileSync(sources[0], "utf8").split(/\r?\n/);
  const fillMismatches = bank.questions.filter((q) => q.type === "fill").filter((q) => {
    const line = questionLines.find((line) => line.startsWith(`- **${q.id}** `));
    const marker = q.blankOrder === "ordered" ? "[填空题·有序]" : "[填空题·无序]";
    return line !== `- **${q.id}** ${marker} ${q.stem}`;
  }).map((q) => q.id);
  const sequences = parsed.chapters.map((chapter) => ({ id: chapter.id, contiguous: chapter.questionIds.every((id, index) => id === `${chapter.id}-${index + 1}`), typedOrderMatches: JSON.stringify(chapter.questionIds) === JSON.stringify(typed.chapters[chapter.id].questions.map((q) => q.id)) }));
  const catalog = new Catalog(bank);
  const answeringResults = bank.questions.map((q) => ({ id: q.id, questions: catalog.getForAnswering([q.id]) }));
  const missingAnsweringQuestions = answeringResults.filter((result) => result.questions.length !== 1 || result.questions[0].id !== result.id).map((result) => result.id);
  const leaks = answeringResults.filter((result) => /"(?:correct|referenceAnswer|citations)"\s*:/.test(JSON.stringify(result.questions))).map((result) => result.id);
  const missingAnswerResults = bank.questions.filter((q) => {
    const answers = catalog.getWithAnswer([q.id]);
    return answers.length !== 1 || JSON.stringify(answers[0]) !== JSON.stringify(q);
  }).map((q) => q.id);
  const markdownIds = (file: string) => [...readFileSync(file, "utf8").matchAll(/^- \*\*(Y\d+-\d+)\*\*/gm)].map((match) => match[1]);
  const questionAnswerOrderMatches = JSON.stringify(markdownIds(sources[0])) === JSON.stringify(markdownIds(sources[1]));
  const citationPages = [...new Set(bank.questions.flatMap((q) => q.citations.map((citation) => {
    const url = new URL(citation.url); return url.origin + url.pathname;
  })))];
  const chapterAnchors = bank.chapters.flatMap((chapter) => chapter.sourceUrl ? [new URL(chapter.sourceUrl).hash.slice(1)] : []);
  // source.html 使用 curl 下载；本机 fetch 不会自动采用 HTTPS_PROXY。
  const html = readFileSync("docs/docker-review-2026-10-16/source.html", "utf8");
  const allAnchors = [...new Set(bank.questions.flatMap((q) => q.citations.map((citation) => new URL(citation.url).hash.slice(1))))];
  const missingAnchors = [...new Set([...allAnchors, ...chapterAnchors])].filter((anchor) => ![`id="${anchor}"`, `id="${decodeURIComponent(anchor)}"`].some((needle) => html.includes(needle)));
  const counts = (questions: typeof bank.questions) => Object.fromEntries(["single", "multiple", "fill", "short", "code"].map((type) => [type, questions.filter((q) => q.type === type).length]));
  const singlePositions = bank.questions.filter((q) => q.type === "single").reduce<Record<string, number>>((total, q) => { const key = q.options!.find((option) => option.correct)!.key; total[key] = (total[key] ?? 0) + 1; return total; }, {});
  const multipleKeys = bank.questions.filter((q) => q.type === "multiple").map((q) => ({ id: q.id, keys: q.options!.filter((option) => option.correct).map((option) => option.key).join("") }));
  const multiplePrefixPattern = multipleKeys.filter((q) => q.keys === "ABCDEF".slice(0, q.keys.length));
  const summary = { hashes, questionCount: bank.questions.length, counts: counts(bank.questions), chapters: parsed.chapters.map((chapter) => ({ id: chapter.id, title: chapter.title, status: typed.chapters[chapter.id].status, count: chapter.questionIds.length, counts: counts(bank.questions.filter((q) => q.chapterId === chapter.id)) })), errors: result.errors, warnings: result.warnings, sequences, fillMismatches, missingAnsweringQuestions, leaks, singlePositions, multipleKeys, multiplePrefixPattern, sourceTitle: /<title>(.*?)<\/title>/.exec(html)?.[1], anchorCount: allAnchors.length, missingAnchors, sectionCount: new Set(bank.questions.map((q) => q.section)).size };
  const extendedSummary = { ...summary, questionAnswerOrderMatches, missingAnswerResults, citationPages, sourceHtmlSha256: createHash("sha256").update(readFileSync("docs/docker-review-2026-10-16/source.html")).digest("hex") };
  writeFileSync("docs/docker-review-2026-10-16/checks.json", JSON.stringify(extendedSummary, null, 2) + "\n", "utf8");
  writeFileSync("docs/docker-review-2026-10-16/questions.json", JSON.stringify(bank.questions, null, 2) + "\n", "utf8");
  console.log(JSON.stringify(extendedSummary, null, 2));
  if (!questionAnswerOrderMatches || missingAnswerResults.length || citationPages.length !== 1 || citationPages[0] !== "https://xiaolincoding.com/interview/docker.html" || fillMismatches.length || missingAnsweringQuestions.length || leaks.length || missingAnchors.length || sequences.some((sequence) => !sequence.contiguous || !sequence.typedOrderMatches)) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
