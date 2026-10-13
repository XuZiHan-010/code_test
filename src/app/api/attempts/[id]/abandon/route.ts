import { abandonAttempt } from "@/server/attempts/service";
import { handle, noContent, requireUser } from "@/server/http/api";

/** 放弃一份进行中的作答，不计入任何统计 */
export const POST = handle<RouteContext<"/api/attempts/[id]/abandon">>(async (request, context) => {
  const user = await requireUser(request);
  const { id } = await context.params;
  await abandonAttempt(user.id, id);
  return noContent();
});
