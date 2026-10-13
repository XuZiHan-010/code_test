import Link from "next/link";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { requireUserOrRedirect } from "@/server/auth/current-user";

async function ModeSelect() {
  const user = await requireUserOrRedirect();

  return (
    <div className="rise">
      <p className="eyebrow mb-2">选择模式</p>
      <h1 className="title mb-8">{user.username}，今天练点什么？</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        <Link href="/practice" className="sheet group block p-6 transition-transform hover:-translate-y-0.5">
          <span className="stamp mb-4">壹</span>
          <h2 className="mb-2 font-serif text-xl font-bold">做题模式</h2>
          <p className="text-sm text-ink-soft">
            按章节作答，交卷后看正确率和每道题的解答。做错的题会记下来，也可以自己收进错题本。
          </p>
          <span className="mt-5 inline-block text-sm text-blue underline-offset-4 group-hover:underline">
            进入做题 →
          </span>
        </Link>

        <Link href="/battle" className="sheet group block border-dashed p-6 transition-transform hover:-translate-y-0.5">
          <span className="stamp mb-4">贰</span>
          <h2 className="mb-2 font-serif text-xl font-bold">
            对战模式
            <span className="tag tag-plain ml-2 align-middle font-sans font-normal">尚未开放</span>
          </h2>
          <p className="text-sm text-ink-soft">多人在线对战，正在筹备中。</p>
          <span className="mt-5 inline-block text-sm text-ink-faint underline-offset-4 group-hover:underline">
            了解一下 →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ModeSelect />
    </Suspense>
  );
}
