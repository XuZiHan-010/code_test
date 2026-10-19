# Redis O7 场景题只读审查

审查日期：2026-10-19。范围：O7-1～O7-281，共 281 题；实际题型为单选 183、多选 37、填空 31、简答 30。已逐题读取实际选择题题干、全部选项和正确标记，以及 Markdown 题干和参考答案，并与本次保存的原文场景部分（source.txt:812 起）对照。31 道填空的空数、顺序配置和答案排列未发现错误。未修改代码、题库或章节状态，未执行 Git 发布操作。

## 1. O7-128：“可能返回”被当成“保证返回”，单选题不能唯一排除其他选项（P2）

- 位置：content/typed/redis.json:14340（题干）、14344/14349/14354/14359（四个选项）；interview-practice/redis.md:826；interview-practice/answers-xiaolin/redis.md:826。
- 实际题干：“SCAN 完整扫描期间，哪类 key 能被返回？”
- 实际标记：A“扫描过程中途新增加进来的 key”错；B“扫描过程中途被删除掉的 key”错；C“完整扫描期间一直存在的 key”对；D“扫描过程中途被删除之后又重建的 key”错。
- 触发：扫描先返回一个 key，之后该 key 被删除，B 即为确实“能被返回”的 key；扫描开始后新增的 key 或删除后重建的 key 也可能返回。只有“保证返回”才能唯一选 C。“不保证返回”不等于“不能返回”。
- 影响：按题干字面正确理解 SCAN 的用户会认为 A/B/D 也可能成立，系统却只接受 C。
- 建议：改为“哪类 key 保证会在完整扫描中被返回（不使用会排除它的 MATCH/TYPE 条件）？”；答案已用“能确定被返回”解释，应将该限定移到题干。
- 归因：题库出题丢失“保证”限定。原文 source.txt:951 清楚区分一直存在的 key 与中途变化的 key，后者“是否被返回不保证”。
- 证据：[原文 SCAN 小节](https://xiaolincoding.com/interview/redis.html#keys-和-scan-有什么区别-scan-会漏数据吗)；[Redis 官方 SCAN guarantees](https://redis.io/docs/latest/commands/scan/#scan-guarantees)明确完整扫描保证返回始终存在的元素，中途变化的元素可能返回也可能不返回。

## 2. O7-211：已经标记 x 的前提与“判断 x 不存在”的设问冲突（P2）

- 位置：content/typed/redis.json:16216（题干）、16220/16225/16230/16235（选项）；interview-practice/redis.md:930；interview-practice/answers-xiaolin/redis.md:930。
- 实际题干：x 的哈希位置为 1、4、6，“并已被标记”，再问查询 x 时“怎样判断它不在数据库中”。
- 实际标记：A“只要第 1、4、6 位中有一个为 0”对；B“第 1、4、6 位全部为 1”错；C“第 1、4、6 位中至少有一个为 1”错；D“第 1、4、6 位全部为 0 才能判断”错。
- 触发：按题设把 x 正确加入普通布隆过滤器，三个位置都为 1；在没有清空、损坏或错误删除位的情况下，A 的条件不会出现。题干没有这些额外事件。
- 影响：用户面对的是一个已经确定为全 1 的具体状态，却被要求选一个在该状态不成立的条件；考点本应是一般查询的否定判据。
- 建议：删去“并已被标记”，改为“待查询数据 x 的三个哈希位置为 1、4、6；在过滤器正确覆盖数据库数据的前提下，什么位状态可判断 x 不存在？”保持 A。
- 归因：原文 source.txt:1033 本身先演示写入 x，再解释一般查询判据；选择题将演示状态固化成题设，造成冲突。不是 A 所表达的一般判据错误。
- 证据：[原文布隆过滤器小节](https://xiaolincoding.com/interview/redis.html#布隆过滤器原理介绍一下)；[Redis 官方 Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/)说明布隆过滤器的肯定回答可能误判，否定回答针对其所表示的集合具有确定性。

## 3. O7-209：从过滤器否定直接推出数据库不存在，遗漏覆盖前提（P2）

- 位置：content/typed/redis.json:16162、16176；interview-practice/redis.md:928；interview-practice/answers-xiaolin/redis.md:928。
- 实际题干只说“用布隆过滤器查询数据是否在数据库时，如果查询到数据没有被标记”；正确 C 为“说明数据不在数据库中”，解析也无条件重复该结论。
- 触发：数据库插入成功，但过滤器尚未更新；数据在数据库存在而过滤器否定。此场景正是 O7-214 和原文 source.txt:1036 明确指出的同步延迟窗口。
- 影响：独立作答时结论并不成立，并与同章 O7-214 的正确解释冲突。
- 建议：在题干和解析加入“假设过滤器已正确覆盖数据库中所有待判断数据，且没有同步滞后”等前提。或者把设问改成判断元素是否属于过滤器所表示的集合，避免偷换成数据库状态。
- 归因：原文同小节后段已经给出覆盖前提，题库拆题时丢失该限定；不需要否定布隆过滤器无假阴性的算法性质。
- 证据：[原文布隆过滤器小节](https://xiaolincoding.com/interview/redis.html#布隆过滤器原理介绍一下)；[Redis 官方 Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/)的集合成员判定语义。

## 4. O7-80：把可用的续期措施写成“保证锁不会提前过期”（P2）

- 位置：content/typed/redis.json:13197、13201；interview-practice/redis.md:760；interview-practice/answers-xiaolin/redis.md:760。
- 实际题干：“业务耗时不确定时，可以怎么保证锁不会提前过期？”；唯一正确 A 为定期检查归属并续期。
- 触发：客户端长时间 GC、线程卡顿或网络中断，续期请求未能在 TTL 内成功，业务仍未结束。续期机制此时不能作上述保证。
- 影响：把缓解措施表述成确定保证，与 O7-83、O7-84、O7-88 以及原文关于续期局限的说明冲突。
- 建议：改为“可以采用什么机制降低锁在业务完成前过期的风险？”；解析补充续期可能失败，业务还需要防止旧持有者继续写入。
- 归因：题库加强了原文结论。原文 source.txt:901 说可以使用续期，source.txt:909 随即明确续期不是绝对保证。
- 证据：[原文锁过期小节](https://xiaolincoding.com/interview/redis.html#分布式锁过期了-但业务还没执行完-怎么办)；[Redis 官方分布式锁一致性说明](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/#disclaimer-about-consistency)提醒即使延长生命周期，也不能假设持有者活着就一直持有锁。

## 5. O7-237、O7-242：先计数后新增的滑动窗口，等号边界不精确（P3，原文技术表述简化）

- 位置：content/typed/redis.json:16816（O7-237 正确 D）；interview-practice/answers-xiaolin/redis.md:962、967；题干在 interview-practice/redis.md:962、967。
- 当前表述：先清理窗口外数据，再统计数量，“没有超过阈值才记录当前请求”；O7-242 简答答案写“没超阈值才记录当前请求”。
- 触发：限制最近 60 秒最多 100 次，清理后已经有 100 条记录；100 没有超过 100，若按文字先验判断再加入，就会记录并放行第 101 次。
- 影响：这里需要明确比较的是加入当前请求之前的数量；直接按文字实现有一条请求的边界偏差。
- 建议：写成“现有数量严格小于阈值时，才记录并放行当前请求；达到阈值就拒绝”，或“加入本次后仍不超过阈值”。按项目规则，若作为原文修正处理，注明原文的“没有超过”说法并加官方核对来源。
- 归因：原文 source.txt:1068 同样采用“没有超过阈值才记录”的表述，题库忠实转述了这一处不精确边界，不是正确字母录错。
- 证据：[原文限流小节](https://xiaolincoding.com/interview/redis.html#redis-怎么实现限流)；[Redis 官方滑动窗口日志示例](https://redis.io/docs/latest/develop/use-cases/rate-limiter/rust/#sliding-window-log)使用 `count < limit` 后才执行 `ZADD`。

## 6. O7-31：独立题干里的“这类并发量问题”没有指代（P3）

- 位置：content/typed/redis.json:12079；interview-practice/redis.md:696；解析在 interview-practice/answers-xiaolin/redis.md:696。
- 实际题干：“按原文，面对这类并发量问题，更合适的回答思路是什么？”没有写出所问的是 Redis 单节点加 MySQL 单节点的承载量估算。
- 触发：作为独立题目、错题本题目呈现，用户看不到前面几题，无法知道“这类”指哪个具体问题。
- 影响：可以通过选项猜中 C，但题干不自足；原文中完整的问题标题被拆题时省去了。
- 建议：改为“面对‘Redis 单节点 + MySQL 单节点能承受多大并发量’的问题，更合适的回答思路是什么？”正确选项可不变。
- 证据：[原文并发量问题小节](https://xiaolincoding.com/interview/redis.html#高并发场景-redis单节点-mysql单节点能有多大的并发量)，source.txt:843～848。

## 未列为错误的内容

- 大 key 的 1 MB / 1 万元素和 70% / 20% 告警数字均注明团队经验或示例，没有被题库包装成 Redis 官方硬性标准。
- 普通命令串行执行、List TTL 针对整个 key、Stream 的 ACK/PEL/幂等、缓存旧值回填、Redlock 的时间与故障边界，与所引原文一致。
- O7-213/O7-218 的“对已正确加入过滤器的数据”措辞沿袭原文，原文本意应理解为过滤器已覆盖待判断集合；其参考答案紧接同步延迟说明。建议在处理第 3 项时顺带统一表述，但没有把这一同源措辞重复统计为新的错题。
- 未发现填空空数或有序/无序配置错误、题型不匹配或参考答案与正确标记不一致的其他确定问题。机械校验结果由主 Agent 汇总。
