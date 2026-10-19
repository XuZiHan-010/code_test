# Docker 题库修订记录（2026-10-16）

已修订原审 **16组必修问题**涉及的44个题号，并同步处理 **17组可选文字澄清**，合计变更 **98个不同题号**（Y1=28、Y2=32、Y3=21、Y4=17）。其中不少只修改关联解析，不代表98题原本都错标答案。

三份文件分别涉及题卷42题、答案96题、题型数据63题；去重后为98题。全部 **4章252题**的题号、题序、题型、选项顺序、正确字母和真假标记保持不变；28道填空的空数和有序/无序配置不变，题干两处同步。4章继续为 `draft`，不替代项目所有者人工批准。

## 主要修订

- VM 对比改为硬件抽象与共享内核上的隔离进程；pull改为下载本地缺失层；构建缓存补齐相关输入及前序条件。
- ENTRYPOINT参数追加补exec形式前提；ADD默认解包限定可识别本地tar归档；多阶段构建区分默认输出、指定target及中间缓存。
- Go示例的基础镜像和体积限定为原文示例估算；build改为流程显式、便于重复构建，不保证任意时间产物完全相同；补回步骤清楚便于排查的有效理由。
- tmpfs改为临时挂载，三类总称改存储/挂载；区分Docker overlay驱动与Kubernetes中通用overlay技术，并消除“overlay不能同机通信”的干扰项歧义。
- rm题干限定按名称/ID删除指定容器；attach的Ctrl+C改为可能影响主进程的风险；非零退出结合日志、命令和信号判断。
- 默认卷清理明确匿名卷范围，区分volume prune -a与system prune -a；补全system prune清理未使用构建缓存的说明。
- 同步澄清cgroup层次及驱动路径、默认隔离与共享、可写层与挂载范围、overlay2历史口径、Registry/repository、ARG、USER、exec信号、dockerignore、commit快照、默认bridge/NAT、host性能及Compose down资源范围。

原文自身错误及过强概括均保留原文引用，括注原说法并追加官方“核对来源：”引用。没有补入原文主动排除的错误，也没有新增原文未讲的考题。Y1-16的题型优化保持未执行，以维持既有题型。

复审期间发现并修复Y3-18题干中的“NAT”答案提示，题卷和typed同步删除该提示；正确选项B及解析保留。

最终独立复审的需求符合性和内容质量均通过：完整复核98个变更题及全部28道填空，当前待修确证问题清单为空。主审另逐题读取96条修改解析、63条typed修改和全部填空，并核对最终差异与验证结果。

逐组处理、全部变更题号和引用见[实施记录](implementation-notes.md)；每题完整修前修后内容见[差异快照](before-after.json)，源文件差异见[changes.diff](changes.diff)。[独立内容复审](review-after.md)单列需求符合性、内容质量与审核范围。

## 实际验证

- 主审运行包含草稿的 `npm run content:validate`：全题库7247题通过，只有无关的既有R3-139长度警告；Docker无错误或警告。
- `npm run test:unit`：9个测试文件、103项测试通过。业务代码未改变，末次修订仅移除Y3-18题干提示；最终内容另由实际解析验证及独立复审覆盖。
- `npx tsx docs/docker-review-2026-10-16/fixes/verify.ts`：**48/48项通过**，实际使用parser、schema、buildBank及Catalog，在内存包含草稿合并，不写生产题库。
- 252题逐个核对结构、正确字母、填空配置及原始引用；getForAnswering([id])真实返回对应题且不含答案字段，getWithAnswer([id])与合并快照一致。
- **148条新增官方核对引用**完整解析，原文及官方 **32个页面**和全部实际引用锚点通过。不是只看HTTP200；同时验证页面标题、最终域名及DOM中的id。
- 首轮链接检查中，校验器只匹配带引号的id，漏识别Docker压缩HTML中的合法无引号id；已改用BeautifulSoup解析实际HTML。另一个storage/drivers连接超时在重试后通过。首轮结果保留，不把误报当作题库链接失效。
- 按现有本地预览模式设置 `CONTENT_INCLUDE_DRAFTS=1` 执行 `npm run content:build`，已生成本地7247题，包含Docker252题；252题逐字段等于验证快照，环境变量随后恢复。源状态仍为draft，该操作仅更新本地预览。
- 原审checks.json、questions.json、source.html、分章报告等31份证据哈希保持，三份修前拷贝与原审哈希一致。

结果：[修后检查](checks-after.json)、[引用检查](links-after.json)、[修后252题](questions-after.json)、[本地构建核对](local-build-check.json)。复现脚本：[verify.ts](verify.ts)（使用现有tsx及Python beautifulsoup4）。原审audit.ts和verify-review.py的哈希不变/单页引用假设只适用于修前材料，不用于修后源文件校验。

本次未修改应用业务代码，未运行生产构建、数据库集成测试、浏览器端到端测试或DeepSeek语义评分实测；未运行示例容器或任何Docker清理命令。结构和引用检查不能替代内容复审，不承诺所有未来版本的同一行为。未执行Git提交、推送、标签或PR操作。
