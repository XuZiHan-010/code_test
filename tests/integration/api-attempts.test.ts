import { describe, expect, it } from "vitest";
import { PUT as saveAnswerRoute } from "@/app/api/attempts/[id]/answers/[questionId]/route";
import { GET as getResultRoute } from "@/app/api/attempts/[id]/result/route";
import { GET as getAttemptRoute } from "@/app/api/attempts/[id]/route";
import { POST as submitRoute } from "@/app/api/attempts/[id]/submit/route";
import { POST as startRoute } from "@/app/api/attempts/route";
import { apiRequest, createUser, getAttemptRow, routeParams, startAndAnswer } from "./helpers";

// 这些键一旦出现在交卷前的响应里，用户就能从浏览器里看到答案
const FORBIDDEN_KEYS = ["correct", "referenceAnswer", "citations", "verdict", "feedback"];

function collectKeys(value: unknown, keys = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((item) => collectKeys(item, keys));
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      keys.add(key);
      collectKeys(child, keys);
    }
  }
  return keys;
}

describe("POST /api/attempts", () => {
  it("新建返回 201，已有进行中的作答返回 200 和同一个编号", async () => {
    const user = await createUser("alice");
    const body = { scope: "chapter", chapterId: "X1" };

    const first = await startRoute(apiRequest("/api/attempts", { method: "POST", token: user.token, body }), {});
    expect(first.status).toBe(201);
    const { attemptId } = await first.json();

    const second = await startRoute(apiRequest("/api/attempts", { method: "POST", token: user.token, body }), {});
    expect(second.status).toBe(200);
    expect(await second.json()).toEqual({ attemptId });
  });

  it("未登录返回 401", async () => {
    const response = await startRoute(
      apiRequest("/api/attempts", { method: "POST", body: { scope: "chapter", chapterId: "X1" } }),
      {},
    );
    expect(response.status).toBe(401);
    expect((await response.json()).error.code).toBe("unauthenticated");
  });

  it("没有 Origin 或 Origin 不是本站时返回 403", async () => {
    const user = await createUser("alice");
    const body = { scope: "chapter", chapterId: "X1" };
    for (const origin of [null, "https://evil.example"]) {
      const response = await startRoute(
        apiRequest("/api/attempts", { method: "POST", token: user.token, body, origin }),
        {},
      );
      expect(response.status).toBe(403);
    }
  });

  it("请求体不合法返回 400 或 422，章节不存在返回 404", async () => {
    const user = await createUser("alice");
    const post = (body: unknown) =>
      startRoute(apiRequest("/api/attempts", { method: "POST", token: user.token, body }), {});
    expect((await post({ scope: "chapter" })).status).toBe(422);
    expect((await post({ scope: "whatever", chapterId: "X1" })).status).toBe(422);
    expect((await post({ scope: "chapter", chapterId: "X99" })).status).toBe(404);
  });
});

describe("GET /api/attempts/{id}", () => {
  it("进行中的作答不含任何能看出答案的字段", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1", {
      "X1-1": { choice: ["B"] },
      "X1-3": { text: "我的回答" },
    });

    const response = await getAttemptRoute(
      apiRequest(`/api/attempts/${attemptId}`, { token: user.token }),
      routeParams({ id: attemptId }),
    );
    expect(response.status).toBe(200);
    const payload = await response.json();

    const keys = collectKeys(payload);
    for (const forbidden of FORBIDDEN_KEYS) {
      expect(keys.has(forbidden), `响应里出现了 ${forbidden}`).toBe(false);
    }
    expect(JSON.stringify(payload)).not.toContain("参考答案");

    expect(payload.status).toBe("in_progress");
    expect(payload.questions).toHaveLength(5);
    expect(payload.questions[0]).toEqual({
      id: "X1-1",
      type: "single",
      stem: "X1-1 单选题干",
      options: [
        { key: "A", text: "X1-1 选项 A" },
        { key: "B", text: "X1-1 选项 B" },
        { key: "C", text: "X1-1 选项 C" },
        { key: "D", text: "X1-1 选项 D" },
      ],
      inNotebook: false,
      response: { choice: ["B"] },
    });
  });

  it("未登录返回 401，别人的作答返回 404", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X1");
    const get = (token?: string) =>
      getAttemptRoute(apiRequest(`/api/attempts/${attemptId}`, { token }), routeParams({ id: attemptId }));
    expect((await get()).status).toBe(401);
    expect((await get(bob.token)).status).toBe(404);
    expect((await get(alice.token)).status).toBe(200);
  });
});

