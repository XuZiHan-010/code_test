import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// 表结构的说明见 specs/001-interview-quiz-system/data-model.md 第二节。
// 题目内容不在数据库里，这些表只通过题号和章节编号引用题目。

export const scopeTypeEnum = pgEnum("scope_type", ["chapter", "notebook"]);
export const attemptStatusEnum = pgEnum("attempt_status", [
  "in_progress",
  "submitted",
  "abandoned",
]);
export const verdictEnum = pgEnum("verdict", [
  "correct",
  "incorrect",
  "unanswered",
  "pending",
]);

export type Verdict = (typeof verdictEnum.enumValues)[number];
export type AnswerResponse = { choice: string[] } | { text: string };

const timestamptz = (name: string) => timestamp(name, { withTimezone: true });

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  usernameNormalized: text("username_normalized").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamptz("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  /** 会话令牌的 SHA-256；令牌原文只在 Cookie 里 */
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamptz("expires_at").notNull(),
  createdAt: timestamptz("created_at").notNull().defaultNow(),
});

export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    scopeType: scopeTypeEnum("scope_type").notNull(),
    /** 范围为章节时必填，为错题本时为空 */
    chapterId: text("chapter_id"),
    status: attemptStatusEnum("status").notNull().default("in_progress"),
    /** 本次作答的题目和顺序，创建时固定 */
    questionIds: text("question_ids").array().notNull(),
    lastQuestionId: text("last_question_id"),
    totalCount: integer("total_count").notNull(),
    correctCount: integer("correct_count"),
    pendingCount: integer("pending_count").notNull().default(0),
    startedAt: timestamptz("started_at").notNull().defaultNow(),
    submittedAt: timestamptz("submitted_at"),
  },
  (table) => [
    // 同一用户同一范围只有一份进行中的作答
    uniqueIndex("attempts_one_in_progress")
      .on(table.userId, table.scopeType, sql`coalesce(${table.chapterId}, '')`)
      .where(sql`${table.status} = 'in_progress'`),
    index("attempts_user_chapter_submitted").on(
      table.userId,
      table.chapterId,
      table.submittedAt.desc(),
    ),
    index("attempts_user_submitted").on(table.userId, table.submittedAt),
  ],
);

export const attemptAnswers = pgTable(
  "attempt_answers",
  {
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull(),
    response: jsonb("response").$type<AnswerResponse | null>(),
    /** 交卷前为空 */
    verdict: verdictEnum("verdict"),
    feedback: text("feedback"),
    answeredAt: timestamptz("answered_at").notNull().defaultNow(),
    gradedAt: timestamptz("graded_at"),
    gradingTries: integer("grading_tries").notNull().default(0),
    nextRetryAt: timestamptz("next_retry_at"),
  },
  (table) => [
    primaryKey({ columns: [table.attemptId, table.questionId] }),
    // 评分执行器领取任务
    index("attempt_answers_pending")
      .on(table.nextRetryAt)
      .where(sql`${table.verdict} = 'pending'`),
  ],
);

export const questionStats = pgTable(
  "question_stats",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull(),
    wrongCount: integer("wrong_count").notNull().default(0),
    attemptCount: integer("attempt_count").notNull().default(0),
    /** 只会是 correct 或 incorrect */
    lastVerdict: verdictEnum("last_verdict").notNull(),
    lastAnsweredAt: timestamptz("last_answered_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.questionId] })],
);

export const notebookItems = pgTable(
  "notebook_items",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull(),
    addedAt: timestamptz("added_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.questionId] })],
);
