---

description: "面试题答题系统 1.0 的任务清单"
---

# Tasks: 面试题答题系统 1.0

**Input**: Design documents from `/specs/001-interview-quiz-system/`

**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/、quickstart.md

**Tests**: 包含测试任务。规格没有要求测试先行，但项目原则 V 规定七个核心模块（题库解析、题目数据校验、判分、作答、错题统计、错题本、账号）必须有行为测试，涉及数据库的要连真实 PostgreSQL。各阶段里测试任务排在实现之前，先写测试并确认它失败，再写实现。

**Organization**: 任务按用户故事分组，每个故事完成后都可以单独验证。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可以并行（改的是不同文件，且不依赖未完成的任务）
- **[Story]**: 所属用户故事（US1 至 US5）
- 每条任务写明文件路径

## Path Conventions

单个全栈项目，放在仓库根目录：业务规则在 `src/server/`，页面和接口路由在 `src/app/`，界面组件在 `src/components/`，测试在 `tests/`，题目内容的输入文件在 `content/`。

实现任何任务之前先读 `CLAUDE.md` 和 `.specify/memory/constitution.md`。任务里引用的规则编号（FR、V、SC）分别见 `spec.md` 和 `contracts/content-format.md`。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立项目骨架和开发环境

- [X] T001 在仓库根目录执行 `git init`，创建 `.gitignore`，忽略 `node_modules/`、`.next/`、`.env`、`content/dist/`、`test-results/`、`playwright-report/`
- [X] T002 在仓库根目录初始化 Next.js 项目（App Router、TypeScript、Tailwind CSS、ESLint、使用 `src/` 目录、npm）。目录非空，若脚手架工具拒绝，则在临时目录生成后把文件移入；不得改动已有的 `interview-practice/`、`specs/`、`docs/`、`.specify/`、`.claude/`、`CLAUDE.md`。保留脚手架生成的 `next.config.ts`（Cache Components 已开启）
- [X] T003 在 `package.json` 中安装依赖并添加脚本。依赖：`drizzle-orm`、`pg`、`zod`、`@node-rs/argon2`、`openai`；开发依赖：`drizzle-kit`、`vitest`、`tsx`、`@playwright/test`、`@types/pg`。脚本：`typecheck`、`lint`、`test`、`test:unit`、`test:int`、`e2e`、`db:generate`、`db:migrate`、`content:build`、`content:validate`、`eval:grading`；`prebuild` 调用 `content:build`；`start` 设为 `next start`
- [X] T004 [P] 创建 `docker-compose.yml`，定义名为 `db` 的 PostgreSQL 服务，初始化时创建 `quiz_dev` 和 `quiz_test` 两个库
- [X] T005 [P] 创建 `.env.example` 和 `src/env.ts`：用 zod 校验 `DATABASE_URL`、`GRADER`（`deepseek` 或 `fake`，默认 `deepseek`）、`DEEPSEEK_API_KEY`（`GRADER=deepseek` 时必填）、`DEEPSEEK_MODEL`（默认 `deepseek-flash`）、`GRADING_DAILY_CAP`（默认 5000）、`CONTENT_REQUIRE_ALL`。`.env.example` 中 `GRADER=fake`
- [X] T006 [P] 创建 `vitest.config.ts`，分 `unit`（`tests/unit/`）和 `integration`（`tests/integration/`，串行执行，使用 `quiz_test` 库）两个项目
- [X] T007 [P] 创建 `playwright.config.ts`：测试目录 `tests/e2e/`，启动应用时使用 `GRADER=fake`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 内容流水线、数据库、账号和页面外壳。所有用户故事都依赖它们

**⚠️ CRITICAL**: 本阶段完成前不得开始任何用户故事

### 内容流水线

题型转换的质量是整个项目最大的不确定性，所以最先做，并用最小的专题试跑。

