# Implementation Plan: 面试题答题系统 1.0

**Branch**: `001-interview-quiz-system`（项目尚未使用 git，未创建分支） | **Date**: 2026-10-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-interview-quiz-system/spec.md`

## Summary

把现有题库（15 个专题、151 章、2884 个知识点）做成一个多用户的网页答题系统：每个知识点转成单选、多选或简答题；用户按章作答，交卷后看到正确率和逐题解答；系统记录每章完成情况和每道题的错误次数；用户可以手动维护一个错题本并拿它练习。对战模式在 1.0 只留入口。

技术方案：一个 Next.js 全栈应用加 PostgreSQL，部署在 Railway。题目内容不进数据库，由构建脚本把 Markdown 题库和题型数据合并、校验后生成一份运行时数据，应用启动时读入内存；数据库只存用户和他们的记录，通过题号引用题目。选择题在服务端同步判分，简答题交卷后由进程内的执行器调用 DeepSeek 接口评分。题型转换是一次性的离线工作，用一个项目内的 skill 按章生成，经校验和人工抽查后发布。

## Technical Context

**Language/Version**: TypeScript，Node.js 24 LTS

**Primary Dependencies**: Next.js（App Router，搭脚手架时锁定当时的稳定版，当前为 16.x）、React、Drizzle ORM 与 drizzle-kit、node-postgres、zod、`@node-rs/argon2`、OpenAI SDK（指向 DeepSeek 接口）、Tailwind CSS

**Storage**: PostgreSQL 存用户数据；题目内容是随应用发布的 JSON 文件，运行时在内存中

**Testing**: Vitest（单元测试和连接真实 PostgreSQL 的集成测试）、Playwright（一条端到端冒烟流程）

**Target Platform**: Railway 上的 Linux 容器（Railpack 构建，单实例）；用户端为现代桌面和手机浏览器

**Project Type**: Web 应用，单个全栈项目

**Performance Goals**: 交卷后 3 秒内返回正确率和选择题结果（SC-003）；95% 的简答题在 30 秒内评出（SC-004）；50 名用户同时在线无明显变慢（SC-010）

**Constraints**: 交卷前答案不得到达浏览器；评分密钥由站点提供，必须有费用上限；界面为简体中文并可在手机上使用；本机开发环境为 Windows 加 PowerShell

**Scale/Scope**: 2884 道题、151 章、15 个专题；约 10 个页面；同时在线几十人

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

对照 `.specify/memory/constitution.md` v1.0.0 逐条检查。

| 原则 | 本计划的做法 | 结论 |
| --- | --- | --- |
| I. 内容忠于原文 | 参考答案和引用直接取自现有题库，不重写。生成选择题的 skill 规定选项只取材于同章内容；抽查清单包含“干扰项没有引入原文之外的说法”。结果页展示解答、原文链接和来源说明（FR-029）。评分提示词规定只依据参考答案判断 | 通过 |
| II. 题号永久稳定 | 题号沿用题库现有格式。数据库表只存题号，不存题目内容。退役清单加校验规则 V11 阻止题号复用。新增内容只追加文件，数据库无需改动 | 通过 |
| III. 内容先校验后发布 | 校验挂在构建上，任何错误使构建失败。章节带 `draft`/`approved` 状态，只有 `approved` 进入运行时数据。生产构建设 `CONTENT_REQUIRE_ALL=1` | 通过 |
| IV. 答案与用户数据不外泄 | 题库目录模块只暴露“作答视图”和“结果视图”两种形态，作答视图在类型上就不含答案字段；接口契约对此有明确约束并有测试。所有接口按会话中的用户过滤，越权访问返回 404。密码用 argon2id，会话令牌只存哈希，密钥只走环境变量 | 通过 |
| V. 核心规则必须有行为测试 | 解析器、校验器、判分、作答、错题统计、错题本、账号七个模块都有测试；后四个连真实 PostgreSQL。测试只通过模块的公开函数和 HTTP 接口断言 | 通过 |
| VI. 按版本范围交付 | 只实现规格中的 45 条需求。对战模式只有一个静态页面。不为用户专属题库预留结构。不引入消息队列、独立后台服务、组件库和认证库 | 通过 |

**初次检查（Phase 0 之前）**：全部通过，没有需要说明理由的违反项。

**设计后复查（Phase 1 之后）**：全部通过。设计中有两处超出规格字面要求，均服务于已有需求，没有新增功能：

- 全站每日评分上限：规格只要求限制单用户交卷频率（FR-041）。开放注册加站点付费的评分意味着单用户限流挡不住批量注册，这个上限是费用保护的最小补充，超出时复用已有的“待评分”状态，没有新的界面。
- 校验规则 V13、V14（正确选项的位置和长度偏差）：只是警告，服务于 SC-008 的质量标准。

## Project Structure

### Documentation (this feature)

```text
specs/001-interview-quiz-system/
├── plan.md              # 本文件
├── research.md          # 技术决策及理由
├── data-model.md        # 题目内容与用户数据的结构
├── quickstart.md        # 运行与验证指南
├── contracts/
│   ├── http-api.md      # HTTP 接口与页面一览
│   ├── content-format.md # 题目内容文件格式与校验规则
│   └── grading.md       # 判分规则与简答题评分器
├── checklists/
│   └── requirements.md  # 规格质量检查
└── tasks.md             # 由 /speckit-tasks 生成，本命令不创建
```

### Source Code (repository root)

```text
interview-practice/              # 现有题库（Markdown），知识点的唯一来源
content/
├── topics.json                  # 专题清单
├── typed/                       # 每个专题一个 JSON：题型、题干、选项、章节状态
├── retired-ids.json             # 已删除的题号
└── dist/bank.json               # 构建产物，不提交
scripts/
├── build-content.ts             # 解析、合并、校验，生成 bank.json
└── eval-grading.ts              # 评分一致性评测（手动运行）
src/
├── app/                         # 页面与接口路由
│   ├── (auth)/login、register
│   ├── page.tsx                 # 模式选择
│   ├── battle/                  # 对战模式占位
│   ├── practice/                # 专题列表、章节列表
│   ├── attempts/[id]/           # 答题页、结果页
│   ├── mistakes/                # 错题总览、每章错题
│   ├── notebook/                # 错题本
│   └── api/                     # auth、attempts、notebook、health
├── server/                      # 业务规则，不依赖页面框架
│   ├── content/                 # parser、validator、catalog（两种视图）
│   ├── grading/                 # 选择题判分、评分器接口、DeepSeek 与假实现、执行器
│   ├── attempts/                # 开始、保存、交卷、放弃、结果、章节状态
│   ├── mistakes/                # 题目统计的更新与查询
│   ├── notebook/                # 错题本增删查
│   ├── auth/                    # 密码、会话、注册登录
│   └── db/                      # 表结构、连接、迁移文件
└── components/                  # 界面组件
tests/
├── unit/                        # parser、validator、选择题判分、评分器的返回处理
├── integration/                 # attempts、mistakes、notebook、auth、评分执行器（真实 PostgreSQL）
├── e2e/                         # 冒烟流程
└── grading-eval/                # 评分一致性的人工标注样例
.claude/skills/generate-questions/  # 按章把知识点转成三种题型的 skill
docker-compose.yml               # 本地 PostgreSQL
```

**Structure Decision**: 单个全栈项目，放在仓库根目录。业务规则集中在 `src/server/`，页面和接口路由只做参数校验、调用规则模块和渲染，这样七个核心模块可以脱离页面框架单独测试（原则 V）。题目内容相关的输入文件放在 `content/`，与应用代码分开，便于单独审阅和重新生成。

### 模块职责

| 模块 | 对外提供 | 对应需求 |
| --- | --- | --- |
| content/parser | 把题卷和答案两份 Markdown 解析成知识点列表 | FR-001、FR-005、FR-007 |
| content/validator | 对合并后的数据执行 V1 至 V14，返回错误和警告 | FR-003、FR-006、FR-045 |
| content/catalog | 加载运行时数据；按专栏、专题、章节、题号查询；输出作答视图和结果视图 | FR-008、FR-018、FR-042 |
| grading | 选择题判分；简答题评分器接口及两个实现；评分执行器 | FR-022 至 FR-027 |
| attempts | 开始或取回作答、保存答案、交卷、放弃、取结果；章节状态与正确率 | FR-009、FR-014 至 FR-021、FR-025、FR-028、FR-041 |
| mistakes | 判定产生时更新题目统计；每章错题、错题总览 | FR-030 至 FR-034 |
| notebook | 增、删、查、是否已加入；为错题本练习固定题目列表 | FR-035 至 FR-040 |
| auth | 注册、登录、退出、当前用户、会话顺延 | FR-010 至 FR-013 |

### 实施顺序

按规格的用户故事优先级推进，每一步结束时都有可以演示的东西。

1. **内容流水线**：解析器、校验器、构建脚本；写 skill 并用最小的专题（AI 编程，65 题）跑通生成、校验、抽查。这一步最先做，因为题型转换的质量是整个项目最大的不确定性，也决定了后面所有页面有没有内容可用。
2. **地基**：脚手架、数据库与迁移、账号与会话、题库目录。
3. **User Story 1**：答题页、交卷、选择题判分、简答题评分（先接假评分器，再接 DeepSeek）、结果页。
4. **User Story 2**：章节状态、正确率、续做、重做、专题进度。
5. **User Story 3**：题目统计、每章错题、错题总览。
6. **User Story 4**：错题本及其练习。
7. **User Story 5**：模式选择页和对战占位页。
8. **铺开内容**：其余 14 个专题按章生成、校验、抽查，全部 `approved`。可与第 3 至 7 步并行。
9. **上线**：评分一致性评测、[quickstart.md](quickstart.md) 的人工检查、部署到 Railway。

## Complexity Tracking

Constitution Check 没有需要说明理由的违反项，本节不适用。
