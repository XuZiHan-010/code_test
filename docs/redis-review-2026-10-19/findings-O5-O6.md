# Redis O5 / O6 只读审查

审查日期：2026-10-19。未改动代码、题卷、答案、题型数据，未执行 Git 发布操作。

## 范围与核对结果

逐题核对 O5 的 76 题、O6 的 107 题，共 183 题。实际题型来自 `content/typed/redis.json`；short 题干来自 `interview-practice/redis.md`；参考答案来自 `interview-practice/answers-xiaolin/redis.md`。比较基准为本目录 `source.html` / `source.txt` 中的小林原文快照。

| 题组 | 单选 | 多选 | 填空 | 简答 | 合计 |
| --- | ---: | ---: | ---: | ---: | ---: |
| O5 | 52 | 8 | 8 | 8 | 76 |
| O6 | 72 | 12 | 15 | 8 | 107 |

核对了全部选择题选项及正确标记，23 道填空题的空数、顺序配置及答案对应关系，16 道简答题题干和答案，以及独立题干是否保留原文前提。23 道填空均满足 `____` 个数等于 blankCount，未发现空数或顺序配置错误；单选正确项数均为 1，多选正确项数均至少为 2。以下是发现的 5 组问题，涉及 6 个题号。

## 1. P2：O5-72 的题干范围与 EXPIRE 错误标记不一致

