import { describe, expect, it } from "vitest";
import { submitAttempt } from "@/server/attempts/submit";
import { runGradingOnce } from "@/server/grading/runner";
import { createUser, getAnswerRow, getAttemptRow, startAndAnswer } from "./helpers";

const MINUTE = 60 * 1000;
const T0 = new Date("2026-03-01T08:00:00Z");
const at = (minutes: number, seconds = 0) => new Date(T0.getTime() + minutes * MINUTE + seconds * 1000);

/** 交一份 X1 的卷，两道简答题分别写给定的答案 */
async function submitWithShortAnswers(username: string, x13: string, x14?: string) {
  const user = await createUser(username);
  const attemptId = await startAndAnswer(user.id, "X1", {
    "X1-1": { choice: ["B"] },
    "X1-3": { text: x13 },
    ...(x14 === undefined ? {} : { "X1-4": { text: x14 } }),
  });
  await submitAttempt(user.id, attemptId, { confirmUnanswered: true, now: T0 });
  return { user, attemptId };
}

describe("评分执行器", () => {
  it("评出待评分的题：写入判定和评语，更新作答的计数", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【对】答案一", "【错】答案二");
    expect(await getAttemptRow(attemptId)).toMatchObject({ correctCount: 1, pendingCount: 2 });

    const summary = await runGradingOnce({ now: at(0, 5) });
    expect(summary).toMatchObject({ graded: 2, failed: 0 });

    const right = await getAnswerRow(attemptId, "X1-3");
    expect(right.verdict).toBe("correct");
    expect(right.feedback).toBeTruthy();
    expect(right.gradedAt).toEqual(at(0, 5));
    expect(right.nextRetryAt).toBeNull();

    const wrong = await getAnswerRow(attemptId, "X1-4");
    expect(wrong.verdict).toBe("incorrect");
    expect(wrong.feedback).toBeTruthy();

    // 判对的那道使 correctCount 加一，两道都使 pendingCount 减一
    expect(await getAttemptRow(attemptId)).toMatchObject({ correctCount: 2, pendingCount: 0 });
  });

  it("没有待评分的题时什么都不做", async () => {
    expect(await runGradingOnce({ now: T0 })).toMatchObject({ graded: 0, failed: 0 });
  });

  it("评分失败时保持待评分，记录尝试次数，其他题不受影响", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【失败】答案一", "【对】答案二");

    const summary = await runGradingOnce({ now: at(0, 5) });
    expect(summary).toMatchObject({ graded: 1, failed: 1 });

    const failed = await getAnswerRow(attemptId, "X1-3");
    expect(failed.verdict).toBe("pending");
    expect(failed.gradingTries).toBe(1);
    expect(failed.feedback).toBeNull();
    expect((await getAnswerRow(attemptId, "X1-4")).verdict).toBe("correct");
    expect(await getAttemptRow(attemptId)).toMatchObject({ correctCount: 2, pendingCount: 1 });
  });

  it("失败后按 1、2、5、15、30 分钟退避，之后保持 30 分钟", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【失败】答案");
    const expectedDelays = [1, 2, 5, 15, 30, 30, 30];

    let now = at(0, 5);
    for (const [index, delay] of expectedDelays.entries()) {
      expect(await runGradingOnce({ now })).toMatchObject({ failed: 1 });
      const row = await getAnswerRow(attemptId, "X1-3");
      expect(row.gradingTries).toBe(index + 1);
      expect(row.nextRetryAt).toEqual(new Date(now.getTime() + delay * MINUTE));

      // 还没到重试时间：不被领取
      const early = new Date(now.getTime() + delay * MINUTE - 1000);
      expect(await runGradingOnce({ now: early })).toMatchObject({ graded: 0, failed: 0 });
      expect((await getAnswerRow(attemptId, "X1-3")).gradingTries).toBe(index + 1);

      now = new Date(now.getTime() + delay * MINUTE);
    }
  });

  it("每次最多领取指定数量", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【对】一", "【对】二");
    expect(await runGradingOnce({ now: at(0, 5), batchSize: 1 })).toMatchObject({ graded: 1 });
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(1);
    expect(await runGradingOnce({ now: at(0, 6), batchSize: 1 })).toMatchObject({ graded: 1 });
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(0);
  });

  it("达到每日上限后不再领取，剩下的保持待评分", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【对】一", "【对】二");

    const first = await runGradingOnce({ now: at(0, 5), dailyCap: 1 });
    expect(first).toMatchObject({ graded: 1, cappedOut: false });
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(1);

    const second = await runGradingOnce({ now: at(1), dailyCap: 1 });
    expect(second).toMatchObject({ graded: 0, cappedOut: true });
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(1);

    // 第二天额度恢复
    const nextDay = await runGradingOnce({ now: at(24 * 60), dailyCap: 1 });
    expect(nextDay).toMatchObject({ graded: 1, cappedOut: false });
    expect((await getAttemptRow(attemptId)).pendingCount).toBe(0);
  });

  it("两个执行器同时运行不会把同一道题评两次", async () => {
    const { attemptId } = await submitWithShortAnswers("alice", "【对】一", "【对】二");
    const [a, b] = await Promise.all([
      runGradingOnce({ now: at(0, 5) }),
      runGradingOnce({ now: at(0, 5) }),
    ]);
    expect(a.graded + b.graded).toBe(2);
    expect(await getAttemptRow(attemptId)).toMatchObject({ correctCount: 3, pendingCount: 0 });
  });
});
