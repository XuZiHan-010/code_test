# RAG 原文章节摘编

仅依据各题所列的小林面试笔记原文章节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分明确标注，不使用其他网站补充。整理日期：2026-10-13。

## 1. RAG 基本流程

原文：[1. 什么是 RAG？详细描述一个完整 RAG 系统的详细工作流程？](https://xiaolinnote.com/ai/rag/1_whatisrag.html)。

- **B1-1** RAG 全称 Retrieval-Augmented Generation，即检索增强生成：LLM 的知识在训练完后就固定了，遇到私有数据或最新信息答不上来；RAG 在生成答案之前先去外部知识库检索相关内容，再把检索结果和用户问题一起交给 LLM，让它基于这些上下文回答，本质上是给 LLM 开了一个开卷考试的口子。[原文§💡 简要回答](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **B1-2** 离线阶段在用户提问前把知识库建好：文档加载，读取 PDF、Word、Markdown、网页、数据库记录等原始数据；文档切割，把文档切成通常 500 到 1000 token、带一定重叠的 chunk；Embedding，把每段文字转成高维向量，语义相近的文本位置靠近；入库，把每个 chunk 的向量和原始文本一起存进向量数据库。[原文§离线阶段：提前把知识准备好](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E7%A6%BB%E7%BA%BF%E9%98%B6%E6%AE%B5-%E6%8F%90%E5%89%8D%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87%E5%A5%BD)
- **B1-3** 在线阶段每次提问时实时执行：Query 处理，把口语化或依赖上下文的问题改写成适合检索的形式；向量检索（粗排），把问题转成向量，在向量库里找距离最近的 Top-K 个 chunk，速度快但会混入看着近其实不相关的内容；Rerank（精排），用 Cross-Encoder 把问题和每个候选拼在一起重新排序，通常只对 Top-20 做，留下 Top-3 到 Top-5；生成，把问题和精排后的 chunk 拼成 prompt 交给 LLM，并要求只根据资料回答。[原文§在线阶段：用户提问时实时检索](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E5%9C%A8%E7%BA%BF%E9%98%B6%E6%AE%B5-%E7%94%A8%E6%88%B7%E6%8F%90%E9%97%AE%E6%97%B6%E5%AE%9E%E6%97%B6%E6%A3%80%E7%B4%A2)
- **B1-4** Embedding 把一段文字转成高维向量，相当于一个语义坐标系，语义相似的文本位置靠近、不相关的离得远；这来自训练：模型看了海量文本，用对比学习等方法不断调整权重，把意思相近的文本拉近、不相关的推远。所以“苹果手机怎么截图”和“iPhone 如何截屏”用词不同但向量接近，检索比较的是意思而不是关键词。[原文§离线阶段：提前把知识准备好](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E7%A6%BB%E7%BA%BF%E9%98%B6%E6%AE%B5-%E6%8F%90%E5%89%8D%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87%E5%A5%BD)

### 补充考点

- **B1-5** 理论上可以，但微调成本高、耗时长；最关键的是知识一旦写进模型参数，以后想更新就得重新训练一遍，好比为了让一个人记住一条新闻而让他重新上一遍大学。[原文§LLM 的「知识冻结」困境](https://xiaolinnote.com/ai/rag/1_whatisrag.html#llm-%E7%9A%84%E3%80%8C%E7%9F%A5%E8%AF%86%E5%86%BB%E7%BB%93%E3%80%8D%E5%9B%B0%E5%A2%83)
- **B1-6** 不把知识塞进模型参数，而是在用户提问时实时去外部知识库检索，把找到的相关内容直接放进 prompt 给 LLM 读；LLM 有很强的阅读理解能力，只要内容在上下文里就能据此回答。既然模型记不住，就给它开卷考试。[原文§LLM 的「知识冻结」困境](https://xiaolinnote.com/ai/rag/1_whatisrag.html#llm-%E7%9A%84%E3%80%8C%E7%9F%A5%E8%AF%86%E5%86%BB%E7%BB%93%E3%80%8D%E5%9B%B0%E5%A2%83)
- **B1-7** 把各种格式的原始数据读取进来，可以是 PDF、Word、Markdown、网页、数据库记录等；通常用 LlamaIndex 或 LangChain 提供的 DocumentLoader，它们支持几十种数据源格式。[原文§离线阶段：提前把知识准备好](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E7%A6%BB%E7%BA%BF%E9%98%B6%E6%AE%B5-%E6%8F%90%E5%89%8D%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87%E5%A5%BD)
- **B1-8** 太大，例如 2000 token，信息太杂，容易召回不相关的内容；太小，例如 50 token，语义不完整、上下文被切断。实践中通常 500 到 1000 token 一个 chunk，并做一定的重叠，例如前后各重叠 100 token，避免把完整的语义从中间切断。[原文§离线阶段：提前把知识准备好](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E7%A6%BB%E7%BA%BF%E9%98%B6%E6%AE%B5-%E6%8F%90%E5%89%8D%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87%E5%A5%BD)
- **B1-9** 向量数据库专门优化了高维向量的存储和相似度搜索，支持在千万量级的向量里快速找到最相近的几条；常见的有 Chroma、Milvus、Qdrant、Weaviate 等。[原文§离线阶段：提前把知识准备好](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E7%A6%BB%E7%BA%BF%E9%98%B6%E6%AE%B5-%E6%8F%90%E5%89%8D%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87%E5%A5%BD)
- **B1-10** 用户的提问往往口语化或比较模糊，直接检索效果不一定好，例如“上次说的那个方案怎么样”离开对话上下文完全没法检索；所以实际工程里会加一步 Query 改写，让 LLM 把问题改写成更适合检索的形式，或者从对话历史里补充必要的上下文。[原文§在线阶段：用户提问时实时检索](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E5%9C%A8%E7%BA%BF%E9%98%B6%E6%AE%B5-%E7%94%A8%E6%88%B7%E6%8F%90%E9%97%AE%E6%97%B6%E5%AE%9E%E6%97%B6%E6%A3%80%E7%B4%A2)
- **B1-11** 它把用户问题转成向量，在向量库里找距离最近的 Top-K 个 chunk，速度非常快，百万量级通常几十毫秒返回；代价是它只比较两个向量的距离，没有深度理解查询和文档的语义关系，结果里难免混入看着近但其实不相关的内容。[原文§在线阶段：用户提问时实时检索](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E5%9C%A8%E7%BA%BF%E9%98%B6%E6%AE%B5-%E7%94%A8%E6%88%B7%E6%8F%90%E9%97%AE%E6%97%B6%E5%AE%9E%E6%97%B6%E6%A3%80%E7%B4%A2)
- **B1-12** Rerank 模型通常是 Cross-Encoder 结构，把用户问题和每个候选 chunk 拼在一起，深度理解相关性后重新排序、过滤不相关的结果；它更准但更慢，所以通常只对粗排返回的 Top-20 做精排，最终留下 Top-3 到 Top-5。[原文§在线阶段：用户提问时实时检索](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E5%9C%A8%E7%BA%BF%E9%98%B6%E6%AE%B5-%E7%94%A8%E6%88%B7%E6%8F%90%E9%97%AE%E6%97%B6%E5%AE%9E%E6%97%B6%E6%A3%80%E7%B4%A2)
- **B1-13** 把用户问题和精排后的 chunk 拼成 prompt 交给 LLM，并明确告诉它只根据提供的资料回答，资料里没有就说不知道，这样能有效抑制 LLM 瞎编的倾向。[原文§在线阶段：用户提问时实时检索](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E5%9C%A8%E7%BA%BF%E9%98%B6%E6%AE%B5-%E7%94%A8%E6%88%B7%E6%8F%90%E9%97%AE%E6%97%B6%E5%AE%9E%E6%97%B6%E6%A3%80%E7%B4%A2)
- **B1-14** 一是知识可以随时热更新，往知识库里加新文档就行，不需要重新训练模型，成本极低；二是答案有溯源，每条回答都能追溯到来自哪个 chunk，可解释性更强，答错了也知道是哪条知识出了问题。[原文§串起来看完整流程](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%E4%B8%B2%E8%B5%B7%E6%9D%A5%E7%9C%8B%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B)
- **B1-15** 不能只说检索加生成：第一要讲 RAG 解决什么问题，即 LLM 知识冻结、无法覆盖私有数据和最新信息；第二要讲它和微调的本质区别，微调把知识写进模型参数，RAG 把知识放在外部实时检索、不动模型本身；最后补上知识可热更新、答案可溯源的核心价值。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/1_whatisrag.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 2. RAG 解决的问题

原文：[2. 大模型的 RAG 主要用来解决什么问题？](https://xiaolinnote.com/ai/rag/2_rag_problems.html)。

- **B2-1** RAG 把知识存到外部知识库，用的时候实时检索注入，绕开了参数里的知识限制：知识整理成文档、预处理后存入向量数据库，提问时检索最相关的片段和问题一起放进 prompt；新内容随时入库，不需要重新训练模型，知识库更新了就立刻生效，知识管理和模型能力由此解耦。[原文§RAG 是怎么解决这三个问题的](https://xiaolinnote.com/ai/rag/2_rag_problems.html#rag-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%BF%99%E4%B8%89%E4%B8%AA%E9%97%AE%E9%A2%98%E7%9A%84)
- **B2-2** 公开互联网的知识 LLM 多少见过，但公司的产品手册、客服知识库、合同模板、行业规范根本不会出现在公开训练数据里，这不是旧了而是压根没有；问它公司的退款政策，它如果回答就一定是在编。靠重新训练来补也不现实，成本高、周期长，而且数据天天在更新。[原文§知识空白：私有数据根本没进过训练集](https://xiaolinnote.com/ai/rag/2_rag_problems.html#%E7%9F%A5%E8%AF%86%E7%A9%BA%E7%99%BD-%E7%A7%81%E6%9C%89%E6%95%B0%E6%8D%AE%E6%A0%B9%E6%9C%AC%E6%B2%A1%E8%BF%9B%E8%BF%87%E8%AE%AD%E7%BB%83%E9%9B%86)
- **B2-3** LLM 有了真实的参考依据，生成答案时是在复述检索到的内容，而不是凭记忆发挥，幻觉率会显著降低；而且每条答案都能追溯到来源，用户可以自己去原文核实，可信度大幅提升。[原文§RAG 是怎么解决这三个问题的](https://xiaolinnote.com/ai/rag/2_rag_problems.html#rag-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%BF%99%E4%B8%89%E4%B8%AA%E9%97%AE%E9%A2%98%E7%9A%84)

### 补充考点

- **B2-4** LLM 在预训练时把文本里的知识编码进参数权重，像一本印刷完成就无法再改的百科全书；训练数据收集到什么时候，模型就只知道那个时间点之前的事，之后外部世界怎么变化，参数都不会自动更新。[原文§LLM 的「知识冻结」问题](https://xiaolinnote.com/ai/rag/2_rag_problems.html#llm-%E7%9A%84%E3%80%8C%E7%9F%A5%E8%AF%86%E5%86%BB%E7%BB%93%E3%80%8D%E9%97%AE%E9%A2%98)
- **B2-5** 训练一次 GPT 级别的模型成本是千万美元级别，不可能每周来一遍；微调能注入一些新知识，但成本也不低，而且微调出来的知识没法溯源，出错了找不到原因。它是 LLM 架构的固有特性。[原文§LLM 的「知识冻结」问题](https://xiaolinnote.com/ai/rag/2_rag_problems.html#llm-%E7%9A%84%E3%80%8C%E7%9F%A5%E8%AF%86%E5%86%BB%E7%BB%93%E3%80%8D%E9%97%AE%E9%A2%98)
- **B2-6** 模型不知道训练截止之后的事，但它不会说不知道，而是用见过的历史规律推测出一个听起来合理的答案，并且说得很自信；例如不知道某公司最新一季财报，给出的分析就基于过期信息。训练数据越陈旧，时效性问题越严重。[原文§知识过期：训练数据有截止日期](https://xiaolinnote.com/ai/rag/2_rag_problems.html#%E7%9F%A5%E8%AF%86%E8%BF%87%E6%9C%9F-%E8%AE%AD%E7%BB%83%E6%95%B0%E6%8D%AE%E6%9C%89%E6%88%AA%E6%AD%A2%E6%97%A5%E6%9C%9F)
- **B2-7** 它的核心机制是预测下一个词，天然倾向于一直生成下去，没有内置我不确定就停下来的开关，也无法知道自己不知道；原文认为参数里的知识不够用时，它会硬着头皮把相关的、不相关的知识拼凑成听起来合理的答案；缺少可靠知识只是幻觉的主要风险来源，并非唯一原因，即使有了资料，它也可能误读或超出资料发挥（见 B17-1、B17-5）。[原文§知识缺失的副产品：幻觉](https://xiaolinnote.com/ai/rag/2_rag_problems.html#%E7%9F%A5%E8%AF%86%E7%BC%BA%E5%A4%B1%E7%9A%84%E5%89%AF%E4%BA%A7%E5%93%81-%E5%B9%BB%E8%A7%89)
- **B2-8** 不是。原文认为幻觉是知识缺失的副产品，是模型在没有可靠依据时的应急策略：知识过期和知识缺失都会增大幻觉的风险，原文把根源归为参数里没有对应的知识；RAG 补上依据，针对的是这个主要风险来源，而不是单独在治幻觉。但这不是全部：有依据时模型也可能误读或超出资料发挥，所以 RAG 之后仍要单独治理（见 B17-1、B17-5）。[原文§知识缺失的副产品：幻觉](https://xiaolinnote.com/ai/rag/2_rag_problems.html#%E7%9F%A5%E8%AF%86%E7%BC%BA%E5%A4%B1%E7%9A%84%E5%89%AF%E4%BA%A7%E5%93%81-%E5%B9%BB%E8%A7%89)
- **B2-9** 知识存在外部，用的时候检索出来看：更新知识不需要碰模型，扩充领域知识只需要扩充知识库；而且每条答案都能追溯到来源，用户可以自己去原文核实。这是它成为企业 AI 落地首选方案的根本原因。[原文§RAG 是怎么解决这三个问题的](https://xiaolinnote.com/ai/rag/2_rag_problems.html#rag-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%BF%99%E4%B8%89%E4%B8%AA%E9%97%AE%E9%A2%98%E7%9A%84)

## 3. RAG 与微调

原文：[3. 相比直接微调 LLM，RAG 解决了什么问题？微调和 RAG 各自的优劣势是什么？](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html)。

- **B3-1** 微调直接改模型参数，用自己的数据继续训练，让模型把新知识记进去；优势是效果彻底，专业词汇、输出格式、回答风格都能深度定制，推理时不需要额外检索，延迟低。代价是成本高，要准备标注数据、租 GPU、跑训练；知识更新难，业务数据每周在变，不可能每周重训；不透明，回答来自参数，不知道依据哪条知识，出错也难定位。[原文§微调（Fine-tuning）：把知识直接烧进模型](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#%E5%BE%AE%E8%B0%83-fine-tuning-%E6%8A%8A%E7%9F%A5%E8%AF%86%E7%9B%B4%E6%8E%A5%E7%83%A7%E8%BF%9B%E6%A8%A1%E5%9E%8B)
- **B3-2** 优先考虑微调：典型的组合是先对基础模型做一轮微调，让它学会输出格式、语气风格和行业术语，再用 RAG 提供具体的知识内容；微调解决怎么说，RAG 解决说什么。按对比表，微调适合定制输出风格和深度专业能力，RAG 适合私有知识问答和动态更新的数据。[原文§组合使用：微调解决「怎么说」，RAG 解决「说什么」](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#%E7%BB%84%E5%90%88%E4%BD%BF%E7%94%A8-%E5%BE%AE%E8%B0%83%E8%A7%A3%E5%86%B3%E3%80%8C%E6%80%8E%E4%B9%88%E8%AF%B4%E3%80%8D-rag-%E8%A7%A3%E5%86%B3%E3%80%8C%E8%AF%B4%E4%BB%80%E4%B9%88%E3%80%8D)
- **B3-3** RAG 不改模型参数，在推理时临时把知识放进 prompt：知识库更新只是往向量库里加文档，不需要重新训练，加完就生效；回答可以附上来源 chunk，出错了马上知道是哪条知识有问题；成本也低得多。代价是多了检索步骤，延迟增加几百毫秒到一秒，而且答案的上限被检索质量卡住，相关 chunk 没检索回来 LLM 再强也答不出。[原文§RAG：不改参数，推理时现查知识](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#rag-%E4%B8%8D%E6%94%B9%E5%8F%82%E6%95%B0-%E6%8E%A8%E7%90%86%E6%97%B6%E7%8E%B0%E6%9F%A5%E7%9F%A5%E8%AF%86)
- **B3-4** 当既要定制表达方式又要提供会变化的具体知识时：先对基础模型微调，让它学会输出格式、语气风格、行业术语，再用 RAG 提供具体的知识内容，两者各司其职，这也是实际工程里最常见的做法。差别在于微调更新知识要重新训练、推理延迟低、答案不可溯源，RAG 更新知识库即可生效、多一次检索耗时、答案可追溯到具体 chunk。[原文§组合使用：微调解决「怎么说」，RAG 解决「说什么」](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#%E7%BB%84%E5%90%88%E4%BD%BF%E7%94%A8-%E5%BE%AE%E8%B0%83%E8%A7%A3%E5%86%B3%E3%80%8C%E6%80%8E%E4%B9%88%E8%AF%B4%E3%80%8D-rag-%E8%A7%A3%E5%86%B3%E3%80%8C%E8%AF%B4%E4%BB%80%E4%B9%88%E3%80%8D)

### 补充考点

- **B3-5** 一是成本，要准备标注数据、租 GPU、跑训练；二是知识更新困难，业务数据每周都在变，每次微调要几小时到几天，无法每周重做；三是不透明，回答来自参数，不知道它从哪条知识推出来，出错难以定位，模型只是记住了训练数据里的模式。[原文§微调（Fine-tuning）：把知识直接烧进模型](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#%E5%BE%AE%E8%B0%83-fine-tuning-%E6%8A%8A%E7%9F%A5%E8%AF%86%E7%9B%B4%E6%8E%A5%E7%83%A7%E8%BF%9B%E6%A8%A1%E5%9E%8B)
- **B3-6** 生成层只是在复述和整理检索到的内容，上限被检索层卡住：相关的 chunk 没被检索回来，LLM 再强也答不出来；所以调优的主战场永远是检索质量，一上来就换更贵的模型往往是南辕北辙。[原文§RAG：不改参数，推理时现查知识](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#rag-%E4%B8%8D%E6%94%B9%E5%8F%82%E6%95%B0-%E6%8E%A8%E7%90%86%E6%97%B6%E7%8E%B0%E6%9F%A5%E7%9F%A5%E8%AF%86)
- **B3-7** 它对复杂推理能力的提升有限：RAG 只是给模型提供参考资料，如果需要模型对某个领域有更深的推理能力，光靠检索资料不够，还是得微调。[原文§RAG：不改参数，推理时现查知识](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#rag-%E4%B8%8D%E6%94%B9%E5%8F%82%E6%95%B0-%E6%8E%A8%E7%90%86%E6%97%B6%E7%8E%B0%E6%9F%A5%E7%9F%A5%E8%AF%86)
- **B3-8** 微调实现成本高，需要 GPU 和标注数据，知识上限受限于训练数据的质量和规模；RAG 成本低，向量库加 Embedding 即可，知识上限受限于检索质量和 context 长度。[原文§组合使用：微调解决「怎么说」，RAG 解决「说什么」](https://xiaolinnote.com/ai/rag/3_rag_vs_finetune.html#%E7%BB%84%E5%90%88%E4%BD%BF%E7%94%A8-%E5%BE%AE%E8%B0%83%E8%A7%A3%E5%86%B3%E3%80%8C%E6%80%8E%E4%B9%88%E8%AF%B4%E3%80%8D-rag-%E8%A7%A3%E5%86%B3%E3%80%8C%E8%AF%B4%E4%BB%80%E4%B9%88%E3%80%8D)

## 4. 文档存储与 Chunking

原文：[4. RAG 中的文档是怎么存的？粒度是多大？详细说说文档切割（Chunking）策略？](https://xiaolinnote.com/ai/rag/4_chunking.html)。

- **B4-1** 原因有两个：一是向量模型有输入长度限制，一般最多几百到几千 token，几千字的文档塞不进去；二是即使支持超长输入，把整篇文章压成一个向量，细节会被平均掉，想找“退款政策”，向量里还混着“配送时效”“积分规则”，检索到的是笼统的整篇文档而不是精确的那段话。所以要先切成 chunk，一篇文档会变成向量库里的多条记录。[原文§文档是怎么存的？](https://xiaolinnote.com/ai/rag/4_chunking.html#%E6%96%87%E6%A1%A3%E6%98%AF%E6%80%8E%E4%B9%88%E5%AD%98%E7%9A%84)
- **B4-2** chunk 太大，向量把太多语义压缩在一起、变得笼统，检索时容易召回只与问题部分相关的内容，也更容易超出 Embedding 模型的输入长度限制；chunk 太小，单个 chunk 语义不完整、上下文丢失，LLM 拿到也看不懂，检索噪音更多。通常 500 到 1000 token 是合理的起点，更重要的是结合文档的内容结构来定。[原文§粒度怎么定?](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%B2%92%E5%BA%A6%E6%80%8E%E4%B9%88%E5%AE%9A)
- **B4-3** 固定大小切割最大的问题是可能切断语义；语义边界切割顺着段落、句子、标题层级这些天然断点切，每个 chunk 是围绕同一话题的完整内容，常见做法是维护分隔符优先级列表，先按段落切，太大再按句子、再按标点切，直到满足 chunk_size；有明确标题结构的 Markdown 或 HTML 文档按标题层级切更好，每个 chunk 对应一个完整章节，metadata 自动带上所属标题。[原文§策略二：语义边界切割（Semantic/Structure Based Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E4%BA%8C-%E8%AF%AD%E4%B9%89%E8%BE%B9%E7%95%8C%E5%88%87%E5%89%B2-semantic-structure-based-chunking)
- **B4-4** 代码以函数或类为单位切割，因为函数是最小的语义完整单元，从中间截断就失去逻辑意义，可以用语法解析工具（如 Python 的 AST 模块）识别函数和类的边界；表格要整块保留并转成 Markdown 存储，不能按行截断，因为每一行都依赖表头才有意义，整张表作为一个 chunk 才能保留列的含义和行间的对比关系。[原文§策略三：特殊内容专项处理](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E4%B8%89-%E7%89%B9%E6%AE%8A%E5%86%85%E5%AE%B9%E4%B8%93%E9%A1%B9%E5%A4%84%E7%90%86)
- **B4-5** 小 chunk（如 200 token）语义聚焦，围绕一个小话题，用于向量检索时精度高；但给 LLM 读时上下文不够，所以同一段内容存两份，另一份是包含它前后上下文的大 chunk（如 1000 token），通过 ID 关联，检索时用小 chunk 命中，再按关联 ID 取出大 chunk 交给 LLM。代价是存储量翻倍、索引构建更复杂。[原文§策略四：父子切割（Parent-Child Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E5%9B%9B-%E7%88%B6%E5%AD%90%E5%88%87%E5%89%B2-parent-child-chunking)

### 补充考点

- **B4-6** 向量、原始文本和 metadata：向量像索引卡，表示内容在语义空间的位置，用于相似度检索；原文像书页，是检索命中后原封不动塞进 prompt 给 LLM 读的内容；metadata 像书签，记录来源文件名、页码、章节等，用于过滤和溯源。[原文§文档是怎么存的？](https://xiaolinnote.com/ai/rag/4_chunking.html#%E6%96%87%E6%A1%A3%E6%98%AF%E6%80%8E%E4%B9%88%E5%AD%98%E7%9A%84)
- **B4-7** 两者角色完全不同：向量是一串浮点数，LLM 看不懂，只有检索系统会用；原文是纯文字，没有向量就无法做相似度检索。向量负责找到，原文负责阅读，缺一不可。[原文§文档是怎么存的？](https://xiaolinnote.com/ai/rag/4_chunking.html#%E6%96%87%E6%A1%A3%E6%98%AF%E6%80%8E%E4%B9%88%E5%AD%98%E7%9A%84)
- **B4-8** 一篇文档会变成多条记录：一篇 5000 字的文档按 500 字一个 chunk 切，就是 10 条记录，100 篇文档就是 1000 条记录，这是 RAG 存储的核心特点。[原文§文档是怎么存的？](https://xiaolinnote.com/ai/rag/4_chunking.html#%E6%96%87%E6%A1%A3%E6%98%AF%E6%80%8E%E4%B9%88%E5%AD%98%E7%9A%84)
- **B4-9** 固定大小切割实现简单、chunk 大小可控，但可能在句子中间截断；加上重叠后，前一个 chunk 的末尾和下一个 chunk 的开头有一段相同内容，例如 chunk_size 为 500、overlap 为 100，原文认为这样跨边界的句子一定完整地出现在某一个 chunk 里，需要限定边界：只有长度不超过 overlap 的内容才有保证（例如窗口 [0,500) 和 [400,900)，位于 [350,550) 的句子两个窗口都只含一部分），所以重叠只是缓解截断，不能保证任意句子完整，B5-1 也指出重叠太小保护不足。它适合没有明显结构的纯文本，是保底选择。[原文§策略一：固定大小切割（Fixed Size Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E4%B8%80-%E5%9B%BA%E5%AE%9A%E5%A4%A7%E5%B0%8F%E5%88%87%E5%89%B2-fixed-size-chunking)
- **B4-10** 按标题层级切：每个 chunk 对应一个完整章节，metadata 里自动带上所属的标题路径，例如产品手册下的退款政策、申请流程，既语义独立，又方便过滤和溯源。[原文§策略二：语义边界切割（Semantic/Structure Based Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E4%BA%8C-%E8%AF%AD%E4%B9%89%E8%BE%B9%E7%95%8C%E5%88%87%E5%89%B2-semantic-structure-based-chunking)
- **B4-11** 它由 Jina AI 在 2024 年提出，先编码后切分：先把整篇文档交给支持长上下文的 Embedding 模型做一次前向传播，得到每个 token 的向量，再按 chunk 边界把同一 chunk 内的 token 向量做 mean pooling；这样每个 chunk 的向量天然融入全文语境。代价是模型必须支持足够长的上下文，还要保留 token 级中间结果，开销更大。[原文§策略四：父子切割（Parent-Child Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E5%9B%9B-%E7%88%B6%E5%AD%90%E5%88%87%E5%89%B2-parent-child-chunking)
- **B4-12** 粒度没有银弹，500 到 1000 token 是起点，关键是按文档类型选策略：固定大小加重叠做兜底，对结构化文档用语义边界切割，对质量要求高的场景用父子切割。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/4_chunking.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)
- **B4-13** 模型必须支持足够长的上下文，还要保留 token 级的中间结果，开销更大。[原文§策略四：父子切割（Parent-Child Chunking）](https://xiaolinnote.com/ai/rag/4_chunking.html#%E7%AD%96%E7%95%A5%E5%9B%9B-%E7%88%B6%E5%AD%90%E5%88%87%E5%89%B2-parent-child-chunking)

## 5. 切分后的语义补全

原文：[5. 怎么规避语义被切割掉的问题？](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html)。

- **B5-1** 让相邻 chunk 之间有一段内容重叠，边界切在语义中间时，原文认为跨边界的内容会完整出现在其中一个 chunk 里，实际只对长度不超过重叠量的内容成立，更长的内容仍可能两边都不完整；重叠量通常是 chunk_size 的 10% 到 20%，太小覆盖不了跨边界语义，太大则重复内容多，存储和检索成本上升，还会干扰 LLM 阅读。它只是兜底，只能保证跨边界的文字不丢，解决不了一个完整语义被拆散的根本问题。[原文§方案一：重叠切割（Overlap）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%B8%80-%E9%87%8D%E5%8F%A0%E5%88%87%E5%89%B2-overlap)
- **B5-2** 存储时把文档切成单个句子，每个句子单独做向量，用于精准检索；命中一个句子后不只返回这一句，而是把它前后各 N 个句子一起返回，形成上下文窗口交给 LLM。这样检索粒度细、定位准，LLM 拿到的内容又是完整的；缺点是存储量大，库里的记录数等于文档的句子总数。[原文§方案三：句子窗口检索（Sentence Window Retrieval）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%B8%89-%E5%8F%A5%E5%AD%90%E7%AA%97%E5%8F%A3%E6%A3%80%E7%B4%A2-sentence-window-retrieval)
- **B5-3** 命题化切割不按文本位置切，而是用 LLM 把文档分解成一条条独立的命题：每个命题是完整、自包含的陈述句，只包含一个核心事实，带着表达这个事实所需的全部上下文，单独拿出来就能看懂；例如一句话拆成“企业用户享有优先客服通道”等三条。优势是语义密度最高、检索精度好，缺点是要额外的 LLM 调用，成本高。[原文§方案五：命题化切割（Propositions-based Chunking）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%BA%94-%E5%91%BD%E9%A2%98%E5%8C%96%E5%88%87%E5%89%B2-propositions-based-chunking)
- **B5-4** 它不改变 chunk 本身，而是在向量化之前补上缺失的语境：让 LLM 看着整篇原始文档，为每个 chunk 生成一段 1 到 2 句的背景说明，说明它在文档里的位置和主题，再把这段 Context 前置拼到 chunk 前面，整体去做 Embedding 和 BM25 索引。因为孤立的 chunk 如“此条款自 2024 年 1 月 1 日起生效”在向量里没有主题信息，容易被无关内容干扰。[原文§方案六：Contextual Retrieval（Anthropic）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E5%85%AD-contextual-retrieval-anthropic)
- **B5-5** 用 Prompt Caching：每次调用里完整文档是所有 chunk 请求的相同前缀，第一次调用把它写入缓存，按正常价的 1.25 倍计费，后续同一文档的 chunk 请求命中缓存的部分只按约 10% 计费，文档部分的成本能降到原来的 10% 到 20%，可把这项成本降低 80% 到 90%。按 Anthropic 的数据，Contextual Retrieval 结合 BM25 混合检索能把检索失败率降低约 49%。[原文§成本控制：用 Prompt Caching 大幅降低 LLM 调用费用](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%88%90%E6%9C%AC%E6%8E%A7%E5%88%B6-%E7%94%A8-prompt-caching-%E5%A4%A7%E5%B9%85%E9%99%8D%E4%BD%8E-llm-%E8%B0%83%E7%94%A8%E8%B4%B9%E7%94%A8)

### 补充考点

- **B5-6** 不是信息丢了，而是信息被拆散之后，每一半都不够强：一句完整的条款被切到两个 chunk 里，两个 chunk 单独看相关度都不高，极可能都不会被召回，答案就断了。[原文§语义被切割是什么问题?](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E8%AF%AD%E4%B9%89%E8%A2%AB%E5%88%87%E5%89%B2%E6%98%AF%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **B5-7** 通常设为 chunk_size 的 10% 到 20%，例如 chunk_size 为 800、overlap 为 150；太小，例如 5%，覆盖不了完整的跨边界语义；太大，例如 40%，重复内容太多，存储和检索成本上升，还会干扰 LLM 的阅读和理解。[原文§方案一：重叠切割（Overlap）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%B8%80-%E9%87%8D%E5%8F%A0%E5%88%87%E5%89%B2-overlap)
- **B5-8** 没有。重叠切割是所有方案的基础，几乎每个 RAG 系统都应该开启，但它只是兜底：只能保证跨边界的文字不丢失，解决不了一个完整语义被拆散的根本问题。[原文§方案一：重叠切割（Overlap）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%B8%80-%E9%87%8D%E5%8F%A0%E5%88%87%E5%89%B2-overlap)
- **B5-9** 用 spacy、nltk 等 NLP 工具识别句子结束的位置，以句子为单位填充 chunk：把句子一条条往当前 chunk 里加，加满就封存并开启新的，不在句子中间截断；段落分明的文档还可以优先在段落边界处切。[原文§方案二：按语义边界切割](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E6%8C%89%E8%AF%AD%E4%B9%89%E8%BE%B9%E7%95%8C%E5%88%87%E5%89%B2)
- **B5-10** 优点是两全其美：检索粒度细到单句，定位准确、相关性高，而给 LLM 的是命中句前后的完整上下文窗口；缺点是存储量较大，每个句子都要单独向量化，库里的记录数等于文档的句子总数。[原文§方案三：句子窗口检索（Sentence Window Retrieval）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%B8%89-%E5%8F%A5%E5%AD%90%E7%AA%97%E5%8F%A3%E6%A3%80%E7%B4%A2-sentence-window-retrieval)
- **B5-11** 两者思路相近，都是小粒度检索、大粒度返回；句子窗口是检索命中后动态扩展上下文，实现更简单，不需要维护父子 ID 关系；父子切割是提前把父子关系存好，更灵活，父 chunk 的大小可以精确控制。[原文§方案四：父子切割（Parent-Child Chunking）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E5%9B%9B-%E7%88%B6%E5%AD%90%E5%88%87%E5%89%B2-parent-child-chunking)
- **B5-12** 它用 LLM 把文档分解成一条条完整、自包含、只含一个核心事实的陈述句，每个 chunk 的语义密度最高、最独立，检索精度非常好；缺点是需要额外的 LLM 调用来生成命题，成本较高，适合对质量要求极高的场景。[原文§方案五：命题化切割（Propositions-based Chunking）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E4%BA%94-%E5%91%BD%E9%A2%98%E5%8C%96%E5%88%87%E5%89%B2-propositions-based-chunking)
- **B5-13** chunk 被单独拿出来后失去了语境：向量化时 Embedding 模型只能看到这段文字本身，不知道它来自哪篇文档、讲什么主题，例如“此条款自某日起生效”完全丢失了这是哪类条款的信息；向量只能编码它看到的文字，向量里没有主题信息，是孤立 chunk 召回质量低的根本原因。[原文§方案六：Contextual Retrieval（Anthropic）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E5%85%AD-contextual-retrieval-anthropic)
- **B5-14** 让 LLM 看着整篇原始文档，为每个切出来的 chunk 生成一段 1 到 2 句话的背景说明，说清这个 chunk 在整篇文档里处于什么位置、讲的是什么；再把背景说明和原始 chunk 拼在一起整体向量化入库，使向量里包含主题等关键语义。[原文§方案六：Contextual Retrieval（Anthropic）](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%E6%96%B9%E6%A1%88%E5%85%AD-contextual-retrieval-anthropic)
- **B5-15** 重叠切割做兜底，语义边界切割保证切割质量，对质量要求高的场景再加父子切割或 Contextual Retrieval。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/5_semantic_cuts.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 6. Embedding 选择

原文：[6. 在 RAG 中 Embedding 究竟是什么？如何选择和评估一个 Embedding 模型？](https://xiaolinnote.com/ai/rag/6_embedding.html)。

- **B6-1** Embedding 模型做的是语义压缩，把一段自然语言文本映射成固定长度的浮点数向量，例如 1024 维的模型不管输入 10 个字还是 500 个字，输出都是 1024 个数；最关键的性质是语义相近的文本向量的余弦相似度高，用余弦是因为它只看方向不看模长，把意思相近从文本长短里剥离出来。“苹果手机怎么截图”和“iPhone 如何截屏”一个字都不同，余弦相似度却可能高达 0.95。[原文§Embedding 是什么?](https://xiaolinnote.com/ai/rag/6_embedding.html#embedding-%E6%98%AF%E4%BB%80%E4%B9%88)
- **B6-2** 主要看三个判断点：中英文比例，知识库以中文为主可选 bge-large-zh-v1.5 或 Qwen3-Embedding，中英混合选 bge-m3，纯英文或图省事选 text-embedding-3-small；数据合规要求，数据不能出境就必须用可本地部署的开源模型，如 BGE 系列和 Qwen3-Embedding；向量维度，它影响存储空间和检索速度。[原文§如何选择 Embedding 模型？](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9-embedding-%E6%A8%A1%E5%9E%8B)
- **B6-3** 维度越高精度越好，但存储空间和检索时间都会增加；百万量级的知识库 1024 维是合理的平衡点，规模很小时 1536 维也无所谓。有些新模型（如 text-embedding-3-small）支持 Matryoshka 降维，可以灵活调整维度来平衡精度和成本。[原文§如何选择 Embedding 模型？](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9-embedding-%E6%A8%A1%E5%9E%8B)
- **B6-4** MTEB 是权威的通用排行榜，但用的是通用数据集，医疗问诊、法律文档、客服知识库这类业务场景与通用数据分布差异很大，排行榜第一的模型不一定适合你；正确的方法是在自己的业务数据上测：准备几百条“问题加正确答案 chunk”对，用候选模型检索，看正确 chunk 是否出现在前 K 条，即 Hit@K，Hit@5 低于 0.7 就要考虑换模型或改进 Chunking 策略。[原文§如何评估 Embedding 模型？](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%A6%82%E4%BD%95%E8%AF%84%E4%BC%B0-embedding-%E6%A8%A1%E5%9E%8B)

### 补充考点

- **B6-5** 高维空间里向量的长度会受文本长度、表达强度等非语义因素影响，直接比距离会把长短和语义混在一起；余弦只看两个向量的方向，方向越一致越接近 1，正好把意思相近从文本长短里剥离出来。[原文§Embedding 是什么?](https://xiaolinnote.com/ai/rag/6_embedding.html#embedding-%E6%98%AF%E4%BB%80%E4%B9%88)
- **B6-6** 它从意思层面做匹配，能处理同义词、近义词和不同的表达方式：用词完全不同但意思相同的两句话，向量的余弦相似度可以很高；而都含“苹果”的“苹果手机”和“苹果汁”语义相差很远，向量距离会拉开。[原文§Embedding 是什么?](https://xiaolinnote.com/ai/rag/6_embedding.html#embedding-%E6%98%AF%E4%BB%80%E4%B9%88)
- **B6-7** text-embedding-3-small 性价比最高，1536 维，支持降维到 256 维以节省存储，调用方便，英文效果非常好；缺点是 API 调用有费用，数据要发到 OpenAI 的服务器，有些企业有数据出境的合规问题。[原文§常见 Embedding 模型对比](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%B8%B8%E8%A7%81-embedding-%E6%A8%A1%E5%9E%8B%E5%AF%B9%E6%AF%94)
- **B6-8** bge-large-zh-v1.5 是经典的中文开源模型，1024 维，可以本地部署、数据不出境；bge-m3 是多语言版本，同时支持中英日等语言，1024 维，支持稠密向量、稀疏向量和 ColBERT 式多向量三种检索模式，适合中英文混排的场景。[原文§常见 Embedding 模型对比](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%B8%B8%E8%A7%81-embedding-%E6%A8%A1%E5%9E%8B%E5%AF%B9%E6%AF%94)
- **B6-9** Qwen3-Embedding 在多语言基准上表现突出，中文效果很强；Voyage-3-large 在英文检索上精度超过 OpenAI 的模型；Cohere embed-v4 支持 128K 超长上下文，适合长文档；Gemini Embedding 在多个评测中表现均衡。做新项目时应在自己的数据上测评后再选型。[原文§常见 Embedding 模型对比](https://xiaolinnote.com/ai/rag/6_embedding.html#%E5%B8%B8%E8%A7%81-embedding-%E6%A8%A1%E5%9E%8B%E5%AF%B9%E6%AF%94)

## 7. Embedding 算法演进

原文：[7. Embedding 有哪几种算法你了解过吗？](https://xiaolinnote.com/ai/rag/7_embedding_algos.html)。

- **B7-1** 核心思路是用一个词周围的词预测这个词，或反过来，通过大量文本训练让语义相近的词在向量空间里靠近：Word2Vec 有 CBOW 和 Skip-gram 两种训练方式，GloVe 对整个语料库的词共现矩阵做分解，FastText 把词拆成字符级 n-gram 子词，能估算没见过的新词。共同的局限是静态，每个词只有一个固定向量，“我吃了苹果”和“苹果手机发布了”里的“苹果”向量完全相同。[原文§第一代：静态词向量（Word2Vec / GloVe / FastText）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%80%E4%BB%A3-%E9%9D%99%E6%80%81%E8%AF%8D%E5%90%91%E9%87%8F-word2vec-glove-fasttext)
- **B7-2** 第二代让词的向量随上下文动态变化：ELMo 用双向 LSTM，同时从左往右和从右往左扫描句子，把两个方向的隐藏状态拼起来作为词的上下文向量；BERT 用 Transformer 替代 LSTM，引入 Masked Language Model 预训练任务，同时看到前后文，用 [CLS] token 表示整个句子，效果全面超越 ELMo。[原文§第二代：上下文相关向量（ELMo / BERT）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%BA%8C%E4%BB%A3-%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9B%B8%E5%85%B3%E5%90%91%E9%87%8F-elmo-bert)
- **B7-3** 要比较两个句子的相似度，必须把两个句子拼在一起喂给 BERT，让 [CLS] 来做判断；这意味着每次检索都要把查询和每一个候选 chunk 拼在一起跑一遍，百万条文档就要跑百万次，而一次前向传播要几十毫秒，百万次就是好几个小时，用户等不起。[原文§第二代：上下文相关向量（ELMo / BERT）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%BA%8C%E4%BB%A3-%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9B%B8%E5%85%B3%E5%90%91%E9%87%8F-elmo-bert)
- **B7-4** 核心是让每个句子独立生成一个向量，再用余弦相似度比较，训练目标是对比学习：SimCSE 把同一句话做两次 dropout 得到的两个向量作为正样本对拉近，把同一 batch 里其他句子的向量作为负样本推远，还缓解了 BERT 原生句向量挤在窄小锥形区域的各向异性问题；SBERT 用 bi-encoder 让两个句子分别独立编码，文档向量可以提前算好，检索时只算一次查询向量；BGE 基于对比学习在大规模中英文数据上训练。[原文§第三代：句子级对比学习 Embedding（SBERT / SimCSE / BGE）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%89%E4%BB%A3-%E5%8F%A5%E5%AD%90%E7%BA%A7%E5%AF%B9%E6%AF%94%E5%AD%A6%E4%B9%A0-embedding-sbert-simcse-bge)

### 补充考点

- **B7-5** 每一代方案解决一类问题的同时都暴露出新的短板：第一代处理不了多义词；第二代处理了多义词，但在检索场景下慢得无法实用；第三代才把语义检索做到既能用又好用，每一代都在补上一代的坑。[原文§为什么 Embedding 算法要一代代演进](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E4%B8%BA%E4%BB%80%E4%B9%88-embedding-%E7%AE%97%E6%B3%95%E8%A6%81%E4%B8%80%E4%BB%A3%E4%BB%A3%E6%BC%94%E8%BF%9B)
- **B7-6** CBOW 用周围词预测中心词，Skip-gram 用中心词预测周围词；Skip-gram 从一个词能产生多个训练样本，样本利用率更高，对低频词和生僻词更友好，所以更常作为默认选项，CBOW 在大数据集上收敛更快，两者最终效果比较接近。[原文§第一代：静态词向量（Word2Vec / GloVe / FastText）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%80%E4%BB%A3-%E9%9D%99%E6%80%81%E8%AF%8D%E5%90%91%E9%87%8F-word2vec-glove-fasttext)
- **B7-7** GloVe 由斯坦福提出，直接对整个语料库的词共现矩阵做分解，对全局统计信息的利用更充分；实际效果和 Word2Vec 差不多，很多场景两者可以互换。[原文§第一代：静态词向量（Word2Vec / GloVe / FastText）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%80%E4%BB%A3-%E9%9D%99%E6%80%81%E8%AF%8D%E5%90%91%E9%87%8F-word2vec-glove-fasttext)
- **B7-8** 它把词拆成字符级别的 n-gram 子词，每个子片段有自己的向量，一个词的向量是其子片段向量的平均；遇到没见过的新词，只要子片段见过，就还能估算出一个合理的向量。[原文§第一代：静态词向量（Word2Vec / GloVe / FastText）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%80%E4%BB%A3-%E9%9D%99%E6%80%81%E8%AF%8D%E5%90%91%E9%87%8F-word2vec-glove-fasttext)
- **B7-9** 静态：每个词只有一个固定向量，不管上下文如何，“我吃了苹果”和“苹果手机发布了”里的“苹果”向量完全相同；它只是记住了哪些词经常一起出现，离真正的语义理解还差得远。[原文§第一代：静态词向量（Word2Vec / GloVe / FastText）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%80%E4%BB%A3-%E9%9D%99%E6%80%81%E8%AF%8D%E5%90%91%E9%87%8F-word2vec-glove-fasttext)
- **B7-10** 两个句子分别独立编码，各自得到句子级向量，再用余弦相似度比较；代价是编码阶段看不到两句话 token 之间的交叉关系，在特别微妙的匹配上不如 Cross-Encoder；换来的是速度提升几个数量级，文档向量可以提前算好，检索时只算一次查询向量，毫秒级返回。[原文§第三代：句子级对比学习 Embedding（SBERT / SimCSE / BGE）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%89%E4%BB%A3-%E5%8F%A5%E5%AD%90%E7%BA%A7%E5%AF%B9%E6%AF%94%E5%AD%A6%E4%B9%A0-embedding-sbert-simcse-bge)
- **B7-11** 把同一句话做两次 dropout 得到两个不同的向量作为正样本对，同一 batch 里其他句子的向量作为负样本，不需要人工标注；它解决了 BERT 原生句向量的各向异性问题，即向量都挤在一个窄小的锥形区域里，通过对比学习把向量撑开，让语义空间更均匀。[原文§第三代：句子级对比学习 Embedding（SBERT / SimCSE / BGE）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%89%E4%BB%A3-%E5%8F%A5%E5%AD%90%E7%BA%A7%E5%AF%B9%E6%AF%94%E5%AD%A6%E4%B9%A0-embedding-sbert-simcse-bge)
- **B7-12** BGE 由北京智源研究院推出，是中文 RAG 场景非常流行的开源模型，基于对比学习在大规模中英文数据上训练，同时支持 bi-encoder 和 reranker 两种形态；E5 是微软推出的常用英文对比学习 Embedding，效果同样优秀。[原文§第三代：句子级对比学习 Embedding（SBERT / SimCSE / BGE）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%89%E4%BB%A3-%E5%8F%A5%E5%AD%90%E7%BA%A7%E5%AF%B9%E6%AF%94%E5%AD%A6%E4%B9%A0-embedding-sbert-simcse-bge)
- **B7-13** 指令感知 Embedding：模型根据检索指令动态调整向量，同一段文本在找相似问题和找答案两种意图下向量不同；Matryoshka 表示学习：向量的前 N 维就能表达有意义的语义，可以截断维度来平衡精度和存储；多模态 Embedding：同一个模型既能编码文本也能编码图片，支持跨模态检索。[原文§第三代：句子级对比学习 Embedding（SBERT / SimCSE / BGE）](https://xiaolinnote.com/ai/rag/7_embedding_algos.html#%E7%AC%AC%E4%B8%89%E4%BB%A3-%E5%8F%A5%E5%AD%90%E7%BA%A7%E5%AF%B9%E6%AF%94%E5%AD%A6%E4%B9%A0-embedding-sbert-simcse-bge)

## 8. 向量数据库

原文：[8. 什么是向量数据库？有没有做过向量数据库的对比选型？](https://xiaolinnote.com/ai/rag/8_vectordb.html)。

- **B8-1** 关系数据库擅长精确匹配，如 WHERE id = 123；向量数据库存储和检索的是 Embedding 模型把文本、图片、音频转成的向量，核心操作是近似最近邻搜索（ANN）：给一个查询向量，在库里找出最相似的 K 个向量并返回对应的原始内容，擅长的是语义相似。两者解决完全不同的问题，不是互相替代的关系。[原文§什么是向量数据库？](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B8-2** 向量检索不是找等于的，而是找最相近的，只有相似度排序：高维向量如果暴力遍历，百万条数据就要算一百万次相似度，延迟不可接受；B-tree 只能处理一维的有序索引，对要同时考虑多个维度距离的高维向量基本失效。向量数据库用专门的索引结构做近似最近邻搜索，在可接受的精度损失下把延迟降到毫秒级。[原文§为什么需要专门的向量数据库？](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%93%E9%97%A8%E7%9A%84%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B8-3** HNSW 构建多层图结构，查询时从最上层的稀疏图开始导航、逐层收窄，最终在底层找到最近邻，召回率高、查询快，但建索引时内存消耗大，内存占用和向量数量成正比，Qdrant、Milvus、Chroma 默认用它；IVF 先对向量聚类分桶，查询时只搜最相关的几个桶，内存占用小、适合超大规模，但精度略低，需要调聚类数量 nlist 和搜索桶数量 nprobe。[原文§核心索引算法：HNSW 和 IVF](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E6%A0%B8%E5%BF%83%E7%B4%A2%E5%BC%95%E7%AE%97%E6%B3%95-hnsw-%E5%92%8C-ivf)
- **B8-4** 已经在用 PostgreSQL、数据量不是特别大时，可以直接用 pgvector 插件，不用引入新组件，查询还能和业务数据做 SQL JOIN，运维成本为零，但性能弱于专用向量库；中小到大规模、想快速上线首选 Qdrant，数据在千万到亿级、需要分布式选 Milvus，不想运维且数据在云上用 Pinecone，但要注意数据出境的合规问题。[原文§选型建议](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E9%80%89%E5%9E%8B%E5%BB%BA%E8%AE%AE)
- **B8-5** 主要看数据规模、部署方式、是否需要混合检索三个维度：Chroma 零配置、上手最快，适合原型验证和中小规模，超大规模的稳定性不如专门方案；Qdrant 性能好、API 简洁，支持分布式，适合中大规模；Milvus 可水平扩展，适合千万到亿级，但部署运维复杂；Pinecone 是全托管云服务，无需运维但费用高、有数据出境问题；pgvector 是 PostgreSQL 插件，适合中小规模。[原文§选型建议](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E9%80%89%E5%9E%8B%E5%BB%BA%E8%AE%AE)

### 补充考点

- **B8-6** 是嵌入模型把文本、图片、音频等内容转换成的一串浮点数，例如一句话被转换成 768 维或 1024 维的数组；每个向量代表这段内容的语义含义，语义越相近的内容，向量在高维空间里的距离越近。[原文§什么是向量数据库？](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B8-7** 不是。MySQL 擅长精确匹配，例如按 id 等值查询；向量数据库擅长语义相似，找和某个意思最接近的内容。两者解决的是完全不同的问题，不是互相替代的关系。[原文§什么是向量数据库？](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B8-8** 暴力遍历要把查询向量和库里每一条都算一遍相似度，百万条就要算一百万次，延迟不可接受；B-tree 只能处理一维的有序索引，而“近”是高维空间里多个维度的综合判断，不是某一个维度上的排序，所以对高维向量基本失效。[原文§为什么需要专门的向量数据库？](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%93%E9%97%A8%E7%9A%84%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B8-9** 向量数据库可以给每个向量挂上 metadata 字段，检索时加过滤条件，只在符合条件的子集里搜索；如果先搜完再过滤，Top-K 里可能大部分都不满足条件，白白浪费检索名额，先过滤再搜索才能保证召回的每一条都是想要的。[原文§向量数据库的核心能力](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E6%A0%B8%E5%BF%83%E8%83%BD%E5%8A%9B)
- **B8-10** 可以。主流的向量数据库都支持在线写入，新数据进来后增量构建索引，支持新增、修改和删除，不需要停服重建。[原文§向量数据库的核心能力](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E6%A0%B8%E5%BF%83%E8%83%BD%E5%8A%9B)
- **B8-11** 纯向量检索对产品型号、专有名词这类精确词语效果不好；有些向量数据库同时支持向量检索和 BM25 关键词检索，做混合召回效果更好。[原文§向量数据库的核心能力](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E6%A0%B8%E5%BF%83%E8%83%BD%E5%8A%9B)
- **B8-12** 适合中小到大规模、团队小、要快速上线的场景：用 Rust 写成，性能稳，API 设计简洁、文档完善，Docker 一条命令就能部署；现在也支持分片加副本的分布式模式，已有亿级规模的生产案例。很多团队用 Chroma 做原型，上生产再切到 Qdrant。[原文§选型建议](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E9%80%89%E5%9E%8B%E5%BB%BA%E8%AE%AE)
- **B8-13** 它上手最快，pip 安装后本地内存运行、零配置，与 LangChain、LlamaIndex 原生集成，现在也支持 Client-Server 模式、云托管和 BM25/SPLADE 混合检索；但分布式能力还在成熟中，千万级以上的生产场景下稳定性和性能不如 Milvus 和 Qdrant，适合原型验证和中小规模使用。[原文§选型建议](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E9%80%89%E5%9E%8B%E5%BB%BA%E8%AE%AE)
- **B8-14** Milvus 适合千万到亿级、需要分布式的场景，国内大厂用得最多，支持多种索引类型和完整的集群方案，但部署运维复杂、需要足够人力；Pinecone 是全托管 SaaS，按用量付费，适合不想运维、快速验证商业化产品，但业务数据有合规要求时要注意数据出境问题。[原文§选型建议](https://xiaolinnote.com/ai/rag/8_vectordb.html#%E9%80%89%E5%9E%8B%E5%BB%BA%E8%AE%AE)
- **B8-15** 不要拿 GitHub Star 数量当选型依据，要把每个选项的适用场景和优劣势说清楚；另外至少要能讲清 HNSW 和 IVF 的区别与适用场景，这是向量数据库的核心技术。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/8_vectordb.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 9. 向量库性能案例

原文：[9. 讲讲你用的向量数据库？数据量级是多大？性能如何？遇到过性能瓶颈吗？](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html)。

- **B9-1** 要带上硬件和参数背景：原文的例子是约 150 万条 chunk、BGE-large-zh 生成的 1024 维向量、HNSW 索引（M=16，ef_construction=128），在单机 16 核 32G、本地千兆网、索引在内存、ef=100 的条件下，单次 top-5 查询 P50 约 20ms、P99 约 60ms，并发 100 QPS 时延迟基本稳定；同样是 Milvus，换成 8 核机、跨机房调用或 ef 设到 200，数字能差一个量级。[原文§数据规模和实测性能](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E6%95%B0%E6%8D%AE%E8%A7%84%E6%A8%A1%E5%92%8C%E5%AE%9E%E6%B5%8B%E6%80%A7%E8%83%BD)
- **B9-2** 先算原始向量：150 万条乘 1024 维乘 4 字节（float32）约 6GB，实际进程要 10 到 12GB，多出的部分是 HNSW 图结构、metadata、Collection 管理开销和操作系统缓存；缓解办法是开启标量量化（SQ8），把每个 float32 压成 int8，内存从约 10GB 降到约 3GB，召回率基本无损。[原文§数据规模和实测性能](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E6%95%B0%E6%8D%AE%E8%A7%84%E6%A8%A1%E5%92%8C%E5%AE%9E%E6%B5%8B%E6%80%A7%E8%83%BD)
- **B9-3** SQ8 把每个 float32 压缩成 int8，用 1 字节代替 4 字节，数据量缩到四分之一，原文案例里内存从 10GB 降到约 3GB；因为大部分语义信息在高位，截掉低位的精度损失极小，召回率通常只下降 1 个百分点以内，是最划算的优化。[原文§数据规模和实测性能](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E6%95%B0%E6%8D%AE%E8%A7%84%E6%A8%A1%E5%92%8C%E5%AE%9E%E6%B5%8B%E6%80%A7%E8%83%BD)
- **B9-4** 一次性写入几十万条新数据时，Milvus 后台会触发 Segment 合并，把多个小的增量 Segment 合并成大的封存 Segment 并建好索引，这个过程很耗 CPU 和磁盘 IO，期间查询的 P99 会从正常的 60ms 涨到 300ms 以上；解法一是错峰，把批量写入放到凌晨等业务低峰期，二是化整为零，每批控制在 500 到 1000 条、批次之间间隔几秒。[原文§遇到的性能瓶颈](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E9%81%87%E5%88%B0%E7%9A%84%E6%80%A7%E8%83%BD%E7%93%B6%E9%A2%88)

### 补充考点

- **B9-5** 向量没法用等值条件查询，只能算距离找最近的 K 个；库里有 100 万条时逐一算距离是 O(N)，太慢。向量数据库通过索引，最常用的是 HNSW，把查询时间压缩到接近 O(log N)，用少量精度损失换来极大的速度提升。[原文§先搞清楚：向量数据库是干什么的？](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E5%85%88%E6%90%9E%E6%B8%85%E6%A5%9A-%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93%E6%98%AF%E5%B9%B2%E4%BB%80%E4%B9%88%E7%9A%84)
- **B9-6** 数据量级上去之后单机已经撑不住，需要分布式部署；同时知识库每天都有增量更新，读写分离能让写入不影响查询服务的稳定性。Milvus 是功能最全、扩展性最强的开源选项，适合百万到十亿级别、并发查询量大的生产场景。[原文§为什么选 Milvus？](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89-milvus)
- **B9-7** Collection 类似关系数据库里的表，存一类向量数据，每条记录包含 chunk 的 ID、向量、原文和来源等 metadata；Segment 是内部管理数据的基本单位，新写入的数据先进增量段，积累到一定量后合并成建好索引的封存段，合并本身会消耗 CPU 和磁盘。[原文§Milvus 的核心概念](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#milvus-%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
- **B9-8** M 是每个节点最多连接几个邻居，越大图越密、精度越高，但建索引的内存和时间越多，通常设 16 到 32；ef_construction 是建图时每个节点考察多少候选，越大越精确但建索引越慢，通常 100 到 200；ef 是查询时搜索的候选集大小，越大召回越准、延迟越高，一般在 50 到 200 之间调。[原文§Milvus 的核心概念](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#milvus-%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
- **B9-9** 知识库约 150 万条 chunk，用 BGE-large-zh 生成 1024 维向量，HNSW 索引；纯向量约 150 万乘 1024 维乘 4 字节，约 6GB，Milvus 进程完整运行要 10 到 12GB，多出来的是 HNSW 图结构、metadata、Collection 管理开销和操作系统缓存。[原文§数据规模和实测性能](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E6%95%B0%E6%8D%AE%E8%A7%84%E6%A8%A1%E5%92%8C%E5%AE%9E%E6%B5%8B%E6%80%A7%E8%83%BD)
- **B9-10** 机器只有 8GB 内存，Milvus 把向量索引加载进内存后留给操作系统的空间很小，稍有压力就频繁 swap，查询延迟从 20ms 飙到 2 秒以上；问题不在索引算法而在内存不够。解法是开 SQ8 量化把内存降到 3GB 左右，并用 mmap 把原始向量放在磁盘上、只把索引放内存。[原文§遇到的性能瓶颈](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E9%81%87%E5%88%B0%E7%9A%84%E6%80%A7%E8%83%BD%E7%93%B6%E9%A2%88)
- **B9-11** 一是时间上错峰，把批量写入改到凌晨等业务低峰期，让 Segment 合并在用户不活跃时完成；二是化整为零，每批写入控制在 500 到 1000 条以内，分多批写、每批间隔几秒，把一次大冲击变成多次小冲击。案例中合并期间 P99 会从 60ms 涨到 300ms 以上。[原文§遇到的性能瓶颈](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%E9%81%87%E5%88%B0%E7%9A%84%E6%80%A7%E8%83%BD%E7%93%B6%E9%A2%88)
- **B9-12** 不能只说用了某个库、感觉挺快：先说清技术选型及原因，例如数据量到了百万级需要分布式部署和读写分离；再给出具体的数据量级和性能指标，如向量条数和维度、索引类型、P50 和 P99 延迟、并发下是否稳定；最后讲踩过的坑和解法。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/9_vectordb_practice.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 10. 在线 RAG 流程

原文：[10. 你使用 RAG 给大模型一个输入，系统是怎样的工作流程？](https://xiaolinnote.com/ai/rag/10_online_workflow.html)。

- **B10-1** 用户原始提问的质量决定了后续所有环节的天花板：提问往往口语化、带指代，如“上次那个方案怎么样”，离开对话上下文没法检索，即使表达清楚，用词也可能和知识库文档不一样。所以先让一个小模型改写：简单改写成正式、独立完整的检索句；HyDE，先让 LLM 假设一个答案，用假设答案的向量去检索；多角度扩写，扩展成 3 到 5 种表述分别检索后合并。[原文§第一步：Query 预处理（Query Rewrite）](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-query-%E9%A2%84%E5%A4%84%E7%90%86-query-rewrite)
- **B10-2** 向量检索是粗排，召回的 Top-K 里会混入相关度不高的干扰片段；Rerank 模型是 Cross-Encoder 结构，把问题和每个候选片段拼在一起输入，深度理解匹配程度后重新打分，只保留 Top-3 到 Top-5。它不能直接用来检索，因为要把查询和每个候选都过一遍模型，计算量大，对百万条数据逐一算分延迟不可接受，所以采用粗排筛到几十条、精排再挑几条的两阶段策略。[原文§第四步：Rerank 精排](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E5%9B%9B%E6%AD%A5-rerank-%E7%B2%BE%E6%8E%92)
- **B10-3** 把精排后的片段和用户原始问题组装成 Prompt：要求只根据参考资料回答，抑制大模型凭记忆发挥的倾向；要求资料里没有相关信息就回答“根据现有资料无法回答”，防止信息不足时强行补全出幻觉；参考资料带上编号，方便后续做引用溯源，让用户知道每句话的依据是什么。[原文§第五步：Prompt 拼装](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%BA%94%E6%AD%A5-prompt-%E6%8B%BC%E8%A3%85)

### 补充考点

- **B10-4** 大模型的上下文窗口有限，不可能塞进整个知识库；没有外部知识依据时只靠参数记忆回答，容易出现幻觉。所以在线流程本质是一个精准取件的过程：从海量知识里找到与问题最相关的几段，再让大模型在这个小范围里作答。[原文§为什么不能直接把问题扔给大模型](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E7%9B%B4%E6%8E%A5%E6%8A%8A%E9%97%AE%E9%A2%98%E6%89%94%E7%BB%99%E5%A4%A7%E6%A8%A1%E5%9E%8B)
- **B10-5** 用户原始提问的质量决定了后续所有环节的天花板：输入差，后面怎么精排、怎么拼 Prompt 都没用；提问往往口语化、带指代，而且用词可能和知识库文档的用词完全不同，直接检索命中率很低。[原文§第一步：Query 预处理（Query Rewrite）](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-query-%E9%A2%84%E5%A4%84%E7%90%86-query-rewrite)
- **B10-6** HyDE 让 LLM 先假设一个可能的答案，再用这个假设答案的向量去检索；因为问题和答案的用词往往差异很大，而假设答案和真实答案的用词更接近，语义空间天然更匹配，命中率往往更高。[原文§第一步：Query 预处理（Query Rewrite）](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-query-%E9%A2%84%E5%A4%84%E7%90%86-query-rewrite)
- **B10-7** 不同模型的训练数据、目标函数、输出维度和向量空间的形状都不一样，甚至维度都对不上；用 A 模型建的库拿 B 模型来查，两边的向量像在不同的坐标系里，距离计算没有意义。所以一旦更换 Embedding 模型，整个知识库必须重建。[原文§第二步：Query Embedding（问题向量化）](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%BA%8C%E6%AD%A5-query-embedding-%E9%97%AE%E9%A2%98%E5%90%91%E9%87%8F%E5%8C%96)
- **B10-8** 向量检索捕获语义相似，但对产品型号、专有名词、错误拼写这类精确词语识别较弱；BM25 全文检索对关键词精确匹配更在行。两路各有所长，结果通过 RRF 互倒排名融合算法合并，覆盖面比单路更广、质量更高。[原文§第三步：向量检索（ANN 搜索）+ 多路召回](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2-ann-%E6%90%9C%E7%B4%A2-%E5%A4%9A%E8%B7%AF%E5%8F%AC%E5%9B%9E)
- **B10-9** 大模型即使有参考资料，仍可能过度发挥或误读资料；要求它在答案里标注每句话来自哪个片段，用户就能追溯到原始文档验证答案，判断哪些内容可靠、哪些需要再确认。[原文§第六步：大模型生成 + 溯源](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E5%85%AD%E6%AD%A5-%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%94%9F%E6%88%90-%E6%BA%AF%E6%BA%90)
- **B10-10** Query 改写几十毫秒，向量检索几十毫秒，Rerank 几百毫秒，Prompt 组装可忽略，大模型生成按输出长度在 1 到 10 秒不等；常见优化是缓存高频 Query 的检索结果，以及把向量检索和 BM25 检索并行执行，把两路延迟从串行叠加变成取最大值。[原文§第六步：大模型生成 + 溯源](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E5%85%AD%E6%AD%A5-%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%94%9F%E6%88%90-%E6%BA%AF%E6%BA%90)
- **B10-11** Query 改写几十毫秒，向量检索几十毫秒，Rerank 几百毫秒，Prompt 组装可忽略；常见优化是缓存高频 Query 的检索结果，以及把向量检索和 BM25 检索并行执行，把两路延迟从串行叠加变成取最大值。[原文§第六步：大模型生成 + 溯源](https://xiaolinnote.com/ai/rag/10_online_workflow.html#%E7%AC%AC%E5%85%AD%E6%AD%A5-%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%94%9F%E6%88%90-%E6%BA%AF%E6%BA%90)

## 11. 关键词与向量检索

原文：[11. 请你介绍一下向量检索和关键词检索的区别？](https://xiaolinnote.com/ai/rag/11_retrieval_types.html)。

- **B11-1** BM25 靠倒排索引做字面匹配：倒排索引记录每个词出现在哪些文档里；打分主要看词频（TF），词在文档里出现越多越相关，和稀缺度（IDF），给“的”“是”这类常见词降权、给罕见词加权，并在 TF-IDF 的基础上加饱和度限制，防止某个词重复太多次后权重无限叠加。它对精确词汇命中率极高，擅长产品型号、专有名词、缩写这类查询，但遇到同义词就束手无策。[原文§关键词检索：字面匹配，靠统计](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%85%B3%E9%94%AE%E8%AF%8D%E6%A3%80%E7%B4%A2-%E5%AD%97%E9%9D%A2%E5%8C%B9%E9%85%8D-%E9%9D%A0%E7%BB%9F%E8%AE%A1)
- **B11-2** 向量检索先用 Embedding 模型把文本转成高维向量，语义相近的文本坐标靠近，查询也转成向量后用近似最近邻算法找最近的 Top-K 条；它能跨越同义词、近义词和不同表达方式的障碍，例如“苹果手机怎么截图”和“iPhone 如何截屏”一个字都不同，余弦相似度却可高达 0.95，而 BM25 因为没有词汇重叠会直接漏掉。[原文§向量检索：语义匹配，靠 Embedding](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2-%E8%AF%AD%E4%B9%89%E5%8C%B9%E9%85%8D-%E9%9D%A0-embedding)
- **B11-3** 向量检索对精确词汇不敏感：产品型号“Pro Max 256GB”、人名、版本号这类词，在 Embedding 空间里彼此的距离可能并不近，容易被混淆在一起，反而不如 BM25 直接命中准确；所以像“M4 Pro 芯片参数”这类精确专有名词查询，向量检索天然不擅长，两种方式的盲区恰好互补。[原文§向量检索：语义匹配，靠 Embedding](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2-%E8%AF%AD%E4%B9%89%E5%8C%B9%E9%85%8D-%E9%9D%A0-embedding)
- **B11-4** 混合检索同时跑向量检索和 BM25，各自召回一批候选，再用 RRF（互倒排名融合）合并排序；RRF 不看各路的原始分数，只看排名，因为余弦相似度和 BM25 分数量纲不同、不能直接加权平均，它用排名的倒数打分再按总分降序，两路都认为相关的文档排最前，只有一路认为相关的也不会被丢掉。两路检索可以并行，总延迟取两路中的较大值。[原文§混合检索：两路都跑，合并取长补短](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E6%B7%B7%E5%90%88%E6%A3%80%E7%B4%A2-%E4%B8%A4%E8%B7%AF%E9%83%BD%E8%B7%91-%E5%90%88%E5%B9%B6%E5%8F%96%E9%95%BF%E8%A1%A5%E7%9F%AD)

### 补充考点

- **B11-5** 一种是字面意义上的词汇重叠，一种是语义层面的意思接近；关键词检索和向量检索分别对应这两种理解，各有各的擅长和盲区，检索并不等于搜关键词。[原文§检索要解决的核心问题](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E6%A3%80%E7%B4%A2%E8%A6%81%E8%A7%A3%E5%86%B3%E7%9A%84%E6%A0%B8%E5%BF%83%E9%97%AE%E9%A2%98)
- **B11-6** 它记录的不是每篇文档里有哪些词，而是反过来记录每个词出现在哪些文档里；查询时把包含各个查询词的文档挑出来，同时命中且词频高的排在前面。BM25 是 Elasticsearch、Lucene 等传统搜索引擎的核心算法，就建立在它之上。[原文§关键词检索：字面匹配，靠统计](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%85%B3%E9%94%AE%E8%AF%8D%E6%A3%80%E7%B4%A2-%E5%AD%97%E9%9D%A2%E5%8C%B9%E9%85%8D-%E9%9D%A0%E7%BB%9F%E8%AE%A1)
- **B11-7** “的”“是”“在”这类词在哪篇文章里都高频出现，只看词频的话每篇文档都会拿高分，无法区分；IDF 给常见词降权、给罕见词加权，让真正有区分力的词决定排序结果。BM25 还在 TF-IDF 的基础上加了饱和度限制，防止某个词重复太多次后权重无限叠加。[原文§关键词检索：字面匹配，靠统计](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%85%B3%E9%94%AE%E8%AF%8D%E6%A3%80%E7%B4%A2-%E5%AD%97%E9%9D%A2%E5%8C%B9%E9%85%8D-%E9%9D%A0%E7%BB%9F%E8%AE%A1)
- **B11-8** 遇到同义词就束手无策：用户查“手机截图”，文档写的是“iPhone 截屏教程”，没有任何词汇重叠，分数为零，这篇最相关的文档会被直接忽略。[原文§关键词检索：字面匹配，靠统计](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E5%85%B3%E9%94%AE%E8%AF%8D%E6%A3%80%E7%B4%A2-%E5%AD%97%E9%9D%A2%E5%8C%B9%E9%85%8D-%E9%9D%A0%E7%BB%9F%E8%AE%A1)
- **B11-9** 向量检索和 BM25 两路可以并行执行，总延迟取两路中的最大值而不是两者相加，召回质量却比单路明显更好；所以生产环境的 RAG 很少只用纯向量检索，混合检索已是行业默认做法。[原文§混合检索：两路都跑，合并取长补短](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E6%B7%B7%E5%90%88%E6%A3%80%E7%B4%A2-%E4%B8%A4%E8%B7%AF%E9%83%BD%E8%B7%91-%E5%90%88%E5%B9%B6%E5%8F%96%E9%95%BF%E8%A1%A5%E7%9F%AD)
- **B11-10** 向量相似度是 0 到 1 的余弦值，BM25 分数可能是任意正数，量纲完全不同，直接相加没有意义；RRF 用排名的倒数打分，两路都认为相关的文档排在最前面，只有一路认为相关的也不会被完全丢掉。[原文§混合检索：两路都跑，合并取长补短](https://xiaolinnote.com/ai/rag/11_retrieval_types.html#%E6%B7%B7%E5%90%88%E6%A3%80%E7%B4%A2-%E4%B8%A4%E8%B7%AF%E9%83%BD%E8%B7%91-%E5%90%88%E5%B9%B6%E5%8F%96%E9%95%BF%E8%A1%A5%E7%9F%AD)

## 12. Query Rewrite

原文：[12. 如何润色用户的 Query（Query Rewrite）？目的是什么？](https://xiaolinnote.com/ai/rag/12_query_rewrite.html)。

- **B12-1** 用户和文档写作者之间有一道表述鸿沟：用户问“这东西坏了咋整”，文档写的是“产品故障排查与维修指南”，即便语义相关，口语和书面语在向量空间里的坐标差距不小，相似度可能低到召回不了正确文档；Query Rewrite 就是在检索之前先对问题做加工，让它在向量空间里离正确文档更近。[原文§为什么需要 Query Rewrite](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-query-rewrite)
- **B12-2** 直接改写把口语化、模糊的问题改写成更精准、更书面化的检索表述，消除口语表达和书面知识库之间的向量距离，同时结合对话历史补全上下文、处理代词指代，例如把“上次说的那个退款的事，流程是啥”改成“申请商品退款的完整操作流程是什么”；它解决不了文体差异，问题改得再规范仍是问句的坐标，而文档是陈述句，这催生了 HyDE。[原文§方法一：直接改写（Query Rewriting）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%B8%80-%E7%9B%B4%E6%8E%A5%E6%94%B9%E5%86%99-query-rewriting)
- **B12-3** 因为问题和文档是不同的文体，在向量空间里，答案到答案的距离比问题到答案的距离近得多；HyDE 先让 LLM 根据问题生成一段假设性的答案，再用它的向量去检索，假设答案不需要准确，只需要风格像文档，它的作用不是回答问题，而是扮演文档的角色、充当更好的检索代理。例如“用户可在购买后 14 天内申请退款”这样的假设答案，比“退款政策是什么”离退款须知文档更近。[原文§方法二：HyDE（Hypothetical Document Embeddings）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%BA%8C-hyde-hypothetical-document-embeddings)
- **B12-4** 适合问题太具体、知识库里没有直接对应的答案，但有相关背景原理文档的情况；做法是把具体问题后退一步，转化成更抽象的背景问题，先检索背景知识，再结合背景知识回答具体问题，例如把“Qdrant 的 HNSW ef 参数设多少合适”后退成“HNSW 索引的参数调优原则是什么”。[原文§方法三：Step-back Prompting（后退提问）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%B8%89-step-back-prompting-%E5%90%8E%E9%80%80%E6%8F%90%E9%97%AE)

### 补充考点

- **B12-5** 本质是消除口语化表达和书面知识库表述之间的向量距离，把口语问题的向量拉近到文档的表述；同时可以补全上下文、处理代词指代，例如把“这个功能”改写成具体的功能名称，让多轮对话里的模糊引用变成检索可识别的词。[原文§方法一：直接改写（Query Rewriting）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%B8%80-%E7%9B%B4%E6%8E%A5%E6%94%B9%E5%86%99-query-rewriting)
- **B12-6** 不需要准确，只需要风格像文档：它的作用是充当一个在向量上更好的检索代理，先描绘出答案可能的样子，再去找长得像它的文档。[原文§方法二：HyDE（Hypothetical Document Embeddings）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%BA%8C-hyde-hypothetical-document-embeddings)
- **B12-7** 具体问题“某向量库的 HNSW ef 参数设多少合适”在知识库里可能没有直接答案，后退成“HNSW 索引的参数调优原则是什么”之后，能命中更多通用背景文档，让 LLM 生成有原理支撑的答案。[原文§方法三：Step-back Prompting（后退提问）](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E4%B8%89-step-back-prompting-%E5%90%8E%E9%80%80%E6%8F%90%E9%97%AE)
- **B12-8** 用 LLM 把原始问题改写成 3 到 5 个不同角度的版本分别检索，再合并去重，只要有一个版本和文档表述对上就能召回；适合用户提问风格多变、和文档表述差异大的场景，代价是多几次 LLM 调用。[原文§方法四：多 Query 扩展](https://xiaolinnote.com/ai/rag/12_query_rewrite.html#%E6%96%B9%E6%B3%95%E5%9B%9B-%E5%A4%9A-query-%E6%89%A9%E5%B1%95)

## 13. 多路召回

原文：[13. 什么是多路召回？具体怎么做？](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html)。

- **B13-1** 因为单一路径的盲区是固有的，取再多也补不上：只靠向量检索，对精确词语的召回效果差，“M4 Pro”这样的专有名词不如关键词匹配准，换更好的 Embedding 模型也解决不了；只靠 BM25，对同义词和不同表达无能为力，“怎么退货”召回不到“申请售后”。两种方式的盲区恰好互补，这是多路召回的出发点。[原文§为什么单路召回不够用?](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8D%95%E8%B7%AF%E5%8F%AC%E5%9B%9E%E4%B8%8D%E5%A4%9F%E7%94%A8)
- **B13-2** 向量检索负责语义层面的覆盖，处理同义词、近义词和不同表达方式，例如“退货”和“申请售后”能互相命中；BM25 关键词检索负责精确词匹配，处理产品型号、专有名词、数字这类向量检索搞不定的场景；多 Query 扩展把问题改写成多个不同角度的版本，覆盖更多表述差异。三路各自召回后用 RRF 融合，再送进 Rerank 精排。[原文§什么是多路召回？](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%A4%9A%E8%B7%AF%E5%8F%AC%E5%9B%9E)
- **B13-3** 各路分数单位不同，向量检索是余弦相似度，BM25 是 TF-IDF 类分数，归一化后加权效果也不稳定；RRF 只用排名不用原始分数：每个文档在每一路的得分是 1/(k+rank)，k 是平滑参数、通常取 60，各路相加得到综合分，在多路里都排名靠前的文档综合分就高。它不需要训练、计算量极小，工程落地成本很低。[原文§结果融合：RRF 算法](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E7%BB%93%E6%9E%9C%E8%9E%8D%E5%90%88-rrf-%E7%AE%97%E6%B3%95)
- **B13-4** RRF 本质上还是粗排，适合在 Rerank 之前做候选集合并；如果对最终召回精度要求很高，还要在 RRF 融合之后接一个 Cross-Encoder 结构的精排模型（如 bge-reranker-v2-m3）做深度打分，把真正相关的内容筛到最前。[原文§结果融合：RRF 算法](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E7%BB%93%E6%9E%9C%E8%9E%8D%E5%90%88-rrf-%E7%AE%97%E6%B3%95)

### 补充考点

- **B13-5** 多路召回是同时用多种不同的检索方式捞候选内容，再把各路结果合并、排序后交给 LLM；单路召回只用一种方式，最典型的是只用向量检索取 Top-K 直接喂给 LLM，能跑起来但有明显的天花板，因为没有任何一种检索方式是全能的。[原文§什么是多路召回？](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%A4%9A%E8%B7%AF%E5%8F%AC%E5%9B%9E)
- **B13-6** 不能。这是向量检索只看语义、不看字面的固有局限，不管用哪个模型都存在；例如“M4 Pro”这样的专有名词，向量模型可能把它和“苹果最新处理器”拉得很近，却不如关键词匹配准。调大 top-K 或换模型都不是治本之策。[原文§为什么单路召回不够用?](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8D%95%E8%B7%AF%E5%8F%AC%E5%9B%9E%E4%B8%8D%E5%A4%9F%E7%94%A8)
- **B13-7** 需要先做分词，例如用 jieba 切词：对每个 chunk 切词后建索引，查询时同样切词再计算 BM25 分数排序；它是纯文本匹配，速度极快，对精确词语、数字和专有名词的召回效果很好。[原文§第二路：BM25 关键词检索（Sparse Retrieval）](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E7%AC%AC%E4%BA%8C%E8%B7%AF-bm25-%E5%85%B3%E9%94%AE%E8%AF%8D%E6%A3%80%E7%B4%A2-sparse-retrieval)
- **B13-8** 用户提问的角度和文档表述的角度不一致，这不是同义词能解决的，例如用户问“产品多久能送到”，文档写的是“配送时效说明”，向量相似度不高，BM25 也匹配不到；多个角度的改写版本分别检索，在提问风格多变的场景下召回覆盖率能提升 10% 到 20%。[原文§第三路：多 Query 扩展召回](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E7%AC%AC%E4%B8%89%E8%B7%AF-%E5%A4%9A-query-%E6%89%A9%E5%B1%95%E5%8F%AC%E5%9B%9E)
- **B13-9** 知识库里有大量专有名词、产品型号和数字的场景，如电商、IT 文档，向量加 BM25 双路是标配；用户提问方式多变、与文档表述差异大的场景，如客服问答，再加多 Query 扩展；对召回质量要求极高时三路全上，最后接 Rerank 精排。[原文§实战建议](https://xiaolinnote.com/ai/rag/13_multi_retrieval.html#%E5%AE%9E%E6%88%98%E5%BB%BA%E8%AE%AE)

## 14. 检索优化

原文：[14. RAG 检索优化策略有哪些？](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html)。

- **B14-1** 索引层要解决检索粒度和阅读粒度的矛盾：检索需要语义聚焦的小 chunk，LLM 阅读需要上下文完整的大 chunk；思路是 Small-to-Big，小块检索、大块使用，有三种实现：Parent-Child Chunking，只给子 chunk 建向量索引，命中后按 parent_id 取父 chunk；摘要索引，用 LLM 为每段生成摘要建索引，命中后给原始段落；多粒度分层索引，同时建章节级、段落级、句子级索引，按问题类型选粒度。[原文§第一层：索引优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96)
- **B14-2** 查询层在检索前先加工 query，让它在向量空间里离正确文档更近，主要有四种方法：Query 改写，用 LLM 把口语化、有歧义的 query 改成正式精准的表达并补全指代；多 Query 扩展，把一个问题扩展成 3 到 5 个不同角度的问法分别检索后合并去重，原始问题要保留；HyDE，用假设答案的向量去检索，假设方向错了会把检索带偏；Step-back，把具体问题抽象成背景问题先检索背景知识。[原文§第二层：查询优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96)
- **B14-3** 只走一条检索路径会漏内容：向量检索只擅长语义相似，对“M4 Pro”这样的精确词匹配差，BM25 只会数词频、不理解语义；所以多路并行召回，再用 RRF 融合：不看原始分数只看排名，每个 chunk 的综合分是各路 1/(k+rank) 之和，k 通常取 60，起保底分的作用。RRF 实现简单、不需要训练、计算量极小。[原文§第三层：召回优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%89%E5%B1%82-%E5%8F%AC%E5%9B%9E%E4%BC%98%E5%8C%96)

### 补充考点

- **B14-4** LLM 只能根据送进去的 context 回答，检索召回的内容就是整个系统的天花板：检索没把相关内容找回来，生成层做得再好也是巧妇难为无米之炊；调 prompt、换模型这类生成层优化是锦上添花，检索层优化才是从根本上提升能力上限。[原文§检索是 RAG 的命脉](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E6%A3%80%E7%B4%A2%E6%98%AF-rag-%E7%9A%84%E5%91%BD%E8%84%89)
- **B14-5** 索引层决定仓库里放了什么，即知识怎么存；查询层决定用什么钥匙开门，在检索前加工用户的 query；召回层决定从哪几扇门进去找，用多条检索路径并行捞取候选；重排序层决定把找到的东西里最好的几件带出来。四层是递进关系。[原文§四层优化全貌](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E5%9B%9B%E5%B1%82%E4%BC%98%E5%8C%96%E5%85%A8%E8%B2%8C)
- **B14-6** 一是检索时被找到，要求向量语义尽量聚焦，需要小粒度；二是被 LLM 读懂，要求有完整的上下文，需要大粒度。小 chunk 检索准但内容太碎，大 chunk 内容完整但检索时语义被稀释，这是两难；解决思路是 Small-to-Big，小块检索、大块使用。[原文§第一层：索引优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96)
- **B14-7** 它不切割文档，而是让 LLM 为每段内容生成摘要，用摘要建向量索引；原文有时表述很散，摘要是对核心意思的提炼，语义更聚焦，在向量空间里和用户问题更接近，命中率更高。检索时用摘要向量匹配，命中后把原始段落交给 LLM。[原文§第一层：索引优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96)
- **B14-8** 同时建章节级、段落级、句子级三层索引：宽泛的概念性问题用章节级就够，细节性问题用句子级更精准；系统根据问题类型自动选择合适的粒度去检索，覆盖更多类型的用户需求。[原文§第一层：索引优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96)
- **B14-9** 原始问题本身一定要保留在检索列表里，不能只用改写版本：改写过程中可能丢失一些原始细节，原始问题反而最精准。[原文§第二层：查询优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96)
- **B14-10** 如果 LLM 生成的假设答案方向错了，反而会把检索带偏；所以它一般在知识库领域比较明确的场景下效果更稳定。[原文§第二层：查询优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96)
- **B14-11** k 相当于加一个保底分，不让排名靠后的候选因为偶尔失误就被完全淘汰；取 60 是实践中发现效果最稳定的经验值。[原文§第三层：召回优化](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E4%B8%89%E5%B1%82-%E5%8F%AC%E5%9B%9E%E4%BC%98%E5%8C%96)
- **B14-12** 候选可能有 20 到 30 个，难免混入不太相关的内容：一是 token 消耗暴涨，成本直线上升；二是上下文太长，LLM 容易出现 Lost in the Middle，只关注开头和结尾、忽略中间。所以要用 Rerank 从中挑出最相关的 3 到 5 个。[原文§第四层：重排序](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E5%9B%9B%E5%B1%82-%E9%87%8D%E6%8E%92%E5%BA%8F)
- **B14-13** Bi-encoder 让 query 和 chunk 各自独立编码成向量再算余弦相似度，chunk 向量可提前算好，速度极快，但看不到两段文字之间的具体词语关联；Cross-encoder 把 query 和 chunk 拼成一对整体判断，精度远高于前者，但每个候选都要单独跑一次，只适合对小规模候选集做精排。[原文§第四层：重排序](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E5%9B%9B%E5%B1%82-%E9%87%8D%E6%8E%92%E5%BA%8F)
- **B14-14** 开源的有 BAAI 出品、中英双语效果都很好的 BGE-Reranker-v2，以及 BCE-Reranker；不想自己部署可以用 Cohere Rerank 或 Jina Reranker 的 API。加了 Rerank 之后最终答案质量通常有明显提升，是成本效益最高的优化手段之一。[原文§第四层：重排序](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E7%AC%AC%E5%9B%9B%E5%B1%82-%E9%87%8D%E6%8E%92%E5%BA%8F)
- **B14-15** 不需要全部都上，按业务场景和症状选择；典型的生产级搭配是 Parent-Child 索引、向量加 BM25 多路召回、再加 Rerank 精排，基本能覆盖大多数检索质量问题；用户提问质量较差，如口语化、指代不清时，再额外加上 Query 改写。[原文§四层优化怎么组合](https://xiaolinnote.com/ai/rag/14_retrieval_opt.html#%E5%9B%9B%E5%B1%82%E4%BC%98%E5%8C%96%E6%80%8E%E4%B9%88%E7%BB%84%E5%90%88)

## 15. RAG 范式

原文：[15. 了解哪些更复杂的 RAG 范式？](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html)。

- **B15-1** Naive RAG 是提问、向量检索、拼 Prompt、生成的直连流程，不做优化；Advanced RAG 在检索前加 Query 改写与扩展、检索后加 Rerank 与压缩，但流程固定；Modular RAG 把各环节拆成可替换模块按需组合。[原文§三代 RAG 的演进](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#%E4%B8%89%E4%BB%A3-rag-%E7%9A%84%E6%BC%94%E8%BF%9B)
- **B15-2** 原文称它用专门微调的 LLM 输出四类 reflection token，分别判断是否需要检索、chunk 是否相关、答案有无文档支撑、是否有用；逐条评估 chunk 并各自生成候选，再按支撑度和有用性选最优。[原文§Self-RAG：LLM 自己决定要不要检索](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#self-rag-llm-%E8%87%AA%E5%B7%B1%E5%86%B3%E5%AE%9A%E8%A6%81%E4%B8%8D%E8%A6%81%E6%A3%80%E7%B4%A2)
- **B15-3** 检索后由轻量评估器判断相关程度并三级路由：相关则用本地结果，不相关则丢弃并降级到网络搜索，模糊则合并两者；阈值需按业务调。[原文§CRAG（Corrective RAG）：检索质量差时自动纠错](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#crag-corrective-rag-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6%E8%87%AA%E5%8A%A8%E7%BA%A0%E9%94%99)
- **B15-4** 适合需要全局理解或跨文档关联的问题，如文档集的核心主题、企业间关联；它预先抽取实体关系、做社区发现并生成层次摘要，全局问题用 Map-Reduce 汇总各社区摘要。[原文§GraphRAG：用知识图谱增强全局理解](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#graphrag-%E7%94%A8%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1%E5%A2%9E%E5%BC%BA%E5%85%A8%E5%B1%80%E7%90%86%E8%A7%A3)
- **B15-5** 复杂问题无法预先确定检索几次、搜什么，需要由 LLM 按中间结果决定追加检索、验证矛盾或分步检索；用最大迭代次数防止死循环。[原文§Agentic RAG：把 RAG 做成 Agent](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#agentic-rag-%E6%8A%8A-rag-%E5%81%9A%E6%88%90-agent)

### 补充考点

- **B15-6** 范式就是一套固定的处理流程和设计思路；RAG 范式指从用户提问到生成答案这整条链路上各个环节的组织方式和工作逻辑，不同范式都在回答同一个问题：检索和生成之间，系统应该怎么协调、怎么决策、怎么处理中间的异常情况。[原文§什么是 RAG 范式？](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#%E4%BB%80%E4%B9%88%E6%98%AF-rag-%E8%8C%83%E5%BC%8F)
- **B15-7** 一是检索质量参差不齐，系统不区分好坏，一律把检索结果喂给 LLM，LLM 会在低质量上下文上胡说；二是所有问题都走同一套流程，不需要检索的也去检索，需要多轮检索的也只检索一次；三是知识库覆盖有盲区，找不到内容时要么编造、要么答非所问。[原文§为什么需要不同的 RAG 范式？](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%8D%E5%90%8C%E7%9A%84-rag-%E8%8C%83%E5%BC%8F)
- **B15-8** 它在检索前加 Query 改写和扩展，在检索后加 Rerank 精排和内容压缩，减少喂给 LLM 的噪音；不用改框架，只需在原有流程上插入几个步骤，工程改动小、效果提升明显。[原文§三代 RAG 的演进](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#%E4%B8%89%E4%BB%A3-rag-%E7%9A%84%E6%BC%94%E8%BF%9B)
- **B15-9** 四种 reflection token 不是现成 LLM 自带的，需要在专门构造的数据集上对基础 LLM 做监督微调，把它们作为新词表的一部分训练进去；所以不能拿一个通用模型直接套用，要么用论文开源的微调版本，要么自己造数据微调，这是它和可以直接在通用 LLM 上运行的 CRAG、Agentic RAG 很不一样的地方。[原文§Self-RAG：LLM 自己决定要不要检索](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#self-rag-llm-%E8%87%AA%E5%B7%B1%E5%86%B3%E5%AE%9A%E8%A6%81%E4%B8%8D%E8%A6%81%E6%A3%80%E7%B4%A2)
- **B15-10** 不需要检索的问题直接回答，省掉检索开销；检索结果不相关时能识别出来，避免基于错误上下文生成幻觉。[原文§Self-RAG：LLM 自己决定要不要检索](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#self-rag-llm-%E8%87%AA%E5%B7%B1%E5%86%B3%E5%AE%9A%E8%A6%81%E4%B8%8D%E8%A6%81%E6%A3%80%E7%B4%A2)
- **B15-11** 核心价值在于兜底：知识库覆盖不到的问题不会直接乱答，而是自动去网上找答案，大幅提升系统的健壮性；它把知识库当主力、网络搜索当备胎，打破了 RAG 只能用本地知识库回答的限制。[原文§CRAG（Corrective RAG）：检索质量差时自动纠错](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#crag-corrective-rag-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6%E8%87%AA%E5%8A%A8%E7%BA%A0%E9%94%99)
- **B15-12** 先用 LLM 从文档里抽取实体和关系建成知识图谱，再用 Leiden 等社区发现算法把紧密关联的实体聚成社区，然后为每个社区生成 LLM 摘要，形成从细到粗的多层结构；它是微软 2024 年 7 月发布论文的方案，代价是构建图谱和社区摘要需要大量 LLM 调用，预处理成本较高。[原文§GraphRAG：用知识图谱增强全局理解](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#graphrag-%E7%94%A8%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1%E5%A2%9E%E5%BC%BA%E5%85%A8%E5%B1%80%E7%90%86%E8%A7%A3)
- **B15-13** 流程不是写死的，而是 LLM 在运行时自己决定：Self-RAG 是加了一个要不要检索的开关，CRAG 是加了一个检索不好怎么办的兜底，Agentic RAG 把整个检索流程变成一个可以不断循环、不断调整的智能体，特别适合需要多次、有针对性检索的多步推理问题。[原文§Agentic RAG：把 RAG 做成 Agent](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#agentic-rag-%E6%8A%8A-rag-%E5%81%9A%E6%88%90-agent)
- **B15-14** Naive RAG 是提问、向量检索、拼 Prompt、生成的直连流程，不做优化；Modular RAG 把各环节拆成可替换的模块，按需组合。[原文§三代 RAG 的演进](https://xiaolinnote.com/ai/rag/15_advanced_paradigms.html#%E4%B8%89%E4%BB%A3-rag-%E7%9A%84%E6%BC%94%E8%BF%9B)

## 16. 图增强检索

原文：[16. 在什么场景下，你会选择使用图数据库来增强传统的向量检索？](https://xiaolinnote.com/ai/rag/16_graph_db.html)。

- **B16-1** 指答案不在某一段文档里，而藏在多个实体节点之间的关系上，要沿边逐跳才能拼出，如「小米竞争对手的 CEO 是谁」；向量检索是单跳的，没有关系概念，不知道下一步该搜什么。[原文§向量检索能做什么，做不到什么](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88-%E5%81%9A%E4%B8%8D%E5%88%B0%E4%BB%80%E4%B9%88)
- **B16-2** 向量检索先做入口，找到相关片段并识别关键实体、定位节点；图数据库接力沿关系边遍历并收集沿途节点；两路结果合并后交给 LLM。[原文§向量检索 + 图数据库的组合用法](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2-%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E7%BB%84%E5%90%88%E7%94%A8%E6%B3%95)
- **B16-3** 原文列出企业股权与任职关系分析、医疗知识图谱、代码调用与依赖关系、供应链溯源四类。[原文§哪些场景真的需要图数据库](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E7%9C%9F%E7%9A%84%E9%9C%80%E8%A6%81%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B16-4** 问题多为概念解释或功能用法时，向量检索加 Rerank 已够，上图属过度设计；建图要用 LLM 抽取实体和关系，成本高、易出错，维护也比向量库复杂。[原文§什么时候不值得上图数据库](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%B8%8D%E5%80%BC%E5%BE%97%E4%B8%8A%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93)

### 补充考点

- **B16-5** 多检索几次的前提是知道下一步该搜什么，但向量检索没有关系这个概念，不知道实体之间有边，更不知道该沿哪条边继续走；例如药物相互作用、函数的间接依赖这类答案藏在多节点路径上，没有一篇文档会把结论直接写出来。[原文§向量检索能做什么，做不到什么](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88-%E5%81%9A%E4%B8%8D%E5%88%B0%E4%BB%80%E4%B9%88)
- **B16-6** 图数据库专门存实体和关系：节点是实体，如公司、人、疾病、药物，边是关系，如投资、竞争、治疗；它不能替代向量检索，Cypher 这类图查询语言擅长精确的关系查询，对语义相似这种模糊匹配并不擅长。[原文§图数据库是干什么的，为什么能解决这个问题](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93%E6%98%AF%E5%B9%B2%E4%BB%80%E4%B9%88%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E8%BF%99%E4%B8%AA%E9%97%AE%E9%A2%98)
- **B16-7** 向量检索像导航定位，帮你找到出发点在哪；图遍历像沿着路线一站一站走，把沿途站点的信息都收集起来。前者解决在哪的问题，后者解决能到哪的问题。[原文§向量检索 + 图数据库的组合用法](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2-%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E7%BB%84%E5%90%88%E7%94%A8%E6%B3%95)
- **B16-8** 看问题里是否同时出现多个具体实体名，并且在问这些实体之间有什么关系，或者通过关系能找到什么：是，就值得考虑图增强；如果主要是找某段描述性的内容，向量检索就够了。[原文§什么时候不值得上图数据库](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%B8%8D%E5%80%BC%E5%BE%97%E4%B8%8A%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93)
- **B16-9** 不能这样理解。原文称 Neo4j 等现代图数据库虽然也在加向量索引能力，但那本质上是把向量检索嫁接进图里，不是图遍历本身在做；传统图查询语言擅长的仍是精确的关系查询。[原文§图数据库是干什么的，为什么能解决这个问题](https://xiaolinnote.com/ai/rag/16_graph_db.html#%E5%9B%BE%E6%95%B0%E6%8D%AE%E5%BA%93%E6%98%AF%E5%B9%B2%E4%BB%80%E4%B9%88%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E8%BF%99%E4%B8%AA%E9%97%AE%E9%A2%98)

## 17. RAG 幻觉

原文：[17. 如何规避 RAG 系统中大模型的幻觉？](https://xiaolinnote.com/ai/rag/17_hallucination.html)。

- **B17-1** 没检到依据属检索层幻觉，用检索质量门控，分数不达标就拒答；有依据却额外编造属生成层幻觉，用 Prompt 强约束，只准用资料、无依据就说不知道、不得推断补充。 [原文§方案二：检索质量差时，直接拒绝回答](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6-%E7%9B%B4%E6%8E%A5%E6%8B%92%E7%BB%9D%E5%9B%9E%E7%AD%94) [原文§方案一：用 Prompt 告诉 LLM「只准照着资料说」](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%B8%80-%E7%94%A8-prompt-%E5%91%8A%E8%AF%89-llm%E3%80%8C%E5%8F%AA%E5%87%86%E7%85%A7%E7%9D%80%E8%B5%84%E6%96%99%E8%AF%B4%E3%80%8D)
- **B17-2** Rerank 给候选打分，最高分低于阈值就直接返回知识库无相关信息并建议联系人工；阈值要用答案在库与不在库两类测试集来找切点。[原文§方案二：检索质量差时，直接拒绝回答](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6-%E7%9B%B4%E6%8E%A5%E6%8B%92%E7%BB%9D%E5%9B%9E%E7%AD%94)
- **B17-3** 生成后再发起一次 LLM 调用，把答案和 chunk 一起送去逐条核查，无依据的内容标注无法核实或删除；代价是延迟和成本增加，原文建议用于医疗、法律等高要求场景。[原文§方案三：答案生成后，逐条核查有没有「凭空捏造」](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%B8%89-%E7%AD%94%E6%A1%88%E7%94%9F%E6%88%90%E5%90%8E-%E9%80%90%E6%9D%A1%E6%A0%B8%E6%9F%A5%E6%9C%89%E6%B2%A1%E6%9C%89%E3%80%8C%E5%87%AD%E7%A9%BA%E6%8D%8F%E9%80%A0%E3%80%8D)
- **B17-4** 让 LLM 输出 JSON、每条结论附来源编号，可以促使模型对照资料，系统也能程序化校验编号是否存在、与结论是否相关。[原文§方案四：强制 LLM 输出时带上来源编号](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E5%9B%9B-%E5%BC%BA%E5%88%B6-llm-%E8%BE%93%E5%87%BA%E6%97%B6%E5%B8%A6%E4%B8%8A%E6%9D%A5%E6%BA%90%E7%BC%96%E5%8F%B7)

### 补充考点

- **B17-5** 把资料塞进 prompt 不等于 LLM 一定照着说：它有预训练带来的知识储备，资料和它学到的不一致时可能绕开资料自己发挥；另一类是检索失败时，prompt 里是空的或全是无关内容，原文指出它往往不会说“我不知道”，而是用训练时见过的知识编一个像答案的东西，还说得很自信（这不是它做不到拒答，B17-6 的做法就是用提示约束让它在依据不足时拒答）。[原文§幻觉是什么，为什么 RAG 里会有幻觉？](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E5%B9%BB%E8%A7%89%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88-rag-%E9%87%8C%E4%BC%9A%E6%9C%89%E5%B9%BB%E8%A7%89)
- **B17-6** 只能使用参考资料里的信息，是让 LLM 知道自己的边界，只是传话人而不是百科全书；资料不足时必须明确回答无法回答，是给它一个合法的出口，说不知道比编造好；回答时标明依据来自哪条资料，相当于让它主动对照原文做自检。[原文§方案一：用 Prompt 告诉 LLM「只准照着资料说」](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%B8%80-%E7%94%A8-prompt-%E5%91%8A%E8%AF%89-llm%E3%80%8C%E5%8F%AA%E5%87%86%E7%85%A7%E7%9D%80%E8%B5%84%E6%96%99%E8%AF%B4%E3%80%8D)
- **B17-7** 没有通用数字，要按自己的业务数据调：用答案在库和不在库两类测试集跑出 Rerank 分数分布，找能把两类分开的切点；经验值一般在 0.3 到 0.6 之间，金融、医疗等对精度要求高的偏高，闲聊型问答偏低，先取中间值再按线上误判样例调整。[原文§方案二：检索质量差时，直接拒绝回答](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6-%E7%9B%B4%E6%8E%A5%E6%8B%92%E7%BB%9D%E5%9B%9E%E7%AD%94)
- **B17-8** 用户问了知识库覆盖不到的问题，最好的回答是我不知道、请联系人工；让 LLM 在低质量上下文里强行生成，会让用户误以为答案是对的并据此操作，而拒答虽然显得不那么智能，至少不会给出错误信息。[原文§方案二：检索质量差时，直接拒绝回答](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%B7%AE%E6%97%B6-%E7%9B%B4%E6%8E%A5%E6%8B%92%E7%BB%9D%E5%9B%9E%E7%AD%94)
- **B17-9** 一是 LLM 在构建 JSON 时必须主动想每条结论来自哪条资料，这个过程本身就减少了瞎编，像写论文必须标注参考文献；二是系统可以做程序化验证，编号对应的 chunk 与结论明显不相关时，自动过滤掉这条结论。[原文§方案四：强制 LLM 输出时带上来源编号](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E6%96%B9%E6%A1%88%E5%9B%9B-%E5%BC%BA%E5%88%B6-llm-%E8%BE%93%E5%87%BA%E6%97%B6%E5%B8%A6%E4%B8%8A%E6%9D%A5%E6%BA%90%E7%BC%96%E5%8F%B7)
- **B17-10** 普通企业知识库和客服问答，Prompt 约束加检索质量门控是必做的基础配置，成本极低；金融分析、法律文档等对可信度要求高的场景，再加来源编号；医疗问诊、合规审核等容错率极低的场景，四个方案全上，包括生成后逐条核查，用延迟和成本换准确性。[原文§四个方案怎么组合？](https://xiaolinnote.com/ai/rag/17_hallucination.html#%E5%9B%9B%E4%B8%AA%E6%96%B9%E6%A1%88%E6%80%8E%E4%B9%88%E7%BB%84%E5%90%88)

## 18. RAG 评估

原文：[18. 怎么量化你的 RAG 效果？](https://xiaolinnote.com/ai/rag/18_evaluation.html)。

- **B18-1** Hit@K 看正确 chunk 是否出现在前 K 条结果里，回答「找到没」；MRR 对每题取排名的倒数再求平均，回答「多快找到」，偏低说明正确内容没排到前面。[原文§第一层：检索层评估](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E6%A3%80%E7%B4%A2%E5%B1%82%E8%AF%84%E4%BC%B0)
- **B18-2** Faithfulness 检查答案中的每句话在检索到的 chunk 里是否有出处，衡量幻觉程度；Answer Relevancy 检查答案是否回答了用户的问题。答案可以字字有据却跑题。[原文§第二层：生成层评估（RAGAs 框架）](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E7%94%9F%E6%88%90%E5%B1%82%E8%AF%84%E4%BC%B0-ragas-%E6%A1%86%E6%9E%B6)
- **B18-3** 说明检索层没有召回答题所需的信息，优先查检索：换更强的 Embedding 模型、调整 Chunking 策略，或加多路召回补充覆盖面。[原文§通过指标定位问题](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E9%80%9A%E8%BF%87%E6%8C%87%E6%A0%87%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98)
- **B18-4** 踩率是最直接的负反馈，追问率反映答非所问，转人工率反映系统放弃回答的频率和知识库覆盖；线上指标是最终验收，离线测试集未必代表真实用户分布，两者要定期对照。[原文§线上指标：最终衡量标准](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%BA%BF%E4%B8%8A%E6%8C%87%E6%A0%87-%E6%9C%80%E7%BB%88%E8%A1%A1%E9%87%8F%E6%A0%87%E5%87%86)
- **B18-5** 要准备一批“问题加对应的正确 chunk ID”的测评数据，可以从历史问答里标注，也可以让领域专家整理；评估时不管 LLM 生成什么，先单独看检索有没有把正确的 chunk 召回来，再用 Hit@K 和 MRR 两个指标衡量。[原文§第一层：检索层评估](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E6%A3%80%E7%B4%A2%E5%B1%82%E8%AF%84%E4%BC%B0)

### 补充考点

- **B18-6** 它是用一套可量化的指标体系持续测量系统回答得好不好，并把笼统的好坏拆解到具体环节；因为知识库在更新、用户提问方式在变、Embedding 模型和 Chunking 策略可能调整，每次改动都可能变好或变坏，没有评估就是盲飞。[原文§什么是 RAG 评估？](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E4%BB%80%E4%B9%88%E6%98%AF-rag-%E8%AF%84%E4%BC%B0)
- **B18-7** 靠感觉调优没有方向，改了策略后效果是否提升，抽查几条样本太少、结论不可靠；优化后也无法验证收益，没有数字，技术决策缺乏说服力，也无法判断下一步该在哪里继续投入。[原文§为什么需要 RAG 评估？](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-rag-%E8%AF%84%E4%BC%B0)
- **B18-8** 答案是自然语言，没有唯一的标准答案；出了问题不知道是检索层还是生成层的责任；人工标注成本高，难以大规模持续做。[原文§为什么 RAG 评估很难](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E4%B8%BA%E4%BB%80%E4%B9%88-rag-%E8%AF%84%E4%BC%B0%E5%BE%88%E9%9A%BE)
- **B18-9** 例如 Hit@5 为 0.9 而 MRR 只有 0.3，说明 90% 的问题都能在前 5 个结果里找到相关内容，但相关内容排得很靠后，可能第 4、第 5 位才出现；两个指标配合使用能定位检索层的问题出在哪一步。[原文§第一层：检索层评估](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%B8%80%E5%B1%82-%E6%A3%80%E7%B4%A2%E5%B1%82%E8%AF%84%E4%BC%B0)
- **B18-10** RAGAs 是使用很广泛的 RAG 端到端评估框架，核心思路是 LLM-as-a-Judge，即用 LLM 当裁判自动给答案打分，不需要人工标注每一条，大幅降低评估成本。[原文§第二层：生成层评估（RAGAs 框架）](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E7%94%9F%E6%88%90%E5%B1%82%E8%AF%84%E4%BC%B0-ragas-%E6%A1%86%E6%9E%B6)
- **B18-11** Context Precision 衡量检索结果里有用的内容排名是否靠前，也就是相关的 chunk 有没有被排在前面而不是混在无关内容之后；Context Recall 关注该找的有没有找全。两者配合才能完整刻画检索质量，都需要 ground_truth 作参照。[原文§第二层：生成层评估（RAGAs 框架）](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E7%94%9F%E6%88%90%E5%B1%82%E8%AF%84%E4%BC%B0-ragas-%E6%A1%86%E6%9E%B6)
- **B18-12** 每次评估都要调用 LLM 打分，几千条测试集的 token 和时间成本很可观；一是对核心测试集抽样，只跑最有代表性的 200 到 500 条；二是把评判模型降级到更小的型号，成本降低约 10 倍，精度损失可以接受。[原文§第二层：生成层评估（RAGAs 框架）](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%AC%AC%E4%BA%8C%E5%B1%82-%E7%94%9F%E6%88%90%E5%B1%82%E8%AF%84%E4%BC%B0-ragas-%E6%A1%86%E6%9E%B6)
- **B18-13** Context Precision 低说明检索召回了太多噪音，稀释了 LLM 的注意力，应加强 Rerank、减少最终送给 LLM 的 chunk 数量；Faithfulness 低说明 LLM 在编造，应加强 Prompt 约束、引入引用核查，或做检索质量门控，防止低质量上下文进入生成阶段。[原文§通过指标定位问题](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E9%80%9A%E8%BF%87%E6%8C%87%E6%A0%87%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98)
- **B18-14** 空回答率是系统主动说不知道的比例，过高说明知识库亟需扩充；会话解决率衡量一次对话能否解决用户的问题，是最综合、最贴近用户体验的指标。[原文§线上指标：最终衡量标准](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E7%BA%BF%E4%B8%8A%E6%8C%87%E6%A0%87-%E6%9C%80%E7%BB%88%E8%A1%A1%E9%87%8F%E6%A0%87%E5%87%86)
- **B18-15** 说明检索召回了太多噪音，稀释了 LLM 的注意力；应加强 Rerank，减少最终送给 LLM 的 chunk 数量。[原文§通过指标定位问题](https://xiaolinnote.com/ai/rag/18_evaluation.html#%E9%80%9A%E8%BF%87%E6%8C%87%E6%A0%87%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98)

## 19. 知识库更新

原文：[19. RAG 知识库如何实现动态与持续更新？](https://xiaolinnote.com/ai/rag/19_dynamic_update.html)。

- **B19-1** 文档和向量是一对多关系：一篇文档被切成几十上百个 chunk 并各自 Embedding。文档内容变了，切割结果可能完全不同，chunk 的数量、边界和内容都会跟着变，没法把新旧 chunk 一一对应起来打补丁，所以工程上最可靠的做法是先删掉该文档全部旧 chunk 再重新切割入库。[原文§为什么更新 RAG 知识库比更新普通数据库麻烦？](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9B%B4%E6%96%B0-rag-%E7%9F%A5%E8%AF%86%E5%BA%93%E6%AF%94%E6%9B%B4%E6%96%B0%E6%99%AE%E9%80%9A%E6%95%B0%E6%8D%AE%E5%BA%93%E9%BA%BB%E7%83%A6)
- **B19-2** 轮询按固定间隔扫描全部文档并对比 hash，简单但有延迟；事件驱动由数据源经 Kafka、RabbitMQ 或 Webhook 主动推送，秒级生效；内容 hash 是入库时保存摘要，再次计算后比对是否变化。[原文§两种主流的变更感知方式](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%A4%E7%A7%8D%E4%B8%BB%E6%B5%81%E7%9A%84%E5%8F%98%E6%9B%B4%E6%84%9F%E7%9F%A5%E6%96%B9%E5%BC%8F)
- **B19-3** 让 chunk ID 以文档 ID 为前缀，或在 chunk 的 metadata 里存文档 ID，以便按前缀或字段批量找出并删除该文档的全部 chunk。[原文§文档 ID 和 chunk ID 的设计](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E6%96%87%E6%A1%A3-id-%E5%92%8C-chunk-id-%E7%9A%84%E8%AE%BE%E8%AE%A1)
- **B19-4** 知识库很小，或更换 Embedding 模型、修改 Chunking 策略导致新旧向量不兼容时才全量重建；平时用 hash 检测加先删后增做增量更新。[原文§全量重建是最后的手段](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E5%85%A8%E9%87%8F%E9%87%8D%E5%BB%BA%E6%98%AF%E6%9C%80%E5%90%8E%E7%9A%84%E6%89%8B%E6%AE%B5)
- **B19-5** 新 chunk 打上新版本标签并行写入，旧版本保留；用一批测试问题对比新旧答案质量，通过后把检索的版本过滤条件切到新版本再清理旧数据。出问题时把过滤条件切回即可秒级回滚。[原文§灰度更新：稳妥地切换新版本](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E7%81%B0%E5%BA%A6%E6%9B%B4%E6%96%B0-%E7%A8%B3%E5%A6%A5%E5%9C%B0%E5%88%87%E6%8D%A2%E6%96%B0%E7%89%88%E6%9C%AC)

### 补充考点

- **B19-6** 文档本身会变，产品手册改版、政策文件更新、FAQ 迭代，如果知识库不及时跟进，RAG 就会一直给用户返回过期信息；所以它不是锦上添花的功能，而是投入生产的必备条件。[原文§📝 详细解析](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%F0%9F%93%9D-%E8%AF%A6%E7%BB%86%E8%A7%A3%E6%9E%90)
- **B19-7** 三种操作是新增、修改、删除。新增按切割、Embedding、写入的流程处理；删除要清除该文档的全部 chunk，避免失效内容仍被召回。修改时内容变化可能改变 chunk 的数量、边界和内容，新旧 chunk 难以一一对应，因此生产中更可靠的办法是先删除全部旧 chunk，再重新切割入库。 [原文§为什么更新 RAG 知识库比更新普通数据库麻烦？](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9B%B4%E6%96%B0-rag-%E7%9F%A5%E8%AF%86%E5%BA%93%E6%AF%94%E6%9B%B4%E6%96%B0%E6%99%AE%E9%80%9A%E6%95%B0%E6%8D%AE%E5%BA%93%E9%BA%BB%E7%83%A6)
- **B19-8** 不会，hash 运算非常快，哪怕只改一个标点 hash 值也完全不同，不会漏掉变更；进一步的优化是先用最后修改时间这个轻量字段做粗筛，只对时间戳变化的文档计算 hash，上百万篇文档里真正改过的可能只有几千篇，能过滤掉 99%。[原文§如何知道文档是否发生了变化？](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E5%A6%82%E4%BD%95%E7%9F%A5%E9%81%93%E6%96%87%E6%A1%A3%E6%98%AF%E5%90%A6%E5%8F%91%E7%94%9F%E4%BA%86%E5%8F%98%E5%8C%96)
- **B19-9** chunk ID 的命名规范如果一开始不设计好，后面做更新会非常痛苦；无论是让 chunk ID 带文档 ID 前缀，还是在 metadata 里存文档 ID 字段再按字段过滤批量删除，关键都是从一开始就建立关联，等到需要更新时再临时想办法会很被动。[原文§文档 ID 和 chunk ID 的设计](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E6%96%87%E6%A1%A3-id-%E5%92%8C-chunk-id-%E7%9A%84%E8%AE%BE%E8%AE%A1)
- **B19-10** 它实现简单、不依赖外部系统，适合文档更新频率低、对实时性要求不高的场景，如内部知识库、产品文档；缺点是有延迟，文档改完要等下一个轮询周期才生效，而且文档很多时全量扫描本身也是开销，大多数没变的文档每次都要算一遍 hash。[原文§两种主流的变更感知方式](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%A4%E7%A7%8D%E4%B8%BB%E6%B5%81%E7%9A%84%E5%8F%98%E6%9B%B4%E6%84%9F%E7%9F%A5%E6%96%B9%E5%BC%8F)
- **B19-11** 数据源变更时主动发消息，更新服务收到事件立刻处理，文档变更后几秒内就能生效，适合客服知识库、新闻资讯这类实时性要求高的场景；代价是需要数据源具备发消息的能力，系统架构也更复杂。Confluence、Notion、语雀等工具支持 Webhook，天然适合这种方式，不必引入消息队列。[原文§两种主流的变更感知方式](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%A4%E7%A7%8D%E4%B8%BB%E6%B5%81%E7%9A%84%E5%8F%98%E6%9B%B4%E6%84%9F%E7%9F%A5%E6%96%B9%E5%BC%8F)
- **B19-12** 定时轮询实现简单、不依赖外部系统，适合文档更新频率低、对实时性要求不高的场景，如内部知识库、产品文档。[原文§两种主流的变更感知方式](https://xiaolinnote.com/ai/rag/19_dynamic_update.html#%E4%B8%A4%E7%A7%8D%E4%B8%BB%E6%B5%81%E7%9A%84%E5%8F%98%E6%9B%B4%E6%84%9F%E7%9F%A5%E6%96%B9%E5%BC%8F)

## 20. 落地难点

原文：[20. 在实际落地中，你觉得 RAG 最难的地方是哪里？](https://xiaolinnote.com/ai/rag/20_hardest_parts.html)。

- **B20-1** 通用文本流提取会打乱表格行列和双栏顺序，图片与扫描件里的信息提取不到，乱码入库后再好的 Embedding 也检索不出；解决办法是换专用解析工具或多模态模型。[原文§第一难：文档预处理](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%80%E9%9A%BE-%E6%96%87%E6%A1%A3%E9%A2%84%E5%A4%84%E7%90%86)
- **B20-2** 原因可能来自好几处：一是 Chunking 策略，相关内容被切散在十几个 chunk 里，每个单独看相关度都不高，召回的都是边缘内容；二是 Query 和文档的语义鸿沟，口语化提问和正式文档的向量相似度不高，解法是 Query 改写，或入库时为每个 chunk 生成几个可能的提问一起存；三是向量检索对型号、专有名词、缩写等精确词效果差，生产环境通常要做混合检索。[原文§第二难：检索质量调优](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%BA%8C%E9%9A%BE-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E8%B0%83%E4%BC%98)
- **B20-3** 单条答案靠人工判断成本高且标准不一；端到端指标反馈周期长，出问题时分不清是 Chunking、检索还是生成的责任。原文的做法是拆成检索层 Hit@K 和端到端 RAGAs 两层评估。[原文§第三难：效果评估困难](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%89%E9%9A%BE-%E6%95%88%E6%9E%9C%E8%AF%84%E4%BC%B0%E5%9B%B0%E9%9A%BE)

### 补充考点

- **B20-4** 最难的不是把它跑起来，基础 Demo 一两天就能搭好，难的是把它调好；最头疼的三块是文档预处理、检索质量调优和效果评估，评估做不好就不知道哪个环节出了问题，优化变成瞎猜。[原文§💡 简要回答](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **B20-5** pypdf 这类通用库主要做文本流提取，定位就不是为复杂排版设计的：遇到表格、双栏、嵌套会把内容顺序搞乱，例如三列的产品规格表被解析成一串没有分隔的文字，行列关系全丢；这是工具属性的问题，表格和复杂版面应交给 pdfplumber、unstructured 这类专门做结构化提取的库。[原文§第一难：文档预处理](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%80%E9%9A%BE-%E6%96%87%E6%A1%A3%E9%A2%84%E5%A4%84%E7%90%86)
- **B20-6** 对高价值文档可以直接用多模态模型理解 PDF 截图，但它的代价通常比普通 Embedding 高几十到上百倍，所以只适合单价高、内容复杂且数量可控的文档，如合同、财报、专利，不适合海量普通文档。[原文§第一难：文档预处理](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%80%E9%9A%BE-%E6%96%87%E6%A1%A3%E9%A2%84%E5%A4%84%E7%90%86)
- **B20-7** 扫描版文档需要 OCR；包含大量图片的文档，图片里的关键信息提取不到；代码文档切割不当会破坏逻辑完整性。每种格式都是一个坑，真正的生产系统里文档预处理的代码量往往比 RAG 核心逻辑还多。[原文§第一难：文档预处理](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%80%E9%9A%BE-%E6%96%87%E6%A1%A3%E9%A2%84%E5%A4%84%E7%90%86)
- **B20-8** 它是缓解 Query 和文档语义鸿沟的一种做法：存文档时为每个 chunk 生成几个可能的提问形式，一起存进去，让口语化的用户提问更容易匹配到正式表述的文档；另一种解法是 Query 改写。[原文§第二难：检索质量调优](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%BA%8C%E9%9A%BE-%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E8%B0%83%E4%BC%98)
- **B20-9** Faithfulness 忠实度，看答案有没有编造知识库里没有的内容；Answer Relevancy 答案相关性，看答案和问题是否对应，防止答非所问；Context Recall 上下文召回率，看检索出来的内容是否覆盖了回答所需的全部知识，偏低说明检索层遗漏了关键信息。[原文§第三难：效果评估困难](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%89%E9%9A%BE-%E6%95%88%E6%9E%9C%E8%AF%84%E4%BC%B0%E5%9B%B0%E9%9A%BE)
- **B20-10** 原型一两天能跑起来，但调到生产可用的质量往往需要几周甚至几个月：文档预处理、Chunking 策略、Embedding 选型、检索方式、Rerank、Prompt 设计，任何一环做得差都会拖累整体效果，而且各环节相互影响，没有捷径。[原文§第三难：效果评估困难](https://xiaolinnote.com/ai/rag/20_hardest_parts.html#%E7%AC%AC%E4%B8%89%E9%9A%BE-%E6%95%88%E6%9E%9C%E8%AF%84%E4%BC%B0%E5%9B%B0%E9%9A%BE)

## 21. 知识冲突

原文：[21. 不同来源的文档发生知识冲突时，RAG 应该信谁？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html)。

- **B21-1** 相似度只说明内容与问题相关，不能证明来源更权威、更及时或适用于当前用户，例如群聊传闻可能因措辞接近而得分更高；应同时看适用范围、来源权威、版本和生效时间。[原文§为什么不能选择「相似度最高」的文档？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E9%80%89%E6%8B%A9%E3%80%8C%E7%9B%B8%E4%BC%BC%E5%BA%A6%E6%9C%80%E9%AB%98%E3%80%8D%E7%9A%84%E6%96%87%E6%A1%A3)
- **B21-2** 要保存来源、负责人、版本号、状态（草稿、已生效、已废止）、发布时间和生效区间，以及地区、产品版本、部门、租户、权限等适用范围；另存原文链接、文档 hash 和审批记录。[原文§入库时不只存正文，还要存「身份证」](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%85%A5%E5%BA%93%E6%97%B6%E4%B8%8D%E5%8F%AA%E5%AD%98%E6%AD%A3%E6%96%87-%E8%BF%98%E8%A6%81%E5%AD%98%E3%80%8C%E8%BA%AB%E4%BB%BD%E8%AF%81%E3%80%8D)
- **B21-3** 检索阶段先用元数据过滤排除权限或地区不匹配、已过期的内容，再召回，排序时兼顾权威度、时效和版本状态；生成阶段要求关键结论带来源与版本，不得用模型常识覆盖正式材料。[原文§检索阶段和生成阶段分别做什么？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E6%A3%80%E7%B4%A2%E9%98%B6%E6%AE%B5%E5%92%8C%E7%94%9F%E6%88%90%E9%98%B6%E6%AE%B5%E5%88%86%E5%88%AB%E5%81%9A%E4%BB%80%E4%B9%88)
- **B21-4** 不偷偷二选一：明确说明知识库存在两个不同版本，分别列出两份文档的规定并给出原文链接，再请用户补充地区或版本，或转交知识负责人审核。[原文§检索阶段和生成阶段分别做什么？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E6%A3%80%E7%B4%A2%E9%98%B6%E6%AE%B5%E5%92%8C%E7%94%9F%E6%88%90%E9%98%B6%E6%AE%B5%E5%88%86%E5%88%AB%E5%81%9A%E4%BB%80%E4%B9%88)
- **B21-5** 先按用户身份、地区、产品和时间判断适用范围，再比较来源权威度、版本状态与生效区间，最后才在合格候选里按相关性排序；入库时保存来源、负责人、版本、状态、生效时间和适用范围，离线与在线阶段都检测冲突，生成答案时逐条引用证据，无法裁决时诚实呈现分歧并转人工审核，发布时采用灰度索引和可回滚版本；最后用包含旧版本、地区规则和低权威干扰文档的测试集做评估。[原文§🎯 面试总结](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

### 补充考点

- **B21-6** 表面在问模型该选哪段文字，实际考的是知识库有没有一套能解释、能审核、能回滚的知识治理规则。[原文§21. 不同来源的文档发生知识冲突时，RAG 应该信谁？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#_21-%E4%B8%8D%E5%90%8C%E6%9D%A5%E6%BA%90%E7%9A%84%E6%96%87%E6%A1%A3%E5%8F%91%E7%94%9F%E7%9F%A5%E8%AF%86%E5%86%B2%E7%AA%81%E6%97%B6-rag-%E5%BA%94%E8%AF%A5%E4%BF%A1%E8%B0%81)
- **B21-7** 用户问今年婚假有多少天，检索出三段内容：员工群聊里说听说改成 15 天了，公司正式制度写婚假为 10 天，上海地区补充规则写上海员工按 15 天执行；三者措辞都和问题相关，却不能简单按相似度取用。[原文§为什么不能选择「相似度最高」的文档？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E9%80%89%E6%8B%A9%E3%80%8C%E7%9B%B8%E4%BC%BC%E5%BA%A6%E6%9C%80%E9%AB%98%E3%80%8D%E7%9A%84%E6%96%87%E6%A1%A3)
- **B21-8** 下个月才生效的新制度，发布时间最新，今天却不能执行；一份去年发布但有效期未结束的地区细则，也不能被今天刚发布的通用通知随便覆盖。冲突发生后才让模型猜谁可信已经晚了，要从入库时就存好这些信息。[原文§入库时不只存正文，还要存「身份证」](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%85%A5%E5%BA%93%E6%97%B6%E4%B8%8D%E5%8F%AA%E5%AD%98%E6%AD%A3%E6%96%87-%E8%BF%98%E8%A6%81%E5%AD%98%E3%80%8C%E8%BA%AB%E4%BB%BD%E8%AF%81%E3%80%8D)
- **B21-9** 不能由开发人员拍脑袋写成全公司的统一常量：财务、法务、产品和售后可能各有自己的知识负责人和效力层级；更稳妥的做法是维护一个来源注册表，由业务负责人定义各领域的来源等级、覆盖关系和审批流程。[原文§先判断适用范围，再比较谁更权威](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%85%88%E5%88%A4%E6%96%AD%E9%80%82%E7%94%A8%E8%8C%83%E5%9B%B4-%E5%86%8D%E6%AF%94%E8%BE%83%E8%B0%81%E6%9B%B4%E6%9D%83%E5%A8%81)
- **B21-10** 结构化程度高的知识用规则更可靠，数字、日期、状态和版本号可以先用字段解析与数据库约束比较；自然语言表述复杂时可以用模型识别矛盾候选，但模型的输出只能作为告警线索，不能自动决定谁胜出。[原文§冲突应该怎样被发现？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%86%B2%E7%AA%81%E5%BA%94%E8%AF%A5%E6%80%8E%E6%A0%B7%E8%A2%AB%E5%8F%91%E7%8E%B0)
- **B21-11** 把“存在冲突”作为正式状态传给生成层，让后续回答知道证据互相矛盾，而不是把多个片段混在 Prompt 里，期待模型碰巧选对。 [原文§冲突应该怎样被发现？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%86%B2%E7%AA%81%E5%BA%94%E8%AF%A5%E6%80%8E%E6%A0%B7%E8%A2%AB%E5%8F%91%E7%8E%B0)
- **B21-12** 发布前用历史问题和专门设计的冲突问题同时跑新旧版本，比较答案、引用来源和错误率，再切一小部分流量观察；错误或投诉增加时，把检索别名和版本过滤条件切回旧版本，而不是临时重新解析和向量化。回滚后要保留变更记录、审批人、受影响问题和修复原因，便于复盘。[原文§如何让错误知识可以灰度、可以回滚？](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E5%A6%82%E4%BD%95%E8%AE%A9%E9%94%99%E8%AF%AF%E7%9F%A5%E8%AF%86%E5%8F%AF%E4%BB%A5%E7%81%B0%E5%BA%A6%E3%80%81%E5%8F%AF%E4%BB%A5%E5%9B%9E%E6%BB%9A)
- **B21-13** 普通测试集一个问题一个标准答案，测不出冲突处理能力，必须主动加入冲突样本；至少关注是否选了正确来源、是否误用过期文档、关键结论的引用是否准确、无法裁决时是否暴露冲突、该拒答时是否乱下结论。线上要记录答案引用过的 source_id 和版本，文档被判有误时能找出受影响的历史答案。[原文§评测时要专门考「会不会选错依据」](https://xiaolinnote.com/ai/rag/21_knowledge_conflict.html#%E8%AF%84%E6%B5%8B%E6%97%B6%E8%A6%81%E4%B8%93%E9%97%A8%E8%80%83%E3%80%8C%E4%BC%9A%E4%B8%8D%E4%BC%9A%E9%80%89%E9%94%99%E4%BE%9D%E6%8D%AE%E3%80%8D)

## 22. 大上下文下 RAG 的价值

原文：[22. 上下文窗口很大时为什么还需要 RAG？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html)。

- **B22-1** 窗口决定模型一次能读多少资料，RAG 负责从外部资料里找出当前问题需要的证据；即使整个知识库都装得下，也不代表每份资料都相关、都有效，或模型一定能把分散的条件全部用对。RAG 在生成前检索并整理材料，减少无关信息，避免每次处理整个资料库，资料更新后只需更新内容和索引，不必重新训练模型。[原文§💡 简要回答](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **B22-2** 扩大的是读取容量，即一次请求能容纳的内容范围，让模型有机会同时读更多章节、文件和材料，对整体理解有直接帮助；但窗口本身不选择资料，也不会把外部知识自动装进模型，资料进来后模型还要判断哪些相关、哪些条件适用。容量表示能接收多少，有效利用表示能否从这些内容得出符合要求的结果，前者增加不等于后者有保证。[原文§窗口变大，扩大的是读取容量](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E7%AA%97%E5%8F%A3%E5%8F%98%E5%A4%A7-%E6%89%A9%E5%A4%A7%E7%9A%84%E6%98%AF%E8%AF%BB%E5%8F%96%E5%AE%B9%E9%87%8F)
- **B22-3** 不是。RAG 即检索增强生成，在生成之前从外部资料中查找相关内容，再让模型依据取回的材料回答；它可以缓解窗口不足，但作用并不限于此。[原文§窗口变大，扩大的是读取容量](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E7%AA%97%E5%8F%A3%E5%8F%98%E5%A4%A7-%E6%89%A9%E5%A4%A7%E7%9A%84%E6%98%AF%E8%AF%BB%E5%8F%96%E5%AE%B9%E9%87%8F)
- **B22-4** 回答质量需要的是适用且足够完整的证据：无关内容增加了模型要区分的材料，重复说法、不同版本和相近主题可能让模型混用条件；有些模型和任务里，关键信息放在中间比放在开头或末尾更难被可靠利用，即中间信息利用不足，程度随模型、内容和任务变化；而且定位一条信息和结合多处信息完成判断是不同的要求。[原文§材料越多，为什么不一定意味着证据更充分？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E6%9D%90%E6%96%99%E8%B6%8A%E5%A4%9A-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E5%AE%9A%E6%84%8F%E5%91%B3%E7%9D%80%E8%AF%81%E6%8D%AE%E6%9B%B4%E5%85%85%E5%88%86)
- **B22-5** 问题针对接口 B 时两条都相关，但特殊规则决定答案；只找到通用规则或忽略两者的范围关系，就会答成 20 MB。全文可能把无关和冲突内容一起带进来，检索则可能只召回通用规则、漏掉特殊规定，把必要内容提前筛掉，所以不能仅凭输入长短判断谁更准确，筛选本身要考虑证据完整性。[原文§材料越多，为什么不一定意味着证据更充分？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E6%9D%90%E6%96%99%E8%B6%8A%E5%A4%9A-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E5%AE%9A%E6%84%8F%E5%91%B3%E7%9D%80%E8%AF%81%E6%8D%AE%E6%9B%B4%E5%85%85%E5%88%86)
- **B22-6** 资料准备时解析内容，按需要组织章节或片段并建立查找索引，索引可以基于关键词也可以基于文本含义；在线查询时根据当前问题查找候选，再筛选、排序和整理证据，最后交给模型理解与回答。这样资料获取不再全压在每次模型推理中，应用可以显式控制从哪里取、取哪些版本、这次提供了什么依据。[原文§RAG 把资料选择提前到生成之前](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#rag-%E6%8A%8A%E8%B5%84%E6%96%99%E9%80%89%E6%8B%A9%E6%8F%90%E5%89%8D%E5%88%B0%E7%94%9F%E6%88%90%E4%B9%8B%E5%89%8D)
- **B22-7** 相似度高只表示内容可能谈论同一主题，不能单独判断规则是否已经生效、是否属于当前对象；例如新版本下个月才生效而问题问的是本周，就不能因为文件最新而采用新规则，系统要记录版本与生效范围，再按问题条件选择。[原文§RAG 把资料选择提前到生成之前](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#rag-%E6%8A%8A%E8%B5%84%E6%96%99%E9%80%89%E6%8B%A9%E6%8F%90%E5%89%8D%E5%88%B0%E7%94%9F%E6%88%90%E4%B9%8B%E5%89%8D)
- **B22-8** 不能自动解决。资料变化后可以独立更新内容和索引，不必把变更训练进参数，但索引不会自动保鲜，原文件更新而索引没刷新就会继续召回旧证据，要有实际的更新和失效机制；权限可以在获取环节做过滤，但判断访问权的是授权机制，不能交给模型或相似度分数。这些能力也并非 RAG 独有，全文输入同样可以先选版本、过滤权限并记录来源。[原文§RAG 把资料选择提前到生成之前](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#rag-%E6%8A%8A%E8%B5%84%E6%96%99%E9%80%89%E6%8B%A9%E6%8F%90%E5%89%8D%E5%88%B0%E7%94%9F%E6%88%90%E4%B9%8B%E5%89%8D)
- **B22-9** 好处是不必每次读取整个资料库：资料库 30 万 Token 而一次问题只需约 5000 Token 时，先检索可以让输入围绕较小范围组织，索引把一部分资料处理提前完成、供多个问题复用；开销是解析、索引维护、在线检索、排序和追加读取都要时间和计算，资料变化频繁时还要不断更新。[原文§不必每次读取整个资料库，成本才可能随问题缩小](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E4%B8%8D%E5%BF%85%E6%AF%8F%E6%AC%A1%E8%AF%BB%E5%8F%96%E6%95%B4%E4%B8%AA%E8%B5%84%E6%96%99%E5%BA%93-%E6%88%90%E6%9C%AC%E6%89%8D%E5%8F%AF%E8%83%BD%E9%9A%8F%E9%97%AE%E9%A2%98%E7%BC%A9%E5%B0%8F)
- **B22-10** 要包括资料准备、检索、模型处理与补读，而不是只比一次请求的 Token 数；长上下文可能利用前缀缓存减少重复处理的费用或延迟，但收益取决于实现、命中情况和资料变化。资料很少、只处理一次时建复杂检索链路未必划算，大量局部问题反复访问同一资料库时按需读取更值得评估。[原文§不必每次读取整个资料库，成本才可能随问题缩小](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E4%B8%8D%E5%BF%85%E6%AF%8F%E6%AC%A1%E8%AF%BB%E5%8F%96%E6%95%B4%E4%B8%AA%E8%B5%84%E6%96%99%E5%BA%93-%E6%88%90%E6%9C%AC%E6%89%8D%E5%8F%AF%E8%83%BD%E9%9A%8F%E9%97%AE%E9%A2%98%E7%BC%A9%E5%B0%8F)
- **B22-11** 把检索命中的片段当作位置线索，再读取所属的完整章节，正文引用附件或其他规则时继续补齐；检索负责缩小查找范围，长上下文负责在该范围内做较完整的阅读。但读全文补不回完全没被召回的另一份资料，检索后还要检查证据能否回答问题，缺少范围、条件或依据时继续补查。[原文§大窗口与检索配合，怎样保留必要的完整性？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E5%A4%A7%E7%AA%97%E5%8F%A3%E4%B8%8E%E6%A3%80%E7%B4%A2%E9%85%8D%E5%90%88-%E6%80%8E%E6%A0%B7%E4%BF%9D%E7%95%99%E5%BF%85%E8%A6%81%E7%9A%84%E5%AE%8C%E6%95%B4%E6%80%A7)
- **B22-12** 少量资料、需要通读、总结或整体比较的，直接使用长上下文；大资料库、问题集中在局部事实的，检索后组织相关证据；需要跨段条件或文档关系的，检索定位后再扩大阅读范围。要求全量总结或检查所有例外的任务，排名靠前的少量结果不能代替完整范围，相关性排名不证明没有遗漏。[原文§大窗口与检索配合，怎样保留必要的完整性？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E5%A4%A7%E7%AA%97%E5%8F%A3%E4%B8%8E%E6%A3%80%E7%B4%A2%E9%85%8D%E5%90%88-%E6%80%8E%E6%A0%B7%E4%BF%9D%E7%95%99%E5%BF%85%E8%A6%81%E7%9A%84%E5%AE%8C%E6%95%B4%E6%80%A7)
- **B22-13** 全文能做对而 RAG 做错，要检查召回是否遗漏；全文混用不同版本，要检查输入范围和资料组织。验证时先看问题有没有答全、规则有没有用对，再比较延迟和成本。[原文§大窗口与检索配合，怎样保留必要的完整性？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E5%A4%A7%E7%AA%97%E5%8F%A3%E4%B8%8E%E6%A3%80%E7%B4%A2%E9%85%8D%E5%90%88-%E6%80%8E%E6%A0%B7%E4%BF%9D%E7%95%99%E5%BF%85%E8%A6%81%E7%9A%84%E5%AE%8C%E6%95%B4%E6%80%A7)

### 补充考点

- **B22-14** 要检查输入范围和资料组织。验证时先看问题有没有答全、规则有没有用对，再比较延迟和成本。[原文§大窗口与检索配合，怎样保留必要的完整性？](https://xiaolinnote.com/ai/rag/22_rag_long_context.html#%E5%A4%A7%E7%AA%97%E5%8F%A3%E4%B8%8E%E6%A3%80%E7%B4%A2%E9%85%8D%E5%90%88-%E6%80%8E%E6%A0%B7%E4%BF%9D%E7%95%99%E5%BF%85%E8%A6%81%E7%9A%84%E5%AE%8C%E6%95%B4%E6%80%A7)

## 23. RAG 与自主文件检索的选型

原文：[23. RAG 与 Agent 自主文件检索应该如何选型？](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html)。

- **B23-1** 主要看任务是否需要根据中间结果继续探索：资料量大、同类问题多、答案通常能从明确的知识范围里找到，预建索引更容易复用资料处理成本，也便于控制查询链路；需要沿引用、配置或代码关系逐步追查时，自主检索更灵活，但探索轮数和成本更容易波动。两者并不对立，Agent 搜索外部资料再回答也属于检索增强。[原文§💡 简要回答](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **B23-2** 因为要分开两个维度：搜索方式决定怎样匹配内容，精确字符串、正则表达式、关键词索引和语义索引都属于这一层；取资料的流程决定什么时候搜索、读到什么后是否继续、下一步由谁选择，固定检索链路和由模型推动的探索循环属于这一层。RAG 可以用关键词索引，Agent 也可以调用语义检索，不能凭用了 grep 或向量库推断任务怎样运行。[原文§先区分搜索方式与取资料的流程](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E5%85%88%E5%8C%BA%E5%88%86%E6%90%9C%E7%B4%A2%E6%96%B9%E5%BC%8F%E4%B8%8E%E5%8F%96%E8%B5%84%E6%96%99%E7%9A%84%E6%B5%81%E7%A8%8B)
- **B23-3** RAG 的基本含义是获取外部证据再辅助生成，不要求只用向量，也不要求只检索一次，本题主要指常见的预建索引方案：提前处理资料，收到问题后检索候选、整理内容再交给模型；自主文件检索强调运行过程，Agent 可以列目录、搜索内容、读取文件，再根据新的观察决定继续取什么资料。[原文§先区分搜索方式与取资料的流程](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E5%85%88%E5%8C%BA%E5%88%86%E6%90%9C%E7%B4%A2%E6%96%B9%E5%BC%8F%E4%B8%8E%E5%8F%96%E8%B5%84%E6%96%99%E7%9A%84%E6%B5%81%E7%A8%8B)
- **B23-4** 把一部分资料组织工作放到问题到来之前：先解析资料、保留内容和来源、组织成章节或片段并建立索引，这些工作可以服务很多请求，不必每个问题都从头探索相同集合；流程相对固定时，检索步骤也容易单独观察和改进，找不到材料查查询与索引，候选多但选错查排序与范围。[原文§预建索引，把资料组织成本提前并复用](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E9%A2%84%E5%BB%BA%E7%B4%A2%E5%BC%95-%E6%8A%8A%E8%B5%84%E6%96%99%E7%BB%84%E7%BB%87%E6%88%90%E6%9C%AC%E6%8F%90%E5%89%8D%E5%B9%B6%E5%A4%8D%E7%94%A8)
- **B23-5** 候选只是值得阅读的材料，不是已证明的答案，相似度高不等于适用，索引里的摘要可能省略条件，必要时要读完整章节并核对来源与版本；索引需要维护，资料变了而索引没刷新会继续返回旧内容，所以要记录原始位置与版本；它也无法提前知道复杂任务后续会出现什么线索。[原文§预建索引，把资料组织成本提前并复用](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E9%A2%84%E5%BB%BA%E7%B4%A2%E5%BC%95-%E6%8A%8A%E8%B5%84%E6%96%99%E7%BB%84%E7%BB%87%E6%88%90%E6%9C%AC%E6%8F%90%E5%89%8D%E5%B9%B6%E5%A4%8D%E7%94%A8)
- **B23-6** 来自观察与决策的循环：下一次搜索由上一次观察决定，Agent 搜索、读取命中内容，读到新名称、引用或异常再继续查，直到证据足够或发现当前范围内无法完成；适合开始时只能描述症状、具体要读哪些文件得看到部分材料后才知道的问题，例如说明引用配置、配置又指向实现。[原文§自主检索，把资料获取放进观察与决策循环](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E8%87%AA%E4%B8%BB%E6%A3%80%E7%B4%A2-%E6%8A%8A%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96%E6%94%BE%E8%BF%9B%E8%A7%82%E5%AF%9F%E4%B8%8E%E5%86%B3%E7%AD%96%E5%BE%AA%E7%8E%AF)
- **B23-7** 循环会消耗时间，搜索、读取、判断可能需要多轮工具与模型调用，不同任务轮数不同，延迟和读取量会波动；主动搜索也不天然完整，猜错关键词、忽略目录，或找到一份相关材料就提前停止，都可能让必要证据一直没被读到。[原文§自主检索，把资料获取放进观察与决策循环](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E8%87%AA%E4%B8%BB%E6%A3%80%E7%B4%A2-%E6%8A%8A%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96%E6%94%BE%E8%BF%9B%E8%A7%82%E5%AF%9F%E4%B8%8E%E5%86%B3%E7%AD%96%E5%BE%AA%E7%8E%AF)
- **B23-8** 先返回路径、命中位置和必要片段，让 Agent 判断再读哪里，通常比一次返回几千行杂乱内容更容易继续，长文件可分段读取但要保留回查入口；搜索入口要适合线索，grep 或 rg 做词面和模式匹配，适合明确的错误码、字段名，模糊描述与资料用词不同时可能需要语义候选定位，或先从目录说明里获取真实术语。[原文§自主检索，把资料获取放进观察与决策循环](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E8%87%AA%E4%B8%BB%E6%A3%80%E7%B4%A2-%E6%8A%8A%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96%E6%94%BE%E8%BF%9B%E8%A7%82%E5%AF%9F%E4%B8%8E%E5%86%B3%E7%AD%96%E5%BE%AA%E7%8E%AF)
- **B23-9** 不是。这是模型改变了搜索策略，grep 本身做的仍是词面匹配；把这两层分清，才知道找不到资料时该改的是搜索策略还是搜索工具。[原文§自主检索，把资料获取放进观察与决策循环](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E8%87%AA%E4%B8%BB%E6%A3%80%E7%B4%A2-%E6%8A%8A%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96%E6%94%BE%E8%BF%9B%E8%A7%82%E5%AF%9F%E4%B8%8E%E5%86%B3%E7%AD%96%E5%BE%AA%E7%8E%AF)
- **B23-10** 目录和名称清楚时主动搜索容易找到入口，资料规模大、命名不直观时索引能帮助缩小范围；经常变化的工作区建索引要处理同步成本，直接读文件读的是当前可见内容，但也可能是旧副本、错误分支或未更新的挂载，两种方式都要确认读的是哪份资料；固定链路更容易给步骤设上限，自主探索要限制搜索轮数、读取量和总预算。[原文§选型重点：任务的探索需求与重复处理成本](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E9%80%89%E5%9E%8B%E9%87%8D%E7%82%B9-%E4%BB%BB%E5%8A%A1%E7%9A%84%E6%8E%A2%E7%B4%A2%E9%9C%80%E6%B1%82%E4%B8%8E%E9%87%8D%E5%A4%8D%E5%A4%84%E7%90%86%E6%88%90%E6%9C%AC)
- **B23-11** 大量资料上的高频局部问答，适合预建索引与相对固定的检索链路；依赖新观察、需要追踪关联的任务，适合 Agent 自主探索；大范围里入口难找、找到后还要深入核查的，适合索引定位后继续探索；少量资料、需要完整阅读与整体理解的，直接读取全文。[原文§选型重点：任务的探索需求与重复处理成本](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E9%80%89%E5%9E%8B%E9%87%8D%E7%82%B9-%E4%BB%BB%E5%8A%A1%E7%9A%84%E6%8E%A2%E7%B4%A2%E9%9C%80%E6%B1%82%E4%B8%8E%E9%87%8D%E5%A4%8D%E5%A4%84%E7%90%86%E6%88%90%E6%9C%AC)
- **B23-12** 证据完整性是共同要求，查到一个答案和证明已检查所有文件是两种任务，取排名靠前的候选或搜了几轮都不能证明没有遗漏；权限不随方案变化，索引检索、路径搜索和原文读取都应由程序按当前身份控制，能搜到不代表有权读取；验证选型要比较整项任务是否完成、证据是否充分、总延迟和费用，而不是一次搜索快不快。[原文§选型重点：任务的探索需求与重复处理成本](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E9%80%89%E5%9E%8B%E9%87%8D%E7%82%B9-%E4%BB%BB%E5%8A%A1%E7%9A%84%E6%8E%A2%E7%B4%A2%E9%9C%80%E6%B1%82%E4%B8%8E%E9%87%8D%E5%A4%8D%E5%A4%84%E7%90%86%E6%88%90%E6%9C%AC)
- **B23-13** 让索引负责找到候选入口，Agent 负责阅读原文并判断还缺什么：索引结果保留来源路径、位置和版本，Agent 才能回到实际材料核对摘要有没有省略条件、原文件是否已变化；证据足够就回答，出现引用、相关配置或新的未知点再用文件搜索、语义检索等工具补查。[原文§索引定位与原文探索，可以共同完成资料获取](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E7%B4%A2%E5%BC%95%E5%AE%9A%E4%BD%8D%E4%B8%8E%E5%8E%9F%E6%96%87%E6%8E%A2%E7%B4%A2-%E5%8F%AF%E4%BB%A5%E5%85%B1%E5%90%8C%E5%AE%8C%E6%88%90%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96)
- **B23-14** 第一批候选不能成为后续探索的围墙，解释不了问题时应允许改变查询或查找其他目录；组合后仍要控制成本，本来能直接回答的短问题不一定值得多轮探索，明确需要通读的任务也不必先做一轮可能漏内容的检索。选择的对象是资料获取流程，重点是用合适的代价获得足够且可核对的证据。[原文§索引定位与原文探索，可以共同完成资料获取](https://xiaolinnote.com/ai/rag/23_rag_vs_file_search.html#%E7%B4%A2%E5%BC%95%E5%AE%9A%E4%BD%8D%E4%B8%8E%E5%8E%9F%E6%96%87%E6%8E%A2%E7%B4%A2-%E5%8F%AF%E4%BB%A5%E5%85%B1%E5%90%8C%E5%AE%8C%E6%88%90%E8%B5%84%E6%96%99%E8%8E%B7%E5%8F%96)
