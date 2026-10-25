# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目目标

做一个部署在 Railway 上的多用户网页答题系统，题目来自 `interview-practice/` 里的面试题库。每个知识点做成单选、多选或简答题；用户按章作答，交卷后看到正确率和逐题解答；系统记录每章完成情况和每道题的错误次数；用户可以手动维护一个错题本并拿它练习。

1.0 的范围是做题模式；对战模式（多人在线）是后续版本，1.0 只留入口。

已确认的决定：

- 题库内容可以随网站公开发布（来源是开源内容），每道题的解答要保留原文链接作为出处。
- 1.0 的题目只有现有的本地题库（小林coding，外加 2026-10-15 按用户要求收录的 FastAPI 官方文档专题；2026-10-16 收录的 RPA 开发专题已于 2026-10-25 按用户要求连同复习手册一起移除，题号 Z* 已退役），所有用户共用。
- 简答题由大模型自动评分，用 DeepSeek 的 API，1.0 用站点自己的 Key。
- 后续方向（1.0 一概不做，也不预留结构）：多人在线对战模式；用户专属题库——用户在网页上传 PDF 或提供链接，用自己填写的 API Key 调用大模型，生成只属于自己的题库。

尚未经用户确认、按默认值设计的事项：账号形式（用户名加密码、任何人可自行注册）。

## 当前状态

五个用户故事的功能都已实现并有测试，填空题也已接入。题型数据覆盖 25 个专题、225 章、8021 题，所有章节均为 `draft`，尚未部署；25 个专题都已逐题选定题型（合计单选 4658、多选 610、填空 825、简答 1907、代码 21；每题按内容选最合适的一种，不要求每章或每个专题五种都有），但还没有任何一章经过项目所有者抽查。2026-10-14 新增的 Python 专题（前缀 Q，12 章 631 题）和数据结构与算法专题（前缀 R，3 章 432 题，含 17 道代码题），以及同日新增、归入“数据库”栏目的 MySQL 专题（前缀 S，8 章 669 题，含 4 道 SQL 代码题），还有 2026-10-15 新增、归入“计算机基础”栏目的计算机网络专题（前缀 T，6 章 656 题），以及同日新增、归入“Python 面试题”栏目的 FastAPI 专题（前缀 U，9 章 274 题）和归入“计算机基础”栏目的操作系统专题（前缀 V，7 章 716 题），以及同日新增、归入“工具使用”栏目的 Linux 命令专题（前缀 W，4 章 150 题）和 Git 专题（前缀 X，4 章 252 题），以及 2026-10-16 新增、同属“工具使用”栏目的 Docker 专题（前缀 Y，4 章 252 题）以及 2026-10-19 新增、和 MySQL 同属“数据库”栏目的 Redis 专题（前缀 O，7 章 774 题）在 `spec.md`、`plan.md`、`tasks.md` 的数字里还没有反映。剩余工作包括全部 225 章的人工抽查、端到端测试、评分一致性评测、上线前检查和部署，见 `specs/001-interview-quiz-system/tasks.md`。

需求走 Spec Kit 流程（已 `specify init`，脚本用 PowerShell），文档都在 `specs/001-interview-quiz-system/`：

- `spec.md`：1.0 的需求规格，需求以它为准。
- `plan.md`：实现计划，含模块职责和实施顺序。动手前先读它，再按需读 `research.md`（技术决策及理由）、`data-model.md`、`contracts/`（HTTP 接口、题目内容格式与校验规则、判分）、`quickstart.md`（验证场景）。
- `.specify/memory/constitution.md`：六条项目原则，效力高于其他文档。

`docs/prd.md` 是较早的 PRD 草稿，已被上面的文档取代，仅作历史参考。

2026-10-15 网络专题按审查报告修订 39 题，656 题题号、题序和题型数量不变，6 章仍为 `draft`；详情见 [修复清单](docs/network-review-2026-10-15/fixes/fix-summary.md) 和 [审查报告](docs/network-review-2026-10-15.md)。同日 FastAPI 专题按审查报告修订 23 题，274 题题号、题序、正确选项和题型数量不变，9 章仍为 `draft`；详情见 [FastAPI 修复清单](docs/fastapi-review-2026-10-15/fixes/fix-summary.md) 和 [审查报告](docs/fastapi-review-2026-10-15.md)。

