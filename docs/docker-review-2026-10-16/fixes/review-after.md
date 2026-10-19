# Docker 修订后独立复审（2026-10-16）

**需求符合性：通过。内容质量：通过。本次复审未发现仍需修复的确证问题。**

16 组必修与 17 组文字澄清均已实际落入题库；Y1-16 按任务明确约束保留原题型。独立逐题阅读了全部 **98 个变更题号**的有效题干、所有选项及 `correct`、参考答案与逐题引用，并额外完整复核全部 **28 道填空**。本报告没有把先前未完成的复审当作通过依据。

## 范围与证据

先以 `docs/superpowers/plans/2026-10-16-docker-task-1-brief.md`、`implementation-notes.md`、`changes.diff` 确认需求及实施范围；再对照 `findings.json`、三份原审报告、`source.txt` / `source.html`、官方页面快照及最终三份源文件复审。选择题读取真实 parser 的 `questions-after.json`，并逐字段与当前源文件比较；简答有效题干取题卷，不把 typed 中没有重复保存 `stem` 误判为缺题。

实际变更：题卷 42 题、答案 96 题、typed 63 题，合并为 98 个不同题号。其中单选 50、多选 19、填空 10、简答 19；“10 道变更填空”不代替对全部 28 道填空的复核。

已审 98 题的完整范围如下，列出的每题均检查了实际题干、全部选项（如有）、判定、答案及引用：

- **Y1，28 题：** Y1-5、Y1-10、Y1-12、Y1-13、Y1-14、Y1-15、Y1-16、Y1-17、Y1-18、Y1-21、Y1-22、Y1-23、Y1-24、Y1-36、Y1-40、Y1-43、Y1-46、Y1-50、Y1-51、Y1-53、Y1-54、Y1-56、Y1-58、Y1-60、Y1-61、Y1-62、Y1-64、Y1-65。
- **Y2，32 题：** Y2-1、Y2-4、Y2-6、Y2-11、Y2-12、Y2-13、Y2-15、Y2-16、Y2-20、Y2-21、Y2-22、Y2-23、Y2-25、Y2-26、Y2-28、Y2-30、Y2-31、Y2-32、Y2-33、Y2-34、Y2-37、Y2-43、Y2-44、Y2-49、Y2-50、Y2-53、Y2-54、Y2-55、Y2-56、Y2-58、Y2-61、Y2-62。
- **Y3，21 题：** Y3-1、Y3-2、Y3-5、Y3-12、Y3-13、Y3-14、Y3-17、Y3-18、Y3-19、Y3-20、Y3-21、Y3-22、Y3-24、Y3-25、Y3-26、Y3-27、Y3-28、Y3-47、Y3-48、Y3-50、Y3-51。
- **Y4，17 题：** Y4-4、Y4-19、Y4-20、Y4-21、Y4-22、Y4-23、Y4-26、Y4-27、Y4-28、Y4-36、Y4-51、Y4-52、Y4-54、Y4-55、Y4-56、Y4-57、Y4-61。

## 16 组必修的验收

下表的“通过”同时表示主体题与列出的关联解析已核对，不能只由发生过文本修改推出。

