# MySQL S3 索引章只读审查

审查日期：2026-10-14。覆盖 S3-1～S3-205 全部 205 题：单选 146、填空 30、多选 23、简答 6。逐题核对题卷、题型 JSON、参考答案及抓取的所在原文小节；对技术争议核对 MySQL 官方资料。没有修改题库、题型、答案、业务代码，也没有执行 Git 发布操作。

输入：`S3-source.txt`、`S3-questions.txt`，并回查 `content/typed/mysql.json`、`interview-practice/mysql.md`、`interview-practice/answers-xiaolin/mysql.md`。题目实际显示仅含题干和选项，不显示原文例图或前题答案，因此按独立可答性审查。

确定的主要内容问题 3 项涉及 3 题；次要歧义/上下文问题 4 项涉及 8 题。另有 2 题转述了原文自身不精确的说法，单列说明，不计为题库不符合原文。未发现明确的 correct 标记与参考答案相反、填空空数/顺序错误；剩余题目未发现可确定的新增问题。

## 主要问题

### 1. S3-87：缺少页目录示例数据，无法推导参考答案中的槽与主键

- 严重性：中。类别：题干条件缺失、参考答案依赖未展示的图。
- 题干只给出 5 个槽及编号 0～4，要求查找主键 11；未给槽指向的最大主键，也未给页内记录链。参考答案却要求先比较槽 2 的主键 8，再比较槽 3 的主键 12，最后沿 9、10、11 遍历。槽数相同的其他页面可能把 11 放在完全不同的组，不能仅凭编号推出该路径。
- 原文短证据（转述）：[查询数据时，到了 B+ 树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)明确结合页目录图举例，图后给出槽 2→8、槽 3→12。
- 建议：把原图或等价槽表、记录链加入题干；或改为只问通用的“二分页目录、再沿页内链表查找”步骤，不要求复现具体槽号和主键值。

### 2. S3-77：未展示示例 B+ 树，参考答案却绑定具体节点

- 严重性：中。类别：题干条件缺失、参考答案范围过窄。
- 题干仅给 `select * from product where id=5`，没有树高、节点键值或示意图。参考答案固定为根 `(1,10,20)`→第二层 `(1,4,7)`→叶页 `(4,5,6)`。SQL 本身无法决定树的具体布局。说明按分隔键逐层定位并在叶页内查找的答案也是正确的，不能要求考生凭空复原这三组值。
- 原文短证据（转述）：[Mysql 中的索引是怎么实现的？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)先展示主键索引图，再按该图解释 id=5 的路径。
- 建议：题干提供示例节点或原图；或改问一般查找过程，并把参考答案改为一般机制，具体节点仅作为可选示例。

### 3. S3-153：删掉原文 SELECT *，导致是否回表的前提缺失

