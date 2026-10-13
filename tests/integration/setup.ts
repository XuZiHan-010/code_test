import { sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { Catalog, setCatalogForTesting } from "@/server/content/catalog";
import { closeDb, getDb } from "@/server/db/client";
import { runMigrations } from "@/server/db/migrate";
import { fixtureBank } from "../fixtures/bank";

// 集成测试使用独立的库（docker compose 启动时创建），每个测试前清空所有表。
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ?? "postgres://quiz:quiz@localhost:54329/quiz_test";
process.env.GRADER = "fake";
// 测试里由用例显式触发评分，不让交卷自动触发
process.env.GRADING_AUTORUN = "off";

beforeAll(async () => {
  await runMigrations(process.env.DATABASE_URL!);
  setCatalogForTesting(new Catalog(fixtureBank));
});

beforeEach(async () => {
  await getDb().execute(
    sql`TRUNCATE TABLE notebook_items, question_stats, attempt_answers, attempts, sessions, users CASCADE`,
  );
});

afterAll(async () => {
  await closeDb();
});