- 文件：`content/typed/redis.json:8769`；题卷 `interview-practice/redis.md:510`；答案 `interview-practice/answers-xiaolin/redis.md:510`。
- 实际题型：多选；当前标记 A、E 正确，B（EXPIRE 重设有效期）错误。
- 触发条件：原 TTL 为 30 秒，对同一个仍存在的 key 成功执行 `EXPIRE key 60`。它不再保留原来的到期时间，符合当前题干的字面范围，但 B 被判错。解析把“仍有新的过期时间”作为错误理由，说明实际想问的是“移除 TTL”，并非“不再有原来的过期时间”。
- 影响：理解 EXPIRE 的用户可能合理选择 A、B、E 而被判错；题干与解析混淆“改变到期时间”和“清除 TTL”。
- 建议：保留 A、E 标记，将题干改为“下列哪些操作会清除 key 的 TTL，使其变为没有过期时间的 key？”，同步改 Markdown 题干。若保留当前题干，则 B 必须纳入正确范围。
- 原文证据：[修改 key 的值，会不会影响过期时间？](https://xiaolincoding.com/interview/redis.html#修改-key-的值-会不会影响过期时间)，快照 `source.txt:680` 把 EXPIRE / PEXPIRE 定义为重设有效期。此处是题库改写引入的歧义，原文区分了重设与移除。
- 官方核实：[EXPIRE — Refreshing expires](https://redis.io/docs/latest/commands/expire/#refreshing-expires) 说明已有 TTL 可以更新为新值。

## 2. P2：O6-22 遗漏“复制 ID 兼容”的增量同步前提

- 文件：`content/typed/redis.json:9348`；题卷 `interview-practice/redis.md:543`；答案 `interview-practice/answers-xiaolin/redis.md:543`。
- 实际题型：多选；A、D 标记正确。A 直接断言所需数据仍在 backlog 即采用增量同步；解析同样把数据存在当成充分条件。
- 触发条件：从节点提交的复制 ID 与主节点可接受的历史不兼容，即使请求的数值偏移量落在现存 backlog 范围内，也不能续传该历史，仍需全量同步。
- 影响：独立答题时 A 缺少必要前提；解析与 O6-21、O6-30 讲解的两项判断条件不一致。
- 建议：在题干明确“主节点已确认复制 ID 兼容后”，或在 A 中补齐 ID 兼容与偏移量有效两个条件；同步修正解析中以数据存在作为唯一充分条件的句子。现有 A、D 正确字母可以保持。
- 原文证据：[Redis 主从同步](https://xiaolincoding.com/interview/redis.html#redis主从同步中的增量和完全同步怎么实现)，快照 `source.txt:715` 在两条 backlog 分支之前明确先检查复制 ID，再检查 offset。题库摘出分支时丢掉了这一前提，属于题库改写问题。
- 官方核实：[Redis 7.0 replication.c / masterTryPartialResynchronization](https://github.com/redis/redis/blob/7.0/src/replication.c#L662) 在 ID 不兼容时直接转全量同步，之后才检查 backlog 范围；[复制 ID 的含义](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/#replication-id-explained) 也说明 ID 区分数据历史。

## 3. P2：O6-75 / O6-89 沿用原文的集群创建命令简写，容易被误作 Redis 服务端命令

- 文件：O6-75 `content/typed/redis.json:10574`、题卷 `interview-practice/redis.md:611`、答案 `interview-practice/answers-xiaolin/redis.md:611`；O6-89 答案 `interview-practice/answers-xiaolin/redis.md:625`。
- 实际题型：O6-75 单选，B `cluster create` 为正确项；O6-89 简答。
- 触发条件：用户把题库认定的命令输入 Redis CLI 交互提示符，执行 `CLUSTER CREATE`；这个集群创建动作实际属于 redis-cli 的集群管理选项，并非对应的 Redis 服务端子命令。
- 影响：O6-75 将客户端管理命令与 CLUSTER MEET / CLUSTER ADDSLOTS 服务端命令写成同一层级；O6-89 继续传播不完整的可执行命令。
- 建议：O6-75 正确选项和答案改为 `redis-cli --cluster create ...`；O6-89 同步更新。按项目题库规则保留原文链接，用括号说明原文写作 `cluster create`，并增加“核对来源：”官方链接。无需改变题型或正确字母。
- 原文证据：[Redis 集群模式及优缺点](https://xiaolincoding.com/interview/redis.html#redis集群的模式了解吗-优缺点了解吗)，快照 `source.txt:774`。这是原文的命令简写，题库与原文一致，应归为原文技术表述修订，而非转写错误。
- 官方核实：[创建 Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/#create-a-redis-cluster) 给出的实际命令是 `redis-cli --cluster create` 加节点地址。

## 4. P2：O6-76 沿用原文将 ADDSLOTS 参数误称为“槽个数”

- 文件：`content/typed/redis.json:10601`；题卷 `interview-practice/redis.md:612`；答案 `interview-practice/answers-xiaolin/redis.md:612`。
- 实际题型：有序填空，2 空；当前答案依次 CLUSTER MEET、CLUSTER ADDSLOTS。空数及顺序本身无误。
- 触发条件：用户以为给节点分配两个槽应执行 `CLUSTER ADDSLOTS 2`。该参数实际指定槽号 2，只分配一个槽；分配槽 0、1 应传两个槽号。
- 影响：会把命令参数的含义学错，不能据此完成期望的手动槽位分配。
- 建议：题干改为“再用 ____ 命令将指定槽号列表分配给当前节点”；答案补充参数是具体槽号，并按项目规则注明原文称槽个数、加入官方核对链接。两空及有序配置可以保持。
- 原文证据：[Redis 集群模式及优缺点](https://xiaolincoding.com/interview/redis.html#redis集群的模式了解吗-优缺点了解吗)，快照 `source.txt:775`。这是原文自身表述问题，题库与原文一致。
- 官方核实：[CLUSTER ADDSLOTS](https://redis.io/docs/latest/commands/cluster-addslots/) 的语法为 `CLUSTER ADDSLOTS slot [slot ...]`，参数是分配给当前节点的槽号列表。

## 5. P3：O6-61 的“偏移量也相同”依赖前一道题补齐优先级条件

- 文件：`content/typed/redis.json:10292`；题卷 `interview-practice/redis.md:591`；答案 `interview-practice/answers-xiaolin/redis.md:591`。
- 实际题型：单选，C（run ID 字典序更小）正确。
- 触发条件：只展示这一题时，候选从节点偏移量相同，但 replica-priority 不同。此时应先按优先级选，不能仅按 run ID。题干中的“也”仅能从 O6-60 或原文上文找到指代，独立题干未明说优先级相同。
- 影响：顺序阅读原文能理解，错题单独练习时条件不完整。
- 建议：题干明确为“过滤不合适的从节点后，若候选节点的 replica-priority 和复制偏移量均相同，Sentinel Leader 怎样决出新主节点？”；解析同时补齐条件。正确字母不变。
- 原文证据：[哨兵选主算法](https://xiaolincoding.com/interview/redis.html#哨兵机制的选主节点的算法介绍一下)，快照 `source.txt:756` 至 `source.txt:758` 是连续的条件比较列表。此处是摘成独立试题后的上下文缺失。
- 官方核实：[Sentinel — Replica selection and priority](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/#replica-selection-and-priority) 明确在优先级和已处理复制数据均相同时才用 run ID 决胜。

## 未列为错误的核实项与限制

- 原文关于 Redis 2.8 默认 volatile-lru、Redis 3.0 默认 noeviction 的历史差异，与对应官方版本配置文件一致：[2.8 redis.conf](https://github.com/redis/redis/blob/2.8/redis.conf#L436)、[3.0 redis.conf](https://github.com/redis/redis/blob/3.0/redis.conf#L436)。O5-14 / O5-15 未列为错误。
- O5-24 的“过期键”沿用原文；其正确选项和解析使用的是设置了过期时间的键这一范围，未发现正确标记错误。可将该措辞统一成“设置了过期时间的 key”，减少与已经到期的 key 混淆，但不计入上述问题组。
- 未运行 Redis 实例重现实验；涉及命令语法、复制前提、TTL 行为、Sentinel 排序的判断均有 Redis 官方文档或官方源码支撑。未做代码测试或构建，因为本任务是题库只读审查。
