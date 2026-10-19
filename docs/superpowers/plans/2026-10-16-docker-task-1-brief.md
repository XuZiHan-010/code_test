# Task 1：修订 Docker 题库

先读项目根AGENTS.md、CLAUDE.md和interview-practice/README.md出题规则。所有说明中文；严禁commit/push/tag/PR/reset/clean；不要覆盖用户无关修改。

唯一可修改的业务文件：interview-practice/docker.md、interview-practice/answers-xiaolin/docker.md、content/typed/docker.json。报告写docs/docker-review-2026-10-16/fixes/implementation-notes.md。不改README/CLAUDE、旧报告、校验脚本或其他文件；主Agent负责验证脚本和总结。

读取docs/docker-review-2026-10-16/findings.json、Y1-review.md、Y2-review.md、Y3-Y4-review.md；原文source.html、source-blocks.txt及官方13份快照official-*.html可供核对。原审questions.json为修前有效网页题目。三份修前源文件已保存到fixes/before/下相同相对路径。

目标：处理16组必修和17组可选文字澄清。保持4章252题、题号、题序、题型、选项顺序、所有correct标记、填空空数和顺序、draft状态。Y1-16题型优化不做，因为保持现有题型，其他表述可澄清。避免为强行计数大改无关题；同源说明应在本章关联解析内同步，报告如实列实际改动范围。

Y1必修：24/36区分VM硬件虚拟化与共享内核上的容器隔离进程（24保持两空有序，可问VM抽象的硬件及容器运行实体进程）；60/62/64/65改为拉取本地缺失层而非固定一层，62错误选项用“每次重新下载全部”消除首次情况；60/61/65缓存补已有可用缓存、相关输入和前序状态不变。
Y1可选：v1允许多层次且控制器可合并，原文展示分挂载，v2统一层次；Docker目录布局限v1+cgroupfs；默认独立namespace/未共享资源下的隔离；容器根文件系统未被挂载覆盖路径的写入与CoW，不泛称任何修改；overlay2限原文传统存储后端，注明Engine29新安装containerd image store；Registry服务举例与repository私有可见性区分。引用和括注按真实原文差异书写。

Y2必修：13/15/16/23参数追加补exec ENTRYPOINT且运行参数在镜像名之后；25/26/34解包限定可识别本地tar归档，非任意压缩和默认远程下载；37/43/44区分未指定target默认最后阶段输出与缓存，并不保证中间数据删除；43E明确原文Go示例与估计值；58/62删除保证随时得到“一模一样”，改构建步骤显式可重复，严格一致需输入固定；62补有效理由“步骤显式便于排查”，不恢复“一指令必有文件系统层”。
Y2可选：ARG不自动成为运行时env；exec直接运行应用的示例与实际信号处理，不能保证任意程序优雅退出；dockerignore排除构建上下文、宿主机node_modules不等于构建过程中安装依赖不能进入镜像；commit快照为文件变更与配置而非内存/挂载卷备份、非仅running才能commit；USER设置用户/组不限定非root；COPY/ADD按原文作者历史建议，现官方按来源用途区分（远程制品可推荐ADD），题干与正确选项保持自洽并加必要说明。

Y3/Y4必修：Y3-1/2/5/12/13/28把持久化总类改原文三种存储/挂载，tmpfs临时；Y3-24/27区分Docker overlay驱动和K8s通用overlay；Y3-25D改为“只能同主机不能跨主机”确保false；Y4-4题干限按名称或ID删除指定容器；Y4-19/20/21/22/23区分退出exec shell和attach中断风险，Ctrl+C可影响主进程而非必杀；Y4-26/27/36其他非零退出结合日志/信号判断，137通常OOM保留但说明不能单凭退出码确诊；Y4-54/57限定默认未使用匿名卷，55补unused build cache，61与51/52/56解析同步，区分volume prune -a与system prune -a；绝不执行任何Docker清理命令。
Y3/Y4可选：默认bridge/docker0与默认NAT语境；host只无网络栈隔离、常用于减少开销而非无条件性能最高；Compose down删除项目容器和相应网络而非YAML定义，默认保留卷；五种模式是原文教学归纳不是完整官方驱动表。

原文自身错误或概括过强：答案写准确说法并括注原文原说法，原文小节引用仍在末尾，后跟[核对来源：官方资料标题](https://...)。必要官方链接可以复用报告中的精确链接，但请读快照确认引用支持当前表述；新增在线核对只用一级官方来源。不得只加“按原文”绕过确证错误。不要把报告/实现细节写进面向考生题干。

自查：逐项确保所有原来被判错的选项仍可确定为错或答非所问，正确选项在修后题干下成立；参考答案完整回答，数字/字母/原文出处一致。28道填空两份题干逐字同步。可运行npm run content:validate（不构建产物），主Agent会统一跑实际验证与测试。

implementation-notes.md需列16组必修和17组可选各自处理、实际改题号、官方链接、未处理原因（如有）、实际验证与担忧。不要用脚本替换整章而丢失已有内容；使用局部结构化修改，保留UTF8。完成返回DONE或DONE_WITH_CONCERNS、报告路径、一句话验证与需要主审关注的问题。
