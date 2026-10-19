import json
import re
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[3]
BASE = Path(__file__).resolve().parent
typed = ROOT / 'content/typed/redis.json'
paper = ROOT / 'interview-practice/redis.md'
answer = ROOT / 'interview-practice/answers-xiaolin/redis.md'
data = json.loads(typed.read_text(encoding='utf-8'))
qs = {q['id']: q for c in data['chapters'].values() for q in c['questions']}
md = paper.read_text(encoding='utf-8')
ans = answer.read_text(encoding='utf-8')
notes = {}

def note(id, reason):
    notes.setdefault(id, []).append(reason)

def line(text, id):
    return re.search(r'^- \*\*' + re.escape(id) + r'\*\* (.*)$', text, re.M).group(1)

def setline(text, id, value):
    return re.sub(r'^- \*\*' + re.escape(id) + r'\*\* .*$', lambda _: f'- **{id}** {value}', text, flags=re.M)

def stem(id, value, reason):
    global md
    qs[id]['stem'] = value
    marker = '[填空题·有序] ' if qs[id].get('blankOrder') == 'ordered' else '[填空题·无序] ' if qs[id]['type'] == 'fill' else ''
    md = setline(md, id, marker + value)
    note(id, reason)

def body(id, value, reason):
    global ans
    old = line(ans, id)
    refs = old[old.index('[原文§'):]
    ans = setline(ans, id, value + refs)
    note(id, reason)

def replace_answer(id, old, new, reason):
    global ans
    current = line(ans, id)
    assert old in current, (id, old)
    ans = setline(ans, id, current.replace(old, new))
    note(id, reason)

def official(id, text, url):
    global ans
    ans = setline(ans, id, line(ans, id) + f' [核对来源：{text}]({url})')

persist = 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/'
bloom = 'https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/'
cluster = 'https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/#create-a-redis-cluster'
slots = 'https://redis.io/docs/latest/commands/cluster-addslots/'
rate = 'https://redis.io/docs/latest/develop/use-cases/rate-limiter/rust/#sliding-window-log'

replace_answer('O1-24', '所以最后一项不对。', '因此“不同 Stream 之间的消息 ID 保证全局唯一”不成立。', '解析按内容解释，不依赖旧选项位置')
replace_answer('O1-54', '成立的是前三项：', '成立的说法是：', '删除旧选项排列指代')
stem('O1-51', 'Redis 7.0 默认配置下，从空 Zset 逐个插入 128 个成员，每个成员不超过 64 字节，期间未超过任何紧凑编码限制。此时使用哪种编码？', '补默认配置和构建历史，排除降回阈值仍保留 skiplist 的反例')
replace_answer('O1-51', '恰好等于上限时仍用 listpack', '在题设从空集合构建且期间未超限的前提下，恰好等于上限时仍用 listpack', '解析同步限定编码历史')
replace_answer('O1-59', '小型有序集合使用 listpack', '默认配置下，从空集合构建且期间未超过紧凑编码限制的小型有序集合使用 listpack', '同源编码结论同步限定；不把当前大小作为编码充分条件')
stem('O2-4', '按原文，下列哪些是单次执行可能占用较多 CPU 的典型情况？', '限定单次执行开销，不绝对排除高 QPS 普通查询')
qs['O2-4']['options'][3]['text'] = '低请求量、小 value 的简单 GET 查询'
replace_answer('O2-4', '不会因此让 CPU 成为瓶颈。', '这里比较单次执行开销；不能据此断言普通查询在任意请求量下都不会遇到 CPU 瓶颈。', '去掉无条件否定')
qs['O2-21']['options'][4]['text'] = '官方建议预留至少一个 CPU 核，并根据压测调优线程数'
body('O2-21', '官方配置注释建议预留至少一个 CPU 核，4 核可尝试 2 或 3，8 核可尝试 6，具体按压测调优；线程数并非越多越好。原文说“线程数一定要小于机器核数”，这里应理解为调优建议，并非参数合法性的硬性规则。', '原文硬性规则改为官方调优建议')
replace_answer('O2-25', '线程数要小于核数，4 核建议 2 或 3，8 核建议 6。', '官方建议预留至少一个 CPU 核，4 核可尝试 2 或 3，8 核可尝试 6，具体按压测调优（原文说“线程数一定要小于机器核数”，这是调优建议，不是参数合法性的硬性规则）。', '同源线程建议同步核对')
for id in ['O2-21', 'O2-25']:
    official(id, 'Redis 6.0 配置注释', 'https://github.com/redis/redis/blob/6.0/redis.conf#L941')

