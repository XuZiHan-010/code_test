# 数据结构与算法面试题 原文章节摘编

仅依据各题所列的小林coding原文小节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分不出题，不使用其他网站补充。整理日期：2026-10-14。

## 1. 数据结构

原文：[数据结构与算法面试题 · 数据结构](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)。

### 了解哪些数据结构？

- **R1-1** 数组的内存空间是连续的，随机访问的时间复杂度是 O(1)，适用于需要按索引访问元素的场景；插入和删除元素较慢，时间复杂度是 O(n)，因为可能需要移动后续元素。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-2** 链表由节点组成，节点之间分散存储、内存不连续，每个节点存储数据和指向下一个节点的指针。它适用于频繁插入和删除元素的场景，随机访问元素较慢。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-3** 栈是后进先出（LIFO）的数据结构；队列是先进先出（FIFO）的数据结构。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-4** 栈只允许在栈顶进行插入和删除操作；队列允许在队尾插入元素，在队首删除元素。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-5** 适合快速判断元素是否存在、统计频次的是哈希表；适合表示层次关系（如文件系统、组织结构）的是树；适合优先级队列、Top K 等场景的是堆。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-6** 哈希表通过哈希函数把键映射到桶；在哈希分布合理、负载因子受控的情况下，查找、插入和删除的平均时间复杂度为 O(1)，适合快速判断元素是否存在、统计频次等场景。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-7** 树是一种非线性数据结构，由节点和边组成，每个节点可以有多个子节点，适用于表示层次关系的场景，例如文件系统、组织结构等。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-8** 常见的二叉堆是一棵完全二叉树，堆顶保存最大值或最小值，适合优先级队列、Top K 等场景。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
- **R1-9** 图由顶点和边组成，可以表示多对多的关系，适合社交关系、路径规划、任务依赖等场景。[原文§了解哪些数据结构？](https://xiaolincoding.com/interview/data.html#%E4%BA%86%E8%A7%A3%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)

### 数组和链表区别是什么？

- **R1-10** 数组可以通过索引直接访问任何位置的元素，访问效率高，时间复杂度为 O(1)；链表需要从头节点开始遍历到目标位置，访问效率较低，时间复杂度为 O(n)。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-11** 链表在已经找到需要修改的节点及相关指针时，只需要修改指针，插入、删除的时间复杂度是 O(1)；如果要按某个值或某个位置插入、删除，仍然需要先遍历定位，整体时间复杂度是 O(n)。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-12** 单链表删除一个节点，通常还需要知道它的前驱节点。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-13** 双向链表可以通过节点本身找到前驱和后继，所以删除节点时不用像单链表那样额外获取前驱节点。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-14** 按某个值或某个位置插入、删除时，仍然需要先遍历定位，整体时间复杂度是 O(n)。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-15** 数组元素在内存中连续存储，可以提高 CPU 缓存的命中率；链表节点不连续存储，可能导致缓存命中率较低，频繁的缓存失效会影响性能。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-16** 数组适合频繁按下标访问、顺序遍历的场景；链表适合已经定位到节点后，频繁插入、删除的场景。数组也可以通过扩容实现动态大小，所以选择时不能只看是否需要动态增长。[原文§数组和链表区别是什么？](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E5%92%8C%E9%93%BE%E8%A1%A8%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### 为什么数组查询的复杂度为O(1)？

- **R1-17** 这里的“查询”指的是根据下标访问元素，不是根据值查找元素。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)
- **R1-18** 无序数组按值查找，通常还需要遍历，时间复杂度是 O(n)。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)
- **R1-19** 数组在内存中占据一块连续的空间，并且每个元素占用的存储单元大小相同，所以只要知道下标，就可以计算出元素在内存中的地址并直接读写。地址的计算次数不会随着数组长度增长，因此按下标访问的时间复杂度是 O(1)。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)
- **R1-20** 元素地址 = 数组首地址 + 下标 × 每个元素占用的字节数。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)
- **R1-21** 对象数组连续存储的通常是对象引用，对象本身不一定连续。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)
- **R1-22** 按公式，元素地址 = 数组首地址 + 下标 × 每个元素占用的字节数 = 1000 + 2 × 4 = 1008。[原文§为什么数组查询的复杂度为O(1)？](https://xiaolincoding.com/interview/data.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%95%B0%E7%BB%84%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BAo-1)

### 动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？

- **R1-23** 实际元素个数记为 size，底层数组容量记为 capacity。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)
- **R1-24** 容量还有空位时，尾部插入只需要写入元素并更新 size，时间复杂度是 O(1)；容量不足时，申请一个更大的数组，把原数组的元素复制过去，再插入新元素，这次操作的时间复杂度是 O(n)。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)
- **R1-25** 容量翻倍时会从 1 → 2 → 4 → 8…… 增长，连续插入 n 个元素时扩容复制的元素总数大致为 1 + 2 + 4 + … < 2n，加上 n 次写入，总成本是 O(n)，分摊到每次尾部插入就是 O(1)。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)
- **R1-26** 均摊复杂度说的是一连串操作的平均成本，某一次触发扩容的插入仍然可能是 O(n)。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)
- **R1-27** 如果每次只增加一个固定数量的容量，就会频繁复制已有元素，连续插入 n 个元素的总成本可能达到 O(n²)。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)
- **R1-28** 实际实现可以按其他固定比例扩容，不一定翻倍；在中间位置插入、删除要移动后续元素，即使不用扩容，通常也是 O(n)。[原文§动态数组怎么扩容？为什么尾部插入的均摊时间复杂度是 O(1)？](https://xiaolincoding.com/interview/data.html#%E5%8A%A8%E6%80%81%E6%95%B0%E7%BB%84%E6%80%8E%E4%B9%88%E6%89%A9%E5%AE%B9-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%BE%E9%83%A8%E6%8F%92%E5%85%A5%E7%9A%84%E5%9D%87%E6%91%8A%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF-o-1)

### 说一下队列和栈的区别

- **R1-29** 队列采用先进先出（FIFO）的方式，新元素插入队尾，删除操作发生在队首；栈采用后进先出（LIFO）的方式，新元素插入栈顶，删除操作也发生在栈顶。[原文§说一下队列和栈的区别](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E9%98%9F%E5%88%97%E5%92%8C%E6%A0%88%E7%9A%84%E5%8C%BA%E5%88%AB)
- **R1-30** 队列的元素按照插入的顺序进行访问，先插入的元素先被访问到；栈的元素同样按插入顺序进入，但最后插入的元素先被访问到。[原文§说一下队列和栈的区别](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E9%98%9F%E5%88%97%E5%92%8C%E6%A0%88%E7%9A%84%E5%8C%BA%E5%88%AB)
- **R1-31** 队列适用于需要按照插入顺序进行处理的场景，例如任务调度；栈适用于需要维护最近操作状态的场景，例如函数调用。[原文§说一下队列和栈的区别](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E9%98%9F%E5%88%97%E5%92%8C%E6%A0%88%E7%9A%84%E5%8C%BA%E5%88%AB)

### 介绍一下数据结构中的栈？怎么用 java 实现？

- **R1-32** 栈（stack）是一种特殊的线性数据结构，只能够在一端（即栈顶）进行插入和删除操作，采用后进先出原则（LIFO），基本操作有加入数据（push）和输出数据（pop）两种。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-33** 加入数据的操作是 push，输出数据的操作是 pop。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-34** 另外三种是链表实现、内置 Stack 类、Deque 接口配合 ArrayDeque。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-35** 数组实现时，固定容量的数组需要处理栈满的情况，也可以通过扩容实现动态栈；链表实现可以动态增加节点，但需要额外的指针空间，也受到可用内存的限制。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-36** top 初始化为 -1 表示栈空，isEmpty 就是判断 top == -1；入栈时先 top 加一再写入，栈满的条件是 top == maxSize - 1，当前元素个数是 top + 1。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-37** 内置 Stack 类继承自 Vector，主要操作带有同步开销；单个方法的同步并不意味着多个方法组合起来的操作也具备原子性。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-38** Deque 接口配合 ArrayDeque 是日常开发中实现栈的常用选择，支持 push、pop、peek，但不允许存入 null，也不是线程安全的。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-39** pop() 在栈为空时会抛出异常，peek() 则返回 null，使用前要注意判空。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)
- **R1-40** 用定长数组保存元素，top 初始为 -1 表示栈空；push 先判断栈满再 top 加一后写入，pop 先判断栈空再返回 top 处元素并让 top 减一。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  class ArrayStack:
      def __init__(self, size):
          self.max_size = size
          self.stack_array = [0] * size
          self.top = -1  # 栈顶指针，初始化为 -1 表示栈空

      def push(self, value):
          if self.top == self.max_size - 1:
              raise RuntimeError("Stack is full")
          self.top += 1
          self.stack_array[self.top] = value

      def pop(self):
          if self.is_empty():
              raise RuntimeError("Stack is empty")
          value = self.stack_array[self.top]
          self.top -= 1
          return value

      def peek(self):
          if self.is_empty():
              raise RuntimeError("Stack is empty")
          return self.stack_array[self.top]

      def is_empty(self):
          return self.top == -1

      def size(self):
          return self.top + 1  # 栈中当前元素的数量
  ```

  要点：栈满、栈空时要先检查再操作；push、pop、peek、isEmpty、size 的时间复杂度都是 O(1)，空间复杂度是 O(容量)。原文还给出了用链表实现的版本（节点 next 指向原栈顶，top 为 null 表示栈空），用链表实现同样正确。[原文§介绍一下数据结构中的栈？怎么用 java 实现？](https://xiaolincoding.com/interview/data.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E6%A0%88-%E6%80%8E%E4%B9%88%E7%94%A8-java-%E5%AE%9E%E7%8E%B0)

### 如何使用两个栈实现队列？

- **R1-41** 入队时元素压入 stackPush，出队时从 stackPop 弹出元素。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-42** 出队时先判断 stackPop 是否为空：如果不为空，直接弹出栈顶元素；如果为空，就把 stackPush 中的所有元素依次弹出并压入 stackPop，再从 stackPop 弹出栈顶元素作为出队元素。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-43** 出队和查询队首元素时，只有在 stackPop 为空时才转移元素；入队时只压入 stackPush。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-44** 如果在 stackPop 非空时继续转移，新入队的元素会跑到原有队首前面，破坏先进先出的顺序。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-45** 入队的时间复杂度是 O(1)，出队和查询队首元素的均摊时间复杂度是 O(1)，单次最坏是 O(n)。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-46** 因为每个元素只会进入 stackPush 一次、转移到 stackPop 一次，再从 stackPop 弹出一次，把一系列操作合起来看，每个元素只经过常数次栈操作。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-47** 如果两个栈都为空，原文代码中的 pop() 和 peek() 会抛出异常，需要根据业务要求处理空队列。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)
- **R1-48** 用 stackPush 接收入队元素；出队或查看队首时，只有 stackPop 为空才把 stackPush 的元素全部倒入 stackPop，再从 stackPop 取元素。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  class MyQueue:
      def __init__(self):
          self.stack_push = []
          self.stack_pop = []

      def push(self, x):
          self.stack_push.append(x)

      def pop(self):
          if not self.stack_pop:
              while self.stack_push:
                  self.stack_pop.append(self.stack_push.pop())
          return self.stack_pop.pop()  # 两个栈都空时抛出异常

      def peek(self):
          if not self.stack_pop:
              while self.stack_push:
                  self.stack_pop.append(self.stack_push.pop())
          return self.stack_pop[-1]  # 两个栈都空时抛出异常

      def empty(self):
          return not self.stack_push and not self.stack_pop
  ```

  要点：必须在 stackPop 为空时才转移，否则会破坏先进先出顺序；两个栈都空时 pop、peek 会抛出异常，需按业务要求处理空队列；入队 O(1)，出队和查看队首均摊 O(1)、单次最坏 O(n)，空间复杂度 O(n)。[原文§如何使用两个栈实现队列？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E4%B8%A4%E4%B8%AA%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97)

### 常见的队列有哪些及应用场景？

