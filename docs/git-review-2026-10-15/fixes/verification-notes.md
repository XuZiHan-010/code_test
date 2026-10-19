# Git修复独立验证

执行命令：`npx tsx docs/git-review-2026-10-15/fixes/verify.ts`
完成时间：2026-10-15T15:42:47.430Z

结果：全部自动检查通过；26/26项通过。

使用真实parser、typed schema、buildBank及Catalog；includeDrafts仅在内存启用。

变更题数：73。分类：{"选项重排并同步解析（人工复核语义）":3,"含内容改写":59,"仅选项顺序变化":11}。完整252题前后题干、全部选项、真假标记、参考答案及引用保存在before-after.json。

互斥去重统计：仅选项顺序变化11题；技术内容或解析发生文字变动62题（包含仅位置指代同步，不以文字变化判断语义变化）。逐题ID见checks-after.json的exactChangeSplit。

原24道前缀多选调整后键组：{"ACE":2,"BCD":3,"BDE":2,"ABD":1,"BD":1,"BCE":2,"ADE":2,"ABE":2,"BE":1,"AD":2,"ACEF":1,"CDE":1,"ABDE":1,"BCDE":1,"AC":1,"CE":1}。

位置指代候选：无。应结合完整选项与解析人工复核，扫描本身不作语义通过结论。

- 通过：真实parser/schema/buildBank（includeDrafts内存合并）
- 通过：题目总数252与题型170/30/28/24/0
- 通过：252个题号、题序及唯一性不变
- 通过：4章标题/题数/次序/draft状态不变
- 通过：Markdown与typed题序一致且章节内连续
- 通过：逐题结构、正确项数量/单选字母、填空配置、同文选项真假、原文引用保持
- 通过：全部28道填空的题卷标记/stem/空数与运行时一致
- 通过：Catalog每题实际返回一题且不泄漏correct/referenceAnswer/citations
- 通过：原24道前缀多选均完成重排且不再为连续前缀
- 通过：新增引用全部使用核对来源前缀及HTTPS Git官方域名
- 通过：答案尾部所有官方链接完整解析为citations而非残留正文
- 通过：实际引用仅来自授权小林源站与Git官方HTTPS页面
- 通过：引用页及全部锚点：https://xiaolincoding.com/interview/git.html
- 通过：引用页及全部锚点：https://git-scm.com/docs/gitdatamodel
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-restore
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-pull
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-reset
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-commit
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-push
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-stash
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-merge
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-archive
- 通过：引用页及全部锚点：https://git-scm.com/docs/git-tag
- 通过：原审源文快照23个原始锚点仍完整保留
- 通过：最终检查期间三份题库文件保持稳定
- 通过：未覆盖或修改原审证据

## 局限

- 结构检查、链接有效和单元测试不能证明技术语义；全部变更需由主审对照before-after逐题阅读。
- 位置指代扫描仅列候选；字母表述、隐含前提、参考答案覆盖必须人工复核。
- 未调用DeepSeek；不代表语义评分实测通过。
- 本脚本不运行项目级content:validate或test:unit，也不写content/dist/bank.json。
- 原audit.ts曾把字符串传给要求数组的getForAnswering；本脚本改用[q.id]并断言每次实际返回一题。

## 本轮执行记录

- 最终命令：`npx tsx docs/git-review-2026-10-15/fixes/verify.ts`，退出0，26/26项通过。三份题库SHA-256与主审提供的最终值一致；11个页面全部命中已下载缓存，本轮重跑未触网。
- 脚本自身检查：`npx tsc --noEmit --strict --skipLibCheck --target ES2017 --module esnext --moduleResolution bundler --esModuleInterop docs/git-review-2026-10-15/fixes/verify.ts`，退出0。
- 脚本自身检查：`npx eslint docs/git-review-2026-10-15/fixes/verify.ts`，退出0。
- 首次运行曾因Git数据模型页面实际锚点为`#index`而非`#_the_index`退出1；失败证据保留于`checks-first-run.json`、`links-first-run.json`。编辑代理修正6处引用后，最终命令通过。首次运行和最终运行均检查了当次读入文件的首尾哈希稳定性。
