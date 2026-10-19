# Docker 题库审查（2026-10-16）

> 修订状态（2026-10-16）：原审16组必修问题及17组可选文字澄清已修订，含关联解析共涉及98个题号；复审发现的Y3-18题干答案提示也已移除。题号、题序、题型、全部正确字母和填空配置不变，4章仍为draft。修后检查与实际内容以[修订清单](docker-review-2026-10-16/fixes/fix-summary.md)和[独立复审](docker-review-2026-10-16/fixes/review-after.md)为准。下文及原审快照保留为修前证据，不应当作当前未修问题清单。

## 结论

已完成 Docker 专题 **4 章、252 题**的分章逐题审核，通读所依据原文的全部 **22 个小节**，核对实际网页题干、全部选项及正确标记、填空配置、参考答案和引用。主审独立复核问题项、全部填空与多选，并执行结构、引用、运行时数据及审查材料完整性检查。

**结构校验通过，内容审核未通过批准前门槛。** 本轮发现 **16 组应处理问题，涉及 44 个不同题号**；其中包括需要联动修改的解析，不表示 44 题都错标了正确字母。多数问题来自原文自身的简化，也有改成选择题时遗漏前提、干扰项实际可成立等问题。应修订后再复审，4 章继续保持 `draft`。

本轮仅新增本报告和 `docs/docker-review-2026-10-16/` 下的材料，没有修改题卷、答案、题型数据、业务代码或章节状态。题库三份文件审查前后 SHA-256 一致；没有执行提交、推送、标签或 PR 操作。

## 应处理的问题

以下均为 P2，属于批准前应修订的内容质量问题。详细报告给出原文件精确行号、当前文本、原文依据、官方核对链接及最小修订方向。分组编号对应 [机器可读问题清单](docker-review-2026-10-16/findings.json)；同一题可能涉及多组问题，统计按题号去重。

| 分组 | 主体及需联动的题号 | 问题与最小修改方向 |
| --- | --- | --- |
| Y1-M1 | Y1-24、36 | VM 的虚拟化对象写成“操作系统”。改为硬件层虚拟化，与共享内核上的隔离进程区分；填空及综合答案同步勘误。 |
| Y1-M2 | Y1-60、62、64、65 | pull 被说成“只下载变化的那一层”。改为复用本地相同层，仅下载缺失层；62 的干扰项补“每次”以排除首次拉取例外。60、64 主要是解析联动。 |
| Y1-M3 | Y1-60、61、65 | “某层没变就一定复用缓存”遗漏缓存存在、相关输入及前序条件。补条件，并更正60中“只执行变化的层”的解析。 |
| Y2-M1 | Y2-13、15、16、23 | 参数追加规则遗漏 exec ENTRYPOINT 前提；15 的 false 选项对 shell ENTRYPOINT 成立。题干明确形式及参数位于镜像名之后，解析同步。 |
| Y2-M2 | Y2-25、26、34 | ADD 自动解包遗漏可识别的本地 tar 归档条件，不能泛化到任意压缩包或默认远程下载。补来源及默认行为条件。 |
| Y2-M3 | Y2-37、43、44 | “只保留最后阶段”混淆默认最终输出、指定构建阶段和中间缓存。限定原文默认构建的输出，不暗示其他阶段数据必然删除。 |
| Y2-M4 | Y2-43 | E 把 alpine/二进制/约15MB 的 Go 示例写成所有多阶段构建的性质。选项补“原文 Go 示例中”，保留原文估算口径。 |
| Y2-M7 | Y2-58、62 | Dockerfile 可追溯被扩大为任意时间都能重建“一模一样”的产物。改为步骤显式、便于重复构建；严格一致仍取决于输入是否固定。 |
| Y2-M8 | Y2-62 | 综合答案漏掉原文生产推荐理由中“步骤清晰、便于排查”的有效部分。只补这一内容，不恢复原文“一条指令必有一层”的错误。58不要求穷尽理由，不另记漏答。 |
| Y3Y4-M1 | Y3-1、2、5、12、13、28 | 把 tmpfs 归为持久化，与本节“停止即丢失”矛盾。总称改为原文介绍的三种存储/挂载方式，并区分持久与临时用途；5、28主要是解析联动。 |
| Y3Y4-M2 | Y3-24、27 | 把 Docker overlay 驱动与 Kubernetes 中可能采用的 overlay 技术混在一起。保留 Docker Swarm 用途，并勘误产品驱动与通用技术的区别。 |
| Y3Y4-M3 | Y3-25 | D“overlay 用于同一台宿主机内的容器通信”不一定错。改成“只能同宿主机，不能跨主机”才是确定错误的干扰项。 |
| Y3Y4-M4 | Y4-4 | 问“删除容器”却把也能删除停止容器的 system prune 判错。题干补“按名称或ID删除指定容器”，保持 rm 为正确项。 |
| Y3Y4-M5 | Y4-19、20、21、22、23 | attach 的 Ctrl+C 被写成必然杀死主进程。改为可能转发中断并导致停止的风险，区分退出 exec shell 与给主进程发送信号；21只需解析联动。 |
| Y3Y4-M6 | Y4-26、27、36 | “其他非0都是应用报错”忽略信号终止等来源。27改考结合日志及信号判断；26、36同步解析。题干中“137通常为OOM”不算本项硬错。 |
| Y3Y4-M7 | Y4-51、52、54、55、56、57、61 | 默认 volume prune 与 system prune --volumes 缺匿名卷范围；system prune 清单还漏构建缓存。54、57补匿名卷条件，55补清理对象，61及关联解析同步；不执行任何实际清理。 |

