# 部署到 Railway

本文是 `specs/001-interview-quiz-system/tasks.md` 中 T093 的操作步骤。2026-10-19 起先以**试运行**方式部署：全部章节仍是 `draft`，生产构建通过 `CONTENT_ALLOW_DRAFTS_IN_PROD=1` 带上 draft 章节。这偏离了宪法原则 III（生成的题目须经人工抽查才能发布），是项目所有者的明确决定；正式上线前必须去掉这个变量，改设 `CONTENT_REQUIRE_ALL=1`。

## 已在仓库里准备好的

- `package.json` 的 `engines.node` 固定为 `24.x`，Railway 的构建器（Railpack）据此选择 Node 版本。
- 构建命令 `npm run build`、启动命令 `npm start` 是 Railpack 的默认识别结果，不需要另设。`npm run build` 会先执行 `content:build` 生成题库。
- 迁移脚本 `npm run db:migrate` 直接读取平台提供的 `DATABASE_URL`。
- 健康检查接口 `/api/health`：题库已加载且数据库可连接才返回 200。
- `tsconfig.json` 排除了 `docs/`（审查用的脚本），避免 `next build` 的类型检查因它们失败。

## 在 Railway 控制台操作

1. **新建项目**：New Project → Deploy from GitHub repo → 选择本仓库（私有仓库需先在 Railway 里授权 GitHub 访问该仓库），分支 `main`。
2. **添加数据库**：在项目画布上 New → Database → PostgreSQL。
3. **应用服务的变量**（服务 → Variables）：

   | 变量 | 值 | 说明 |
   | --- | --- | --- |
   | `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | 引用数据库服务的内网地址；数据库服务名不是 `Postgres` 时按实际名称改 |
   | `GRADER` | `deepseek` | |
   | `DEEPSEEK_API_KEY` | 站点自己的 DeepSeek 密钥 | **必填**。缺少它时环境变量校验失败，健康检查也会失败 |
   | `DEEPSEEK_MODEL` | `deepseek-flash` | 可省略，默认就是这个 |
   | `GRADING_DAILY_CAP` | `5000` | 可省略 |
   | `CONTENT_ALLOW_DRAFTS_IN_PROD` | `1` | 试运行开关。正式上线前删除，改设 `CONTENT_REQUIRE_ALL=1` |

   不要设置 `CONTENT_INCLUDE_DRAFTS`：它只用于本地开发，在生产环境会让构建失败。

4. **服务设置**（服务 → Settings）：
   - Deploy → Pre-deploy Command：`npm run db:migrate`
   - Deploy → Healthcheck Path：`/api/health`
   - Networking → Generate Domain，生成公网域名。
5. 触发部署，在 Build Logs 里确认出现“本次输出 231 章 8100 题”和“CONTENT_ALLOW_DRAFTS_IN_PROD=1……仅供试运行”这两行。

## 部署后验证

- 打开 `https://<域名>/api/health`，应返回 `{"status":"ok"}`。
- 分别用手机和电脑注册账号，按 `quickstart.md` 的场景 1（做一章并交卷）和场景 5 走一遍；简答题交卷后应在一两分钟内由 DeepSeek 评出。

## 注意事项

- 评分执行器跑在应用进程里，按单实例设计；不要把服务的副本数调到 1 以上。
- 改了题库要重新部署才生效（生产环境不会热加载 `bank.json`）。
- 正式上线：所有者抽查并把章节改为 `approved` 后，删除 `CONTENT_ALLOW_DRAFTS_IN_PROD`，加 `CONTENT_REQUIRE_ALL=1`，重新部署。
- Railway 的配置文件 `railway.json`（Config as Code）已被官方弃用（老服务只用到 2026-12-01），所以本项目在控制台里配置，不提交 `railway.json`。
