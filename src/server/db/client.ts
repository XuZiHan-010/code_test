import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getEnv } from "@/env";
import * as schema from "./schema";

export type Db = NodePgDatabase<typeof schema>;
/** 事务内的句柄，和 Db 有相同的查询方法 */
export type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];
export type DbOrTx = Db | Tx;

const globalForDb = globalThis as unknown as { __quizPool?: Pool; __quizDb?: Db };

export function getPool(): Pool {
  if (!globalForDb.__quizPool) {
    globalForDb.__quizPool = new Pool({ connectionString: getEnv().DATABASE_URL, max: 10 });
  }
  return globalForDb.__quizPool;
}

/** 进程内共用的数据库句柄。首次调用时才建立连接池。 */
export function getDb(): Db {
  if (!globalForDb.__quizDb) {
    globalForDb.__quizDb = drizzle(getPool(), { schema });
  }
  return globalForDb.__quizDb;
}

export async function closeDb(): Promise<void> {
  await globalForDb.__quizPool?.end();
  globalForDb.__quizPool = undefined;
  globalForDb.__quizDb = undefined;
}
