# X1 基础与工作区域审查

日期：2026-10-15。仅新增本报告，未改题库、答案、题型或章节状态。X1 当前为 `draft`。

## 覆盖与结论

完整核对 X1-1—X1-55 共55题：单选37、多选5、填空7、简答6。逐题读取 Markdown 题干、参考答案、JSON 实际题干/全部选项/全部 correct 标记。三处题号和题序完全一致，无重复或遗漏；7道填空的空数、顺序设置与答案对应。

联网对照 [小林 Git 原文](https://xiaolincoding.com/interview/git.html) 全部5个对应小节：Git使用熟练吗、四个工作区域、pull与fetch、diff、HEAD与游离HEAD。未发现本章整体遗漏这些小节的知识点。主要问题为1组原文技术措辞勘误（3个直接题号）和1道简答的适用前提问题。未发现其他确证的选项错标、解析指错选项、填空不对应。

## 确证问题

### X1-F1 / P2：把文件快照本体放到 .git/index

主要直接题号：**X1-20、X1-28、X1-29**。

- X1-20：题卷 `interview-practice/git.md:33`；JSON `content/typed/git.json:422` 问快照保存位置，C在`:436`写`.git/index`，`:437`标true；答案 `interview-practice/answers-xiaolin/git.md:33`重复该说法。
- X1-28：JSON `:622` 的A断言快照存于index文件，`:623`标true；答案`:41`将前三项均判正确。
- X1-29：答案`:42`再次说暂存的文件快照位于index文件；题卷`:42`，JSON`:648`。

**证据与边界**：原文“四个工作区域”小节确实这样写，题库属于忠实转述，不能称为出题越界。但暂存区逻辑上代表快照，与文件内容本体物理存储于`.git/index`不同。官方[数据模型 THE INDEX](https://git-scm.com/docs/gitdatamodel#index)区分blob内容与索引中记录的blob ID/路径；[索引格式](https://git-scm.com/docs/gitformat-index#_index_entry)列出对象ID字段；[术语表](https://git-scm.com/docs/gitglossary#def_index)同样将对象内容与索引区分。因此该具体物理位置说法属于源文需勘误，并非仅随版本过时。

**最小修改**：X1-20改问“暂存区索引通常保存在哪个文件”，保留C；X1-28 A改为“git add更新暂存区索引，记录待提交版本”；X1-29改写为索引记录内容引用。按CLAUDE.md的勘误规则，答案括注原文说法，附“核对来源：”官方链接。无需改变题型和正确字母。

关联措辞：X1-19 B（JSON`:404`）、X1-23 D（JSON`:522`）也把快照与index文件绑定，但它们本来就是干扰项，未改变正确项判定，可同步整理。

### X1-F2 / P2：X1-36没有限定原文/策略，答案却无条件认定pull使用merge

直接题号：**X1-36**。题卷 `interview-practice/git.md:52`没有“按原文”或合并策略前提；JSON `content/typed/git.json:799`为short；答案 `interview-practice/answers-xiaolin/git.md:52`一概写为fetch加merge FETCH_HEAD。

**证据与边界**：这一简化忠实于原文pull/fetch小节，但同篇原文后面的pull与pull --rebase小节也讲到rebase配置。官方[git-pull DESCRIPTION](https://git-scm.com/docs/git-pull#_description)说明先fetch，再依据选项/配置整合，支持快进、rebase、merge等；pull.rebase等配置会影响无参数pull。无前提的通用简答不能将一种策略写成唯一机制。风险是准确提及rebase的作答与参考口径不一致；本轮未调用评分模型，不宣称已复现误判。

**最小修改**：题干补“按原文这里采用merge的工作流程”，答案明确适用前提；或按勘误规则说明策略取决于配置，保留原文的fetch+merge示例。该前提在同篇原文已出现，不需引入新的考点。

## 可选优化（不计确证错标）

1. **X1-31—35的pull表述**：答案文件`:47`、`:49`、`:50`、`:51`把pull写成立即合并；X1-32题卷/答案`:48`、JSON`:708`要求填fetch、merge FETCH_HEAD；X1-35 B（JSON`:778`）标true。这些题面都有“按原文”，按原文可唯一判断，不是选项错标或填空多解。可统一加“这里按merge策略说明”。不因现行默认行为变化夸大严重度。来源：[git-pull](https://git-scm.com/docs/git-pull)。
2. **X1-21 D干扰项**：JSON`:468`“继续作为快照暂存在.git/index里”标false，B标true。原文问提交产生的结果，B是预期答案；但普通commit不会把索引条目清空，若把D理解为索引仍引用已提交的版本，会产生争议，还叠加F1的物理位置措辞。建议D改成“不会生成commit，只停留在暂存阶段”。来源：[git-commit](https://git-scm.com/docs/git-commit#_description)、[数据模型](https://git-scm.com/docs/gitdatamodel#index)。不把原D直接断言为第二正确项。
3. **X1-26/X1-29恢复来源**：答案`:39`、`:42`沿用原文“本地仓库 --checkout/restore--> 工作区”简图。没有给完整命令，不能认定必错；可补充从指定提交恢复需指定source，因为裸restore文件默认从index恢复。来源：[git-restore DESCRIPTION](https://git-scm.com/docs/git-restore#_description)。
4. **X1-47/X1-48间接指向**：X1-47沿用原文入门表述，X1-48及综合X1-55已准确讲到分支引用，故不报错标；可给X1-47解析加“通过当前分支间接指向”。

## 其余范围说明

X1-1—18的工作流、soft/mixed回退，未发现影响选择判定的歧义。force题按原文具体流程问，不因更推荐其他协作方式而报错。X1-37—46的diff对比对象、cached/staged同义、路径限定正确。X1-42的commit1/commit2指题中的两个提交，不以分支名也能解析成提交为由制造第二正确项。X1-49—55游离HEAD风险表述为“可能被垃圾回收”，没有误说立即删除。

没有执行修改性Git命令，没有创建临时提交，没有将章节改为approved。未改应用代码，不另行重复主审的构建/测试。
