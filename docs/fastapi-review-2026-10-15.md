# FastAPI 题库审查（2026-10-15）

## 结论

已逐题检查全部 **9 章、274 题**的实际题干、所有选项、正确标记及参考答案，并对照其引用的 **53 个 FastAPI 官方中文页面**。确认存在条件遗漏、过强结论及原文自身技术简化等问题，**建议修订的主体清单涉及 23 个题号**；另外 8 题只列为默认条件或措辞边界建议，不计入主体清单。

其中 U3-29、U4-31、U6-20、U7-12、U9-24 应优先处理：现有选项或参考结论可能排斥合理正确答案，或者把不成立的普遍结论当作知识点。并非所有问题都是答案字母标错；有些只需补题设，有些只需修正参考答案。未发现填空题有序/无序配置的确定错误。

本轮仅新增审查报告、官方页面快照、机械检查结果与复现材料，**未修改题库、业务代码或章节状态**，未执行 Git 提交、推送或发布。9 章继续保持 `draft`。审查不等于项目所有者人工批准，也不代表 DeepSeek 判分实测通过。

## 优先处理的题目

| 题号 | 当前问题与影响 | 最小修正方向 |
| --- | --- | --- |
| U3-29 | 泛问“给路径参数默认值 None”，却把“报错”标错。普通 `item_id: int = None` 的默认值会被忽略；显式 `Path(default=None)` 或 `Annotated[int, Path()] = None` 则在注册时断言失败。缺少写法，无法在“不起作用”和“报错”之间唯一作答。 | 只问“能否用默认值让路径段变成可选”，或明确给出普通签名和路由代码。 |
| U4-31 | 多选把“不会自动生成文档”标对，但直接返回 `Response` 并不会取消装饰器声明的 OpenAPI 信息。显式声明 `response_model` 时，响应可绕过过滤，文档仍保留模型。 | C 改为“不根据实际返回的 Response 对象自动推导响应文档”；解析说明显式声明的信息仍可保留。 |
| U6-20（关联 U6-19） | 正确项要求“同一密码每次生成相同哈希”。教程实际推荐的 Argon2 密码哈希使用随机盐，存储字符串通常不同。其他选项又都带有可逆解密等错误，不能作为替代正确项。 | 删除“每次结果相同”，保留密码哈希用于校验、不能按加密方式解密的核心；注明原文简化并附官方核对链接。 |
| U7-12 | 多选要求 `allow_credentials=True` 时 `allow_methods`、`allow_headers` 不能配置 `['*']`。同页示例恰好如此配置，官方中间件实现也支持展开方法、回显请求头；本机预检返回 200。 | 改问配置源、方法、请求头的三个参数，或按官方实现纠正限制说明；不能继续把同页自相矛盾的一句文字当唯一答案。 |
| U9-24 | 将 Kubernetes Init Container 等同于“所有副本启动前全局只执行一次迁移”。Init Container 以 Pod 为范围，可能在多个副本和重建时重复执行。 | 保留“单独协调执行迁移后再启动副本”的原则，删除全局一次与 Init Container 的直接等同。 |

