import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getAttemptForAnswering, saveAnswer, CODE_ANSWER_MAX_CHARS } from "@/server/attempts/service";
import { getAttemptResult, submitAttempt } from "@/server/attempts/submit";
import { Catalog, setCatalogForTesting } from "@/server/content/catalog";
import { fakeGrader } from "@/server/grading/fake-grader";
import { runGradingOnce } from "@/server/grading/runner";
import { getWrongCounts } from "@/server/mistakes/service";
import { fixtureBank } from "../fixtures/bank";
import { createUser, startAndAnswer } from "./helpers";

const id = "X1-3";
const reference = "思路。\n\n```python\ndef f(): pass\n```\n\n要点：O(n)。";

beforeEach(() => {
  const bank = structuredClone(fixtureBank);
  const question = bank.questions.find((q) => q.id === id)!;
  delete (question as { options?: unknown }).options;
  Object.assign(question, { type: "code", stem: "用任意语言实现二分查找。", referenceAnswer: reference });
  setCatalogForTesting(new Catalog(bank));
});
afterEach(() => setCatalogForTesting(new Catalog(fixtureBank)));

describe("代码题作答与评分", () => {
  it("保存的代码原样取回（Tab、CRLF、缩进都保留），作答视图不泄露答案", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    const code = "def f(xs):\r\n\tif not xs:\r\n\t\treturn -1\r\n    return 0\r\n";
    await saveAnswer(user.id, attemptId, id, { text: code });
    const view = await getAttemptForAnswering(user.id, attemptId);
    if (view.status !== "in_progress") throw new Error("unexpected status");
    const question = view.questions.find((q) => q.id === id)!;
    expect(question).toMatchObject({ type: "code", response: { text: code } });
    expect(question).not.toHaveProperty("referenceAnswer");
    expect(question).not.toHaveProperty("options");
    expect(JSON.stringify(question)).not.toContain("def f(): pass");
  });

  it("拒绝其他题型的答案格式", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    for (const response of [{ choice: ["A"] }, { blanks: ["x"] }]) {
      await expect(saveAnswer(user.id, attemptId, id, response)).rejects.toMatchObject({ code: "invalid_answer" });
    }
  });

  it("恰好 8000 字可以保存，8001 字被拒绝", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    expect(CODE_ANSWER_MAX_CHARS).toBe(8000);
    await saveAnswer(user.id, attemptId, id, { text: "x".repeat(8000) });
    await expect(saveAnswer(user.id, attemptId, id, { text: "x".repeat(8001) })).rejects.toMatchObject({ code: "invalid_answer" });
  });

  it("简答题的 2000 字上限不受影响", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    // 夹具里 X1-4 仍是简答题（X1-3 在本文件中被改成代码题）
    await expect(saveAnswer(user.id, attemptId, "X1-4", { text: "x".repeat(2001) })).rejects.toMatchObject({ code: "invalid_answer" });
  });

  it("只有空白的代码规整为未答，不送评", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await saveAnswer(user.id, attemptId, id, { text: " \n\t\n " });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    const result = await getAttemptResult(user.id, attemptId);
    expect(result.questions.find((q) => q.id === id)).toMatchObject({ response: null, verdict: "unanswered" });
    expect(await runGradingOnce({ grader: fakeGrader })).toMatchObject({ graded: 0, failed: 0 });
  });

  it("交卷后记为待评分，评出后更新成绩和错误次数", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { [id]: { text: "# 【错】\ndef f(): pass" } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    const before = await getAttemptResult(user.id, attemptId);
    expect(before.pendingCount).toBeGreaterThanOrEqual(1);
    expect(before.questions.find((q) => q.id === id)).toMatchObject({ verdict: "pending", referenceAnswer: reference });
    expect(await runGradingOnce({ grader: fakeGrader })).toMatchObject({ failed: 0 });
    const after = await getAttemptResult(user.id, attemptId);
    expect(after.questions.find((q) => q.id === id)).toMatchObject({ verdict: "incorrect" });
    expect((await getWrongCounts(user.id, [id])).get(id)).toBe(1);
  });

  it("评分服务失败时保持待评分", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { [id]: { text: "# 【失败】\nx" } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    expect(await runGradingOnce({ grader: fakeGrader })).toMatchObject({ failed: 1 });
    const result = await getAttemptResult(user.id, attemptId);
    expect(result.questions.find((q) => q.id === id)).toMatchObject({ verdict: "pending" });
  });
});
