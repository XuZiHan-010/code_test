# 大模型工程 原文章节摘编

仅依据各题所列的小林面试笔记原文章节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分明确标注，不使用其他网站补充。整理日期：2026-10-13。

## 1. 大语言模型

原文：[1. 什么是大语言模型？和传统 NLP 模型有什么区别？](https://xiaolinnote.com/ai/llm/what_is_llm.html)。

- **D1-1** 传统 NLP 是一任务一模型、用 pipeline 串联，输出标签或概率，能力来自显式的监督训练；LLM 是一个模型处理所有任务，用 Prompt 作统一接口，输出文本，能力来自大规模预训练加涌现。[原文§三个本质区别总结](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E4%B8%89%E4%B8%AA%E6%9C%AC%E8%B4%A8%E5%8C%BA%E5%88%AB%E6%80%BB%E7%BB%93)
- **D1-2** BERT 的预训练目标是 MLM，即随机遮掉 15% 的词让模型按上下文去猜，再加下一句预测，学到的是表示，要接任务头微调，不擅长生成；自回归 LLM 用的是因果语言模型，从左到右预测下一个 token。 [原文§BERT 时代：预训练通了一半](https://xiaolinnote.com/ai/llm/what_is_llm.html#bert-%E6%97%B6%E4%BB%A3-%E9%A2%84%E8%AE%AD%E7%BB%83%E9%80%9A%E4%BA%86%E4%B8%80%E5%8D%8A) [原文§LLM 的本质：把所有任务收编成「预测下一个 token」](https://xiaolinnote.com/ai/llm/what_is_llm.html#llm-%E7%9A%84%E6%9C%AC%E8%B4%A8-%E6%8A%8A%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E6%94%B6%E7%BC%96%E6%88%90%E3%80%8C%E9%A2%84%E6%B5%8B%E4%B8%8B%E4%B8%80%E4%B8%AA-token%E3%80%8D)
- **D1-3** 因为所有任务都能写成 Prompt 加续写：翻译、分类、总结、写代码都只是让模型接着预测下一个 token；而要在各种上下文里预测准确，模型就必须学到语法、事实和推理模式。[原文§LLM 的本质：把所有任务收编成「预测下一个 token」](https://xiaolinnote.com/ai/llm/what_is_llm.html#llm-%E7%9A%84%E6%9C%AC%E8%B4%A8-%E6%8A%8A%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E6%94%B6%E7%BC%96%E6%88%90%E3%80%8C%E9%A2%84%E6%B5%8B%E4%B8%8B%E4%B8%80%E4%B8%AA-token%E3%80%8D)
- **D1-4** 指某项能力在小模型上几乎看不到，规模到某个临界点后突然表现出来。原文提醒：一部分突然出现可能来自评测指标的离散性，exact match 这类非黑即白的指标会把连续提升看成突变，学术上对它是不是测量假象仍有争议。[原文§「涌现能力」：量变到质变的关键](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E3%80%8C%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B%E3%80%8D-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E5%85%B3%E9%94%AE)

### 补充考点

- **D1-5** 一个完整任务要拆成多个独立步骤，每一步用一个专门的模型完成，例如智能客服要依次做分词、词性标注、命名实体识别、意图分类，再去知识库匹配答案；这是因为当时的小模型能力有限，必须把复杂问题拆成简单的子问题分别训练。[原文§传统 NLP 是怎么干活的？](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E4%BC%A0%E7%BB%9F-nlp-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B9%B2%E6%B4%BB%E7%9A%84)
- **D1-6** OOV 即未登录词问题：分词模型依赖大量人工标注语料，遇到训练时没见过的新词，例如新出现的网络用语，就无法正确处理。[原文§传统 NLP 是怎么干活的？](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E4%BC%A0%E7%BB%9F-nlp-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B9%B2%E6%B4%BB%E7%9A%84)
- **D1-7** 一是错误会累积传导：每一步都有自己的模型、数据和标注规范，pipeline 又长又脆，分词错了后面全错，而且没法事后补救；二是迁移成本高：换个领域，实体类型完全不同，所有模型基本都得重新训练，做几个领域就要养几套模型团队。[原文§传统 NLP 是怎么干活的？](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E4%BC%A0%E7%BB%9F-nlp-%E6%98%AF%E6%80%8E%E4%B9%88%E5%B9%B2%E6%B4%BB%E7%9A%84)
- **D1-8** 一是 MLM 掩码语言模型，随机遮掉句子里 15% 的词，让模型根据上下文猜被遮的词；二是 NSP 下一句预测，给两个句子让模型判断是否连续。两个任务都不需要人工标注，可以用海量无标注文本训练。[原文§BERT 时代：预训练通了一半](https://xiaolinnote.com/ai/llm/what_is_llm.html#bert-%E6%97%B6%E4%BB%A3-%E9%A2%84%E8%AE%AD%E7%BB%83%E9%80%9A%E4%BA%86%E4%B8%80%E5%8D%8A)
- **D1-9** 它解决了特征通用，一个 BERT 可以服务多个下游任务，但没解决任务统一：BERT 输出的是每个 token 的向量表示而不是文本，做分类要接分类头、做实体识别要接序列标注头、做问答要接抽取式 QA 头，每种任务都要单独设计的头、单独的数据和训练，一个 BERT 可能派生出十几个微调副本。[原文§BERT 时代：预训练通了一半](https://xiaolinnote.com/ai/llm/what_is_llm.html#bert-%E6%97%B6%E4%BB%A3-%E9%A2%84%E8%AE%AD%E7%BB%83%E9%80%9A%E4%BA%86%E4%B8%80%E5%8D%8A)
- **D1-10** CLM 即因果语言模型：给一段文本，模型从左到右逐个往后猜，每一步都预测下一个 token 是什么，例如看到“我”预测“喜”，看到“我喜”预测“欢”。[原文§LLM 的本质：把所有任务收编成「预测下一个 token」](https://xiaolinnote.com/ai/llm/what_is_llm.html#llm-%E7%9A%84%E6%9C%AC%E8%B4%A8-%E6%8A%8A%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E6%94%B6%E7%BC%96%E6%88%90%E3%80%8C%E9%A2%84%E6%B5%8B%E4%B8%8B%E4%B8%80%E4%B8%AA-token%E3%80%8D)
- **D1-11** 靠规模和数据两个杠杆：数据上，CLM 不需要人工标注，互联网上所有文本都是合格的训练数据，GPT-3 用了 3000 亿 token，Llama 3 用了 15 万亿 token；模型上，参数量从 BERT 的 0.3B 一路堆到 GPT-3 的 175B。GPT-4 这类模型的参数量官方没有公开，面试里不要把万亿级当成确定事实。[原文§LLM 的本质：把所有任务收编成「预测下一个 token」](https://xiaolinnote.com/ai/llm/what_is_llm.html#llm-%E7%9A%84%E6%9C%AC%E8%B4%A8-%E6%8A%8A%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E6%94%B6%E7%BC%96%E6%88%90%E3%80%8C%E9%A2%84%E6%B5%8B%E4%B8%8B%E4%B8%80%E4%B8%AA-token%E3%80%8D)
- **D1-12** 上下文学习：在 Prompt 里给模型几个例子，模型不需要更新参数就能学会新的任务模式，例如看几组中译英的水果名后，对新输入直接给出翻译；这种能力在 GPT-3 之后才被业界发现，也是 Prompt Engineering 诞生的基础。[原文§LLM 的本质：把所有任务收编成「预测下一个 token」](https://xiaolinnote.com/ai/llm/what_is_llm.html#llm-%E7%9A%84%E6%9C%AC%E8%B4%A8-%E6%8A%8A%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E6%94%B6%E7%BC%96%E6%88%90%E3%80%8C%E9%A2%84%E6%B5%8B%E4%B8%8B%E4%B8%80%E4%B8%AA-token%E3%80%8D)
- **D1-13** 多步算术：需要 5 步计算的应用题，8B 以下的模型准确率几乎为 0，62B 只有 5%，到 540B 的 PaLM 突然跳到 60%；In-Context Learning：只要在 Prompt 里给几个例子，模型就能学会新任务，这种能力在 1.5B 的 GPT-2 上完全看不到，到 175B 的 GPT-3 突然出现；跨语言迁移：GPT-3 的训练数据 92% 是英文，却能直接处理中文、日文、阿拉伯语甚至小语种。[原文§「涌现能力」：量变到质变的关键](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E3%80%8C%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B%E3%80%8D-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E5%85%B3%E9%94%AE)
- **D1-14** 模型规模、训练数据量和训练算力之间存在可预测的关系：三者按一定比例同时放大，模型的损失会沿一条幂律曲线下降；OpenAI 在 2020 年提出，DeepMind 的 Chinchilla 论文给出更精细的比例，参数和数据按 1 比 20 配，例如 70B 参数配 1.4T token。[原文§「涌现能力」：量变到质变的关键](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E3%80%8C%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B%E3%80%8D-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E5%85%B3%E9%94%AE)
- **D1-15** 不是。超过某个规模之后，单纯堆参数的边际收益在递减；现在的趋势是参数不一定最大，但数据要够多、算力要够花，Llama 3 的 8B 模型用 15 万亿 token 训出来，效果比早期 175B 的 GPT-3 还好。[原文§「涌现能力」：量变到质变的关键](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E3%80%8C%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B%E3%80%8D-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E5%85%B3%E9%94%AE)
- **D1-16** 工程层面从拼装积木变成统一系统，一个大模型统一服务全公司、多个场景复用；范式层面从分类器思维切换到生成器思维，交互从点选项变成对话，评估从准确率、召回率变成 LLM-as-Judge 评分和用户满意度；能力层面是模型可以做人没明确教过的任务，能力上限不再被人工标注规模锁死。[原文§三个本质区别总结](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E4%B8%89%E4%B8%AA%E6%9C%AC%E8%B4%A8%E5%8C%BA%E5%88%AB%E6%80%BB%E7%BB%93)
- **D1-17** 过去先想数据怎么标、选哪个 BERT 变体、微调怎么调超参；现在先想 Prompt 怎么写，再想要不要用 RAG 加外部知识，最后才考虑 LoRA 微调。核心技能也从词法分析、句法分析、特征工程、模型调参，变成 Prompt Engineering、RAG 系统设计、Agent 编排和对齐微调。[原文§这场转变对工程团队意味着什么](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E8%BF%99%E5%9C%BA%E8%BD%AC%E5%8F%98%E5%AF%B9%E5%B7%A5%E7%A8%8B%E5%9B%A2%E9%98%9F%E6%84%8F%E5%91%B3%E7%9D%80%E4%BB%80%E4%B9%88)
- **D1-18** 判别式是输入文本、输出标签，理解和生成是分开的；LLM 是输入文本、输出更多文本，理解和生成在同一个模型里完成。[原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/what_is_llm.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)
- **D1-19** DeepMind 的 Chinchilla 论文给出了更精细的比例：参数和数据按 1 比 20 配，例如 70B 参数最好配 1.4T token。[原文§「涌现能力」：量变到质变的关键](https://xiaolinnote.com/ai/llm/what_is_llm.html#%E3%80%8C%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B%E3%80%8D-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E5%85%B3%E9%94%AE)

## 2. Transformer

原文：[2. 讲讲 Transformer 架构基本原理？Encoder 和 Decoder 是什么？](https://xiaolinnote.com/ai/llm/transformer_architecture.html)。

- **D2-1** RNN 从左到右逐个处理，第 N 步必须等第 N-1 步算完，无法利用 GPU 并行，训练极慢；序列很长时梯度在反向传播中指数级衰减，很难学到相距很远的词之间的关系，LSTM 只是有所缓解。[原文§Transformer 之前：RNN 的致命缺陷](https://xiaolinnote.com/ai/llm/transformer_architecture.html#transformer-%E4%B9%8B%E5%89%8D-rnn-%E7%9A%84%E8%87%B4%E5%91%BD%E7%BC%BA%E9%99%B7)
- **D2-2** 让序列中的每个 token 都能直接关注任意其他位置，计算自己与各位置的相关程度，再按相关程度加权聚合其他位置的信息。[原文§Self-Attention 的核心直觉](https://xiaolinnote.com/ai/llm/transformer_architecture.html#self-attention-%E7%9A%84%E6%A0%B8%E5%BF%83%E7%9B%B4%E8%A7%89)
- **D2-3** Q 代表我想找什么，K 代表我有什么标签，V 代表我的实际内容：用 Q 去匹配各位置的 K 算出相似度分数，再按分数的权重对 V 加权求和。[原文§Self-Attention 的核心直觉](https://xiaolinnote.com/ai/llm/transformer_architecture.html#self-attention-%E7%9A%84%E6%A0%B8%E5%BF%83%E7%9B%B4%E8%A7%89)
- **D2-4** d_k 很大时点积的方差约等于 d_k，数值范围很大，过 softmax 后输出接近 one-hot，梯度接近 0，模型训不起来；除以根号 d_k 把方差压回 1，softmax 输出分布合理，梯度才能正常传播。[原文§为什么要除以 √d_k：缩放点积的数学直觉](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E9%99%A4%E4%BB%A5-%E2%88%9Ad-k-%E7%BC%A9%E6%94%BE%E7%82%B9%E7%A7%AF%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9B%B4%E8%A7%89)
- **D2-5** 单组 Q/K/V 只能学到一种关联关系；多头把 Q/K/V 投影到多个子空间，各组独立计算注意力后拼接，每个头可以专注于不同类型的语言关联，例如主谓关系、宾动关系和指代关系。[原文§Multi-Head Attention：多角度观察](https://xiaolinnote.com/ai/llm/transformer_architecture.html#multi-head-attention-%E5%A4%9A%E8%A7%92%E5%BA%A6%E8%A7%82%E5%AF%9F)
- **D2-6** FFN 对每个位置独立做非线性变换，补充注意力层学不到的信息，研究表明它储存了大量事实知识；位置编码则给每个 token 注入位置信息，因为 Self-Attention 本身不考虑词的顺序。 [原文§前馈网络（FFN）的作用](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E5%89%8D%E9%A6%88%E7%BD%91%E7%BB%9C-ffn-%E7%9A%84%E4%BD%9C%E7%94%A8) [原文§位置编码：注入顺序信息](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81-%E6%B3%A8%E5%85%A5%E9%A1%BA%E5%BA%8F%E4%BF%A1%E6%81%AF)
- **D2-7** Encoder-only 双向关注，擅长文本分类、命名实体识别、语义相似度等理解任务；Decoder-only 用因果掩码只看前文，适合文本生成；Encoder-Decoder 适合输入和输出是不同文本的任务，例如翻译、摘要和问答。[原文§Encoder-only、Decoder-only 和 Encoder-Decoder 三种架构](https://xiaolinnote.com/ai/llm/transformer_architecture.html#encoder-only%E3%80%81decoder-only-%E5%92%8C-encoder-decoder-%E4%B8%89%E7%A7%8D%E6%9E%B6%E6%9E%84)
- **D2-8** 因为预测下一个 token 这个目标极其统一，所有任务都能表达成续写；它可以直接在海量无标注文本上做自监督训练，更容易扩大规模，而且规模越大涌现出的能力越强。[原文§为什么 Decoder-only 赢了](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E4%B8%BA%E4%BB%80%E4%B9%88-decoder-only-%E8%B5%A2%E4%BA%86)

### 补充考点

- **D2-9** Q、K、V 都是从同一个输入 X 算出来的：输入既扮演提问者 Q，也扮演被查者 K 和 V；这区别于 Cross-Attention 里 Q 来自一边、K 和 V 来自另一边的形式。[原文§Q/K/V 是怎么从输入变换得到的](https://xiaolinnote.com/ai/llm/transformer_architecture.html#q-k-v-%E6%98%AF%E6%80%8E%E4%B9%88%E4%BB%8E%E8%BE%93%E5%85%A5%E5%8F%98%E6%8D%A2%E5%BE%97%E5%88%B0%E7%9A%84)
- **D2-10** 如果让 Q、K、V 都直接等于 X 而不做变换，模型就学不到该从什么角度提问、用什么标签匹配、返回什么内容这些差异；三个独立投影给了模型 3 倍的自由度去学习，容量大幅提升。[原文§Q/K/V 是怎么从输入变换得到的](https://xiaolinnote.com/ai/llm/transformer_architecture.html#q-k-v-%E6%98%AF%E6%80%8E%E4%B9%88%E4%BB%8E%E8%BE%93%E5%85%A5%E5%8F%98%E6%8D%A2%E5%BE%97%E5%88%B0%E7%9A%84)
- **D2-11** d_k 通常等于 d_model 除以头数 H，例如 d_model 为 512、H 为 8 时 d_k 是 64；这样多头的总参数量和单头版本基本一致，不增加额外的计算开销。[原文§Q/K/V 是怎么从输入变换得到的](https://xiaolinnote.com/ai/llm/transformer_architecture.html#q-k-v-%E6%98%AF%E6%80%8E%E4%B9%88%E4%BB%8E%E8%BE%93%E5%85%A5%E5%8F%98%E6%8D%A2%E5%BE%97%E5%88%B0%E7%9A%84)
- **D2-12** 假设 Q 和 K 的每一维都是均值 0、方差 1 的随机数，点积是 d_k 个数相加，方差就是 d_k，例如 d_k 为 128 时标准差约 11.3，数值过大。[原文§为什么要除以 √d_k：缩放点积的数学直觉](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E9%99%A4%E4%BB%A5-%E2%88%9Ad-k-%E7%BC%A9%E6%94%BE%E7%82%B9%E7%A7%AF%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9B%B4%E8%A7%89)
- **D2-13** 一是在 Attention 之前先做 Layer Norm 归一化，但这不算真正替换；二是用一个可学习的标量代替，效果差不多却多了参数，不如固定常数简洁；三是直接把 d_k 限制得很小，等于限制了模型容量。所有主流 Transformer 实现都仍用 √d_k。[原文§为什么要除以 √d_k：缩放点积的数学直觉](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E9%99%A4%E4%BB%A5-%E2%88%9Ad-k-%E7%BC%A9%E6%94%BE%E7%82%B9%E7%A7%AF%E7%9A%84%E6%95%B0%E5%AD%A6%E7%9B%B4%E8%A7%89)
- **D2-14** 每个 Transformer 块除了注意力层，还有一个前馈网络 FFN，结构是两层全连接加一个激活函数。[原文§前馈网络（FFN）的作用](https://xiaolinnote.com/ai/llm/transformer_architecture.html#%E5%89%8D%E9%A6%88%E7%BD%91%E7%BB%9C-ffn-%E7%9A%84%E4%BD%9C%E7%94%A8)

## 3. MHA 的优化

原文：[3. 多头注意力（MHA）有哪些局限？MQA、GQA、Flash Attention 怎么解决？](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html)。

- **D3-1** 自回归推理为了避免每次从头计算，要把前面所有 token 的 K 和 V 缓存下来，每层、每个 head 各存一份；大小约为 2×batch×序列长×层数×头数×每头维度×字节数，原文估算一个 7B 模型跑 32K 上下文，光 KV Cache 就约 17GB。[原文§先理清 MHA 的瓶颈到底卡在哪](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E5%85%88%E7%90%86%E6%B8%85-mha-%E7%9A%84%E7%93%B6%E9%A2%88%E5%88%B0%E5%BA%95%E5%8D%A1%E5%9C%A8%E5%93%AA)
- **D3-2** MQA 让所有 head 共享同一份 K 和 V，只有 Q 是各 head 独立的，KV Cache 降到原来的 1/H；代价是多视角被压缩，表达能力下降，实测大模型效果下降约 2% 到 5%，推理类任务损失更明显。[原文§MQA：暴力共享 K/V，显存直接压到 1/H](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#mqa-%E6%9A%B4%E5%8A%9B%E5%85%B1%E4%BA%AB-k-v-%E6%98%BE%E5%AD%98%E7%9B%B4%E6%8E%A5%E5%8E%8B%E5%88%B0-1-h)
- **D3-3** GQA 把 H 个 head 分成 G 组，组内共享一份 K/V，组间各自独立；G=H 时就是 MHA，G=1 时就是 MQA。KV Cache 压到 G/H，例如 H=32、G=8 时为 1/4，而效果几乎与 MHA 持平。[原文§GQA：折中方案，效果与显存的甜蜜点](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#gqa-%E6%8A%98%E4%B8%AD%E6%96%B9%E6%A1%88-%E6%95%88%E6%9E%9C%E4%B8%8E%E6%98%BE%E5%AD%98%E7%9A%84%E7%94%9C%E8%9C%9C%E7%82%B9)
- **D3-4** 标准实现要在 HBM 显存上反复读写 N×N 的中间矩阵；Flash Attention 把 Q、K、V 切成小块，在带宽快得多的片上 SRAM 里计算，用在线 softmax 增量维护最大值和累积和，算完直接累加到输出，不把 N×N 矩阵写回显存，显存从 O(N²) 降到 O(N)。[原文§Flash Attention：换条赛道，从计算实现优化](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#flash-attention-%E6%8D%A2%E6%9D%A1%E8%B5%9B%E9%81%93-%E4%BB%8E%E8%AE%A1%E7%AE%97%E5%AE%9E%E7%8E%B0%E4%BC%98%E5%8C%96)
- **D3-5** 能。GQA 是结构层的优化，改的是有几套 K/V，用来降低 KV Cache 占用；Flash Attention 是实现层的优化，改的是注意力计算的执行方式。两者针对不同维度的瓶颈，是叠加而不是替代关系，主流模型通常一起用。[原文§三类优化的关系：是叠加不是替代](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E4%B8%89%E7%B1%BB%E4%BC%98%E5%8C%96%E7%9A%84%E5%85%B3%E7%B3%BB-%E6%98%AF%E5%8F%A0%E5%8A%A0%E4%B8%8D%E6%98%AF%E6%9B%BF%E4%BB%A3)

### 补充考点

- **D3-6** 每一层都要算一个 N×N 的注意力分数矩阵，并存下来供反向传播使用，N 为 4K 时是 1600 万个数，32K 时膨胀到 10 亿个数；计算上是 O(N²)，N 翻倍计算量翻 4 倍。不过训练时这个矩阵是一次性算完的，不需要跨时间步持续保留。[原文§先理清 MHA 的瓶颈到底卡在哪](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E5%85%88%E7%90%86%E6%B8%85-mha-%E7%9A%84%E7%93%B6%E9%A2%88%E5%88%B0%E5%BA%95%E5%8D%A1%E5%9C%A8%E5%93%AA)
- **D3-7** GPU 计算单元的算力很强，但显存带宽跟不上，Attention 计算里大量时间花在等数据从显存搬到计算单元；这就是访存受限问题，算力翻倍的 GPU 跑 Attention 可能只快 20%，因为瓶颈不在算力。[原文§先理清 MHA 的瓶颈到底卡在哪](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E5%85%88%E7%90%86%E6%B8%85-mha-%E7%9A%84%E7%93%B6%E9%A2%88%E5%88%B0%E5%BA%95%E5%8D%A1%E5%9C%A8%E5%93%AA)
- **D3-8** N² 复杂度让序列稍长计算量就按平方膨胀；KV Cache 让长上下文显存爆掉；访存带宽让 GPU 算力发挥不出来。三者互相加剧，长上下文下尤其明显，后面的优化方案都是在攻击其中一个或多个。[原文§先理清 MHA 的瓶颈到底卡在哪](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E5%85%88%E7%90%86%E6%B8%85-mha-%E7%9A%84%E7%93%B6%E9%A2%88%E5%88%B0%E5%BA%95%E5%8D%A1%E5%9C%A8%E5%93%AA)
- **D3-9** 原本每个 head 有自己的一套 K 和 V，可以从多个角度理解上下文；MQA 强行让所有 head 共用一套，等于都看同样的标签和内容，只是用不同的 Query 去问，多视角的能力被压缩成单视角。注意力公式不变，训练流程几乎不用改。[原文§MQA：暴力共享 K/V，显存直接压到 1/H](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#mqa-%E6%9A%B4%E5%8A%9B%E5%85%B1%E4%BA%AB-k-v-%E6%98%BE%E5%AD%98%E7%9B%B4%E6%8E%A5%E5%8E%8B%E5%88%B0-1-h)
- **D3-10** GQA 是一个连续光谱：分组数 G 等于头数 H 时退化成 MHA，G 等于 1 时退化成 MQA，中间可以任意取值。[原文§GQA：折中方案，效果与显存的甜蜜点](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#gqa-%E6%8A%98%E4%B8%AD%E6%96%B9%E6%A1%88-%E6%95%88%E6%9E%9C%E4%B8%8E%E6%98%BE%E5%AD%98%E7%9A%84%E7%94%9C%E8%9C%9C%E7%82%B9)
- **D3-11** MLA 即多头潜在注意力，DeepSeek V2/V3 采用：不直接共享 K/V，而是把每个 token 的 K/V 通过降维投影压缩到低维 latent 向量里存起来，需要时再配合额外投影参与计算；目标同样是压低 KV Cache，但实现机制不同，不能简单说成 GQA 的升级版。[原文§GQA：折中方案，效果与显存的甜蜜点](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#gqa-%E6%8A%98%E4%B8%AD%E6%96%B9%E6%A1%88-%E6%95%88%E6%9E%9C%E4%B8%8E%E6%98%BE%E5%AD%98%E7%9A%84%E7%94%9C%E8%9C%9C%E7%82%B9)
- **D3-12** softmax 要看整行才能算，不能局部独立计算；Flash Attention 用在线 softmax 算法，分块计算的同时维护当前最大值和累积和的状态，每来一块就做增量更新，最终结果和一次性计算完全一样。[原文§Flash Attention：换条赛道，从计算实现优化](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#flash-attention-%E6%8D%A2%E6%9D%A1%E8%B5%9B%E9%81%93-%E4%BB%8E%E8%AE%A1%E7%AE%97%E5%AE%9E%E7%8E%B0%E4%BC%98%E5%8C%96)
- **D3-13** 不是。它算的是同一个 Attention 公式，在数学上等价，不是稀疏近似或低秩近似；浮点实现里因分块顺序不同，最后几位可能有微小差异，但不引入模型精度损失。它已迭代到 v3，基本成为 vLLM、SGLang、TGI 等推理框架的默认实现。[原文§Flash Attention：换条赛道，从计算实现优化](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#flash-attention-%E6%8D%A2%E6%9D%A1%E8%B5%9B%E9%81%93-%E4%BB%8E%E8%AE%A1%E7%AE%97%E5%AE%9E%E7%8E%B0%E4%BC%98%E5%8C%96)
- **D3-14** 应指出这是个伪命题：真实工程里它们是组合使用的，因为攻击的是不同维度的瓶颈，是叠加而不是替代。准确地说，MQA 是 GQA 分组数为 1 时的特例，二者选其一决定 K/V 的共享粒度，再与 Flash Attention 叠加。（原文在这一节把 DeepSeek V3 也列为 GQA 加 Flash Attention 的组合，但同一篇前文已说明 DeepSeek V2/V3 用的是 MLA。）[原文§三类优化的关系：是叠加不是替代](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E4%B8%89%E7%B1%BB%E4%BC%98%E5%8C%96%E7%9A%84%E5%85%B3%E7%B3%BB-%E6%98%AF%E5%8F%A0%E5%8A%A0%E4%B8%8D%E6%98%AF%E6%9B%BF%E4%BB%A3)[对照原文§GQA：折中方案，效果与显存的甜蜜点](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#gqa-%E6%8A%98%E4%B8%AD%E6%96%B9%E6%A1%88-%E6%95%88%E6%9E%9C%E4%B8%8E%E6%98%BE%E5%AD%98%E7%9A%84%E7%94%9C%E8%9C%9C%E7%82%B9)
- **D3-15** Sliding Window Attention：每个 token 只关注最近 N 个 token，Mistral 系列用过，代价是丢失远距离信息，通常和全局注意力混合用；Mamba 等状态空间模型：完全抛弃 Attention，理论上可处理无限长上下文，但效果仍有争议，是研究热点而非工程主流。[原文§拓展：长上下文时代还有哪些新方向](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E6%8B%93%E5%B1%95-%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%B6%E4%BB%A3%E8%BF%98%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E6%96%B9%E5%90%91)
- **D3-16** 原文称 Linear Attention（线性注意力）用核函数近似 softmax，把 Attention 的复杂度从 O(N²) 降到 O(N)，代表是 Performer、Linformer（其中 Linformer 用的是低秩投影而不是核函数近似，原文归类不够准确）；但效果离 MHA 还差一截，没有成为主流。[原文§拓展：长上下文时代还有哪些新方向](https://xiaolinnote.com/ai/llm/mha_mqa_gqa_flash_attention.html#%E6%8B%93%E5%B1%95-%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%B6%E4%BB%A3%E8%BF%98%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E6%96%B9%E5%90%91)

## 4. 位置编码

原文：[4. 大模型的位置编码是干什么用的？sin/cos、RoPE、ALiBi 有什么区别？](https://xiaolinnote.com/ai/llm/position_encoding.html)。

- **D4-1** Self-Attention 的计算对位置不敏感：把我打你换成你打我，三个字的 embedding 一样，只是位置变了，算出的结果几乎相同；模型分不清谁在前谁在后，也就分不清主语和宾语。[原文§为什么 Attention 必须有位置编码](https://xiaolinnote.com/ai/llm/position_encoding.html#%E4%B8%BA%E4%BB%80%E4%B9%88-attention-%E5%BF%85%E9%A1%BB%E6%9C%89%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81)
- **D4-2** 用一组不同频率的 sin/cos 函数给每个位置生成一个独特的指纹向量，高频维度区分近距离位置，低频维度区分远距离位置，再把它直接加到对应 token 的 embedding 上，不引入可训练参数。[原文§sin/cos 绝对位置编码：原始 Transformer 的方案](https://xiaolinnote.com/ai/llm/position_encoding.html#sin-cos-%E7%BB%9D%E5%AF%B9%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81-%E5%8E%9F%E5%A7%8B-transformer-%E7%9A%84%E6%96%B9%E6%A1%88)
- **D4-3** RoPE 按位置 m 把 Q 和 K 向量旋转一个角度 mθ；两个旋转后的向量做点积，结果只取决于它们的旋转角度差，也就是只与相对距离 m-n 有关，与各自的绝对位置无关。[原文§RoPE：用旋转把相对位置编进点积](https://xiaolinnote.com/ai/llm/position_encoding.html#rope-%E7%94%A8%E6%97%8B%E8%BD%AC%E6%8A%8A%E7%9B%B8%E5%AF%B9%E4%BD%8D%E7%BD%AE%E7%BC%96%E8%BF%9B%E7%82%B9%E7%A7%AF)
- **D4-4** ALiBi 不动 Q、K、V，而是在 softmax 之前给每对 token 的注意力分数加上一个偏置，值为负的斜率乘以两者的距离；离得越远扣得越多，每个 head 用不同的斜率，以关注不同的距离范围。[原文§ALiBi：直接给注意力加距离惩罚](https://xiaolinnote.com/ai/llm/position_encoding.html#alibi-%E7%9B%B4%E6%8E%A5%E7%BB%99%E6%B3%A8%E6%84%8F%E5%8A%9B%E5%8A%A0%E8%B7%9D%E7%A6%BB%E6%83%A9%E7%BD%9A)
- **D4-5** 位置超出训练长度后，对应的旋转角度是模型从未见过的，效果会衰减；PI 把长位置等比例缩到训练范围内，NTK-aware Scaling 让高频维度几乎不动、低频维度按比例缩小，YaRN 再加入温度参数和分段策略。要稳定支持很长的上下文，很多模型仍需继续训练或校准。[原文§拓展：长上下文外推（NTK / YaRN 简介）](https://xiaolinnote.com/ai/llm/position_encoding.html#%E6%8B%93%E5%B1%95-%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E5%A4%96%E6%8E%A8-ntk-yarn-%E7%AE%80%E4%BB%8B)

### 补充考点

- **D4-6** 序号是离散的整数，加到连续的 embedding 上会把数值拉爆，embedding 通常是负 1 到 1 之间的小数；而且整数序号对长序列没法泛化，训练时见过 1 到 2048，推理时来了 4096，模型从没见过，效果一定崩。[原文§为什么 Attention 必须有位置编码](https://xiaolinnote.com/ai/llm/position_encoding.html#%E4%B8%BA%E4%BB%80%E4%B9%88-attention-%E5%BF%85%E9%A1%BB%E6%9C%89%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81)
- **D4-7** 因为加法不增加维度，结构上更省事；神经网络足够强大，可以从相加的结果里把两部分信息自动解开。[原文§sin/cos 绝对位置编码：原始 Transformer 的方案](https://xiaolinnote.com/ai/llm/position_encoding.html#sin-cos-%E7%BB%9D%E5%AF%B9%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81-%E5%8E%9F%E5%A7%8B-transformer-%E7%9A%84%E6%96%B9%E6%A1%88)
- **D4-8** 更需要相对位置：句法关系的关键是主语和动词之间隔了几个词，而不是它们的绝对编号，前面加多少修饰语相对距离都不变；绝对位置编码给每个位置发一个独立的身份证，要模型自己从两个位置推断相对距离，全靠训练中慢慢学，没有显式的归纳偏置。[原文§绝对位置 vs 相对位置：模型真正想要什么](https://xiaolinnote.com/ai/llm/position_encoding.html#%E7%BB%9D%E5%AF%B9%E4%BD%8D%E7%BD%AE-vs-%E7%9B%B8%E5%AF%B9%E4%BD%8D%E7%BD%AE-%E6%A8%A1%E5%9E%8B%E7%9C%9F%E6%AD%A3%E6%83%B3%E8%A6%81%E4%BB%80%E4%B9%88)
- **D4-9** 在 Attention 计算里，每个 token 的 Q 和 K 向量根据它的位置 m 被旋转一个对应的角度 mθ，θ 是预设常数：位置 0 不旋转，位置 1 旋转 θ，位置 2 旋转 2θ，依此类推，像钟表指针一样位置越靠后转得越多。[原文§RoPE：用旋转把相对位置编进点积](https://xiaolinnote.com/ai/llm/position_encoding.html#rope-%E7%94%A8%E6%97%8B%E8%BD%AC%E6%8A%8A%E7%9B%B8%E5%AF%B9%E4%BD%8D%E7%BD%AE%E7%BC%96%E8%BF%9B%E7%82%B9%E7%A7%AF)
- **D4-10** 天然的相对位置编码，直接编进点积，不用模型自己学；零参数，只是数学上的旋转；旋转不改变向量模长，不破坏 embedding 的数值范围，训练更稳定；只在 Q/K 上做旋转，与 KV Cache、Flash Attention、MQA/GQA 等推理优化无缝叠加。[原文§RoPE：用旋转把相对位置编进点积](https://xiaolinnote.com/ai/llm/position_encoding.html#rope-%E7%94%A8%E6%97%8B%E8%BD%AC%E6%8A%8A%E7%9B%B8%E5%AF%B9%E4%BD%8D%E7%BD%AE%E7%BC%96%E8%BF%9B%E7%82%B9%E7%A7%AF)
- **D4-11** 它的线性距离惩罚带来过强的局部偏置，让模型过度关注近邻，对需要捕捉长距离依赖的任务不利；采用它的模型如 MPT、BLOOM 都不是主流大模型，没能在大厂主力模型上推广开。[原文§ALiBi：直接给注意力加距离惩罚](https://xiaolinnote.com/ai/llm/position_encoding.html#alibi-%E7%9B%B4%E6%8E%A5%E7%BB%99%E6%B3%A8%E6%84%8F%E5%8A%9B%E5%8A%A0%E8%B7%9D%E7%A6%BB%E6%83%A9%E7%BD%9A)
- **D4-12** 不能。有些外推技巧在推理时直接改 RoPE 参数就有收益，但要做到稳定的 100K 以上长上下文，很多模型还要配合长上下文继续训练、校准数据或专门的评测筛选；RoPE 地位稳固，是因为它给了社区一个好调、好扩展的基础。[原文§拓展：长上下文外推（NTK / YaRN 简介）](https://xiaolinnote.com/ai/llm/position_encoding.html#%E6%8B%93%E5%B1%95-%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E5%A4%96%E6%8E%A8-ntk-yarn-%E7%AE%80%E4%BB%8B)
- **D4-13** RoPE 赢在相对位置、长上下文扩展和工程兼容性三个维度的均衡；配合 NTK Scaling、YaRN 等扩展技巧和必要的长上下文训练或校准，能把上下文扩到很长，所以 Llama、Qwen、DeepSeek、Mistral 等主流开源模型大量使用。[原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/position_encoding.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 5. Tokenizer

原文：[5. 什么是大模型项目的分词器？原理是什么？](https://xiaolinnote.com/ai/llm/tokenizer.html)。

- **D5-1** 模型本质上是输入一串整数、输出下一个整数的概率分布，完全不认识字符串；Tokenizer 负责编码，把文本变成 token ID 序列，以及解码，把 ID 序列还原成文本。[原文§为什么需要 Tokenizer](https://xiaolinnote.com/ai/llm/tokenizer.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-tokenizer)
- **D5-2** 先把语料拆成字节或字符等最小单元，作为初始词表；再反复统计相邻 token 对的出现频率，把最高频的一对合并成新 token 加入词表并更新语料；重复到词表达到预设大小为止。[原文§BPE 算法：从合并规则开始](https://xiaolinnote.com/ai/llm/tokenizer.html#bpe-%E7%AE%97%E6%B3%95-%E4%BB%8E%E5%90%88%E5%B9%B6%E8%A7%84%E5%88%99%E5%BC%80%E5%A7%8B)
- **D5-3** 字符级词表很小，但序列变得很长，注意力计算量大增，单个字符携带的语义也太少；词级词表会膨胀到几十万以上，遇到没见过的新词无法处理，中文还要先做分词；子词切分处在两者之间，既控制词表大小又能处理新词。[原文§朴素方案的问题](https://xiaolinnote.com/ai/llm/tokenizer.html#%E6%9C%B4%E7%B4%A0%E6%96%B9%E6%A1%88%E7%9A%84%E9%97%AE%E9%A2%98)
- **D5-4** 特殊 token 不来自文本，而是给模型传递结构信息：BOS 标记序列开始，EOS 标记结束并让模型停止生成，PAD 用于对齐不同长度的序列，SEP 用于分隔不同部分；ChatML 里的 <|im_start|> 和 <|im_end|> 用来区分对话轮次和角色。[原文§特殊 Token 的作用](https://xiaolinnote.com/ai/llm/tokenizer.html#%E7%89%B9%E6%AE%8A-token-%E7%9A%84%E4%BD%9C%E7%94%A8)
- **D5-5** API 按 token 计费，上下文窗口也按 token 计；字数与 token 数的比例取决于语言、内容类型和具体模型的 tokenizer，1000 汉字约 1000 到 1500 token 只是经验值，中文加代码混合时差别更大，必须用目标模型的 tokenizer 实际数出来。[原文§为什么 Tokenizer 对实际工程很重要](https://xiaolinnote.com/ai/llm/tokenizer.html#%E4%B8%BA%E4%BB%80%E4%B9%88-tokenizer-%E5%AF%B9%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E5%BE%88%E9%87%8D%E8%A6%81)

### 补充考点

- **D5-6** 字符级分词词汇表很小，但序列会变得非常长，使 O(N²) 的 Attention 计算量飙升，而且单个字符语义太少，模型要重新学出单词的概念；词级分词的词汇表会膨胀到几十万甚至几百万，更严重的是 OOV，遇到没见过的新词只能输出未知词标记，中文还得先做分词，分错了下游全错。[原文§朴素方案的问题](https://xiaolinnote.com/ai/llm/tokenizer.html#%E6%9C%B4%E7%B4%A0%E6%96%B9%E6%A1%88%E7%9A%84%E9%97%AE%E9%A2%98)
- **D5-7** 模型对这些特殊 token 有特殊的意识：它们的 embedding 在训练中被专门优化，所以模型能根据这些信号理解对话的结构。常见的有 BOS、EOS、PAD、SEP，以及 ChatML 格式里的对话起始标记。[原文§特殊 Token 的作用](https://xiaolinnote.com/ai/llm/tokenizer.html#%E7%89%B9%E6%AE%8A-token-%E7%9A%84%E4%BD%9C%E7%94%A8)
- **D5-8** Tokenizer 可能把一个词从中间硬切开，导致下游解析或检索失败；这种边界情况要在工程上处理，例如保留几百 token 的安全 buffer。[原文§为什么 Tokenizer 对实际工程很重要](https://xiaolinnote.com/ai/llm/tokenizer.html#%E4%B8%BA%E4%BB%80%E4%B9%88-tokenizer-%E5%AF%B9%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E5%BE%88%E9%87%8D%E8%A6%81)
- **D5-9** 三步流程是初始化基础词汇表、反复合并最高频的 pair、直到词汇表达到预设大小，并补充 BPE 只是子词分词的一种，SentencePiece、Unigram、WordPiece 也很常见；工程影响包括 API 按 token 计费、1000 个汉字约等于 1000 到 1500 个 token、上下文窗口管理和避免截断。[原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/tokenizer.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)
- **D5-10** 不一定。中文没有空格分隔词语；在大多数主流模型的词汇表里，常用汉字会直接作为独立 token 存在，常见的词语如“人工智能”可能被合并成单个 token，也可能是“人工”加“智能”两个 token，具体取决于训练数据里的频率。[原文§中文分词的特点](https://xiaolinnote.com/ai/llm/tokenizer.html#%E4%B8%AD%E6%96%87%E5%88%86%E8%AF%8D%E7%9A%84%E7%89%B9%E7%82%B9)

## 6. 训练大模型

原文：[6. 大模型是怎么训练出来的？](https://xiaolinnote.com/ai/llm/llm_training.html)。

- **D6-1** 目标是预测下一个 token，即因果语言模型；要在各种上下文里预测准确，模型必须理解语法、记住事实、学会推理，由此获得语言能力和世界知识，这是所有上层能力的根基。[原文§第一阶段：预训练，读万卷书](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E9%A2%84%E8%AE%AD%E7%BB%83-%E8%AF%BB%E4%B8%87%E5%8D%B7%E4%B9%A6)
- **D6-2** 预训练后的模型是文本续写机器，给它一个问题它可能只是接着往下发散，并没有在回答；SFT 用指令和期望回答组成的数据继续训练，让它学会看到这种格式就给出完整答案，从续写模式切换到对话模式。[原文§第二阶段：SFT，从「续写机器」变「对话机器」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-sft-%E4%BB%8E%E3%80%8C%E7%BB%AD%E5%86%99%E6%9C%BA%E5%99%A8%E3%80%8D%E5%8F%98%E3%80%8C%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E3%80%8D)
- **D6-3** 让模型的行为更符合人类的价值观和偏好：SFT 只教会了什么格式算合格回答，没告诉它哪种回答用户更喜欢、哪些话不该说；对齐阶段用 RLHF 或 DPO 这类方法补上这一课。[原文§第三阶段：对齐，学会「好好说话」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5-%E5%AF%B9%E9%BD%90-%E5%AD%A6%E4%BC%9A%E3%80%8C%E5%A5%BD%E5%A5%BD%E8%AF%B4%E8%AF%9D%E3%80%8D)
- **D6-4** 只做预训练，模型只会续写、不会对话；做了预训练和 SFT 但不对齐，回答质量参差，可能生成有害内容；跳过预训练只做 SFT 和对齐，则是在空壳上优化。预训练决定能力的天花板，后两者只是在天花板之内做优化。[原文§三阶段为什么缺一不可](https://xiaolinnote.com/ai/llm/llm_training.html#%E4%B8%89%E9%98%B6%E6%AE%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E7%BC%BA%E4%B8%80%E4%B8%8D%E5%8F%AF)

### 补充考点

- **D6-5** 用培养员工作类比：先要有基础知识，从小学读到大学，对应预训练；再要会公司的流程，知道怎么写邮件、和客户对话，是适配工作场景，对应 SFT；最后要懂职业素养，知道该说什么不该说什么，是价值观和分寸感，对应对齐。[原文§先理一个直觉：训练大模型为什么要分阶段？](https://xiaolinnote.com/ai/llm/llm_training.html#%E5%85%88%E7%90%86%E4%B8%80%E4%B8%AA%E7%9B%B4%E8%A7%89-%E8%AE%AD%E7%BB%83%E5%A4%A7%E6%A8%A1%E5%9E%8B%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%86%E9%98%B6%E6%AE%B5)
- **D6-6** 来源是能爬到的所有公开文本：互联网网页、GitHub 代码、维基百科、图书、学术论文、新闻等；原始数据里充满重复内容、机器乱码、低质量灌水和广告，要做去重、过滤低质量内容、识别语言、剔除有害信息，高质量训练集的清洗成本可能比训练本身还贵，是大模型公司的核心竞争力之一。[原文§第一阶段：预训练，读万卷书](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E9%A2%84%E8%AE%AD%E7%BB%83-%E8%AF%BB%E4%B8%87%E5%8D%B7%E4%B9%A6)
- **D6-7** 因为要预测得准，模型必须掌握背后的知识和能力：预测北京是中国的什么，要知道事实；预测算式结果，要会算数；预测代码下一行，要理解编程逻辑；预测诗的下一句，要懂韵律和意境。简单的目标加海量数据，带来涌现的智能。[原文§第一阶段：预训练，读万卷书](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E9%A2%84%E8%AE%AD%E7%BB%83-%E8%AF%BB%E4%B8%87%E5%8D%B7%E4%B9%A6)
- **D6-8** 训练 GPT-3 据估算花了约 3.14×10²³ 次浮点运算，单张 GPU 要算几十年以上；OpenAI 实际用了几百到几千张 GPU 并行训练几个月，算力成本上千万美元，所以早期只有少数巨头玩得起预训练。（原文写的是一张 A100 需要 36 万年，量级有误：按 NVIDIA 官方公布的 A100 FP16 稠密峰值约 312 TFLOPS 折算，3.14×10²³ ÷ 3.12×10¹⁴ ≈ 1.0×10⁹ 秒，约 32 年；这是理论峰值估算，实际利用率更低，耗时更长。）[原文§第一阶段：预训练，读万卷书](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5-%E9%A2%84%E8%AE%AD%E7%BB%83-%E8%AF%BB%E4%B8%87%E5%8D%B7%E4%B9%A6)[核对来源：GPT-3 论文](https://arxiv.org/abs/2005.14165)[核对来源：NVIDIA GPU 性能背景文档](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html)
- **D6-9** 它只是续写机器：给一段文字会继续往下写，但并不理解你在问问题，例如问天空为什么是蓝色，它可能顺着发散续写而不作答；SFT 用指令和回答成对的数据把它变成对话机器。[原文§第二阶段：SFT，从「续写机器」变「对话机器」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-sft-%E4%BB%8E%E3%80%8C%E7%BB%AD%E5%86%99%E6%9C%BA%E5%99%A8%E3%80%8D%E5%8F%98%E3%80%8C%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E3%80%8D)
- **D6-10** 质量比数量更重要：Llama 2 用了约 100 万条精心标注的 SFT 数据，AlpacaFarm 的研究发现几千条高质量数据的效果好于几十万条低质量数据；多样性也很关键，要涵盖问答、写作、代码、角色扮演、数学推理、翻译等场景，覆盖面不够，模型在没见过的任务上就会表现差。[原文§第二阶段：SFT，从「续写机器」变「对话机器」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%BA%8C%E9%98%B6%E6%AE%B5-sft-%E4%BB%8E%E3%80%8C%E7%BB%AD%E5%86%99%E6%9C%BA%E5%99%A8%E3%80%8D%E5%8F%98%E3%80%8C%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E3%80%8D)
- **D6-11** 先让标注员对同一问题的多个回答排序，收集偏好数据；再训一个奖励模型自动给回答打分；最后用 PPO 调整大模型参数，让回答尽量得高分。难点是流程长、要同时维护好几个模型、训练不稳定，模型还可能学会讨好奖励模型而不是真的变好，即奖励 Hacking。[原文§第三阶段：对齐，学会「好好说话」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5-%E5%AF%B9%E9%BD%90-%E5%AD%A6%E4%BC%9A%E3%80%8C%E5%A5%BD%E5%A5%BD%E8%AF%B4%E8%AF%9D%E3%80%8D)
- **D6-12** DPO 发现 RLHF 的优化目标可以等价改写成纯监督学习，不需要奖励模型和 PPO，直接用问题、好回答、差回答的三元组训练；它简单稳定，是开源社区常见方案。但 Llama 2-Chat 公开论文的主线是 SFT、拒绝采样和 PPO/RLHF，并不是 DPO，这样说不严谨。[原文§第三阶段：对齐，学会「好好说话」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5-%E5%AF%B9%E9%BD%90-%E5%AD%A6%E4%BC%9A%E3%80%8C%E5%A5%BD%E5%A5%BD%E8%AF%B4%E8%AF%9D%E3%80%8D)
- **D6-13** 在预训练阶段的数据、算力和工程经验：SFT 和对齐的技巧公开材料都有，相对透明；预训练的这些东西要么靠时间积累，要么靠真金白银，后来者难以追赶。[原文§三阶段为什么缺一不可](https://xiaolinnote.com/ai/llm/llm_training.html#%E4%B8%89%E9%98%B6%E6%AE%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E7%BC%BA%E4%B8%80%E4%B8%8D%E5%8F%AF)
- **D6-14** 先让标注员对同一问题的多个回答排序，收集偏好数据；再训一个奖励模型自动给回答打分；最后用 PPO 调整大模型参数，让回答尽量得高分。[原文§第三阶段：对齐，学会「好好说话」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5-%E5%AF%B9%E9%BD%90-%E5%AD%A6%E4%BC%9A%E3%80%8C%E5%A5%BD%E5%A5%BD%E8%AF%B4%E8%AF%9D%E3%80%8D)
- **D6-15** 不严谨。DPO 简单稳定，是开源社区常见的方案，但 Llama 2-Chat 公开论文的主线是 SFT、拒绝采样和 PPO/RLHF，并不是 DPO。[原文§第三阶段：对齐，学会「好好说话」](https://xiaolinnote.com/ai/llm/llm_training.html#%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5-%E5%AF%B9%E9%BD%90-%E5%AD%A6%E4%BC%9A%E3%80%8C%E5%A5%BD%E5%A5%BD%E8%AF%B4%E8%AF%9D%E3%80%8D)

## 7. Scaling Law

原文：[7. 什么是 Scaling Law？大模型的「涌现能力」是怎么回事？](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html)。

- **D7-1** 模型的损失值随模型参数量、训练数据量、训练算力这三个量按幂律下降：规模翻倍，损失按一个可以提前算出的固定比例下降，在当时的实验规模内没有看到饱和点。[原文§Scaling Law 是什么？为什么它震撼了整个业界](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#scaling-law-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%83%E9%9C%87%E6%92%BC%E4%BA%86%E6%95%B4%E4%B8%AA%E4%B8%9A%E7%95%8C)
- **D7-2** 前提是给定固定的训练算力：这时参数和数据按接近 1:20 的比例配，即每个参数约配 20 个 token，最终损失更低。它是该实验条件下拟合出的算力最优经验点，不是自然常数。[原文§Chinchilla 2022：参数和数据要按 1:20 的比例配](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#chinchilla-2022-%E5%8F%82%E6%95%B0%E5%92%8C%E6%95%B0%E6%8D%AE%E8%A6%81%E6%8C%89-1-20-%E7%9A%84%E6%AF%94%E4%BE%8B%E9%85%8D)
- **D7-3** 因为 1:20 是固定训练算力下的最优分配，而不是数据上限；愿意投入更多训练计算、继续喂高质量 token，loss 仍会下降。小参数模型的推理成本低，所以后来的模型用更多训练计算换更低的部署成本，例如 Llama 3 8B 配了 15T token。[原文§Llama 3 时代：Chinchilla 不是数据上限](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#llama-3-%E6%97%B6%E4%BB%A3-chinchilla-%E4%B8%8D%E6%98%AF%E6%95%B0%E6%8D%AE%E4%B8%8A%E9%99%90)
- **D7-4** Mirage 论文指出很多涌现只在离散指标下出现：exact match 答错任何一步就得 0 分，于是看到小模型一直是 0 分、大模型突然跳高；换成部分正确率这类连续指标，同样的数据就变成一条平滑上升的曲线。[原文§Mirage 挑战：涌现可能是测量假象](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#mirage-%E6%8C%91%E6%88%98-%E6%B6%8C%E7%8E%B0%E5%8F%AF%E8%83%BD%E6%98%AF%E6%B5%8B%E9%87%8F%E5%81%87%E8%B1%A1)
- **D7-5** Chinchilla 的配比偏训练算力最优；但参数越多，推理时的显存和延迟越高，8B 模型一台消费级 GPU 就能部署，175B 模型要好几台 H100。为了降低部署成本，可以训练一个参数较小、token 更多的模型。[原文§Llama 3 时代：Chinchilla 不是数据上限](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#llama-3-%E6%97%B6%E4%BB%A3-chinchilla-%E4%B8%8D%E6%98%AF%E6%95%B0%E6%8D%AE%E4%B8%8A%E9%99%90)
- **D7-6** 原文指出两个潜在的天花板：数据见底，高质量公开文本的总量有限，估计在 10T 到 50T token，即数据墙问题；算力增长放缓，进一步堆参数的边际成本越来越高。应对方向包括合成数据、多模态数据和强化学习数据。[原文§Scaling Law 的天花板与未来](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#scaling-law-%E7%9A%84%E5%A4%A9%E8%8A%B1%E6%9D%BF%E4%B8%8E%E6%9C%AA%E6%9D%A5)

### 补充考点

- **D7-7** 涌现能力是 Scaling Law 的副产物：模型规模超过某个临界值，典型是 50B 到 100B 参数，多步推理、上下文学习、跨语言迁移、代码理解等能力会从完全不能突变到能做；2023 年斯坦福的 Mirage 论文认为很多涌现只是评估指标不连续造成的测量假象，换成连续指标曲线就平滑了。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D7-8** 它没有回答参数和数据应该按什么比例配；当时普遍做法是参数能加多少加多少、数据差不多就行，结果训出一批严重欠训的大模型，最典型的就是 GPT-3。[原文§Scaling Law 是什么？为什么它震撼了整个业界](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#scaling-law-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AE%83%E9%9C%87%E6%92%BC%E4%BA%86%E6%95%B4%E4%B8%AA%E4%B8%9A%E7%95%8C)
- **D7-9** 按 1 比 20 配比的 Chinchilla 只有 70B 参数、配 1.4T tokens，效果却明显超过 280B 参数、300B tokens 的 Gopher 和 GPT-3；这说明当时的大模型都严重欠训，GPT-3 按最优配比应配 3.5T tokens，实际只用了 300B，差了一个数量级。[原文§Chinchilla 2022：参数和数据要按 1:20 的比例配](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#chinchilla-2022-%E5%8F%82%E6%95%B0%E5%92%8C%E6%95%B0%E6%8D%AE%E8%A6%81%E6%8C%89-1-20-%E7%9A%84%E6%AF%94%E4%BE%8B%E9%85%8D)
- **D7-10** 不是。Llama 3 的数据规模是 Chinchilla 推荐值的 94 倍，Meta 实测数据量从 1T 推到 15T 的过程中 loss 一直稳定下降、效果一直提升；用 8B 参数加 15T tokens 就超过了 175B 的 GPT-3，目标是推理便宜、部署容易时，小参数加大数据很有吸引力。[原文§Llama 3 时代：Chinchilla 不是数据上限](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#llama-3-%E6%97%B6%E4%BB%A3-chinchilla-%E4%B8%8D%E6%98%AF%E6%95%B0%E6%8D%AE%E4%B8%8A%E9%99%90)
- **D7-11** 定义是某项能力在小模型上完全看不到，规模超过某个临界点后突然出现，曲线是先趴在地上、到某个点垂直上冲的折线；上下文学习在 1.5B 的 GPT-2 上完全看不到，在 175B 的 GPT-3 上突然有了，临界点在 100B 左右。[原文§涌现能力：量变到质变的临界点](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E4%B8%B4%E7%95%8C%E7%82%B9)
- **D7-12** 这个区间的物理意义还没有定论；一个流行的解释是模型大到一定程度，注意力头数、隐藏维度等达到了能编码复杂推理结构的最低门槛，再小就编码不了。[原文§涌现能力：量变到质变的临界点](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B-%E9%87%8F%E5%8F%98%E5%88%B0%E8%B4%A8%E5%8F%98%E7%9A%84%E4%B8%B4%E7%95%8C%E7%82%B9)
- **D7-13** 核心论点是涌现可能不是模型的非线性特性，而是评估指标的不连续性放大了本来连续的能力提升，例如只看最终答案是否完全正确的 exact match。中立结论是：能力跃迁客观存在；涌现这个概念可能被过度神化；不存在统一的魔法规模，不同任务的临界点不同。[原文§Mirage 挑战：涌现可能是测量假象](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#mirage-%E6%8C%91%E6%88%98-%E6%B6%8C%E7%8E%B0%E5%8F%AF%E8%83%BD%E6%98%AF%E6%B5%8B%E9%87%8F%E5%81%87%E8%B1%A1)
- **D7-14** 算力有限时，与其训 7B 配 100B tokens，不如训 3B 配 250B tokens，同样开销下后者效果通常更好、推理也更便宜；任务依赖涌现能力，如多步推理、ICL、跨语言迁移时，最低门槛是 30B 到 70B 量级，简单的分类、抽取、摘要任务用 7B 到 13B 就够。[原文§对工程选型的启发](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#%E5%AF%B9%E5%B7%A5%E7%A8%8B%E9%80%89%E5%9E%8B%E7%9A%84%E5%90%AF%E5%8F%91)
- **D7-15** 应对方向有三个：合成数据，用强模型生成训练数据来训弱模型；多模态数据，扩展到图像、视频、音频；强化学习数据，用环境交互生成数据。[原文§Scaling Law 的天花板与未来](https://xiaolinnote.com/ai/llm/scaling_law_emergence.html#scaling-law-%E7%9A%84%E5%A4%A9%E8%8A%B1%E6%9D%BF%E4%B8%8E%E6%9C%AA%E6%9D%A5)

## 8. 微调方案

原文：[8. 大模型微调的方案有哪些？](https://xiaolinnote.com/ai/llm/finetuning.html)。

- **D8-1** 微调的成本远比想象大：要准备高质量数据集、GPU 资源和调参经验，基础模型一升级还得重新微调一遍。应先试 Prompt 加 Few-shot、用 System Prompt 描述风格、用 RAG 挂知识库，这些都试过仍不达标再考虑微调。[原文§先回答一个前置问题：什么时候才真的需要微调？](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%85%88%E5%9B%9E%E7%AD%94%E4%B8%80%E4%B8%AA%E5%89%8D%E7%BD%AE%E9%97%AE%E9%A2%98-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%89%8D%E7%9C%9F%E7%9A%84%E9%9C%80%E8%A6%81%E5%BE%AE%E8%B0%83)
- **D8-2** 全量微调更新所有参数，效果上限高，但 7B 模型一次训练约 80GB 显存起步，还有灾难性遗忘；LoRA 冻结原权重，只训练旁路的两个低秩小矩阵，可训练参数降到约两千万，显存约 20GB；QLoRA 先把基础模型做 4-bit 量化再套 LoRA，显存降到 10GB 以内。[原文§「改哪些参数」维度：从全量微调到 QLoRA](https://xiaolinnote.com/ai/llm/finetuning.html#%E3%80%8C%E6%94%B9%E5%93%AA%E4%BA%9B%E5%8F%82%E6%95%B0%E3%80%8D%E7%BB%B4%E5%BA%A6-%E4%BB%8E%E5%85%A8%E9%87%8F%E5%BE%AE%E8%B0%83%E5%88%B0-qlora)
- **D8-3** 一个维度回答改哪些参数：全量微调、LoRA 或 QLoRA；另一个维度回答学什么目标：SFT 学按指令回答，DPO 学偏好对齐。两者正交，可以任意组合，例如用 LoRA 做 SFT，或用 QLoRA 做 DPO。[原文§微调的两个正交维度：改哪些参数 vs 学什么目标](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%BE%AE%E8%B0%83%E7%9A%84%E4%B8%A4%E4%B8%AA%E6%AD%A3%E4%BA%A4%E7%BB%B4%E5%BA%A6-%E6%94%B9%E5%93%AA%E4%BA%9B%E5%8F%82%E6%95%B0-vs-%E5%AD%A6%E4%BB%80%E4%B9%88%E7%9B%AE%E6%A0%87)
- **D8-4** SFT 用指令和期望回答组成的数据，让模型从续写模式切换到按指令回答；模型已经会回答、但回答风格不一定是用户喜欢的，例如太啰嗦或说话不得体时，再用 DPO 这类偏好优化，告诉它同样合格的回答里哪种更受欢迎。[原文§「学什么目标」维度：SFT 和 DPO](https://xiaolinnote.com/ai/llm/finetuning.html#%E3%80%8C%E5%AD%A6%E4%BB%80%E4%B9%88%E7%9B%AE%E6%A0%87%E3%80%8D%E7%BB%B4%E5%BA%A6-sft-%E5%92%8C-dpo)

### 补充考点

- **D8-5** 微调不是首选，而是最后手段：大多数问题先把 Prompt 写好、加 Few-shot 示例，或者用 RAG 接外部知识，基本都能解决。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/finetuning.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D8-6** 想要特定输出格式，先试 Prompt 加 Few-shot，写清格式要求并给 3 到 5 个示例；想要特定风格，先试用 System Prompt 描述风格并配几个对话示例；想让模型懂领域知识，先试 RAG 把知识库挂上实时查。这些都试过仍不达标，才认真考虑微调。[原文§先回答一个前置问题：什么时候才真的需要微调？](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%85%88%E5%9B%9E%E7%AD%94%E4%B8%80%E4%B8%AA%E5%89%8D%E7%BD%AE%E9%97%AE%E9%A2%98-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%89%8D%E7%9C%9F%E7%9A%84%E9%9C%80%E8%A6%81%E5%BE%AE%E8%B0%83)
- **D8-7** 一是模型需要持续以一种特殊风格输出，Prompt 控制不住；二是需要模型稳定掌握某类任务模式或内部术语表达；三是想用小模型替代大模型来节省成本，例如用 7B 的微调模型替代 70B 的通用模型。[原文§先回答一个前置问题：什么时候才真的需要微调？](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%85%88%E5%9B%9E%E7%AD%94%E4%B8%80%E4%B8%AA%E5%89%8D%E7%BD%AE%E9%97%AE%E9%A2%98-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%89%8D%E7%9C%9F%E7%9A%84%E9%9C%80%E8%A6%81%E5%BE%AE%E8%B0%83)
- **D8-8** 产品价格、政策条款、库存状态、合同原文这类内容应该放进 RAG 或数据库里实时查；微调更适合学行为、格式、风格和任务模式，不适合当一个会频繁更新的知识库。[原文§先回答一个前置问题：什么时候才真的需要微调？](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%85%88%E5%9B%9E%E7%AD%94%E4%B8%80%E4%B8%AA%E5%89%8D%E7%BD%AE%E9%97%AE%E9%A2%98-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%89%8D%E7%9C%9F%E7%9A%84%E9%9C%80%E8%A6%81%E5%BE%AE%E8%B0%83)
- **D8-9** 效果通常最好，但一个 7B 模型全量微调，除了 FP16 约 14GB 的权重，还要存 14GB 的梯度和约 56GB 的 Adam 优化器状态，一次训练 80GB 起步；70B 模型要几十张 A100 组集群，所以实际能用的团队很少。[原文§「改哪些参数」维度：从全量微调到 QLoRA](https://xiaolinnote.com/ai/llm/finetuning.html#%E3%80%8C%E6%94%B9%E5%93%AA%E4%BA%9B%E5%8F%82%E6%95%B0%E3%80%8D%E7%BB%B4%E5%BA%A6-%E4%BB%8E%E5%85%A8%E9%87%8F%E5%BE%AE%E8%B0%83%E5%88%B0-qlora)
- **D8-10** 模型参数的更新量 ΔW 虽然维度很大，但真正有意义的变化只发生在一个低维子空间里，即更新具有内在低秩性，不需要每个维度都去改；好比全量微调是把教科书重写一遍，LoRA 是在书的空白处贴便利贴，原书一字不动，看的时候原文和便利贴一起看。[原文§「改哪些参数」维度：从全量微调到 QLoRA](https://xiaolinnote.com/ai/llm/finetuning.html#%E3%80%8C%E6%94%B9%E5%93%AA%E4%BA%9B%E5%8F%82%E6%95%B0%E3%80%8D%E7%BB%B4%E5%BA%A6-%E4%BB%8E%E5%85%A8%E9%87%8F%E5%BE%AE%E8%B0%83%E5%88%B0-qlora)
- **D8-11** LoRA 仍需要约 20GB 显存，对个人开发者还有门槛；QLoRA 把门槛进一步降低，精度损失非常小，实测效果和全精度 LoRA 几乎没有差别，让微调民主化，很多个人开发者用它训出了自己的领域模型。（原文还称 Alpaca、Vicuna 基本都是用 QLoRA 训出来的；这两个模型发布于 2023 年 3 月，早于同年 5 月的 QLoRA 论文，这里不采用。）[原文§「改哪些参数」维度：从全量微调到 QLoRA](https://xiaolinnote.com/ai/llm/finetuning.html#%E3%80%8C%E6%94%B9%E5%93%AA%E4%BA%9B%E5%8F%82%E6%95%B0%E3%80%8D%E7%BB%B4%E5%BA%A6-%E4%BB%8E%E5%85%A8%E9%87%8F%E5%BE%AE%E8%B0%83%E5%88%B0-qlora)[核对来源：QLoRA 论文](https://arxiv.org/abs/2305.14314)
- **D8-12** 个人开发者或小团队用 QLoRA 加 SFT，一张 4090 就能训 7B 模型，几千条精心标注的数据即可；中小企业有几张 A100、没有大集群，可选 LoRA 加 SFT，基础模型不做量化，精度比 QLoRA 略高、训练速度也更快；想让回答风格更符合用户偏好，可在 SFT 之后加 LoRA 加 DPO；大厂有充足 GPU、追求最高效果，可考虑全量微调加 SFT 甚至 RLHF。[原文§实战选型怎么落地](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%AE%9E%E6%88%98%E9%80%89%E5%9E%8B%E6%80%8E%E4%B9%88%E8%90%BD%E5%9C%B0)
- **D8-13** 能用轻量方案搞定的需求一定不要上重的，原因有三：训练成本指数级上升，调参难度上升，维护成本也上升，因为基础模型升级后要重新微调；所以实战中绝大多数项目用的都是 QLoRA 加 SFT 这种最轻量的组合。[原文§实战选型怎么落地](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%AE%9E%E6%88%98%E9%80%89%E5%9E%8B%E6%80%8E%E4%B9%88%E8%90%BD%E5%9C%B0)
- **D8-14** 想让回答风格更符合用户偏好，可以在 SFT 之后加 LoRA 加 DPO；大厂有充足 GPU、追求最高效果，可以考虑全量微调加 SFT，甚至 RLHF。[原文§实战选型怎么落地](https://xiaolinnote.com/ai/llm/finetuning.html#%E5%AE%9E%E6%88%98%E9%80%89%E5%9E%8B%E6%80%8E%E4%B9%88%E8%90%BD%E5%9C%B0)

## 9. LoRA

原文：[9. 请讲一下 LoRA 技术，除了减少参数量，它还有哪些优点？](https://xiaolinnote.com/ai/llm/lora.html)。

- **D9-1** 微调的更新量 ΔW 往往具有内在低秩性，可以用两个较小矩阵的乘积近似原本的 d×d 更新矩阵；中间的秩 r 通常取 8 或 16，原始权重 W 保持冻结，只训练这两个小矩阵。 [原文§「低秩分解」到底是什么意思？](https://xiaolinnote.com/ai/llm/lora.html#%E3%80%8C%E4%BD%8E%E7%A7%A9%E5%88%86%E8%A7%A3%E3%80%8D%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D)
- **D9-2** 一个 4096×4096 的更新矩阵约有 1677 万参数，LoRA r=16 只需约 13.1 万，减少约 128 倍；整个 7B 模型的可训练参数从约 70 亿降到约 2000 万，显存需求从 80GB 以上降到普通 GPU 可以接受的范围。[原文§参数量减少了多少？](https://xiaolinnote.com/ai/llm/lora.html#%E5%8F%82%E6%95%B0%E9%87%8F%E5%87%8F%E5%B0%91%E4%BA%86%E5%A4%9A%E5%B0%91)
- **D9-3** 训练完成后把 α·B·A 加回 W，得到合并后的权重，这个操作只需做一次；推理时的计算图与原始模型完全相同，不需要带着 A、B 两个矩阵，没有任何额外延迟。[原文§优点一：推理零开销，合并就消失](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%B8%80-%E6%8E%A8%E7%90%86%E9%9B%B6%E5%BC%80%E9%94%80-%E5%90%88%E5%B9%B6%E5%B0%B1%E6%B6%88%E5%A4%B1)
- **D9-4** 基础模型只加载一次、常驻显存，不同场景的 LoRA 像插件一样按需挂载和切换，每套只有几十 MB；不需要为每个场景部署一个完整模型，存储和显存占用都大大降低。[原文§优点二：模块化插拔，一个基底，多套能力](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%BA%8C-%E6%A8%A1%E5%9D%97%E5%8C%96%E6%8F%92%E6%8B%94-%E4%B8%80%E4%B8%AA%E5%9F%BA%E5%BA%95-%E5%A4%9A%E5%A5%97%E8%83%BD%E5%8A%9B)
- **D9-5** 原始权重 W 全程冻结，学习只发生在旁路的 A、B 小矩阵里，预训练学到的知识不被改写，所以风险低；但数据很偏、rank 设得很大、学习率过高，或者把 LoRA 合并后继续训练，通用能力仍可能下降，微调后要跑通用能力回归测试。[原文§优点三：不丢通用能力，白板旁边贴便利贴](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%B8%89-%E4%B8%8D%E4%B8%A2%E9%80%9A%E7%94%A8%E8%83%BD%E5%8A%9B-%E7%99%BD%E6%9D%BF%E6%97%81%E8%BE%B9%E8%B4%B4%E4%BE%BF%E5%88%A9%E8%B4%B4)
- **D9-6** Adapter 是在 Transformer 每层之间插入一个小型网络，推理时激活值每层都要额外过一遍，延迟逐层叠加；LoRA 合并之后，推理阶段的计算图与原始模型完全相同，没有这个问题。[原文§优点一：推理零开销，合并就消失](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%B8%80-%E6%8E%A8%E7%90%86%E9%9B%B6%E5%BC%80%E9%94%80-%E5%90%88%E5%B9%B6%E5%B0%B1%E6%B6%88%E5%A4%B1)
- **D9-7** 能。多个 LoRA 的更新可以加权相加，即 W' = W + α₁·B₁A₁ + α₂·B₂A₂，调整 α 的比例就能调整两种能力的配比，不必重新训练。[原文§优点五（进阶）：LoRA 权重可以加权混合](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%BA%94-%E8%BF%9B%E9%98%B6-lora-%E6%9D%83%E9%87%8D%E5%8F%AF%E4%BB%A5%E5%8A%A0%E6%9D%83%E6%B7%B7%E5%90%88)

### 补充考点

- **D9-8** 全量微调要更新全部权重，一张 24GB 的消费级 GPU 跑不动 7B 模型，70B 模型需要的显存以百 GB 计；于是出现了参数高效微调 PEFT，核心思路是不更新全部参数，只训练一小部分，同时尽量不损失微调效果，LoRA 是其中最成功的方案之一。[原文§背景：微调大模型，代价有多大？](https://xiaolinnote.com/ai/llm/lora.html#%E8%83%8C%E6%99%AF-%E5%BE%AE%E8%B0%83%E5%A4%A7%E6%A8%A1%E5%9E%8B-%E4%BB%A3%E4%BB%B7%E6%9C%89%E5%A4%9A%E5%A4%A7)
- **D9-9** r 即秩，是 LoRA 最重要的超参，通常设 8 或 16：r 越小参数越少，但表达能力越弱；r 越大参数越多，更接近全量微调的效果，大多数任务 r 取 8 到 16 就够了。低秩分解的思路类似 JPEG 压缩，把高维数据投影到低维空间，保留最主要的信息。[原文§「低秩分解」到底是什么意思？](https://xiaolinnote.com/ai/llm/lora.html#%E3%80%8C%E4%BD%8E%E7%A7%A9%E5%88%86%E8%A7%A3%E3%80%8D%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D)
- **D9-10** 灾难性遗忘是模型适应狭窄的新任务数据后，预训练获得的通用能力下降。LoRA 冻结原始权重，只训练旁路小矩阵，因此比全量改写权重更有利于保留原有能力；但训练数据过偏、rank 或学习率过高等情况仍可能损害通用能力，微调后还要做回归测试。 [原文§优点三：不丢通用能力，白板旁边贴便利贴](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%B8%89-%E4%B8%8D%E4%B8%A2%E9%80%9A%E7%94%A8%E8%83%BD%E5%8A%9B-%E7%99%BD%E6%9D%BF%E6%97%81%E8%BE%B9%E8%B4%B4%E4%BE%BF%E5%88%A9%E8%B4%B4)
- **D9-11** 全量微调对学习率等超参很敏感，学习率稍大模型就跑飞，太小收敛又很慢，因为要同步调整几十亿参数；LoRA 最关键的超参只有 rank r，取 8 到 64 在很多任务上都有不错的结果，不需要反复调参，实验开销更少。[原文§优点四：训练更稳定，超参不敏感](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E5%9B%9B-%E8%AE%AD%E7%BB%83%E6%9B%B4%E7%A8%B3%E5%AE%9A-%E8%B6%85%E5%8F%82%E4%B8%8D%E6%95%8F%E6%84%9F)
- **D9-12** 分别微调了擅长写代码的 LoRA 和擅长遵循指令的 LoRA 之后，可以直接把两者混合，得到既擅长写代码又遵循指令的效果，不用专门为这个组合再收集数据、重新训练，大大节省开发成本；它是模型融合领域的重要方向。[原文§优点五（进阶）：LoRA 权重可以加权混合](https://xiaolinnote.com/ai/llm/lora.html#%E4%BC%98%E7%82%B9%E4%BA%94-%E8%BF%9B%E9%98%B6-lora-%E6%9D%83%E9%87%8D%E5%8F%AF%E4%BB%A5%E5%8A%A0%E6%9D%83%E6%B7%B7%E5%90%88)
- **D9-13** LoRA 在推理开销、灵活性、稳定性和可组合性上全面优于 Adapter，效果与全量微调接近，资源需求远低于全量微调，所以成为 PEFT 方法里的绝对主流。[原文§总结对比：LoRA vs 全量微调 vs Adapter](https://xiaolinnote.com/ai/llm/lora.html#%E6%80%BB%E7%BB%93%E5%AF%B9%E6%AF%94-lora-vs-%E5%85%A8%E9%87%8F%E5%BE%AE%E8%B0%83-vs-adapter)
- **D9-14** 一个 7B 基础模型约 14GB，每套 LoRA 只有几十 MB，可以同时维护客服、代码、翻译等几套 LoRA，按请求类型热切换；与每个任务部署一个全量模型相比，成本能省一个数量级。[原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/lora.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 10. SFT 之后的 Post-Training

原文：[10. SFT 之后还有哪些 Post-Training？RLHF、DPO、GRPO、拒绝采样什么关系？](https://xiaolinnote.com/ai/llm/post_training.html)。

- **D10-1** SFT 学到的只是合格，不是优质：同一个问题有很多种合格回答，模型不知道用户更喜欢哪种；SFT 数据还可能没覆盖有害请求，模型遇到时会照常回答。Post-Training 要教它哪种回答更好、什么不能说。[原文§Post-Training 是什么概念？为什么 SFT 之后还需要它](https://xiaolinnote.com/ai/llm/post_training.html#post-training-%E6%98%AF%E4%BB%80%E4%B9%88%E6%A6%82%E5%BF%B5-%E4%B8%BA%E4%BB%80%E4%B9%88-sft-%E4%B9%8B%E5%90%8E%E8%BF%98%E9%9C%80%E8%A6%81%E5%AE%83)
- **D10-2** 标注员对同一个 Prompt 的多个回答做排序；用这些偏好数据训练一个独立的奖励模型，输入是 Prompt 加回答，输出一个分数，目标是让人类觉得好的回答分数高，之后由它代替人类给生成的回答批量打分。[原文§RLHF：经典方案，4 模型架构](https://xiaolinnote.com/ai/llm/post_training.html#rlhf-%E7%BB%8F%E5%85%B8%E6%96%B9%E6%A1%88-4-%E6%A8%A1%E5%9E%8B%E6%9E%B6%E6%9E%84)
- **D10-3** 参考模型是 SFT 模型的冻结副本，用 KL 散度约束主模型不要离它太远，防止奖励 hacking，也就是模型学会欺骗奖励模型而不是真的变好。[原文§RLHF：经典方案，4 模型架构](https://xiaolinnote.com/ai/llm/post_training.html#rlhf-%E7%BB%8F%E5%85%B8%E6%96%B9%E6%A1%88-4-%E6%A8%A1%E5%9E%8B%E6%9E%B6%E6%9E%84)
- **D10-4** 研究者发现 RLHF 的优化目标可以推导改写成纯监督学习的目标函数：奖励模型的功能可以由主模型相对于参考模型的概率比值替代，直接用提示、好回答、差回答组成的三元组训练即可。[原文§DPO：绕过奖励模型的等价转换](https://xiaolinnote.com/ai/llm/post_training.html#dpo-%E7%BB%95%E8%BF%87%E5%A5%96%E5%8A%B1%E6%A8%A1%E5%9E%8B%E7%9A%84%E7%AD%89%E4%BB%B7%E8%BD%AC%E6%8D%A2)
- **D10-5** GRPO 去掉了 PPO 的 Value Model：对同一个问题采样 G 个回答，用组内奖励的均值和标准差做归一化来估计每个回答的相对优势，省去了价值模型的训练和显存开销。[原文§GRPO：砍掉 Value Model 的 PPO 进化版](https://xiaolinnote.com/ai/llm/post_training.html#grpo-%E7%A0%8D%E6%8E%89-value-model-%E7%9A%84-ppo-%E8%BF%9B%E5%8C%96%E7%89%88)
- **D10-6** 让模型对每个 Prompt 生成多个候选回答，用奖励模型、人工标注或规则给它们打分，筛出得分最高的回答，把 Prompt 与最高分回答当作新的 SFT 数据再训练一轮，如此循环，全程不用 RL 算法。[原文§拒绝采样：简单粗暴的迭代式 SFT](https://xiaolinnote.com/ai/llm/post_training.html#%E6%8B%92%E7%BB%9D%E9%87%87%E6%A0%B7-%E7%AE%80%E5%8D%95%E7%B2%97%E6%9A%B4%E7%9A%84%E8%BF%AD%E4%BB%A3%E5%BC%8F-sft)
- **D10-7** RLHF 的偏好排序来自人类标注员；RLAIF 用一个更强的 AI 模型代替人类给候选回答打偏好，可以批量生成、成本低，但依赖一个强教师模型，还可能放大教师的偏见。[原文§RLAIF：让强 AI 当老师](https://xiaolinnote.com/ai/llm/post_training.html#rlaif-%E8%AE%A9%E5%BC%BA-ai-%E5%BD%93%E8%80%81%E5%B8%88)
- **D10-8** 原文称这些方法不是替代关系，真实流程是多阶段交替使用：Llama 2-Chat 是 SFT 后接拒绝采样，再做 PPO/RLHF；DeepSeek R1 是 SFT 冷启动、GRPO、拒绝采样筛推理链、再 SFT、再 GRPO。[原文§实际工程怎么组合使用](https://xiaolinnote.com/ai/llm/post_training.html#%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E6%80%8E%E4%B9%88%E7%BB%84%E5%90%88%E4%BD%BF%E7%94%A8)

### 补充考点

- **D10-9** 它是一个上位概念，覆盖了 SFT 之后所有继续训练的方法；原文按五大类介绍工业界最主流的方案，每一类的设计哲学都不一样。[原文§Post-Training 是什么概念？为什么 SFT 之后还需要它](https://xiaolinnote.com/ai/llm/post_training.html#post-training-%E6%98%AF%E4%BB%80%E4%B9%88%E6%A6%82%E5%BF%B5-%E4%B8%BA%E4%BB%80%E4%B9%88-sft-%E4%B9%8B%E5%90%8E%E8%BF%98%E9%9C%80%E8%A6%81%E5%AE%83)
- **D10-10** 优势表示这个动作比平均水平好多少，PPO 用它决定参数往哪个方向调；Value Model 负责估计当前状态的预期奖励作为基线，优势等于实际奖励减预期奖励。GRPO 由 DeepSeek 在 2024 年的 DeepSeek-Math 论文里提出，后来被 DeepSeek R1 推到台前。[原文§GRPO：砍掉 Value Model 的 PPO 进化版](https://xiaolinnote.com/ai/llm/post_training.html#grpo-%E7%A0%8D%E6%8E%89-value-model-%E7%9A%84-ppo-%E8%BF%9B%E5%8C%96%E7%89%88)
- **D10-11** 推理任务天然对错可验证，特别适合 GRPO 这类可验证奖励的强化学习路线；但不要把所有推理模型都一口咬定为 GRPO，公开报告怎么写就怎么说，没有公开细节的说可能采用类似路线更稳妥。[原文§GRPO：砍掉 Value Model 的 PPO 进化版](https://xiaolinnote.com/ai/llm/post_training.html#grpo-%E7%A0%8D%E6%8E%89-value-model-%E7%9A%84-ppo-%E8%BF%9B%E5%8C%96%E7%89%88)
- **D10-12** Anthropic 的 Constitutional AI 用 Claude 自己批评自己的回答，生成自我修正后的好版本作为偏好对；RLAIF 在工业界还在普及中，很多大厂采用人类标注加 AI 标注混合的策略，纯人类标注越来越少。[原文§RLAIF：让强 AI 当老师](https://xiaolinnote.com/ai/llm/post_training.html#rlaif-%E8%AE%A9%E5%BC%BA-ai-%E5%BD%93%E8%80%81%E5%B8%88)
- **D10-13** 资源有限、实现优先简单时选 DPO，它把 RL 简化成监督学习，两个模型就够；推理类任务即答案对错可验证的数学、代码场景，想用 RL 探索能力上限时选 GRPO；大厂资源充足、追求最高上限，可以完整跑 RLHF 或 GRPO 全流程。[原文§五类方案对比表](https://xiaolinnote.com/ai/llm/post_training.html#%E4%BA%94%E7%B1%BB%E6%96%B9%E6%A1%88%E5%AF%B9%E6%AF%94%E8%A1%A8)

## 11. DPO 与 PPO

原文：[11. 大模型的 DPO 和 PPO 的区别是什么？](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html)。

- **D11-1** 策略模型是正在被优化的主模型，负责生成回答；奖励模型是用人类排名数据训练出来的裁判，给回答打质量分；参考模型是 SFT 模型的冻结副本，用 KL 散度约束主模型不要偏离太远，防止钻奖励模型的空子。PPO 训练同时维护四个模型，第四个是估算未来奖励期望的价值模型。[原文§PPO：先培养「裁判」，再训练「选手」](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#ppo-%E5%85%88%E5%9F%B9%E5%85%BB%E3%80%8C%E8%A3%81%E5%88%A4%E3%80%8D-%E5%86%8D%E8%AE%AD%E7%BB%83%E3%80%8C%E9%80%89%E6%89%8B%E3%80%8D)
- **D11-2** chosen 是人类更偏好的回答，rejected 是人类不太喜欢的回答；训练让主模型相对于参考模型提高 chosen 的概率、降低 rejected 的概率，也就是 chosen 的概率比值要大于 rejected 的比值。[原文§DPO：绕过裁判，直接看回放](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#dpo-%E7%BB%95%E8%BF%87%E8%A3%81%E5%88%A4-%E7%9B%B4%E6%8E%A5%E7%9C%8B%E5%9B%9E%E6%94%BE)
- **D11-3** PPO 需要单独训练奖励模型，同时维护 4 个模型，RL 训练不稳定、实现难度高，需要 RL 基础设施；DPO 不需要奖励模型，只需 2 个模型，等价于监督学习，训练稳定、用标准训练框架即可实现，但受偏好数据分布限制，表达能力稍弱。[原文§两种方案的对比](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#%E4%B8%A4%E7%A7%8D%E6%96%B9%E6%A1%88%E7%9A%84%E5%AF%B9%E6%AF%94)
- **D11-4** 不是。原文称 DPO 是从带 KL 约束的 RLHF 目标推导出来的闭式偏好优化目标，并不是说它与任意 PPO 训练过程都完全等价；工程上可以理解为把复杂的 RL 流程简化成监督学习问题。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D11-5** 需要模型探索超出现有偏好数据的能力边界，或者对齐效果要求极高，同时团队资源充足、有 RL 工程能力时，才值得投入 PPO 的工程成本；只想在已有偏好数据的分布上把质量提升一步，用 DPO 就够了。[原文§各自适合什么场景？](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#%E5%90%84%E8%87%AA%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)

### 补充考点

- **D11-6** PPO 是先训练裁判、再训练选手；DPO 是直接拿比赛录像告诉选手哪个动作对、哪个动作错。两者目标一致，但 DPO 省去了裁判这个中间层。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D11-7** SFT 本质上是模仿标注人员写的标准答案，告诉模型怎么写，却没有告诉它哪个更好；同一个问题有很多合格的回答，而用户的偏好是有排序的，例如带代码示例更受欢迎、承认不知道比自信地胡说更安全。不经过对齐，模型可能生成有毒内容、一本正经地胡说或输出让用户不满意的答案。[原文§SFT 之后，还差什么？](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#sft-%E4%B9%8B%E5%90%8E-%E8%BF%98%E5%B7%AE%E4%BB%80%E4%B9%88)
- **D11-8** 对同一个问题从主模型采样 G 个回答，典型是 8 个，给每个回答打分，然后用组内归一化计算每个回答的相对优势；组内平均分充当了 Value Model 的基线角色，不用单独训练，4 模型架构变成 Policy、Reference、Reward 三模型，显存占用接近 DPO，又保留了 RL 的探索能力。[原文§PPO 的进阶版：GRPO 简介](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#ppo-%E7%9A%84%E8%BF%9B%E9%98%B6%E7%89%88-grpo-%E7%AE%80%E4%BB%8B)
- **D11-9** 数学题、代码题这类答案对就是对、错就是错的场景，奖励直接用 0 或 1 判定即可，连 Reward Model 都可以省掉；DeepSeek R1-Zero 就是这样纯靠强化学习训出推理能力的。[原文§PPO 的进阶版：GRPO 简介](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#ppo-%E7%9A%84%E8%BF%9B%E9%98%B6%E7%89%88-grpo-%E7%AE%80%E4%BB%8B)
- **D11-10** 适合快速迭代、GPU 资源有限和开源社区的场景：不需要 RL 工程能力，偏好数据相对容易收集，众包打排名即可，训练一次成功率高；效果可能略逊于精心调优的 PPO，但工程代价小得多。[原文§各自适合什么场景？](https://xiaolinnote.com/ai/llm/dpo_vs_ppo.html#%E5%90%84%E8%87%AA%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)

## 12. 解码策略

原文：[12. 大模型生成文本时的解码策略有哪些？贪心、Beam Search、采样分别什么时候用？](https://xiaolinnote.com/ai/llm/decoding_strategies.html)。

- **D12-1** 模型每生成一个 token，都会输出一个词表大小的概率分布；解码策略决定的就是怎样从这个分布里选出下一个 token。[原文§解码策略的本质：从概率分布里选下一个 token](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E8%A7%A3%E7%A0%81%E7%AD%96%E7%95%A5%E7%9A%84%E6%9C%AC%E8%B4%A8-%E4%BB%8E%E6%A6%82%E7%8E%87%E5%88%86%E5%B8%83%E9%87%8C%E9%80%89%E4%B8%8B%E4%B8%80%E4%B8%AA-token)
- **D12-2** 每一步都选概率最高的 token，不引入随机性，所以相同输入永远得到相同输出；但每步只挑眼前最稳的选择，容易走进自我加强的重复循环，生成的文本也保守乏味。[原文§贪心解码：最简单也最容易踩坑](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E8%B4%AA%E5%BF%83%E8%A7%A3%E7%A0%81-%E6%9C%80%E7%AE%80%E5%8D%95%E4%B9%9F%E6%9C%80%E5%AE%B9%E6%98%93%E8%B8%A9%E5%9D%91)
- **D12-3** 每一步保留 B 条总概率最高的路径同时推进：把每条前缀各自展开得到候选，再从中挑出总概率最高的 B 条，直到生成结束，最后选整体概率最高的那条作为输出。[原文§Beam Search：翻译时代的王者](https://xiaolinnote.com/ai/llm/decoding_strategies.html#beam-search-%E7%BF%BB%E8%AF%91%E6%97%B6%E4%BB%A3%E7%9A%84%E7%8E%8B%E8%80%85)
- **D12-4** 开放式生成不存在唯一最优答案，只有一个广阔的合理回答空间；整体概率最高往往等价于每一步都选最稳的词，而最稳的常常是重复已经出现过的内容，结果输出保守、乏味，还容易复读。[原文§为什么 LLM 时代 Beam Search 失宠了](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E4%B8%BA%E4%BB%80%E4%B9%88-llm-%E6%97%B6%E4%BB%A3-beam-search-%E5%A4%B1%E5%AE%A0%E4%BA%86)
- **D12-5** 收益是每次生成的结果不同，带来多样性；风险是概率分布有一条很长的尾巴，可能抽到完全不合理的低概率词，毁掉整段输出，所以要用 Temperature、Top-K、Top-P 调节分布锐度并截断长尾。[原文§采样族：用随机性换多样性](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E9%87%87%E6%A0%B7%E6%97%8F-%E7%94%A8%E9%9A%8F%E6%9C%BA%E6%80%A7%E6%8D%A2%E5%A4%9A%E6%A0%B7%E6%80%A7)
- **D12-6** 推测解码优化的是推理速度：用小的草稿模型快速生成多个 token，再由大模型一次性验证，结果与大模型一致；Self-Consistency 优化的是推理类任务的准确率：用较高温度采样多条推理路径，对最终答案做多数投票，代价是 N 倍的调用成本。[原文§进阶策略：推测解码与 Self-Consistency](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E8%BF%9B%E9%98%B6%E7%AD%96%E7%95%A5-%E6%8E%A8%E6%B5%8B%E8%A7%A3%E7%A0%81%E4%B8%8E-self-consistency)

### 补充考点

- **D12-7** 毛病是复读机问题，容易陷入重复循环；但它在精确任务上是首选，例如代码生成、SQL 生成、JSON 抽取这种输出有标准答案的任务，因为它确定、不会乱写。[原文§贪心解码：最简单也最容易踩坑](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E8%B4%AA%E5%BF%83%E8%A7%A3%E7%A0%81-%E6%9C%80%E7%AE%80%E5%8D%95%E4%B9%9F%E6%9C%80%E5%AE%B9%E6%98%93%E8%B8%A9%E5%9D%91)
- **D12-8** 它保留多条候选路径，全局视野更好，某一步选错了还有其他备份路径；翻译任务的特点是给定源句存在一个或几个最优译文，Beam Search 找概率最高序列的目标与之高度匹配，2014 到 2018 年几乎所有翻译模型都用它。[原文§Beam Search：翻译时代的王者](https://xiaolinnote.com/ai/llm/decoding_strategies.html#beam-search-%E7%BF%BB%E8%AF%91%E6%97%B6%E4%BB%A3%E7%9A%84%E7%8E%8B%E8%80%85)
- **D12-9** 表面理由是慢，计算量是 B 倍；深层原因是生成式任务没有单一最优答案，优化整体概率最高反而得到最平庸的回答，多样性差还容易复读；工程上 KV Cache 假设单一前缀往下生成，Beam Search 要维护 B 条前缀、缓存复制 B 份，Flash Attention 等优化也为单序列设计。它没有彻底无用，而是退回成翻译、受约束生成等特定任务的工具。[原文§为什么 LLM 时代 Beam Search 失宠了](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E4%B8%BA%E4%BB%80%E4%B9%88-llm-%E6%97%B6%E4%BB%A3-beam-search-%E5%A4%B1%E5%AE%A0%E4%BA%86)
- **D12-10** Top-P 即核采样，是自适应截断：按概率从高到低累加，超过阈值 P 例如 0.9 就停，从这个核里采样；好处是候选集大小会随分布形状自动调整，分布尖锐时候选集小，分布平坦时候选集大。[原文§采样族：用随机性换多样性](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E9%87%87%E6%A0%B7%E6%97%8F-%E7%94%A8%E9%9A%8F%E6%9C%BA%E6%80%A7%E6%8D%A2%E5%A4%9A%E6%A0%B7%E6%80%A7)
- **D12-11** 不能。主流 API 都提供 Temperature、Top-P 这类参数，但默认值会随模型版本和产品形态变化；更可靠的做法是先用官方默认值作为基线，再按任务是精确还是开放去调：精确任务用 Temperature 为 0 或低温提高可复现性，对话和创意任务用较高的 Temperature 配合 Top-P。[原文§实际选型：什么任务用什么策略](https://xiaolinnote.com/ai/llm/decoding_strategies.html#%E5%AE%9E%E9%99%85%E9%80%89%E5%9E%8B-%E4%BB%80%E4%B9%88%E4%BB%BB%E5%8A%A1%E7%94%A8%E4%BB%80%E4%B9%88%E7%AD%96%E7%95%A5)

## 13. 采样参数

原文：[13. 大模型的参数：温度值、Top-P、Top-K 分别是什么？各个场景下的最佳设置是什么？](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html)。

- **D13-1** 采样前把每个词的 logit 除以温度 T 再做 softmax：T 小于 1 时分布变得更尖锐，高概率词更占优；T 大于 1 时分布变得更均匀，低概率词也有机会被选中；T=1 时分布不变，T=0 时退化为贪心解码。[原文§Temperature：热水和冷水的类比](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#temperature-%E7%83%AD%E6%B0%B4%E5%92%8C%E5%86%B7%E6%B0%B4%E7%9A%84%E7%B1%BB%E6%AF%94)
- **D13-2** Top-K 每步固定只保留概率最高的 K 个词；Top-P 按概率从高到低累加，超过阈值 P 就停，候选池大小随当前分布的形状自动调整：确定性高时很小，确定性低时变大。[原文§Top-P（Nucleus Sampling）：自适应的截断](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#top-p-nucleus-sampling-%E8%87%AA%E9%80%82%E5%BA%94%E7%9A%84%E6%88%AA%E6%96%AD)
- **D13-3** 精确任务有标准答案或格式严格，最忌模型乱发挥，Temperature 设在 0 到 0.2 以求稳定可复现；创意任务希望有惊喜感，保守重复反而不好，Temperature 调到 0.8 到 1.2、Top-P 约 0.95。[原文§实际工程怎么配三个参数](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E6%80%8E%E4%B9%88%E9%85%8D%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0)
- **D13-4** 三个参数的作用有重叠，都在控制采样的随机性；同时调多个会互相干扰，搞不清到底是哪个参数在起作用，例如高温配很低的 top_p，结果完全不可预测。原文建议先只调 temperature。[原文§实际工程怎么配三个参数](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E6%80%8E%E4%B9%88%E9%85%8D%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0)
- **D13-5** T=0 相当于贪心解码，模型永远选概率最高的词，输出完全确定。[原文§Temperature：热水和冷水的类比](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#temperature-%E7%83%AD%E6%B0%B4%E5%92%8C%E5%86%B7%E6%B0%B4%E7%9A%84%E7%B1%BB%E6%AF%94)

### 补充考点

- **D13-6** 它在计算词汇表里所有词的概率分布，典型有 5 万到 15 万个词，例如对“今天天气真”算出“好”70%、“不错”15% 等；然后按某种策略从这个分布里选出下一个词。[原文§先理解大模型是怎么「选下一个词」的](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#%E5%85%88%E7%90%86%E8%A7%A3%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%98%AF%E6%80%8E%E4%B9%88%E3%80%8C%E9%80%89%E4%B8%8B%E4%B8%80%E4%B8%AA%E8%AF%8D%E3%80%8D%E7%9A%84)
- **D13-7** 温度低时像冷水，概率分布变得更尖锐，高概率的词更高、低概率的词接近于零，输出非常稳定但单调；温度高时像热水，分布变得更均匀，原本概率很低的词也有机会被选中，输出更有创意、更多样，但也更可能出错或偏题。[原文§Temperature：热水和冷水的类比](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#temperature-%E7%83%AD%E6%B0%B4%E5%92%8C%E5%86%B7%E6%B0%B4%E7%9A%84%E7%B1%BB%E6%AF%94)
- **D13-8** Top-K 表示每一步只从概率最高的 K 个词里选，能避免采到长尾噪声词；问题是 K 固定、不自适应：问首都这类问题时最高概率词已占 99%，候选池里其余词都很离谱；写诗这类开放问题概率分散，固定截断在 K 个又可能错过好的选项。[原文§Top-K：限制候选词的数量](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#top-k-%E9%99%90%E5%88%B6%E5%80%99%E9%80%89%E8%AF%8D%E7%9A%84%E6%95%B0%E9%87%8F)
- **D13-9** 绝大多数情况只调 Temperature 一个参数，Top-P 保持默认或 0.9 到 1.0，Top-K 不设置；不要同时设置 top_k 和 top_p，两者都在做截断，叠加会让候选池变得奇怪；如果要调 top_p，就先固定 temperature，不要两个一起大幅改动。[原文§实际工程怎么配三个参数](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E6%80%8E%E4%B9%88%E9%85%8D%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0)
- **D13-10** 代码生成、精确问答用 0 到 0.2，top_p 不做限制；日常对话、总结摘要、翻译用 0.5 到 0.7，top_p 约 0.9；创意写作、头脑风暴用 0.8 到 1.2，top_p 约 0.95。不要把某个产品某个版本的默认值当成行业固定标准。[原文§实际工程怎么配三个参数](https://xiaolinnote.com/ai/llm/temperature_top_p_top_k.html#%E5%AE%9E%E9%99%85%E5%B7%A5%E7%A8%8B%E6%80%8E%E4%B9%88%E9%85%8D%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0)

## 14. KV Cache 与 Prompt Caching

原文：[14. KV Cache 是什么？Prompt Caching 的原理是什么？](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html)。

- **D14-1** 每生成一个新 token，都要把前面所有 token（包括很长的 Prompt）重新算一遍 attention，而这些前缀的计算结果与上一步完全相同，是纯粹的浪费；生成 N 个 token 的总计算量约为 O(N³)。[原文§自回归生成里隐藏的低效问题](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E8%87%AA%E5%9B%9E%E5%BD%92%E7%94%9F%E6%88%90%E9%87%8C%E9%9A%90%E8%97%8F%E7%9A%84%E4%BD%8E%E6%95%88%E9%97%AE%E9%A2%98)
- **D14-2** 前面所有 token 的 K/V 都要常驻显存，大小约为 2×batch×序列长×层数×头数×每头维度×字节数；原文的算例是 7B 模型跑 32K 上下文约 17GB，加上权重 14GB，一张 24GB 的显卡放不下。[原文§KV Cache 的显存代价](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#kv-cache-%E7%9A%84%E6%98%BE%E5%AD%98%E4%BB%A3%E4%BB%B7)
- **D14-3** KV Cache 在单次生成内、token 之间复用已算好的 K/V；Prompt Caching 把复用范围扩展到不同请求之间：服务器按 Prompt 前缀的哈希保留 KV Cache，后续请求前缀一致就直接复用，只算新增的部分。[原文§从 KV Cache 到 Prompt Caching：同一机制的扩展](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E4%BB%8E-kv-cache-%E5%88%B0-prompt-caching-%E5%90%8C%E4%B8%80%E6%9C%BA%E5%88%B6%E7%9A%84%E6%89%A9%E5%B1%95)
- **D14-4** 前缀必须完全一致才能命中缓存，哪怕多一个空格、改一个字符就算 miss；把日期、用户名这类动态内容放在前面，整个前缀每次都变，缓存永远命不中，所以固定内容要集中在断点之前，动态内容放在断点之后。[原文§工程陷阱：固定内容在前、动态内容在后](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E5%B7%A5%E7%A8%8B%E9%99%B7%E9%98%B1-%E5%9B%BA%E5%AE%9A%E5%86%85%E5%AE%B9%E5%9C%A8%E5%89%8D%E3%80%81%E5%8A%A8%E6%80%81%E5%86%85%E5%AE%B9%E5%9C%A8%E5%90%8E)
- **D14-5** 以 Claude 为例：命中缓存的 token 费用约为正常输入的 10%，写入缓存的那次请求约为正常的 1.25 倍，后续只要有 2 次以上命中，总体就是省钱的；各家计费规则不同，延迟收益也要用真实链路压测。[原文§主流 API 的 Prompt Caching 实现](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E4%B8%BB%E6%B5%81-api-%E7%9A%84-prompt-caching-%E5%AE%9E%E7%8E%B0)
- **D14-6** KV Cache 量化把缓存从 FP16 量化到 INT8 甚至 INT4，用来减少显存占用，但它对量化误差比权重更敏感；PagedAttention 把 KV Cache 切成固定大小的块，用块表映射到物理显存，消除显存碎片，把显存利用率从三四成提高到九成以上。[原文§进阶：KV Cache 量化与 PagedAttention](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E8%BF%9B%E9%98%B6-kv-cache-%E9%87%8F%E5%8C%96%E4%B8%8E-pagedattention)

### 补充考点

- **D14-7** 它们是同一套缓存思路在两个时间尺度上的延伸：KV Cache 作用在单次推理之内，Prompt Caching 作用在跨请求之间；Prompt Caching 不是新发明，而是 KV Cache 这个底层机制的工程级延伸。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D14-8** 它不是锦上添花的优化，而是让自回归生成可行的基本盘：所有现代推理框架如 vLLM、SGLang、TGI、llama.cpp 都默认开启，没有人会关掉它。[原文§KV Cache：单次推理内的优化](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#kv-cache-%E5%8D%95%E6%AC%A1%E6%8E%A8%E7%90%86%E5%86%85%E7%9A%84%E4%BC%98%E5%8C%96)
- **D14-9** Claude 要用户显式声明：在希望缓存的内容末尾加 cache_control 标记，好处是清楚控制哪些内容缓存，代价是要改代码加配置；OpenAI 更轻量，Prompt 前缀超过 1024 tokens 就自动尝试缓存，响应里会告知命中了多少 token，开发者不用改代码，但控制粒度不如显式标记精细。[原文§主流 API 的 Prompt Caching 实现](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E4%B8%BB%E6%B5%81-api-%E7%9A%84-prompt-caching-%E5%AE%9E%E7%8E%B0)
- **D14-10** 最适合前面固定、后面变化的模式：一是长 System Prompt，如客服系统、AI 助手，包含大量产品知识、规则和示例，每次请求都能命中，收益最大；二是对同一份长文档反复提问，如把合同放进 Prompt 连问多个问题；三是 Prompt 里带 10 到 20 组 Few-shot 示例。[原文§适合用 Prompt Caching 的场景](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E9%80%82%E5%90%88%E7%94%A8-prompt-caching-%E7%9A%84%E5%9C%BA%E6%99%AF)
- **D14-11** 一是内容顺序：固定内容要放在前面、动态内容放在后面，如果把当天日期、当前用户这类变化的信息放在长系统提示之前，前缀每次都变，缓存就无法命中；二是时效性：Claude 的 ephemeral 缓存默认有效期 5 分钟，超过 5 分钟没有命中就失效，高流量应用通常能自然保持缓存活跃。[原文§工程陷阱：固定内容在前、动态内容在后](https://xiaolinnote.com/ai/llm/kv_cache_prompt_caching.html#%E5%B7%A5%E7%A8%8B%E9%99%B7%E9%98%B1-%E5%9B%BA%E5%AE%9A%E5%86%85%E5%AE%B9%E5%9C%A8%E5%89%8D%E3%80%81%E5%8A%A8%E6%80%81%E5%86%85%E5%AE%B9%E5%9C%A8%E5%90%8E)

## 15. 模型量化

原文：[15. 大模型量化是什么？INT8/INT4/AWQ/GPTQ 怎么选？](https://xiaolinnote.com/ai/llm/quantization.html)。

- **D15-1** 线性量化先按数值范围确定 scale，再把浮点值按 scale 缩放并取整；非对称量化还要按 zero_point 和整数编码范围作偏移。反量化时先抵消偏移，再乘回 scale 得到近似值。取整会引入误差；对称量化可省去零点偏移。 [原文§量化的核心：映射连续到离散](https://xiaolinnote.com/ai/llm/quantization.html#%E9%87%8F%E5%8C%96%E7%9A%84%E6%A0%B8%E5%BF%83-%E6%98%A0%E5%B0%84%E8%BF%9E%E7%BB%AD%E5%88%B0%E7%A6%BB%E6%95%A3)
- **D15-2** 以 7B 模型为例，INT8 约 7GB，平均精度损失小于 0.5%，接近无损；INT4 约 3.5GB，平均损失 1% 到 3%，是主流部署的甜蜜点，体积更小、推理也可加速；但数学推理、长链路任务可能掉得更多，仍要在自己的业务集上评测。[原文§INT8 / INT4 各自的精度边界](https://xiaolinnote.com/ai/llm/quantization.html#int8-int4-%E5%90%84%E8%87%AA%E7%9A%84%E7%B2%BE%E5%BA%A6%E8%BE%B9%E7%95%8C)
- **D15-3** 先用一小批校准数据让 FP16 模型跑一遍，记录每层的输入激活值；再逐层量化，用 Hessian 矩阵估计每个权重的敏感度，把量化产生的误差反向修正到后面尚未量化的权重上，避免误差逐层累积。[原文§GPTQ：基于误差补偿的逐层量化](https://xiaolinnote.com/ai/llm/quantization.html#gptq-%E5%9F%BA%E4%BA%8E%E8%AF%AF%E5%B7%AE%E8%A1%A5%E5%81%BF%E7%9A%84%E9%80%90%E5%B1%82%E9%87%8F%E5%8C%96)
- **D15-4** 权重的输出贡献等于权重乘以激活值；某些输入位置的激活值特别大，对应的权重列就是少数承担大部分输出贡献的显著权重。AWQ 通过逐通道缩放把这些通道的数值扩大，使它们在量化时损失更小，其余权重则可以激进压缩。[原文§AWQ：激活感知的权重保护](https://xiaolinnote.com/ai/llm/quantization.html#awq-%E6%BF%80%E6%B4%BB%E6%84%9F%E7%9F%A5%E7%9A%84%E6%9D%83%E9%87%8D%E4%BF%9D%E6%8A%A4)
- **D15-5** 是为在消费级 GPU 上做微调而设计的：NF4 是非均匀的 4-bit 量化，利用权重近似零均值正态分布的特点，在 0 附近安排更多刻度；用它量化基础模型再配合 LoRA，一张 24GB 显卡就能微调 7B 模型。[原文§QLoRA 与 NF4：让消费级 GPU 微调成为可能](https://xiaolinnote.com/ai/llm/quantization.html#qlora-%E4%B8%8E-nf4-%E8%AE%A9%E6%B6%88%E8%B4%B9%E7%BA%A7-gpu-%E5%BE%AE%E8%B0%83%E6%88%90%E4%B8%BA%E5%8F%AF%E8%83%BD)
- **D15-6** 因为精度损失不是均匀分布的：INT4 平均损失 1% 到 3%，但简单分类几乎无损，数学推理可能损失 5% 到 10%，长链路代码生成可能超过 10%；所以部署前必须在自己的业务场景下做评测，不能只看论文里的平均数。[原文§量化的副作用与陷阱](https://xiaolinnote.com/ai/llm/quantization.html#%E9%87%8F%E5%8C%96%E7%9A%84%E5%89%AF%E4%BD%9C%E7%94%A8%E4%B8%8E%E9%99%B7%E9%98%B1)

### 补充考点

- **D15-7** 量化算法和文件格式是两层概念：GPTQ、AWQ 描述怎样把高精度权重量化成低精度表示，GGUF 则是 llama.cpp 使用的权重存储格式。原文以 GGUF 的 Q4_K_M 为例，不应把文件格式本身当成某一种量化算法。 [原文§💡 简要回答](https://xiaolinnote.com/ai/llm/quantization.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D15-8** 模型的每个参数是一个数字，训练时主流用 FP32 或 FP16 存储；量化是把它们降到更低位数，例如从 FP16 降到 INT4，存储占用直接降到四分之一。第二个收益是推理速度，INT4 的硬件吞吐通常比 FP16 高 2 到 4 倍，访存量也只有四分之一。[原文§量化是什么？为什么大模型必须量化](https://xiaolinnote.com/ai/llm/quantization.html#%E9%87%8F%E5%8C%96%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%BF%85%E9%A1%BB%E9%87%8F%E5%8C%96)
- **D15-9** INT4 是当前流行的甜蜜点，损失 1% 到 3% 只能当粗略经验，体积压到 FP16 的四分之一；损失曲线先平后陡：从 INT8 到 INT4 增加不大，从 INT4 到 INT3 突然增加很多，到 INT2 模型基本不能用。各推理框架默认通常不量化，要用户显式选择。[原文§INT8 / INT4 各自的精度边界](https://xiaolinnote.com/ai/llm/quantization.html#int8-int4-%E5%90%84%E8%87%AA%E7%9A%84%E7%B2%BE%E5%BA%A6%E8%BE%B9%E7%95%8C)
- **D15-10** GPTQ 基于 Optimal Brain Surgeon 的二阶优化理论，数学上严谨；它是纯权重量化，不依赖模型结构，对 Transformer 通用；主要用在追求精度的离线量化场景，AutoGPTQ、Optimum 都集成了它，是开源社区最早普及的量化方案。[原文§GPTQ：基于误差补偿的逐层量化](https://xiaolinnote.com/ai/llm/quantization.html#gptq-%E5%9F%BA%E4%BA%8E%E8%AF%AF%E5%B7%AE%E8%A1%A5%E5%81%BF%E7%9A%84%E9%80%90%E5%B1%82%E9%87%8F%E5%8C%96)
- **D15-11** AWQ 即激活感知的权重量化，2023 年由 MIT 提出；它针对 GPU 计算特性优化，量化后的权重布局对 GPU 内核友好，推理速度比 GPTQ 快 1.5 到 2 倍，在精度、速度和量化耗时三个维度上比较均衡。不过选型时仍要看目标框架和目标 GPU 上哪条路径最成熟。[原文§AWQ：激活感知的权重保护](https://xiaolinnote.com/ai/llm/quantization.html#awq-%E6%BF%80%E6%B4%BB%E6%84%9F%E7%9F%A5%E7%9A%84%E6%9D%83%E9%87%8D%E4%BF%9D%E6%8A%A4)
- **D15-12** 双重量化：连量化用的 scale 常数也再量化一次，进一步省显存；分页优化器：利用统一内存把优化器状态溢出到 CPU 内存，避免显存峰值溢出。最终在一张 24GB 的 4090 上就能微调 7B 模型。[原文§QLoRA 与 NF4：让消费级 GPU 微调成为可能](https://xiaolinnote.com/ai/llm/quantization.html#qlora-%E4%B8%8E-nf4-%E8%AE%A9%E6%B6%88%E8%B4%B9%E7%BA%A7-gpu-%E5%BE%AE%E8%B0%83%E6%88%90%E4%B8%BA%E5%8F%AF%E8%83%BD)
- **D15-13** 大多数线上部署可以先试 AWQ 或框架推荐的 INT4 路线，GPTQ 在追求精度、已有 GPTQ 权重或校准数据更匹配时也常用，不能脱离框架支持谈算法好坏；显存够、质量要求高优先试 INT8、FP8 或直接 FP16，显存不够、吞吐敏感再上 INT4，70B 这类大模型 INT4 往往性价比最高。[原文§怎么选量化方案](https://xiaolinnote.com/ai/llm/quantization.html#%E6%80%8E%E4%B9%88%E9%80%89%E9%87%8F%E5%8C%96%E6%96%B9%E6%A1%88)
- **D15-14** 权重里偶尔出现绝对值是其他权重几十倍的 outlier，会把量化范围拉得很宽，稀释大部分普通权重的精度，AWQ 的逐通道缩放和 GPTQ 基于 Hessian 的方法能缓解但极端情况仍会出错；另外量化要与 Flash Attention、KV Cache 等优化同时使用，不同框架支持度差异很大，选方案前先看部署框架，再用自己的业务集压测质量和吞吐。[原文§量化的副作用与陷阱](https://xiaolinnote.com/ai/llm/quantization.html#%E9%87%8F%E5%8C%96%E7%9A%84%E5%89%AF%E4%BD%9C%E7%94%A8%E4%B8%8E%E9%99%B7%E9%98%B1)

## 16. Prompt 工程

原文：[16. 如何写好 Prompt？分享下 Prompt 工程实践经验？](https://xiaolinnote.com/ai/llm/prompt_engineering.html)。

- **D16-1** 五要素是 Role 角色设定、Task 任务描述、Context 背景信息、Format 输出格式和 Examples 示例。[原文§五要素拆解](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BA%94%E8%A6%81%E7%B4%A0%E6%8B%86%E8%A7%A3)
- **D16-2** 这样的 Prompt 没有角色、没有字数限制、没有受众定义，也没有格式要求，模型只能随机发挥，每次输出都不稳定；把这些约束补全之后，输出的格式和质量才会稳定。[原文§从差 Prompt 到好 Prompt：完整改造示例](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BB%8E%E5%B7%AE-prompt-%E5%88%B0%E5%A5%BD-prompt-%E5%AE%8C%E6%95%B4%E6%94%B9%E9%80%A0%E7%A4%BA%E4%BE%8B)
- **D16-3** 格式约束告诉模型以什么形式输出，例如规定 JSON 有哪些字段和取值，使输出结构固定、下游可以解析；示例则直接给 1 到 3 个输入输出范例，模型会自动对齐期望，比读一大段描述更快、更准。[原文§五要素拆解](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BA%94%E8%A6%81%E7%B4%A0%E6%8B%86%E8%A7%A3)
- **D16-4** 用 XML 标签把 Prompt 的不同部分明确区分开，例如把文档放在 document 标签里、任务放在 task 标签里，模型理解起来更准确。[原文§进阶技巧](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%9B%E9%98%B6%E6%8A%80%E5%B7%A7)
- **D16-5** 先整理 30 到 50 条有代表性的测试用例，覆盖正常情况和边缘情况；每次改 Prompt 都在整个测试集上跑一遍，看通过率的变化；每次只改一处，才能判断是哪个改动起了作用。[原文§迭代方法论](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95%E8%AE%BA)
- **D16-6** 原文的压缩方案是按信息量取舍：LLMLingua 用一个小模型评估每个 token 的信息含量，删掉信息量低的，或者精简冗余表述、只保留有代表性的示例。压缩对效果有损失，要在自己的测试集上找可接受的平衡点。[原文§进阶：Prompt 压缩](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%9B%E9%98%B6-prompt-%E5%8E%8B%E7%BC%A9)
- **D16-7** Few-shot 示例适合格式复杂或风格特殊的任务，直接给范例让模型对齐期望；复杂任务要拆成子步骤，不要让模型一步做完所有事。[原文§五要素拆解](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BA%94%E8%A6%81%E7%B4%A0%E6%8B%86%E8%A7%A3)

### 补充考点

- **D16-8** 指令不清晰，例如只说帮我写一篇文章；缺少关键上下文，模型不知道你的行业和用户是谁；没有格式约束，模型自由发挥导致下游解析出错。根本原因是模型没有读心术，Prompt 越模糊，模型的理解空间越大，输出越随机。[原文§为什么 Prompt 的好坏能决定效果的上限](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88-prompt-%E7%9A%84%E5%A5%BD%E5%9D%8F%E8%83%BD%E5%86%B3%E5%AE%9A%E6%95%88%E6%9E%9C%E7%9A%84%E4%B8%8A%E9%99%90)
- **D16-9** 只说它是助手，没有任何背景，模型只能泛泛而谈；明确专业方向、经验年限和关注点，例如有 10 年经验、专注代码 Review 和性能优化的 Python 后端工程师，输出的深度和针对性会明显提升。[原文§五要素拆解](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BA%94%E8%A6%81%E7%B4%A0%E6%8B%86%E8%A7%A3)
- **D16-10** 任务要把受众、字数、主题、风格、结构都点清楚，否则模型自由度太大；上下文要说明用途和受众，例如同样是翻译，交代这是面向海外投资者的商业计划书摘要并要求正式商务英语，输出质量会有本质区别。[原文§五要素拆解](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BA%94%E8%A6%81%E7%B4%A0%E6%8B%86%E8%A7%A3)
- **D16-11** 每加一层约束，效果就上一个台阶：只加角色后输出更专业，但提炼核心观点仍然模糊；再补上总长度、受众水平和分块的输出格式，如一句话结论、三条要点、适合人群，输出质量才稳定。[原文§从差 Prompt 到好 Prompt：完整改造示例](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E4%BB%8E%E5%B7%AE-prompt-%E5%88%B0%E5%A5%BD-prompt-%E5%AE%8C%E6%95%B4%E6%94%B9%E9%80%A0%E7%A4%BA%E4%BE%8B)
- **D16-12** 在 Prompt 末尾加请先分步分析再给出结论，往往能提升逻辑推理和计算类任务的准确率；但不建议默认把完整推理链原样展示给最终用户，一是多花 token，二是里面可能有不稳定或不该暴露的内容，更稳的做法是内部先分析，对外只输出简要依据、关键步骤或可核查的结论。[原文§进阶技巧](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%9B%E9%98%B6%E6%8A%80%E5%B7%A7)
- **D16-13** 它本质上是提出假设、测试、优化的循环，不是一次写完就结束，需要持续迭代。[原文§迭代方法论](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95%E8%AE%BA)
- **D16-14** 长 Prompt 贵，费用与长度成正比，也慢，每多 1000 token 首 token 延迟可能多几十毫秒；可以压的是冗余：啰嗦的指令、模式重复的 Few-shot 示例、反复强调的禁令。它适合长上下文 RAG 和有大量 Few-shot 示例的场景，方法有用小模型评估 token 重要性的 LLMLingua 等。[原文§进阶：Prompt 压缩](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%9B%E9%98%B6-prompt-%E5%8E%8B%E7%BC%A9)
- **D16-15** 另一类是 Embedding 表示：把整段 Prompt，特别是 Few-shot 部分，编码成一个固定长度的 embedding 向量，让模型直接读 embedding 而不是 token 序列。这种方案需要模型支持软 Prompt（Soft Prompt）输入，目前还在研究阶段，没有普及。[原文§进阶：Prompt 压缩](https://xiaolinnote.com/ai/llm/prompt_engineering.html#%E8%BF%9B%E9%98%B6-prompt-%E5%8E%8B%E7%BC%A9)

## 17. CoT

原文：[17. 什么是 CoT？为啥效果好？它有什么缺点或局限性？](https://xiaolinnote.com/ai/llm/cot.html)。

- **D17-1** 逐步推理让每一步的错误都暴露出来，便于发现和纠正；中间步骤充当草稿纸，复杂的中间状态通过显式输出记下来，减轻模型的推理负担；它还激活了模型从大量推理型文本中学到的推理模式。[原文§为什么 CoT 有效](https://xiaolinnote.com/ai/llm/cot.html#%E4%B8%BA%E4%BB%80%E4%B9%88-cot-%E6%9C%89%E6%95%88)
- **D17-2** Zero-shot CoT 只在问题末尾加一句请分步思考后再给结论这类提示；Few-shot CoT 在 Prompt 里给出几个包含问题、逐步推理过程和最终答案的完整示例，让模型对新问题套用同样的推理格式，效果更稳定。[原文§两种 CoT 形式](https://xiaolinnote.com/ai/llm/cot.html#%E4%B8%A4%E7%A7%8D-cot-%E5%BD%A2%E5%BC%8F)
- **D17-3** 对同一个问题用较高的温度生成多条不同的推理路径，然后对最终答案做多数投票；直觉是正确答案可以由多条路径得到，错误答案是随机产生的，不太可能收敛到同一个错误。[原文§Self-Consistency：CoT 的升级版](https://xiaolinnote.com/ai/llm/cot.html#self-consistency-cot-%E7%9A%84%E5%8D%87%E7%BA%A7%E7%89%88)
- **D17-4** 推理链会额外生成几百甚至上千个 token，API 成本和响应时间显著增加；推理链本身也会出错，前面一步错了，后面的步骤基于错误前提继续推导，最终答案大概率也错；对简单问题则适得其反。[原文§CoT 的局限性](https://xiaolinnote.com/ai/llm/cot.html#cot-%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)
- **D17-5** 原文认为让模型推理与把完整推理链展示给用户不是一回事：产品里通常让模型内部完成推理，最终只给用户简洁答案、关键依据或可核查的步骤，既保留推理收益，又避免输出冗长、不稳定的思考链。[原文§CoT 的核心思路](https://xiaolinnote.com/ai/llm/cot.html#cot-%E7%9A%84%E6%A0%B8%E5%BF%83%E6%80%9D%E8%B7%AF)

### 补充考点

- **D17-6** 像没睡醒时凭直觉答题：看到题目就从记忆里拼出一个听起来合理的答案，跳过了中间的推理过程；简单问题没问题，但涉及多步计算、逻辑推导或因果链时，直接跳答案很容易出错，写出每一步推理则容易逐步验证。[原文§没有 CoT 时模型在做什么](https://xiaolinnote.com/ai/llm/cot.html#%E6%B2%A1%E6%9C%89-cot-%E6%97%B6%E6%A8%A1%E5%9E%8B%E5%9C%A8%E5%81%9A%E4%BB%80%E4%B9%88)
- **D17-7** CoT 是为需要多步推理的问题设计的，在数学、逻辑题、代码调试这类场景很有价值；它能减少跳跃性错误，但不能消除推理错误，对纯粹依赖记忆的事实问题，以及简单问答、分类、信息提取这类不需要推理的任务没有帮助，用普通 Prompt 即可。[原文§CoT 的局限性](https://xiaolinnote.com/ai/llm/cot.html#cot-%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)

## 18. 幻觉

原文：[18. 大模型为什么会出现幻觉？怎么缓解？](https://xiaolinnote.com/ai/llm/hallucination.html)。

- **D18-1** 事实性幻觉是编造不存在的事实，或把已知事实张冠李戴；推理性幻觉是事实没问题，但推理过程错乱、前后矛盾、逻辑跳跃；上下文不一致是不违反客观事实，却违反用户在 Prompt 里给出的明确条件。[原文§三类幻觉的典型表现](https://xiaolinnote.com/ai/llm/hallucination.html#%E4%B8%89%E7%B1%BB%E5%B9%BB%E8%A7%89%E7%9A%84%E5%85%B8%E5%9E%8B%E8%A1%A8%E7%8E%B0)
- **D18-2** 训练语料来自互联网，里面有错误、谣言、互相矛盾和过时的信息；模型在预训练时把这些都学进参数，没有区分真假的机制，推理时说出来的可能就是某个错误来源的回声。[原文§根因一：训练数据本身就有错](https://xiaolinnote.com/ai/llm/hallucination.html#%E6%A0%B9%E5%9B%A0%E4%B8%80-%E8%AE%AD%E7%BB%83%E6%95%B0%E6%8D%AE%E6%9C%AC%E8%BA%AB%E5%B0%B1%E6%9C%89%E9%94%99)
- **D18-3** 数据库是查询后返回精确匹配的记录，找不到就明确报错；LLM 是按概率续写最可能的下一个 token，对自己知不知道某件事没有显式信号，永远会输出点什么。知识模糊地分布在参数里，记得不牢时就会续上一个看似合理的错误答案。[原文§根因二：生成机制是「续写」不是「查询」](https://xiaolinnote.com/ai/llm/hallucination.html#%E6%A0%B9%E5%9B%A0%E4%BA%8C-%E7%94%9F%E6%88%90%E6%9C%BA%E5%88%B6%E6%98%AF%E3%80%8C%E7%BB%AD%E5%86%99%E3%80%8D%E4%B8%8D%E6%98%AF%E3%80%8C%E6%9F%A5%E8%AF%A2%E3%80%8D)
- **D18-4** SFT 的期望回答大多写得自信、详细，很少写我不知道；RLHF 阶段标注员也倾向于给详细自信的回答打高分，哪怕它其实是错的。奖励模型学到自信等于高分、谨慎等于低分，主模型就变得总是自信、不会拒答。[原文§根因三：对齐目标的副作用](https://xiaolinnote.com/ai/llm/hallucination.html#%E6%A0%B9%E5%9B%A0%E4%B8%89-%E5%AF%B9%E9%BD%90%E7%9B%AE%E6%A0%87%E7%9A%84%E5%89%AF%E4%BD%9C%E7%94%A8)
- **D18-5** 训练层：在对齐数据里加入不知道就说不知道的样例，并做校准训练；推理层：先分步分析再作答、调低 Temperature、Self-Consistency 多次采样投票、约束解码；系统层：接入 RAG、对答案做后处理核查、强制带引用来源。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/hallucination.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D18-6** 工程目标是降低发生率并让用户能识别：对不确定的回答主动声明、带引用和可信度标记，医疗、法律等高风险场景必须有人类把关。[原文§工程实践：为什么幻觉不可能完全消除](https://xiaolinnote.com/ai/llm/hallucination.html#%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B9%BB%E8%A7%89%E4%B8%8D%E5%8F%AF%E8%83%BD%E5%AE%8C%E5%85%A8%E6%B6%88%E9%99%A4)

### 补充考点

- **D18-7** 定义是模型生成了与训练事实、用户输入或已知世界不一致的内容，但语言上看起来流畅合理；两个特征是内容错、听起来对。只是错但一眼能看出来的不算幻觉，幻觉特指读起来很顺、引用看起来专业、查证后发现是编造的输出，例如不存在的书或文献。[原文§幻觉到底是什么？为什么 LLM 必然会幻觉](https://xiaolinnote.com/ai/llm/hallucination.html#%E5%B9%BB%E8%A7%89%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88-llm-%E5%BF%85%E7%84%B6%E4%BC%9A%E5%B9%BB%E8%A7%89)
- **D18-8** 温度只能减少同一个错误重复出现的随机性，不能修正错误本身；模型的知识是分布式编码在权重里的，不是 key-value 存储，记得多准取决于训练时见过多少次，记错了就是记错了，温度调低反而让错误答案更稳定地输出。[原文§根因二：生成机制是「续写」不是「查询」](https://xiaolinnote.com/ai/llm/hallucination.html#%E6%A0%B9%E5%9B%A0%E4%BA%8C-%E7%94%9F%E6%88%90%E6%9C%BA%E5%88%B6%E6%98%AF%E3%80%8C%E7%BB%AD%E5%86%99%E3%80%8D%E4%B8%8D%E6%98%AF%E3%80%8C%E6%9F%A5%E8%AF%A2%E3%80%8D)
- **D18-9** 校准的拒答，出自 Anthropic 2023 年的论文：让模型在对齐训练时学习该说不知道的时候就说不知道，使它的自信度和实际正确率对齐。面试里可以说 Claude 这类模型体现了更强的拒答校准倾向，但不要断言某个产品就是某套论文流程的直接结果。[原文§根因三：对齐目标的副作用](https://xiaolinnote.com/ai/llm/hallucination.html#%E6%A0%B9%E5%9B%A0%E4%B8%89-%E5%AF%B9%E9%BD%90%E7%9B%AE%E6%A0%87%E7%9A%84%E5%89%AF%E4%BD%9C%E7%94%A8)
- **D18-10** 代码生成里，前半段定义了变量 x，后半段却引用了从未定义过的 y；基于文档回答时，用户明确要求只根据给定资料回答，模型答的却是自己记忆里的知识，而不是文档里的内容。[原文§三类幻觉的典型表现](https://xiaolinnote.com/ai/llm/hallucination.html#%E4%B8%89%E7%B1%BB%E5%B9%BB%E8%A7%89%E7%9A%84%E5%85%B8%E5%9E%8B%E8%A1%A8%E7%8E%B0)
- **D18-11** 让模型先分步分析再给结论，减少跳步；对事实性问答用 0 到 0.3 的低温，减少随机偏差带来的幻觉；Self-Consistency，用较高温度采样多次后多数投票；输出格式有严格约束时用约束解码，限制每步只能选合法的 token，可以根除格式错误这类幻觉。[原文§缓解方案：推理层](https://xiaolinnote.com/ai/llm/hallucination.html#%E7%BC%93%E8%A7%A3%E6%96%B9%E6%A1%88-%E6%8E%A8%E7%90%86%E5%B1%82)
- **D18-12** 一是 RAG，生成前先检索外部资料拼进 Prompt，把靠模糊的参数记忆换成靠可追溯的检索结果，效果取决于召回、文档质量、Rerank 和引用校验；二是后处理核查，用另一个 LLM 或检索系统验证输出里的事实声明，核查不过就标红或删除。优点是最有效、可观测、可追溯，代价是额外的延迟和系统复杂度。[原文§缓解方案：系统层](https://xiaolinnote.com/ai/llm/hallucination.html#%E7%BC%93%E8%A7%A3%E6%96%B9%E6%A1%88-%E7%B3%BB%E7%BB%9F%E5%B1%82)
- **D18-13** 收集模型生成的回答，用第二个模型或人工做事实核查，把出现幻觉的回答标记为低分，作为对齐训练的负样本；原文称这是 Anthropic 的 Constitutional AI 流程的一部分。训练层缓解的优点是治本，代价是训练成本高，效果上限受训练数据质量限制，所以工程上还需要推理层和系统层辅助。[原文§缓解方案：训练层](https://xiaolinnote.com/ai/llm/hallucination.html#%E7%BC%93%E8%A7%A3%E6%96%B9%E6%A1%88-%E8%AE%AD%E7%BB%83%E5%B1%82)

## 19. MoE

原文：[19. MoE 混合专家模型是什么？DeepSeek V3、Qwen 为什么用 MoE？](https://xiaolinnote.com/ai/llm/moe.html)。

- **D19-1** MoE 把 Transformer 中的 FFN 前馈网络层替换成 N 个并行的专家网络，再加一个 Router 决定每个 token 进哪些专家。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/moe.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D19-2** 专家是每层并行的多份 FFN，结构相同、参数独立，训练中各自形成擅长方向；Router 通常是一个线性层，按 token 算出各专家的分数并选出 Top-K 个；负载均衡损失惩罚专家使用率不均，迫使 Router 把任务分散给所有专家。[原文§MoE 的三个核心组件](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6)
- **D19-3** 模型学到的知识量按总参数算，而每个 token 实际只计算被激活的那部分参数，推理速度接近同等激活参数的 Dense 模型；例如 DeepSeek V3 总参数 671B，每个 token 只激活约 37B。[原文§总参数 vs 激活参数：MoE 的设计哲学](https://xiaolinnote.com/ai/llm/moe.html#%E6%80%BB%E5%8F%82%E6%95%B0-vs-%E6%BF%80%E6%B4%BB%E5%8F%82%E6%95%B0-moe-%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%93%B2%E5%AD%A6)
- **D19-4** 训练初期偶然得分高的几个专家被选中并得到训练，其余专家不被选中、参数不更新，下一轮仍是那几个被选，恶性循环后整个模型只有少数专家在工作，其他专家没学到东西，所以要加负载均衡损失。[原文§MoE 的三个核心组件](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6)
- **D19-5** 虽然每个 token 只激活一部分，但所有专家的参数都要加载进显存，显存按总参数算；批量推理时不同 token 选不同专家，产生大量跨卡通信，吞吐常不如同等激活参数的 Dense 模型；热门专家还会造成 GPU 负载不均。[原文§MoE 的部署挑战](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E9%83%A8%E7%BD%B2%E6%8C%91%E6%88%98)

### 补充考点

- **D19-6** 核心思想不是拼几个小模型，而是用稀疏激活换便宜的推理；它是近两年最重要的架构方向之一，DeepSeek V3、DeepSeek R1、Mixtral、Grok 和部分 Qwen 模型都用了这条路线，但它不是唯一答案，很多主力 Dense 模型在中小规模和部署稳定性优先的场景依然常见。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/moe.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D19-7** Dense 像一本厚厚的百科全书，查一个词要把整本书过一遍；MoE 像图书馆，前台咨询员即 Router 听到问题后告诉你去哪个专家区就行。这使 MoE 在同样的推理成本下，参数量可以做到 Dense 的几倍甚至几十倍。[原文§MoE 是什么？为什么 Dense 模型不够用了](https://xiaolinnote.com/ai/llm/moe.html#moe-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88-dense-%E6%A8%A1%E5%9E%8B%E4%B8%8D%E5%A4%9F%E7%94%A8%E4%BA%86)
- **D19-8** 不是预先指定的，而是在训练中自然涌现的：训练后的专家会自发分化，有的偏向数学符号，有的偏向代码语法，有的偏向常用语言，有的偏向稀有词汇。专家数量太大时每个专家太小太专门，难以学到通用能力。[原文§MoE 的三个核心组件](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6)
- **D19-9** Router 用 token 的表示乘以一个路由矩阵，算出每个专家的偏好分数，经 softmax 归一化成概率，再取 Top-K 个专家，本质是一个简单的线性层打分加 Top-K 选取。[原文§MoE 的三个核心组件](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6)
- **D19-10** 它不使用额外的辅助损失，而是动态调整每个专家的偏置项，让负载自然均衡，进一步降低了负载均衡对主任务的干扰。[原文§MoE 的三个核心组件](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E4%B8%AA%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6)
- **D19-11** Dense 模型到 70B 量级已接近推理成本的极限，再往上几乎跑不起来；MoE 把每次的激活参数控制在 37B 到 100B 这个区间，就可以把总参数推到 600B、1T 甚至更多，形成学得多又跑得快的组合。[原文§总参数 vs 激活参数：MoE 的设计哲学](https://xiaolinnote.com/ai/llm/moe.html#%E6%80%BB%E5%8F%82%E6%95%B0-vs-%E6%BF%80%E6%B4%BB%E5%8F%82%E6%95%B0-moe-%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%93%B2%E5%AD%A6)
- **D19-12** 专家越来越多、激活率越来越低：DeepSeek V3 每层有 256 个路由专家加 1 个共享专家，每个 token 激活 9 个，即 8 个路由专家加 1 个共享专家，总参数 671B、激活 37B、激活率约 5.5%；Mixtral 8x7B 用 8 个专家激活 2 个，47B 对 13B、激活率约 28%。共享专家可以避免常见知识被反复学，更细粒度的稀疏化带来更高的算力性价比。[原文§主流 MoE 模型对比：DeepSeek V3、Mixtral、Qwen 各自的设计](https://xiaolinnote.com/ai/llm/moe.html#%E4%B8%BB%E6%B5%81-moe-%E6%A8%A1%E5%9E%8B%E5%AF%B9%E6%AF%94-deepseek-v3%E3%80%81mixtral%E3%80%81qwen-%E5%90%84%E8%87%AA%E7%9A%84%E8%AE%BE%E8%AE%A1)
- **D19-13** 负载均衡方面有 Expert Choice Routing，反过来让专家挑 token、每个专家固定处理一定数量，以及 DeepSeek V3 的无辅助损失方案；Router 的梯度要穿过 softmax 和 topk 这类操作，本身不稳定，常用 Noisy Top-K Gating 在训练时给输出加噪声鼓励探索，和 Z-loss 限制 Router logits 的范数防止极端化。[原文§MoE 的三大训练挑战](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E5%A4%A7%E8%AE%AD%E7%BB%83%E6%8C%91%E6%88%98)
- **D19-14** 通信开销会让 MoE 的多机训练效率打折扣；DeepSeek V3 用 DualPipe 算法把 All-to-All 通信和计算重叠起来，原文称这是工程实力的体现。[原文§MoE 的三大训练挑战](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E4%B8%89%E5%A4%A7%E8%AE%AD%E7%BB%83%E6%8C%91%E6%88%98)
- **D19-15** 虽然 vLLM、SGLang、TensorRT-LLM 等已有针对 MoE 的并行支持和调度优化，但 MoE 部署的技术成熟度还在快速演进，所以不少公司部署时仍选择更省心的 Dense 模型。[原文§MoE 的部署挑战](https://xiaolinnote.com/ai/llm/moe.html#moe-%E7%9A%84%E9%83%A8%E7%BD%B2%E6%8C%91%E6%88%98)
- **D19-16** 三个原因：训练经验成熟，早期 MoE 极不稳定，几年间积累的负载均衡、噪声路由等经验到 2024 年成熟到开源社区也能复现；推理框架完善，vLLM、SGLang、TensorRT-LLM 在 2024 年加入了 MoE 优化；DeepSeek V3 在 2024 年底公开了 671B 总参数、37B 激活参数的模型并报告了很低的训练成本，证明了这条路线。[原文§为什么 2024 年后 MoE 才在 LLM 领域火起来](https://xiaolinnote.com/ai/llm/moe.html#%E4%B8%BA%E4%BB%80%E4%B9%88-2024-%E5%B9%B4%E5%90%8E-moe-%E6%89%8D%E5%9C%A8-llm-%E9%A2%86%E5%9F%9F%E7%81%AB%E8%B5%B7%E6%9D%A5)
- **D19-17** MoE 适合把总容量做大、把激活成本压低；Dense 适合部署简单、负载稳定、延迟可控的场景，尤其是 1B 到 70B 这类规模。MoE 是主流方向之一，但还不能说几乎所有新模型都用它。[原文§为什么 2024 年后 MoE 才在 LLM 领域火起来](https://xiaolinnote.com/ai/llm/moe.html#%E4%B8%BA%E4%BB%80%E4%B9%88-2024-%E5%B9%B4%E5%90%8E-moe-%E6%89%8D%E5%9C%A8-llm-%E9%A2%86%E5%9F%9F%E7%81%AB%E8%B5%B7%E6%9D%A5)

## 20. 推理部署

原文：[20. 大模型部署有哪些主流方案？vLLM、TGI、llama.cpp、SGLang 实际项目里怎么选？](https://xiaolinnote.com/ai/llm/deployment_frameworks.html)。

- **D20-1** 直接用 transformers 调 generate 有三个痛点：按最大长度预分配 KV Cache 造成显存碎片和浪费；静态批处理里短请求要等长请求，吞吐上不去；相同的 System Prompt 每次都重新计算。部署框架对应做内存高效、批量调度和缓存复用。[原文§部署框架解决的核心问题](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%E9%83%A8%E7%BD%B2%E6%A1%86%E6%9E%B6%E8%A7%A3%E5%86%B3%E7%9A%84%E6%A0%B8%E5%BF%83%E9%97%AE%E9%A2%98)
- **D20-2** 借鉴操作系统的虚拟内存：把显存切成固定大小的 Block，每个请求拿到的是逻辑 KV 序列，由 Block Table 映射到物理 Block，用多少占多少、用完即释放，不再按最大长度预分配；显存利用率从三四成提高到九成以上。[原文§vLLM 与 PagedAttention：操作系统虚拟内存的灵感](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#vllm-%E4%B8%8E-pagedattention-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98%E7%9A%84%E7%81%B5%E6%84%9F)
- **D20-3** 用 Radix Tree 组织 KV Cache：每个请求的 token 序列从根节点往下走，开头相同的多个请求共享同一条路径，从出现差异处才分叉、各存独立部分；还能按 LRU 复用历史请求留下的缓存。[原文§SGLang 与 RadixAttention：共享前缀的杀手锏](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#sglang-%E4%B8%8E-radixattention-%E5%85%B1%E4%BA%AB%E5%89%8D%E7%BC%80%E7%9A%84%E6%9D%80%E6%89%8B%E9%94%8F)
- **D20-4** 可以直接读取 HF Hub 的模型 ID 自动下载部署，不用手动转格式，兼容 transformers 的 tokenizer 和 chat template；并提供鉴权、Prometheus metrics、健康检查、流式响应等企业级特性，迁移成本低。[原文§TGI：HuggingFace 生态集成方案](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#tgi-huggingface-%E7%94%9F%E6%80%81%E9%9B%86%E6%88%90%E6%96%B9%E6%A1%88)
- **D20-5** 它用纯 C++ 重写整个推理栈，零依赖，针对 CPU 指令集做 SIMD 优化，并支持 Apple Silicon 的 Metal 后端；配合 GGUF 量化格式，能让模型在没有 GPU 的笔记本、嵌入式设备和手机上运行，也适合离线和隐私敏感场景。[原文§llama.cpp：CPU / 边缘设备的事实标准](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#llama-cpp-cpu-%E8%BE%B9%E7%BC%98%E8%AE%BE%E5%A4%87%E7%9A%84%E4%BA%8B%E5%AE%9E%E6%A0%87%E5%87%86)
- **D20-6** 适合有 NVIDIA 大规模 GPU 集群、追求极致 GPU 利用率并愿意承担额外工程复杂度的团队：它针对具体 GPU 型号做优化，性能通常比 vLLM 再高 10% 到 30%，但只支持 NVIDIA GPU，部署前要先编译 engine。[原文§TensorRT-LLM：NVIDIA 官方极致优化](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#tensorrt-llm-nvidia-%E5%AE%98%E6%96%B9%E6%9E%81%E8%87%B4%E4%BC%98%E5%8C%96)
- **D20-7** 原文用决策矩阵对比了各框架的最佳场景和性能，并指出具体差距会随模型、硬件、量化方式和 batch 策略变化。[原文§怎么选部署方案：决策矩阵](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%E6%80%8E%E4%B9%88%E9%80%89%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88-%E5%86%B3%E7%AD%96%E7%9F%A9%E9%98%B5)
- **D20-8** 原文列出三个上线陷阱：请求长度极不均匀时仍有 5% 到 10% 的显存碎片，要监控显存利用率；各框架对 KV Cache 量化的支持差异大、迭代快，要查当前版本文档；MoE 模型部署更复杂，应先在测试环境跑通再上生产。 [原文§部署的三大隐藏陷阱](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%E9%83%A8%E7%BD%B2%E7%9A%84%E4%B8%89%E5%A4%A7%E9%9A%90%E8%97%8F%E9%99%B7%E9%98%B1)

### 补充考点

- **D20-9** 一是显存浪费：每个请求预分配最大长度的 KV Cache，而多数请求只用几百 token，显存白白浪费 60% 到 70%；二是静态批处理低效：凑齐一批一起跑、一起结束，短请求要等长请求；三是重复计算：所有用户共用的 System Prompt 每次都要重新计算 KV Cache。[原文§部署框架解决的核心问题](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%E9%83%A8%E7%BD%B2%E6%A1%86%E6%9E%B6%E8%A7%A3%E5%86%B3%E7%9A%84%E6%A0%B8%E5%BF%83%E9%97%AE%E9%A2%98)
- **D20-10** vLLM 是 UC Berkeley 在 2023 年开源的推理框架，核心创新是借鉴操作系统虚拟内存思想的 PagedAttention；静态批处理是凑齐 N 个请求一起跑、跑完一起结束，Continuous Batching 则让请求异步加入和退出，在每个 token 步骤动态组 batch。[原文§vLLM 与 PagedAttention：操作系统虚拟内存的灵感](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#vllm-%E4%B8%8E-pagedattention-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98%E7%9A%84%E7%81%B5%E6%84%9F)
- **D20-11** 三类场景：所有用户共用同一段几千 token 的 System Prompt；Prompt 里带 5 到 10 个固定的 Few-shot 示例；同一用户的多轮对话，每轮都包含之前的完整历史。SGLang 的 RadixAttention 用基数树 Radix Tree 这种经典数据结构来管理和复用这些共享前缀。[原文§SGLang 与 RadixAttention：共享前缀的杀手锏](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#sglang-%E4%B8%8E-radixattention-%E5%85%B1%E4%BA%AB%E5%89%8D%E7%BC%80%E7%9A%84%E6%9D%80%E6%89%8B%E9%94%8F)
- **D20-12** llama.cpp 起于 2023 年初的个人项目，现在是让大模型在非 GPU 设备上运行的事实标准：它有自定义的 GGUF 格式，把权重、量化方案和元数据打包成一个文件，并针对 AVX2、AVX512、ARM NEON 等指令集手工优化，CPU 推理能达到 GPU 的 30% 到 50%；苹果 M 系列芯片的统一内存架构特别适合它，128GB 统一内存的机器能跑 70B 模型。[原文§llama.cpp：CPU / 边缘设备的事实标准](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#llama-cpp-cpu-%E8%BE%B9%E7%BC%98%E8%AE%BE%E5%A4%87%E7%9A%84%E4%BA%8B%E5%AE%9E%E6%A0%87%E5%87%86)
- **D20-13** vLLM 靠 PagedAttention 加 Continuous Batching，适合高吞吐的 LLM API，开源社区活跃；SGLang 靠 RadixAttention 共享前缀，适合 Agent、多轮对话和 Few-shot 场景，特定场景下超过 vLLM；TensorRT-LLM 是 NVIDIA 官方的硬件极致优化，集成自家内核库，适合大厂的 NVIDIA 集群。[原文§怎么选部署方案：决策矩阵](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%E6%80%8E%E4%B9%88%E9%80%89%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88-%E5%86%B3%E7%AD%96%E7%9F%A9%E9%98%B5)
- **D20-14** 不是，两者是互补而不替代的关系：业内已经有公司混用，高吞吐的路由用 vLLM，Agent 类的路由用 SGLang。[原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/deployment_frameworks.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)

## 21. 模型评测

原文：[21. 大模型能力评测指标有哪些？](https://xiaolinnote.com/ai/llm/evaluation_metrics.html)。

- **D21-1** 综合知识用 MMLU、MMLU-Pro 这类多学科选择题；代码用 HumanEval、MBPP、SWE-bench Verified，前者给出函数签名让模型实现并用隐藏测试验证，后者让模型修真实的 GitHub issue；数学和科学推理用 GSM8K、MATH、GPQA。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-2** 这些 Benchmark 的题目在互联网上公开流传，而大模型的训练数据覆盖了大部分公开内容，模型在预训练时可能已经见过题目和答案，测试成绩因此虚高，并不反映真实的泛化能力。[原文§Benchmark 的局限性：数据污染问题](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#benchmark-%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7-%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93%E9%97%AE%E9%A2%98)
- **D21-3** 从真实用户请求里采样，人工标注期望答案，形成 50 到 200 条有代表性的黄金测试集；客观任务用程序自动验证，主观任务用 LLM-as-Judge 按给定标准打分，并人工抽查 10% 到 20% 的样本，校准裁判是否可信。[原文§如何建自己的业务评估集](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E5%A6%82%E4%BD%95%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E4%B8%9A%E5%8A%A1%E8%AF%84%E4%BC%B0%E9%9B%86)
- **D21-4** 离线评估帮助发现问题、快速迭代；线上指标，例如用户是否满意、任务完成率、会话放弃率，告诉你优化是否真正改善了用户体验。两者结合才是完整的评估体系。[原文§离线评估 + 线上指标的闭环](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E7%A6%BB%E7%BA%BF%E8%AF%84%E4%BC%B0-%E7%BA%BF%E4%B8%8A%E6%8C%87%E6%A0%87%E7%9A%84%E9%97%AD%E7%8E%AF)
- **D21-5** 每次迭代模型或 Prompt，都要在自建的黄金测试集上跑一遍，计算通过率或质量分。[原文§如何建自己的业务评估集](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E5%A6%82%E4%BD%95%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E4%B8%9A%E5%8A%A1%E8%AF%84%E4%BC%B0%E9%9B%86)

### 补充考点

- **D21-6** 大模型的能力是多维度的，感觉用起来不错不足以支撑换模型、是否微调、Prompt 优化效果这类工程决策，评测指标的价值是把主观感受转化成可比较的数字；难点在于语言生成是开放性任务，正确答案的边界往往模糊，所以存在多种侧重不同的 Benchmark。[原文§为什么需要评测指标](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E8%AF%84%E6%B5%8B%E6%8C%87%E6%A0%87)
- **D21-7** MMLU 是最广泛引用的综合能力测试，涵盖 57 个学科领域，全部是四选一的单选题，像一套全面的文化水平考试，考知识广度和推理基础；MMLU-Pro 难度更高、选项更多，也更强调推理。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-8** 它们测试数学和科学推理：GSM8K 是小学数学应用题，考基础四则运算和逻辑推理；MATH 是竞赛数学，包含代数、几何、组合数学等；GPQA 偏研究生级别的科学问答，需要物理、化学、生物等专业知识和多步推理。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-9** 它们偏对话和 Agent 能力：MT-Bench 设计多轮交互场景，用 LLM-as-Judge 给回答打分；Chatbot Arena 更像用户真实偏好的投票；τ-bench 这类评测看模型在工具调用、多轮状态管理和业务流程里的表现，更贴近 Agent 应用。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-10** 它们是更综合或更新型的评测：HELM 覆盖准确率、鲁棒性、公平性、有害性等多个维度；LiveBench 持续更新题目，降低数据污染；Humanity's Last Exam 主打更难、更广的综合知识和推理。它们比单一指标更全面，也更复杂。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-11** 避免把公开 Benchmark 直接用作训练集，采用 LiveBench 这类持续更新题库的评测，并建立来自真实业务数据的评测集，减少只依赖公开榜单的风险。 [原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93)
- **D21-12** MT-Bench 设计多轮交互场景，用 LLM-as-Judge 给回答打分；Chatbot Arena 更像用户真实偏好的投票。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-13** HELM 覆盖准确率、鲁棒性、公平性、有害性等多个维度；Humanity's Last Exam 主打更难、更广的综合知识和推理。它们比单一指标更全面，也更复杂。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)
- **D21-14** Pass@k 是常见的代码评测指标，表示让模型生成 k 个候选代码，其中至少有 1 个能通过所有测试的比例；它是对多次采样结果的统计，不是单次生成后执行测试的通过与否。[原文§主流学术 Benchmark 逐一介绍](https://xiaolinnote.com/ai/llm/evaluation_metrics.html#%E4%B8%BB%E6%B5%81%E5%AD%A6%E6%9C%AF-benchmark-%E9%80%90%E4%B8%80%E4%BB%8B%E7%BB%8D)

## 22. 模型选型

原文：[22. 对比使用过哪些主流大模型？你们项目中最终选用了哪个模型？为什么？](https://xiaolinnote.com/ai/llm/model_selection.html)。

- **D22-1** 跑分高不代表在特定业务里表现好：榜单漂亮的模型在你的财报格式、行业黑话、内部接口调用上不一定稳定；API 成本、数据出境、网络访问和企业合同支持也可能卡住项目，高频内部调用硬上最贵的模型还会把预算烧穿。[原文§1. 为什么不能盯着「排行榜」无脑选？](https://xiaolinnote.com/ai/llm/model_selection.html#_1-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E7%9B%AF%E7%9D%80%E3%80%8C%E6%8E%92%E8%A1%8C%E6%A6%9C%E3%80%8D%E6%97%A0%E8%84%91%E9%80%89)
- **D22-2** 海外标杆模型能力通常很强，但 API 成本、数据出境、网络访问和企业合同支持都可能卡住国内 ToB 项目。合规上，原文称敏感商业数据应尽量留在合规可控的链路里：海外模型要先看数据分类分级、客户合同、监管要求和企业审批，过不了就只能做离线评测，不能进核心生产链路；成本上，高频的内部中间步骤要用便宜且够用的模型。[原文§3. 我们最终选型落地的思考逻辑](https://xiaolinnote.com/ai/llm/model_selection.html#_3-%E6%88%91%E4%BB%AC%E6%9C%80%E7%BB%88%E9%80%89%E5%9E%8B%E8%90%BD%E5%9C%B0%E7%9A%84%E6%80%9D%E8%80%83%E9%80%BB%E8%BE%91)[原文§1. 为什么不能盯着「排行榜」无脑选？](https://xiaolinnote.com/ai/llm/model_selection.html#_1-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E7%9B%AF%E7%9D%80%E3%80%8C%E6%8E%92%E8%A1%8C%E6%A6%9C%E3%80%8D%E6%97%A0%E8%84%91%E9%80%89)
- **D22-3** 重点看结构化输出是否稳定、Tool Use 准确率，以及长上下文下的指令遵循：这类节点要频繁调用内部 API，JSON、函数参数和字段名都不能乱，所以稳定比榜单第一更重要。[原文§3. 我们最终选型落地的思考逻辑](https://xiaolinnote.com/ai/llm/model_selection.html#_3-%E6%88%91%E4%BB%AC%E6%9C%80%E7%BB%88%E9%80%89%E5%9E%8B%E8%90%BD%E5%9C%B0%E7%9A%84%E6%80%9D%E8%80%83%E9%80%BB%E8%BE%91)
- **D22-4** 原文的 Model Routing 做法是：高频推理、数据清洗、摘要归纳这类节点优先用性价比高的模型，特别难的问题再路由给能力更强但更贵的模型，这样既控制成本，又保证难题的质量。[原文§💡 简要回答](https://xiaolinnote.com/ai/llm/model_selection.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D22-5** 不能照榜单选，要看模型在自己业务的格式、术语和接口调用上的表现，以及成本和合规约束。[原文§1. 为什么不能盯着「排行榜」无脑选？](https://xiaolinnote.com/ai/llm/model_selection.html#_1-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E7%9B%AF%E7%9D%80%E3%80%8C%E6%8E%92%E8%A1%8C%E6%A6%9C%E3%80%8D%E6%97%A0%E8%84%91%E9%80%89)

### 补充考点

- **D22-6** 一类是国内可落地的生产候选，例如 DeepSeek、Qwen、豆包；另一类是海外能力标杆，例如 GPT 和 Claude 的旗舰系列，用来作为能力上限参照。 [原文§💡 简要回答](https://xiaolinnote.com/ai/llm/model_selection.html#%F0%9F%92%A1-%E7%AE%80%E8%A6%81%E5%9B%9E%E7%AD%94)
- **D22-7** DeepSeek 系列推理和性价比突出，适合高频分析、代码辅助、长链路推理这类成本敏感的节点；豆包和火山引擎系列的优势是工程生态、并发能力和中文产品化体验，适合客服、内容生成、批量分类这类吞吐优先的场景；Claude 系列长文本、代码和 Agent 调度能力很强，常被用作评测基准或兜底模型，但要先过合规、成本和可用性几关。[原文§2. 主流大模型横向盘点（2026 年视角）](https://xiaolinnote.com/ai/llm/model_selection.html#_2-%E4%B8%BB%E6%B5%81%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%A8%AA%E5%90%91%E7%9B%98%E7%82%B9-2026-%E5%B9%B4%E8%A7%86%E8%A7%92)
- **D22-8** 项目是企业级多智能体 RAG 问答系统，链路包括解析长篇财报、多个 Agent 规划拆解、频繁调用内部数据库与搜索引擎、汇总生成中文报告；团队没有死磕单一模型，而是设计了大模型路由分配即 Model Routing 策略，按环节分配不同的模型。[原文§3. 我们最终选型落地的思考逻辑](https://xiaolinnote.com/ai/llm/model_selection.html#_3-%E6%88%91%E4%BB%AC%E6%9C%80%E7%BB%88%E9%80%89%E5%9E%8B%E8%90%BD%E5%9C%B0%E7%9A%84%E6%80%9D%E8%80%83%E9%80%BB%E8%BE%91)
- **D22-9** 四个维度是合规、成本、延迟和能力特征。国内 ToB 项目要把数据合规作为硬约束：敏感商业数据尽量留在合规可控的链路里，使用海外模型前要核对数据分类、客户合同、监管要求和企业审批；这些条件不能满足时，不能让它进入核心生产链路。 [原文§🎯 面试总结](https://xiaolinnote.com/ai/llm/model_selection.html#%F0%9F%8E%AF-%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93) [原文§3. 我们最终选型落地的思考逻辑](https://xiaolinnote.com/ai/llm/model_selection.html#_3-%E6%88%91%E4%BB%AC%E6%9C%80%E7%BB%88%E9%80%89%E5%9E%8B%E8%90%BD%E5%9C%B0%E7%9A%84%E6%80%9D%E8%80%83%E9%80%BB%E8%BE%91)
- **D22-10** Qwen 系列（通义千问）在中文语境、工具调用、结构化输出、长上下文上的能力比较适合企业级应用，尤其适合做主调度、文档理解、RAG 汇总这类要求稳定性的节点；GPT 系列（原文写作时是 GPT-5.5 / o 系列）适合作为复杂推理、代码、多模态能力的标杆模型，国内企业项目里通常要谨慎放到核心链路，重点评估数据出境、合规审批、网络稳定性和成本。[原文§2. 主流大模型横向盘点（2026 年视角）](https://xiaolinnote.com/ai/llm/model_selection.html#_2-%E4%B8%BB%E6%B5%81%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%A8%AA%E5%90%91%E7%9B%98%E7%82%B9-2026-%E5%B9%B4%E8%A7%86%E8%A7%92)

## 23. 长上下文

原文：[23. 为什么长上下文会出现 Lost in the Middle？上下文窗口越大越好吗？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html)。

- **D23-1** 训练长度是模型训练时见过的文本长度；窗口上限是接口允许的输入加输出 token 上限，回答的是能不能装进去；有效上下文长度回答的是装进去以后能不能用好，同一段证据在短输入里能答对，放进大量干扰内容中就可能答错。[原文§先分清「训练长度」「窗口上限」和「有效长度」](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E5%85%88%E5%88%86%E6%B8%85%E3%80%8C%E8%AE%AD%E7%BB%83%E9%95%BF%E5%BA%A6%E3%80%8D%E3%80%8C%E7%AA%97%E5%8F%A3%E4%B8%8A%E9%99%90%E3%80%8D%E5%92%8C%E3%80%8C%E6%9C%89%E6%95%88%E9%95%BF%E5%BA%A6%E3%80%8D)
- **D23-2** 把同一条关键证据分别放在长文档的开头、中间和结尾，很多模型呈现类似 U 形的表现：在开头和结尾更容易答对，放在中间时正确率更容易下降。不是模型看不见中间的内容，而是没能稳定地把它选出来用于回答。[原文§Lost in the Middle 到底是什么现象？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#lost-in-the-middle-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88%E7%8E%B0%E8%B1%A1)
- **D23-3** 至少还有三方面：训练分布，样本里答案常在开头或结尾，中间位置练得少；注意力稀释和干扰，输入变长后相关证据被重复、相似或错误的内容包围；任务难度，需要整合多处分散证据的任务更容易失败。[原文§为什么不能只怪位置编码？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E5%8F%AA%E6%80%AA%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81)
- **D23-4** 标准的稠密 Self-Attention 计算量大致按序列长度的平方增长；已有 token 的 K、V 要放进 KV Cache，序列越长缓存越大，长输入的 Prefill 时间也更久；API 按输入 token 计费，输入越多成本越高。[原文§上下文窗口越大，代价也越大](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E8%B6%8A%E5%A4%A7-%E4%BB%A3%E4%BB%B7%E4%B9%9F%E8%B6%8A%E5%A4%A7)
- **D23-5** 先用关键词和向量检索召回候选片段，再用 Rerank 把真正相关的排到前面，只把高相关证据交给模型；需要全局信息时做分层摘要，并把数字、约束等单独抽成结构化字段；提示词里指令、目标、约束分区清楚，证据带标题、来源和段落编号。[原文§工程上怎么让长上下文真正好用？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E5%B7%A5%E7%A8%8B%E4%B8%8A%E6%80%8E%E4%B9%88%E8%AE%A9%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9C%9F%E6%AD%A3%E5%A5%BD%E7%94%A8)
- **D23-6** 让测试集同时改变几个条件：输入长度从 8K、32K 增长到目标长度；关键证据分别放在开头、中间和结尾；干扰文档从少到多；任务同时包含单点检索、多证据汇总、时间排序和冲突判断，并记录引用是否正确以及延迟和成本的变化。[原文§长上下文应该怎么评测？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E8%AF%84%E6%B5%8B)

### 补充考点

- **D23-7** 把上下文窗口当成电脑硬盘，以为容量越大模型就一定看得越全、答得越准，只要内容没超过上限就能全部记住。[原文§23. 为什么长上下文会出现 Lost in the Middle？上下文窗口越大越好吗？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#_23-%E4%B8%BA%E4%BB%80%E4%B9%88%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E4%BC%9A%E5%87%BA%E7%8E%B0-lost-in-the-middle-%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E8%B6%8A%E5%A4%A7%E8%B6%8A%E5%A5%BD%E5%90%97)
- **D23-8** 开头通常放系统指令、任务背景和核心定义，模型在训练中见过大量这种结构；结尾离要生成的答案最近，用户问题也常在这里，模型于是形成对开头和近邻内容更强的利用倾向。中间内容容易夹在大量相似段落里，关键信息只出现一次时，虽然在窗口内，却未必能赢得足够的注意力。[原文§Lost in the Middle 到底是什么现象？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#lost-in-the-middle-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88%E7%8E%B0%E8%B1%A1)
- **D23-9** 不能。位置编码确实有影响：推理时用到训练阶段没见过的位置范围，位置表示可能失真；但把这个现象全部归因于 RoPE 或其他位置编码，是把问题想简单了。[原文§为什么不能只怪位置编码？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E5%8F%AA%E6%80%AA%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81)
- **D23-10** 除了成本和延迟，还有质量退化：塞入更多资料看似在增加信息，实际也可能引入旧版本、重复片段、无关内容和彼此矛盾的描述，模型要先从噪声里找信息再推理，任务反而更难。[原文§上下文窗口越大，代价也越大](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E8%B6%8A%E5%A4%A7-%E4%BB%A3%E4%BB%B7%E4%B9%9F%E8%B6%8A%E5%A4%A7)
- **D23-11** 第一反应不应该是全部塞进去，而是先问完成当前任务模型到底需要哪些信息；压缩也不是越狠越好，摘要之后必须保留可以回查原文的引用或 chunk ID，回答涉及数字、合同条款等高风险信息时回到原文核验，避免摘要变成新的信息瓶颈。[原文§工程上怎么让长上下文真正好用？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E5%B7%A5%E7%A8%8B%E4%B8%8A%E6%80%8E%E4%B9%88%E8%AE%A9%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9C%9F%E6%AD%A3%E5%A5%BD%E7%94%A8)
- **D23-12** 只拿一篇短文章问两个问题测不出来；只把一串随机数字藏进长文本、看模型能否找回，也不够接近真实业务。[原文§长上下文应该怎么评测？](https://xiaolinnote.com/ai/llm/23_long_context_lost_middle.html#%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E8%AF%84%E6%B5%8B)
