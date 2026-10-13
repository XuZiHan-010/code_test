import path from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

/** 对给定的数据库执行尚未执行的迁移 */
export async function runMigrations(connectionString: string): Promise<void> {
  const pool = new Pool({ connectionString, max: 1 });
  try {
    await migrate(drizzle(pool), {
      migrationsFolder: path.join(process.cwd(), "src", "server", "db", "migrations"),
    });
  } finally {
    await pool.end();
  }
}