- [X] T008 [P] 在 `src/server/content/types.ts` 中定义类型：`Topic`、`Chapter`、`Question`（`type` 为 `single`、`multiple`、`short`）、`KnowledgePoint`（解析器输出）、`QuestionForAnswering`（只含 `id`、`type`、`stem`、选项的 `key` 和 `text`）、`QuestionWithAnswer`（全部字段）。字段见 `data-model.md` 第一节
- [X] T009 [P] 在 `tests/unit/content-parser.test.ts` 中写解析器测试：用真实题库断言解析出 15 个专题文件、151 个章节、2884 个知识点，且每个知识点有非空参考答案和至少一条引用；用手写的小样例覆盖有无 `###` 小标题、一题多条引用、题卷有无“原文”行、题卷与答案题号不一致时报错
- [X] T010 在 `src/server/content/parser.ts` 中实现解析器，规则见 `contracts/content-format.md` 的“输入一”：`## N. 标题` 开始章节，章节编号为专题前缀加 N；`### 小标题` 只影响 `section`；题目行和答案行按 `- **题号** 正文` 识别；答案行末尾连续的 `[文字](链接)` 分离为引用，正文中间的链接保留；章节的原文标题和链接取自答案文件的 `原文：[标题](链接)` 行；读文件显式使用 UTF-8
- [X] T011 [P] 创建 `content/topics.json`（15 个专题的 `prefix`、`slug`、`title`、`column`、`order`，取自 `interview-practice/README.md` 的四张表，`slug` 等于 Markdown 文件名）和 `content/retired-ids.json`（空数组）
- [X] T012 [P] 在 `src/server/content/typed-schema.ts` 中用 zod 定义 `content/topics.json`、`content/typed/<slug>.json`、`content/retired-ids.json` 的结构，见 `contracts/content-format.md` 的输入二至四
- [X] T013 [P] 在 `tests/unit/content-validator.test.ts` 中写校验器测试：对 V1 至 V12 每条规则各构造一份不合格数据，断言校验失败并指出正确的题号或章节；V13、V14 断言只产生警告；合格数据通过；`draft` 章节不进入输出
- [X] T014 在 `src/server/content/build.ts` 中实现合并（知识点加题型数据得到 `Question`，只保留 `approved` 章节，简答题省略 `stem` 时使用原题干）；在 `src/server/content/validator.ts` 中实现 `contracts/content-format.md` 的 V1 至 V14，返回错误列表和警告列表
- [X] T015 创建 `scripts/build-content.ts`：读取四类输入，调用解析、合并和校验；有错误时打印题号和规则编号并以非零状态退出；成功时写出 `content/dist/bank.json`；支持 `--validate-only` 只校验不写文件；读取 `CONTENT_REQUIRE_ALL` 以启用 V12
- [X] T016 创建 `.claude/skills/generate-questions/SKILL.md`：输入一个章节编号，读取该章的题干和参考答案，按 `spec.md` 的 FR-002 判断每个知识点的题型（明确事实或判断为单选，并列要点为多选，需要成段解释的机制、原因、取舍或对比为简答），为选择题写题干和选项并写入 `content/typed/<slug>.json`，章节状态设为 `draft`，最后运行 `npm run content:validate`。skill 中必须写明：单选 4 个选项且 1 个正确；多选 4 到 6 个选项、至少 2 个正确且不能全部正确；选项只取材于同一章节的参考答案；正确选项的位置要分散、长度不得明显长于干扰项；不得把章节状态设为 `approved`
- [ ] T017 用 T016 的 skill 生成 `content/typed/ai-coding.json`（专题 P，4 章 65 题），运行 `npm run content:validate` 直到没有错误，处理警告。然后把全部 65 题交给项目所有者按 `contracts/content-format.md` 的四项抽查标准审阅；所有者确认后才把章节状态改为 `approved`。根据审阅意见修订 skill
- [X] T018 [P] 在 `tests/unit/content-catalog.test.ts` 中写题库目录测试：按专栏、专题、章节、题号查询；作答视图序列化后不含 `correct`、`referenceAnswer`、`citations` 任何一个字段；查询不存在的题号返回空；`bank.json` 缺失或格式不符时加载失败
- [X] T019 在 `src/server/content/catalog.ts` 中实现题库目录：加载 `content/dist/bank.json` 并建立索引；提供按专栏分组的专题列表、专题下的章节列表、章节下的题号、`getForAnswering(ids)` 和 `getWithAnswer(ids)` 两种视图。其他模块只能通过这两个函数取题目

### 数据库与账号