| 原审分组 | 实际复审题号 | 语义验收 |
| --- | --- | --- |
| Y1-M1 | 24、36 | 通过。VM 对应硬件抽象；容器对应共享内核上的隔离进程。24 仍两空有序，答案硬件、进程分别对应题干。 |
| Y1-M2 | 60、62、64、65 | 通过。pull 下载本地缺失层，非固定一层；62/A 正确，B 的“每次重新下载全部”确定为错。60/B 虽描述有效 pull 行为，但未回答题设多个镜像共享相同底层的直接好处；C 保持唯一最佳答案。 |
| Y1-M3 | 60、61、65 | 通过。已有可用缓存、相关输入和前序状态条件完整；61/D 为复用缓存，其余选项不能回答题设。关联解析不再肯定仅凭单层未变就保证命中。 |
| Y2-M1 | 13、15、16、23 | 通过。参数位置与 exec ENTRYPOINT 前提明确；15 的忽略参数干扰项不再因 shell ENTRYPOINT 成立；16 的两者均为 exec 与组合答案一致。 |
| Y2-M2 | 25、26、34 | 通过。限定可识别的本地 tar 归档及默认解包行为，区分远程下载和任意压缩格式。25 两空仍对应自动解压、URL；26/C 成立。 |
| Y2-M3 | 37、43、44 | 通过。未另设 target 默认输出最后阶段，未承诺删除中间阶段缓存；37/B 与 43/B 成立。 |
| Y2-M4 | 43 | 通过。E 明示原文 Go 示例，alpine 与 5MB/15MB 明示原文估计；正确集合仍 B/C/E，无普遍镜像大小承诺。 |
| Y2-M7 | 58、62，关联55、56 | 通过。构建步骤可自动重复、可追溯，不再保证任意时间产物完全一致；固定输入的限定已写明。58/B/D 均成立。 |
| Y2-M8 | 62，关联58 | 通过。已补显式记录步骤便于排查；未恢复每条 Dockerfile 指令都产生文件系统层的错误。 |
| Y3Y4-M1 | Y3-1、2、5、12、13、28 | 通过。总类改为存储/挂载，tmpfs 明确临时；Y3-12 正确集合 A/C/D/F 与各方式特点一致；综合答案仍完整比较特点及用途。 |
| Y3Y4-M2 | Y3-24、27 | 通过。Docker overlay 驱动的 Swarm 条件与 Kubernetes 的通用 overlay/CNI 语境区分；24/B 正确，其余选项描述其他模式。 |
| Y3Y4-M3 | Y3-25 | 通过。D 改为只能同机、不能跨机的排他断言，确定为错；A/C/E 仍正确。 |
| Y3Y4-M4 | Y4-4 | 通过。按名称或 ID 删除指定容器使 B 唯一；批量清理停止容器的 system prune 不再成为同义答案。 |
| Y3Y4-M5 | Y4-19、20、21、22、23 | 通过。区分正常退出 exec shell 与 attach 的中断信号风险；不再把 Ctrl+C 写成必杀。19/D、20/A、22/B/C/E 与参考解释一致。 |
| Y3Y4-M6 | Y4-26、27、36 | 通过。其他非零退出结合日志、命令、信号判断；27/C 正确。26/C 明确否定仅凭数字确诊，未干扰原文“137 通常 OOM”的 D。 |
| Y3Y4-M7 | Y4-51、52、54、55、56、57、61 | 通过。默认 volume prune 限未被任何容器引用的匿名本地卷；volume prune -a 与 system prune -a 范围区分，--volumes 限匿名卷；55/C 与综合答案补齐未使用构建缓存。 |

16 组覆盖原审 44 个去重必修题号，均已改动并解决对应发现；其余关联修改与这些问题或可选澄清具有直接关系，未发现为凑数新增考点。

## 17 组文字澄清的验收

| 原审分组 | 实际复审题号 | 语义验收 |
| --- | --- | --- |
| Y1-C1 | 12、13、14、15、16、17、18、21、22、23 | 通过。v1 允许多层次、控制器可合并；分挂载题明确示例条件，v2 单一统一层次；16 仍按已分挂载示例判 B/D。 |
| Y1-C2 | 15、22 | 通过。Docker 目录布局明确限原文 v1+cgroupfs 示例，未泛化为 systemd 驱动路径。 |
| Y1-C3 | 5、10、50、51、53、54 | 通过。默认独立命名空间、未共享资源条件明确；PID 另有限制子命名空间；可写层修改不相互写入，未泛称所有配置互不影响。 |
| Y1-C4 | 58、64、65 | 通过。根文件系统未被挂载覆盖路径，与首次修改镜像已有文件的 CoW 分开；58/B 正确，未把卷写入归入容器可写层。 |
| Y1-C5 | 56、65 | 通过。传统存储后端与 Engine 29 全新安装默认 containerd image store 的范围明确；56 两空仍是 UnionFS、overlay2，题干未直接给出同义答案。 |
| Y1-C6 | 40、43、46 | 通过。Registry 服务举例与 repository 可见性区分；43 明问原文列举，Docker Hub 在该原文列举问题中仍不选，未声称其不支持私有 repository。 |
| Y2-C1 | 4、11、12 | 通过。ARG 不自动成为运行时环境变量，未声称其值无法通过 ENV 或文件留在产物。 |
| Y2-C2 | 20、21、22、23 | 通过。直接运行应用的 exec 示例、shell 包装和实际信号处理区分；未无条件保证优雅退出。 |
| Y2-C3 | 49、50、53 | 通过。.dockerignore 排除构建上下文文件；宿主已有 node_modules 与构建过程中安装依赖区分。 |
| Y2-C4 | 54、61、62 | 通过。commit 快照解释为文件变更与配置，非内存/进程状态、非挂载卷备份，也非仅 running 容器可用。 |
| Y2-C5 | 1、6、11、12 | 通过。USER 设置用户及可选组，非 root 为常见用途；关联指令解析不再把用途当成唯一职责。 |
| Y2-C6 | 28、30、31、32、33、34 | 通过。原文作者选择偏好与现行官方按来源/用途的建议分开；原文取舍的正确项与题干一致，未把远程制品 ADD 说成官方一律不推荐。 |
| Y3Y4-C1 | Y4-26、28、36 | 通过。保留“通常 OOM”的原文经验提示，补 SIGKILL、手动终止/停止超时及 OOMKilled/日志核查，不把137作为确诊。 |
| Y3Y4-C2 | Y3-17、18、19、20、21、22、25、26、27 | 通过。docker0 与 NAT 归属 Linux 默认 bridge 的通常默认配置；反向解释同步。18 的题干答案提示已按下节核对删除。 |
| Y3Y4-C3 | Y3-19、20、25、26、27 | 通过。host 只无独立网络栈；减少 NAT 等开销不是任意负载最高性能承诺；端口冲突限同监听地址和协议的通常场景。 |
| Y3Y4-C4 | Y3-47、48、50、51 | 通过。down 删除项目服务容器及相应非外部网络，不删除 YAML 服务定义，默认保留卷。47 的四命令用途仍逐空对应。 |
| Y3Y4-C5 | Y3-14、27 | 通过。五种网络用法明确为原文教学归纳，非完整官方驱动表；14 保留五空无序，未强加原文未讲驱动。 |

