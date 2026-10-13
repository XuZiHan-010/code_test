# 大模型、Claude Code、Codex 与图解 Agent 面试题练习

依据[小林面试笔记大模型面试题目录](https://xiaolinnote.com/ai/)、[图解 Claude Code](https://xiaolinnote.com/claudecode/)、[图解 Codex](https://xiaolinnote.com/codex/)与[图解 Agent](https://xiaolinnote.com/agent/)整理。每篇文章对应一个题组；题组内拆成面试时可以单独提出的短问题，每题一个主要考点。题卷仅收录题目；逐题参考解答单独放在 [`answers-xiaolin/`](answers-xiaolin/)，保留题号，不重复题干。

目前共 15 个专题、151 篇文章、2884 题。其中大模型六个专题共 114 篇文章、1531 题；Claude Code 五个专题共 25 篇文章、843 题；图解 Codex 一个专题共 4 篇文章、146 题；图解 Agent 三个专题共 8 篇文章、364 题。四个专栏的在线目录于 2026-10-13 逐篇核对，当时目录里的文章全部收录；专栏以后新增文章时需要再补。

## 出题规则

题库只按小林原文出题，2026-10-13 按下面三条逐篇整理过一遍：

- 每道题都能用所在题组那篇文章的内容回答，答案注明出自哪一小节；
- 原文讲到的知识点都要有题，逐篇对照正文补了漏题，补出的题放在各题组末尾的“补充考点”里；
- 原文没讲的内容不出题，原先问到原文之外的题已改写为只问原文讲到的部分，改不了的删除。

题组之间不做跨卷去重：同一个机制在不同文章里出现时，按各自文章的讲法分别出题。

## 大模型面试题

| 专题 | 文章 | 题目 | 题号前缀 | 题卷 | 解答版 |
| --- | ---: | ---: | --- | --- | --- |
| Agent | 30 | 485 | A | [Agent](agent.md) | [参考解答](answers-xiaolin/agent.md) |
| RAG | 23 | 266 | B | [RAG](rag.md) | [参考解答](answers-xiaolin/rag.md) |
| LLM 工具调用 | 22 | 269 | C | [工具调用](tools.md) | [参考解答](answers-xiaolin/tools.md) |
| 大模型工程 | 23 | 288 | D | [大模型工程](llm.md) | [参考解答](answers-xiaolin/llm.md) |
| LangChain 框架 | 12 | 158 | E | [LangChain](langchain.md) | [参考解答](answers-xiaolin/langchain.md) |
| AI 编程 | 4 | 65 | P | [AI 编程](ai-coding.md) | [参考解答](answers-xiaolin/ai-coding.md) |

## Claude Code 面试题

按专栏的五个方向拆成五份题卷。每个题组附原文链接。

| 专题 | 文章 | 题目 | 题号前缀 | 题卷 | 解答版 |
| --- | ---: | ---: | --- | --- | --- |
| 基础入门 | 3 | 136 | F | [基础入门](claude-code-basics.md) | [参考解答](answers-xiaolin/claude-code-basics.md) |
| 实践技巧 | 10 | 268 | G | [实践技巧](claude-code-playbook.md) | [参考解答](answers-xiaolin/claude-code-playbook.md) |
| 源码解析 | 7 | 287 | H | [源码解析](claude-code-source.md) | [参考解答](answers-xiaolin/claude-code-source.md) |
| 提示词工程 | 2 | 79 | I | [提示词工程](claude-code-prompts.md) | [参考解答](answers-xiaolin/claude-code-prompts.md) |
| 行业观察 | 3 | 73 | J | [行业观察](claude-code-insights.md) | [参考解答](answers-xiaolin/claude-code-insights.md) |

## Codex 面试题

图解 Codex 的四篇文章合成一份题卷，每篇一个题组。

| 专题 | 文章 | 题目 | 题号前缀 | 题卷 | 解答版 |
| --- | ---: | ---: | --- | --- | --- |
| Codex 工程化、使用与源码 | 4 | 146 | N | [Codex](codex.md) | [参考解答](answers-xiaolin/codex.md) |

## 图解 Agent 面试题

图解 Agent 专栏的 8 篇文章分成三份题卷，题目按原文顺序排列。这三卷最初只收录其他题卷没有的“增量”考点，现已改为每篇文章完整出题。

| 专题 | 文章 | 题目 | 题号前缀 | 题卷 | 解答版 |
| --- | ---: | ---: | --- | --- | --- |
| 概念与 OpenClaw | 2 | 70 | K | [概念](agent-illustrated-concepts.md) | [参考解答](answers-xiaolin/agent-illustrated-concepts.md) |
| RAG、GraphRAG 与 LightRAG | 2 | 140 | L | [检索](agent-illustrated-retrieval.md) | [参考解答](answers-xiaolin/agent-illustrated-retrieval.md) |
| Harness、Loop 与 Graph Engineering | 4 | 154 | M | [Agent 工程](agent-illustrated-engineering.md) | [参考解答](answers-xiaolin/agent-illustrated-engineering.md) |

[覆盖与去重对照](agent-illustrated-coverage.md)是这三卷最初去重时的记录，里面的取舍和题号都已过期，仅作历史参考。

## 使用方式与来源边界

题号格式为“前缀 + 题组号 - 组内序号”，各题组内连续编号。建议按题号分批作答，例如 `D10-1` 至 `D10-8`，或 `H3-1` 至 `H3-10`。先独立作答，再按同一题号对照解答。

参考解答共 15 份、2884 条，与题卷一一对应。全部采用“原文章节摘编”：每条只转述所列小林原文小节的内容并附该小节链接，不使用其他来源补充，也不加入评分表或额外题目。

2026-10-13 重新核查了 151 篇原文及全部 2884 对题答，修订 71 个题号涉及的漏答、引用不足、过强结论和超出原文范围的问法；题数、题号和题序不变。修订后 2909 条逐题引用的页面、锚点与小节标题均可定位。MCP 第 4、5 篇原文的冲突在 C5-2 明确标注并附对照引用。详见[核查记录与逐题修订清单](audit-2026-10-13.md)。

解答是对原文的转述，不是对原文说法的独立核实。文章中的经验数字、特定模型结论、产品命令、权限模式、阈值、收费和法规说法，都以原文写作时的情况为准，实际使用时应核查当前官方资料。源码题依据作者对特定快照的分析，考查可迁移的设计机制。

Claude Code 题卷依据抓取时的正文拆分，不机械沿用标题数字。例如 `/powerup` 文章标题写“18 个”，正文实际展开 10 类课程与补充命令。