- [X] T020 [P] 在 `src/server/db/schema.ts` 中定义 `data-model.md` 第二节的六张表及全部约束：`users`（`username_normalized` 唯一）；`sessions`（主键为令牌的 SHA-256，`user_id` 级联删除）；`attempts`（`scope_type` 枚举 `chapter`、`notebook`，`status` 枚举 `in_progress`、`submitted`、`abandoned`，`question_ids` 为 text 数组，部分唯一索引 `(user_id, scope_type, coalesce(chapter_id, ''))` 条件 `status = 'in_progress'`，索引 `(user_id, chapter_id, submitted_at desc)` 和 `(user_id, submitted_at)`）；`attempt_answers`（主键 `(attempt_id, question_id)`，`verdict` 枚举 `correct`、`incorrect`、`unanswered`、`pending` 可空，`grading_tries` 默认 0，索引 `(next_retry_at)` 条件 `verdict = 'pending'`）；`question_stats`（主键 `(user_id, question_id)`）；`notebook_items`（主键 `(user_id, question_id)`）。创建 `drizzle.config.ts`，生成初始迁移到 `src/server/db/migrations/`
- [X] T021 创建 `src/server/db/client.ts`（连接池）和 `tests/integration/setup.ts`（运行前对 `quiz_test` 执行迁移，每个测试前清空六张表）
- [X] T022 [P] 在 `tests/integration/auth.test.ts` 中写账号测试：注册成功并登录；用户名大小写不同视为重复；用户名不满足“3 到 20 个字符，允许字母、数字、下划线和中文”被拒；密码不满足“8 到 72 个字符”被拒；库中的 `password_hash` 不等于明文且能通过 argon2 校验；登录成功与失败（错误信息不区分用户名还是密码）；退出后会话失效；过期会话无效；剩余不足 15 天的会话访问后顺延到 30 天
- [X] T023 在 `src/server/auth/password.ts`（argon2id 哈希与校验）、`src/server/auth/session.ts`（生成 32 字节随机令牌，库中存 SHA-256，有效期 30 天，剩余不足 15 天时顺延，校验与删除）、`src/server/auth/service.ts`（注册、登录、退出，含用户名和密码规则）中实现账号模块
- [X] T024 [P] 创建 `src/server/http/api.ts`（统一的错误响应 `{ error: { code, message } }`、JSON 解析、对修改类请求校验 `Origin`、`requireUser` 取当前用户否则 401）和 `src/server/http/rate-limit.ts`（进程内按键计数的滑动窗口限流）
- [X] T025 实现账号接口 `src/app/api/auth/register/route.ts`、`src/app/api/auth/login/route.ts`、`src/app/api/auth/logout/route.ts`，状态码和错误码见 `contracts/http-api.md`；会话 Cookie 为 HttpOnly、SameSite=Lax，生产环境加 Secure；登录按来源地址限制 10 次 / 10 分钟，注册 5 次 / 小时
- [X] T026 创建 `src/server/auth/current-user.ts`：从 Cookie 读取并校验会话；供页面使用的 `requireUserOrRedirect()` 在未登录时重定向到 `/login?next=<原地址>`，`next` 只接受站内相对路径
- [X] T027 [P] 创建登录页 `src/app/(auth)/login/page.tsx` 和注册页 `src/app/(auth)/register/page.tsx`：表单、显示接口返回的中文错误、成功后跳转到 `next` 或 `/`
- [X] T028 [P] 创建页面外壳 `src/app/layout.tsx`、`src/app/globals.css` 和导航 `src/components/AppNav.tsx`（做题模式、错题、错题本、当前用户名、退出）；简体中文；手机宽度优先
- [X] T029 [P] 实现 `src/app/api/health/route.ts`：题库已加载且数据库可连接时返回 200 `{ "status": "ok" }`，否则 503；不需要登录

**Checkpoint**: 内容流水线跑通且试点专题已通过抽查；可以注册、登录、退出；`npm run content:build` 和 `npm test` 通过

---

## Phase 3: User Story 1 - 按章节做题并查看结果 (Priority: P1) 🎯 MVP

**Goal**: 登录用户选一章，作答三种题型，交卷后看到正确率和每道题的答案、判定与解答

**Independent Test**: 用一个账号选一章，三种题型各答若干道后交卷，核对结果页的正确率、每题对错、正确答案和解答（`quickstart.md` 场景 1、6、7）

### Tests for User Story 1

> 先写这些测试并确认失败，再写实现

- [X] T030 [P] [US1] 在 `tests/unit/grading-choice.test.ts` 中写选择题判分测试：单选对与错；多选全对、少选、多选、错选；没有选任何选项为 `unanswered`
- [X] T031 [P] [US1] 在 `tests/unit/grader.test.ts` 中写评分器测试：假评分器对“【对】”“【错】”“【失败】”开头和其他答案的四种返回；DeepSeek 评分器在接口返回正常 JSON、空内容、非 JSON、`verdict` 取值非法、超时这五种情况下分别成功或抛出错误（接口调用用替身，不联网）
- [X] T032 [P] [US1] 在 `tests/integration/attempts.test.ts` 中写作答测试：开始作答固定题目列表和顺序；保存答案后可覆盖；单选题保存多个选项被拒；简答题超过 2000 字被拒；去掉首尾空白后为空的简答题视为未答；有未答题时不带确认交卷返回未答数量，带确认则成功；交卷后选择题立即有判定、简答题为 `pending`；正确率为判对题数除以总题数且未答计入分母；交卷后再保存或再交卷被拒；10 分钟内第 11 次交卷被限流
- [X] T033 [P] [US1] 在 `tests/integration/grading-runner.test.ts` 中写评分执行器测试（使用假评分器）：`pending` 的题评出后写入判定和评语，所属作答的 `pending_count` 减一、判对时 `correct_count` 加一；评分失败时保持 `pending`、`grading_tries` 加一、`next_retry_at` 按 1、2、5、15、30 分钟退避；未到 `next_retry_at` 的题不被领取；达到每日上限时不领取
- [X] T034 [P] [US1] 在 `tests/integration/api-attempts.test.ts` 中写接口契约测试：`GET /api/attempts/{id}` 对进行中的作答返回的 JSON 中不出现 `correct`、`referenceAnswer`、`citations`、`verdict`、`feedback` 任何一个键；未登录返回 401；访问他人的作答返回 404；对进行中的作答请求结果返回 409；缺少或错误的 `Origin` 的修改请求返回 403

