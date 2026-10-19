import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PUT as saveRoute } from "@/app/api/attempts/[id]/answers/[questionId]/route";
import { getAttemptForAnswering, saveAnswer } from "@/server/attempts/service";
import { getAttemptResult, submitAttempt } from "@/server/attempts/submit";
import { Catalog, setCatalogForTesting } from "@/server/content/catalog";
import { createDeepSeekGrader, type ChatMessage } from "@/server/grading/deepseek-grader";
import { runGradingOnce } from "@/server/grading/runner";
import { getWrongCounts } from "@/server/mistakes/service";
import { fixtureBank } from "../fixtures/bank";
import { apiRequest, createUser, routeParams, startAndAnswer } from "./helpers";

const id = "X1-3";
const answers = ["上下文精细化", "工具系统", "执行编排", "记忆与状态", "评估与观测", "约束与恢复"];

beforeEach(() => {
  const bank = structuredClone(fixtureBank);
  const question = bank.questions.find(q => q.id === id)!;
  Object.assign(question, { type: "fill", stem: "Harness 六层：____、____、____、____、____、____。", blankCount: 6, blankOrder: "unordered", referenceAnswer: answers.join("、") });
  setCatalogForTesting(new Catalog(bank));
});
afterEach(() => setCatalogForTesting(new Catalog(fixtureBank)));

describe("填空题作答与评分", () => {
  it("通过接口保存多个空并恢复，不在交卷前泄露答案", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    const response = await saveRoute(apiRequest(`/api/attempts/${attemptId}/answers/${id}`, {
      method: "PUT", token: user.token, body: { response: { blanks: answers } },
    }), routeParams({ id: attemptId, questionId: id }));
    expect(response.status).toBe(204);
    const view = await getAttemptForAnswering(user.id, attemptId);
    if (view.status !== "in_progress") throw new Error("unexpected status");
    const question = view.questions.find(q => q.id === id)!;
    expect(question).toMatchObject({ type: "fill", blankCount: 6, blankOrder: "unordered", response: { blanks: answers } });
    expect(question).not.toHaveProperty("referenceAnswer");
    expect(question).not.toHaveProperty("citations");
    expect(question).not.toHaveProperty("options");
  });

  it("拒绝空数不符、其他题型的答案格式和总字数超限", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    for (const response of [{ blanks: ["a"] }, { text: "文字" }, { choice: ["A"] }, { blanks: ["字".repeat(2001), "", "", "", "", ""] }]) {
      await expect(saveAnswer(user.id, attemptId, id, response)).rejects.toMatchObject({ code: "invalid_answer" });
    }
    await expect(saveAnswer(user.id, attemptId, "X1-1", { blanks: answers })).rejects.toMatchObject({ code: "invalid_answer" });
    const invalid = await saveRoute(apiRequest(`/api/attempts/${attemptId}/answers/${id}`, {
      method: "PUT", token: user.token, body: { response: { blanks: [1, 2, 3, 4, 5, 6] } },
    }), routeParams({ id: attemptId, questionId: id }));
    expect(invalid.status).toBe(422);
  });

  it("各空合计 2000 字可以保存，全空或全空白规整为未答", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    await saveAnswer(user.id, attemptId, id, { blanks: ["字".repeat(2000), "", "", "", "", ""] });
    await saveAnswer(user.id, attemptId, id, { blanks: ["", " ", "", "\t", "", ""] });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    const result = await getAttemptResult(user.id, attemptId);
    expect(result.questions.find(q => q.id === id)).toMatchObject({ response: null, verdict: "unanswered" });
    expect(await runGradingOnce()).toMatchObject({ graded: 0, failed: 0 });
  });

  it("部分填写送 DeepSeek 并保留空位，评错后更新错题和结果", async () => {
    const user = await createUser("alice");
    const blanks = ["工具系统", "上下文管理", "", "", "", ""];
    const attemptId = await startAndAnswer(user.id, "X1", { [id]: { blanks } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    expect((await getAttemptResult(user.id, attemptId)).pendingCount).toBe(1);
    let messages: ChatMessage[] = [];
    const grader = createDeepSeekGrader({ complete: async (input) => {
      messages = input;
      return JSON.stringify({ verdict: "incorrect", feedback: "只填写了两个组成，缺少其余四层。" });
    } });
    expect(await runGradingOnce({ grader })).toMatchObject({ graded: 1, failed: 0 });
    expect(messages[1].content).toContain("共 6 空");
    expect(messages[1].content).toContain("无序：各空顺序不限");
    expect(messages[1].content).toContain("第 3 空：（未填写）");
    expect(messages[0].content).toContain("不做字符串精准匹配");
    const result = await getAttemptResult(user.id, attemptId);
    expect(result.pendingCount).toBe(0);
    expect(result.questions.find(q => q.id === id)).toMatchObject({ response: { blanks }, blankCount: 6, verdict: "incorrect", feedback: "只填写了两个组成，缺少其余四层。" });
    expect((await getWrongCounts(user.id, [id])).get(id)).toBe(1);
  });

  it("完整填答交给模型评判，异序和英文术语原样传递，正确结果计入成绩", async () => {
    const user = await createUser("alice");
    const blanks = ["Tool System", "Context Refinement", "Execution Orchestration", "Memory & State", "Evaluation & Observability", "Constraint & Recovery"];
    const attemptId = await startAndAnswer(user.id, "X1", { [id]: { blanks } });
    await submitAttempt(user.id, attemptId, { confirmUnanswered: true });
    const grader = createDeepSeekGrader({ complete: async (messages) => {
      expect(messages[1].content).toContain("第 1 空：Tool System");
      return '{"verdict":"correct","feedback":"六层都已覆盖，英文表达含义一致。"}';
    } });
    await runGradingOnce({ grader });
    const result = await getAttemptResult(user.id, attemptId);
    expect(result).toMatchObject({ pendingCount: 0, correctCount: 1 });
    expect(result.questions.find(q => q.id === id)?.verdict).toBe("correct");
  });
});
