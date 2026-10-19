# MySQL 面试题 原文章节摘编

仅依据各题所列的小林coding原文小节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分不出题，不使用其他网站补充。整理日期：2026-10-14。

## 1. SQL基础

原文：[MySQL面试题 · SQL基础](https://xiaolincoding.com/interview/mysql.html#sql%E5%9F%BA%E7%A1%80)。

### NOSQL和SQL的区别？

- **S1-1** 关系型数据库（SQL 数据库）存储结构化数据，主要代表有 SQL Server、Oracle、MySQL（开源）、PostgreSQL（开源）。这些数据逻辑上以行列二维表的形式存在，每一列代表数据的一种属性，每一行代表一个数据实体。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-2** NoSQL 指非关系型数据库，主要代表有 MongoDB、Redis。NoSQL 数据库逻辑上提供了不同于二维表的存储方式，存储方式可以是 JSON 文档、哈希表或者其他方式。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-3** ACID 依次是原子性、一致性、隔离性和持久性。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-4** BASE 依次是基本可用、软状态和最终一致性。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-5** 不能简单认为 SQL 就一定支持完整事务、NoSQL 就一定不支持事务。比如 MySQL 的事务能力和存储引擎有关，MongoDB 也支持多文档事务，具体还是要看数据库的实现和配置。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-6** 要从应用场景判断 ACID 是否必须。银行应用就必须保证 ACID，否则一笔钱可能被使用两次；社交软件不必保证 ACID，因为一条状态的更新对所有用户读取先后时间有数秒不同并不影响使用。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-7** 对于需要事务和复杂关联查询的应用，通常优先考虑关系型数据库；对于缓存、文档存储等场景，可以考虑对应的 NoSQL 数据库。一个系统也可以同时使用两者，比如 MySQL 存业务数据，Redis 缓存热点数据。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-8** 很多 NoSQL 数据库围绕特定的数据模型设计，较少依赖跨节点 JOIN，因此更容易按键分片。比如 Redis 支持主从复制、哨兵和 Cluster，但扩展时仍然需要考虑热点数据、跨分片操作和一致性等问题。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S1-9** 关系型数据库的数据之间存在关联性，水平扩展较难，需要解决跨服务器 JOIN、分布式事务等问题。[原文§NOSQL和SQL的区别？](https://xiaolincoding.com/interview/mysql.html#nosql%E5%92%8Csql%E7%9A%84%E5%8C%BA%E5%88%AB)

### 数据库三大范式是什么？

- **S1-10** 第一范式（1NF）要求数据库表的每一列都是不可分割的原子数据项。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-11** “家庭信息”和“学校信息”两列都不满足原子性的要求，故不满足第一范式；调整之后每一列都是不可再分的，就满足第一范式（1NF）了。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-12** 第二范式（2NF）在 1NF 的基础上，要求非码属性必须完全依赖于候选码，也就是在 1NF 基础上消除非主属性对主码的部分函数依赖。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-13** 第二范式需要确保数据库表中的每一列都和主键相关，而不能只与主键的某一部分相关，这主要针对联合主键而言。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-14** 同一个订单中可能包含不同的产品，所以主键必须由“订单号”和“产品号”联合组成。产品数量、产品折扣、产品价格与订单号和产品号都相关，但订单金额和订单时间仅与订单号相关，与产品号无关，这就不满足第二范式的要求，需要拆分成两个表：一个表保存订单号、产品号、产品数量、产品折扣、产品价格，仍以订单号和产品号为联合主键；另一个表保存订单号、订单金额、订单时间，以订单号为主键。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-15** 第三范式（3NF）在 2NF 基础上，要求任何非主属性不依赖于其它非主属性，也就是在 2NF 基础上消除传递依赖；需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-16** 示例表中所有属性都完全依赖于学号，所以满足第二范式；但“班主任性别”和“班主任年龄”直接依赖的是“班主任姓名”，而不是主键“学号”，不满足第三范式，需要拆表调整，调整之后就满足第三范式的要求了。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)
- **S1-17** 第二范式是在 1NF 基础上消除非主属性对主码的部分函数依赖；第三范式是在 2NF 基础上消除传递依赖。[原文§数据库三大范式是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%89%E5%A4%A7%E8%8C%83%E5%BC%8F%E6%98%AF%E4%BB%80%E4%B9%88)

### MySQL 怎么连表查询？

- **S1-18** 内连接（INNER JOIN）、左外连接（LEFT JOIN）、右外连接（RIGHT JOIN）和全外连接（FULL JOIN）。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S1-19** 内连接返回两个表中有匹配关系的行。例如用 INNER JOIN 按 employees.department_id = departments.id 关联，返回每个员工及其所在的部门名称。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S1-20** 左外连接返回左表中的所有行，即使在右表中没有匹配的行，未匹配的右表列会包含 NULL。例如 employees LEFT JOIN departments 返回所有员工及其部门名称，包括那些没有分配部门的员工。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S1-21** 右外连接返回右表中的所有行，即使左表中没有匹配的行，未匹配的左表列会包含 NULL。例如 employees RIGHT JOIN departments 返回所有部门及其员工，包括那些没有分配员工的部门。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S1-22** 全外连接返回两个表中所有行，包括非匹配行。在 MySQL 中，FULL JOIN 需要使用 UNION 来实现，因为 MySQL 不直接支持 FULL JOIN。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S1-23** 第一部分是员工表 LEFT JOIN 部门表，返回所有员工及其匹配的部门；第二部分是员工表 RIGHT JOIN 部门表并加上 WHERE employees.id IS NULL，只取右表没有匹配到员工的行，再用 UNION ALL 合并。这样既不会重复返回已经匹配的行，也不会把姓名相同的不同员工误当成重复结果去掉。[原文§MySQL 怎么连表查询？](https://xiaolincoding.com/interview/mysql.html#mysql-%E6%80%8E%E4%B9%88%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)

### MySQL如何避免重复插入数据？

- **S1-24** 原文给出三种方式：一是在相关列上使用 UNIQUE 约束，保证每个值在该列中唯一；二是使用 INSERT ... ON DUPLICATE KEY UPDATE，在插入记录与现有记录冲突时处理重复键；三是使用 INSERT IGNORE，忽略因重复键而导致的插入错误。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-25** 在表的相关列上添加 UNIQUE 约束，可以确保每个值在该列中唯一。如果尝试插入重复的 email，MySQL 会返回错误。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-26** INSERT ... ON DUPLICATE KEY UPDATE 允许在插入记录时处理重复键的情况：如果插入的记录与现有记录冲突，可以选择更新现有记录。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-27** 原文示例用的是 MySQL 8.0.19 及之后支持的新行别名写法。较早版本可以写 name = VALUES(name)，不过这种写法从 MySQL 8.0.20 开始被弃用。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-28** INSERT IGNORE 在插入记录时会忽略因重复键而导致的插入错误，如果 email 已经存在，这条插入语句就会被忽略。不过，IGNORE 还可能把部分数据转换错误降为警告，不能把它理解成只忽略重复键错误，使用时要注意检查警告。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-29** 如果需要保证表内某个业务键唯一，先建立 UNIQUE 约束，联合唯一索引可以保证多个字段的组合不重复；如果需要插入和更新结合，可以使用 ON DUPLICATE KEY UPDATE；对于允许忽略重复插入的场景，可以使用 INSERT IGNORE，同时注意检查警告。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-30** 防重复的关键还是唯一约束，ON DUPLICATE KEY UPDATE 和 INSERT IGNORE 都是建立在主键或唯一索引冲突的基础上处理数据。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-31** 并发时两个请求都可能查到记录不存在，然后各自执行 INSERT，结果还是会重复插入，所以防重复的关键还是唯一约束。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)
- **S1-32** 唯一索引允许多个 NULL，如果业务要求该字段一定唯一，通常还要加上 NOT NULL。[原文§MySQL如何避免重复插入数据？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E5%A4%8D%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE)

### CHAR 和 VARCHAR有什么区别？

- **S1-33** CHAR 是定长字符串，比如 CHAR(10)，不足的部分会在存储时补空格，读取时通常会去掉末尾的填充空格，适合长度比较固定的数据。[原文§CHAR 和 VARCHAR有什么区别？](https://xiaolincoding.com/interview/mysql.html#char-%E5%92%8C-varchar%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-34** VARCHAR 是变长字符串，比如 VARCHAR(100)，100 表示最多保存 100 个字符，实际占用空间取决于内容的字节数，还需要 1 或 2 个字节记录长度，适合姓名、地址等长度不固定的数据。[原文§CHAR 和 VARCHAR有什么区别？](https://xiaolincoding.com/interview/mysql.html#char-%E5%92%8C-varchar%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-35** 这里的长度是字符数，不是字节数。尤其使用多字节字符集时，不能简单认为 CHAR(10) 就只占 10 个字节。[原文§CHAR 和 VARCHAR有什么区别？](https://xiaolincoding.com/interview/mysql.html#char-%E5%92%8C-varchar%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-36** 选择哪一种主要看数据特点：长度比较固定的数据适合 CHAR，姓名、地址等长度不固定的数据适合 VARCHAR，也不能直接认为 CHAR 一定比 VARCHAR 快。[原文§CHAR 和 VARCHAR有什么区别？](https://xiaolincoding.com/interview/mysql.html#char-%E5%92%8C-varchar%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### VARCHAR 后面代表字节还是字符？

- **S1-37** VARCHAR 后面括号里的数字代表的是字符数，而不是字节数。比如 VARCHAR(10)，表示该字段最多可以存储 10 个字符，字符的字节长度取决于所使用的字符集。[原文§VARCHAR 后面代表字节还是字符？](https://xiaolincoding.com/interview/mysql.html#varchar-%E5%90%8E%E9%9D%A2%E4%BB%A3%E8%A1%A8%E5%AD%97%E8%8A%82%E8%BF%98%E6%98%AF%E5%AD%97%E7%AC%A6)
- **S1-38** ASCII 字符集每个字符占用 1 个字节，所以 VARCHAR(10) 最多存储 10 个 ASCII 字符、占用最多 10 个字节（不考虑额外的长度记录开销）；utf8mb4 每个字符最多占用 4 个字节；MySQL 的 utf8mb3 每个字符最多占 3 个字节，不能和 utf8mb4 混为一谈。[原文§VARCHAR 后面代表字节还是字符？](https://xiaolincoding.com/interview/mysql.html#varchar-%E5%90%8E%E9%9D%A2%E4%BB%A3%E8%A1%A8%E5%AD%97%E8%8A%82%E8%BF%98%E6%98%AF%E5%AD%97%E7%AC%A6)
- **S1-39** 字符集是 utf8mb4 时，每个字符最多占用 4 个字节，VARCHAR(10) 最多可以存储 10 个字符，内容最多占 40 个字节，另外还需要长度记录开销。[原文§VARCHAR 后面代表字节还是字符？](https://xiaolincoding.com/interview/mysql.html#varchar-%E5%90%8E%E9%9D%A2%E4%BB%A3%E8%A1%A8%E5%AD%97%E8%8A%82%E8%BF%98%E6%98%AF%E5%AD%97%E7%AC%A6)
- **S1-40** VARCHAR 的最大可声明长度还受到字符集和整行 65,535 字节上限等限制，并不是可以随意把括号里的数字设得很大。[原文§VARCHAR 后面代表字节还是字符？](https://xiaolincoding.com/interview/mysql.html#varchar-%E5%90%8E%E9%9D%A2%E4%BB%A3%E8%A1%A8%E5%AD%97%E8%8A%82%E8%BF%98%E6%98%AF%E5%AD%97%E7%AC%A6)

### int(1) int(10) 在mysql有什么不同？

- **S1-41** INT(1) 和 INT(10) 的区别主要在于显示宽度，而不是存储范围或数据类型本身的大小。括号内的数值（如 1 或 10）是显示宽度，用于在特定场景下控制数值的展示格式。[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
- **S1-42** INT 的存储固定为 4 字节，所有 INT（无论写成 INT(1) 还是 INT(10)）占用的存储空间均为 4 字节。[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
- **S1-43** 设置 ZEROFILL 时，数字显示会用前导零填充至指定宽度。（原文说这是显示宽度“唯一的作用场景”；实际上显示宽度还会随结果集元数据返回，客户端可以自行用它补空格显示。另外从 MySQL 8.0.17 起，整数显示宽度和 ZEROFILL 都已弃用。）[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)[核对来源：MySQL 8.0 Numeric Data Type Attributes](https://dev.mysql.com/doc/refman/8.0/en/numeric-type-attributes.html)
- **S1-44** 字段类型为 INT(4) ZEROFILL 时，实际存入 5 显示为 0005，实际存入 12345 显示仍为 12345，宽度超限时不截断。[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
- **S1-45** num1 字段是 INT(1) ZEROFILL，显示宽度为 1，插入数据 1 时显示为 1；num2 字段是 INT(10) ZEROFILL，显示宽度为 10，插入数据 1 时会在前面填充零，显示为 0000000001。[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
- **S1-46** 整数显示宽度和 ZEROFILL 从 MySQL 8.0.17 开始被弃用，新表直接用 INT 就好，需要补零展示可以交给应用处理。[原文§int(1) int(10) 在mysql有什么不同？](https://xiaolincoding.com/interview/mysql.html#int-1-int-10-%E5%9C%A8mysql%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)

### Text数据类型可以无限大吗？

- **S1-47** 不能。MySQL 有 4 种 TEXT 类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT，最大长度按字节计算。[原文§Text数据类型可以无限大吗？](https://xiaolincoding.com/interview/mysql.html#text%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E5%A4%A7%E5%90%97)
- **S1-48** TINYTEXT 最大 255 字节；TEXT 最大 65,535 字节，约 64 KB；MEDIUMTEXT 最大 16,777,215 字节，约 16 MB；LONGTEXT 最大 4,294,967,295 字节，约 4 GB。[原文§Text数据类型可以无限大吗？](https://xiaolincoding.com/interview/mysql.html#text%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E5%A4%A7%E5%90%97)
- **S1-49** 这里限制的是字节数，所以使用 utf8mb4 存储中文或表情时，能放下的字符数会少于这个数字。[原文§Text数据类型可以无限大吗？](https://xiaolincoding.com/interview/mysql.html#text%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E5%A4%A7%E5%90%97)
- **S1-50** TEXT 实际读写还会受到 max_allowed_packet、内存和传输成本等限制，大文件通常更适合放到对象存储，数据库里保存文件地址。[原文§Text数据类型可以无限大吗？](https://xiaolincoding.com/interview/mysql.html#text%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E5%A4%A7%E5%90%97)

### 金额为什么建议用 DECIMAL，而不是 FLOAT 或 DOUBLE？

- **S1-51** 因为 DECIMAL 保存的是精确的十进制数，而 FLOAT 和 DOUBLE 保存的是近似值。金额计算如果存在精度误差，就可能出现对账不一致的问题。[原文§金额为什么建议用 DECIMAL，而不是 FLOAT 或 DOUBLE？](https://xiaolincoding.com/interview/mysql.html#%E9%87%91%E9%A2%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E8%AE%AE%E7%94%A8-decimal-%E8%80%8C%E4%B8%8D%E6%98%AF-float-%E6%88%96-double)
- **S1-52** DECIMAL(10, 2) 中，10 表示总位数，2 表示小数位数，也就是整数部分最多 8 位，小数部分最多 2 位。[原文§金额为什么建议用 DECIMAL，而不是 FLOAT 或 DOUBLE？](https://xiaolincoding.com/interview/mysql.html#%E9%87%91%E9%A2%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E8%AE%AE%E7%94%A8-decimal-%E8%80%8C%E4%B8%8D%E6%98%AF-float-%E6%88%96-double)
- **S1-53** 也可以用整数保存最小货币单位，比如用 BIGINT 保存「分」，100 元保存为 10000。[原文§金额为什么建议用 DECIMAL，而不是 FLOAT 或 DOUBLE？](https://xiaolincoding.com/interview/mysql.html#%E9%87%91%E9%A2%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E8%AE%AE%E7%94%A8-decimal-%E8%80%8C%E4%B8%8D%E6%98%AF-float-%E6%88%96-double)
- **S1-54** 无论采用哪一种方式，应用里的金额计算也要使用对应的精确类型，并明确舍入规则，不能在应用中先用浮点数算错了，再存到 DECIMAL 里。[原文§金额为什么建议用 DECIMAL，而不是 FLOAT 或 DOUBLE？](https://xiaolincoding.com/interview/mysql.html#%E9%87%91%E9%A2%9D%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E8%AE%AE%E7%94%A8-decimal-%E8%80%8C%E4%B8%8D%E6%98%AF-float-%E6%88%96-double)

### IP地址如何在数据库里存储？

- **S1-55** IPv4 地址是一个 32 位的二进制数，通常以点分十进制表示法呈现，例如 192.168.1.1；转换为 32 位无符号整数存储时，常用的数据类型是 INT UNSIGNED。[原文§IP地址如何在数据库里存储？](https://xiaolincoding.com/interview/mysql.html#ip%E5%9C%B0%E5%9D%80%E5%A6%82%E4%BD%95%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E5%AD%98%E5%82%A8)
- **S1-56** 优点：直观易懂，方便直接进行数据的插入、查询和显示，不需要进行额外的转换操作。缺点：占用存储空间较大，字符串比较操作的性能相对较低，不利于进行范围查询。[原文§IP地址如何在数据库里存储？](https://xiaolincoding.com/interview/mysql.html#ip%E5%9C%B0%E5%9D%80%E5%A6%82%E4%BD%95%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E5%AD%98%E5%82%A8)
- **S1-57** 写入时用 INET_ATON('192.168.1.1') 把 IP 转换成整数，查询时用 INET_NTOA(ip_address) 把整数转换回 IP 地址。[原文§IP地址如何在数据库里存储？](https://xiaolincoding.com/interview/mysql.html#ip%E5%9C%B0%E5%9D%80%E5%A6%82%E4%BD%95%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E5%AD%98%E5%82%A8)
- **S1-58** 优点：占用存储空间小，整数比较操作的性能较高，便于进行范围查询。缺点：需要进行额外的转换操作，不够直观，增加了开发的复杂度。[原文§IP地址如何在数据库里存储？](https://xiaolincoding.com/interview/mysql.html#ip%E5%9C%B0%E5%9D%80%E5%A6%82%E4%BD%95%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E5%AD%98%E5%82%A8)
- **S1-59** 如果还要支持 IPv6，就不能只用 INT UNSIGNED 了，可以用 VARBINARY(16) 保存二进制地址，写入时用 INET6_ATON()，读取时用 INET6_NTOA()。这两个函数也能处理 IPv4 地址。[原文§IP地址如何在数据库里存储？](https://xiaolincoding.com/interview/mysql.html#ip%E5%9C%B0%E5%9D%80%E5%A6%82%E4%BD%95%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E5%AD%98%E5%82%A8)

### 说一下外键约束

- **S1-60** 外键约束的作用是维护表与表之间的引用关系，避免出现“子表引用的父表记录不存在”的情况。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
- **S1-61** 学生与课程是多对多关系，需要用选课表来关联，不能只在学生表里放一个 course_id。示例中的 student_courses 表以 (student_id, course_id) 为联合主键，并分别用外键引用 students(id) 和 courses(id)。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
- **S1-62** 有了外键约束，给一个不存在的学生添加选课记录，或者选择不存在的课程，数据库都会拒绝。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
- **S1-63** 删除父表记录时可以指定处理方式：RESTRICT、CASCADE 和 SET NULL。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
- **S1-64** RESTRICT：如果还有子表记录引用，就拒绝删除，InnoDB 的 NO ACTION 也是这种效果；CASCADE：删除父表记录时，把关联的子表记录一起删除；SET NULL：把子表的外键字段设置为 NULL，前提是该字段允许为空。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
- **S1-65** 外键可以把引用完整性检查交给数据库，不过也会增加检查和加锁开销。实际是否使用，要结合写入压力、分库分表需求来判断；如果不用外键，就需要应用自己维护这些关系。[原文§说一下外键约束](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)

### MySQL的关键字 IN 和 EXISTS

- **S1-66** IN 用于检查左边的表达式是否存在于右边的列表或子查询的结果集中。如果存在，则 IN 返回 TRUE；没有找到匹配值时返回 FALSE，但如果集合中包含 NULL，结果是 UNKNOWN，在 WHERE 中不会被保留（使用 NOT IN 时尤其容易踩坑）。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-67** EXISTS 用于判断子查询是否至少能返回一行数据，它不关心子查询返回什么数据，只关心是否有结果。如果子查询有结果，则 EXISTS 返回 TRUE，否则返回 FALSE。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-68** IN 比较值是否属于一个集合，EXISTS 判断子查询有没有返回行。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-69** EXISTS (SELECT NULL) 也为 TRUE，因为它确实返回了一行，EXISTS 只关心有没有结果，不关心返回的内容。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-70** 不能简单背「大表用 EXISTS、小表用 IN」。MySQL 优化器可能把它们转成半连接或者对子查询结果做物化，具体性能取决于索引、数据分布和执行计划。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-71** IN 在没有找到匹配值、但集合中包含 NULL 时，结果是 UNKNOWN，在 WHERE 中不会被保留。尤其使用 NOT IN 时，这一点很容易踩坑。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-72** 结果是 NULL，而不是 TRUE。集合中包含 NULL 时，没有找到匹配值的结果是 UNKNOWN，使用 NOT IN 时这一点很容易踩坑。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)
- **S1-73** 通常可以用相关子查询的 NOT EXISTS：SELECT c.* FROM Customers c WHERE NOT EXISTS (SELECT 1 FROM Orders o WHERE o.CustomerID = c.CustomerID)。这样，Orders 中有 CustomerID 为 NULL 的行，也不会把所有客户都排除掉。[原文§MySQL的关键字 IN 和 EXISTS](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97-in-%E5%92%8C-exists)

### mysql中的一些基本函数，你知道哪些？

- **S1-74** 原文把基本函数分成字符串函数、数值函数、日期和时间函数、聚合函数四类。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-75** CONCAT(str1, str2, ...)：连接多个字符串，返回合并后的字符串；SUBSTRING(str, pos, len)：从指定位置开始，截取指定长度的子字符串；REPLACE(str, from_str, to_str)：将字符串中的某部分替换为另一个字符串。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-76** LENGTH(str) 返回字符串的字节数；如果要统计字符数，使用 CHAR_LENGTH(str)。例如对 '小林' 调用，LENGTH 返回字节数，CHAR_LENGTH 返回字符数。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-77** ABS(num) 返回数字的绝对值；POWER(num, exponent) 返回指定数字的指定幂次方。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-78** NOW() 返回当前日期和时间；CURDATE() 返回当前日期。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-79** COUNT(column) 计算指定列中的非 NULL 值的个数；COUNT(*) 统计结果集中的行数，包括列值为 NULL 的行。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)
- **S1-80** SUM(column) 计算指定列的总和；AVG(column) 计算指定列的平均值；MAX(column) 返回指定列的最大值；MIN(column) 返回指定列的最小值。[原文§mysql中的一些基本函数，你知道哪些？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0-%E4%BD%A0%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B)

### COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？

- **S1-81** COUNT(*)：统计行数，不管某一列是不是 NULL。COUNT(1)：对每一行统计常量 1，1 不为 NULL，所以统计结果和 COUNT(*) 一样。COUNT(字段)：只统计该字段不为 NULL 的行，如果字段定义为 NOT NULL，结果才和 COUNT(*) 相同。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-82** COUNT(字段) 只统计该字段不为 NULL 的行，而 COUNT(*) 统计结果集中的所有行，包括该列为 NULL 的行，所以该字段有 NULL 值时二者会不同；字段定义为 NOT NULL 时，字段不可能有 NULL，结果就一定和 COUNT(*) 相同。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-83** 对于 InnoDB，不能直接读取一个固定的总行数返回，因为不同事务的可见数据可能不同。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-84** 没有 WHERE 条件时，MySQL 通常会选择较小的二级索引扫描；没有合适的二级索引，再扫描聚簇索引。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-85** 不需要为了性能把 COUNT(*) 改成 COUNT(1)，通常直接用 COUNT(*) 表达「统计行数」就好。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-86** 大表频繁统计且允许有延迟时，可以考虑维护汇总数据。[原文§COUNT(*)、COUNT(1) 和 COUNT(字段) 有什么区别？](https://xiaolincoding.com/interview/mysql.html#count-%E3%80%81count-1-%E5%92%8C-count-%E5%AD%97%E6%AE%B5-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### NULL 和空字符串有什么区别？

- **S1-87** NULL 表示值未知或者缺失，空字符串表示值已知，但内容为空，两者不是一回事。[原文§NULL 和空字符串有什么区别？](https://xiaolincoding.com/interview/mysql.html#null-%E5%92%8C%E7%A9%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-88** 判断 NULL 要用 IS NULL 或 IS NOT NULL，不能写 name = NULL。[原文§NULL 和空字符串有什么区别？](https://xiaolincoding.com/interview/mysql.html#null-%E5%92%8C%E7%A9%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-89** 普通比较运算遇到 NULL，结果通常是 UNKNOWN，WHERE 只保留结果为 TRUE 的行。[原文§NULL 和空字符串有什么区别？](https://xiaolincoding.com/interview/mysql.html#null-%E5%92%8C%E7%A9%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-90** 如果需要把两个 NULL 也当成相等，可以用 MySQL 的 NULL 安全等于运算符 <=>。[原文§NULL 和空字符串有什么区别？](https://xiaolincoding.com/interview/mysql.html#null-%E5%92%8C%E7%A9%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-91** NULL 并不意味着不能走索引，IS NULL 也可能使用索引；唯一索引允许多个 NULL，而 COUNT(字段) 不会统计 NULL，这些都是面试里容易追问的点。[原文§NULL 和空字符串有什么区别？](https://xiaolincoding.com/interview/mysql.html#null-%E5%92%8C%E7%A9%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### DELETE、TRUNCATE 和 DROP 有什么区别？

- **S1-92** DELETE 用于删除表中的记录，可以带 WHERE 条件，表结构保留。对于 InnoDB，它是事务操作，在事务提交前可以回滚，会产生 undo 和 redo，也会逐行触发 DELETE 触发器。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-93** TRUNCATE 用于清空整张表，不能带 WHERE，表结构保留，通常会重建表并重置自增计数器，不会逐行触发 DELETE 触发器。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-94** DROP 用于删除整张表，表结构和数据都不再保留。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-95** DELETE 删除表中的记录，可以带 WHERE 条件；TRUNCATE 清空整张表，不能带 WHERE，表结构保留；DROP 删除整张表，表结构和数据都不再保留。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-96** TRUNCATE 和普通 DROP TABLE 都属于 DDL，会隐式提交，不能通过应用执行 ROLLBACK 撤销。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S1-97** MySQL 8.0 的原子 DDL 保证的是崩溃时操作的一致性，不能把它理解成 DDL 可以像普通事务一样手动回滚。[原文§DELETE、TRUNCATE 和 DROP 有什么区别？](https://xiaolincoding.com/interview/mysql.html#delete%E3%80%81truncate-%E5%92%8C-drop-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### SQL查询语句的执行顺序是怎么样的？

- **S1-98** 这里说的是 SQL 的逻辑处理顺序，不是数据库内部实际执行每一步的顺序。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S1-99** 逻辑处理顺序为：FROM / JOIN → ON → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT。先确定从哪些表取数据，按 ON 条件关联，再用 WHERE 过滤记录，然后分组、计算聚合结果，通过 HAVING 过滤分组。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S1-100** HAVING 之后是最后几步：选择输出的列（SELECT）、去重（DISTINCT）、排序（ORDER BY），再限制返回行数（LIMIT）。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S1-101** WHERE 过滤的是分组前的记录，HAVING 过滤的是分组后的结果。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S1-102** SELECT 中定义的别名通常不能直接用于 WHERE，不过 MySQL 允许在 GROUP BY、HAVING 和 ORDER BY 中使用。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S1-103** 实际执行时，优化器可能调整连接顺序、提前过滤条件，或者利用索引省掉排序，并不会每一步都真正生成一张临时表。[原文§SQL查询语句的执行顺序是怎么样的？](https://xiaolincoding.com/interview/mysql.html#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)

### sql题：给学生表、课程成绩表，求不存在01课程但存在02课程的学生的成绩

- **S1-104** 可以使用子查询、LEFT JOIN 或者 EXISTS 来实现，原文给出两种方法：一是对 Score 分别以 01、02 课程为条件左连接两次，再用 IS NULL / IS NOT NULL 筛选；二是先与 02 课程的成绩连接，再用 NOT EXISTS 排除有 01 课程成绩的学生。

  ```sql
  -- 方法 1：LEFT JOIN + IS NULL
  SELECT s.sid, s.sname, sc2.cid, sc2.score
  FROM Student s
  LEFT JOIN Score AS sc1 ON s.sid = sc1.sid AND sc1.cid = '01'
  LEFT JOIN Score AS sc2 ON s.sid = sc2.sid AND sc2.cid = '02'
  WHERE sc1.cid IS NULL AND sc2.cid IS NOT NULL;
  ```

  ```sql
  -- 方法 2：NOT EXISTS
  SELECT s.sid, s.sname, sc.cid, sc.score
  FROM Student s
  JOIN Score sc ON s.sid = sc.sid AND sc.cid = '02'
  WHERE NOT EXISTS (
      SELECT 1 FROM Score sc1 WHERE sc1.sid = s.sid AND sc1.cid = '01'
  );
  ```

  要点：方法 1 中课程条件写在 ON 里，WHERE 要求 sc1.cid IS NULL（不存在 01 课程）且 sc2.cid IS NOT NULL（存在 02 课程）；方法 2 用 NOT EXISTS 排除存在 01 课程成绩的学生；两种写法都不会返回没有任何成绩的学生、只有 01 课程的学生，以及同时有 01 和 02 课程的学生。[原文§sql题：给学生表、课程成绩表，求不存在01课程但存在02课程的学生的成绩](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E7%BB%99%E5%AD%A6%E7%94%9F%E8%A1%A8%E3%80%81%E8%AF%BE%E7%A8%8B%E6%88%90%E7%BB%A9%E8%A1%A8-%E6%B1%82%E4%B8%8D%E5%AD%98%E5%9C%A801%E8%AF%BE%E7%A8%8B%E4%BD%86%E5%AD%98%E5%9C%A802%E8%AF%BE%E7%A8%8B%E7%9A%84%E5%AD%A6%E7%94%9F%E7%9A%84%E6%88%90%E7%BB%A9)
- **S1-105** 方法 1 使用 LEFT JOIN 和 IS NULL：把 Score 分别以 01 课程和 02 课程为条件左连接两次（课程条件写在 ON 中），再在 WHERE 中要求 01 课程的 cid IS NULL（即不存在 01 课程）且 02 课程的 cid IS NOT NULL（即存在 02 课程）。[原文§sql题：给学生表、课程成绩表，求不存在01课程但存在02课程的学生的成绩](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E7%BB%99%E5%AD%A6%E7%94%9F%E8%A1%A8%E3%80%81%E8%AF%BE%E7%A8%8B%E6%88%90%E7%BB%A9%E8%A1%A8-%E6%B1%82%E4%B8%8D%E5%AD%98%E5%9C%A801%E8%AF%BE%E7%A8%8B%E4%BD%86%E5%AD%98%E5%9C%A802%E8%AF%BE%E7%A8%8B%E7%9A%84%E5%AD%A6%E7%94%9F%E7%9A%84%E6%88%90%E7%BB%A9)
- **S1-106** 方法 2 使用 NOT EXISTS：先让学生表与 02 课程的成绩连接，再用 NOT EXISTS 子查询排除存在 01 课程成绩的学生。[原文§sql题：给学生表、课程成绩表，求不存在01课程但存在02课程的学生的成绩](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E7%BB%99%E5%AD%A6%E7%94%9F%E8%A1%A8%E3%80%81%E8%AF%BE%E7%A8%8B%E6%88%90%E7%BB%A9%E8%A1%A8-%E6%B1%82%E4%B8%8D%E5%AD%98%E5%9C%A801%E8%AF%BE%E7%A8%8B%E4%BD%86%E5%AD%98%E5%9C%A802%E8%AF%BE%E7%A8%8B%E7%9A%84%E5%AD%A6%E7%94%9F%E7%9A%84%E6%88%90%E7%BB%A9)

### 给定一个学生表 student_score（stu_id，subject_id，score），查询总分排名在5-10名的学生id及对应的总分

- **S1-107** 先按学生分组计算每个学生的总分，再用窗口函数 RANK() 按总分从高到低分配排名，最后在主查询中检索排名在 5 到 10 之间的记录。

  ```sql
  WITH StudentTotalScores AS (
      SELECT
          stu_id,
          SUM(score) AS total_score
      FROM
          student_score
      GROUP BY
          stu_id
  ),
  RankedStudents AS (
      SELECT
          stu_id,
          total_score,
          RANK() OVER (ORDER BY total_score DESC) AS ranking
      FROM
          StudentTotalScores
  )
  SELECT
      stu_id,
      total_score
  FROM
      RankedStudents
  WHERE
      ranking BETWEEN 5 AND 10
  ORDER BY ranking, stu_id;
  ```

  要点：子查询 StudentTotalScores 对 stu_id 分组并用 SUM(score) 求总分；子查询 RankedStudents 用 RANK() OVER (ORDER BY total_score DESC) 分配排名；最后用 ranking BETWEEN 5 AND 10 筛选，并按 ranking、stu_id 排序；这个写法需要 MySQL 8.0 及以上版本；RANK() 并列名次、后面的名次会跳号，所以有并列时结果里可能没有恰好第 5 名的行；不足 5 个学生时结果为空。[原文§给定一个学生表 student_score（stu_id，subject_id，score），查询总分排名在5-10名的学生id及对应的总分](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%AD%A6%E7%94%9F%E8%A1%A8-student-score-stu-id-subject-id-score-%E6%9F%A5%E8%AF%A2%E6%80%BB%E5%88%86%E6%8E%92%E5%90%8D%E5%9C%A85-10%E5%90%8D%E7%9A%84%E5%AD%A6%E7%94%9Fid%E5%8F%8A%E5%AF%B9%E5%BA%94%E7%9A%84%E6%80%BB%E5%88%86)
- **S1-108** 要先问清楚同分怎么算：RANK() 是并列名次、后面的名次会跳号；DENSE_RANK() 是并列名次、不跳号；如果只是取排序后的第 5 到第 10 条记录，可以用 ROW_NUMBER() OVER (ORDER BY total_score DESC, stu_id)，用 stu_id 保证同分时排序稳定。[原文§给定一个学生表 student_score（stu_id，subject_id，score），查询总分排名在5-10名的学生id及对应的总分](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%AD%A6%E7%94%9F%E8%A1%A8-student-score-stu-id-subject-id-score-%E6%9F%A5%E8%AF%A2%E6%80%BB%E5%88%86%E6%8E%92%E5%90%8D%E5%9C%A85-10%E5%90%8D%E7%9A%84%E5%AD%A6%E7%94%9Fid%E5%8F%8A%E5%AF%B9%E5%BA%94%E7%9A%84%E6%80%BB%E5%88%86)
- **S1-109** 这个写法需要 MySQL 8.0 及以上版本。[原文§给定一个学生表 student_score（stu_id，subject_id，score），查询总分排名在5-10名的学生id及对应的总分](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%AD%A6%E7%94%9F%E8%A1%A8-student-score-stu-id-subject-id-score-%E6%9F%A5%E8%AF%A2%E6%80%BB%E5%88%86%E6%8E%92%E5%90%8D%E5%9C%A85-10%E5%90%8D%E7%9A%84%E5%AD%A6%E7%94%9Fid%E5%8F%8A%E5%AF%B9%E5%BA%94%E7%9A%84%E6%80%BB%E5%88%86)

### SQL题：查某个班级下所有学生的选课情况

- **S1-110** 以学生表为主表，用 LEFT JOIN 关联选课表（保留没有选课的学生），再关联班级表，并用 WHERE 限定班级名称。

  ```sql
  SELECT
      s.student_id,
      s.student_name,
      cs.course_name
  FROM
      students s
  LEFT JOIN
      course_selections cs ON s.student_id = cs.student_id
  JOIN
      classes c ON s.class_id = c.class_id
  WHERE
      c.class_name = 'Class A';
  ```

  要点：选课表必须用 LEFT JOIN，因为题目要求的是「所有学生」，没有选课的学生也要返回，对应的 course_name 为 NULL；班级名称的过滤写在 WHERE 中，作用于学生所属班级；如果要对选课表加限制条件，写到 WHERE 中会把未匹配的学生过滤掉，需要保留时应把右表的限制条件放在 ON 中。[原文§SQL题：查某个班级下所有学生的选课情况](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E6%9F%A5%E6%9F%90%E4%B8%AA%E7%8F%AD%E7%BA%A7%E4%B8%8B%E6%89%80%E6%9C%89%E5%AD%A6%E7%94%9F%E7%9A%84%E9%80%89%E8%AF%BE%E6%83%85%E5%86%B5)
- **S1-111** 选课表这里要用 LEFT JOIN，因为题目要求的是「所有学生」，没有选课的学生也要返回，对应的 course_name 为 NULL。[原文§SQL题：查某个班级下所有学生的选课情况](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E6%9F%A5%E6%9F%90%E4%B8%AA%E7%8F%AD%E7%BA%A7%E4%B8%8B%E6%89%80%E6%9C%89%E5%AD%A6%E7%94%9F%E7%9A%84%E9%80%89%E8%AF%BE%E6%83%85%E5%86%B5)
- **S1-112** 如果把选课表的过滤条件写到 WHERE 中，要注意不要把这些未匹配的学生过滤掉；需要保留时，通常把右表的限制条件放在 ON 中。[原文§SQL题：查某个班级下所有学生的选课情况](https://xiaolincoding.com/interview/mysql.html#sql%E9%A2%98-%E6%9F%A5%E6%9F%90%E4%B8%AA%E7%8F%AD%E7%BA%A7%E4%B8%8B%E6%89%80%E6%9C%89%E5%AD%A6%E7%94%9F%E7%9A%84%E9%80%89%E8%AF%BE%E6%83%85%E5%86%B5)

### 如何用 MySQL 实现一个可重入的锁？

- **S1-113** 可以用一张锁表，记录「锁名、持有者、重入次数」（对应 lock_name、holder_id、reentry_count 三列），再通过事务和 SELECT ... FOR UPDATE 保证加锁、解锁过程不会被并发请求打乱。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-114** 加锁和解锁都要开启事务，通过 SELECT holder_id, reentry_count FROM lock_table WHERE lock_name = ? FOR UPDATE 锁住同一条锁记录，保证过程不会被并发请求打乱。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-115** 锁名必须唯一（lock_name 是主键）。持有者也不能只用线程名称，不同服务实例可能有同名线程，可以使用「实例 ID + 线程 ID + 唯一标识」来区分。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-116** 这里保留固定的锁记录，可以避免「记录不存在时，多个请求同时插入」的问题。如果要动态创建锁，也必须通过主键唯一约束处理并发插入失败和重试。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-117** 开启事务，用 FOR UPDATE 查询该锁记录：holder_id 为 NULL 说明锁空闲，把 holder_id 设为自己、reentry_count 设为 1；holder_id 是自己说明是重入，把 reentry_count 加 1；holder_id 是其他持有者说明加锁失败，结束事务后再决定返回失败还是等待重试；最后提交事务。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-118** 提交事务释放的是数据库行锁，业务锁的归属仍然保存在锁记录里。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-119** 开启事务，通过 FOR UPDATE 锁住同一条记录，并检查 holder_id 是否是自己；如果不是自己，不能释放锁；如果 reentry_count 大于 1，就减 1；如果等于 1，就把 holder_id 置为 NULL、reentry_count 置为 0，完全释放业务锁；最后提交事务。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-120** 如果 reentry_count 等于 1，就把 holder_id 置为 NULL、reentry_count 置为 0，完全释放业务锁。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-121** 持有者崩溃后，数据库事务虽然已经结束，表里的业务锁记录仍可能一直被占用。生产环境还需要考虑租约、续期，以及过期持有者继续写入的问题。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)
- **S1-122** 只是加一个过期时间，还不能保证业务操作始终互斥；生产环境还需要考虑租约、续期，以及过期持有者继续写入的问题。[原文§如何用 MySQL 实现一个可重入的锁？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%87%8D%E5%85%A5%E7%9A%84%E9%94%81)

## 2. 存储引擎

原文：[MySQL面试题 · 存储引擎](https://xiaolincoding.com/interview/mysql.html#%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E)。

### 执行一条SQL请求的过程是什么？

- **S2-1** 依次是连接器、查询缓存、解析 SQL（通过解析器做词法分析、语法分析并构建语法树）、执行 SQL。其中查询缓存这个模块在 MySQL 8.0 已删除。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-2** 连接器负责建立连接，管理连接、校验用户身份。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-3** 查询语句如果命中查询缓存则直接返回，否则继续往下执行；MySQL 8.0 已删除该模块。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-4** 解析器对 SQL 查询语句进行词法分析、语法分析，然后构建语法树，方便后续模块读取表名、字段、语句类型。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-5** 依次是预处理阶段、优化阶段、执行阶段。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-6** 预处理阶段检查表或字段是否存在，并把 select * 中的 * 符号扩展为表上的所有列。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- **S2-7** 优化阶段基于查询成本的考虑，选择查询成本最小的执行计划；执行阶段根据执行计划执行 SQL 查询语句，从存储引擎读取记录，返回给客户端。[原文§执行一条SQL请求的过程是什么？](https://xiaolincoding.com/interview/mysql.html#%E6%89%A7%E8%A1%8C%E4%B8%80%E6%9D%A1sql%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88)

### 讲一讲mysql的引擎吧，你有什么了解？

- **S2-8** InnoDB 是 MySQL 的默认存储引擎，具有 ACID 事务支持、行级锁、外键约束等特性，适用于高并发的读写操作，数据完整性和并发控制较好。[原文§讲一讲mysql的引擎吧，你有什么了解？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E8%AE%B2mysql%E7%9A%84%E5%BC%95%E6%93%8E%E5%90%A7-%E4%BD%A0%E6%9C%89%E4%BB%80%E4%B9%88%E4%BA%86%E8%A7%A3)
- **S2-9** MyISAM 是较早版本中常用的存储引擎，数据和索引分开保存，使用表级锁，不支持事务和外键。[原文§讲一讲mysql的引擎吧，你有什么了解？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E8%AE%B2mysql%E7%9A%84%E5%BC%95%E6%93%8E%E5%90%A7-%E4%BD%A0%E6%9C%89%E4%BB%80%E4%B9%88%E4%BA%86%E8%A7%A3)
- **S2-10** MyISAM 在部分只读场景有优势，但不能简单认为读多的业务就一定适合 MyISAM，实际还要考虑并发写入和故障恢复需求。[原文§讲一讲mysql的引擎吧，你有什么了解？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E8%AE%B2mysql%E7%9A%84%E5%BC%95%E6%93%8E%E5%90%A7-%E4%BD%A0%E6%9C%89%E4%BB%80%E4%B9%88%E4%BA%86%E8%A7%A3)
- **S2-11** Memory 引擎将数据存储在内存中，适用于对性能要求较高的读操作，但在服务器重启或崩溃时数据会丢失；它不支持事务、行级锁和外键约束。[原文§讲一讲mysql的引擎吧，你有什么了解？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E8%AE%B2mysql%E7%9A%84%E5%BC%95%E6%93%8E%E5%90%A7-%E4%BD%A0%E6%9C%89%E4%BB%80%E4%B9%88%E4%BA%86%E8%A7%A3)

### MySQL为什么InnoDB是默认引擎？

- **S2-12** 事务支持、并发性能、崩溃恢复。[原文§MySQL为什么InnoDB是默认引擎？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88innodb%E6%98%AF%E9%BB%98%E8%AE%A4%E5%BC%95%E6%93%8E)
- **S2-13** ACID 依次是原子性、一致性、隔离性、持久性；InnoDB 提供了对事务的支持，MyISAM 存储引擎不支持事务。[原文§MySQL为什么InnoDB是默认引擎？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88innodb%E6%98%AF%E9%BB%98%E8%AE%A4%E5%BC%95%E6%93%8E)
- **S2-14** InnoDB 引擎采用行级锁定的机制，可以提供更好的并发性能；MyISAM 存储引擎只支持表锁，锁的粒度比较大。[原文§MySQL为什么InnoDB是默认引擎？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88innodb%E6%98%AF%E9%BB%98%E8%AE%A4%E5%BC%95%E6%93%8E)
- **S2-15** InnoDB 通过 redo log 日志实现了崩溃恢复，在数据库发生断电等异常情况时，可以通过日志文件进行恢复，保证数据的持久性和一致性；MyISAM 不支持崩溃恢复。[原文§MySQL为什么InnoDB是默认引擎？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88innodb%E6%98%AF%E9%BB%98%E8%AE%A4%E5%BC%95%E6%93%8E)

### 说一下mysql的innodb与MyISAM的区别？

- **S2-16** InnoDB 支持事务，MyISAM 不支持事务，这是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-17** InnoDB 使用聚簇索引组织数据，聚簇索引的叶子节点保存行数据。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-18** 即使没有显式主键，InnoDB 也会选择合适的唯一索引或生成隐藏行 ID 来组织数据。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-19** InnoDB 的辅助索引保存索引列和主键值。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-20** 辅助索引保存索引列和主键值，需要读取索引中没有的字段时会回表；覆盖索引查询不需要为了获取这些字段而回表。（原文写作“才会回表”，这是常规情况；按 MVCC 规则，二级索引记录被标记删除，或二级索引页被较新的事务修改时，即使是覆盖索引，也要到聚簇索引核查可见版本。）[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)[核对来源：MySQL 8.0 InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)
- **S2-21** 因为辅助索引保存主键值，主键太大，其他索引也都会很大，所以主键不应该过大。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-22** MyISAM 的数据文件是分离的，索引保存的是数据记录的位置，主键索引和辅助索引都通过这个位置访问数据。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-23** InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-24** MyISAM 的最小锁粒度是表锁，一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-25** InnoDB 不保存所有事务都能直接使用的精确总行数，执行无 WHERE 的 COUNT(*) 通常需要扫描索引，统计当前事务可见的记录。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S2-26** MyISAM 保存了整张表的行数，简单的无 WHERE 计数可以直接读取；加了 WHERE 条件后，也不能只靠这个总行数返回结果。[原文§说一下mysql的innodb与MyISAM的区别？](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E4%B8%80%E4%B8%8Bmysql%E7%9A%84innodb%E4%B8%8Emyisam%E7%9A%84%E5%8C%BA%E5%88%AB)

### 数据管理里，数据文件大体分成哪几种数据文件？

- **S2-27** 可以通过 SHOW VARIABLES LIKE 'datadir' 查看数据目录的实际位置；每个数据库通常有对应的目录，用来保存该数据库的表文件。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- **S2-28** 三个文件依次是 db.opt（存储当前数据库的默认字符集和字符校验规则）、t_order.frm（保存表结构定义等表的元数据，即 .frm 文件）、t_order.ibd（保存表数据，即 .ibd 文件）。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- **S2-29** 共享表空间文件名是 ibdata1，独占表空间文件名是“表名字.ibd”。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- **S2-30** 由参数 innodb_file_per_table 控制。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- **S2-31** 若设置 innodb_file_per_table 为 1，会将存储的数据、索引等信息单独存储在一个独占表空间，从 MySQL 5.6.6 版本开始它的默认值就是 1；默认情况下新建表会使用独立的 .ibd 文件，但已有表或显式使用其他表空间的表不一定如此。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)
- **S2-32** MySQL 8.0 已经取消了 .frm 文件，表结构等元数据改为保存在事务型数据字典中；独立表空间的 .ibd 文件仍然保存表数据和索引，所以不能把 5.7 的文件布局直接套到 8.0 上。[原文§数据管理里，数据文件大体分成哪几种数据文件？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86%E9%87%8C-%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6%E5%A4%A7%E4%BD%93%E5%88%86%E6%88%90%E5%93%AA%E5%87%A0%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%96%87%E4%BB%B6)

### Buffer Pool 是什么？有什么作用？

- **S2-33** Buffer Pool 是 InnoDB 的内存缓冲区，主要缓存数据页和索引页，可以把它理解成磁盘数据在内存里的“工作区”。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-34** 查询时先看需要的页是否已经在 Buffer Pool 中，命中就直接读取；没命中才从磁盘加载。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-35** 修改后的页叫脏页，再由后台线程择机刷回磁盘。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-36** 事务提交时，如果 redo log 已经按要求持久化，就不需要等所有脏页刷盘，这样能减少提交时的随机 I/O。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-37** Buffer Pool 缓存的是页（数据页和索引页），查询缓存缓存的是 SQL 的结果；二者不是一回事，查询缓存在 MySQL 8.0 已删除。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-38** 为了避免一次大表扫描把热点页全部挤出 Buffer Pool，InnoDB 采用改进的 LRU 策略。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S2-39** InnoDB 把 LRU 链表分成新、老两个区域，新加载的页先进入老区域，再结合访问时机决定是否移到新区域。[原文§Buffer Pool 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#buffer-pool-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

## 3. 索引

原文：[MySQL面试题 · 索引](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95)。

### 索引是什么？有什么好处？

- **S3-1** 索引类似于书籍的目录，可以减少扫描的数据量，提高查询效率。[原文§索引是什么？有什么好处？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)
- **S3-2** 没有合适索引时通常需要扫描整张表、逐行判断是否满足条件，时间复杂度可以理解为 O(N)；有合适索引时可以沿 B+ 树逐层定位，查找复杂度可以理解为 O(log N)，再扫描满足条件的记录。[原文§索引是什么？有什么好处？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)
- **S3-3** 索引的价值不只是“找得快”，还可以帮助完成排序、分组，或者通过覆盖索引减少回表。[原文§索引是什么？有什么好处？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)
- **S3-4** 对于范围查询，返回的数据越多，扫描和读取的成本也越大，不能认为只要用了索引，整条 SQL 就一定很快。[原文§索引是什么？有什么好处？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)

### 讲讲索引的分类是什么？

- **S3-5** MySQL 可以按四个角度分类索引：按「数据结构」分类、按「物理存储」分类、按「字段特性」分类、按「字段个数」分类。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-6** 按数据结构分类，MySQL 常见索引有 B+Tree 索引、Hash 索引、Full-Text 索引。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-7** InnoDB 是在 MySQL 5.5 之后成为默认的 MySQL 存储引擎，B+Tree 索引类型也是 MySQL 存储引擎采用最多的索引类型。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-8** 创建的主键索引和二级索引默认使用的是 B+Tree 索引。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-9** 如果没有主键，就选择第一个所有索引列都定义为 NOT NULL 的唯一索引作为聚簇索引的索引键。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-10** 在没有主键、也没有符合条件的唯一索引的情况下，InnoDB 会生成一个 6 字节的隐藏行 ID，作为聚簇索引的索引键。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-11** 聚簇索引以外的其它索引都属于辅助索引（Secondary Index），也被称为二级索引或非聚簇索引。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-12** 从物理存储的角度来看，索引分为聚簇索引（主键索引）、二级索引（辅助索引）。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-13** 主键索引的 B+Tree 叶子节点存放的是实际数据，所有完整的用户记录都存放在主键索引的叶子节点里；二级索引的 B+Tree 叶子节点保存索引列的值和主键值，不保存完整的行数据。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-14** 使用二级索引查询时，如果查询的数据能在二级索引里查到，就不需要回表，这个过程就是覆盖索引；如果查询的数据不在二级索引里，就会先检索二级索引，找到对应的叶子节点，获取到主键值后，再检索主键索引，就能查询到数据了，这个过程就是回表。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-15** 从字段特性的角度来看，索引分为主键索引、唯一索引、普通索引、前缀索引。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-16** 主键索引就是建立在主键字段上的索引，通常在创建表的时候一起创建，一张表最多只有一个主键索引，索引列的值不允许有空值。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-17** 唯一索引用来限制索引键不重复，一张表可以有多个唯一索引。如果是联合唯一索引，限制的是多个字段的组合唯一，不是每个字段分别唯一。MySQL 的唯一索引允许多个 NULL，需要禁止空值时再加 NOT NULL。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-18** 建表后如果要创建唯一索引，可以使用 `CREATE UNIQUE INDEX index_name ON table_name(index_column_1,index_column_2,...);`；建表时则在表定义里写 `UNIQUE KEY(index_column_1,index_column_2,...)`。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-19** 普通索引就是建立在普通字段上的索引，既不要求字段为主键，也不要求字段为 UNIQUE。建表时可写 `INDEX(index_column_1,index_column_2,...)`，建表后可用 `CREATE INDEX index_name ON table_name(index_column_1,index_column_2,...);`。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-20** 前缀索引是指对字符类型字段的前几个字符建立的索引，而不是在整个字段上建立的索引；使用前缀索引的目的是为了减少索引占用的存储空间，提升查询效率。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-21** 前缀索引可以建立在 CHAR、VARCHAR、BINARY、VARBINARY 等列上；TEXT、BLOB 列建立普通 B+ 树索引时也需要指定前缀长度。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-22** 建表后如果要创建前缀索引，可以使用 `CREATE INDEX index_name ON table_name(column_name(length));`；建表时则在表定义里写 `INDEX(column_name(length))`。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-23** 从字段个数的角度来看，建立在单列上的索引称为单列索引（比如主键索引），建立在多列上的索引称为联合索引（复合索引）。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-24** 联合索引的非叶子节点用两个字段的值作为 B+Tree 的 key 值。在联合索引查询数据时，先按 product_no 字段比较，在 product_no 相同的情况下再按 name 字段比较；也就是先按 product_no 排序，product_no 相同时再按 name 排序。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-25** 使用联合索引定位数据时，要关注最左匹配原则，也就是从最左边的字段开始，连续匹配索引列。跳过最左列后，通常就不能直接按后面的字段定位到一段连续的索引范围。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-26** 创建了 (a, b, c) 联合索引后，where a=1、where a=1 and b=2、where a=1 and b=2 and c=3 可以匹配上联合索引；where b=2、where c=3、where b=2 and c=3 缺少最左边的 a，通常不能使用这个索引进行常规的前缀定位。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-27** 因为有查询优化器，所以 a 字段在 where 子句的顺序并不重要。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-28** 因为 (a, b, c) 联合索引先按 a 排序，a 相同再按 b 排序，b 也相同再按 c 排序，所以 b 和 c 是全局无序、局部有序的。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-29** 缺少最左边的 a，通常不能按常规最左前缀快速定位，但不代表索引完全不会被读取：覆盖索引时仍可能全索引扫描，MySQL 8.0 在满足条件时还可能采用索引跳跃扫描，最终要看执行计划。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-30** 并不是查询过程使用了联合索引查询，就代表联合索引中的所有字段都用到了联合索引进行索引查询，也就是可能存在部分字段用到联合索引的 B+Tree，部分字段没有用到联合索引的 B+Tree 的情况。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-31** 对于 `WHERE a = 1 AND b > 2 AND c = 3`，a、b 可以确定扫描范围，但这个范围里 c 并不是全局有序的，所以不能继续用 c = 3 把整段扫描范围缩成只包含目标记录的区间。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-32** 后面的字段不能继续缩小扫描范围，不代表完全没用，它仍可能用于索引下推、覆盖索引等优化。IN 等条件还可能拆成多个等值范围，面试时不要把所有写法都机械地归成「范围之后全部失效」。[原文§讲讲索引的分类是什么？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E8%AE%B2%E7%B4%A2%E5%BC%95%E7%9A%84%E5%88%86%E7%B1%BB%E6%98%AF%E4%BB%80%E4%B9%88)

### 哈希索引使用场景是什么？

- **S3-33** 哈希索引的优势是等值查询极快、能直接通过哈希函数定位数据位置，短板是不支持范围查询、排序和前缀匹配。[原文§哈希索引使用场景是什么？](https://xiaolincoding.com/interview/mysql.html#%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-34** 哈希索引优势是等值查询极快，短板是不支持范围查询、排序和前缀匹配，所以使用场景必然是那些以等值查询为核心，且不需要复杂查询操作的场景。[原文§哈希索引使用场景是什么？](https://xiaolincoding.com/interview/mysql.html#%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-35** MySQL 的 Memory 存储引擎默认就用哈希索引。[原文§哈希索引使用场景是什么？](https://xiaolincoding.com/interview/mysql.html#%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-36** 内存表本身基于内存存储，追求极致的查询速度，而这类场景通常是简单的等值查询。比如缓存用户登录信息，通过用户 ID 快速查找对应的登录状态、权限信息，哈希索引能直接通过用户 ID 计算哈希值，定位到数据所在的桶，查询效率接近 O(1)，比 B+ 树索引的等值查询更快。[原文§哈希索引使用场景是什么？](https://xiaolincoding.com/interview/mysql.html#%E5%93%88%E5%B8%8C%E7%B4%A2%E5%BC%95%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E6%98%AF%E4%BB%80%E4%B9%88)

### MySQL聚簇索引和非聚簇索引的区别是什么？

- **S3-37** 原文从数据存储、索引与数据关系、唯一性、效率四个方面比较聚簇索引和非聚簇索引。[原文§MySQL聚簇索引和非聚簇索引的区别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%92%8C%E9%9D%9E%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-38** 在聚簇索引中，数据行在 B+ 树中按照索引键值组织，索引的叶子节点包含了实际的数据行，索引结构本身就是数据的物理存储结构。非聚簇索引的叶子节点不包含完整的数据行，而是包含指向数据行的指针或主键值，数据行本身存储在聚簇索引中。[原文§MySQL聚簇索引和非聚簇索引的区别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%92%8C%E9%9D%9E%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-39** 由于数据与索引紧密相连，通过聚簇索引查找数据时，可以直接从索引中获得数据行，不需要额外步骤去查找数据所在的位置。通过非聚簇索引查找数据时，首先在非聚簇索引中找到对应的主键值，然后通过这个主键值回溯到聚簇索引中查找实际的数据行，这个过程称为“回表”。[原文§MySQL聚簇索引和非聚簇索引的区别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%92%8C%E9%9D%9E%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-40** 聚簇索引通常是基于主键构建的，因此每个表只能有一个聚簇索引，因为数据只能有一种物理排序方式。一个表可以有多个非聚簇索引，因为它们不直接影响数据的物理存储位置。[原文§MySQL聚簇索引和非聚簇索引的区别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%92%8C%E9%9D%9E%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-41** 对于范围查询和排序查询，聚簇索引通常更有效率，因为它避免了额外的寻址开销。非聚簇索引在使用覆盖索引进行查询时效率更高，因为不需要读取完整的数据行；但需要进行回表操作时，使用非聚簇索引效率比较低，因为需要额外的回表操作。[原文§MySQL聚簇索引和非聚簇索引的区别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%92%8C%E9%9D%9E%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### 如果聚簇索引的数据更新，它的存储要不要变化？

- **S3-42** 要看更新的是哪个字段，以及记录长度有没有变化。[原文§如果聚簇索引的数据更新，它的存储要不要变化？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0-%E5%AE%83%E7%9A%84%E5%AD%98%E5%82%A8%E8%A6%81%E4%B8%8D%E8%A6%81%E5%8F%98%E5%8C%96)
- **S3-43** 更新主键时，记录在聚簇索引中的排序位置会变化，需要调整聚簇索引；二级索引里也保存了主键值，所以也要维护。[原文§如果聚簇索引的数据更新，它的存储要不要变化？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0-%E5%AE%83%E7%9A%84%E5%AD%98%E5%82%A8%E8%A6%81%E4%B8%8D%E8%A6%81%E5%8F%98%E5%8C%96)
- **S3-44** 更新二级索引列时，聚簇索引中的主键顺序不变，但相关二级索引中的记录需要调整。[原文§如果聚簇索引的数据更新，它的存储要不要变化？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0-%E5%AE%83%E7%9A%84%E5%AD%98%E5%82%A8%E8%A6%81%E4%B8%8D%E8%A6%81%E5%8F%98%E5%8C%96)
- **S3-45** 更新普通非索引列时，如果记录长度基本不变，通常可以在原位置更新；如果变长字段增长导致当前页空间不足，仍可能涉及记录迁移、页分裂或页外存储等处理。[原文§如果聚簇索引的数据更新，它的存储要不要变化？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0-%E5%AE%83%E7%9A%84%E5%AD%98%E5%82%A8%E8%A6%81%E4%B8%8D%E8%A6%81%E5%8F%98%E5%8C%96)
- **S3-46** 不能简单说“更新非索引字段，存储结构一定不会变”：如果变长字段增长导致当前页空间不足，仍可能涉及记录迁移、页分裂或页外存储等处理。[原文§如果聚簇索引的数据更新，它的存储要不要变化？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0-%E5%AE%83%E7%9A%84%E5%AD%98%E5%82%A8%E8%A6%81%E4%B8%8D%E8%A6%81%E5%8F%98%E5%8C%96)

### MySQL主键是聚簇索引吗？

- **S3-47** 在 MySQL 的 InnoDB 存储引擎中，主键确实是以聚簇索引的形式存储的。InnoDB 将数据存储在 B+ 树的结构中，其中主键索引的 B+ 树就是所谓的聚簇索引，聚簇索引的叶节点包含了实际的数据行。[原文§MySQL主键是聚簇索引吗？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E9%94%AE%E6%98%AF%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-48** 表中的数据行在 B+ 树中按主键有序组织，但有序说的是索引的逻辑顺序，不代表这些页在磁盘上一定连续存放。[原文§MySQL主键是聚簇索引吗？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E9%94%AE%E6%98%AF%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-49** InnoDB 在创建聚簇索引时，如果有主键，默认会使用主键作为聚簇索引的索引键；如果没有主键，就选择第一个所有索引列都定义为 NOT NULL 的唯一索引作为聚簇索引的索引键；在上面两个都没有的情况下，InnoDB 会生成一个 6 字节的隐藏行 ID，作为聚簇索引的索引键。[原文§MySQL主键是聚簇索引吗？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E9%94%AE%E6%98%AF%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-50** 一张表只能有一个聚簇索引，那为了实现非主键字段的快速搜索，就引出了二级索引（非聚簇索引/辅助索引），它也是利用了 B+ 树的数据结构，不过叶子节点保存的是索引列和主键值，不包含完整的行数据。[原文§MySQL主键是聚簇索引吗？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E9%94%AE%E6%98%AF%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95%E5%90%97)

### 什么字段适合当做主键？

- **S3-51** 适合当做主键的字段：具有唯一性且不能为空；尽量短、稳定、不频繁修改；最好有递增的趋势；不建议用会员卡号、订单号、学生号之类的业务数据；通常用自增字段。[原文§什么字段适合当做主键？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E5%AD%97%E6%AE%B5%E9%80%82%E5%90%88%E5%BD%93%E5%81%9A%E4%B8%BB%E9%94%AE)
- **S3-52** 字段尽量短、稳定、不频繁修改，因为二级索引也要保存主键值，主键越宽，所有二级索引的空间和维护成本也会增加。[原文§什么字段适合当做主键？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E5%AD%97%E6%AE%B5%E9%80%82%E5%90%88%E5%BD%93%E5%81%9A%E4%B8%BB%E9%94%AE)
- **S3-53** 字段最好有递增的趋势，如果字段的值是随机无序的，可能会引发页分裂的问题，造成性能影响。[原文§什么字段适合当做主键？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E5%AD%97%E6%AE%B5%E9%80%82%E5%90%88%E5%BD%93%E5%81%9A%E4%B8%BB%E9%94%AE)
- **S3-54** 不建议用业务数据作为主键，比如会员卡号、订单号、学生号之类的，因为我们无法预测未来会不会因为业务需要，而出现业务字段重复或者重用的情况。[原文§什么字段适合当做主键？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E5%AD%97%E6%AE%B5%E9%80%82%E5%90%88%E5%BD%93%E5%81%9A%E4%B8%BB%E9%94%AE)
- **S3-55** 通常情况下会用自增字段来做主键，对于单机系统来说是没问题的。但是，如果有多台服务器，各自都可以录入数据，那就不一定适用了：如果每台机器各自产生的数据需要合并，就可能会出现主键重复的问题，这时候就需要考虑分布式 id 的方案了。[原文§什么字段适合当做主键？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E5%AD%97%E6%AE%B5%E9%80%82%E5%90%88%E5%BD%93%E5%81%9A%E4%B8%BB%E9%94%AE)

### 性别字段能加索引么？为啥？

- **S3-56** 能加，但如果只是建立性别的单列索引，通常收益不大。[原文§性别字段能加索引么？为啥？](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E5%88%AB%E5%AD%97%E6%AE%B5%E8%83%BD%E5%8A%A0%E7%B4%A2%E5%BC%95%E4%B9%88-%E4%B8%BA%E5%95%A5)
- **S3-57** 比如有 100 万条数据，男女各 50 万条，执行 `SELECT * FROM users WHERE sex = '男'`，即使先通过二级索引找到 50 万条记录，还要大量回表读取其他字段，这时可能不如全表扫描，优化器就可能放弃这个索引。[原文§性别字段能加索引么？为啥？](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E5%88%AB%E5%AD%97%E6%AE%B5%E8%83%BD%E5%8A%A0%E7%B4%A2%E5%BC%95%E4%B9%88-%E4%B8%BA%E5%95%A5)
- **S3-58** 值的种类少，不代表任何场景都不适合索引：如果数据分布很不均匀，查询的是数量很少的那一类，索引可能有效；如果只统计数量，索引可以覆盖查询，避免为获取其他列而回表；如果和其他字段组成联合索引，例如 `(sex, age)`，查询某个性别下指定年龄范围的用户，也可能有效。[原文§性别字段能加索引么？为啥？](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E5%88%AB%E5%AD%97%E6%AE%B5%E8%83%BD%E5%8A%A0%E7%B4%A2%E5%BC%95%E4%B9%88-%E4%B8%BA%E5%95%A5)
- **S3-59** 要结合实际查询、命中比例和回表成本判断，不能只看字段有几种取值。[原文§性别字段能加索引么？为啥？](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E5%88%AB%E5%AD%97%E6%AE%B5%E8%83%BD%E5%8A%A0%E7%B4%A2%E5%BC%95%E4%B9%88-%E4%B8%BA%E5%95%A5)

### 表中十个字段，你主键用自增ID还是UUID，为什么？

- **S3-60** 原文用的是自增 id。因为常见的随机 UUID 相对顺序的自增 id 来说，生成顺序和索引排序顺序不一致，新行的值不一定要比之前的主键的值要大，所以 innodb 无法做到总是把新行插入到索引的最后，而是需要为新行寻找新的合适的位置从而来分配新的空间。[原文§表中十个字段，你主键用自增ID还是UUID，为什么？](https://xiaolincoding.com/interview/mysql.html#%E8%A1%A8%E4%B8%AD%E5%8D%81%E4%B8%AA%E5%AD%97%E6%AE%B5-%E4%BD%A0%E4%B8%BB%E9%94%AE%E7%94%A8%E8%87%AA%E5%A2%9Eid%E8%BF%98%E6%98%AFuuid-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S3-61** 数据的毫无顺序会导致数据分布散乱，带来：写入的目标页很可能已经刷新到磁盘并且从缓存上移除，或者还没有被加载到缓存中，需要先从磁盘读取目标页，导致大量随机 IO；写入乱序，不得不频繁页分裂，移动大量数据，影响性能；频繁页分裂使页变得稀疏并被不规则填充，最终导致数据有碎片。[原文§表中十个字段，你主键用自增ID还是UUID，为什么？](https://xiaolincoding.com/interview/mysql.html#%E8%A1%A8%E4%B8%AD%E5%8D%81%E4%B8%AA%E5%AD%97%E6%AE%B5-%E4%BD%A0%E4%B8%BB%E9%94%AE%E7%94%A8%E8%87%AA%E5%A2%9Eid%E8%BF%98%E6%98%AFuuid-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S3-62** 随机 UUID 写入是乱序的：目标页很可能已经刷新到磁盘并且从缓存上移除，或者还没有被加载到缓存中，innodb 在插入之前不得不先找到并从磁盘读取目标页到内存中，导致大量随机 IO；innodb 不得不频繁地做页分裂操作来为新的行分配空间，页分裂导致移动大量的数据，影响性能；频繁的页分裂使页变得稀疏并被不规则地填充，最终会导致数据有碎片。[原文§表中十个字段，你主键用自增ID还是UUID，为什么？](https://xiaolincoding.com/interview/mysql.html#%E8%A1%A8%E4%B8%AD%E5%8D%81%E4%B8%AA%E5%AD%97%E6%AE%B5-%E4%BD%A0%E4%B8%BB%E9%94%AE%E7%94%A8%E8%87%AA%E5%A2%9Eid%E8%BF%98%E6%98%AFuuid-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S3-63** 单机业务通常优先选择短小、递增的主键。分布式系统还要考虑跨节点唯一性，可以使用合适的分布式 ID。[原文§表中十个字段，你主键用自增ID还是UUID，为什么？](https://xiaolincoding.com/interview/mysql.html#%E8%A1%A8%E4%B8%AD%E5%8D%81%E4%B8%AA%E5%AD%97%E6%AE%B5-%E4%BD%A0%E4%B8%BB%E9%94%AE%E7%94%A8%E8%87%AA%E5%A2%9Eid%E8%BF%98%E6%98%AFuuid-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S3-64** 原文这里主要说的是随机 UUID，不同 UUID 方案的有序性不同，不能把所有 UUID 都当成完全随机。[原文§表中十个字段，你主键用自增ID还是UUID，为什么？](https://xiaolincoding.com/interview/mysql.html#%E8%A1%A8%E4%B8%AD%E5%8D%81%E4%B8%AA%E5%AD%97%E6%AE%B5-%E4%BD%A0%E4%B8%BB%E9%94%AE%E7%94%A8%E8%87%AA%E5%A2%9Eid%E8%BF%98%E6%98%AFuuid-%E4%B8%BA%E4%BB%80%E4%B9%88)

### 什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?

- **S3-65** UUID 放进 B+ 树之后也是有序的，问题在于新生成的 UUID 不一定比前一个大，所以插入位置可能落到树的中间。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)
- **S3-66** 自增 ID 通常在聚簇索引的右侧追加，新插入的记录更容易集中在已经缓存的页上，减少随机读页、页分裂和空间碎片。随机 UUID 则可能需要访问不同的数据页，写入成本更高。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)
- **S3-67** BIGINT 只有 8 字节，常见的 UUID 字符串有 36 个字符。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)
- **S3-68** BIGINT 只有 8 字节，常见的 UUID 字符串有 36 个字符。主键越宽，一个索引页能容纳的记录就越少，而且所有二级索引都要保存这个主键值，也会一起变大。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)
- **S3-69** UUID 也可以用 `BINARY(16)` 保存，减少字符串存储和比较的开销；如果采用按时间有序的 UUID 方案，还可以改善插入局部性。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)
- **S3-70** 自增也不意味着完全没有页分裂或竞争，只是一般更适合 InnoDB 的写入方式。[原文§什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E8%87%AA%E5%A2%9Eid%E6%9B%B4%E5%BF%AB%E4%B8%80%E4%BA%9B-uuid%E4%B8%8D%E5%BF%AB%E5%90%97-%E5%AE%83%E5%9C%A8b-%E6%A0%91%E9%87%8C%E9%9D%A2%E5%AD%98%E5%82%A8%E6%98%AF%E6%9C%89%E5%BA%8F%E7%9A%84%E5%90%97)

### 自增主键一定连续吗？

- **S3-71** 不一定。自增保证的是自动分配 ID，不保证没有空洞。[原文§自增主键一定连续吗？](https://xiaolincoding.com/interview/mysql.html#%E8%87%AA%E5%A2%9E%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%BF%9E%E7%BB%AD%E5%90%97)
- **S3-72** 一个事务拿到了自增 ID，插入后又回滚，这个 ID 通常不会退回；插入失败、并发批量插入预分配 ID，也可能留下空洞。[原文§自增主键一定连续吗？](https://xiaolincoding.com/interview/mysql.html#%E8%87%AA%E5%A2%9E%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%BF%9E%E7%BB%AD%E5%90%97)
- **S3-73** 自增 ID 的分配顺序不等于事务提交顺序。事务 A 先拿到 100，事务 B 后拿到 101，但 B 完全可能先提交。所以，不能用「ID 连续」判断数据是否完整，也不能把 ID 顺序直接当成业务完成顺序。[原文§自增主键一定连续吗？](https://xiaolincoding.com/interview/mysql.html#%E8%87%AA%E5%A2%9E%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%BF%9E%E7%BB%AD%E5%90%97)

### Mysql中的索引是怎么实现的 ？

- **S3-74** MySQL InnoDB 引擎是用了 B+ 树作为索引的数据结构。B+Tree 是一种多叉树，叶子节点才存放数据，非叶子节点只存放索引。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-75** 每个节点里的记录都按该索引的键值有序组织：聚簇索引按主键排序，二级索引按索引列及主键值排序。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-76** 每一层父节点的索引值都会出现在下层子节点的索引值中，因此在叶子节点中，包括了所有的索引值信息，并且每一个叶子节点都有两个指针，分别指向下一个叶子节点和上一个叶子节点，形成一个双向链表。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-77** B+Tree 自顶向下逐层查找：先将 5 与根节点的索引数据 (1，10，20) 比较，5 在 1 和 10 之间，找到第二层的索引数据 (1，4，7)；在第二层中查找，5 在 4 和 7 之间，找到第三层的索引数据（4，5，6）；在叶子节点的索引数据（4，5，6）中查找，就找到了索引值为 5 的行数据。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-78** 如果这些索引页都不在 Buffer Pool 中，可以把读取一个节点近似看成一次磁盘 I/O，上面的定位过程就需要读取 3 个页。如果页已经在缓存里，就不需要为它再次读取磁盘。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-79** B+Tree 的分叉数很大，千万级数据在很多场景下只需要 3～4 层就能组织起来，所以定位一条记录需要访问的页比较少。具体高度还取决于主键宽度、记录大小和页面填充率；二级索引回表、页外数据和范围扫描也会增加访问量，不能把 3～4 次当成整条查询固定的 I/O 上限。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S3-80** 具体高度还取决于主键宽度、记录大小和页面填充率。[原文§Mysql中的索引是怎么实现的 ？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%AD%E7%9A%84%E7%B4%A2%E5%BC%95%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)

### 查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？

- **S3-81** 聚簇索引数据页中的记录按照「主键」顺序组成单向链表，单向链表的特点就是插入、删除非常方便，但是检索效率不高，最差的情况下需要遍历链表上的所有节点才能完成检索。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-82** 数据页中有一个页目录，起到记录的索引作用，就像书中针对每个章节设立的目录，想看某个章节时可以查看目录，快速找到对应的页数，数据页中的页目录就是为了能快速找到记录。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-83** 页目录创建的过程：将所有的记录划分成几个组，这些记录包括最小记录和最大记录。被标记删除、但还没有被 purge 物理清理的记录，仍可能留在页内链表中。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-84** 每个记录组的最后一条记录就是组内最大的那条记录，并且最后一条记录的头信息中会存储该组一共有多少条记录，作为 n_owned 字段。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-85** 页目录用来存储每组最后一条记录的地址偏移量，每组的地址偏移量也被称之为槽（slot），每个槽相当于指针指向了不同组的最后一个记录。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-86** 页目录就是由多个槽组成的，槽相当于分组记录的索引。因为记录是按照「主键值」从小到大排序的，所以通过槽查找记录时，可以使用二分法快速定位要查询的记录在哪个槽（哪个记录分组），定位到槽后，再遍历槽内的所有记录，找到对应的记录，无需从最小记录开始遍历整个页中的记录链表。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-87** 先二分得出槽中间位是 (0+4)/2=2，2 号槽里最大的记录为 8，因为 11 > 8，所以需要从 2 号槽后继续搜索；再二分出 2 号和 4 号槽的中间位是 (2+4)/2=3，3 号槽里最大的记录为 12，因为 11 < 12，所以主键为 11 的记录在 3 号槽里。3 号槽实际指向该组最后一条记录，也就是主键为 12 的记录；确定目标属于这一组后，从前一个槽指向的记录（主键为 8）沿单向链表向后遍历 9、10、11，就能找到目标记录。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-88** 页与页之间是双向链表，页内记录之间是单向链表。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)
- **S3-89** 二级索引页也有类似的页目录，不过记录按对应索引键排序，并不是全部按主键排序。[原文§查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？](https://xiaolincoding.com/interview/mysql.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%97%B6-%E5%88%B0%E4%BA%86b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9-%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9F%A5%E6%89%BE%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A)

### B+树的特性是什么？

- **S3-90** 所有叶子节点都在同一层，使单条记录定位经过的树层数相同，实际 I/O 延迟还要看缓存命中情况，提高了搜索效率。[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-91** 每个叶子节点都包含指向相邻叶子节点的指针，形成一个链表，由于叶子节点之间的链接，B+ 树非常适合进行范围查询和排序扫描。可以沿着叶子节点的链表顺序访问数据，而无需进行多次随机访问。[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-92** 非叶子节点仅存储键值和指向子节点的指针，不包含数据记录。这些键值用于指导搜索路径，帮助快速定位到正确的叶子节点。并且，由于非叶子节点只存放键值，当数据量比较大时，相对于 B 树，B+ 树的层高更少，查找效率也就更高。[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-93** 与 B 树不同，B+ 树的叶子节点存储实际的数据记录或指向数据记录的指针。这意味着每次搜索都会到达叶子节点，才能找到所需数据。[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-94** B+ 树在插入、删除和更新操作后会自动重新平衡，确保树的高度保持相对稳定，从而保持良好的搜索性能。[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-95** 非根的内部节点最多可以有 M 个子节点，最少可以有 ceil(M/2) 个子节点，这里的 M 是树的阶数；叶子节点没有子节点。（原文写作“每个节点……（除了根节点）”，没有限定为内部节点。）[原文§B+树的特性是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88)[核对来源：Wikipedia B+ tree](https://en.wikipedia.org/wiki/B%2B_tree)

### 说说B+树和B树的区别

- **S3-96** 在 B+ 树中，数据都存储在叶子节点上，而非叶子节点只存储索引信息；而 B 树的非叶子节点既存储索引信息也存储部分数据。[原文§说说B+树和B树的区别](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E8%AF%B4b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S3-97** B+ 树的叶子节点使用链表相连，便于范围查询和顺序访问；B 树的叶子节点没有链表连接。[原文§说说B+树和B树的区别](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E8%AF%B4b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S3-98** B+ 树的查找性能更稳定，每次查找都需要查找到叶子节点；而 B 树的查找可能会在非叶子节点找到数据，性能相对不稳定。[原文§说说B+树和B树的区别](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E8%AF%B4b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E7%9A%84%E5%8C%BA%E5%88%AB)
- **S3-99** B+ 树和 B 树的区别：B+ 树的数据都存储在叶子节点上，非叶子节点只存储索引信息；B+ 树的叶子节点使用链表相连，便于范围查询和顺序访问；B+ 树的查找性能更稳定，每次查找都需要查找到叶子节点。[原文§说说B+树和B树的区别](https://xiaolincoding.com/interview/mysql.html#%E8%AF%B4%E8%AF%B4b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E7%9A%84%E5%8C%BA%E5%88%AB)

### B+树的好处是什么？

- **S3-100** B 树和 B+ 树都是通过多叉树的方式，会将树的高度变矮，所以这两个数据结构非常适合检索存于磁盘中的数据。[原文§B+树的好处是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%A5%BD%E5%A4%84%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-101** B+ 树的非叶子节点不存放实际的记录数据，仅存放索引，因此数据量相同的情况下，相比存储即存索引又存记录的 B 树，B+ 树的非叶子节点可以存放更多的索引，因此 B+ 树可以比 B 树更「矮胖」，查询底层节点的磁盘 I/O 次数会更少。[原文§B+树的好处是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%A5%BD%E5%A4%84%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-102** B+ 树把完整记录集中在叶子节点，非叶子节点只负责导航，比较适合按页组织和缓存。插入、删除仍可能触发页分裂、合并以及父节点调整，不能认为一定比 B 树的每次操作都快。[原文§B+树的好处是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%A5%BD%E5%A4%84%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-103** B+ 树叶子节点之间用链表连接了起来，有利于范围查询，而 B 树要实现范围查询，只能通过树的遍历来完成，这会涉及多个节点的磁盘 I/O 操作，范围查询效率不如 B+ 树。[原文§B+树的好处是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%A5%BD%E5%A4%84%E6%98%AF%E4%BB%80%E4%B9%88)
- **S3-104** InnoDB 采用 B+ 树的原因：非叶子节点不存放实际的记录数据，仅存放索引，B+ 树更「矮胖」，磁盘 I/O 次数更少；完整记录集中在叶子节点，非叶子节点只负责导航，比较适合按页组织和缓存；叶子节点之间用链表连接，有利于范围查询。[原文§B+树的好处是什么？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%A5%BD%E5%A4%84%E6%98%AF%E4%BB%80%E4%B9%88)

### B+树的叶子节点链表是单向还是双向？

- **S3-105** 双向的，为了实现倒序遍历或者排序。B+ 树的叶子节点之间是用「双向链表」进行连接，这样的好处是既能向右遍历，也能向左遍历。[原文§B+树的叶子节点链表是单向还是双向？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E9%93%BE%E8%A1%A8%E6%98%AF%E5%8D%95%E5%90%91%E8%BF%98%E6%98%AF%E5%8F%8C%E5%90%91)
- **S3-106** B+ 树的节点内容是数据页，数据页里存放了用户的记录以及各种信息，每个数据页默认大小是 16 KB。[原文§B+树的叶子节点链表是单向还是双向？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E9%93%BE%E8%A1%A8%E6%98%AF%E5%8D%95%E5%90%91%E8%BF%98%E6%98%AF%E5%8F%8C%E5%90%91)
- **S3-107** InnoDB 根据索引类型不同，分为聚簇索引和二级索引。聚簇索引的叶子节点保存行数据，二级索引的叶子节点保存索引列和主键值，不保存完整行。因为表的数据都是存放在聚集索引的叶子节点里，所以 InnoDB 存储引擎一定会为表创建一个聚集索引，且由于数据在物理上只会保存一份，所以聚簇索引只能有一个，而二级索引可以创建多个。[原文§B+树的叶子节点链表是单向还是双向？](https://xiaolincoding.com/interview/mysql.html#b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E9%93%BE%E8%A1%A8%E6%98%AF%E5%8D%95%E5%90%91%E8%BF%98%E6%98%AF%E5%8F%8C%E5%90%91)

### MySQL为什么用B+树结构？和其他结构比的优点？

- **S3-108** B+Tree 的非叶子节点只保存索引键和子节点指针，而 B 树的非叶子节点还要保存数据。因此同样大小的页里，B+Tree 通常可以容纳更多导航项，让树更矮，定位记录需要访问的页更少。[原文§MySQL为什么用B+树结构？和其他结构比的优点？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8b-%E6%A0%91%E7%BB%93%E6%9E%84-%E5%92%8C%E5%85%B6%E4%BB%96%E7%BB%93%E6%9E%84%E6%AF%94%E7%9A%84%E4%BC%98%E7%82%B9)
- **S3-109** InnoDB 的 B+Tree 叶子节点用双向链表连接，范围查询找到起点后就能顺序扫描；B 树通常需要通过树的遍历获取范围内的数据。[原文§MySQL为什么用B+树结构？和其他结构比的优点？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8b-%E6%A0%91%E7%BB%93%E6%9E%84-%E5%92%8C%E5%85%B6%E4%BB%96%E7%BB%93%E6%9E%84%E6%AF%94%E7%9A%84%E4%BC%98%E7%82%B9)
- **S3-110** B+Tree 一个节点可以有很多子节点，而平衡二叉树每个节点最多只有两个子节点。相同数据量下，B+Tree 的高度通常更低，更适合以页为单位读取和缓存的磁盘存储。千万级数据的索引在很多场景下只有 3～4 层，实际磁盘 I/O 还要结合缓存命中、回表和扫描范围判断。[原文§MySQL为什么用B+树结构？和其他结构比的优点？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8b-%E6%A0%91%E7%BB%93%E6%9E%84-%E5%92%8C%E5%85%B6%E4%BB%96%E7%BB%93%E6%9E%84%E6%AF%94%E7%9A%84%E4%BC%98%E7%82%B9)
- **S3-111** Hash 做等值查询很快，平均查找复杂度接近 O(1)，不过需要处理哈希冲突，而且不适合范围查询、排序和前缀匹配。B+Tree 可以同时服务等值和范围查询，所以适用场景更广。[原文§MySQL为什么用B+树结构？和其他结构比的优点？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8b-%E6%A0%91%E7%BB%93%E6%9E%84-%E5%92%8C%E5%85%B6%E4%BB%96%E7%BB%93%E6%9E%84%E6%AF%94%E7%9A%84%E4%BC%98%E7%82%B9)
- **S3-112** 千万级数据的索引在很多场景下只有 3～4 层，实际磁盘 I/O 还要结合缓存命中、回表和扫描范围判断。[原文§MySQL为什么用B+树结构？和其他结构比的优点？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8b-%E6%A0%91%E7%BB%93%E6%9E%84-%E5%92%8C%E5%85%B6%E4%BB%96%E7%BB%93%E6%9E%84%E6%AF%94%E7%9A%84%E4%BC%98%E7%82%B9)

### 为什么 MySQL 不用跳表？

- **S3-113** B+ 树的高度在 3 层时存储的数据可能已达千万级别，但对于跳表而言同样去维护千万的数据量，所造成的跳表层数过高而导致的磁盘 I/O 次数增多，也就是使用 B+ 树在存储同样的数据下磁盘 I/O 次数更少。[原文§为什么 MySQL 不用跳表？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88-mysql-%E4%B8%8D%E7%94%A8%E8%B7%B3%E8%A1%A8)
- **S3-114** B+ 树的高度在 3 层时存储的数据可能已达千万级别。[原文§为什么 MySQL 不用跳表？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88-mysql-%E4%B8%8D%E7%94%A8%E8%B7%B3%E8%A1%A8)

### 联合索引的实现原理？

- **S3-115** 将多个字段组合成一个索引，该索引就被称为联合索引。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-116** 联合索引的非叶子节点用两个字段的值作为 B+Tree 的 key 值。当在联合索引查询数据时，先按 product_no 字段比较，在 product_no 相同的情况下再按 name 字段比较，也就是先按 product_no 排序，product_no 相同时再按 name 排序。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-117** 使用联合索引定位数据时，要关注最左匹配原则，也就是从最左边的字段开始，连续匹配索引列。跳过最左列后，通常就不能直接按后面的字段定位到一段连续的索引范围。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-118** 缺少最左边的 a 的查询条件（where b=2、where c=3、where b=2 and c=3）通常不能使用这个索引进行常规的前缀定位；where a=1、where a=1 and b=2、where a=1 and b=2 and c=3 则可以匹配上联合索引。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-119** 原因是 (a, b, c) 联合索引先按 a 排序，a 相同再按 b 排序，b 也相同再按 c 排序。所以，b 和 c 是全局无序、局部有序的。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-120** 联合索引（a，b）的 B+ Tree 中，a 是全局有序的（1, 2, 2, 3, 4, 5, 6, 7, 8），而 b 是全局无序的（12，7，8，2，3，8，10，5，2）。只有在 a 相同的情况下，b 才是有序的，比如 a 等于 2 的时候，b 的值为（7，8），这个有序状态是局部的，因此执行 where a = 2 and b = 7，a 和 b 字段能用到联合索引，也就是联合索引生效了。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-121** 直接执行 `WHERE b = 2`，通常不能像 `WHERE a = 2 AND b = 2` 那样按最左前缀定位。这里要区分「利用索引定位」和「扫描索引后过滤」，两者的查询成本并不一样。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-122** 这里说的是不能按常规最左前缀快速定位，不代表索引完全不会被读取：覆盖索引时仍可能全索引扫描，MySQL 8.0 在满足条件时还可能采用索引跳跃扫描，最终要看执行计划。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S3-123** 因为有查询优化器，所以 a 字段在 where 子句的顺序并不重要。[原文§联合索引的实现原理？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)

### 创建联合索引时需要注意什么？

- **S3-124** 先看常用 SQL 的过滤、排序和返回字段，再决定字段顺序，不能只背「区分度高的字段放前面」。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-125** 可以考虑 `(user_id, status, created_at)`：前两列是等值条件，先缩小候选范围，再按 created_at 的索引顺序获取最近的订单。虽然 status 只有几种值，放在这里仍然有作用。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-126** 创建时主要考虑几个方面：最左前缀能否复用；等值、范围和排序怎么配合；是否能覆盖查询；索引宽度和维护成本。字段越多、越长，索引越大，写入成本也越高，不是把所有列塞进去就好。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-127** 最左前缀能否复用：如果常按 user_id 单独查询，把它放前面就能同时服务这类 SQL。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-128** 等值、范围和排序怎么配合：常见做法是先安排等值条件，再结合范围条件和 ORDER BY 决定后续列，避免排序列前面还有未固定的字段。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-129** 是否能覆盖查询：二级索引自带主键值，上面的返回字段就可能直接从索引里取得。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-130** 索引宽度和维护成本：字段越多、越长，索引越大，写入成本也越高，不是把所有列塞进去就好。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
- **S3-131** 优化器是否选择索引取决于成本，没有「命中超过 30% 就一定不走索引」这种固定规则。最后通过 EXPLAIN 和实际执行情况验证。[原文§创建联合索引时需要注意什么？](https://xiaolincoding.com/interview/mysql.html#%E5%88%9B%E5%BB%BA%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E6%97%B6%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)

### 联合索引ABC，现在有个执行语句是A = XXX and C < XXX，索引怎么走

- **S3-132** 如果优化器选择 (A, B, C) 这个索引，A 的等值条件可以用于定位，但因为中间缺少 B，通常不能继续用 C 的条件缩小索引扫描范围。[原文§联合索引ABC，现在有个执行语句是A = XXX and C < XXX，索引怎么走](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95abc-%E7%8E%B0%E5%9C%A8%E6%9C%89%E4%B8%AA%E6%89%A7%E8%A1%8C%E8%AF%AD%E5%8F%A5%E6%98%AFa-xxx-and-c-xxx-%E7%B4%A2%E5%BC%95%E6%80%8E%E4%B9%88%E8%B5%B0)
- **S3-133** C 已经保存在二级索引里。如果查询需要回表，并且满足索引下推的条件，就可以先判断 C 是否符合条件，只有符合的记录才回表。[原文§联合索引ABC，现在有个执行语句是A = XXX and C < XXX，索引怎么走](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95abc-%E7%8E%B0%E5%9C%A8%E6%9C%89%E4%B8%AA%E6%89%A7%E8%A1%8C%E8%AF%AD%E5%8F%A5%E6%98%AFa-xxx-and-c-xxx-%E7%B4%A2%E5%BC%95%E6%80%8E%E4%B9%88%E8%B5%B0)
- **S3-134** 如果查询被索引覆盖，就直接在索引中完成过滤和取值。[原文§联合索引ABC，现在有个执行语句是A = XXX and C < XXX，索引怎么走](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95abc-%E7%8E%B0%E5%9C%A8%E6%9C%89%E4%B8%AA%E6%89%A7%E8%A1%8C%E8%AF%AD%E5%8F%A5%E6%98%AFa-xxx-and-c-xxx-%E7%B4%A2%E5%BC%95%E6%80%8E%E4%B9%88%E8%B5%B0)
- **S3-135** C 不能用于连续的前缀定位，不代表 C 完全没有参与查询。[原文§联合索引ABC，现在有个执行语句是A = XXX and C < XXX，索引怎么走](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95abc-%E7%8E%B0%E5%9C%A8%E6%9C%89%E4%B8%AA%E6%89%A7%E8%A1%8C%E8%AF%AD%E5%8F%A5%E6%98%AFa-xxx-and-c-xxx-%E7%B4%A2%E5%BC%95%E6%80%8E%E4%B9%88%E8%B5%B0)

### 联合索引(a,b,c) ，查询条件 where b > xxx and a = x 会生效吗

- **S3-136** a 的等值条件和 b 的范围条件符合最左匹配原则，可以利用联合索引定位扫描范围。[原文§联合索引(a,b,c) ，查询条件 where b > xxx and a = x 会生效吗](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-%E6%9F%A5%E8%AF%A2%E6%9D%A1%E4%BB%B6-where-b-xxx-and-a-x-%E4%BC%9A%E7%94%9F%E6%95%88%E5%90%97)
- **S3-137** WHERE 中先写 b 再写 a 不影响这个判断，优化器会分析条件，不是按 SQL 文本从左往右匹配。[原文§联合索引(a,b,c) ，查询条件 where b > xxx and a = x 会生效吗](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-%E6%9F%A5%E8%AF%A2%E6%9D%A1%E4%BB%B6-where-b-xxx-and-a-x-%E4%BC%9A%E7%94%9F%E6%95%88%E5%90%97)
- **S3-138** 不过最终是否选择这个索引，还要看成本估算。[原文§联合索引(a,b,c) ，查询条件 where b > xxx and a = x 会生效吗](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-%E6%9F%A5%E8%AF%A2%E6%9D%A1%E4%BB%B6-where-b-xxx-and-a-x-%E4%BC%9A%E7%94%9F%E6%95%88%E5%90%97)

### 联合索引 (a, b，c)，where条件是 a=2 and c = 1，能用到联合索引吗？

- **S3-139** 能，a = 2 符合最左前缀，可以用来定位 a 对应的索引范围。但缺少 b，c = 1 通常不能继续缩小扫描范围。[原文§联合索引 (a, b，c)，where条件是 a=2 and c = 1，能用到联合索引吗？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-where%E6%9D%A1%E4%BB%B6%E6%98%AF-a-2-and-c-1-%E8%83%BD%E7%94%A8%E5%88%B0%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-140** 如果查询需要回表，c 的条件可能通过索引下推，在读取完整记录前先过滤一部分数据。[原文§联合索引 (a, b，c)，where条件是 a=2 and c = 1，能用到联合索引吗？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-where%E6%9D%A1%E4%BB%B6%E6%98%AF-a-2-and-c-1-%E8%83%BD%E7%94%A8%E5%88%B0%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-141** 如果查询被索引覆盖，也可以直接利用索引里的 c 进行判断。具体采用哪种方式要看执行计划。[原文§联合索引 (a, b，c)，where条件是 a=2 and c = 1，能用到联合索引吗？](https://xiaolincoding.com/interview/mysql.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-a-b-c-where%E6%9D%A1%E4%BB%B6%E6%98%AF-a-2-and-c-1-%E8%83%BD%E7%94%A8%E5%88%B0%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95%E5%90%97)

### 索引失效有哪些？

- **S3-142** 面试里说的「索引失效」，通常是指查询条件没办法利用索引快速定位。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-143** `LIKE '%小林'`、`LIKE '%小林%'` 不能按普通 B+ 树索引的前缀定位，`LIKE '小林%'` 则可能使用范围扫描。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-144** 对索引列使用函数或计算，比如 `YEAR(created_at) = 2024`、`price + 1 = 10`，普通索引通常不能直接用于定位。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-145** 可以改成时间范围，或者将 `price + 1 = 10` 改写为 `price = 9`；MySQL 8.0 的函数索引也可以服务匹配的表达式。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-146** 隐式类型转换：比如 phone 是 VARCHAR，却写 `phone = 13800138000`，可能需要把索引列转换成数字再比较。应该保持参数类型和列类型一致。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-147** 缺少联合索引最左列：例如只有 (a, b, c)，却只按 b 查询，通常不能按最左前缀定位。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-148** OR 的某个分支无法利用索引：比如 a 有索引、b 没有索引，`a = 1 OR b = 2` 往往需要全表扫描。多个分支都有索引时，也可能使用 index_merge，但是否采用仍取决于成本。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-149** 常见情况有：左模糊匹配；对索引列使用函数或计算；隐式类型转换；缺少联合索引最左列；OR 的某个分支无法利用索引。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-150** 能用索引，但优化器认为全表扫描更便宜，和条件本身无法使用索引是两回事。比如查询命中大部分记录，还要大量回表，优化器可能主动选择全表扫描。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S3-151** 左模糊匹配、缺少最左列也不代表索引绝对不会被读取，仍可能存在覆盖索引全扫描或索引跳跃扫描。判断时要结合 EXPLAIN 的 key、type 和 Extra。[原文§索引失效有哪些？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%9C%89%E5%93%AA%E4%BA%9B)

### 什么是索引下推？和覆盖索引有什么区别？

- **S3-152** 索引下推，也叫 ICP，是把能够利用索引列判断的条件交给存储引擎，先过滤，再决定是否回表，减少完整行的读取次数。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S3-153** 没有索引下推时，先根据 name 找到候选记录，再逐条回表读取整行，之后判断 age 是否等于 20；有索引下推时，在二级索引里就判断 age 是否等于 20，不满足的记录直接跳过，只有满足的记录才回表。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S3-154** 执行计划中，索引下推通常表现为 `Using index condition`；覆盖索引则通常表现为 `Using index`。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S3-155** 对于 InnoDB，索引下推主要用于二级索引，因为聚簇索引本身已经拿到了完整行。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S3-156** 覆盖索引则是查询需要的列都在索引里，可以直接从索引获取，通常表现为 `Using index`。一个是减少回表次数，一个是直接从索引取得所需字段，不能把这两个 Extra 当成一个意思。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S3-157** 覆盖索引是查询需要的列都在索引里，可以直接从索引获取，通常表现为 `Using index`。[原文§什么是索引下推？和覆盖索引有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8-%E5%92%8C%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 什么情况下会回表查询

- **S3-158** 如果查询的数据不在二级索引里，就会先检索二级索引，找到对应的叶子节点，获取到主键值后，然后再检索主键索引，就能查询到数据了，这个过程就是回表。[原文§什么情况下会回表查询](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E5%9B%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S3-159** 在查询时使用了二级索引，如果查询的数据能在二级索引里查询的到，那么就不需要回表，这个过程就是覆盖索引。[原文§什么情况下会回表查询](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E5%9B%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S3-160** 二级索引的 B+Tree 叶子节点保存索引列的值和主键值，不保存完整的行数据；主键索引的叶子节点才存放实际数据。[原文§什么情况下会回表查询](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E5%9B%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
- **S3-161** 先检索二级索引，找到对应的叶子节点，获取到主键值，然后再检索主键索引，就能查询到数据了，这个过程就是回表。[原文§什么情况下会回表查询](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E5%9B%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)

### 什么是覆盖索引？

- **S3-162** 覆盖索引是指一个索引包含了查询所需的所有列，因此不需要访问表中的数据行就能完成查询。换句话说，查询所需的所有数据都能从索引中直接获取，而不需要进行回表查询。[原文§什么是覆盖索引？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95)
- **S3-163** 覆盖索引能够显著提高查询性能，因为减少了访问数据页的次数，从而减少了 I/O 操作。[原文§什么是覆盖索引？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95)
- **S3-164** idx_name_age_department 是一个覆盖索引，因为它包含了查询所需的所有列：name、age 和 department。查询所需字段可以直接从索引取得。[原文§什么是覆盖索引？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95)
- **S3-165** 对于 InnoDB，二级索引还保存了主键 id，所以查询增加 id 列通常仍然可以覆盖。如果查询增加 salary，就需要回表。[原文§什么是覆盖索引？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95)
- **S3-166** 覆盖索引说的是索引能提供所需列；锁定读、MVCC 可见性检查等情况仍可能需要访问聚簇索引记录。[原文§什么是覆盖索引？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95)

### 如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？

- **S3-167** 没有固定的优先顺序，优化器会估算成本，再选择执行计划。[原文§如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E4%B8%80%E4%B8%AA%E5%88%97%E5%8D%B3%E4%BD%BF%E5%8D%95%E5%88%97%E7%B4%A2%E5%BC%95-%E5%8F%88%E6%98%AF%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-%E5%8D%95%E7%8B%AC%E6%9F%A5%E5%AE%83%E7%9A%84%E8%AF%9D%E5%85%88%E8%B5%B0%E5%93%AA%E4%B8%AA)
- **S3-168** 第一条 `SELECT a FROM t WHERE a = 1`：两个索引都能覆盖，单列索引更小，可能成本更低。[原文§如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E4%B8%80%E4%B8%AA%E5%88%97%E5%8D%B3%E4%BD%BF%E5%8D%95%E5%88%97%E7%B4%A2%E5%BC%95-%E5%8F%88%E6%98%AF%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-%E5%8D%95%E7%8B%AC%E6%9F%A5%E5%AE%83%E7%9A%84%E8%AF%9D%E5%85%88%E8%B5%B0%E5%93%AA%E4%B8%AA)
- **S3-169** 第二条 `SELECT a, b FROM t WHERE a = 1`：联合索引可以提供 a、b，通常更有优势。[原文§如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E4%B8%80%E4%B8%AA%E5%88%97%E5%8D%B3%E4%BD%BF%E5%8D%95%E5%88%97%E7%B4%A2%E5%BC%95-%E5%8F%88%E6%98%AF%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-%E5%8D%95%E7%8B%AC%E6%9F%A5%E5%AE%83%E7%9A%84%E8%AF%9D%E5%85%88%E8%B5%B0%E5%93%AA%E4%B8%AA)
- **S3-170** 第三条 `SELECT * FROM t WHERE a = 1`：两个索引都可能需要回表，还要看统计信息、命中行数等因素。[原文§如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E4%B8%80%E4%B8%AA%E5%88%97%E5%8D%B3%E4%BD%BF%E5%8D%95%E5%88%97%E7%B4%A2%E5%BC%95-%E5%8F%88%E6%98%AF%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-%E5%8D%95%E7%8B%AC%E6%9F%A5%E5%AE%83%E7%9A%84%E8%AF%9D%E5%85%88%E8%B5%B0%E5%93%AA%E4%B8%AA)
- **S3-171** 联合索引已经能服务按 a 查询的场景时，单列索引 (a) 可能冗余，但是否删除要结合其他查询和写入成本评估，不能只看列名重复就直接删除。[原文§如果一个列即使单列索引，又是联合索引，单独查它的话先走哪个？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E4%B8%80%E4%B8%AA%E5%88%97%E5%8D%B3%E4%BD%BF%E5%8D%95%E5%88%97%E7%B4%A2%E5%BC%95-%E5%8F%88%E6%98%AF%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95-%E5%8D%95%E7%8B%AC%E6%9F%A5%E5%AE%83%E7%9A%84%E8%AF%9D%E5%85%88%E8%B5%B0%E5%93%AA%E4%B8%AA)

### 索引已经建好了，那我再插入一条数据，索引会有哪些变化？

- **S3-172** 插入新数据可能导致 B+ 树结构的调整和索引信息的更新，以保持 B+ 树的平衡性和正确性，这些变化通常由数据库系统自动处理，确保数据的一致性和索引的有效性。[原文§索引已经建好了，那我再插入一条数据，索引会有哪些变化？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%B7%B2%E7%BB%8F%E5%BB%BA%E5%A5%BD%E4%BA%86-%E9%82%A3%E6%88%91%E5%86%8D%E6%8F%92%E5%85%A5%E4%B8%80%E6%9D%A1%E6%95%B0%E6%8D%AE-%E7%B4%A2%E5%BC%95%E4%BC%9A%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%98%E5%8C%96)
- **S3-173** 如果插入的数据导致叶子节点已满，可能会触发叶子节点的分裂操作，以保持 B+ 树的平衡性。[原文§索引已经建好了，那我再插入一条数据，索引会有哪些变化？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%B7%B2%E7%BB%8F%E5%BB%BA%E5%A5%BD%E4%BA%86-%E9%82%A3%E6%88%91%E5%86%8D%E6%8F%92%E5%85%A5%E4%B8%80%E6%9D%A1%E6%95%B0%E6%8D%AE-%E7%B4%A2%E5%BC%95%E4%BC%9A%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%98%E5%8C%96)

### 索引字段是不是建的越多越好？

- **S3-174** 不是，建的越多会占用越多的空间，而且在写入频繁的场景下，对于 B+ 树的维护所付出的性能消耗也会越大。[原文§索引字段是不是建的越多越好？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%AD%97%E6%AE%B5%E6%98%AF%E4%B8%8D%E6%98%AF%E5%BB%BA%E7%9A%84%E8%B6%8A%E5%A4%9A%E8%B6%8A%E5%A5%BD)
- **S3-175** 建得越多会占用越多的空间，而且在写入频繁的场景下，对于 B+ 树的维护所付出的性能消耗也会越大。[原文§索引字段是不是建的越多越好？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E5%AD%97%E6%AE%B5%E6%98%AF%E4%B8%8D%E6%98%AF%E5%BB%BA%E7%9A%84%E8%B6%8A%E5%A4%9A%E8%B6%8A%E5%A5%BD)

### 如果有一个字段是status值为0或者1，适合建索引吗

- **S3-176** 要看数据分布和查询方式，不能只因为只有 0、1 两种值就否定索引。[原文§如果有一个字段是status值为0或者1，适合建索引吗](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AE%B5%E6%98%AFstatus%E5%80%BC%E4%B8%BA0%E6%88%96%E8%80%851-%E9%80%82%E5%90%88%E5%BB%BA%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-177** 比如订单表里，99.9% 的订单已经处理，只有 0.1% 待处理。后台经常查询 `WHERE status = 0` 获取少量待处理订单，索引就可能有效。[原文§如果有一个字段是status值为0或者1，适合建索引吗](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AE%B5%E6%98%AFstatus%E5%80%BC%E4%B8%BA0%E6%88%96%E8%80%851-%E9%80%82%E5%90%88%E5%BB%BA%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-178** 如果经常查询某个用户的订单，可以考虑 `(user_id, status)`；如果按状态取最近的订单，可以结合查询建立 `(status, created_at)`。[原文§如果有一个字段是status值为0或者1，适合建索引吗](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AE%B5%E6%98%AFstatus%E5%80%BC%E4%B8%BA0%E6%88%96%E8%80%851-%E9%80%82%E5%90%88%E5%BB%BA%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-179** 反过来，如果 0、1 各占一半，查询还要 SELECT *，大量回表就可能比全表扫描更贵，这时单列索引通常收益不大。[原文§如果有一个字段是status值为0或者1，适合建索引吗](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C%E6%9C%89%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AE%B5%E6%98%AFstatus%E5%80%BC%E4%B8%BA0%E6%88%96%E8%80%851-%E9%80%82%E5%90%88%E5%BB%BA%E7%B4%A2%E5%BC%95%E5%90%97)

### 索引的优缺点？

- **S3-180** 索引最大的好处是提高查询速度。[原文§索引的优缺点？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)
- **S3-181** 索引的缺点：需要占用物理空间，数量越大，占用空间越大；创建索引和维护索引要耗费时间，这种时间随着数据量的增加而增大；会降低表的增删改的效率。[原文§索引的优缺点？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)
- **S3-182** 会降低表的增删改的效率，因为每次增删改索引，B+ 树为了维护索引有序性，都需要进行动态维护。[原文§索引的优缺点？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)
- **S3-183** 索引的缺点：需要占用物理空间；创建索引和维护索引要耗费时间；会降低表的增删改的效率。所以索引不是万能钥匙，也是根据场景来使用的。[原文§索引的优缺点？](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)

### 怎么决定建立哪些索引?

- **S3-184** 适用索引的情况：字段有唯一性限制的，比如商品编码；经常用于 WHERE 查询条件的字段，如果查询条件不是一个字段，可以建立联合索引；经常用于 GROUP BY 和 ORDER BY 的字段。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-185** 经常用于 WHERE 查询条件的字段，这样能够提高整个表的查询速度，如果查询条件不是一个字段，可以建立联合索引。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-186** 经常用于 GROUP BY 和 ORDER BY 的字段，合适的索引顺序有机会减少排序或分组开销，因为我们都已经知道了建立索引之后在 B+Tree 中的记录都是排序好的。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-187** 不需要创建索引的情况：WHERE 条件、GROUP BY、ORDER BY 里用不到的字段；字段区分度低、查询命中比例高，并且需要大量回表时，单列索引通常收益不大；表数据太少的时候；经常更新、但很少参与过滤或排序的字段。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-188** WHERE 条件，GROUP BY，ORDER BY 里用不到的字段，索引的价值是快速定位，如果起不到定位的字段通常是不需要创建索引的，因为索引是会占用物理空间的。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-189** 字段区分度低、查询命中比例高，并且需要大量回表时，单列索引通常收益不大。但查询少数值、覆盖查询或组成合适的联合索引时，仍可能有效。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)
- **S3-190** 经常更新、但很少参与过滤或排序的字段，通常不值得建立索引。频繁更新会增加索引维护和日志开销，不过如果它承担关键查询，也需要权衡读写成本，不能一概不建。[原文§怎么决定建立哪些索引?](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E5%86%B3%E5%AE%9A%E5%BB%BA%E7%AB%8B%E5%93%AA%E4%BA%9B%E7%B4%A2%E5%BC%95)

### 索引优化详细讲讲

- **S3-191** 根据实际 SQL 设计联合索引：把过滤条件、排序和返回字段一起考虑，利用最左前缀，不要只按字段区分度排序。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-192** 覆盖索引优化：查询只取需要的列，尽量让高频查询从二级索引直接得到所需字段，减少回表。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-193** 前缀索引优化：对很长的字符串只建立前缀索引，节省空间，但要在前缀长度和区分度之间做取舍。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-194** 主键尽量短小、稳定、递增：减少聚簇索引随机插入的成本，也减少二级索引存储主键的开销。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-195** 让条件便于使用索引：避免对普通索引列做不必要的函数、计算和隐式类型转换，时间条件优先写成范围。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-196** 清理重复和低收益索引：减少磁盘占用和增删改时的维护成本，删除前需要确认没有影响其他查询。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-197** 最后用 EXPLAIN 和实际执行情况验证，关注扫描行数、回表次数、排序和耗时。不能只看 key 有值，就认为优化成功了。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)
- **S3-198** 最后用 EXPLAIN 和实际执行情况验证，关注扫描行数、回表次数、排序和耗时。[原文§索引优化详细讲讲](https://xiaolincoding.com/interview/mysql.html#%E7%B4%A2%E5%BC%95%E4%BC%98%E5%8C%96%E8%AF%A6%E7%BB%86%E8%AE%B2%E8%AE%B2)

### 了解过前缀索引吗？

- **S3-199** 前缀索引就是只取字符串前面一部分建立索引，比如邮箱比较长，可以先对前 20 个字符建索引：`CREATE INDEX idx_email_prefix ON users(email(20));`[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-200** 这样索引更小，一个页里可以放下更多索引项。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-201** 如果很多邮箱前 20 个字符相同，就需要扫描更多候选记录，再检查完整值，所以前缀长度不能只图短。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-202** 可以比较完整值和不同长度前缀的区分度，选择一个尽量接近完整值区分度的长度。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-203** 前缀索引不能直接提供完整字符串，也不能保证按完整字符串排序。如果查询要返回 email 完整值，仍需要读取完整记录。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-204** 唯一前缀索引限制的也是前缀唯一，可能把前缀相同、完整值不同的两条记录当成冲突。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)
- **S3-205** 前缀索引不能直接提供完整字符串，也不能保证按完整字符串排序；唯一前缀索引限制的也是前缀唯一，可能把前缀相同、完整值不同的两条记录当成冲突。[原文§了解过前缀索引吗？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%86%E8%A7%A3%E8%BF%87%E5%89%8D%E7%BC%80%E7%B4%A2%E5%BC%95%E5%90%97)

## 4. 事务

原文：[MySQL面试题 · 事务](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1)。

### 事务的特性是什么？如何实现的？

- **S4-1** 事务的四大特性是原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability）。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-2** 原子性指事务中的修改要么整体提交，要么整体回滚，不会只提交其中一部分，就像买商品：购买成功时钱付给商家、商品到手；购买失败并回滚时，商品还在商家手中、钱也没花出去。不过，单条 SQL 报错不一定自动回滚整个事务，应用仍需要正确处理失败。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-3** 一致性是指事务操作前和操作后，数据满足完整性约束，数据库保持一致性状态。例如 A 有 800 元、B 有 600 元，共 1400 元，A 给 B 转账 200 元分为扣款和入账两步，一致性要求最终 A 还有 600 元、B 有 800 元，总共仍是 1400 元，而不会出现 A 扣了 200 元、B 却没增加（二人均为 600 元，总共 1200 元）的情况。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-4** 隔离性是控制并发事务之间能看到哪些数据，以及冲突操作如何执行；实际隔离程度取决于隔离级别，并不是给每个事务分配一份独立数据库。比如多个消费者同时购买最后一件商品，就需要通过锁或条件更新处理竞争。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-5** InnoDB 中，持久性通过 redo log（重做日志）保证，原子性通过 undo log（回滚日志）保证，隔离性通过 MVCC（多版本并发控制）或锁机制保证。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-6** 一致性需要事务相关机制、数据库约束和正确的业务逻辑一起保证。比如转账时扣款和入账金额写错了，即使事务正常提交，也不能保证业务一致性。[原文§事务的特性是什么？如何实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E7%89%B9%E6%80%A7%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)

### mysql可能出现什么和并发相关问题？

- **S4-7** 同时处理多个事务时，可能出现脏读（dirty read）、不可重复读（non-repeatable read）和幻读（phantom read）。[原文§mysql可能出现什么和并发相关问题？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E4%BB%80%E4%B9%88%E5%92%8C%E5%B9%B6%E5%8F%91%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)
- **S4-8** 如果一个事务读到了另一个未提交事务修改过的数据，就发生了脏读。例如事务 A 更新了小林的余额但还没提交，事务 B 读到了更新后的余额；A 随时可能回滚，一旦回滚，B 刚才得到的数据就是过期数据。[原文§mysql可能出现什么和并发相关问题？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E4%BB%80%E4%B9%88%E5%92%8C%E5%B9%B6%E5%8F%91%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)
- **S4-9** 在一个事务内多次读取同一个数据，如果前后两次读到的数据不一样，就是不可重复读。例如事务 A 先读取小林的余额，期间事务 B 更新了这条数据并提交，A 再次读取时就会发现前后两次的数据不一致。[原文§mysql可能出现什么和并发相关问题？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E4%BB%80%E4%B9%88%E5%92%8C%E5%B9%B6%E5%8F%91%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)
- **S4-10** 一个事务重复查询同一个条件，发现符合条件的记录集合因为其他事务的修改而发生变化，就叫幻读。常见表现是多了或少了记录，不过不只是比较 COUNT：即使数量相同，符合条件的记录被换成了另一批，也可能出现问题。[原文§mysql可能出现什么和并发相关问题？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E4%BB%80%E4%B9%88%E5%92%8C%E5%B9%B6%E5%8F%91%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)
- **S4-11** 事务 A 先查询账户余额大于 100 万的记录，发现共 5 条，事务 B 按相同条件也查到 5 条；接着 A 插入一条余额超过 100 万的账号并提交，此时满足条件的账号变为 6 个；B 再次查询时得到 6 条，和前一次读到的数量不一样，就像发生了幻觉一样，这种现象就叫幻读。[原文§mysql可能出现什么和并发相关问题？](https://xiaolincoding.com/interview/mysql.html#mysql%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E4%BB%80%E4%B9%88%E5%92%8C%E5%B9%B6%E5%8F%91%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)

### 哪些场景不适合脏读，举个例子？

- **S4-12** 脏读可能导致读到不一致的数据。银行系统中，账户余额正在被调整但尚未提交时，另一个事务读到这个临时余额，可能让客户看到不正确的余额；库存管理系统中，商品数量正在更新但尚未提交时被读到，可能导致库存管理错误；在线订单系统中，订单正在修改但尚未提交时被读到，可能导致订单状态显示错误、客户收到不准确的信息。在这些场景中脏读可能导致严重问题，应该避免，以保证数据的一致性和准确性。[原文§哪些场景不适合脏读，举个例子？](https://xiaolincoding.com/interview/mysql.html#%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8D%E9%80%82%E5%90%88%E8%84%8F%E8%AF%BB-%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90)

### mysql的是怎么解决并发问题的？

- **S4-13** MySQL 解决并发问题的三种手段是锁机制、事务隔离级别和 MVCC（多版本并发控制）。[原文§mysql的是怎么解决并发问题的？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98%E7%9A%84)
- **S4-14** 锁机制主要包括行级锁（InnoDB 支持）和表级锁（InnoDB 和 MyISAM 都支持）。网上常提到的“页级锁”是已移除的 BDB 存储引擎的特性，InnoDB、MyISAM 都不提供页级锁。[原文§mysql的是怎么解决并发问题的？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98%E7%9A%84)
- **S4-15** 通过锁机制可以控制冲突操作的执行顺序，但并不是所有访问都只能排队：多个共享锁可以共存，普通快照读通常也不会被记录的排他锁阻塞。[原文§mysql的是怎么解决并发问题的？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98%E7%9A%84)
- **S4-16** 事务隔离级别：MySQL 提供读未提交、读已提交、可重复读和串行化等隔离级别，设置合适的级别可以在多个事务并发执行时控制事务之间的隔离程度，避免数据不一致。MVCC（多版本并发控制）：通过在数据库中保存不同版本的数据来实现不同事务之间的隔离，读取数据时会根据事务的隔离级别选择合适的数据版本，从而保证数据的一致性。[原文§mysql的是怎么解决并发问题的？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98%E7%9A%84)

### 事务的隔离级别有哪些？

- **S4-17** 四种隔离级别是读未提交（read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（serializable）。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-18** 读未提交（read uncommitted）指一个事务还没提交时，它做的变更就能被其他事务看到；读提交（read committed）指一个事务提交之后，它做的变更才能被其他事务看到。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-19** 可重复读指同一个事务中的普通快照读复用同一个快照，通常在第一次快照读时建立，后续不会因为其他事务提交就改变；它是 MySQL InnoDB 引擎的默认隔离级别。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-20** 串行化会对记录加上读写锁，在多个事务对这条记录进行读写操作时，如果发生读写冲突，后访问的事务必须等前一个事务执行完成，才能继续执行。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-21** 读未提交下，可能发生脏读、不可重复读和幻读；读提交下，可能发生不可重复读和幻读，但不可能发生脏读；串行化下，脏读、不可重复读和幻读都不可能发生。可重复读的情况见下一题。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-22** 按 SQL 标准，可重复读仍允许幻读；不过 MySQL InnoDB 在普通快照读中通过 MVCC 保持同一快照，在范围锁定读中通过间隙锁、next-key lock 阻止插入。混用快照读与当前读时，还需要区分两种读的可见范围。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-23** 在读提交隔离级别下，事务 B 修改余额后因为没有提交，事务 A 中余额 V1 的值还是 100 万；等 B 提交后，最新的余额数据才能被 A 看见，因此 V2、V3 都是 200 万。（对照：读未提交下 B 未提交的修改就能被 A 看见，V1、V2、V3 都是 200 万。）[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-24** 在串行化隔离级别下，事务 B 在把余额从 100 万修改为 200 万时，由于此前事务 A 执行了读操作，发生了读写冲突，于是 B 会被锁住，直到 A 提交后才可以继续执行。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-25** 在可重复读隔离级别下，假设事务 A 在 B 修改前已经建立快照，普通查询的 V1、V2 都是 100 万。A 提交后，在新的查询事务中建立新快照，就能看到 B 已提交的 200 万。单独执行 BEGIN 并不意味着马上建立快照。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-26** 读未提交可以读到未提交事务修改的数据，所以直接读取最新的数据；串行化通过加锁让冲突的读写互相等待，访问不冲突的数据仍然可以并发；读提交和可重复读通过 Read View 实现。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-27** 两者的区别在于创建 Read View 的时机不同：读提交通常在每条普通 SELECT 的一致性读开始时创建新的 Read View；可重复读通常在事务第一次一致性读时创建，后续一致性读复用。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)
- **S4-28** 在可重复读下，START TRANSACTION WITH CONSISTENT SNAPSHOT 可以在开启事务时建立快照。这里说的是快照读，UPDATE、DELETE 和锁定读不能套用这个规则。[原文§事务的隔离级别有哪些？](https://xiaolincoding.com/interview/mysql.html#%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%9C%89%E5%93%AA%E4%BA%9B)

### mysql默认级别是什么？

- **S4-29** MySQL InnoDB 默认是可重复读，也就是 REPEATABLE READ。实际环境可能修改过，所以要以当前会话查到的为准。[原文§mysql默认级别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E9%BB%98%E8%AE%A4%E7%BA%A7%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S4-30** 可以执行 SELECT @@transaction_isolation; 查看当前会话的隔离级别。[原文§mysql默认级别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E9%BB%98%E8%AE%A4%E7%BA%A7%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **S4-31** MySQL 默认开启 autocommit。如果没有显式开启事务，每条 SQL 通常都是一个独立事务，多次 SELECT 也就不一定共用同一个快照。[原文§mysql默认级别是什么？](https://xiaolincoding.com/interview/mysql.html#mysql%E9%BB%98%E8%AE%A4%E7%BA%A7%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### 可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？

- **S4-32** 要看 B 有没有建立快照，以及使用的是快照读还是当前读。[原文§可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？](https://xiaolincoding.com/interview/mysql.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8B-a%E4%BA%8B%E5%8A%A1%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%9C%A8b%E4%BA%8B%E5%8A%A1%E8%83%BD%E7%9C%8B%E8%A7%81%E5%90%97)
- **S4-33** B 已经建立快照并继续普通 SELECT 时，如果 A 在快照建立后才提交，B 通常看不到 A 的修改，而是沿 undo 版本链读取快照可见的旧版本。[原文§可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？](https://xiaolincoding.com/interview/mysql.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8B-a%E4%BA%8B%E5%8A%A1%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%9C%A8b%E4%BA%8B%E5%8A%A1%E8%83%BD%E7%9C%8B%E8%A7%81%E5%90%97)
- **S4-34** 如果 B 只是执行了 BEGIN，还没有快照读，而 A 在 B 第一次快照读前已经提交，那么 B 建立快照时就可以看到 A 的数据。[原文§可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？](https://xiaolincoding.com/interview/mysql.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8B-a%E4%BA%8B%E5%8A%A1%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%9C%A8b%E4%BA%8B%E5%8A%A1%E8%83%BD%E7%9C%8B%E8%A7%81%E5%90%97)
- **S4-35** B 使用 SELECT ... FOR UPDATE 等当前读时，不会复用普通 SELECT 的旧快照，而是读取并锁定当前记录；遇到未提交事务持有冲突锁时会等待。[原文§可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？](https://xiaolincoding.com/interview/mysql.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8B-a%E4%BA%8B%E5%8A%A1%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%9C%A8b%E4%BA%8B%E5%8A%A1%E8%83%BD%E7%9C%8B%E8%A7%81%E5%90%97)
- **S4-36** 不能只根据“B 比 A 先开启事务”，就断言 B 一定看不到 A 的提交；要看 B 有没有建立快照，以及用的是快照读还是当前读。另外，B 自己修改过的数据对自己可见。[原文§可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？](https://xiaolincoding.com/interview/mysql.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8B-a%E4%BA%8B%E5%8A%A1%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%9C%A8b%E4%BA%8B%E5%8A%A1%E8%83%BD%E7%9C%8B%E8%A7%81%E5%90%97)

### 举个例子说可重复读下的幻读问题

- **S4-37** 普通快照读复用同一个 Read View，可以避免其他事务插入记录导致两次快照查询结果变化；不过混用快照读和当前读，还可能出现看起来像幻读的现象。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)
- **S4-38** 事务 A 先 begin，并查询 id = 5 的记录，此时表中没有该记录，查不出来；事务 B 插入 id = 5 的记录并提交；事务 A 再对 id = 5 的记录执行 update，由于 UPDATE 使用当前读，能更新 B 已经提交的记录；更新后，A 再用普通 select 查询就能看到这条记录，于是出现了前一次查询没有、后一次却有的现象，这就是幻读。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)
- **S4-39** 事务 A 虽然在旧快照里看不到 id = 5，但 UPDATE 使用的是当前读，所以能更新 B 已经提交的记录。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)
- **S4-40** 更新后，这个新版本属于 A 自己，这条记录的 trx_id 隐藏列的值变成了事务 A 的事务 id，所以后续普通 SELECT 就可以看到。这个例子的关键是 UPDATE 使用当前读，而且事务始终能看到自己的修改，不是 Read View 在中途自动更新了。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)
- **S4-41** 如果 A 不执行 UPDATE，只是再次做相同的普通 SELECT，仍然看不到 B 后插入的记录。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)
- **S4-42** 如果第一次是普通 SELECT，第二次改成 SELECT ... FOR UPDATE，也可能因为两种读的语义不同而看到不同的记录集合。需要先查询、再依据结果修改的业务，通常应从一开始就使用合适的锁定读或条件更新。[原文§举个例子说可重复读下的幻读问题](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BE%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%AF%B4%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E4%B8%8B%E7%9A%84%E5%B9%BB%E8%AF%BB%E9%97%AE%E9%A2%98)

### Mysql 设置了可重读隔离级后，怎么保证不发生幻读？

- **S4-43** 只做普通快照读时，在同一个可重复读事务里复用 Read View，就不会因为其他事务插入记录，让相同条件的快照查询突然多出记录。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)
- **S4-44** 需要先查后改、阻止条件范围内出现新记录时，在显式事务中从第一次查询就使用 SELECT ... FOR UPDATE 等锁定读。InnoDB 会根据索引扫描范围加记录锁、间隙锁或 next-key lock，锁一直持有到事务结束。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)
- **S4-45** InnoDB 会根据索引扫描范围加记录锁、间隙锁或 next-key lock，锁一直持有到事务结束。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)
- **S4-46** 例子中给 balance 建索引后，在显式事务里用 SELECT ... FOR UPDATE 查询余额区间并处理。这里锁的是实际扫描的索引范围，有时比 WHERE 表达的范围更大。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)
- **S4-47** 如果是唯一索引的等值查询，并且记录存在，就可能退化成记录锁，并不是所有 FOR UPDATE 都加 next-key lock。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)
- **S4-48** 缺少合适索引时，加锁范围还可能明显扩大。[原文§Mysql 设置了可重读隔离级后，怎么保证不发生幻读？](https://xiaolincoding.com/interview/mysql.html#mysql-%E8%AE%BE%E7%BD%AE%E4%BA%86%E5%8F%AF%E9%87%8D%E8%AF%BB%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%90%8E-%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E5%8F%91%E7%94%9F%E5%B9%BB%E8%AF%BB)

### 串行化隔离级别是通过什么实现的？

- **S4-49** 对于 InnoDB，在 SERIALIZABLE 隔离级别下，如果是显式多语句事务，普通 SELECT 会隐式变成类似 SELECT ... FOR SHARE 的锁定读，通过共享记录锁或 next-key lock 与其他事务的写操作形成互斥。[原文§串行化隔离级别是通过什么实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%B2%E8%A1%8C%E5%8C%96%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%98%AF%E9%80%9A%E8%BF%87%E4%BB%80%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-50** 事务 A 读了一段记录，事务 B 想修改这些记录，或者向被锁住的间隙插入，就需要等待 A 结束。这种方式可以阻止不可重复读和幻读，但锁竞争也会更多。[原文§串行化隔离级别是通过什么实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%B2%E8%A1%8C%E5%8C%96%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%98%AF%E9%80%9A%E8%BF%87%E4%BB%80%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-51** 如果开启 autocommit，并且 SELECT 自己就是一个只读事务，InnoDB 可以用非锁定一致性读完成。[原文§串行化隔离级别是通过什么实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%B2%E8%A1%8C%E5%8C%96%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%98%AF%E9%80%9A%E8%BF%87%E4%BB%80%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)
- **S4-52** 串行化也不等于整个数据库只能执行一个事务，不冲突的数据操作仍然可以并发。[原文§串行化隔离级别是通过什么实现的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%B2%E8%A1%8C%E5%8C%96%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E6%98%AF%E9%80%9A%E8%BF%87%E4%BB%80%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84)

### 介绍MVCC实现原理

- **S4-53** MVCC 通过数据的多个版本，让普通快照读和写操作尽量不互相阻塞。读取时不一定取最新版本，而是根据 Read View 判断哪个版本对当前事务可见。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-54** MVCC 的核心是“隐藏字段 + undo 版本链 + Read View”。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-55** MVCC 的核心是隐藏字段、undo 版本链和 Read View，不是在开启事务时把整张表复制一份。读提交和可重复读都用 MVCC，不过快照的创建时机不同：读提交是每条普通 SELECT 的一致性读开始时创建新的 Read View，可重复读通常在第一次一致性读时创建 Read View，后续快照读复用，锁定读不复用这个快照。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-56** Read View 的四个重要字段是 m_ids、min_trx_id、max_trx_id 和 creator_trx_id。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-57** m_ids 是创建 Read View 时当前数据库中“活跃事务”的事务 id 列表，注意是一个列表，关注的是已经分配事务 ID、但还没提交的读写事务，只读事务不一定分配这种事务 ID；max_trx_id 并不是 m_ids 的最大值，而是创建 Read View 时应该给下一个事务的 id 值，也就是全局最大事务 id + 1；creator_trx_id 是创建该 Read View 的事务的事务 id。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-58** min_trx_id 指创建 Read View 时当前数据库中“活跃事务”中事务 id 最小的事务，通常是 m_ids 的最小值；如果没有其他活跃读写事务，这个边界与 max_trx_id 相同。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-59** 与 MVCC 相关的两个隐藏列是 trx_id 和 roll_pointer：事务对某条聚簇索引记录进行改动时，会把该事务的事务 id 记录在 trx_id 隐藏列里；roll_pointer 是指向每一个旧版本记录的指针。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-60** 每次对某条聚簇索引记录进行改动时，都会把旧版本的记录写入到 undo 日志中，roll_pointer 这个隐藏列是个指针，指向每一个旧版本记录，于是可以通过它找到修改前的记录。这里的旧版本通常是通过 undo 中的回滚信息重建出来的，不一定是每次修改都复制一份完整行。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-61** 事务自己的更新记录总是可见；对其他事务生成的版本，如果记录的 trx_id 值小于 Read View 中的 min_trx_id 值，表示这个版本的记录是在创建 Read View 前已经提交的事务生成的，所以该版本对当前事务可见。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-62** 事务自己的更新记录总是可见；对其他事务生成的版本，如果记录的 trx_id 值大于等于 Read View 中的 max_trx_id 值，表示这个版本来自创建 Read View 后才分配事务 ID 的事务，所以该版本对当前事务不可见。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-63** 如果记录的 trx_id 值在 min_trx_id 和 max_trx_id 之间，需要判断 trx_id 是否在 m_ids 列表中：在，表示这个事务在创建 Read View 时还没有提交，该版本不可见，即使它后来提交了，也不会改变这个旧 Read View 的判断；不在，表示这个事务在创建 Read View 前已经提交，该版本可见。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-64** 一个事务去访问记录的时候，除了自己的更新记录总是可见之外，才需要按 trx_id 与 Read View 的关系判断可见性。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-65** 如果当前版本不可见，就沿 roll_pointer 找到 undo 中的旧版本，再按相同规则判断，直到找到可见版本或确认这条记录对当前快照不存在。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- **S4-66** 这种通过“版本链”来控制并发事务访问同一个记录时行为的机制就叫 MVCC（多版本并发控制）。它的核心是隐藏字段 + undo 版本链 + Read View：记录的 trx_id 隐藏列记录最近改动它的事务 id，roll_pointer 指向 undo 中的旧版本，构成版本链；读提交和可重复读通过 Read View 判断哪个版本可见（Read View 有 m_ids、min_trx_id、max_trx_id、creator_trx_id 四个字段），二者区别在于创建 Read View 的时机不同；版本不可见时就沿版本链找旧版本，直到找到可见版本。[原文§介绍MVCC实现原理](https://xiaolincoding.com/interview/mysql.html#%E4%BB%8B%E7%BB%8Dmvcc%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)

### 快照读和当前读有什么区别？

- **S4-67** 快照读读取的是 Read View 可见的数据版本，当前读读取的是当前记录，并根据操作加锁。[原文§快照读和当前读有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%92%8C%E5%BD%93%E5%89%8D%E8%AF%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S4-68** 在读提交、可重复读下，普通 SELECT 通常是快照读，通过 MVCC 获取可见版本，不会因为别的事务给记录加了排他锁就一定等待。[原文§快照读和当前读有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%92%8C%E5%BD%93%E5%89%8D%E8%AF%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S4-69** SELECT ... FOR UPDATE、SELECT ... FOR SHARE，以及 UPDATE、DELETE 等属于当前读相关操作；读提交、可重复读下的普通 SELECT 通常是快照读。[原文§快照读和当前读有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%92%8C%E5%BD%93%E5%89%8D%E8%AF%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S4-70** 当前读如果遇到其他事务持有冲突锁，需要等待，不能直接绕过锁读未提交的修改。[原文§快照读和当前读有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%92%8C%E5%BD%93%E5%89%8D%E8%AF%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S4-71** A 在可重复读事务中通过普通 SELECT 读到余额 100，B 把余额改成 200 并提交后，A 再做普通 SELECT 仍然可能看到 100；但 A 执行 UPDATE accounts SET balance = balance + 10 WHERE id = 1 是基于当前的 200 更新，结果是 210，不是 110。所以判断可重复读下的查询和更新行为时，一定要先说明用的是哪一种读。[原文§快照读和当前读有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BF%AB%E7%85%A7%E8%AF%BB%E5%92%8C%E5%BD%93%E5%89%8D%E8%AF%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 有了事务，为什么还会出现丢失更新？

- **S4-72** 因为单条 UPDATE 虽然会加锁，但“先读到应用里，再计算，最后写回”不一定是一个受保护的整体。不能把 UPDATE 执行时的行锁，理解成之前普通 SELECT 的结果也自动受到了保护。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-73** 库存原来是 10，两个请求都用普通 SELECT 读到 10，各自在应用里减 1，然后执行 UPDATE products SET stock = 9 WHERE id = 1。两次 UPDATE 可以先后成功，但最终库存还是 9，相当于丢了一次扣减。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-74** 常见的处理方式有三种：原子条件更新、悲观锁和乐观锁。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-75** 原子条件更新是直接让数据库基于当前值计算，比如 SET stock = stock - 1 WHERE stock > 0。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-76** 悲观锁是在同一个事务里先 SELECT ... FOR UPDATE，拿到锁后再计算和更新。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-77** 乐观锁是增加 version 字段，更新时同时检查原版本，例如 UPDATE products SET stock = stock - 1, version = version + 1 WHERE id = 1 AND version = 5 AND stock > 0。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-78** 影响行数为 1，说明更新成功；为 0，说明版本变化或库存条件不满足，应用需要重新判断。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)
- **S4-79** 不能把 UPDATE 执行时的行锁，理解成之前普通 SELECT 的结果也自动受到了保护。[原文§有了事务，为什么还会出现丢失更新？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86%E4%BA%8B%E5%8A%A1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%A2%E5%A4%B1%E6%9B%B4%E6%96%B0)

### 如何用 MySQL 扣减库存，避免超卖？

- **S4-80** 用一条带条件的 UPDATE 完成扣减，把“库存足够”写进 WHERE 条件，让数据库基于当前库存判断。

  ```sql
  UPDATE products
  SET stock = stock - 1
  WHERE id = 100 AND stock > 0;
  ```

  要点：InnoDB 更新时会锁住对应记录，多个事务的扣减按锁的顺序执行，并根据当前库存判断 stock > 0，库存只剩 1 时第一个事务扣成 0，后面的事务就不满足条件；应用要检查影响行数，1 表示扣减成功，0 表示库存不足或商品不存在，不能只看 SQL 有没有报错；如果扣减数量是 n，要保证 n 大于 0，并写成 stock = stock - n WHERE stock >= n。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)
- **S4-81** InnoDB 更新时会锁住对应记录，多个事务的扣减会按锁的顺序执行，并根据当前库存判断是否满足 stock > 0。库存只剩 1 时，第一个事务扣成 0，后面的事务就不能再满足条件。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)
- **S4-82** 应用需要检查影响行数：1 表示扣减成功，0 表示库存不足或商品不存在。不能只看 SQL 有没有报错。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)
- **S4-83** 如果扣减数量是 n，还要保证 n 大于 0，并写成 stock = stock - n WHERE stock >= n。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)
- **S4-84** 如果还需要创建订单，就把库存扣减和订单写入放到同一个事务，任一步失败都回滚。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)
- **S4-85** 同时给业务请求或订单号建立唯一约束，避免请求重试重复扣库存。数据库的条件更新能防止库存变负数，业务幂等还需要单独保证。[原文§如何用 MySQL 扣减库存，避免超卖？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E4%BD%95%E7%94%A8-mysql-%E6%89%A3%E5%87%8F%E5%BA%93%E5%AD%98-%E9%81%BF%E5%85%8D%E8%B6%85%E5%8D%96)

### 一条update是不是原子性的？为什么？

- **S4-86** 对于 InnoDB，普通的一条 UPDATE 是事务中的原子操作，即使影响多行，也不能只提交其中一部分修改。[原文§一条update是不是原子性的？为什么？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%80%E6%9D%A1update%E6%98%AF%E4%B8%8D%E6%98%AF%E5%8E%9F%E5%AD%90%E6%80%A7%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S4-87** 如果语句执行失败需要撤销修改，可以通过 undo 恢复更新前的状态，这是原子性的核心；更新时加排他锁，让其他冲突的更新等待，负责并发控制，但锁本身不是实现回滚的机制。[原文§一条update是不是原子性的？为什么？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%80%E6%9D%A1update%E6%98%AF%E4%B8%8D%E6%98%AF%E5%8E%9F%E5%AD%90%E6%80%A7%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S4-88** 开启 autocommit 时，一条 UPDATE 通常就是一个独立事务；在显式事务中，UPDATE 执行成功还不等于整个事务已经提交。[原文§一条update是不是原子性的？为什么？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%80%E6%9D%A1update%E6%98%AF%E4%B8%8D%E6%98%AF%E5%8E%9F%E5%AD%90%E6%80%A7%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S4-89** 一条语句报错，不代表整个多语句事务已经自动回滚：普通重复键错误通常只回滚当前语句；死锁会回滚被选中的整个事务；锁等待超时默认通常只回滚当前语句。[原文§一条update是不是原子性的？为什么？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%80%E6%9D%A1update%E6%98%AF%E4%B8%8D%E6%98%AF%E5%8E%9F%E5%AD%90%E6%80%A7%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88)
- **S4-90** 应用要根据错误处理，必要时主动 ROLLBACK，不能失败后继续提交前面的修改。[原文§一条update是不是原子性的？为什么？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%80%E6%9D%A1update%E6%98%AF%E4%B8%8D%E6%98%AF%E5%8E%9F%E5%AD%90%E6%80%A7%E7%9A%84-%E4%B8%BA%E4%BB%80%E4%B9%88)

### 滥用事务，或者一个事务里有特别多sql的弊端？

- **S4-91** 问题主要在于事务持有锁和旧版本的时间太长，不只是 SQL 数量多。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-92** 写事务长时间占有记录锁，其他更新容易等待、超时，交叉加锁还可能出现死锁。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-93** 大量修改会产生很多 undo；长时间持有旧快照的读事务，即使自己不更新，也可能阻碍旧版本清理，增加空间和版本链遍历成本。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-94** 大事务的 binlog 和 undo 较多，提交的成本高，出错后回滚也可能耗时很长。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-95** 从库需要应用已经提交的事务，大事务提交后可能产生大量回放工作，也会影响并行复制的效率，从而增加主从延迟。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-96** 事务访问过的表可能一直持有 MDL 读锁，让 ALTER TABLE 等结构变更等待。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)
- **S4-97** 尽量把事务范围控制在必要的数据库操作里，不要在事务中长时间调用外部接口、等待用户输入。批量任务可以结合业务一致性要求分批提交，但不能为了缩短事务，把必须原子完成的业务步骤随意拆开。[原文§滥用事务，或者一个事务里有特别多sql的弊端？](https://xiaolincoding.com/interview/mysql.html#%E6%BB%A5%E7%94%A8%E4%BA%8B%E5%8A%A1-%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%E4%BA%8B%E5%8A%A1%E9%87%8C%E6%9C%89%E7%89%B9%E5%88%AB%E5%A4%9Asql%E7%9A%84%E5%BC%8A%E7%AB%AF)

## 5. 锁

原文：[MySQL面试题 · 锁](https://xiaolincoding.com/interview/mysql.html#%E9%94%81)。

### 讲一下mysql里有哪些锁？

- **S5-1** 全局锁、表级锁、行锁（行级锁）。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-2** 全局锁通过 flush tables with read lock 语句加锁，会让整个数据库处于只读状态：这时其他线程执行增删改或者表结构修改都会阻塞。全局锁主要应用于做全库逻辑备份，这样在备份期间就不会因为数据或表结构的更新，出现备份文件的数据与预期不一样的情况。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-3** 表锁、元数据锁（MDL）、意向锁。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-4** 通过 lock tables 语句可以对表加表锁。表锁除了会限制别的线程的读写，也会限制本线程接下来的读写操作。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-5** 依次填：读、写。对一张表进行 CRUD 操作时，加的是 MDL 读锁；对一张表做结构变更操作时，加的是 MDL 写锁。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-6** 当对数据库表进行操作时，会自动给这个表加上 MDL。MDL 是为了保证当用户对表执行 CRUD 操作时，防止其他线程对这个表结构做了变更。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-7** 意向锁的目的是为了快速判断表里是否有记录被加锁。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-8** 依次填：意向独占锁、独占锁。执行插入、更新、删除操作，需要先对表加上「意向独占锁」，然后对该记录加独占锁。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-9** 依次填：InnoDB、MyISAM。InnoDB 引擎是支持行级锁的，而 MyISAM 引擎并不支持行级锁。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-10** 记录锁锁住的是一条记录，而且记录锁有 S 锁和 X 锁之分，满足读写互斥、写写互斥。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-11** 间隙锁锁住的是两条索引记录之间的间隙，主要用于阻止其他事务向间隙插入。可重复读的范围查询中经常使用间隙锁，串行化下也可能使用；读提交下通常不为普通搜索加间隙锁，但外键检查、重复键检查等仍可能使用。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-12** Next-Key Lock 称为临键锁，是 Record Lock + Gap Lock 的组合，通常表示「前一个索引值到当前索引值」的左开右闭区间，比如 (5, 10]。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)
- **S5-13** 插入记录前需要申请对应间隙的插入意向锁，它属于间隙锁的一种，不要和表级的意向锁混淆；向同一间隙的不同位置插入，通常可以并发。[原文§讲一下mysql里有哪些锁？](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bmysql%E9%87%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E9%94%81)

### 数据库的表锁和行锁有什么作用？

- **S5-14** 表锁的作用有三点：整体控制，按共享、排他等兼容关系控制整张表的访问；粒度大，在锁定表的情况下可能影响整个表的其他操作，引起锁竞争和性能问题；适用于大批量操作，例如表的重建、大量数据的加载等场景。[原文§数据库的表锁和行锁有什么作用？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E8%A1%A8%E9%94%81%E5%92%8C%E8%A1%8C%E9%94%81%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S5-15** 显式 READ 表锁允许其他会话读、阻止写；显式 WRITE 表锁会阻止其他会话读写。不能把所有表级锁都理解成禁止任何访问。[原文§数据库的表锁和行锁有什么作用？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E8%A1%A8%E9%94%81%E5%92%8C%E8%A1%8C%E9%94%81%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S5-16** 行锁的作用有三点：细粒度控制，可以精确控制对表中某行数据的访问，其他事务可以同时访问其他行，在并发量大的系统中能提高并发性能；减少锁冲突，不会像表锁那样造成整个表的锁冲突，降低锁竞争的可能性；适用于频繁单行操作，例如订单系统中的订单修改、删除。[原文§数据库的表锁和行锁有什么作用？](https://xiaolincoding.com/interview/mysql.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E8%A1%A8%E9%94%81%E5%92%8C%E8%A1%8C%E9%94%81%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

### MySQL两个线程的update语句同时处理一条数据，会不会有阻塞？

- **S5-17** 会阻塞，因为 InnoDB 存储引擎实现了行级锁。当事务 A 对 id = 1 这行记录进行更新时，会对主键 id 为 1 的记录加 X 类型的记录锁；第二个事务对 id = 1 进行更新时，发现已经有记录锁了，就会陷入阻塞状态。[原文§MySQL两个线程的update语句同时处理一条数据，会不会有阻塞？](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%A4%E4%B8%AA%E7%BA%BF%E7%A8%8B%E7%9A%84update%E8%AF%AD%E5%8F%A5%E5%90%8C%E6%97%B6%E5%A4%84%E7%90%86%E4%B8%80%E6%9D%A1%E6%95%B0%E6%8D%AE-%E4%BC%9A%E4%B8%8D%E4%BC%9A%E6%9C%89%E9%98%BB%E5%A1%9E)

### 两条update语句处理一张表的不同的主键范围的记录，一个<10，一个>15，会不会遇到阻塞？底层是为什么的？

- **S5-18** 如果两条语句都按主键做范围扫描，没有其他关联操作，实际加的记录锁互不冲突，通常可以并发执行。[原文§两条update语句处理一张表的不同的主键范围的记录，一个<10，一个>15，会不会遇到阻塞？底层是为什么的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%A4%E6%9D%A1update%E8%AF%AD%E5%8F%A5%E5%A4%84%E7%90%86%E4%B8%80%E5%BC%A0%E8%A1%A8%E7%9A%84%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%BB%E9%94%AE%E8%8C%83%E5%9B%B4%E7%9A%84%E8%AE%B0%E5%BD%95-%E4%B8%80%E4%B8%AA-10-%E4%B8%80%E4%B8%AA-15-%E4%BC%9A%E4%B8%8D%E4%BC%9A%E9%81%87%E5%88%B0%E9%98%BB%E5%A1%9E-%E5%BA%95%E5%B1%82%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E7%9A%84)
- **S5-19** 不能只把 WHERE 的数字范围画出来，就当成实际加锁范围。在可重复读下，范围更新通常还涉及间隙锁或 next-key lock，边界取决于真实索引记录和扫描过程。例如 id < 10 扫描到边界时，可能还会锁住最后一条符合条件记录之后的间隙，而不是只锁所有 id < 10 的现有行。[原文§两条update语句处理一张表的不同的主键范围的记录，一个<10，一个>15，会不会遇到阻塞？底层是为什么的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%A4%E6%9D%A1update%E8%AF%AD%E5%8F%A5%E5%A4%84%E7%90%86%E4%B8%80%E5%BC%A0%E8%A1%A8%E7%9A%84%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%BB%E9%94%AE%E8%8C%83%E5%9B%B4%E7%9A%84%E8%AE%B0%E5%BD%95-%E4%B8%80%E4%B8%AA-10-%E4%B8%80%E4%B8%AA-15-%E4%BC%9A%E4%B8%8D%E4%BC%9A%E9%81%87%E5%88%B0%E9%98%BB%E5%A1%9E-%E5%BA%95%E5%B1%82%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E7%9A%84)
- **S5-20** 原文提醒了三点：间隙锁之间可以共存，间隙有重叠也不等于两个 UPDATE 一定互相阻塞，插入意向锁遇到相应间隙锁才可能等待；UPDATE 如果还要维护其他索引、检查唯一键或外键，也可能产生额外锁冲突。因此，普通主键范围更新能否并发，要看实际访问的索引和锁是否冲突，不能仅凭条件范围一概判断。[原文§两条update语句处理一张表的不同的主键范围的记录，一个<10，一个>15，会不会遇到阻塞？底层是为什么的？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%A4%E6%9D%A1update%E8%AF%AD%E5%8F%A5%E5%A4%84%E7%90%86%E4%B8%80%E5%BC%A0%E8%A1%A8%E7%9A%84%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%BB%E9%94%AE%E8%8C%83%E5%9B%B4%E7%9A%84%E8%AE%B0%E5%BD%95-%E4%B8%80%E4%B8%AA-10-%E4%B8%80%E4%B8%AA-15-%E4%BC%9A%E4%B8%8D%E4%BC%9A%E9%81%87%E5%88%B0%E9%98%BB%E5%A1%9E-%E5%BA%95%E5%B1%82%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E7%9A%84)

### 如果2个范围不是主键或索引？还会阻塞吗？

- **S5-21** 如果过滤字段没有可用索引，UPDATE 可能需要扫描聚簇索引上的所有记录，加锁范围就会明显扩大，即使两条语句在业务上更新的是不同记录，也可能互相等待。在可重复读下，全表扫描通常会对扫描到的记录和间隙加锁，效果可能接近锁住整张表。[原文§如果2个范围不是主键或索引？还会阻塞吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C2%E4%B8%AA%E8%8C%83%E5%9B%B4%E4%B8%8D%E6%98%AF%E4%B8%BB%E9%94%AE%E6%88%96%E7%B4%A2%E5%BC%95-%E8%BF%98%E4%BC%9A%E9%98%BB%E5%A1%9E%E5%90%97)
- **S5-22** 在读提交下，UPDATE 可以在判断条件后释放不匹配记录的锁，普通搜索也通常不加间隙锁，所以不能把可重复读下的结论原样套过去。不过扫描量仍然很大，锁等待也仍可能发生。[原文§如果2个范围不是主键或索引？还会阻塞吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C2%E4%B8%AA%E8%8C%83%E5%9B%B4%E4%B8%8D%E6%98%AF%E4%B8%BB%E9%94%AE%E6%88%96%E7%B4%A2%E5%BC%95-%E8%BF%98%E4%BC%9A%E9%98%BB%E5%A1%9E%E5%90%97)
- **S5-23** 这里不是把行锁升级成了表锁，而是由于扫描范围变大，加了很多行级锁。给更新条件建立合适索引，既能减少扫描，也能减少锁冲突。[原文§如果2个范围不是主键或索引？还会阻塞吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9C2%E4%B8%AA%E8%8C%83%E5%9B%B4%E4%B8%8D%E6%98%AF%E4%B8%BB%E9%94%AE%E6%88%96%E7%B4%A2%E5%BC%95-%E8%BF%98%E4%BC%9A%E9%98%BB%E5%A1%9E%E5%90%97)

### InnoDB 的行锁锁的是行，还是索引？

- **S5-24** InnoDB 的行级锁是加在索引记录上的，不是给磁盘里的某一行地址单独挂一把锁。[原文§InnoDB 的行锁锁的是行，还是索引？](https://xiaolincoding.com/interview/mysql.html#innodb-%E7%9A%84%E8%A1%8C%E9%94%81%E9%94%81%E7%9A%84%E6%98%AF%E8%A1%8C-%E8%BF%98%E6%98%AF%E7%B4%A2%E5%BC%95)
- **S5-25** 按主键更新，锁住的是主键索引记录；按二级索引更新，通常既会对扫描到的二级索引记录加锁，也会锁住对应的聚簇索引记录。[原文§InnoDB 的行锁锁的是行，还是索引？](https://xiaolincoding.com/interview/mysql.html#innodb-%E7%9A%84%E8%A1%8C%E9%94%81%E9%94%81%E7%9A%84%E6%98%AF%E8%A1%8C-%E8%BF%98%E6%98%AF%E7%B4%A2%E5%BC%95)
- **S5-26** 没有显式主键时，InnoDB 也会有聚簇索引，并不是没有索引就无法加行锁。[原文§InnoDB 的行锁锁的是行，还是索引？](https://xiaolincoding.com/interview/mysql.html#innodb-%E7%9A%84%E8%A1%8C%E9%94%81%E9%94%81%E7%9A%84%E6%98%AF%E8%A1%8C-%E8%BF%98%E6%98%AF%E7%B4%A2%E5%BC%95)
- **S5-27** 「没有用索引就会升级成表锁」这个说法不准确。真正的问题是扫描和加锁范围扩大，可能让整个表的大量操作都受到影响。[原文§InnoDB 的行锁锁的是行，还是索引？](https://xiaolincoding.com/interview/mysql.html#innodb-%E7%9A%84%E8%A1%8C%E9%94%81%E9%94%81%E7%9A%84%E6%98%AF%E8%A1%8C-%E8%BF%98%E6%98%AF%E7%B4%A2%E5%BC%95)

### MySQL 为什么会死锁？怎么处理？

- **S5-28** 死锁就是多个事务各自持有对方需要的锁，又都在等待对方释放，形成循环等待。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-29** 不是只有跨表才会死锁，同一张表的多行、索引记录和间隙之间也可能形成循环等待。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-30** A 持有 id = 1 的锁、等待 id = 2；B 持有 id = 2 的锁、等待 id = 1，两者互相等待，就形成了死锁。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-31** InnoDB 默认开启死锁检测，发现死锁后会选择一个事务回滚，通常倾向于修改记录较少、回滚代价较小的事务，应用需要对整个事务做有限次数重试。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-32** 减少死锁可以从这些方向入手：多个事务按相同顺序访问记录，比如转账时统一先锁较小的账户 ID；缩短事务，避免拿着数据库锁调用耗时的外部接口；为条件建立合适索引，减少扫描和加锁范围；通过 SHOW ENGINE INNODB STATUS 查看最近一次死锁，MySQL 8.0 还可以结合 performance_schema.data_locks 和 data_lock_waits 分析当前锁等待。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-33** 可以通过 SHOW ENGINE INNODB STATUS 查看最近一次死锁；MySQL 8.0 还可以结合 performance_schema.data_locks 和 data_lock_waits 分析当前锁等待。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
- **S5-34** 死锁回滚通常针对整个事务，而锁等待超时默认通常只回滚当前语句。业务重试前要确认事务状态，必要时先主动回滚，再重新执行完整业务流程。[原文§MySQL 为什么会死锁？怎么处理？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%AD%BB%E9%94%81-%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)

### 为什么执行 ALTER TABLE 会把后续查询也堵住？

- **S5-35** 常见原因是 MDL，也就是元数据锁。[原文§为什么执行 ALTER TABLE 会把后续查询也堵住？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C-alter-table-%E4%BC%9A%E6%8A%8A%E5%90%8E%E7%BB%AD%E6%9F%A5%E8%AF%A2%E4%B9%9F%E5%A0%B5%E4%BD%8F)
- **S5-36** 事务 A 查询过一张表但一直没有提交，它持有这张表的 MDL 读锁。此时 B 执行 ALTER TABLE，需要 MDL 写锁，就要等待 A 结束。[原文§为什么执行 ALTER TABLE 会把后续查询也堵住？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C-alter-table-%E4%BC%9A%E6%8A%8A%E5%90%8E%E7%BB%AD%E6%9F%A5%E8%AF%A2%E4%B9%9F%E5%A0%B5%E4%BD%8F)
- **S5-37** 后续新的查询也需要 MDL 读锁，但在有写锁请求排队时，也可能继续排队，避免结构变更一直抢不到锁。这样就会出现「一个长事务阻塞 ALTER TABLE，ALTER TABLE 又挡住后续查询」的情况。[原文§为什么执行 ALTER TABLE 会把后续查询也堵住？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C-alter-table-%E4%BC%9A%E6%8A%8A%E5%90%8E%E7%BB%AD%E6%9F%A5%E8%AF%A2%E4%B9%9F%E5%A0%B5%E4%BD%8F)
- **S5-38** 排查时可以查看进程状态是否有 Waiting for table metadata lock，再结合 performance_schema.metadata_locks、information_schema.innodb_trx 找到未结束的事务。[原文§为什么执行 ALTER TABLE 会把后续查询也堵住？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C-alter-table-%E4%BC%9A%E6%8A%8A%E5%90%8E%E7%BB%AD%E6%9F%A5%E8%AF%A2%E4%B9%9F%E5%A0%B5%E4%BD%8F)
- **S5-39** 即使使用在线 DDL，开始或结束等阶段也仍需要元数据锁，不能理解成全程不阻塞。[原文§为什么执行 ALTER TABLE 会把后续查询也堵住？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C-alter-table-%E4%BC%9A%E6%8A%8A%E5%90%8E%E7%BB%AD%E6%9F%A5%E8%AF%A2%E4%B9%9F%E5%A0%B5%E4%BD%8F)

## 6. 日志

原文：[MySQL面试题 · 日志](https://xiaolincoding.com/interview/mysql.html#%E6%97%A5%E5%BF%97)。

### 日志文件是分成了哪几种？

- **S6-1** redo log（重做日志）和 undo log（回滚日志）都是 InnoDB 存储引擎层生成的日志：redo log 实现了事务中的持久性，主要用于掉电等故障恢复；undo log 实现了事务中的原子性，主要用于事务回滚和 MVCC。[原文§日志文件是分成了哪几种？](https://xiaolincoding.com/interview/mysql.html#%E6%97%A5%E5%BF%97%E6%96%87%E4%BB%B6%E6%98%AF%E5%88%86%E6%88%90%E4%BA%86%E5%93%AA%E5%87%A0%E7%A7%8D)
- **S6-2** bin log（二进制日志）是 Server 层生成的日志，主要用于主从复制，以及配合全量备份做时间点恢复；relay log（中继日志）用于主从复制场景，是 slave 通过 io 线程拷贝 master 的 bin log 后在本地生成的日志。[原文§日志文件是分成了哪几种？](https://xiaolincoding.com/interview/mysql.html#%E6%97%A5%E5%BF%97%E6%96%87%E4%BB%B6%E6%98%AF%E5%88%86%E6%88%90%E4%BA%86%E5%93%AA%E5%87%A0%E7%A7%8D)
- **S6-3** 慢查询日志用于记录执行时间过长的 sql，需要设置阈值后手动开启。[原文§日志文件是分成了哪几种？](https://xiaolincoding.com/interview/mysql.html#%E6%97%A5%E5%BF%97%E6%96%87%E4%BB%B6%E6%98%AF%E5%88%86%E6%88%90%E4%BA%86%E5%93%AA%E5%87%A0%E7%A7%8D)

### 讲一下binlog

- **S6-4** binlog 是 MySQL 的 Server 层实现的日志，所有存储引擎都可以使用。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-5** MySQL 在完成一条更新操作后，Server 层会生成一条 binlog；等到事务提交的时候，再把该事务执行过程中产生的 binlog 从事务缓存写入 binlog 文件。（这是 InnoDB 等事务表的流程；非事务表的更新在执行后会立即写入 binlog。原文泛称 MySQL，没有区分两者。）[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)[核对来源：MySQL 8.4 The Binary Log](https://dev.mysql.com/doc/refman/8.4/en/binary-log.html)
- **S6-6** binlog 是追加写，写满一个文件就创建一个新的文件继续写，不会像 redo log 那样循环覆盖，不过旧文件会根据保留策略清理。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-7** binlog 保存的是数据库变更事件，不是数据库的全量备份，通常用于主从复制，以及配合全量备份做时间点恢复。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-8** binlog 文件记录了所有数据库表结构变更和表数据修改，不会记录查询类的操作，比如 SELECT 和 SHOW 操作。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-9** binlog 有 3 种格式类型，分别是 STATEMENT、ROW 和 MIXED。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-10** ROW 格式记录行的变更，例如更新前后的行信息，从库根据行事件应用变化，不需要重新计算主库的表达式，因此一致性更好；MySQL 5.7.7 起默认格式是 ROW。ROW 属于行级逻辑日志，不能因为它不记录原 SQL，就把它当成 redo 那样的数据页物理日志。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-11** ROW 格式具体记录哪些列还受到 binlog_row_image 等配置影响；大批量修改会生成较多日志。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-12** STATEMENT 格式主要记录修改数据的 SQL，从库重新执行这些语句。日志通常较小，但 UUID() 等不确定性函数、部分依赖执行顺序的语句可能导致主从结果不同。不能把所有时间函数都归为不安全，比如 NOW() 可以结合日志中的时间信息保持一致。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)
- **S6-13** MIXED 格式包含了 STATEMENT 和 ROW 模式，它会根据不同的情况自动使用 ROW 模式和 STATEMENT 模式。[原文§讲一下binlog](https://xiaolincoding.com/interview/mysql.html#%E8%AE%B2%E4%B8%80%E4%B8%8Bbinlog)

### UndoLog日志的作用是什么？

- **S6-14** undo log 是一种用于撤销回退的日志，它保证了事务 ACID 特性中的原子性。在事务没提交之前，MySQL 会先记录更新前的数据到 undo log 日志文件里面，当事务回滚时，可以利用 undo log 来进行回滚。[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
- **S6-15** 原文的描述是：插入一条记录时，要把这条记录的主键值记下来；删除一条记录时，要把这条记录中的内容都记下来；更新一条记录时，要把被更新的列的旧值记下来。（删除这一条是逻辑上的说法：InnoDB 执行 DELETE 时只给记录打删除标记，内部按一次更新处理，并不立刻物理删除；真正的物理删除由 purge 在丢弃对应 undo 记录时完成。）[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)[核对来源：MySQL 8.0 InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)
- **S6-16** 原文的描述是：回滚时，插入的记录只需把记下的主键值对应的记录删掉；删除的记录再把由记下的内容组成的记录插入到表中；更新的记录再把被更新的列更新为旧值。（删除这一条是逻辑上的说法：InnoDB 执行 DELETE 时只给记录打删除标记，回滚时恢复记录删除前的状态即可，不需要重新插入整行；物理删除由 purge 完成。）[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)[核对来源：MySQL 8.0 InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)
- **S6-17** 回滚时，InnoDB 根据 undo 记录撤销修改，效果可以理解成做反向操作，但并不是给客户端重新执行一条相反的 SQL。[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
- **S6-18** undo 的另一个作用是支持 MVCC：当最新版本对当前 Read View 不可见时，可以沿 undo 版本链重建旧版本。[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
- **S6-19** 更新或删除产生的 undo 不是事务一提交就全部删除，还需要等不再被旧快照使用后，由 purge 清理。undo 页本身的修改也受到 redo 保护。[原文§UndoLog日志的作用是什么？](https://xiaolincoding.com/interview/mysql.html#undolog%E6%97%A5%E5%BF%97%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)

### 有了undolog为啥还需要redolog呢？

- **S6-20** Buffer Pool 基于内存，而内存总是不可靠，万一断电重启，还没来得及落盘的脏页数据就会丢失，为了防止断电导致数据丢失，需要把页的修改记录到 redo log 中。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-21** 当有一条记录需要更新的时候，InnoDB 引擎就会先更新内存（同时标记为脏页），并把页的修改记录到 redo log 中。此时完成的是内存里的修改，不等于事务已经持久化提交。后续 InnoDB 会在适当的时候，由后台线程将缓存在 Buffer Pool 的脏页刷新到磁盘里。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-22** WAL 的关键是：数据页写回磁盘之前，对应的 redo 必须先持久化。事务提交是否需要等待 redo 刷盘，取决于刷盘配置；内存里的数据页可以先修改，不需要等日志刷盘后才修改内存。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-23** redo log 是物理日志，记录了某个数据页做了什么修改，比如对 XXX 表空间中的 YYY 数据页 ZZZ 偏移量的地方做了 AAA 更新，每当执行一个事务就会产生这样的一条或者多条物理日志。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-24** 系统崩溃时，如果对应 redo 已经持久化，就可以重放日志恢复数据页。不过 redo 中也可能有未提交事务的修改，恢复过程中还需要通过 undo 回滚这些事务，不能把重放出来的所有变化都直接当成已提交数据。可以把恢复过程理解为：先利用 redo 恢复数据页，再根据事务最终状态利用 undo 撤销未提交事务，已提交事务的修改保留下来。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-25** redo log 记录数据页发生的修改，用来重做这些修改，主要解决崩溃恢复和持久性问题；undo log 记录撤销某次修改所需的信息，用来回滚和重建旧版本，主要解决原子性和 MVCC 问题。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-26** 在 redo 按要求持久化的前提下，再通过 WAL 技术，InnoDB 才能保证异常重启后恢复之前已提交的修改，这个能力称为 crash-safe（崩溃恢复）。redo log 保证了事务四大特性中的持久性。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-27** 写入 redo log 的方式使用了追加操作，所以磁盘操作是顺序写；而写入数据需要先找到写入位置，然后才写到磁盘，所以磁盘操作是随机写。磁盘的顺序写比随机写高效得多，因此 redo log 写入磁盘的开销更小。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-28** WAL 技术的另一个优点是：把事务提交时的大量数据页随机写，转成较小的 redo 顺序写，提升语句的执行性能。数据页后续仍然需要刷盘，不是完全没有随机写了，这是因为 MySQL 的写操作并不是立刻更新到磁盘上，而是先记录在日志上，然后在合适的时间再更新到磁盘上。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)
- **S6-29** 针对为什么需要 redo log，有两个答案：一是实现事务的持久性，让 MySQL 有 crash-safe 的能力，在日志按要求持久化的前提下，异常重启后可以恢复已提交的修改；二是将写操作从随机写变成了顺序写，提升 MySQL 写入磁盘的性能。[原文§有了undolog为啥还需要redolog呢？](https://xiaolincoding.com/interview/mysql.html#%E6%9C%89%E4%BA%86undolog%E4%B8%BA%E5%95%A5%E8%BF%98%E9%9C%80%E8%A6%81redolog%E5%91%A2)

### redo log怎么保证持久性的？

- **S6-30** redo log 保证持久性的核心是 WAL + redo 持久化 + 崩溃恢复，不是因为日志顺序写，就自动保证不会丢数据。[原文§redo log怎么保证持久性的？](https://xiaolincoding.com/interview/mysql.html#redo-log%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E6%8C%81%E4%B9%85%E6%80%A7%E7%9A%84)
- **S6-31** 当 innodb_flush_log_at_trx_commit = 1 时，事务提交需要等待相关 redo 刷到持久化存储，而不用等所有脏页都刷盘。[原文§redo log怎么保证持久性的？](https://xiaolincoding.com/interview/mysql.html#redo-log%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E6%8C%81%E4%B9%85%E6%80%A7%E7%9A%84)
- **S6-32** 崩溃重启后，从 checkpoint 对应的位置开始恢复，通过页的 LSN 判断哪些修改需要重放，再回滚未提交事务。[原文§redo log怎么保证持久性的？](https://xiaolincoding.com/interview/mysql.html#redo-log%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E6%8C%81%E4%B9%85%E6%80%A7%E7%9A%84)
- **S6-33** redo 顺序写和组提交主要是为了减少 I/O 成本；真正决定提交后故障时能否保住数据的，是日志有没有按要求持久化。[原文§redo log怎么保证持久性的？](https://xiaolincoding.com/interview/mysql.html#redo-log%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E6%8C%81%E4%B9%85%E6%80%A7%E7%9A%84)

### 能不能只用binlog不用redo log？

- **S6-34** 对于 InnoDB，不能直接用 binlog 替代 redo log 完成崩溃恢复。binlog 记录的是数据库的逻辑变更，主要用于复制和时间点恢复，并不负责记录 InnoDB 数据页的具体修改、刷盘进度和 checkpoint；崩溃时不同数据页可能处于不同的刷盘状态，不能简单再执行一遍 binlog 就修复这些页。[原文§能不能只用binlog不用redo log？](https://xiaolincoding.com/interview/mysql.html#%E8%83%BD%E4%B8%8D%E8%83%BD%E5%8F%AA%E7%94%A8binlog%E4%B8%8D%E7%94%A8redo-log)
- **S6-35** binlog 记录的是数据库的逻辑变更，并不负责记录 InnoDB 数据页的具体修改、刷盘进度和 checkpoint。崩溃时不同数据页可能处于不同的刷盘状态，不能简单再执行一遍 binlog 就修复这些页。[原文§能不能只用binlog不用redo log？](https://xiaolincoding.com/interview/mysql.html#%E8%83%BD%E4%B8%8D%E8%83%BD%E5%8F%AA%E7%94%A8binlog%E4%B8%8D%E7%94%A8redo-log)
- **S6-36** redo 帮助数据库恢复自身，binlog 帮助复制变更或配合备份恢复历史数据。[原文§能不能只用binlog不用redo log？](https://xiaolincoding.com/interview/mysql.html#%E8%83%BD%E4%B8%8D%E8%83%BD%E5%8F%AA%E7%94%A8binlog%E4%B8%8D%E7%94%A8redo-log)

### binlog 两阶段提交过程是怎么样的？

- **S6-37** 事务提交涉及 redo log 和 binlog 两套日志。如果没有协调机制，一份日志已经确认提交，另一份还没完成，数据库又突然崩溃，就可能让主库恢复出来的数据和从库根据 binlog 复制的数据不一致。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-38** 在 InnoDB 存储引擎中开启 binlog 时，MySQL 会同时维护 binlog 与 InnoDB 的 redo log，为保证两个日志的一致性使用了内部 XA 事务，内部 XA 事务由 binlog 作为协调者，存储引擎是参与者。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-39** 事务的提交过程分为两个阶段，就是将 redo log 的写入拆成了两个步骤：prepare 和 commit，中间再穿插写入 binlog。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-40** prepare 阶段：将 XID（内部 XA 事务的 ID）写入到 redo log，同时将 redo log 对应的事务状态设置为 prepare，然后将 redo log 持久化到磁盘（innodb_flush_log_at_trx_commit = 1 的作用）。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-41** commit 阶段：把 XID 写入到 binlog，然后将 binlog 持久化到磁盘（sync_binlog = 1 的作用），接着调用引擎的提交事务接口，将 redo log 状态设置为 commit。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-42** commit 标记不必再为这个事务单独同步刷盘，因为只要 binlog 写磁盘成功，就算 redo log 的状态还是 prepare 也没有关系，一样会被认为事务已经执行成功。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-43** 不管是时刻 A（redo log 已经写入磁盘，binlog 还没写入磁盘），还是时刻 B（redo log 和 binlog 都已经写入磁盘，还没写入 commit 标识）崩溃，此时的 redo log 都处于 prepare 状态。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-44** MySQL 重启后会按顺序扫描 redo log 文件，碰到处于 prepare 状态的 redo log，就拿着其中的 XID 去 binlog 查看是否存在此 XID：如果 binlog 中没有当前内部 XA 事务的 XID，说明 redo log 完成刷盘但 binlog 还没有刷盘，则回滚事务（对应时刻 A）；如果 binlog 中存在这个 XID 对应的完整、有效事务，说明可以确认提交，则完成引擎提交（对应时刻 B）。对于处于 prepare 阶段的 redo log，是提交还是回滚，取决于能否在 binlog 中查找到与 redo log 相同的 XID。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **S6-45** 在 redo prepare 已持久化的前提下，完整事务的 binlog 持久化成功，是恢复时决定提交的重要依据。不能把仅写入 binlog cache，或者只写到操作系统缓存、还没有按要求刷盘，直接当成严格的持久化保证。[原文§binlog 两阶段提交过程是怎么样的？](https://xiaolincoding.com/interview/mysql.html#binlog-%E4%B8%A4%E9%98%B6%E6%AE%B5%E6%8F%90%E4%BA%A4%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)

### update语句的具体执行过程是怎样的？

- **S6-46** InnoDB 按主键定位记录，页不在 Buffer Pool 中就从磁盘加载，并在读取待更新记录时申请相应的排他锁。即使新旧值相同，没有真正修改，也不代表查询过程一定没加锁。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
- **S6-47** 如果需要修改，先生成 undo，记录撤销本次更新所需的信息；再修改 Buffer Pool 中的记录，把页标记为脏页，同时生成相应 redo；undo 页的修改也会生成 redo。数据页不需要此时就刷回磁盘。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
- **S6-48** Server 层生成对应 binlog 事件，暂存在事务的 binlog cache 中。具体事件内容取决于 binlog 格式，大事务缓存不足时还可能使用临时文件。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
- **S6-49** 提交事务时，先让 InnoDB 进入 prepare 阶段，并按配置持久化 redo；再写入并持久化 binlog；最后完成 InnoDB 的 commit，释放事务锁。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
- **S6-50** 返回执行结果后，脏页后续由后台线程等机制刷回磁盘，刷页前必须保证相关 redo 已经持久化。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
- **S6-51** 事务如果已经显式开启就沿用，否则在自动提交模式下作为语句事务执行。如果这条 UPDATE 位于显式事务中，执行成功只是其中一个步骤，提交阶段要等客户端执行 COMMIT 才发生。[原文§update语句的具体执行过程是怎样的？](https://xiaolincoding.com/interview/mysql.html#update%E8%AF%AD%E5%8F%A5%E7%9A%84%E5%85%B7%E4%BD%93%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)

### MySQL是如何保障数据不丢失的？

- **S6-52** 主要通过 redo、WAL 和正确的刷盘配置保障已提交事务的持久性；开启 binlog 时，还要保证两份日志的提交一致。具体措施：innodb_flush_log_at_trx_commit = 1，事务提交时等待相关 redo 持久化；sync_binlog = 1，binlog 提交组需要同步到持久化存储；两阶段提交，保证崩溃恢复时 redo 和 binlog 对事务的提交判断一致；doublewrite，在数据页发生部分写入时提供完整页副本帮助恢复。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)
- **S6-53** sync_binlog = 1：binlog 提交组需要同步到持久化存储。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)
- **S6-54** 两阶段提交保证崩溃恢复时 redo 和 binlog 对事务的提交判断一致。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)
- **S6-55** doublewrite 在数据页发生部分写入时，提供完整页副本帮助恢复。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)
- **S6-56** 面试里常说的「双 1」，就是 innodb_flush_log_at_trx_commit 和 sync_binlog 这两个刷盘参数都设为 1。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)
- **S6-57** 「双 1」依赖操作系统和存储设备正确兑现持久化请求，也不能替代备份和复制。单机掉电后的事务恢复、主库磁盘彻底损坏后的恢复、主从切换时是否丢事务，是不同的问题，需要分别考虑。[原文§MySQL是如何保障数据不丢失的？](https://xiaolincoding.com/interview/mysql.html#mysql%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E6%95%B0%E6%8D%AE%E4%B8%8D%E4%B8%A2%E5%A4%B1%E7%9A%84)

### RedoLog是在内存里吗？

- **S6-58** redo 在内存和磁盘里都有对应部分：事务执行时，生成的 redo 先进入内存中的 redo log buffer，再写入磁盘上的 redo 文件。[原文§RedoLog是在内存里吗？](https://xiaolincoding.com/interview/mysql.html#redolog%E6%98%AF%E5%9C%A8%E5%86%85%E5%AD%98%E9%87%8C%E5%90%97)
- **S6-59** redo 写到文件还可能只到操作系统缓存，要真正持久化，需要完成相应的同步刷盘。[原文§RedoLog是在内存里吗？](https://xiaolincoding.com/interview/mysql.html#redolog%E6%98%AF%E5%9C%A8%E5%86%85%E5%AD%98%E9%87%8C%E5%90%97)
- **S6-60** redo 也不只在提交时才写出。后台线程、日志缓冲区空间不足等情况都可能触发写出或刷盘，所以磁盘上的 redo 可以包含尚未提交事务的修改。[原文§RedoLog是在内存里吗？](https://xiaolincoding.com/interview/mysql.html#redolog%E6%98%AF%E5%9C%A8%E5%86%85%E5%AD%98%E9%87%8C%E5%90%97)

### innodb_flush_log_at_trx_commit 的 0、1、2 有什么区别？

- **S6-61** 这三个值主要控制事务提交时 redo 要写到哪一步：1 表示提交时要求相关 redo 写入并刷盘；2 表示提交时要求写入文件，但不要求马上同步到磁盘；0 表示提交时不要求立即写出或刷盘。[原文§innodb_flush_log_at_trx_commit 的 0、1、2 有什么区别？](https://xiaolincoding.com/interview/mysql.html#innodb-flush-log-at-trx-commit-%E7%9A%84-0%E3%80%811%E3%80%812-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S6-62** 取值为 1 时，提交时要求相关 redo 写入并刷盘，持久性保障最强，也是默认值。组提交可以让多个事务共用一次刷盘。[原文§innodb_flush_log_at_trx_commit 的 0、1、2 有什么区别？](https://xiaolincoding.com/interview/mysql.html#innodb-flush-log-at-trx-commit-%E7%9A%84-0%E3%80%811%E3%80%812-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S6-63** 取值为 0 时，mysqld 进程崩溃就可能丢失尚未写出的 redo。取值为 2 时，单独的 mysqld 进程崩溃一般能保住已写入操作系统缓存的部分，操作系统崩溃或掉电仍可能丢失。[原文§innodb_flush_log_at_trx_commit 的 0、1、2 有什么区别？](https://xiaolincoding.com/interview/mysql.html#innodb-flush-log-at-trx-commit-%E7%9A%84-0%E3%80%811%E3%80%812-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S6-64** 后台刷盘周期默认通常是 1 秒，也受 innodb_flush_log_at_timeout 和调度影响，不能把 0、2 理解成严格最多只丢 1 秒数据。要在性能和持久性之间根据业务做取舍。[原文§innodb_flush_log_at_trx_commit 的 0、1、2 有什么区别？](https://xiaolincoding.com/interview/mysql.html#innodb-flush-log-at-trx-commit-%E7%9A%84-0%E3%80%811%E3%80%812-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### redo log 写满了怎么办？checkpoint 是什么？

- **S6-65** redo 的容量有限，会循环使用。已经写入的位置不断向前推进，checkpoint 表示恢复需要保留的日志起点，其之前的修改已经有相应的数据页持久化保障，可以逐步回收日志空间。[原文§redo log 写满了怎么办？checkpoint 是什么？](https://xiaolincoding.com/interview/mysql.html#redo-log-%E5%86%99%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E-checkpoint-%E6%98%AF%E4%BB%80%E4%B9%88)
- **S6-66** 如果新的 redo 快追上不能覆盖的旧日志，就需要加快刷脏页、推进 checkpoint；空间仍然不足时，写入会受到阻塞。[原文§redo log 写满了怎么办？checkpoint 是什么？](https://xiaolincoding.com/interview/mysql.html#redo-log-%E5%86%99%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E-checkpoint-%E6%98%AF%E4%BB%80%E4%B9%88)
- **S6-67** redo 空间太小可能导致频繁刷脏页，磁盘刷页太慢也可能让写入出现抖动。扩大 redo 容量可以增加缓冲余地，但不能解决持续写入速度超过磁盘刷页能力的问题。[原文§redo log 写满了怎么办？checkpoint 是什么？](https://xiaolincoding.com/interview/mysql.html#redo-log-%E5%86%99%E6%BB%A1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E-checkpoint-%E6%98%AF%E4%BB%80%E4%B9%88)

### 什么是组提交？为什么能提高性能？

- **S6-68** 如果每个事务都单独对 redo、binlog 做一次同步刷盘，磁盘同步开销会很大。组提交就是把一批事务的日志写入和刷盘工作合并，让多个事务共享一次或较少次数的同步操作。[原文§什么是组提交？为什么能提高性能？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E6%8F%90%E4%BA%A4-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD)
- **S6-69** 10 个事务接近同时提交，不必机械地分别执行 10 次相同的 fsync，可以在符合提交顺序和两阶段提交要求的前提下成批处理。[原文§什么是组提交？为什么能提高性能？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E6%8F%90%E4%BA%A4-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD)
- **S6-70** 组提交主要减少的是同步次数，不是取消持久化保证。所以，使用「双 1」也不代表每个事务都必须各自触发一次独立的刷盘。[原文§什么是组提交？为什么能提高性能？](https://xiaolincoding.com/interview/mysql.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E6%8F%90%E4%BA%A4-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD)

### 为什么要写RedoLog，而不是直接写到B+树里面？

- **S6-71** 因为 redolog 写入磁盘是顺序写，而 B+ 树里数据页写入磁盘是随机写，顺序写的性能比随机写好，这样可以提升事务提交的效率。[原文§为什么要写RedoLog，而不是直接写到B+树里面？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%86%99redolog-%E8%80%8C%E4%B8%8D%E6%98%AF%E7%9B%B4%E6%8E%A5%E5%86%99%E5%88%B0b-%E6%A0%91%E9%87%8C%E9%9D%A2)
- **S6-72** 最重要的是 redolog 具备故障恢复的能力，redo log 记录的是物理级别的修改，包括页的修改，例如执行更新操作时，会记录修改的数据页的地址和更新后的数据，而不是 SQL 语句本身。[原文§为什么要写RedoLog，而不是直接写到B+树里面？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%86%99redolog-%E8%80%8C%E4%B8%8D%E6%98%AF%E7%9B%B4%E6%8E%A5%E5%86%99%E5%88%B0b-%E6%A0%91%E9%87%8C%E9%9D%A2)
- **S6-73** 在脏页实际写回磁盘之前，相关 redo 必须先持久化。重启时利用 redo 恢复数据页，再根据事务状态回滚未提交事务、保留已提交修改。内存中的页可以先修改，这和 WAL 的要求并不矛盾。[原文§为什么要写RedoLog，而不是直接写到B+树里面？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%86%99redolog-%E8%80%8C%E4%B8%8D%E6%98%AF%E7%9B%B4%E6%8E%A5%E5%86%99%E5%88%B0b-%E6%A0%91%E9%87%8C%E9%9D%A2)

### mysql 两次写（double write buffer）了解吗？

- **S6-74** doublewrite 主要解决的是数据页的部分写入问题，不是用来代替 redo。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-75** InnoDB 的页默认是 16 KB，但一次刷页并不天然是原子的。如果写到一半突然断电，磁盘上的页就可能一部分是旧内容、一部分是新内容，这叫部分写入，也叫 torn page。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-76** 图里用多个小块表示一页被分段写入，这是帮助理解，并不是说所有系统都固定按 4 个 4 KB 块完成刷页。关键是底层不一定保证整页原子写入。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-77** doublewrite 先把准备刷出的脏页成批写入磁盘上的双写区域，并按要求持久化，再把这些页写到各自的数据文件位置。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-78** 如果写数据文件期间崩溃，恢复时先从双写区域找完整页副本修复损坏页，再利用 redo 重放后续修改。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-79** 老版本的双写区域位于系统表空间，常见实现有约 2 MB 的区域；从 MySQL 8.0.20 开始，改用独立的 doublewrite 文件。面试时说明机制就好，不要把某个老版本的大小和位置当成所有版本都固定的配置。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-80** 这里的「两次写」是先写双写副本，再写最终数据页，不是保证一批页面要么全部写入、要么全部没写。它保证的是发生部分写入时，有机会找到完整的页来恢复。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)
- **S6-81** redo 主要记录对页的修改，并不是每次都保存完整页镜像。页的基础结构如果已经损坏，只靠增量修改不能可靠地修复，所以需要先从 doublewrite 找到完整副本，再进行 redo 恢复。[原文§mysql 两次写（double write buffer）了解吗？](https://xiaolincoding.com/interview/mysql.html#mysql-%E4%B8%A4%E6%AC%A1%E5%86%99-double-write-buffer-%E4%BA%86%E8%A7%A3%E5%90%97)

## 7. 性能调优

原文：[MySQL面试题 · 性能调优](https://xiaolincoding.com/interview/mysql.html#%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98)。

### mysql的explain有什么作用？

- **S7-1** explain 是查看 SQL 的执行计划，主要用来分析 SQL 语句的执行过程，比如有没有走索引，有没有额外排序，有没有索引覆盖等等。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-2** possible_keys 字段表示可能用到的索引；key 字段表示实际用的索引，如果这一项为 NULL，说明没有使用索引；rows 表示优化器估算需要扫描的行数，不是实际扫描行数。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-3** key_len 表示本次访问使用的索引键长度，单位是字节，可以辅助判断用了联合索引的哪些前缀列，但也受字符集、NULL 标记等影响。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-4** rows 表示优化器估算需要扫描的行数，不是实际扫描行数；filtered 表示估算经过条件过滤后保留的百分比，rows × filtered / 100 可以辅助估算传递给下一步的行数。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-5** 按定位范围从大到小依次是：ALL（全表扫描）、index（全索引扫描）、range（索引范围扫描）、ref（非唯一索引查找）、eq_ref（唯一索引扫描）、const（常量表访问）。这只是大致的理解，不能仅根据 type 就断言整条 SQL 谁快谁慢。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-6** ALL 是全表扫描，对少量记录的点查在大表上通常成本很高，不过小表或需要读取大部分数据的查询中也可能是合理选择；index 是全索引扫描，仍可能扫描很多记录，但如果能覆盖查询或提供所需顺序，也可能比全表扫描更划算，不能一概认为应该避免；range 是索引范围扫描，常见于 <、>、IN、BETWEEN 等条件，比扫描整个索引更有针对性，范围过大时仍可能读取很多记录。不能仅根据 type 就断言整条 SQL 谁快谁慢。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-7** ref 是通过非唯一索引，或者唯一索引的非唯一前缀做等值查找；eq_ref 是使用主键或唯一索引时产生的访问方式，通常使用在多表联查中，针对前面每一行组合做一次唯一键查找；const 是通过完整主键或非空唯一键与常量比较，最多匹配一行。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-8** ref 是通过非唯一索引，或者唯一索引的非唯一前缀做等值查找，可能匹配多条记录，匹配数量取决于数据分布，重复值很多时也可能扫描大量记录；eq_ref 通常是在关联查询中，针对前面每一行组合做一次唯一键查找；const 是通过完整主键或非空唯一键与常量比较，最多匹配一行，比如 SELECT name FROM product WHERE id = 1。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-9** Using filesort 表示需要额外排序，没能直接利用索引取得目标顺序，常见于 ORDER BY；Using temporary 表示需要临时表保存中间结果，常见于部分 GROUP BY、DISTINCT 等操作；Using index 表示索引可以提供查询所需的列，也就是覆盖索引。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-10** Using filesort 表示需要额外排序，没能直接利用索引取得目标顺序，常见于 ORDER BY；名字里虽然有 file，但排序可能完全在内存里完成，不代表一定发生磁盘排序，结果集较小时额外排序也不一定是瓶颈。Using temporary 表示需要临时表保存中间结果，常见于部分 GROUP BY、DISTINCT 等操作；临时表可能在内存中，也可能落到磁盘，要结合数据量和实际耗时判断。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-11** Using index 表示索引可以提供查询所需的列，也就是覆盖索引；它和 Using index condition 不同，后者表示索引下推，查询仍可能需要回表。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S7-12** 普通 EXPLAIN 主要展示估算计划，不会真正执行查询来统计耗时。MySQL 8.0.18 及之后可以用 EXPLAIN ANALYZE 查看实际执行时间、行数和循环次数，但它会真的执行被分析的查询，使用时要考虑查询本身的开销。[原文§mysql的explain有什么作用？](https://xiaolincoding.com/interview/mysql.html#mysql%E7%9A%84explain%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

### 怎么查看是否有走索引？

- **S7-13** 在 SQL 语句前加 EXPLAIN 关键字，执行后看 type、key 和 Extra：key 显示实际选择的索引名，type 描述扫描方式，Extra 给出额外信息。[原文§怎么查看是否有走索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E6%98%AF%E5%90%A6%E6%9C%89%E8%B5%B0%E7%B4%A2%E5%BC%95)
- **S7-14** key 显示实际选择的索引名，比如 PRIMARY；type 为 const、eq_ref、ref、range，通常说明通过索引定位或范围扫描，type 为 index 则是全索引扫描，虽然读了索引，也可能扫描很多记录。如果 type 为 ALL，且 key 为 NULL，通常是全表扫描；不过 key 为 NULL 本身不能直接推出一定扫描了整张表，还可能是优化器判断无需访问表。分析性能时还要看 rows、filtered，不能只看是否「走索引」。[原文§怎么查看是否有走索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E6%98%AF%E5%90%A6%E6%9C%89%E8%B5%B0%E7%B4%A2%E5%BC%95)
- **S7-15** 如果 key 字段显示 name 对应的索引名、type 是 ref，就说明走了索引；如果 key 是 NULL，可能是因为 name 字段的索引选择性太差（比如大部分值都相同），或者查询条件导致索引失效（比如用了函数操作 name 字段，像 WHERE SUBSTR(name,1,1) = '张'）。[原文§怎么查看是否有走索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E6%98%AF%E5%90%A6%E6%9C%89%E8%B5%B0%E7%B4%A2%E5%BC%95)

### 怎么查看表的索引？

- **S7-16** 最直接的是 SHOW INDEX 命令（如 SHOW INDEX FROM user），能列出表的所有索引信息；SHOW KEYS 和 SHOW INDEX 功能完全一致，只是写法不同（如 SHOW KEYS FROM user）。[原文§怎么查看表的索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E8%A1%A8%E7%9A%84%E7%B4%A2%E5%BC%95)
- **S7-17** Key_name 是索引名称，主键索引默认叫 PRIMARY；Column_name 是索引对应的字段；Index_type 是索引类型，比如 BTREE、HASH；Non_unique 字段为 0 表示唯一索引（主键索引也是唯一索引），为 1 表示普通非唯一索引。[原文§怎么查看表的索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E8%A1%A8%E7%9A%84%E7%B4%A2%E5%BC%95)
- **S7-18** MySQL 的 information_schema 数据库中存储了所有表的元数据，通过查询 STATISTICS 表能获取更详细的索引信息，适合需要筛选或批量查询的场景。需要替换成实际的数据库名，结果会和 SHOW INDEX 一致，但支持更灵活的条件查询，比如只查唯一索引（加 AND NON_UNIQUE = 0）。[原文§怎么查看表的索引？](https://xiaolincoding.com/interview/mysql.html#%E6%80%8E%E4%B9%88%E6%9F%A5%E7%9C%8B%E8%A1%A8%E7%9A%84%E7%B4%A2%E5%BC%95)

### 给你张表，发现查询速度很慢，你有那些解决方案

- **S7-19** 不会一上来就加索引或者分库分表，而是先定位耗时在哪，再决定优化方式。第一步确认慢在哪里：通过慢查询日志、Performance Schema 等找到具体 SQL，记录实际参数、执行频率、耗时和扫描行数；看是不是锁等待；检查 CPU、I/O、连接数和 Buffer Pool，判断是个别 SQL 问题还是整体资源已接近瓶颈。第二步分析执行计划和 SQL：用 EXPLAIN（必要时 EXPLAIN ANALYZE）看扫描方式、实际索引、估算行数、回表、排序和临时表；设计合适的联合索引和覆盖索引；只查需要的列和行；联表关注过滤后的数据量、连接算法和关联字段索引；深分页用游标分页或先查主键再回表；大批量更新分批处理；估算失真时评估更新统计信息。第三步考虑结构和架构：热点查询用缓存或汇总表，大字段和低频字段拆分，单机资源或写入吞吐成为瓶颈后再评估读写分离、数据归档、分库分表。优化后要用接近真实的数据和参数验证耗时、扫描量以及写入影响。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-20** 先确认慢在哪里：通过慢查询日志、Performance Schema 等找到具体 SQL，记录实际参数、执行频率、耗时和扫描行数，避免只拿一个命中数据很少的参数做判断；看是不是锁等待，结合进程状态、事务和锁等待信息排查，SQL 等锁很久和执行计划扫描很慢需要不同的处理方式；检查数据库当时的 CPU、I/O、连接数和 Buffer Pool 等情况，判断是个别 SQL 问题，还是整体资源已经接近瓶颈。不会一上来就加索引或者分库分表。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-21** 根据 WHERE、JOIN、ORDER BY 设计合适的联合索引，尽量使用覆盖索引，避免对普通索引列做不必要的函数和类型转换；只查询需要的列和行，避免无条件 SELECT *。此外用 EXPLAIN 看扫描方式、实际索引、估算行数、回表、排序和临时表，必要时用 EXPLAIN ANALYZE 对比实际行数与估算，注意它会真正执行查询。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-22** 联表查询要关注过滤后的数据量、连接算法和关联字段索引，不能只根据表的总行数背「小表驱动大表」。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-23** 深分页可以使用游标分页，或者先通过覆盖索引定位少量主键再回表；大批量更新可以在业务允许时分批处理；如果估算明显失真，可以评估更新统计信息，再对比计划和实际效果。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-24** 高频热点查询可以考虑缓存或汇总表，同时设计缓存一致性、失效和热点保护方案；大字段和低频字段可以结合访问模式拆分，减少常用查询读取的数据量；明确单机资源或写入吞吐已经成为瓶颈后，再评估读写分离、数据归档、分库分表。不能仅因为「超过千万行」就认为必须拆表。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
- **S7-25** 优化后要用接近真实的数据和参数验证耗时、扫描量以及写入影响，防止一个查询变快，却把其他高频查询或更新拖慢。[原文§给你张表，发现查询速度很慢，你有那些解决方案](https://xiaolincoding.com/interview/mysql.html#%E7%BB%99%E4%BD%A0%E5%BC%A0%E8%A1%A8-%E5%8F%91%E7%8E%B0%E6%9F%A5%E8%AF%A2%E9%80%9F%E5%BA%A6%E5%BE%88%E6%85%A2-%E4%BD%A0%E6%9C%89%E9%82%A3%E4%BA%9B%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

### 深分页为什么慢？怎么优化？

- **S7-26** 即使按主键扫描，MySQL 也通常要读过前面的 100 万条候选记录，再丢弃它们，最后返回 20 条。偏移量越大，白做的扫描越多；如果还涉及回表和排序，成本可能更高。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
- **S7-27** 方式一是游标分页，把上一页最后一条记录的 ID 传回来，从这个位置继续查；方式二是先查主键再回表，先用较窄的索引扫描得到目标主键，再关联获取完整记录。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
- **S7-28** 游标分页是把上一页最后一条记录的 ID 传回来，从这个位置继续查，例如 WHERE id > 1000000 ORDER BY id LIMIT 20。这里的 1000000 是上一页末尾的实际 ID，不能把第 100 万条记录直接当成 id = 1000000，因为自增 ID 可能不连续。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
- **S7-29** 游标分页适合顺序翻页，不适合直接跳到任意页。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
- **S7-30** 如果按创建时间倒序，要加唯一字段处理同一时间的多条记录，比如建 (created_at, id) 索引，游标同时带上这两个值，例如 WHERE created_at < '2024-08-01 12:00:00' OR (created_at = '2024-08-01 12:00:00' AND id < 1000000) ORDER BY created_at DESC, id DESC LIMIT 20。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
- **S7-31** 如果必须按页码跳页，可以先用较窄的索引扫描得到目标主键，再关联获取完整记录（子查询里 ORDER BY created_at DESC, id DESC LIMIT 1000000, 20 取出主键，再 JOIN 原表）。这个方案仍然要扫描前面的偏移量，只是可以通过 (created_at, id) 的覆盖扫描减少中间过程读取完整行的成本，不能把它当成完全消除了深分页开销。[原文§深分页为什么慢？怎么优化？](https://xiaolincoding.com/interview/mysql.html#%E6%B7%B1%E5%88%86%E9%A1%B5%E4%B8%BA%E4%BB%80%E4%B9%88%E6%85%A2-%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)

### ORDER BY 怎么利用索引避免排序？

- **S7-32** 关键是索引中的顺序能不能直接提供查询要求的顺序。[原文§ORDER BY 怎么利用索引避免排序？](https://xiaolincoding.com/interview/mysql.html#order-by-%E6%80%8E%E4%B9%88%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E9%81%BF%E5%85%8D%E6%8E%92%E5%BA%8F)
- **S7-33** user_id 和 status 都固定后，这一段索引就按 created_at 有序，可以反向扫描取得最近的记录，避免额外排序。[原文§ORDER BY 怎么利用索引避免排序？](https://xiaolincoding.com/interview/mysql.html#order-by-%E6%80%8E%E4%B9%88%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E9%81%BF%E5%85%8D%E6%8E%92%E5%BA%8F)
- **S7-34** 只固定 user_id 时，索引中还隔着一个没有固定的 status，各个状态内部虽然按时间有序，但合起来并不是全局时间有序，所以通常不能直接提供这个排序。[原文§ORDER BY 怎么利用索引避免排序？](https://xiaolincoding.com/interview/mysql.html#order-by-%E6%80%8E%E4%B9%88%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E9%81%BF%E5%85%8D%E6%8E%92%E5%BA%8F)
- **S7-35** 多个排序字段的方向也要和索引顺序配合，全正序或全倒序通常可以正向、反向扫描；混合 ASC、DESC 时，要结合 MySQL 8.0 的降序索引等方案判断。[原文§ORDER BY 怎么利用索引避免排序？](https://xiaolincoding.com/interview/mysql.html#order-by-%E6%80%8E%E4%B9%88%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E9%81%BF%E5%85%8D%E6%8E%92%E5%BA%8F)
- **S7-36** 即使索引能够提供顺序，优化器也会比较扫描、过滤、回表和排序的总成本，不一定总选它。[原文§ORDER BY 怎么利用索引避免排序？](https://xiaolincoding.com/interview/mysql.html#order-by-%E6%80%8E%E4%B9%88%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E9%81%BF%E5%85%8D%E6%8E%92%E5%BA%8F)

### 如果Explain用到的索引不正确的话，有什么办法干预吗？

- **S7-37** 先确认优化器是不是估算错了。比如数据分布变化后，可以评估执行 ANALYZE TABLE 更新统计信息，再比较计划和实际耗时；也可以结合查询重写、索引设计解决问题。[原文§如果Explain用到的索引不正确的话，有什么办法干预吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9Cexplain%E7%94%A8%E5%88%B0%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%8D%E6%AD%A3%E7%A1%AE%E7%9A%84%E8%AF%9D-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8A%9E%E6%B3%95%E5%B9%B2%E9%A2%84%E5%90%97)
- **S7-38** 如果仍需要干预，可以使用 USE INDEX、IGNORE INDEX 或 FORCE INDEX。[原文§如果Explain用到的索引不正确的话，有什么办法干预吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9Cexplain%E7%94%A8%E5%88%B0%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%8D%E6%AD%A3%E7%A1%AE%E7%9A%84%E8%AF%9D-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8A%9E%E6%B3%95%E5%B9%B2%E9%A2%84%E5%90%97)
- **S7-39** FORCE INDEX 会把全表扫描视为成本很高，并限制候选索引，但指定索引不可用时也不是绝对不会全表扫描。[原文§如果Explain用到的索引不正确的话，有什么办法干预吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9Cexplain%E7%94%A8%E5%88%B0%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%8D%E6%AD%A3%E7%A1%AE%E7%9A%84%E8%AF%9D-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8A%9E%E6%B3%95%E5%B9%B2%E9%A2%84%E5%90%97)
- **S7-40** 提示指定的是索引名称，不是列名（例如 FORCE INDEX (idx_buyprice)）。使用前后要对比不同参数下的实际效果，数据量和分布变化后，强制使用的索引也可能变差。[原文§如果Explain用到的索引不正确的话，有什么办法干预吗？](https://xiaolincoding.com/interview/mysql.html#%E5%A6%82%E6%9E%9Cexplain%E7%94%A8%E5%88%B0%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%8D%E6%AD%A3%E7%A1%AE%E7%9A%84%E8%AF%9D-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8A%9E%E6%B3%95%E5%B9%B2%E9%A2%84%E5%90%97)

## 8. 架构

原文：[MySQL面试题 · 架构](https://xiaolincoding.com/interview/mysql.html#%E6%9E%B6%E6%9E%84)。

### MySQL主从复制了解吗

- **S8-1** MySQL 的主从复制依赖于 binlog，也就是把需要复制的数据库变更记录为二进制日志事件。复制的过程就是将 binlog 中的数据从主库传输到从库上。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-2** 这个过程一般是异步的，也就是主库上执行事务操作的线程不会等待复制 binlog 的线程同步完成。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-3** 三个阶段依次是：写入 Binlog（主库执行数据修改，在提交阶段记录并提交相应 binlog 事务）、同步 Binlog（把 binlog 复制到所有从库上，每个从库把 binlog 写到暂存日志中）、回放 Binlog（回放 binlog，并更新存储引擎中的数据）。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-4** 主库在事务执行过程中已经修改内存中的数据，提交时协调 redo 和 binlog，完成本地提交后即可返回客户端，普通异步复制不需要等待从库接收或执行完成。从库的接收线程连接主库的 binlog dump 线程，获取日志事件并写入本地 relay log。从库的应用线程读取 relay log，再更新自己的存储引擎数据。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-5** 从库的接收线程获取日志事件并写入本地 relay log。接收到日志不等于已经应用到从库数据，也不能把这个过程当成主库提交必须等待的确认。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-6** 开启并行复制后，可以由协调线程分配给多个 worker 应用事务，不过并行程度受到事务依赖等因素限制。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-7** 主从复制可以用来做读写分离，写入走主库，允许读取稍旧数据的查询走从库。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-8** 普通 InnoDB 快照读本身就不一定被主库行锁阻塞，读写分离主要是分担负载。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)
- **S8-9** 主库提交成功不代表从库马上能读到，业务必须考虑复制延迟。[原文§MySQL主从复制了解吗](https://xiaolincoding.com/interview/mysql.html#mysql%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%E4%BA%86%E8%A7%A3%E5%90%97)

### 主从延迟都有什么处理方法？

- **S8-10** 主库大事务或批量修改，从库接收到已提交事务后，需要较长时间应用。从库资源不足（CPU、磁盘 I/O 或 Buffer Pool 不够），回放比主库写入慢。从库查询或锁等待：重查询争抢资源，或者应用线程被长事务、DDL 阻塞。并行复制能力不足：事务可以并行的程度低，增加 worker 也不一定能线性提速。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-11** 网络或复制线程异常：日志传输变慢，或者复制报错停止，不能只当成正常延迟等待。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-12** 可以通过 SHOW REPLICA STATUS 和复制相关的 Performance Schema 信息，区分日志是否还没接收到，还是已经收到、但应用不完。旧版本对应 SHOW SLAVE STATUS。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-13** Seconds_Behind_Source 等时间指标适合辅助监控，但显示为 0 也不能单独证明从库已经应用了某个指定业务事务。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-14** 处理时，可以拆分允许拆分的大事务、优化从库 SQL 和硬件、排查锁等待、合理配置并行复制。把大事务继续放到主库执行，并不能消除它在从库上的回放成本。不能靠“写完 sleep 一秒”就断言数据同步完成，要按业务的一致性要求选择方案。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-15** 四类做法是：关键查询走主库（支付状态、下单后的订单确认等需要读到最新提交的查询，可以直接路由到主库）；写后短时间读主库（对刚完成写入的用户或请求，临时把相关读取切到主库）；等待指定事务应用（使用 GTID 时，在从库等待本次写入对应的 GTID 后再读取）；接受最终一致性（报表、非关键列表等允许短暂延迟的场景，可以继续读从库）。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-16** 写后短时间读主库：对刚完成写入的用户或请求，临时把相关读取切到主库，降低读旧数据的概率，不过固定时间窗口不是严格保证。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-17** 使用 GTID 时，可以获取本次写入事务的 GTID，在从库执行 WAIT_FOR_EXECUTED_GTID_SET() 等待，成功后再建立新的读取快照；超时就回退主库或返回可重试结果。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)
- **S8-18** 接受最终一致性：报表、非关键列表等允许短暂延迟的场景，可以继续读从库，配合延迟监控和异常从库摘除。[原文§主从延迟都有什么处理方法？](https://xiaolincoding.com/interview/mysql.html#%E4%B8%BB%E4%BB%8E%E5%BB%B6%E8%BF%9F%E9%83%BD%E6%9C%89%E4%BB%80%E4%B9%88%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)

### 异步复制和半同步复制有什么区别？

- **S8-19** 异步复制：主库本地提交成功就可以响应客户端，不需要等从库。延迟较低，但主库发生故障时，已经返回成功的事务可能还没复制到从库，切换后可能丢失。半同步复制：主库在返回提交成功前，通常需要等至少一个半同步从库确认已接收事务日志，并写入、刷盘到 relay log。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-20** 异步复制：主库本地提交成功就可以响应客户端，不需要等从库。延迟较低，但主库发生故障时，已经返回成功的事务可能还没复制到从库，切换后可能丢失。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-21** 半同步复制：主库在返回提交成功前，通常需要等至少一个半同步从库确认已接收事务日志，并写入、刷盘到 relay log。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-22** 半同步等待的是日志接收和持久化确认，不是等待从库把事务应用到数据表，所以它仍不能保证提交后立即在从库读到新值。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-23** 半同步等待超过配置的超时时间后，可能退化成异步复制。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-24** 故障切换时还要选择包含目标事务的从库，并确认日志应用进度，不能仅凭“开启了半同步”就认为任何切换都绝对不会丢数据。[原文§异步复制和半同步复制有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%BC%82%E6%AD%A5%E5%A4%8D%E5%88%B6%E5%92%8C%E5%8D%8A%E5%90%8C%E6%AD%A5%E5%A4%8D%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### GTID 是什么？有什么作用？

- **S8-25** GTID 是全局事务标识，可以把它理解成每个复制事务的唯一编号。事务复制到其他节点后，仍然携带同一个 GTID。[原文§GTID 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#gtid-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S8-26** GTID 常见形式是「源服务器 UUID:事务序号」。[原文§GTID 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#gtid-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S8-27** 传统复制需要指定从某个 binlog 文件的哪个位置开始；GTID 复制可以根据从库已经执行过的事务集合，判断还缺哪些事务。[原文§GTID 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#gtid-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **S8-28** GTID 让切换主库和恢复复制位置更方便，也能帮助避免重复应用同一个复制事务。GTID 还可以用于判断某笔事务是否已经在从库执行，例如在从库等待本次写入对应的 GTID，等待成功后再读取，就可以处理一部分写后读一致性需求。不过，GTID 只是标识和跟踪事务，不会自动消除主从延迟，也不是应用业务请求的幂等键。[原文§GTID 是什么？有什么作用？](https://xiaolincoding.com/interview/mysql.html#gtid-%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

### 分表和分库是什么？有什么区别？

- **S8-29** 分库是把业务表或数据分散到多个数据库中，如果落到不同实例或服务器上，就能分担存储、连接和读写压力；如果只是同一实例里多建几个库，仍然共享同一套物理资源。分表主要解决单表访问和存储方面的问题，但如果仍在同一个实例，并不会自动突破单机 CPU、I/O 等资源上限。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-30** 按行拆叫水平分表，每张子表保存部分记录；按列拆叫垂直分表，各表通过主键关联。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-31** 四种方案是：垂直分库、垂直分表、水平分库、水平分表。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-32** 垂直分库一般按业务和功能的维度拆分，将不同业务数据分别放到不同的数据库中，核心理念是专库专用。例如订单、支付、会员、积分相关的表放在对应的订单库、支付库、会员库、积分库。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-33** 垂直分库把一个库的压力分摊到多个库，提升了一些数据库性能，但并没有解决由于单表数据量过大导致的性能问题，所以就需要配合分表来解决。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-34** 垂直分表针对业务上字段比较多的大表，一般是把业务宽表中比较独立的字段，或者不常用的字段拆分到单独的数据表中，是一种大表拆小表的模式。InnoDB 主要以页为单位读取和缓存数据，这样拆分以后核心表大多是访问频率较高的字段，而且字段长度也都较短，因而可以加载更多数据到内存中，减少磁盘 IO，增加索引查询的命中率，进一步提升数据库性能。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-35** 水平分库是把同一个表按一定规则拆分到不同的数据库中，每个库可以位于不同的服务器上，以此实现水平扩展。这种方案往往能解决单库存储量及性能瓶颈问题，但由于同一个表被分配在不同的数据库中，数据的访问需要额外的路由工作，因此系统的复杂度也被提升了。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **S8-36** 水平分表是在同一个数据库内，把一张大数据量的表按一定规则切分成多个结构完全相同的表，每个表只存原表的一部分数据。子表仍在同一个数据库实例中，只是解决了单一表数据量过大的问题，并没有将拆分后的表分散到不同的机器上，还在竞争同一个物理机的 CPU、内存、网络 IO；要想进一步提升性能，就需要将拆分后的表分散到不同的数据库中，达到分布式的效果。[原文§分表和分库是什么？有什么区别？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E8%A1%A8%E5%92%8C%E5%88%86%E5%BA%93%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 分库分表后会遇到哪些问题？怎么选分片键？

- **S8-37** 五类问题是：跨分片查询、跨分片事务、全局唯一性、分页和统计、扩容和迁移。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-38** 跨分片查询：没有分片键的查询可能需要访问多个分片，再合并、排序或聚合结果。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-39** 跨分片事务：一次操作涉及多个数据库时，单库事务不能直接保证全部成功，需要结合业务采用分布式事务或补偿等方案。（这里的“多个数据库”指分布在不同实例上的库；如果几个库只是同一个 MySQL 实例里的不同 database，一个本地事务就可以同时修改并一起提交。需要分布式事务的是跨多个数据库服务器、多个独立事务资源的情况。）[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)[核对来源：MySQL 8.0 XA Transactions](https://dev.mysql.com/doc/refman/8.0/en/xa.html)
- **S8-40** 全局唯一性：各分片独立自增可能重复，跨分片唯一约束也不能靠某一个库的 UNIQUE 保证，需要分布式 ID 或额外的唯一性设计。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-41** 分页和统计：全局排序、COUNT 和深分页可能需要从多个分片取数据再汇总，成本和实现难度都会增加。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-42** 扩容和迁移：分片规则变化时，需要迁移数据、切换路由，并处理迁移期间的新写入与校验。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-43** 分片键通常要看三个方面：高频查询能不能带上它、数据能不能均匀分布、相关业务数据能不能尽量落到同一分片。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-44** 比如订单主要按用户查询，可以考虑按 user_id 分片，让同一用户的订单集中在一起。不过，大客户可能产生热点，按订单号查询又可能需要额外路由。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-45** 按时间拆分便于归档，却可能让最新分片承受大部分写入。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
- **S8-46** 分片键没有通用答案，要从主要访问路径出发，再权衡热点、事务边界和扩容方式。[原文§分库分表后会遇到哪些问题？怎么选分片键？](https://xiaolincoding.com/interview/mysql.html#%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E5%90%8E%E4%BC%9A%E9%81%87%E5%88%B0%E5%93%AA%E4%BA%9B%E9%97%AE%E9%A2%98-%E6%80%8E%E4%B9%88%E9%80%89%E5%88%86%E7%89%87%E9%94%AE)
