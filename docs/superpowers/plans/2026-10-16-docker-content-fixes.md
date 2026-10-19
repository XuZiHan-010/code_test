# Docker 题库审核问题修订计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. 全程遵守用户禁止未经授权执行 Git 发布类操作的要求，不提交、不推送、不创建或合并 PR。

**Goal:** 修复 Docker 审核中的16组必修问题，并以最小文字修订澄清17组同源可选表述，完成独立复审与验证。

**Architecture:** 仅修改题库的题卷、参考答案和题型数据；使用项目既有 parser、schema、buildBank、Catalog 验证实际运行时结果。旧审查证据保持原样，修前快照与修后差异分别保存到本轮 fixes 目录。

**Tech Stack:** Markdown、JSON、TypeScript/tsx、Python，仅使用现有依赖。

## Global Constraints

- 所有问答、说明、汇报默认使用中文。
- 不执行 git commit、push、tag、PR、reset --hard、clean 等用户未授权操作。
- 题号、题序、4章252题、题型数量（单选162、多选37、填空28、简答25）保持不变。
- 单选/多选正确字母及每个选项真假标记保持；通过补前提或改文案消除歧义，不做选项换序。
- 28道填空的blankCount、blankOrder保持；修改填空题干必须同步题卷标记后的文字与typed stem。
- 原文自身错误：参考答案注明原文说法，保留原文小节引用，另附[核对来源：官方小节](https://...)；仅用官方一级资料核对，不新增原文外考题。
- 4章状态保持draft；不修改应用业务代码、其他专题、总题数和用户现有无关修改。
- 已有未跟踪题库正在当前工作目录中，本次直接修改这些用户指定文件并保存修前拷贝，不创建工作树、不改变分支。
- 原审checks.json/questions.json/source.html和各分章报告作为修前证据保留，不覆盖；旧audit.ts/verify-review.py假设源文件哈希不变，仅用于原审，不用于修后校验。

### Task 1: 题库修订（单一实施agent负责三个共享文件，避免并发写入）

**Files:**
- Modify: `interview-practice/docker.md`
- Modify: `interview-practice/answers-xiaolin/docker.md`
- Modify: `content/typed/docker.json`
- Create: `docs/docker-review-2026-10-16/fixes/implementation-notes.md`

**Requirements:** 详见同目录 `2026-10-16-docker-task-1-brief.md`。必修问题清单为 `docs/docker-review-2026-10-16/findings.json` 的16组；技术根因、最小修改和可选澄清以三份分章报告为依据，独立核对后修订。

- [x] 保存三份修前源文件，确认与原审哈希一致；已有审查已提供原始失败语义案例，不为文案镜像编写单元测试。
- [x] 实施全部16组必修修订及17组可选文字澄清，题型优化Y1-16不改题型；保留稳定结构。
- [x] 自查实际题干、所有选项、参考答案和勘误引用一致，填空两处同步；记录每组处理、所改题号、存在疑问和实际验证。

### Task 2: 主审验证与独立复审

**Files:**
- Create: `docs/docker-review-2026-10-16/fixes/verify.ts`、`checks-after.json`、`questions-after.json`、`before-after.json`、`changes.diff`、`review-after.md`
- Create: `docs/docker-review-2026-10-16/fixes/fix-summary.md`
- Modify: `docs/docker-review-2026-10-16.md`（仅增加修复状态入口）
- Modify: `interview-practice/README.md`（只补Docker修订状态和链接）；保持用户已有的`CLAUDE.md`原样。

- [x] 主审逐题比较修前修后ID/序列/类型/正确字母/填空配置/原文引用；运行真实合并、完整Catalog返回及作答答案隔离检查，保存差异。
- [x] 独立reviewer阅读实施brief、实际差异、修后题目和证据，分别给需求符合性与内容质量结论；修复回归问题后进行定向复审。
- [x] 运行包含draft的content:validate、103项既有单元测试；检查新增引用页面及真实小节锚点。测试仅在需要时重复。
- [x] 使用现有本地预览方式CONTENT_INCLUDE_DRAFTS=1运行content:build，并核对产物Docker252题与验证快照相同；状态仍为draft。
- [x] 完成逐组修复清单、修前修后证据、真实验证结果和限制；不执行Git发布类操作。