stem('O4-4', '按原文，Redis 启动时如何利用纯命令格式的 AOF（不含 RDB 前导或 RDB base）恢复数据？', '限定纯命令格式，避免和混合持久化矛盾')
body('O4-4', '对纯命令格式的 AOF，Redis 启动时读取其记录的命令并逐一执行以恢复数据。混合格式需要先加载 RDB 基础数据，再回放增量命令。（原文传统对比段泛称 AOF 回放命令，但同节也说明并非所有 AOF 都只有命令；这里补齐格式限定。）', '保留原文简化说明并官方核对')
stem('O4-19', '按原文，RDB 快照和纯命令格式的 AOF（不含 RDB 前导或 RDB base）各自记录什么？', '限定对比所用 AOF 格式')
body('O4-19', 'RDB 快照记录某个时间点的实际数据；纯命令格式的 AOF 记录命令日志。（原文传统对比段泛称 AOF 不记录实际数据，但同节混合持久化的 RDB 基础部分也保存实际数据，因此不能把该说法推广到全部 AOF。）', '解释原文前后简化并核对')
for id in ['O4-4','O4-19']:
    official(id, 'Redis AOF 基础文件格式', persist + '#append-only-file')
body('O4-10', 'Redis 执行写命令后，先将命令追加到用户态 aof_buf，再通过 write() 写入内核 page cache。always/everysec 按策略主动调用 fsync()；appendfsync no 不主动调用，由操作系统决定刷盘。（原文总述把 fsync 写作最后阶段，同节 No 策略给出例外；这里补齐边界。）', '补 appendfsync no 例外及原文说明')
stem('O4-11', '采用主动 fsync 的 AOF 策略时，Redis 执行写命令后，先追加到用户态的 ____，再通过 write() 写入内核的 ____，最后通过 ____ 主动要求同步落盘。', '限定主动 fsync 策略；三空有序不变')
body('O4-11', '3 个空依次是 aof_buf（缓冲区）、page cache、fsync()。always 在确认写入前同步，everysec 通常由后台线程每秒同步；no 不主动调用 fsync，由操作系统刷盘。（原文流程总述未限定策略，但同节明确给出 No 例外；题干据此加限定。）', '三空答案保留，补策略边界和原文说明')
for id in ['O4-10','O4-11']:
    official(id, 'Redis AOF 同步策略', persist + '#how-durable-is-the-append-only-file')
qs['O4-14']['options'][2]['text'] = '每次将 AOF 缓冲区内容写入文件后，主线程调用 fsync()，完成同步后再确认写入；同批命令可合并写入和刷盘'
note('O4-14', '恢复用户态缓冲区到 write 再 fsync 的步骤；保留 C 正确')
replace_answer('O4-14', '但磁盘同步开销也大。', '但磁盘同步开销也大；同批命令可以合并为一次 write 和一次 fsync。', '解析补批处理说明')

