import { describe, expect, it } from "vitest";
import {
  getAttemptForAnswering,
  saveAnswer,
  startAttempt,
} from "@/server/attempts/service";
import { getAttemptResult, submitAttempt } from "@/server/attempts/submit";
import { createUser, getAnswerRow, getAttemptRow, startAndAnswer } from "./helpers";

const UNKNOWN_ID = "00000000-0000-4000-8000-000000000000";

// 测试题库见 tests/fixtures/bank.ts：
// X1 有 5 题：X1-1 单选(B)、X1-2 多选(A,C)、X1-3 简答、X1-4 简答、X1-5 单选(D)
// X2 有 2 题：X2-1 单选(A)、X2-2 多选(B,C,D)

describe("开始作答", () => {
  it("按题库顺序固定题目列表", async () => {
    const user = await createUser("alice");
    const { attemptId, created } = await startAttempt(user.id, { type: "chapter", chapterId: "X1" });
    expect(created).toBe(true);

    const row = await getAttemptRow(attemptId);
    expect(row.questionIds).toEqual(["X1-1", "X1-2", "X1-3", "X1-4", "X1-5"]);
    expect(row.totalCount).toBe(5);
    expect(row.status).toBe("in_progress");
  });

  it("同一章已有进行中的作答时返回它，不新建", async () => {
    const user = await createUser("alice");
    const first = await startAttempt(user.id, { type: "chapter", chapterId: "X1" });
    const second = await startAttempt(user.id, { type: "chapter", chapterId: "X1" });
    expect(second).toEqual({ attemptId: first.attemptId, created: false });
  });

  it("不同章节、不同用户各有各的作答", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const a1 = await startAttempt(alice.id, { type: "chapter", chapterId: "X1" });
    const a2 = await startAttempt(alice.id, { type: "chapter", chapterId: "X2" });
    const b1 = await startAttempt(bob.id, { type: "chapter", chapterId: "X1" });
    expect(new Set([a1.attemptId, a2.attemptId, b1.attemptId]).size).toBe(3);
  });

  it("章节不存在时报 404", async () => {
    const user = await createUser("alice");
    await expect(
      startAttempt(user.id, { type: "chapter", chapterId: "X99" }),
    ).rejects.toMatchObject({ code: "chapter_not_found", status: 404 });
  });
});

describe("取作答（交卷前）", () => {
  it("返回题目、已保存的答案和上次所在的题目", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["B"] },
      "X1-3": { text: "我的回答" },
    });

    const view = await getAttemptForAnswering(user.id, attemptId);
    if (view.status !== "in_progress") throw new Error("应为进行中");
    expect(view.scope).toEqual({ type: "chapter", chapterId: "X1", title: "第一章" });
    expect(view.lastQuestionId).toBe("X1-3");
    expect(view.questions.map((q) => q.id)).toEqual(["X1-1", "X1-2", "X1-3", "X1-4", "X1-5"]);
    expect(view.questions[0].response).toEqual({ choice: ["B"] });
    expect(view.questions[1].response).toBeNull();
    expect(view.questions[2].response).toEqual({ text: "我的回答" });
  });

  it("别人的作答、不存在的作答、格式不对的编号都是 404", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X1");
    for (const [userId, id] of [
      [bob.id, attemptId],
      [alice.id, UNKNOWN_ID],
      [alice.id, "not-a-uuid"],
    ]) {
      await expect(getAttemptForAnswering(userId, id)).rejects.toMatchObject({ status: 404 });
    }
  });
});