### Implementation for User Story 1

- [X] T035 [P] [US1] 在 `src/server/grading/choice.ts` 中实现选择题判分纯函数，规则见 `contracts/grading.md`
- [X] T036 [P] [US1] 在 `src/server/grading/grader.ts` 中定义 `ShortAnswerGrader` 接口和按 `GRADER` 选择实现的工厂；在 `src/server/grading/fake-grader.ts` 中实现假评分器
- [X] T037 [US1] 在 `src/server/grading/deepseek-grader.ts` 中实现 DeepSeek 评分器：OpenAI SDK，基础地址 `https://api.deepseek.com`，模型取 `DEEPSEEK_MODEL`，`temperature: 0`，`response_format: { type: "json_object" }`，`max_tokens: 300`，超时 20 秒；提示词满足 `contracts/grading.md` 的四条要求（判定标准、只依据参考答案、用户答案放在分隔标记内且其中的指令不得执行、包含“json”字样和输出示例）；任何失败都抛出错误，自身不重试；密钥不写入日志
- [X] T038 [US1] 在 `src/server/attempts/service.ts` 中实现 `startAttempt`（章节范围：已有进行中的作答则返回它，否则新建并把该章题号按题库顺序写入 `question_ids`）、`getAttemptForAnswering`（通过题库目录的作答视图组装，附带已保存的答案）、`saveAnswer`（校验题号属于该作答、选项存在、单选只有一个选项、简答题不超过 2000 字；仅 `in_progress` 可写；更新 `last_question_id`）。所有查询都带当前用户条件
- [X] T039 [US1] 在 `src/server/attempts/submit.ts` 中实现 `submitAttempt`（一个事务内：以 `status = 'in_progress'` 为条件更新状态，失败则报冲突；判选择题；给未答题补 `unanswered`；简答题记 `pending`；写入 `correct_count`、`pending_count`、`submitted_at`；存在未答题且未确认时返回未答数量而不交卷）和 `getAttemptResult`（仅已交卷可用，通过结果视图组装）
- [X] T040 [US1] 在 `src/server/attempts/submit.ts` 的 `submitAttempt` 中加入限流：按 `attempts` 表统计该用户最近 10 分钟内已交卷次数，达到 10 次则拒绝并给出可重试的秒数（FR-041）
- [X] T041 [US1] 在 `src/server/grading/runner.ts` 中实现评分执行器，流程见 `contracts/grading.md`：用 `FOR UPDATE SKIP LOCKED` 每批领取最多 20 条到期的 `pending`，同时处理不超过 5 个；领取前检查 `GRADING_DAILY_CAP`；成功和失败的处理各在一个事务内。在 `src/instrumentation.ts` 中启动每 60 秒运行一次的定时器
- [X] T042 [P] [US1] 实现接口 `src/app/api/attempts/route.ts`（POST）、`src/app/api/attempts/[id]/route.ts`（GET）、`src/app/api/attempts/[id]/answers/[questionId]/route.ts`（PUT），状态码见 `contracts/http-api.md`
- [X] T043 [US1] 实现接口 `src/app/api/attempts/[id]/submit/route.ts`（POST，响应发出后用 `after` 触发一次评分执行器）和 `src/app/api/attempts/[id]/result/route.ts`（GET），状态码见 `contracts/http-api.md`
- [X] T044 [P] [US1] 创建专题列表页 `src/app/practice/page.tsx`：按专栏分组列出专题、章节数和题数
- [X] T045 [P] [US1] 创建章节列表页 `src/app/practice/[topic]/page.tsx`：每章显示标题、题数、原文标题和链接，以及“开始”按钮（调用 `POST /api/attempts` 后进入答题页）
- [X] T046 [P] [US1] 创建答题组件 `src/components/quiz/QuestionCard.tsx`（单选只能选一个；多选标明“多选题”并可选多个；简答题文本框带 2000 字计数和上限）、`src/components/quiz/QuestionOverview.tsx`（题目概览，标出已答和未答，点击跳题）、`src/components/quiz/SubmitDialog.tsx`（显示未答数量并要求确认）
- [X] T047 [US1] 创建答题页 `src/app/attempts/[id]/page.tsx` 和 `src/components/quiz/QuizRunner.tsx`：显示第几题和总题数，上一题、下一题和概览跳题，答案变化后自动保存并显示保存状态，交卷流程（处理未答确认、限流提示、已交卷冲突），交卷成功后进入结果页
- [X] T048 [P] [US1] 创建结果组件 `src/components/result/ResultQuestion.tsx`（用户答案、正确答案、判定、选择题逐选项对错、简答题评语、解答全文、原文链接；`pending` 显示“待评分”）和 `src/components/result/SourceNotice.tsx`（注明内容来源，并说明解答是对原文的转述，其中的经验数字、产品命令和阈值以原文写作时为准，FR-029）
- [X] T049 [US1] 创建结果页 `src/app/attempts/[id]/result/page.tsx`：正确率、逐题结果、“只看错题”筛选；`pendingCount` 大于 0 时每隔几秒重新请求结果接口直到为 0

