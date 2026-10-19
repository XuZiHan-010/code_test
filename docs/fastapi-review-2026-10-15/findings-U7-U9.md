# FastAPI U7–U9 逐题审查

审查日期：2026-10-15。仅生成本报告，未修改题库、业务代码或章节状态。

## 覆盖范围与方法

已逐题读取 `U7-questions.json`、`U8-questions.json`、`U9-questions.json` 中的题卷问法、实际线上题干、全部选项、正确标记及参考答案：U7-1～U7-35 共35题、U8-1～U8-27 共27题、U9-1～U9-31 共31题，合计93题。11道填空题的空数和有序/无序配置也已逐题核查，未发现配置错误。

对照了 `sources/manifest.json` 对应的17个官方中文页面正文和有关代码：middleware、cors、background-tasks、events、advanced/middleware、websockets、bigger-applications、sql-databases、settings、testing、testing-dependencies、async-tests、deployment/concepts、manually、server-workers、docker、behind-a-proxy。正文快照均为 HTTP 200；同时在线打开重点页面复核。只有在原文内部冲突或技术说法需要勘误时，才对照 FastAPI Reference、Uvicorn 和 Kubernetes 官方资料，未据此新增题外考点。

确认问题共8题：P1 两题、P2 六题；另有3项边界记录，不计入确认问题。U8 的27题未发现足以影响判分的确定问题；这不等于确认其原文每个技术表述都没有任何边界。

优先级含义：P1 为正确标记/参考结论会排斥合理正确答案或传授明显错误机制；P2 为缺少成立条件或参考答案扩大结论，需修正后再用于判分。

## 确认问题

### U7-4｜P2｜yield 退出代码晚于中间件的结论缺少默认生命周期条件

当前完整题干：按官方文档，如果依赖使用了 yield，依赖中 yield 之后的退出代码相对中间件在什么时候运行？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | 在中间件之前运行 | 错误 |
| B | 与中间件同时运行，两者没有先后顺序 | 错误 |
| C | 在中间件之后运行 | 正确 |
| D | 在应用关闭（shutdown）时才运行 | 错误 |

