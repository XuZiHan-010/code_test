import { describe, expect, it } from "vitest";
import { abandonAttempt } from "@/server/attempts/service";
import { getAttemptResult, submitAttempt } from "@/server/attempts/submit";
import type { AnswerResponse } from "@/server/db/schema";
import { runGradingOnce } from "@/server/grading/runner";
import { getMistakeSummary, listChapterMistakes } from "@/server/mistakes/service";
import { createUser, startAndAnswer } from "./helpers";

const T0 = new Date("2026-03-01T08:00:00Z");
const minutes = (n: number) => new Date(T0.getTime() + n * 60 * 1000);

async function submitChapter(
  userId: string,
  chapterId: string,
  answers: Record<string, AnswerResponse | null>,
  now: Date,
) {
  const attemptId = await startAndAnswer(userId, chapterId, answers);
  await submitAttempt(userId, attemptId, { confirmUnanswered: true, now });
  return attemptId;
}

const summarize = (items: { id: string; wrongCount: number; lastVerdict: string }[]) =>
  items.map((item) => [item.id, item.wrongCount, item.lastVerdict]);

describe("错误次数", () => {
  it("交卷判错的选择题记一次，答对和未答的题不是错题", async () => {
    const user = await createUser("alice");
    await submitChapter(
      user.id,
      "X1",
      {
        "X1-1": { choice: ["A"] }, // 错
        "X1-2": { choice: ["A", "C"] }, // 对
        // X1-3、X1-4 未答
        "X1-5": { choice: ["A"] }, // 错
      },
      T0,
    );
    expect(summarize(await listChapterMistakes(user.id, "X1", "order"))).toEqual([
      ["X1-1", 1, "incorrect"],
      ["X1-5", 1, "incorrect"],
    ]);
  });

  it("再次答错累计，后来答对不减少但更新最近判定，且仍在错题里", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X1", { "X1-1": { choice: ["A"] }, "X1-5": { choice: ["A"] } }, T0);
    await submitChapter(
      user.id,
      "X1",
      { "X1-1": { choice: ["C"] }, "X1-5": { choice: ["D"] } }, // X1-1 又错，X1-5 这次对
      minutes(1),
    );
    expect(summarize(await listChapterMistakes(user.id, "X1", "order"))).toEqual([
      ["X1-1", 2, "incorrect"],
      ["X1-5", 1, "correct"],
    ]);
  });

  it("未作答的题不产生记录，也不改变已有的错误次数", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X1", { "X1-1": { choice: ["A"] } }, T0);
    await submitChapter(user.id, "X1", {}, minutes(1)); // 整卷不答
    expect(summarize(await listChapterMistakes(user.id, "X1", "order"))).toEqual([
      ["X1-1", 1, "incorrect"],
    ]);
  });

  it("放弃的作答不产生任何错题", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", { "X1-1": { choice: ["A"] } });
    await abandonAttempt(user.id, attemptId);
    expect(await listChapterMistakes(user.id, "X1", "order")).toEqual([]);
  });

  it("简答题在评分完成时才计入", async () => {
    const user = await createUser("alice");
    await submitChapter(
      user.id,
      "X1",
      { "X1-3": { text: "【错】答案一" }, "X1-4": { text: "【对】答案二" } },
      T0,
    );
    expect(await listChapterMistakes(user.id, "X1", "order")).toEqual([]);

    await runGradingOnce({ now: minutes(1) });
    expect(summarize(await listChapterMistakes(user.id, "X1", "order"))).toEqual([
      ["X1-3", 1, "incorrect"],
    ]);
  });

  it("评分失败期间不计入，评出后才计入", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X1", { "X1-3": { text: "【失败】答案" } }, T0);
    await runGradingOnce({ now: minutes(1) });
    expect(await listChapterMistakes(user.id, "X1", "order")).toEqual([]);
  });
});

describe("每章错题", () => {
  it("只含本章的题，带题目、正确答案和解答", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X1", { "X1-1": { choice: ["A"] } }, T0);
    await submitChapter(user.id, "X2", { "X2-1": { choice: ["B"] } }, minutes(1));

    const [item, ...rest] = await listChapterMistakes(user.id, "X1", "order");
    expect(rest).toEqual([]);
    expect(item).toMatchObject({
      id: "X1-1",
      type: "single",
      stem: "X1-1 单选题干",
      referenceAnswer: "X1-1 的参考答案。",
      wrongCount: 1,
      lastVerdict: "incorrect",
      inNotebook: false,
    });
    expect(item.options?.find((o) => o.correct)?.key).toBe("B");
    expect(item.citations).toHaveLength(1);
  });

  it("可以按题库顺序或按错误次数从多到少排列", async () => {
    const user = await createUser("alice");
    const wrong = { "X1-1": { choice: ["A"] }, "X1-2": { choice: ["A"] }, "X1-5": { choice: ["A"] } };
    await submitChapter(user.id, "X1", wrong, T0);
    await submitChapter(user.id, "X1", { "X1-5": { choice: ["A"] } }, minutes(1));
    await submitChapter(user.id, "X1", { "X1-5": { choice: ["A"] }, "X1-2": { choice: ["B"] } }, minutes(2));

    const ids = async (sort: "order" | "wrong") =>
      (await listChapterMistakes(user.id, "X1", sort)).map((i) => [i.id, i.wrongCount]);
    expect(await ids("order")).toEqual([["X1-1", 1], ["X1-2", 2], ["X1-5", 3]]);
    expect(await ids("wrong")).toEqual([["X1-5", 3], ["X1-2", 2], ["X1-1", 1]]);
  });

  it("别人的错题看不到", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    await submitChapter(alice.id, "X1", { "X1-1": { choice: ["A"] } }, T0);
    expect(await listChapterMistakes(bob.id, "X1", "order")).toEqual([]);
    expect((await getMistakeSummary(bob.id)).total).toBe(0);
  });
});

describe("错题总览", () => {
  it("按专题和章节汇总，数量与各章错题列表一致，没有错题的章节不出现", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X1", { "X1-1": { choice: ["A"] }, "X1-5": { choice: ["A"] } }, T0);
    await submitChapter(user.id, "X2", { "X2-1": { choice: ["B"] } }, minutes(1));
    await submitChapter(user.id, "Y1", { "Y1-1": { choice: ["C"] } }, minutes(2)); // 对

    const summary = await getMistakeSummary(user.id);
    expect(summary.total).toBe(3);
    expect(
      summary.topics.map((t) => [t.prefix, t.wrongQuestions, t.chapters.map((c) => [c.id, c.wrongQuestions])]),
    ).toEqual([["X", 3, [["X1", 2], ["X2", 1]]]]);

    for (const topic of summary.topics) {
      for (const chapter of topic.chapters) {
        const list = await listChapterMistakes(user.id, chapter.id, "order");
        expect(list).toHaveLength(chapter.wrongQuestions);
      }
    }
  });
});

describe("结果里的错误次数", () => {
  it("结果页的每道题带上累计错误次数", async () => {
    const user = await createUser("alice");
    await submitChapter(user.id, "X2", { "X2-1": { choice: ["B"] } }, T0);
    const second = await submitChapter(user.id, "X2", { "X2-1": { choice: ["C"] } }, minutes(1));

    const result = await getAttemptResult(user.id, second);
    expect(result.questions.map((q) => [q.id, q.wrongCount])).toEqual([
      ["X2-1", 2],
      ["X2-2", 0],
    ]);
  });
});
