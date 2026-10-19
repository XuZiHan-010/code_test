# Git X2「撤销与回退」只读审查

审查日期：2026-10-15。审查范围：X2-1～X2-61 全部 61 题，包含题卷、答案、typed 实际题干、每个选项和 correct 标记。题型为单选 40、多选 8、填空 7、简答 6；三份资料题号和题序一致。章节状态读取为 `draft`，未修改章节状态或现有文件，未执行修改性 Git 命令。

联网对照原文：[Git 面试题](https://xiaolincoding.com/interview/git.html)。本章对应原文 6 个小节：reset 三种模式、reset/revert、amend、checkout/switch/restore、stash、敏感信息处理。全部已逐项对照，未发现原文知识点完全遗漏。

## 结论

未发现选择题 correct 与原文不一致、单选在「按原文」限定下出现多个应选答案、填空数量/顺序/答案对应错误、解析把实际正确选项误作错误选项的情况。7 道填空都能由原文确定；同义表达由现有语义评分处理。

确证 4 组需要修正的技术表述，集中在**未写「按原文」的综合简答答案**。同源的选择题均明确写有「按原文」，故不把它们判成标记错误，列为联动优化位置。修正时应按项目规则注明原文说法，并补「核对来源：」官方文档链接。

## 确证问题

### X2-F1：`--hard` 被描述成清空整个工作区（P2，中）

- 主位置：`interview-practice/git.md:95`（X2-11，未限定按原文）；`interview-practice/answers-xiaolin/git.md:95`；typed 类型入口 `content/typed/git.json:1475`。
- 证据：答案称「工作区也会被清空」「没 commit 或 stash 的改动会直接丢失」。官方说明是按目标提交覆盖工作树，使受跟踪内容与该提交一致，而不是将目录清空。没有妨碍恢复的普通未跟踪文件也不能一概说成会被删除。
- 影响：把“丢弃受跟踪的本地修改”理解成“删除项目文件/所有未跟踪文件”，会误解命令作用。
- 最小修改：改为「将 HEAD、暂存区及工作树中的受跟踪内容恢复到目标提交；未提交的受跟踪修改会丢失，妨碍恢复的未跟踪路径也可能被覆盖/移除」，保留原文危险性提示，注明原文的“清空”是过度概括。
- 联动位置：答案 X2-5/6/7 的 `89/90/91` 行，typed X2-6 `1355` 行、X2-7 `1382` 行；这些题面明确按原文，可先保留正确标记，统一收紧文案即可。
- 来源：[git-reset DESCRIPTION / --hard](https://git-scm.com/docs/git-reset)。原文为本章 reset 三模式小节。

### X2-F2：仅修改提交信息的 amend 示例缺少暂存区前提（P2，中）

- 主位置：`interview-practice/git.md:120`（X2-30）；`interview-practice/answers-xiaolin/git.md:120`；typed 类型入口 `content/typed/git.json:1912`。
- 证据：综合答案将 `git commit --amend -m "新的提交信息"` 无条件描述为「只改提交信息」。`-m` 仅指定消息；amend 默认仍按普通提交规则采用暂存内容。因此若已有新的暂存修改，示例也会改变提交内容。
- 最小修改：在该示例前补「暂存区没有额外修改时」。这能保留原文命令而消除不正确的无条件承诺；若选择给出始终不带入暂存修改的写法，可使用 `--amend --only -m`，但须作为原文错误的核对修订明确说明来源。
- 联动位置：X2-22 题卷/答案 `112` 行；typed `1711` 行（B 在 `1723` 行）。该选择题明确按原文，B 是原文给出的写法，不属于 correct 错标。
- 来源：[git-commit --amend / --only](https://git-scm.com/docs/git-commit)。原文为 amend 小节。

### X2-F3：restore 默认来源写成「暂存区或 HEAD」，掩盖区别（P2，中）

- 主位置：`interview-practice/git.md:134`（X2-41）；`interview-practice/answers-xiaolin/git.md:134`；typed 类型入口 `content/typed/git.json:2176`。
- 证据：综合答案称不带选项的 `git restore 文件名` 会「恢复到暂存区或 HEAD 的版本」。官方明确：不带 `--staged` 默认从 index 恢复工作树；带 `--staged` 默认从 HEAD 恢复 index。只有 index 恰好等于 HEAD 时结果才相同，命令不会自动在两个来源间挑选。例如 HEAD=A、index=B、工作树=C，不带选项恢复后是 B，不是 A。
- 最小修改：分别写成「`restore <file>`：工作树恢复为暂存区版本」「`restore --staged <file>`：暂存区恢复为 HEAD 版本，工作树不变」。同时把“把文件从暂存区撤回工作区”收紧为“取消暂存，保留工作树内容”，避免被理解为移动文件或用暂存内容覆盖工作树。
- 联动位置：答案 X2-34 `127` 行、X2-35 `128` 行、X2-39 `132` 行；typed X2-35 D `2045` 行、X2-39 B `2148` 行。它们均带按原文限定，correct 与原文一致。
- 来源：[git-restore DESCRIPTION / --staged](https://git-scm.com/docs/git-restore)。原文为 checkout/switch/restore 小节。

### X2-F4：敏感信息处理综合答案把 `push --force --all` 当成完整同步步骤（P2，中）

- 主位置：`interview-practice/git.md:160`（X2-61）；`interview-practice/answers-xiaolin/git.md:160`；typed 类型入口 `content/typed/git.json:2650`。
- 证据：综合答案在要求彻底清理历史后只列 `git push --force --all`，未限定仅分支引用。官方说明 push 的 `--all` 仅推 `refs/heads/`；标签由 `--tags` 等机制单独处理。若远程标签仍指向含敏感内容的旧提交，强推所有分支和重新 clone 后，旧内容仍可通过标签访问。这是命令范围问题，不是建议采用哪种清理工具的偏好。
- 最小修改：写明「重写并同步所有受影响的分支和标签，确认没有引用仍指向旧敏感历史；原文 `--all` 只覆盖分支，不含标签」，保留立即撤销并轮换密钥、协调协作者重新 clone 的原文要求。不建议机械替换成不加说明的 `--mirror`，因为其同步范围更大。
- 联动位置：答案 X2-56 `155` 行、X2-59 `158` 行；typed X2-56 C `2541` 行、X2-59 B `2617` 行。选择题明确按原文，属于原文方案局限，不计为 correct 错标。
- 来源：[git-push --all / --tags](https://git-scm.com/docs/git-push)、[git-filter-branch：确认清理所有引用](https://git-scm.com/docs/git-filter-branch#_checklist_for_shrinking_a_repository)。原文为敏感信息处理小节。

## 可选优化，不计确证题目缺陷

1. **X2-45、46、50、52：pop 的删除限定成功。** `answers-xiaolin/git.md:141/142/146/148`、typed `2261/2288/2401/2440`。原文以正常成功情况概括，按原文选择仍有唯一答案；建议综合答案 X2-52 改成「成功应用后才删除；冲突时 stash 保留」。[git-stash pop](https://git-scm.com/docs/git-stash)。
2. **X2-27、30：lease 检查不是侦测所有“别人曾 push 过”的事件。** 答案 `117/120`、typed `1846/1912`。实际比较远程引用当前值与预期值，默认预期来自本地远程跟踪引用；后台 fetch 会影响保护。原文的教学简化不造成该题其他选项同时正确，不作错标处理；综合说明可改成「远程引用仍符合本地预期时才允许覆盖」。[git-push --force-with-lease](https://git-scm.com/docs/git-push)。
3. **X2-19：口诀填空价值较低。** 题卷/答案 `106` 行、typed `1673` 行。两空与原文逐字对应，顺序正确，不存在答案歧义；可在后续题库优化中改考“移动引用/新增反向提交”，但不属本轮必须修复。
4. **X2-14、20：提交“消失”宜限定当前分支可达历史。** 答案 `101/107`。原文和题目使用引号，通常可理解为不再显示于当前分支历史，不应据此认定题目声称立刻物理删除对象；可补一句“对象是否仍被其他引用保留另论”。[git-reset](https://git-scm.com/docs/git-reset)。

## 覆盖与限制

- 六小节分别覆盖 X2-1～11、12～20、21～30、31～41、42～52、53～61，合计 61 题；全部实际选项均已阅读，未只看 Markdown 简答题干。
- 填空 X2-1/10/19/29/40/51/60：空数、ordered/unordered、答案内容全部对应；没有用填空承载需长篇解释且无法唯一作答的问题。
- 选择题正确标记按原文核对；技术边界只以 git-scm.com 官方手册核实。题面已限定“按原文”的简化内容与无此限定的综合简答分开评价。
- 审查未运行 reset、stash、commit、push 等命令；无临时 Git 写入实验。这里只产出本报告，不修改题目或发布状态。
