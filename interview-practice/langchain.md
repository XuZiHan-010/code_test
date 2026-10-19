# LangChain 框架专题面试题

来源：[小林面试笔记 LangChain 专题](https://xiaolinnote.com/ai/langchain/langchain_info.html)。题目按原专题 12 篇文章逐篇覆盖；每个编号只考一个主要问题。

## 1. Agent 开发框架

- **E1-1** Agent 框架通常替开发者封装哪些重复工作？
- **E1-2** LangChain 与 LangGraph 分别侧重什么？二者是什么关系？
- **E1-3** LlamaIndex 在数据接入、索引和检索方面有什么优势？
- **E1-4** 什么场景需要把 LlamaIndex 的检索能力接入 LangChain Agent？
- **E1-5** 除这三个框架外，你了解哪些不同定位的 Agent 框架？怎样选择？

### 补充考点

- **E1-6** 原文用什么例子说明哪类流程适合用图结构表达？
- **E1-7** 为什么说企业 RAG 的问题不是多注册一个搜索工具就能解决？
- **E1-8** [填空题·有序] LlamaIndex、LangChain 和 LangGraph 配合使用时，分别解决三个问题：LlamaIndex 解决 ____，LangChain 解决 ____，LangGraph 解决 ____。
- **E1-9** 选型时最外层应先判断什么？
- **E1-10** 为什么说 Demo 能跑只完成了选型的一半？
- **E1-11** LangChain 现在的定位和最大的价值是什么？它的高层抽象在什么情况下不够用？
- **E1-12** OpenAI Agents SDK、AutoGen 和 Semantic Kernel 各自的定位是什么？

## 2. Chain、Runnable、LCEL
- **E2-1** LangChain 里的 Chain 这个概念解决什么问题？
- **E2-2** Runnable 的统一执行接口带来什么好处？
- **E2-3** LCEL 怎样表示顺序执行？怎样表示并行与汇合？
- **E2-4** `invoke`、`ainvoke`、`batch`、`stream` 分别适合什么场景？
- **E2-5** 为什么新的应用一般不再首选旧式 `LLMChain`、`SequentialChain`？
- **E2-6** [填空题·有序] 三种方式的选择：开发前就知道下一步去哪里用 ____，运行时由模型决定下一步用 ____，需要精确控制循环、分支、状态持久化和人工介入用 ____。
- **E2-7** Runnable 组合后，重试、回退和追踪为什么更容易统一添加？
### 补充考点
- **E2-8** LangChain 组合式设计的核心理念是什么？
- **E2-9** 为什么需要 Chain 来组织流程？
- **E2-10** Chain 只能从左到右线性执行吗？
- **E2-11** Runnable 的“组合后仍是 Runnable”有什么意义？
- **E2-12** 统一的 Runnable 接口能自动解决类型不匹配吗？
- **E2-13** 为什么说 LCEL 的管道符不只是语法糖？
- **E2-14** RunnableSequence 的流式输出在什么情况下会被推迟？
- **E2-15** 两个互不依赖的任务怎样在 LCEL 里并行执行？
- **E2-16** 理解 Chain 时最容易出现哪些偏差？
## 3. LangChain 底层架构
- **E3-1** [填空题·无序] langchain-core 主要提供三类标准协议：____、____、____。
- **E3-2** 厂商集成包怎样适配统一的模型与消息接口？
- **E3-3** `create_agent` 的模型节点与工具节点如何形成循环？
- **E3-4** `AIMessage` 中的 `tool_calls` 与 `ToolMessage` 的调用 ID 为什么要对应？
- **E3-5** [填空题·有序] 三类数据各有归属：保存执行中不断变化的数据的是 ____，一次调用期间不变的可信依赖是 ____，保存跨线程数据的是 ____。
- **E3-6** Middleware 适合处理哪些横切逻辑？
- **E3-7** LangGraph 在这套架构中提供了哪些运行时能力？
### 补充考点
- **E3-8** 当前 LangChain v1 的定位是什么？
- **E3-9** 集成适配层和可观测性在分层架构里各负责什么？
- **E3-10** LCEL 流程和 Agent 在“谁决定下一步”上有什么区别？
- **E3-11** 为什么 Agent 的数据不应该全部塞进消息或 Prompt？
- **E3-12** 只用 while 循环实现 Agent 有什么问题？
- **E3-13** LLMChain、ConversationChain 这些旧版 Chain 现在处于什么状态？
## 4. 构建一个 Agent
- **E4-1** 动手选模型和工具前，为什么要先明确任务边界与完成标准？
- **E4-2** 选择 Agent 模型时，为什么要验证工具调用和结构化输出能力？
- **E4-3** Tool 的职责和参数 Schema 应怎样设计才容易被模型正确使用？
- **E4-4** `system_prompt` 与 `response_format` 分别约束什么？
- **E4-5** [填空题·有序] 上线流程里三个组件各管一件事：配合稳定的 thread_id 保存线程状态的是 ____，保存跨线程的用户偏好和长期事实的是 ____，承接重试、摘要、权限和审批的是 ____。
- **E4-6** Tool 单测、Agent 轨迹测试和线上 Trace 分别检查什么？
- **E4-7** 同步、异步和流式调用方式，应如何结合超时与取消策略选择？
### 补充考点
- **E4-8** create_agent 负责组装什么，底层怎样运行？
- **E4-9** 以订单客服 Agent 为例，任务边界应怎样界定？
- **E4-10** 旧资料里的 create_tool_calling_agent 和 AgentExecutor 还该用吗？
- **E4-11** [填空题·无序] 付款、发邮件、删除数据这类工具必须具备三项能力：____、____、____。
- **E4-12** 模型成功调用了一次工具，为什么只能说明 Demo 跑通？完整的 Agent 还要覆盖哪些方面？
- **E4-13** Agent 上线前可以快速检查哪些事项？
## 5. 注册 Tool
- **E5-1** 在 LangChain 中注册 Tool，模型侧与运行时侧分别得到了什么？
- **E5-2** 直接传函数、`@tool`、`StructuredTool`、`BaseTool` 怎样选？
- **E5-3** 为什么类型注解和 docstring 会影响工具调用质量？
- **E5-4** 用户 ID、租户和权限为什么不能作为模型可填写参数？
- **E5-5** [填空题·有序] 工具通过 ToolRuntime 读取可信上下文：用户身份、租户和依赖在 ____，当前会话消息和短期状态在 ____，跨会话仍要保留的长期数据在 ____。
- **E5-6** 异步 Tool 的超时、错误分类与幂等如何设计？
### 补充考点
- **E5-7** 模型厂商提供的服务端工具应怎样看待？
- **E5-8** 异步工具应该怎样实现才真正有效？
- **E5-9** 工具注册后，在模型调用前和执行阶段分别要检查什么？
- **E5-10** 工具调用结束后，日志与 Trace 要注意什么？
- **E5-11** 向 Agent 暴露的工具是不是越多越好？
## 6. 短期与长期记忆
- **E6-1** `thread_id`、State 和 Checkpointer 怎样组成短期记忆？
- **E6-2** Store 的 namespace/key 为什么适合跨线程长期记忆？
- **E6-3** 一个用户新建对话后，怎样安全地读取旧对话沉淀的偏好？
- **E6-4** [填空题·有序] 处理旧消息的三种做法影响不同：只挑部分消息进入本次上下文、持久状态仍继续增长的是 ____，从 State 中永久移除旧消息的是 ____，把早期历史压缩成简短内容的是 ____。
- **E6-5** 长期记忆应该何时写入？如何处理用户纠错、过期和敏感信息？
- **E6-6** 为什么旧式 Memory 抽象不应直接代表当前 v1 的完整方案？
### 补充考点
- **E6-7** InMemorySaver 适合什么场景？
- **E6-8** 裁剪消息时为什么不能只按固定条数处理？
- **E6-9** 长期记忆是不是存得越多越好，写入前要做什么？
- **E6-10** 把记忆带到生产环境时，身份隔离要注意什么？
- **E6-11** [填空题·无序] 评测一套记忆有没有用，要看整条链路上的三步是否都有效：____、____、____。
- **E6-12** 以规划旅行为例，哪些信息属于短期状态，哪些属于长期记忆？记忆设计应先确定什么？
- **E6-13** 长期记忆入库后要保存哪些元信息、支持哪些操作，敏感信息怎么处理？
## 7. LangChain 与 LlamaIndex
- **E7-1** LangChain 和 LlamaIndex 现在是否都能构建 Agent 与 RAG？
- **E7-2** 项目主要难点是模型和业务工具集成时，你会优先评估哪个框架？
- **E7-3** 项目主要难点是复杂文档解析与检索时，你会优先评估哪个框架？
- **E7-4** 两者组合时，检索器应怎样作为 Tool 暴露给 Agent？
### 补充考点
- **E7-5** LangChain 和 LlamaIndex 为什么容易被认为差不多？
- **E7-6** LangChain 的强项是什么？
- **E7-7** LlamaIndex 的强项是什么？
- **E7-8** 什么情况下不必同时引入 LangChain 和 LlamaIndex？
- **E7-9** 关于 LangChain 最常见的误区是什么？
## 8. LangChain4j
- **E8-1** LangChain4j 是 Python LangChain 的官方 Java 移植版吗？
- **E8-2** ChatModel、EmbeddingModel、EmbeddingStore 等统一接口解决什么问题？
- **E8-3** AI Services 如何减少 Java 应用里的 Prompt 与解析胶水代码？
- **E8-4** LangChain4j Tool 如何安全调用已有 Java 业务服务？
- **E8-5** Chat Memory 为什么不等于完整的聊天档案？
- **E8-6** 模型厂商差异为什么不会被统一接口完全抹平？
- **E8-7** 哪些既有 Java 项目适合使用 LangChain4j？
- **E8-8** LangChain4j 的 Guardrails 和可观测性分别能做什么，不能替代什么？
### 补充考点
- **E8-9** LangChain4j 在 Java 工程接入和模块成熟度上各是什么情况？
- **E8-10** LangChain4j 的低层和高层分别怎么用，旧式 Chains 还推荐吗？
- **E8-11** AI Service 返回 record 或 POJO 时，结构化输出能替代业务校验吗？
- **E8-12** LangChain4j 的依赖版本应怎样管理？
- **E8-13** 一次 AI Service 调用里，模型和 Java 应用在工具调用上怎样分工？
- **E8-14** [填空题·有序] LangChain4j 的两种常用 ChatMemory 实现：按消息数淘汰的是 ____，按 Token 窗口淘汰的是 ____。
- **E8-15** 业务所说的“长期记忆”应该放在 ChatMemory 里吗？
- **E8-16** LangChain4j 的 RAG 从简单到复杂各用什么组件？
- **E8-17** 框架封装了 RAG 之后，最终效果还取决于什么？
- **E8-18** 已有 Spring Boot 服务时怎样接入 LangChain4j？
- **E8-19** 哪些情况下 LangChain4j 不是最合适的选择？
- **E8-20** 同类 Java 方案之间应怎样选择和验证？
- **E8-21** 想用模型供应商原生的 JSON Schema 约束输出，需要满足什么条件？模型不支持时会怎样？
- **E8-22** ChatMemory 需要持久化、多用户隔离时分别怎么做，并发上要注意什么？
## 9. LangChain 与 LangGraph
- **E9-1** LangChain v1 的 `create_agent` 与 LangGraph 是怎样的上下层关系？
- **E9-2** LangChain 的 Middleware 与 LangGraph 显式节点、边、状态控制有什么区别？
- **E9-3** LangChain Agent 是否只能线性执行？
- **E9-4** 什么时候应从预构建 Agent 下沉到自定义 LangGraph？
- **E9-5** 已构建的 LangChain Agent 能否作为图中的节点或子图复用？
- **E9-6** LangChain 与自定义 LangGraph 的流式输出，为什么可能暴露不同粒度的运行进度？
### 补充考点
- **E9-7** LangChain 和 LangGraph 是同一层的东西吗？
- **E9-8** 传统 Chain 和 LangChain 的高层 Agent API 只能线性执行吗，它和 LangGraph 的边界在哪里？
- **E9-9** LangChain 的 AgentState 和 LangGraph 的状态设计有什么不同？
- **E9-10** LangGraph 的状态为什么需要 reducer？
- **E9-11** Checkpointer 和 Store 分别保存什么？
- **E9-12** “LangChain 管记忆，LangGraph 管持久化”这种说法对吗？
- **E9-13** 什么样的人工介入用 HumanInTheLoopMiddleware 就够，什么样的需要 LangGraph？
- **E9-14** LangSmith 是 LangGraph 专属的吗，部署方式和开发抽象是什么关系？
- **E9-15** 什么时候优先用 create_agent，LangGraph 更底层是否意味着更适合？
## 10. LangGraph 的优势
- **E10-1** LangGraph 为什么要显式描述 State、节点和路由？
- **E10-2** StateGraph 与 Functional API 各适合什么样的流程表达？
- **E10-3** 长任务跨进程恢复依赖什么持久化机制？
- **E10-4** `interrupt()` 怎样让人工审批进入执行过程？
- **E10-5** checkpoint 重放或时间旅行能用于什么调试和恢复场景？
- **E10-6** 并行分支如何共享状态并正确汇合？
- **E10-7** 什么情况下直接使用 LangChain `create_agent` 已经足够？
- **E10-8** LangGraph 进入生产环境时，持久化状态需要解决哪些隔离和生命周期问题？
### 补充考点
- **E10-9** 官方怎样定位 LangChain 和 LangGraph？
- **E10-10** [填空题·无序] StateGraph 的三个核心角色是：____、____、____。
- **E10-11** [填空题·有序] LangGraph 的两个高级原语：一个节点既要改状态又要改道时返回 ____，运行时才知道要派出多少个任务时用 ____ 动态分发。
- **E10-12** 显式状态有什么工程上的好处，又带来什么责任？
- **E10-13** Graph API、Functional API 和混合使用各适合什么情况？
- **E10-14** 加了 Checkpointer 就一定不会重复执行吗？
- **E10-15** LangGraph 的人工介入比“确认或取消”灵活在哪里？
- **E10-16** [填空题·有序] LangGraph 的三层节点失败处理机制中，按异常与退避策略重试的是 ____，限制单次尝试时间的是 ____，重试耗尽后接管错误的是 ____。
- **E10-17** 子图解决什么问题，什么时候才值得引入？
- **E10-18** 直接使用 LangGraph 在流式进度展示上有什么优势？
- **E10-19** 用了 LangGraph 就自动高可用了吗？
- **E10-20** 采购 Agent 的例子里，LangChain 和 LangGraph 怎样组合最自然？
- **E10-21** 哪些特征的任务适合用 LangGraph？
- **E10-22** 子图的记忆范围有哪几种选择，各有什么取舍？
## 11. LangChain 的演进
- **E11-1** LangChain 为什么将核心协议与第三方集成拆开？
- **E11-2** Runnable 和 LCEL 相比不断新增 Chain 子类，有什么设计优势？
- **E11-3** 旧式 AgentExecutor 为什么难以承载复杂状态与断点恢复？
- **E11-4** v1 的 `create_agent` 与 Middleware 分别聚焦什么？
- **E11-5** 升级旧项目时，为什么要检查导入路径、行为变化和测试覆盖？
### 补充考点
- **E11-6** LangChain 大版本演进一直在调整什么？
- **E11-7** Runnable 的出现代表了怎样的转向？
- **E11-8** LangChain v1 把旧能力迁到了哪里？
- **E11-9** 跨大版本升级 LangChain 时要注意什么？
- **E11-10** 把 LangChain 的几次架构变化连起来看是怎样一条主线，代价和收益各是什么？
- **E11-11** LangChain Python v0.3 在 Pydantic 上做了什么变化？面试时需要讲到什么程度？
## 12. Deep Research
- **E12-1** Deep Research 是 LangChain 的一个固定开关，还是一类 Agent 架构？
- **E12-2** Research Brief 应先明确哪些研究边界与成功标准？
- **E12-3** Supervisor 如何拆分子课题并判断哪些能够并行？
- **E12-4** Researcher 为什么应在隔离上下文中搜集并压缩证据？
- **E12-5** 搜到互相矛盾的来源时，如何核验并决定是否补搜？
- **E12-6** 为什么通常由统一写作阶段综合报告，而不让每个子 Agent 各写一章？
- **E12-7** 哪些问题值得使用 Deep Research，哪些一次权威检索就够？
- **E12-8** 如何控制并发、迭代、Token、搜索预算与网页提示词注入风险？
### 补充考点
- **E12-9** Deep Research 的写作阶段要做什么？
- **E12-10** 判断研究来源是否可信时要注意什么？
- **E12-11** 评测 Deep Research 应该看哪些方面？
- **E12-12** Deep Research 怎样控制成本，在高风险领域有什么限制？
- **E12-13** 研究任务和普通问答有什么不同？Deep Research 在过程中动态决定哪些事？
