import { NextResponse } from "next/server";
import { getAttemptResult } from "@/server/attempts/submit";
import { handle, requireUser } from "@/server/http/api";

/** 已交卷作答的结果。有待评分的题时，页面会轮询这个接口 */
export const GET = handle<RouteContext<"/api/attempts/[id]/result">>(async (request, context) => {
  const user = await requireUser(request);
  const { id } = await context.params;
  return NextResponse.json(await getAttemptResult(user.id, id));
});
