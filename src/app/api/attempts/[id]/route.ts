import { NextResponse } from "next/server";
import { getAttemptForAnswering } from "@/server/attempts/service";
import { handle, requireUser } from "@/server/http/api";

/** 进行中的作答返回不含答案的作答视图；已交卷的只告知状态 */
export const GET = handle<RouteContext<"/api/attempts/[id]">>(async (request, context) => {
  const user = await requireUser(request);
  const { id } = await context.params;
  return NextResponse.json(await getAttemptForAnswering(user.id, id));
});
