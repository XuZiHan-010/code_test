"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { api } from "@/lib/api-client";

type Scope = { scope: "chapter"; chapterId: string } | { scope: "notebook" };

/** 开始（或继续）一次作答，然后进入答题页 */
export function StartAttemptButton({
  scope,
  label,
  className = "btn btn-primary",
}: {
  scope: Scope;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const [requesting, setRequesting] = useState(false);
  // 页面跳转用 transition 跟踪：跳转结束后自动恢复。
  // 离开的页面会被保留下来，如果用普通状态记“忙”，返回时按钮会一直停在“请稍候”。
  const [navigating, startNavigation] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const busy = requesting || navigating;

  async function start() {
    setRequesting(true);
    setError(null);
    const result = await api<{ attemptId: string }>("/api/attempts", {
      method: "POST",
      body: scope,
    });
    setRequesting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    startNavigation(() => router.push(`/attempts/${result.data.attemptId}`));
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button type="button" className={className} onClick={start} disabled={busy}>
        {busy ? "请稍候…" : label}
      </button>
      {error && (
        <span role="alert" className="text-xs text-pen">
          {error}
        </span>
      )}
    </span>
  );
}
