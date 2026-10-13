/**
 * 执行数据库迁移：npm run db:migrate
 * 本地从 .env 读取 DATABASE_URL；在 Railway 上作为预部署命令运行，变量由平台提供。
 */
import { existsSync } from "node:fs";
import { runMigrations } from "../src/server/db/migrate";

if (existsSync(".env")) process.loadEnvFile(".env");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("必须设置 DATABASE_URL");
  process.exit(1);
}

runMigrations(url)
  .then(() => console.log("数据库迁移完成"))
  .catch((error) => {
    console.error("数据库迁移失败：", error);
    process.exit(1);
  });
