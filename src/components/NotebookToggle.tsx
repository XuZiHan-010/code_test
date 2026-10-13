"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api-client";

/** 显示一道题是否在错题本里，点击加入或移出 */
export function NotebookToggle({
  questionId,
  initial,
  refreshOnChange = false,
  onChange,
}: {
  questionId: string;
  initial: boolean;
  /** 在错题本页面里移出一道题后要刷新列表 */
  refreshOnChange?: boolean;
  onChange?: (inNotebook: boolean) => void;
}) {
  const router = useRouter();
  const [inNotebook, setInNotebook] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    const next = !inNotebook;
    setBusy(true);
    setFailed(false);
    setInNotebook(next);
    const result = await api(`/api/notebook/${encodeURIComponent(questionId)}`, {
      method: next ? "PUT" : "DELETE",
    });
    setBusy(false);
    if (!result.ok) {
      setInNotebook(!next);
      setFailed(true);
      return;
    }
    onChange?.(next);
    if (refreshOnChange) router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={inNotebook}
      title={failed ? "操作没有成功，请再试一次" : undefined}
      className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors disabled:opacity-60 ${
        inNotebook
          ? "border-pen bg-pen-soft text-pen"
          : "border-rule bg-card text-ink-soft hover:border-ink-faint"
      }`}
    >
      <span aria-hidden>{inNotebook ? "★" : "☆"}</span>
      {failed ? "没成功，重试" : inNotebook ? "已在错题本" : "加入错题本"}
    </button>
  );
}