关键依据来自 [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)、[构建缓存失效规则](https://docs.docker.com/build/cache/invalidation/)、[多阶段构建](https://docs.docker.com/build/building/multi-stage/)、[tmpfs 生命周期](https://docs.docker.com/engine/storage/tmpfs/)、[attach 的信号及脱离行为](https://docs.docker.com/reference/cli/docker/container/attach/)、[volume prune 范围](https://docs.docker.com/reference/cli/docker/volume/prune/)和 [system prune 范围](https://docs.docker.com/reference/cli/docker/system/prune/)。每项的具体依据在分章报告中就近链接。

修订原文自身错误时，应按项目规则保留原文引用、注明原文原说法，并追加“核对来源：”官方链接。仅在题干加“按原文”不能替代确证错误的勘误。修订可以优先补条件、改选项或解析，尽量保持题号、题序及题型配置稳定。

## 覆盖与可选澄清

22 个原文小节均已完整阅读并建立覆盖映射，未发现遗漏整个小节。除 Y2-62 的有效理由漏答外，原文主要机制、取舍、命令及示例均有相邻短题或综合简答承接；没有仅因某一道多选没列尽全节内容就判定专题漏考。

README 已主动排除的原文错误不计覆盖缺口：每条 Dockerfile 指令必产文件系统层、FROM 绝对必须第一条、Compose service 名就是容器名、ENTRYPOINT 绝不能被覆盖。本轮仍发现 exec/shell 前提遗漏，属于不同问题。

另有 **17 组可选澄清**，详见分章报告：cgroup v1 可合并控制器层次、cgroupfs 路径、默认隔离与共享资源、可写层与挂载范围、overlay2 历史默认口径、Registry/repository 术语；ARG 作用期、exec 与优雅退出、dockerignore 语义、commit 快照范围、USER 常见用途、COPY/ADD 作者建议与当前官方差异；137/OOM 诊断、默认 bridge/NAT、host 性能及隔离范围、Compose down 删除对象、网络模式教学归纳。上述可选项不计入44题问题统计；同一题也可能同时涉及必修和可选建议。Y1-16 仅两个并列要点的多选另有题型优化建议。

历史镜像尺寸、启动耗时、Docker 17.05 与 Kubernetes 1.24 等已受 README 的写作时口径约束，不因现行版本不同直接判为错标。官方原文未展开的功能不作为新增考点要求。

## 已执行验证

| 检查 | 结果与范围 |
| --- | --- |
| `CONTENT_INCLUDE_DRAFTS=1 npm run content:validate`（PowerShell用环境变量设置） | 全题库7247题校验通过，1个既有R3-139的V14警告；Docker无该警告。只校验，不写bank.json。 |
| `npm run test:unit` | 9个测试文件、103项测试全部通过。 |
| `npx tsx docs/docker-review-2026-10-16/audit.ts` | 只在内存合并Docker草稿：4章252题，0错误、0警告。保存checks.json及questions.json。 |
| 题卷/答案/题型对应 | 252题题号与题序一致，分章连续，无重复或缺失；28道填空的标记、stem、空数、顺序配置同步。 |
| 题型数量 | 单选162、多选37、填空28、简答25、代码0；与README一致。 |
| 原文页面及引用 | 实际下载页面标题“Docker面试题 \| 小林coding”；22个不同引用锚点及4章入口锚点均存在，不只检查HTTP 200。全部逐题引用都指向该页。 |
| 运行时作答视图 | 252题逐个调用getForAnswering([id])，确认返回对应题目且不含correct/referenceAnswer/citations；getWithAnswer([id])逐题与合并数据一致。 |
| 答案位置分布 | 单选A41/B41/C41/D39；37多选无全部正确项从A连续排列的现象，未发现Git专题旧审查中的同类规律。 |
| `python docs/docker-review-2026-10-16/build-index.py` | 建立22节覆盖和252题定位；无未引用小节、无题目小节名与引用标题不一致。实际语义覆盖另由逐段阅读核对。 |
| `python docs/docker-review-2026-10-16/verify-review.py` | 3份分章索引合计252行，逐题定位及题型/答案配置复核通过；16组44题统计、报告内部链接正常；三份题库源文件审前审后哈希一致，见final-verification.json。 |

分章统计：

| 章节 | 题数 | 单选 | 多选 | 填空 | 简答 | 关联应修题号数（含解析） |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Y1 底层原理与核心概念 | 65 | 37 | 13 | 8 | 7 | 7 |
| Y2 Dockerfile与镜像构建 | 62 | 42 | 8 | 5 | 7 | 12 |
| Y3 存储、网络与编排 | 64 | 41 | 10 | 7 | 6 | 9 |
| Y4 常用命令与排查 | 61 | 42 | 6 | 8 | 5 | 16 |
| 合计 | 252 | 162 | 37 | 28 | 25 | 44 |

这是题库内容审核，没有修改应用功能，因此未运行生产构建、数据库集成测试或浏览器端到端测试；未调用DeepSeek，未运行示例镜像，未实测Docker信号/网络/清理行为。技术问题依据原文和官方资料核对，不把结构校验、单元测试或引用锚点存在当作语义正确性证明。本轮审核不替代项目所有者人工抽查批准。

## 审查材料

- [Y1：65题、6小节](docker-review-2026-10-16/Y1-review.md)。
- [Y2：62题、6小节](docker-review-2026-10-16/Y2-review.md)。
- [Y3/Y4：125题、10小节](docker-review-2026-10-16/Y3-Y4-review.md)。
- [16组问题清单](docker-review-2026-10-16/findings.json)、[机械检查](docker-review-2026-10-16/checks.json)、[最终完整性复核](docker-review-2026-10-16/final-verification.json)。
- [运行时题目快照](docker-review-2026-10-16/questions.json)、[三份源文件逐题行号](docker-review-2026-10-16/question-index.json)、[原文22节及题号映射](docker-review-2026-10-16/sections.json)、[覆盖机械检查](docker-review-2026-10-16/source-coverage-checks.json)。
- [原文HTML](docker-review-2026-10-16/source.html)、[逐行提取原文](docker-review-2026-10-16/source.txt)、[按块提取原文](docker-review-2026-10-16/source-blocks.txt)、[官方页面快照索引与哈希](docker-review-2026-10-16/official-sources.json)。
- 可重跑脚本：[audit.ts](docker-review-2026-10-16/audit.ts)、[build-index.py](docker-review-2026-10-16/build-index.py)（需要beautifulsoup4）、[verify-review.py](docker-review-2026-10-16/verify-review.py)（Python标准库）。均只写本审查目录，不改题库。