## Y3-18 回归的定向复核

首轮修订的题干含“默认 NAT 配置”，直接给出 B=NAT，属于答案提示。最终实际文件已同步改为：

> 在原文 Linux 默认 bridge 网络的通常默认配置下，容器访问外网通过什么实现？

核对位置为 `interview-practice/docker.md:202`、`content/typed/docker.json:3328`；最终 `questions-after.json` 已与实际有效题干一致。A 宿主网络栈、C 共享另一个容器网络栈、D loopback 均非题设默认 bridge 访问外网的机制；B=NAT 仍唯一正确。参考答案保留 NAT 的技术解释正确，题干中已无该答案词。**该回归已解决，无待修项。**

## 全部 28 道填空复核

逐题阅读了题干与参考答案，按所问位置判断有序/无序；另以独立内存比较核对题卷去掉题型标记后的题干与当前 typed stem 逐字相同，`____` 数量等于 `blankCount`。所有空数和顺序配置与修前一致；同义表达仍依既定语义评分规则接受，不要求复述题干未问的解释。

| 题号 | 空数/顺序 | 与题干对应的参考内容 | 结论 |
| --- | --- | --- | --- |
| Y1-1 | 2/无序 | Namespace、cgroups | 通过 |
| Y1-24 | 2/有序 | 硬件；进程 | 通过 |
| Y1-28 | 2/有序 | Namespace；cgroups | 通过 |
| Y1-37 | 3/无序 | 镜像、容器、Registry | 通过 |
| Y1-42 | 3/无序 | 启动、停止、删除（本小节列举） | 通过 |
| Y1-48 | 2/有序 | 类；对象 | 通过 |
| Y1-56 | 2/有序 | UnionFS；overlay2（原文传统后端） | 通过 |
| Y1-59 | 3/无序 | 共享与复用、构建缓存、增量分发 | 通过 |
| Y2-8 | 2/无序 | CMD、ENTRYPOINT | 通过 |
| Y2-19 | 2/有序 | exec；shell | 通过 |
| Y2-25 | 2/有序 | 自动解压；URL | 通过 |
| Y2-39 | 2/有序 | 构建；运行 | 通过 |
| Y2-61 | 2/有序 | 快照；Dockerfile | 通过 |
| Y3-1 | 3/无序 | Volume、Bind Mount、tmpfs（三种存储/挂载） | 通过 |
| Y3-10 | 2/有序 | Bind Mount；Volume | 通过 |
| Y3-14 | 5/无序 | bridge、host、none、container、overlay（原文归纳） | 通过 |
| Y3-16 | 2/有序 | bridge；overlay | 通过 |
| Y3-43 | 3/无序 | Web应用、数据库、缓存 | 通过 |
| Y3-47 | 4/有序 | compose up -d；down；logs -f；ps（各空须完整 docker compose 命令） | 通过 |
| Y3-63 | 2/有序 | 容器本身；容器集群 | 通过 |
| Y4-10 | 2/有序 | docker system df；docker system prune | 通过 |
| Y4-11 | 3/有序 | stop；start；restart | 通过 |
| Y4-12 | 3/无序 | 镜像相关、容器相关、系统相关 | 通过 |
| Y4-21 | 2/有序 | exec；attach（原文新开shell调试建议） | 通过 |
| Y4-28 | 3/有序 | 正常退出；通常OOM被杀；段错误 | 通过 |
| Y4-41 | 3/有序 | 名字；网络；环境变量 | 通过 |
| Y4-44 | 2/无序 | always、unless-stopped | 通过 |
| Y4-54 | 2/有序 | volume；network | 通过 |

## 来源边界与引用质量

