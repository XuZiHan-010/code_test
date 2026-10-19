# Redis 题库审查（2026-10-19）

修复更新：下文为修前审查记录。用户授权后已修订 42 个题号，独立复核通过；19 道多选候选逐题判断后，10 道改为单选、6 道改为简答、3 道保留多选。详见[修复清单](redis-review-2026-10-19/fixes/fix-summary.md)与[独立复核](redis-review-2026-10-19/fixes/final-review.md)。

已对照[小林coding Redis 原文](https://xiaolincoding.com/interview/redis.html)，逐题核对当前全部 7 章、774 题的实际题干、选项、正确标记和参考答案。存在会影响判分的题意歧义、条件遗漏，以及交卷后解析与选项位置不一致的问题，建议修订后再进入人工抽查通过流程。

本轮只新增此报告及 `redis-review-2026-10-19/` 下的审查材料，没有修改题库、业务代码或章节 `draft` 状态，没有执行 Git 提交或发布操作。

## 优先修订的出题问题

以下定位以 `content/typed/redis.json` 为准；解析问题另标答案文件。建议尽量通过补全题干及修正解析保留现有题号与题型，不要直接按字面把全部歧义选项改成正确。

| 题号 | 位置 | 问题与影响 | 修订方向 |
| --- | --- | --- | --- |
| O5-72 | JSON 8769；答案 510 | 问“哪些操作让 key 不再有原来的过期时间”，却把 EXPIRE 重设 TTL 判错。按题干选择 EXPIRE 的用户会被判错。 | 明确问“清除 TTL、变成没有过期时间”，或扩大正确范围。 |
| O7-128 | JSON 14340 | 问 SCAN 哪类 key“能返回”，却只接受扫描期间始终存在的 key。中途增删的 key 也可能返回，只是不保证。单选不唯一。 | 将“能”改为“保证”，并明确扫描范围。 |
| O6-22 | JSON 9348；答案 543 | 把所需数据仍在 backlog 写成增量同步的充分条件，遗漏复制 ID 必须兼容，与相邻题和原文前提冲突。 | 明确已确认复制 ID 兼容，或补齐两项条件。 |
| O1-51 | JSON 1099；答案 70 | 128 个短成员不一定意味着 listpack；曾超过阈值再删回 128 个时可以仍是 skiplist。 | 补“默认配置、从空集合构建、期间未超过限制”。 |
| O7-209 | JSON 16162；答案 928 | 布隆过滤器未标记直接推出数据库不存在，遗漏过滤器完整覆盖数据库、没有同步滞后的前提。 | 加完整覆盖前提，避免与 O7-214 的同步延迟说明冲突。 |
| O7-211 | JSON 16216 | 题设 x 的三个位置已经标记，又问怎样判定 x 不存在；正确选项要求出现题设下不会出现的 0。 | 去掉“并已被标记”，只给待查元素的哈希位置。 |
| O7-80 | JSON 13197 | 将续期写成“保证锁不会提前过期”，忽略网络中断、长暂停导致续期失败；与同章后续题矛盾。 | 改为降低提前过期风险的机制。 |
| O2-4 | JSON 3927；答案 237 | 将普通键值查询无条件排除出 CPU 瓶颈，并在解析中加强为“不会”。没有限定请求量。 | 限定单次执行开销或低负载，避免绝对否定。 |
| O1-24、O1-54 | 答案 34、73 | 选项已换序，解析仍写“最后一项不对”“前三项成立”。实际正确分别为 A/C/D、B/C/E。 | 按选项内容解释，删除对旧位置的引用。 |
| O4-14 | JSON 6072 | 正确项把“缓冲区内容写入文件后 fsync”缩成“写入缓冲区后 fsync”，漏掉 write 阶段。 | 恢复用户态缓冲区 → write → fsync 的区分。 |
| O6-61 | JSON 10292 | “偏移量也相同”未在独立题干说明优先级已相同，无法仅据此跳到 run ID 比较。 | 明确 replica-priority 与偏移量均相同。 |
| O7-31 | JSON 12079 | “面对这类并发量问题”没有说明所问场景，单题展示依赖前文。 | 补全 Redis 单节点加 MySQL 单节点的承载量问题。 |

这些问题的原文对照、触发反例、准确行号和逐题建议见 [O1–O2](redis-review-2026-10-19/findings-O1-O2.md)、[O3–O4](redis-review-2026-10-19/findings-O3-O4.md)、[O5–O6](redis-review-2026-10-19/findings-O5-O6.md)、[O7](redis-review-2026-10-19/findings-O7.md)。O3 的 39 题本轮没有确认问题。

其中编码历史反例依据 [Redis 7.0 官方 Zset 源码](https://github.com/redis/redis/blob/7.0/src/t_zset.c) 推导，SCAN 的返回保证依据 [Redis SCAN 文档](https://redis.io/docs/latest/commands/scan/#scan-guarantees)，TTL 更新依据 [Redis EXPIRE 文档](https://redis.io/docs/latest/commands/expire/#refreshing-expires)。本轮没有启动 Redis 实例执行反例。

## 忠实沿用原文，但原文本身需要限定或核对

下列项不应归为题库擅自扩展。修订时按项目规则保留原文出处、说明原文说法，并增加“核对来源：”官方链接。

| 题号 | 原文简化及修订建议 |
| --- | --- |
| O4-4、O4-19 | 泛称 AOF 只保存、回放命令，未限定纯命令格式，与同节混合持久化的 RDB 基础数据矛盾。应限定格式。 |
| O4-10、O4-11 | 把 fsync 写成通用流程最后环节，未保留 appendfsync no 不主动调用 fsync、由操作系统刷盘的例外。 |
| O6-75、O6-89 | 创建集群命令写作 `cluster create`，应写客户端管理命令 `redis-cli --cluster create ...`，避免当成服务端 CLUSTER 子命令。 |
| O6-76 | 把 CLUSTER ADDSLOTS 参数叫“哈希槽个数”；实际参数是具体槽号列表。`ADDSLOTS 2` 是分配槽号 2，并非分配两个槽。 |
| O7-237、O7-242 | 先统计再新增请求，却说“没有超过阈值才记录”。应明确新增前数量严格小于阈值，或新增后不超过阈值，避免放过第 N+1 次。 |
| O2-21、O2-25 | 将 I/O 线程少于 CPU 核数的调优建议写成“一定要”的硬性规则；应保留官方建议和压测语境。 |

官方核对分别见 [持久化](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)、[创建集群](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/#create-a-redis-cluster)、[CLUSTER ADDSLOTS](https://redis.io/docs/latest/commands/cluster-addslots/)、[滑动窗口示例](https://redis.io/docs/latest/develop/use-cases/rate-limiter/rust/#sliding-window-log)、[Redis 6.0 配置注释](https://github.com/redis/redis/blob/6.0/redis.conf#L941)。更详细的证据和归因见分章报告。

另有 19 道多选只有两个正确要点，与项目出题技能“不将只有两项的并列要点做多选”的约定不一致。这是低优先级题型设计问题，不是格式错误；具体题号保存在 [checks.json](redis-review-2026-10-19/checks.json)，建议逐题判断，不按数量机械改题型。

## 验证结果与范围

| 检查 | 结果 |
| --- | --- |
| 全部题目 | O1 174、O2 42、O3 39、O4 55、O5 76、O6 107、O7 281，合计 774 |
| 题型 | 单选 518、多选 90、填空 90、简答 76；代码题 0 |
| 题号、题序 | 题卷、答案、JSON 完全一致；重复 ID 0 |
| 章节与小节覆盖 | 本地及此次原文均为 76 个二/三级标题，去除空白后内容与顺序一致 |
| 填空同步 | 90 题的题卷标记、题干与 JSON stem/顺序完全一致 |
| 出处锚点 | 76 个不同引用锚点均存在于此次原文快照 |
| 单选正确位置 | A 130、B 131、C 128、D 129，没有明显位置偏置 |
| `npm run content:validate` | 退出码 0；仅已有 R3-139 的 V14 长度警告，Redis 没有格式警告 |
| `npm run test:unit` | 退出码 0；10 个测试文件、132 个测试全部通过 |
| 状态 | 7 章全部 draft；未改变人工抽查状态 |

校验器和单元测试不核验题目的技术语义，不能覆盖上述内容问题。未运行数据库集成测试、端到端测试或 Next.js 生产构建，本次未改业务代码。人工审查覆盖全部题目，不等于穷举全部 Redis 版本和运行配置；本轮发现按当前证据列出。

原文 HTML 与文本、分章审查材料、官方源码副本和 [机械检查结果](redis-review-2026-10-19/checks.json) 保存在同名目录。此次原文 HTML SHA-256：`5a5771c66f46aba6706da86edd038e9dda306fc84a73c41facc1a77916c88b54`；后续源文变化时可用此快照区分差异。
