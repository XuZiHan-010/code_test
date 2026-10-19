# MySQL S4–S6 逐题内容审查

审查日期：2026-10-14。只读核对题库，未改题卷、参考答案、题型 JSON 或业务代码。依据同目录 `S4-source.txt`、`S5-source.txt`、`S6-source.txt` 的实时原文及 `S4-questions.txt`、`S5-questions.txt`、`S6-questions.txt` 中的题干、选项、正确标记和完整参考答案。技术疑点查阅 MySQL 官方资料。未启动 MySQL 运行时重现实验。

## 覆盖范围

| 范围 | 总数 | 单选 | 多选 | 填空 | 简答 | 代码 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| S4-1 至 S4-97（事务） | 97 | 69 | 5 | 14 | 8 | 1 |
| S5-1 至 S5-39（锁） | 39 | 26 | 7 | 5 | 1 | 0 |
| S6-1 至 S6-81（日志） | 81 | 49 | 9 | 19 | 4 | 0 |
| 合计 | 217 | 144 | 21 | 38 | 13 | 1 |

以上 217 题均已人工逐题对照所在原文小节，检查题目独立可答性、标答、干扰项、填空空数与顺序、答案范围及原文依据。S4-80 已读取完整 SQL 围栏及后续要点，SQL 与原文一致；本次没有重新执行 SQL。未发现填空空数/有序无序的硬错误，也未发现无原文依据的扩展考点。以下为应关注的发现，不把单纯重复知识点计为内容错误。

主要发现有 5 项，涉及 6 题；次要措辞/限定范围建议有 5 类，涉及另 8 题。其余 203 题未检出需要报告的问题。这里的“未检出”是内容审查结论，不代表所有技术边界都经运行时穷举。

## 主要发现

### 1. S4-62：漏掉自己的修改始终可见的前置例外

