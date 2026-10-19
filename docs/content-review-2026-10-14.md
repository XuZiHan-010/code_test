# 本地题库检查结果（2026-10-14）

**结论：3215道题在结构上配对正确，默认运行时题库文件与源文件一致；内容仍有下列需要处理/限定的发现，不能宣布所有章节零遗漏、零错误。**

检查对象为本地 `interview-practice/` 题卷、`answers-xiaolin/` 答案和 `content/typed/` 网页题型，共15专题、161章。重新获取161篇小林原文及4个专栏目录。用户确认应用在 `http://localhost:3000/` 本地运行，尚未在线部署。

## 当前版本结果

| 检查项 | 结果 |
| --- | --- |
| 题号、题序、答案和网页题型配对 | 3215题完整配对；未发现重复、缺答或缺题型 |
| 当前题型 | 单选1605、多选139、填空246、简答1225 |
| 逐题引用 | 3279处，1483条不同链接；小林小节锚点未发现不存在 |
| 文章归属 | 未发现无意配错原文章节；C5-2、H1-36、H1-38的跨篇链接明确标为冲突对照 |
| 专栏目录 | 本次目录未发现漏收文章；介绍页按项目规则不出题 |
| 格式校验 | 包含draft执行content:validate，3215题通过，0错误、0警告 |
| 链接脚本 | 检查177页、1467锚点，3个GitHub请求失败，命令exit 1；独立重试3个页面均HTTP 200，未确认失效链接 |
| 默认运行时数据 | bank.json构建于2026-10-14T06:20:40.326Z，3215题/161章，与当前全部题干、类型、选项、参考答案和引用比较0差异 |
| 本地页面 | 登录页HTTP 200；浏览器连接未响应，未完成页面视觉检查或登录后逐页验收 |
| 章节状态 | 161章全部draft，项目所有者人工审批仍待完成；本报告不改变状态 |

## 最新版本仍需处理的发现

以下只列当前剩余项；已经修正的旧问题不计为当前错误。发现项不是错误题数；同一项可影响多题。范围歧义、原文勘误和确定题答错误分别标识。

| 发现ID | 题号 | 分类/状态 | 问题 | 定位 |
| --- | --- | --- | --- | --- |
| R-R05 | L1-71 | 范围或措辞歧义 / 仍需处理 | 新增 CLS 题需要限定为原文历史介绍，避免被理解为 RAG 的通用检索做法 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:84>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:82>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:1376>) |
| ART-S02 | C8-1、C8-2、C8-12 | 原文错误/矛盾/边界 / 部分修正 | 原文将推理与工具调用描述为不可兼容的结构性冲突 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:99>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1168>) |
| ART-S06 | A6-9 | 原文错误/矛盾/边界 / 部分修正 | ReAct不能混合模型是原文实现假设 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:108>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:139>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:1766>) |
| ART-N02 | A3-16 | 原文错误/矛盾/边界 / 仍需处理 | 工具固定参数不保证固定观察结果 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:65>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:78>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:989>) |
| ART-N03 | A11-5 | 原文错误/矛盾/边界 / 仍需处理 | Single-Agent不能并行是原文实现假设 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:189>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:250>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:3115>) |
| ART-N04 | B2-7、B2-8、B17-5 | 原文错误/矛盾/边界 / 仍需处理 | 将幻觉唯一归因于知识缺失并否定拒答能力 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:34>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:41>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:338>) |
| ART-N05 | B4-9、B5-1 | 原文错误/矛盾/边界 / 仍需处理 | 有限overlap不能保证任意跨界句子完整 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:57>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:76>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:613>) |
| ART-N06 | C14-3 | 原文错误/矛盾/边界 / 仍需处理 | SSE发送取消请求不必先关闭事件流 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:166>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:243>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:2025>) |
| DEP-N1 | D8-12、D8-14 | 题答或选项问题 / 仍需处理 | 资源中等团队LoRA+SFT仍漏答 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:138>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:181>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1887>) |
| DEP-N2 | D21-1 | 章级知识点遗漏 / 仍需处理 | 代码评测Pass@k定义仍未覆盖 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:315>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:434>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4730>) |
| DEP-N3 | D6-8 | 题答或选项问题 / 仍需处理 | 勘误引用了已撤稿的Roadmap文献 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:131>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1345>) |
| Q-C04 | N3-44 | 范围或措辞歧义 / 部分修正 | 可恢复性的限定语由某些内存对象变成所有等待审批/进程 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:142>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1622>) |
| Q-C35 | F1-36 | 范围或措辞歧义 / 仍需处理 | Git checkout .能丢弃的改动范围需要限定为未暂存 | [题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:54>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:52>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:448>) |

具体证据和建议见[逐项清单](content-review-2026-10-14/findings.md)。

## 检查期间的修订与复验

初始快照为3122题，复验快照为3215题：新增94题，C8-11退役1题，59道原有题有改动；其中50道改参考答案、25道改网页题型、7道改MD题干、29道改引用（这些数字有交叉，不能相加）。上述题库改动来自检查期间的外部更新，本次审计仅生成报告。

初始列项共135项（包含后续收紧或撤回的部分审查推断，详见逐项验收）：题答/网页表述16项、章级覆盖缺口26项、网页考点缩减67项、原文错误或边界19项、措辞歧义7项。这里的“网页考点缩减”是原解析通常仍在，但改成选择题后不再要求学生作答这些子考点；与整章完全漏知识点分开统计。

| 初始发现验收状态 | 项数 |
| --- | ---: |
| 已修正或完成验收校正 | 132 |
| 部分修正 | 3 |
| 仍需处理 | 0 |

最新版本另记10项发现，不计入初始135项。全部初始发现保留历史证据并附当前修正验收结果，方便复查。

已经修正的代表问题包括：D11-1从三模型改为PPO四模型；H1-21补齐第四类高风险操作；A23-11补齐六类证据链；E7-8收紧单选唯一性；L2-59修正LightRAG对GraphRAG“全部胜出”；C16-13修正Bifrost实现语言；补题覆盖短期记忆加载、MCP过滤分支、查询扩展、数据库选型和Graph API职责等。是否完全修正以逐项清单的状态为准。

## 审查深度与未覆盖范围

当前3215道题的题干、参考长答、网页选项和填空映射均已人工阅读。全部章节和题目都有结构/引用映射，并结合辅助扫描检查；本次新增/修改题已单独复验，逐题索引记录题号、行号、原文引用与关联发现。原文覆盖审查采用小节/段落映射、未覆盖分支筛查和疑点读回；完整正文通读范围逐章标在[161章索引](content-review-2026-10-14/chapters.md)。

**未完成全部161篇原文逐句人工通读，也未逐张OCR原文图片或逐行执行长示例代码。因此未列问题的章节，只能写“本轮未列项”，不能写“已证明完全符合且无遗漏”。** 原文中的产品版本、命令、经验数字按文章快照判断；明确争议才查一手文档/论文，没有把现行规格变化机械算成旧题抄错。

网页视觉及真实DeepSeek判分不在本轮已经完成的验证范围。默认bank文件一致不能替代登录后展示和实际判分验证。

## 附件

- [逐项发现与修正验收](content-review-2026-10-14/findings.md)
- [161章审查范围索引](content-review-2026-10-14/chapters.md)
- [3215题定位索引](content-review-2026-10-14/questions.json)
- [机器可读发现](content-review-2026-10-14/findings.json)
- [证据摘要与文件哈希](content-review-2026-10-14/evidence-manifest.json)
