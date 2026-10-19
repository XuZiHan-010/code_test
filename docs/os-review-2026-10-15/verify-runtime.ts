// Review-only verification. Does not write content/dist or alter chapter status.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildBank } from "../../src/server/content/build";
import { Catalog } from "../../src/server/content/catalog";
import { parseTopic } from "../../src/server/content/parser";
import { topicsFileSchema, typedTopicFileSchema } from "../../src/server/content/typed-schema";

const read = (file: string) => readFileSync(path.resolve(file), "utf8");
const topics = topicsFileSchema.parse(JSON.parse(read("content/topics.json"))).filter(t => t.prefix === "V");
assert.equal(topics.length, 1);
assert.equal(topics[0].slug, "os");
assert.equal(topics[0].column, "计算机基础");
const typed = typedTopicFileSchema.parse(JSON.parse(read("content/typed/os.json")));
const parsed = parseTopic("V", read("interview-practice/os.md"), read("interview-practice/answers-xiaolin/os.md"));
const input = { topics, typed: [typed], parsed: [parsed], retiredIds: [], requireAll: false };
const drafts = buildBank({ ...input, includeDrafts: true }, new Date().toISOString());
assert.deepEqual(drafts.errors, []);
assert.ok(drafts.bank);
assert.equal(drafts.bank.chapters.length, 7);
assert.equal(drafts.bank.questions.length, 716);
const catalog = new Catalog(drafts.bank);
const ids = drafts.bank.questions.map(q => q.id);
const answering = catalog.getForAnswering(ids);
assert.equal(answering.length, 716);
for (const question of answering) {
  assert.ok(!("referenceAnswer" in question));
  assert.ok(!("citations" in question));
  for (const option of question.options ?? []) assert.ok(!("correct" in option));
  const original = drafts.bank.questions.find(q => q.id === question.id)!;
  assert.equal(question.stem, original.stem);
  assert.ok(original.referenceAnswer.length > 0);
  assert.ok(original.citations.length > 0);
  assert.equal(catalog.locate(question.id)?.topic.slug, "os");
}
const columns = catalog.listColumns();
assert.equal(columns[0].topics[0].questionCount, 716);
assert.equal(columns[0].topics[0].chapterCount, 7);
const production = buildBank(input, new Date().toISOString());
assert.ok(production.bank);
assert.equal(production.bank.questions.length, 0);
assert.equal(production.bank.chapters.length, 0);
const requireAll = buildBank({ ...input, requireAll: true }, new Date().toISOString());
assert.equal(requireAll.bank, null);
assert.equal(requireAll.errors.filter(error => error.rule === "V12").length, 7);
const result = {
  draftQuestions: answering.length,
  draftChapters: drafts.bank.chapters.length,
  warnings: drafts.warnings,
  answeringLeaks: 0,
  productionQuestions: production.bank.questions.length,
  requireAllRejectedDraftChapters: 7,
  scope: "Pure buildBank/Catalog verification; no HTTP, browser, database, or model calls.",
};
writeFileSync(process.argv[2] ?? "docs/os-review-2026-10-15/runtime-checks.json", JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(JSON.stringify(result, null, 2));