describe("保存答案", () => {
  it("再次保存覆盖之前的答案", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["A"] } });
    await saveAnswer(user.id, attemptId, "X1-1", { choice: ["B"] });
    expect((await getAnswerRow(attemptId, "X1-1")).response).toEqual({ choice: ["B"] });
  });

  it("传 null 或空选择清空答案", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["A"] },
      "X1-2": { choice: ["A", "C"] },
    });
    await saveAnswer(user.id, attemptId, "X1-1", null);
    await saveAnswer(user.id, attemptId, "X1-2", { choice: [] });
    expect((await getAnswerRow(attemptId, "X1-1")).response).toBeNull();
    expect((await getAnswerRow(attemptId, "X1-2")).response).toBeNull();
  });

  it("单选题保存多个选项被拒", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(
      saveAnswer(user.id, attemptId, "X1-1", { choice: ["A", "B"] }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
  });

  it("不存在的选项、重复的选项被拒", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(
      saveAnswer(user.id, attemptId, "X1-2", { choice: ["A", "Z"] }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
    await expect(
      saveAnswer(user.id, attemptId, "X1-2", { choice: ["A", "A"] }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
  });

  it("答案形式与题型不符被拒", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(
      saveAnswer(user.id, attemptId, "X1-1", { text: "B" }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
    await expect(
      saveAnswer(user.id, attemptId, "X1-3", { choice: ["A"] }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
  });

  it("简答题最长 2000 字", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(
      saveAnswer(user.id, attemptId, "X1-3", { text: "字".repeat(2000) }),
    ).resolves.toBeUndefined();
    await expect(
      saveAnswer(user.id, attemptId, "X1-3", { text: "字".repeat(2001) }),
    ).rejects.toMatchObject({ code: "invalid_answer", status: 422 });
  });

  it("题号不在这次作答里是 404", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(
      saveAnswer(user.id, attemptId, "X2-1", { choice: ["A"] }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("不能往别人的作答里保存", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X1");
    await expect(
      saveAnswer(bob.id, attemptId, "X1-1", { choice: ["B"] }),
    ).rejects.toMatchObject({ status: 404 });
    expect(await getAnswerRow(attemptId, "X1-1")).toBeUndefined();
  });
});

describe("交卷", () => {
  it("有未答题且没有确认时不交卷，并报告未答数量", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["B"] } });

    await expect(
      submitAttempt(user.id, attemptId, { confirmUnanswered: false }),
    ).rejects.toMatchObject({
      code: "has_unanswered",
      status: 409,
      extra: { unansweredCount: 4 },
    });
    expect((await getAttemptRow(attemptId)).status).toBe("in_progress");
    // 没有交卷，就不应留下任何判定
    expect((await getAnswerRow(attemptId, "X1-1")).verdict).toBeNull();
  });

  it("全部作答时不需要确认", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2", {
      "X2-1": { choice: ["A"] },
      "X2-2": { choice: ["B", "C", "D"] },
    });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: false });
    expect(await getAttemptRow(attemptId)).toMatchObject({
      status: "submitted",
      correctCount: 2,
      pendingCount: 0,
      totalCount: 2,
    });
  });

  it("选择题立即判定，简答题待评分，未答题记为未答，正确率的分母是总题数", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["B"] }, // 对
      "X1-2": { choice: ["A"] }, // 少选，错
      "X1-3": { text: "【对】我的回答" }, // 待评分
      // X1-4 不答
      "X1-5": { choice: ["D"] }, // 对
    });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });

    const row = await getAttemptRow(attemptId);
    expect(row).toMatchObject({
      status: "submitted",
      totalCount: 5,
      correctCount: 2,
      pendingCount: 1,
    });
    expect(row.submittedAt).toBeInstanceOf(Date);

    const verdicts = Object.fromEntries(
      await Promise.all(
        row.questionIds.map(async (id) => [id, (await getAnswerRow(attemptId, id)).verdict]),
      ),
    );
    expect(verdicts).toEqual({
      "X1-1": "correct",
      "X1-2": "incorrect",
      "X1-3": "pending",
      "X1-4": "unanswered",
      "X1-5": "correct",
    });
  });

  it("只有空白的简答题视为未答", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-3": { text: "   \n  " } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    expect((await getAnswerRow(attemptId, "X1-3")).verdict).toBe("unanswered");
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(0);
  });

  it("一道题都没答也可以确认后交卷，正确率为 0", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2");
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    expect(await getAttemptRow(attemptId)).toMatchObject({
      status: "submitted",
      correctCount: 0,
      totalCount: 2,
    });
  });

  it("交卷后不能再保存答案，也不能再交一次", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2", { "X2-1": { choice: ["B"] } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });

    await expect(
      saveAnswer(user.id, attemptId, "X2-1", { choice: ["A"] }),
    ).rejects.toMatchObject({ code: "attempt_not_in_progress", status: 409 });
    await expect(
      submitAttempt(user.id, attemptId, { confirmUnanswered: true }),
    ).rejects.toMatchObject({ code: "attempt_not_in_progress", status: 409 });
    expect((await getAnswerRow(attemptId, "X2-1")).response).toEqual({ choice: ["B"] });
  });

  it("交卷后同一章可以再开始一次新的作答", async () => {
    const user = await createUser("alice");
    const first = await startAndAnswer(user.id, "X2");
    await submitAttempt(user.id, first, { confirmUnanswered: true });
    const second = await startAttempt(user.id, { type: "chapter", chapterId: "X2" });
    expect(second.created).toBe(true);
    expect(second.attemptId).not.toBe(first);
  });

  it("不能替别人交卷", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X2");
    await expect(
      submitAttempt(bob.id, attemptId, { confirmUnanswered: true }),
    ).rejects.toMatchObject({ status: 404 });
    expect((await getAttemptRow(attemptId)).status).toBe("in_progress");
  });

  it("10 分钟内第 11 次交卷被限流，这次作答保持进行中", async () => {
    const user = await createUser("alice");
    for (let i = 0; i < 10; i++) {
      const id = await startAndAnswer(user.id, "X2");
      await submitAttempt(user.id, id, { confirmUnanswered: true });
    }
    const eleventh = await startAndAnswer(user.id, "X2");
    const error = await submitAttempt(user.id, eleventh, { confirmUnanswered: true }).catch((e) => e);
    expect(error).toMatchObject({ code: "too_many_submissions", status: 429 });
    expect(error.extra.retryAfterSeconds).toBeGreaterThan(0);
    expect((await getAttemptRow(eleventh)).status).toBe("in_progress");
  });

  it("限流只看最近 10 分钟", async () => {
    const user = await createUser("alice");
    const start = new Date("2026-03-01T08:00:00Z");
    for (let i = 0; i < 10; i++) {
      const id = await startAndAnswer(user.id, "X2");
      await submitAttempt(user.id, id, { confirmUnanswered: true, now: start });
    }
    const later = await startAndAnswer(user.id, "X2");
    await expect(
      submitAttempt(user.id, later, {
        confirmUnanswered: true,
        now: new Date(start.getTime() + 10 * 60 * 1000 + 1000),
      }),
    ).resolves.toBeUndefined();
  });
});

