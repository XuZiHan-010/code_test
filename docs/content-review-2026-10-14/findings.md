# 逐项发现与修正验收

返回[主报告](../content-review-2026-10-14.md)。所有“初次发现证据”描述3122题快照，不代表最新题库仍有同样错误；请以当前状态和验收说明判断。新增发现另行标注。

## 仍需处理（10项）

### R-R05 · L1-71 · 新增 CLS 题需要限定为原文历史介绍，避免被理解为 RAG 的通用检索做法

分类：范围或措辞歧义。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：小林原文的 BERT 历史介绍确实写“在 RAG 场景中，通常取 BERT 输出的 [CLS] token”；新增单选及答案忠实于此句，没有配错章节。Sentence-BERT 原论文也把 CLS/平均池化列为当时常见表示方式，但指出未经相似度训练的 BERT CLS 表示在语义相似度检索上效果很差，SBERT 默认采用 mean pooling，并进行双塔/三元组训练。网页题干没有“按原文介绍”的限定，容易让学生把普通 BERT CLS 当成 RAG 推荐的通用做法。此项是需要收紧的适用范围，不按确定答案键错误计算，也不是说所有 CLS pooling 模型都不适合检索。

原建议：题干改为“原文介绍的 BERT 整段表示取哪个位置？”，解析注明这只是普通 BERT 的一种表示方法；实际检索应使用经过检索/相似度训练的 embedding，pooling 取决于模型。按项目勘误规则保留原文引用并加一手论文。

**当前验收：仍需处理。** 最新新增题仍存在，尚未修改。

- L1-71：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:84>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:82>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:1376>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。
- 一手核对资料1：[来源](https://aclanthology.org/D19-1410.pdf)。

### ART-N02 · A3-16 · 工具固定参数不保证固定观察结果

分类：原文错误/矛盾/边界。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：参考长答及原文对照表称Tools“输入固定则输出固定”。同题库A30-10原文明确相同工具参数在不同时间可因数据更新、缓存、权限或外部状态返回不同结果。固定的工具执行逻辑与固定外部观察不是同一个条件；Workflow中也可存在模型节点，固定的是流程骨架。

原建议：改成工具通常不负责自主选择流程、调用逻辑更可控；结果确定性须额外固定完整环境/数据，不能只固定参数。网页若继续作相对调试难度比较，增加“本文常见实现”的限定。

**当前验收：仍需处理。** 当前长答仍忠实保留上述源文断言；没有归属/实现条件限制。属于源文需收紧口径，不是题库擅自编造。

- A3-16：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:65>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:78>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:989>) · [原文](https://xiaolinnote.com/ai/agent/3_workflow_tools.html)。

### ART-N03 · A11-5 · Single-Agent不能并行是原文实现假设

分类：原文错误/矛盾/边界。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：参考长答与原文Single-Agent小节称多个独立子任务单Agent“只能一个个来”。C1-5/8、A26-6已说明同一个模型可一次发出多个互不依赖的tool_calls，由宿主并行执行，因此不能把单Agent和串行处理所有子任务画等号。多Agent另有专业分工、独立上下文和并行模型推理的价值。

原建议：限定为本篇所对比的逐步串行循环，或明确需要独立模型上下文的并行推理工作；不要否定单Agent宿主的工具并行能力。

**当前验收：仍需处理。** 当前长答仍忠实保留上述源文断言；没有归属/实现条件限制。属于源文需收紧口径，不是题库擅自编造。

- A11-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:189>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:250>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:3115>) · [原文](https://xiaolinnote.com/ai/agent/11_single_multi.html)。

### ART-N04 · B2-7、B2-8、B17-5 · 将幻觉唯一归因于知识缺失并否定拒答能力

分类：原文错误/矛盾/边界。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：原文与长答称知识不足“只能硬拼”、根源“都是参数里没有对应知识”。B17-1/5原文却明确检索到依据也可能额外编造/误读，B17-6还提供合法拒答出口。缺知识是风险来源，不是所有幻觉的唯一原因，自回归生成也不禁止生成“我不知道”或按拒答机制停止回答。 主审另确认B17-5仍无条件写“它不会说不知道”，同样需改为风险而非无拒答能力。

原建议：使用“缺少可靠知识时更易编造”等概率性表述，说明也有证据使用/推理错误；删除“只能”“根源都是”的通用因果断言。保留原文归属并补充B17的区别。

**当前验收：仍需处理。** 当前长答仍忠实保留上述源文断言；没有归属/实现条件限制。属于源文需收紧口径，不是题库擅自编造。

- B2-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:34>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:41>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:338>) · [原文](https://xiaolinnote.com/ai/rag/2_rag_problems.html)。
- B2-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:35>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:42>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:365>) · [原文](https://xiaolinnote.com/ai/rag/2_rag_problems.html)。
- B17-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:232>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:329>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:3013>) · [原文](https://xiaolinnote.com/ai/rag/17_hallucination.html)。

### ART-N05 · B4-9、B5-1 · 有限overlap不能保证任意跨界句子完整

分类：原文错误/矛盾/边界。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：原文、B4-9网页正确项和两题长答称跨界句子“一定完整”落在一个chunk。反例：chunk_size=500、overlap=100，窗口[0,500)和[400,900)；句子位于[350,550)，两个窗口都缺一端，即使句长200小于chunk_size也不完整。B5-7原文自己也指出overlap太小保护不足。

原建议：改为重叠可缓解一定长度范围的边界截断，不能保证所有句子/完整语义；需要完整句子时配合句子边界切分或动态扩展。同步修改网页正确项的“一定”。

**当前验收：仍需处理。** 当前长答仍忠实保留上述源文断言；没有归属/实现条件限制。属于源文需收紧口径，不是题库擅自编造。

- B4-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:57>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:76>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:613>) · [原文](https://xiaolinnote.com/ai/rag/4_chunking.html)。
- B5-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:63>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:86>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:674>) · [原文](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html)。

### ART-N06 · C14-3 · SSE发送取消请求不必先关闭事件流

分类：原文错误/矛盾/边界。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：原文与参考长答断言用户打断“只能先关SSE流再发POST”。SSE只限制该事件流的传输方向，不禁止在流仍打开时用另一个HTTP请求发取消命令；是否关闭和何时关闭是应用设计，不是SSE协议强制断开重连。WebSocket同连接发送控制消息的优点可成立，服务端也必须实际处理取消。 主审核对WHATWG EventSource接口：close只中止该EventSource对象的请求；另发取消HTTP请求并不要求先close。这个取消方案是协议/接口机制推得的应用设计，不是标准提供一个内建取消模型生成API。

原建议：解释改为SSE控制消息需要独立HTTP请求，WebSocket可在同一双向连接传递；删除必须先关流及必然明显断开重连的限制。

**当前验收：仍需处理。** 当前长答仍忠实保留上述源文断言；没有归属/实现条件限制。属于源文需收紧口径，不是题库擅自编造。

