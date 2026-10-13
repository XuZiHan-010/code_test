# 图解 Agent 专栏覆盖与去重对照

> 历史记录（2026-10-13 起不再适用）：K、L、M 三卷已改为每篇文章完整出题，不再跨卷去重，全库题号也已重排。下文的取舍说明和题号对应的是改动之前的题库。

来源：[图解 Agent 目录](https://xiaolinnote.com/agent/)，核对日期：2026-10-11。目录中的 8 篇文章均已读取并按考点对照；本次新增 3 份题卷、132 题，原有 10 份题卷的 1235 题保持不变。

## 去重规则

对照范围包括原 Agent、RAG、工具调用、大模型工程、LangChain，以及上一批 Claude Code 的全部题卷。按问题的主要考点判断重合，换了文章标题、产品名称或 Engineering 名称不算新增知识。

- 既有题已经要求解释同一机制或取舍：跳过，用旧题号指引复习。
- 一篇文章只有部分重复：只保留剩余的新考点，不整篇重复收录，也不整篇丢弃。
- 旧题仅涉及概念，新文给出此前没有覆盖的具体算法或实现边界：保留该细节，例如社区报告 Map-Reduce、LightRAG 的实体与关系双层入口。
- 新题之间也去重：心跳与调度统一放在 M2；实体消歧集中在 L2；不在每篇工程文章中重出记忆、权限、Reviewer 和工作区隔离题。

不统计“删掉了多少题”：原文没有固定的一题一知识点计数，强行给重复题数量会造成虚假的精确性。

## 8 篇文章的处理结果

| 原文 | 本次保留 | 跳过的主要内容及旧题位置 | 新题 |
| --- | --- | --- | --- |
| [Agent 总览](https://xiaolinnote.com/agent/concept/agent.html) | A2A 的 Message / Artifact、内容 Part、连接与任务生命周期的区别 | Agent 定义与组件 A1–A2；Workflow、ReAct、规划与反思 A3–A7、A14–A15；多 Agent A10–A11、A16；FC、MCP、Skill 关系 C1–C11；A2A 能力发现和长任务 C12 | K1：3 题 |
| [OpenClaw](https://xiaolinnote.com/agent/concept/openclaw.html) | Gateway / Channels / Nodes，常驻部署与模型位置，特有文件职责，文件事实源与派生索引 | 一般长短期记忆与存储读取 A8–A9、A12、A18、H5；普通混合检索 B11–B13；Skill 渐进加载 C9、H7；跨轮预算 A20、C16；心跳不在 K 卷重复，统一在 M2 | K2：14 题 |
| [RAG 总览](https://xiaolinnote.com/agent/rag/rag.html) | 递归字符与语义切分的具体边界判定，LLM 审查切分，Cross-Encoder 交互，表示形式，Precision / NDCG / MAP，不确定性信号的限制 | 基本流程、私有知识与微调 B1–B3、B10；普通结构切块与补背景 B4–B5；一般 Embedding 演进 B6–B7；向量库 B8–B9；混合召回 B11–B14；忠实度与相关性 B17–B18；通用幻觉与多次采样 A14、D17–D18；自动裁判偏差 A19 | L1：14 题 |
| [GraphRAG / LightRAG](https://xiaolinnote.com/agent/rag/graphrag-lightrag.html) | 社区索引、两种搜索的具体流程、消歧传播、图增量级联、时间分图、LightRAG 双层检索与存储边界、图证据删除 | 多跳与全局问题的基本动机 B15-4、B16；向量与图配合的概念 B16-2；普通向量更新、索引切换 B19；通用版本冲突治理 B21；一般模型和向量库选型 B6、B8–B9 | L2：48 题 |
| [Harness Engineering](https://xiaolinnote.com/agent/engineering/harness-engineering.html) | 三种工程层次、环境改进与参数训练的区别、失败沉淀、上下文焦虑、跨会话初始化、坏模式反馈、Golden Principles、持续偿还技术债、成熟技术取舍 | Harness 的基本运行能力 G2-3；六层中的基础工具、编排、记忆、评测和恢复 A2、A5–A9、A17–A20、C17–C18；独立 Reviewer A19、G9；上下文压缩 H3；进度交接 A18、G6-9、G8-9；AGENTS 文件精简与渐进披露 G1–G2、H7、J2 | M1：17 题 |
| [Loop Engineering](https://xiaolinnote.com/agent/engineering/loop-engineering.html) | 自动产生任务的外层循环，事件分诊，定时与目标驱动，调度生命周期，Heartbeat / Cron、空转成本、漏触发处理，理解债与认知投降 | 单任务工具循环 A5、H2；worktree 隔离 A22-4、G2；Skill C9、G3；连接工具 C4–C6；独立 Reviewer A19、G9、H6；持久状态与去重 A18、G3-23、G5-10；验收不能只信完成声明 A23 | M2：16 题 |
| [Loop 落地手册](https://xiaolinnote.com/agent/engineering/loop_engineering_handbook.html) | 无法客观验收的任务边界、工作循环与改进循环、每个被接受改动的总成本、成本摊销、不同安全扫描、脚本输出泄密、长期权限复审 | STATE / VISION 的目标与状态职责 A18、G8；先手动验证再定时 G5-11；Skill 复用与平台兼容 C9-5；工作区与并发 A22、H6；预算与退出 A20、C16；一般完成证据 A23；基本最小权限 C4-7、C10-3、H6-9 | M3：10 题 |
| [Graph Engineering](https://xiaolinnote.com/agent/engineering/graph-engineering.html) | 方法与框架的关系，三层循环/编排共存，边的两条分类轴，选择性返工的依赖失效，示例代码与实际执行的差距 | 节点、边、State 与框架选型 E9–E10；并行汇合 E10-6；持久化、人工暂停 E10-3–E10-5；共享契约与隔离 G2-16、A22-4；集成验证 A22-6；子 Agent 独立上下文 H6；研究任务分工 E12 | M4：10 题 |

## 按原文章节核查新增与重复边界

### 概念部分

Agent 总览中定义、能力组成、经典范式与协议关系均沿用旧题。A2A 的基础用途也已有 C12，本次仅补对象模型与传输连接的边界，不重出“为什么需要 A2A”。

OpenClaw 中“跨平台聊天、本地行动”对应新的组件和部署问题；“永久记忆、反思、Skill 扩展”中已知的通用机制不再出题。文件名称只在区分人格、行为约束、工具说明和巡检清单时使用，不要求背诵完整目录树。

### 检索部分

RAG 总览的文档切分保留递归分隔符、语义转折与模型审查这三项新机制；Embedding 部分只保留多种表示与生成模型转检索表示的问题。检索指标保留此前没有单独涉及的 Precision、NDCG、MAP；Faithfulness、MRR、Context Recall、业务评测集与 LLM 裁判不重复出题。幻觉部分仅补 logprob 聚合及白盒信号的边界，多次采样与拒答仍用旧题。

GraphRAG / LightRAG 一文的十个部分均有处理：传统 RAG 痛点沿用 B15–B16；GraphRAG 定义、流程、难点与增量策略对应 L2-1–L2-27；LightRAG 定义和原理对应 L2-28–L2-39；差异、更新与混合使用对应 L2-40–L2-48。最后两节的泛化场景选型沿用 B16，仅保留社区预计算与双层在线检索造成的具体取舍。

### 工程部分

Harness 的六层机制本身不是六套全新考点：已有的按需检索、工具过滤、ReAct、分层记忆、Eval、Trace、重试与幂等均跳过。五个难题中，独立裁判与规范文件精简跳过；保留上下文焦虑、失败修复沉淀和持续治理代码质量。长任务补初始化与全新会话接力，普通保存进度不重复。

Loop 的 worktree、Skill、connector、sub-agent、记忆是旧机制，保留它们组成自动发现与推进任务的工作系统这一新增层次。三项风险中，“验证仍归人”沿用 A19 / A23，“理解债”与“认知投降”新增。落地手册的经济性和长期治理独立保留，预算、状态文件和首次手动验证不重出。

Graph 的基础状态与流程控制已有 E9–E10；保留两条边分类轴、依赖变化后的结果失效，以及如何检查示例与实际运行是否一致。“只返工失败分支”带有依赖未变化的前提，不能作为无条件规则。

## 来源事实的处理边界

题目根据文章提炼工程问题，不把文章中的性能、成本、排名、发布日期和默认参数当成无条件事实。OpenClaw 的本地部署不等于本地模型，持久文件不等于永不丢失；LightRAG 的轻量更新也不等于零成本。

对 LightRAG 的向量匹配、原文证据和 GraphRAG 的社区报告查询，补查了[LightRAG 原始论文 §3](https://arxiv.org/html/2410.05779v1)与[微软 Global Search 文档](https://microsoft.github.io/graphrag/query/global_search/)。这只用于校正相关实现边界，不代表逐项认证全部产品能力。Graph 文章中的 Claude Code 命令、OpenClaw 的具体文件布局等仍应按实际版本核实。

## 题卷入口

- [概念与 OpenClaw：K，17 题](agent-illustrated-concepts.md)
- [RAG、GraphRAG 与 LightRAG：L，62 题](agent-illustrated-retrieval.md)
- [Harness、Loop 与 Graph Engineering：M，53 题](agent-illustrated-engineering.md)

旧题入口：[Agent A](agent.md)、[RAG B](rag.md)、[工具调用 C](tools.md)、[大模型工程 D](llm.md)、[LangChain E](langchain.md)、[Claude Code 基础 F](claude-code-basics.md)、[实践 G](claude-code-playbook.md)、[源码 H](claude-code-source.md)、[提示词 I](claude-code-prompts.md)、[行业观察 J](claude-code-insights.md)。
