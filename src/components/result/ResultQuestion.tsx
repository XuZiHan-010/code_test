import type { ReactNode } from "react";
import { QUESTION_TYPE_LABEL, VERDICT_LABEL, VERDICT_TAG_CLASS } from "@/lib/labels";
import type { ResultQuestion as ResultQuestionData } from "@/server/attempts/submit";

/**
 * 一道题交卷后的完整展示：用户的答案、判定、正确答案、解答和原文出处。
 * 结果页、每章错题页和错题本都用它；只有带判定的场景才传 verdict。
 */
export function ResultQuestion({
  question,
  number,
  actions,
}: {
  question: Omit<ResultQuestionData, "verdict" | "response" | "feedback"> &
    Partial<Pick<ResultQuestionData, "verdict" | "response" | "feedback">>;
  number?: number;
  /** 放在标题行右侧的操作，例如加入错题本 */
  actions?: ReactNode;
}) {
  const { verdict, response } = question;
  const selected = response && "choice" in response ? response.choice : [];
  const answerText = response && "text" in response ? response.text : "";
  const showResponse = verdict !== undefined;

  return (
    <article className="sheet px-5 py-6 sm:px-8">
      <header className="mb-4 flex flex-wrap items-center gap-2">
        {number !== undefined && (
          <span className="font-mono text-sm text-ink-faint">第 {number} 题</span>
        )}
        <span className="stamp">{question.id}</span>
        <span className="tag tag-plain">{QUESTION_TYPE_LABEL[question.type]}</span>
        {verdict && <span className={`tag ${VERDICT_TAG_CLASS[verdict]}`}>{VERDICT_LABEL[verdict]}</span>}
        {question.wrongCount > 0 && (
          <span className="tag tag-pen">累计错 {question.wrongCount} 次</span>
        )}
        {actions && <span className="ml-auto">{actions}</span>}
      </header>

      <h3 className="mb-5 font-serif text-lg leading-8 font-bold">{question.stem}</h3>

      {question.options && (
        <ul className="mb-5 space-y-2">
          {question.options.map((option) => {
            const chosen = selected.includes(option.key);
            const tone = option.correct
              ? "border-pass bg-pass-soft"
              : chosen
                ? "border-pen bg-pen-soft"
                : "border-rule";
            return (
              <li key={option.key} className={`flex items-start gap-3 rounded-sm border px-4 py-2.5 ${tone}`}>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs ${
                    question.type === "single" ? "rounded-full" : "rounded-sm"
                  } ${
                    option.correct
                      ? "border-pass bg-pass text-card"
                      : chosen
                        ? "border-pen bg-pen text-card"
                        : "border-ink-faint text-ink-soft"
                  }`}
                >
                  {option.key}
                </span>
                <span className="flex-1 leading-7">{option.text}</span>
                <span className="shrink-0 pt-1 text-xs">
                  {option.correct && <span className="text-pass">正确选项</span>}
                  {showResponse && chosen && (
                    <span className={option.correct ? "ml-2 text-pass" : "text-pen"}>
                      {option.correct ? "· 你选了" : "你选了"}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {showResponse && question.type === "short" && (
        <section className="mb-5">
          <h4 className="mb-1.5 text-xs tracking-widest text-ink-faint">你的答案</h4>
          {answerText ? (
            <p className="rounded-sm border border-rule bg-paper px-4 py-3 leading-7 whitespace-pre-wrap">
              {answerText}
            </p>
          ) : (
            <p className="text-sm text-ink-faint">没有作答</p>
          )}
          {verdict === "pending" && (
            <p className="mt-2 text-sm text-wait">正在评分，评出后这里会自动更新。</p>
          )}
          {question.feedback && (
            <p className={`mt-2 border-l-2 pl-3 text-sm leading-7 ${verdict === "correct" ? "border-pass text-pass" : "border-pen text-pen"}`}>
              评语：{question.feedback}
            </p>
          )}
        </section>
      )}

      <section className="border-t border-dashed border-rule pt-4">
        <h4 className="mb-1.5 text-xs tracking-widest text-ink-faint">解答</h4>
        <p className="leading-8 whitespace-pre-wrap">{question.referenceAnswer}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {question.citations.map((citation) => (
            <li key={citation.url + citation.label}>
              <a href={citation.url} target="_blank" rel="noreferrer" className="link">
                {citation.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
