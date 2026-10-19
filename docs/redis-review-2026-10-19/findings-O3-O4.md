# Redis O3 / O4 只读审查

审查日期：2026-10-19。未修改题卷、答案、题型数据或业务代码，未执行 Git 发布操作。

## 范围与验证

- O3 全部 39 题：单选 28、多选 5、填空 1、简答 5。
- O4 全部 55 题：单选 40、多选 7、填空 4、简答 4。
- 合计逐题核对 94 题的实际作答内容、正确标记、参考答案、原文对应小节和独立作答上下文。
- 5 道填空题（O3-23、O4-2、O4-11、O4-13、O4-35）的空数、顺序、Markdown 与 typed 题干一致；O4-11 的问题属于知识边界，而非空数配置错误。
- 脚本确认 94 个题号均有唯一题卷行和答案行；单选正确标记数量均为 1，多选均不少于 2；94 题所引用的小林原文锚点全部存在于本次 HTML 快照。
- O3 未发现明确内容错误。O4 有以下 2 项内容边界问题、1 项措辞问题；均不是选项字母错配。

## 发现 1：AOF 仅含命令的结论缺少“纯命令格式”限定

严重程度：P2。题号：O4-4、O4-19。

位置：

- `content/typed/redis.json:5828`（O4-4 题干），`:5832`（正确选项 A）。
- `content/typed/redis.json:6193`（O4-19 题干），`:6207`（正确选项 C）。
- `interview-practice/redis.md:350`、`:365`。
- `interview-practice/answers-xiaolin/redis.md:350`、`:365`。

触发条件：考生按题干未限定格式的“AOF”理解，包含开启混合持久化后由重写生成的 RDB 基础数据。O4-4 只给出逐条执行命令的正确选项；O4-19 只给出 AOF 记录命令日志的正确选项，答案进一步排除了实际数据。两题均未提供“RDB 基础数据 + 增量命令”的完整选项。

影响：原文本身同节已明确不能把全部 AOF 都理解为只有命令，且题库 O4-7～9、O4-37、O4-51 也教授混合格式；考生应用这些知识后，无法在上述两题中选择覆盖一般 AOF 情形的答案。

原因区分：这不是题库凭空编造。原文在介绍传统 AOF 与 RDB 对比时也有未经限定的表述，但该小节另一段已给出纯命令格式限定，因此属于原文前后简化未统一、题库把局部简化固化为单选规则。

建议：保留题号、题型、正确字母，在两题题干及答案加上“纯命令格式的 AOF（不含 RDB 前导/base）”限定；或把正确选项改成按纯命令与混合格式分别恢复的说法。按项目规则，若按原文矛盾核对修订，答案注明原文的泛化说法并添加官方核对链接。

证据：

- [小林原文：持久化方式](https://xiaolincoding.com/interview/redis.html#redis有哪些持久化方式-分别的优缺点是什么)：本地 `source.txt:565` 描述混合格式及恢复次序，`:576` 明确纯命令格式及不能将所有 AOF 都视为只有命令；`:577` 的传统对比段又使用未经限定的 AOF 表述。
- [Redis 官方 persistence：Append-only file](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/#append-only-file)：7.0 起的 AOF base 可为 RDB 或 AOF 格式，增量文件记录后续变化；同页截断恢复的日志示例也先读取 RDB preamble，再读 AOF tail。

## 发现 2：O4-11 将 fsync 写成未限定策略下必经的最后环节

严重程度：P2。主问题题号：O4-11；关联解释：O4-10。

位置：

- `content/typed/redis.json:6017`。
- `interview-practice/redis.md:357`。
- `interview-practice/answers-xiaolin/redis.md:357`（第三空固定为 fsync）。
- 关联解释 `interview-practice/answers-xiaolin/redis.md:356`。

触发条件：采用题组已覆盖的 `appendfsync no` 策略。Redis 将 AOF 内容写入内核 page cache 后，不会主动调用 fsync，实际刷盘交由操作系统。

影响：未指定策略的通用流程填空仍要求第三空填 fsync，造成对 No 策略的错误概括，并与 O4-17 的正确说法相矛盾。空数及 ordered 设置本身正确。

原因区分：原文 `source.txt:570` 的总述也有同样简化，但 `:573` 紧接着说明 No 不主动 fsync。属于原文技术简化继承，而非题型配置错误。

建议：保持 3 空有序，在题干加“采用主动 fsync 的策略时”，把第三段改成“通过 ____ 主动要求同步落盘”；答案说明 always/everysec 的调用时机以及 no 的例外。关联 O4-10 解释同步加策略边界。若按技术核对修订，注明原文总述的简化并补官方链接。

证据：

- [小林原文：持久化方式](https://xiaolincoding.com/interview/redis.html#redis有哪些持久化方式-分别的优缺点是什么)：本地 `source.txt:570` 与 `:573` 的总述/No 例外。
- [Redis 官方 persistence：How durable is the append only file?](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/#how-durable-is-the-append-only-file)：`appendfsync no` 不执行 fsync，刷新取决于操作系统；always/everysec 才规定主动同步时机。

## 发现 3：O4-14 正确选项把“缓冲区写入文件”缩写成“写入缓冲区”

严重程度：P3。题号：O4-14。

位置：`content/typed/redis.json:6072`；参考答案 `interview-practice/answers-xiaolin/redis.md:360` 的步骤则正确。

触发条件：考生区分向用户态 aof_buf 追加命令、write 文件、fsync 文件三个阶段。选项 C 把 fsync 紧接在“每次写入 AOF 缓冲区后”，而原文与答案均指缓冲区内容写入文件之后，并允许批处理合并 write/fsync。

影响：正确选项的表述易被理解为每向用户态缓冲区追加一次即直接 fsync，掩盖中间 write 步骤及批量刷盘；同题参考答案和实际选项不完全一致。正确字母 C 不需改变。

建议：将正确选项开头改为“每次将 AOF 缓冲区内容写入文件后，主线程调用 fsync，完成同步后再确认写入；同批命令可以合并写入和刷盘”。

证据：

- [小林原文：持久化方式](https://xiaolincoding.com/interview/redis.html#redis有哪些持久化方式-分别的优缺点是什么)：本地 `source.txt:571` 描述文件写入后的 fsync 及批量合并。
- [Redis 官方 persistence：How durable is the append only file?](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/#how-durable-is-the-append-only-file)：always 支持同批多个客户端或 pipeline 命令一次 write、一次 fsync，并在发回复前完成。

## 未列为错误的边界

- O4-6 询问 `aof-use-rdb-preamble yes` 这一混合格式配置项，与原文及实际配置含义一致；未因题干没罗列所有 AOF 启用步骤而判错。
- O4-16 已正确说明 everysec 的约 1 秒并非绝对丢失上限。
- O4-21、O4-38、O4-46 已正确保留 fork、写时复制的代价；未将“子进程执行”误判为完全无阻塞。
- O4-34～37 已区分 7.0 前后重写流程及 base 格式，未见版本混用。
- O4-49～55 已正确区分独立 dump.rdb 与 AOF 中的 RDB 基础部分，也没有声称 AOF 损坏必然回退 dump.rdb。
