import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "注册" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-8 text-center font-head text-2xl font-bold">注册</h1>
      <Suspense fallback={<p className="text-sm text-ink-faint">正在加载…</p>}>
        <AuthForm mode="register" />
      </Suspense>
    </>
  );
}
