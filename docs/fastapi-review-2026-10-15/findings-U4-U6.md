# FastAPI U4–U6 逐题审查

审查日期：2026-10-15。只读审查；本报告是本次唯一写入文件，未修改题库、题型数据、业务代码或章节状态，未执行 Git 发布操作。

## 覆盖与方法

逐题阅读 `U4-questions.json`、`U5-questions.json`、`U6-questions.json` 中合并后的真实网页题干、全部选项、正确标记和参考答案，共 **100 题**。不是仅依据 Markdown 简答问法推断选择题质量。

| 题组 | 题号范围 | 单选 | 多选 | 填空 | 简答 | 合计 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| U4 | U4-1–U4-36 | 21 | 7 | 2 | 6 | 36 |
| U5 | U5-1–U5-31 | 16 | 6 | 2 | 7 | 31 |
| U6 | U6-1–U6-33 | 17 | 7 | 2 | 7 | 33 |
| 合计 | 全部连续题号 | 54 | 20 | 6 | 20 | 100 |

对照 `sources/manifest.json` 所列的联网抓取快照，检查相关 20 个 FastAPI 官方中文页面；对重点争议页面再次直接联网查看。原文自身存在技术问题时，按 `interview-practice/README.md` 的明确例外，用相应库的官方文档或 RFC 核对。以下修正建议仅收窄既有考点、修正既有答案，不建议把 scope、盐、JWE 等扩展成新考题。

优先级：P1 为现有正确项包含实质错误、可导致无正确选项；P2 为漏条件、解释错误或适用范围过强。确认问题共 **7 组，涉及 9 个题号**。另有 2 项边界记录，涉及 3 个题号，不计入确认问题。

## 确认问题

### F01 · P2 · U4-31：直接返回 Response 不等于该操作不会生成响应文档

**当前题干：**“直接返回 Response 对象时，下列哪些说法符合官方文档？”

完整选项及标记：

- A【对】FastAPI 会直接传递它。
- B【对】不会用 Pydantic 模型做数据转换，即使声明了 response_model。
- C【对】不会自动生成文档。
- D【错】仍会按 response_model 过滤其中的字段。
- E【错】会自动对 content 调用 jsonable_encoder，转成 JSON 兼容类型。

参考答案同样无条件说“也不会自动生成文档”。