- 严重性：中。类别：题干省略关键 SQL、答案不再适用于全部允许情况。
- 题干仅给 `(name,age)` 索引和 `WHERE name LIKE '张%' AND age=20`，参考答案认定关闭 ICP 后候选行全部回表，开启后通过 age 过滤再回表。题干未指定返回列，若查询为 `SELECT name,age`，普通非锁定覆盖查询即可直接在索引过滤和取值，通常不需要这样的回表对比。
- 原文短证据：该小节的完整示例是 `SELECT * FROM users WHERE name LIKE '张%' AND age=20`；[原文小节](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)。
- 官方核对：[Index Condition Pushdown Optimization](https://dev.mysql.com/doc/refman/8.0/en/index-condition-pushdown-optimization.html)将 ICP 的适用条件限定为需要读取完整表记录；[EXPLAIN Output Format](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)解释覆盖索引可只扫描索引树。
- 建议：恢复完整 SQL，注明 users 还有索引外字段、查询需要回表，并假定优化器使用该二级索引；或在答案中分别解释覆盖和非覆盖情形。

## 次要问题

### 4. S3-133、S3-134、S3-135、S3-140、S3-141：独立题干缺少所指的联合索引/查询

- 严重性：低。类别：选择题上下文缺失。
- S3-133/134/140/141 使用“上述查询”，当前题干没有该查询；S3-135 仅给 C 不能连续前缀定位，未交代 C 已存在于索引中。选项可以提示考生预期考点，但正确项实际上依赖未提供的 `(A,B,C)`/`(a,b,c)` 索引和 SQL；题目被独立展示时，无法确定 C/c 为什么能在二级索引里过滤。
- 原文短证据（转述）：两个原文小节分别先设 `(A,B,C)` 与 `A=XXX AND C<XXX`，以及 `(a,b,c)` 与 `a=2 AND c=1`，然后解释后续列过滤。[第一小节](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95abc-%E7%8E%B0%E5%9C%A8%E6%9C%89%E4%B8%AA%E6%89%A7%E8%A1%8C%E8%AF%AD%E5%8F%A5%E6%98%AFa-xxx-and-c-xxx-%E7%B4%A2%E5%BC%95%E6%80%8E%E4%B9%88%E8%B5%B0)，[第二小节](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-where%E6%9D%A1%E4%BB%B6%E6%98%AF-a-2-and-c-1-%E8%83%BD%E7%94%A8%E5%88%B0%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E5%90%97)。
- 官方核对：[ICP 官方文档](https://dev.mysql.com/doc/refman/8.0/en/index-condition-pushdown-optimization.html)要求被下推的条件能仅由索引列计算；缺少索引定义，不能确认这个前提。
- 建议：每题开头补全索引与 WHERE，并注明是否覆盖/是否需要回表。S3-135 可直接写“(A,B,C) 中已保存 C，A=… AND C<… 缺少 B”。

### 5. S3-26：宽泛的“匹配联合索引”与参考答案限定的常规前缀定位不一致

- 严重性：低。类别：多选题范围歧义。
- ACE 是常规最左前缀定位的预期答案；但题干只问哪些条件“可以匹配上这个联合索引”，没有排除索引全扫描或跳跃扫描。B/D/F 被标为错误，在宽泛的“索引可能被用到”理解下并非确定错误。S3-118 对同一组条件明确限定“常规的前缀定位”，可直接参照。
- 原文短证据（转述）：[索引分类小节](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)在缺少 a 的例子后立即说明索引仍可能被扫描或采用跳跃扫描。
- 官方核对：[Range Optimization 的 Skip Scan 部分](https://dev.mysql.com/doc/refman/8.0/en/range-optimization.html#range-access-skip-scan)允许满足条件时跳过前导索引列；[EXPLAIN 官方文档](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)也说明覆盖查询可全索引扫描。
- 建议：题干改为“按常规最左前缀定位、不考虑索引全扫描与跳跃扫描时，哪些条件可以……”。不必改动 ACE。

### 6. S3-58：D 把低收益场景设为“仍可能有效”问题的确定错误项

- 严重性：低。类别：干扰项不具确定错误性。
- 题干问哪些场景索引“仍可能有效”，D 是男女各半且 `SELECT *`。原文说这时可能不如全表扫描、优化器可能放弃，并未说索引绝对无效。实际成本也不只取决于这两个条件。题干还没有表结构：若表只有主键 id 和 sex，sex 二级索引已包含全部返回列，`SELECT *` 也可能覆盖。因此 ABC 可成立，但 D 不宜被设计成否定任何有效可能性的错误项。
- 原文短证据（转述）：[性别字段能加索引么？为啥？](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E5%88%AB%E5%AD%97%E6%AE%B5%E8%83%BD%E5%8A%A0%E7%B4%A2%E5%BC%95%E4%B9%88-%E4%B8%BA%E5%95%A5)对男女各半的示例使用可能性判断，没有给出绝对禁用结论。
- 官方核对：[Optimizer Cost Model](https://dev.mysql.com/doc/refman/8.0/en/cost-model.html)区分磁盘读块与内存读块等成本，说明计划可能随成本因素改变；[Avoiding Full Table Scans](https://dev.mysql.com/doc/refman/8.0/en/table-scan-avoidance.html)把扫描选择解释为成本判断；[ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.0/en/order-by-optimization.html)也明确区分 SELECT * 仅返回索引列与返回索引外列的情况。
- 建议：题干改为“原文列为索引较有价值的例外场景有哪些”，或把 D 改成“男女各半且 SELECT * 时，单列索引一定有明显收益”。

### 7. S3-178：两个具体联合索引被当作开放场景的固定填空答案

- 严重性：低。类别：填空答案范围未限定。
- 题干只说经常查询某用户订单/按状态取最近订单，没有完整过滤条件和排序字段定义；仅此并不能唯一推导 `(user_id,status)` 和 `(status,created_at)`。尤其第一空，单独 `(user_id)` 也能服务按用户查订单。参考答案是在复述原文的两个举例方案，题干却未说明要求复述原文示例。
- 原文短证据（转述）：[status 值为 0 或 1 是否适合建索引](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AE%B5%E6%98%AFstatus%E5%80%BC%E4%B8%BA0%E6%88%96%E8%80%851-%E9%80%82%E5%90%88%E5%BB%BA%E7%B4%A2%E5%BC%95%E5%90%97)给出可考虑的联合索引示例，没有宣称方案唯一。
- 官方核对：[Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html)说明联合索引左前缀可以服务相应查询；最佳索引仍取决于具体查询。
- 建议：改为“原文针对这两类查询分别举了哪两个联合索引示例”，保持有序两空；或改为简答并允许有理由的其他索引方案。

## 原文自身不精确；不能当作题库转述错误

### 8. S3-95：原文把子节点数量下限写成适用于每个节点

- 严重性：中。类别：原文自身遗漏适用范围，题库忠实转述。
- 题干和答案都写每个节点（除根）至少 `ceil(M/2)` 个子节点。叶节点没有子节点，该约束应针对非根内部节点。叶节点的占用约束应以键/记录数量另行讨论，且不应把抽象 B+ 树的规则直接当成 InnoDB 页的固定运行规格。
- 原文短证据（转述）：[B+ 树的特性](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)在自平衡条目同样写成每个节点的子节点范围。
- 官方核对：[InnoDB PAGE_LEVEL 官方源码文档](https://dev.mysql.com/doc/dev/mysql-server/8.4.11/page0types_8h_source.html)把叶层定义为 level 0；[InnoDB 索引物理结构](https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html)区分叶页中的索引记录，且以页空间填充率描述 InnoDB 的实际结构。由叶节点定义可直接判定其子节点数量为 0。
- 建议：题干改为“抽象的 M 阶 B+ 树中，非根内部节点……”，答案注明原文遗漏“内部节点”，按项目要求补官方核对链接。

### 9. S3-7：原文的“5.5 之后”版本边界不精确

- 严重性：低。类别：原文措辞不精确，非题库新造错误。
- 题干空为 5.5，与原文一致；准确说法是从 MySQL 5.5.5 起默认引擎改为 InnoDB，不能把“5.5 之后”理解为 5.5 系列还未默认。
- 原文短证据：索引分类小节的版本写法为“5.5 之后”。
- 官方核对：[MySQL 5.5 官方手册 15.1 Setting the Storage Engine](https://downloads.mysql.com/docs/refman-5.5-en.a4.pdf)说明默认 InnoDB 的起点为 5.5.5；[官方 Worklog WL#5349](https://dev.mysql.com/worklog/task/?id=5349)说明 5.5 系列变更。
- 建议：若保留版本题，改为“自 MySQL ____ 起”并接受/以 5.5.5 为准确参考；修订答案时说明原文写法。

## 未计为确定问题的边界

- S3-78 虽含“上述”，但题干已经明确三层树及缓存条件，可以独立计算三页，未按缺图问题计入。
- S3-14、S3-39、S3-159、S3-162 等对回表/覆盖的概括较简化；原文同样如此。S3-166 已单独考查锁定读、MVCC 可能访问聚簇记录的例外，不把这些概括一律判为题库转述错。官方例外见 [InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)。
- S3-6 的索引分类沿用原文列举，不以没有穷举 SPATIAL/R-tree 等其他类型判为漏答；S3-114 的三层千万级明确为原文经验可能值，不按现行固定规格评判。

