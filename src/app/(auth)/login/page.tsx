import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "登录" };

export default function LoginPage() {
  return (
    <>
      <h2 className="mb-6 font-serif text-xl font-bold">登录</h2>
      <Suspense fallback={<p className="text-sm text-ink-faint">正在加载…</p>}>
        <AuthForm mode="login" />
      </Suspense>
    </>
  );
}