- 严重程度：高（题干范围内存在标答不成立的情形）。归属：题库截取原文时丢失前置条件。
- 题干：“某条记录版本的 trx_id 大于等于 max_trx_id，该版本对当前事务是否可见？”标答 D：“不可见，因为它来自创建 Read View 之后才分配事务 ID 的事务”。答案也直接给“不可见”。
- 原文证据（§介绍MVCC实现原理）：“除了自己的更新记录总是可见之外，还有这几种情况”。接下来才讨论 `trx_id >= max_trx_id` 的不可见分支。
- 问题：事务先以只读状态建立快照，再第一次更新获得事务 ID 时，其自己的新版本可能满足 `trx_id >= max_trx_id`，仍然可见。题干没有说明“其他事务产生的版本”，所以不能一律判不可见。官方 `ReadView::changes_visible()` 先判断创建者 ID，之后才比较上界。
- 建议：题干加“该版本由其他事务产生，且不是当前事务自己的修改”；或完整问先检查 `creator_trx_id`、再判边界的算法。无需改变后续其他事务分支的答案。
- 核对来源：[MySQL 8.0 官方 ReadView 可见性源码](https://dev.mysql.com/doc/dev/mysql-server/8.0.46/read0types_8h_source.html)（`changes_visible`，源码行 167–174）；[MySQL 8.4 Consistent Nonlocking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)（同一事务此前语句修改可见）；[官方 MVCC 类说明](https://dev.mysql.com/doc/dev/mysql-server/latest/classMVCC.html)（只读转读写后更新创建者事务 ID）。

### 2. S4-41：单题没有决定结果所需的事务时序

- 严重程度：中。归属：题库上下文截取问题。
- 实际单选题干：“上例中，如果 A 不执行 UPDATE，只是再次执行相同的普通 SELECT，会怎样？”标答 D：“仍然看不到 B 后插入的 id = 5 的记录”。
- 原文证据（§举个例子说可重复读下的幻读问题）：原文先给“可重复读隔离级别”，接着 A `BEGIN` 后查询 `id=5` 得空，B 插入并提交，再讨论 A 的再次查询。
- 问题：题干没有可重复读、A 首次快照看不到记录、B 随后插入提交等必要前提。当前答题卡仅展示本题 stem/options，不显示原文例图或上题答案；在错题本独立抽题时尤其无法补齐。若实际为读提交，第二次普通 SELECT 可以看到 B 已提交的记录。
- 建议：重述“A 在同一个可重复读事务中先普通 SELECT 查询 id=5 得空，随后 B 插入 id=5 并提交；A 没有执行 UPDATE，再相同 SELECT”，再问结果。S4-39/40 虽也有“上例中”，其本题已给核心现象，另列为低严重措辞建议。

### 3. S5-30：死锁结论缺少交错持锁前提

- 严重程度：中。归属：题库省略原文已经给出的锁状态。
- 题干：“事务 A 先更新 id = 1 的账户，接着尝试更新 id = 2；事务 B 在另一个连接中先更新 id = 2 的账户，接着尝试更新 id = 1。会出现什么情况？”标答 A：形成死锁。
- 原文证据（§MySQL 为什么会死锁？怎么处理？）：“A 持有 id = 1 的锁、等待 id = 2；B 持有 id = 2 的锁、等待 id = 1”。
- 问题：每个事务内部的访问顺序不同，仅说明“可能死锁”，不能确定已经形成循环等待。若 A 已拿到 id=1、id=2 的锁后 B 才第一次更新 id=2，就只有 B 等待，选项 C 的行为也可以成立；若 A 在 B 开始前提交，则均可完成。题干没有规定两事务都已拿到第一把锁且尚未提交。
- 建议：明确时间线“A 更新 id=1 后保持未提交；B 成功更新 id=2 后也保持未提交；随后 A 请求 id=2、B 请求 id=1”，再问必然的锁状态；或把题目改成“这种相反访问顺序可能引发什么”。
- 核对来源：[MySQL 8.4 Deadlocks in InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html)（死锁要求各自持锁并等待对方所持锁；单向等待不同于循环等待）。

### 4. S6-15、S6-16：继承原文对 DELETE undo 的实现误述

- 严重程度：中。归属：原文本身不严谨，题库照录，并非转述偏离原文。
- S6-15 的第二空要求删除时记录整条记录“内容”；参考答案：“删除一条记录时，要把这条记录中的内容都记下来”。
- S6-16 的第二空要求回滚删除时“插入”原内容组成的记录。
- 原文证据（§UndoLog日志的作用是什么？）：“删除一条记录时，要把这条记录中的内容都记下来”，并说回滚时“插入到表中”。
- 问题：InnoDB 的普通 DELETE 首先对原记录作 delete-mark，并非立刻物理删除整行；物理移除留给 purge。删除标记 undo 用于恢复此前的删除标记、系统字段等，不要求把全部行内容另复制到 undo 再重新插入。把“逻辑上恢复被删行”当成反向操作比喻可以，但当前填空把它固化成必须记忆的存储机制。
- 建议：按项目“原文自身有误”例外，明确写成“记录撤销删除标记所需的信息，回滚时恢复记录先前状态；物理删除由 purge 完成”，并说明原文把效果简化成整行内容和插入，补官方核对来源。或避免出此实现层面的填空，保留撤销操作的宏观题。
- 核对来源：[MySQL 8.4 InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)（删除是设置标记、purge 才物理移除）；[MySQL 8.0 trx0rec.cc 官方说明](https://dev.mysql.com/doc/dev/mysql-server/8.0.46/trx0rec_8cc.html)（`trx_undo_update_rec_get_update` 的 `TRX_UNDO_DEL_MARK_REC` 分支只往更新向量加事务 ID 和 roll pointer 字段）；[trx0rec.h 类型定义](https://dev.mysql.com/doc/dev/mysql-server/8.0.46/trx0rec_8h.html)。

### 5. S6-5：泛称 MySQL，漏掉事务表与非事务表的区别

- 严重程度：中。归属：原文也漏了适用引擎限定，题库继续泛化。
- 题干泛称“MySQL 完成一条更新操作”，标答和参考答案要求直到事务提交才把缓存写入 binlog 文件。
- 原文证据（§讲一下binlog）：“等之后事务提交的时候，会将该事务执行过程中产生的 binlog 从事务缓存写入 binlog 文件”；同段又明确所有存储引擎都可以使用 binlog。
- 问题：对 InnoDB 等事务表，这个流程是合适的；对非事务表，官方手册说明更新执行后立即记录 binlog。不能从 binlog 由 Server 层实现、所有引擎可用，推出所有引擎都套用 InnoDB 的事务缓存/提交时机。
- 建议：题干明确“开启 binlog 的 InnoDB 事务表更新”，答案同步限定。若保留全引擎提问，则补事务表和非事务表区别，并以原文自身遗漏注明官方核对资料。
- 核对来源：[MySQL 8.4 The Binary Log](https://dev.mysql.com/doc/refman/8.4/en/binary-log.html)（分别说明 nontransactional tables 立即记录、transactional tables 缓存到 COMMIT）。

## 次要措辞和范围建议

这些项目不与上面的主要问题混在一起。它们主要是简化表述、范围限定或指代改善；原文/标答的核心机制基本一致。

### 6. S4-61：可见结论成立，但“已经提交”的解释漏自己的事务

- 严重程度：低。归属：题库截取原文时漏前置自写可见例外。
- 标答 B：“可见，因为它是创建 Read View 前已经提交的事务生成的”。原文讲此分支前已说“除了自己的更新记录总是可见之外”。
- 问题：当前事务已在建立 Read View 前取得 ID，且比其他活跃事务小的情形，自己的 ID 可以小于 min 边界，其未提交自写版本仍可见。可见结果没有错，但“此版本必然已经提交”的解释太绝对。
- 建议：跟 S4-62 一起在题干限定“其他事务产生的版本”，或在解释里保留自己可见例外。
- 核对来源：[官方 ReadView 源码](https://dev.mysql.com/doc/dev/mysql-server/8.0.46/read0types_8h_source.html)、[Consistent Nonlocking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)。

### 7. S4-39、S4-40：“上例中”仍建议去掉

- 严重程度：低。归属：题库措辞。
- 原文依赖前面的完整 t_stu 时序；题干分别问“旧快照看不到 id=5，却能 UPDATE B 已提交记录”和“A 更新之后为什么后续 SELECT 可见”。
- 与 S4-41 不同，这两题自身已经给出足以判断主要机制的现象，不能据“上例中”三个字就判定不可答；但不显示原例图/上题答案时，指代仍显突兀。
- 建议：把“上例中”删掉或补一句同一可重复读事务背景，使独立抽题自然。

### 8. S4-59：“有两个隐藏列”宜限定为 MVCC 关注的两列

- 严重程度：低。归属：题库措辞略比原文更像数量断言。
- 题干：“InnoDB 聚簇索引记录里有两个隐藏列”。原文只是“包含下面两个隐藏列”，列出 trx_id、roll_pointer，没有声称不存在其他系统字段。
- 问题：未显式提供可用主键/唯一索引时，InnoDB 自动聚簇索引还涉及 DB_ROW_ID。当前问法容易读成任何表都总共只有两个隐藏列。
- 建议：写“与 MVCC 直接相关的两个隐藏列分别是……”，保持两空和既有答案。
- 核对来源：[MySQL 8.4 InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)（DB_TRX_ID、DB_ROLL_PTR、DB_ROW_ID）。

### 9. S4-20：串行化加读锁的概括缺少 autocommit 例外

- 严重程度：低。归属：原文前段概括不完整；原文后段及题库 S4-49/51 已给例外。
- S4-20 标答 A：“会对记录加上读写锁，发生读写冲突时，后访问的事务必须等前一个事务执行完成”。
- 原文证据：§事务的隔离级别有哪些？确有这个概括；但§串行化隔离级别是通过什么实现的？又说开启 autocommit、SELECT 自己就是只读事务时，可用非锁定一致性读。
- 建议：在 S4-20 题干加“显式多语句事务中的读写冲突”，避免与 S4-51 的正确答案看起来互相矛盾。
- 核对来源：[MySQL 8.4 Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)（SERIALIZABLE 小节）。

### 10. S6-40、S6-41、S6-49：两阶段提交示意需保留双 1 配置前提

- 严重程度：低。归属：题库把有配置前提的流程拆成独立题后省略前提。
- S6-40 正确项和答案均说 prepare 阶段“再把 redo log 持久化到磁盘”；答案括号注明 innodb_flush_log_at_trx_commit=1，但题干/正确项没有配置。
- S6-41 填空题干说把 XID 写 binlog“并持久化到磁盘”；答案括号注明 sync_binlog=1，但题干省略。
- S6-49 题干虽说“按配置持久化 redo”，却继续无条件要求“再写入并持久化 binlog”，没有原流程的双 1 前提。
- 原文证据：§binlog 两阶段提交过程是怎么样的？分别注明两个参数=1的作用；§update语句的具体执行过程是怎样的？开头明确假设 InnoDB、开启 binlog、两个参数都=1、先不展开组提交。
- 问题：提交过程中是否同步持久化由配置决定，不能把默认/示例配置变成两阶段提交机制对所有配置的定义。这不是标答与其引用原文直接相反，更适合列范围完善建议。
- 建议：三题题干统一加“假设 InnoDB、开启 binlog、innodb_flush_log_at_trx_commit=1、sync_binlog=1，不展开组提交”。
- 核对来源：[MySQL 8.4 innodb_flush_log_at_trx_commit](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit)、[MySQL 8.4 sync_binlog](https://dev.mysql.com/doc/refman/8.4/en/replication-options-binary-log.html#sysvar_sync_binlog)。

## 未作为问题计入的观察

- S4-38 的参考答案沿用原文把“先快照 SELECT、再当前读 UPDATE 自己修改后可见”称为幻读；原文同时已解释是两种读语义以及自写可见，而非 Read View 自动更新。这里保留原文的术语口径，没有把标准定义之争另计为题库错误。
- S5-18 使用“通常”说明分离主键范围更新并发，S5-19/20 及答案又保留实际索引边界、间隙锁共存、额外索引约束冲突的限制；没有把“不同 WHERE 范围一定不阻塞”当正确项。
- S6-30 在加法形式枚举 WAL/崩溃恢复时用无序填空，两项顺序不影响列举含义，不判为顺序错误。
- S4-80 SQL 及失败/影响行数要求完整，答案未漏题干所问“如何判断成功”。
