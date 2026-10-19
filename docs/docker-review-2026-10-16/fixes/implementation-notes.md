# Docker 题库修订实施记录（2026-10-16）

已处理16组必修和17组可选文字澄清；252题、4章及全部题型、题号顺序、选项顺序、正确字母、28道填空的空数/空序和draft状态均不变。Y1-16仅修表述，不执行题型优化。

只修改以下3份业务源文件及本记录；未执行Git发布操作，未运行任何Docker清理命令。

- `interview-practice/docker.md`：42题。
- `interview-practice/answers-xiaolin/docker.md`：96题。
- `content/typed/docker.json`：63题。

实际变更共 **98个不同题号**；同一题可同时承担必修及可选澄清，不为凑数改无关题。

## 16组必修

| 分组 | 原审列明题号（均已实际修订） | 处理 |
| --- | --- | --- |
| Y1-M1 | Y1-24、Y1-36 | 将 VM 改为硬件抽象，将容器描述为共享内核上的隔离进程；两空仍按硬件、进程有序。 |
| Y1-M2 | Y1-62、Y1-60、Y1-64、Y1-65 | pull 改为复用本地已有相同层、下载本地缺失层；62/B 改为每次重新下载全部，消除首次拉取例外。 |
| Y1-M3 | Y1-61、Y1-60、Y1-65 | 补已有可用缓存、相关输入与前序状态不变，说明前序失效可能导致后续重建。 |
| Y2-M1 | Y2-15、Y2-13、Y2-16、Y2-23 | 补 exec ENTRYPOINT 与镜像名之后运行参数的条件，同步组合与综合解析。 |
| Y2-M2 | Y2-25、Y2-26、Y2-34 | 默认解包限定可识别的本地 tar 归档；区分任意压缩文件与远程下载。 |
| Y2-M3 | Y2-37、Y2-43、Y2-44 | 区分未另设 target 时的默认最后阶段输出与中间数据/构建缓存保留。 |
| Y2-M4 | Y2-43 | 43/E 明示原文 Go 示例，alpine/15MB 均为原文估计。 |
| Y2-M7 | Y2-58、Y2-62 | 移除随时重建“一模一样”的保证，改为步骤显式可重复；严格一致需固定输入。关联55/56同步解释“可复现”的流程含义。 |
| Y2-M8 | Y2-62 | 62 补回显式步骤便于定位问题，不恢复每条指令必产生文件系统层的错误。58关联说明同源理由。 |
| Y3Y4-M1 | Y3-1、Y3-2、Y3-12、Y3-13、Y3-5、Y3-28 | 三类统称存储/挂载；Volume、Bind Mount可持久化，tmpfs为临时挂载。13题卷问法同步比较三种方式。 |
| Y3Y4-M2 | Y3-24、Y3-27 | 区分 Docker overlay 驱动的 Swarm 依赖与 Kubernetes 可采用的一般 overlay 技术。 |
| Y3Y4-M3 | Y3-25 | 25/D 改为“只能同主机、不能跨主机”，解析明确可同机也可跨机。 |
| Y3Y4-M4 | Y4-4 | 删除命令题限定按名称/ID删除指定容器，区分 rm 与批量 prune。 |
| Y3Y4-M5 | Y4-19、Y4-20、Y4-22、Y4-23、Y4-21 | 区分正常退出 exec shell 与 attach 中按 Ctrl+C 的风险，改为可能中断而非必杀。 |
| Y3Y4-M6 | Y4-27、Y4-26、Y4-36 | 其他非零退出结合日志、命令和信号判断；与137的OOM经验提示分开。 |
| Y3Y4-M7 | Y4-54、Y4-55、Y4-57、Y4-61、Y4-51、Y4-52、Y4-56 | 默认 volume prune 与 system prune --volumes 限未使用匿名卷；补构建缓存，并区分两种 -a。 |

## 17组可选澄清

