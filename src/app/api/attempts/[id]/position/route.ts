import { z } from "zod";
import { setPosition } from "@/server/attempts/service";
import { handle, noContent, readJson, requireUser } from "@/server/http/api";

const bodySchema = z.object({ questionId: z.string().min(1) });

/** 只更新用户所在的题目，用于翻到一道题但没有作答的情况 */
export const PUT = handle<RouteContext<"/api/attempts/[id]/position">>(async (request, context) => {
  const user = await requireUser(request);
  const { id } = await context.params;
  const { questionId } = await readJson(request, bodySchema);
  await setPosition(user.id, id, questionId);
  return noContent();
});
