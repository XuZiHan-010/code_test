import { SESSION_COOKIE } from "@/lib/session-cookie";
import { deleteSession } from "@/server/auth/session";
import { clearSessionCookie, handle, noContent } from "@/server/http/api";

export const POST = handle(async (request) => {
  await deleteSession(request.cookies.get(SESSION_COOKIE)?.value);
  const response = noContent();
  clearSessionCookie(response);
  return response;
});