| 分组 | 实际相关改题号 | 处理 |
| --- | --- | --- |
| Y1-C1 | Y1-12/13/14/15/16/17/18/21/22/23 | v1允许多层次且控制器可合并，原文分挂载示例加条件；v2单一统一层次。Y1-16题型不改。 |
| Y1-C2 | Y1-15/22 | Docker目录布局限定原文 cgroup v1 + cgroupfs 示例。 |
| Y1-C3 | Y1-5/10/50/51/53/54 | 补默认独立命名空间/未共享资源条件；PID可见性另限未在其中创建子PID命名空间；可写层修改互不写入不泛化为任意互不影响。 |
| Y1-C4 | Y1-58/64/65 | 根文件系统中未被挂载覆盖路径的写入与首次修改镜像已有文件的CoW分开说明；64关联解析同步范围。 |
| Y1-C5 | Y1-56/65 | overlay2限定原文传统后端，说明Engine 29全新安装默认containerd image store；56不在空旁给同义答案。 |
| Y1-C6 | Y1-40/43/46 | 区分Registry服务举例与repository可见性；说明Docker Hub也支持私有repository。 |
| Y2-C1 | Y2-4/11/12 | ARG不自动成为运行时环境变量，不误称值绝不可能留在产物中。 |
| Y2-C2 | Y2-20/21/22/23 | 直接运行应用的exec示例与shell包装信号转发区别；优雅退出仍取决于应用处理。 |
| Y2-C3 | Y2-49/50/53 | dockerignore排除构建上下文；宿主已有node_modules与构建中安装依赖区别。 |
| Y2-C4 | Y2-54/61/62 | commit快照为文件变更与配置，不含内存/进程状态和挂载卷备份，非仅running才能commit。 |
| Y2-C5 | Y2-1/6/11/12 | USER设置用户及可选组，非root只是常见用途；关联解析同步。 |
| Y2-C6 | Y2-28/30/31/32/33/34 | 题干明确原文作者取舍，解析注明现官方按来源用途区分，远程制品可推荐ADD；31/32仅题干归属澄清。 |
| Y3Y4-C1 | Y4-26/28/36 | 保留137通常OOM的经验提示，补不能仅凭退出码确诊及OOMKilled/日志核查。 |
| Y3Y4-C2 | Y3-17/18/19/20/21/22/25/26/27 | docker0与默认NAT限Linux默认bridge及通常默认配置，同步反向解释。 |
| Y3Y4-C3 | Y3-19/20/25/26/27 | host只无独立网络栈；省NAT等开销不保证任何负载最高性能；端口冲突补相同监听地址/协议。 |
| Y3Y4-C4 | Y3-47/48/50/51 | down删除项目服务容器与相应非外部网络，不删除YAML定义，默认保留卷。 |
| Y3Y4-C5 | Y3-14/27 | 五种为原文网络用法归纳，不是完整官方驱动表，仍五空无序。 |

## 实际改动清单

### `interview-practice/docker.md`

Y1-5、Y1-13、Y1-14、Y1-15、Y1-16、Y1-24、Y1-43、Y1-50、Y1-51、Y1-53、Y1-56、Y1-58、Y1-60、Y1-61、Y2-15、Y2-16、Y2-20、Y2-22、Y2-25、Y2-26、Y2-28、Y2-30、Y2-31、Y2-32、Y2-37、Y2-50、Y2-61、Y3-1、Y3-2、Y3-5、Y3-12、Y3-13、Y3-14、Y3-17、Y3-18、Y3-24、Y3-47、Y4-4、Y4-20、Y4-27、Y4-54、Y4-57

### `interview-practice/answers-xiaolin/docker.md`

