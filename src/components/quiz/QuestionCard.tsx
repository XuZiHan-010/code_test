"use client";

import { QUESTION_TYPE_LABEL } from "@/lib/labels";
import type { AnsweringQuestion } from "@/server/attempts/service";
import type { AnswerResponse } from "@/server/db/schema";

const MAX_CHARS = 2000;

/** 一道题的作答区。单选只能选一个；多选可以选多个并标明是多选；简答是带字数上限的文本框。 */
export function QuestionCard({
  question,
  number,
  total,
  response,
  disabled,
  onChange,
  onBlur,
}: {
  question: AnsweringQuestion;
  number: number;
  total: number;
  response: AnswerResponse | null;
  disabled: boolean;
  onChange: (response: AnswerResponse | null) => void;
  onBlur: () => void;
}) {
  const selected = response && "choice" in response ? response.choice : [];
  const text = response && "text" in response ? response.text : "";
  const charCount = [...text].length;

  function toggle(key: string) {
    if (question.type === "single") {
      onChange(selected.includes(key) ? null : { choice: [key] });
      return;
    }
    const next = selected.includes(key)
      ? selected.filter((k) => k !== key)
      : [...selected, key].sort();
    onChange(next.length === 0 ? null : { choice: next });
  }

  return (
    <article className="sheet px-5 py-6 sm:px-8 sm:py-8">
      <header className="mb-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm text-ink-faint">
          第 {number} / {total} 题
        </span>
        <span className="stamp">{question.id}</span>
        <span className={`tag ${question.type === "multiple" ? "tag-pen" : "tag-blue"}`}>
          {QUESTION_TYPE_LABEL[question.type]}
        </span>
        {question.type === "multiple" && (
          <span className="text-xs text-ink-soft">选出所有正确的选项，多选、少选、错选都不得分</span>
        )}
      </header>

      <h2 className="mb-6 font-serif text-lg leading-8 font-bold sm:text-xl">{question.stem}</h2>

      {question.options ? (
        <fieldset disabled={disabled} className="space-y-3">
          <legend className="sr-only">选项</legend>
          {question.options.map((option) => {
            const checked = selected.includes(option.key);
            return (
              <label
                key={option.key}
                className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 transition-colors ${
                  checked ? "border-ink bg-paper-deep" : "border-rule hover:border-ink-faint"
                }`}
              >
                <input
                  type={question.type === "single" ? "radio" : "checkbox"}
                  name={`q-${question.id}`}
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggle(option.key)}
                  // 单选题再点一次已选中的选项可以取消
                  onClick={() => {
                    if (question.type === "single" && checked) toggle(option.key);
                  }}
                />
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs ${
                    question.type === "single" ? "rounded-full" : "rounded-sm"
                  } ${checked ? "border-ink bg-ink text-card" : "border-ink-faint text-ink-soft"}`}
                >
                  {option.key}
                </span>
                <span className="leading-7">{option.text}</span>
              </label>
            );
          })}
        </fieldset>
      ) : (
        <div>
          <label htmlFor={`a-${question.id}`} className="sr-only">
            你的答案
          </label>
          <textarea
            id={`a-${question.id}`}
            className="field min-h-48 resize-y leading-7"
            placeholder="用自己的话写下答案。交卷后会对照参考答案评分。"
            value={text}
            disabled={disabled}
            maxLength={MAX_CHARS}
            onChange={(e) => onChange(e.target.value === "" ? null : { text: e.target.value })}
            onBlur={onBlur}
          />
          <p
            className={`mt-1.5 text-right font-mono text-xs ${
              charCount >= MAX_CHARS ? "text-pen" : "text-ink-faint"
            }`}
          >
            {charCount} / {MAX_CHARS}
          </p>
        </div>
      )}
    </article>
  );
}
