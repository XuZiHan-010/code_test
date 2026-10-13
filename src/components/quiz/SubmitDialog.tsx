"use client";

import { useEffect, useRef } from "react";

/** 交卷前的确认：有未答题时说明数量，要求用户明确确认 */
export function SubmitDialog({
  open,
  unansweredCount,
  busy,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  unansweredCount: number;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="sheet m-auto w-[min(92vw,26rem)] p-0 backdrop:bg-ink/40"
    >
      <div className="px-6 py-6">
        <h3 className="mb-3 font-serif text-lg font-bold">还有题目没有作答</h3>
        <p className="mb-6 text-sm leading-7 text-ink-soft">
          还有 <span className="font-mono text-base font-bold text-pen">{unansweredCount}</span>{" "}
          道题没有作答。现在交卷的话，这些题不得分，但也不会记成错题。交卷后不能再修改。
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" className="btn" onClick={onCancel} disabled={busy}>
            回去继续做
          </button>
          <button type="button" className="btn btn-pen" onClick={onConfirm} disabled={busy}>
            {busy ? "正在交卷…" : "仍然交卷"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