Y1-5、Y1-10、Y1-12、Y1-13、Y1-14、Y1-15、Y1-16、Y1-17、Y1-18、Y1-21、Y1-22、Y1-23、Y1-24、Y1-36、Y1-40、Y1-43、Y1-46、Y1-50、Y1-51、Y1-53、Y1-54、Y1-56、Y1-58、Y1-60、Y1-61、Y1-62、Y1-64、Y1-65、Y2-1、Y2-4、Y2-6、Y2-11、Y2-12、Y2-13、Y2-15、Y2-16、Y2-20、Y2-21、Y2-22、Y2-23、Y2-25、Y2-26、Y2-28、Y2-30、Y2-33、Y2-34、Y2-37、Y2-43、Y2-44、Y2-49、Y2-50、Y2-53、Y2-54、Y2-55、Y2-56、Y2-58、Y2-61、Y2-62、Y3-1、Y3-2、Y3-5、Y3-12、Y3-13、Y3-14、Y3-17、Y3-18、Y3-19、Y3-20、Y3-21、Y3-22、Y3-24、Y3-25、Y3-26、Y3-27、Y3-28、Y3-47、Y3-48、Y3-50、Y3-51、Y4-4、Y4-19、Y4-20、Y4-21、Y4-22、Y4-23、Y4-26、Y4-27、Y4-28、Y4-36、Y4-51、Y4-52、Y4-54、Y4-55、Y4-56、Y4-57、Y4-61

### `content/typed/docker.json`

Y1-5、Y1-13、Y1-14、Y1-15、Y1-16、Y1-24、Y1-43、Y1-50、Y1-51、Y1-53、Y1-56、Y1-58、Y1-60、Y1-61、Y1-62、Y2-4、Y2-6、Y2-11、Y2-15、Y2-16、Y2-20、Y2-21、Y2-22、Y2-25、Y2-26、Y2-28、Y2-30、Y2-31、Y2-32、Y2-33、Y2-37、Y2-43、Y2-49、Y2-50、Y2-54、Y2-56、Y2-58、Y2-61、Y3-1、Y3-2、Y3-5、Y3-12、Y3-14、Y3-17、Y3-18、Y3-19、Y3-20、Y3-22、Y3-24、Y3-25、Y3-26、Y3-47、Y3-48、Y3-50、Y4-4、Y4-19、Y4-20、Y4-22、Y4-26、Y4-27、Y4-54、Y4-55、Y4-57

## 核对依据

已核对本地原审、原文及官方快照中的相关段落，并对快照未涵盖的可选边界查询一级官方资料。原文错误或过强概括均在答案中括注原说法，原有252条小节引用逐字保留，官方核对链接置于原文引用之后。VM比较页使用整页URL，避免原报告中已不存在的比较小节片段。官方链接如下（实际在线锚点全量复核由主Agent执行）：