同日 Git 专题按审查报告修订 73 个题号，涵盖 18 道主体题、同源条件及解析修订和 24 道多选选项重排；原文技术简化已注明原说法并附官方核对链接。252 题的题号、题序、题型、单选正确字母和填空配置不变，多选正确字母随选项换序调整，4 章仍为 `draft`。详情见 [Git 修复清单](docs/git-review-2026-10-15/fixes/fix-summary.md) 和 [审查报告](docs/git-review-2026-10-15.md)。

## 技术栈与结构

- 一个 Next.js 16 全栈应用（App Router，TypeScript，Node.js 24），包管理用 npm；界面用 Tailwind CSS 4。
- PostgreSQL 加 Drizzle ORM；数据库只存用户数据，通过题号引用题目。
- 测试用 Vitest；涉及数据库的测试连本地 Docker 里的真实 PostgreSQL，不用模拟。

业务规则都在 `src/server/`，页面和接口路由只做校验、调用和渲染：

- `content/`：解析 Markdown 题库（`parser`）、校验规则 V1–V17（`validator`）、合并（`build`）、运行时的只读题库（`catalog`）。题目对外只有两种形态：`getForAnswering`（交卷前，不含答案）和 `getWithAnswer`。**交卷前发给浏览器的数据只能来自前者**，`tests/integration/api-attempts.test.ts` 里有契约测试守着这一条。
- `attempts/`：开始、保存、交卷、结果（`service`、`submit`），以及由作答记录推导的章节状态和成绩（`progress`）。
- `grading/`：选择题判分；简答题评分器接口和两个实现（DeepSeek、假评分器）；评分执行器 `runner`。交卷时简答题先记为“待评分”，由执行器在后台评出，失败按退避间隔重试。
- `mistakes/`、`notebook/`：错误次数统计与错题本。两者独立：前者是系统统计，后者由用户手动增删。
- `auth/`：用户名加密码（argon2id）和服务端会话。`http/api.ts` 的 `handle` 给所有接口加上来源校验和统一的错误格式。

题目内容不进数据库。`npm run content:build` 把 `interview-practice/` 的 Markdown 和 `content/typed/` 的题型数据合并、校验，生成 `content/dist/bank.json`（不提交），应用启动时读入内存；`content/guides/*.md` 是站内复习资料，也一并写进 `bank.json`，在 `/guides/<slug>` 页面显示，不受章节状态限制，题目可以用 `/guides/<slug>#锚点` 作为引用（V17 校验 slug 和锚点存在），`topics.json` 的 `guide` 字段让专题页显示“复习资料”入口；`npm run dev` 运行期间重新构建题库会自动重新加载，生产环境要重启才生效。只有状态为 `approved` 的章节会进入；**章节状态只能由项目所有者在人工抽查后改为 `approved`**。给新章节出题用 `.claude/skills/generate-questions/`。

页面在 `src/app/(app)/`（需要登录，带导航）和 `src/app/(auth)/`（登录、注册）。项目开启了 Next.js 的 Cache Components：读取会话的服务端组件必须放在 `<Suspense>` 里，每个页面都是“页面组件包一层 Suspense，里面的异步组件先调用 `requireUserOrRedirect()`”这个写法。Next.js 16 与旧版本差别较大，动框架相关的代码前先查 `node_modules/next/dist/docs/`（见 `AGENTS.md`）。

界面的视觉约定定义在 `src/app/globals.css`，新页面沿用它们：深色的“记分牌”风格，黄色（`accent`）是主色，红色（`pen`）表示错误，绿色（`pass`）表示正确；面板用 `.sheet`，可点击的面板加 `.lift`，按钮用 `.btn`，大数字用 `.display`，英文小标签用 `.eyebrow`，题号用 `.stamp`。颜色变量的名字是角色而不是颜色（`paper` 是页面底色，`card` 是面板，`ink` 是文字）。

## 命令

