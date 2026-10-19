# Git 题库修订实施记录（2026-10-15）

本轮仅修改三份 Git 内容文件；审查前报告、checks/questions/source 快照保持不变。4 章保持 `draft`，252 个题号、题序、题型、填空空数及有序/无序不变。170 道单选的选项顺序和正确字母不变。没有执行 Git 提交、推送、标签、PR、reset 或 clean，也没有建立临时提交。

## 修订前快照与哈希

开工时三份现文件 SHA-256 均与原 checks.json 一致。`before/` 保留按原相对路径复制的原文件，创建时拒绝覆盖。

| 文件 | SHA-256 |
| --- | --- |
| interview-practice/git.md | 77145844eb9f63f1a88905cd409eb88c4a9b796f357595039a4ada0f036bc99c |
| interview-practice/answers-xiaolin/git.md | 16ca3d5226a4d206a1c7f5d69171bf31011b31f750b2256cef33bd7c9fddaa79 |
| content/typed/git.json | ff136b148e772eaf972c616b45dbac2833cf97e5a544edb040cce531317539a4 |

## 逐题变更

共 **73** 个题号发生实际变更，含仅选项重排的题目。

| 题号 | 修改位置 | 内容 |
| --- | --- | --- |
| X1-15 | 答案、typed | 多选解析改为按内容说明，消除位置依赖；多选选项重排（保留各内容真假属性） |
| X1-19 | 答案、typed | 区分索引记录与 blob 内容本体 |
| X1-20 | 题卷、答案、typed | 区分索引记录与 blob 内容本体 |
| X1-21 | typed | 消除提交后索引仍保留引用造成的干扰项歧义 |
| X1-22 | 答案、typed | 区分索引记录与 blob 内容本体 |
| X1-23 | 答案、typed | 区分索引记录与 blob 内容本体 |
| X1-25 | 答案 | 限定从本地提交恢复时需指定来源，澄清 restore 默认来自 index |
| X1-26 | 题卷、答案、typed | 限定从本地提交恢复时需指定来源，澄清 restore 默认来自 index |
| X1-28 | 答案、typed | 区分索引记录与 blob 内容本体；多选选项重排（保留各内容真假属性） |
| X1-29 | 答案 | 区分索引记录与 blob 内容本体；限定从本地提交恢复时需指定来源，澄清 restore 默认来自 index |
| X1-31 | 答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X1-32 | 题卷、答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X1-33 | 答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X1-34 | 答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X1-35 | 题卷、答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提；多选选项重排（保留各内容真假属性） |
| X1-36 | 题卷、答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X1-45 | 答案、typed | 多选解析改为按内容说明，消除位置依赖；多选选项重排（保留各内容真假属性） |
| X1-50 | typed | 多选选项重排（保留各内容真假属性） |
| X2-4 | 答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-5 | 答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-6 | 题卷、答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-7 | 答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-8 | 答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-9 | 答案、typed | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复；多选选项重排（保留各内容真假属性） |
| X2-11 | 答案 | 将 hard 的“清空/撤销一切”收窄为目标提交的受跟踪内容恢复 |
| X2-18 | typed | 多选选项重排（保留各内容真假属性） |
| X2-22 | 题卷、答案、typed | 为 amend 仅改消息补上无额外暂存修改的前提 |
| X2-27 | 答案、typed | lease 精确表述为远程引用与本地预期值比较 |
| X2-28 | typed | 多选选项重排（保留各内容真假属性） |
| X2-30 | 答案 | 为 amend 仅改消息补上无额外暂存修改的前提；lease 精确表述为远程引用与本地预期值比较 |
| X2-34 | 答案、typed | 精确区分 restore 默认 index→工作树与 --staged 默认 HEAD→index |
| X2-35 | 答案、typed | 精确区分 restore 默认 index→工作树与 --staged 默认 HEAD→index |
| X2-38 | typed | 多选选项重排（保留各内容真假属性） |
| X2-39 | 答案、typed | 精确区分 restore 默认 index→工作树与 --staged 默认 HEAD→index；多选选项重排（保留各内容真假属性） |
| X2-41 | 答案 | 精确区分 restore 默认 index→工作树与 --staged 默认 HEAD→index |
| X2-45 | 答案、typed | stash pop 成功应用才删除，冲突时保留 |
| X2-46 | 答案 | stash pop 成功应用才删除，冲突时保留 |
| X2-49 | typed | 多选选项重排（保留各内容真假属性） |
| X2-50 | 答案、typed | stash pop 成功应用才删除，冲突时保留；多选选项重排（保留各内容真假属性） |
| X2-52 | 答案 | stash pop 成功应用才删除，冲突时保留 |
| X2-56 | 题卷、答案、typed | 限定 --all 仅推分支，补上受影响标签处理与密钥轮换 |
| X2-59 | 答案、typed | 限定 --all 仅推分支，补上受影响标签处理与密钥轮换；多选选项重排（保留各内容真假属性） |
| X2-61 | 答案 | 限定 --all 仅推分支，补上受影响标签处理与密钥轮换 |
| X3-1 | 答案、typed | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-2 | 答案 | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-3 | 题卷、答案、typed | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-4 | 题卷、答案、typed | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-5 | 答案 | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-6 | 题卷、答案、typed | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-7 | 题卷、答案、typed | 将新 merge commit 限定为非快进合并，补快进例外；多选选项重排（保留各内容真假属性） |
| X3-8 | 答案、typed | 将新 merge commit 限定为非快进合并，补快进例外；多选选项重排（保留各内容真假属性） |
| X3-9 | 答案 | 将新 merge commit 限定为非快进合并，补快进例外 |
| X3-18 | typed | 多选选项重排（保留各内容真假属性） |
| X3-19 | 题卷 | 收窄为原文已展开的合并冲突后处理步骤 |
| X3-20 | 题卷、答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-21 | 答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-22 | 题卷、答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-23 | 答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-28 | 题卷、答案、typed | 把 merge 策略与双方已分叉的条件用于全部选项；为 pull 的 fetch + merge 结论补足 merge 策略前提；多选选项重排（保留各内容真假属性） |
| X3-29 | 答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提；多选选项重排（保留各内容真假属性） |
| X3-30 | 题卷、答案、typed | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-31 | 题卷、答案 | 为 pull 的 fetch + merge 结论补足 merge 策略前提 |
| X3-32 | 题卷、答案、typed | 快进条件改为 main tip 是 feat/a tip 的祖先 |
| X3-38 | typed | 多选选项重排（保留各内容真假属性） |
| X3-39 | typed | 多选选项重排（保留各内容真假属性） |
| X3-41 | 答案 | 快进条件改为 main tip 是 feat/a tip 的祖先 |
| X3-48 | typed | 多选选项重排（保留各内容真假属性） |
| X3-49 | typed | 多选选项重排（保留各内容真假属性） |
| X3-59 | typed | 多选选项重排（保留各内容真假属性） |
| X3-60 | 答案、typed | 多选解析按命令内容说明，消除顺序依赖；多选选项重排（保留各内容真假属性） |
| X4-19 | 答案、typed | 删除只有 clone 才能本地编辑测试编译的绝对断言 |
| X4-25 | 答案 | 删除只有 clone 才能本地编辑测试编译的绝对断言 |
| X4-41 | 答案 | 删除解析自行添加的附注 tag 参数必须同时提供约束 |