**官方依据：**[直接返回响应 · 说明](https://fastapi.tiangolo.com/zh/advanced/response-directly/#notes) 确有现有概括，但随后明确可以声明响应文档；[自定义响应 · 在 OpenAPI 中文档化并重载 Response](https://fastapi.tiangolo.com/zh/advanced/custom-response/#document-in-openapi-and-override-response) 说明 response_class 仍提供媒体类型文档，短摘录：“只会被用来文档化 OpenAPI”。

**误判原因：**本题 B 已主动涉及“即使声明 response_model”的场景，但直接返回 Response 时声明的 schema 仍可能存在于 OpenAPI，只是不会用该模型转换实际返回内容。C 容易被读成“该操作不生成响应文档”，与同题 B 的配置语境和官方保留文档的示例冲突。需要区分“不从返回对象自动推导文档”和“没有任何自动生成的文档”。

**主审运行验证：**主 agent 已复现声明 `response_model=dict[str, int]` 后直接返回 `JSONResponse`：实际响应不会按该模型过滤，OpenAPI 仍保留模型 schema。记录在主审 `results.json` 的 `direct_response_with_declared_model`，本分报告未独立重复执行该实验。

**最小修正：**C 改成“不会根据返回的 Response 对象自动推导对应的媒体类型等响应文档”；答案说明装饰器中声明的文档信息仍可保留。维持 A、B、C 正确。该项定位为 P2 的可评分措辞问题，不声称官方原文那句概括完全错误。

### F02 · P2 · U4-26：由 PUT 方法直接推出持久化结果，遗漏全量替换实现

**当前题干：**“用 PUT 更新已存储的数据，请求体里省略了已存储的 tax（模型里 tax 默认 10.5），会怎样？”

完整选项及标记：

- A【错】tax 保持原来存储的值不变，因为请求体没有提供它。
- B【错】FastAPI 返回客户端错误，要求 PUT 必须提供全部字段。
- C【对】输入模型取默认值 10.5，保存的数据会带上它。
- D【错】tax 字段被从存储的数据里删除，不再保存。

参考答案解释为 PUT 接收替换现有数据的数据，因此 10.5 覆盖原来存储的值。

**官方依据：**[请求体更新 · 关于替换的警告](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#warning-about-replacing) 的结论依赖前面教程的 `jsonable_encoder(item)` 后直接执行 `items[item_id] = update_item_encoded`，并以原值 20.2 为例。同页[用 PATCH 进行部分更新](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#partial-updates-with-patch) 也明确允许 PUT 实现部分更新，短摘录：“FastAPI 不做任何限制”。

**误判原因：**模型实例会取默认值，不等于保存逻辑一定采用这个值。开发者完全可以在 PUT 中使用 `exclude_unset=True` 合并更新并保留原 tax；现有 A 因而不应仅根据请求方法就被排除。题目未给出决定答案的更新与保存代码。

**最小修正：**补成“按教程的全量替换实现：用 jsonable_encoder(item) 转换整个输入模型，再直接替换已存储记录；原 tax 为 20.2，模型默认 10.5……”。保持 C 为正确项，答案写明由全量替换逻辑导致覆盖。

### F03 · P2 · U5-4：参考答案错误扩大为 Depends 只能接收一个参数

**当前题干：**“按官方文档，在参数中给 Depends 传入依赖项时，正确的做法是？”

完整选项及标记：

- A【对】传入函数（可调用对象）本身，不要在末尾加括号。
- B【错】先调用依赖项函数，再把它的返回值传给 Depends。
- C【错】把依赖项和它的全部参数打包成列表传给 Depends。
- D【错】同时传入多个可调用对象，让 FastAPI 依次调用它们。

参考答案开头：“给 Depends 只能传入一个参数，这个参数必须是类似函数的可调用对象”。

**官方依据：**[依赖项 · 在 dependant 中声明依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#declare-the-dependency-in-the-dependant) 的上下文是传入哪个依赖项对象；但[子依赖项 · 多次使用同一个依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times) 同时明确介绍 `Depends(get_value, use_cache=False)`，短摘录为“use_cache 的值设置为 False”。本题组 U5-17 也正以此作为正确答案。原文措辞需要按其演示上下文理解，不能概括成总参数数量限制。

**误判原因：**A 本身正确，当前选项标记无需更改；错误在解释，会让学生把同组正确语法误认为非法，并混淆“一个依赖项对象”和“只有一个参数”。

**最小修正：**答案改为“把一个依赖项可调用对象本身传给 Depends，不在其末尾加调用括号；不要同时把多个依赖项对象传入一次 Depends”。删除关于总参数数量的绝对断言。无需加入 scope 新知识。

### F04 · P2 · U5-23：yield 退出时机没有限定默认行为

**当前题干：**“带 yield 的依赖项里，yield 之前和之后的代码分别在什么时候执行？”

完整选项及标记：

- A【错】yield 前后两部分代码都在路径操作函数运行之前执行。
- B【错】yield 之前的代码在响应发送之后执行，yield 之后的代码在响应发送之前执行。
- C【对】yield 及其之前的代码在创建响应之前执行，yield 之后的代码在响应发送之后执行。
- D【错】yield 之后的代码只有在路径操作函数抛出异常时才会执行。

参考答案未加默认条件，直接说 yield 之后的代码在响应之后执行。

**官方依据：**[使用 yield 的依赖项 · 提前退出与 scope](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#early-exit-and-scope) 区分可提前退出的行为，并说明短摘录：“默认 scope 为 request”。[高级依赖项 · 带 yield 的依赖项与 scope](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#dependencies-with-yield-and-scope) 说明 0.121.0 的支持；同页也解释 0.118.0 前后的退出时机变化。

**误判原因：**在当前文档版本里，C 是默认请求作用域下的结论，并非所有 yield 依赖项都必然如此。当前题干泛指所有带 yield 的依赖，了解官方提前退出行为的学生无法认可这个无条件断言。

**最小修正：**题干与答案加“按当前文档的默认行为，未设置提前退出”。无需把 scope 参数或历史版本变成考点；仅补默认前提就能遵守 README 排除 scope 出题的边界。

### F05 · P1（U6-20）/P2（U6-19）· 同一密码每次生成相同存储哈希，是原文技术性简化错误

**U6-19 当前简答题：**“为什么永远不要保存明文密码，而要保存密码哈希？”参考答案包含“相同的内容总得到相同的结果，但无法从结果转换回原密码”。

**U6-20 当前题干：**“按官方文档，密码哈希有什么特点？”

完整选项及标记：

- A【对】每次传入相同的内容都得到相同的结果，且无法转换回原密码。
- B【错】相同的密码每次得到的结果都不同，并且可以解密还原成原密码。
- C【错】需要用 SECRET_KEY 加密，持有密钥的人可以还原出原密码。
- D【错】只是对密码做了编码，任何人都可以反向转换回原密码。

**原文及核对依据：**[简单 OAuth2 · 密码哈希](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#password-hashing) 和 [JWT 教程 · 密码哈希](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#password-hashing) 确实都这样简化描述；因此这里不是题库错引。可是同一 JWT 教程已经采用 `PasswordHash.recommended()` 的 Argon2 实现。[pwdlib 官方指南](https://frankie567.github.io/pwdlib/guide/#hash-a-password) 说明保存的字符串包含算法参数及盐；[Argon2 官方 Python 实现 API](https://argon2-cffi.readthedocs.io/en/stable/api.html#argon2.PasswordHasher.hash) 对默认盐的短摘录：“If None, a random salt is securely created.”

**误判原因：**密码哈希函数在所有输入（含盐和参数）固定时具有确定性，不等于仅密码相同就每次生成相同的存储字符串。教程采用的安全密码哈希会使用随机盐，因此 A 的前半句不能作为一般密码哈希性质。B 后半句又错误，C、D 也错误，U6-20 在真实安全密码哈希语境下没有完整正确项。U6-19 的主要理由正确，但夹带了同一错误要求。

**最小修正：**U6-20 的 A 删除前半句，改成“用于校验密码，不能像加密数据一样解密还原出原密码”，保持 A 正确；U6-19 删除“相同内容总得到相同结果”。两题答案用括号注明原文的简化说法，并按 README 加“核对来源：”官方链接。不要新增盐或算法参数的考试要求。

**验证限制：**本机 Python 未安装 argon2，未运行哈希实验；结论来自 pwdlib 与 argon2-cffi 官方资料，而非伪称实测结果。

### F06 · P2 · U6-25：将教程的签名 JWT 示例泛化为所有 JWT

**当前题干：**“关于 JWT 的‘加密’与‘签名’，下列说法正确的是？”

完整选项及标记：

- A【对】它不是加密的，任何人都能从内容中恢复信息，但它是签名的，可以验证令牌确实由自己签发。
- B【错】它是加密的，只有持有密钥的人才能读出内容，签名只是用来压缩字符串。
- C【错】它既不加密也不签名，只是把 JSON 对象编码成一长串字符串而已。
- D【错】它是加密的，所以收到令牌后无需再验证它是不是自己签发的。

参考答案直接断言“JWT 不是加密的……但它是签名的”。

**原文及核对依据：**[FastAPI JWT 教程 · 关于 JWT](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#about-jwt) 的确用此说法引入后面的 HS256 示例。作为整个 JWT 标准的无条件定义则过强：[RFC 7519 §3](https://www.rfc-editor.org/rfc/rfc7519.html#section-3) 覆盖 JWS 与 JWE 形式，短摘录为“JWS Compact Serialization or the JWE Compact Serialization”。RFC 同页还提供加密 JWT 的规范示例。

**误判原因：**A 对教程展示的签名且未加密的令牌成立，对题干没有限定的所有 JWT 不成立；B、D 自身另有错误，不能补救为通用正确项。问题来自丢掉示例范围，并非要求引入高级 JWT 内容。

**最小修正：**题干改成“关于本教程使用 HS256 签名的 JWT 令牌，下列说法正确的是？”答案改成“本教程的 JWT 没有加密……”。保持 A 标记，必要时按 README 注明原文简化了范围，并附 RFC 为核对来源。不要考 JWE 的机制。

### F07 · P2 · U6-1、U6-2：参考答案把 OAuth 1 请求认证误说成通信加密

**U6-1 当前题干：**“按官方文档，OAuth2 是什么？”

完整选项及标记：

- A【错】一个把 JSON 对象编码成没有空格的密集长字符串的标准。
- B【对】一个定义了几种处理身份认证和授权的方法的规范，包括使用第三方登录。
- C【错】一个直接规定了如何对通信进行加密的规范，如今已经不太流行。
- D【错】一个用于构建 API 的开放规范，使交互式文档和代码生成成为可能。

参考答案包含“C 是 OAuth 1 的特点”。

**U6-2 当前题干：**“按官方文档，OAuth2 对通信加密是怎么处理的？”

完整选项及标记：

- A【错】规范本身包含了如何加密通信的详细规定。
- B【错】要求先用 JWT 把请求内容加密后再进行传输。
- C【错】要求所有请求都按 OAuth 1 的方式进行签名。
- D【对】规范没有指定如何加密通信，期望应用使用 HTTPS。

参考答案开头：“OAuth 1 直接包含了如何加密通信的规范，因此更复杂”。

**原文及核对依据：**[FastAPI 安全性 · OAuth 1](https://fastapi.tiangolo.com/zh/tutorial/security/#oauth-1) 原文确有该表述。但 OAuth 1 的规范 [RFC 5849 §4.2](https://www.rfc-editor.org/rfc/rfc5849.html#section-4.2) 明确区分完整性与机密性，短摘录：“it provides no guarantee of request confidentiality”。请求签名机制不等于对通信内容进行加密；规范要求另用传输层安全保护敏感资源。

**误判原因：**两题正确选项的现有标记没有因此改变，但解释把两种安全属性混为一谈，会让学生把 OAuth 1 误学为提供通信加密的协议。按 README 的原文有误例外，不应继续无说明复述。

**最小修正：**U6-1 删除“C 是 OAuth 1 的特点”，只解释 C 不符合 OAuth2；U6-2 删除开头关于 OAuth 1 通信加密的对比，保留 D 的解释。答案括号注明原文混淆了签名与通信加密，并加“核对来源：RFC 5849 §4.2”。不新增 OAuth 1 签名算法考点。

## 边界记录（不计硬错误）

### B01 · U4-1、U4-33：默认序列化路径可以补足条件

U4-1 当前正确标记 A、C、D，错误标记 B、E。完整有关选项是 D“使用 Pydantic 把返回数据序列化为 JSON”【对】、E“先用 jsonable_encoder 转换返回数据，再交给 JSONResponse 序列化”【错】；参考答案把 E 解释为“是没有声明响应模型时的做法”。U4-33 问声明响应模型与不声明的序列化流程及性能，答案说声明后不使用 jsonable_encoder 或 JSONResponse。

[自定义响应 · JSON 响应](https://fastapi.tiangolo.com/zh/advanced/custom-response/#json-responses) 明确有显式 `response_class=JSONResponse` 的例外：模型用于转换、过滤，随后仍由 jsonable_encoder 与 JSONResponse 序列化。[JSON 性能](https://fastapi.tiangolo.com/zh/advanced/custom-response/#json-performance) 将不显式声明 response_class 列为最佳性能条件。

两题可以自然理解成默认响应处理路径，与所引[响应模型如何工作](https://fastapi.tiangolo.com/zh/advanced/response-directly/#how-a-response-model-works) 的讲述一致，不能因为一切可配置的例外均未列出就认定硬错。因此只作边界记录。建议题干加“使用默认 JSON 响应处理，未显式指定 response_class，且返回普通数据”；U4-1 答案删除 E 只可能发生于未声明模型时的绝对解释。

### B02 · U6-13：应明确指默认 OAuth2PasswordBearer 示例

当前简答题问 OAuth2PasswordBearer 作为依赖做什么、没带令牌时怎样，答案承诺返回 401 且执行函数时总有 str。这个结论与[安全第一步 · 它做了什么](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#what-it-does) 的 `OAuth2PasswordBearer(tokenUrl="token")` 默认示例一致，未发现本教程语境内的答案错误。题干可以加“使用教程中的默认配置”，避免被理解成任意定制后的实例；不建议扩展成教程没讲的可选认证参数题。

## 逐题覆盖结论与限制

- U4 全部 36 题已核：确认问题 U4-26、U4-31；边界 U4-1、U4-33；其余 U4-2–U4-25、U4-27–U4-30、U4-32、U4-34–U4-36 未发现达到本报告标准的出题错误。
- U5 全部 31 题已核：确认问题 U5-4、U5-23；其余 U5-1–U5-3、U5-5–U5-22、U5-24–U5-31 未发现达到本报告标准的出题错误。
- U6 全部 33 题已核：确认问题 U6-1、U6-2、U6-19、U6-20、U6-25；边界 U6-13；其余 U6-3–U6-12、U6-14–U6-18、U6-21–U6-24、U6-26–U6-33 未发现达到本报告标准的出题错误。
- 六道填空题 U4-13、U4-20、U5-17、U5-21、U6-5、U6-21 均逐一检查空数、顺序及答案范围，未发现空序或范围错误。
- 未发现本组题目存在独立的选择题正确键拼写错误。上述评分风险主要来自遗漏默认/示例条件，或把官方原文的技术简化转成了无条件正确项。
- 本轮验证是题目与当前官方文档的内容审查，不是 FastAPI 各历史版本的运行时回归测试；只报告当前文档支持的范围问题。没有运行项目 lint、构建或业务测试，因为没有修改业务实现和题库数据。
