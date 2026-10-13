import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { ResultView } from "@/components/result/ResultView";
import { getAttemptResult } from "@/server/attempts/submit";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { AppError } from "@/server/errors";

export const metadata: Metadata = { title: "作答结果" };

async function Result({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUserOrRedirect();
  const { id } = await params;

  const result = await getAttemptResult(user.id, id).catch((error: unknown) => {
    if (error instanceof AppError && error.status === 404) notFound();
    // 还没交卷：回到答题页
    if (error instanceof AppError && error.code === "attempt_not_submitted") {
      redirect(`/attempts/${id}`);
    }
    throw error;
  });

  return <ResultView initial={result} />;
}

export default function ResultPage(props: PageProps<"/attempts/[id]/result">) {
  return (
    <Suspense fallback={<PageLoading label="正在取结果…" />}>
      <Result params={props.params} />
    </Suspense>
  );
}
