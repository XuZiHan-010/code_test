# Codex 原文章节摘编

仅依据各题所列的小林面试笔记原文章节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分明确标注，不使用其他网站补充。整理日期：2026-10-13。

## 1. Codex 工程化五件套

原文：[Codex 工程化指南：AGENTS.md、Skills、Subagents、MCP、Hooks 一篇讲透](https://xiaolinnote.com/codex/basics/codex_engineering.html)。

### AGENTS.md 与 Skills

- **N1-1** 团队有一组固定规则时，每个新任务都重新交代既麻烦又容易遗漏，没拿到规则时 Codex 只能按常见做法处理；AGENTS.md 是放在仓库里的项目入职手册，Codex 开始任务前会读取它，后续的分析、修改和验收都遵守其中的规则。[原文§为什么每次都要重新交代？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%AF%8F%E6%AC%A1%E9%83%BD%E8%A6%81%E9%87%8D%E6%96%B0%E4%BA%A4%E4%BB%A3)
- **N1-2** 一是在项目根目录手动新建 AGENTS.md，把团队的目录约定、修改规则和检查命令写进去；二是让 Codex 帮忙生成：打开项目后用一段提示词说明仓库性质和各项规则，由它创建规则文件，再在右侧审核产出的内容。[原文§怎么创建 AGENTS.md？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E5%88%9B%E5%BB%BA-agents-md)
- **N1-3** 重新建一个任务，让它只总结当前生效的项目规则，并列出规则来自哪些 AGENTS.md 文件，同时要求不修改任何文件、不执行构建命令；返回结果应包含之前写下的各项规则。[原文§怎么创建 AGENTS.md？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E5%88%9B%E5%BB%BA-agents-md)
- **N1-4** 什么叫质量好，模型还得自己猜，这种话基本等于没说；换成只能有一个一级标题、图片放进哪个目录、修改后执行哪条检查命令，Codex 才知道下一步该做什么，也知道怎么证明自己做完了。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-5** 个人级规则放在 ~/.codex/AGENTS.md，适合所有项目通用的偏好；项目根目录的 AGENTS.md 写团队共识；子目录放模块专属的规则。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-6** Codex 启动时从项目根目录一路走到当前工作目录，每一层最多选一个规则文件，再按从远到近的顺序拼起来；离当前目录越近的规则排在越后面，发生冲突时拥有更高的优先级。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-7** Codex 会优先选择 override 文件；这一层只取优先命中的那一份，不会把两份都读进来。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-8** 不会：Codex 不会因为读到了子目录里的文档，就自动把更深处的 AGENTS.md 补进当前的规则链。要测试子目录的规则，可以把这个子目录作为本地项目打开，或者把所有文档都要遵守的规则写到根目录。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-9** Codex 默认限制项目规则合并后的总大小，官方文档给出的默认上限是 32 KiB；所以这个文件可以继续引用架构文档和专项说明，不需要把所有资料全文放进来，只放每次都要遵守的内容。[原文§AGENTS.md 规则怎么加载？](https://xiaolinnote.com/codex/basics/codex_engineering.html#agents-md-%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E5%8A%A0%E8%BD%BD)
- **N1-10** 全部塞进 AGENTS.md，每一个任务都会带上这些内容：只是改个错别字，也得背着整份发布手册，上下文被占用，注意力也被摊薄；这类很重要但不是每次都用的知识应做成用到时才读的 Skill。[原文§为什么不能全塞进 AGENTS.md？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E5%85%A8%E5%A1%9E%E8%BF%9B-agents-md)
- **N1-11** 显式调用是在任务里写上美元符号加 Skill 名，直接点名使用；也可以不写名字，只描述要做的事，只要任务与 Skill 的描述匹配，Codex 也可以自动选中它。[原文§怎么创建和使用 Skill？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E5%88%9B%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8-skill)
- **N1-12** description 是关键字段，Codex 根据这句话判断什么时候应该使用这个 Skill；所以不能只写发布工具这样的名字，要写清它做什么、什么时候用、产出什么。[原文§Skill 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#skill-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-13** Skill 的核心是 SKILL.md，最小版本只要这一个文件；此外还可以携带脚本、参考资料、模板和其他资源，例如 references 目录下的模板和 scripts 目录下的脚本。[原文§Skill 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#skill-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-14** 项目共享的 Skill 放在项目的 .agents/skills/ 下，个人跨项目使用的 Skill 放在 ~/.agents/skills/ 下；原文特别提醒这里是 .agents，不是 .codex。[原文§Skill 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#skill-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-15** Codex 启动时先只看每个 Skill 的名称和描述；当用户任务与描述匹配，或者显式点名某个 Skill 时，才读取完整正文；正文里引用的长资料和脚本，再继续按需读取或执行。[原文§Skill 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#skill-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)

### Subagents、MCP 与 Hooks

- **N1-16** 需要同时调查产品能力、接入方式和迁移风险等多路问题时，全部由主 Agent 处理，搜索结果和中间资料很快就会挤占主上下文。[原文§主对话为什么越干越乱？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BB%E5%AF%B9%E8%AF%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E8%B6%8A%E5%B9%B2%E8%B6%8A%E4%B9%B1)
- **N1-17** Subagent 是 Codex 临时派出去执行某个子任务的独立线程；自定义 Agent 则是可以反复使用的岗位模板，职责写在 .codex/agents/ 下的配置文件里。[原文§怎么安排 Subagent？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E5%AE%89%E6%8E%92-subagent)
- **N1-18** 普通的并行任务不创建任何配置也能直接派 Subagent；只有某类分工经常出现时，才值得把职责写进 .codex/agents/，以后重复使用。[原文§怎么安排 Subagent？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E5%AE%89%E6%8E%92-subagent)
- **N1-19** 五个阶段：拆分，主 Agent 找出可以独立处理的子任务；派发，为每个 Subagent 指定目标、边界和输出格式；执行，各自在自己的上下文中用模型和工具完成任务；回传结论和必要证据；合并，主 Agent 等各路结果回来后去重并生成最终回答。[原文§Subagent 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#subagent-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-20** 一个 Subagent 在调查中产生的搜索结果、命令输出和中间笔记，不需要全部堆进主上下文；主 Agent 最后拿到的是整理过的结论，而不是子任务的全部过程。[原文§Subagent 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#subagent-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-21** 代码探索、资料整理、测试和问题归类这类互相独立的任务很适合并行；Subagent 默认继承主任务的权限模式并在当前工作区内使用工具，所以多个 Subagent 同时修改同一批文件时可能产生冲突。[原文§Subagent 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#subagent-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-22** Worktree 提供文件层面的隔离，Subagent 提供上下文和分工层面的拆分，两者解决的不是同一个问题；需要几路任务同时改代码时，可以分别创建多个顶层任务，并为它们选择独立的 Worktree。[原文§Subagent 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#subagent-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-23** 完成真实任务往往需要仓库之外的信息：产品需求可能在云端文档，Issue 在 GitHub，业务数据在数据库，项目进度在协作工具里；这些信息不在当前工作区，而且还会持续变化。[原文§为什么需要 MCP？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-mcp)
- **N1-24** 如果每接入一个外部系统都要单独定义工具说明、参数格式和返回结果，连接方式就会很碎片；MCP 提供一套统一的通信规则，让 Codex 可以用相同的方式发现和调用不同的外部工具。[原文§为什么需要 MCP？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-mcp)
- **N1-25** 外部服务接入后会先告诉 Codex 自己提供了哪些工具、每个工具能做什么、调用时要填哪些参数；Codex 从这些说明里找到匹配的工具，生成参数并发出请求，拿到结果后如果还需要别的信息，就继续调用下一个工具。[原文§MCP 工具是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#mcp-%E5%B7%A5%E5%85%B7%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-26** Codex 是 Host，负责理解任务和选择工具；Codex 内部的 MCP Client 像传话员，负责发送请求和取回结果；连接外部服务的 MCP Server 负责真正执行查找、读取或写入操作。[原文§MCP 工具是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#mcp-%E5%B7%A5%E5%85%B7%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-27** MCP Server 除了提供可执行的 Tools，还可以提供可读取的 Resources 和可复用的 Prompts。[原文§MCP 工具是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#mcp-%E5%B7%A5%E5%85%B7%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-28** 提示词和 AGENTS.md 是在告诉 Codex 应该怎么做，适合放项目背景、代码规范和修改约束；测试、格式化和安全扫描这类动作更适合由程序在固定时机自动执行，写进提示词既要重复交代，执行时机也不固定。[原文§为什么需要 Hooks？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-hooks)
- **N1-29** Hook 配置主要说明三件事：监听哪个生命周期事件、什么条件下命中，以及命中后执行哪个 Handler。[原文§Hooks 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#hooks-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-30** SessionStart 在任务会话启动时触发，常用于加载环境信息或项目上下文；UserPromptSubmit 在用户提交任务时触发；PreToolUse 在工具执行之前，可检查命令或阻止不允许的操作；PostToolUse 在工具执行之后；Stop 在任务准备结束时，可运行测试、格式化或安全扫描。[原文§Hooks 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#hooks-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-31** Codex 通过标准输入把当前工作目录和事件名称等信息交给 Handler，工具相关事件还会包含工具名称和参数；Handler 执行完成后，通过退出码或 JSON 结果告诉 Codex 是继续运行、停止当前动作，还是把新的上下文交回给模型。[原文§Hooks 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#hooks-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-32** 原文的例子是创建一个 Stop Hook，在任务准备结束时自动运行文档检查脚本：检查通过时正常结束任务，检查失败时把摘要交给 Codex 继续处理；之后每次任务准备结束都会自动运行，不需要在提示词里重复提醒。[原文§一个简单的 Hook 例子](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84-hook-%E4%BE%8B%E5%AD%90)
- **N1-33** AGENTS.md 让 Codex 在项目中持续遵守固定规则；Skills 封装可复用的专项知识和操作流程，按需加载；Subagents 拆分独立子任务，并行调查并汇总结果；MCP 连接仓库外的数据、工具和外部系统；Hooks 在固定的生命周期节点自动执行动作。[原文§最后](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%9C%80%E5%90%8E)

### 补充考点

- **N1-34** 可以直接通过插件市场安装：原文以 Google Drive 为例，打开 Codex 侧边栏的“Plugins”，搜索后进入详情页点击加号安装，提示连接账号时按页面引导完成登录和授权；安装完成后新建一个任务，在提示词里说明要用这个工具做什么即可，Codex 会根据任务内容自动选择它提供的工具，不需要再输入额外命令。[原文§怎么接入 MCP 工具？](https://xiaolinnote.com/codex/basics/codex_engineering.html#%E6%80%8E%E4%B9%88%E6%8E%A5%E5%85%A5-mcp-%E5%B7%A5%E5%85%B7)
- **N1-35** SessionStart 在任务会话启动时触发，常用于加载环境信息或项目上下文；UserPromptSubmit 在用户提交任务时触发；PreToolUse 在工具执行之前，可检查命令或阻止不允许的操作；PostToolUse 在工具执行之后。[原文§Hooks 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#hooks-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)
- **N1-36** Codex 通过标准输入把当前工作目录和事件名称等信息交给 Handler，工具相关事件还会包含工具名称和参数。[原文§Hooks 是怎么工作的？](https://xiaolinnote.com/codex/basics/codex_engineering.html#hooks-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B7%A5%E4%BD%9C%E7%9A%84)

## 2. 面向新模型调整 Skills、规则与提示词

原文：[GPT-6 使用指南：怎样让 Codex 更好地完成任务？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html)。

### Skills 与 AGENTS.md 做减法

- **N2-1** 原文称有些事情旧模型需要一步步教，而新模型已经能自己判断了；以前踩过坑才补上去的规则，换了模型之后可能不再需要，甚至得改。[原文§GPT-6 使用指南：怎样让 Codex 更好地完成任务？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#gpt-6-%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-%E6%80%8E%E6%A0%B7%E8%AE%A9-codex-%E6%9B%B4%E5%A5%BD%E5%9C%B0%E5%AE%8C%E6%88%90%E4%BB%BB%E5%8A%A1)
- **N2-2** 模型先看名字和描述来了解 Skill 能做什么；Skills 装得太多、描述又很长时，Codex 为了把这些介绍放进上下文，会把描述截短，介绍看不全，自然就更难选对。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-3** 例如数据库迁移 Skill 的描述写成涉及数据库、查询、数据模型或持久化时使用，那么用户只是让 AI 查一条数据，它也可能把修改表结构的那套流程翻出来。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-4** 说明职责的前半句不动，只改后半句的触发条件：把涉及数据库时使用缩小成新增或修改迁移、检查迁移上线方案时使用；描述尽量写短，同时说清什么时候才需要用它。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-5** 把几种操作的详细说明分开放到各自的参考文件里，再在 SKILL.md 里告诉模型按本次任务去看对应的那一份，并写明只读取本次任务需要的部分；这样只导出文件时，就不用先读做报表和分析数据的说明。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-6** 原文的解释是用到哪部分，再读哪部分，别一上来全塞给它；落到 Skill 上，就是把不同操作的说明拆开存放，由 SKILL.md 指路按需读取。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-7** 要什么结果得说清楚，例如报表必须包含哪些数据；至于具体怎么做，有些步骤可以让模型自己判断，不必什么任务都写好几十步让它严格照做，像做任何报表前都必须读完五份资料这类规定就值得重新考虑。[原文§01｜Skills 装得越多，AI 就越强吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_01-skills-%E8%A3%85%E5%BE%97%E8%B6%8A%E5%A4%9A-ai-%E5%B0%B1%E8%B6%8A%E5%BC%BA%E5%90%97)
- **N2-8** 模型漏跑一次测试，就加一句必须测试；改代码没看清结构，就再补一句修改前必须阅读架构文档；每条背后都有一次踩坑，文件于是越来越长。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)
- **N2-9** 改成按情况查阅：不清楚各个服务分别负责什么时查架构文档，修改表结构时查数据库文档，准备部署上线时查部署文档；这样模型知道什么时候需要看哪一份，改个错别字不用先把部署流程学一遍。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)
- **N2-10** 原文转述 OpenAI 的说法：新模型本身就会主动做检查，如果还留着一堆催它检查的要求，它可能会多跑一些没必要的测试，在检查这件事上花太多时间。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)
- **N2-11** 项目里的具体要求要留着，例如代码按什么格式写、订单金额怎么计算、哪些操作不能碰生产数据，这些模型未必知道；所以不需要把 AGENTS.md 直接清空。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)
- **N2-12** 重点检查三类：同一个要求是不是写了好几遍；有些规定是不是早就不适用了；还有那些不管改什么都要求从头走一遍的流程。每条规则都问一句，这次干活真的需要它吗。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)
- **N2-13** 有些模型还需要把步骤写细一点，而同样的步骤给新模型又可能管得太死；所以修改大家共用的 Skills 和项目规则时，也要看看其他模型还能不能把任务做好。[原文§02｜你的 AGENTS.md，该做减法了吗？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_02-%E4%BD%A0%E7%9A%84-agents-md-%E8%AF%A5%E5%81%9A%E5%87%8F%E6%B3%95%E4%BA%86%E5%90%97)

### 授权边界与完成标准

- **N2-14** 值得检查是否写过执行任何操作前都必须获得确认这类要求；新模型可能把它理解得很严格：你觉得小事直接做就行，它却认为规则明确说了操作前必须先问。[原文§03｜为什么它总停下来问你？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_03-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%83%E6%80%BB%E5%81%9C%E4%B8%8B%E6%9D%A5%E9%97%AE%E4%BD%A0)
- **N2-15** 把两类操作分开写：例如说明本地测试使用临时数据、不会访问生产环境，所以可以直接运行测试、修复本次修改导致的问题并重新运行相关测试，不用每一步都问；部署上线、给别人发消息、删除重要数据等需要同意的事单独写明要先确认。[原文§03｜为什么它总停下来问你？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_03-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%83%E6%80%BB%E5%81%9C%E4%B8%8B%E6%9D%A5%E9%97%AE%E4%BD%A0)
- **N2-16** 前提是测试确实不会连接生产环境；如果会，就不能照抄这句话。规则里要写真实情况，不能为了让 AI 少问两句，连自己用的是什么环境都随便写。[原文§03｜为什么它总停下来问你？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_03-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%83%E6%80%BB%E5%81%9C%E4%B8%8B%E6%9D%A5%E9%97%AE%E4%BD%A0)
- **N2-17** 一开始就告诉它做到什么程度才算完成：代码写好就行，还是要运行相关测试、把页面打开确认功能真的可用；这样代码写完以后，它还有明确的事情要继续做。[原文§04｜怎么让它把事情真正做完？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_04-%E6%80%8E%E4%B9%88%E8%AE%A9%E5%AE%83%E6%8A%8A%E4%BA%8B%E6%83%85%E7%9C%9F%E6%AD%A3%E5%81%9A%E5%AE%8C)
- **N2-18** 原文的示例在功能需求之外，还要求写完后运行相关测试，打开页面检查正常情况和边界情况，发现问题就修好并复查，最后报告修改和检查结果，确实做不下去时说明卡在哪里。[原文§04｜怎么让它把事情真正做完？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_04-%E6%80%8E%E4%B9%88%E8%AE%A9%E5%AE%83%E6%8A%8A%E4%BA%8B%E6%83%85%E7%9C%9F%E6%AD%A3%E5%81%9A%E5%AE%8C)
- **N2-19** 需要它停在哪里可以提前说清楚：只想讨论方案，就说先讨论方案、暂时别改代码；想先看设计，就说设计做完先给我看，确认后再开始写代码。[原文§04｜怎么让它把事情真正做完？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_04-%E6%80%8E%E4%B9%88%E8%AE%A9%E5%AE%83%E6%8A%8A%E4%BA%8B%E6%83%85%E7%9C%9F%E6%AD%A3%E5%81%9A%E5%AE%8C)
- **N2-20** 一句继续优化没有说明还要改什么、改到什么时候，模型不知道接下来要检查什么；应当写出具体的检查点，例如搜索框输入空格、姓名里带特殊符号时会不会出问题，有问题就修好。[原文§04｜怎么让它把事情真正做完？](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#_04-%E6%80%8E%E4%B9%88%E8%AE%A9%E5%AE%83%E6%8A%8A%E4%BA%8B%E6%83%85%E7%9C%9F%E6%AD%A3%E5%81%9A%E5%AE%8C)
- **N2-21** 把官方文章交给模型，让它据此检查 AGENTS.md 和相关 Skills，指出具体是哪条有重复、矛盾、已不适用或范围过大，并解释原因、给出修改建议；同时要求保留必须遵守的业务要求和保护生产环境的规定，先列出建议，等人看过再修改。[原文§最后](https://xiaolinnote.com/codex/playbook/openai_gpt6_usage_guide.html#%E6%9C%80%E5%90%8E)

## 3. Codex Harness 架构

原文：[Codex Harness 架构图解：一句需求，为什么能让 Agent 自己干活？](https://xiaolinnote.com/codex/source/codex_harness.html)。

### 整体架构与 Agent 循环

- **N3-1** 只有模型时，它读到需求最多生成一段回答，哪怕写出了正确代码也只停留在文本里：文件没有改变，命令没有运行，任务也不会因为一次回答失败就自动发起下一次请求。[原文§只有模型够吗？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%8F%AA%E6%9C%89%E6%A8%A1%E5%9E%8B%E5%A4%9F%E5%90%97)
- **N3-2** 模型决定下一步做什么；Harness 负责组织上下文、安排工具执行、收集结果，再交给模型继续判断；执行环境是实际存放项目文件、运行命令的地方。模型不直接碰文件，它提出动作，由 Harness 交给工具去执行。[原文§只有模型够吗？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%8F%AA%E6%9C%89%E6%A8%A1%E5%9E%8B%E5%A4%9F%E5%90%97)
- **N3-3** 五类：接入与交互，输入从哪个界面来、过程怎样返回界面；会话与编排，要请求模型多少次、是否继续；上下文管理，这次给模型哪些规则、历史和工具结果；工具与执行系统，动作由谁执行、权限够不够；状态持久化和记忆，任务怎样恢复、经验怎样被找到。[原文§Harness 要负责什么？](https://xiaolinnote.com/codex/source/codex_harness.html#harness-%E8%A6%81%E8%B4%9F%E8%B4%A3%E4%BB%80%E4%B9%88)
- **N3-4** 终端、IDE、桌面应用都可能提交任务并接收事件；如果每个界面都自己实现一套 Agent 循环，同样的任务在不同界面里可能按不同流程执行，修一个问题也得改多套实现。App Server 统一把需求转交给 Agent 引擎，再把输出和进度传回界面。[原文§为什么需要 App Server？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-app-server)
- **N3-5** 一次用户请求可能连续产生几十个事件，客户端要一边接收模型文字一边显示工具状态；遇到审批时，服务还会反过来向客户端提问，等用户允许或拒绝后再继续。所以它负责的是一段持续交互，而不是一次请求进去、结果出来的问答。[原文§为什么需要 App Server？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-app-server)
- **N3-6** 任务不是从总图一边走到另一边就结束：模型提出动作，工具执行后把结果写回历史，主循环发现任务没结束，就带着新结果再次请求模型。主线是准备上下文、请求模型、执行动作、得到反馈，再准备下一次上下文的闭环。[原文§一项任务怎么流动？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E6%80%8E%E4%B9%88%E6%B5%81%E5%8A%A8)
- **N3-7** 第一次请求时模型连项目里有哪些文件都不知道，只能先读规则或搜索代码；工具返回结果后模型才获得新的事实，再据此判断该改什么。很多信息无法靠模型猜出来，只能先行动，再根据环境反馈决定下一步。[原文§为什么要多次请求模型？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%A4%9A%E6%AC%A1%E8%AF%B7%E6%B1%82%E6%A8%A1%E5%9E%8B)
- **N3-8** 模型正在输出一句解释、已经提出一个完整动作、这次响应已经结束，是三个不同的时刻：文字增量可以交给界面展示，工具调用完整生成后才进入分发，完成事件到达时更新状态和用量；半截工具参数不能执行，一段文字也不应被误当成命令。[原文§模型输出怎么变成动作？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E8%BE%93%E5%87%BA%E6%80%8E%E4%B9%88%E5%8F%98%E6%88%90%E5%8A%A8%E4%BD%9C)
- **N3-9** 模型一次可能提出两个动作，Harness 必须知道每段返回属于哪次调用；下一次请求看到的是调用与结果之间的对应关系，关系没有断，模型才能判断刚才哪一步成功、哪一步失败。[原文§模型输出怎么变成动作？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E8%BE%93%E5%87%BA%E6%80%8E%E4%B9%88%E5%8F%98%E6%88%90%E5%8A%A8%E4%BD%9C)
- **N3-10** Thread 是同一段会话，装着多轮任务；每次用户输入发起的一轮工作叫 Turn；这一轮里的用户消息、模型回复、工具执行和审批记录是一个个 Item。[原文§任务状态由谁保存？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%BB%BB%E5%8A%A1%E7%8A%B6%E6%80%81%E7%94%B1%E8%B0%81%E4%BF%9D%E5%AD%98)
- **N3-11** Turn 是一次用户输入发起的一轮工作，里面包含用户消息、模型回复、工具执行和审批记录；一个 Turn 里可以请求模型很多次，所以不能把它理解成一次模型 API 调用。[原文§任务状态由谁保存？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%BB%BB%E5%8A%A1%E7%8A%B6%E6%80%81%E7%94%B1%E8%B0%81%E4%BF%9D%E5%AD%98)
- **N3-12** Session 在程序内部保存这段会话的历史、待处理输入，以及运行时需要的共享服务；当前正在执行的 Turn 还会记录哪些任务仍在运行，以及流程正在等待用户输入、审批还是外部响应。[原文§任务状态由谁保存？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%BB%BB%E5%8A%A1%E7%8A%B6%E6%80%81%E7%94%B1%E8%B0%81%E4%BF%9D%E5%AD%98)
- **N3-13** Codex 为每次模型请求捕获一份 StepContext，固定这一步使用的模型设置、环境视图、MCP 绑定、工具路由和项目规则；工具调用返回后仍按同一份上下文分发，不会因为配置中途刷新，让模型刚才还能看到的工具突然找不到。[原文§为什么需要 StepContext？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-stepcontext)
- **N3-14** StepContext 固定的只是这次请求采用的配置、工具列表和项目规则；文件仍可能被用户或其他任务修改，外部服务也可能变化，它不会把整个文件系统和外部世界一起冻结。[原文§为什么需要 StepContext？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-stepcontext)
- **N3-15** 工具需要审批时，Harness 记下哪个操作正在等用户确认，再把审批请求发到界面上；用户允许或拒绝后，Harness 把答复交给对应的操作，继续处理。[原文§等待和取消](https://xiaolinnote.com/codex/source/codex_harness.html#%E7%AD%89%E5%BE%85%E5%92%8C%E5%8F%96%E6%B6%88)
- **N3-16** 运行中追加的输入通常先进入输入队列；已经发出去的模型请求不会凭空多出新内容，主循环会在合适的边界取走这条输入，让后续的请求看到。[原文§等待和取消](https://xiaolinnote.com/codex/source/codex_harness.html#%E7%AD%89%E5%BE%85%E5%92%8C%E5%8F%96%E6%B6%88)
- **N3-17** Harness 会触发取消信号并收尾当前任务，但已经写入的文件不会自动恢复；仍在运行的进程或子 Agent 也有各自的生命周期，需要相应的控制逻辑处理。[原文§等待和取消](https://xiaolinnote.com/codex/source/codex_harness.html#%E7%AD%89%E5%BE%85%E5%92%8C%E5%8F%96%E6%B6%88)
- **N3-18** 命令退出失败，可以作为工具结果交给模型分析；连接模型服务时中断，Harness 可能等一会儿再重连或改用另一种传输方式，取决于错误类型；遇到无法继续处理的错误，才会结束这一轮并清理相关运行状态。[原文§失败怎么处理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%A4%B1%E8%B4%A5%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **N3-19** 重新请求模型、重新执行工具、从历史恢复会话是三件不同的事；一个命令如果已经产生了副作用，模型连接的重试并不代表这个命令可以安全重跑。[原文§失败怎么处理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%A4%B1%E8%B4%A5%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **N3-20** 主循环还要确认有没有用户刚补充的要求、有没有尚未处理的错误，以及停止前的检查是否允许结束；如果用户追加了要求，或者 Stop Hook 补入了需要继续处理的内容，Agent 就可能再执行一轮。[原文§循环什么时候结束？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%BE%AA%E7%8E%AF%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E7%BB%93%E6%9D%9F)
- **N3-21** 以修 Bug 为例，文件改完只能说明代码变了，还要看相关测试和验证结果，才能判断问题是否真的解决。[原文§循环什么时候结束？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%BE%AA%E7%8E%AF%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E7%BB%93%E6%9D%9F)

### 上下文组织

- **N3-22** Harness 发给模型的内容包括规定整体行为的基础指令、用户需求与项目规则、工作目录等环境信息、记录任务进度的前几次模型请求和工具结果，以及工具定义；长期记忆满足启用条件时，还可能有一小段记忆导航。[原文§模型实际看到了什么？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E5%AE%9E%E9%99%85%E7%9C%8B%E5%88%B0%E4%BA%86%E4%BB%80%E4%B9%88)
- **N3-23** 模型不会凭空知道工具名和参数格式，只有 Harness 告知本次可见的能力，模型才可能生成结构正确的调用；上下文决定模型知道什么，工具定义决定模型此刻能要求 Harness 做什么。[原文§模型实际看到了什么？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E5%AE%9E%E9%99%85%E7%9C%8B%E5%88%B0%E4%BA%86%E4%BB%80%E4%B9%88)
- **N3-24** Codex 围绕项目边界和当前工作目录查找规则文件，按层级组织找到的内容，并受读取预算限制：根目录的规则通常适用于整个项目，越接近当前目录的规则越具体；并不是仓库里所有说明都会自动进入请求。[原文§项目规则怎么注入？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%A1%B9%E7%9B%AE%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E6%B3%A8%E5%85%A5)
- **N3-25** 写进上下文的规则可以要求模型怎样做，却不能直接扩大执行权限；工具实际能否访问，仍由 Harness 的权限策略和执行环境决定。文字指令解决行为选择，沙箱解决资源边界，两者处在架构的不同位置。[原文§项目规则怎么注入？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%A1%B9%E7%9B%AE%E8%A7%84%E5%88%99%E6%80%8E%E4%B9%88%E6%B3%A8%E5%85%A5)
- **N3-26** Codex 记下已经向模型介绍过的规则和环境信息，这份记录就是上下文基线；第一次请求提供必要的环境说明，以后只在工作目录、设置等发生变化时补充变化的部分。之前的对话和工具结果仍会随请求发送，只是不再重复追加相同的说明。[原文§重复信息怎么更新？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%87%8D%E5%A4%8D%E4%BF%A1%E6%81%AF%E6%80%8E%E4%B9%88%E6%9B%B4%E6%96%B0)
- **N3-27** 连续的请求拥有相同的前缀时，模型服务才有机会复用已有的前缀缓存；是否命中仍取决于服务与请求条件，但如果 Harness 每一步都重新排列前文，就很难保留这种机会。[原文§重复信息怎么更新？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%87%8D%E5%A4%8D%E4%BF%A1%E6%81%AF%E6%80%8E%E4%B9%88%E6%9B%B4%E6%96%B0)
- **N3-28** 模型下一次看到的可能是受限后的结果；现有信息不足时，它需要发起更精确的动作，例如读取指定的文件范围、按关键词搜索，或者用范围更小的命令重新取得证据。限长换来可控的上下文，也可能丢掉暂时看不出价值的细节。[原文§长输出怎么处理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%95%BF%E8%BE%93%E5%87%BA%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **N3-29** 发送历史前要做规范化：缺失结果的调用需要补出中止等状态，孤立的结果按协议处理，不支持的输入类型根据当前模型能力调整；补出的状态是为了告诉模型调用没有正常完成，并不是伪造一个成功结果。[原文§调用与结果怎么配对？](https://xiaolinnote.com/codex/source/codex_harness.html#%E8%B0%83%E7%94%A8%E4%B8%8E%E7%BB%93%E6%9E%9C%E6%80%8E%E4%B9%88%E9%85%8D%E5%AF%B9)
- **N3-30** 不一定是模型完全忘了，也可能是旧的输出被限长，或者压缩之后需要重新取得精确的证据。[原文§调用与结果怎么配对？](https://xiaolinnote.com/codex/source/codex_harness.html#%E8%B0%83%E7%94%A8%E4%B8%8E%E7%BB%93%E6%9E%9C%E6%80%8E%E4%B9%88%E9%85%8D%E5%AF%B9)
- **N3-31** 可以理解成一份交接说明：目标是什么，哪些地方已经改完，确认了哪些事实，试过哪些失败的方法，接下来还要做什么；下一次请求靠这些信息接着做，不必再带上之前每一步的完整输出。[原文§上下文满了怎么办？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **N3-32** 仅有一段任务摘要，未必包含当前的项目规则、工作环境和模型需要遵循的全部要求，所以压缩之后 Harness 还要把必要的初始上下文放回合适的位置；轮次前压缩和轮次中压缩在重新注入的位置上还有不同安排。[原文§上下文满了怎么办？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **N3-33** 摘要保住了主线，也可能丢掉某段完整日志和局部代码细节；持久化历史里也许保存过更多内容，但 Harness 保存过什么和下次模型请求能看到什么是两回事，压缩也不会自动把全部细节变成跨任务知识。[原文§上下文满了怎么办？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)

### 工具执行、状态与扩展

- **N3-34** Harness 连接了大量内部工具、通过 MCP 接入的外部工具和扩展能力时，把所有定义都塞进每次请求会占用上下文，也会增加模型的选择负担；所以每次请求前要安排哪些工具直接展示、哪些等需要时再查找。[原文§模型能看到哪些工具？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E8%83%BD%E7%9C%8B%E5%88%B0%E5%93%AA%E4%BA%9B%E5%B7%A5%E5%85%B7)
- **N3-35** “系统里存在的工具”是 Harness 已接入的内部、MCP 和扩展能力；“本次向模型展示的工具”是这次请求直接提供名称、用途和参数的部分，其他能力可能等需要时再查找；“最终可调用的执行器”是模型发出请求后，Harness 路由到的实际处理器。三者由本次工具计划关联，并非同一份列表，计划还受配置、模型能力和运行环境影响。[原文§模型能看到哪些工具？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%A8%A1%E5%9E%8B%E8%83%BD%E7%9C%8B%E5%88%B0%E5%93%AA%E4%BA%9B%E5%B7%A5%E5%85%B7)
- **N3-36** Tool Router 先解析包含工具名称和参数的结构化请求，再从本次工具计划里找到对应的处理器；工具不存在或参数不合法就返回相应错误。找到后把调用参数、会话信息和 StepContext 交给处理器，处理器把结果封装成带调用标识的工具输出。[原文§工具调用怎么路由？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8%E6%80%8E%E4%B9%88%E8%B7%AF%E7%94%B1)
- **N3-37** 审批回答这个动作要不要额外获得许可，沙箱限制进程能够接触哪些资源；对执行类工具，Harness 先根据当前策略判断是否需要审批，再选择合适的沙箱方式运行。[原文§审批和沙箱做什么？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%AE%A1%E6%89%B9%E5%92%8C%E6%B2%99%E7%AE%B1%E5%81%9A%E4%BB%80%E4%B9%88)
- **N3-38** 两者不能混为一谈：用户批准某个动作，不代表进程自动获得无限资源；沙箱里的执行失败，也不代表系统会直接提升权限重跑，只有策略允许时，执行链路才可能请求许可或调整执行方式。[原文§审批和沙箱做什么？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%AE%A1%E6%89%B9%E5%92%8C%E6%B2%99%E7%AE%B1%E5%81%9A%E4%BB%80%E4%B9%88)
- **N3-39** Unified Exec 把一次工具请求和一个进程的完整生命周期分开处理：第一次调用可以先返回当前输出和一个进程标识，底层进程继续运行；后续调用再用这个标识读取新输出或发送输入，直到最终取得退出状态。[原文§长命令怎么交互？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%95%BF%E5%91%BD%E4%BB%A4%E6%80%8E%E4%B9%88%E4%BA%A4%E4%BA%92)
- **N3-40** 因为一次工具请求和进程的生命周期是分开的，调用返回了一段日志，只能说明 Harness 当前拿到了这些内容，底层进程可能仍在继续运行。[原文§长命令怎么交互？](https://xiaolinnote.com/codex/source/codex_harness.html#%E9%95%BF%E5%91%BD%E4%BB%A4%E6%80%8E%E4%B9%88%E4%BA%A4%E4%BA%92)
- **N3-41** 由工具注册时声明的能力决定：允许并行的工具拿的是共享通行证，可以一起执行；需要单独运行的工具拿到专用通行证后，其他调用要等它完成。这控制的是工具分发顺序，不是给整个文件系统上锁。[原文§工具如何并发和选环境？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%B7%A5%E5%85%B7%E5%A6%82%E4%BD%95%E5%B9%B6%E5%8F%91%E5%92%8C%E9%80%89%E7%8E%AF%E5%A2%83)
- **N3-42** App Server 连接客户端和 Agent 运行核心，负责传递用户请求与执行事件；Exec Server 连接工具和执行环境，负责在对应的本地或远程环境中完成进程与文件操作。[原文§工具如何并发和选环境？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%B7%A5%E5%85%B7%E5%A6%82%E4%BD%95%E5%B9%B6%E5%8F%91%E5%92%8C%E9%80%89%E7%8E%AF%E5%A2%83)
- **N3-43** 当前上下文服务下一次模型请求，让它知道刚才读了什么、改了什么；持久化历史服务原会话恢复，关闭后重新打开还能继续；长期记忆尝试把跨任务仍有价值的信息带进全新的会话。[原文§三种记忆有什么区别？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%89%E7%A7%8D%E8%AE%B0%E5%BF%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **N3-44** 恢复时从记录中还原已发生的用户消息、模型回复和工具结果，再恢复上下文基线与窗口用量等信息；但某些等待中的审批、交互对象或正在运行的进程，只存在于当时的进程内，已发生的文件修改也不会靠重放聊天自动撤销或再执行一次。[原文§会话怎么恢复？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%BC%9A%E8%AF%9D%E6%80%8E%E4%B9%88%E6%81%A2%E5%A4%8D)
- **N3-45** App Server 在带输入的新轮次成功启动、运行环境准备好后尝试调度；真正启动前还要确认长期记忆功能已开启、当前不是临时会话或子 Agent 会话、状态数据库可用、账号剩余调用量高于系统阈值，任一条件不满足就直接跳过。[原文§历史怎么提炼？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%8E%86%E5%8F%B2%E6%80%8E%E4%B9%88%E6%8F%90%E7%82%BC)
- **N3-46** 整理 Agent 本身是临时的内部任务，会关闭再次生成和读取记忆、递归协作等能力，避免整理过程再次触发自己；同时整理流程持有全局租约，同一时间只允许一个整理 Agent 改写共享记忆。[原文§为什么还要整理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E6%95%B4%E7%90%86)
- **N3-47** 使用次数只能说明这份材料被引用过，并不构成自动的事实校验机制；系统只是根据引用等信号记录使用情况，再结合时间窗口和数量上限选择后续的整理材料。[原文§记忆怎么更新？](https://xiaolinnote.com/codex/source/codex_harness.html#%E8%AE%B0%E5%BF%86%E6%80%8E%E4%B9%88%E6%9B%B4%E6%96%B0)
- **N3-48** Codex 内部提供扩展注册机制：每个扩展先登记自己会增加什么、要在哪些时机运行；Harness 等到准备模型输入、组装工具列表或运行到对应时机时再调用相应扩展，例如记忆扩展既补入记忆导航，又提供搜索和读取记忆的工具。[原文§扩展怎么接入主循环？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%89%A9%E5%B1%95%E6%80%8E%E4%B9%88%E6%8E%A5%E5%85%A5%E4%B8%BB%E5%BE%AA%E7%8E%AF)
- **N3-49** Skills 告诉模型某类任务应该怎么做，并提供需要的说明和资源；MCP 把外部服务的工具接进来，让模型可以请求 Harness 调用；Hooks 让程序在指定时机介入，例如收到用户输入时、工具执行前后或任务准备停止时。[原文§Skills、MCP 和 Hooks 做什么？](https://xiaolinnote.com/codex/source/codex_harness.html#skills%E3%80%81mcp-%E5%92%8C-hooks-%E5%81%9A%E4%BB%80%E4%B9%88)
- **N3-50** 独立会话意味着运行状态分开，却不等于文件环境一定隔离：如果父子 Agent 指向同一个工作目录，多个 Agent 仍可能看到或修改相同的文件；真正需要隔离时，还要配合独立工作目录或相应的环境策略。[原文§子 Agent 怎么运行？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%AD%90-agent-%E6%80%8E%E4%B9%88%E8%BF%90%E8%A1%8C)
- **N3-51** 原文的答法：核心是在大模型外面加一套 Harness，模型判断下一步，Harness 把判断变成真实行动；整体分为客户端接入、会话编排、上下文管理、工具执行、状态与记忆五部分；主线是模型决定下一步，Harness 让这一步安全执行，再把结果交给模型继续判断。[原文§最后](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%9C%80%E5%90%8E)

### 补充考点

- **N3-52** 先给导航，再按需展开：记忆读取功能启用且已有非空摘要时，扩展把有限长度的记忆导航和使用说明注入开发者指令，模型先看到过去大概有哪些经验，判断是否与当前任务相关；需要细节时再通过专用工具搜索详细记忆，必要时继续读取任务摘要和可复用步骤。把全部记忆塞进去，只会让新任务的上下文越来越难控制。[原文§新任务怎么读取记忆？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E4%B9%88%E8%AF%BB%E5%8F%96%E8%AE%B0%E5%BF%86)
- **N3-53** 本地搜索主要按文字匹配，找到以后只返回命中位置附近的一小段内容，这样不用读入整份记忆，但两段话意思相近、用词不同时就可能搜不到；过去的经验只是线索，项目代码和环境可能已经变化，模型必须回到当前文件与工具结果上验证，不能把长期记忆当成永远正确的事实库。[原文§新任务怎么读取记忆？](https://xiaolinnote.com/codex/source/codex_harness.html#%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E4%B9%88%E8%AF%BB%E5%8F%96%E8%AE%B0%E5%BF%86)
- **N3-54** 连接模型服务时中断，Harness 可能等一会儿再重连，或改用另一种传输方式，取决于错误类型；遇到无法继续处理的错误，才会结束这一轮并清理相关运行状态。[原文§失败怎么处理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%A4%B1%E8%B4%A5%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **N3-55** 会话过程会持续写入历史：当前本地实现以 JSONL 保存事件历史，在状态数据库可用时，再用 SQLite 保存便于查询的元数据。[原文§会话怎么恢复？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%BC%9A%E8%AF%9D%E6%80%8E%E4%B9%88%E6%81%A2%E5%A4%8D)
- **N3-56** 第一阶段每次只处理一段历史任务：先按会话来源、时间、空闲状态、记忆配置和数量限制筛选候选，再通过任务租约抢占处理资格，然后由模型从这次任务中提炼结构化的原始记忆和任务摘要，留下可复用偏好、有效步骤、失败教训等信息，没有值得长期保留的内容时也允许没有产出。第二阶段做跨任务整理：先取得全局租约，选择第一阶段的材料同步到记忆工作区并比较内容是否变化，没有变化且现有产物通过检查就跳过；确实需要更新时启动专门的整理 Agent，把经验整理成导航摘要、详细记忆、任务摘要和可复用步骤几类文件。[原文§历史怎么提炼？](https://xiaolinnote.com/codex/source/codex_harness.html#%E5%8E%86%E5%8F%B2%E6%80%8E%E4%B9%88%E6%8F%90%E7%82%BC)[原文§为什么还要整理？](https://xiaolinnote.com/codex/source/codex_harness.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E6%95%B4%E7%90%86)

## 4. Codex 记忆机制

原文：[Codex 记忆机制图解：Agent 的记忆系统是怎么设计的？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html)。

### 当前任务的上下文

- **N4-1** 是后者：每次请求模型之前，Codex 都会重新组装输入，包括基础指令、项目规则、历史消息、工具结果和当前需求；模型在两次推理之间并没有保存任务状态，是 Codex 把需要的信息再次放进了本次请求。[原文§01｜模型为什么不会天然记住你？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_01-%E6%A8%A1%E5%9E%8B%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%BC%9A%E5%A4%A9%E7%84%B6%E8%AE%B0%E4%BD%8F%E4%BD%A0)
- **N4-2** 当前上下文负责让眼前的任务继续执行；会话历史负责让关闭后的同一任务能够恢复，依靠 Rollout 和 checkpoint；长期记忆负责让新任务复用旧任务里值得保留的经验。三者是三套不同的机制，不能混为一谈。[原文§01｜模型为什么不会天然记住你？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_01-%E6%A8%A1%E5%9E%8B%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%BC%9A%E5%A4%A9%E7%84%B6%E8%AE%B0%E4%BD%8F%E4%BD%A0)
- **N4-3** 历史随着用户消息、工具调用和工具结果不断追加，上下文管理器负责整理它们供下一次请求使用；发给模型的工具结果会限制长度，而写进任务档案 Rollout 的那份保留更多内容，所以后续请求少带一部分，不代表档案里也删掉了。[原文§02｜Codex 怎样管理当前任务的记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_02-codex-%E6%80%8E%E6%A0%B7%E7%AE%A1%E7%90%86%E5%BD%93%E5%89%8D%E4%BB%BB%E5%8A%A1%E7%9A%84%E8%AE%B0%E5%BF%86)
- **N4-4** 普通聊天主要增加文字，Agent 还会不断带回代码、目录、日志、网页和结构化的工具结果；当前上下文不是一份静态的 Prompt，而是一段不断生长的任务现场。[原文§02｜Codex 怎样管理当前任务的记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_02-codex-%E6%80%8E%E6%A0%B7%E7%AE%A1%E7%90%86%E5%BD%93%E5%89%8D%E4%BB%BB%E5%8A%A1%E7%9A%84%E8%AE%B0%E5%BF%86)
- **N4-5** 工具结果写进模型历史时就会先应用限长策略，不必等历史塞满才处理；这是第一道防线，避免一份特别长的日志就占掉大量上下文空间。[原文§02｜Codex 怎样管理当前任务的记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_02-codex-%E6%80%8E%E6%A0%B7%E7%AE%A1%E7%90%86%E5%BD%93%E5%89%8D%E4%BB%BB%E5%8A%A1%E7%9A%84%E8%AE%B0%E5%BF%86)
- **N4-6** 同一份工具结果有两种保存方式：准备发给模型的那份会限制长度，写进任务档案 Rollout 的那份保留更多内容；Rollout 是 Codex 在模型之外持续保存的任务档案。[原文§02｜Codex 怎样管理当前任务的记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_02-codex-%E6%80%8E%E6%A0%B7%E7%AE%A1%E7%90%86%E5%BD%93%E5%89%8D%E4%BB%BB%E5%8A%A1%E7%9A%84%E8%AE%B0%E5%BF%86)
- **N4-7** 一条工具结果可能比几十轮普通对话还长，真正决定上下文压力的不是消息数量，而是 Token 用量。[原文§Codex 怎么知道上下文快满了？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#codex-%E6%80%8E%E4%B9%88%E7%9F%A5%E9%81%93%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BF%AB%E6%BB%A1%E4%BA%86)
- **N4-8** Codex 维护当前上下文的 Token 使用状态，优先采用服务端的反馈，必要时再根据历史估算，然后把当前用量和自动压缩阈值进行比较。[原文§Codex 怎么知道上下文快满了？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#codex-%E6%80%8E%E4%B9%88%E7%9F%A5%E9%81%93%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BF%AB%E6%BB%A1%E4%BA%86)
- **N4-9** 自动压缩阈值可以提前设置，但模型的真实上下文窗口始终是不能突破的硬上限；历史继续增长并达到阈值时，才轮到真正的上下文压缩。[原文§Codex 怎么知道上下文快满了？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#codex-%E6%80%8E%E4%B9%88%E7%9F%A5%E9%81%93%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BF%AB%E6%BB%A1%E4%BA%86)
- **N4-10** 一个是新轮次开始前，旧历史已经达到阈值就先压缩再继续；另一个是轮次运行中，工具结果把上下文推到阈值后，Codex 建立新的上下文窗口再接着执行。此外用户也可以手动触发压缩。[原文§03｜上下文快满时，Codex 怎样压缩又接着干？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_03-%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BF%AB%E6%BB%A1%E6%97%B6-codex-%E6%80%8E%E6%A0%B7%E5%8E%8B%E7%BC%A9%E5%8F%88%E6%8E%A5%E7%9D%80%E5%B9%B2)
- **N4-11** 如果只在新轮次开始前检查，某次工具调用突然带回大量日志就来不及处理；所以 Codex 干活干到一半，也可能先整理上下文、腾出空间，再接着往下做。[原文§03｜上下文快满时，Codex 怎样压缩又接着干？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_03-%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BF%AB%E6%BB%A1%E6%97%B6-codex-%E6%80%8E%E6%A0%B7%E5%8E%8B%E7%BC%A9%E5%8F%88%E6%8E%A5%E7%9D%80%E5%B9%B2)

### 压缩与恢复

- **N4-12** Codex 把当前历史连同一条专门的压缩指令交给模型，让它整理一份交接摘要；摘要要覆盖当前进度、关键决定、用户偏好和限制、剩余工作，以及继续任务所需的重要数据。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-13** 普通会议摘要可能只写团队讨论了三个方案；任务交接摘要必须继续回答最后选了哪个方案、为什么、哪些文件已经改过、测试还差哪一步、哪条路已经证明走不通，目标是让模型知道做到了哪一步、接下来还要做什么。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-14** 能保留多少用户原话取决于可用的 Token 空间；空间有限时优先保留最近的消息，再把交接摘要接在后面。明确的需求和约束，用户原话通常比模型的二次转述更值得保留。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-15** 旧的工具调用、旧的工具结果和大量中间过程不会继续完整地占据当前窗口；这些过程最后得出的结果会写进交接摘要，Codex 用一份更小的替代历史供后续请求使用。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-16** 这些内容由 Codex 单独提供：基础指令本来就随每次请求发送，项目规则、开发者要求和环境信息也会重新补上；所以即使摘要没有提到某条规则，模型仍然能看到它。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-17** Codex 根据配置和模型服务能力选择：启用 Token 预算策略时，达到预算后直接建立新窗口，不再生成摘要；否则，服务端支持远程压缩就交给服务端处理，不支持才使用本地总结。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-18** 压缩过早会增加成本和信息损失，过晚又可能没有足够的空间生成摘要；所以触发阈值本身也是一种取舍。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-19** 任务运行过程中，用户消息、模型输出、工具调用、事件和上下文变化等记录会持续写入 JSONL；这里保存的是 Codex 本地的任务历史，不等于每次都要发送给模型。[原文§04｜任务关闭以后，现场为什么还能恢复？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_04-%E4%BB%BB%E5%8A%A1%E5%85%B3%E9%97%AD%E4%BB%A5%E5%90%8E-%E7%8E%B0%E5%9C%BA%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%83%BD%E6%81%A2%E5%A4%8D)
- **N4-20** 压缩发生时，Codex 额外写入一条压缩记录 CompactedItem，保存替代历史以及恢复这个上下文窗口所需的元数据；压缩因此留下一个明确的恢复点，而不是只改了内存。[原文§04｜任务关闭以后，现场为什么还能恢复？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_04-%E4%BB%BB%E5%8A%A1%E5%85%B3%E9%97%AD%E4%BB%A5%E5%90%8E-%E7%8E%B0%E5%9C%BA%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%83%BD%E6%81%A2%E5%A4%8D)
- **N4-21** Codex 先找到最近一次仍然有效的压缩恢复点，取出当时保存的精简历史，再把恢复点之后新增的消息和工具结果按顺序补回来，就能恢复出继续执行所需的上下文，不需要重放全部记录。[原文§04｜任务关闭以后，现场为什么还能恢复？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_04-%E4%BB%BB%E5%8A%A1%E5%85%B3%E9%97%AD%E4%BB%A5%E5%90%8E-%E7%8E%B0%E5%9C%BA%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%83%BD%E6%81%A2%E5%A4%8D)
- **N4-22** checkpoint 相当于快照，给出某个时刻的紧凑状态；恢复点之后的记录相当于增量日志，补齐从那个时刻到任务关闭之间发生的变化。[原文§04｜任务关闭以后，现场为什么还能恢复？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_04-%E4%BB%BB%E5%8A%A1%E5%85%B3%E9%97%AD%E4%BB%A5%E5%90%8E-%E7%8E%B0%E5%9C%BA%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%83%BD%E6%81%A2%E5%A4%8D)
- **N4-23** Codex 会恢复一份记录，标明哪些规则和环境信息已经加入历史，目的是避免再次追加相同的说明；窗口信息和最近使用的模型设置也会一起恢复。[原文§04｜任务关闭以后，现场为什么还能恢复？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_04-%E4%BB%BB%E5%8A%A1%E5%85%B3%E9%97%AD%E4%BB%A5%E5%90%8E-%E7%8E%B0%E5%9C%BA%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%83%BD%E6%81%A2%E5%A4%8D)

### 长期记忆

- **N4-24** 不是：新轮次成功启动以后，Codex 才尝试调度后台记忆流程，并且会话类型、功能配置和运行环境等条件都满足才真正开始；在原文分析的版本中这套机制默认关闭，需要在设置里打开启用本地记忆。[原文§05｜旧任务怎样变成跨任务的长期记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_05-%E6%97%A7%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E5%8F%98%E6%88%90%E8%B7%A8%E4%BB%BB%E5%8A%A1%E7%9A%84%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86)
- **N4-25** 后台流程从已经空闲一段时间的旧任务里挑选材料，当前正在执行的任务不参与：这样用户不用等记忆整理完就能继续当前任务，刚做完的任务也先放一放，避免结论还在变化就急着记下来；代价是新经验不会马上出现在长期记忆里。[原文§05｜旧任务怎样变成跨任务的长期记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_05-%E6%97%A7%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E5%8F%98%E6%88%90%E8%B7%A8%E4%BB%BB%E5%8A%A1%E7%9A%84%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86)
- **N4-26** 每项任务的 Rollout 单独处理：过滤出与记忆提炼有关的历史项后，调用专门的模型生成结构化结果，主要包括一份更详细的原始记忆和一份紧凑的任务摘要；没有值得复用的内容时可以返回空结果。[原文§第一阶段，怎样从一项旧任务里挑出经验？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E6%80%8E%E6%A0%B7%E4%BB%8E%E4%B8%80%E9%A1%B9%E6%97%A7%E4%BB%BB%E5%8A%A1%E9%87%8C%E6%8C%91%E5%87%BA%E7%BB%8F%E9%AA%8C)
- **N4-27** 想留下的不是流水账，而是可能改变未来行为的信息，例如稳定的用户偏好、难找的项目入口、已经验证过的工作流、失败原因和避坑方式；生成的记忆字段还会经过敏感信息清理。[原文§第一阶段，怎样从一项旧任务里挑出经验？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E6%80%8E%E6%A0%B7%E4%BB%8E%E4%B8%80%E9%A1%B9%E6%97%A7%E4%BB%BB%E5%8A%A1%E9%87%8C%E6%8C%91%E5%87%BA%E7%BB%8F%E9%AA%8C)
- **N4-28** 领取任务时，Codex 会加上一把有时间限制的锁，也就是租约；在租约有效期间，其他后台任务不能重复处理同一份历史。[原文§第一阶段，怎样从一项旧任务里挑出经验？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E6%80%8E%E6%A0%B7%E4%BB%8E%E4%B8%80%E9%A1%B9%E6%97%A7%E4%BB%BB%E5%8A%A1%E9%87%8C%E6%8C%91%E5%87%BA%E7%BB%8F%E9%AA%8C)
- **N4-29** 同一个项目可能在几项任务里都提到测试命令，一项任务说旧命令可用，另一项后来发现它已经失效，用户的偏好也可能经过几次纠正才稳定；只会不断追加，重复和冲突很快就会积累。[原文§第二阶段，为什么还要启动一个整理 Agent？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E5%90%AF%E5%8A%A8%E4%B8%80%E4%B8%AA%E6%95%B4%E7%90%86-agent)
- **N4-30** 把多项任务提炼出的经验放到一起，再与已有的记忆对照：重复的合并，互相矛盾的核对，已经失效的删除，并补上各自的适用范围；整理完再更新供新任务查阅的记忆文件，需要更新时由一个专门的内部 Agent 完成。[原文§第二阶段，为什么还要启动一个整理 Agent？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E5%90%AF%E5%8A%A8%E4%B8%80%E4%B8%AA%E6%95%B4%E7%90%86-agent)
- **N4-31** 全局租约保证同一时间只有一个整理流程修改共享记忆，避免并发覆盖；前后文件对比用来定位真正发生的变化，如果材料没有变化且已有记忆文件仍然有效，就不必浪费一次模型调用。[原文§第二阶段，为什么还要启动一个整理 Agent？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E5%90%AF%E5%8A%A8%E4%B8%80%E4%B8%AA%E6%95%B4%E7%90%86-agent)
- **N4-32** 三层查找路径：memory_summary.md 是目录，先告诉模型有哪些经验可查；需要具体做法时再读 MEMORY.md 和 skills；还要核对结论来源时，才继续查看对应的 Rollout 摘要和原始 Rollout。[原文§长期记忆的文件分层](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86%E7%9A%84%E6%96%87%E4%BB%B6%E5%88%86%E5%B1%82)
- **N4-33** raw_memories.md 汇集第一阶段提炼出的材料，交给第二阶段继续整理；它不属于新任务日常查询的入口。[原文§长期记忆的文件分层](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86%E7%9A%84%E6%96%87%E4%BB%B6%E5%88%86%E5%B1%82)
- **N4-34** 记忆根目录位于 Codex home 下，是跨任务共享的工作区，并不是每个项目天然拥有一套物理隔离的记忆库；所以每条经验要记录自己适用于哪个项目和范围，避免把一个项目的做法搬到另一个项目。[原文§长期记忆的文件分层](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86%E7%9A%84%E6%96%87%E4%BB%B6%E5%88%86%E5%B1%82)
- **N4-35** 记忆越多，一次性塞进上下文的办法越不成立，它只会把刚刚解决的上下文问题重新带回来；所以模型先看到的只是一段有 token 上限的导航摘要和使用说明，而不是全部经验。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-36** 先看目录：导航摘要放在开发者指令里；当前任务与目录里的某项经验有关时，再去 MEMORY.md 里搜索关键词，必要时继续读取一两份最相关的 Rollout 摘要或 skill；找不到相关信息就停止查记忆，正常完成任务。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-37** 这条本地检索路径通过文本子串搜索和按行读取来定位记忆：优点是精确、可解释，缺点是可能漏掉文字不同但语义相近的内容。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-38** Codex 要求模型依赖记忆回答时附带结构化引用，说明用了 MEMORY.md 的哪几行、来自哪个 Rollout，并据此更新记忆的使用次数和最近使用时间；但被引用只说明记忆影响了回答，不代表内容正确，仍要结合当前代码和工具结果重新验证。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-39** 只有用户直接要求新增、更正或删除记忆时，Codex 才单独写一份用户纠正说明，等后续整理流程把它与现有证据一起合并；这样虽然绕了一步，却能避免一次临时回答直接破坏整本长期手册。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-40** Codex 不会看到某条记忆很久没用就立刻删除：先从第一阶段的经验记录里筛出仍在保留期内的，再参考使用次数和最近使用时间选一部分交给第二阶段整理；长期没用、上一轮整理也没选中的记录会被分批清理。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)
- **N4-41** 删掉这些原始材料不会立即改动 MEMORY.md 和 memory_summary.md；要等下一次整理，这两份供模型查阅的文件才会更新。[原文§06｜新任务怎样找到旧经验，又怎样忘掉它？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_06-%E6%96%B0%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E6%89%BE%E5%88%B0%E6%97%A7%E7%BB%8F%E9%AA%8C-%E5%8F%88%E6%80%8E%E6%A0%B7%E5%BF%98%E6%8E%89%E5%AE%83)

### 补充考点

- **N4-42** 没有启用 Token 预算策略时，服务端支持远程压缩就交给服务端处理，不支持才使用本地总结。[原文§本地压缩怎样重建历史？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#%E6%9C%AC%E5%9C%B0%E5%8E%8B%E7%BC%A9%E6%80%8E%E6%A0%B7%E9%87%8D%E5%BB%BA%E5%8E%86%E5%8F%B2)
- **N4-43** 在原文分析的版本中，这套机制默认关闭，需要在设置里打开启用本地记忆。[原文§05｜旧任务怎样变成跨任务的长期记忆？](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html#_05-%E6%97%A7%E4%BB%BB%E5%8A%A1%E6%80%8E%E6%A0%B7%E5%8F%98%E6%88%90%E8%B7%A8%E4%BB%BB%E5%8A%A1%E7%9A%84%E9%95%BF%E6%9C%9F%E8%AE%B0%E5%BF%86)