stem('O5-24', '按原文，选择了 volatile 系列策略，但没有设置过期时间的 key 可供淘汰时，可能出现什么情况？', '将过期键统一为设置了过期时间的键，避免误解为已到期')
stem('O6-61', '过滤不合适的从节点后，若候选节点的 replica-priority 和复制偏移量均相同，Sentinel Leader 怎样决出新主节点？', '补优先级相同的独立作答前提')
replace_answer('O6-61', '偏移量也相同', 'replica-priority 和复制偏移量均相同', '解析同步选主排序前提')
qs['O6-75']['options'][1]['text'] = 'redis-cli --cluster create ...'
body('O6-75', '使用 redis-cli --cluster create 加节点地址等参数创建集群并分配槽。CLUSTER MEET 建立节点间连接，CLUSTER ADDSLOTS 手动分配指定槽号，CLUSTER SHARDS 获取槽位映射。（原文简写为 cluster create，实际是 redis-cli 的客户端管理选项，不是服务端 CLUSTER CREATE 子命令。）', '修客户端集群管理命令')
official('O6-75', 'Redis 创建集群', cluster)
stem('O6-76', '按原文，手动分配哈希槽时，先用 ____ 命令手动建立节点间的连接、组成集群，再用 ____ 命令将指定槽号列表分配给当前节点。', 'ADDSLOTS 参数是槽号列表，不是槽个数')
body('O6-76', '2 个空依次是 CLUSTER MEET、CLUSTER ADDSLOTS。ADDSLOTS 参数是具体槽号列表，例如 ADDSLOTS 2 分配的是槽号 2，而不是两个槽。（原文称“哈希槽个数”，这里按官方语法修正。）', '注明原文参数错误并核对')
official('O6-76', 'CLUSTER ADDSLOTS 语法', slots)
replace_answer('O6-89', '用 cluster create 创建集群时自动平均分配，或用 cluster meet 建立连接后再用 cluster addslots 手动指定。', '用 redis-cli --cluster create 加节点地址等参数创建集群时自动分配，或用 CLUSTER MEET 建立连接后再用 CLUSTER ADDSLOTS 指定槽号列表。（原文把创建命令简写为 cluster create，并将 ADDSLOTS 参数称为“槽个数”；实际分别是客户端管理选项和具体槽号列表。）', '同源命令与槽参数同步修订')
official('O6-89', 'Redis 创建集群', cluster)
official('O6-89', 'CLUSTER ADDSLOTS 语法', slots)

stem('O7-31', '面对“Redis 单节点 + MySQL 单节点能承受多大并发量”的问题，更合适的回答思路是什么？', '补完整场景，移除这类的前文依赖')
stem('O7-80', '按原文，业务耗时不确定时，可以采用什么机制降低锁在业务完成前过期的风险？', '将绝对保证改为降低风险')
replace_answer('O7-80', '使用续期机制，定期检查锁仍然属于自己，再延长有效期。', '使用续期机制，定期检查锁仍然属于自己，再延长有效期。续期可能因网络中断或客户端长暂停而失败，不能保证锁始终有效；业务还需防止旧持有者在锁失效后继续写入。', '解析同步续期局限')
stem('O7-128', 'SCAN 从游标 0 开始直到再次返回 0 的完整扫描中，不使用会排除目标 key 的 MATCH/TYPE 条件时，哪类 key 保证会被返回？', '可能返回改为保证返回，明确完整扫描和过滤条件')
body('O7-128', '完整扫描期间一直存在的 key 保证会被返回。中途新增、删除或删除后重建的 key 可能返回，也可能不返回，不能将“不保证返回”理解为“不能返回”。', '解析明确可能与保证的区别')
coverage = '过滤器已正确覆盖数据库中所有待判断数据，且不存在同步滞后'
stem('O7-209', f'假设{coverage}。用布隆过滤器查询时，如果数据没有被标记，说明什么？', '补过滤器对数据库的覆盖前提')
body('O7-209', f'在{coverage}的前提下，过滤器否定说明数据不在数据库中。数据库已新增而过滤器尚未更新时，不能直接得出该结论。', '解析同步数据库覆盖前提')
stem('O7-211', f'位图长度为 8、哈希函数有 3 个的布隆过滤器中，待查询数据 x 的哈希位置为 1、4、6。假设{coverage}，哪种判据足以判断 x 不在数据库中？', '删除已标记的冲突状态，并补覆盖前提')
replace_answer('O7-211', '只要第 1、4、6 位中有一个为 0', '在题设覆盖前提下，只要第 1、4、6 位中有一个为 0', '解析同步覆盖前提')
stem('O7-213', f'假设{coverage}。布隆过滤器判断“存在”和判断“不存在”各意味着什么？', '统一同源覆盖条件，避免已加入元素却被否定的表述')
qs['O7-213']['options'][1]['text'] = '判断“存在”只是可能在数据库中；判断“不存在”则一定不在数据库中'
body('O7-213', f'在{coverage}的前提下，判断“存在”只是可能在数据库中，判断“不存在”则一定不在数据库中。（原文写“对已正确加入过滤器的数据”容易误解；准确含义是过滤器正确表示待判断集合，已正确加入的元素本身不会被算法否定。）', '纠正原文同源措辞并说明原说法')
official('O7-213', 'Redis Bloom filter 的集合语义', bloom)
replace_answer('O7-218', '查询时检查这些位置的值是否全为 1，只要有一个为 0，就认为数据不在数据库中。', f'在{coverage}的前提下，查询时检查这些位置是否全为 1，只要有一个为 0，就可判断数据不在数据库中。', '同源数据库否定结论补覆盖前提')
replace_answer('O7-218', '判断“不存在”对已正确加入过滤器的数据来说一定不存在', '判断“不存在”表示不属于过滤器所表示的集合，在正确完整覆盖数据库且无同步滞后时才能推出数据库不存在（原文写“对已正确加入过滤器的数据”，这里澄清其所指的集合覆盖前提）', '修原文已加入数据的歧义')
official('O7-218', 'Redis Bloom filter 的集合语义', bloom)
qs['O7-237']['options'][3]['text'] = '先删除窗口外的数据，再统计现有数量，严格小于阈值时才记录并放行当前请求'
replace_answer('O7-237', '没有超过阈值才记录当前请求', '现有数量严格小于阈值时才记录并放行当前请求；达到阈值就拒绝（原文说“没有超过阈值才记录”，这里明确新增前的比较边界）', '修滑动窗口等号边界并注明原文说法')
replace_answer('O7-242', '没超阈值才记录当前请求', '现有数量严格小于阈值时才记录并放行当前请求，达到阈值就拒绝（原文说“没有超过阈值才记录”，这里明确比较的是新增前数量）', '同源滑动窗口边界同步修订')
for id in ['O7-237','O7-242']:
    official(id, 'Redis 滑动窗口日志示例', rate)

