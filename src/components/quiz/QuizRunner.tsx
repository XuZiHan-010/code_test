"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/lib/api-client";
import type { AttemptForAnswering } from "@/server/attempts/service";
import type { AnswerResponse } from "@/server/db/schema";
import { QuestionCard } from "./QuestionCard";
import { QuestionOverview } from "./QuestionOverview";
import { SubmitDialog } from "./SubmitDialog";

type InProgress = Extract<AttemptForAnswering, { status: "in_progress" }>;
type SaveState = "idle" | "saving" | "saved" | "error";

const TEXT_SAVE_DELAY_MS = 800;

function isAnswered(response: AnswerResponse | null | undefined): boolean {
  if (!response) return false;
  return "choice" in response ? response.choice.length > 0 : response.text.trim() !== "";
}

export function QuizRunner({ attempt }: { attempt: InProgress }) {
  const router = useRouter();
  const { questions } = attempt;

  const [responses, setResponses] = useState<Record<string, AnswerResponse | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, q.response])),
  );
  const [index, setIndex] = useState(() => {
    const last = questions.findIndex((q) => q.id === attempt.lastQuestionId);
    return last >= 0 ? last : 0;
  });
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmCount, setConfirmCount] = useState<number | null>(null);

  // 还没存到服务器的答案；按题号记最新的一份
  const dirty = useRef(new Map<string, AnswerResponse | null>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saving = useRef<Promise<void>>(Promise.resolve());

  const question = questions[index];
  const resultHref = `/attempts/${attempt.id}/result`;

  /** 把所有未保存的答案依次存到服务器。同一时间只有一个保存在进行。 */
  const flush = useCallback((): Promise<void> => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    saving.current = saving.current.then(async () => {
      while (dirty.current.size > 0) {
        const [questionId, response] = dirty.current.entries().next().value!;
        dirty.current.delete(questionId);
        setSaveState("saving");
        const result = await api(`/api/attempts/${attempt.id}/answers/${questionId}`, {
          method: "PUT",
          body: { response },
        });
        if (result.ok) continue;

        if (result.code === "attempt_not_in_progress") {
          // 另一台设备已经交卷：停止保存，引导去看结果
          dirty.current.clear();
          setEnded(true);
          setSaveState("idle");
          return;
        }
        // 保存失败：放回去，等下一次改动或交卷时再试
        if (!dirty.current.has(questionId)) dirty.current.set(questionId, response);
        setSaveState("error");
        setNotice(result.message);
        return;
      }
      setSaveState("saved");
      setNotice(null);
    });
    return saving.current;
  }, [attempt.id]);

  function change(response: AnswerResponse | null) {
    if (ended) return;
    setResponses((prev) => ({ ...prev, [question.id]: response }));
    dirty.current.set(question.id, response);
    if (question.type === "short") {
      // 输入文字时稍等一下再存，避免每敲一个字就发一次请求
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), TEXT_SAVE_DELAY_MS);
    } else {
      void flush();
    }
  }

  function jump(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= questions.length || nextIndex === index) return;
    void flush();
    setIndex(nextIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(confirmUnanswered: boolean) {
    setSubmitting(true);
    setNotice(null);
    await flush();
    if (dirty.current.size > 0) {
      // 还有答案没存上，不能交卷
      setSubmitting(false);
      setConfirmCount(null);
      return;
    }

    const result = await api(`/api/attempts/${attempt.id}/submit`, {
      method: "POST",
      body: { confirmUnanswered },
    });
    if (result.ok || result.code === "attempt_not_in_progress") {
      router.replace(resultHref);
      return;
    }
    setSubmitting(false);
    if (result.code === "has_unanswered") {
      setConfirmCount(Number(result.extra.unansweredCount ?? 0));
      return;
    }
    setConfirmCount(null);
    setNotice(result.message);
  }

  // 关闭或离开页面前尽量把没存的答案发出去
  useEffect(() => {
    const onHide = () => {
      if (dirty.current.size > 0) void flush();
    };
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      onHide();
    };
  }, [flush]);

  const overview = useMemo(
    () => questions.map((q) => ({ id: q.id, answered: isAnswered(responses[q.id]) })),
    [questions, responses],
  );

  const saveLabel: Record<SaveState, string> = {
    idle: "",
    saving: "正在保存…",
    saved: "已保存",
    error: "保存失败",
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">
            {attempt.scope.type === "chapter" ? `章节 ${attempt.scope.chapterId}` : "错题本"}
          </p>
          <h1 className="font-serif text-xl font-bold sm:text-2xl">{attempt.scope.title}</h1>
        </div>
        <p
          aria-live="polite"
          className={`font-mono text-xs ${saveState === "error" ? "text-pen" : "text-ink-faint"}`}
        >
          {saveLabel[saveState]}
        </p>
      </header>

      {ended && (
        <div role="alert" className="sheet border-pen px-5 py-4 text-sm">
          这次作答已经交卷，不能再修改。
          <Link href={resultHref} className="link ml-2">
            查看结果
          </Link>
        </div>
      )}

      {notice && !ended && (
        <p role="alert" className="border-l-2 border-pen bg-pen-soft px-3 py-2 text-sm text-pen">
          {notice}
          {saveState === "error" && (
            <button type="button" className="ml-3 cursor-pointer underline" onClick={() => void flush()}>
              重试
            </button>
          )}
        </p>
      )}

      <QuestionCard
        key={question.id}
        question={question}
        number={index + 1}
        total={questions.length}
        response={responses[question.id] ?? null}
        disabled={ended || submitting}
        onChange={change}
        onBlur={() => void flush()}
      />

      <nav aria-label="翻题" className="flex items-center justify-between gap-3">
        <button type="button" className="btn" onClick={() => jump(index - 1)} disabled={index === 0}>
          ← 上一题
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => jump(index + 1)}
          disabled={index === questions.length - 1}
        >
          下一题 →
        </button>
      </nav>

      <QuestionOverview items={overview} currentIndex={index} onJump={jump} />

      <div className="flex flex-wrap items-center justify-end gap-4">
        <p className="text-xs text-ink-faint">答案会自动保存，可以随时离开，下次接着做。</p>
        <button
          type="button"
          className="btn btn-pen"
          onClick={() => void submit(false)}
          disabled={ended || submitting}
        >
          {submitting ? "正在交卷…" : "交卷"}
        </button>
      </div>

      <SubmitDialog
        open={confirmCount !== null}
        unansweredCount={confirmCount ?? 0}
        busy={submitting}
        onConfirm={() => void submit(true)}
        onCancel={() => setConfirmCount(null)}
      />
    </div>
  );
}