describe("取结果", () => {
  it("进行中的作答没有结果", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await expect(getAttemptResult(user.id, attemptId)).rejects.toMatchObject({
      code: "attempt_not_submitted",
      status: 409,
    });
  });

  it("包含正确率所需的计数，以及每道题的答案、判定、正确选项和解答", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["B"] },
      "X1-2": { choice: ["A"] },
      "X1-3": { text: "我的回答" },
      "X1-5": { choice: ["A"] },
    });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });

    const result = await getAttemptResult(user.id, attemptId);
    expect(result).toMatchObject({
      id: attemptId,
      scope: { type: "chapter", chapterId: "X1", title: "第一章" },
      totalCount: 5,
      correctCount: 1,
      pendingCount: 1,
    });
    expect(result.questions.map((q) => [q.id, q.verdict])).toEqual([
      ["X1-1", "correct"],
      ["X1-2", "incorrect"],
      ["X1-3", "pending"],
      ["X1-4", "unanswered"],
      ["X1-5", "incorrect"],
    ]);

    const [single, multiple, short, blank] = result.questions;
    expect(single.response).toEqual({ choice: ["B"] });
    expect(single.options?.filter((o) => o.correct).map((o) => o.key)).toEqual(["B"]);
    expect(single.referenceAnswer).toBe("X1-1 的参考答案。");
    expect(single.citations).toEqual([
      { label: "原文§示例", url: "https://example.com/a.html#s" },
    ]);
    expect(multiple.options?.filter((o) => o.correct).map((o) => o.key)).toEqual(["A", "C"]);
    expect(short.response).toEqual({ text: "我的回答" });
    expect(short.feedback).toBeNull();
    expect(blank.response).toBeNull();
  });

  it("别人的作答是 404", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X2");
    await submitAttempt(alice.id, attemptId, { confirmUnanswered: true });
    await expect(getAttemptResult(bob.id, attemptId)).rejects.toMatchObject({ status: 404 });
  });

  it("交卷后取作答只告知已交卷，不再返回作答视图", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2");
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    expect(await getAttemptForAnswering(user.id, attemptId)).toEqual({
      id: attemptId,
      status: "submitted",
    });
  });
});
