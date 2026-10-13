# Data Model: 面试题答题系统 1.0

**Date**: 2026-10-13 | **Spec**: [spec.md](spec.md) | **Research**: [research.md](research.md)

数据分成两部分：题目内容是随应用发布的只读数据，放在内存里；用户数据放在 PostgreSQL 里，只通过题号和章节编号引用题目。

## 一、题目内容（只读，内存）

来源和文件格式见 [contracts/content-format.md](contracts/content-format.md)。

### 专题 Topic

| 字段 | 说明 |
| --- | --- |
| prefix | 题号前缀字母，如 `B`。主键 |
| slug | 文件名，如 `rag` |
| title | 专题名称 |
| column | 所属专栏：大模型面试题、Claude Code、Codex、图解 Agent |
| order | 在专栏内的显示顺序 |

### 章节 Chapter

| 字段 | 说明 |
| --- | --- |
| id | 前缀加题组号，如 `B1`。主键 |
| topicPrefix | 所属专题 |
| number | 题组号 |
| title | 题组标题 |
| sourceTitle、sourceUrl | 对应原文的标题和链接 |
| questionIds | 本章题号，按题库原顺序（FR-007） |

### 题目 Question

| 字段 | 说明 |
| --- | --- |
| id | 题号，如 `B1-1`。主键，全局唯一，永不更改或复用（FR-006） |
| chapterId | 所属章节 |
| section | 题组内的小标题，可为空 |
| type | `single`、`multiple`、`short` |
| stem | 题干。选择题可以是改写后的题干，简答题沿用原题干 |
| options | 仅选择题：`[{ key, text, correct }]` |
| referenceAnswer | 参考答案全文 |
| citations | 原文小节引用 `[{ label, url }]`，至少一条 |

约束（由校验器保证，见内容格式契约）：单选题恰有 4 个选项且 1 个正确；多选题 4 到 6 个选项且至少 2 个正确；简答题没有选项。

### 两种对外视图

题目对外只以这两种形态出现，由题库目录模块提供，其他模块不直接接触完整的题目对象（原则 IV、FR-018）：

- **作答视图**：`id`、`type`、`stem`、选项的 `key` 和 `text`。不含 `correct`、`referenceAnswer`、`citations`。
- **结果视图**：全部字段。只在题目所在的作答已交卷，或在错题列表、错题本的查看场景下提供。

## 二、用户数据（PostgreSQL）

### users

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid，主键 | |
| username | text | 显示用的原始写法 |
| username_normalized | text，唯一 | 转小写后的用户名，用于唯一性判断和登录 |
| password_hash | text | argon2id 哈希（FR-010） |
| created_at | timestamptz | |

规则：用户名 3 到 20 个字符，允许字母、数字、下划线和中文；密码 8 到 72 个字符。

### sessions

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | text，主键 | 会话令牌的 SHA-256，令牌原文只在 Cookie 里 |
| user_id | uuid，外键 users，级联删除 | |
| expires_at | timestamptz | 创建时为 30 天后；剩余不足 15 天时访问即顺延到 30 天（FR-011） |
| created_at | timestamptz | |

### attempts（作答）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid，主键 | |
| user_id | uuid，外键 users | |
| scope_type | 枚举 `chapter`、`notebook` | 作答范围 |
| chapter_id | text，可空 | 范围为章节时必填，为错题本时为空 |
| status | 枚举 `in_progress`、`submitted`、`abandoned` | |
| question_ids | text[] | 本次作答的题目和顺序，创建时固定（FR-039） |
| last_question_id | text，可空 | 用户上次所在的题目（FR-017） |
| total_count | int | 等于 `question_ids` 的长度 |
| correct_count | int，可空 | 交卷后写入；补评完成时更新 |
| pending_count | int | 尚未评出的简答题数量 |
| started_at、submitted_at | timestamptz | |

约束与索引：

- 部分唯一索引 `(user_id, scope_type, coalesce(chapter_id, ''))`，条件 `status = 'in_progress'`：同一用户同一范围只有一份进行中的作答（FR-014）。
- 索引 `(user_id, chapter_id, submitted_at desc)`：取某章最近一次结果、统计正确率。
- 索引 `(user_id, submitted_at)`：统计交卷频率（FR-041）。

