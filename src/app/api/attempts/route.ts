import { NextResponse } from "next/server";
import { z } from "zod";
import { startAttempt } from "@/server/attempts/service";
import { handle, readJson, requireUser } from "@/server/http/api";

const bodySchema = z.object({
  scope: z.literal("chapter"),
  chapterId: z.string().min(1),
});

/** 开始一次作答，或取回该范围已有的进行中的作答 */
export const POST = handle(async (request) => {
  const user = await requireUser(request);
  const body = await readJson(request, bodySchema);
  const { attemptId, created } = await startAttempt(user.id, {
    type: "chapter",
    chapterId: body.chapterId,
  });
  return NextResponse.json({ attemptId }, { status: created ? 201 : 200 });
});
