"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setBusy(true);
    setError(null);
    const result = await api<{ attemptId: string }>("/api/attempts", {
      method: "POST",
      body: scope,
    });
    if (!result.ok) {
      setError(result.message);
      setBusy(false);
      return;
    }
    router.push(`/attempts/${result.data.attemptId}`);
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