- [pid_namespaces(7)](https://man7.org/linux/man-pages/man7/pid_namespaces.7.html)
- [Docker Volumes](https://docs.docker.com/engine/storage/volumes/)
- [Linux Control Groups](https://docs.kernel.org/admin-guide/cgroup-v1/cgroups.html#why-are-cgroups-needed)
- [Control Group v2](https://docs.kernel.org/admin-guide/cgroup-v2.html#mounting)
- [Docker Runtime metrics](https://docs.docker.com/engine/containers/runmetrics/#find-the-cgroup-for-a-given-container)
- [Comparing Containers and Virtual Machines](https://www.docker.com/resources/what-container/)
- [Docker Hub repository access management](https://docs.docker.com/docker-hub/repos/manage/access/)
- [containerd image store with Docker Engine](https://docs.docker.com/engine/storage/containerd/)
- [Storage drivers：Copy-on-Write](https://docs.docker.com/engine/storage/drivers/#the-copy-on-write-cow-strategy)
- [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/#general-rules)
- [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/#pull-an-image-from-docker-hub)
- [Build variables：Build arguments](https://docs.docker.com/build/building/variables/#build-arguments)
- [Dockerfile reference：USER](https://docs.docker.com/reference/dockerfile/#user)
- [Dockerfile reference：ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint)
- [JSONArgsRecommended](https://docs.docker.com/reference/build-checks/json-args-recommended/)
- [Dockerfile reference：ADD](https://docs.docker.com/reference/dockerfile/#add)
- [Building best practices：ADD or COPY](https://docs.docker.com/build/building/best-practices/#add-or-copy)
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [Cache storage backends：Cache mode](https://docs.docker.com/build/cache/backends/#cache-mode)
- [Build context：.dockerignore files](https://docs.docker.com/build/concepts/context/#dockerignore-files)
- [docker container commit](https://docs.docker.com/reference/cli/docker/container/commit/)
- [Building best practices：Pin base image versions](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions)
- [Storage drivers：Images and layers](https://docs.docker.com/engine/storage/drivers/#images-and-layers)
- [Docker tmpfs mounts](https://docs.docker.com/engine/storage/tmpfs/)
- [Docker Networking](https://docs.docker.com/engine/network/)
- [Docker Bridge network driver](https://docs.docker.com/engine/network/drivers/bridge/)
- [Docker Host network driver](https://docs.docker.com/engine/network/drivers/host/)
- [Docker Overlay network driver](https://docs.docker.com/engine/network/drivers/overlay/)
- [Kubernetes Network Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/)
- [docker compose down](https://docs.docker.com/reference/cli/docker/compose/down/)
- [docker system prune](https://docs.docker.com/reference/cli/docker/system/prune/)
- [docker container attach](https://docs.docker.com/reference/cli/docker/container/attach/)
- [docker container ls：Filter by exit signal](https://docs.docker.com/reference/cli/docker/container/ls/#filter-by-exit-signal)
- [docker container stop](https://docs.docker.com/reference/cli/docker/container/stop/)
- [docker volume prune](https://docs.docker.com/reference/cli/docker/volume/prune/)

## 实际验证与限制

- 对修前快照做了独立的内存结构比较：4章252题的题号/顺序、type、所有选项key顺序与correct、blankCount、blankOrder、draft均保持不变。
- 28道填空的题卷题干（去除题型标记）与typed stem逐字相同，空数匹配；252条原文小节引用逐字保留。
- findings.json中16组、44个去重必修题号均发生实际修订。
- 人工逐项检查修改题的所有选项：错误项保持错误或答非所问；62/B的首次拉取例外、25/D的同机通信例外、删除指定容器与批量清理区别均已明确。
- 首轮 `npm run content:validate` 退出码0，3个V14提示：R3-139、Y2-43、Y4-55。随后仅在本节已有概念内调平后两题选项长度并复测，退出码0，仅剩无关专题的既有R3-139警告；未修改该题。
- 本子任务不运行content:build、不更新bank.json，不运行容器或清理资源。主Agent负责统一构建、运行时及在线链接验证和独立review。

## 未处理与担忧

- 无未处理的必修组或可选文字澄清组；Y1-16题型优化按明确约束不做。
- 官方文档反映2026-10-16核对时的行为，版本/安装方式已在相关答案说明。原文镜像大小、启动时间等经验值仍按原文语境，不承诺实测值。
- 文字勘误涉及较多关联解析，应由主审重点复核来源括注、选项真假、PID子层次条件及默认prune匿名卷范围。Docker专题本轮无V14警告。

## 修复轮1：移除Y3-18题干答案提示

独立复审指出，Y3-18题干中的“默认 NAT 配置”直接提示正确选项 B。已将题卷与 typed stem 同步改为“在原文 Linux 默认 bridge 网络的通常默认配置下，容器访问外网通过什么实现？”。本轮仅修该题两份题干，选项、correct、参考答案和准确的NAT解释不变。

复查28道填空的两份题干逐字同步、空数一致；`npm run content:validate`退出码0，仅余既有且无关的R3-139警告，Docker专题无警告。原有98个去重改动题号及42/96/63三份文件改题数不变。本轮未进行其他题目或URL调整。
