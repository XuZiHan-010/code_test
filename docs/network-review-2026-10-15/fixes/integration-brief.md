# 串行整合要求

读取当前目录的 T2.json、T3.json、remaining.json 及修订计划。它们是内容作者产出的完整字段替换提案，不得并发修改目标文件。

## 实施

1. 读取 baseline-path.txt 指向的本轮基线，确认当前三个网络文件尚未偏离基线；若有外部修改，逐题合并而不是覆盖。保留原编码、行尾和 JSON 缩进。
2. 检查提案 changes 的 ID 不重复且都存在于当前题库；typed 只可覆盖 stem/options/blankOrder，不允许改 id/type/blankCount/status；choice options 的 key 与 correct 位置保持原样。
3. 将每题字段应用至 content/typed/network.json；question/answer 分别精确替换两个 Markdown 的对应题号行。非修改题及其他文字不得改动。
4. 填空若 stem/blankOrder 有变，题卷题号后须为同步标记及相同 stem；参考答案保持全部出处在尾部。原文勘误的答案有括注原说法与官方核对链接。
5. 生成当前目录 before-after.json，仅记录改动题的三种输入前后值及 reason，方便主 agent 与 reviewer 复核；另生成 content-fix.diff（基线比对的 unified diff，覆盖三个文件及本轮文档变更，不使用 HEAD 代替未提交基线）。
6. interview-practice/README.md 按现有修订历史风格追加网络修订段落：实际改动题号数、11道优先题、其他条件/引用改进、官方勘误题号与链接、题数题型数量不变，6章仍draft。
7. CLAUDE.md 只把“全部184章”修正为“全部190章”，并在现有网络描述附近补修订记录及报告链接/勘误说明，保留用户其他修改。
8. docs/network-review-2026-10-15.md 顶部加修订说明及逐项修复状态链接，保留原审查问题作为历史依据，不让读者误以为当前仍未修；三份 findings 文档顶部加指向修复记录的状态注记，不删证据。

## 自查与报告

- 不执行Git提交、推送、PR、发布、批准章节；不改业务源代码、测试或其他专题。
- 比较基线确认题号题序完全一致，题型数量仍单选457/多选60/填空101/简答38，全部章节draft；101道填空stem/标记/空数同步。
- 执行 `CONTENT_INCLUDE_DRAFTS=1 npm run content:validate`，记录退出码与警告，不处理范围外R3-139。
- 在 `integration-report.md` 列出实际改动题数与题号、修改文件、验证结果和需主 agent 注意之处。主 agent 之后统一跑单元测试、核对来源、构建本地题库，并独立派 reviewer。
- 用UTF-8安全方法写中文，避免PowerShell向Python stdin传中文导致问号。不依赖Git跟踪这些题库文件（它们尚未跟踪）。
