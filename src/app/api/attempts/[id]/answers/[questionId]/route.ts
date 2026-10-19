import { z } from "zod";
import { saveAnswer } from "@/server/attempts/service";
import { handle, noContent, readJson, requireUser } from "@/server/http/api";

const bodySchema = z.object({
  response: z.union([
    z.strictObject({ choice: z.array(z.string()) }),
    z.strictObject({ text: z.string() }),
    z.strictObject({ blanks: z.array(z.string()).max(20) }),
    z.null(),
  ]),
});

/** 保存一道题的答案，同时记录用户当前所在的题目 */
export const PUT = handle<RouteContext<"/api/attempts/[id]/answers/[questionId]">>(
  async (request, context) => {
    const user = await requireUser(request);
    const { id, questionId } = await context.params;
    const { response } = await readJson(request, bodySchema);
    await saveAnswer(user.id, id, questionId, response);
    return noContent();
  },
);
