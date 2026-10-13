import { describe, expect, it } from "vitest";
import { getChapterProgress, getTopicProgress } from "@/server/attempts/progress";
import {
  abandonAttempt,
  getAttemptForAnswering,
  saveAnswer,
  setPosition,
  startAttempt,
} from "@/server/attempts/service";
import { submitAttempt } from "@/server/attempts/submit";
import { createUser, getAttemptRow, startAndAnswer } from "./helpers";

const T0 = new Date("2026-03-01T08:00:00Z");
const hours = (n: number) => new Date(T0.getTime() + n * 60 * 60 * 1000);

/** 做一遍 X2（两道选择题），答对 correct 道，在指定时间交卷 */
async function submitX2(userId: string, correct: 0 | 1 | 2, now: Date) {
  const attemptId = await startAndAnswer(userId, "X2", {
    "X2-1": { choice: [correct >= 1 ? "A" : "B"] },
    "X2-2": { choice: correct >= 2 ? ["B", "C", "D"] : ["B"] },
  });
  await submitAttempt(userId, attemptId, { confirmUnanswered: true, now });
  return attemptId;
}

describe("章节状态", () => {
  it("没有作答是未开始", async () => {
    const user = await createUser("alice");
    const progress = await getChapterProgress(user.id, "X");
    expect(progress.get("X1")).toEqual({
      status: "not_started",
      last: null,
      best: null,
      inProgressAttemptId: null,
      latestSubmittedAttemptId: null,
    });
  });

  it("有进行中的作答是进行中", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    expect((await getChapterProgress(user.id, "X")).get("X1")).toMatchObject({
      status: "in_progress",
      inProgressAttemptId: attemptId,
      last: null,
    });
  });

  it("交卷后是已完成，带最近一次的成绩", async () => {
    const user = await createUser("alice");
    const attemptId = await submitX2(user.id, 1, T0);
    expect((await getChapterProgress(user.id, "X")).get("X2")).toEqual({
      status: "completed",
      last: { correct: 1, total: 2 },
      best: { correct: 1, total: 2 },
      inProgressAttemptId: null,
      latestSubmittedAttemptId: attemptId,
    });
  });

  it("最近一次取交卷时间最新的，最高取所有已交卷作答里最好的", async () => {
    const user = await createUser("alice");
    await submitX2(user.id, 2, hours(0));
    const latest = await submitX2(user.id, 0, hours(1));
    expect((await getChapterProgress(user.id, "X")).get("X2")).toMatchObject({
      status: "completed",
      last: { correct: 0, total: 2 },
      best: { correct: 2, total: 2 },
      latestSubmittedAttemptId: latest,
    });
  });

  it("重做时显示进行中，同时保留之前的成绩和结果", async () => {
    const user = await createUser("alice");
    const first = await submitX2(user.id, 1, T0);
    const redo = await startAttempt(user.id, { type: "chapter", chapterId: "X2" });
    expect(redo.created).toBe(true);

    expect((await getChapterProgress(user.id, "X")).get("X2")).toEqual({
      status: "in_progress",
      last: { correct: 1, total: 2 },
      best: { correct: 1, total: 2 },
      inProgressAttemptId: redo.attemptId,
      latestSubmittedAttemptId: first,
    });
    // 旧的作答没有被覆盖
    expect(await getAttemptRow(first)).toMatchObject({ status: "submitted", correctCount: 1 });
  });

  it("只统计自己的作答", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    await submitX2(alice.id, 2, T0);
    expect((await getChapterProgress(bob.id, "X")).get("X2")?.status).toBe("not_started");
    expect((await getTopicProgress(bob.id)).get("X")).toEqual({ completed: 0, total: 2 });
  });
});

describe("放弃作答", () => {
  it("放弃后不影响状态和成绩，可以重新开始", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2", { "X2-1": { choice: ["A"] } });
    await abandonAttempt(user.id, attemptId);

    expect((await getAttemptRow(attemptId)).status).toBe("abandoned");
    expect((await getChapterProgress(user.id, "X")).get("X2")).toMatchObject({
      status: "not_started",
      last: null,
      inProgressAttemptId: null,
    });
    const fresh = await startAttempt(user.id, { type: "chapter", chapterId: "X2" });
    expect(fresh.created).toBe(true);
    expect(fresh.attemptId).not.toBe(attemptId);
  });

  it("放弃后的作答不能再取、再保存、再交卷", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2");
    await abandonAttempt(user.id, attemptId);

    await expect(getAttemptForAnswering(user.id, attemptId)).rejects.toMatchObject({ status: 404 });
    await expect(
      saveAnswer(user.id, attemptId, "X2-1", { choice: ["A"] }),
    ).rejects.toMatchObject({ code: "attempt_not_in_progress" });
    await expect(
      submitAttempt(user.id, attemptId, { confirmUnanswered: true }),
    ).rejects.toMatchObject({ code: "attempt_not_in_progress" });
  });

  it("已交卷的作答不能放弃；不能放弃别人的作答", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const submitted = await submitX2(alice.id, 1, T0);
    await expect(abandonAttempt(alice.id, submitted)).rejects.toMatchObject({
      code: "attempt_not_in_progress",
      status: 409,
    });

    const open = await startAndAnswer(alice.id, "X1");
    await expect(abandonAttempt(bob.id, open)).rejects.toMatchObject({ status: 404 });
    expect((await getAttemptRow(open)).status).toBe("in_progress");
  });
});

describe("续做位置", () => {
  it("记住用户翻到的题目，即使没有作答", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["B"] } });
    await setPosition(user.id, attemptId, "X1-4");

    const view = await getAttemptForAnswering(user.id, attemptId);
    if (view.status !== "in_progress") throw new Error("应为进行中");
    expect(view.lastQuestionId).toBe("X1-4");
    expect(view.questions[0].response).toEqual({ choice: ["B"] });
  });

  it("题号不在这次作答里是 404；交卷后不能再记位置", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2");
    await expect(setPosition(user.id, attemptId, "X1-1")).rejects.toMatchObject({ status: 404 });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    await expect(setPosition(user.id, attemptId, "X2-1")).rejects.toMatchObject({
      code: "attempt_not_in_progress",
    });
  });
});

describe("专题进度", () => {
  it("已完成章节数是至少交过一次卷的章节数", async () => {
    const user = await createUser("alice");
    expect(await getTopicProgress(user.id)).toEqual(
      new Map([
        ["X", { completed: 0, total: 2 }],
        ["Y", { completed: 0, total: 1 }],
      ]),
    );

    await submitX2(user.id, 1, T0);
    await submitX2(user.id, 2, hours(1)); // 同一章做两遍只算一章
    await startAndAnswer(user.id, "X1"); // 进行中，不算完成
    expect((await getTopicProgress(user.id)).get("X")).toEqual({ completed: 1, total: 2 });
  });

  it("完成过的章节在重做期间仍算已完成", async () => {
    const user = await createUser("alice");
    await submitX2(user.id, 1, T0);
    await startAttempt(user.id, { type: "chapter", chapterId: "X2" });
    expect((await getTopicProgress(user.id)).get("X")).toEqual({ completed: 1, total: 2 });
  });
});