# 两个短事实的组合适合单选；需要解释机制和取舍的题保留完整问法改简答。
singles = {
 'O1-14': ('以 Redis 7.0 为例，在 String、Hash、Set、Zset 这四种类型中，哪一组的常见底层编码都包含 listpack？', ['Hash、Zset','String、Zset','Hash、Set','String、Set'], 0, '两种类型名称组成封闭组合，单选辨认版本编码'),
 'O1-16': ('按原文的数据类型应用分类，哪一组都属于 String 的应用场景？', ['排行榜、购物车','缓存对象、分布式锁','共同关注、排行榜','购物车、共同关注'], 1, '场景分类组合，保留两个原正确场景'),
 'O1-85': ('与 B+ 树和红黑树相比，哪一组维护操作是跳表在插入、删除时不需要做的？', ['随机生成层高、调整路径指针','节点分裂合并、调整路径指针','节点分裂合并、维护颜色和旋转规则','随机生成层高、维护颜色和旋转规则'], 2, '两类树维护操作组成互斥组合'),
 'O1-101': ('下列哪一组变化都可能引起压缩列表内存重新分配，最糟糕时触发连锁更新？', ['读取 zlbytes、通过 zltail 定位尾节点','增加元素数量、读取 zlbytes','元素变大、通过 zltail 定位尾节点','增加元素数量、元素变大'], 3, '修改与只读操作的两项组合辨认'),
 'O1-112': ('listpack 沿用压缩列表的哪一组设计？', ['连续内存紧凑存储、按数据大小采用不同编码','连续内存紧凑存储、记录前一个节点长度','双向链表串联容器、按数据大小采用不同编码','双向链表串联容器、记录前一个节点长度'], 0, '两项设计特征的互斥组合'),
 'O2-30': ('以 epoll 为例，内核通知 Redis 的是哪一组 Socket 就绪状态？', ['命令解析完成、命令执行完成','有数据可读、发送缓冲区可继续写入','有数据可读、命令执行完成','命令解析完成、发送缓冲区可继续写入'], 1, '两种就绪状态与解析执行完成的组合辨认'),
 'O3-14': ('哪一组都属于 Redis 事务入队时就能发现的错误？', ['命令不存在、对 String 执行 LPOP','参数数量错误、对 String 执行 LPOP','命令不存在、参数数量错误','对 String 执行 LPOP、执行时返回 WRONGTYPE'], 2, '入队错误与执行期类型错误的组合分类'),
 'O3-34': ('关于 Pipeline 的整批命令，哪一组对“是否会被其他客户端请求穿插”和“失败回滚”的描述正确？', ['保证不被穿插；提供失败回滚','保证不被穿插；不提供失败回滚','不保证不被穿插；提供失败回滚','不保证不被穿插；不提供失败回滚'], 3, '两个布尔性质用四种互斥组合考查'),
 'O4-32': ('哪一组是 AOF 重写的手动触发方式和自动触发依据？', ['BGREWRITEAOF；文件大小和增长比例','BGSAVE；文件大小和增长比例','BGREWRITEAOF；每执行一条写命令','BGSAVE；每执行一条写命令'], 0, '触发命令与自动条件的四种组合'),
 'O5-47': ('哪一组都能使定期删除的一轮检查退出？', ['找到首个过期 key、收到首个读请求','过期比例足够低、用完本轮时间预算','找到首个过期 key、遍历完所有 key','收到首个读请求、遍历完所有 key'], 1, '两个退出条件组成封闭组合'),
 'O5-72': ('对仍存在且带 TTL 的 key，哪一组成功操作都会清除 TTL，使 key 变为没有过期时间？', ['PERSIST；EXPIRE 重设正数有效期','不带 KEEPTTL 的普通 SET；INCR','PERSIST；不带 KEEPTTL 的普通 SET','HSET；LPUSH'], 2, '区分清除与重设 TTL，两个操作组合单选'),
 'O6-22': ('主节点已确认复制 ID 兼容。所需数据仍在 backlog 和已不在 backlog 时，分别采用哪种同步？', ['全量；全量','增量；增量','全量；增量','增量；全量'], 3, '补 ID 前提，两分支配对单选'),
}
shorts = {
 'O2-38': ('单 Reactor 单进程方案有哪些主要缺点？分别说明对 CPU 利用和响应延迟的影响。', '两项缺点需解释性能影响，改简答'),
 'O4-38': ('AOF 重写在后台子进程进行，为什么仍需要关注性能影响？有哪些主要代价？', '正确项含重叠概括，合并为完整机制解释'),
 'O7-75': ('按原文举出可以考虑分布式锁的两个场景，并说明它们共同需要解决什么问题。', '场景及互斥目的需解释，避免机械组合长选项'),
 'O7-76': ('使用 Redis 分布式锁时，加锁失败的请求和重要业务数据分别需要哪些保护措施？', '两类保护措施各需一句解释，改简答'),
 'O7-161': ('怎样避免缓存失效的可靠性只依赖一次同步删除或一次消息发送？说明原文给出的两种做法。', '事务任务表和 binlog 机制较长，简答保留完整考点'),
 'O7-216': ('数据库删除数据较多时，可以怎样维护布隆过滤器？为什么不应直接清零对应位？', '两种处理方案及原因适合简答'),
 'O7-241': ('无论采用哪种 Redis 限流方案，对 Redis 不可用和时间来源分别要做什么约定？', '故障策略与统一时间需解释，改简答'),
}
retained = {
 'O1-16': 'String 场景原文还列常规计数、共享 session 等，属于开放场景辨别；仅两个选项正确不等于原知识点只有两项，保留多选。',
 'O3-14': '入队错误是例子而非封闭的两项名称；此题辨别入队与执行阶段，保留多选。',
 'O7-75': '分布式锁场景是开放举例，并非穷举两个并列要点；此题辨别互斥场景，保留多选。',
}
for id in retained:
    singles.pop(id, None)
    shorts.pop(id, None)