- C14-3：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:166>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:243>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:2025>) · [原文](https://xiaolinnote.com/ai/tools/14_sse_vs_websocket.html)。
- 一手核对资料1：[来源](https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface)。

### DEP-N1 · D8-12、D8-14 · 资源中等团队LoRA+SFT仍漏答

分类：题答或选项问题。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：D8-12题问个人、有一定资源团队、大厂，但答案中间说风格偏好下LoRA+DPO。原文§实战选型单列“中小企业、有几张A100没有大集群→LoRA+SFT，精度略好、训练更快”；当前D8共14题无此团队映射。新D8-14只补风格与大厂，D8-3的LoRA做SFT组合示例也没有资源选型含义。

原建议：D8-12補资源中等团队LoRA+SFT及与QLoRA的取舍；网页增加对应简答/场景题。

**当前验收：仍需处理。** 当前题库仍有此缺口/来源问题；本轮delta核验新增发现。

- D8-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:138>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:181>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1887>) · [原文](https://xiaolinnote.com/ai/llm/finetuning.html)。
- D8-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:140>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:183>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1945>) · [原文](https://xiaolinnote.com/ai/llm/finetuning.html)。

### DEP-N2 · D21-1 · 代码评测Pass@k定义仍未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：原文§主流学术Benchmark明确Pass@k为生成k个候选至少1个通过全部测试的比例。当前D21共13题，含新D21-12/13，均没有问答或typed主动覆盖Pass@k，名字也没有出现在答案。

原建议：增加Pass@k定义及k含义的题目；注意统计指标与单次实际执行测试结果的区别。

**当前验收：仍需处理。** 当前题库仍有此缺口/来源问题；本轮delta核验新增发现。

- D21-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:315>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:434>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4730>) · [原文](https://xiaolinnote.com/ai/llm/evaluation_metrics.html)。

### DEP-N3 · D6-8 · 勘误引用了已撤稿的Roadmap文献

分类：题答或选项问题。优先级：medium。证据版本：最新3215题版本新增发现。

发现证据：新增勘误用arXiv:2203.14101支撑“8张V100约36年”。arXiv官方页标明v4于2022-04-20撤回，原因是Article2 §2.3.1存在critical issues，最新版本无PDF。其旧算力估算不宜继续不加说明作为核对来源。A100约32年可用NVIDIA官方dense FP16峰值与GPT-3计算量直接核算。

原建议：删除8V100句和撤稿Roadmap引用，或明确撤稿且不作为证据；使用NVIDIA官方文档与GPT-3论文，并注明FP16 Tensor Core理论峰值与实际效率不同。

**当前验收：仍需处理。** 当前题库仍有此缺口/来源问题；本轮delta核验新增发现。

- D6-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:131>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1345>) · [原文](https://xiaolinnote.com/ai/llm/llm_training.html)。
- 一手核对资料1：[来源](https://arxiv.org/abs/2203.14101)。
- 一手核对资料2：[来源](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html)。

### Q-C35 · F1-36 · Git checkout .能丢弃的改动范围需要限定为未暂存

分类：范围或措辞歧义。优先级：low。证据版本：最新3215题版本新增发现。

发现证据：当前答案说git checkout .丢弃已跟踪文件的改动。Git官方说明未指定tree-ish的路径checkout从索引恢复版本；如果修改已经git add暂存，checkout .并不会把它还原到HEAD。这一说法需要工作区未暂存限定。答案的reset --hard HEAD分支仍可处理已暂存改动，因此不是整个回滚答案都错。

原建议：把该分句改为“git checkout .丢弃已跟踪文件的未暂存工作区改动”；明确HEAD须仍指向存档提交。

**当前验收：仍需处理。** 本轮delta中新出现的低优先范围歧义，当前快照尚未修订。

- F1-36：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:54>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:52>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:448>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_use.html)。
- 一手核对资料1：[来源](https://git-scm.com/docs/git-checkout)。


## 部分修正（3项）

### ART-S02 · C8-1、C8-3、C8-4、C8-5、C8-6、C8-7、C8-8、C8-9、C8-10、C8-11、C8-12、C8-2 · 原文将推理与工具调用描述为不可兼容的结构性冲突

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：原文多处称推理只能连续生成、暂停即丢状态、KV Cache必须一直占GPU、训练目标方向相反，并称o3工具只能在思考全部结束后使用；文末自身承认交错思考。OpenAI 2025-04-16发布文说明o3会串联多次工具调用、根据新信息反应并调整推理。网页C8-3省略了解释里仍保留的交错思考。

原建议：分清早期具体模型的工具支持限制、宿主适配和模型训练能力；不要把原文猜测当成通用必然机理。C8相关题保留“按原文/该实现”的限定，并增加交错思考方案。

**当前验收：部分修正。** C8-3/6补充官方核对与现行工具推理，C8-5/7/8/9/10加入早期/原文归属，C8-11已退役。仍有C8-12长答无归属地声称“中途强行打断…只能整个重来”，C8-1仍将工具调用表述为生成到一半被强制暂停、原样恢复，容易与请求间重建推理材料混淆。旧结构性机理断言尚未全部清除；交错思考仅在解释出现，未单独考查。 另一个同来源残留合并核算：C8-2正确项虽把FC改成“通常”，仍从“不稳定tool call”直接断定底层能力缺失；现有信息也可能指工具定义或宿主适配问题，建议改为分别排查，避免未证实根因。

- C8-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:99>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1168>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-3：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:101>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:142>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1197>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:102>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:143>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1224>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:104>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:147>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1250>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:105>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:148>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1252>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:106>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:149>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1278>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:107>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:150>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1280>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:108>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:151>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1306>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-10：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:109>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:152>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1307>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-11 已退役，见[记录](<D:/vscode html/xiaolincoding_test/content/retired-ids.json>)。
- C8-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:110>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:153>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1308>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C8-2：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:141>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1170>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- 一手核对资料1：[来源](https://openai.com/index/introducing-o3-and-o4-mini/)。

### ART-S06 · A6-9 · ReAct不能混合模型是原文实现假设

分类：原文错误/矛盾/边界。优先级：medium。证据版本：初次3122题版本。

发现证据：原文与参考答案把ReAct每步同一个模型、无法差异化分配说成普遍限制。ReAct的推理/行动/观察循环并不要求宿主每轮固定模型；这是所比较实现的假设。网页已只问Plan-and-Execute解耦的优势，未直接考查这项绝对断言。

原建议：写成“本文对比的单模型ReAct实现不便做这种规划/执行分配”，不要推广成范式禁止模型路由。

**当前验收：部分修正。** 参考答案追加单模型ReAct是本篇对比实现假设，非范式不能换模型；网页原本就只问Plan-and-Execute优势，现仍无问题。但MD题干仍问“而ReAct做不到”，尚未加入“原文所比较的实现”等限定，问题本身继续预设错误的普遍结论。

- A6-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:108>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:139>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:1766>) · [原文](https://xiaolinnote.com/ai/agent/6_three_patterns.html)。

### Q-C04 · N3-44 · 可恢复性的限定语由某些内存对象变成所有等待审批/进程

分类：范围或措辞歧义。优先级：medium。证据版本：初次3122题版本。

发现证据：原文是“某些等待中的审批、交互对象或正在运行的进程，只存在于当时的进程内”，并强调历史保存什么才能恢复什么。typed却笼统问哪些无法从记录还原，正确项为当时等待审批、当时运行进程，失去仅在内存的条件。

原建议：正确项明确“仅存在于原进程内、未被持久化的等待审批/运行进程状态”。

**当前验收：部分修正。** typed已改为“可能因为只存在于当时的进程内”，选项范围歧义已修复；参考答案仍笼统断言等待审批、交互对象或运行进程只存在原进程内，漏了来源的“某些”限定。

- N3-44：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:142>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1622>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。


## 已修正或完成验收校正（132项）

### Q-R01 · L1-25 · 把“最常用之一”写成唯一最高级

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：原文保留“之一”，答案删除该限定；网页B干扰项也复用了过强表述。

原建议：改为“常用商业方案之一”。

**当前验收：已修正或完成验收校正。** L1-25 已补回“之一”，网页干扰项同步修订。

- L1-25：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:35>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:33>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:523>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。

### Q-R02 · L2-6 · 对比题只回答GraphRAG一侧

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：题问两种组织形式，答案只解释关系网，未明确传统RAG以独立文本块作为检索单元。

原建议：补齐文本块与显式实体关系图的对照。

**当前验收：已修正或完成验收校正。** L2-6 已补回传统 RAG 的组织方式与示例对照。

- L2-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:98>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:96>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:1545>) · [原文](https://xiaolinnote.com/agent/rag/graphrag-lightrag.html)。

### Q-R03 · L2-31 · 把可能发生的社区变更写成必然

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：原文说新增文档可能触发级联、原社区可能过时；答案写新文档会让社区划分过时。

原建议：保留“可能”，区分受影响社区。

**当前验收：已修正或完成验收校正。** L2-31 已改为“可能”，保留更新条件。

- L2-31：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:123>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:121>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:1822>) · [原文](https://xiaolinnote.com/agent/rag/graphrag-lightrag.html)。

### Q-R04 · H6-14、H6-43 · 自动转后台遗漏功能门控

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：原文getAutoBackgroundMs只有环境变量或feature flag开启才返回120000，否则为0。答案无条件说超过2分钟转后台；H6-43沿用了原文简化表。

原建议：明确自动降级只在相应门控开启时生效。

**当前验收：已修正或完成验收校正。** H6-14/H6-43 已注明 feature/环境开关门控。

- H6-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:282>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:316>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3682>) · [原文](https://xiaolinnote.com/claudecode/source/cc_multi_agent.html)。
- H6-43：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:313>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:351>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:4293>) · [原文](https://xiaolinnote.com/claudecode/source/cc_multi_agent.html)。

### G-R01 · K2-14、K2-19 · 短期记忆启动加载窗口未出题

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文启动时只加载最近一两天sessions日志；29题只考按天存放与长期捕获，没有启动加载范围和成本取舍。

原建议：追加短期记忆加载策略题，使用新题号。

**当前验收：已修正或完成验收校正。** 新增 K2-30 考查最近一两天日志加载。

- K2-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-concepts.md:76>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-concepts.md:74>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-concepts.json:881>) · [原文](https://xiaolinnote.com/agent/concept/openclaw.html)。
- K2-19：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-concepts.md:81>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-concepts.md:79>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-concepts.json:938>) · [原文](https://xiaolinnote.com/agent/concept/openclaw.html)。

### G-R02 · L1-31 · BERT整段向量的CLS表示未覆盖

分类：章级知识点遗漏。优先级：low。证据版本：初次3122题版本。

发现证据：原文BERT小节介绍用CLS token向量作为整段文本表示；本章只考预训练任务、窗口和代际。

原建议：补本篇的表示方法题，不作为所有BERT检索的统一最佳实践。

**当前验收：已修正或完成验收校正。** 新增 L1-71 考查 CLS；忠实性缺口补上，但科学表述需另见 R-R05。

- L1-31：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:41>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:39>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:613>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。

### G-R03 · H5-15、H5-16 · project记忆的强制正文结构遗漏

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文project与feedback同样要求事实或决定、Why、How to apply；当前只要求feedback三段，project只讲项目动态与绝对日期。

原建议：扩展project题答或追加约束题。

**当前验收：已修正或完成验收校正。** 新增 H5-46 考查 project 与 feedback 同结构及原因。

- H5-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:230>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:256>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3053>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。
- H5-16：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:231>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:257>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3055>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。

### G-R04 · H5-4 · 分层Memory三个层级职责未出题

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文方案四解释core常驻、recall近期、archival远期及工具搬运；H5-4只问复杂度，不讲三层含义。

原建议：追加三层职责与搬运关系题。

**当前验收：已修正或完成验收校正。** 新增 H5-47 有序三空考查三层职责。

- H5-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:219>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:245>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:2880>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。

### G-R05 · H5-3、H5-44 · Embedding变更导致召回不稳定未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文方案三第2个问题是更换Embedding模型可能显著改变召回；全章题答没有该点，H5-3只考相似不等于相关。

原建议：追加召回稳定性和模型变更风险题。

**当前验收：已修正或完成验收校正。** 新增 H5-48 考查更换 embedding 后召回不稳定。

- H5-3：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:218>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:244>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:2879>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。
- H5-44：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:261>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:291>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3458>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。

### G-R06 · H6-6 · 过滤函数的MCP提前返回分支未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文filterToolsForAgent先检查mcp__前缀并return true，再判名单；题答仅描述三道名单。

原建议：补函数例外；提前返回不代表所有权限检查均免除。

**当前验收：已修正或完成验收校正。** 新增 H6-49 考查 MCP early return 分支与其他过滤次序。

- H6-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:274>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:308>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3543>) · [原文](https://xiaolinnote.com/claudecode/source/cc_multi_agent.html)。

### G-R07 · H6-36、H6-37 · 不相关或旧worker跑偏时新建的规则未覆盖

分类：章级知识点遗漏。优先级：low。证据版本：初次3122题版本。

发现证据：原文Continue vs Spawn要求不相关新任务或旧worker跑偏时新派；现有题只考相关任务续用和验证换新。

原建议：补第三种决策场景。

**当前验收：已修正或完成验收校正。** 新增 H6-50 考查无关上下文/走偏时派新 worker。

- H6-36：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:306>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:344>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:4105>) · [原文](https://xiaolinnote.com/claudecode/source/cc_multi_agent.html)。
- H6-37：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:307>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:345>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:4132>) · [原文](https://xiaolinnote.com/claudecode/source/cc_multi_agent.html)。

### W-R01 · K1-8 · 网页只考混合架构，丢掉选型条件

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原题问Workflow/Agent各适用条件及生产混合；网页只问最常见架构，没有主动考固定步骤或高可靠性与开放任务的选型。

原建议：补情景选择题；解析仍有知识不等于已考查。

**当前验收：已修正或完成验收校正。** 新增 K1-44 考查 Workflow/Agent 选型条件。

- K1-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-concepts.md:18>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-concepts.md:16>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-concepts.json:116>) · [原文](https://xiaolinnote.com/agent/concept/agent.html)。

### W-R02 · L1-20 · 切割选型路线缩成起步策略

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只选递归切割，不再考结构化优化与进阶；父子块的小块检索、父块返回机制没有其他题考查。

原建议：补父子块机制题。

**当前验收：已修正或完成验收校正。** 新增 L1-70 考查优化、进阶阶段及父子块机制。

- L1-20：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:30>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:28>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:434>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。

### W-R03 · L1-46 · 三种查询扩展机制缩成只考HyDE

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原题包含Query Rewrite/HyDE/Multi-Query；网页只问HyDE，其他方法作为干扰项但不考其执行方法。

原建议：改为匹配或分别设情景题。

**当前验收：已修正或完成验收校正。** 新增 L1-74 考查查询改写与多查询扩展。

- L1-46：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:56>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:54>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:860>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。

### W-R04 · L1-40、L1-41 · 向量库特点与选型缩成Chroma和Milvus

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页不完整考Weaviate原生混合/Embedding集成、Qdrant折中，以及已有PG或ES时的扩展选型。

原建议：增加场景匹配；本项不是据现行规格判错。

**当前验收：已修正或完成验收校正。** 新增 L1-72/L1-73 考查其余向量数据库描述及选型。

- L1-40：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:50>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:48>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:724>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。
- L1-41：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:51>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:49>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:751>) · [原文](https://xiaolinnote.com/agent/rag/rag.html)。

### W-R05 · M4-9 · 好节点的质量标准未再被考查

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原题问标准与类型，网页只选可充当节点的对象，丢掉单一职责、独立测试、可替换。

原建议：补节点质量情景题。

**当前验收：已修正或完成验收校正。** 新增 M4-30 考查节点单职责、可测及替换边界。

- M4-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-engineering.md:159>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-engineering.md:157>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-engineering.json:1908>) · [原文](https://xiaolinnote.com/agent/engineering/graph-engineering.html)。

### W-R06 · M4-20 · LangGraph多API职责缩成条件边

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只问add_conditional_edges，其余StateGraph/add_node/汇合add_edge/compile职责仅在解析。

原建议：保留API职责对照或流程理解题。

**当前验收：已修正或完成验收校正。** 新增 M4-31 考查其余 API 职责，与 M4-20 互补。

- M4-20：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-engineering.md:170>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-engineering.md:168>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-engineering.json:2085>) · [原文](https://xiaolinnote.com/agent/engineering/graph-engineering.html)。

### R-R01 · L2-56 · LightRAG删文档不能无条件删除共享节点和边

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：题答忠实原文简化表；官方核心文档要求保留其他文档共享实体/关系、重建描述并更新向量。

原建议：注明原文缺失的共享知识边界。

**当前验收：已修正或完成验收校正。** L2-56 已依据官方删除规则保留共享实体/关系并重建。

- L2-56：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:148>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:146>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:2305>) · [原文](https://xiaolinnote.com/agent/rag/graphrag-lightrag.html)。
- 一手核对资料1：[来源](https://github.com/HKUDS/LightRAG/blob/main/docs/ProgramingWithCore.md#delete-by-document-id)。

### R-R02 · L2-59 · “四数据集四维度全胜”不符合论文

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：EMNLP2025论文表1，Mix下LightRAG全面性49.6%、赋能性49.2%、整体49.6%，均低于GraphRAG；多样性64.0%领先。

原建议：改为多数比较领先，注明数据集、指标及评测条件。

**当前验收：已修正或完成验收校正。** L2-59 已明确 Mix 三项略逊，删除全胜 GraphRAG 的结论。

- L2-59：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-retrieval.md:151>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-retrieval.md:149>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-retrieval.json:2308>) · [原文](https://xiaolinnote.com/agent/rag/graphrag-lightrag.html)。
- 一手核对资料1：[来源](https://aclanthology.org/2025.findings-emnlp.568.pdf#page=6)。

### R-R03 · M3-27 · 把Ralph Wiggum定义为失败模式

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：命名者原文把Ralph定义为Bash循环驱动的开发技术；假完成是治理风险，不是该技术定义。

原建议：区分Ralph技术、失败风险和验收闸门。

**当前验收：已修正或完成验收校正。** M3-27 已改正 Ralph 定义，并区分失败表现与防法。

- M3-27：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent-illustrated-engineering.md:142>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent-illustrated-engineering.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent-illustrated-engineering.json:1719>) · [原文](https://xiaolinnote.com/agent/engineering/loop_engineering_handbook.html)。
- 一手核对资料1：[来源](https://ghuntley.com/ralph/)。

### R-R04 · H5-44 · Mem0的91.6分归到错误年份论文

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：原文与答案归于2025年4月arXiv2504.19413；官方明确91.6是2026年4月新算法结果。

原建议：校正年份、版本和评价口径，或删除非必要数字。

**当前验收：已修正或完成验收校正。** H5-44 已注明 2026 年算法及原文误归 2025 年论文。

- H5-44：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:261>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:291>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:3458>) · [原文](https://xiaolinnote.com/claudecode/source/cc_memory.html)。
- 一手核对资料1：[来源](https://mem0.ai/blog/mem0-the-token-efficient-memory-algorithm)。

### ART-A01 · A23-11 · 六类证据链仅答了四类

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：原文“一条可信的证据链应该记录什么？”列六类，参考答案仅保留任务/目标/动作、工具/参数/时间、身份/授权、版本，漏掉工具调用ID/幂等键/服务端资源ID，以及原始状态/预期后置条件/验证结果。A23-12、13、15虽各提到相关概念，不能补齐本题要求的证据链关联清单。网页仍为short，缺项直接保留。

原建议：补全两类及其作用，保持六类完整清单。

**当前验收：已修正或完成验收校正。** 当前长答已按原文补齐全部六类证据链，新增请求与外部结果关联，以及后置条件/验证结果两类。

- A23-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:404>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:537>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6570>) · [原文](https://xiaolinnote.com/ai/agent/23_task_hallucination.html)。

### ART-A02 · A7-7 · 网页把CoT的一次生成限制扩展到ToT

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：网页correct C称“前者是一次生成内部的思考”，前者同时指CoT、ToT。原文只对CoT说一次生成，对ToT说多路径探索选优；A14-6还明确ToT涉及多路径、多层与评估调用。

原建议：改为“前者组织推理路径，后者拆解可独立执行的任务步骤”；保留CoT一次生成与ToT可多次调用的区别。

**当前验收：已修正或完成验收校正。** 网页correct C已删除“一次生成”并用模型想清楚问题与Agent任务步骤的粒度区分，原范围扩大已消除。

- A7-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:125>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:162>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2052>) · [原文](https://xiaolinnote.com/ai/agent/7_tasksplit.html)。

### ART-A03 · B19-1 · 把切割边界可能变化写成必然变化

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：引用小节先说切割结果“可能完全不同”，并明示Chunking稳定时某些场景可局部更新；参考答案和网页正确项却称“内容一改切割边界就变，新旧chunk无法一一对应”。同章B19-7参考答案已使用“可能改变”。

原建议：改成“修改可能改变chunk数量、边界与内容；无法稳定对应时宜按文档重建”。另保留只改文本而不更新Embedding会不一致的直接原因。

**当前验收：已修正或完成验收校正。** MD长答和网页正确项均改为切割结果“可能”变化，工程上最可靠/难以对应的表述；不再断言任何修改必然改变边界。稳定切分例外仍在源文，当前推荐性表述足以解决旧项。

- B19-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:256>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:363>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:3420>) · [原文](https://xiaolinnote.com/ai/rag/19_dynamic_update.html)。

### ART-C01 · A8-1、A8-8、A8-9 · 四类记忆的工程类比限定未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文“四种记忆类型”开头明示感知/短期/长期/实体是工程上方便管理的一种划分，借用认知科学词汇，并非心理学学术标准。A8全章题答没有保留这项限定，填空题直接称“四类记忆”。

原建议：在A8-1题干写“按本篇的工程划分”，解释补上不是通用学术分类；可增一题区分工程类比和严格分类。

**当前验收：已修正或完成验收校正。** 新增题直接考查该四类划分是工程类比、不是心理学学术标准；选项和答案保留该限定。

- A8-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:135>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:176>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2228>) · [原文](https://xiaolinnote.com/ai/agent/8_memory.html)。
- A8-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:143>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:186>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2360>) · [原文](https://xiaolinnote.com/ai/agent/8_memory.html)。
- A8-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:144>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:187>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2361>) · [原文](https://xiaolinnote.com/ai/agent/8_memory.html)。

### ART-C02 · B16-6 · 图查询与现代图数据库的向量能力区别遗漏

分类：章级知识点遗漏。优先级：low。证据版本：初次3122题版本。

发现证据：原文明确现代图数据库如Neo4j也可以增加向量索引，但这是组合向量检索，不是图遍历自行理解语义。B16全章解释没有这一限定，只说图数据库不能替代向量检索。

原建议：补充传统图遍历与图数据库产品附带向量索引的区别。

**当前验收：已修正或完成验收校正。** 新增题完整区分图数据库增加向量索引与图遍历本身做语义匹配，两类能力组合的限定已补齐。

- B16-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:222>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:313>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:2845>) · [原文](https://xiaolinnote.com/ai/rag/16_graph_db.html)。

### ART-M01 · A23-12 · “什么样才算证据”被简化成字段形状

分类：范围或措辞歧义。优先级：medium。证据版本：初次3122题版本。

发现证据：源文说自然语言不能天然算证据，更合适的是结构化回执，并要检查Schema、任务关联、状态枚举、可验证字段。网页问“才算证据”，正确项只有带请求ID/资源ID/状态的结构化对象，漏掉真实性与关联校验。结构化对象的字段形状本身不足以证明完成。

原建议：题干改为“原文建议优先使用哪种回执形式”，或在正确项加入“经调度层校验、可与任务和外部状态关联”。

**当前验收：已修正或完成验收校正。** 网页题干已改为“按原文，哪种形式的工具回执更适合作为证据”，不再把字段形状当作充足完成证明。

- A23-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:405>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:538>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6572>) · [原文](https://xiaolinnote.com/ai/agent/23_task_hallucination.html)。

### ART-M02 · B15-4 · 删除“全局”后，GraphRAG局部查询被当作错误

分类：范围或措辞歧义。优先级：low。证据版本：初次3122题版本。

发现证据：MD问适合何种全局问题，网页改为何种问题，且将“只需查到一条具体事实”列为错误。引用原文同时说明局部模式可查“A公司的CEO是谁”。全局优势是主线，但泛问“适合”让干扰项不够严格。

原建议：保留“全局问题”，或问“相比普通向量检索，GraphRAG的主要优势场景”。

**当前验收：已修正或完成验收校正。** 网页改为“相比普通向量检索，GraphRAG主要解决哪类问题”，明确比较主要优势，不再泛化所有可用查询类型。

- B15-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:203>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:286>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:2554>) · [原文](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html)。

### ART-S01 · C3-11 · 原文把KL惩罚当成PPO必然内置

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：答案与原文一致，但PPO原始论文第3/4节区分clipped surrogate与adaptive KL penalty，后者可以替代或叠加前者。不能把所有PPO笼统定义为内置KL约束，也不能保证不会奖励投机退化。

原建议：保留“原文的说法”并标注待核；正确解释分清PPO约束更新幅度和RLHF实现额外采用的KL正则。

**当前验收：已修正或完成验收校正。** 长答明确原文内置KL说法不准确，区分clipped目标、KL惩罚变体及RLHF外加KL，引用PPO论文；网页正确项删除内置KL。更新幅度和稳定性为常见设计目的，不将“避免”读成严格无退化保证。

- C3-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:44>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:57>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:407>) · [原文](https://xiaolinnote.com/ai/tools/3_fc_training.html)。
- 一手核对资料1：[来源](https://arxiv.org/pdf/1707.06347)。

### ART-S03 · C7-7、C8-2、C11-4 · 原文把Skill→MCP→原生FC说成缺一不可

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：C11-4已用“按本篇”忠实复述，因此不是题库擅自编造；但原文把Skill必须靠MCP、MCP完全依赖模型原生Function Calling当协议必需。C19-C22的CLI、脚本、宿主加载机制就可反证Skill不强制依赖MCP。MCP官方架构明确只规范上下文交换，并不规定应用怎样使用LLM。

原建议：将三者画成常见集成示例，说明可以用本地函数/CLI等能力替代MCP接入，模型侧也可由宿主使用其他请求表达机制；题库保留原文归属并提示争议。

**当前验收：已修正或完成验收校正。** C7-7和C8-2均将原生FC改为常见宿主接入方式，并说明规范不强制；C11-4保留按原文的题干，解释追加Skill可只用CLI/脚本、MCP不规定宿主机制的勘误。旧缺一不可的无条件规范断言已明确归属并纠正。C8-2尚有另一个因果确定性问题，另列current新发现。

- C7-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:96>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:133>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1130>) · [原文](https://xiaolinnote.com/ai/tools/7_fc_vs_mcp_usage.html)。
- C8-2：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:141>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1170>) · [原文](https://xiaolinnote.com/ai/tools/8_reasoning_no_mcp.html)。
- C11-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:135>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:194>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1526>) · [原文](https://xiaolinnote.com/ai/tools/11_fc_skill_mcp.html)。
- 一手核对资料1：[来源](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)。

### ART-S04 · A2-11、C5-8、C5-9 · Tools必有副作用、Resources因此可宽松开放的口径冲突

分类：原文错误/矛盾/边界。优先级：medium。证据版本：初次3122题版本。

发现证据：A2/C5把Tools定义成改变外部状态的操作，并用副作用区分Tools/Resources；C4-10明确README也能经Tool只读，C4-15按具体操作和数据设计授权。C5-2已指出文章间不一致，但C5-8/9仍无限定复述。

原建议：在相关解释保留“本篇按副作用做简化分类”，补充Tools也可只读，Resources也可能含敏感数据；不能只按能力类型决定授权。

**当前验收：已修正或完成验收校正。** 相关长答均追加Tools可只读、model/application常见控制分工及按具体操作/数据授权的说明，引用规范；与C4的矛盾已向读者解释。

- A2-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:39>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:46>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:469>) · [原文](https://xiaolinnote.com/ai/agent/2_components.html)。
- C5-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:72>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:97>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:808>) · [原文](https://xiaolinnote.com/ai/tools/5_mcp_components.html)。
- C5-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:73>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:98>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:809>) · [原文](https://xiaolinnote.com/ai/tools/5_mcp_components.html)。
- 一手核对资料1：[来源](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)。

### ART-S05 · C16-13 · 原文Bifrost语言写成Rust

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：原文表格和参考答案都称Bifrost用Rust。通常所指Maxim的Bifrost官方仓库提供Go SDK、core/bifrost.go与core/go.mod，可核对为Go实现。网页One API题正确项未受此影响，但参考解释仍传播这一事实错误。若原文指另一同名项目，则须明确项目链接。

原建议：先确认项目身份，Maxim Bifrost应改为Go；同名项目须给出准确仓库。

**当前验收：已修正或完成验收校正。** Bifrost长答已改为Go并明确原文Rust勘误、引用官方仓库；网页干扰项也删除Rust。

- C16-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:211>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:302>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:2728>) · [原文](https://xiaolinnote.com/ai/tools/16_llm_gateway.html)。
- 一手核对资料1：[来源](https://github.com/maximhq/bifrost)。

### ART-W01 · A2-13 · 网页未再独立考查：摘要压缩/滑动窗口及信息损失取舍

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“短期记忆最大的问题是什么，有哪些处理办法？”；网页改为“短期记忆最大的问题是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A2-19 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：上下文窗口不够用时，短期记忆有哪些处理办法，代价是什么？ 当前答：可以做摘要压缩，把前面的步骤浓缩成关键信息；也可以用滑动窗口，只保留最近几步的详细内容。两种方式都会丢信息，怎样在记住够多和不撑爆上下文之间取舍，是核心的设计问题。

- A2-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:41>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:48>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:483>) · [原文](https://xiaolinnote.com/ai/agent/2_components.html)。

### ART-W02 · A4-8 · 网页未再独立考查：Reflexion效果的HumanEval证据（原文给80%→91%）

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Reflexion 的效果有什么数据支撑，代价是什么？”；网页改为“Reflexion 提升效果的代价是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A4-13 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：[填空题·有序] 在 HumanEval 代码生成基准上，GPT-4 直接做的准确率约为 ____，加上 Reflexion 后提升到 ____。 当前答：在 HumanEval 代码生成基准上，GPT-4 直接做的准确率约 80%，加上 Reflexion 后提升到 91%。

- A4-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:75>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:94>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:1195>) · [原文](https://xiaolinnote.com/ai/agent/4_patterns.html)。

### ART-W03 · A6-14 · 网页未再独立考查：Reflection额外消耗示例及一般2～3轮上限

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“叠加 Reflection 会增加多少 token 消耗，反思轮次一般怎样限制？”；网页改为“反思的轮次为什么要设上限？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A6-17 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：叠加 Reflection 会在基础范式上增加多少 token 消耗，反思一般最多几轮？ 当前答：每个需要反思的节点至少多一次 LLM 调用，token 消耗会在基础范式上再增加 30% 到 100%，取决于反思的轮次和严格程度；一个步骤反思两轮才通过，就相当于消耗翻三倍。所以反思要有上限，一般最多 2 到 3 轮。

- A6-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:113>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:144>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:1849>) · [原文](https://xiaolinnote.com/ai/agent/6_three_patterns.html)。

### ART-W04 · A8-13 · 网页未再独立考查：Letta的Core/Recall/Archival三层及角色

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Letta 把记忆分成哪三层，它最特别的设计是什么？”；网页改为“Letta 最特别的设计是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A8-20 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：[填空题·有序] Letta 把记忆分成三层：始终留在 context window 里、存核心信息的是 ____，按时间存储最近对话历史的是 ____，长期归档、容量无限但要主动检索的是 ____。 当前答：Core Memory 始终留在 context window 里，存用户画像、当前任务目标等核心信息；Recall Memory 是最近的对话历史，按时间存储；Archival Memory 是长期归档的知识，容量无限但要主动检索。

- A8-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:148>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:191>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2424>) · [原文](https://xiaolinnote.com/ai/agent/8_memory.html)。

### ART-W05 · A8-15 · 网页未再独立考查：向量候选检索与图谱补充关联信息的组合

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“知识图谱用什么结构存储记忆，在记忆模块里怎样和向量数据库配合？”；网页改为“知识图谱用什么结构存储记忆？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A8-21 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：在记忆模块里，知识图谱和向量数据库怎样配合？ 当前答：向量数据库负责模糊的语义检索，知识图谱负责精确的关系推理。做法是在对话中用 LLM 自动提取实体和关系存入图谱，检索时先用向量检索拿候选，再用图谱补充关联信息，合并后注入 context。

- A8-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:150>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:193>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:2478>) · [原文](https://xiaolinnote.com/ai/agent/8_memory.html)。

### ART-W06 · A12-3 · 网页未再独立考查：规则评分与LLM评分两种方式及开销取舍

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“重要性过滤怎样决定保留哪些历史，有哪两种打分方式？”；网页改为“重要性过滤怎样决定保留哪些历史？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A12-13 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：重要性过滤有哪两种打分方式，各有什么优缺点？ 当前答：规则打分：含“决定”“确认”“需求”等关键词、或被后续引用多的记录加分，纯闲聊降分，快但粗糙；LLM 打分：让模型逐条判断，更准，但每条都要一次调用，通常在批量清理历史时做。

- A12-3：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:198>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:263>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:3295>) · [原文](https://xiaolinnote.com/ai/agent/12_memcompress.html)。

### ART-W07 · A16-9 · 网页未再独立考查：Handoff适用边界，以及规模复杂时改用Orchestrator

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“工程上静态路由、动态路由和 Handoff 应怎样搭配使用？”；网页改为“工程上静态路由和动态路由怎样搭配？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A16-10 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：按原文，Handoff 适合什么样的场景？ 当前答：Handoff 适合 Agent 数量不多、职责边界清晰、输入输出接口明确的场景；Agent 多、任务流向复杂时，还是用 Orchestrator 统一调度。

- A16-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:265>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:356>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:4322>) · [原文](https://xiaolinnote.com/ai/agent/16_collab.html)。

### ART-W08 · A17-1 · 网页未再独立考查：与长期Memory及记忆压缩的分工区别

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“上下文工程与 Prompt 工程、长期记忆、记忆压缩分别有什么区别？”；网页改为“上下文工程与 Prompt 工程有什么区别？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A17-15 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：上下文工程与长期记忆、记忆压缩各是什么关系？ 当前答：Context Engineering 关注这一轮让模型看到什么，其中包括召回哪段 Memory；Memory 像仓库，负责跨时间保存和召回；记忆压缩是在仓库或工作台太拥挤时降低内容体积的方法。

- A17-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:268>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:363>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:4381>) · [原文](https://xiaolinnote.com/ai/agent/17_context_engineering.html)。

### ART-W09 · A17-5 · 网页未再独立考查：超长降载顺序及不可丢弃的约束/状态

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Token 预算应该何时分配，超长时按什么顺序降载？”；网页改为“Token 预算应该在什么时候分配？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A17-16 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：装配后仍然超长时，应按什么顺序降载，哪些内容不能丢？ 当前答：按“去掉重复内容、移除低相关工具和证据、用结构化状态替代冗长过程、压缩较旧历史”的顺序降载；用户硬约束、当前目标、安全规则和未完成状态不可随意丢失，实在装不下就分步检索或向用户确认。

- A17-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:272>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:367>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:4469>) · [原文](https://xiaolinnote.com/ai/agent/17_context_engineering.html)。

### ART-W10 · A19-13 · 网页未再独立考查：细粒度阶段进度；pass^k与pass@k区别

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“为什么要记录阶段性进度，又为什么要对同一任务重复运行？”；网页改为“为什么要对同一任务重复运行？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A19-23 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：任务没有全部完成时为什么还要记录阶段性进度？pass^k 与 pass@k 有什么不同？ 当前答：任务没全部完成但前几个子目标做对了，只记 0 会丢掉诊断信息，AgentBoard 的思路是在成功率之外记录细粒度进度；τ-bench 的 pass^k 看的是连续多次运行都成功，与只要一次通过的 pass@k 不是一回事。

- A19-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:319>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:428>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:5207>) · [原文](https://xiaolinnote.com/ai/agent/19_evaluation.html)。

### ART-W11 · A19-18 · 网页未再独立考查：可重置/Mock环境、初始状态和版本固定

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“为什么评测要按场景切片，评测环境要怎样保证可复现？”；网页改为“为什么评测要按场景切片，而不只看总分？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A19-24 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：涉及数据库、支付、发消息的评测，环境要怎样保证可复现？ 当前答：在可重置的测试环境或 Mock 服务里运行，固定初始状态，并记录模型、Prompt、工具和数据的版本。

- A19-18：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:324>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:433>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:5270>) · [原文](https://xiaolinnote.com/ai/agent/19_evaluation.html)。

### ART-W12 · A21-10 · 网页未再独立考查：不能只入口随机采样；保留错误和超慢Trace

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Trace 里应怎样对待敏感内容，采样又要注意什么？”；网页改为“Trace 里应怎样对待敏感内容？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A21-19 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Trace 采样为什么不能只在请求入口随机抽，应该怎样保留？ 当前答：只在请求入口随机抽，罕见的超慢和错误请求会被漏掉；可以结合错误状态、业务重要性和完成后的总耗时，保留更有诊断价值的 Trace。

- A21-10：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:358>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:479>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:5779>) · [原文](https://xiaolinnote.com/ai/agent/21_agent_latency_trace.html)。

### ART-W13 · A22-19 · 网页未再独立考查：Integrator按DAG和接口依赖决定合并顺序

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“为什么最终提交权只交给一个 Integrator，它按什么顺序合并？”；网页改为“为什么最终提交权只交给一个 Integrator？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A22-22 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Integrator 按什么顺序合并各 Agent 的产出？ 当前答：按任务 DAG 和接口依赖确定合并顺序，例如先合公共类型和服务端接口，再合调用方，最后合测试。

- A22-19：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:388>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:515>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6338>) · [原文](https://xiaolinnote.com/ai/agent/22_multi_agent_resilience.html)。

### ART-W14 · A23-12 · 网页未再独立考查：证据链敏感参数脱敏、哈希、必要字段处理

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“证据链里的敏感参数怎么处理，什么样的工具回执才算证据？”；网页改为“什么样的工具回执才算证据？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A23-20 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：证据链里的敏感参数应怎样处理？ 当前答：证据链不代表把所有敏感参数原样写进日志：身份证号、访问令牌和邮件正文等应脱敏、哈希或只保留必要字段，同时保证审计人员仍能把请求、回执和外部状态关联起来。

- A23-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:405>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:538>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6572>) · [原文](https://xiaolinnote.com/ai/agent/23_task_hallucination.html)。

### ART-W15 · A24-5 · 网页未再独立考查：只读事务、查询超时/行数/资源限制的职责（AST另题覆盖）

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“参数化、AST 白名单、只读事务、超时与行数限制各防什么问题？”；网页改为“参数化查询防的是什么问题？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A24-23 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：只读事务、最大返回行数、执行超时和资源配额各防什么问题？ 当前答：只读事务防止写入；最大返回行数、执行超时和资源配额限制查询规模，防止资源耗尽。数据库账号的最小权限是最后一道边界。

- A24-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:419>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:556>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6850>) · [原文](https://xiaolinnote.com/ai/agent/24_database_security.html)。

### ART-W16 · A24-7 · 网页未再独立考查：日期/过滤/维度/连接口径、结果合理性校验与对账

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“一条查询安全，却得到错误业务答案，通常还要核查哪些口径？”；网页改为“数据库安全与查询真实性各解决什么问题？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A24-24 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：要避免一条没有越权的查询得出错误的业务答案，执行前后各要核查什么？ 当前答：要核对指标口径、时间字段、过滤条件和可用维度；执行前检查表列、连接关系和租户条件；执行后做合理性校验，如总数不能小于任何分组数、金额汇总与权威报表对账、关键决策抽样看原始记录。

- A24-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:421>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:558>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:6904>) · [原文](https://xiaolinnote.com/ai/agent/24_database_security.html)。

### ART-W17 · A26-9 · 网页未再独立考查：调用前容量检查、输出预留和历史摘要保留约束

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“工具返回很长、输入接近容量边界时分别怎么处理？”；网页改为“工具返回几万行日志时，应怎样处理？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A26-22 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：输入接近容量边界时，调用模型前应怎样处理？ 当前答：调用前检查输入占用并为输出留出空间；接近容量时减少无关材料，或把已结束的过程整理成摘要。摘要必须保留任务约束和未解决状态，原始资料也要能找回。

- A26-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:470>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:613>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:7688>) · [原文](https://xiaolinnote.com/ai/agent/26_harness_design.html)。

### ART-W18 · A26-19 · 网页未再独立考查：模型/工具/验收各阶段Trace字段与脱敏要求

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Trace 是什么，要记录哪些内容？”；网页改为“Trace 是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A26-23 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Trace 在模型调用、工具执行和验收阶段各要记录什么？ 当前答：模型调用记录所用模型、输入材料或可复原的引用、输出和用量；工具执行记录参数、起止时间、结果位置和错误；验收阶段记录检查项、对应版本和判断依据。敏感信息要脱敏或受控存储。

- A26-19：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:480>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:623>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:7932>) · [原文](https://xiaolinnote.com/ai/agent/26_harness_design.html)。

### ART-W19 · A27-9 · 网页未再独立考查：同类经验合并、补证据及冲突查权威定义

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“经验库里的同类经验、相互矛盾的经验和未核实的反思分别怎么处理？”；网页改为“经验库里未核实的反思应怎样处理？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A27-24 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：经验库里的同类经验和相互矛盾的经验分别怎么处理？ 当前答：新反馈只是再次确认已有规则时补充证据，发现新条件时扩展适用说明，不必无限追加；相互矛盾时去查当前权威定义，而不是让模型同时背两条冲突的口诀。

- A27-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:499>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:644>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:8158>) · [原文](https://xiaolinnote.com/ai/agent/27_self_evolution.html)。

### ART-W20 · A27-12 · 网页未再独立考查：经验加载后仍失败时分辨召回/范围/执行环节

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“经验应该在什么时机加载，加载后仍失败怎么排查？”；网页改为“经验应该在什么时机加载？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A27-25 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：经验加载后任务仍然失败，应怎样排查？ 当前答：用运行记录判断是检索没找到、范围筛选出了问题，还是模型读到了却没执行，分别去改检索、改经验条件或改使用方式。经验库越大不代表 Agent 越强。

- A27-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:502>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:647>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:8239>) · [原文](https://xiaolinnote.com/ai/agent/27_self_evolution.html)。

### ART-W21 · A28-14 · 网页未再独立考查：预览后变化的版本绑定/写时条件检查

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“内容指纹有什么用，预览之后内容又变了怎么防？”；网页改为“内容指纹有什么用？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A28-22 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：用户预览并批准之后内容又变了，怎样防止执行到用户没看过的版本？ 当前答：批准的是文件某个版本时，执行时应读取对应版本，或由资源系统在写入时检查版本条件；只在执行前检查一次、再去读取后来变化的内容，仍可能执行到用户没看过的版本。

- A28-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:535>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:682>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:8855>) · [原文](https://xiaolinnote.com/ai/agent/28_human_confirmation.html)。

### ART-W22 · A29-4 · 网页未再独立考查：服务计数接口/匹配分词器及实际用量校准

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“计算上下文占用时，应该统计哪些内容，用什么方法计数？”；网页改为“计算上下文占用时，计数的对象应是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A29-17 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：计算上下文占用时，用什么方法计数？ 当前答：服务提供计数接口就用它估算；否则用匹配模型的分词器，并结合实际返回的用量校准，还要留出余量。

- A29-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:553>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:702>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:9106>) · [原文](https://xiaolinnote.com/ai/agent/29_context_compression_threshold.html)。

### ART-W23 · A29-6 · 网页未再独立考查：输出+安全余量预留后计算输入预算

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“为什么上下文容量不能全部用来放输入，输入预算怎么算？”；网页改为“为什么上下文容量不能全部用来放输入？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A29-18 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：输入预算应怎样计算，输出预留是固定的吗？ 当前答：先给输出留预算，再决定输入最多放多少：例如总窗口 32,000，预留 4,000 输出和 2,000 用于处理计数误差与意外增长的安全余量，输入预算就是 26,000。数字只是示意，输出预留要跟任务走，提取一个字段和生成完整代码文件所需的空间不同。

- A29-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:555>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:704>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:9160>) · [原文](https://xiaolinnote.com/ai/agent/29_context_compression_threshold.html)。

### ART-W24 · A29-13 · 网页未再独立考查：工具请求与结果的调用编号配对、不可留孤立结果

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“压缩时哪些内容必须保留，消息结构有什么约束？”；网页改为“压缩时，哪些内容必须保留？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A29-19 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：压缩时，工具请求和工具结果的消息结构有什么约束？ 当前答：工具请求和返回通过调用编号关联，不能删掉请求却留下孤立的结果；已结束的旧工具链只有在接口允许时才能整体收敛成摘要。

- A29-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:562>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:711>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:9349>) · [原文](https://xiaolinnote.com/ai/agent/29_context_compression_threshold.html)。

### ART-W25 · A29-14 · 网页未再独立考查：压缩后同时核查预算大小与信息/消息结构完整性

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“压缩完成后要检查什么，为什么不能等窗口满了再压？”；网页改为“为什么不能等窗口满了再压缩？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 A29-20 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：压缩完成后要检查什么？ 当前答：要检查两件事：大小是否回到合适的预算，继续任务所需的信息与消息结构是否还完整。Token 降了很多只能证明内容变短，不能证明摘要可用。

- A29-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/agent.md:563>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/agent.md:712>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/agent.json:9381>) · [原文](https://xiaolinnote.com/ai/agent/29_context_compression_threshold.html)。

### ART-W26 · B4-11 · 网页未再独立考查：Late Chunking长上下文与token级中间状态开销

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Late Chunking 是什么思路，有什么代价？”；网页改为“Late Chunking 是什么思路？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B4-13 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Late Chunking 先编码后切分，代价是什么？ 当前答：模型必须支持足够长的上下文，还要保留 token 级的中间结果，开销更大。

- B4-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:59>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:78>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:641>) · [原文](https://xiaolinnote.com/ai/rag/4_chunking.html)。

### ART-W27 · B10-10 · 网页未再独立考查：各环节大致耗时；高频Query检索缓存和并行优化

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“在线阶段各环节的耗时大致怎样分布，常见的优化手段有哪些？”；网页改为“在线阶段各环节里，耗时最长的通常是哪一步？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B10-11 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：在线阶段除大模型生成之外，各环节的耗时大致在什么量级，常见的优化手段有哪些？ 当前答：Query 改写几十毫秒，向量检索几十毫秒，Rerank 几百毫秒，Prompt 组装可忽略；常见优化是缓存高频 Query 的检索结果，以及把向量检索和 BM25 检索并行执行，把两路延迟从串行叠加变成取最大值。

- B10-10：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:147>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:202>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:1770>) · [原文](https://xiaolinnote.com/ai/rag/10_online_workflow.html)。

### ART-W28 · B15-1 · 网页未再独立考查：Naive/Modular的正面定义与三者区分（只问Advanced）

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Naive、Advanced、Modular RAG 的主要差异是什么？”；网页改为“三种范式里，Advanced RAG 的特点是什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B15-14 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Naive RAG 和 Modular RAG 各是什么样的？ 当前答：Naive RAG 是提问、向量检索、拼 Prompt、生成的直连流程，不做优化；Modular RAG 把各环节拆成可替换的模块，按需组合。

- B15-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:200>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:283>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:2519>) · [原文](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html)。

### ART-W29 · B18-13 · 网页未再独立考查：Context Precision低对应检索噪音及Rerank/减少chunk治理

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Context Precision 低和 Faithfulness 低分别说明什么，怎样优化？”；网页改为“Faithfulness 低说明什么，应怎样优化？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B18-15 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Context Precision 低说明什么，应怎样优化？ 当前答：说明检索召回了太多噪音，稀释了 LLM 的注意力；应加强 Rerank，减少最终送给 LLM 的 chunk 数量。

- B18-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:252>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:355>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:3334>) · [原文](https://xiaolinnote.com/ai/rag/18_evaluation.html)。

### ART-W30 · B19-10 · 网页未再独立考查：低更新频率、低实时性要求时的轮询适用性

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“定时轮询适合什么场景，有什么缺点？”；网页改为“定时轮询有什么缺点？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B19-12 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：定时轮询适合什么场景？ 当前答：定时轮询实现简单、不依赖外部系统，适合文档更新频率低、对实时性要求不高的场景，如内部知识库、产品文档。

- B19-10：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:266>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:375>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:3585>) · [原文](https://xiaolinnote.com/ai/rag/19_dynamic_update.html)。

### ART-W31 · B22-13 · 网页未再独立考查：全文混用版本时排查输入范围和资料组织

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“同样的模型和资料下，全文做对而 RAG 做错，或全文混用了不同版本，分别该查什么？”；网页改为“同样的模型和资料下，全文能做对而 RAG 做错，应该先检查什么？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 B22-14 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：全文输入时模型混用了不同版本的资料，应该检查什么？ 当前答：要检查输入范围和资料组织。验证时先看问题有没有答全、规则有没有用对，再比较延迟和成本。

- B22-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/rag.md:311>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/rag.md:434>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/rag.json:4143>) · [原文](https://xiaolinnote.com/ai/rag/22_rag_long_context.html)。

### ART-W32 · C3-3 · 网页未再独立考查：多轮对话理解并复用既有工具结果的训练场景

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“工具调用的训练数据应覆盖哪些场景？”；网页改为“工具调用的训练数据，按原文应覆盖哪些场景？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C3-3 的题干、完整长答、网页类型/选项及源文引用；在原多选题中增添正确选项“多轮对话中引用已有工具结果”，完整覆盖遗漏训练场景。 当前题干：工具调用的训练数据应覆盖哪些场景？ 当前答：训练数据要覆盖单工具调用、多工具并行调用、工具调用失败后的处理、不需要调用而直接回答、多轮对话中引用已有工具结果等场景。

- C3-3：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:35>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:46>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:285>) · [原文](https://xiaolinnote.com/ai/tools/3_fc_training.html)。

### ART-W33 · C13-6 · 网页未再独立考查：客户端配置启动Server的命令

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“stdio 传输为什么延迟低，使用时要配置什么？”；网页改为“stdio 传输为什么延迟低？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C13-9 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：使用 stdio 传输时，客户端需要配置什么？ 当前答：只需在客户端配置文件里写明用什么命令启动 Server。

- C13-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:159>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:232>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:1884>) · [原文](https://xiaolinnote.com/ai/tools/13_mcp_transport.html)。

### ART-W34 · C15-4 · 网页未再独立考查：ICE候选尝试过程、STUN发现公网IP/端口（仅问TURN兜底）

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“ICE、STUN、TURN 分别怎样帮助穿越 NAT？”；网页改为“STUN 打洞失败时，流量由什么来中转？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C15-15 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：ICE 按什么优先级依次尝试建立连接，STUN 在其中起什么作用？ 当前答：ICE 按优先级依次尝试三种方式：同一局域网内直接用内网地址直连；借 STUN 服务器发现自己的公网 IP 和端口后打洞，建立 P2P 连接；打洞失败时由 TURN 服务器中转流量。

- C15-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:184>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:267>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:2344>) · [原文](https://xiaolinnote.com/ai/tools/15_webrtc_vs_ws.html)。

### ART-W35 · C18-4 · 网页未再独立考查：指数退避上限、遵守Retry-After及剩余Deadline

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“指数退避、抖动与 Retry-After 分别有什么作用？”；网页改为“重试时加入随机抖动，起什么作用？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C18-15 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：指数退避和 Retry-After 各起什么作用，每次重试前还要确认什么？ 当前答：指数退避让重试间隔逐步拉长并设上限；下游返回 Retry-After 时优先遵守它。每次重试前还要确认退避等待和下一次调用不会超过剩余的时间预算。

- C18-4：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:237>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:338>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:3188>) · [原文](https://xiaolinnote.com/ai/tools/18_tool_reliability.html)。

### ART-W36 · C21-16 · 网页未再独立考查：复用环境不得继承前任务数据/进程/凭据，未清理成功不可复用

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“复用运行环境要注意什么，沙箱能证明结果正确吗？”；网页改为“沙箱能证明计算结果正确吗？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C21-17 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：复用基础运行环境时要注意什么？ 当前答：复用可以减少启动开销，但不能继承上一任务的数据、后台进程或凭据；没有确认清理成功的环境，不应交给下一位用户。

- C21-16：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:310>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:419>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:4304>) · [原文](https://xiaolinnote.com/ai/tools/21_execution_sandbox.html)。

### ART-W37 · C22-11 · 网页未再独立考查：资源不一定进入模型上下文，模板/脚本可直接给处理程序

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：MD问题为“Skill 里引用的相对路径从哪里解析，资源一定要读给模型吗？”；网页改为“Skill 里引用的相对路径从哪里解析？”。配套参考解释仍保留上述子考点。已对照本章全部网页题干、正确项、填空与short题，未发现另一个题目完整要求该子考点；部分相关基础概念可能在别题出现。此类是独立考查覆盖缩减，不是将更聚焦的题干或正确项直接判错。

原建议：保留现有聚焦题，补一题或改成覆盖该子考点的多选/填空/short；不必把全部复合要求塞回单选题。

**当前验收：已修正或完成验收校正。** 已人工核对当前 C22-16 的题干、完整长答、网页类型/选项及源文引用；新增题完整要求旧项所列子考点，参考解释不再是唯一出现位置。 当前题干：Skill 里的资源一定要读给模型吗？ 当前答：不一定。资源取用不总是把文本送给模型：模板可能直接复制给处理程序，脚本可能由执行工具读取运行，只有需要模型理解的内容才进入上下文。

- C22-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/tools.md:328>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/tools.md:439>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/tools.json:4463>) · [原文](https://xiaolinnote.com/ai/tools/22_skill_loading.html)。

### DEP-A1 · D11-1 · PPO填空题把完整流程说成“三个模型”

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：原文§PPO明确同时维护4个模型：Policy、Reference、Reward、Value。当前题干和网页stem却称“PPO用于偏好对齐时的三个模型”，虽答案末句补Value，题干仍直接造成总数误导。空数3与有序映射本身正确。

原建议：保留三空但改为“PPO四个模型中的以下三个”；或新增价值模型第四空，调整blankCount为4。

**当前验收：已修正或完成验收校正。** 题干与typed已明确“四个模型，其中三个”，答案补充第四个Value；三空有序映射一致。

- D11-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:173>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:232>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:2411>) · [原文](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html)。

### DEP-A2 · D11-2 · 网页正确项丢失参考模型限定

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：本地答案有“相对于参考模型”和概率比值，原文公式优化chosen与rejected的相对参考概率比差。网页A只写“提高chosen概率、降低rejected概率”，把相对优化改成对绝对概率的简单单向承诺。

原建议：正确项写“增大chosen相对rejected、并扣除参考模型基线的对数概率比差”；至少恢复“相对于参考模型”的限定。也建议答案避免保证两者绝对概率必然各自升/降。

**当前验收：已修正或完成验收校正。** 正确项A与反向干扰项D已恢复“相对于参考模型”，与引用小节直觉解释一致；原文公式仍是相对概率比差，直觉用语不宜解释成绝对概率保证。

- D11-2：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:174>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:233>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:2418>) · [原文](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html)。

### DEP-A3 · D1-13 · “哪些例子”漏答In-Context Learning

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§涌现按第一/第二/第三明确列多步算术、ICL、跨语言迁移。答案只有第一与第三。D1-12另题讲ICL，所以这是本题漏答，不是全章完全漏ICL。

原建议：补列第二例ICL；如有意只举部分例子，把题干改为“举两个例子”。

**当前验收：已修正或完成验收校正。** 当前答案已列多步算术、ICL、跨语言迁移三例，对照原文第一/第二/第三列表补齐。

- D1-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:22>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:24>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:239>) · [原文](https://xiaolinnote.com/ai/llm/what_is_llm.html)。

### DEP-A4 · D19-12 · 256个专家缺少“路由专家”限定

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：原文§主流MoE对比明确每层“256个routed experts + 1个shared expert”。答案写“用256个专家、每次激活9个”，又说明其中1个共享，易将总专家数理解成256而不是257。

原建议：改为“256个路由专家，另有1个共享专家；每token选8个路由专家并使用共享专家”。

**当前验收：已修正或完成验收校正。** 已明确每层256路由专家+1共享专家，每token8路由+1共享，总数与引用小节一致。

- D19-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:292>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:401>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4434>) · [原文](https://xiaolinnote.com/ai/llm/moe.html)。

### DEP-A5 · D22-2 · 题问四方面，答案只回答合规与成本

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：题干询问合规、地区可用性、成本和服务稳定性，答案只讲前后两项。所引§选型落地也只支撑合规和成本；§主流模型盘点提网络稳定性，§为何不看榜单提网络访问。D22-1只把网络列为限制，没有回答该问的影响。

原建议：补充网络/地区访问和稳定性怎样限制候选及上线链路，并引用对应小节；原文没有明确地区范围信息时收敛题干为“网络访问与稳定性”。网页现已缩为合规单选，恢复后两方面还需要独立考查。

**当前验收：已修正或完成验收校正。** 题干收敛为合规、网络访问和成本；答案增加API成本/网络访问/合同支持可卡住项目，并补对应引用，原四问只答二项的缺陷消除。网页仍只考合规子点；属既有改写粒度选择。

- D22-2：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:331>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:456>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4963>) · [原文](https://xiaolinnote.com/ai/llm/model_selection.html)。

### DEP-C1 · D3-15 · Linear Attention分支缺失

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§拓展并列MLA、Sliding Window、Linear Attention、Mamba。MLA由D3-11覆盖；D3-15只列Sliding Window和Mamba，全章无Linear、Performer、Linformer和线性复杂度这一路线。

原建议：补入线性注意力及复杂度/近似/质量取舍；原文将Linformer也描述成核近似应另核验，不宜原样机械复制。

**当前验收：已修正或完成验收校正。** 新增简答讲Linear Attention复杂度与非主流取舍，并对Linformer低秩路线作勘误。已再读原文拓展列表；Linformer论文和Performer论文支持二者机制区别。

- D3-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:62>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:75>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:828>) · [原文](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html)。

### DEP-C2 · D5-5 · 中文如何形成token这一小节只剩成本估算

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§中文分词特点讲常用汉字可成为独立token、高频词可合并，具体切法依赖训练频率与tokenizer；D5-5/D5-9只保留1000汉字约1000–1500 token的估算和实数建议。D5-2讲通用BPE步骤，没有说明中文实例的形成规律。

原建议：补题说明同一中文词为什么可能是一token或多token，不能把汉字/词和token固定一一对应。

**当前验收：已修正或完成验收校正。** 新增简答覆盖中文词不固定一token、常用汉字独立token和高频词合并，与原文中文小节一致。

- D5-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:84>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:107>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1192>) · [原文](https://xiaolinnote.com/ai/llm/tokenizer.html)。

### DEP-C3 · D16-14 · Prompt压缩第二类Embedding/Soft Prompt遗漏

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§Prompt压缩列两类：LLMLingua以及Embedding表示。第二类把Prompt编码为固定长度向量、要求Soft Prompt输入、仍是研究阶段。D16-6/D16-14及全章只讲LLMLingua和删冗余。

原建议：增加两类方案比较或补简答，带上需要模型支持、研究阶段的限定。

**当前验收：已修正或完成验收校正。** 新增简答覆盖Embedding压缩、Soft Prompt模型支持与研究阶段，原文第二类方案补齐。

- D16-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:253>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:344>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:3787>) · [原文](https://xiaolinnote.com/ai/llm/prompt_engineering.html)。

### DEP-C4 · D18-5 · 训练层第3项“核查幻觉回答并用作负样本”遗漏

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§训练层明确第3项：奖励模型或人工核查生成回答，把幻觉回答标低分作为对齐负样本。D18-5只列拒答样例和校准；D18-9解释拒答；D18-12讲的是系统推理后核查而不是训练负样本。

原建议：增加训练层第3项；区分训练数据反馈与上线后的答案后处理。原文把该步骤归入Constitutional AI是否准确应另外核实。

**当前验收：已修正或完成验收校正。** 新增简答覆盖模型/人工核查幻觉回答、低分负样本及训练成本/质量上限，与原文训练层第三项一致；Constitutional AI关联以“原文称”标明来源。

- D18-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:269>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:370>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4091>) · [原文](https://xiaolinnote.com/ai/llm/hallucination.html)。

### DEP-C5 · D22-7 · 主流模型盘点漏Qwen和GPT的能力与场景

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§主流模型盘点有五组：DeepSeek、Qwen、豆包、GPT、Claude。D22-7只问/答其中三组；D22-6虽列Qwen/GPT名字和阵营，但未解释Qwen的工具/结构化/长上下文、主调度/RAG汇总，以及GPT复杂推理/代码/多模态标杆。

原建议：在现有题中增加Qwen/GPT，或拆两道比较题；按原文定性描述，不硬编码易过时的版本名。

**当前验收：已修正或完成验收校正。** 新增简答覆盖Qwen的企业中文/工具/结构化/长上下文与主调度/RAG场景，以及GPT复杂推理/代码/多模态标杆，与盘点小节一致。

- D22-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:337>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:464>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:5050>) · [原文](https://xiaolinnote.com/ai/llm/model_selection.html)。

### DEP-W1 · D1-14 · 网页缩窄：Chinchilla 1:20及算力最优前提；D7有跨章覆盖

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：Scaling Law含义；原问题/参考答案仍包括：Chinchilla 1:20及算力最优前提；D7有跨章覆盖。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增有序填空实际考查1:20和1.4T两空。固定训练算力前提仍由D7-2等跨章题主动考查；D1原引用本身没有展开该前提，原D1比率考查退化已解决。

- D1-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:23>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:25>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:241>) · [原文](https://xiaolinnote.com/ai/llm/what_is_llm.html)。

### DEP-W2 · D6-11 · 网页缩窄：收集偏好→奖励模型→PPO的三步流程

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：RLHF工程难点；原问题/参考答案仍包括：收集偏好→奖励模型→PPO的三步流程。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增有序三空考查偏好数据、奖励模型、PPO，原三步流程成为主动考题。

- D6-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:103>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:134>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1375>) · [原文](https://xiaolinnote.com/ai/llm/llm_training.html)。

### DEP-W3 · D6-12 · 网页缩窄：Llama2-Chat不是DPO的反例与公开训练流程

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：DPO怎样简化；原问题/参考答案仍包括：Llama2-Chat不是DPO的反例与公开训练流程。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增单选明确Llama2-Chat不是DPO而是SFT/拒绝采样/PPO，唯一正确项C与原文一致。

- D6-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:104>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:135>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1402>) · [原文](https://xiaolinnote.com/ai/llm/llm_training.html)。

### DEP-W4 · D7-6 · 网页缩窄：合成数据、多模态、强化学习数据的应对方向

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：数据/算力两个天花板；原问题/参考答案仍包括：合成数据、多模态、强化学习数据的应对方向。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增无序三空主动考查合成、多模态、强化学习数据，与原文三个方向一致。

- D7-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:114>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:149>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1610>) · [原文](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html)。

### DEP-W5 · D8-12 · 网页缩窄：SFT后LoRA+DPO，以及大厂全量SFT/RLHF的场景选择

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：个人/小团队QLoRA+SFT；原问题/参考答案仍包括：SFT后LoRA+DPO，以及大厂全量SFT/RLHF的场景选择。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答主动考查风格偏好下LoRA+DPO和大厂全量SFT/RLHF，原报告所列两项退化已补齐。另查到资源中等团队LoRA+SFT仍漏答，已作为新发现DEP-N1单列。

- D8-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:138>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:181>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1887>) · [原文](https://xiaolinnote.com/ai/llm/finetuning.html)。

### DEP-W6 · E1-5 · 网页缩窄：OpenAI Agents SDK、AutoGen、Semantic Kernel的定位；CrewAI流程状态等还有原文细节未答

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：CrewAI定位；原问题/参考答案仍包括：OpenAI Agents SDK、AutoGen、Semantic Kernel的定位；CrewAI流程状态等还有原文细节未答。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答主动考查OpenAI Agents SDK、AutoGen、Semantic Kernel的定位，原缺少主动考查的三框架补齐。

- E1-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:11>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:13>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:38>) · [原文](https://xiaolinnote.com/ai/langchain/agent_frameworks.html)。

### DEP-W7 · E6-5 · 网页缩窄：来源/时间/置信度、纠错、更新、删除、过期、敏感信息默认不记与必要时加密

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：长期记忆何时写入；原问题/参考答案仍包括：来源/时间/置信度、纠错、更新、删除、过期、敏感信息默认不记与必要时加密。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答覆盖来源/时间/置信度、更新纠错删除过期、敏感默认不记/加密限制访问与权威实时事实。

- E6-5：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:89>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:118>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:1049>) · [原文](https://xiaolinnote.com/ai/langchain/memory.html)。

### DEP-W8 · E8-14 · 网页缩窄：ChatMemoryStore持久化，@MemoryId/Provider隔离，同MemoryId不能并发调用

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：两种ChatMemory窗口实现名称；原问题/参考答案仍包括：ChatMemoryStore持久化，@MemoryId/Provider隔离，同MemoryId不能并发调用。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答覆盖ChatMemoryStore、MemoryId/Provider隔离和同MemoryId并发限制。

- E8-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:125>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:168>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:1579>) · [原文](https://xiaolinnote.com/ai/langchain/langchain4j.html)。

### DEP-W9 · E12-11 · 网页缩窄：评测耗时与成本；E12其他题讲预算控制，不能替代评测结果

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：答案、轨迹、来源覆盖、引用正确性；原问题/参考答案仍包括：评测耗时与成本；E12其他题讲预算控制，不能替代评测结果。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 多选新增F“耗时和成本”且正确，与原文六方面匹配。

- E12-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:200>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:267>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:2532>) · [原文](https://xiaolinnote.com/ai/langchain/deep_research.html)。

### DEP-W10 · D21-9 · 网页缩窄：MT-Bench与Chatbot Arena分别怎么测

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：τ-bench偏重；原问题/参考答案仍包括：MT-Bench与Chatbot Arena分别怎么测。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答主动考查MT-Bench与Chatbot Arena评测方式；原本只考tau-bench的退化消除。

- D21-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:324>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:445>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4874>) · [原文](https://xiaolinnote.com/ai/llm/evaluation_metrics.html)。

### DEP-W11 · D21-10 · 网页缩窄：HELM多维评测及Humanity's Last Exam定位

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：网页只主动考查：LiveBench持续更新；原问题/参考答案仍包括：HELM多维评测及Humanity's Last Exam定位。同章未见该子点的其他主动考查；不是内容从解析消失。

原建议：拆题、多选或保留简答；避免将解析中保留等同于考查覆盖。

**当前验收：已修正或完成验收校正。** 新增简答主动考查HELM与Humanity Last Exam特征；原本只考LiveBench的退化消除。

- D21-10：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:325>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:446>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:4901>) · [原文](https://xiaolinnote.com/ai/llm/evaluation_metrics.html)。

### DEP-U1 · E7-8 · 单选唯一性不足

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：题问“不必同时引入两套框架”。A简单知识库/单工具当然成立，但B“多个模型、大量内部API”恰是原文优先LangChain的情形，并未包含独立复杂数据难题；D“PDF表格和多数据源路由”是优先LlamaIndex的数据侧情形，也没有同时需要复杂Agent编排的条件。这两个错误项没有理由必然同时引入两套。建议把B/D改成“同时存在复杂检索和复杂Agent流程”，或题干限定“原文明示的简单场景是哪项”。 主审已阅读全文与四个选项，确认此问题成立。

原建议：把B/D写成同时存在数据与Agent编排难题，或题干限定原文明示的简单场景。

**当前验收：已修正或完成验收校正。** 网页题干已限定简单知识库/单工具场景，替换原B/D歧义选项；现A正确，B/C主张必须双框架，D错误说两框架解决相同难题，唯一性恢复。

- E7-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:108>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:145>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:1263>) · [原文](https://xiaolinnote.com/ai/langchain/langchain_vs_llamaindex.html)。

### DEP-U2 · P5-15 · 参考答案“ 不算 ”过于绝对

分类：范围或措辞歧义。优先级：medium。证据版本：初次3122题版本。

发现证据：原文论点是单次调用/自动步骤不足以判断，关键看谁据反馈决定下一步；不是说所有只调用一次工具的实际任务都不可能由Agent完成。后文解释与网页具体固定流程选项均正确。建议首句改“不能仅据此判断”。

原建议：主审复核语义，按证据增加限定或替换干扰项。

**当前验收：已修正或完成验收校正。** 答案首句改为“不能仅凭这一点判断”，不再否认所有只有一次工具调用的实际Agent任务；网页具体固定流程题保持正确。

- P5-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/ai-coding.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/ai-coding.md:108>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/ai-coding.json:1125>) · [原文](https://xiaolinnote.com/ai/coding/ai_programming_modes.html)。

### DEP-U3 · P6-16 · 错误项B/D缺少“尚未确定且无已有约定”的条件

分类：范围或措辞歧义。优先级：medium。证据版本：初次3122题版本。

发现证据：原文说是否允许重复操作/失败后是否保留结果“可能”是尚未确定规则，已有约定能回答就按约定。网页将这两项一律排除为可核对事实，容易把规则内容类型和规则是否已定混在一起。建议B/D明确“尚未确定、项目中也没有约定”的业务决策；目前属于表达歧义，不按确证标错。

原建议：主审复核语义，按证据增加限定或替换干扰项。

**当前验收：已修正或完成验收校正。** B/D新增“项目尚无约定时”限定，按原文区分可核对项目事实与尚待决定规则，歧义解决。

- P6-16：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/ai-coding.md:122>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/ai-coding.md:132>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/ai-coding.json:1479>) · [原文](https://xiaolinnote.com/ai/coding/task_specification.html)。

### DEP-S1 · D6-8 · 算力工期算术矛盾

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：原文和答案同段说单张A100需36万年，又说几百至几千张GPU并行几个月完成。同样工作量即使理想线性加速，1000张也需360年，3000张需120年，两组数量不能同时成立。无需依赖当前硬件规格即可发现内部矛盾。建议重算并写明精度、有效吞吐和利用率；题答复制原文，所以不是单独的摘写错误。

原建议：原文来源错误/内部矛盾独立处理，纠正后再更新题答。

**当前验收：已修正或完成验收校正。** 题库已明示原文36万年量级错误，并用理论312TFLOPS折算约32年。NVIDIA一手文档支持dense FP16 312TFLOPS，3.14e23/(312e12*365.25*86400)=31.9年。原文仍错但题库不再不加限定地复述。新引用撤稿Roadmap的问题单列DEP-N3。

- D6-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:100>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:131>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1345>) · [原文](https://xiaolinnote.com/ai/llm/llm_training.html)。

### DEP-S2 · D8-11 · Alpaca/Vicuna被误说成QLoRA产物

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：答案忠实复制原文“Alpaca、Vicuna基本都用QLoRA”。历史一手材料显示Stanford Alpaca是2023-03-13发布、8×A100的FSDP混合精度；Vicuna在2023-03-30发布、PyTorch FSDP；QLoRA论文提交于2023-05-23，且论文QLoRA模型家族是Guanaco。应去掉历史例子或改成Guanaco。证据：[Stanford Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)、[LMSYS Vicuna](https://www.lmsys.org/blog/2023-03-30-vicuna/)、[QLoRA论文](https://arxiv.org/abs/2305.14314)。

原建议：原文来源错误/内部矛盾独立处理，纠正后再更新题答。

**当前验收：已修正或完成验收校正。** 已拒绝采用Alpaca/Vicuna由QLoRA训练的原文历史错，并注明3月模型早于5月论文；既有一手公告与QLoRA论文日期支持。

- D8-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:137>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:180>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:1885>) · [原文](https://xiaolinnote.com/ai/llm/finetuning.html)。
- 一手核对资料1：[来源](https://crfm.stanford.edu/2023/03/13/alpaca.html)。
- 一手核对资料2：[来源](https://www.lmsys.org/blog/2023-03-30-vicuna/)。
- 一手核对资料3：[来源](https://arxiv.org/abs/2305.14314)。

### DEP-S3 · D3-14 · MLA/GQA示例及三方案关系写乱

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：同章§GQA介绍MLA并明确DeepSeekV2/V3采用不同于GQA的压缩机制；§三类优化关系却把DeepSeekV3列为“GQA结构+Flash Attention”。另外MQA与GQA是K/V共享粒度的不同配置（MQA即G=1特例），通常应说“MQA或GQA可与FlashAttention叠加”，不能暗示三种都独立同时叠加。建议修正原文框架和模型示例后更新D3-14答案。

原建议：原文来源错误/内部矛盾独立处理，纠正后再更新题答。

**当前验收：已修正或完成验收校正。** 新增“MQA是GQA的G=1特例，二者择一决定共享粒度再叠加Flash”，并指出原文DeepSeekV3的GQA/MLA内部矛盾，题库已作勘误。

- D3-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/llm.md:61>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/llm.md:74>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/llm.json:827>) · [原文](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html)。

### DEP-A6 · E8-8 · AI Service Observability被扩大成全部可观测性

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：答案将所有可观测性也限定为仅适用于AI Services，而原文只限定AI Service Observability，前段还讲ChatModelListener等监听入口。

原建议：明确功能名AI Service Observability，区分通用模型监听/追踪和AI Service级事件。

**当前验收：已修正或完成验收校正。** 答案改用完整功能名AI Service Observability，并保留ChatModelListener入口说明；不再将全部可观测性限定为仅AI Services。

- E8-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:118>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:159>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:1433>) · [原文](https://xiaolinnote.com/ai/langchain/langchain4j.html)。

### DEP-C6 · E8-11 · 原生JSON Schema显式启用与Prompt格式指令回退未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§AI Services说明，原生JSON Schema需ChatModel支持并显式启用；不支持时可能退回Prompt格式指令，可靠性更弱。E8-6只是列“是否支持原生JSON Schema”能力矩阵，E8-11仅说明结构化形状不等于业务正确，全章未解释两种约束模式和显式开关。

原建议：增加原生Schema与Prompt约束的区别、启用条件和可靠性取舍。

**当前验收：已修正或完成验收校正。** 新增简答明确ChatModel支持且显式启用原生JSON Schema，不支持时可能回退Prompt格式指令并降低可靠性。

- E8-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:122>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:165>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:1498>) · [原文](https://xiaolinnote.com/ai/langchain/langchain4j.html)。

### DEP-C7 · E10-17 · 子图记忆作用域及无状态恢复限制未覆盖

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文§复杂任务并行汇合专段要求显式选择子图记忆范围：一次子任务每次新状态；连续子Agent同线程积累；完全无状态虽然简单，却不能依赖中断和可靠恢复。E10-17只讲模块化与引入条件，其他题的Checkpointer/Store解释不涉及子图作用域选择。

原建议：增加子图一次性/连续记忆/无状态选型及中断恢复条件。

**当前验收：已修正或完成验收校正。** 新增简答明确一次子任务新状态、同线程连续记忆、无状态中断/恢复限制，原文子图作用域段落补齐。

- E10-17：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/langchain.md:169>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/langchain.md:224>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/langchain.json:2104>) · [原文](https://xiaolinnote.com/ai/langchain/langgraph_advantages.html)。

### Q-C01 · H1-21 · 高风险操作被错误列为三类，漏第四类上传第三方

分类：题答或选项问题。优先级：high。证据版本：初次3122题版本。

发现证据：题干明确称三类并给3空，答案列破坏性、难以逆转、对他人可见。原文“操作安全”列表还有第四项“上传到第三方工具”，理由是内容可能被缓存或索引，即使删除也难撤回。全47题没有别题覆盖第四类。

原建议：改为四类4空，补上传第三方及撤回限制；或明确只考前三项，另补第四项。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- H1-21：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:36>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:34>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:383>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。

### Q-C02 · J2-21 · 内部评测效果漏答成本下降

分类：题答或选项问题。优先级：medium。证据版本：初次3122题版本。

发现证据：原问精简后的效果，答案仅列评测分数提升10%–15%、Token减少41%–66%；原文同一段另列成本下降33%–67%，全25题没有其他题覆盖成本指标。

原建议：补全成本下降33%–67%，并仍保留这是原文引用内部评测的范围。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- J2-21：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-insights.md:57>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-insights.md:57>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-insights.json:538>) · [原文](https://xiaolinnote.com/claudecode/insights/claude5_context_engineering.html)。

### Q-C03 · F2-34 · 子代理向导四项的范围没有说明是前四项

分类：范围或措辞歧义。优先级：low。证据版本：初次3122题版本。

发现证据：题干称向导依次配置四项，4空答作用域、职责、工具、模型。原文还列第五项标识颜色。颜色属于界面标识而非核心职责/权限，四答案本身均正确，不宜当严重答错。

原建议：题干明确“前四项核心配置”，或5空纳入颜色。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- F2-34：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:118>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:114>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:1116>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。

### Q-C05 · I2-15 · 删除数据的通用接口建议被缩窄为删除记忆接口

分类：范围或措辞歧义。优先级：low。证据版本：初次3122题版本。

发现证据：原文举例是“不希望它随便删数据，就让删除接口必须带目标ID、当前版本和用户授权状态”；题干改成原文建议删除记忆的接口，容易使读者以为这里介绍了专门的memory删除工具。原文实际列的是write/append/str_replace。

原建议：改为“删除数据的接口”，或明确这是可类比用于记忆删除的设计建议。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- I2-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-prompts.md:84>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-prompts.md:85>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-prompts.json:899>) · [原文](https://xiaolinnote.com/claudecode/prompt/opus5_prompt_leak.html)。

### Q-C06 · G2-1、G2-26 · G2未考选择agentic search的三条直接理由

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：Q1明确列索引会过期、冷启动几乎为零、精确匹配的需要。G2-1/2/4只讲起点/窗口，G2-26只问RAG定义，全34题没有问三理由。

原建议：补一题说明相对于预建代码RAG的三项取舍。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G2-1：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:54>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:55>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:432>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。
- G2-26：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:81>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:86>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:729>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。

### Q-C07 · G2-8、G2-11、G2-30 · G2缺LSP的两部分安装及局部测试/lint命令

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：Q3要求安装对应code intelligence plugin，同时装语言服务器二进制；还要求子目录CLAUDE.md写该模块测试/lint命令，避免跑全仓库测试。现有题只问LSP原理、定义及子目录启动，全章无操作配置题。

原建议：至少补插件+语言服务器两项安装，以及模块范围验证命令。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G2-8：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:61>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:62>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:491>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。
- G2-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:64>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:65>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:545>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。
- G2-30：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:85>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:90>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:836>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。

### Q-C08 · G2-23 · G2适用边界遗漏非工程师为主贡献的代码库

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：Q7列二进制资源、非常规VCS、非工程师为主贡献三种场景。G2-23仅答前两种，其题干也只针对构建/版本控制，全章别题未覆盖第三种边界。

原建议：新增或扩展适用边界题，包含非工程师主贡献及定制harness。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G2-23：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:77>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:80>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:719>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_large_codebase.html)。

### Q-C09 · F2-27、F2-51 · F2未覆盖Skill安装后的热加载和卸载

分类：章级知识点遗漏。优先级：low。证据版本：初次3122题版本。

发现证据：原文frontend-design实战展示/reload-plugins令当前会话立即生效，以及/plugin uninstall frontend-design@claude-plugins-official。全64题只覆盖用途、结构和目录，没有考热加载/卸载。

原建议：补一题当前会话生效与卸载；不要求死记包名。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- F2-27：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:111>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:107>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:969>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。
- F2-51：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:141>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:137>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:1404>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。

### Q-C10 · G8-6、G8-7 · G8遗漏长任务执行中追加要求的交互方式

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文第一节明确执行中输入补充要求并按回车，不必等交卷或重新开一轮。全24题没有考任务执行中的用户补充。

原建议：补一题如何及时补兼容性等遗漏要求。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G8-6：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:235>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:272>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:2585>) · [原文](https://xiaolinnote.com/claudecode/playbook/opus55_handbook.html)。
- G8-7：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:236>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:273>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:2587>) · [原文](https://xiaolinnote.com/claudecode/playbook/opus55_handbook.html)。

### Q-C11 · G8-12、G8-22 · G8遗漏子Agent结论必须带证据且主Agent复核

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：第二节例子让订单/库存/支付各查重试，结果带重试上限、调用路径、触发条件，缺证据明确说，主Agent核对后汇总。G8-12是代码审查报告证据，G8-22仅泛谈按需分工，均未考委派结果核查；全章无其他题。

原建议：补子Agent任务证据要求和主Agent二次核查职责。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G8-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:241>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:278>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:2676>) · [原文](https://xiaolinnote.com/claudecode/playbook/opus55_handbook.html)。
- G8-22：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:251>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:288>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:2846>) · [原文](https://xiaolinnote.com/claudecode/playbook/opus55_handbook.html)。

### Q-C12 · G10-25、G10-26 · G10遗漏新依赖许可证及安全漏洞检查

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：开工准备节末明确引入新依赖还要检查许可证要求和安全漏洞。全38题覆盖依赖关系/兼容、权限/脱敏，却没有新依赖许可证和漏洞核查。

原建议：补一题新依赖准入检查，或扩充相邻问题并保证网页实际考到。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G10-25：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:320>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:373>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:3659>) · [原文](https://xiaolinnote.com/claudecode/playbook/claude_code_modernization.html)。
- G10-26：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:321>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:374>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:3661>) · [原文](https://xiaolinnote.com/claudecode/playbook/claude_code_modernization.html)。

### Q-C13 · I2-21、I2-23 · I2没有考危险历史偏好的写入和读取双重过滤

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：原文说明写入时不能保存削弱诚实、安全、权限边界的偏好，读取时再次过滤其他产品/旧版本存入的内容。现题解释记忆是数据和污染的危害，全35题未考双重过滤的实现边界。

原建议：新增写入/读取各拦什么及为何两次检查的题。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- I2-21：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-prompts.md:91>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-prompts.md:94>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-prompts.json:999>) · [原文](https://xiaolinnote.com/claudecode/prompt/opus5_prompt_leak.html)。
- I2-23：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-prompts.md:93>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-prompts.md:96>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-prompts.json:1052>) · [原文](https://xiaolinnote.com/claudecode/prompt/opus5_prompt_leak.html)。

### Q-C14 · N3-45、N3-46、N3-52 · N3遗漏长期记忆写入两阶段的职责及产物

分类：章级知识点遗漏。优先级：medium。证据版本：初次3122题版本。

发现证据：来源第五章详细讲单任务提炼结构化原始记忆/任务摘要，再跨任务去重、核对旧约定、整理导航摘要/详细记忆/任务摘要/步骤。全53题只问启动条件、整理Agent关闭递归、读取两步，没有题考写入两阶段职责/产物。N4别章虽完整讲，不能当N3全章已覆盖。

原建议：补单任务提炼与跨任务整理比较，并包含租约/无变化跳过的保护。

**当前验收：已修正或完成验收校正。** N3-56已覆盖本章明确的两阶段职责、产物、筛选/任务租约、全局租约/变化比较/no-op和整理Agent。旧审计证据把N4明确列出的合并重复、核对矛盾、删除失效三动作带入了N3；N3正文只有重复/冲突动机及跨任务整理流程，撤回这部分跨章推断，不要求补原文未明述的三动作。

- N3-45：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:143>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:141>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1654>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。
- N3-46：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:144>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:142>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1686>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。
- N3-52：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:153>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:151>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1802>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。

### Q-C15 · N3-44 · N3未考事件历史JSONL与元数据SQLite的分工

分类：章级知识点遗漏。优先级：low。证据版本：初次3122题版本。

发现证据：会话恢复原文明确本地JSONL保存事件历史、状态数据库可用时SQLite保存可查询元数据。全53题只问恢复内容与边界，不考两类持久化职责。

原建议：补一题事件历史和查询元数据分工，保留状态数据库可用条件。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N3-44：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:142>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:140>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1622>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。

### Q-C16 · G3-17、G3-18 · G3网页不再考description的250字符和清单1%预算

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原答案分别含MAX_LISTING_DESC_CHARS=250与SKILL_BUDGET_CONTEXT_PERCENT=0.01。typed仅考有长度上限和挤爆预算后压缩/只留名，两个数值均未进入需作答内容，全章其他网页题也不考。

原建议：保留具体预算约束，用两个填空或在题干中明确数值后考后果。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G3-17：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:114>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:125>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:1055>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_skills.html)。
- G3-18：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:115>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:126>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:1082>) · [原文](https://xiaolinnote.com/claudecode/playbook/cc_skills.html)。

### Q-C17 · G4-15 · G4 analyze改写丢失运行时机

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原答案含拆完tasks、正式implement之前；typed仅问交叉比对功能。全23题其他内容没有analyze时机（clarify时机不能替代）。

原建议：补analyze位于tasks与implement之间的题，或恢复含阶段的选项。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G4-15：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:155>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:173>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:1629>) · [原文](https://xiaolinnote.com/claudecode/playbook/spec_driven_dev.html)。

### Q-C18 · G9-14 · G9 Test改写丢失失败后修复再验证的反馈循环

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问验证完成条件，答案含运行测试/构建→读失败→修代码→再次验证直到达标；typed只问通过后新会话复核。全29題没有别题直接要求这条循环（Evals配置回归是另一件事）。

原建议：将反馈循环保留成另一题，与独立复核分别考查。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G9-14：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:274>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:319>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:3026>) · [原文](https://xiaolinnote.com/claudecode/playbook/anthropic_ai_native_sdlc.html)。

### Q-C19 · G10-32 · G10模块升级顺序改写丢循环依赖例外

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原答除了C→B→A还含循环依赖时先梳理一起处理的部分；typed只选链式依赖先C。全38题其他题未考循环依赖，容易将例子误记为普遍顺序。

原建议：补循环依赖不能直接套末端顺序、可能一起处理的题。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- G10-32：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-playbook.md:327>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-playbook.md:380>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-playbook.json:3750>) · [原文](https://xiaolinnote.com/claudecode/playbook/claude_code_modernization.html)。

### Q-C20 · H1-20 · H1 Git安全协议改写只剩amend，丢另外的安全规则

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问整个Git安全协议，答案含不改gitconfig、破坏命令需明确请求、不跳过hooks。typed只问为何新commit而非amend。高风险操作题H1-17/21覆盖一般授权，却不考gitconfig和--no-verify规则；全章没有别题。

原建议：保留amend题，同时补gitconfig、跳过hooks和用户明确请求的限制。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- H1-20：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:35>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:33>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:356>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。

### Q-C21 · H1-30、H1-47 · H1网页丢MEMORY索引200行/25KB两个上限

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原H1-30答案给200行和25KB，typed只问索引常驻/详情按需；H1-47只问为什么双维检查。全47题不再考具体索引预算。

原建议：补一题两个上限，保留双维检查理由。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- H1-30：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:48>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:46>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:520>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H1-47：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:68>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:66>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:849>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。

### Q-C22 · H1-38、H3-18 · H1/H3网页丢ContextCollapse的90%/95%两级触发

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：H1-38原答案给90%和95%，typed只问读时投影；H3-18原答案给前者90%/95%及Auto93%以解释互斥，typed只问二选一。两章其余网页题均不主动考两级阈值。

原建议：至少在该机制所在章补两级阈值及升级含义，并同时解决两章来源互斥/串联矛盾。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- H1-38：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:56>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:54>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:684>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H3-18：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:137>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:148>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:1639>) · [原文](https://xiaolinnote.com/claudecode/source/cc_compact.html)。

### Q-C23 · H4-13 · H4 Grep三模式定义改写为只问默认模式

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问content/files_with_matches/count分别返回什么，typed只选默认files_with_matches。content/count的解释虽在干扰项与参考答案出现，却不再要求区分其用途；全32题没有其他模式映射题。

原建议：恢复三个模式映射或补有序填空。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- H4-13：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:191>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:211>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:2451>) · [原文](https://xiaolinnote.com/claudecode/source/cc_grep.html)。

### Q-C24 · N1-30 · N1五种Hook事件触发时机改写只剩Stop

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问SessionStart、UserPromptSubmit、PreToolUse、PostToolUse和Stop各何时触发，typed只问Stop。全34题其他题也只明确Stop，其他四事件与触发时机对应没有实际考查。

原建议：恢复五事件映射，或拆成启动/输入、工具前后、Stop三题。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N1-30：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:45>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:43>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:427>) · [原文](https://xiaolinnote.com/codex/basics/codex_engineering.html)。

### Q-C25 · N1-31 · N1 Handler改写丢stdin事件输入信息

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问Handler怎样拿信息以及返回结果，typed只问通过退出码或JSON返回。全34题其他网页题不考stdin以及cwd/事件/工具名参数的输入内容。

原建议：补stdin输入与退出码/JSON输出的有序对照。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N1-31：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:46>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:44>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:454>) · [原文](https://xiaolinnote.com/codex/basics/codex_engineering.html)。

### Q-C26 · N4-17 · N4三条压缩路径改写只剩Token预算分支

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问三路径怎样选择，答案明确预算策略开则新窗口无摘要；否则服务端支持远程则远程，不支持才本地。typed只问预算开时做什么，全41题其余没有远程/本地能力判断分支。

原建议：补完整路径决策，保留else分支次序。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N4-17：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:184>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:182>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:2116>) · [原文](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html)。

### Q-C27 · N4-24 · N4网页丢分析版本长期记忆默认关闭的启用条件

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原答案明确分析版本默认关闭，需要设置启用本地记忆。typed只问不是任务结束立刻写入，全41题没有别题考默认状态/用户设置开关。

原建议：单独补版本限定的启用本地记忆设置题，避免把条件开启能力记成每项安装必有。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N4-24：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:194>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:192>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:2253>) · [原文](https://xiaolinnote.com/codex/source/codex-memory-mechanism.html)。

### Q-C28 · N3-18 · N3错误分类改写只考命令失败

分类：网页改写造成考点缩减。优先级：medium。证据版本：初次3122题版本。

发现证据：原问命令失败、模型连接中断、无法继续错误三分支，typed只选命令失败作为工具结果。全53题其他题不考模型连接重连/换传输和不可恢复错误结束清理两分支。

原建议：恢复三类处理差异，或至少补连接失败和结束边界。

**当前验收：已修正或完成验收校正。** 已逐题核读当前题干、答案、typed，并对照同章来源小节；修改或新增题已主动考查原缺失知识点。

- N3-18：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/codex.md:110>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/codex.md:108>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/codex.json:1237>) · [原文](https://xiaolinnote.com/codex/source/codex_harness.html)。

### Q-C29 · F1-35、F1-36、F2-9 · 原文Git完整回滚的承诺及HEAD~1示例有危险边界

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：F1原文称gitcheckout.能完整恢复含node_modules的项目，且在大改动前存档commit后直接给reset--hardHEAD~1。Git官方说明路径checkout恢复索引中的版本，不清除所有未跟踪/ignored产物；若坏改动还未提交，HEAD~1越过刚建立的存档。题答基本忠实，因此单独归来源问题。

原建议：修订原文：明确已跟踪/未跟踪边界、回到存档提交的目标；避免把HEAD~1作为不加条件的回滚模板。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。 对Git回滚已补已跟踪文件与ignored目录边界，并用HEAD代替无条件HEAD~1；F1-36新答案的未暂存限定见新增Q-C35。

- F1-35：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:53>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:51>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:447>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_use.html)。
- F1-36：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:54>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:52>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:448>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_use.html)。
- F2-9：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:87>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:83>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:731>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。
- 一手核对资料1：[来源](https://git-scm.com/docs/git-checkout)。

### Q-C30 · H1-25、H1-26、H1-27 · 原文跨组织全球共享Prompt缓存与官方隔离说明矛盾

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：H1原文和H1-26填空称相同静态前缀可全球跨组织跨用户共用。Anthropic官方PromptCaching“Cache storage and sharing”明确组织间不共享缓存，当前ClaudeAPI进一步按workspace隔离。属于原文错误，不是题库不忠实。

原建议：保留稳定前缀利于缓存的原理，删除跨组织共享的断言，并区分会话/组织内部缓存与API隔离边界。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。

- H1-25：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:40>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:38>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:425>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H1-26：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:41>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:39>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:452>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H1-27：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:42>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:40>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:459>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- 一手核对资料1：[来源](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)。

### Q-C31 · H1-11 · 原文ExtendedThinking不占应用上下文的无条件断言不成立

分类：原文错误/矛盾/边界。优先级：high。证据版本：初次3122题版本。

发现证据：H1来源和参考答案把ExtendedThinking描述为不可见内部推理、不占应用上下文。官方PromptCaching“Caching with thinking blocks”展示thinking块随tool_result回传并作为请求缓存内容，读取时计输入token。typed正确项删去了“不占上下文”，避免了网页直接放大该断言。

原建议：修订来源：区分无需解析自由Thought、thinking块可见性、跨请求保留/输入计费；不能把省自由文本解析概括为thinking没有上下文成本。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。

- H1-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:23>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:21>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:165>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- 一手核对资料1：[来源](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)。

### Q-C32 · H1-38、H3-18 · 来源对ContextCollapse和AutoCompact串联或互斥说法相反

分类：原文错误/矛盾/边界。优先级：medium。证据版本：初次3122题版本。

发现证据：H1称ContextCollapse在AutoCompact之前，若压到阈值以下后者不触发；H3明确开关二选一，启用Collapse即短路AutoCompact，不能叠加。两道题均各自忠实，不能将任一忠实答案单独判错。

原建议：统一来源，或给两章加版本/实验配置边界，在题干也注明分析路径。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。

- H1-38：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:56>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:54>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:684>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H3-18：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:137>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:148>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:1639>) · [原文](https://xiaolinnote.com/claudecode/source/cc_compact.html)。

### Q-C33 · F1-22、F2-56、F2-57 · 来源对ultrathink临时档位自相矛盾

分类：原文错误/矛盾/边界。优先级：medium。证据版本：初次3122题版本。

发现证据：F1称临时拉到最高；F2在5档low/medium/high/xhigh/max之后具体写临时到high，又说最高挡以及high也能临时再提高。F2-56沿用最高，F2-57说默认xhigh下边际作用弱，存在来源内部矛盾。

原建议：先统一原文具体档位/适用版本；题库暂保留单轮临时调整和恢复原设置这个明确结论。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。

- F1-22：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:37>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:35>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:217>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_use.html)。
- F2-56：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:146>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:142>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:1461>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。
- F2-57：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-basics.md:147>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-basics.md:143>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-basics.json:1463>) · [原文](https://xiaolinnote.com/claudecode/basics/cc_powerup.html)。

### Q-C34 · H1-36、H3-11、H3-12 · 来源对Snip选择职责及零API开销的表述不一致

分类：原文错误/矛盾/边界。优先级：medium。证据版本：初次3122题版本。

发现证据：H1将Snip描述为直接清理旧消息且零API开销；H3澄清是模型正常回答顺带用snip工具按消息ID标记，本地删除，会多提示/idtoken，只是不独立另发摘要请求。题答分别忠实。

原建议：跨章统一成“无独立摘要调用，仍有模型回合和token成本”，补模型标记/本地删除职责。

**当前验收：已修正或完成验收校正。** 当前答案已明确区分原文说法与核对/对照来源，并加入纠正边界。题库层面的误导已修复；外部原文章节的错误或不一致仍存在，不等于外部来源已修订。

- H1-36：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:54>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:52>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:655>) · [原文](https://xiaolinnote.com/claudecode/source/cc_source.html)。
- H3-11：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:130>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:141>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:1528>) · [原文](https://xiaolinnote.com/claudecode/source/cc_compact.html)。
- H3-12：[题干](<D:/vscode html/xiaolincoding_test/interview-practice/claude-code-source.md:131>) · [答案](<D:/vscode html/xiaolincoding_test/interview-practice/answers-xiaolin/claude-code-source.md:142>) · [网页题型](<D:/vscode html/xiaolincoding_test/content/typed/claude-code-source.json:1554>) · [原文](https://xiaolinnote.com/claudecode/source/cc_compact.html)。