**Checkpoint**: 可以登录、选章、作答、交卷并看到结果。此时已是可用的最小版本

---

## Phase 4: User Story 2 - 账号与每章完成情况 (Priority: P2)

**Goal**: 记住每个用户每章的状态和正确率，支持中途续做和重做

**Independent Test**: 两个账号分别做不同章节，其中一个中途退出再登录，核对各自的章节状态、续做位置和正确率互不影响（`quickstart.md` 场景 2）

注册、登录和未登录跳转已在 Phase 2 实现；本阶段补上进度相关的部分。

### Tests for User Story 2

- [X] T050 [P] [US2] 在 `tests/integration/progress.test.ts` 中写进度测试：章节状态按“有进行中的作答为进行中，否则有已交卷的作答为已完成，否则未开始”推导；最近一次正确率取 `submitted_at` 最新的作答，最高正确率取所有已交卷作答的最大值；重做产生新作答且旧作答保留；放弃后的作答不影响状态和正确率；专题进度为至少有一份已交卷作答的章节数除以章节总数；保存位置后重新读取作答得到相同的 `lastQuestionId`；用户 A 的进度查询不包含用户 B 的记录

### Implementation for User Story 2

- [X] T051 [US2] 在 `src/server/attempts/progress.ts` 中实现 `getChapterProgress(userId, topicPrefix)`（每章的状态、最近一次和最高正确率、进行中作答的编号、最近一次已交卷作答的编号）和 `getTopicProgress(userId)`（每个专题的已完成章节数和总章节数），计算方式见 `data-model.md` 第三节
- [X] T052 [US2] 在 `src/server/attempts/service.ts` 中添加 `setPosition` 和 `abandonAttempt`（仅 `in_progress` 可操作），并实现接口 `src/app/api/attempts/[id]/position/route.ts`（PUT）和 `src/app/api/attempts/[id]/abandon/route.ts`（POST）
- [X] T053 [US2] 更新专题列表页 `src/app/practice/page.tsx`：每个专题显示已完成章节数和总章节数（FR-009）
- [X] T054 [US2] 更新章节列表页 `src/app/practice/[topic]/page.tsx`：显示每章状态以及最近一次和最高正确率；按状态提供“开始”“继续”“重做”“查看最近结果”（FR-009、FR-021、FR-028）
- [X] T055 [US2] 更新 `src/components/quiz/QuizRunner.tsx`：进入时定位到 `lastQuestionId`；翻题时调用位置接口；提供“放弃并重新开始”并要求确认（FR-017、FR-020）

**Checkpoint**: 章节列表反映真实进度，长章节可以分次完成

---

## Phase 5: User Story 3 - 每章错题与错误次数 (Priority: P3)

**Goal**: 用户能看到每章做错过的题、每题错了几次、最近一次对错，并能直接查看解答

**Independent Test**: 同一账号把同一章做两遍，故意在固定几道题上答错，核对错题列表里的题目和错误次数（`quickstart.md` 场景 3）

### Tests for User Story 3

- [X] T056 [P] [US3] 在 `tests/integration/mistakes.test.ts` 中写错题统计测试：交卷判错的选择题错误次数为 1；再次判错变为 2；后来判对时错误次数不变、最近判定变为对、仍在错题列表中；未答的题没有统计行；放弃的作答不产生统计；简答题在评分完成时才更新统计；每章错题只含该章且 `wrong_count >= 1` 的题，可按错误次数降序；错题总览按专题和章节汇总的数量与各章列表一致；不同用户互不可见

### Implementation for User Story 3

