"use client";

import { useRef } from "react";
import { NotebookToggle } from "@/components/NotebookToggle";
import { QUESTION_TYPE_LABEL } from "@/lib/labels";
import type { AnsweringQuestion } from "@/server/attempts/service";
import type { AnswerResponse } from "@/server/db/schema";

const MAX_CHARS = 2000;
/** 代码题上限，与服务端 CODE_ANSWER_MAX_CHARS 同值；不 import 服务端模块以免带进客户端包。 */
const CODE_MAX_CHARS = 8000;

/** 作答区：选择题选项、简答文本框或逐空输入；文字答案合计限制 2000 字。 */
export function QuestionCard({
  question,
  number,
  total,
  response,
  inNotebook,
  disabled,
  onChange,
  onBlur,
  onNotebookChange,
}: {
  question: AnsweringQuestion;
  number: number;
  total: number;
  response: AnswerResponse | null;
  inNotebook: boolean;
  disabled: boolean;
  onNotebookChange: (inNotebook: boolean) => void;
  onChange: (response: AnswerResponse | null) => void;
  onBlur: () => void;
}) {
  const selected = response && "choice" in response ? response.choice : [];
  const text = response && "text" in response ? response.text : "";
  const blanks = response && "blanks" in response ? response.blanks : Array<string>(question.blankCount ?? 0).fill("");
  const blankChars = blanks.reduce((total, value) => total + [...value].length, 0);
  const charCount = [...text].length;
  const codeCount = charCount;
  const escapeTab = useRef(false);

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
        <span className="ml-auto">
          <NotebookToggle
            questionId={question.id}
            initial={inNotebook}
            onChange={onNotebookChange}
          />
        </span>
      </header>

      <h2 className="mb-6 font-head text-lg leading-8 font-bold sm:text-xl">{question.stem}</h2>

      {question.type === "fill" ? (
        <fieldset disabled={disabled} className="space-y-3">
          <legend className="mb-3 text-sm text-ink-soft">
            共 {question.blankCount} 空，{question.blankOrder === "unordered" ? "顺序不限" : "按题干顺序填写"}。支持同义表达和中英文术语，交卷后按语义评分。
          </legend>
          {Array.from({ length: question.blankCount ?? 0 }, (_, index) => (
            <div key={index}>
              <label htmlFor={`a-${question.id}-${index}`} className="mb-1 block text-sm text-ink-soft">第 {index + 1} 空</label>
              <input
                id={`a-${question.id}-${index}`}
                type="text"
                className="field"
                placeholder={`填写第 ${index + 1} 空`}
                value={blanks[index] ?? ""}
                maxLength={Math.max(0, MAX_CHARS - blankChars + [...(blanks[index] ?? "")].length)}
                onChange={(event) => {
                  const next = [...blanks];
                  next[index] = event.target.value;
                  onChange(next.every(value => value === "") ? null : { blanks: next });
                }}
                onBlur={onBlur}
              />
            </div>
          ))}
          <p className="text-right font-mono text-xs text-ink-faint">已填 {blanks.filter(value => value.trim() !== "").length} / {question.blankCount} 空 · 合计 {blankChars} / {MAX_CHARS} 字</p>
        </fieldset>
      ) : question.options ? (
        <fieldset disabled={disabled} className="space-y-3">
          <legend className="sr-only">选项</legend>
          {question.options.map((option) => {
            const checked = selected.includes(option.key);
            return (
              <label
                key={option.key}
                className={`question-option flex min-h-12 cursor-pointer items-start gap-3 border px-4 py-3 transition-colors ${
                  checked ? "border-accent bg-accent/10" : "border-rule hover:border-ink-faint"
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
                  } ${checked ? "border-accent bg-accent text-accent-ink" : "border-ink-faint text-ink-soft"}`}
                >
                  {option.key}
                </span>
                <span className="leading-7">{option.text}</span>
              </label>
            );
          })}
        </fieldset>
      ) : question.type === "code" ? (
        <div>
          <p className="mb-2 text-sm text-ink-soft">
            用任意语言作答。在自己的编辑器里写好，把代码粘贴到下面；交卷后由 AI 对照参考答案判卷。
          </p>
          <label htmlFor={`a-${question.id}`} className="sr-only">
            你的代码
          </label>
          <textarea
            id={`a-${question.id}`}
            className="field min-h-72 resize-y font-mono text-sm leading-6"
            placeholder="在此粘贴你的代码"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            wrap="off"
            value={text}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value === "" ? null : { text: e.target.value })}
            onBlur={onBlur}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                // Esc 之后的下一次 Tab 交还给浏览器，用来离开输入框
                escapeTab.current = true;
                return;
              }
              if (event.key !== "Tab" || event.shiftKey) {
                escapeTab.current = false;
                return;
              }
              if (escapeTab.current) {
                escapeTab.current = false;
                return;
              }
              event.preventDefault();
              const el = event.currentTarget;
              const start = el.selectionStart;
              const next = `${el.value.slice(0, start)}    ${el.value.slice(el.selectionEnd)}`;
              // 插入后会超过上限就不插入（已 preventDefault，焦点不会跳走）
              if ([...next].length > CODE_MAX_CHARS) return;
              onChange({ text: next });
              requestAnimationFrame(() => el.setSelectionRange(start + 4, start + 4));
            }}
          />
          <p className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-ink-faint">
            <span>Tab 插入 4 个空格；按 Esc 再按 Tab 可离开输入框。</span>
            <span className={`font-mono ${codeCount >= CODE_MAX_CHARS ? "text-pen" : ""}`}>
              {codeCount > CODE_MAX_CHARS && (
                <span role="alert" className="mr-2">
                  超出 {codeCount - CODE_MAX_CHARS} 字，无法保存，请删减后再交卷
                </span>
              )}
              {codeCount} / {CODE_MAX_CHARS}
            </span>
          </p>
        </div>
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
