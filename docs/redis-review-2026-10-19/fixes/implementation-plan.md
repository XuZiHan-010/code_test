# Redis 审查问题修复计划

> 使用 subagent-driven-development：一个实施任务后独立审查，主 Agent 验收；用户禁止提交，所有工作留在当前工作区。

**目标：**修复 `docs/redis-review-2026-10-19.md` 的全部确认问题，并逐题处理 19 道题型设计问题。

**方案：**在现有未提交题库上定点修改 JSON、Markdown 题卷、参考答案；以 `fixes/before/` 快照作为差异基线，不从 HEAD 恢复文件。维持现有知识点及出处，可按题意修订题型，不扩展业务功能。

## 全局约束

- 中文沟通，UTF-8 读写。不得 commit、push、tag、创建 PR、破坏性 Git 操作。
- 774 个题号、题序、7 个章节及其 draft 状态不变。不修改非 Redis 题目和业务代码。
- 原文技术错误或矛盾的修订：答案注明原文说法，保留原文小节引用，加“核对来源：”官方链接。普通限定及转述不引入新知识点。
- 所有填空题题卷标记、题干必须与 JSON stem/blankOrder 一致，空数须与答案对应。
- 原审查报告、source、原 checks 均为历史证据，不覆盖。修复证据写 fixes 目录。
- 现有未提交改动是用户工作；直接修改用户指定工作区，以修前快照验证局部变更，不创建会漏掉未跟踪题库的空工作树。
- 内容修订不增加镜像文案的永久单元测试；通过内容校验、结构比较、逐题语义审查及既有测试验证。

## Task 1：修复内容和统计

**文件：** `content/typed/redis.json`、`interview-practice/redis.md`、`interview-practice/answers-xiaolin/redis.md`；如题型数量变化，同步 `interview-practice/README.md`、`CLAUDE.md` 的当前统计及修复记录。不得改其他章节或规则文件。

- [x] 读取四份 findings 报告、原文快照及当前题目；核对待改题与修前证据。
- [x] 修复主报告所有题意、条件、解析位置和原文技术勘误；同时查找同源结论在 Redis 答案中的重复，保持一致。
- [x] 逐题处理 checks.json 的 19 道 multipleWithOnlyTwoCorrect。按知识点选最适合题型；不得为凑三项而扩展考点。改为单选时使用四个确定可区分的选项，保留原有考点。
- [x] 同步题卷、解析及全局统计，修复后维护答案一致性和单选字母分布，不能出现新的 Redis V13/V14 警告。
- [x] 运行 content:validate 并记录退出码/输出。生成逐题 before-after.json、fix-summary.md（含 19 道逐题处置）、实施报告。

## Task 2：独立审查与主 Agent 验收

- [x] 从 before 快照生成完整差异文件；交独立 reviewer 检查 Task 1 规范符合性和题目质量，反馈问题交实施者修订。
- [x] 主 Agent 核对全部变更题、题号和题序、填空同步、选项结构、引用锚点及统计。
- [x] 主 Agent 运行 content:validate、test:unit，以及带 drafts 的内容构建，验证 Redis 7 章 774 题实际合并；不改章节审批状态。
- [x] 写修后 checks 和整合验收记录，向用户汇报结果及既有警告，不执行 Git 发布操作。