- [X] T057 [US3] 在 `src/server/mistakes/service.ts` 中实现 `recordVerdicts(tx, userId, items)`（只接受 `correct` 和 `incorrect`；判错时 `wrong_count` 加一；每次都使 `attempt_count` 加一并更新 `last_verdict`、`last_answered_at`；`wrong_count` 只增不减）、`listChapterMistakes(userId, chapterId, sort)` 和 `getMistakeSummary(userId)`（按题库目录把题号归到章节和专题）
- [X] T058 [US3] 在 `src/server/attempts/submit.ts` 的交卷事务和 `src/server/grading/runner.ts` 的评分成功事务中调用 `recordVerdicts`；`getAttemptResult` 返回每题的 `wrongCount`
- [X] T059 [P] [US3] 创建每章错题页 `src/app/mistakes/[chapterId]/page.tsx`：每题显示错误次数和最近一次对错，可展开查看题目、正确答案和解答（复用 `ResultQuestion` 和 `SourceNotice`），可按错误次数排序（FR-032）
- [X] T060 [P] [US3] 创建错题总览页 `src/app/mistakes/page.tsx`：按专题和章节列出错题数量，链接到每章错题页；没有错题时显示说明（FR-034）
- [X] T061 [US3] 在章节列表页 `src/app/practice/[topic]/page.tsx` 中为有错题的章节添加“本章错题”入口及数量

**Checkpoint**: 错题和错误次数与实际判定一致

---

## Phase 6: User Story 4 - 错题本 (Priority: P4)

**Goal**: 用户手动把任意题目加入错题本，可查看、移除，并把它当题集练习

**Independent Test**: 从结果页和错题列表各加入几道题，核对错题本内容；移除一道；用错题本练习一次并核对结果和错误次数的变化（`quickstart.md` 场景 4）

### Tests for User Story 4

- [X] T062 [P] [US4] 在 `tests/integration/notebook.test.ts` 中写错题本测试：添加后可查到；从未答错的题也能添加；重复添加不报错且只有一条；添加不存在的题号被拒；移除后查不到，且该题的 `question_stats` 不变；移除本不在其中的题不报错；不同用户的错题本互不可见；错题本为空时开始练习被拒；开始练习后题目列表固定，其后增删错题本不改变这次作答的 `question_ids`；错题本练习中判错的题错误次数加一；同一用户同时只有一份进行中的错题本练习

### Implementation for User Story 4

- [X] T063 [US4] 在 `src/server/notebook/service.ts` 中实现 `addItem`（幂等）、`removeItem`、`listItems`（附带所属专题、章节和错误次数）、`getMembership(userId, questionIds)`
- [X] T064 [US4] 在 `src/server/attempts/service.ts` 的 `startAttempt` 中支持 `notebook` 范围：把当时错题本的题号按加入时间写入 `question_ids`；错题本为空时返回 `notebook_empty`
- [X] T065 [P] [US4] 实现接口 `src/app/api/notebook/[questionId]/route.ts`（PUT 和 DELETE），状态码见 `contracts/http-api.md`
- [X] T066 [US4] 在 `src/server/attempts/service.ts` 的 `getAttemptForAnswering` 和 `src/server/attempts/submit.ts` 的 `getAttemptResult` 中返回每题的 `inNotebook`；在 `src/server/mistakes/service.ts` 的 `listChapterMistakes` 中同样返回
- [X] T067 [P] [US4] 创建 `src/components/NotebookToggle.tsx`（显示是否已在错题本，点击加入或移除），并在 `src/components/result/ResultQuestion.tsx` 中使用，使结果页和每章错题页都能操作（FR-036、FR-037）
- [X] T068 [US4] 创建错题本页 `src/app/notebook/page.tsx`：题目列表（专题、章节、错误次数、移除）、“开始练习”或“继续练习”；为空时显示如何添加题目的引导且不提供练习入口（FR-038 至 FR-040）

**Checkpoint**: 错题本可以增删、查看和练习

---

## Phase 7: User Story 5 - 模式入口与对战模式占位 (Priority: P5)

**Goal**: 登录后的首页提供做题模式和对战模式两个入口，对战模式只显示尚未开放

**Independent Test**: 登录后核对首页有两个模式入口；进入对战模式只看到“尚未开放”的说明；进入做题模式到达专题列表（`quickstart.md` 场景 5）

- [X] T069 [P] [US5] 创建首页 `src/app/page.tsx`：需要登录；提供“做题模式”（进入 `/practice`）和“对战模式”（进入 `/battle`）两个入口（FR-043）
- [X] T070 [P] [US5] 创建对战占位页 `src/app/battle/page.tsx`：需要登录；只显示该模式尚未开放的说明和返回做题模式的链接；不包含任何对战功能或数据结构（FR-044、原则 VI）

**Checkpoint**: 五个用户故事全部可用