for id, (text, options, position, reason) in singles.items():
    qs[id]['type'] = 'single'
    qs[id]['options'] = [{'key': chr(65+i), 'text': t, 'correct': i == position} for i, t in enumerate(options)]
    stem(id, text, reason)
for id, (text, reason) in shorts.items():
    qs[id].clear()
    qs[id].update(id=id, type='short')
    md = setline(md, id, text)
    note(id, reason)
body('O6-22', '在复制 ID 兼容的前提下，所需数据仍在 repl_backlog_buffer 中可增量同步；已不在时需全量同步。断连不必然要求全量，但仅复制 ID 兼容也不够，还要检查偏移量对应的数据是否仍可续传。', '同步两分支解析，补复制 ID 兼容前提')

typed.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
paper.write_text(md, encoding='utf-8')
answer.write_text(ans, encoding='utf-8')

counts = Counter(q['type'] for q in qs.values())
for file in [ROOT/'interview-practice/README.md', ROOT/'CLAUDE.md']:
    text = file.read_text(encoding='utf-8')
    text = text.replace('单选 518、多选 90、填空 90、简答 76', f'单选 {counts["single"]}、多选 {counts["multiple"]}、填空 {counts["fill"]}、简答 {counts["short"]}')
    text = text.replace('单选 4674、多选 634、填空 830、简答 1941', '单选 4684、多选 618、填空 830、简答 1947')
    link = 'docs/redis-review-2026-10-19/fixes/fix-summary.md' if file.name == 'CLAUDE.md' else '../docs/redis-review-2026-10-19/fixes/fix-summary.md'
    text += f'\n2026-10-19 按 Redis 审查报告修订 {len(notes)} 个题号，修复题意歧义、条件遗漏、解析位置及原文技术简化；19 道两项正确的多选候选逐题复核，10 道改为单选、6 道改为简答、3 道保留多选。Redis 共 774 题，题号、题序及 7 章 `draft` 不变，当前单选 528、多选 74、填空 90、简答 82。原文问题保留原说法并附官方核对来源；逐题内容与验证见[修复清单]({link})。\n'
    file.write_text(text, encoding='utf-8')

