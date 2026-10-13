import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getCatalog } from "@/server/content/catalog";
import { getDb } from "@/server/db/client";

/** 供部署平台做健康检查：题库已加载且数据库可连接才算正常。不需要登录。 */
export async function GET() {
  try {
    getCatalog();
    await getDb().execute(sql`select 1`);
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[health] 检查未通过", error);
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}