- **R1-49** 五种常见队列是顺序队列、链式队列、循环队列、双端队列和优先级队列，除顺序队列外的另外四种是链式队列、循环队列、双端队列、优先级队列。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-50** 顺序队列利用一组连续的存储单元依次存放从队头到队尾的元素，并设置两个指针：队头指针指向队头元素的位置，队尾指针指向队尾元素的下一个位置。它实现简单，但空间利用率低，当队尾指针到达数组末尾时，即使前面有空闲空间，也可能无法继续插入元素，造成假溢出。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-51** 假溢出是指顺序队列的队尾指针到达数组末尾时，即使前面有空闲空间，也可能无法继续插入元素。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-52** 顺序队列适用于一些简单的、对队列操作不太频繁且数据量相对较小的场景，如学校食堂打饭排队系统：新学生在队尾加入，打到饭的学生从队头离开。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-53** 链式队列通过链表实现，每个节点包含数据域和指针域，队头指针指向头节点，队尾指针指向尾节点。插入和删除在链表两端进行，不需要移动元素，操作效率高，可以动态分配内存，不会因为固定数组容量而发生假溢出；但仍然受到可用内存的限制，也需要额外的指针空间来存储节点之间的链接关系。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-54** 链式队列常用于处理数据量不确定、需要频繁进行插入和删除操作的场景，如操作系统中的进程调度：新进程可以随时在队尾加入等待队列，就绪的进程从队头取出执行。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-55** 循环队列把顺序队列的存储空间想象成一个首尾相接的圆环，当队尾指针到达数组末尾而数组头部还有空闲空间时，就把队尾指针重新指向数组头部继续插入元素。它充分利用了数组空间，避免了顺序队列中的假溢出，提高了空间利用率；但实现相对复杂，需要处理队头和队尾指针在循环时的特殊情况。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-56** 循环队列常用于数据缓冲区的管理，如音频、视频数据的缓冲：数据以循环的方式存入缓冲区，消费端从队头取出数据进行处理，保证数据的连续和稳定。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-57** 双端队列是一种特殊的队列，允许在队列的两端进行插入和删除操作，既有队头指针又有队尾指针，两端都可以作为队头或队尾进行操作。它很灵活，两端都能快速插入和删除元素，支持多种操作模式；但实现相对复杂，需要更多的代码来维护两端的操作逻辑。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-58** 双端队列在需要频繁在两端进行数据操作的场景中非常有用，如浏览器的页面浏览历史记录：用户可以向前和向后浏览页面，新访问的页面可以从队头或队尾插入，浏览过的页面可以从两端删除。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-59** 优先级队列中的每个元素都有一个优先级，插入和删除时会根据优先级来操作，优先级高的元素先出队；通常使用堆等数据结构来实现，以保证高效的插入和删除。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-60** 优先级队列能够快速获取优先级最高（或最低）的元素并进行处理，插入和删除操作的时间复杂度通常为 O(log n)，其中 n 是队列中的元素个数。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R1-61** 优先级队列适用于任务调度系统：不同任务可能具有不同的优先级，优先级高的任务需要优先执行，如操作系统中实时性要求高的进程具有较高的优先级，会优先被调度执行。[原文§常见的队列有哪些及应用场景？](https://xiaolincoding.com/interview/data.html#%E5%B8%B8%E8%A7%81%E7%9A%84%E9%98%9F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%8A%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF)

### 循环队列怎么判断队空和队满？

- **R1-62** head 指向队首元素，tail 指向下一次入队的位置。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-63** 指针前进时通过取模回到数组开头：head = (head + 1) % capacity，tail = (tail + 1) % capacity。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-64** 如果只用 head == tail，既可能表示队列为空，也可能表示队列已经绕了一圈装满了，所以需要额外区分。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-65** 常用的做法有两种：一是预留一个空位；二是维护元素数量 size。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-66** 队空是 head == tail，队满是 (tail + 1) % capacity == head。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-67** 采用预留一个空位的方式，数组容量为 capacity 时最多只能放 capacity - 1 个元素，长度为 5 的数组只能保存 4 个元素。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-68** 队空是 size == 0，队满是 size == capacity；每次入队、出队都要更新 size，这样可以使用整个数组容量。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-69** 出队后，head 前进，腾出的空间可以等 tail 绕回数组开头后继续使用，不需要移动其他元素。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-70** 固定容量循环队列的入队、出队时间复杂度都是 O(1)，空间复杂度是 O(capacity)。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)
- **R1-71** 实现时要先检查队空、队满，并保证数组容量大于 0；出队后只需让 head 前进，不需要移动其他元素。[原文§循环队列怎么判断队空和队满？](https://xiaolincoding.com/interview/data.html#%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E9%98%9F%E7%A9%BA%E5%92%8C%E9%98%9F%E6%BB%A1)

### 平衡二叉树结构是怎么样的？

- **R1-72** 最坏情况下搜索树有可能退化为链表，比如每个结点只有右孩子的二叉搜索树，它的性质和链表一样，所有操作（增删改查）的时间是 O(n)。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-73** 查找一个关键字最坏需要对比 h 次，查找时间复杂度不超过 O(h)；O(h) 描述的是查找上界，只有当树高 h 为 O(log n) 时，才能保证查找是 O(log n)。理想的二叉搜索树所有操作的时间可以缩短到 O(log n)。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-74** 二叉搜索树操作的复杂度与树的高度 h 有关，所以引出了平衡树：它是一种改进的二叉查找树，通过一定操作维持树的高度（平衡性）、把树均匀地分布，从而减少树的深度、降低操作复杂度。一般情况下查询复杂度取决于目标节点到树根的距离（深度），节点深度普遍较大时平均复杂度就会上升。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-75** 左右两个子树的高度差称为平衡因子，AVL 树要求它的绝对值不超过 1。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-76** AVL 树平衡的特性有两条：左右两个子树的高度差（平衡因子）的绝对值不超过 1；左右两个子树都是一棵平衡二叉树。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-77** 平衡二叉树首先要是一棵二叉搜索树：原文中有一棵树不是平衡二叉树，原因并不是不满足平衡因子的条件，而是不满足二叉搜索树的构成条件。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)
- **R1-78** AVL 树是严格平衡的二叉搜索树；红黑树也是自平衡二叉搜索树，但不要求每个节点的左右子树高度差都不超过 1。[原文§平衡二叉树结构是怎么样的？](https://xiaolincoding.com/interview/data.html#%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E7%BB%93%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84)

### 红黑树说一下，跳表说一下？

- **R1-79** 红黑树是一种自平衡的二叉搜索树，在插入和删除操作后能够通过旋转和重新着色来保持树的平衡。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-80** 红黑树的特点：每个节点有颜色，红色或黑色；根节点是黑色的；每个叶子节点（NIL 节点）都是黑色的；红色节点的两个子节点都是黑色的；从任一节点到它的各个后代 NIL 节点的路径上，黑色节点的数量都相同。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-81** 红黑树通过这些特性保持平衡，确保最长路径不超过最短路径的两倍，从而保证最坏情况下搜索、插入和删除操作的时间复杂度都为 O(log N)。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-82** 跳表（Skip List）是一种基于链表的数据结构，通过添加多层索引来加速搜索。最底层是一个普通的有序链表，上面的每一层都是前一层的子集，每个节点在上一层都有一个指针指向它在下一层的对应节点；搜索时可以跳过一些节点，直接进入目标区域，从而减少搜索的时间复杂度。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-83** 跳表的数据是有序的；上层索引可以跳过底层的多个节点，节点的层数通常通过随机方式确定；实现时可以用向右、向下的指针，也可以在一个节点中保存多层前进指针。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-84** 随机跳表的搜索、插入和删除操作的期望时间复杂度是 O(log n)，最坏情况下仍可能退化到 O(n)。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-85** 合理设置随机晋升概率后，总的期望空间复杂度是 O(n)，但需要额外的索引指针。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **R1-86** 与红黑树相比，跳表不需要旋转，查找过程也更直观，常用于有序集合和范围查询。[原文§红黑树说一下，跳表说一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E8%AF%B4%E4%B8%80%E4%B8%8B-%E8%B7%B3%E8%A1%A8%E8%AF%B4%E4%B8%80%E4%B8%8B)

### 你知道什么地方用了红黑树和跳表吗？

- **R1-87** epoll 使用红黑树管理注册的监听项，事件就绪后再放入就绪链表。[原文§你知道什么地方用了红黑树和跳表吗？](https://xiaolincoding.com/interview/data.html#%E4%BD%A0%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E5%9C%B0%E6%96%B9%E7%94%A8%E4%BA%86%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8C%E8%B7%B3%E8%A1%A8%E5%90%97)
- **R1-88** 因为事件就绪后会被放入就绪链表，获取就绪事件时只需要处理就绪链表，不需要遍历整棵红黑树。[原文§你知道什么地方用了红黑树和跳表吗？](https://xiaolincoding.com/interview/data.html#%E4%BD%A0%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E5%9C%B0%E6%96%B9%E7%94%A8%E4%BA%86%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8C%E8%B7%B3%E8%A1%A8%E5%90%97)
- **R1-89** TreeMap、TreeSet 使用红黑树，支持有序遍历和范围查询。[原文§你知道什么地方用了红黑树和跳表吗？](https://xiaolincoding.com/interview/data.html#%E4%BD%A0%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E5%9C%B0%E6%96%B9%E7%94%A8%E4%BA%86%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8C%E8%B7%B3%E8%A1%A8%E5%90%97)
- **R1-90** Redis 的 zset 在使用跳表编码时，通过跳表维护成员的顺序，同时配合哈希表按成员查询分数；小规模 zset 也可以使用紧凑编码，并不是所有 zset 都使用跳表。[原文§你知道什么地方用了红黑树和跳表吗？](https://xiaolincoding.com/interview/data.html#%E4%BD%A0%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E5%9C%B0%E6%96%B9%E7%94%A8%E4%BA%86%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8C%E8%B7%B3%E8%A1%A8%E5%90%97)

### 跳表时间复杂度？

- **R1-91** 查找时从高层开始，向右跳过一段数据，不能继续向右时再下降一层；插入和删除也要先通过这个过程找到位置。[原文§跳表时间复杂度？](https://xiaolincoding.com/interview/data.html#%E8%B7%B3%E8%A1%A8%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-92** 对于采用随机层高的跳表，搜索、插入、删除的期望时间复杂度都是 O(log n)。[原文§跳表时间复杂度？](https://xiaolincoding.com/interview/data.html#%E8%B7%B3%E8%A1%A8%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-93** 如果索引层数和分布很不理想，跳表可能退化成普通链表，时间复杂度变成 O(n)，所以不能把期望 O(log n) 说成最坏 O(log n)。[原文§跳表时间复杂度？](https://xiaolincoding.com/interview/data.html#%E8%B7%B3%E8%A1%A8%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-94** 各层节点数大致为 n、n/2、n/4……，加起来仍然是 O(n)，所以期望空间复杂度为 O(n)。[原文§跳表时间复杂度？](https://xiaolincoding.com/interview/data.html#%E8%B7%B3%E8%A1%A8%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-95** 范围查询先定位范围起点，再沿底层链表遍历；如果需要返回 m 个元素，期望时间复杂度是 O(log n + m)。[原文§跳表时间复杂度？](https://xiaolincoding.com/interview/data.html#%E8%B7%B3%E8%A1%A8%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)

### 红黑树的数据结构介绍一下？

- **R1-96** 红黑树是自平衡的二叉查找树，每个节点要么是红色，要么是黑色。[原文§红黑树的数据结构介绍一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **R1-97** 红黑树的根节点是黑色，每个叶子节点（NIL 节点）也是黑色。[原文§红黑树的数据结构介绍一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **R1-98** 红黑树规定：如果一个节点是红色，则其子节点必须是黑色。[原文§红黑树的数据结构介绍一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **R1-99** 红黑树规定：从任一节点到其每个叶子节点的所有路径都包含相同数目的黑色节点。[原文§红黑树的数据结构介绍一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **R1-100** 红黑树的自平衡性质可以保证在插入、删除等操作后，树的高度保持在 O(log n) 内，从而保持较高的查找、插入和删除效率；插入节点过程中的左旋、右旋操作，就是为了自平衡。[原文§红黑树的数据结构介绍一下？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)

### 红黑树和AVL树相比查询性能好还是插入性能好一些？

- **R1-101** 一般来说，AVL 树更偏向查询，红黑树更偏向兼顾查询和更新，不过两者的查找、插入、删除在最坏情况下都是 O(log n)，不能简单认为某一种树在所有场景下都更快。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-102** AVL 树要求每个节点左右子树高度差不超过 1；红黑树通过颜色规则维持平衡，要求更宽松。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-103** 红黑树的高度上限为 2log₂(n + 1)，也是对数级别，但可能比 AVL 树多比较几次。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-104** AVL 树的平衡要求更严格，所以通常能把树高控制得更低，比较次数可能更少；红黑树的高度上限为 2log₂(n + 1)，也是对数级别，但可能比 AVL 树多比较几次。因此查询为主的场景可以考虑 AVL 树，实际差距还和数据分布、内存布局、实现方式有关。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-105** AVL 树找到最低的失衡节点后，一次单旋或双旋就能恢复平衡，也就是最多两次基本旋转；不过沿插入路径检查平衡、维护高度仍然需要 O(log n) 的时间。红黑树插入时可能向上重新着色，经典实现最多两次旋转。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-106** AVL 树删除后，子树高度可能继续降低，导致更高层的祖先也需要调整，可能沿祖先路径多次调整，旋转次数最坏 O(log n)；红黑树的约束更宽松，经典实现的旋转次数有常数上界，重新着色和查找仍可能 O(log n)，更新时通常能减少结构调整，所以频繁增删的场景常会选择红黑树。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)
- **R1-107** Java 的 TreeMap 和 TreeSet 使用红黑树，就是为了兼顾有序查询、插入和删除的性能。[原文§红黑树和AVL树相比查询性能好还是插入性能好一些？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91%E5%92%8Cavl%E6%A0%91%E7%9B%B8%E6%AF%94%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E5%A5%BD%E8%BF%98%E6%98%AF%E6%8F%92%E5%85%A5%E6%80%A7%E8%83%BD%E5%A5%BD%E4%B8%80%E4%BA%9B)

### 二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？

- **R1-108** 二叉查找树存在退化成链表的可能性，会使查询操作的时间复杂度从 O(logn) 升为 O(n)。[原文§二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%9F%A5%E6%89%BE%E6%9C%80%E5%9D%8F%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%BF%99%E6%A0%B7-%E7%94%A8%E4%BB%80%E4%B9%88%E7%BB%93%E6%9E%84%E8%A7%A3%E5%86%B3)
- **R1-109** 当每次插入的元素都是二叉查找树中最大的元素时，二叉查找树就会退化成一条链表，查找数据的时间复杂度变成 O(n)。[原文§二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%9F%A5%E6%89%BE%E6%9C%80%E5%9D%8F%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%BF%99%E6%A0%B7-%E7%94%A8%E4%BB%80%E4%B9%88%E7%BB%93%E6%9E%84%E8%A7%A3%E5%86%B3)
- **R1-110** 平衡二叉查找树（AVL 树）和红黑树。[原文§二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%9F%A5%E6%89%BE%E6%9C%80%E5%9D%8F%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%BF%99%E6%A0%B7-%E7%94%A8%E4%BB%80%E4%B9%88%E7%BB%93%E6%9E%84%E8%A7%A3%E5%86%B3)
- **R1-111** AVL 树在二叉查找树的基础上增加了约束：每个节点的左子树和右子树的高度差不能超过 1，且左右子树仍然为平衡二叉树，这样查询操作的时间复杂度就会一直维持在 O(logn)。[原文§二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%9F%A5%E6%89%BE%E6%9C%80%E5%9D%8F%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%BF%99%E6%A0%B7-%E7%94%A8%E4%BB%80%E4%B9%88%E7%BB%93%E6%9E%84%E8%A7%A3%E5%86%B3)
- **R1-112** 除了平衡二叉查找树，红黑树也是通过一些约束条件来达到自平衡，不过红黑树的约束条件比较复杂；插入节点时的左旋右旋操作就是为了自平衡。[原文§二叉搜索树查找最坏的时间复杂度是多少，为什么会这样？用什么结构解决？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%9F%A5%E6%89%BE%E6%9C%80%E5%9D%8F%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E8%BF%99%E6%A0%B7-%E7%94%A8%E4%BB%80%E4%B9%88%E7%BB%93%E6%9E%84%E8%A7%A3%E5%86%B3)

### B+树的特点是什么？

- **R1-113** B+ 树是一种自平衡的多路查找树，所有叶节点都位于同一层，保证了树的平衡，使得搜索、插入和删除操作的时间复杂度为对数级别。[原文§B+树的特点是什么？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-114** 非叶节点存储用于导航的关键字和子节点指针，不存储完整的数据记录。每个子节点负责一个关键字区间，因此一次可以排除大量不相关的数据；具体的键数和子指针数关系取决于实现，重点是理解多路分支如何降低树高。[原文§B+树的特点是什么？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-115** B+ 树的所有数据记录都存储在叶节点中，叶节点中的数据按关键字排序，叶节点包含实际的数据和关键字，是数据存储和检索的实体单元。[原文§B+树的特点是什么？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-116** B+ 树的叶节点之间通过指针相互链接（通常是双向链表），便于范围查询和顺序遍历。[原文§B+树的特点是什么？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E7%9A%84%E7%89%B9%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)

### B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？

- **R1-117** B 树在查找数据时，可能在非叶子节点找到目标数据，路径长度不固定，即查找时可以在任意一个节点终止。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-118** B+ 树中所有数据都在叶子节点，查找数据时必须走到叶子节点，路径长度固定（均等），查找总是要到叶子节点结束。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-119** B 树中叶子节点之间没有特别的链接，彼此独立；B+ 树中叶子节点通过指针连接，形成一个有序链表，便于范围查询和顺序访问。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-120** B 树的非叶子节点存储数据和索引；B+ 树的非叶子节点只存储用于导航的关键字和子节点指针，不存储完整记录。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-121** B+ 树的非叶子节点只存储用于导航的关键字和子节点指针；在页大小相同、记录较大的情况下，非叶子页能容纳更多索引项，分支数更大，树通常也更矮。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-122** B+ 树的叶子节点有序链接，找到范围起点后就可以沿叶子链表扫描；B 树也能做范围查询，但通常需要在树中遍历并访问不同层的节点，顺序读取不如 B+ 树方便。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-123** 以 InnoDB 为例，聚簇索引的叶子节点保存完整行记录，二级索引的叶子节点保存索引列和主键值。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)
- **R1-124** 如果查询的列不能由二级索引覆盖，还需要根据主键回表查询，所以不能把所有 B+ 树的叶子节点都理解成完整的一行数据。[原文§B+树和B树有什么不一样，B+树的叶子节点和非叶子节点有什么不一样，非叶子节点会不会存数据？](https://xiaolincoding.com/interview/data.html#b-%E6%A0%91%E5%92%8Cb%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-b-%E6%A0%91%E7%9A%84%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E4%B8%80%E6%A0%B7-%E9%9D%9E%E5%8F%B6%E5%AD%90%E8%8A%82%E7%82%B9%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AD%98%E6%95%B0%E6%8D%AE)

### 红黑树，b树，b+树有什么区别？

- **R1-125** 红黑树每个节点存 1 个键值对，是二分叉的二叉树；B 树每个节点存多个键值对，是多分叉的多路树；B+ 树非叶节点存多个键，仅叶节点存值，叶节点额外用链表连接。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-126** 数据仅存于叶节点的是 B+ 树；平衡维护方式是颜色标记与旋转的是红黑树。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-127** 红黑树通过颜色标记与旋转保持平衡；B 树和 B+ 树通过节点分裂、合并（节点内移动、借用）保持平衡。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-128** 红黑树和 B 树查到即返回；B+ 树必须查至叶节点。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-129** 红黑树每个节点最多有两个子节点，树高为 O(log n)；B 树和 B+ 树每个节点可以有很多子节点，同样的数据量下通常更矮。磁盘场景中一个节点往往对应一个页，减少树高就有机会减少页读取次数；实际 I/O 次数还取决于缓存命中情况。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-130** B+ 树可以定位起点后沿叶子链表顺序扫描；红黑树和 B 树也支持范围查询，区别主要在访问方式和数据局部性，不能说只有 B+ 树才能高效地查询范围。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-131** 红黑树通过旋转和重新着色保持平衡；B 树和 B+ 树通过节点内移动、分裂、借用或合并保持平衡，后者也可能把调整传播到根节点，优势主要是适应页存储，不能简单认为分裂、合并一定比旋转更便宜。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R1-132** 数据在内存中并且高频增删，选择红黑树更合适；数据在磁盘上并且随机、范围查询均需要，选择 B+ 树更合适。[原文§红黑树，b树，b+树有什么区别？](https://xiaolincoding.com/interview/data.html#%E7%BA%A2%E9%BB%91%E6%A0%91-b%E6%A0%91-b-%E6%A0%91%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 堆是什么？

- **R1-133** 堆是一棵完全二叉树，这样实现的堆也被称为二叉堆。[原文§堆是什么？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-134** 节点的值都大于等于其子节点的值的堆称为大顶堆；都小于等于其子节点的值的堆称为小顶堆。[原文§堆是什么？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **R1-135** 原文图示中有一棵树不是堆，原因是它不是完全二叉树；所以堆首先必须是一棵完全二叉树。[原文§堆是什么？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%98%AF%E4%BB%80%E4%B9%88)

### 堆的常见操作复杂度是多少？为什么建堆是 O(n)？

- **R1-136** 小顶堆的父节点的值不大于子节点，所以最小值一定在堆顶，但堆并不是整体有序的，左右子树之间也没有固定大小关系。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-137** 查看堆顶是 O(1)；插入元素最坏 O(log n)；删除堆顶最坏 O(log n)；查找任意值最坏 O(n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-138** 先把元素放到数组末尾，再向上调整，最坏 O(log n)；如果底层动态数组触发扩容，这一次还可能需要 O(n) 的复制时间。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-139** 把末尾元素移到堆顶，缩小有效范围，再向下调整，最坏 O(log n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-140** 查找任意值不能像二叉搜索树那样确定只走哪一边，最坏需要 O(n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-141** 逐个插入建堆：每次最多向上调整 O(log n)，总时间复杂度为 O(n log n)；自底向上建堆：从最后一个非叶子节点开始向下调整，总时间复杂度为 O(n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-142** 自底向上建堆从最后一个非叶子节点开始向下调整，总时间复杂度为 O(n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-143** 因为大部分节点都靠近叶子，只能向下移动很少的层数：大致有 n/2 个节点是叶子，不需要调整；n/4 个节点最多调整 1 层；n/8 个节点最多调整 2 层，以此类推。总工作量可以估算为 n/4 × 1 + n/8 × 2 + n/16 × 3 + … = O(n)。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)
- **R1-144** 不能把每个节点都按树高 log n 来计算，那样忽略了不同节点实际能调整的层数。[原文§堆的常见操作复杂度是多少？为什么建堆是 O(n)？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BB%BA%E5%A0%86%E6%98%AF-o-n)

### 前缀树是什么？有什么应用？

- **R1-145** 前缀树也称为字典树、单词查找树或键树。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-146** 前缀树的核心思想是利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，从而提高查询效率。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-147** 前缀树的特点：根节点不包含字符，除根节点外的每一个节点都包含一个字符；从根节点到某一节点，路径上的字符连接起来即为该节点对应的字符串；每个节点的所有子节点包含的字符都不相同。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-148** 每个节点还需要记录是否是单词的结束位置。比如同时存储 app 和 apple 时，第三个字符 p 和最后的 e 都要标记为结束，否则只能判断前缀是否存在，无法区分 app 是一个完整单词，还是 apple 的前缀。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-149** 如果字符串长度为 L，且查找子节点的操作是 O(1)，插入、查找一个单词的时间复杂度都是 O(L)；查询前缀也是 O(L)。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-150** 查询前缀也是 O(L)，但返回所有匹配词还需要遍历相应子树。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-151** 前缀树的代价是空间占用可能较大，尤其是每个节点都预分配整个字符集大小的子节点数组时。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-152** 前缀树的应用场景有字符串检索、路由表匹配和词频统计。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-153** 一是搜索引擎的搜索框：用户输入部分关键词时，可以利用前缀树快速找到以该关键词为前缀的所有相关词条，实现自动补全；二是拼写检查：把所有正确的单词存储在前缀树中，用户输入一个单词时，通过查找该单词是否存在来判断拼写是否正确。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-154** 在网络路由中，路由器需要根据 IP 地址的前缀来选择合适的路由，前缀树可以高效地实现 IP 地址的最长前缀匹配，从而快速确定数据包的转发路径。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)
- **R1-155** 把文本中的所有单词插入到前缀树中，同时在节点中记录每个单词的出现次数，再通过遍历前缀树，统计出文本中每个单词的词频。[原文§前缀树是什么？有什么应用？](https://xiaolincoding.com/interview/data.html#%E5%89%8D%E7%BC%80%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BA%94%E7%94%A8)

### LRU是什么？如何实现？

- **R1-156** LRU 是一种缓存淘汰算法，当缓存空间已满时，优先淘汰最长时间未被访问的数据。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-157** 实现的方式是哈希表加双向链表结合。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-158** 哈希表存储数据的键值对，键为缓存的键，值为对应的节点；双向链表存储数据节点，链表头部为最近访问的节点，链表尾部为最久未访问的节点。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-159** get 命中时，把节点移动到链表头部；未命中时返回未找到。是否加载数据并写入缓存，是业务层的逻辑，LRU 本身不要求查询未命中就自动插入。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-160** 如果 key 已存在，更新值并移到头部；如果不存在，创建节点并插到头部，同时加入哈希表。插入新节点后如果容量超限，就移除链表尾部的节点，并删除哈希表中对应的 key。更新已有 key 时元素数量没增加，不需要淘汰其他节点。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-161** 更新已有 key 时，元素数量没增加，不需要淘汰其他节点；只需更新值并移到链表头部。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-162** 因为哈希表能直接找到节点，通过节点的前驱和后继就能在 O(1) 时间内把它摘除；如果使用单链表，找到前驱还可能需要遍历。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-163** 实现时也常用虚拟头尾节点，减少处理边界的分支。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-164** 在哈希表操作平均为 O(1) 的前提下，这种实现的 get、put 平均时间复杂度都是 O(1)，容量为 C 时空间复杂度是 O(C)。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-165** 第三个参数传 true 表示按访问顺序维护链表；重写 removeEldestEntry 方法，在 size() 超过容量时返回 true，淘汰最久未访问的条目。如果使用默认的插入顺序，就不能达到相同的 LRU 效果。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-166** 这个示例不是线程安全的，多线程使用时还需要保证整个缓存操作的同步。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
- **R1-167** 核心是维护访问顺序：每次成功的 get 和每次 put 都把条目移到“最近访问”一端，超过容量时淘汰“最久未访问”的一端。原文给出的是 Java 的 LinkedHashMap（按访问顺序，重写 removeEldestEntry）版本，此处按相同思路改写成 Python，用 OrderedDict 代替 LinkedHashMap。

  ```python
  from collections import OrderedDict


  class LRUCache:
      def __init__(self, capacity):
          if capacity < 0:
              raise ValueError("Invalid capacity")
          self.capacity = capacity
          self.cache = OrderedDict()  # 按访问顺序维护，末尾是最近访问的条目

      def get(self, key):
          if key not in self.cache:
              return -1
          self.cache.move_to_end(key)  # 成功的 get 更新访问顺序
          return self.cache[key]

      def put(self, key, value):
          self.cache[key] = value
          self.cache.move_to_end(key)  # put 也更新访问顺序
          if len(self.cache) > self.capacity:  # 对应 removeEldestEntry
              self.cache.popitem(last=False)  # 淘汰最久未访问的条目
  ```

  要点：更新已有 key 时元素数量不增加，不会淘汰其他条目；超过容量才淘汰最久未访问的条目；get 未命中不自动写入缓存；get、put 平均 O(1)，空间复杂度 O(容量)。该实现不是线程安全的。原文描述的另一种解法是哈希表加双向链表（哈希表存 key 到节点，链表头部是最近访问、尾部是最久未访问，命中时把节点移到头部，超限时删除尾部节点并删除对应的 key，常用虚拟头尾节点简化边界），同样正确。[原文§LRU是什么？如何实现？](https://xiaolincoding.com/interview/data.html#lru%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)

### 布隆过滤器怎么设计？时间复杂度？

- **R1-168** 如果直接用 Java 的 HashSet 或 HashMap 保存这些 IP，就要存储元素本身以及相关的对象、桶和指针，内存开销可能很大；如果只是想先快速过滤“肯定不存在”的元素，可以考虑更节省空间的方案，比如布隆过滤器。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-169** 布隆过滤器使用一个很长的二进制位数组，同时结合多个 Hash 函数实现，具有运行快速、内存占用小的特点。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-170** 代价是可能误判：返回不存在，说明元素肯定没有加入；返回存在，只能说明可能存在，因为没有加入的元素也可能被误判为存在。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-171** 这种错误称为“假阳性”，对应的概率叫 False Positive Probability，简称 fpp。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-172** 设计时通常先确定预计元素数量和目标误判率，例如 1%，再计算位数组长度和哈希函数数量。这里的 1% 指查询未加入元素时误判为存在的概率，不是已加入元素有 1% 的概率丢失。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-173** 初始化时创建一个全由 0 组成的位数组，并选择几个独立的哈希函数；添加元素时，把元素通过所有哈希函数映射到的位数组位置标记为 1。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-174** 查询时用同样的哈希函数把元素映射到位数组的几个位置：如果所有位置都被标记为 1，就可以说该元素可能在集合中；如果有任何一个位置不为 1，则该元素肯定不在集合中。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-175** 误判率主要来源于“哈希碰撞”：位数组的大小有限，不同的元素可能被哈希到相同位置，即使某个元素并未真正被加入，也可能因为其他已有元素使它所有哈希位置都变为 1，从而误判为存在。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-176** 在元素数量相同的情况下，增加位数组长度通常可以降低误判率。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-177** 哈希函数并不是越多越好：函数太多会把更多位设成 1，超过合适的数量后反而可能增加误判率，同时增加计算开销，所以需要在误判率和性能之间权衡。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-178** 添加和判断操作的时间复杂度都是 O(k)，k 为固定常数时可以视为 O(1)；空间复杂度是 O(m) 比特。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-179** 在哈希分布均匀等假设下，位数组长度 m ≈ -n × ln(p) / (ln 2)²。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-180** 哈希函数数量 k ≈ (m / n) × ln 2，实际使用时取合适的整数。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-181** 大约需要 959 万个比特，也就是约 1.2 MB，哈希函数数量约为 7。实际插入数量如果远超预估，误判率也会升高。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-182** 实际插入数量如果远超预估，误判率也会升高。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-183** 因为多个元素可能共用同一个比特位，删除时直接把位清零，可能让其他已加入的元素被判断为不存在。如果需要删除，可以考虑计数布隆过滤器，用计数器代替比特位，但也会增加空间开销。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-184** “返回不存在就一定不存在”的前提是元素已正确加入，且过滤器没有被错误删除或丢失更新。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R1-185** 实际使用中，布隆过滤器返回“可能存在”后，通常还要查询真实集合确认。比如 IP 黑名单不能只凭布隆过滤器的阳性结果就拦截，否则会误伤正常 IP。[原文§布隆过滤器怎么设计？时间复杂度？](https://xiaolincoding.com/interview/data.html#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)

## 2. 排序算法

原文：[数据结构与算法面试题 · 排序算法](https://xiaolincoding.com/interview/data.html#%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)。

### 说几个你懂的排序算法，并说明其时间空间复杂度

- **R2-1** 冒泡排序、插入排序、选择排序、快速排序、归并排序、堆排序。原文对这六种算法都给出了思路和时间、空间复杂度。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-2** 冒泡排序通过相邻元素的比较和交换，每次将最大（或最小）的元素逐步“冒泡”到最后（或最前）。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-3** 增加“本轮没有交换就提前结束”的判断后，冒泡排序的时间复杂度：最好情况下 O(n)，最坏情况下 O(n²)，平均情况下 O(n²)；空间复杂度 O(1)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-4** 将待排序元素逐个插入到已排序序列合适位置的是插入排序；不断选择未排序部分的最小（或最大）元素并放到已排序部分末尾（或开头）的是选择排序。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-5** 插入排序的时间复杂度：最好情况下 O(n)，最坏情况下 O(n²)，平均情况下 O(n²)；空间复杂度 O(1)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-6** 选择排序的时间复杂度：最好、最坏、平均情况下都是 O(n²)，空间复杂度 O(1)。相比之下，带提前结束判断的冒泡排序和插入排序最好情况下是 O(n)，快速排序最好情况下是 O(nlogn)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-7** 快速排序先选择一个基准元素，把数组划分为两个子数组，使左子数组的元素都小于（或等于）基准元素，右子数组的元素都大于（或等于）基准元素，然后对两个子数组递归地进行排序。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-8** 快速排序的时间复杂度：最好情况下 O(nlogn)，最坏情况下 O(n²)，平均情况下 O(nlogn)；空间复杂度：最好情况下 O(logn)，最坏情况下 O(n)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-9** 归并排序把数组不断分割为更小的子数组，然后把子数组合并起来，并在合并的过程中完成排序。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-10** 归并排序的时间复杂度：最好、最坏、平均情况下都是 O(nlogn)；空间复杂度 O(n)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-11** 堆排序先把待排序元素构建成一个最大堆（或最小堆），然后将堆顶元素与末尾元素交换，再重新调整堆，重复这个过程直到排序完成。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-12** 堆排序自底向上建堆的时间复杂度是 O(n)，整个排序的平均和最坏时间复杂度是 O(nlogn)；使用迭代堆调整时，空间复杂度是 O(1)。[原文§说几个你懂的排序算法，并说明其时间空间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E5%87%A0%E4%B8%AA%E4%BD%A0%E6%87%82%E7%9A%84%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95-%E5%B9%B6%E8%AF%B4%E6%98%8E%E5%85%B6%E6%97%B6%E9%97%B4%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)

### 讲一下冒泡排序算法

- **R2-13** 对于升序排序，已经有序是指前一个元素小于等于后一个元素。[原文§讲一下冒泡排序算法](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)
- **R2-14** 只有增加“一轮没有交换就提前结束”的判断，最好时间复杂度才是 O(n)；如果仍然固定执行所有轮次，即使数组有序也需要 O(n²) 次比较。[原文§讲一下冒泡排序算法](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)
- **R2-15** 排序过程中需要进行多次遍历和元素交换，而每次遍历都要比较相邻的元素并决定是否交换，这种操作需要花费 O(n) 的时间，所以冒泡排序的时间复杂度通常为 O(n²)。[原文§讲一下冒泡排序算法](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)
- **R2-16** 每一轮开始前把标志 swapped 置为 false，一轮中只要发生了元素交换就把它置为 true；这一轮结束后如果 swapped 仍为 false，说明本轮没有交换，数组已经有序，直接 break 结束。[原文§讲一下冒泡排序算法](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)
- **R2-17** 冒泡排序反复比较相邻元素并在逆序时交换，每一轮把当前范围内的最大元素换到末尾；每轮用一个标志记录是否发生交换，一轮没有交换就提前结束。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def bubble_sort(arr):
      n = len(arr)
      # 外层循环控制比较轮数
      for i in range(n - 1):
          swapped = False
          # 内层循环两两比较，逆序则交换
          for j in range(n - i - 1):
              if arr[j] > arr[j + 1]:
                  arr[j], arr[j + 1] = arr[j + 1], arr[j]
                  swapped = True
          if not swapped:  # 本轮没有交换，说明已经有序
              break
  ```

  要点：外层最多 n - 1 轮，第 i 轮内层只比较前 n - i - 1 对，已冒泡到末尾的元素不再参与；加上“本轮没有交换就提前结束”后，已经有序的数组只需扫描一轮，最好时间复杂度 O(n)，最坏和平均 O(n²)，原地排序，空间复杂度 O(1)；空数组和单元素数组无需处理；相等元素不交换（用严格大于判断）。[原文§讲一下冒泡排序算法](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)

### 讲一下快排原理

- **R2-18** 快速排序使用的是分治思想，即分而治之：把一个复杂的问题分成两个或多个相似的子问题，再把子问题分成更小的子问题，直到子问题可以简单求解；求解子问题之后，原问题的解就是各子问题解的合并。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-19** 快速排序先从序列中选取一个数作为基准数，通过一次划分（partition）把较小的元素放到左边、较大的元素放到右边，然后分别对基准的左右两边重复以上操作，直到数组完全排序。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-20** 划分时把较小的元素放到左边、较大的元素放到右边；等于基准的元素如何处理，取决于具体的划分方式。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-21** 双指针划分和单向扫描划分。原文代码使用的是单向扫描划分（Lomuto 划分）。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-22** 单向扫描划分选择最后一个元素作为基准 pivot。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-23** i 表示“小于基准的区域”的最后一个位置，初始为 low - 1，也就是一开始这个区域是空的。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-24** j 从左到右扫描，不包含最后的基准元素。遇到小于基准的元素，就让 i 前进一位，并把该元素交换到小于基准的区域里。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-25** 扫描结束后，将基准和 arr[i + 1] 交换，此时基准就到了最终位置。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-26** 递归排序基准两侧的区间，不再把基准本身包含进去（基准已经在最终位置）。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-27** 最简单的做法是每次都选最左边的元素作基准，但对几乎已经有序的序列来说，这可能导致每次划分都极不均衡，从而退化到 O(n²)，所以并不是最好的选择。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-28** 除了每次选最左边的元素，还可以选择中间的数，或者通过 Math.random() 随机选取一个数作为基准。实际优化时可以随机选择基准；重复值较多时采用三路划分，把等于基准的一段直接排除在递归之外。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-29** 这种固定选择末尾元素作基准的基础实现，在有序数组或大量重复元素上可能退化，实际优化时可以随机选择基准，重复值较多时采用三路划分。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-30** 重复值较多时采用三路划分，把等于基准的一段直接排除在递归之外。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)
- **R2-31** 快速排序用分治思想：选一个基准，用单向扫描（Lomuto）划分把小于基准的元素换到左边、基准放到最终位置，再递归排序基准两侧的区间。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def quick_sort(arr, low=0, high=None):
      if high is None:
          high = len(arr) - 1
      if low < high:
          pi = partition(arr, low, high)
          # 递归排序左右两部分，基准本身不再包含
          quick_sort(arr, low, pi - 1)
          quick_sort(arr, pi + 1, high)


  def partition(arr, low, high):
      pivot = arr[high]  # 选择最后一个元素作为基准
      i = low - 1        # 小于基准的区域的最后一个位置
      for j in range(low, high):
          if arr[j] < pivot:
              i += 1
              arr[i], arr[j] = arr[j], arr[i]
      # 把基准放到最终位置
      arr[i + 1], arr[high] = arr[high], arr[i + 1]
      return i + 1
  ```

  要点：基准选区间最后一个元素；i 初始为 low - 1，j 扫描 [low, high)，遇到小于基准的元素就 i 前进并交换；扫描结束后基准与 arr[i + 1] 交换并返回该位置；递归区间是 [low, pi - 1] 和 [pi + 1, high]，不含基准；low >= high 时递归结束。平均时间复杂度 O(nlogn)，最坏 O(n²)（固定选末尾基准时，有序数组或大量重复元素可能退化），空间复杂度最好 O(logn)、最坏 O(n)（递归栈）。也可使用双指针划分，任一正确的快速排序实现都可以。[原文§讲一下快排原理](https://xiaolincoding.com/interview/data.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%BF%AB%E6%8E%92%E5%8E%9F%E7%90%86)

### 堆排序算法原理，稳定吗？

- **R2-32** 如果每个节点大于等于子树中的每个节点，称为大顶堆；如果每个节点小于等于子树中的每个节点，则称为小顶堆。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-33** 堆的要求有两条：必须是完全二叉树；堆中的每一个节点，都必须大于等于（或小于等于）其子树中每个节点的值。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-34** 堆通常用一维数组保存，节省空间，不需要存左右子节点的指针，通过下标就可以定位左右子节点和父节点。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-35** 左子节点在 2i+1 的位置，右子节点在 2i+2 的位置，父节点在 (i-1)/2 向下取整的位置（i > 0，根节点没有父节点）。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-36** 堆排序的过程大致分为建堆和排序两大步骤。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-37** 从最后一个非叶子节点 n / 2 - 1 开始，依次向前处理，每个节点都通过向下调整恢复堆性质；叶子节点本来就满足堆性质，不需要调整。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-38** 原地建堆的“原地”是指不借助另一个数组，就在原数组上操作。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-39** 建堆就是把一个无序的数组转化为最大堆。在原数组上，从最后一个非叶子节点 n / 2 - 1 开始，依次向前处理，每个节点都通过向下调整恢复堆性质。叶子节点本来就满足堆性质，不需要调整。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-40** 建堆结束后，数组中的数据已经按大顶堆的特性组织，第一个元素是堆顶，也就是最大的元素。把它和最后一个元素交换，最大的元素就放到了下标 n - 1 的位置；然后把堆的有效范围缩小一位，只对新的堆顶向下调整，继续重复这些步骤，直到数组升序排列。已排序的尾部不再参与堆调整。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-41** 堆顶是最大的元素，把它和最后一个元素交换，最大的元素就放到了下标为 n - 1 的位置。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-42** 构建最大堆的结果是 [10, 5, 3, 4, 1]。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-43** 交换堆顶元素与最后一个元素后得到 [1, 5, 3, 4, 10]，把剩余元素调整为堆得到 [5, 4, 3, 1]；再次交换并调整得到 [4, 3, 1]，继续这个过程，最终完成排序得到 [1, 3, 4, 5, 10]。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-44** 堆排序分两步：先原地建成大顶堆（从最后一个非叶子节点 n / 2 - 1 起依次向前向下调整），再不断把堆顶与堆尾交换、缩小堆范围，并对新堆顶向下调整。向下调整用迭代实现，这样额外空间是 O(1)。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def heap_sort(arr):
      n = len(arr)
      # 建堆：从最后一个非叶子节点 n // 2 - 1 开始，依次向前向下调整
      for i in range(n // 2 - 1, -1, -1):
          heapify(arr, n, i)
      # 排序：把堆顶（最大值）换到末尾，缩小堆范围后调整新的堆顶
      for i in range(n - 1, 0, -1):
          arr[0], arr[i] = arr[i], arr[0]
          heapify(arr, i, 0)


  def heapify(arr, n, i):
      # 迭代向下调整，避免递归栈带来的额外空间
      while i < n // 2:  # 只有非叶子节点才需要调整
          largest = i
          left = 2 * i + 1
          right = left + 1
          if arr[left] > arr[largest]:
              largest = left
          if right < n and arr[right] > arr[largest]:
              largest = right
          if largest == i:
              break
          arr[i], arr[largest] = arr[largest], arr[i]
          i = largest  # 继续调整受影响的子树
  ```

  要点：下标从 0 起时，节点 i 的左右子节点是 2i + 1、2i + 2；只有 i < n // 2 的非叶子节点才需要调整，调整时要先判断右子节点是否越界；排序阶段每次交换后堆范围缩小一位，已排序的尾部不再参与；空数组和单元素数组直接可用。建堆 O(n)，排序阶段 O(nlogn)，整体时间复杂度 O(nlogn)，迭代调整时空间复杂度 O(1)，是原地排序，但不稳定。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-45** 向下调整用迭代实现时只需常数个临时变量，额外空间复杂度是 O(1)，属于原地排序；如果写成递归，还要计入最坏 O(log n) 的调用栈空间。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-46** 建堆的时间复杂度是 O(n)，排序过程是 O(nlogN)，所以堆排序整个时间复杂度是 O(nlogN)。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)
- **R2-47** 排序过程中有把堆的最后一个节点与堆顶互换的操作，有可能改变值相同的数据的原始相对顺序，所以堆排序不是稳定的排序算法。例如两个相同的元素 A 和 B，A 在 B 前面，在构建和调整堆的过程中 B 可能被移动到 A 的前面，破坏了它们原来的相对顺序。[原文§堆排序算法原理，稳定吗？](https://xiaolincoding.com/interview/data.html#%E5%A0%86%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E5%8E%9F%E7%90%86-%E7%A8%B3%E5%AE%9A%E5%90%97)

### 归并排序和快速排序的使用场景

- **R2-48** 归并排序适合需要保持相同关键字相对顺序、要求最坏时间复杂度为 O(nlogn) 的场景；对链表排序时可以通过调整指针合并，也适合外部排序中有序文件的归并。对数组排序时通常需要 O(n) 的临时空间。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R2-49** 对数组排序时，归并排序通常需要 O(n) 的临时空间；对链表排序时，可以通过调整指针来合并。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R2-50** 快速排序适合内存中的数组排序，通常有较好的数据局部性，平均时间复杂度为 O(n log n)。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R2-51** 快速排序适合内存中的数组排序，通常有较好的数据局部性，平均时间复杂度为 O(n log n)。普通快排不稳定，最坏会退化到 O(n²)，因此通常要结合随机基准、三路划分等优化。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R2-52** 不能直接说快排在所有场景中都是最快的，实际选择还要看数据规模、重复值比例、是否要求稳定、可用内存等条件。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- **R2-53** 实际选择要看数据规模、重复值比例、是否要求稳定、可用内存等条件。例如需要稳定、要求最坏 O(n log n) 时可以考虑归并排序；内存中的数组排序则可以考虑快速排序，并结合随机基准、三路划分等优化。[原文§归并排序和快速排序的使用场景](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E5%92%8C%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)

### 什么是排序稳定性？

- **R2-54** 排序算法的稳定性是指在排序过程中，当有多个具有相同关键字的元素时，这些元素在排序后的序列中保持它们原有的相对顺序。[原文§什么是排序稳定性？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)
- **R2-55** 如果 A 和 B 的键值相同，且排序前 A 在 B 之前，那么排序后 A 仍然应该在 B 之前，算法才能被称为是稳定的。[原文§什么是排序稳定性？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)
- **R2-56** 如果排序算法是稳定的，按年龄排序后 Alice 和 Bob 的相对顺序不会改变，结果是 [("Charlie", 20), ("Alice", 25), ("Bob", 25)]；如果算法不稳定，二者的相对顺序可能改变，例如变成 [("Charlie", 20), ("Bob", 25), ("Alice", 25)]。[原文§什么是排序稳定性？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)

### 稳定和不稳定排序算法有什么特点？

- **R2-57** 不稳定排序算法中，相同元素的相对位置可能会改变，排序后不保证原始顺序。[原文§稳定和不稳定排序算法有什么特点？](https://xiaolincoding.com/interview/data.html#%E7%A8%B3%E5%AE%9A%E5%92%8C%E4%B8%8D%E7%A8%B3%E5%AE%9A%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9)
- **R2-58** 稳定排序适用于需要保持元素间相对顺序的场景：先按姓名排序，再稳定地按年龄排序，就能得到“年龄优先，同龄时按姓名”的结果。[原文§稳定和不稳定排序算法有什么特点？](https://xiaolincoding.com/interview/data.html#%E7%A8%B3%E5%AE%9A%E5%92%8C%E4%B8%8D%E7%A8%B3%E5%AE%9A%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9)
- **R2-59** 稳定性本身并不能决定快慢，仍要比较具体算法和实现。[原文§稳定和不稳定排序算法有什么特点？](https://xiaolincoding.com/interview/data.html#%E7%A8%B3%E5%AE%9A%E5%92%8C%E4%B8%8D%E7%A8%B3%E5%AE%9A%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9)
- **R2-60** 不稳定排序不保证相同关键字元素的原始顺序；如果业务需要保留这个顺序，通常应选稳定排序。[原文§稳定和不稳定排序算法有什么特点？](https://xiaolincoding.com/interview/data.html#%E7%A8%B3%E5%AE%9A%E5%92%8C%E4%B8%8D%E7%A8%B3%E5%AE%9A%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E7%89%B9%E7%82%B9)

### 说说快排流程，时间复杂度

- **R2-61** 快速排序的流程：从数组中选择一个基准元素；将数组分成两部分，小于基准元素的放在左边，大于基准元素的放在右边；然后递归地对左右两部分进行快速排序。[原文§说说快排流程，时间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E8%AF%B4%E5%BF%AB%E6%8E%92%E6%B5%81%E7%A8%8B-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-62** 快速排序的流程第一步是从数组中选择一个基准元素，通常是数组中间位置的元素。[原文§说说快排流程，时间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E8%AF%B4%E5%BF%AB%E6%8E%92%E6%B5%81%E7%A8%8B-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-63** 快速排序的时间复杂度为 O(n log n)，n 为数组长度；最坏情况下为 O(n²)，平均情况下为 O(n log n)，效率较高。[原文§说说快排流程，时间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E8%AF%B4%E5%BF%AB%E6%8E%92%E6%B5%81%E7%A8%8B-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- **R2-64** 最坏情况下时间复杂度为 O(n²)，发生在每次选择的基准元素都是最大或最小值时。[原文§说说快排流程，时间复杂度](https://xiaolincoding.com/interview/data.html#%E8%AF%B4%E8%AF%B4%E5%BF%AB%E6%8E%92%E6%B5%81%E7%A8%8B-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)

### 快排为什么时间复杂度最差是O（n^2）

- **R2-65** 主要是每次划分时选择的基准元素不合适。当每次选择的基准元素都是当前子数组中的最大或最小元素时，每次划分只能减少一个元素，而不是均匀地分成两部分，时间复杂度就达到 O(n²)。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)
- **R2-66** 当每次选的基准都是当前子数组的最大或最小元素时会退化；固定选择首尾元素作基准时，已经有序的数组就容易出现这种情况；使用单向扫描划分时，大量重复元素也可能导致退化。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)
- **R2-67** 各轮划分的工作量为 (n - 1) + (n - 2) + … + 1，所以总时间复杂度是 O(n²)，递归栈也会达到 O(n)。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)
- **R2-68** 随机选择基准、三数取中可以降低不均衡划分的风险，但不能保证消除 O(n²) 的最坏情况。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)
- **R2-69** 大量重复值适合三路划分；而使用单向扫描划分时，大量重复元素可能导致退化。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)
- **R2-70** 如果要求最坏 O(n log n)，可以选择堆排序、归并排序，或者在递归过深时切换到堆排序的混合方案；随机选择基准并不能保证消除 O(n²) 的最坏情况。[原文§快排为什么时间复杂度最差是O（n^2）](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%9C%80%E5%B7%AE%E6%98%AFo-n-2)

### 快排这么强，那冒泡排序还有必要吗？

- **R2-71** 冒泡排序实现简单，适合讲解排序和处理很小的数据量；它是稳定排序算法，在要求稳定性的场景（比如按多关键字排序时保留原有顺序）更合适；它只需要 O(1) 额外空间，而快速排序的递归调用需要 O(log n)（最坏 O(n)）的栈空间。[原文§快排这么强，那冒泡排序还有必要吗？](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E8%BF%99%E4%B9%88%E5%BC%BA-%E9%82%A3%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E8%BF%98%E6%9C%89%E5%BF%85%E8%A6%81%E5%90%97)
- **R2-72** 加上提前结束判断后，对已经有序的数据只需扫描一轮，时间复杂度是 O(n)。但“基本有序”不代表一定很快，比如最小值在数组末尾时，普通冒泡仍可能需要很多轮，不能笼统认为它比快排快。[原文§快排这么强，那冒泡排序还有必要吗？](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E8%BF%99%E4%B9%88%E5%BC%BA-%E9%82%A3%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E8%BF%98%E6%9C%89%E5%BF%85%E8%A6%81%E5%90%97)
- **R2-73** 冒泡排序是稳定排序算法，快速排序不稳定，所以在要求稳定性的场景（比如按多关键字排序时保留原有顺序）冒泡排序更合适。[原文§快排这么强，那冒泡排序还有必要吗？](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E8%BF%99%E4%B9%88%E5%BC%BA-%E9%82%A3%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E8%BF%98%E6%9C%89%E5%BF%85%E8%A6%81%E5%90%97)
- **R2-74** 快速排序虽然也是原地排序，但递归调用需要 O(log n)（最坏 O(n)）的栈空间，而冒泡排序只需要 O(1) 额外空间。[原文§快排这么强，那冒泡排序还有必要吗？](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E8%BF%99%E4%B9%88%E5%BC%BA-%E9%82%A3%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E8%BF%98%E6%9C%89%E5%BF%85%E8%A6%81%E5%90%97)
- **R2-75** 插入排序也能做到稳定、O(1) 额外空间，且对小规模或接近有序的数据通常更实用，所以不能只凭空间复杂度就优先选冒泡排序。[原文§快排这么强，那冒泡排序还有必要吗？](https://xiaolincoding.com/interview/data.html#%E5%BF%AB%E6%8E%92%E8%BF%99%E4%B9%88%E5%BC%BA-%E9%82%A3%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E8%BF%98%E6%9C%89%E5%BF%85%E8%A6%81%E5%90%97)

### 如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？

- **R2-76** 可以使用外部排序来解决，基本思路分为部分排序阶段和归并阶段两个阶段。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-77** 根据内存大小，把待排序的文件拆成多个部分，使每个部分都足以存入内存；然后选择合适的内排序算法，把各个部分排序，并输出到容量更大的外存临时文件中，每个临时文件都是有序的。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-78** 部分排序阶段选择合适的内排序算法（如快速排序）把各个部分排序，输出到容量可以更大的外存临时文件中，每个临时文件都是有序排列的，称为一个“顺段”。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-79** 在部分排序阶段，由于内存可以装下每个顺段的所有元素，可以使用快速排序，时间复杂度是 O(nlogn)。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-80** 归并阶段的思想和归并排序一样。以 2 路归并为例，每次把两个连续的顺段合并成一个更大的顺段。因为内存有限，每次可能只能读入两个顺段的部分内容，所以要一部分一部分地读入，在内存里把可以确定顺序的部分排好并输出到外存的文件中，不断重复，直到两个顺段被完整遍历。经过多层归并，最终得到一个完整的顺序文件。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-81** 归并阶段有个非常大的时间消耗就是 IO，也就是输入输出。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-82** 可以通过增加归并路数 k 来减少归并轮数；败者树负责高效选择下一项，减少归并轮数的是增加路数，两者不要混淆。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-83** 增加归并路数 k 可以减少归并轮数，但要为每一路输入以及输出预留缓冲区。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-84** 选出 k 路当前元素中的最小值，可以使用最小堆或者败者树。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-85** 胜者树的非终端结点存储的是每次比较中胜利的一方（左右孩子相比较，谁最小即为胜者），而败者树的非终端结点存储的是比较中失败的一方，真正的“胜者”会被传到上一层继续参加比较。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-86** 比较过程中都是拿上一轮的胜者去参加下一轮比较，所以当某一路的数据发生变化时，只需要沿着从叶子到根的一条路径重新比较，每次更新只需要 O(log k) 次比较。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-87** 胜者树和最小堆也能做到 O(log k)，败者树的优势主要在比较过程的常数开销，而不是复杂度等级不同。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **R2-88** 先用内排序算法（比如快速排序），尽可能多地加载源文件，把它变成 n 个有序顺段；在内存有限的前提下，每 k 个文件为一组，每次流式地从各个文件中读取一个单词，借助败者树选出字典序最低的一个，输出到文件中，这样就把 k 个顺段合并成一个顺段；反复执行，直到所有顺段被归并到同一个顺段。[原文§如果要对一个很大的数据集，进行排序，而没办法一次性在内存排序，这时候怎么办？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E6%9E%9C%E8%A6%81%E5%AF%B9%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A4%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E9%9B%86-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F-%E8%80%8C%E6%B2%A1%E5%8A%9E%E6%B3%95%E4%B8%80%E6%AC%A1%E6%80%A7%E5%9C%A8%E5%86%85%E5%AD%98%E6%8E%92%E5%BA%8F-%E8%BF%99%E6%97%B6%E5%80%99%E6%80%8E%E4%B9%88%E5%8A%9E)

### 数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少

- **R2-89** K 必须在 [0, N] 内，K 为 0 时返回空数组。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-90** 这里允许重复值占据多个名额，所以 [5, 5, 3] 的前两个最大值是 [5, 5]；如果要求不同的值，需要额外去重。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-91** 要区分“找出最大的 K 个值”和“把这 K 个值排好序”，后者会增加排序成本。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-92** 排序法和快速选择会修改原数组，最小堆方法不会。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-93** 如果需要保留原数组，可以先复制一份，但还要计入复制的时间和空间。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-94** 排序法是对整个数组进行升序排序，然后取最后 K 个元素，例如使用快速排序时，时间复杂度是 O(N log N)。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-95** 如果 K 远小于 N，排序法可能效率不高，因为排序整个数组没有必要。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-96** 堆的大小小于 K 时直接加入，否则比较当前元素和堆顶，如果更大就替换堆顶并调整堆。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-97** 最小堆方法扫描并维护堆的时间复杂度是 O(N log K)，K 为 1 时是 O(N)，额外空间是 O(K)；最后连续出堆得到降序结果，这一步需要 O(K log K)。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-98** 最小堆方法适合处理大数据流，因为不需要一次性加载所有数据到内存。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-99** 快速选择基于快排的划分思想，找到升序情况下下标为 N - K 的位置，该位置右侧的 K 个元素就是所需结果，但它们内部不保证有序。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-100** 随机选基准时，快速选择过程的期望时间复杂度是 O(N)，最坏仍是 O(N²)。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-101** 原文的快速选择实现使用三路划分来处理重复值，选择过程采用迭代，只需 O(1) 额外空间；复制结果需要 O(K) 空间。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-102** 如果像原文代码一样继续把结果排序，总时间复杂度就是期望 O(N + K log K)，不能只写 O(N)。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-103** 依次是最小堆（时间复杂度 O(NlogK)）、快速选择（期望时间复杂度 O(N)，要有序输出还需再考虑 O(K log K) 的排序时间）、排序法（时间复杂度 O(NlogN)）。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)
- **R2-104** 用一个最小堆维护目前见到的最大的 k 个元素：遍历数组，堆没满就直接加入，否则当前元素比堆顶大就替换堆顶；最后连续出堆得到结果。原文为 Java 实现，此处按相同思路改写成 Python（用 heapq 代替 PriorityQueue）。

  ```python
  import heapq


  def top_k(arr, k):
      if arr is None or k < 0 or k > len(arr):
          raise ValueError("Invalid array or k")
      if k == 0:
          return []
      min_heap = []  # 最小堆，始终保存目前见到的最大的 k 个元素
      for num in arr:
          if len(min_heap) < k:
              heapq.heappush(min_heap, num)
          elif num > min_heap[0]:
              heapq.heapreplace(min_heap, num)  # 弹出堆顶并放入更大的元素
      result = [0] * k
      for i in range(k - 1, -1, -1):  # 连续出堆，得到降序结果
          result[i] = heapq.heappop(min_heap)
      return result
  ```

  要点：先检查 k 的范围（k < 0 或 k > N 报错，k 为 0 返回空数组）；允许重复值占多个名额，如 [5, 5, 3] 的前两个最大值是 [5, 5]；最小堆方法不修改原数组，扫描并维护堆的时间复杂度 O(N log K)，额外空间 O(K)，连续出堆得到降序结果需 O(K log K)。也可用排序法（升序排序后取最后 k 个，O(N log N)，会修改原数组）或快速选择（找到升序下标 N - K 的位置，期望 O(N)，最坏 O(N²)，结果内部不保证有序，会修改原数组），这些解法同样可接受。[原文§数组长度为N，找出最大的前K个值，怎么设计这个算法？时间复杂度是多少](https://xiaolincoding.com/interview/data.html#%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E4%B8%BAn-%E6%89%BE%E5%87%BA%E6%9C%80%E5%A4%A7%E7%9A%84%E5%89%8Dk%E4%B8%AA%E5%80%BC-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%BF%99%E4%B8%AA%E7%AE%97%E6%B3%95-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91)

## 3. 经典算法与思想

原文：[数据结构与算法面试题 · 经典算法与思想](https://xiaolincoding.com/interview/data.html#%E7%BB%8F%E5%85%B8%E7%AE%97%E6%B3%95%E4%B8%8E%E6%80%9D%E6%83%B3)。

### 哈希表的原理是什么？哈希冲突怎么解决？

- **R3-1** 哈希表是通过哈希函数把键（key）映射到数组下标的数据结构，因此能在平均 O(1) 时间内完成查找、插入、删除。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-2** 依次填：桶数组、哈希函数、取模。核心原理是准备一个可按需扩容的桶数组，用 hash(key) 把键映射成整数，对数组长度取模（或位运算）得到桶下标，再把键值对放进这个桶。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-3** 不同的 key 经过哈希函数后可能映射到同一个下标，这就是哈希冲突；哈希冲突无法完全避免。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-4** 两大类方案是链地址法（拉链法）和开放寻址法。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-5** 链地址法的做法是：每个桶里挂一个链表（或红黑树），冲突的元素都挂在对应桶的链表上。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-6** Java HashMap 和 Redis 的 dict 都用链地址法；Java 的 ThreadLocalMap 用开放寻址法，探测方式是线性探测。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-7** JDK 8 的 HashMap 在桶内链表较长时会尝试树化，常说的阈值是 8；桶数组长度不足 64 时优先扩容，达到要求时才转换为红黑树，具体触发还取决于插入路径。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-8** 三种探测方式是线性探测、二次探测、双重哈希。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-9** 线性探测依次探测 i、i+1、i+2……；二次探测依次探测 i、i+1²、i+2²……；双重哈希用第二个哈希函数算出步长。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-10** 当前负载可以用「元素数量 / 桶数量」表示；装入的元素越多，通常越容易冲突。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-11** Java HashMap 默认的负载因子阈值是 0.75，一般在元素数量超过 容量 × 负载因子 时扩容。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-12** 扩容需要重新分配桶，并把原有元素放到新的位置，单次成本可能是 O(n)，所以平均 O(1) 不代表每次插入都是 O(1)。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-13** 如果所有元素都冲突到同一个链表，查找最坏会退化为 O(n)。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **R3-14** 随便把槽位清空，可能截断后续元素的探测路径，导致后面的元素找不到；通常需要使用删除标记，或者重新整理探测区间。[原文§哈希表的原理是什么？哈希冲突怎么解决？](https://xiaolincoding.com/interview/data.html#%E5%93%88%E5%B8%8C%E8%A1%A8%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E5%93%88%E5%B8%8C%E5%86%B2%E7%AA%81%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)

### 归并排序的原理是什么？怎么实现？

- **R3-15** 归并排序是典型的分治算法。分：把数组从中间一分为二；治：递归地对两半分别排序；合：把两个已排序的子数组合并成一个有序数组。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-16** 把数组从中间一分为二，递归排序两半，再用临时数组把两个有序子数组合并回去；合并时左右两个指针比较，相等时先取左边的元素以保持稳定。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def merge_sort(arr, left=0, right=None):
      if right is None:
          right = len(arr) - 1
      if left >= right:
          return
      mid = left + (right - left) // 2
      merge_sort(arr, left, mid)
      merge_sort(arr, mid + 1, right)
      merge(arr, left, mid, right)


  def merge(arr, left, mid, right):
      temp = []
      i, j = left, mid + 1
      while i <= mid and j <= right:
          if arr[i] <= arr[j]:
              temp.append(arr[i])
              i += 1
          else:
              temp.append(arr[j])
              j += 1
      while i <= mid:
          temp.append(arr[i])
          i += 1
      while j <= right:
          temp.append(arr[j])
          j += 1
      arr[left:right + 1] = temp
  ```

  要点：区间 left >= right 时直接返回；mid 写成 left + (right - left) // 2；合并时用 <= 比较，相同元素按原始顺序放入，因此是稳定排序；时间复杂度最好、最坏、平均都是 O(n log n)，空间复杂度 O(n)（临时数组）。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-17** 归并排序最好、最坏、平均时间复杂度都是 O(n log n)。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-18** 共有 log n 层递归，每层合并总共处理 n 个元素，所以总时间是 O(n log n)。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-19** 归并排序的空间复杂度是 O(n)，因为需要额外的临时数组存放合并结果，它不是原地排序。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-20** 归并排序是稳定排序，合并时相同元素按原始顺序放入。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-21** 优势：稳定，最坏情况也是 O(n log n)（快排最坏是 O(n²)）。劣势：需要 O(n) 额外空间，不是原地排序。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-22** 典型应用场景有三类：外部排序（内存放不下的海量数据）、链表排序、需要稳定性的业务场景。归并排序需要 O(n) 额外空间，不是原地排序，因此不适合要求完全原地的场景。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-23** 使用自底向上的迭代归并、不计已有节点时，额外空间可以做到 O(1)；递归版本仍需要 O(log n) 的调用栈。[原文§归并排序的原理是什么？怎么实现？](https://xiaolincoding.com/interview/data.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)

### 二分查找怎么实现？写代码时容易出哪些坑？

- **R3-24** 二分查找是对有序数组进行查找的经典算法，时间复杂度 O(log n)；核心思想是每次比较中间元素，根据大小关系把查找范围缩小一半。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-25** 用闭区间 [left, right] 反复取中点比较：中点等于目标就返回，小于目标就把 left 移到 mid + 1，大于目标就把 right 移到 mid - 1，区间为空时返回 -1。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def binary_search(arr, target):
      left, right = 0, len(arr) - 1
      while left <= right:
          mid = left + (right - left) // 2
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      return -1
  ```

  要点：循环条件 left <= right；mid 写成 left + (right - left) // 2（Java 中用于避免整数溢出）；空数组或区间为空时返回 -1；时间复杂度 O(log n)，空间复杂度 O(1)。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-26** 不要写 (left + right) / 2，当 left 和 right 都接近 Integer.MAX_VALUE 时会溢出，必须写成 left + (right - left) / 2。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-27** 依次填：left <= right、mid + 1、mid - 1。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-28** 左闭右开区间 [left, right) 的循环条件是 left < right，更新时 left = mid + 1，right = mid（不减 1）。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-29** 不能混用，否则要么死循环，要么漏解。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-30** 如果循环里某个分支忘记让 left 或 right 变化，就会导致死循环。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)
- **R3-31** 变体题有查找「第一个等于 target」「最后一个等于 target」「第一个大于等于 target」等，是面试里的高频进阶问法；需要小心 < 和 <= 的取舍。[原文§二分查找怎么实现？写代码时容易出哪些坑？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0-%E5%86%99%E4%BB%A3%E7%A0%81%E6%97%B6%E5%AE%B9%E6%98%93%E5%87%BA%E5%93%AA%E4%BA%9B%E5%9D%91)

### 有重复元素时，怎么二分查找第一个大于等于目标值的位置？

- **R3-32** 普通二分查找遇到等于目标值的元素就返回，只能找到某个匹配位置。要求第一个大于等于 target 的位置，就要在满足条件后继续往左收缩。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-33** 采用左闭右开区间 [left, right)：中点值小于 target，则中点及其左侧都不满足条件，left 移到 mid + 1；否则中点可能就是答案，right 收缩到 mid 继续向左找。最后 left 就是第一个大于等于 target 的位置。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def lower_bound(arr, target):
      left, right = 0, len(arr)
      while left < right:
          mid = left + (right - left) // 2
          if arr[mid] < target:
              left = mid + 1
          else:
              right = mid
      return left
  ```

  要点：right 初始为数组长度，循环条件 left < right；例如 [1, 2, 2, 4] 中 target 为 2 返回 1，target 为 3 返回 3，target 为 5 返回 4（表示没有符合条件的元素）；空数组返回 0；时间复杂度 O(log n)，空间复杂度 O(1)。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-34** arr[mid] < target 时，mid 及其左侧都不满足条件，所以 left = mid + 1。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-35** arr[mid] >= target 时，mid 可能是答案，所以令 right = mid（保留 mid），继续向左找。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-36** target 为 2 返回下标 1（第一个 2）；target 为 3 返回下标 3（4 所在的位置）；target 为 5 返回数组长度 4，表示没有符合条件的元素。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-37** 要先判断 index < arr.length，再判断 arr[index] == target。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-38** 查找第一个大于 target 的位置时，把代码中的 < target 改为 <= target，就是 upper bound。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)
- **R3-39** lower bound 和 upper bound 的差值，就是 target 在有序数组中出现的次数。两次查找的时间复杂度仍然是 O(log n)，额外空间是 O(1)。[原文§有重复元素时，怎么二分查找第一个大于等于目标值的位置？](https://xiaolincoding.com/interview/data.html#%E6%9C%89%E9%87%8D%E5%A4%8D%E5%85%83%E7%B4%A0%E6%97%B6-%E6%80%8E%E4%B9%88%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%A4%A7%E4%BA%8E%E7%AD%89%E4%BA%8E%E7%9B%AE%E6%A0%87%E5%80%BC%E7%9A%84%E4%BD%8D%E7%BD%AE)

### DFS 和 BFS 有什么区别？分别在什么场景用？

- **R3-40** DFS（深度优先）一条路走到黑，走不通再回溯；BFS（广度优先）一层一层向外扩展。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-41** 依次填：栈、队列。DFS 通常用递归或栈实现，BFS 通常用队列实现。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-42** 树上遍历不计结果时，DFS 的辅助空间是 O(h)，h 是树高，指递归或按路径维护的栈；BFS 的辅助空间是 O(w)，w 是树的最大宽度。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-43** BFS 可以求最短路径：在边权相等的图中，BFS 第一次到达某顶点的路径就是最短路径；DFS 不能直接求。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-44** DFS 的典型应用包括全排列、子集、拓扑排序、检测环、连通分量、回溯；层序遍历、求最短路径和「最少几步」类问题是 BFS 的典型应用。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-45** 二叉树前/中/后序遍历是 DFS，层序遍历是 BFS；岛屿数量 DFS/BFS 都行；腐烂的橘子（求最短感染时间）用 BFS；回溯类题目（全排列、N 皇后、子集、组合）用 DFS。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-46** 使用邻接表时，DFS 和 BFS 的时间复杂度都是 O(V + E)，辅助空间最坏都是 O(V)（包括 visited 和栈或队列）；使用邻接矩阵时，扫描所有邻居的时间可能达到 O(V²)。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-47** 图可能有环，要通过 visited 避免重复访问。BFS 通常在入队时就标记已访问，否则同一个顶点可能被不同邻居重复加入队列。如果图不连通，还要从没有访问过的顶点继续遍历。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)
- **R3-48** 需要找无权图或等权图的最短路径、最少步数时用 BFS；要穷举方案或沿一条路径深入时用 DFS。边权不同时，不能直接套普通 BFS 的最短路结论。[原文§DFS 和 BFS 有什么区别？分别在什么场景用？](https://xiaolincoding.com/interview/data.html#dfs-%E5%92%8C-bfs-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E7%94%A8)

### 图一般怎么存储？邻接矩阵和邻接表有什么区别？

- **R3-49** 两种存储方式是邻接矩阵和邻接表。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-50** 邻接矩阵用二维数组记录两个顶点之间是否有边或边权；邻接表让每个顶点保存它的邻居列表。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-51** 邻接矩阵空间 O(V²)，判断两点是否相连 O(1)，遍历某个顶点的邻居 O(V)；邻接表空间 O(V + E)，判断两点是否相连普通列表最坏需要遍历该顶点的所有邻居，遍历某个顶点的邻居是 O(该顶点的度数)。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-52** 邻接矩阵适合稠密图、频繁判断任意两点是否有边的场景；邻接表适合稀疏图、经常遍历邻居的场景。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-53** 邻接矩阵仍然要保存 1 亿个位置，大部分位置没有边；邻接表只保存实际存在的邻接关系，通常更节省空间。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-54** 有向图的一条边 u → v 只需要加入 u 的邻接表；无向图的一条边通常要同时加入 u 和 v 的邻接表，所以会存储两次，但空间复杂度仍然是 O(V + E)。加权图还需要在边上保存权重。[原文§图一般怎么存储？邻接矩阵和邻接表有什么区别？](https://xiaolincoding.com/interview/data.html#%E5%9B%BE%E4%B8%80%E8%88%AC%E6%80%8E%E4%B9%88%E5%AD%98%E5%82%A8-%E9%82%BB%E6%8E%A5%E7%9F%A9%E9%98%B5%E5%92%8C%E9%82%BB%E6%8E%A5%E8%A1%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 如何反转一个链表？

- **R3-55** 用 prev、curr 两个指针配合暂存的 next 依次调转每个节点的指向：先暂存 curr.next，再让 curr.next 指向 prev，然后 prev、curr 各前进一步，最后 prev 就是新的头节点。原文为 Java 实现，此处按相同思路改写成 Python（节点类 ListNode 含 val 和 next）。

  ```python
  class ListNode:
      def __init__(self, val=0, next=None):
          self.val = val
          self.next = next


  def reverse_list(head):
      prev = None
      curr = head
      while curr is not None:
          nxt = curr.next
          curr.next = prev
          prev = curr
          curr = nxt
      return prev
  ```

  要点：空链表（head 为 None）直接返回 None，单节点返回自身，上面的写法已覆盖；时间复杂度 O(n)，空间复杂度 O(1)。递归解法也可以：时间 O(n)，但递归栈占用 O(n) 空间，关键是 head.next.next = head 且 head.next = None。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)
- **R3-56** 用三个指针 prev、curr、next 依次调转每个节点的指向。循环里先暂存下一个节点，再反转当前节点的指针，然后 prev、curr 依次前进。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)
- **R3-57** 循环结束时 curr 为 null，prev 就是新的头节点。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)
- **R3-58** 迭代解法时间复杂度 O(n)、空间复杂度 O(1)；递归解法时间复杂度 O(n)，但递归栈占用 O(n) 空间。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)
- **R3-59** head.next.next = head 让下一个节点的 next 指向当前节点；head.next = null 把当前节点的 next 设为 null，避免成环。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)
- **R3-60** 一定要考虑空链表（head == null）和只有一个节点的边界情况，迭代和递归两种写法都已经处理了。[原文§如何反转一个链表？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%8F%8D%E8%BD%AC%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8)

### 如何判断一个链表是否有环？如何找到环的入口节点？

- **R3-61** 是快慢指针，也叫 Floyd 判圈算法，是这类问题的经典应用。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-62** 依次填：1、2。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-63** 如果 fast 走到了 null，说明没有环；如果 fast 追上了 slow（相遇），说明有环。注意比较的是节点引用是否相同，不是节点的值。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-64** slow 和 fast 相遇后，让其中一个指针回到链表头，两个指针都每次走一步，再次相遇的地方就是环的入口。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-65** 用快慢指针：slow 每次走 1 步，fast 每次走 2 步；fast 走到 null 说明无环；两者相遇说明有环，此时让一个指针回到头节点，两个指针都每次走 1 步，再次相遇的节点就是环的入口。原文为 Java 实现，此处按相同思路改写成 Python（节点类 ListNode 含 val 和 next）。

  ```python
  def detect_cycle(head):
      slow = fast = head
      while fast is not None and fast.next is not None:
          slow = slow.next
          fast = fast.next.next
          if slow is fast:
              p = head
              while p is not slow:
                  p = p.next
                  slow = slow.next
              return p
      return None
  ```

  要点：循环条件要同时检查 fast 和 fast.next 不为空，空链表和单节点无环返回 null；比较的是节点引用（Python 中用 is），不是节点的值，值相同不代表有环；时间复杂度 O(n)，额外空间复杂度 O(1)。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-66** 相遇时 slow = a + b，fast = a + b + k(b + c)（多跑了 k 圈）。由 fast = 2·slow 推出 a = (k - 1)(b + c) + c，含义是：从头走 a 步，等价于从相遇点走 c 步再走若干整圈，所以两者一定会同时到达入口。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)
- **R3-67** 两种方法的时间复杂度都是 O(n)，额外空间复杂度都是 O(1)。[原文§如何判断一个链表是否有环？如何找到环的入口节点？](https://xiaolincoding.com/interview/data.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E9%93%BE%E8%A1%A8%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF-%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%8E%AF%E7%9A%84%E5%85%A5%E5%8F%A3%E8%8A%82%E7%82%B9)

### 二叉树有几种遍历方式？分别怎么实现？

- **R3-68** 四种遍历是前序遍历、中序遍历、后序遍历（这三种是 DFS）和层序遍历（BFS）。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-69** 依次填：根 → 左 → 右、左 → 根 → 右、左 → 右 → 根。DFS 的三种遍历根据根节点被访问的顺序区分。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-70** 二叉搜索树的中序遍历结果是升序的，这是经典考点。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-71** 后序遍历（左 → 右 → 根）常用于「先处理子树再处理当前节点」的场景，比如释放整棵树的内存。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-72** 用显式栈模拟递归：先沿着左子树一路压栈到底，再弹出栈顶并访问，然后转向它的右子树，重复直到当前节点为空且栈为空。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def inorder_traversal(root):
      result = []
      stack = []
      curr = root
      while curr is not None or stack:
          while curr is not None:
              stack.append(curr)
              curr = curr.left
          curr = stack.pop()
          result.append(curr.val)
          curr = curr.right
      return result
  ```

  要点：空树返回空列表；循环条件是 curr 不为空或栈不为空；每个节点入栈、出栈各一次，时间复杂度 O(n)，栈空间 O(h)（h 为树高），若把结果列表也计入，总空间 O(n)。递归写法同样可以，但本题要求迭代。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-73** 用队列实现，一层一层访问：先把根入队；每轮取出当前队列大小 size，把这一层的 size 个节点依次出队、记录值，并把它们的左右孩子入队，一层的结果放进一个列表，最后得到按层分组的结果。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)
- **R3-74** 四种遍历都会访问所有节点，时间复杂度是 O(n)。前面 DFS 写法的栈空间是 O(h)，层序遍历的队列空间是 O(w)；如果把保存遍历结果的列表也计入，总空间通常是 O(n)。[原文§二叉树有几种遍历方式？分别怎么实现？](https://xiaolincoding.com/interview/data.html#%E4%BA%8C%E5%8F%89%E6%A0%91%E6%9C%89%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86%E6%96%B9%E5%BC%8F-%E5%88%86%E5%88%AB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0)

### 滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？

- **R3-75** 滑动窗口适合处理数组、字符串中的连续区间。通过左右两个指针维护一个区间，右指针扩大窗口，左指针在条件不满足时缩小窗口，避免每次都从头统计。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-76** 用哈希表记录每个字符最后一次出现的位置，右指针逐个扩大窗口；遇到曾经出现过的字符时，把左指针移到该字符上次位置的下一格，但左指针只能前进、不能往回走，每步用窗口长度更新答案。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def length_of_longest_substring(s):
      last_index = {}
      left = 0
      max_length = 0
      for right, c in enumerate(s):
          prev = last_index.get(c)
          last_index[c] = right
          if prev is not None:
              left = max(left, prev + 1)
          max_length = max(max_length, right - left + 1)
      return max_length
  ```

  要点：left = max(left, prev + 1) 保证左边界不后退（如 abba，扫到最后的 a 时 left 已是 2，不能退回 1）；空串返回 0；时间复杂度 O(n)，空间复杂度 O(min(n, 字符集大小))。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-77** 哈希表记录每个字符最后一次出现的位置。遇到之前出现过的字符时，left = max(left, prev + 1)，即左指针不能往回走。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-78** 它之前出现在下标 0，但窗口左边界已经移动到 2，不能重新退回 1，否则窗口又会包含重复的 b。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-79** 在哈希表操作平均为 O(1) 的前提下，时间复杂度是 O(n)，空间复杂度是 O(min(n, 字符集大小))。这里按 Java 的 char 处理字符；如果题目要求按 Unicode 码点处理，需要调整字符遍历方式。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-80** 每个指针在整个过程中最多前进 n 次，所以总时间仍然是 O(n)。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)
- **R3-81** 不能套到所有连续区间问题上。求和至少为 target 的最短子数组，元素都是正数时，可以根据窗口和扩大、缩小窗口；如果包含负数，加入元素不一定使和增大，删除元素也不一定使和减小，就不能直接使用同一套判断逻辑。[原文§滑动窗口是什么？为什么有些嵌套循环仍然是 O(n)？](https://xiaolincoding.com/interview/data.html#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E4%BA%9B%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF%E4%BB%8D%E7%84%B6%E6%98%AF-o-n)

### 单调栈是什么？适合解决什么问题？

- **R3-82** 单调栈是在普通栈的基础上，要求栈内元素按某种规则保持单调。常用来求某个元素左边或右边第一个更大、更小的元素，例如每日温度、下一个更大元素、柱状图中的最大矩形。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-83** 从左到右遍历，栈中保存还没有找到答案的元素下标，对应的值从栈底到栈顶非递增；遇到更大的当前元素时，不断弹出栈顶并把答案记为当前下标，然后当前下标入栈。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  def next_greater_index(nums):
      result = [-1] * len(nums)
      stack = []
      for i, x in enumerate(nums):
          while stack and x > nums[stack[-1]]:
              result[stack.pop()] = i
          stack.append(i)
      return result
  ```

  要点：结果数组初始化为 -1；栈里存下标而不是值；使用严格大于判断，相等元素不会被弹出（严格大于与大于等于会影响答案）；空数组返回空数组；每个元素只入栈、出栈一次，时间复杂度 O(n)，辅助空间复杂度 O(n)。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-84** 从左到右遍历，栈中保存还没有找到答案的元素下标，对应的值从栈底到栈顶保持非递增。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-85** 保存下标，既能比较元素值，也能计算距离。如果题目问还要等几天才升温，就用答案下标减去当前下标。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-86** 遍历到 3 时，栈顶的 1 和后面的 2 都找到了右边第一个更大元素，因此依次弹出并记录下标 2，最终结果是 [2, 2, -1]。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-87** 虽然循环里有 while，但每个元素只会入栈一次、出栈一次，所以时间复杂度是 O(n)，辅助空间复杂度是 O(n)。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
- **R3-88** 要注意严格大于和大于等于的区别，相等元素是否弹出，会影响答案。[原文§单调栈是什么？适合解决什么问题？](https://xiaolincoding.com/interview/data.html#%E5%8D%95%E8%B0%83%E6%A0%88%E6%98%AF%E4%BB%80%E4%B9%88-%E9%80%82%E5%90%88%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)

### 拓扑排序是什么？怎么判断任务依赖中是否有环？

- **R3-89** 拓扑排序是对有向无环图（DAG）的顶点进行排序，使得对每条边 u → v，u 都出现在 v 前面。比如「先编译依赖模块，再编译当前模块」就可以用拓扑排序确定顺序。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-90** 依靠入度和队列实现。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-91** 统计每个顶点的入度（指向它的边数）；把所有入度为 0 的顶点加入队列，它们没有尚未完成的前置依赖；取出一个顶点加入结果，对它的每个后继顶点把入度减 1；如果某个后继的入度变成 0，就把它加入队列；队列为空后，如果结果包含所有顶点，说明得到了一种拓扑顺序，否则说明图中有环。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-92** 队列为空后，如果结果包含所有顶点，说明得到了一种拓扑顺序；否则说明图中有环。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-93** 环中的每个顶点都依赖环内的另一个顶点，无法通过移除入度为 0 的顶点把环里的依赖全部解除，因此这些顶点无法被完整处理。未处理的顶点可能还包括依赖这个环的后续顶点，并不一定全部都在环上。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-94** 拓扑顺序不一定唯一，如果同时有多个入度为 0 的顶点，选择它们的先后顺序可能不同。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)
- **R3-95** 使用邻接表时，时间复杂度是 O(V + E)，辅助空间是 O(V)，不计图本身的存储。[原文§拓扑排序是什么？怎么判断任务依赖中是否有环？](https://xiaolincoding.com/interview/data.html#%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88-%E6%80%8E%E4%B9%88%E5%88%A4%E6%96%AD%E4%BB%BB%E5%8A%A1%E4%BE%9D%E8%B5%96%E4%B8%AD%E6%98%AF%E5%90%A6%E6%9C%89%E7%8E%AF)

### 并查集是什么？路径压缩和按大小合并有什么作用？

- **R3-96** 两个操作是 find（找到某个元素所在集合的代表，也就是根节点）和 union（把两个元素所在的集合合并）。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-97** 只需要比较它们的根节点是否相同。常用于无向图的连通性判断、连通分量统计，以及 Kruskal 最小生成树算法。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-98** 可能形成很长的链，find 就会变慢。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-99** 两种优化是路径压缩和按大小合并（也可以按秩合并）。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-100** 路径压缩：查找根节点时，把路径上的节点直接指向根，后续查询就能跳过中间节点。按大小合并：把节点数较少的树挂到较大的树下面，避免树高增长过快；也可以按秩合并，秩用于控制树高增长。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-101** 用 parent 数组表示每个节点的父节点（初始指向自己）、size 数组记录以该节点为根的集合大小。find 先找到根，再把路径上的节点直接指向根（路径压缩）；union 先找两个根，相同则返回 false，否则把较小的树挂到较大的树下面并更新大小（按大小合并）。原文为 Java 实现，此处按相同思路改写成 Python。

  ```python
  class UnionFind:
      def __init__(self, n):
          self.parent = list(range(n))
          self.size = [1] * n

      def find(self, x):
          root = x
          while root != self.parent[root]:
              root = self.parent[root]
          while x != root:
              nxt = self.parent[x]
              self.parent[x] = root
              x = nxt
          return root

      def union(self, a, b):
          root_a, root_b = self.find(a), self.find(b)
          if root_a == root_b:
              return False
          if self.size[root_a] < self.size[root_b]:
              root_a, root_b = root_b, root_a
          self.parent[root_b] = root_a
          self.size[root_a] += self.size[root_b]
          return True
  ```

  要点：初始化时 parent[i] = i、size[i] = 1，时间和空间复杂度都是 O(n)；同时使用两种优化时 find、union 的均摊时间复杂度是 O(α(n))，α 是反阿克曼函数，增长极慢，实际中可近似看作常数，但不是每一次操作都严格为 O(1)。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-102** 同时使用路径压缩和按大小合并时，find、union 的均摊时间复杂度是 O(α(n))，α 是反阿克曼函数，增长极慢，实际中可以近似看作常数，但不是每一次操作都严格为 O(1)。初始化时间和空间复杂度都是 O(n)。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-103** 对无向图逐条加入边时，如果一条边的两个端点已经属于同一集合，说明加入这条边会形成环；但有向图不能直接用这个规则判断有向环。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **R3-104** 普通并查集不适合直接处理删除边后的连通性，因为它擅长合并集合，不能直接拆分集合。[原文§并查集是什么？路径压缩和按大小合并有什么作用？](https://xiaolincoding.com/interview/data.html#%E5%B9%B6%E6%9F%A5%E9%9B%86%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B7%AF%E5%BE%84%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%8C%89%E5%A4%A7%E5%B0%8F%E5%90%88%E5%B9%B6%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

### 什么是动态规划？典型的动态规划问题有哪些？

- **R3-105** 动态规划（DP）是一种把大问题拆解为重叠子问题、通过记录子问题的解来避免重复计算的算法思想。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-106** 通常关注：最优子结构、重叠子问题，以及状态能够描述后续决策需要的信息（无后效性）。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-107** 求最优解的问题使用 DP，通常要关注最优子结构等特征；但 DP 也可以用于计数、判断可行性，不局限于求最优解。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-108** 给定状态后，不需要再关心到达该状态的完整历史，也就是常说的「无后效性」。如果历史会影响后续选择，就需要把必要的历史信息加入状态。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-109** 依次是：定义状态 → 状态转移方程 → 初始化 → 遍历顺序。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-110** 典型 DP 题目有：斐波那契 / 爬楼梯、0-1 背包、完全背包、最长公共子序列（LCS）、最长递增子序列（LIS）、最长回文子串、编辑距离、打家劫舍、零钱兑换。活动选择、霍夫曼编码是原文介绍的贪心场景。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-111** 最长回文子串的状态定义是 dp[i][j] 表示 s[i..j] 是否是回文。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-112** 斐波那契 / 爬楼梯：dp[i] = dp[i-1] + dp[i-2]，是最入门的 DP。0-1 背包：dp[i][j] = 前 i 个物品装进容量 j 的背包能得到的最大价值。完全背包：物品可以重复选，经典的「零钱兑换」就是完全背包。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-113** 依次填：记忆化搜索、迭代 DP、滚动数组。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)
- **R3-114** 关键还是先把状态含义和转移条件定义清楚，滚动数组也只有在依赖关系允许时才能使用。[原文§什么是动态规划？典型的动态规划问题有哪些？](https://xiaolincoding.com/interview/data.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92-%E5%85%B8%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E6%9C%89%E5%93%AA%E4%BA%9B)

### 0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？

- **R3-115** 两者的区别是物品能使用多少次：0-1 背包每个物品最多使用一次，完全背包每个物品可以使用多次。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-116** dp[j] 表示容量为 j 时能获得的最大价值，初始都为 0；物品重量 w 必须为正数，价值为 v。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-117** dp[j] 表示容量为 j 时能获得的最大价值，初始都为 0。依次遍历每个物品，对容量从大到小更新 dp[j] = max(dp[j], dp[j - w] + v)，这样 dp[j - w] 还是没有加入当前物品时的结果，当前物品不会被重复使用。原文为 Java 片段，此处补全外层物品循环并改写成 Python。

  ```python
  def knapsack_01(capacity, weights, values):
      dp = [0] * (capacity + 1)
      for w, v in zip(weights, values):
          for j in range(capacity, w - 1, -1):
              dp[j] = max(dp[j], dp[j - w] + v)
      return dp[capacity]
  ```

  要点：容量必须从大到小遍历，内层范围是 capacity 到 w（含）；若 w 大于容量则该物品被跳过；没有物品或容量为 0 时结果为 0；时间复杂度 O(n × C)，空间复杂度 O(C)。完全背包只需把内层改为从小到大遍历。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-118** 从大到小遍历时，dp[j - w] 还是没有加入当前物品时的结果，当前物品不会被重复使用。如果反过来从小到大遍历，dp[j - w] 可能已经用了当前物品，再加一次就变成重复选取。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-119** 完全背包允许物品重复选，所以容量从小到大更新：dp[j] = max(dp[j], dp[j - w] + v)，j 从 w 遍历到 capacity，这样 dp[j - w] 可能已经用过当前物品，正好允许再选一次。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-120** 0-1 背包只能选一次，最大价值为 3；完全背包可以选两次，最大价值为 6。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-121** 两种写法的时间复杂度都是 O(n × C)，空间复杂度都是 O(C)。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)
- **R3-122** 除 dp[0] 外，其余状态需要初始化为不可达，再从可达状态转移，不能仍然全设为 0。[原文§0-1 背包和完全背包有什么区别？为什么一维 DP 的遍历方向不同？](https://xiaolincoding.com/interview/data.html#_0-1-%E8%83%8C%E5%8C%85%E5%92%8C%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E7%BB%B4-dp-%E7%9A%84%E9%81%8D%E5%8E%86%E6%96%B9%E5%90%91%E4%B8%8D%E5%90%8C)

### 时间复杂度和空间复杂度怎么分析？

- **R3-123** 时间复杂度描述算法运行时间随输入规模增长的趋势；空间复杂度描述算法占用的额外空间随输入规模增长的趋势。通常用大 O 记法描述渐进上界，忽略常数和低阶项。大 O 并不只用于最坏情况，也可以描述最好、平均、期望或均摊复杂度，回答时要说明分析的是哪一种。空间复杂度主要讨论不计输入存储的辅助空间，是否计入输出空间也要说明口径。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-124** 依次填：O(log n)、O(n log n)、O(n³)。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-125** 基本规则：只关注最高阶项；忽略常数系数；加法原则，顺序执行的两段代码取较大的；嵌套循环要看总执行次数，如果两个指针在整个过程中各自最多移动 n 次，即使代码里有嵌套循环，也可能只有 O(n)，不能只看循环层数。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-126** 单层循环遍历 n 个元素是 O(n)；两层循环分别完整遍历 n 个元素是 O(n²)；每次规模减半（如二分查找）是 O(log n)。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-127** 每次递归产生两个规模减半的子问题，各层合并总工作量为 O(n)，一共 O(log n) 层，所以总时间为 O(n log n)。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-128** 暴力斐波那契递归每次求 f(n-1) 和 f(n-2)，会大量重复计算，常用 O(2ⁿ) 表示其指数级上界；带记忆化后只需计算 O(n) 个状态。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-129** 两部分是额外开辟的数据结构大小（比如归并排序的临时数组是 O(n)）和递归调用栈深度。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-130** 对 n 个元素快速排序的平均递归栈深度是 O(log n)，最坏 O(n)。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)
- **R3-131** 典型对照：冒泡排序时间 O(n²)、空间 O(1)；快速排序时间平均 O(n log n)、最坏 O(n²)，递归栈空间平均 O(log n)、最坏 O(n)；归并排序时间 O(n log n)、空间 O(n)；堆排序时间 O(n log n)、空间 O(1)。[原文§时间复杂度和空间复杂度怎么分析？](https://xiaolincoding.com/interview/data.html#%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%92%8C%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%80%8E%E4%B9%88%E5%88%86%E6%9E%90)

### 贪心算法和动态规划有什么区别？

- **R3-132** 两者都可以用于求最优解，但决策方式不同：贪心每一步按某个规则直接选择，通常不再重新考虑已经做出的选择；动态规划保存不同状态的结果，通过状态转移比较候选方案。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-133** 贪心需要证明贪心选择可以导向全局最优；动态规划要求状态完整，转移、边界和计算顺序正确。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-134** 贪心并不是「当前选择不影响未来」。当前选择通常会影响后续可选方案，只是能证明按这个规则选择，不会损失得到最优解的机会。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-135** 不能笼统说动态规划一定比贪心慢，或者只要用了 DP 就一定正确。贪心的复杂度取决于具体算法（如活动选择排序后为 O(n log n)），DP 通常看状态数量 × 每个状态的转移成本。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-136** 贪心的时间复杂度取决于具体算法，比如活动选择排序后为 O(n log n)；空间复杂度取决于需要维护的数据结构。动态规划的时间复杂度通常看状态数量 × 每个状态的转移成本；空间复杂度取决于状态存储和能否压缩空间。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-137** 贪心每次选最大面值得到 4 + 1 + 1，需要 3 枚；最优解是 3 + 3，只需要 2 枚，说明「优先选最大面值」对这组面值不成立。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-138** 定义 dp[x] 为凑出金额 x 的最少硬币数，枚举最后选的一枚硬币：dp[0] = 0，dp[x] = min(dp[x - coin] + 1)，要求 x >= coin，且 dp[x - coin] 可达。不可达的状态先初始化为无穷大；如果 dp[6] 可达，它就是最少硬币数，否则说明无法凑出目标金额。金额为 A、硬币种类数为 C 时，时间复杂度是 O(A × C)，空间复杂度是 O(A)。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-139** 常见的贪心场景有活动选择、霍夫曼编码、跳跃游戏的可达性判断；背包问题、最长公共子序列、编辑距离、打家劫舍、零钱兑换等是常见的动态规划场景。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-140** 在最大化不重叠活动数量时，按结束时间排序，优先选最早结束且不冲突的活动。若活动带有不同收益，要最大化总收益，就不能直接套这个规则。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-141** 每次合并频率最小的两个节点，用最小堆维护候选项。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-142** 扫描当前位置能到达的范围，持续更新最远可达位置。不是每次实际跳到最远的下标，因为那个位置的下一步跳跃能力可能很差。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **R3-143** 采用贪心时，需要说明为什么当前选择不会破坏全局最优，常用交换论证来证明；采用动态规划时，要讲清楚状态含义、转移方程、初始化和遍历顺序。[原文§贪心算法和动态规划有什么区别？](https://xiaolincoding.com/interview/data.html#%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95%E5%92%8C%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
