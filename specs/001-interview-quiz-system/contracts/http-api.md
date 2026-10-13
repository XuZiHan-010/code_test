# Contract: HTTP 接口

**Date**: 2026-10-13 | **Data model**: [../data-model.md](../data-model.md)

列表类页面（专题、章节、错题、错题本）由服务端直接渲染，不经过这些接口。这里只列浏览器需要主动调用的接口：登录注册、作答、错题本增删。

## 通用约定

- 请求和响应都是 JSON，`Content-Type: application/json`。
- 除注册、登录和健康检查外，所有接口都要求有效的会话 Cookie；没有则返回 `401`。
- 访问不属于当前用户的资源一律返回 `404`，不区分“不存在”和“无权限”（FR-013）。
- 所有修改数据的请求校验 `Origin` 请求头，与站点不一致返回 `403`。
- 错误响应统一为 `{ "error": { "code": "…", "message": "…" } }`，`message` 是可以直接显示给用户的中文。

| 状态码 | 含义 |
| --- | --- |
| 400 | 请求体不是合法 JSON |
| 401 | 未登录或会话过期 |
| 403 | 来源校验失败 |
| 404 | 资源不存在或不属于当前用户 |
| 409 | 与当前状态冲突（见各接口） |
| 422 | 字段校验不通过 |
| 429 | 触发限流，带 `Retry-After` 头 |

## 账号

### POST /api/auth/register

请求：`{ "username": string, "password": string }`

- `201`：创建账号并登录，设置会话 Cookie。响应 `{ "user": { "id", "username" } }`
- `409` `username_taken`：用户名已被占用（大小写不敏感）
- `422` `invalid_username` 或 `password_too_short`：见数据模型中的规则
- `429`：同一来源注册过于频繁

### POST /api/auth/login

请求：`{ "username": string, "password": string }`

- `200`：设置会话 Cookie。响应 `{ "user": { "id", "username" } }`
- `401` `invalid_credentials`：用户名或密码错误，不区分是哪一个
- `429`：同一来源尝试过于频繁

### POST /api/auth/logout

- `204`：删除服务端会话并清除 Cookie。未登录时也返回 `204`

## 作答

### POST /api/attempts

开始一次作答，或取回已有的进行中的作答。

请求：`{ "scope": "chapter", "chapterId": string }` 或 `{ "scope": "notebook" }`

- `201`：新建。响应 `{ "attemptId": string }`
- `200`：该范围已有进行中的作答，返回它的 `attemptId`，不新建（FR-014）
- `404` `chapter_not_found`
- `422` `notebook_empty`：错题本为空，不能开始练习（FR-040）

### GET /api/attempts/{id}

进行中的作答返回作答视图：

```json
{
  "id": "…",
  "status": "in_progress",
  "scope": { "type": "chapter", "chapterId": "B1", "title": "RAG 基本流程" },
  "lastQuestionId": "B1-3",
  "questions": [
    {
      "id": "B1-1",
      "type": "single",
      "stem": "…",
      "options": [{ "key": "A", "text": "…" }],
      "inNotebook": false,
      "response": { "choice": ["B"] }
    }
  ]
}
```

**这个响应里不得出现 `correct`、`referenceAnswer`、`citations`、`verdict`、`feedback` 中的任何一个字段**（FR-018）。`response` 为该题已保存的答案，未答时为 `null`。

已交卷的作答返回 `{ "id", "status": "submitted" }`，由页面转到结果接口。已放弃的作答返回 `404`。

### PUT /api/attempts/{id}/answers/{questionId}

保存一道题的答案，同时记录用户当前所在的题目。

请求：`{ "response": { "choice": string[] } }` 或 `{ "response": { "text": string } }`，清空答案传 `{ "response": null }`

- `204`：已保存，并把 `lastQuestionId` 更新为这道题
- `404`：作答不存在，或题号不在这次作答里
- `409` `attempt_not_in_progress`：作答已交卷或已放弃（FR-020）
- `422`：`choice` 含不存在的选项；单选题选了多个；简答题超过 2000 字