describe("PUT /api/attempts/{id}/answers/{questionId}", () => {
  it("保存成功返回 204，不合法的答案返回 422", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    const put = (questionId: string, body: unknown) =>
      saveAnswerRoute(
        apiRequest(`/api/attempts/${attemptId}/answers/${questionId}`, {
          method: "PUT",
          token: user.token,
          body,
        }),
        routeParams({ id: attemptId, questionId }),
      );

    expect((await put("X1-1", { response: { choice: ["B"] } })).status).toBe(204);
    expect((await put("X1-3", { response: { text: "回答" } })).status).toBe(204);
    expect((await put("X1-1", { response: null })).status).toBe(204);
    expect((await put("X1-1", { response: { choice: ["A", "B"] } })).status).toBe(422);
    expect((await put("X1-1", { response: { choice: "B" } })).status).toBe(422);
    expect((await put("X1-1", {})).status).toBe(422);
    expect((await put("X2-1", { response: { choice: ["A"] } })).status).toBe(404);
  });
});

describe("POST /api/attempts/{id}/submit 与 GET /api/attempts/{id}/result", () => {
  it("进行中的作答请求结果返回 409", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X1");
    const response = await getResultRoute(
      apiRequest(`/api/attempts/${attemptId}/result`, { token: user.token }),
      routeParams({ id: attemptId }),
    );
    expect(response.status).toBe(409);
    expect((await response.json()).error.code).toBe("attempt_not_submitted");
  });

  it("有未答题时先返回 409 和未答数量，确认后交卷成功，结果里有答案和解答", async () => {
    const user = await createUser("alice");
    const attemptId = await startAndAnswer(user.id, "X2", { "X2-1": { choice: ["A"] } });
    const submit = (confirmUnanswered: boolean) =>
      submitRoute(
        apiRequest(`/api/attempts/${attemptId}/submit`, {
          method: "POST",
          token: user.token,
          body: { confirmUnanswered },
        }),
        routeParams({ id: attemptId }),
      );

    const refused = await submit(false);
    expect(refused.status).toBe(409);
    expect(await refused.json()).toMatchObject({
      error: { code: "has_unanswered" },
      unansweredCount: 1,
    });
    expect((await getAttemptRow(attemptId)).status).toBe("in_progress");

    const accepted = await submit(true);
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toEqual({ attemptId });

    const again = await submit(true);
    expect(again.status).toBe(409);
    expect((await again.json()).error.code).toBe("attempt_not_in_progress");

    const result = await getResultRoute(
      apiRequest(`/api/attempts/${attemptId}/result`, { token: user.token }),
      routeParams({ id: attemptId }),
    );
    expect(result.status).toBe(200);
    const payload = await result.json();
    expect(payload).toMatchObject({ totalCount: 2, correctCount: 1, pendingCount: 0 });
    expect(payload.questions[0]).toMatchObject({
      id: "X2-1",
      verdict: "correct",
      referenceAnswer: "X2-1 的参考答案。",
    });
    expect(payload.questions[1].verdict).toBe("unanswered");
  });

  it("触发限流时返回 429 并带 Retry-After", async () => {
    const user = await createUser("alice");
    const submit = async () => {
      const attemptId = await startAndAnswer(user.id, "X2");
      return submitRoute(
        apiRequest(`/api/attempts/${attemptId}/submit`, {
          method: "POST",
          token: user.token,
          body: { confirmUnanswered: true },
        }),
        routeParams({ id: attemptId }),
      );
    };
    for (let i = 0; i < 10; i++) expect((await submit()).status).toBe(200);
    const limited = await submit();
    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get("Retry-After"))).toBeGreaterThan(0);
  });

  it("别人不能替我交卷，也看不到我的结果", async () => {
    const alice = await createUser("alice");
    const bob = await createUser("bob");
    const attemptId = await startAndAnswer(alice.id, "X2");

    const stolen = await submitRoute(
      apiRequest(`/api/attempts/${attemptId}/submit`, {
        method: "POST",
        token: bob.token,
        body: { confirmUnanswered: true },
      }),
      routeParams({ id: attemptId }),
    );
    expect(stolen.status).toBe(404);
    expect((await getAttemptRow(attemptId)).status).toBe("in_progress");
  });
});
