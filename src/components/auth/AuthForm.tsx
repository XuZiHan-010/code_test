"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api } from "@/lib/api-client";
import { safeNextPath } from "@/lib/next-path";

const copy = {
  login: {
    endpoint: "/api/auth/login",
    submit: "登录",
    submitting: "正在登录…",
    switchText: "还没有账号？",
    switchLabel: "注册一个",
    switchHref: "/register",
  },
  register: {
    endpoint: "/api/auth/register",
    submit: "注册并开始",
    submitting: "正在注册…",
    switchText: "已经有账号？",
    switchLabel: "去登录",
    switchHref: "/login",
  },
} as const;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const text = copy[mode];

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const result = await api(text.endpoint, { method: "POST", body: { username, password } });
    if (!result.ok) {
      setError(result.message);
      setBusy(false);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  const switchHref = next === "/" ? text.switchHref : `${text.switchHref}?next=${encodeURIComponent(next)}`;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <label className="block">
        <span className="mb-1.5 block text-sm text-ink-soft">用户名</span>
        <input
          className="field"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {mode === "register" && (
          <span className="mt-1.5 block text-xs text-ink-faint">
            3 到 20 个字符，可以用字母、数字、下划线和中文
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm text-ink-soft">密码</span>
        <input
          className="field"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === "register" && (
          <span className="mt-1.5 block text-xs text-ink-faint">
            至少 8 位。忘记密码无法找回，请记牢
          </span>
        )}
      </label>

      {error && (
        <p role="alert" className="border-l-2 border-pen bg-pen-soft px-3 py-2 text-sm text-pen">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full" disabled={busy || !username || !password}>
        {busy ? text.submitting : text.submit}
      </button>

      <p className="text-center text-sm text-ink-soft">
        {text.switchText}
        <Link href={switchHref} className="link ml-1">
          {text.switchLabel}
        </Link>
      </p>
    </form>
  );
}
