# Contract: 题目内容格式

**Date**: 2026-10-13 | **Data model**: [../data-model.md](../data-model.md)

题目内容由三部分输入合成一份运行时数据。输入文件由人或 skill 编写，运行时数据由构建脚本生成，不手工编辑。

```text
interview-practice/<专题>.md                 题干（已有）
interview-practice/answers-xiaolin/<专题>.md  参考答案与引用（已有）
content/topics.json                          专题清单
content/typed/<专题>.json                    题型、改写的题干、选项
content/retired-ids.json                     已删除、不得复用的题号
            │
            ▼  构建脚本：解析 → 合并 → 校验
content/dist/bank.json                       运行时数据（构建产物，不提交）
```

## 输入一：Markdown 题库

格式沿用现状，见仓库根目录 `CLAUDE.md` 的“文件格式”一节。解析器的输出是知识点列表，每个知识点包含：题号、所属章节、小标题、原题干、参考答案正文、引用列表。

解析规则：

- `## N. 标题` 开始一个章节，章节编号为“专题前缀 + N”。
- `### 小标题` 只影响其后题目的 `section`，不产生章节。
- 题目行和答案行按 `- **题号** 正文` 识别。
- 答案行末尾连续的 `[文字](链接)` 是引用，从正文中分离出来；正文中间的链接保留。
- 章节的原文标题和链接取自答案文件该章节下的 `原文：[标题](链接)` 行。
- 题卷和答案的题号集合、顺序必须完全一致，否则解析失败。

## 输入二：`content/topics.json`

```json
[
  { "prefix": "B", "slug": "rag", "title": "RAG", "column": "大模型面试题", "order": 2 }
]
```

`slug` 同时是 Markdown 文件和 `content/typed/` 文件的文件名。每个 `prefix` 和 `slug` 唯一。

## 输入三：`content/typed/<slug>.json`

```json
{
  "prefix": "B",
  "chapters": {
    "B1": {
      "status": "approved",
      "questions": [
        {
          "id": "B1-9",
          "type": "single",
          "stem": "下列哪一项是向量数据库在 RAG 中承担的作用？",
          "options": [
            { "key": "A", "text": "…", "correct": false },
            { "key": "B", "text": "…", "correct": true },
            { "key": "C", "text": "…", "correct": false },
            { "key": "D", "text": "…", "correct": false }
          ]
        },
        {
          "id": "B1-2",
          "type": "multiple",
          "stem": "构建 RAG 知识库的离线流程包含哪些步骤？",
          "options": [
            { "key": "A", "text": "…", "correct": true },
            { "key": "B", "text": "…", "correct": true },
            { "key": "C", "text": "…", "correct": false },
            { "key": "D", "text": "…", "correct": true }
          ]
        },
        { "id": "B1-1", "type": "short" }
      ]
    }
  }
}
```

- `status`：`draft` 或 `approved`。只有 `approved` 的章节进入运行时数据。
- `type`：`single`、`multiple`、`short`。
- `stem`：选择题必填；简答题可省略，省略时使用 Markdown 里的原题干。
- `options`：选择题必填，简答题不得出现。
- `questions` 的书写顺序不影响呈现顺序，呈现顺序始终取自 Markdown。

## 输入四：`content/retired-ids.json`

```json
["B3-9"]
```

列出已经删除的题号。清单只增不减。

## 校验规则

构建脚本对合并后的数据执行以下检查。任何一条“错误”都会使构建失败，并指出题号或章节。

| 编号 | 级别 | 规则 | 对应需求 |
| --- | --- | --- | --- |
| V1 | 错误 | 题号在整个题库中唯一 | FR-006 |
| V2 | 错误 | `approved` 章节里，Markdown 中的每个题号在 typed 文件中恰好出现一次，且 typed 文件没有多出的题号 | FR-001 |
| V3 | 错误 | `type` 是三种之一 | FR-002 |
| V4 | 错误 | 单选题恰有 4 个选项且恰有 1 个 `correct` | FR-003 |
| V5 | 错误 | 多选题有 4 到 6 个选项且至少 2 个 `correct`，且不是全部 `correct` | FR-003 |
| V6 | 错误 | 简答题没有 `options` | FR-003 |
| V7 | 错误 | 选项的 `key` 从 `A` 起连续且不重复；`text` 去掉首尾空白后非空且互不相同 | FR-003 |
| V8 | 错误 | 选择题的 `stem` 非空 | FR-002 |
| V9 | 错误 | 每道题有非空的参考答案和至少一条引用，引用链接以 `https://` 开头 | FR-005 |
| V10 | 错误 | typed 文件里的章节编号都能在 Markdown 中找到 | FR-001 |
| V11 | 错误 | 任何题号都不在退役清单中 | FR-006 |
| V12 | 错误 | 设置了 `CONTENT_REQUIRE_ALL=1` 时，Markdown 中的每个章节都必须是 `approved` | FR-045、SC-001 |
| V13 | 警告 | 同一专题的单选题中，正确选项落在同一个 `key` 上的比例超过 40% | SC-008 |
| V14 | 警告 | 同一道选择题里，正确选项的文字明显长于其他选项（超过其余选项平均长度的 2 倍） | SC-008 |

V5 排除“全部正确”是因为那样的多选题不需要辨别。V13、V14 针对的是生成内容常见的毛病：答案位置或长度泄露答案。警告不阻止构建，但会打印出来供抽查时处理。

“选项只取材于原文”（FR-004）无法机械校验，靠生成时的规则和人工抽查保证。

## 输出：`content/dist/bank.json`

```json
{
  "builtAt": "2026-10-13T10:00:00Z",
  "topics": [ /* 数据模型中的 Topic */ ],
  "chapters": [ /* 数据模型中的 Chapter，只含 approved 的 */ ],
  "questions": [ /* 数据模型中的 Question */ ]
}
```

应用启动时读入这份文件并建立按题号、章节、专题的索引。文件不存在或格式不符时应用拒绝启动。

## 人工抽查的记录方式

把章节从 `draft` 改为 `approved` 就是抽查通过的记录。抽查时逐题核对：

1. 题型是否符合规格 FR-002 的标准。
2. 选择题的正确选项是否与参考答案一致。
3. 干扰项是否确实错误，且没有引入原文之外的说法。
4. 题干改写后考查的是否仍是原知识点。

每个专题至少完整抽查一章，且抽查的题数不少于该专题题数的 10%。抽查发现问题的章节整章重新生成或手工修正后再抽查。
