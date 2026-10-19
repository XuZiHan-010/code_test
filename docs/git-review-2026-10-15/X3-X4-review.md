# Git 题库 X3、X4 只读审查

日期：2026-10-15。仅新增本报告；未修改题卷、答案、题型数据或章节状态，未执行修改性 Git 命令。

## 范围与方法

逐题读取 `interview-practice/git.md`、`interview-practice/answers-xiaolin/git.md` 和 `content/typed/git.json` 的全部实际题干、选项及 `correct` 标记，并联网对照[小林 Git 原文](https://xiaolincoding.com/interview/git.html)。技术疑点仅核对 git-scm.com 官方资料。

| 章节 | 题数 | 单选 | 多选 | 填空 | 简答 | 原文小节 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| X3 | 63 | 39 | 11 | 7 | 6 | 6 |
| X4 | 73 | 54 | 6 | 7 | 6 | 6 |
| 合计 | 136 | 93 | 17 | 14 | 12 | 12 |

覆盖分段：X3-1～9（变基与合并）、10～19（冲突）、20～31（拉取策略）、32～41（快进）、42～51（挑选提交）、52～63（删除分支）；X4-1～14（工作流）、15～25（协作）、26～39（日志）、40～51（标签）、52～61（排查）、62～73（忽略规则）。各分段均已核对，不是抽样。

结构性核验通过：136 个题号均在题卷及答案中对应；93 道单选各有一个正确项，17 道多选均有至少两个正确项；14 道填空的 `blankCount`、实际空数及两处题干一致，有序/无序与答案顺序对应。X3、X4 均为 `draft`。未发现正确选项字母与解析所指对象错位；下列问题主要属于条件缺失、原文勘误和解释过度推断。

## 确证问题

### R1 · P2 · X3-3、X3-6、X3-7、X3-9：Merge 创建新提交的必要条件缺失

- 位置：题型数据 `content/typed/git.json:2715`、`:2796`、`:2823`、`:2885`；答案 `interview-practice/answers-xiaolin/git.md:170`、`:173`、`:174`、`:176`；简答题干 `interview-practice/git.md:176`。
- 证据：X3-3 A、X3-6 A、X3-7 A 及 X3-9 解析把新 merge commit 当作泛称 Merge 的必然结果，和同章 X3-33、34、38、41 的快进合并结论冲突。官方明确快进只更新指针，不生成新 merge commit。
- 定性：这些标记与所引首个原文小节一致，不能称作抄错答案；问题是原文前后论述条件不同，题目未补充条件。X3-9 还是没有“按原文”限定的简答题。
- 最小方向：将这一组涉及新提交的问法明确限定为非快进合并或 `--no-ff`；解析说明快进例外，并按项目原文勘误规则补官方核对来源。可保留现有正确字母。X3-1、2、5、8 解析中同类概括宜同步措辞。
- 来源：[原文](https://xiaolincoding.com/interview/git.html#git-rebase%E5%92%8Cmerge%E7%9A%84%E5%8C%BA%E5%88%AB)、[官方快进合并](https://git-scm.com/docs/git-merge#_fast_forward_merge)。

### R2 · P2 · X3-28：分叉条件被丢失，线性历史选项被无条件排除

- 位置：题型数据 `content/typed/git.json:3319`、`:3333`、`:3343`；答案 `interview-practice/answers-xiaolin/git.md:201`；题卷 `interview-practice/git.md:201`。
- 证据：多选标记 ABC；B 带有本地、远程各自有新提交的条件，C 却独立说会出现分叉，E“可以保持线性历史”被标错。允许快进时 merge 模式的 pull 可以保持线性，不会必然分叉。原文把产生额外 merge commit 放在双方各有新提交的条件下；该条件未覆盖整个实际题干和所有选项。
- 最小方向：题干限定“明确采用 merge 策略且两边已经分叉”，C 改成“保留两条历史并增加合并节点”，E 改为“不会增加 merge commit 且保持单线历史”。保留 ABC 判分即可。实际命令行为需要显式策略；不能把裸 `git pull` 统一当作 merge。
- 来源：[原文拉取比较](https://xiaolincoding.com/interview/git.html#git-pull-%E5%92%8C-git-pull-rebase-%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)、[官方 pull](https://git-scm.com/docs/git-pull)、[官方快进规则](https://git-scm.com/docs/git-merge#_fast_forward_merge)。

### R3 · P2 · X3-19：简答题第一问没有对应答案

- 位置：题卷 `interview-practice/git.md:189`；答案 `interview-practice/answers-xiaolin/git.md:189`；题型数据 `content/typed/git.json:3097` 为 short，实际使用题卷题干。
- 证据：题干同时问如何使用命令合并两个分支和如何处理冲突；答案从冲突已发生开始，只有查看、编辑、暂存和提交，没有说明如何启动合并。所引原文同样只展开冲突流程，不能用现有参考答案覆盖第一问。
- 最小方向：收窄题干为“合并发生冲突后，应该使用哪些命令和步骤解决？”这样无需引入原文未在该节讲述的前置命令，也不会改变题号或题型。
- 来源：[原文冲突流程](https://xiaolincoding.com/interview/git.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-git-%E5%91%BD%E4%BB%A4%E5%90%88%E5%B9%B6%E4%B8%A4%E4%B8%AA%E5%88%86%E6%94%AF-%E5%8F%91%E7%94%9F%E5%86%B2%E7%AA%81%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3)、[官方 merge 使用说明](https://git-scm.com/docs/git-merge#_description)。

### R4 · P2 · X4-19、X4-25：Clone 被表述为本地操作代码的唯一途径

- 位置：题型数据 `content/typed/git.json:4586`（X4-19 D，正确项）；答案 `interview-practice/answers-xiaolin/git.md:274`、`:280`；题卷 `interview-practice/git.md:274`、`:280`。
- 证据：正确项及解析使用“只有 clone 下来的代码才能在本地编辑、测试、编译”。官方 archive 文档给出导出源码归档并解压到本地目录的例子；据此可知，本地源码也能来自归档，编辑/测试/编译本身不以 clone 为必要条件。这是对官方归档能力的直接推论，不是声称官方在原句逐字讨论编译。
- 定性：此绝对化来自原文，不是正确字母误标。“按原文”足以定位材料，不能解决其唯一途径的错误含义。
- 最小方向：改为“将仓库克隆到本地，便于编辑、测试和编译”，删除“只有……才能”，并按原文勘误规则注记。X4-25 同步解析。
- 来源：[原文协作小节](https://xiaolincoding.com/interview/git.html#fork-clone-pull-request-%E5%9C%A8-github-%E5%8D%8F%E4%BD%9C%E4%B8%AD%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)、[官方源码归档示例](https://git-scm.com/docs/git-archive#_examples)。

### R5 · P2 · X4-41：解析把示例参数错误地解释成必须同时提供

- 位置：答案 `interview-practice/answers-xiaolin/git.md:302`；关联选项 D `content/typed/git.json:5114`。
- 证据：答案说创建附注标签“需要 -a 和 -m”。官方说明：提供 `-a` 而未提供 `-m`/`-F` 时会打开编辑器输入说明；仅提供 `-m` 时还会隐含 `-a`。因此“必须同时带”不成立。原文只给出一个示例，没有宣称唯一语法；这是解析自行增加的错误约束。
- 最小方向：仅把解析末句改成“原文用 `git tag -a v1.0 -m ...` 创建附注标签”；可删除“需要”句。D 本来就是错误干扰项，C 的正确标记无需变化；若保留 D，解析应说明其“必须”本身也不成立。
- 来源：[官方 tag Description](https://git-scm.com/docs/git-tag#_description)。

## 可选优化与原文限定项

1. **有意排除的原文错误，不计覆盖缺口**：原文忽略规则小节把以 `/` 开头的规则说成仅匹配仓库根目录；`interview-practice/README.md:131` 已明确记录不出这条不严谨的内容。X4-62～73 未考这个点符合既有取舍，无需据此补题。若以后收录，应准确限定为当前 `.gitignore` 所在目录。[官方模式语义](https://git-scm.com/docs/gitignore#_pattern_format)。其他 11 个小节未发现关键主题整段漏题。
2. **X3-32、X3-41 答案**（`:208`、`:217`）沿用了原文 `main` 从 `feat/a` 分出去的叙述，通常会与读者习惯的 feature 从 main 分叉混淆。宜改成“当前 main tip 是 feat/a tip 的祖先”；单看该方向描述不足以断言所有场景均错，故不列独立硬错误。[官方祖先条件](https://git-scm.com/docs/git-merge#_fast_forward_merge)。
3. **X3-49 题型**：ABC 同时包含先后步骤和放弃分支，多选适合识别合法做法，但不能检测 `add → --continue` 顺序。现有 X3-50、X3-51 已补过程，因此没有实质知识点缺失，不必强制换型。
4. **裸 pull 的语义**：X3-20、21 的解析以及 X3-22、23、29、30、31 把裸 `git pull` 简化成 merge。原文确实如此写，很多题还明确“按原文”；不将它们简单统计为“标记错误”。但修订 R2 时宜给整组加上“本节比较 merge 模式与 rebase 模式”的限定，X3-31 没有材料限定尤其应说明。当前官方手册列出策略配置并说明默认快进限制，不能把材料中的简化当作所有环境现行默认。[官方 pull](https://git-scm.com/docs/git-pull#_description)。
5. **不作错误扩张**：X4 工作流采用率、团队偏好与主干开发的一两天描述均有原文材料限定，不因当前实践可能不同而列错误；`A..B`、标签推送的常见示例也不因复杂历史或同名引用等未给定边界条件单列故障。

## 验证限制

本次为内容只读审查，没有修改应用代码，未运行构建或写入 `content/dist/bank.json`。结构核验使用只读 Node 脚本，未创建临时 Git 仓库、提交或标签。报告未宣称章节已获项目所有者批准。