---

## Phase 8: 铺开题目内容

**Purpose**: 把其余 14 个专题转成三种题型并通过抽查，使 151 章全部可做（FR-001、SC-001）

本阶段只依赖 Phase 2 的内容流水线，可以与 Phase 3 至 7 并行。每个任务的流程相同：用 `generate-questions` skill 逐章生成，运行 `npm run content:validate` 直到没有错误并处理警告，然后交给项目所有者按 `contracts/content-format.md` 的抽查标准审阅（每个专题至少完整抽查一章，且不少于该专题题数的 10%）。**只有所有者确认后才能把章节状态改为 `approved`，实现者不得自行批准。**

- [ ] T071 [P] 生成并送审 `content/typed/claude-code-insights.json`（专题 J，3 章 73 题）
- [ ] T072 [P] 生成并送审 `content/typed/agent-illustrated-concepts.json`（专题 K，2 章 70 题）
- [ ] T073 [P] 生成并送审 `content/typed/claude-code-prompts.json`（专题 I，2 章 79 题）
- [ ] T074 [P] 生成并送审 `content/typed/claude-code-basics.json`（专题 F，3 章 136 题）
- [ ] T075 [P] 生成并送审 `content/typed/agent-illustrated-retrieval.json`（专题 L，2 章 140 题）
- [ ] T076 [P] 生成并送审 `content/typed/codex.json`（专题 N，4 章 146 题）
- [ ] T077 [P] 生成并送审 `content/typed/agent-illustrated-engineering.json`（专题 M，4 章 154 题）
- [ ] T078 [P] 生成并送审 `content/typed/langchain.json`（专题 E，12 章 158 题）
- [ ] T079 [P] 生成并送审 `content/typed/rag.json`（专题 B，23 章 266 题）
- [ ] T080 [P] 生成并送审 `content/typed/claude-code-playbook.json`（专题 G，10 章 268 题）
- [ ] T081 [P] 生成并送审 `content/typed/tools.json`（专题 C，22 章 269 题）
- [ ] T082 [P] 生成并送审 `content/typed/claude-code-source.json`（专题 H，7 章 287 题）
- [ ] T083 [P] 生成并送审 `content/typed/llm.json`（专题 D，23 章 288 题）
- [ ] T084 [P] 生成并送审 `content/typed/agent.json`（专题 A，30 章 485 题）
- [ ] T085 设置 `CONTENT_REQUIRE_ALL=1` 运行 `npm run content:build`，确认 151 章全部为 `approved`、2884 题全部进入 `content/dist/bank.json`、没有错误

**Checkpoint**: 题库全部可做

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事的收尾、上线前检查和部署

- [ ] T086 [P] 在 `tests/e2e/smoke.spec.ts` 中写端到端冒烟流程（假评分器）：注册、进入做题模式、做完一章、确认未答后交卷、结果页显示正确率和解答、把一道题加入错题本、在错题本中看到它、退出登录
- [ ] T087 [P] 在 `tests/grading-eval/cases.json` 中准备至少 50 条评分样例（题号、模拟的用户答案、人工判定），覆盖完整答对、只答到部分要点、答非所问、与参考答案矛盾、在答案里试图指挥评分器；创建 `scripts/eval-grading.ts`，用真实接口跑一遍并输出一致率和不一致的样例
- [ ] T088 设置 `GRADER=deepseek` 和真实密钥运行 `npm run eval:grading`；一致率低于 90% 时调整 `src/server/grading/deepseek-grader.ts` 的提示词或改用 `deepseek-v4-pro` 后重跑，直到达到 SC-009。本任务需要项目所有者提供 DeepSeek 密钥
- [ ] T089 [P] 逐页检查加载中、空数据和出错三种状态及手机宽度下的布局：`src/app/practice/`、`src/app/attempts/`、`src/app/mistakes/`、`src/app/notebook/`；用最长的章节 L2（71 题）检查 `src/components/quiz/QuestionOverview.tsx` 的题目概览和跳题
- [ ] T090 [P] 安全复查并修正：`src/app/api/` 下每个修改类接口都校验 `Origin` 且都调用 `requireUser`；每个查询都带当前用户条件；会话 Cookie 的属性正确；日志和错误响应中不出现密码、会话令牌和 `DEEPSEEK_API_KEY`
- [ ] T091 按 `specs/001-interview-quiz-system/quickstart.md` 逐条执行验证场景 1 至 8，并完成“上线前的人工检查”表中的四项；记录不符合预期的地方并修正
- [X] T092 更新 `CLAUDE.md` 的“当前状态”和“命令”两节，使其与实际的脚本和目录一致
- [ ] T093 部署到 Railway：添加 PostgreSQL 并在应用服务中引用 `DATABASE_URL`；设置 `GRADER=deepseek`、`DEEPSEEK_API_KEY`、`CONTENT_REQUIRE_ALL=1`；预部署命令设为 `npm run db:migrate`；健康检查路径设为 `/api/health`；部署后在线上重做 `quickstart.md` 的场景 1 和场景 5。本任务需要项目所有者的 Railway 账号和 DeepSeek 密钥

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: 无依赖
- **Phase 2 Foundational**: 依赖 Phase 1，阻塞所有用户故事
- **Phase 3 至 7 用户故事**: 都依赖 Phase 2
- **Phase 8 铺开内容**: 只依赖 Phase 2 中的 T008 至 T017，可与 Phase 3 至 7 并行
- **Phase 9 Polish**: 依赖 Phase 3 至 8 全部完成