## 24 道多选原/新正确 key 集合

排列列按旧 key 说明各选项在新 A、B、C……位置的顺序；各个选项经过技术修订后的真假属性保持不变。X4 的 6 道多选未重排。

| 题号 | 原正确 key | 新正确 key | 新顺序（旧 key） |
| --- | --- | --- | --- |
| X1-15 | ABC | ACE | ADBEC |
| X1-28 | ABC | BCD | DBACE |
| X1-35 | ABC | BDE | EADBC |
| X1-45 | ABC | ABD | CADBE |
| X1-50 | AB | BD | CADB |
| X2-9 | ABC | BCE | DABEC |
| X2-18 | ABC | ADE | BDECA |
| X2-28 | ABC | ABE | ACDEB |
| X2-38 | AB | BE | CAEDB |
| X2-39 | ABC | BDE | DBEAC |
| X2-49 | AB | AD | ADEBC |
| X2-50 | ABC | BCE | EBCDA |
| X2-59 | ABCD | ACEF | CEAFBD |
| X3-7 | ABC | ADE | AEDCB |
| X3-8 | ABC | BCD | DBACE |
| X3-18 | ABC | ABE | CADEB |
| X3-28 | ABC | CDE | DEABC |
| X3-29 | ABCD | ABDE | ABECD |
| X3-38 | ABC | ACE | BEADC |
| X3-39 | ABCD | BCDE | EBCDA |
| X3-48 | AB | AC | ACBD |
| X3-49 | ABC | BCD | DABCE |
| X3-59 | AB | CE | CDBEA |
| X3-60 | AB | AD | ADCB |

