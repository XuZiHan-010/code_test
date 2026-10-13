# Claude Code 基础入门 原文章节摘编

仅依据各题所列的小林面试笔记原文章节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分明确标注，不使用其他网站补充。整理日期：2026-10-13。

## 1. 基础使用技巧

原文：[Claude Code 使用教程：新手入门必学的基础技巧](https://xiaolinnote.com/claudecode/basics/cc_use.html)。

### 启动、模式与需求规划

- **F1-1** Claude Code 是装在终端里的 AI 编程助手，不用切换窗口就能直接读写项目文件、执行命令、搜索代码，甚至跑测试、提交代码。[原文§Claude Code 使用教程：新手入门必学的基础技巧](https://xiaolinnote.com/claudecode/basics/cc_use.html#claude-code-%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B-%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8%E5%BF%85%E5%AD%A6%E7%9A%84%E5%9F%BA%E7%A1%80%E6%8A%80%E5%B7%A7)
- **F1-2** 原文称只要在项目目录下启动 Claude Code，它就会自动读取项目根目录的 CLAUDE.md，知道这个项目做什么、用了什么技术栈、代码规范是什么。[原文§CLAUDE.md 是什么？](https://xiaolinnote.com/claudecode/basics/cc_use.html#claude-md-%E6%98%AF%E4%BB%80%E4%B9%88)
- **F1-3** Normal 模式下 Claude 的每一步操作都要用户确认后才执行，例如创建文件前会先问是否允许。[原文§三个工作模式](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F1-4** Normal 模式逐步确认，每一步都要用户同意；Auto-accept 模式自动执行所有操作，不需要逐个确认。[原文§三个工作模式](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F1-5** Plan 模式下先让 Claude 规划项目结构和开发步骤而不写代码，用来避免一上来就让它写、结果与自己想的完全不一样又要改来改去。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-6** Auto-accept 适合对 Claude 已经比较信任的场景；原文建议新手先用 Normal 模式，看清它的每一步操作。[原文§三个工作模式](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F1-7** 示例提示词包含三点：明确技术栈、明确功能、明确要求先规划而不写代码。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-8** 明确技术栈是为了不让 Claude 自己猜，明确功能让它对准需求；原文称提示词越具体，Claude 输出的质量越高。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-9** 原文称计划是写到一个 md 文档里的，这样执行任务时不会做着做着就忘记执行到哪了，还可以用 ctrl+g 去编辑这份计划文档。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-10** 规划完成后可以选择给 Claude 反馈，让它调整方案，或者用 ctrl+g 直接编辑计划文档。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-11** 直接把问题现象告诉 Claude Code，让它帮忙排查；它修复后再次访问即可。[原文§02｜用 Plan 模式规划](https://xiaolinnote.com/claudecode/basics/cc_use.html#_02-%E7%94%A8-plan-%E6%A8%A1%E5%BC%8F%E8%A7%84%E5%88%92)
- **F1-12** 用户自己还没想清楚时，让 Claude 先不写代码而是提问，它会像产品经理一样问出用户没想到的问题；本质是让它帮忙做需求分析，而不是一上来就埋头写代码。[原文§03｜需求不明确？让 Claude 来「采访」你](https://xiaolinnote.com/claudecode/basics/cc_use.html#_03-%E9%9C%80%E6%B1%82%E4%B8%8D%E6%98%8E%E7%A1%AE-%E8%AE%A9-claude-%E6%9D%A5%E3%80%8C%E9%87%87%E8%AE%BF%E3%80%8D%E4%BD%A0)
- **F1-13** Claude 先确认了技术栈偏好、目标平台、核心功能、是否保存历史数据和界面风格。[原文§03｜需求不明确？让 Claude 来「采访」你](https://xiaolinnote.com/claudecode/basics/cc_use.html#_03-%E9%9C%80%E6%B1%82%E4%B8%8D%E6%98%8E%E7%A1%AE-%E8%AE%A9-claude-%E6%9D%A5%E3%80%8C%E9%87%87%E8%AE%BF%E3%80%8D%E4%BD%A0)

### Skill、文件引用与思考设置

- **F1-14** Skill 是由专业人员编写的能力扩展，包含复杂的指令、模板和参考文档；加载 frontend-design 后，Claude 按专业的设计标准重构页面，重新设计配色、布局、字体和交互动画。[原文§04｜页面不好看？用 Skill 美化](https://xiaolinnote.com/claudecode/basics/cc_use.html#_04-%E9%A1%B5%E9%9D%A2%E4%B8%8D%E5%A5%BD%E7%9C%8B-%E7%94%A8-skill-%E7%BE%8E%E5%8C%96)
- **F1-15** 安装成功后，可以在 /plugin 命令的 Installed 选项里看到这个 Skill 处于 enabled 状态。[原文§04｜页面不好看？用 Skill 美化](https://xiaolinnote.com/claudecode/basics/cc_use.html#_04-%E9%A1%B5%E9%9D%A2%E4%B8%8D%E5%A5%BD%E7%9C%8B-%E7%94%A8-skill-%E7%BE%8E%E5%8C%96)
- **F1-16** 示例直接写明想要的风格：简洁现代、暖色调、圆形倒计时显示，配合番茄的红色主题。[原文§04｜页面不好看？用 Skill 美化](https://xiaolinnote.com/claudecode/basics/cc_use.html#_04-%E9%A1%B5%E9%9D%A2%E4%B8%8D%E5%A5%BD%E7%9C%8B-%E7%94%A8-skill-%E7%BE%8E%E5%8C%96)
- **F1-17** 明确知道相关文件时，用 @ 指定可避免无关搜索和读取；未指定时，Claude 会自行搜索、读取项目文件来理解需求，可能占用大量上下文。原文主要建议能明确指定文件时就指定。 [原文§05｜用 @ 精准指定文件](https://xiaolinnote.com/claudecode/basics/cc_use.html#_05-%E7%94%A8-%E7%B2%BE%E5%87%86%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6)
- **F1-18** 单文件示例是 @./src/components/Timer.tsx，目录示例是 @./src/components/，多个文件可连续写 @./src/App.tsx @./src/styles/global.css。原文举例，明确指定一个 200 行组件后只需读取这 200 行，可减少无关文件占用；它在本节没有说引用目录会把所有文件正文一次性读入。 [原文§05｜用 @ 精准指定文件](https://xiaolinnote.com/claudecode/basics/cc_use.html#_05-%E7%94%A8-%E7%B2%BE%E5%87%86%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6)
- **F1-19** 用 @ 引用之后，Claude 就知道只改指定的文件，不会去动其他代码。[原文§05｜用 @ 精准指定文件](https://xiaolinnote.com/claudecode/basics/cc_use.html#_05-%E7%94%A8-%E7%B2%BE%E5%87%86%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6)
- **F1-20** 不指定文件时，Claude 为了理解需求会自己搜索和读取很多文件，每一行代码都占上下文空间；用 @ 精准指定后只需读取那几个文件。[原文§05｜用 @ 精准指定文件](https://xiaolinnote.com/claudecode/basics/cc_use.html#_05-%E7%94%A8-%E7%B2%BE%E5%87%86%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6)
- **F1-21** 原文建议在涉及数据结构设计、多组件协调、要兼顾边界情况和持久化的复杂功能上使用；简单问题不要滥用。[原文§06｜遇到复杂功能？用 ultrathink 深度思考](https://xiaolinnote.com/claudecode/basics/cc_use.html#_06-%E9%81%87%E5%88%B0%E5%A4%8D%E6%9D%82%E5%8A%9F%E8%83%BD-%E7%94%A8-ultrathink-%E6%B7%B1%E5%BA%A6%E6%80%9D%E8%80%83)
- **F1-22** ultrathink 只让这一轮临时把思考的努力等级拉到最高，用完就恢复原来的设置；用 /effort 或在 /model 里调整的努力等级是全局设置，会在后续所有对话里生效。[原文§06｜遇到复杂功能？用 ultrathink 深度思考](https://xiaolinnote.com/claudecode/basics/cc_use.html#_06-%E9%81%87%E5%88%B0%E5%A4%8D%E6%9D%82%E5%8A%9F%E8%83%BD-%E7%94%A8-ultrathink-%E6%B7%B1%E5%BA%A6%E6%80%9D%E8%80%83)
- **F1-23** 原文称新版本里只有 ultrathink 这一个关键词真正生效，think、think hard、think harder 只会被当成普通的提示词，不会真的加深思考。[原文§06｜遇到复杂功能？用 ultrathink 深度思考](https://xiaolinnote.com/claudecode/basics/cc_use.html#_06-%E9%81%87%E5%88%B0%E5%A4%8D%E6%9D%82%E5%8A%9F%E8%83%BD-%E7%94%A8-ultrathink-%E6%B7%B1%E5%BA%A6%E6%80%9D%E8%80%83)
- **F1-24** 原文称思考越深，消耗的 token 越多，响应也会更慢。[原文§06｜遇到复杂功能？用 ultrathink 深度思考](https://xiaolinnote.com/claudecode/basics/cc_use.html#_06-%E9%81%87%E5%88%B0%E5%A4%8D%E6%9D%82%E5%8A%9F%E8%83%BD-%E7%94%A8-ultrathink-%E6%B7%B1%E5%BA%A6%E6%80%9D%E8%80%83)

### 项目记忆、回滚与会话维护

- **F1-25** CLAUDE.md 放在项目根目录，Claude Code 每次启动时自动读取，作为理解项目的背景信息，例如项目做什么、用了什么技术栈、代码规范是什么。[原文§CLAUDE.md 是什么？](https://xiaolinnote.com/claudecode/basics/cc_use.html#claude-md-%E6%98%AF%E4%BB%80%E4%B9%88)
- **F1-26** /init 扫描项目结构后自动生成，默认用英文描述，主要记录命令、架构、样式等信息；它本质上是一个 md 文档，不满意的地方可以自己修改和补充。[原文§怎么创建 CLAUDE.md？](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%80%8E%E4%B9%88%E5%88%9B%E5%BB%BA-claude-md)
- **F1-27** 原文建议包含一句话的项目简介、技术栈、代码规范和可选的项目结构，并且越精准越好；写好代码这类 Claude 本来就知道的泛泛描述不该写。[原文§注意事项](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- **F1-28** 原文称详细的 API 文档太长、占上下文，应该用 @ 引用具体文件；CLAUDE.md 太长反而让 Claude 抓不住重点。[原文§注意事项](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- **F1-29** CLAUDE.md 是每次启动自动读取的长期项目背景；临时需求每次都变，把它们长期保留会使文件越来越长、占用上下文并遮住重点。原文因此把这类需求列为不应写入的内容，并提到用 /compact 或 /clear 处理会话。 [原文§注意事项](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- **F1-30** 原文的原则是每条信息都问自己：如果删掉这条，会不会让 Claude 犯错；不会就不写。[原文§注意事项](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- **F1-31** 原文称 CLAUDE.md 是活文档，应随项目开发定期更新，例如新功能完成后加进已完成功能列表、技术栈换了就修改对应部分，保持信息准确。[原文§注意事项](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- **F1-32** 文件恢复把改错的代码还原到选定节点；对话恢复同时退回当时的上下文，适合 Claude 已走错方向、需要彻底重来。仅口头要求撤销，则只还原文件变更，对话上下文仍保留。 [原文§08｜Claude 改错了怎么办？用 Rewind 回滚](https://xiaolinnote.com/claudecode/basics/cc_use.html#_08-claude-%E6%94%B9%E9%94%99%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E-%E7%94%A8-rewind-%E5%9B%9E%E6%BB%9A)
- **F1-33** 直接让 Claude 撤销只回滚文件、不回滚对话，适合只是代码改错的情况；用 /rewind 或 Esc+Esc 回到某个节点时文件和对话都回滚，适合 Claude 走错方向、想彻底回到某个节点。[原文§三种「撤销」方式对比](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E7%A7%8D%E3%80%8C%E6%92%A4%E9%94%80%E3%80%8D%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94)
- **F1-34** 原文称 Rewind 只能回滚 Claude Code 直接创建或编辑的文件；执行 npm install 这类命令生成的 node_modules、package-lock.json 等文件，Rewind 无法撤销。[原文§三种「撤销」方式对比](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E7%A7%8D%E3%80%8C%E6%92%A4%E9%94%80%E3%80%8D%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94)
- **F1-35** 原文建议大改动之前先手动 git commit 一份存档，想完整回滚项目状态时用 Git；Claude 一开始跑偏就立刻用 Esc+Esc 回滚，别让它一路错下去。[原文§三种「撤销」方式对比](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%B8%89%E7%A7%8D%E3%80%8C%E6%92%A4%E9%94%80%E3%80%8D%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94)
- **F1-36** 改动前先 git add 并 commit 存档；出了问题再用 git checkout 或 git reset 回退。[原文§08｜Claude 改错了怎么办？用 Rewind 回滚](https://xiaolinnote.com/claudecode/basics/cc_use.html#_08-claude-%E6%94%B9%E9%94%99%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E-%E7%94%A8-rewind-%E5%9B%9E%E6%BB%9A)
- **F1-37** /context 显示当前上下文占用了多少、还剩多少，以及各部分的占比，例如 skill 调用和对话各占多少；占用超过 70% 时 Claude 开始顾此失彼，需要帮它减负。[原文§先看看 token 占了多少](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E5%85%88%E7%9C%8B%E7%9C%8B-token-%E5%8D%A0%E4%BA%86%E5%A4%9A%E5%B0%91)
- **F1-38** 继续做同一个功能、之前的上下文还有用时，用 /compact 压缩对话并保留关键信息；切换到不相关的任务或想重新开始时，用 /clear 彻底清空。[原文§小结一下](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E5%B0%8F%E7%BB%93%E4%B8%80%E4%B8%8B)
- **F1-39** /compact 会把之前的对话压缩成一份摘要，保留关键信息、丢掉冗余细节。[原文§先试 /compact：压缩上下文](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E5%85%88%E8%AF%95-compact-%E5%8E%8B%E7%BC%A9%E4%B8%8A%E4%B8%8B%E6%96%87)
- **F1-40** 直接重新打开 claude 是一个全新的会话，之前的对话历史不在；claude --resume 从列表里选一个历史会话恢复，之前聊了什么、改了哪些文件、上下文都还在，claude --continue 则直接恢复最近一次。[原文§10｜ 关掉终端对话就没了？用 resume 恢复](https://xiaolinnote.com/claudecode/basics/cc_use.html#_10-%E5%85%B3%E6%8E%89%E7%BB%88%E7%AB%AF%E5%AF%B9%E8%AF%9D%E5%B0%B1%E6%B2%A1%E4%BA%86-%E7%94%A8-resume-%E6%81%A2%E5%A4%8D)

### 独立代码审查

- **F1-41** 子代理在独立的上下文里审查，不受之前写代码时的思维惯性影响，更容易发现潜在问题；而让写代码的 Claude 自己审查，原文说它多少会手下留情。[原文§使用子代理审查代码](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%BD%BF%E7%94%A8%E5%AD%90%E4%BB%A3%E7%90%86%E5%AE%A1%E6%9F%A5%E4%BB%A3%E7%A0%81)
- **F1-42** 要用自然语言描述子代理的用途、职责和触发场景，并为它选择可用的工具来控制它能执行的操作，另外还要选作用域、模型和记忆范围；生成的配置文件相当于一份工作说明书。[原文§创建一个代码审查子代理](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E4%BB%A3%E7%A0%81%E5%AE%A1%E6%9F%A5%E5%AD%90%E4%BB%A3%E7%90%86)
- **F1-43** Skill 在主对话里工作，加载的指南、读写的文件和生成的代码都占用主会话的上下文；子代理有独立的上下文窗口，读多少文件都只占它自己的空间，结束后只把一份精炼的结果摘要汇报回来。[原文§子代理和 Skills 有什么区别？](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E5%AD%90%E4%BB%A3%E7%90%86%E5%92%8C-skills-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **F1-44** 子代理把审查结果汇报回来后，再让 Claude 针对性地修复，例如只修复标记为严重和中等的问题。[原文§使用子代理审查代码](https://xiaolinnote.com/claudecode/basics/cc_use.html#%E4%BD%BF%E7%94%A8%E5%AD%90%E4%BB%A3%E7%90%86%E5%AE%A1%E6%9F%A5%E4%BB%A3%E7%A0%81)

## 2. `/powerup` 互动课程

原文：[Claude Code /powerup 教程：18 个官方互动课程全解析](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。

### 入门与权限控制

- **F2-1** 原文称 /powerup 是 2.1.90 及以后才新增的命令，版本太旧看不到；先用 claude --version 查版本，低于该版本就用 npm update 升级。[原文§先确认你的版本](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%85%88%E7%A1%AE%E8%AE%A4%E4%BD%A0%E7%9A%84%E7%89%88%E6%9C%AC)
- **F2-2** 每个课程先展示一段文字说明，再播放一段动画演示告诉你功能怎么用；右上角还有进度条，每完成一个课程就解锁一格。[原文§打开 /powerup](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%89%93%E5%BC%80-powerup)
- **F2-3** 原文说明引用单个文件时 Claude 只读取这个文件的内容，而引用整个目录时拿到的是这个目录的文件列表。[原文§@ 引用文件](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%BC%95%E7%94%A8%E6%96%87%E4%BB%B6)
- **F2-4** 原文称没有特殊语法，直接在提示词里说清楚即可，例如请重点看 Timer.tsx 的第 10 行到第 20 行，Claude 会自己定位过去。[原文§@ 引用文件](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%BC%95%E7%94%A8%E6%96%87%E4%BB%B6)
- **F2-5** 在 .claude/settings.json 里用 permissions.deny 规则把路径挡住，例如 Read(./.env)、Read(./secrets/**)；配上之后 Claude 想读这些文件也会被规则拦下来。[原文§用 permissions 规则屏蔽敏感文件](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-permissions-%E8%A7%84%E5%88%99%E5%B1%8F%E8%94%BD%E6%95%8F%E6%84%9F%E6%96%87%E4%BB%B6)
- **F2-6** Normal 每步操作都先征求同意，最稳妥；accept edits 改文件不再问，但执行命令仍要确认；Plan 只看不改，先出方案；auto 编辑和命令都不问，由后台的安全分类器判断哪些动作安全。[原文§四个工作模式](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%9B%9B%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F2-7** 原文称 auto 模式下由 Claude 自己用后台的安全分类器判断哪些动作是安全的，这一档的安全感来自 Claude 的判断而不是人工把关；accept edits 则保留了人对命令执行的确认。[原文§四个工作模式](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%9B%9B%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F2-8** 只有完全信任、任务又长又重复的场景才考虑切到 auto；日常写代码用 accept edits；复杂任务先用 plan 模式出方案。[原文§我的建议](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%88%91%E7%9A%84%E5%BB%BA%E8%AE%AE)
- **F2-9** 自带的回滚只能恢复 Claude 直接创建或编辑的文件；npm install 之类命令生成的文件它管不了，所以大改动之前要用 Git 存档。[原文§更靠谱的方式：Git](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%9B%B4%E9%9D%A0%E8%B0%B1%E7%9A%84%E6%96%B9%E5%BC%8F-git)

### 后台任务与持久信息

- **F2-10** 构建这类命令可能要跑一两分钟，正常模式下只能等着；放到后台之后可以继续和 Claude 聊别的，让它改代码或回答问题。[原文§04｜Run in the background：让 Claude 在后台干活](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#_04-run-in-the-background-%E8%AE%A9-claude-%E5%9C%A8%E5%90%8E%E5%8F%B0%E5%B9%B2%E6%B4%BB)
- **F2-11** 命令跑完后 Claude 会主动告知结果；中途出错，它也会把错误信息捞出来给你看。[原文§怎么在后台运行？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E5%9C%A8%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C)
- **F2-12** /tasks 会列出所有后台任务的状态：正在运行、已完成，还是出错了。[原文§查看后台任务](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%9F%A5%E7%9C%8B%E5%90%8E%E5%8F%B0%E4%BB%BB%E5%8A%A1)
- **F2-13** 耗时长但不需要盯着的任务特别适合，例如项目构建、跑测试用例、安装依赖和数据库迁移；这些任务可能要跑几十秒甚至几分钟，没必要在终端里干等。[原文§适合什么场景？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)
- **F2-14** 在命令末尾加 & 就能让任务在后台跑，不用干等；用 /tasks 可以查看后台任务的状态。[原文§适合什么场景？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)
- **F2-15** 项目级 CLAUDE.md 写技术栈、目录结构等项目信息，可提交到 Git 供团队共享；个人项目级 CLAUDE.local.md 写临时调试偏好、sandbox 地址等只有自己用的内容；用户级 ~/.claude/CLAUDE.md 写个人通用偏好，在所有项目里生效。[原文§CLAUDE.md 的几个层级](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#claude-md-%E7%9A%84%E5%87%A0%E4%B8%AA%E5%B1%82%E7%BA%A7)
- **F2-16** 原文称它适合放只有自己用的内容，例如临时调试偏好、sandbox 地址，通常加到 .gitignore 里不提交，这样不会干扰到队友。[原文§CLAUDE.md 的几个层级](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#claude-md-%E7%9A%84%E5%87%A0%E4%B8%AA%E5%B1%82%E7%BA%A7)
- **F2-17** /memory 打开编辑界面，可以查看和修改所有记忆文件、开关自动记忆，用来管理跨项目的个人记忆；/init 则是扫描项目结构后自动生成项目级的 CLAUDE.md。[原文§/memory 管理记忆](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#memory-%E7%AE%A1%E7%90%86%E8%AE%B0%E5%BF%86)
- **F2-18** 原文称用自然语言让 Claude 记住某件事时，它会自己判断这条信息值不值得记，值得就写进 auto memory；CLAUDE.md 则是人自己创建和维护的文件。[原文§/memory 管理记忆](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#memory-%E7%AE%A1%E7%90%86%E8%AE%B0%E5%BF%86)
- **F2-19** 几个层级的内容在启动时会一起合并进上下文；越具体的层级优先级越高，项目级高于用户级。[原文§CLAUDE.md 的几个层级](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#claude-md-%E7%9A%84%E5%87%A0%E4%B8%AA%E5%B1%82%E7%BA%A7)

### MCP、Skill、Hook 与子代理

- **F2-20** Claude Code 自带的能力限于读写文件、执行命令、搜索代码；MCP 即模型上下文协议，相当于外挂接口，把外部工具接入后，Claude 就能搜索网页、操作数据库、调用第三方 API。[原文§06｜Extend with tools：用 MCP 给 Claude 装外挂](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#_06-extend-with-tools-%E7%94%A8-mcp-%E7%BB%99-claude-%E8%A3%85%E5%A4%96%E6%8C%82)
- **F2-21** /mcp 会打开一个管理界面，可以在里面添加、删除和配置 MCP server。[原文§怎么管理 MCP？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E7%AE%A1%E7%90%86-mcp)
- **F2-22** 双横杠是分隔符：前面的是给 claude 的参数，后面的是用来启动 MCP server 的命令。[原文§怎么添加 MCP server？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E6%B7%BB%E5%8A%A0-mcp-server)
- **F2-23** 原文的 user 作用域安装示例在所有项目里可用；项目配置则供当前项目使用。它列出的配置位置有 ~/.claude/settings.json 和项目内 .claude/settings.json；需要团队共享时，可把配置写到项目根目录的 .mcp.json 并提交到 Git，让队友拉取使用。 [原文§怎么添加 MCP server？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E6%B7%BB%E5%8A%A0-mcp-server) [原文§实战：用 12306-mcp 查火车票](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AE%9E%E6%88%98-%E7%94%A8-12306-mcp-%E6%9F%A5%E7%81%AB%E8%BD%A6%E7%A5%A8)
- **F2-24** 原文的做法是用 claude mcp list 或在 Claude Code 里用 /mcp 确认 server 已经装上，再直接提一个相关问题，看 Claude 是否调用这个 MCP 取回实时数据。[原文§实战：用 12306-mcp 查火车票](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AE%9E%E6%88%98-%E7%94%A8-12306-mcp-%E6%9F%A5%E7%81%AB%E8%BD%A6%E7%A5%A8)
- **F2-25** 原文演示了用它查询余票、车次和中转方案。[原文§实战：用 12306-mcp 查火车票](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AE%9E%E6%88%98-%E7%94%A8-12306-mcp-%E6%9F%A5%E7%81%AB%E8%BD%A6%E7%A5%A8)
- **F2-26** 用 claude mcp remove 命令，就可以把它干净地卸掉。[原文§移除 MCP server](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%A7%BB%E9%99%A4-mcp-server)
- **F2-27** 一份 Skill 就是一个 SKILL.md 文件加一些可选的辅助文件；plugin 是更大的集合，里面可以带 skills、hooks、命令等，可以通过 /plugin 命令安装。[原文§Skills：给 Claude 装技能包](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#skills-%E7%BB%99-claude-%E8%A3%85%E6%8A%80%E8%83%BD%E5%8C%85)
- **F2-28** 放在 ~/.claude/skills/ 下的 Skill 个人全局可用，适合跨项目复用；放在项目的 .claude/skills/ 下的只在当前项目可用。[原文§Skills：给 Claude 装技能包](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#skills-%E7%BB%99-claude-%E8%A3%85%E6%8A%80%E8%83%BD%E5%8C%85)
- **F2-29** PreToolUse 在工具执行之前触发，适合做输入校验、拦截不安全的操作；PostToolUse 在工具执行之后触发，适合做自动格式化、自动测试等后续处理。[原文§Hooks：给 Claude 的操作加「钩子」](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#hooks-%E7%BB%99-claude-%E7%9A%84%E6%93%8D%E4%BD%9C%E5%8A%A0%E3%80%8C%E9%92%A9%E5%AD%90%E3%80%8D)
- **F2-30** 示例用 matcher 匹配 Edit 和 Write 两个工具，再从 stdin 的 JSON 里读出被修改文件的路径，交给 Prettier 格式化。[原文§怎么配置 Hooks？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E9%85%8D%E7%BD%AE-hooks)
- **F2-31** hook 脚本不是通过环境变量拿文件路径，而是从标准输入接收一段 JSON，要从里面解析出 tool_input.file_path；项目根目录可以用 $CLAUDE_PROJECT_DIR 取得。[原文§怎么配置 Hooks？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E9%85%8D%E7%BD%AE-hooks)
- **F2-32** 原文举了四个例子：自动格式化，每次修改文件后自动运行 Prettier 或 ESLint；自动测试，每次修改测试文件后自动跑相关测试；安全检查，每次修改配置文件后检查是否有敏感信息泄露；自动提交，每次修改完代码后自动 git add 并 commit。[原文§Hooks 能做什么？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#hooks-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88)
- **F2-33** 子代理有自己独立的上下文空间，读了多少文件、分析了多少代码都只占它自己的上下文，对主会话没有影响；干完后只把一份精炼的结果摘要汇报回来，占用很小。[原文§为什么需要子代理？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E5%AD%90%E4%BB%A3%E7%90%86)
- **F2-34** 向导依次配置作用域、用自然语言描述的职责、可用工具和使用的模型：职责描述决定它做什么，可用工具决定它能使用哪些工具。[原文§怎么创建子代理？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%80%8E%E4%B9%88%E5%88%9B%E5%BB%BA%E5%AD%90%E4%BB%A3%E7%90%86)
- **F2-35** 原文列出的场景有代码审查、写测试、查文档和多文件批量修改：审查需要独立视角，查文档则是让子代理读完某个库的文档后总结要点再汇报。[原文§子代理适合什么场景？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AD%90%E4%BB%A3%E7%90%86%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)

### 跨设备、模型与会话维护

- **F2-36** /remote-control 让你从浏览器遥控本地终端里的会话，是向外暴露；/teleport 把 claude.ai 网页上的会话拉回本地终端继续做，是向内传送，两者方向相反。[原文§实际体验](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AE%9E%E9%99%85%E4%BD%93%E9%AA%8C)
- **F2-37** 原文称远程控制时 Claude Code 实际仍跑在本地电脑的终端里，本地的文件、依赖和环境都不动，只是多了一条从浏览器操作它的遥控线。[原文§/remote-control：把本地会话「暴露」给网页](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#remote-control-%E6%8A%8A%E6%9C%AC%E5%9C%B0%E4%BC%9A%E8%AF%9D%E3%80%8C%E6%9A%B4%E9%9C%B2%E3%80%8D%E7%BB%99%E7%BD%91%E9%A1%B5)
- **F2-38** /teleport 会把对应的分支和整段对话历史带到当前终端；它需要 claude.ai 的订阅才能使用。[原文§/teleport：把网页上的会话「传送」到终端](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#teleport-%E6%8A%8A%E7%BD%91%E9%A1%B5%E4%B8%8A%E7%9A%84%E4%BC%9A%E8%AF%9D%E3%80%8C%E4%BC%A0%E9%80%81%E3%80%8D%E5%88%B0%E7%BB%88%E7%AB%AF)
- **F2-39** /model 切换的是用哪个模型；/effort 调节的是它在回答之前愿意花多少算力去推敲问题。原文把后者作为切换模型之外的另一项调节。[原文§用 /effort 调节思考深度](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-effort-%E8%B0%83%E8%8A%82%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6)
- **F2-40** 原文的组合建议是：快速的格式转换用 Haiku 配 low，架构设计用 Opus 配 xhigh 或 max；简单问题不必用高档位，复杂问题才值得。[原文§模型 + 思考深度的组合策略](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%A8%A1%E5%9E%8B-%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6%E7%9A%84%E7%BB%84%E5%90%88%E7%AD%96%E7%95%A5)
- **F2-41** 原文称思考档位不是越高越好，每一档都有最合适的场景；max 容易过度思考、钻牛角尖，建议先做小范围评测确认有提升，再大规模使用。[原文§用 /effort 调节思考深度](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-effort-%E8%B0%83%E8%8A%82%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6)
- **F2-42** claude --resume 会列出已保存的历史对话，让你选择恢复哪一个；claude --continue 或 claude -c 直接恢复最近一次对话，省去选择的步骤。[原文§claude --resume：恢复上次的对话](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#claude-resume-%E6%81%A2%E5%A4%8D%E4%B8%8A%E6%AC%A1%E7%9A%84%E5%AF%B9%E8%AF%9D)
- **F2-43** 原文称接下来的任务与之前完全不相关时，用 /clear 彻底清空对话历史，给 Claude 一个全新的开始。[原文§/clear：彻底清空对话](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#clear-%E5%BD%BB%E5%BA%95%E6%B8%85%E7%A9%BA%E5%AF%B9%E8%AF%9D)

### 补充考点

- **F2-44** 确定明白了就按回车，代表已经掌握这个课程；想回到命令页面，就按 ESC 键退出 /powerup 的页面。[原文§01｜Talk to your codebase：与代码库对话](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#_01-talk-to-your-codebase-%E4%B8%8E%E4%BB%A3%E7%A0%81%E5%BA%93%E5%AF%B9%E8%AF%9D)
- **F2-45** 可以连续写多个 @ 引用，用空格隔开即可，例如同时引用一个组件文件和一个全局样式文件。[原文§@ 引用文件](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%BC%95%E7%94%A8%E6%96%87%E4%BB%B6)
- **F2-46** 上下文窗口是有上限的，主流的 Sonnet 和 Opus 模型标配大约 200k token，部分模型还提供 1M 的长上下文版；用 @ 精准指定文件后，Claude 只需读取指定的那几个文件，上下文占用非常小。[原文§为什么 @ 这么重要？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E4%B8%BA%E4%BB%80%E4%B9%88-%E8%BF%99%E4%B9%88%E9%87%8D%E8%A6%81)
- **F2-47** Claude Code 有四个工作模式，按 Shift+Tab 可以在它们之间循环切换。[原文§四个工作模式](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%9B%9B%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F2-48** Plan 模式特别适合复杂的开发任务，例如重构一个模块或做比较大的新功能，先让 Claude 规划、看思路对不对，比直接动手改安全得多；auto 模式不监督时可能改出不想要的东西，但任务又长又琐碎时，例如跑整套迁移脚本、批量改同类文件，它能省去一直按确认的疲劳。[原文§四个工作模式](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%9B%9B%E4%B8%AA%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)
- **F2-49** 不是。回滚的不仅仅是文件内容，对话上下文也会一起回滚。[原文§回滚的范围](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%9B%9E%E6%BB%9A%E7%9A%84%E8%8C%83%E5%9B%B4)
- **F2-50** 越精准越好，不是越长越好。[原文§写什么、不写什么？](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%86%99%E4%BB%80%E4%B9%88%E3%80%81%E4%B8%8D%E5%86%99%E4%BB%80%E4%B9%88)
- **F2-51** 它是 Anthropic 官方推出的明星 skill，装机量已经超过 27 万次；核心作用是把 Claude 生成前端代码时那种一眼 AI 味治好，让页面更像真人设计师做出来的。[原文§实战：用一行命令装上 frontend-design](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E5%AE%9E%E6%88%98-%E7%94%A8%E4%B8%80%E8%A1%8C%E5%91%BD%E4%BB%A4%E8%A3%85%E4%B8%8A-frontend-design)
- **F2-52** 它们是一对跨设备协作的命令，方向正好相反，原文建议把两个放在一起理解。[原文§09｜Code from anywhere：随时随地编码](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#_09-code-from-anywhere-%E9%9A%8F%E6%97%B6%E9%9A%8F%E5%9C%B0%E7%BC%96%E7%A0%81)
- **F2-53** low、medium、high、xhigh 这四档设定之后会跨 session 记住，下次启动还是这个档；只有 max 是一次性的，会话结束就自动失效，不用担心忘了切回来一直烧 token。[原文§用 /effort 调节思考深度](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-effort-%E8%B0%83%E8%8A%82%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6)
- **F2-54** 不是。官方已经明确说明，新版本里只有 ultrathink 这一个关键词真正生效，其他几个只会被当成普通的提示词，不会真的加深思考。[原文§用 /effort 调节思考深度](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-effort-%E8%B0%83%E8%8A%82%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6)
- **F2-55** medium 是成本敏感场景的折中档，牺牲一点智能换效率，适合日常修小 bug、写已有模式下的功能。[原文§用 /effort 调节思考深度](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E7%94%A8-effort-%E8%B0%83%E8%8A%82%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6)
- **F2-56** ultrathink 是遇到硬骨头时这一轮临时拉到最高档；/effort 是长期设定一个巡航档位，两者配合使用。[原文§ultrathink：临时顶到最高挡](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#ultrathink-%E4%B8%B4%E6%97%B6%E9%A1%B6%E5%88%B0%E6%9C%80%E9%AB%98%E6%8C%A1)
- **F2-57** 边际作用被削弱了不少，因为 xhigh 本来就处在几乎总是深思考的状态；如果还在 high 或更低的档位，ultrathink 仍然是临时拉高一档的有用手段。[原文§模型 + 思考深度的组合策略](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#%E6%A8%A1%E5%9E%8B-%E6%80%9D%E8%80%83%E6%B7%B1%E5%BA%A6%E7%9A%84%E7%BB%84%E5%90%88%E7%AD%96%E7%95%A5)
- **F2-58** 它显示当前上下文窗口的使用情况；发现 Claude 开始犯迷糊、答非所问时，先用它看看是不是上下文快满了。[原文§/context：看看 Claude 还有多少「脑容量」](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#context-%E7%9C%8B%E7%9C%8B-claude-%E8%BF%98%E6%9C%89%E5%A4%9A%E5%B0%91%E3%80%8C%E8%84%91%E5%AE%B9%E9%87%8F%E3%80%8D)
- **F2-59** 上下文用了 70% 以上，Claude 就容易顾此失彼；这时用 /compact 把之前的对话压缩成摘要，保留关键信息、丢掉冗余细节，让它重新清醒过来。[原文§/compact：给 Claude 减负](https://xiaolinnote.com/claudecode/basics/cc_powerup.html#compact-%E7%BB%99-claude-%E5%87%8F%E8%B4%9F)

## 3. Claude Code 工程化六件套

原文：[Claude Code 工程化指南：CLAUDE.md、Skills、Subagents、MCP、Hooks、Plugins 一篇讲透](https://xiaolinnote.com/claudecode/basics/cc_engineering.html)。

### 六种能力的职责

- **F3-1** 放在项目根目录的 CLAUDE.md 在每次开新会话时被自动读进来，放在对话的最前面，之后的每句话都在它打底的前提下被理解；相当于钉在工位上的入职手册，不用每天重新培训。[原文§每次新会话都要重新交代一遍？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E6%AF%8F%E6%AC%A1%E6%96%B0%E4%BC%9A%E8%AF%9D%E9%83%BD%E8%A6%81%E9%87%8D%E6%96%B0%E4%BA%A4%E4%BB%A3%E4%B8%80%E9%81%8D)
- **F3-2** 子目录里的 CLAUDE.md 不是启动就加载，而是等 Claude 读到那个子目录下的文件时才带进来；大项目各模块规范不同时可以各放各的，干到哪个模块，哪份规矩才进场。[原文§CLAUDE.md 放哪、怎么被加载？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#claude-md-%E6%94%BE%E5%93%AA%E3%80%81%E6%80%8E%E4%B9%88%E8%A2%AB%E5%8A%A0%E8%BD%BD)
- **F3-3** 手写的 CLAUDE.md 是人定的规矩；自动记忆是 Claude 在干活过程中自己记下的经验，例如构建产物在哪个目录、用户喜欢先写测试，存到它的记忆目录里，下次会话自动想起。原文称你写规矩、它记经验。[原文§CLAUDE.md 放哪、怎么被加载？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#claude-md-%E6%94%BE%E5%93%AA%E3%80%81%E6%80%8E%E4%B9%88%E8%A2%AB%E5%8A%A0%E8%BD%BD)
- **F3-4** CLAUDE.md 里的每个字每次会话都要占上下文，不管这次用不用得上；三千字的审查清单在改错别字的任务里照样加载、占地方并分散注意力，所以用时才需要的专项流程应放进 Skill。[原文§为什么不能全塞进 CLAUDE.md？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E5%85%A8%E5%A1%9E%E8%BF%9B-claude-md)
- **F3-5** 启动时 Claude 只加载所有 Skill 的名字和一句话描述，正文一个字都不读；等用户提出相关任务、发现描述对得上，才把正文完整读进来。[原文§一个 Skill 长什么样？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%80%E4%B8%AA-skill-%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7)
- **F3-6** 自动选择是 Claude 扫一眼描述列表，发现有个 Skill 管这件事就自己加载；显式调用是用户输入斜杠加名字，例如 /code-review，强制唤起。[原文§一个 Skill 长什么样？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%80%E4%B8%AA-skill-%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7)
- **F3-7** 在项目的 .claude/skills/code-review/ 目录下放一个 SKILL.md：frontmatter 写 name 和说明什么时候用的 description，正文写检查重点和统一的输出格式，例如按问题、位置、建议三栏输出。[原文§举个例子，把 code review 清单做成 Skill](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E6%8A%8A-code-review-%E6%B8%85%E5%8D%95%E5%81%9A%E6%88%90-skill)
- **F3-8** 原文举例：做全仓库审查时它搜了几十个文件、读了一堆代码，每一次搜索结果和每一段文件内容都堆在主对话里，审查完后上下文被这些信息灌满，开始记不清前面说过的话。[原文§举个例子，把 code review 清单做成 Skill](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E6%8A%8A-code-review-%E6%B8%85%E5%8D%95%E5%81%9A%E6%88%90-skill)
- **F3-9** 主对话把任务派出去，Subagent 在一个完全独立的上下文里搜索、试错、翻文件，这些过程都留在它那里，污染不到主对话；干完后只把汇总结果交回来。[原文§主对话为什么越聊越笨？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BB%E5%AF%B9%E8%AF%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E8%B6%8A%E8%81%8A%E8%B6%8A%E7%AC%A8)
- **F3-10** 安全漏洞、性能隐患、测试覆盖三路检查互不依赖，可以派给三个 Subagent 同时跑。[原文§主对话为什么越聊越笨？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BB%E5%AF%B9%E8%AF%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E8%B6%8A%E8%81%8A%E8%B6%8A%E7%AC%A8)
- **F3-11** 原文示例在系统提示里写明只做审查不做修改、重点看什么、最终只输出问题列表与修改建议而不贴大段代码原文；并建议只往外派查清楚一件事这种边界干净的活。[原文§举个例子，一个 code-review 小分队成员的配置](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E4%B8%80%E4%B8%AA-code-review-%E5%B0%8F%E5%88%86%E9%98%9F%E6%88%90%E5%91%98%E7%9A%84%E9%85%8D%E7%BD%AE)
- **F3-12** tools 字段只给审查 agent 读文件和搜索的权限、不给写权限，它想改代码也改不了，天然安全；model 字段让翻日志、批量搜索这类体力活用便宜快速的模型，需要深度推理时再用贵的，把成本压下来。[原文§Subagent 是怎么配出来的？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#subagent-%E6%98%AF%E6%80%8E%E4%B9%88%E9%85%8D%E5%87%BA%E6%9D%A5%E7%9A%84)
- **F3-13** 模型只是在生成文字，没有一条真实的通道去调用外部系统；MCP 给 AI 和外部工具之间定了统一的插口，工具方照协议实现一个 MCP Server，任何支持 MCP 的 AI 应用都能直接接上使用。[原文§会「说」不会「做」是什么意思？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%BC%9A%E3%80%8C%E8%AF%B4%E3%80%8D%E4%B8%8D%E4%BC%9A%E3%80%8C%E5%81%9A%E3%80%8D%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D)
- **F3-14** 原文称工具本来就有好用的命令行时，例如 git、gh，直接在终端里敲命令就行，不一定非要 MCP；MCP 的价值在于那些没有现成命令行、或者需要保持长连接和鉴权状态的系统。[原文§MCP 协议到底约定了什么？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#mcp-%E5%8D%8F%E8%AE%AE%E5%88%B0%E5%BA%95%E7%BA%A6%E5%AE%9A%E4%BA%86%E4%BB%80%E4%B9%88)
- **F3-15** 接入时带上在 GitHub 上生成的访问令牌，放在 Authorization 请求头里。[原文§举个例子，接上 GitHub 之后能干什么](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E6%8E%A5%E4%B8%8A-github-%E4%B9%8B%E5%90%8E%E8%83%BD%E5%B9%B2%E4%BB%80%E4%B9%88)
- **F3-16** 规则最终都是变成文字交给模型去理解并遵守，而模型是概率生成的，大概率会遵守但没有机制保证百分之百；上下文一长规则被稀释，任务一复杂注意力被抢走，所以原文说提示词是建议，不是法律。[原文§写在提示词里的规则，为什么会被无视？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E5%86%99%E5%9C%A8%E6%8F%90%E7%A4%BA%E8%AF%8D%E9%87%8C%E7%9A%84%E8%A7%84%E5%88%99-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%A2%AB%E6%97%A0%E8%A7%86)
- **F3-17** Hook 让你在工作流程的关键节点上挂一段 shell 命令，节点一到命令就跑；这里没有模型参与，它理不理解、自不自觉都不影响执行，是程序层面的强制触发。[原文§写在提示词里的规则，为什么会被无视？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E5%86%99%E5%9C%A8%E6%8F%90%E7%A4%BA%E8%AF%8D%E9%87%8C%E7%9A%84%E8%A7%84%E5%88%99-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%A2%AB%E6%97%A0%E8%A7%86)
- **F3-18** 调用前的 Hook 用来拦截：检查这次操作是否合规，不合规就不让执行；调用后的 Hook 做善后，例如改完文件自动跑格式化。前者能阻止操作发生，后者在操作完成之后才运行。[原文§Hook 挂在哪些环节上？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#hook-%E6%8C%82%E5%9C%A8%E5%93%AA%E4%BA%9B%E7%8E%AF%E8%8A%82%E4%B8%8A)
- **F3-19** 命令以退出码 2 退出时这次操作被拦截，命令的报错信息会回传给 Claude，它看到之后会自己调整做法；退出码 0 表示正常放行。[原文§Hook 挂在哪些环节上？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#hook-%E6%8C%82%E5%9C%A8%E5%93%AA%E4%BA%9B%E7%8E%AF%E8%8A%82%E4%B8%8A)
- **F3-20** 把 Hook 挂在工具调用之前，matcher 匹配 Edit 和 Write；脚本取出这次要动的文件路径，命中 .env 或密钥文件就带着报错信息用退出码 2 退出。Claude 的操作被拦下并收到报错，会告诉用户文件被保护并改换方案。[原文§举个例子，自动格式化和敏感文件保护](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E8%87%AA%E5%8A%A8%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%92%8C%E6%95%8F%E6%84%9F%E6%96%87%E4%BB%B6%E4%BF%9D%E6%8A%A4)
- **F3-21** Plugin 是 Claude Code 配置的包管理，本身不提供新能力，只做打包和分发：把 Skills、Subagents、Hooks、MCP 配置装进一个盒子发布出去，别人一条命令装上，你更新了他跟着更新。[原文§换个项目就要重配一遍？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E6%8D%A2%E4%B8%AA%E9%A1%B9%E7%9B%AE%E5%B0%B1%E8%A6%81%E9%87%8D%E9%85%8D%E4%B8%80%E9%81%8D)
- **F3-22** plugin.json 是插件的身份证，写清名字、版本和描述；marketplace 负责分发，它可以就是一个 git 仓库，使用者先把仓库登记进来，再从里面挑插件安装。[原文§Plugin 里面装了什么？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#plugin-%E9%87%8C%E9%9D%A2%E8%A3%85%E4%BA%86%E4%BB%80%E4%B9%88)
- **F3-23** 手动复制容易漏、版本乱，自己几个项目里就躺着几个版本，团队里每个人抄的时间点不同，出了问题没法对齐；发布成插件后别人一条命令安装，更新了再拉一次就行。[原文§换个项目就要重配一遍？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E6%8D%A2%E4%B8%AA%E9%A1%B9%E7%9B%AE%E5%B0%B1%E8%A6%81%E9%87%8D%E9%85%8D%E4%B8%80%E9%81%8D)
- **F3-24** 原文称装别人的 Plugin 相当于把来路不明的 U 盘插进公司电脑：里面的 Hook 能在你的机器上执行任意命令，MCP 配置能连外部服务，所以装之前要看来源。[原文§举个例子，把前面这些配置装进一个 Plugin](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E6%8A%8A%E5%89%8D%E9%9D%A2%E8%BF%99%E4%BA%9B%E9%85%8D%E7%BD%AE%E8%A3%85%E8%BF%9B%E4%B8%80%E4%B8%AA-plugin)

### 组合与工程取舍

- **F3-25** CLAUDE.md 先让 Claude 了解项目；MCP 把 PR 改动从 GitHub 拉下来；审查派给 Subagent，它带着 Skill 里的团队清单在自己的上下文里逐个文件过；修复时 Hook 自动格式化并拦截敏感文件；审查意见再通过 MCP 评论回 PR，整套配置由 Plugin 分发。[原文§07｜六件套怎么配合打一套完整的？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#_07-%E5%85%AD%E4%BB%B6%E5%A5%97%E6%80%8E%E4%B9%88%E9%85%8D%E5%90%88%E6%89%93%E4%B8%80%E5%A5%97%E5%AE%8C%E6%95%B4%E7%9A%84)
- **F3-26** 原文称模型有知识但没有手：它能写出调用 GitHub 接口的完整代码，却不能直接去拉数据，因为它只是在生成文字，没有调用外部系统的通道；这要靠 MCP，而不是更多提示词。[原文§会「说」不会「做」是什么意思？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%BC%9A%E3%80%8C%E8%AF%B4%E3%80%8D%E4%B8%8D%E4%BC%9A%E3%80%8C%E5%81%9A%E3%80%8D%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D)
- **F3-27** 把配置归位打包后推到团队的 marketplace 仓库，同事用一条 /plugin install 命令安装，装完立刻拥有同样的整套能力；之后作者更新清单、发个新版本，同事更新一下就同步了。[原文§举个例子，把前面这些配置装进一个 Plugin](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90-%E6%8A%8A%E5%89%8D%E9%9D%A2%E8%BF%99%E4%BA%9B%E9%85%8D%E7%BD%AE%E8%A3%85%E8%BF%9B%E4%B8%80%E4%B8%AA-plugin)
- **F3-28** 手动复制容易漏、版本乱：自己的几个项目里躺着同一个 Skill 的几个版本，哪个最新都说不清；团队里每个人抄作业的时间点不一样，手上的配置千差万别，出了问题没法对齐。[原文§换个项目就要重配一遍？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E6%8D%A2%E4%B8%AA%E9%A1%B9%E7%9B%AE%E5%B0%B1%E8%A6%81%E9%87%8D%E9%85%8D%E4%B8%80%E9%81%8D)
- **F3-29** 每次会话都要重新交代项目背景用 CLAUDE.md；专项知识和流程、用时才需要用 Skills；中间过程太多、主对话被污染用 Subagents；需要访问 GitHub、数据库等外部系统用 MCP；规则必须百分百执行用 Hooks；配置要跨项目复用、团队共享用 Plugins。[原文§07｜六件套怎么配合打一套完整的？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#_07-%E5%85%AD%E4%BB%B6%E5%A5%97%E6%80%8E%E4%B9%88%E9%85%8D%E5%90%88%E6%89%93%E4%B8%80%E5%A5%97%E5%AE%8C%E6%95%B4%E7%9A%84)

### 补充考点

- **F3-30** 命令要写全，不要写跑一下测试，而要写出能直接复制执行的完整命令；禁令要写死，尽量不要改这种软话没用，就直接写不许改。[原文§一份像样的 CLAUDE.md 长什么样？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%80%E4%BB%BD%E5%83%8F%E6%A0%B7%E7%9A%84-claude-md-%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7)
- **F3-31** 因为这个文件是每次会话都全量加载的，塞得越多，真正重要的规则就被稀释得越狠；有人写了一千多行，结果 Claude 该忘的还是忘。[原文§一份像样的 CLAUDE.md 长什么样？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%B8%80%E4%BB%BD%E5%83%8F%E6%A0%B7%E7%9A%84-claude-md-%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7)
- **F3-32** 早期的解法是各写各的插件，OpenAI 一套接法，Claude 一套接法，每个工具还得为每家 AI 单独适配一遍，工具方累，用户也乱；MCP 就像 USB-C，以前每个手机一种充电口，现在一根线走天下。[原文§会「说」不会「做」是什么意思？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E4%BC%9A%E3%80%8C%E8%AF%B4%E3%80%8D%E4%B8%8D%E4%BC%9A%E3%80%8C%E5%81%9A%E3%80%8D%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D)
- **F3-33** 不是一回事：失忆是规则压根没有进入会话；这里是规则明明就摆在上下文里，模型还是可能漏掉。[原文§写在提示词里的规则，为什么会被无视？](https://xiaolinnote.com/claudecode/basics/cc_engineering.html#%E5%86%99%E5%9C%A8%E6%8F%90%E7%A4%BA%E8%AF%8D%E9%87%8C%E7%9A%84%E8%A7%84%E5%88%99-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%A2%AB%E6%97%A0%E8%A7%86)