参考答案照转[所引中间件原文](https://fastapi.tiangolo.com/zh/tutorial/middleware/#middleware)，将“在中间件之后”写成无条件结论。短摘录：“依赖中的退出代码会在中间件之后运行”。但[官方 yield 依赖页面](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#early-exit-and-scope)说明未指定时为 request scope，并且允许提前退出；该配置会改变相对中间件响应侧代码的顺序。因此原文中间件页的概述缺少适用范围。

为何导致误判：主审查的 `reproduction-results.json` 中，默认/request 生命周期为 `middleware_after` 后 `dependency_exit`；提前退出配置为 `dependency_exit` 后 `middleware_after`。题干没有默认生命周期前提，C 并非所有带 yield 的依赖都成立。A 也不宜简单改成正确，因为退出仍发生在中间件请求侧逻辑之后，“中间件之前/之后”应明确指响应侧逻辑。

最小修正建议：题干加“使用默认的依赖生命周期配置，以下‘中间件之后’指其中 await call_next(request) 之后的响应处理代码”；答案限定为默认配置。这只是补足原考点成立条件，不把 README 明确排除的 scope 配置扩展成新考点；原文概述的限制可在解析中简短注明，附上述官方核对链接。

### U7-12｜P1｜把有争议的原文限制直接制成多选答案，同页示例及官方实现均允许 methods/headers 通配符

当前完整题干：当 allow_credentials 设为 True 时，CORSMiddleware 的哪些参数不能设为 ['*']，必须显式指定？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | allow_origins | 正确 |
| B | expose_headers | 错误 |
| C | allow_methods | 正确 |
| D | max_age | 错误 |
| E | allow_headers | 正确 |

当前参考答案要求 A、C、E，称三个参数“都不能设为 ['*']”。这确实照转了[所引参数说明](https://fastapi.tiangolo.com/zh/tutorial/cors/#use-corsmiddleware)，但该节紧邻示例又同时设置 `allow_credentials=True`、显式 origins、`allow_methods=["*"]`、`allow_headers=["*"]`，原文内部直接冲突。

官方核对：[FastAPI Reference 的 CORSMiddleware 实现](https://fastapi.tiangolo.com/zh/reference/middleware/#fastapi.middleware.cors.CORSMiddleware) 将方法通配符展开为 `ALL_METHODS`，请求头通配符则在预检时回显请求头；不是把配置通配符原样当作凭据响应中的通配符发送。短摘录：`allow_methods = ALL_METHODS`。这说明不能把教程的协议层限制泛化成这两个配置项“不能设”。

为何导致误判：按同页官方示例理解并知道 C/E 可配置通配符的考生，会被当前答案判错；且题干没有“仅复述参数说明中的一句话”的限定。

最小修正建议：保留现有题型、选项和 A/C/E 标记，将题干改为“CORSMiddleware 中，分别配置允许的源、HTTP 方法和请求头的参数有哪些？”；参考答案改讲三个参数的用途，另注明原文文字与示例不一致及核对来源。这样仍只考当前页面已讲的三个参数，无须引入新知识点。若坚持考凭据限制，必须先按官方实现勘误，不能仅把 C/E 简单改错而保留其他绝对措辞。

补充复现：本机 FastAPI 0.135.3、Starlette 1.0.0，使用显式 `allow_origins=['https://frontend.example']`、`allow_credentials=True`、methods/headers 均为 `['*']`，发送 POST 预检并申请 `X-Test`，返回200，响应包含显式 origin、允许凭据、展开的方法列表及 `Access-Control-Allow-Headers: X-Test`。该复现只是确认机制，未修改项目依赖。

### U7-10｜P2｜把“需要预检的流程”写成所有跨源请求的必经步骤

当前完整题干：前端和后端处于不同的“源”时，浏览器与后端之间的 CORS 通信是怎样进行的？后端需要提供什么？

题型为简答，无选项。参考答案无条件要求“浏览器会先向后端发送一个 HTTP OPTIONS 请求”，授权后才发送实际请求。

官方依据：[所引“步骤”](https://fastapi.tiangolo.com/zh/tutorial/cors/#steps)确实采用这一简化流程，但同页另分[预检请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#cors-preflight-requests)及[简单请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#simple-requests)，后者明确说明中间件直接向下传递请求，再给响应加 CORS 头。短摘录：“中间件将像平常一样传递请求”。

为何导致误判：题干泛问所有不同源通信，合理回答“满足简单请求条件时直接发送实际请求，需要预检时先 OPTIONS”会与参考答案的必经步骤冲突。问题源于原文举例简化后，出题又扩大成普遍问法。

最小修正建议：题干加“对于需要 CORS 预检的请求”；答案相应写“浏览器先发送预检 OPTIONS”，并保留允许源和适当响应头的原考点。或者保持泛问，但答案按该页现有两类请求分别描述。无需新增该页没有展开的简单请求详细条件。

### U9-19｜P2｜仅开启 proxy_headers 并不自动把容器网络中的任意代理列为可信来源

当前完整题干：容器运行在 Nginx 或 Traefik 等 TLS 终止代理后面时，按官方文档，应该在 CMD 里加什么选项？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | `--workers`，启动多个工作进程来分担代理转发的请求 | 错误 |
| B | `--proxy-headers`，让 Uvicorn 信任代理发来的标头 | 正确 |
| C | `--reload`，让代理的配置变更在容器里自动生效 | 错误 |
| D | `--port`，指定代理对外监听的端口 | 错误 |

当前答案把添加 `--proxy-headers` 直接解释为“信任代理发送的标头”。这照转了[所引 Docker 页面](https://fastapi.tiangolo.com/zh/deployment/docker/#behind-a-tls-termination-proxy)，但漏掉了信任来源条件。

官方依据：[FastAPI“启用代理转发的请求头”](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers)明确要求用 `--forwarded-allow-ips` 配置信任的地址；[Uvicorn HTTP 设置](https://uvicorn.dev/settings/#http)区分“启用解析”和“可信来源”。短摘录：`restricted to only trusting connecting IPs`。

为何导致误判：代理与应用在不同容器时，代理连接源可能不在默认信任集合内；只加 B 所述选项仍不会采用它的头。当前题目会把“开启处理开关”教成“完成代理信任配置”。B 是四个现有选项里对应所引段落的选项，因此这里不是把标记简单改成另一个字母。

最小修正建议：题干补“已通过 `--forwarded-allow-ips` 将代理来源配置为可信，按该节还可显式添加哪个选项以启用转发头处理”；B 改为“`--proxy-headers`，启用转发头处理”，答案说明仍受可信来源范围限制。也可改考哪个参数配置可信代理来源，但应同步改题干、选项和答案，不能保留当前无条件解释。

### U9-24｜P1｜Init Container 的范围是 Pod，不能自动保证所有副本的数据库迁移全局仅执行一次

当前完整题干：在 Kubernetes 的多容器场景下，按官方文档，数据库迁移这类只需执行一次的前置步骤通常怎么运行？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | 在每个副本容器启动主进程之前，都在容器里各自执行一次 | 错误 |
| B | 交给负载均衡器，在它把请求转发给容器之前先执行一次 | 错误 |
| C | 在 `--workers` 启动的每个工作进程启动时，各自执行一次 | 错误 |
| D | 用单独的容器（Kubernetes 里是 Init Container）在 worker 容器启动前运行一次 | 正确 |

当前答案把“一只单独容器在全部复制 worker 之前执行一次”与 Kubernetes Init Container 直接等同。

所引[FastAPI“多个容器”](https://fastapi.tiangolo.com/zh/deployment/docker/#multiple-containers)确实有“单独的容器”以及“通常会是一个 Init Container”的原文组合，属于原文技术边界需要勘误。官方核对：[Kubernetes Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#understanding-init-containers)明确把它写在 Pod spec 中；其[详细行为](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#detailed-behavior)还说明可能重试或重执行。短摘录：`before the app containers are started`（上下文为一个 Pod）。

为何导致误判：部署有多个副本 Pod 时，每个 Pod 都能运行自己的 Init Container，不会自然形成全副本共享的一次性迁移屏障；重建 Pod 也可能再执行。因此 D 的括号会把与 A 类似的重复执行风险包装成“只需一次”的保证。

最小修正建议：D 删除“（Kubernetes 里是 Init Container）”，改为“由部署流程协调，使用单独容器先完成一次迁移，再启动应用副本”；参考答案保留原文已讲的“单独执行、避免并发重复”的核心，并注明 Init Container 仅按 Pod 排序，不保证全局只运行一次，附 Kubernetes 官方核对链接。无需新增 Job 等原文未讲的考点。

### U9-26｜P2｜默认不信任任意代理来源，被写成默认完全不解析

当前完整题干：按官方文档，服务器程序（如 Uvicorn）为什么默认不解析代理转发的请求头？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | 出于安全考虑，服务器并不知道自己处在受信任的代理之后 | 正确 |
| B | 因为这些请求头只会出现在 HTTP 连接里，HTTPS 连接没有 | 错误 |
| C | 因为解析这些请求头会让应用变慢且不稳定 | 错误 |
| D | 因为 FastAPI 会自己解析，服务器不需要处理 | 错误 |

参考答案也断言默认不解析、“需要显式启用”。这与[所引 FastAPI 原文](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-forwarded-headers)一致，但原文措辞不符合 Uvicorn 的实际默认行为。

官方核对：[Uvicorn HTTP 设置](https://uvicorn.dev/settings/#http)说明 `--proxy-headers` 默认开启，解析受到 `forwarded-allow-ips` 信任范围限制，未设置环境配置时只信任本地回环来源。短摘录：`Defaults to enabled`。

为何导致误判：已知默认会处理可信本地代理请求头的考生，会发现题干前提为假。安全原因解释应对应“为什么不能信任任何来源”，而不是对应“默认完全禁用”。

最小修正建议：题干改成“Uvicorn 为什么不能默认信任任意来源的代理转发头？”；A 保持安全原因，答案说明默认启用处理但限制可信连接来源，`--forwarded-allow-ips` 用于配置该范围，并按原文勘误规则注明原文说法及核对来源。不要求记忆回环地址的具体列表。

### U9-28｜P2｜丢掉路由声明前提，把特定尾斜杠重定向写成普遍默认行为

当前完整题干：FastAPI 默认会把 `/items` 重定向到 `/items/`。应用在 HTTPS 代理后面时，如果没有启用代理转发的请求头，这个重定向会出什么问题？启用后为什么就对了？

题型为简答，无选项。当前答案要求说明未信任转发头时可能生成 `http://localhost:8000/items/`，配置后生成正确的公网 HTTPS URL。

官方依据：[所引“使用 HTTPS 的重定向”](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#redirects-with-https)先设定“假设你定义了一个路径操作 /items/”，再说客户端访问 `/items` 时的默认重定向。短摘录：“假设你定义了一个 路径操作 /items/”。

为何导致误判：若实际只声明 `/items`，该路径可直接返回200，反而是 `/items/` 重定向到 `/items`；两者均注册时也不应套用题干结论。线上单题没有保留原文的声明前提。

最小修正建议：首句改为“应用仅声明 `@app.get('/items/')` 路由，使用默认尾斜杠重定向配置。访问 `/items` 会重定向到 `/items/`。”其余仍问 HTTPS 代理和正确 URL。说明信任来源时与 U9-19/26 的修正一致。

补充复现：本机 TestClient，单独注册 `/items/` 时请求 `/items` 返回307；单独注册 `/items` 时同一请求返回200。这只用于确认漏条件，不涉及题库修改。

### U9-31｜P2｜只写“代理加前缀”，漏掉 root_path 已配置这一必要条件

当前完整题干：代理为应用加上 /api/v1 前缀后，按官方文档，FastAPI 靠什么让文档界面能向正确的地址发请求？

| 选项 | 内容 | 当前标记 |
| --- | --- | --- |
| A | 自动把所有路径操作改写成带 /api/v1 前缀的路径 | 错误 |
| B | 用路径前缀在 OpenAPI 模式里创建默认 server（url 为 /api/v1） | 正确 |
| C | 让 Uvicorn 额外监听 /api/v1 这个路径前缀 | 错误 |
| D | 让代理在响应里重写 /openapi.json 里的各个路径 | 错误 |

当前参考答案实际依赖 `root_path`，但题干未给这个配置，只说代理添加前缀。

官方依据：[“移除路径前缀的代理”](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-with-a-stripped-path-prefix)先说明未告知前缀时文档取不到 OpenAPI；[“查看文档界面”](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#check-the-docs-ui)是在已经以 `--root-path /api/v1` 启动的示例下解释默认 server。短摘录：“使用该 root_path 在 OpenAPI 中创建默认的 server”。

为何导致误判：只有代理加前缀、没有告知应用时，不会自动得知 `/api/v1` 并生成 B 所述 server；这正是前一小节要解决的问题。按章节顺序可猜到隐含配置，但单独出现时条件不足。

最小修正建议：题干改成“在移除 `/api/v1` 前缀的代理后，已将应用 `root_path` 配为 `/api/v1`，且保持默认自动 server 配置。FastAPI 如何让文档界面向正确地址发请求？”B 同步改为“根据 `root_path` 在 OpenAPI 中创建默认 server”。这是补回本页原有条件，不是引入新考点。

## 边界记录，不计入确认问题

1. **U7-6（跨源前提）**：题干泛称浏览器客户端读取自定义响应头，A 标为 `expose_headers`；[所引中间件提示](https://fastapi.tiangolo.com/zh/tutorial/middleware/#create-a-middleware)也这样简写，但 `expose_headers` 是 CORS 跨源读取场景的配置。同源脚本读取响应头并不需要它。建议补“跨源”，但现有选项中 A 仍是明确对应原文的做法，因此未单列为标记错误。

2. **U8-12（客户端指定 id）**：当前简答答案“可能覆盖数据库里已分配的 id”与[所引 SQLModel 示例原文](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#update-the-app-with-multiple-models)一致。本次未安装 SQLModel、未对不同数据库及约束行为做实测，不将它升级为确定的出题错误；主要受检点是“客户端不应决定该示例的 id”以及 secret_name 的输入/输出隔离，均已覆盖。不要仅凭此处“覆盖”措辞认定 `session.add` 一定执行更新。

3. **U9-7（管理器转发模型）**：答案“只能一个进程监听，再由管理器把通信转发给 worker”忠实于[部署概念的简化图示](https://fastapi.tiangolo.com/zh/deployment/concepts/#multiple-processes-an-example)。[Uvicorn 官方部署文档](https://uvicorn.dev/deployment/#using-a-process-manager)的措辞是管理器负责 socket setup、启动和监控多个服务进程；不足以仅凭 FastAPI 概念图推导所有多进程服务器都逐请求由管理器做应用层转发。建议加“按文档示意模型”，本轮未核对操作系统 socket 共享机制与 Uvicorn 运行源码，不作为已证实错误。

## 限制

这是内容审查，未运行网页端交互、DeepSeek 判分或全项目测试；未修改任何题目，也没有把任何章节改为 approved。简答题是否实际把合理回答判错取决于评分器，本报告指出的是题干和标准答案造成的误判风险。官方文档会更新，结论对应本轮2026-10-15快照及在线核对；对原文自身有问题的条目，应遵守 README 的勘误注明和“核对来源”规则后再修题。
