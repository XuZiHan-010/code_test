"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { accuracyPercent } from "@/lib/labels";
import { NotebookToggle } from "@/components/NotebookToggle";
import type { AttemptResult } from "@/server/attempts/submit";
import { ResultQuestion } from "./ResultQuestion";
import { SourceNotice } from "./SourceNotice";

const POLL_INTERVAL_MS = 4000;

export function ResultView({ initial }: { initial: AttemptResult }) {
  const [result, setResult] = useState(initial);
  const [onlyWrong, setOnlyWrong] = useState(false);

  // 还有简答题在评分时，定时重新取结果，直到全部评出
  useEffect(() => {
    if (result.pendingCount === 0) return;
    const timer = setTimeout(async () => {
      const fresh = await api<AttemptResult>(`/api/attempts/${result.id}/result`);
      // 取不到就保持原样，下一轮再试
      setResult((prev) => (fresh.ok ? fresh.data : { ...prev }));
    }, POLL_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [result]);

  const { totalCount, correctCount, pendingCount, questions } = result;
  const percent = accuracyPercent(correctCount, totalCount);
  const wrongCount = questions.filter((q) => q.verdict === "incorrect").length;
  const unansweredCount = questions.filter((q) => q.verdict === "unanswered").length;
  const shown = questions
    .map((question, index) => ({ question, number: index + 1 }))
    .filter(({ question }) => !onlyWrong || question.verdict === "incorrect");
  const backHref = result.scope.type === "chapter" ? "/practice" : "/notebook";

  return (
    <div className="space-y-6">
      <header className="rise sheet flex flex-wrap items-center gap-6 px-5 py-6 sm:px-8">
        {/* 像老师用红笔圈出的成绩 */}
        <div
          className="flex h-28 w-28 shrink-0 -rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-pen text-pen"
          aria-label={`正确率 ${percent}%`}
        >
          <span className="font-serif text-4xl leading-none font-bold">{percent}</span>
          <span className="mt-1 text-xs tracking-widest">正确率 %</span>
        </div>
        <div className="min-w-0 flex-1 basis-56">
          <p className="eyebrow mb-1">
            {result.scope.type === "chapter" ? `章节 ${result.scope.chapterId}` : "错题本"} · 作答结果
          </p>
          <h1 className="mb-3 font-serif text-xl font-bold sm:text-2xl">{result.scope.title}</h1>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span>
              答对 <b className="font-mono text-pass">{correctCount}</b> / {totalCount}
            </span>
            <span>
              答错 <b className="font-mono text-pen">{wrongCount}</b>
            </span>
            {unansweredCount > 0 && (
              <span>
                未答 <b className="font-mono">{unansweredCount}</b>
              </span>
            )}
            {pendingCount > 0 && (
              <span className="text-wait">
                待评分 <b className="font-mono">{pendingCount}</b>
              </span>
            )}
          </p>
          {pendingCount > 0 && (
            <p role="status" className="mt-2 text-xs text-wait">
              还有 {pendingCount} 道简答题正在评分，评出后正确率会自动更新。
            </p>
          )}
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 accent-pen"
            checked={onlyWrong}
            onChange={(e) => setOnlyWrong(e.target.checked)}
          />
          只看答错的题（{wrongCount}）
        </label>
        <Link href={backHref} className="btn">
          {result.scope.type === "chapter" ? "回到专题列表" : "回到错题本"}
        </Link>
      </div>

      {shown.length === 0 ? (
        <p className="sheet px-6 py-10 text-center text-sm text-ink-soft">
          {onlyWrong ? "这次没有答错的题。" : "这次作答没有题目。"}
        </p>
      ) : (
        <ol className="space-y-5">
          {shown.map(({ question, number }) => (
            <li key={question.id}>
              <ResultQuestion
                question={question}
                number={number}
                actions={<NotebookToggle questionId={question.id} initial={question.inNotebook} />}
              />
            </li>
          ))}
        </ol>
      )}

      <SourceNotice />
    </div>
  );
}