## 校验与边界

- 编辑脚本在写入前检查：4 章均 draft；252 题题号、题序、题型保持；170 单选正确 key 不变；28 填空空数、blankOrder、typed 与 Markdown 题干同步；24 多选均不再为从 A 开始的连续前缀。
- 原文技术勘误保留原文引用、括注原先说法并附 git-scm.com 官方“核对来源：”；X4-41 是解析自行增加的参数约束，直接删除错误并解释 D 的“必须”不成立。
- X2-19 口诀、已排除的 gitignore 前导 /、工作流偏好不变；没有增加考点或改变题型。
- 本轮为内容编辑，不新增镜像文案测试，不运行会覆盖审查前快照的 audit.ts。
- 第一次运行 `npm run content:validate`：退出 0，校验通过，3 个 V14 警告（既有 R3-139，新增 X1-26、X3-32）；随后缩短 X1-26D、X3-32C，将恢复来源与合并方向放在题干及解析中保留。
- 第二次运行 `npm run content:validate`：退出 0，校验通过，仅 1 个既有 V14 警告 R3-139，Git 无警告。实际输出：23 个专题、214 章、6995 个知识点；214 个已生成题型的章节，0 个通过抽查；本次输出 0 章 0 题（draft 未被发布）。
- 对照 constitution I–VI：内容修订遵循已授权的原文勘误例外并保留引用；题号和顺序稳定；内容自动校验通过且仍待所有者抽查；没有改用户数据、业务规则或版本范围，因此不新增业务行为测试。
- 主审独立核对发现 Git 数据模型页面的索引标题真实锚点为 `#index`，已将 X1-19/20/22/23/28/29 的 6 处官方引用改为该锚点，并同步实施脚本；没有覆盖审查前报告或原始快照。
- 第三次运行 `npm run content:validate`：退出 0，校验通过，仍仅既有 R3-139 的 1 个 V14 警告，Git 无警告。
- 运行只读比较脚本 `python docs/git-review-2026-10-15/fixes/verify-fixes.py`：退出 0，252 题号/题序/题型、170 单选真假位置、28 填空两处题干/空数/顺序、24 多选非前缀分布、全部原文引用保留且可由尾部解析、before 快照哈希全部通过。

## 最终内容 SHA-256

| 文件 | SHA-256 |
| --- | --- |
| interview-practice/git.md | 70c6414fc0d0b95164338f533df1cd35ceef128ae56bda290241b7c011f4cc98 |
| interview-practice/answers-xiaolin/git.md | eac503112dea8c96a03bcb50b74ace1eea906183f3cd42a4f16d6bc27ce8e6f0 |
| content/typed/git.json | 63c8d8a466f53db715afcd7c0678d95a30e69b03dd0a4af14fe820d0a4426496 |