### User Story Dependencies

- **US1 (P1)**: 只依赖 Phase 2
- **US2 (P2)**: 依赖 US1（进度由 US1 产生的作答记录推导，并修改 US1 的章节列表页和答题页）
- **US3 (P3)**: 依赖 US1（在 US1 的交卷和评分流程中记录统计）；不依赖 US2
- **US4 (P4)**: 依赖 US1（错题本练习复用作答流程）和 US3（显示错误次数、在每章错题页操作）
- **US5 (P5)**: 只依赖 Phase 2，可以在任何时候做

US2 至 US4 都建立在 US1 的作答流程上，这是这个功能本身的结构决定的；每个故事完成后仍可按各自的 Independent Test 单独验证。

### Within Each Phase

- 测试任务先于同一阶段的实现任务，并先确认测试失败
- Phase 2 内：T008 → T010 → T014 → T015 → T016 → T017 → T019；T020 → T021 → T023 → T025 → T026
- US1 内：T035、T036 → T037；T038 → T039 → T040 → T041 → T043；T046 → T047；T048 → T049
- 同一个文件的任务必须按编号顺序做：`src/server/attempts/service.ts`（T038、T052、T064、T066）、`src/server/attempts/submit.ts`（T039、T040、T058、T066）、`src/app/practice/[topic]/page.tsx`（T045、T054、T061）

### Parallel Opportunities

- Phase 1：T004 至 T007
- Phase 2：内容流水线（T008 起）和数据库与账号（T020 起）两条线互不依赖；其中 T008、T009、T011、T012、T013 可同时开始，T022、T024、T027、T028、T029 可同时进行
- US1：五个测试任务 T030 至 T034 可同时写；T035、T036 可同时做；页面和组件 T044、T045、T046、T048 可同时做
- Phase 8：14 个专题的任务互不影响，可以全部并行，也可以穿插在各用户故事之间

---

## Parallel Example: User Story 1

```text
# 同时写 US1 的全部测试：
Task: "T030 选择题判分测试 tests/unit/grading-choice.test.ts"
Task: "T031 评分器测试 tests/unit/grader.test.ts"
Task: "T032 作答测试 tests/integration/attempts.test.ts"
Task: "T033 评分执行器测试 tests/integration/grading-runner.test.ts"
Task: "T034 接口契约测试 tests/integration/api-attempts.test.ts"

# 服务层完成后，同时做互不相干的页面和组件：
Task: "T044 专题列表页 src/app/practice/page.tsx"
Task: "T045 章节列表页 src/app/practice/[topic]/page.tsx"
Task: "T046 答题组件 src/components/quiz/"
Task: "T048 结果组件 src/components/result/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1 和 Phase 2。Phase 2 结束时试点专题（AI 编程，65 题）已通过抽查，题型转换的质量已经有结论
2. 完成 Phase 3（US1）
3. **停下来验证**：按 `quickstart.md` 场景 1、6、7 检查
4. 此时用试点专题的 4 章已经可以完整地做题、评分、看解答

### Incremental Delivery

1. Setup 加 Foundational：内容流水线和账号就绪
2. US1：能做题并看结果（最小可用版本）
3. US2：有进度，能续做
4. US3：有错题和错误次数
5. US4：有错题本
6. US5：有模式入口
7. Phase 8 与以上各步并行推进，全部通过后题库完整
8. Phase 9：评测、检查、部署

### 需要项目所有者参与的任务

- T017 和 T071 至 T084：审阅生成的题目并批准（原则 III）
- T088、T093：提供 DeepSeek 密钥和 Railway 账号

---

## Notes

- [P] 表示改的是不同文件且不依赖未完成的任务
- [Story] 标签把任务对应到用户故事
- 每完成一个任务或一组相关任务就提交一次
- 在每个 Checkpoint 停下来验证
- 不要实现规格之外的功能：对战模式只有一个占位页；不为用户专属题库预留任何结构（原则 VI）