changes = []
olddata = json.loads((BASE/'before/content/typed/redis.json').read_text(encoding='utf-8'))
oldqs = {q['id']:q for c in olddata['chapters'].values() for q in c['questions']}
oldmd = (BASE/'before/interview-practice/redis.md').read_text(encoding='utf-8')
oldans = (BASE/'before/interview-practice/answers-xiaolin/redis.md').read_text(encoding='utf-8')
for id in qs:
    before = {'typed':oldqs[id], 'paper':line(oldmd,id), 'answer':line(oldans,id)}
    after = {'typed':qs[id], 'paper':line(md,id), 'answer':line(ans,id)}
    if before != after:
        changes.append({'id':id, 'reasons':notes[id], 'before':before, 'after':after})
(BASE/'before-after.json').write_text(json.dumps({'counts':dict(counts),'changedQuestionCount':len(changes),'questions':changes}, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
summary = ['# Redis 修复清单', '', f'共修订 {len(changes)} 个题号。774 题的 ID、题序及 7 章 draft 均保持不变。题型由单选 518、多选 90、填空 90、简答 76 改为单选 528、多选 74、填空 90、简答 82。', '', '## 逐题修复', '', '| 题号 | 处置 |', '| --- | --- |']
summary += [f'| {c["id"]} | {"；".join(c["reasons"])} |' for c in changes]
summary += ['', '## 19 道仅两项正确的多选逐题处置', '', '| 题号 | 新题型 | 理由 |', '| --- | --- | --- |']
summary += [f'| {id} | single | {item[3]} |' for id,item in singles.items()]
summary += [f'| {id} | short | {item[1]} |' for id,item in shorts.items()]
summary += [f'| {id} | multiple（保留） | {reason} |' for id,reason in retained.items()]
summary += ['', '没有通过增加第三个正确项凑多选。10 道单选均为四个可区分的组合；6 道简答保留完整机制解释。原报告仅凭两个正确选项列出19道候选，并不足以断言都违反两并列要点约定；3 道开放场景/例子辨别题保留多选，理由逐题列出。', '', '## 同源检查与未改项', '', '- O1-59 已同步编码历史前提。O4-20 仅讨论 SAVE 在主线程生成 RDB 的阻塞，未包含 AOF 内容格式或 fsync 通用流程的错误，保留原题；其干扰项“主线程不受任何影响”仍明确错误。', '- O6-89 同步修正客户端创建命令及 ADDSLOTS 槽号参数；O7-213/O7-218 同步澄清集合覆盖与数据库否定的边界。', '- O5-24 是 findings 建议的措辞澄清，一并改为设置了过期时间的 key，未改变正确项。', '', '## 证据与限制', '', '- 原文小节引用全部保留；原文错误/矛盾另说明原说法并增加“核对来源：”官方链接。', '- before-after.json 保存每道变更的题型数据、题卷和参考答案前后完整内容。', '- 原报告、原始 checks 和来源快照保持原样；未运行 Redis 实例反例实验。', '- 验证命令及结果见 implementation-report.md；主 Agent 负责最终单元测试和带 draft 构建。', '']
(BASE/'fix-summary.md').write_text('\n'.join(summary),encoding='utf-8')
print(json.dumps({'changed':len(changes),'counts':counts,'singlePositions':Counter(o['key'] for q in qs.values() if q['type']=='single' for o in q['options'] if o['correct'])},ensure_ascii=False))