### PUT /api/attempts/{id}/position

只更新用户所在的题目，用于翻到一道题但没有作答的情况。

请求：`{ "questionId": string }` → `204`

### POST /api/attempts/{id}/submit

请求：`{ "confirmUnanswered": boolean }`

- `200`：交卷成功。响应 `{ "attemptId": string }`，页面随即请求结果
- `409` `has_unanswered`：还有未答题且 `confirmUnanswered` 为 `false`。响应里带 `{ "unansweredCount": number }`，页面提示后带 `true` 重新提交（FR-019）
- `409` `attempt_not_in_progress`：已经交过卷（包括另一台设备先交了）
- `429` `too_many_submissions`：10 分钟内交卷超过 10 次（FR-041）

交卷在一个事务里完成：判选择题、给未答题记 `unanswered`、把简答题记为 `pending`、更新选择题的题目统计、写入 `correct_count` 和 `pending_count`。

### POST /api/attempts/{id}/abandon

- `204`：作答改为已放弃，不计入任何统计（FR-020）
- `409` `attempt_not_in_progress`

### GET /api/attempts/{id}/result

只对已交卷的作答可用；进行中的作答返回 `409` `attempt_not_submitted`。

```json
{
  "id": "…",
  "scope": { "type": "chapter", "chapterId": "B1", "title": "RAG 基本流程" },
  "submittedAt": "2026-10-13T10:00:00Z",
  "totalCount": 15,
  "correctCount": 9,
  "pendingCount": 2,
  "questions": [
    {
      "id": "B1-1",
      "type": "single",
      "stem": "…",
      "options": [{ "key": "A", "text": "…", "correct": false }],
      "response": { "choice": ["B"] },
      "verdict": "correct",
      "feedback": null,
      "referenceAnswer": "…",
      "citations": [{ "label": "原文§离线阶段", "url": "https://…" }],
      "inNotebook": false,
      "wrongCount": 0
    }
  ]
}
```

`verdict` 取值 `correct`、`incorrect`、`unanswered`、`pending`。`pendingCount` 大于 0 时，页面每隔几秒重新请求本接口，直到为 0（FR-027）。正确率由页面按 `correctCount / totalCount` 显示。

## 错题本

### PUT /api/notebook/{questionId}

- `204`：已加入。重复添加同样返回 `204`，不产生重复条目（FR-036）
- `404` `question_not_found`

### DELETE /api/notebook/{questionId}

- `204`：已移除。本来就不在错题本里也返回 `204`

## 健康检查

### GET /api/health

- `200` `{ "status": "ok" }`：应用已启动、题库已加载、数据库可连接
- `503`：其中任一项不满足。供 Railway 健康检查使用，不需要登录

## 页面一览

这些页面由服务端渲染，未登录访问时重定向到 `/login?next=<原地址>`，登录后回到原地址（FR-012）。

| 路径 | 内容 |
| --- | --- |
| `/login`、`/register` | 登录、注册 |
| `/` | 模式选择：做题模式、对战模式（FR-043） |
| `/battle` | 对战模式占位，说明尚未开放（FR-044） |
| `/practice` | 按专栏分组的专题列表，带每个专题的进度（FR-008、FR-009） |
| `/practice/{专题}` | 章节列表：题数、原文链接、状态、最近和最高正确率；可开始、继续、重做、看最近结果、看本章错题 |
| `/attempts/{id}` | 答题页：题目、进度、题目概览、跳题、自动保存、交卷（FR-015 至 FR-019） |
| `/attempts/{id}/result` | 结果页：正确率、逐题对错与解答、只看错题、加入错题本（FR-026） |
| `/mistakes` | 错题总览：按专题、章节汇总（FR-034） |
| `/mistakes/{章节}` | 每章错题：错误次数、最近对错、展开看解答、排序（FR-032） |
| `/notebook` | 错题本：题目列表、移除、开始练习、空状态引导（FR-038 至 FR-040） |
