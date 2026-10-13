import { defineConfig } from "drizzle-kit";

// 只用于根据表结构生成迁移文件（npm run db:generate），不需要连接数据库。
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
});
