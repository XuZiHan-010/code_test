import { describe, expect, it } from "vitest";
import { getAttemptForAnswering, saveAnswer, startAttempt } from "@/server/attempts/service";
import { getAttemptResult, submitAttempt } from "@/server/attempts/submit";
import { listChapterMistakes } from "@/server/mistakes/service";
import { addItem, getMembership, listItems, removeItem } from "@/server/notebook/service";
import { createUser, getAttemptRow, startAndAnswer } from "./helpers";

const ids = async (userId: string) => (await listItems(userId)).map((item) => item.id);

describe("错题本：增删查", () => {
  it("添加后可以查到，带所属专题、章节和错误次数", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["A"] } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });

    await addItem(user.id, "X1-1");
    expect(await listItems(user.id)).toEqual([
      expect.objectContaining({
        id: "X1-1",
        stem: "X1-1 单选题干",
        type: "single",
        topic: { prefix: "X", slug: "topic-x", title: "专题甲" },
        chapter: { id: "X1", title: "第一章" },
        wrongCount: 1,
      }),
    ]);
  });

  it("从未答错的题也能加入", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "Y1-1");
    expect(await listItems(user.id)).toEqual([expect.objectContaining({ id: "Y1-1", wrongCount: 0 })]);
  });

  it("重复添加不报错，也只有一条", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X1-1");
    await expect(addItem(user.id, "X1-1")).resolves.toBeUndefined();
    expect(await ids(user.id)).toEqual(["X1-1"]);
  });

  it("不存在的题号不能加入", async () => {
    const user = await createUser("alice");
    await expect(addItem(user.id, "X9-9")).rejects.toMatchObject({
      code: "question_not_found",
      status: 404,
    });
  });

  it("按加入的先后排列", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X2-1", new Date("2026-03-01T08:00:00Z"));
    await addItem(user.id, "X1-1", new Date("2026-03-01T08:01:00Z"));
    await addItem(user.id, "Y1-1", new Date("2026-03-01T08:02:00Z"));
    expect(await ids(user.id)).toEqual(["X2-1", "X1-1", "Y1-1"]);
  });

  it("移除后查不到，错误次数记录不受影响", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["A"] } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    await addItem(user.id, "X1-1");

    await removeItem(user.id, "X1-1");
    expect(await ids(user.id)).toEqual([]);
    expect(await listChapterMistakes(user.id, "X1", "order")).toEqual([
      expect.objectContaining({ id: "X1-1", wrongCount: 1, inNotebook: false }),
    ]);
  });

  it("移除本来就不在其中的题不报错", async () => {
    const user = await createUser("alice");
    await expect(removeItem(user.id, "X1-1")).resolves.toBeUndefined();
  });

  it("各人的错题本互不可见、互不影响", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    await addItem(alice.id, "X1-1");
    await addItem(bob.id, "X2-1");
    await removeItem(bob.id, "X1-1");
    expect(await ids(alice.id)).toEqual(["X1-1"]);
    expect(await ids(bob.id)).toEqual(["X2-1"]);
  });
});

describe("错题本：是否已加入", () => {
  it("getMembership 返回已在错题本里的题号", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X1-1");
    expect(await getMembership(user.id, ["X1-1", "X1-2"])).toEqual(new Set(["X1-1"]));
    expect(await getMembership(user.id, [])).toEqual(new Set());
  });

  it("答题页、结果页和每章错题都标出是否已在错题本", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X1-1");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["A"] },
      "X1-5": { choice: ["A"] },
    });

    const answering = await getAttemptForAnswering(user.id, attemptId);
    if (answering.status !== "in_progress") throw new Error("应为进行中");
    expect(answering.questions.map((q) => [q.id, q.inNotebook]).slice(0, 2)).toEqual([
      ["X1-1", true],
      ["X1-2", false],
    ]);

    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    const result = await getAttemptResult(user.id, attemptId);
    expect(result.questions.find((q) => q.id === "X1-1")?.inNotebook).toBe(true);
    expect(result.questions.find((q) => q.id === "X1-5")?.inNotebook).toBe(false);

    const mistakes = await listChapterMistakes(user.id, "X1", "order");
    expect(mistakes.map((m) => [m.id, m.inNotebook])).toEqual([
      ["X1-1", true],
      ["X1-5", false],
    ]);
  });
});

