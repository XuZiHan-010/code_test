import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { PageLoading } from "@/components/PageLoading";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getAttemptForAnswering } from "@/server/attempts/service";
import { requireUserOrRedirect } from "@/server/auth/current-user";
import { AppError } from "@/server/errors";

export const metadata: Metadata = { title: "答题" };

async function Attempt({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUserOrRedirect();
  const { id } = await params;

  const attempt = await getAttemptForAnswering(user.id, id).catch((error: unknown) => {
    if (error instanceof AppError && error.status === 404) notFound();
    throw error;
  });
  if (attempt.status === "submitted") redirect(`/attempts/${attempt.id}/result`);
  if (attempt.questions.length === 0) notFound();

  return <QuizRunner attempt={attempt} />;
}

export default function AttemptPage(props: PageProps<"/attempts/[id]">) {
  return (
    <Suspense fallback={<PageLoading label="正在取题…" />}>
      <Attempt params={props.params} />
    </Suspense>
  );
}
