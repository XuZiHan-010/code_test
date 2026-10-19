# 网络题库串行整合报告（2026-10-15）

已应用当前 T2.json、T3.json、remaining.json 的完整字段修订，共 39 个题号。三个题库输入在应用前逐字节匹配 baseline-path.txt 指向的基线，未出现需要合并的外部修改；其他题目内容保持不变。

- 应用层 11 题：T2-63、97、98、105、141、150、179、265、285、288、289。
- 传输层 16 题：T3-21、49、70、75、98、107、108、165、190、192、193、194、196、199、201、202。
- 其余章节 12 题：T1-15、16；T4-7；T5-20、21、56、57、58；T6-9、19、29、42。

修改文件为 content/typed/network.json、interview-practice/network.md、interview-practice/answers-xiaolin/network.md、interview-practice/README.md、CLAUDE.md、总审查报告及三份 findings 报告。新增本目录 before-after.json、content-fix.diff、fix-summary.md、integration-report.md 和 UTF-8 整合脚本 integrate.py。原 checks.json 未覆盖。总报告与 findings 的原问题内容保留为修前历史证据，顶部指向逐题已修状态。

结构复核结果：网络题库仍为 656 题，基线与修订后的 JSON 题号题序完全一致；单选 457、多选 60、填空 101、简答 38，6 个章节均为 draft。提案无重复题号；仅覆盖允许的 stem/options/blankOrder 字段，选择题选项 key 与 correct 位置保持不变。全部 101 道填空的 Markdown 标记、JSON stem、空数及顺序同步。T3-21、T3-196、T4-7 仍为简答且未添加 JSON stem，线上使用修订后的 Markdown 题干。对照完整 before-after 复核了适用条件及问答同步；原文勘误五题保留原说法说明及官方核对引用。

实际执行 `$env:CONTENT_INCLUDE_DRAFTS = '1'; npm run content:validate`，退出码 **0**。输出 19 专题、190 章、5604 题，校验通过，仅有原有 **V14 [R3-139] 正确选项明显比其他选项长** 警告（范围外，未改）。通过抽查的章节数为 0，本轮没有批准章节。

完整差异基于本轮临时基线，而非 HEAD；审查报告的基线为整合前现场文本。before-after.json 逐题保存 typed、question、answer 的完整前后值及 reason。官方页面与锚点的主 agent 独立核对记录见 [official-link-checks.json](official-link-checks.json)。

后续由主 agent 完成独立内容审查、unit 测试和本地草稿题库构建。本任务未执行 unit 测试、生产 build、Git 提交推送或 PR，也未宣称项目所有者抽查或模型评分实测通过。
