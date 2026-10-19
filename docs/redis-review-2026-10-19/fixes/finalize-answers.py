from pathlib import Path
import re
base = Path(__file__).resolve().parent
root = base.parents[2]
path = root/'interview-practice/answers-xiaolin/redis.md'
text = path.read_text(encoding='utf-8')
answers = {
 'O7-80': '使用续期机制，定期检查锁仍然属于自己，再延长有效期。业务耗时稳定时可据此设置合理 TTL；耗时不确定时可用续期降低提前过期风险。续期可能因网络中断或客户端长暂停而失败，不能保证锁始终有效；业务还需防止旧持有者在锁失效后继续写入。不设置过期时间会让异常后的锁无法释放，TTL 设为 0 也不是续期。',
 'O2-38': '单 Reactor 单进程只有一个进程，无法充分利用多核 CPU。Handler 业务处理耗时长时，整个进程无法处理其他连接的事件，造成响应延迟。这个方案无需考虑进程间通信和多进程竞争。',
 'O4-38': 'AOF 重写仍由子进程完成，无论 base 采用哪种格式，都要关注 fork、写时复制、磁盘空间和子进程 I/O，不能因为在后台执行就认为完全没有性能影响。',
 'O7-76': '加锁失败的请求要有超时、退避或者降级逻辑，不能无限等待。涉及资金、库存等重要数据时，数据库约束和幂等仍然需要兜底，不能只依赖 Redis 分布式锁。',
 'O7-161': '可以把需要失效的缓存 key 写入数据库任务表，并和业务更新放在同一事务里，再由后台任务可靠地投递消息和重试删除；也可以订阅 binlog 捕获已提交的变更。只发送一次消息后不再处理，仍把可靠性压在一次发送上；key 只放在应用内存里会在宕机时丢失。缓存还应设置过期时间。',
 'O7-216': '可以定期重建布隆过滤器，或者考虑支持删除的其他过滤器方案。不能直接清零被删除元素对应的位，因为其他元素也可能使用这些位。容量和哈希函数数量应合理设置，增加哈希函数数量不能保证误判完全消失。',
 'O7-241': '应提前明确 Redis 不可用时是放行、拒绝还是降级，并统一时间来源，避免不同应用机器的时间差影响窗口判断。',
}
for id, answer in answers.items():
    pattern = r'^- \*\*'+id+r'\*\* (.*)$'
    old = re.search(pattern,text,re.M).group(1)
    refs = old[old.index('[原文§'):]
    text = re.sub(pattern,lambda _:f'- **{id}** {answer}{refs}',text,flags=re.M)
path.write_text(text,encoding='utf-8')
