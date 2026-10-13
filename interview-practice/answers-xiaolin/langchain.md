# LangChain 框架 原文章节摘编

仅依据各题所列的小林面试笔记原文章节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分明确标注，不使用其他网站补充。整理日期：2026-10-13。

## 1. Agent 开发框架

原文：[1. 你了解过哪些 AI Agent 开发框架？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html)。

- **E1-1** 自己实现要接入模型、定义工具协议、实现 Agent 循环并把工具结果重新交给模型，还要处理状态、重试、超时、流式输出、人工确认和运行追踪；框架把这些重复工程抽象成可复用组件。[原文§Agent 框架解决了什么？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#agent-%E6%A1%86%E6%9E%B6%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E1-2** LangChain 提供常用组件和 Agent 高层接口，偏快速集成；LangGraph 用 State、Node、Edge 表达工作流，解决循环、条件分支、并行、持久化、暂停恢复和人工介入。LangChain 的 Agent 运行在 LangGraph 之上，二者是上下层关系，不是互相替代。[原文§LangGraph 和 LangChain 是什么关系？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#langgraph-%E5%92%8C-langchain-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB)
- **E1-3** 它强调在私有数据之上构建应用，长期积累了数据连接、文档解析、切分、索引、检索、重排、Query Engine 和结构化数据访问等能力，还能把 RAG Pipeline 封装成 Agent 使用的工具。[原文§LlamaIndex 强在哪里？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#llamaindex-%E5%BC%BA%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E1-4** 例如企业知识库 Agent：先用 LlamaIndex 处理文档、建立索引并提供检索结果，再把这项检索能力包装成 Tool，交给 LangChain Agent 决定何时调用；只是简单工具调用时不必为了技术栈完整而引入。[原文§三个框架怎么配合？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#%E4%B8%89%E4%B8%AA%E6%A1%86%E6%9E%B6%E6%80%8E%E4%B9%88%E9%85%8D%E5%90%88)
- **E1-5** OpenAI Agents SDK 适合以 OpenAI 模型和接口为主的轻量 Agent；CrewAI 用角色、目标、任务和团队表达多 Agent 协作；AutoGen、Semantic Kernel 等更偏微软生态或存量项目。原文建议了解它们的定位，按需深入。[原文§其他框架要了解吗？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#%E5%85%B6%E4%BB%96%E6%A1%86%E6%9E%B6%E8%A6%81%E4%BA%86%E8%A7%A3%E5%90%97)

### 补充考点

- **E1-6** 报销 Agent：必须先读取单据，再做合规检查；金额超过限制时暂停并等待主管审批；审批通过后才能调用付款工具。这类流程用图结构表达，比把所有逻辑塞进一个 Agent 循环更清晰。[原文§LangGraph 和 LangChain 是什么关系？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#langgraph-%E5%92%8C-langchain-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB)
- **E1-7** 用户提问后，系统要过滤和重排召回结果，并确保不同用户只能看到自己有权访问的数据；问题是沿着整条数据链路逐步出现的，这正是 LlamaIndex 最有辨识度的能力所在，不能把它简单理解成另一个 LangChain。[原文§LlamaIndex 强在哪里？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#llamaindex-%E5%BC%BA%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E1-8** 三者分别解决数据、Agent 组装和流程控制问题：外围如果还有查询改写、答案校验、人工审核和失败恢复，就让 LangGraph 负责这些步骤如何衔接，而不是在同一层重复造轮子。[原文§三个框架怎么配合？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#%E4%B8%89%E4%B8%AA%E6%A1%86%E6%9E%B6%E6%80%8E%E4%B9%88%E9%85%8D%E5%90%88)
- **E1-9** 先判断任务是否真的需要 Agent：步骤固定、规则明确的任务，用普通函数或工作流通常更便宜、更稳定；把本来能写成 if/else 的流程交给模型自由决定，只会平白增加不确定性。[原文§到底该怎么选？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#%E5%88%B0%E5%BA%95%E8%AF%A5%E6%80%8E%E4%B9%88%E9%80%89)
- **E1-10** 流程越长越要追问：中断后能否恢复，敏感动作是否需要审批，重复执行会不会产生副作用，不同用户的数据能否隔离，出错后是否留有完整轨迹；框架能不能用于生产，往往取决于这些原型阶段看不见的约束。[原文§到底该怎么选？](https://xiaolinnote.com/ai/langchain/agent_frameworks.html#%E5%88%B0%E5%BA%95%E8%AF%A5%E6%80%8E%E4%B9%88%E9%80%89)

## 2. Chain、Runnable、LCEL

原文：[2. 请你谈谈对 LangChain 中核心概念「Chain」的理解，以及它的核心作用与设计理念。](https://xiaolinnote.com/ai/langchain/chain.html)。

- **E2-1** 手写多步流程会出现大量胶水逻辑：各步的输入输出类型对不上，同步、异步、流式、重试和追踪又要分别改造；Chain 让每个组件暴露相对统一的接口，再按数据流接成一个可以整体调用的流程。[原文§为什么需要 Chain？](https://xiaolinnote.com/ai/langchain/chain.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-chain)
- **E2-2** Runnable 给 Prompt、模型、检索器和解析器提供统一的调用与组合接口，支持 invoke、batch、stream 及其异步版本；组合后的结果仍是 Runnable，可以继续嵌套，并能在同一抽象上附加配置、重试和降级。[原文§Runnable 解决了什么？](https://xiaolinnote.com/ai/langchain/chain.html#runnable-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E2-3** 顺序执行用 | 把 Runnable 接成 RunnableSequence。并行执行用 RunnableParallel 把同一个输入同时交给多条子链，各分支的结果按分支名汇合成字典，再交给后续步骤；在组合上下文中，字典也可自动转换为 RunnableParallel。 [原文§如何并行与汇合？](https://xiaolinnote.com/ai/langchain/chain.html#%E5%A6%82%E4%BD%95%E5%B9%B6%E8%A1%8C%E4%B8%8E%E6%B1%87%E5%90%88)
- **E2-4** 处理单个输入用 invoke，异步时用 ainvoke；输入是一批时用 batch；产品需要边生成边展示时用 stream，但前提是内部组件真正支持流式处理。[原文§Runnable 解决了什么？](https://xiaolinnote.com/ai/langchain/chain.html#runnable-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E2-5** 专用 Chain 类越来越多，各自的输入字段、返回结构和扩展方式不一致，难以自由拼装；LangChain v1 已把 LLMChain、SequentialChain 等旧 API 移入 langchain-classic，维护旧系统还能用，新项目应优先用 Runnable 与 LCEL。[原文§为什么弃用旧式 Chain？](https://xiaolinnote.com/ai/langchain/chain.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BC%83%E7%94%A8%E6%97%A7%E5%BC%8F-chain)
- **E2-6** 开发前就知道下一步去哪里，优先用 Chain，即 Runnable 加 LCEL；运行时要由模型决定下一步，用 Agent，官方推荐 create_agent；需要精确控制循环、分支、状态持久化、失败恢复和人工介入，用 LangGraph。[原文§三种编排方式怎么选？](https://xiaolinnote.com/ai/langchain/chain.html#%E4%B8%89%E7%A7%8D%E7%BC%96%E6%8E%92%E6%96%B9%E5%BC%8F%E6%80%8E%E4%B9%88%E9%80%89)
- **E2-7** 接口统一并形成清楚的流程结构后，重试、回退、标签、元数据和追踪这类横切能力可以复用：既可附着在某个 Runnable 上，也可作用于整条链，不需要每个业务函数各写一遍。[原文§为什么统一协议能不断扩展？](https://xiaolinnote.com/ai/langchain/chain.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%BB%9F%E4%B8%80%E5%8D%8F%E8%AE%AE%E8%83%BD%E4%B8%8D%E6%96%AD%E6%89%A9%E5%B1%95)

### 补充考点

- **E2-8** 核心理念是组合优于堆积封装：开发者只关注每一步做什么、数据怎么流动，框架负责把执行方式、配置、重试、回退和追踪等通用能力接到整条流程上。[原文§💡 简要回答](https://xiaolinnote.com/ai/langchain/chain.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **E2-9** 即使最简单的商品评价分类，也要先清洗输入、把变量填进 Prompt、调用模型、再把返回消息解析成字符串；流程变成问题改写、检索、文档整理、Prompt、模型、结构化解析之后，手工拼接就像用散落的电线临时接机器，每加一个零件都要重新确认接口能否接上。[原文§为什么需要 Chain？](https://xiaolinnote.com/ai/langchain/chain.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-chain)
- **E2-10** 不是。真实应用还会有并行分支和条件分支，例如问题一边送去检索、一边原样保留，再汇合到 Prompt；更准确的理解是 Chain 描述了一张事先确定好的数据流图，即使节点内部调用了输出不确定的 LLM，流程拓扑本身仍是开发者提前写好的。[原文§Chain 只能线性执行吗？](https://xiaolinnote.com/ai/langchain/chain.html#chain-%E5%8F%AA%E8%83%BD%E7%BA%BF%E6%80%A7%E6%89%A7%E8%A1%8C%E5%90%97)
- **E2-11** Runnable 像给不同组件定的一份插头标准，遵守它就能被统一调用和组合；两个组件接成一条小链后，这条小链又可以作为一个普通步骤接到更大的链里，就像乐高积木可以不断往上拼。[原文§Runnable 解决了什么？](https://xiaolinnote.com/ai/langchain/chain.html#runnable-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E2-12** 不能。前一步输出什么类型，后一步就必须能接住：ChatPromptTemplate 通常接收字典，Chat Model 接收格式化后的 Prompt Value 或消息，StrOutputParser 接收模型消息并输出字符串；类型接不上，链照样会在运行时报错。[原文§Runnable 解决了什么？](https://xiaolinnote.com/ai/langchain/chain.html#runnable-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E2-13** prompt | model | parser 声明的是三个 Runnable 的组合关系，LangChain 会据此构造一个 RunnableSequence，前一步的输出作为后一步的输入；它不是普通的 Python 管道。[原文§LCEL 不只是语法糖](https://xiaolinnote.com/ai/langchain/chain.html#lcel-%E4%B8%8D%E5%8F%AA%E6%98%AF%E8%AF%AD%E6%B3%95%E7%B3%96)
- **E2-14** RunnableSequence 会尽量保留各组件的流式能力，但中间某个组件不支持流式转换时，输出要等它完成后才能继续流出；例如普通 RunnableLambda 默认不实现流式转换，放错位置就可能推迟首个输出块。[原文§LCEL 不只是语法糖](https://xiaolinnote.com/ai/langchain/chain.html#lcel-%E4%B8%8D%E5%8F%AA%E6%98%AF%E8%AF%AD%E6%B3%95%E7%B3%96)
- **E2-15** 用 RunnableParallel 把同一个输入同时送到两条子链，例如对同一篇文章同时生成摘要和标题；在组合上下文中，字典也会被自动转换为 RunnableParallel，面试时建议先说显式类名，再补充字典简写。[原文§如何并行与汇合？](https://xiaolinnote.com/ai/langchain/chain.html#%E5%A6%82%E4%BD%95%E5%B9%B6%E8%A1%8C%E4%B8%8E%E6%B1%87%E5%90%88)
- **E2-16** 一是把 Chain 缩小成一次 LLM 调用或某个具体的 LLMChain 类，其实一次模型调用只是流程中的一个节点，旧类只是早期实现；二是把管道符当成魔法，LCEL 负责组合却不会猜测业务语义，输入输出不匹配时仍要用 RunnableLambda、RunnablePassthrough、itemgetter 或显式转换函数整理数据。[原文§哪些理解容易走偏？](https://xiaolinnote.com/ai/langchain/chain.html#%E5%93%AA%E4%BA%9B%E7%90%86%E8%A7%A3%E5%AE%B9%E6%98%93%E8%B5%B0%E5%81%8F)

## 3. LangChain 底层架构

原文：[3. LangChain 的底层架构与实现原理是什么？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html)。

- **E3-1** 主要是 Message、Tool 和 Runnable 等标准协议：Message 统一数据表达，Tool 划清模型与业务动作的边界，Runnable 统一执行方式。[原文§核心协议如何统一？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%A0%B8%E5%BF%83%E5%8D%8F%E8%AE%AE%E5%A6%82%E4%BD%95%E7%BB%9F%E4%B8%80)
- **E3-2** 不同厂商的消息格式、工具调用结构和流式响应各不相同；LangChain 在这些差异之上定义稳定接口，由厂商集成负责适配，应用只依赖公共协议，更换模型时不必改动业务代码里的厂商专属字段。[原文§LangChain 解决了什么？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#langchain-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88)
- **E3-3** 模型读取消息后生成 AIMessage：其中有 tool_calls 时，工具运行时执行对应工具，把结果包装成带调用 ID 的 ToolMessage 交回模型再次判断；没有工具调用时就是最终回答。create_agent 返回的是编译后的 LangGraph 图。[原文§Agent loop 如何运行？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#agent-loop-%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C)
- **E3-4** 模型一轮可能请求多个工具，工具结果必须通过调用 ID 与原请求对应，模型才知道每条结果属于哪次调用。[原文§Agent loop 如何运行？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#agent-loop-%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C)
- **E3-5** State 保存执行中不断变化的数据，如消息、当前步骤和工具结果；Context 是一次调用期间不变的可信依赖，如用户 ID、租户和权限，工具通过 Runtime 读取；Store 保存跨线程的数据，如用户偏好和长期事实。[原文§数据应该放在哪里？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E6%94%BE%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E3-6** 适合处理动态提示词、模型切换、工具筛选、重试、对话摘要、敏感信息和人工审批；它在模型和工具调用前后提供扩展点，例如调用工具前检查权限，敏感动作暂停等待审批。[原文§Middleware 做什么？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#middleware-%E5%81%9A%E4%BB%80%E4%B9%88)
- **E3-7** LangGraph 把流程建模为 State、Node、Edge，并用检查点保存每一步状态，因此支持中断恢复、人工介入、故障恢复和长时间运行；简单 Agent 直接用 create_agent，需要复杂分支、并行或审批时才直接编写 LangGraph。[原文§LangGraph 是什么角色？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#langgraph-%E6%98%AF%E4%BB%80%E4%B9%88%E8%A7%92%E8%89%B2)

### 补充考点

- **E3-8** 它更像一套面向 Agent 的分层开发框架，而不只是把 Prompt 串起来的 Chain 工具。[原文§💡 简要回答](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **E3-9** 集成适配层屏蔽模型、向量库和外部服务的差异，对应 langchain-openai 等独立集成包；可观测性贯穿各层，通过运行事件和 Trace 记录模型调用、工具调用、耗时和异常。[原文§架构分成几层？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%9E%B6%E6%9E%84%E5%88%86%E6%88%90%E5%87%A0%E5%B1%82)
- **E3-10** Runnable 提供 invoke、异步调用、批处理和流式输出等统一调用语义，步骤已经确定的流程可以用 LCEL 组合，每一步由开发者确定；Agent 则允许模型根据上下文决定是否调用工具以及下一步做什么。[原文§核心协议如何统一？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%A0%B8%E5%BF%83%E5%8D%8F%E8%AE%AE%E5%A6%82%E4%BD%95%E7%BB%9F%E4%B8%80)
- **E3-11** 运行时会区分不同类别的数据：可信的用户身份不需要让模型生成，数据库连接也不会写入对话上下文；工具可以通过 Runtime 读取这些数据，同时只把真正需要模型填写的参数暴露在工具 Schema 里。[原文§数据应该放在哪里？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E6%94%BE%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E3-12** 进程退出后中间状态容易丢失，也很难在敏感工具前暂停几小时再继续；这正是 LangGraph 作为底层运行时要解决的问题。[原文§LangGraph 是什么角色？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#langgraph-%E6%98%AF%E4%BB%80%E4%B9%88%E8%A7%92%E8%89%B2)
- **E3-13** 它们和部分旧式 Agent 执行器已经进入 langchain-classic，可以用于维护存量项目并渐进迁移，但不再代表 LangChain v1 的主架构。[原文§旧版 Chain 还能用吗？](https://xiaolinnote.com/ai/langchain/langchain_architecture.html#%E6%97%A7%E7%89%88-chain-%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)

## 4. 构建一个 Agent

原文：[4. 使用 LangChain 构建 Agent 的核心步骤是什么？](https://xiaolinnote.com/ai/langchain/build_agent.html)。

- **E4-1** 任务边界会继续决定后面的工具、Prompt 和测试用例；边界模糊时模型只能猜什么行为算正确，后面再精细的工程配置也补不回来。要先定义目标和允许的动作，划出禁止动作与权限边界，并约定成功、失败、停止和转人工的条件。[原文§第一步：明确任务边界](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%A1%AE%E4%BB%BB%E5%8A%A1%E8%BE%B9%E7%95%8C)
- **E4-2** 模型需要支持项目所需的工具调用、结构化输出和上下文长度：模型负责判断和规划，访问数据库、搜索资料、发送消息这些动作由 Tool 执行，所以模型必须能可靠地发起工具调用。[原文§第二步：选择模型与 Tools](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%BA%8C%E6%AD%A5-%E9%80%89%E6%8B%A9%E6%A8%A1%E5%9E%8B%E4%B8%8E-tools)
- **E4-3** Tool 应职责单一、名称清楚、输入输出容易理解，参数带类型与范围约束；因为模型主要依靠名称、描述和参数 Schema 判断能不能调用，一个工具同时负责查询、退款和通知就更容易选错动作。[原文§第二步：选择模型与 Tools](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%BA%8C%E6%AD%A5-%E9%80%89%E6%8B%A9%E6%A8%A1%E5%9E%8B%E4%B8%8E-tools)
- **E4-4** system_prompt 说明角色、目标、信息边界、工具规则和失败策略；response_format 在结果还要进入前端、工单或后续工作流时定义结构化输出，约束字段和类型，但不能保证业务事实正确。[原文§第三步：约束行为与输出](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E7%BA%A6%E6%9D%9F%E8%A1%8C%E4%B8%BA%E4%B8%8E%E8%BE%93%E5%87%BA)
- **E4-5** Checkpointer 配合稳定的 thread_id 保存线程状态，让同一线程可以续接并在中断后恢复；Store 保存跨线程的用户偏好和长期事实，用 namespace 和 key 隔离租户与用户；Middleware 承接重试、摘要、权限和审批这类横切逻辑。[原文§第五步：补齐状态与安全](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%BA%94%E6%AD%A5-%E8%A1%A5%E9%BD%90%E7%8A%B6%E6%80%81%E4%B8%8E%E5%AE%89%E5%85%A8)
- **E4-6** Tool 单测检查正常输入、非法参数、权限错误、超时和幂等性；Agent 轨迹测试检查是否选对工具、参数是否正确、有无越权调用、结构化输出是否符合 Schema；上线后通过 Trace 观察模型调用、工具调用、延迟、Token、失败率和人工转接率。[原文§第七步：测试与监控](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%B8%83%E6%AD%A5-%E6%B5%8B%E8%AF%95%E4%B8%8E%E7%9B%91%E6%8E%A7)
- **E4-7** 短任务、后台任务或只等最终结果时用 invoke；并发 I/O 和异步 Web 服务用异步调用；长任务需要展示 Token、步骤或工具进度时用 stream。流式只改善等待体验，超时、取消、并发限制和缓存仍要单独设计。[原文§第六步：选择调用方式](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E5%85%AD%E6%AD%A5-%E9%80%89%E6%8B%A9%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F)

### 补充考点

- **E4-8** create_agent 组装模型、工具、提示词和输出格式；它底层使用 LangGraph，在模型判断、工具执行和工具结果回传之间循环。[原文§💡 简要回答](https://xiaolinnote.com/ai/langchain/build_agent.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **E4-9** 它可以查询订单和解释物流状态，但不能自行退款；订单不存在、身份验证失败或用户要求高风险操作时必须转人工；最终输出要包含答复、订单状态和是否转人工。[原文§第一步：明确任务边界](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%A1%AE%E4%BB%BB%E5%8A%A1%E8%BE%B9%E7%95%8C)
- **E4-10** 它们仍可能出现在存量项目中，但 LangChain v1 的新项目应优先使用 create_agent。[原文§第四步：组装 Agent](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E5%9B%9B%E6%AD%A5-%E7%BB%84%E8%A3%85-agent)
- **E4-11** 必须具备幂等、最小权限和审计能力；自动重试不能导致重复扣款或重复发信。[原文§第五步：补齐状态与安全](https://xiaolinnote.com/ai/langchain/build_agent.html#%E7%AC%AC%E4%BA%94%E6%AD%A5-%E8%A1%A5%E9%BD%90%E7%8A%B6%E6%80%81%E4%B8%8E%E5%AE%89%E5%85%A8)

## 5. 注册 Tool

原文：[5. 在 LangChain 中，如何为 Agent 注册工具？](https://xiaolinnote.com/ai/langchain/tool_registration.html)。

- **E5-1** 模型侧得到一份工具说明：name 和 description 用来判断什么时候使用，args_schema 用来生成参数；运行时侧得到真正执行的函数或协程。模型生成调用请求，运行时执行后把结果作为 ToolMessage 返回给模型。[原文§Tool 注册了什么？](https://xiaolinnote.com/ai/langchain/tool_registration.html#tool-%E6%B3%A8%E5%86%8C%E4%BA%86%E4%BB%80%E4%B9%88)
- **E5-2** 函数能说清楚用途就直接传普通函数；需要明确 Schema 时用 @tool；原函数不能修改或需要在运行时组装时用 StructuredTool；工具要长期持有客户端、管理资源和生命周期时才考虑继承 BaseTool。[原文§何时使用高级定义？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E9%AB%98%E7%BA%A7%E5%AE%9A%E4%B9%89)
- **E5-3** @tool 会从函数签名和 docstring 自动推导 Schema；直接传函数时也必须有清楚的名称、类型注解和 docstring，否则自动生成的工具说明很难指导模型正确调用。[原文§为什么优先使用 @tool？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%98%E5%85%88%E4%BD%BF%E7%94%A8-tool)
- **E5-4** 如果把 user_id 放进模型可见的 Schema，模型可能填错用户，也可能被恶意提示诱导去查询其他账户；这类可信参数应由应用运行时注入，而不是由模型生成。[原文§可信参数如何注入？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E5%8F%AF%E4%BF%A1%E5%8F%82%E6%95%B0%E5%A6%82%E4%BD%95%E6%B3%A8%E5%85%A5)
- **E5-5** 工具声明 ToolRuntime 参数后模型看不到它：用户身份、租户和依赖从 runtime.context 读取，当前会话消息和短期状态在 runtime.state，跨会话仍要保留的长期数据在 runtime.store。[原文§可信参数如何注入？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E5%8F%AF%E4%BF%A1%E5%8F%82%E6%95%B0%E5%A6%82%E4%BD%95%E6%B3%A8%E5%85%A5)
- **E5-6** 只有网络超时、限流等临时故障才做有上限的重试，并同时设置退避和总超时；参数错误先由 Schema 拦截再让模型重填，业务拒绝要把原因说清楚，程序 Bug 不应被统一吞掉；有副作用的工具还要设计幂等键和人工审批。[原文§错误应该怎么处理？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E9%94%99%E8%AF%AF%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)

### 补充考点

- **E5-7** Web Search、代码执行器等服务端工具有时使用厂商约定的字典配置，属于特定 Provider 的能力，使用时应单独查看对应的集成文档，不需要把它当作通用 Python Tool 的主要定义方式。[原文§常用方式怎么选？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E5%B8%B8%E7%94%A8%E6%96%B9%E5%BC%8F%E6%80%8E%E4%B9%88%E9%80%89)
- **E5-8** 搜索、数据库和远程 API 属于 I/O 密集型操作，底层客户端支持异步时，工具应使用原生 async def，并通过 ainvoke 或异步流式接口调用；只把函数声明成 async、内部却仍调用阻塞式 HTTP 客户端，不会提高并发能力。[原文§异步工具怎么处理？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E5%BC%82%E6%AD%A5%E5%B7%A5%E5%85%B7%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **E5-9** 调用前看名称和描述是否会与其他工具混淆，Schema 是否限制了枚举、范围和必填字段；进入执行阶段后，确认用户身份和权限来自可信的 Runtime 而不是模型参数，远程调用要有超时、重试上限和并发限制，会改变外部状态的动作还要补上幂等、审批与审计。[原文§注册后还要检查什么？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E6%B3%A8%E5%86%8C%E5%90%8E%E8%BF%98%E8%A6%81%E6%A3%80%E6%9F%A5%E4%BB%80%E4%B9%88)
- **E5-10** 日志与 Trace 要能帮助排查错误，但不能记录密钥、完整身份凭证或不必要的敏感数据；从模型选择、业务执行到事后追踪都覆盖，工具契约才算闭环。[原文§注册后还要检查什么？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E6%B3%A8%E5%86%8C%E5%90%8E%E8%BF%98%E8%A6%81%E6%A3%80%E6%9F%A5%E4%BB%80%E4%B9%88)
- **E5-11** 不是。一次性暴露大量相似工具，会增加选择错误和参数混淆的概率；更合理的做法是根据用户权限和当前任务动态缩小工具集合。[原文§注册后还要检查什么？](https://xiaolinnote.com/ai/langchain/tool_registration.html#%E6%B3%A8%E5%86%8C%E5%90%8E%E8%BF%98%E8%A6%81%E6%A3%80%E6%9F%A5%E4%BB%80%E4%B9%88)

## 6. 短期与长期记忆

原文：[6. LangChain 如何实现短期记忆和长期记忆？](https://xiaolinnote.com/ai/langchain/memory.html)。

- **E6-1** Agent State 保存消息以及订单号、当前步骤等业务字段；Checkpointer 把 State 快照持久化；调用时传入稳定的 thread_id，同一编号就能恢复同一线程的对话和执行状态，还能支撑暂停恢复、人工审批和故障恢复。[原文§短期记忆如何实现？](https://xiaolinnote.com/ai/langchain/memory.html#%E7%9F%AD%E6%9C%9F%E8%AE%B0%E5%BF%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **E6-2** 新 thread_id 默认不会继承旧线程的 State；Store 用 namespace 加 key 定位数据，namespace 通常包含租户、用户和记忆类型，不绑定线程；已知 key 时精确读取，也可以配置向量索引按语义搜索。[原文§长期记忆如何实现？](https://xiaolinnote.com/ai/langchain/memory.html#%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **E6-3** 应用把已认证的 user_id 通过 Context 注入，工具经 ToolRuntime 从 runtime.store 读取该用户 namespace 下的长期记忆；user_id 不由模型填写，其他用户则由 namespace 和服务端权限隔离。[原文§如何跨线程读取？](https://xiaolinnote.com/ai/langchain/memory.html#%E5%A6%82%E4%BD%95%E8%B7%A8%E7%BA%BF%E7%A8%8B%E8%AF%BB%E5%8F%96)
- **E6-4** 裁剪只选择部分消息进入本次模型上下文，持久状态仍会继续增长；删除是从 State 中永久移除旧消息，信息不可恢复；摘要把早期历史压缩成简短摘要，可能遗漏细节或逐轮失真。[原文§消息太多怎么办？](https://xiaolinnote.com/ai/langchain/memory.html#%E6%B6%88%E6%81%AF%E5%A4%AA%E5%A4%9A%E6%80%8E%E4%B9%88%E5%8A%9E)
- **E6-5** 用户明确要求记住的信息可以实时写入；从普通对话推断出的偏好更适合会话结束后提炼、去重和脱敏再入库。记忆要保存来源、时间与置信度，支持更新、纠错、删除和过期淘汰。敏感信息默认不记，确需保存时加密并限制访问，日志也避免泄露；订单金额等实时事实仍查权威业务系统。 [原文§什么时候写入长期记忆？](https://xiaolinnote.com/ai/langchain/memory.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%86%99%E5%85%A5%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86) [原文§生产环境要注意什么](https://xiaolinnote.com/ai/langchain/memory.html#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **E6-6** ConversationBufferMemory 等属于 Chain 时代的抽象，目前主要位于 langchain-classic，适合维护存量项目；v1 更推荐用 AgentState 加 Checkpointer 管理线程内状态、Store 管理跨线程长期记忆、Middleware 或图节点管理裁剪、摘要和写入策略。[原文§旧 Memory 还能用吗？](https://xiaolinnote.com/ai/langchain/memory.html#%E6%97%A7-memory-%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)

### 补充考点

- **E6-7** InMemorySaver 只适合本地演示；生产环境要换成持久化实现，否则进程退出后状态会丢失。[原文§短期记忆如何实现？](https://xiaolinnote.com/ai/langchain/memory.html#%E7%9F%AD%E6%9C%9F%E8%AE%B0%E5%BF%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **E6-8** 不同业务要保护的内容不同：客服 Agent 要保护当前工单和对用户的承诺，代码 Agent 要保护最新报错和修改记录；所以应结合 Token 预算、消息角色和业务重要性来制定策略。[原文§消息太多怎么办？](https://xiaolinnote.com/ai/langchain/memory.html#%E6%B6%88%E6%81%AF%E5%A4%AA%E5%A4%9A%E6%80%8E%E4%B9%88%E5%8A%9E)
- **E6-9** 不是。把每句闲聊都存进去会产生噪声、冲突和隐私风险；写入前要做去重、脱敏、冲突处理和质量判断，而不是把每段原始对话都永久保存。[原文§什么时候写入长期记忆？](https://xiaolinnote.com/ai/langchain/memory.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%86%99%E5%85%A5%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86) [原文§长期记忆如何实现](https://xiaolinnote.com/ai/langchain/memory.html#%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **E6-10** thread_id、tenant_id 和 user_id 必须来自可信的身份体系，不能相信模型生成的身份，也不能让客户端随意指定另一个用户的 namespace；否则记得越多，越容易造成跨用户数据泄露。线上还需要数据库型的 Checkpointer 和 Store。[原文§生产环境要注意什么？](https://xiaolinnote.com/ai/langchain/memory.html#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **E6-11** 不能只看成功写入多少条，要沿整条链路检查：这条信息是否值得写入，相关问题能否召回，无关问题会不会误召回，注入模型后是否真正改善答案；写入、召回和使用三步都有效才算有用。[原文§生产环境要注意什么？](https://xiaolinnote.com/ai/langchain/memory.html#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)

## 7. LangChain 与 LlamaIndex

原文：[7. LangChain 和 LlamaIndex 有什么区别？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html)。

- **E7-1** 都能。原文称 LangChain 也有完整的 RAG 组件，LlamaIndex 也能创建 Agent；差别在优势重心，前者偏通用 Agent 组装和工具集成，后者偏数据接入与上下文增强。[原文§核心区别是什么？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E6%A0%B8%E5%BF%83%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **E7-2** 优先评估 LangChain；原文选型表给的原因是它的通用组件和工具接口更自然。[原文§应该如何选型？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E5%BA%94%E8%AF%A5%E5%A6%82%E4%BD%95%E9%80%89%E5%9E%8B)
- **E7-3** 优先评估 LlamaIndex；原文选型表给的原因是它对数据与上下文链路的抽象更细。[原文§应该如何选型？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E5%BA%94%E8%AF%A5%E5%A6%82%E4%BD%95%E9%80%89%E5%9E%8B)
- **E7-4** 由 LlamaIndex 负责加载数据、构建索引和实现 Query Engine，对外暴露一个查询企业知识库的函数，再包装成 LangChain Tool，由 LangChain Agent 判断什么时候调用；生产环境还要补充租户权限、引用来源、超时和可观测性。[原文§两者如何组合？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E4%B8%A4%E8%80%85%E5%A6%82%E4%BD%95%E7%BB%84%E5%90%88)

### 补充考点

- **E7-5** 两个框架都支持模型调用、Tools、RAG、Agent 和 Workflow，按功能清单比较，很容易得出它们差不多的结论。[原文§为什么容易混淆？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%B9%E6%98%93%E6%B7%B7%E6%B7%86)
- **E7-6** 项目要接入多个模型、搜索、数据库、浏览器、MCP Server 和内部 API 时，最大的成本是接口适配；LangChain 用相对统一的 Model、Message、Tool 和 Structured Output 接口屏蔽差异，用 create_agent 组装，Middleware 统一加入权限、重试、摘要、动态模型选择和人工审批，流程复杂后还能下沉到 LangGraph。[原文§LangChain 强在哪里？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#langchain-%E5%BC%BA%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E7-7** 它把如何得到高质量上下文当作核心工程问题：从处理 PDF 表格、跨页内容、切分和元数据，到决定走向量、关键词还是结构化检索，再到过滤、重排和处理冲突，难点沿着数据进入、建立索引、发起检索、组织上下文一路传递；企业文档、多数据源路由和复杂检索是它更自然的入口。[原文§LlamaIndex 强在哪里？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#llamaindex-%E5%BC%BA%E5%9C%A8%E5%93%AA%E9%87%8C)
- **E7-8** 只是简单知识库或单工具 Agent 时，没有必要为了架构完整同时引入两套框架；组合会增加依赖、追踪和调试成本，只有数据层和 Agent 编排层确实各自存在独立难题时才值得。[原文§应该如何选型？](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E5%BA%94%E8%AF%A5%E5%A6%82%E4%BD%95%E9%80%89%E5%9E%8B)
- **E7-9** 被框架名字或早期教程限制住：LangChain 并不只会把 Prompt 串成 Chain，当前主线已经转向 Agent，固定流程继续由 Runnable 和 LCEL 承担；两边能力有重叠，也不能推导出必须二选一或最好全部引入。[原文§常见误区](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html#%E5%B8%B8%E8%A7%81%E8%AF%AF%E5%8C%BA)

## 8. LangChain4j

原文：[8. 请你谈谈 LangChain4j 这类 Java 生态的 LangChain 衍生框架，主要帮开发者解决了哪些核心问题？它的核心适用场景是什么？](https://xiaolinnote.com/ai/langchain/langchain4j.html)。

- **E8-1** 不是。原文称它是从 Java 习惯出发设计的 JVM 开源库，API、内部实现和发布周期都独立于 Python LangChain，只是吸收了 LLM 应用生态中的通用模式，而不是逐项复刻。[原文§它是 LangChain 的 Java 版吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E5%AE%83%E6%98%AF-langchain-%E7%9A%84-java-%E7%89%88%E5%90%97)
- **E8-2** 直接调用各家 SDK 时，认证方式、请求对象、消息格式、流式回调和异常类型都不同；这些接口让业务代码依赖核心抽象，把模型和向量库的变化关在适配层里，单元测试可以替换模型实现，换向量库也不用推翻上层流程。[原文§统一接口能抹平所有差异吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E7%BB%9F%E4%B8%80%E6%8E%A5%E5%8F%A3%E8%83%BD%E6%8A%B9%E5%B9%B3%E6%89%80%E6%9C%89%E5%B7%AE%E5%BC%82%E5%90%97)
- **E8-3** 开发者声明一个 Java 接口，LangChain4j 在运行时提供代理实现：框架负责把方法参数变成消息，再把模型响应转换成方法的返回值，类似 Spring Data JPA 的用法。[原文§AI Services 解决什么问题？](https://xiaolinnote.com/ai/langchain/langchain4j.html#ai-services-%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **E8-4** 通过 @Tool 暴露对象方法，框架把工具说明和参数 Schema 发给模型，再由应用执行模型选中的 Java 方法；安全上要做用户与租户校验、幂等和额度控制、审批与审计，工具异常也不应把堆栈、路径或敏感信息原样回传给模型。[原文§Tools 如何连接业务动作？](https://xiaolinnote.com/ai/langchain/langchain4j.html#tools-%E5%A6%82%E4%BD%95%E8%BF%9E%E6%8E%A5%E4%B8%9A%E5%8A%A1%E5%8A%A8%E4%BD%9C)
- **E8-5** Chat Memory 保存的是下一次要喂给模型的上下文，可以被淘汰、压缩或注入；完整聊天记录是产品展示和审计所需的事实记录。原文称 LangChain4j 提供的是 memory，不替应用保存完整的 history。[原文§Chat Memory 等于聊天档案吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#chat-memory-%E7%AD%89%E4%BA%8E%E8%81%8A%E5%A4%A9%E6%A1%A3%E6%A1%88%E5%90%97)
- **E8-6** 因为抽象只能覆盖各家的交集：某个模型是否支持工具调用、原生 JSON Schema、图片输入或特殊采样参数，仍要查能力矩阵；切换供应商后 Prompt 效果、Token 计算、限流、异常处理和评测基线也要重新验证。[原文§统一接口能抹平所有差异吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E7%BB%9F%E4%B8%80%E6%8E%A5%E5%8F%A3%E8%83%BD%E6%8A%B9%E5%B9%B3%E6%89%80%E6%9C%89%E5%B7%AE%E5%BC%82%E5%90%97)
- **E8-7** 适合已有大量 Java 服务、想把 AI 能力嵌入现有系统的团队，例如企业知识库问答、带会话上下文的智能客服、从合同和简历中抽取结构化字段、让模型查询订单或创建工单；领域服务、权限和审计已经写在 Java 中时尤其合适。[原文§什么时候适合 LangChain4j？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E9%80%82%E5%90%88-langchain4j)
- **E8-8** 可观测性通过监听入口采集各阶段的请求、响应、耗时和错误，便于沿调用链排查；Guardrails 在模型调用前后校验输入和输出。两者仍被标为实验性且只适用于 AI Services，不能替代认证、授权、数据隔离、资金风控和审计。[原文§可观测性与 Guardrails 的边界](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7%E4%B8%8E-guardrails-%E7%9A%84%E8%BE%B9%E7%95%8C)

### 补充考点

- **E8-9** 官方生态能融入 Spring Boot、Quarkus、Helidon 和 Micronaut，复用依赖注入、配置、测试和监控体系；但选型要看模块成熟度，官方仍有带 beta 后缀的模块，Guardrails 和 AI Service Observability 也标注为实验性。[原文§💡 简要回答](https://xiaolinnote.com/ai/langchain/langchain4j.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **E8-10** 可以理解成自己组零件和直接调用装修好的服务台：需要精细控制时在低层直接操作模型、消息、Embedding 和存储，更关心业务接口时在高层用 AI Services 把零件组合起来；官方文档已把旧式 Chains 标为 legacy，新项目不应把 ConversationalChain 当主入口。[原文§它是 LangChain 的 Java 版吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E5%AE%83%E6%98%AF-langchain-%E7%9A%84-java-%E7%89%88%E5%90%97)
- **E8-11** 不能。LangChain4j 可以自动生成 Schema 并解析响应，但反序列化成功只说明数据形状对得上，不代表金额、权限和订单状态符合业务规则，确定性的业务校验不能交给模型。[原文§AI Services 解决什么问题？](https://xiaolinnote.com/ai/langchain/langchain4j.html#ai-services-%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **E8-12** 不要在多处手填版本；官方推荐通过 langchain4j-bom 管理模块版本，再从 Release Notes 里选经过验证的版本，避免核心包、模型集成和 Spring Starter 版本互相错位。[原文§AI Services 解决什么问题？](https://xiaolinnote.com/ai/langchain/langchain4j.html#ai-services-%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **E8-13** 一次调用中可能发生多轮模型到工具再到模型的循环，直到拿到最终结果；模型只负责提出调用请求，真正执行的是 Java 应用。[原文§Tools 如何连接业务动作？](https://xiaolinnote.com/ai/langchain/langchain4j.html#tools-%E5%A6%82%E4%BD%95%E8%BF%9E%E6%8E%A5%E4%B8%9A%E5%8A%A1%E5%8A%A8%E4%BD%9C)
- **E8-14** 常用实现有按消息数淘汰的 MessageWindowChatMemory 和按 Token 窗口淘汰的 TokenWindowChatMemory；默认把消息放在内存里，需要持久化时实现 ChatMemoryStore 接到数据库；多用户用 @MemoryId 和 ChatMemoryProvider 隔离会话，同一个 MemoryId 不应被并发调用，分布式并发控制是应用的责任。[原文§Chat Memory 等于聊天档案吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#chat-memory-%E7%AD%89%E4%BA%8E%E8%81%8A%E5%A4%A9%E6%A1%A3%E6%A1%88%E5%90%97)
- **E8-15** 不应该靠无限增大消息窗口。用户偏好、历史事实或企业知识，通常应结构化存入业务数据库，或者做成可检索的知识，再通过 RAG 注入。[原文§Chat Memory 等于聊天档案吗？](https://xiaolinnote.com/ai/langchain/langchain4j.html#chat-memory-%E7%AD%89%E4%BA%8E%E8%81%8A%E5%A4%A9%E6%A1%A3%E6%A1%88%E5%90%97)
- **E8-16** 它提供从文档加载、解析、切分、Embedding、向量存储到在线检索和注入的一组组件：简单知识库把一个检索器直接交给 AI Service；需要查询改写、多路检索、融合、重排和上下文注入时，用 RetrievalAugmentor 组合这些阶段，底层来源还可以是全文搜索、Web 搜索、知识图谱或业务数据库。[原文§RAG 不只是连接向量库](https://xiaolinnote.com/ai/langchain/langchain4j.html#rag-%E4%B8%8D%E5%8F%AA%E6%98%AF%E8%BF%9E%E6%8E%A5%E5%90%91%E9%87%8F%E5%BA%93)
- **E8-17** 框架只提供积木，文档质量、切分策略、召回率、权限过滤、引用溯源和离线评测仍然决定最终效果。[原文§RAG 不只是连接向量库](https://xiaolinnote.com/ai/langchain/langchain4j.html#rag-%E4%B8%8D%E5%8F%AA%E6%98%AF%E8%BF%9E%E6%8E%A5%E5%90%91%E9%87%8F%E5%BA%93)
- **E8-18** 最自然的做法是沿用它的配置、依赖注入和监控体系：Starter 可以自动创建常用 Bean，也能用 @AiService 声明 AI Service；接入或升级时，再根据项目的 Spring Boot 大版本选择对应依赖。[原文§Java 生态如何集成？](https://xiaolinnote.com/ai/langchain/langchain4j.html#java-%E7%94%9F%E6%80%81%E5%A6%82%E4%BD%95%E9%9B%86%E6%88%90)
- **E8-19** 项目深度依赖某家模型刚发布的专属能力时，直接用 SDK 往往更早暴露完整参数；要做跨小时运行、可暂停恢复、强事务补偿的复杂流程时，不能只依赖模型工具循环，还要结合工作流引擎、消息系统或图编排方案。[原文§什么时候适合 LangChain4j？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E9%80%82%E5%90%88-langchain4j)
- **E8-20** 关键看团队原有技术栈：以 Spring 为中心可重点比较 Spring AI，已采用 Microsoft AI 技术栈可评估 Semantic Kernel，Quarkus 项目优先看 Quarkus LangChain4j。选型时做一个小型真实 PoC，用同一批问题验证回答质量、工具参数准确率、结构化输出成功率、延迟、Token 成本、监控完整度和故障恢复。[原文§什么时候适合 LangChain4j？](https://xiaolinnote.com/ai/langchain/langchain4j.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E9%80%82%E5%90%88-langchain4j)

## 9. LangChain 与 LangGraph

原文：[9. 请你详细说说 LangChain 和 LangGraph 的核心区别是什么？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html)。

- **E9-1** LangChain 是高层 Agent 框架，LangGraph 是更低层的编排框架与运行时；create_agent 会构建一个基于 LangGraph 的图运行时，Agent 在模型节点和工具节点之间循环，检查点、流式事件、中断与执行都由底层运行时提供。[原文§两者处于同一层吗？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E4%B8%A4%E8%80%85%E5%A4%84%E4%BA%8E%E5%90%8C%E4%B8%80%E5%B1%82%E5%90%97)
- **E9-2** Middleware 用来改造标准 Agent loop，围绕 Agent、模型和工具的生命周期插入逻辑，例如动态提示词、裁剪消息、重试和人工审批；LangGraph 的节点和边处理更一般的流程结构，可以分流到不同子流程、并行后再汇合，步骤甚至可以完全不使用 LLM。[原文§Middleware 与图编排有何不同？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#middleware-%E4%B8%8E%E5%9B%BE%E7%BC%96%E6%8E%92%E6%9C%89%E4%BD%95%E4%B8%8D%E5%90%8C)
- **E9-3** 不是。create_agent 本身就不是一条直线：模型可能直接结束，也可能请求工具，工具执行后又回到模型继续决策，构成条件路由加循环，多个工具调用还可能并行执行。[原文§LangChain 只能线性执行吗？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#langchain-%E5%8F%AA%E8%83%BD%E7%BA%BF%E6%80%A7%E6%89%A7%E8%A1%8C%E5%90%97)
- **E9-4** 当需求从一个 Agent loop 扩展成完整业务流程时：确定性规则与模型决策交替出现，多条路径要并行再汇合，任务要跨小时或跨天暂停恢复，需要多个 Agent 协作，或者必须精确控制失败补偿和人工节点。[原文§什么时候下沉 LangGraph？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%B8%8B%E6%B2%89-langgraph)
- **E9-5** 能。原文称 create_agent 返回的完整 Agent 可以作为节点或子图放进更大的 StateGraph，它的 middleware 会跟着一起工作，这是两层组合而不是二选一。[原文§Middleware 与图编排有何不同？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#middleware-%E4%B8%8E%E5%9B%BE%E7%BC%96%E6%8E%92%E6%9C%89%E4%BD%95%E4%B8%8D%E5%90%8C)
- **E9-6** LangChain Agent 用 stream 或 stream_events 输出模型消息、Agent 步骤和工具发出的自定义进度；LangGraph 在更低层暴露 values、updates、messages、custom、checkpoints、tasks 和 debug 等事件类型，还能处理子图命名空间。[原文§流式输出能看到多深？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA%E8%83%BD%E7%9C%8B%E5%88%B0%E5%A4%9A%E6%B7%B1)

### 补充考点

- **E9-7** 不是，它们是上下层关系：LangChain 给我们一套装好的 Agent，框架已经搭好常见 Agent 的拓扑，开发者主要配置零件和生命周期钩子；LangGraph 让我们自己设计整条业务路线，节点怎么拆、状态怎么更新、下一步去哪都由开发者决定。[原文§两者处于同一层吗？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E4%B8%A4%E8%80%85%E5%A4%84%E4%BA%8E%E5%90%8C%E4%B8%80%E5%B1%82%E5%90%97)
- **E9-8** Chain 并不只能顺序执行，LCEL 也能通过并行和分支 Runnable 表达并发与条件选择；LangChain 能表达分支和循环，但高层 Agent API 主要围绕通用的模型与工具循环组织，LangGraph 则把业务拓扑变成一等公民，让开发者直接拥有整个工作流的拓扑控制权。[原文§LangChain 只能线性执行吗？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#langchain-%E5%8F%AA%E8%83%BD%E7%BA%BF%E6%80%A7%E6%89%A7%E8%A1%8C%E5%90%97)
- **E9-9** LangChain 为常见 Agent 准备了以 messages 为核心的 AgentState，消息、工具调用和结果都追加进去，可用 TypedDict 扩展字段，并推荐由相关 middleware 声明自己需要的状态；LangGraph 让状态设计成为工作流架构的一部分，可以区分输入、输出和内部 Schema，节点只返回局部更新。[原文§State：默认状态与自由建模](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#state-%E9%BB%98%E8%AE%A4%E7%8A%B6%E6%80%81%E4%B8%8E%E8%87%AA%E7%94%B1%E5%BB%BA%E6%A8%A1)
- **E9-10** 多个节点并行或多次更新同一个字段时，例如几个研究节点同时写入 evidence，我们希望追加结果，而不是让后写入的覆盖前一份；所以合并语义必须在 State 里提前定义，由 reducer 决定如何合并。[原文§State：默认状态与自由建模](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#state-%E9%BB%98%E8%AE%A4%E7%8A%B6%E6%80%81%E4%B8%8E%E8%87%AA%E7%94%B1%E5%BB%BA%E6%A8%A1)
- **E9-11** Checkpointer 按 thread_id 保存图状态快照，适合线程内的短期记忆、人工介入、时间旅行和故障恢复；Store 保存图状态之外、跨线程可读取的业务数据，适合用户偏好、事实和共享知识等长期记忆。[原文§谁提供持久化与记忆？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E8%B0%81%E6%8F%90%E4%BE%9B%E6%8C%81%E4%B9%85%E5%8C%96%E4%B8%8E%E8%AE%B0%E5%BF%86)
- **E9-12** 不对。LangChain 的 create_agent 会把 checkpointer 和 store 交给底层图，所以 LangChain Agent 同样能获得短期记忆、长期记忆和恢复能力；另外 durable execution 也不只是把数据存进数据库，长流程失败后如果从头重跑发邮件、扣款等副作用，业务仍可能出事故。[原文§谁提供持久化与记忆？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E8%B0%81%E6%8F%90%E4%BE%9B%E6%8C%81%E4%B9%85%E5%8C%96%E4%B8%8E%E8%AE%B0%E5%BF%86)
- **E9-13** 需求只是模型想执行某个工具前先让人确认时，HumanInTheLoopMiddleware 已经合适，它在工具执行前暂停，接受批准、修改、拒绝或人工直接回复；人工节点不只是审批工具时，例如让审核员补充字段、等一周后再继续、多位审核人分别填写意见再按票数路由，就需要图编排。[原文§人工介入有什么区别？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E4%BA%BA%E5%B7%A5%E4%BB%8B%E5%85%A5%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **E9-14** 不是。LangSmith 承担 tracing、evaluation、Studio 和 Deployment 等平台能力，既能观察 LangChain Agent，也能观察直接编写的 LangGraph，还支持其他框架接入；两者都能部署到 Agent Server 体系或自行托管，是否用托管平台是部署选择，是否用高层 Agent API 是开发抽象选择，不能混为一谈。[原文§部署与调试如何分工？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E9%83%A8%E7%BD%B2%E4%B8%8E%E8%B0%83%E8%AF%95%E5%A6%82%E4%BD%95%E5%88%86%E5%B7%A5)
- **E9-15** 需求可以自然表达成给模型一组工具、让它循环调用直到完成任务时，优先从 create_agent 开始，客服问答、数据库查询助手和内部知识助手大多属于这类；LangGraph 更底层不代表更高级，控制权越大，要自己设计和测试的状态、路由、恢复与副作用就越多，用几十个节点重搭一个标准 Agent 未必更可靠。[原文§什么时候下沉 LangGraph？](https://xiaolinnote.com/ai/langchain/langchain_vs_langgraph.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%B8%8B%E6%B2%89-langgraph)

## 10. LangGraph 的优势

原文：[10. LangGraph 相比于 LangChain 有哪些核心优势？更适配哪些 Agent 场景？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html)。

- **E10-1** 为了让确定性规则与模型决策各在其位：需要模型判断的步骤交给 Agent，权限、金额阈值、审批顺序和结束条件写成节点与边；图结构直接决定执行，包括哪些节点并行、哪份状态被保存、恢复后从哪里继续。[原文§为什么要把流程与状态摊开？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A%E6%B5%81%E7%A8%8B%E4%B8%8E%E7%8A%B6%E6%80%81%E6%91%8A%E5%BC%80)
- **E10-2** 流程有复杂分支、并行汇合、多 Agent 路由，或需要直观看清每条路径时，用 Graph API 声明 State、Node 和 Edge；已有普通 Python 流程、只想增加检查点、任务恢复和人工暂停时，用 Functional API 的 @entrypoint 和 @task 更省改造成本。[原文§两种编排 API 怎么选？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%A4%E7%A7%8D%E7%BC%96%E6%8E%92-api-%E6%80%8E%E4%B9%88%E9%80%89)
- **E10-3** 依赖 persistence：图执行过程中保存 checkpoint，并按 thread_id 组织线程状态，运行可以暂停，服务重启后也能从已保存的状态恢复。恢复时节点里的代码可能重新执行，所以外部副作用必须有幂等保护。[原文§流程跨小时后如何继续？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E6%B5%81%E7%A8%8B%E8%B7%A8%E5%B0%8F%E6%97%B6%E5%90%8E%E5%A6%82%E4%BD%95%E7%BB%A7%E7%BB%AD)
- **E10-4** interrupt() 可以放在节点内部的任意位置；触发时运行时保存状态，并把可序列化的中断载荷交给外部系统，之后用相同的 thread_id 和 Command(resume=...) 恢复，外部输入成为 interrupt() 的返回值。节点恢复时是从节点开头重新执行的。[原文§人工怎样进入任意一步？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%BA%BA%E5%B7%A5%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E4%BB%BB%E6%84%8F%E4%B8%80%E6%AD%A5)
- **E10-5** 通过状态历史找到旧 checkpoint 后，可以从旧位置重新执行，也可以先修改旧状态再分出另一条轨迹；适合复现 Agent 为什么走错路、尝试不同的人工决策或修正错误的中间状态。它不会撤销现实中已经发生的操作。[原文§失败后为什么不必整段重跑？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%A4%B1%E8%B4%A5%E5%90%8E%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%BF%85%E6%95%B4%E6%AE%B5%E9%87%8D%E8%B7%91)
- **E10-6** Graph API 把任务拆成多条并行分支再汇合，分支数量在运行时才能确定时用 Send 动态创建；并行节点更新同一个 State 字段时，要用 Reducer 明确合并方式，不能指望最后写入者碰巧正确。[原文§复杂任务如何并行又汇合？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%A4%8D%E6%9D%82%E4%BB%BB%E5%8A%A1%E5%A6%82%E4%BD%95%E5%B9%B6%E8%A1%8C%E5%8F%88%E6%B1%87%E5%90%88)
- **E10-7** 只需要查天气、查订单、总结文档这类标准工具调用 Agent 时，create_agent 更快、更短；动态提示词、模型切换、工具过滤、消息摘要、重试、护栏和敏感工具审批，可以先看 middleware 能不能解决。[原文§哪些场景不必用 LangGraph？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8D%E5%BF%85%E7%94%A8-langgraph)
- **E10-8** 短期记忆跟随 State 和 Checkpointer，由 thread_id 隔离；长期记忆进入 Store，按 namespace 与 key 组织。生产环境要使用数据库后端，并补齐租户隔离、保留期限、删除更正与敏感信息治理。[原文§状态如何走向生产部署？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E7%8A%B6%E6%80%81%E5%A6%82%E4%BD%95%E8%B5%B0%E5%90%91%E7%94%9F%E4%BA%A7%E9%83%A8%E7%BD%B2)

### 补充考点

- **E10-9** 官方把 LangChain 定位为高层 Agent 框架，把 LangGraph 定位为低层编排框架与运行时；LangChain v1 的 create_agent 会构建一个基于 LangGraph 的图运行时，所以两者不是互斥关系。前者帮我们快速得到常见形态的 Agent，后者让我们控制任务在哪暂停、从哪恢复、过程如何反馈。[原文§两者为什么不对立？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%A4%E8%80%85%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%AF%B9%E7%AB%8B)
- **E10-10** 一旦加入权限校验、并行取证、质量评估、人工审批和失败补偿，把规则全塞进 Prompt 等于把业务流程交给一个概率模型临场发挥；StateGraph 的三个角色是 State、Node 和 Edge，以采购流程为例，State 像不断补充的申请单，Node 是预算检查、合规检查等办事窗口，Edge 规定材料下一步送到哪里。[原文§为什么要把流程与状态摊开？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A%E6%B5%81%E7%A8%8B%E4%B8%8E%E7%8A%B6%E6%80%81%E6%91%8A%E5%BC%80)
- **E10-11** 一个节点既要改状态又要改道时，可以返回 Command；运行时才知道要派出多少个研究任务时，可以用 Send 动态分发。[原文§为什么要把流程与状态摊开？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A%E6%B5%81%E7%A8%8B%E4%B8%8E%E7%8A%B6%E6%80%81%E6%91%8A%E5%BC%80)
- **E10-12** 好处是可以把输入、输出和内部状态分开：外部只提交用户问题，内部节点维护证据、风险分、重试次数和审批意见，最后只返回对外结果；责任是 State 字段怎么设计、并行写入如何合并、节点边界切多细都要开发者决定，错误的设计照样会造成状态膨胀、并发覆盖和难以维护。[原文§为什么要把流程与状态摊开？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A%E6%B5%81%E7%A8%8B%E4%B8%8E%E7%8A%B6%E6%80%81%E6%91%8A%E5%BC%80)
- **E10-13** 分支、循环、并行汇合或多 Agent 路由复杂，需要直观看清拓扑时用 Graph API。已有过程式代码、希望少改代码，或只有线性流程加少量条件和人工确认时用 Functional API。不同子流程复杂度差异很大时可以混合：外层图负责调度，局部节点调用函数工作流。 [原文§两种编排 API 怎么选？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%B8%A4%E7%A7%8D%E7%BC%96%E6%8E%92-api-%E6%80%8E%E4%B9%88%E9%80%89)
- **E10-14** 不是。LangGraph 能提供可靠执行的基础设施，却不能替业务自动发明幂等语义；只说加了 Checkpointer 就绝对不会重复执行，反而暴露对恢复机制理解不够。[原文§流程跨小时后如何继续？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E6%B5%81%E7%A8%8B%E8%B7%A8%E5%B0%8F%E6%97%B6%E5%90%8E%E5%A6%82%E4%BD%95%E7%BB%A7%E7%BB%AD)
- **E10-15** 审核员可以批准、拒绝，也可以修改金额、补充证据或给出反馈，后续路由再根据这份输入决定去向；多级审批可以拆成多个节点，让每个角色只看到自己需要的信息。它的优势出现在审批对象不是标准工具调用，或暂停点要嵌进更长业务工作流的时候。[原文§人工怎样进入任意一步？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E4%BA%BA%E5%B7%A5%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E4%BB%BB%E6%84%8F%E4%B8%80%E6%AD%A5)
- **E10-16** Retry Policy 负责按异常类型和退避策略重试，Timeout 限制单次尝试的时间，Error Handler 在重试耗尽后接管错误；处理函数还可以返回 Command，一边更新错误状态，一边把流程送往降级、补偿或人工处理节点。这样并行抓取多个数据源时，一个慢接口失败不会让其他已成功的请求重新付费。[原文§失败后为什么不必整段重跑？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%A4%B1%E8%B4%A5%E5%90%8E%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%BF%85%E6%95%B4%E6%AE%B5%E9%87%8D%E8%B7%91)
- **E10-17** 子图解决模块化问题：create_agent 返回的本身就是图，可以作为外层 StateGraph 的节点或子图，不同团队分别维护研究、合规、财务等子图，只要约定好输入输出状态；只有角色需要不同工具、不同状态结构、独立生命周期，或确实需要并行和跨团队维护时才值得引入，很多交接场景用单 Agent 加 middleware 更简单。[原文§复杂任务如何并行又汇合？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%A4%8D%E6%9D%82%E4%BB%BB%E5%8A%A1%E5%A6%82%E4%BD%95%E5%B9%B6%E8%A1%8C%E5%8F%88%E6%B1%87%E5%90%88)
- **E10-18** 复杂 Agent 的耗时主要花在搜索、文件处理、子 Agent 调用和人工等待上，只显示转圈图标用户不知道是否卡住；LangGraph 的节点和业务阶段由开发者定义，流式事件可以与产品进度条、审计日志和告警规则精确对应，例如展示正在查询政策库、已完成几个来源、等待财务审批。[原文§运行中怎样持续看见进度？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E8%BF%90%E8%A1%8C%E4%B8%AD%E6%80%8E%E6%A0%B7%E6%8C%81%E7%BB%AD%E7%9C%8B%E8%A7%81%E8%BF%9B%E5%BA%A6)
- **E10-19** 不是。开源 LangGraph 是编排框架和运行时，不等于购买了某个托管服务；自托管时数据库、任务队列、Worker 扩缩容、重试策略、监控和数据保留仍是团队的责任，即使用托管平台也要做容量评估、幂等设计和故障演练。[原文§状态如何走向生产部署？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E7%8A%B6%E6%80%81%E5%A6%82%E4%BD%95%E8%B5%B0%E5%90%91%E7%94%9F%E4%BA%A7%E9%83%A8%E7%BD%B2)
- **E10-20** 申请提交后要并行做预算和合规检查，两个结果齐了才进入人工审批，通过才调用采购系统，顺序与权限不能交给模型自由发挥；更自然的组合是用 create_agent 做材料理解或异常解释节点，外层采购流程仍由 StateGraph 控制。[原文§完整流程示例](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B)
- **E10-21** 适合业务阶段、权限和审批顺序必须由确定性规则控制的任务；也适合跨小时或跨天运行、需要暂停与恢复的长任务。任务有动态并行分支或多 Agent 子图时，可用 Send、并行汇合和 Reducer 组织协作。还适合需要查看与修改中间状态、从 checkpoint 重放来排查路线错误的流程。 [原文§哪些场景适合 LangGraph？](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html#%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E9%80%82%E5%90%88-langgraph)

## 11. LangChain 的演进

原文：[11. LangChain 大版本升级有哪些核心变化？](https://xiaolinnote.com/ai/langchain/version_evolution.html)。

- **E11-1** 模型厂商、向量数据库和外部工具的 SDK 变化很快，而消息、Runnable、Tool 等核心协议应尽量稳定，放在同一个包里两种迭代节奏会互相影响；拆分后项目只安装真正需要的集成，某个 SDK 升级对整个框架的影响也降低了。[原文§核心与集成为何拆开？](https://xiaolinnote.com/ai/langchain/version_evolution.html#%E6%A0%B8%E5%BF%83%E4%B8%8E%E9%9B%86%E6%88%90%E4%B8%BA%E4%BD%95%E6%8B%86%E5%BC%80)
- **E11-2** 早期大量 Chain 类的调用方式和扩展方式不完全一致；Runnable 与 LCEL 把 Prompt、Model、Parser、Retriever 统一为可组合单元，组合后的整体仍遵循 Runnable 协议，可以使用统一的同步、异步、批处理、流式和追踪接口。[原文§Runnable 改变了什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#runnable-%E6%94%B9%E5%8F%98%E4%BA%86%E4%BB%80%E4%B9%88)
- **E11-3** 传统执行器把模型判断、调用工具、再次判断的循环藏在内部，一旦加入规划、反思、并行分支、人工审批或故障恢复就难以修改；LangGraph 把循环摊开成 State、Node、Edge，并用检查点保存运行状态。[原文§为什么转向 LangGraph？](https://xiaolinnote.com/ai/langchain/version_evolution.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BD%AC%E5%90%91-langgraph)
- **E11-4** create_agent 是新项目的高层入口：开发者提供模型、工具和系统提示词，底层由 LangGraph 运行 Agent loop；middleware 是主要扩展方式，把动态提示词、模型选择、工具筛选、摘要、重试和人工审批插入关键执行阶段，而不必重写循环。[原文§LangChain v1 聚焦了什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#langchain-v1-%E8%81%9A%E7%84%A6%E4%BA%86%E4%BB%80%E4%B9%88)
- **E11-5** 各个包有各自的更新节奏，要先确认版本组合，再逐步替换废弃的导入路径和内部 API；代码能启动只说明导入问题解决了，工具调用、结构化输出、流式响应和持久化仍要分别回归，有副作用的路径还要先在隔离环境验证幂等。[原文§升级时要注意什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#%E5%8D%87%E7%BA%A7%E6%97%B6%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)

### 补充考点

- **E11-6** 一直在重新划分边界：哪些协议需要保持稳定，哪些集成应该独立更新，哪些流程应该由更底层的运行时管理。[原文§为什么要不断调整架构？](https://xiaolinnote.com/ai/langchain/version_evolution.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%B8%8D%E6%96%AD%E8%B0%83%E6%95%B4%E6%9E%B6%E6%9E%84)
- **E11-7** 它代表 LangChain 从大量预制类转向少量标准协议加组合；对步骤固定的确定性流程，Runnable 和 LCEL 往往比 Agent 更容易测试和控制。[原文§Runnable 改变了什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#runnable-%E6%94%B9%E5%8F%98%E4%BA%86%E4%BB%80%E4%B9%88)
- **E11-8** 旧的 Chain、Retriever、Indexing 和 Hub 等能力主要迁到 langchain-classic，存量项目仍可渐进迁移；新的 langchain 包把注意力留给 Agent 主线。[原文§LangChain v1 聚焦了什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#langchain-v1-%E8%81%9A%E7%84%A6%E4%BA%86%E4%BB%80%E4%B9%88)
- **E11-9** 不能只执行一次依赖更新：动手前先锁定当前依赖和可复现环境，再阅读目标版本的迁移指南；不同包的更新节奏不一致，主包的稳定承诺不能覆盖社区集成、合作伙伴包和实验性 API，所以生产项目应固定依赖版本，并尽量建立在公开稳定的接口上。[原文§升级时要注意什么？](https://xiaolinnote.com/ai/langchain/version_evolution.html#%E5%8D%87%E7%BA%A7%E6%97%B6%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)

## 12. Deep Research

原文：[12. Deep Research 的实现逻辑和适用场景是什么？](https://xiaolinnote.com/ai/langchain/deep_research.html)。

- **E12-1** 它不是 LangChain 核心包里的一个固定开关，而是一类面向开放问题的研究型 Agent 架构；LangChain 团队提供了 open_deep_research 参考实现和更通用的 Deep Agents SDK，前者是具体研究应用，后者是通用 Agent 开发框架。[原文§💡 简要回答](https://xiaolinnote.com/ai/langchain/deep_research.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **E12-2** 先澄清范围，例如用户关注的是投资价值、技术路线还是就业风险；Research Brief 再把用户目标、研究维度、时间范围、来源要求和最终交付形式整理成稳定的成功标准。[原文§核心流程是什么？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E6%A0%B8%E5%BF%83%E6%B5%81%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **E12-3** Supervisor 把问题拆成子课题：相对独立的问题才适合并行，例如分别研究三家公司的定价；后一个问题依赖前一个结论时应该串行执行。[原文§核心流程是什么？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E6%A0%B8%E5%BF%83%E6%B5%81%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **E12-4** 多个主题共用一个上下文时，搜索结果互相干扰，模型更难关注当前证据；每个 Researcher 只处理一个子课题，最终只返回压缩后的结论和来源，主 Agent 不必背着全部搜索过程继续思考。[原文§为什么需要子 Agent？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E5%AD%90-agent)
- **E12-5** 遇到冲突时继续追查发布时间、统计口径和原始出处，而不是挑一个最符合预期的答案；结论仍不稳就回查研究过程，例如搜索词是否漏掉关键限定、停止条件是否过早。[原文§如何保证研究质量？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E7%A0%94%E7%A9%B6%E8%B4%A8%E9%87%8F)
- **E12-6** 因为各章节可能重复背景、使用不同口径，甚至得出互相冲突的结论；并行搜证据、统一写报告更容易保持全文一致。[原文§为什么需要子 Agent？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E5%AD%90-agent)
- **E12-7** 需要多轮搜索和动态调整方向、能拆出相对独立的子课题、报告价值能覆盖成本的任务才值得，例如竞品分析、技术路线调研、文献综述和供应商尽调；容易核验的事实一次权威搜索更快、更便宜。[原文§哪些场景适合？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E9%80%82%E5%90%88)
- **E12-8** 限制同时运行的研究单元来控制宽度，限制每个 Researcher 的工具调用次数和 Supervisor 的补搜轮数来控制深度，再设总 Token、搜索费用和超时预算；网页是不可信输入，研究工具应优先只读、遵循最小权限、不暴露密钥，高风险操作必须人工审批。[原文§如何控制成本和安全？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%A6%82%E4%BD%95%E6%8E%A7%E5%88%B6%E6%88%90%E6%9C%AC%E5%92%8C%E5%AE%89%E5%85%A8)

### 补充考点

- **E12-9** 最后由一个写作阶段统一组织论证、处理重复内容，并把事实、推断和不确定性分开表达。[原文§核心流程是什么？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E6%A0%B8%E5%BF%83%E6%B5%81%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **E12-10** 官方文档、论文、监管文件和一手资料通常更接近原始事实；多篇转载可能都来自同一篇文章，不能因为链接数量多就当成交叉验证。[原文§如何保证研究质量？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E7%A0%94%E7%A9%B6%E8%B4%A8%E9%87%8F)
- **E12-11** 既要看最终答案，也要看研究轨迹、来源覆盖率、引用正确性、耗时和成本；通用 Benchmark 可以用于版本比较，但不能代替企业自己的业务数据集。[原文§如何保证研究质量？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E7%A0%94%E7%A9%B6%E8%B4%A8%E9%87%8F)
- **E12-12** 除了单个分支的上限，整项任务还要设置总 Token、搜索费用和超时预算，并配好失败重试、缓存、限流和取消策略；对金融、医疗、法律和安全决策，它只能辅助资料整理，不能因为报告带有引用就取消专家复核。[原文§如何控制成本和安全？](https://xiaolinnote.com/ai/langchain/deep_research.html#%E5%A6%82%E4%BD%95%E6%8E%A7%E5%88%B6%E6%88%90%E6%9C%AC%E5%92%8C%E5%AE%89%E5%85%A8)
