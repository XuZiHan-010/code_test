"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api-client";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await api("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="cursor-pointer text-sm text-ink-faint underline-offset-4 hover:text-ink hover:underline disabled:opacity-50"
    >
      退出
    </button>
  );
}