对98题及28填空的原文引用逐条核对小节归属，并以 BeautifulSoup DOM 查找解码后的原文片段，均匹配；252条原有逐题原文引用与修前保持一致。全部252题的当前引用列表与最终 parser 快照一致。新增引用涉及31个官方页面，已阅读对应支持段落：容器/VM、PID可见性、cgroup层次与路径、存储后端/CoW/共享卷、缓存/pull、Dockerfile/构建上下文/多阶段、commit、网络驱动、Compose down、信号/退出状态及prune范围。

重点核对了以下容易错配的支持关系：

- [Linux cgroup v1](https://docs.kernel.org/admin-guide/cgroup-v1/cgroups.html#why-are-cgroups-needed) 允许每控制器分层次到全部合并层次的布局，[cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html#mounting) 才只提供单一层次；[Docker Runtime metrics](https://docs.docker.com/engine/containers/runmetrics/#find-the-cgroup-for-a-given-container) 明确列出 cgroupfs 与 systemd 的不同路径。
- [Storage drivers](https://docs.docker.com/engine/storage/drivers/#the-copy-on-write-cow-strategy) 支持已有文件首次修改的复制行为，[Volumes](https://docs.docker.com/engine/storage/volumes/) 支持绕过容器可写层、卷可被多容器挂载；[Images and layers](https://docs.docker.com/engine/storage/drivers/#images-and-layers) 明确 LABEL/CMD 元数据指令不产生文件系统层。
- [ADD or COPY](https://docs.docker.com/build/building/best-practices/#add-or-copy) 区分本地上下文复制与远程制品，[ADD reference](https://docs.docker.com/reference/dockerfile/#add) 支持本地tar默认解包、按内容识别及远程tar默认不解包；[固定基础镜像](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions) 支持同一标签不能保证重建内容一致的勘误。
- [Overlay driver](https://docs.docker.com/engine/network/drivers/overlay/) 明确即使独立容器也要求主机加入Swarm；[Kubernetes Network Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) 支持网络由CNI插件实现，未把一般overlay技术等同Docker驱动。
- [attach](https://docs.docker.com/reference/cli/docker/container/attach/) 的信号代理、终端及PID1说明支持“可能中断”，也支持其他非零退出可能来自信号；[退出状态](https://docs.docker.com/reference/cli/docker/container/ls/#filter-by-exit-signal) 与 [stop](https://docs.docker.com/reference/cli/docker/container/stop/) 支持137并非只由OOM造成。
- [volume prune](https://docs.docker.com/reference/cli/docker/volume/prune/) 与 [system prune](https://docs.docker.com/reference/cli/docker/system/prune/) 分别支持匿名卷默认范围、两类 `-a` 的区别及构建缓存清单，未混用。

原文错误/概括过强处均保留原文小节引用，在答案括注原说法并追加“核对来源：”官方链接；未发现静默用外部来源增加独立考点、引用正文不能支持修订结论，或因修订丢失原文有效机制解释。原文体积估算、历史版本和作者偏好保留相应语境，未当成现行普遍规格。

`storage/drivers/` 曾抓取超时，本复审另用只读在线请求确认HTTP200及两个实际DOM锚点存在，并阅读支持正文；该网络重试不构成引用失效。最终主审 `links-after.json` / `checks-after.json` 也已记录32个页面（原文1、官方31）及实际锚点核对通过，未把无引号HTML id误判为不存在。

## 独立结构核对与结论限制

独立读取三份修前快照及当前源文件比较：4章252题的题号、题序、题型、全部选项key及顺序、全部correct、填空空数/空序、draft状态不变；题卷与答案题号顺序也不变。将三文件当前内容重新在内存生成4行上下文的统一diff，与最终 `changes.diff` 完全一致。实际源文件有效题干、选项及参考答案与最终 `questions-after.json` 一致。

最终复审对应的源文件SHA256如下，与 `checks-after.json` 相符：

| 文件 | SHA256 |
| --- | --- |
| interview-practice/docker.md | `2f57a26f39395aba3a7746909c6c0709c45029fc2eb5d85d834aaf36e0fbed2b` |
| interview-practice/answers-xiaolin/docker.md | `7527434374984f27d3b04b223f098328f3066d5e4e9e1450b52d5348de735859` |
| content/typed/docker.json | `dc723770b345cd7b65e3f1c5db2acdbad8839f3dbc6eaf0a864412616ba832f8` |

本次只读内容复审不重复主审已运行的应用测试和内容校验，不以机械校验代替逐题语义阅读。未实际运行容器复现实机网络、存储或信号行为，相关结论依据原文与一级官方资料。业务文件未写入，仅新增本报告；未执行Docker清理命令或Git发布操作。

**双维结论：需求符合性通过；内容质量通过。待修确证问题清单为空。**
