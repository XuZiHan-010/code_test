# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目目标

做一个部署在 Railway 上的多用户网页答题系统，题目来自 `interview-practice/` 里的面试题库。每个知识点做成单选、多选或简答题；用户按章作答，交卷后看到正确率和逐题解答；系统记录每章完成情况和每道题的错误次数；用户可以手动维护一个错题本并拿它练习。

1.0 的范围是做题模式；对战模式（多人在线）是后续版本，1.0 只留入口。

已确认的决定：

- 题库内容可以随网站公开发布（来源是开源内容），每道题的解答要保留原文链接作为出处。
- 1.0 的题目只有现有的本地题库（小林coding），所有用户共用。
- 简答题由大模型自动评分，用 DeepSeek 的 API，1.0 用站点自己的 Key。
- 后续方向（1.0 一概不做，也不预留结构）：多人在线对战模式；用户专属题库——用户在网页上传 PDF 或提供链接，用自己填写的 API Key 调用大模型，生成只属于自己的题库。

尚未经用户确认、按默认值设计的事项：账号形式（用户名加密码、任何人可自行注册）。

## 当前状态

仓库里只有题库、需求和设计文档，还没有应用代码，也不是 git 仓库。

需求走 Spec Kit 流程（已 `specify init`，脚本用 PowerShell），文档都在 `specs/001-interview-quiz-system/`：

- `spec.md`：1.0 的需求规格，需求以它为准。
- `plan.md`：实现计划，含模块职责和实施顺序。动手前先读它，再按需读 `research.md`（技术决策及理由）、`data-model.md`、`contracts/`（HTTP 接口、题目内容格式与校验规则、判分）、`quickstart.md`（验证场景）。
- `.specify/memory/constitution.md`：六条项目原则，效力高于其他文档。

`docs/prd.md` 是较早的 PRD 草稿，已被上面的文档取代，仅作历史参考。

## 技术栈（已在计划中确定）

- 一个 Next.js 全栈应用（App Router，TypeScript，Node.js 24），包管理用 npm；界面用 Tailwind CSS。
- PostgreSQL 加 Drizzle ORM；数据库只存用户数据，通过题号引用题目。
- 题目内容不进数据库：构建脚本把 `interview-practice/` 的 Markdown 和 `content/typed/` 的题型数据合并、校验，生成 `content/dist/bank.json`，应用启动时读入内存。校验失败则构建失败。
- 简答题评分调用 DeepSeek 接口（OpenAI 兼容格式）；开发和测试用假评分器（`GRADER=fake`）。
- 测试用 Vitest；涉及数据库的测试连本地 Docker 里的真实 PostgreSQL，不用模拟。
- 业务规则放在 `src/server/`，页面和接口路由只做校验、调用和渲染。

## 命令

以下是计划中的命令，脚手架还没搭。搭好后逐条核对并更新本节。

```powershell
docker compose up -d db          # 启动本地 PostgreSQL
npm run db:migrate               # 执行数据库迁移
npm run content:build            # 解析题库、合并、校验，生成 bank.json
npm run content:validate         # 只校验内容
npm run dev                      # 本地运行
npm run typecheck; npm run lint
npm test                         # 单元测试加集成测试
npx vitest run <文件路径> -t "<用例名>"   # 跑单个测试
npm run e2e                      # 端到端冒烟流程
```

## 题库 `interview-practice/`

15 个专题、151 个题组（一篇原文一个题组）、2884 题。`README.md` 是索引，列出每个专题的文件名、题号前缀、篇数和题数。

**全部是简答题。** 题库里没有单选题、多选题，也没有选项或干扰项；这两种题型需要另外生成。

题卷和答案分两处，靠题号对应：

- `interview-practice/<专题>.md`：只有题干
- `interview-practice/answers-xiaolin/<专题>.md`：同名文件，只有答案，不重复题干

两边的题号和题序完全一致（已逐文件校验）。

### 文件格式

- `## N. 标题`：一个题组。答案文件里每个题组下有一行 `原文：[文章标题](url)。`；题卷里只有 Claude Code、Codex、图解 Agent 这几卷带这一行，大模型六卷没有。
- `### 小标题`：题组内的分节，不是独立章节。`### 补充考点` 最常见，部分专题还有按主题命名的小标题，也有题组完全没有 `###`。
- 题目行：`- **B1-1** 题干`
- 答案行：`- **B1-1** 答案正文。[原文§小节标题](url#锚点)`。行尾至少一条引用，少数题有多条；C5-2 另有“对照原文”引用。

题号是“前缀字母 + 题组号 - 组内序号”，例如 `B1-1` 是 RAG 卷第 1 题组第 1 题。前缀全局唯一对应一个专题，题号全局唯一，适合直接当主键。

其余三个文件不是题卷：`README.md`（索引与出题规则）、`audit-2026-10-13.md`（核查记录）、`agent-illustrated-coverage.md`（已过期的历史记录，不要据此取舍题目）。

### 改动题库时要守的规则

来自 `README.md` 的出题规则，新增或改写题目（包括生成选择题）时同样适用：

- 只按小林原文出题：每道题都能用所在题组那篇文章回答，原文没讲的不出题。
- 答案只转述所引小节的内容，并附该小节链接，不用其他来源补充。
- 题组之间不做跨卷去重，同一机制在不同文章里出现就各出各的。
- 题号、题序保持稳定；答题记录和错题都会依赖题号。

答案是对原文的转述，不是对原文说法的独立核实。原文里的经验数字、产品命令、阈值、模型结论都以写作时为准，界面上不要把它们呈现成现行官方规格。

### 读取注意

文件是 UTF-8 中文。在 Windows PowerShell 5.1 里读要显式加 `-Encoding UTF8`，否则中文会乱码。答案文件单个最大约 290 KB（`answers-xiaolin/agent.md`），按题号或题组定位后分段读，不要整份读入。