```powershell
docker compose up -d db          # 启动本地 PostgreSQL（端口 54329，含 quiz_dev 和 quiz_test 两个库）
Copy-Item .env.example .env      # 首次运行；默认 GRADER=fake，不需要 DeepSeek 密钥
npm run db:migrate               # 对 .env 里的库执行迁移
npm run content:build            # 解析题库、合并、校验，生成 bank.json
npm run content:validate         # 只校验内容，不写文件
npm run content:check-links      # 联网检查题库里的原文链接和小节锚点是否还有效
npm run dev                      # 本地运行，http://localhost:3000
npm run typecheck                # 先生成 Next.js 的路由类型，再跑 tsc
npm run lint
npm test                         # 单元测试加集成测试（集成测试需要本地 PostgreSQL 在运行）
npm run test:unit                # 只跑单元测试，不需要数据库
npx vitest run tests/integration/attempts.test.ts -t "<用例名>"   # 跑单个测试
npm run db:generate              # 改了 src/server/db/schema.ts 之后生成迁移文件
npm run build; npm start         # 生产构建与启动
```

`npm run build` 会先执行 `content:build`。试点专题还是 `draft`，所以现在直接构建出来的题库是空的；本地要看到题目，先设 `$env:CONTENT_INCLUDE_DRAFTS = "1"` 再运行 `content:build` 或 `build`。这个变量只供本地开发，正式上线的构建要设 `CONTENT_REQUIRE_ALL=1`。2026-10-19 项目所有者决定在抽查完成前先在 Railway 上试运行：生产构建改用 `CONTENT_ALLOW_DRAFTS_IN_PROD=1` 带上 draft 章节（不能和 `CONTENT_REQUIRE_ALL` 同时设置），正式上线前必须去掉；部署步骤见 `docs/deploy-railway.md`。

源站对不存在的地址也返回 200 并显示首页，所以原文链接是否失效不能只看状态码；`content:check-links` 用页面标题来识别。更新题库或上线前跑一次。

假评分器按答案开头决定结果：`【对】` 判对，`【错】` 判错，`【失败】` 模拟评分服务出错，其余判错。代码题的标记可以放在开头的注释行里（`# 【对】`、`// 【对】`、`-- 【对】`），假评分器会先去掉开头的注释符号再判断。
填空题在第一空开头使用同样的标记。假评分器只供开发测试，语义判分须配置 `GRADER=deepseek`。

`npm run e2e`（Playwright）和 `npm run eval:grading` 的脚本还没写。

## 题库 `interview-practice/`

25 个专题、225 个题组、8021 题。一篇原文一个题组；例外是 Python 专题（原文是一整页面试题，按页面的 12 个大节分成 12 个题组）和数据结构与算法专题（前缀 R，原文是 `data.html` 一页，按 3 个大节分成 3 个题组，出自“计算机基础”栏目）和 MySQL 专题（前缀 S，原文是 `mysql.html` 一页，按 8 个大节分成 8 个题组，放在“数据库”栏目）和 Redis 专题（前缀 O，原文是 `redis.html` 一页，按 7 个大节分成 7 个题组，和 MySQL 同属“数据库”栏目；A–Z 里只剩 O 未用，所以用 O）和计算机网络专题（前缀 T，原文是 `network.html` 一页，按 6 个大节分成 6 个题组，和数据结构与算法同属“计算机基础”栏目）和 FastAPI 专题（前缀 U，第一个不出自小林coding 的专题：原文是 FastAPI 官方中文文档 `https://fastapi.tiangolo.com/zh/learn/`，只挑面试常考的页面，按主题归成 9 个题组，题型只用单选、多选、填空、简答，和 Python 同属“Python 面试题”栏目）和操作系统专题（前缀 V，原文是 `os.html` 一页，按 7 个大节分成 7 个题组，同属“计算机基础”栏目）和 Linux 命令专题（前缀 W，原文是 `linux.html` 一页，页面只有一个大节、21 道原题，按主题归成 4 个题组，放在“工具使用”栏目，题型只用单选、多选、填空、简答）和 Git 专题（前缀 X，原文是 `git.html` 一页，只有一个大节、23 道原题，按主题归成 4 个题组，和 Linux 命令同属“工具使用”栏目，题型同样只用单选、多选、填空、简答）和 Docker 专题（前缀 Y，原文是 `docker.html` 一页，只有一个大节、22 道原题，按主题归成 4 个题组，和 Linux 命令、Git 同属“工具使用”栏目，题型同样只用单选、多选、填空、简答）。`README.md` 是索引，列出每个专题的文件名、题号前缀、篇数和题数。