状态流转：

```text
           保存答案（可反复）
              ┌──────┐
              ▼      │
(创建) ──► in_progress ──交卷──► submitted   （终态，不可再改，FR-020）
                 │
                 └──放弃──► abandoned        （终态，不计入任何统计）
```

正确率 = `correct_count / total_count`（FR-025）。未答和待评分的题都不计入 `correct_count`。

### attempt_answers（作答明细）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| attempt_id | uuid，外键 attempts，级联删除 | 与 question_id 组成主键 |
| question_id | text | |
| response | jsonb | 选择题 `{ "choice": ["A","C"] }`，简答题 `{ "text": "…" }` |
| verdict | 枚举 `correct`、`incorrect`、`unanswered`、`pending`，可空 | 交卷前为空 |
| feedback | text，可空 | 简答题评语 |
| answered_at | timestamptz | 最后一次保存的时间 |
| graded_at | timestamptz，可空 | |
| grading_tries | int，默认 0 | 评分尝试次数 |
| next_retry_at | timestamptz，可空 | 下次可重试的时间 |

规则：

- 交卷前每次保存是整行覆盖，以最后保存的为准（两台设备同时作答的情形）。
- 简答题答案去掉首尾空白后为空，视为未作答；长度上限 2000 字。
- 交卷时，`question_ids` 里没有明细行或答案为空的题，补一行 `verdict = 'unanswered'`。
- 索引 `(next_retry_at)`，条件 `verdict = 'pending'`：评分执行器领取任务。

### question_stats（题目统计）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| user_id | uuid，外键 users | 与 question_id 组成主键 |
| question_id | text | |
| wrong_count | int | 累计判错次数（FR-030） |
| attempt_count | int | 累计被判定的次数（对或错） |
| last_verdict | 枚举 `correct`、`incorrect` | 最近一次判定 |
| last_answered_at | timestamptz | |

更新规则：

- 只在一道题得到 `correct` 或 `incorrect` 判定时更新：选择题在交卷的事务里更新，简答题在评分完成的事务里更新。
- `unanswered` 不产生也不更新统计行（FR-031）。`abandoned` 的作答不更新统计。
- `wrong_count` 只增不减；后来答对只改 `last_verdict`（FR-033）。
- “错题”就是 `wrong_count >= 1` 的行。每章错题、错题总览按题号所属的章节和专题在内存里的题库目录中归类（FR-032、FR-034）。

### notebook_items（错题本条目）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| user_id | uuid，外键 users | 与 question_id 组成主键 |
| question_id | text | |
| added_at | timestamptz | |

规则：主键保证同一题只有一条；添加是幂等的（FR-036）。移除只删这一行，不影响 `question_stats`（FR-038）。

## 三、推导出的状态

这些不单独存储，查询时计算。

| 名称 | 计算方式 |
| --- | --- |
| 章节状态 | 该用户该章有 `in_progress` 的作答 → 进行中；否则有 `submitted` 的作答 → 已完成；否则未开始（FR-009） |
| 最近一次正确率 | 该章 `submitted_at` 最新的作答的正确率 |
| 最高正确率 | 该章所有 `submitted` 作答的正确率最大值 |
| 专题进度 | 该专题下“已完成”或曾经完成过的章节数 ÷ 题库中该专题的章节总数 |
| 是否在错题本 | `notebook_items` 中存在该用户和题号的行（FR-037） |

“曾经完成过”指该章至少有一份 `submitted` 的作答，即使当前又有一份进行中的重做。

## 四、题目内容更新时的行为

- 新增章节或题目：数据库无需任何改动。新章节没有作答记录，自然显示为未开始；专题的章节总数来自题库目录，随之变化（FR-042）。
- 修订题目内容：题号不变，所有记录继续有效。历史作答保留当时的答案和判定，不重新判分。
- 删除题目：题号写入退役清单，不再出现在题库目录中。引用它的历史记录在展示时跳过；进行中的作答里遇到已不存在的题号时，把它从该次作答的题目列表中去掉。