describe("错题本：练习", () => {
  it("错题本为空时不能开始练习", async () => {
    const user = await createUser("alice");
    await expect(startAttempt(user.id, { type: "notebook" })).rejects.toMatchObject({
      code: "notebook_empty",
      status: 422,
    });
  });

  it("开始练习时按加入顺序固定题目，其后增删错题本不改变这次练习", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X2-1", new Date("2026-03-01T08:00:00Z"));
    await addItem(user.id, "X1-1", new Date("2026-03-01T08:01:00Z"));

    const { attemptId, created } = await startAttempt(user.id, { type: "notebook" });
    expect(created).toBe(true);
    await addItem(user.id, "Y1-1");
    await removeItem(user.id, "X2-1");

    const row = await getAttemptRow(attemptId);
    expect(row).toMatchObject({
      scopeType: "notebook",
      chapterId: null,
      questionIds: ["X2-1", "X1-1"],
      totalCount: 2,
    });
    const view = await getAttemptForAnswering(user.id, attemptId);
    if (view.status !== "in_progress") throw new Error("应为进行中");
    expect(view.scope).toEqual({ type: "notebook", chapterId: null, title: "错题本练习" });
    expect(view.questions.map((q) => q.id)).toEqual(["X2-1", "X1-1"]);
  });

  it("同一时间只有一份进行中的错题本练习，与章节作答互不干扰", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X1-1");
    const first = await startAttempt(user.id, { type: "notebook" });
    const second = await startAttempt(user.id, { type: "notebook" });
    expect(second).toEqual({ attemptId: first.attemptId, created: false });

    const chapter = await startAttempt(user.id, { type: "chapter", chapterId: "X1" });
    expect(chapter.created).toBe(true);
    expect(chapter.attemptId).not.toBe(first.attemptId);
  });

  it("交卷后的结果和章节作答形式相同，答错的题错误次数加一", async () => {
    const user = await createUser("alice");
    const chapterAttempt = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["A"] } });
    await submitAttempt(user.id, chapterAttempt, { confirmUnanswered: true });
    await addItem(user.id, "X1-1");
    await addItem(user.id, "X2-1");

    const { attemptId } = await startAttempt(user.id, { type: "notebook" });
    await saveAnswer(user.id, attemptId, "X1-1", { choice: ["C"] }); // 又错
    await saveAnswer(user.id, attemptId, "X2-1", { choice: ["A"] }); // 对
    await submitAttempt(user.id, attemptId, { confirmUnanswered: false });

    const result = await getAttemptResult(user.id, attemptId);
    expect(result).toMatchObject({
      scope: { type: "notebook", title: "错题本练习" },
      totalCount: 2,
      correctCount: 1,
      pendingCount: 0,
    });
    expect(result.questions.map((q) => [q.id, q.verdict, q.wrongCount])).toEqual([
      ["X1-1", "incorrect", 2],
      ["X2-1", "correct", 0],
    ]);
    expect((await listItems(user.id)).find((i) => i.id === "X1-1")?.wrongCount).toBe(2);
  });

  it("交卷后可以再开始一次新的练习", async () => {
    const user = await createUser("alice");
    await addItem(user.id, "X2-1");
    const first = await startAttempt(user.id, { type: "notebook" });
    await submitAttempt(user.id, first.attemptId, { confirmUnanswered: true });
    const second = await startAttempt(user.id, { type: "notebook" });
    expect(second.created).toBe(true);
    expect(second.attemptId).not.toBe(first.attemptId);
  });
});