Markdown 题卷目前有 825 道填空题，其他题干都是简答问法；单选、多选和代码题的题干、选项只存在于 `content/typed/`，题卷里看不到。填空题用 `[填空题·有序]` 或 `[填空题·无序]` 标记，每个 `____` 表示一个空。题型数据已覆盖全部 26 个专题，章节均为 `draft`，人工抽查仍待完成。最早人工选定的 57 道填空题见 `interview-practice/fill-audit-2026-10-13.md`，之后用 `generate-questions` 出了 177 道，2026-10-14 补题时又新增 12 道，同日复核时 D8-12 改为填空，新增的 Python 专题出了 30 道，数据结构与算法专题出了 67 道，MySQL 专题出了 120 道，2026-10-15 新增的计算机网络专题出了 101 道，同日新增的 FastAPI 专题出了 29 道，同日新增的操作系统专题出了 63 道，同日新增的 Linux 命令专题出了 22 道，同日新增的 Git 专题出了 28 道，2026-10-16 新增的 Docker 专题出了 28 道，2026-10-19 新增的 Redis 专题出了 90 道。

填空题使用 `type: "fill"`、`blankCount`、`blankOrder`，题干必填且空数匹配；答案是 `{ blanks: string[] }`，长度须等于空数，合计不超过 2000 字。DeepSeek 按语义而非精确字符串匹配评分：无序题顺序不限，有序题按位置判断；全部空覆盖所问考点才算整题正确。沿用现有后台评分、失败重试和错题统计。

代码题使用 `type: "code"`：答案是 `{ text }`（与简答题同形），上限 8000 字（简答题仍是 2000 字），由 DeepSeek 按算法逻辑判卷，不运行代码；DeepSeek 单次请求超时 30 秒（所有题型）。代码题的题干在 `content/typed/` 里，题干不指定语言；参考答案在答案文件里写成“思路 + 参考实现 + 要点”的多行格式（见 `contracts/content-format.md`）。数据结构与算法专题（R）共 17 道代码题：原文的代码是 Java，参考答案改写为 Python（代码题的 Python 参考实现必须真正运行验证后再写入）。MySQL 专题（S）共 4 道代码题（S1-104、S1-107、S1-110、S4-80），参考实现保留原文的 SQL（` ```sql ` 围栏），写入前已用 SQLite 实际运行验证。

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

- 只按小林原文出题（FastAPI 专题按 FastAPI 官方文档）：每道题都能用所在题组那篇文章回答，原文没讲的不出题。
- 答案只转述所引小节的内容，并附该小节链接，不用其他来源补充。唯一的例外是原文自身有误或前后矛盾：这时答案写核实后的说法，用括号注明原文是怎么写的，并在引用里加一条以“核对来源：”开头的官方资料链接。2026-10-14 已这样处理 19 处，MySQL 专题审查后又处理 7 题，网络专题本轮另处理 5 题（T2-150、T2-289、T3-194、T5-56、T5-57），FastAPI 专题处理 13 题，均记录在 `README.md`、[网络修复清单](docs/network-review-2026-10-15/fixes/fix-summary.md) 和 [FastAPI 修复清单](docs/fastapi-review-2026-10-15/fixes/fix-summary.md)。
- 题组之间不做跨卷去重，同一机制在不同文章里出现就各出各的。
- 题号、题序保持稳定；答题记录和错题都会依赖题号。要删题就退役：从题卷、答案和题型数据里删掉，题号记入 `content/retired-ids.json`，不再复用（目前有 C8-11、A1-15，以及 2026-10-25 移除的 RPA 开发专题全部 79 个 Z 题号）。

除上面说的核对修订外，答案是对原文的转述，不是对原文说法的独立核实。原文里的经验数字、产品命令、阈值、模型结论都以写作时为准，界面上不要把它们呈现成现行官方规格。

### 读取注意

文件是 UTF-8 中文。在 Windows PowerShell 5.1 里读要显式加 `-Encoding UTF8`，否则中文会乱码。答案文件单个最大约 290 KB（`answers-xiaolin/agent.md`），按题号或题组定位后分段读，不要整份读入。

2026-10-19 按 Redis 审查报告修订 42 个题号，修复题意歧义、条件遗漏、解析位置及原文技术简化；19 道两项正确的多选候选逐题复核，10 道改为单选、6 道改为简答、3 道保留多选。Redis 共 774 题，题号、题序及 7 章 `draft` 不变，当前单选 528、多选 74、填空 90、简答 82。原文问题保留原说法并附官方核对来源；逐题内容与验证见[修复清单](docs/redis-review-2026-10-19/fixes/fix-summary.md)。
