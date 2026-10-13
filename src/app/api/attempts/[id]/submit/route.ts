import { NextResponse } from "next/server";
import { z } from "zod";
import { submitAttempt } from "@/server/attempts/submit";
import { handle, readJson, requireUser } from "@/server/http/api";

const bodySchema = z.object({ confirmUnanswered: z.boolean() });

/** 交卷。有未答题且未确认时返回 409 和未答数量 */
export const POST = handle<RouteContext<"/api/attempts/[id]/submit">>(async (request, context) => {
  const user = await requireUser(request);
  const { id } = await context.params;
  const { confirmUnanswered } = await readJson(request, bodySchema);
  await submitAttempt(user.id, id, { confirmUnanswered });
  return NextResponse.json({ attemptId: id });
});
