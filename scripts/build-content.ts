/**
 * 解析 Markdown 题库，与 content/typed/ 的题型数据合并并校验，生成 content/dist/bank.json。
 *
 *   npm run content:build       校验并写出 bank.json
 *   npm run content:validate    只校验，不写文件
 *
 * 设置 CONTENT_REQUIRE_ALL=1 时，要求每个章节都已通过抽查（规则 V12）。
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildBank } from "../src/server/content/build";
import { ContentParseError, parseTopic } from "../src/server/content/parser";
import {
  retiredIdsSchema,
  topicsFileSchema,
  typedTopicFileSchema,
  type TypedTopicFile,
} from "../src/server/content/typed-schema";
import type { ParsedTopic } from "../src/server/content/types";

const root = process.cwd();
const validateOnly = process.argv.includes("--validate-only");
const requireAll = process.env.CONTENT_REQUIRE_ALL === "1";
// 仅供本地开发：在抽查完成之前也能看到 draft 章节。上线构建不得使用。
const includeDrafts = process.env.CONTENT_INCLUDE_DRAFTS === "1";

function readText(...segments: string[]): string {
  return readFileSync(path.join(root, ...segments), "utf8");
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  if (includeDrafts && (requireAll || process.env.NODE_ENV === "production")) {
    fail("CONTENT_INCLUDE_DRAFTS 只能用于本地开发，不能和 CONTENT_REQUIRE_ALL 或生产环境一起使用。");
  }

  const topicsResult = topicsFileSchema.safeParse(
    JSON.parse(readText("content", "topics.json")),
  );
  if (!topicsResult.success) {
    fail(`content/topics.json 格式不符：\n${topicsResult.error.message}`);
  }
  const topics = topicsResult.data;

  const retiredResult = retiredIdsSchema.safeParse(
    JSON.parse(readText("content", "retired-ids.json")),
  );
  if (!retiredResult.success) {
    fail(`content/retired-ids.json 格式不符：\n${retiredResult.error.message}`);
  }

  const parsed: ParsedTopic[] = [];
  const typed: TypedTopicFile[] = [];
  for (const topic of topics) {
    try {
      parsed.push(
        parseTopic(
          topic.prefix,
          readText("interview-practice", `${topic.slug}.md`),
          readText("interview-practice", "answers-xiaolin", `${topic.slug}.md`),
        ),
      );
    } catch (error) {
      if (error instanceof ContentParseError) {
        fail(`解析 ${topic.slug}.md 失败：${error.message}`);
      }
      throw error;
    }

    const typedPath = path.join(root, "content", "typed", `${topic.slug}.json`);
    if (!existsSync(typedPath)) continue;
    const typedResult = typedTopicFileSchema.safeParse(
      JSON.parse(readFileSync(typedPath, "utf8")),
    );
    if (!typedResult.success) {
      fail(`content/typed/${topic.slug}.json 格式不符：\n${typedResult.error.message}`);
    }
    if (typedResult.data.prefix !== topic.prefix) {
      fail(
        `content/typed/${topic.slug}.json 的 prefix 是 ${typedResult.data.prefix}，应为 ${topic.prefix}`,
      );
    }
    typed.push(typedResult.data);
  }

  const result = buildBank(
    { topics, parsed, typed, retiredIds: retiredResult.data, requireAll, includeDrafts },
    new Date().toISOString(),
  );

  for (const warning of result.warnings) {
    console.warn(`警告 ${warning.rule} [${warning.target}] ${warning.message}`);
  }
  if (!result.bank) {
    for (const error of result.errors) {
      console.error(`错误 ${error.rule} [${error.target}] ${error.message}`);
    }
    fail(`\n内容校验未通过：${result.errors.length} 个错误，${result.warnings.length} 个警告。`);
  }

  const totalChapters = parsed.reduce((n, t) => n + t.chapters.length, 0);
  const totalPoints = parsed.reduce((n, t) => n + t.points.length, 0);
  const allTypedChapters = typed.flatMap((f) => Object.values(f.chapters));
  const typedChapters = allTypedChapters.length;
  const approvedChapters = allTypedChapters.filter((c) => c.status === "approved").length;
  const { bank } = result;
  const byType = (type: string) => bank.questions.filter((q) => q.type === type).length;

  console.log(
    `题库：${topics.length} 个专题，${totalChapters} 章，${totalPoints} 个知识点。`,
  );
  console.log(
    `已生成题型的章节 ${typedChapters} 个，其中通过抽查 ${approvedChapters} 个；` +
      `本次输出 ${bank.chapters.length} 章 ${bank.questions.length} 题（单选 ${byType("single")}，多选 ${byType("multiple")}，简答 ${byType("short")}）。`,
  );
  console.log(`校验通过，${result.warnings.length} 个警告。`);
  if (includeDrafts) {
    console.warn("注意：CONTENT_INCLUDE_DRAFTS=1，输出包含尚未通过抽查的 draft 章节，仅供本地开发。");
  }

  if (validateOnly) return;
  const distDir = path.join(root, "content", "dist");
  mkdirSync(distDir, { recursive: true });
  writeFileSync(path.join(distDir, "bank.json"), JSON.stringify(bank), "utf8");
  console.log("已写出 content/dist/bank.json");
}

main();
