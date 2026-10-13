import { handle, noContent, requireUser } from "@/server/http/api";
import { addItem, removeItem } from "@/server/notebook/service";

type Context = RouteContext<"/api/notebook/[questionId]">;

/** 加入错题本。重复添加同样返回 204，不产生重复条目 */
export const PUT = handle<Context>(async (request, context) => {
  const user = await requireUser(request);
  const { questionId } = await context.params;
  await addItem(user.id, questionId);
  return noContent();
});

/** 移出错题本。本来就不在其中也返回 204 */
export const DELETE = handle<Context>(async (request, context) => {
  const user = await requireUser(request);
  const { questionId } = await context.params;
  await removeItem(user.id, questionId);
  return noContent();
});
