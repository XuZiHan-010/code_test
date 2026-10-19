# Redis O1 / O2 审查

日期：2026-10-19。逐题核对 O1 数据结构 174 题、O2 线程模型 42 题，共 216 题。读取实际 JSON 题干、全部选项、正确标记、Markdown 题干及答案，并对照本目录保存的小林原文。未改题库、业务代码或章节状态。

## 1. P2：O1-24、O1-54 的解析仍引用换序前的位置

- O1-24：`content/typed/redis.json:524`，答案 `interview-practice/answers-xiaolin/redis.md:34`。实际正确 A/C/D，错误项 B 是“不同 Stream 之间的消息 ID 保证全局唯一”，但解析仍说“最后一项不对”。当前最后一项 D 恰好是正确项。
- O1-54：`content/typed/redis.json:1180`，答案 `interview-practice/answers-xiaolin/redis.md:73`。实际正确 B/C/E，A 的“listpack 按成员查询 O(1)”错误，但解析仍说“成立的是前三项”。
- 影响：选择题判分标记本身符合原文，交卷后展示的解析却与正确选项冲突。应改成按选项内容解释，或明确当前字母，不再依赖原排列。
- 原文对应“讲一下 Redis 底层的数据结构”“Zset 底层是怎么实现的”均支持当前正确标记；不是原文错误。

## 2. P2：O1-51 仅凭当前元素数量、长度不能唯一确定编码

- 位置：`content/typed/redis.json:1099`，答案 `interview-practice/answers-xiaolin/redis.md:70`。
- 题干只给 Redis 7.0、恰好 128 个成员、每个不超过 64 字节，唯一接受 B listpack，排除 A 跳表 + 哈希表。
- 默认配置下的反例：先逐个加入 129 个短成员，触发 listpack 转 skiplist；再用 ZREM 删除一个成员。剩下的 128 个短成员仍使用 skiplist，不因删除自动恢复 listpack。修改紧凑编码配置也可改变结果。
- 证据：[Redis 7.0 t_zset.c](https://github.com/redis/redis/blob/7.0/src/t_zset.c) 的 `zsetAdd` 在超过阈值时转换；`zsetDel` 的 skiplist 分支只删除成员、必要时调整 dict；`zremCommand` 没有转换回 listpack 的路径。本地源码副本为 `7.0-src-t_zset.c`，相关行 1371–1378、1483–1504、1801–1825。
- 上述为源码推导，未启动 Redis 实例运行反例。
- 建议：明确“默认配置下，从空集合逐个插入这些短成员，期间未超出任一紧凑编码限制”，再问边界是否包含 128。保持题型及 B 标记。原文介绍默认阈值，题库把阈值转换成了对任意现存对象编码的断言。

## 3. P2：O2-4 将普通键值查询无条件排除出 CPU 瓶颈

- 位置：`content/typed/redis.json:3927`，答案 `interview-practice/answers-xiaolin/redis.md:237`。
- 多选题问“哪些情形也可能让 Redis 的 CPU 成为瓶颈”，A/B/C 为复杂命令、大 key、长 Lua，D 普通键值查询判错。解析进一步断言普通键值查询“不会因此让 CPU 成为瓶颈”。
- 单次查询开销小不等于任意请求量下都不会耗尽 CPU；在高 QPS、足够快的网络或本机压测下，简单 GET/SET 的累计开销也能使 CPU 成为吞吐瓶颈。
- 小林原文仅说普通键值查询开销很小，并列出另外三类风险，没有给出解析中的无条件否定。这个否定是题库加强后的结论。
- 官方依据：[Redis benchmark — Factors impacting Redis performance](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/#factors-impacting-redis-performance) 说明 CPU 是重要因素，并说明客户端与服务端同机压测时 CPU 可以成为限制因素；同页提供 GET/SET 压测方式。
- 建议：改问“原文明示的、单次执行可能占用较多 CPU 的三类情况”，并把 D 写成“低请求量、小 value 的简单 GET”，或者换成确定不成立的干扰项；删除解析中的绝对结论。

## 4. 原文需核对：O2-21、O2-25 将 I/O 线程调优建议写成硬性规则

- 位置：O2-21 `content/typed/redis.json:4320`，答案 `interview-practice/answers-xiaolin/redis.md:257`；O2-25 答案 `:261`。
- O2-21 正确 E 为“线程数一定要小于机器核数”；解析将相等表述为违背规则。它忠实沿用了小林原文，不属于抄录或正确字母错误。
- [Redis 6.0 官方 redis.conf](https://github.com/redis/redis/blob/6.0/redis.conf#L941) 是建议至少四核、预留一个核，四核可尝试 2/3、八核可尝试 6；这是调优建议，没有把小于 CPU 核数定义成参数合法性的硬性约束。
- 建议：将“一定要”改为“官方建议预留至少一个空闲核，按压测调优”，与“线程数越多越好”的错误断言区分。按项目规则注明原文绝对说法，并附官方核对来源。

## 5. 低优先级：19 道多选与项目题型选择约定不一致

`.claude/skills/generate-questions/SKILL.md` 约定“并列要点只有两项……不做多选”。当前 19 道多选只有两个正确项，题号见 `checks.json` 的 `multipleWithOnlyTwoCorrect`。例如 O1-14、O1-16、O1-85、O2-30、O2-38。

这是题型设计约定问题，不是 JSON 格式或判分机制错误。建议由出题者逐题判断两个并列要点是否确实适合填空、简答或单选，不要机械批量改题型；其中 O5-72 还应先解决题意歧义。上述 19 题覆盖整个 Redis 专题，并非都属于 O1/O2。

## 核对后未列为错误

- 版本限定总体较完整，包含 Redis 7.0/7.2 的 listpack 用途、7.4 的 Hash 字段过期能力、6.0 的可选 I/O 多线程。
- O1-61 已把跳表示例的各层节点写入题干，没有只依赖缺失的图片；同分成员排序、层高概率与复杂度表述与原文一致。
- 31 道填空题未发现空数、顺序或题卷/JSON 同步问题。其他选择题本轮未确认错误标记。