U4-31 的文档边界可直接由[官方“在 OpenAPI 中文档化并重载 Response”](https://fastapi.tiangolo.com/zh/advanced/custom-response/#document-in-openapi-and-override-response)核对；分章报告与主审最终均将它纳入需修订的措辞问题。

密码哈希核对依据为 [pwdlib 指南](https://frankie567.github.io/pwdlib/guide/#hash-a-password)与 [argon2-cffi API](https://argon2-cffi.readthedocs.io/en/stable/api.html#argon2.PasswordHasher.hash)。CORS 依据为[教程同页示例与说明](https://fastapi.tiangolo.com/zh/tutorial/cors/#use-corsmiddleware)、[官方中间件实现](https://fastapi.tiangolo.com/reference/middleware/#fastapi.middleware.cors.CORSMiddleware)。Init Container 的执行范围依据为 [Kubernetes 官方说明](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#detailed-behavior)。这些外部资料仅用于核对原文有误或冲突的地方，不据此增加新考点。

## 其他需要修订的条件与解析

下表加上优先清单，共涉及 23 个不同题号；U6-19 已与 U6-20 合并说明。

| 题号 | 问题 | 修正建议与依据 |
| --- | --- | --- |
| U3-12 | “同一路径重复定义时使用第一个”没有限定同一 HTTP 方法；GET 和 POST 可共享路径而各自生效。 | 补同路径、同方法；首问也限定两条 GET 路由。[原文示例](https://fastapi.tiangolo.com/zh/tutorial/path-params/#order-matters)实际重复的是 GET。 |
| U4-26 | 仅凭 PUT 与模型默认值就推出保存后的 tax 被覆盖；缺少全量替换的保存实现。 | 补教程的整模型编码与替换代码。同页明确 FastAPI 不限制 PUT 做部分更新。[更新教程](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#warning-about-replacing)。 |
| U4-1、U4-33 | 将“有响应模型/没有响应模型”写成两种唯一序列化路径，漏掉显式 `response_class=JSONResponse` 的分支。 | 补“默认 JSON 响应、未指定 response_class、返回普通数据”的前提；该分支就写在同组引用页面。[JSON 响应](https://fastapi.tiangolo.com/zh/advanced/custom-response/#json-responses)。分章报告将其列为边界；主审考虑两题解析明确作了排他断言，将它们纳入建议修订清单，不宣称原答案在默认路径下错误。 |
| U5-4 | 解析“Depends 只能传入一个参数”过强，同组 U5-17 正确示范了 `use_cache=False`。 | 改成“传入一个依赖项可调用对象本身”，删除总参数数量限制。[Depends 官方签名](https://fastapi.tiangolo.com/reference/dependencies/#fastapi.Depends)。 |
| U2-15、U2-16 | 把“调用 async 函数创建协程”与“await 等待执行结果”混同，断言只能在 async 函数内调用。 | U2-15 限定在异步函数内等待结果；U2-16 改问谁负责执行最外层异步路径操作。原文确有这一简化，需说明调用与执行的区别。[Python 官方协程说明](https://docs.python.org/3/library/asyncio-task.html#coroutines)。 |
| U3-16 | 给定选项的 B/D/E 正确，但解析“其余均为 False”会把非法布尔字符串也算作 False；实际 `short=foo` 为 422。 | 只解释题中合法值，删掉“否则 False”；如保留通用规则则注明原文过宽。[Pydantic 布尔校验](https://docs.pydantic.dev/latest/api/standard_library_types/#booleans)。 |
| U3-25 | 从注解允许 None 直接推出“客户端可发送 None”。普通 URL 的 `?q=None`、`?q=null` 实际都是字符串；空值和省略又分别触发长度校验、缺失校验。 | 只问“必填与类型可空”的声明语义，不承诺客户端 URL 的 None 编码方式；不直接把现有 B 改成正确项。[所引原文](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#required-can-be-none)本身也需区分这两层。 |
| U6-1、U6-2 | 解析把 OAuth 1 的请求认证/签名描述成通信加密，忠于教程但技术上混淆了完整性与机密性。现有答案字母无需更改。 | 删除错误对比，保留 OAuth2 与 HTTPS 的原考点；按原文勘误规则注明并加 [RFC 5849 §4.2](https://www.rfc-editor.org/rfc/rfc5849.html#section-4.2)。 |
| U6-25 | 把教程的签名、未加密 JWT 泛化成全部 JWT 都不加密且有签名。 | 限定“本教程使用 HS256 签名的令牌”；不新增 JWE 考题。[RFC 7519 §3](https://www.rfc-editor.org/rfc/rfc7519.html#section-3)涵盖签名和加密表示。 |
| U7-10 | 泛问 CORS 通信，参考答案却要求所有跨源请求都先 OPTIONS，漏掉简单请求。 | 加“对于需要预检的请求”，或按同页两种请求分别说明。[官方两类请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#cors-preflight-requests)。 |
| U9-19、U9-26 | 将启用 `proxy_headers` 等同于信任任何代理来源，并说 Uvicorn 默认完全不解析。实际处理开关与可信来源范围不同。 | U9-19 补已配可信来源，B 只说开启处理；U9-26 改问为何不能信任任意来源。[FastAPI 代理设置](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers)、[Uvicorn HTTP 设置](https://uvicorn.dev/settings/#http)。 |
| U9-28 | “默认把 /items 重定向到 /items/”丢掉“仅声明 /items/ 路由”的前提，实际方向取决于路由。 | 补完整路由与默认重定向设置。[原文先给该前提](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#redirects-with-https)。 |
| U9-31 | 仅写代理增加路径前缀，就要求应用用该前缀创建 OpenAPI server；漏掉已将 `root_path` 告知应用。 | 补已配置 `root_path=/api/v1` 并保持默认 server 行为。[原文示例](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#check-the-docs-ui)。 |

题目本身取材正确、但原文存在错误或冲突时，后续修复应遵守 `interview-practice/README.md`：答案括注原文说法，并加以“核对来源：”开头的官方链接。不能静默引入新知识，也不能因为原文写过就保留错误断言。

## 仅作边界建议的 8 题

- **U5-23、U7-4**：建议补“按当前文档默认生命周期、未设置提前退出”的限定。现有答案符合默认行为；README 已明确不考 `Depends.scope`，本次不要求新增该考点，也不将两题计入上述 23 题。实测与[官方作用域说明](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#early-exit-and-scope)用于验证限定的必要性，不用于扩题。分章报告把它们列为缺条件项，主报告综合项目范围后单独列示。
- **U3-4**：将“URL 第一个 /”明确成域名之后的路径起始斜杠，避免和 `https://` 混淆。
- **U3-13**：给出具体字符串预设集合，减少枚举、布尔有限值与整数范围的宽泛歧义；不据此声称现有多个答案都应标对。
- **U6-13**：补“教程默认 OAuth2PasswordBearer 示例”，不扩展可选认证配置。
- **U7-6**：补“跨源浏览器读取自定义响应头”，不要把 CORS expose_headers 泛化到同源读取。
- **U8-12**：“客户端指定 id 可能覆盖数据”的措辞忠于原文，但本次未实测 SQLModel 与具体数据库约束，不升级为确认错误。
- **U9-7**：补“按原文多进程示意模型”，避免将示意图理解为所有服务器的 socket 分配实现；本轮未实测操作系统与 Uvicorn 多进程实现。

## 验证结果与材料

| 检查 | 结果 |
| --- | --- |
| 逐章覆盖 | U1 17、U2 21、U3 43、U4 36、U5 31、U6 33、U7 35、U8 27、U9 31，共 274 题 |
| 题型 | 单选 156、多选 34、填空 29、简答 55，无代码题 |
| 题号、题序及重复 | 题卷、答案、JSON 一致，重复 ID 为 0 |
| 填空同步 | 29 题的题干、标记、空数、顺序配置全部同步；逐题语义审查未确认空序错误 |
| 来源可访问性 | 298 条不同来源 URL，涉及 53 个页面，HTTP 获取及页面内锚点检查全部通过；不等于全部有价值小节均已出题 |
| 单选正确位置 | A 40、B 37、C 40、D 39，无位置偏置 |
| 内容校验 | 设置 `CONTENT_INCLUDE_DRAFTS=1` 后执行 `npm run content:validate`，退出码 0；全库 20 专题、199 章、5878 题；仅原有 V14 R3-139 警告，与 FastAPI 无关 |
| 单元测试 | `npm run test:unit`，退出码 0；9 文件、103 用例通过 |
| 本地复现 | `python -X utf8 docs/fastapi-review-2026-10-15/reproduce.py`，退出码 0；FastAPI 0.135.3、Pydantic 2.12.5、HTTPX 0.28.1 |
| 章节与输入状态 | 9 章仍 draft；审查前后 3 份题库源文件的 SHA-256 不变 |

机械检查与输入 SHA-256 见 [checks.json](fastapi-review-2026-10-15/checks.json)；逐题合并输入见 [questions.json](fastapi-review-2026-10-15/questions.json)；官方页面及正文快照索引见 [manifest.json](fastapi-review-2026-10-15/sources/manifest.json)。复现脚本和原始结果见 [reproduce.py](fastapi-review-2026-10-15/reproduce.py)、[reproduction-results.json](fastapi-review-2026-10-15/reproduction-results.json)。所有请求在本地 TestClient 进程内执行，没有启动外部服务或改动应用数据。

详细证据、选项和逐题结论见 [U1–U3](fastapi-review-2026-10-15/findings-U1-U3.md)、[U4–U6](fastapi-review-2026-10-15/findings-U4-U6.md)、[U7–U9](fastapi-review-2026-10-15/findings-U7-U9.md)。主报告明确说明了与分章建议分级的取舍，主体清单是后续修订范围。

本次没有调用 DeepSeek，没有运行浏览器端到端测试、生产部署或 Kubernetes 集群；密码哈希结论依据官方库资料，未在缺少相应 Python 包的环境中冒称运行 Argon2。现有结构校验与单元测试不能发现这些题意和原文技术问题。报告对应本次官方页面快照和列出的实验版本，不承诺覆盖所有历史版本、配置与运行环境，也不代表没有列出的问题已被人工批准。
