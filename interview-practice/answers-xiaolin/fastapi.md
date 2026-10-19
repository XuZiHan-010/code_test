# FastAPI 面试题 原文章节摘编

仅依据各题所列的 FastAPI 官方中文文档小节整理；本文件只整理文档口径，不作现行规格认证。文档未覆盖的部分不出题，不使用其他网站补充。整理日期：2026-10-15。


## 1. Python 类型提示与 Pydantic

原文：[FastAPI 官方文档 · Python 类型提示简介](https://fastapi.tiangolo.com/zh/python-types/)。

### Python 类型提示简介 · 动机

- **U1-1** 正确说法是：类型提示用冒号声明，与用等号声明默认值是两回事，而且添加类型提示通常不会改变代码本来的行为；把它当成默认值、说成用等号声明类型，或说它会改变行为都是错的。[原文§Python 类型提示简介 · 添加类型](https://fastapi.tiangolo.com/zh/python-types/#add-types)
- **U1-2** 类型提示让编辑器知道变量的类型，所以输入参数名和点号后能得到有用的自动补全，把 `str` 与 `int` 直接相加这类错误也能被检查出来；即使在循环里处理 `list[str]` 的元素，编辑器也知道元素是 `str` 并继续提供支持。运行时自动转换参数不是类型提示本身的作用，没有类型时补全也确实没有什么用处。[原文§Python 类型提示简介 · 更多动机](https://fastapi.tiangolo.com/zh/python-types/#more-motivation)[原文§Python 类型提示简介 · 添加类型](https://fastapi.tiangolo.com/zh/python-types/#add-types)[原文§Python 类型提示简介 · 泛型类型 · 列表](https://fastapi.tiangolo.com/zh/python-types/#list)
- **U1-3** 没有类型提示时，输入参数名和点号后触发补全得不到有用的提示，要凭记忆想“首字母大写的方法”叫 `upper`、`capitalize` 还是别的；给参数声明 `str` 后，编辑器知道变量类型，补全能列出选项供查找。同时编辑器还能做错误检查，例如发现把 `str` 与 `int` 直接相加，提示你用 `str(age)` 转换。[原文§Python 类型提示简介 · 修改它](https://fastapi.tiangolo.com/zh/python-types/#edit-it)[原文§Python 类型提示简介 · 添加类型](https://fastapi.tiangolo.com/zh/python-types/#add-types)[原文§Python 类型提示简介 · 更多动机](https://fastapi.tiangolo.com/zh/python-types/#more-motivation)

### Python 类型提示简介 · 声明类型

- **U1-4** 声明“任意类型”要从标准库的 `typing` 模块导入 `Any`；`Annotated` 用于放入额外元数据，`BaseModel` 来自 Pydantic，`datetime` 是示例里的日期时间类型，都不是表示任意类型的。[原文§Python 类型提示简介 · typing 模块](https://fastapi.tiangolo.com/zh/python-types/#typing-module)
- **U1-5** 可以作为泛型使用的内建类型是 `list`、`tuple`、`set`、`dict`，写法是带方括号和内部类型。[原文§Python 类型提示简介 · 泛型类型](https://fastapi.tiangolo.com/zh/python-types/#generic-types)
- **U1-6** 能在方括号中接收“类型参数”、用来声明内部值类型的类型叫泛型类型，例如字符串列表写成 `list[str]`，`str` 是传给 `list` 的类型参数，表示变量是一个 list 且每个元素都是 `str`。这样处理列表元素时，编辑器也知道元素是 `str` 并提供支持，没有类型提示几乎做不到。[原文§Python 类型提示简介 · 泛型类型](https://fastapi.tiangolo.com/zh/python-types/#generic-types)[原文§Python 类型提示简介 · 泛型类型 · 列表](https://fastapi.tiangolo.com/zh/python-types/#list)
- **U1-7** 它表示变量是一个含有 3 个元素的 tuple，三个元素依次是 int、int 和 str；它不是元素个数不限的元组，也不是 set 或 dict 的声明。[原文§Python 类型提示简介 · 泛型类型 · 元组和集合](https://fastapi.tiangolo.com/zh/python-types/#tuple-and-set)
- **U1-8** 定义 dict 时传入 2 个类型参数并用逗号分隔：第一个用于字典的键（如条目名称，`str`），第二个用于字典的值（如价格，`float`）。把顺序说反，或说两个都是键、值不作限制，都是错的。[原文§Python 类型提示简介 · 泛型类型 · 字典](https://fastapi.tiangolo.com/zh/python-types/#dict)
- **U1-9** 用竖线把两种类型分开，表示 item 可以是 int 或 str 中的任意一种，因为它可以是这两类类型集合并集中的任意一个，所以称为“联合类型”（union）；它不是要求同时满足两种类型，也不是元组或泛型的写法。[原文§Python 类型提示简介 · 泛型类型 · Union](https://fastapi.tiangolo.com/zh/python-types/#union)
- **U1-10** 声明 `str | None` 表示值可能是 str 也可能是 None，这样编辑器能帮你发现把值当成总是 str 的错误；它不会让参数变成必填，也不会在运行时自动转换 None，更不是放弃检查。[原文§Python 类型提示简介 · 泛型类型 · 可能为 None](https://fastapi.tiangolo.com/zh/python-types/#possibly-none)
- **U1-11** 这表示 one_person 是类 Person 的一个实例，而不是名为 Person 的类本身；声明之后同样能获得所有编辑器支持。[原文§Python 类型提示简介 · 类作为类型](https://fastapi.tiangolo.com/zh/python-types/#classes-as-types)

### Python 类型提示简介 · Pydantic 模型

- **U1-12** Pydantic 是用于执行数据校验的 Python 库：把数据的“结构”声明为带属性的类，每个属性有一个类型；用一些值创建这个类的实例时，它会校验这些值，并在需要时把它们转换为合适的类型，返回一个包含所有数据的对象，对这个对象还能获得完整的编辑器支持。[原文§Python 类型提示简介 · Pydantic 模型](https://fastapi.tiangolo.com/zh/python-types/#pydantic-models)
- **U1-13** Pydantic 会校验值并在需要时转换类型，示例里字符串 `"123"` 被转换成整数 123，`print(user.id)` 输出 123；它既不会因为是字符串而报错，也不会保留字符串或丢弃成 None。[原文§Python 类型提示简介 · Pydantic 模型](https://fastapi.tiangolo.com/zh/python-types/#pydantic-models)
- **U1-14** 官方文档说 FastAPI 完全建立在 Pydantic 之上，Pydantic 是用于执行数据校验的库；说反了、说两者无关或说 Pydantic 不参与校验都是错的。[原文§Python 类型提示简介 · Pydantic 模型](https://fastapi.tiangolo.com/zh/python-types/#pydantic-models)

### Python 类型提示简介 · 带元数据注解的类型提示

- **U1-15** `Annotated` 是标准 Python，可用来在类型提示中放入额外元数据；传给它的第一个类型参数才是实际类型，其余只是给其他工具用的元数据；Python 本身不会处理这些元数据，编辑器看到的类型仍是第一个参数，并且编辑器体验和与其他工具的兼容性都不受影响。把最后一个参数当实际类型，或说它是 FastAPI 专有语法，都是错的。[原文§Python 类型提示简介 · 带元数据注解的类型提示](https://fastapi.tiangolo.com/zh/python-types/#type-hints-with-metadata-annotations)

### Python 类型提示简介 · FastAPI 中的类型提示

- **U1-16** FastAPI 用同一份类型声明来定义要求（来自路径参数、查询参数、请求头、请求体、依赖等）、转换数据、校验数据，以及使用 OpenAPI 记录 API；所以三个空是：转换数据、校验数据、使用 OpenAPI 记录 API。[原文§Python 类型提示简介 · FastAPI 中的类型提示](https://fastapi.tiangolo.com/zh/python-types/#type-hints-in-fastapi)
- **U1-17** 对于每个请求，FastAPI 都会校验数据，数据无效时自动生成返回给客户端的错误；它不会丢弃数据改用默认值，也不是只在编辑器提示或只在启动时校验一次。[原文§Python 类型提示简介 · FastAPI 中的类型提示](https://fastapi.tiangolo.com/zh/python-types/#type-hints-in-fastapi)

## 2. 并发与 async/await

原文：[FastAPI 官方文档 · 并发 async / await](https://fastapi.tiangolo.com/zh/async/)。

### 并发 async / await · 赶时间吗？

- **U2-1** 正确的是：所用第三方库告诉你要用 await 调用它；应用不需要与其他任何东西通信并等待其响应（此时即使函数内不需要 await 也用 async def）。第三方库不支持 await（如大多数数据库库）时应当用 def；不清楚该用哪个时也用 def。 [原文§并发 async / await · 赶时间吗？](https://fastapi.tiangolo.com/zh/async/#in-a-hurry)
- **U2-2** 应像平常那样用 def 声明，并直接调用该库。用 async def 声明是针对库支持 await 的情形，或应用不需要与其他任何东西通信等待响应的情形。 [原文§并发 async / await · 赶时间吗？](https://fastapi.tiangolo.com/zh/async/#in-a-hurry)
- **U2-3** 官方的建议是：如果不清楚，使用 def 就好。一律使用 async def 只适用于应用不需要与其他东西通信等待响应的情形；同一应用里也允许混用两种声明方式。 [原文§并发 async / await · 赶时间吗？](https://fastapi.tiangolo.com/zh/async/#in-a-hurry)
- **U2-4** 可以按需混用，用最适合每个函数的方式去定义，FastAPI 会为它们做正确的事情。无论哪种情况，FastAPI 仍然异步工作且速度很快；遵循上述指导则能进行一些性能优化。 [原文§并发 async / await · 赶时间吗？](https://fastapi.tiangolo.com/zh/async/#in-a-hurry)

### 并发 async / await · 异步代码

- **U2-5** 异步代码指编程语言有办法告诉程序，在代码的某处它得等某件事完成；等待期间计算机可以去做别的工作，之后再回来查看等待的任务是否已完成并继续处理。叫“异步”是因为程序不必与慢任务“同步”，不用一直空等到任务完成的那一刻；而“同步”也叫“顺序”，程序在切换到另一个任务前要按顺序执行完所有步骤，即使这些步骤涉及等待。 [原文§并发 async / await · 异步代码](https://fastapi.tiangolo.com/zh/async/#asynchronous-code)
- **U2-6** 文中列出的 I/O 等待包括：通过网络接收客户端发来的数据、等待磁盘中的文件内容被系统读取、等待数据库查询返回结果等。对图像像素做大量计算、大量矩阵乘法属于后文所说的 CPU 密集型工作，主要时间花在实际计算而不是等待上。 [原文§并发 async / await · 异步代码](https://fastapi.tiangolo.com/zh/async/#asynchronous-code) [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism)
- **U2-7** 执行时间大多是在等待 I/O 操作的，就叫 I/O 密集型。执行时间主要由实际工作（由 CPU 完成）占用的是 CPU 密集型，常见例子是复杂的数学处理。 [原文§并发 async / await · 异步代码](https://fastapi.tiangolo.com/zh/async/#asynchronous-code) [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism)

### 并发 async / await · 并发与并行

- **U2-8** 并发就是异步代码的思想：一个任务需要等待时先切换去做别的事，等结果好了再回来继续；并行则是多个处理器同时各做一部分工作。并发在需要大量等待的场景（如大多数 Web 应用）效果更好，而并发并不总是比并行好：几乎没有等待、主要是实际计算的工作（CPU 密集型），用多个处理器并行分担才能更快完成。 [原文§并发 async / await · 并发与汉堡](https://fastapi.tiangolo.com/zh/async/#concurrency-and-burgers) [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism)
- **U2-9** 因为服务器要等待很多用户通过不太好的网络发来的请求，之后还要再等响应传回去，每次等待以微秒计，但总的等待时间很长。Web API 的主要时间花在等待而不是复杂计算上，所以并发比较合适；并发并不是在所有场景都比并行好。 [原文§并发 async / await · 汉堡结论](https://fastapi.tiangolo.com/zh/async/#burger-conclusion) [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism)
- **U2-10** 这类任务没有需要等待的地方，是否轮流执行（并发）所需时间相同、完成的工作量也相同；只有多个处理器各占一部分、并行地做，才能借助额外的帮手更快完成。 [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism)
- **U2-11** 文中列出的 CPU 密集型例子有音频或图像处理、计算机视觉（对数百万像素计算）、机器学习（大量矩阵和向量乘法）以及深度学习。等待数据库查询或远程 API 调用返回属于 I/O 密集型。 [原文§并发 async / await · 并发比并行好吗？](https://fastapi.tiangolo.com/zh/async/#is-concurrency-better-than-parallelism) [原文§并发 async / await · 异步代码](https://fastapi.tiangolo.com/zh/async/#asynchronous-code)
- **U2-12** 可以利用并行和多进程（让多个进程并行运行）的优点；而 Web 开发中常见的并发机制（NodeJS 的主要吸引力）则用于处理等待。 [原文§并发 async / await · 并发 + 并行: Web + 机器学习](https://fastapi.tiangolo.com/zh/async/#concurrency-parallelism-web-machine-learning)

### 并发 async / await · async 和 await

- **U2-13** await 告诉 Python 必须等待某个操作完成它的工作，再把结果存下来；这样 Python 就知道此时可以去做其他事情（比如接收另一个请求）。声明函数可以被暂停靠的是 async def。 [原文§并发 async / await · async 和 await](https://fastapi.tiangolo.com/zh/async/#async-and-await)
- **U2-14** 只能在用 async def 创建的函数内使用 await。 [原文§并发 async / await · 赶时间吗？](https://fastapi.tiangolo.com/zh/async/#in-a-hurry) [原文§并发 async / await · 更多技术细节](https://fastapi.tiangolo.com/zh/async/#more-technical-details)
- **U2-15** 要用 await 等待它（burgers = await get_burgers(2)），才能拿到执行结果，而 await 只能写在 async def 定义的函数内部；像普通函数那样直接调用（burgers = get_burgers(2)）拿不到结果。（原文写“带 async def 的函数也只能在 async def 定义的函数内部调用”；严格说，直接调用 async 函数只会创建协程对象而不执行它，要得到结果须 await 它或交给事件循环运行，这里区分“调用”和“等待执行结果”。） [原文§并发 async / await · async 和 await](https://fastapi.tiangolo.com/zh/async/#async-and-await) [原文§并发 async / await · 更多技术细节](https://fastapi.tiangolo.com/zh/async/#more-technical-details) [核对来源：Python 官方文档 · 协程](https://docs.python.org/3/library/asyncio-task.html#coroutines)
- **U2-16** 使用 FastAPI 时不必担心：“第一个”函数就是路径操作函数，由 FastAPI 负责执行它，FastAPI 知道如何做正确的事。不用 FastAPI 也想使用 async / await 时可以自己做，例如直接用 AnyIO 编写自己的异步程序。（原文的问法是“async def 函数只能在 async def 函数内调用，第一个 async 函数是怎么被调用的”；严格说，普通函数里也能调用 async 函数得到协程对象，需要的是有人 await 它或交给事件循环执行，所以这里按“谁负责执行”来问。） [原文§并发 async / await · 更多技术细节](https://fastapi.tiangolo.com/zh/async/#more-technical-details) [原文§并发 async / await · 编写自己的异步代码](https://fastapi.tiangolo.com/zh/async/#write-your-own-async-code) [核对来源：Python 官方文档 · 协程](https://docs.python.org/3/library/asyncio-task.html#coroutines)

### 并发 async / await · 协程

- **U2-17** 协程是对 async def 函数返回的那个东西的称呼：Python 知道它有点像函数，可以启动、也会在某个时刻结束，并且只要内部有 await 就可能在内部暂停。它不是线程池里运行的 def 函数，也不是 await 关键字本身。 [原文§并发 async / await · 协程](https://fastapi.tiangolo.com/zh/async/#coroutines)

### 并发 async / await · 非常技术性的细节

- **U2-18** 它运行在外部的线程池中并等待其结果，而不是被直接调用，因为直接调用会阻塞服务器。 [原文§并发 async / await · 非常技术性的细节 · 路径操作函数](https://fastapi.tiangolo.com/zh/async/#path-operation-functions)
- **U2-19** 最好使用 async def，除非函数内使用了执行阻塞 I/O 的代码。在其他框架里习惯用普通 def 声明仅计算的函数以换取约 100 纳秒的微小性能增益，但在 FastAPI 中效果完全相反。 [原文§并发 async / await · 非常技术性的细节 · 路径操作函数](https://fastapi.tiangolo.com/zh/async/#path-operation-functions)
- **U2-20** 标准 def 的依赖会运行在外部线程池中；依赖和子依赖可以混用 async def 与 def，仍能正常工作，其中用 def 声明的会在外部线程（线程池）里调用，而不是被“等待”。子依赖不要求与所属依赖声明方式一致，def 依赖也不会像普通函数那样被直接调用。 [原文§并发 async / await · 非常技术性的细节 · 依赖](https://fastapi.tiangolo.com/zh/async/#dependencies) [原文§并发 async / await · 非常技术性的细节 · 子依赖](https://fastapi.tiangolo.com/zh/async/#sub-dependencies)
- **U2-21** FastAPI 不会影响你调用它们的方式：def 工具函数会在代码里写调用的地方直接调用，不会进线程池；async def 工具函数则需要你用 await 等待其结果。这与 FastAPI 调用路径操作函数和依赖的逻辑相反。 [原文§并发 async / await · 非常技术性的细节 · 其他工具函数](https://fastapi.tiangolo.com/zh/async/#other-utility-functions)

## 3. 请求参数与数据校验

原文：[FastAPI 官方文档 · 教程 - 用户指南](https://fastapi.tiangolo.com/zh/tutorial/)。

### 第一步

- **U3-1** FastAPI 是直接从 Starlette 继承的类，所以通过 FastAPI 也能使用 Starlette 的所有功能；把继承方向说反、说两者互相独立，或把数据校验和生成文档的分工安到这两者头上都不符合原文。[原文§第一步 · 步骤 1：导入 FastAPI](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#step-1-import-fastapi)
- **U3-2** /docs 的交互式 API 文档由 Swagger UI 提供，/redoc 的可选文档由 ReDoc 提供，所以两个空依次是：Swagger UI、ReDoc。[原文§第一步 · 交互式 API 文档](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#interactive-api-docs)[原文§第一步 · 可选的 API 文档](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#alternative-api-docs)
- **U3-3** OpenAPI 是一种规定如何定义 API 模式的规范；FastAPI 用它把你的所有 API 转换成「模式」，其中包含 API 路径、可能用到的参数，以及 API 收发数据的定义，这些数据定义通过 JSON Schema 标准生成。这份 OpenAPI 模式驱动了 FastAPI 内置的两个交互式文档系统，也可以用来自动生成与 API 通信的客户端代码。[原文§第一步 · OpenAPI](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#openapi)[原文§第一步 · OpenAPI 和 JSON Schema](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#openapi-and-json-schema)[原文§第一步 · OpenAPI 的用途](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#what-is-openapi-for)
- **U3-4** 「路径」指 URL 中从第一个 / 起的后半部分，也常被称为「端点」或「路由」；「操作」指 HTTP「方法」，在 OpenAPI 中每个 HTTP 方法都被称为「操作」，所以两个空依次是：路径、操作。[原文§第一步 · 路径](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#path)[原文§第一步 · 操作](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#operation)
- **U3-5** 通常用 POST 创建数据、GET 读取数据、PUT 更新数据、DELETE 删除数据，所以四个空依次是：创建、读取、更新、删除。[原文§第一步 · 操作](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#operation)
- **U3-6** FastAPI 没有强制要求操作有任何特定含义，常规用法只是指导而不是要求（例如用 GraphQL 时通常所有动作都通过 POST 执行）；原文还列出了 OPTIONS、HEAD、PATCH、TRACE 等不常用的方法，所以限定只能用四种方法的说法也不对。[原文§第一步 · 定义一个路径操作装饰器](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#define-a-path-operation-decorator)
- **U3-7** 路径操作函数可以返回 dict、list，像 str、int 一样的单个值，还可以返回 Pydantic 模型，以及会自动转换为 JSON 的其他对象和模型（包括 ORM 对象等），不需要事先自己序列化。[原文§第一步 · 步骤 5：返回内容](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#step-5-return-the-content)

### 路径参数

- **U3-8** FastAPI 通过类型声明自动对请求做「解析」，所以函数收到的是整数 3 而不是字符串 "3"，转换不需要函数自己完成。[原文§路径参数 · 数据转换](https://fastapi.tiangolo.com/zh/tutorial/path-params/#data-conversion)
- **U3-9** 类型校验失败时 FastAPI 会返回清晰的错误信息，其中 type 为 int_parsing，loc 指出未通过校验的具体位置是 path 里的 item_id；传入浮点数（如 4.2）同样会得到这个错误。[原文§路径参数 · 数据校验](https://fastapi.tiangolo.com/zh/tutorial/path-params/#data-validation)
- **U3-10** 原文明确说所有数据校验都由 Pydantic 在幕后完成；其余选项都不是原文所说的校验者。[原文§路径参数 · Pydantic](https://fastapi.tiangolo.com/zh/tutorial/path-params/#pydantic)
- **U3-11** 只需声明一次类型，就能获得编辑器支持（错误检查、代码自动补全等）、数据「解析」、数据校验，以及 API 注解和自动文档，所以四个空是：编辑器支持、数据解析、数据校验、API 注解和自动文档。[原文§路径参数 · 小结](https://fastapi.tiangolo.com/zh/tutorial/path-params/#recap)
- **U3-12** 路径操作是按顺序依次匹配的，如果 GET /users/{user_id} 写在前面，它会匹配 /users/me，FastAPI 会认为收到了值为 "me" 的 user_id，所以必须把写死的 /users/me 放在前面。同样，对同一路径、同一 HTTP 方法重复定义两个路径操作时，路径首先匹配，始终会使用第一个定义的；同一路径的不同方法（如 GET 和 POST）是不同的路径操作，各自生效。[原文§路径参数 · 顺序很重要](https://fastapi.tiangolo.com/zh/tutorial/path-params/#order-matters) [原文§第一步 · 操作](https://fastapi.tiangolo.com/zh/tutorial/first-steps/#operation)
- **U3-13** 预设路径参数的有效值，可以导入 Enum 并创建继承自 str 和 Enum 的子类，再用它作为路径参数的类型注解；继承 str 能让 API 文档把值的类型定义为字符串并正确渲染。其余选项分别是数值范围约束、正则约束和布尔转换，都不是限定一组预设取值的做法。[原文§路径参数 · 预设值 · 创建 Enum 类](https://fastapi.tiangolo.com/zh/tutorial/path-params/#create-an-enum-class)

### 查询参数

- **U3-14** 原文说 FastAPI 是因为默认值 = None 才知道 q 不是必填的，str | None 只是让编辑器提供更好的辅助和错误检测，并不是判断是否必填的依据；不在路径中的参数没有默认值时也是必选的（如 needy）。[原文§查询参数 · 可选参数](https://fastapi.tiangolo.com/zh/tutorial/query-params/#optional-parameters)[原文§请求体 · 请求体 + 路径 + 查询参数](https://fastapi.tiangolo.com/zh/tutorial/body/#request-body-path-query-parameters)
- **U3-15** 要把查询参数设为必选，就不要声明默认值；缺少时响应会报错，type 为 missing、loc 为 query 加参数名。只要声明了默认值（包括 None），参数就是可选的。[原文§查询参数 · 必选查询参数](https://fastapi.tiangolo.com/zh/tutorial/query-params/#required-query-parameters)
- **U3-16** bool 类型的查询参数接收 1、True、true、on、yes 或它们的任意大小写形式时，函数拿到的 short 是 True；所以 1、on、Yes 会转换成 True，off 和 no 则转换成 False。（原文写“否则为 False”；实际上只有可识别的假值如 0、off、no、false 会转换成 False，无法识别的值如 short=foo 会校验失败，返回 422。）[原文§查询参数 · 查询参数类型转换](https://fastapi.tiangolo.com/zh/tutorial/query-params/#query-parameter-type-conversion) [核对来源：Pydantic 文档 · Booleans](https://docs.pydantic.dev/latest/api/standard_library_types/#booleans)

### 请求体

- **U3-17** FastAPI 会以 JSON 形式读取请求体，必要时把它转换为对应的类型，并校验数据；数据无效时返回清晰的错误信息，指出错误数据的确切位置和内容；校验通过后把接收的数据赋值给该参数。它还会为模型生成 JSON Schema 定义，成为 OpenAPI Schema 的一部分，并被自动文档使用。[原文§请求体 · 结果](https://fastapi.tiangolo.com/zh/tutorial/body/#results)
- **U3-18** 规范中没有定义用 GET 请求发送请求体的行为，FastAPI 仍支持这种方式，但只用于非常复杂或极端的用例；由于不推荐，Swagger UI 的交互式文档不会显示请求体文档，中间的代理也可能不支持。[原文§请求体 · 请求体](https://fastapi.tiangolo.com/zh/tutorial/body/#request-body)
- **U3-19** 与查询参数一样，模型中带默认值的属性是可选的，否则就是必选的，把默认值设为 None 可使其变为可选；类型写成 str | None 并不是判断是否必填的依据，是否必填由是否有默认值决定。[原文§请求体 · 创建数据模型](https://fastapi.tiangolo.com/zh/tutorial/body/#create-your-data-model)[原文§请求体 · 请求体 + 路径 + 查询参数](https://fastapi.tiangolo.com/zh/tutorial/body/#request-body-path-query-parameters)
- **U3-20** 如果参数也在路径中声明，它就是路径参数；如果是 int、float、str、bool 等单一类型，会被当作查询参数；如果类型声明为 Pydantic 模型，会被当作请求体，所以三个空依次是：路径、查询、请求体。[原文§请求体 · 请求体 + 路径 + 查询参数](https://fastapi.tiangolo.com/zh/tutorial/body/#request-body-path-query-parameters)

### 查询参数和字符串校验

- **U3-21** 使用 Annotated 时不能再给 Query 传 default（例如 Query(default="rick") 配上 = "morty" 会让默认值不明确），应使用函数参数本身的实际默认值，推荐写成 q: Annotated[str, Query()] = "rick"。[原文§查询参数和字符串校验 · 在默认值中使用 Query 或在 Annotated 中使用 Query](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#query-as-the-default-value-or-in-annotated)
- **U3-22** Annotated 的优势：函数参数的默认值就是真正的默认值；在 FastAPI 之外直接调用函数也按预期工作，缺少必填参数时编辑器和 Python 都会报错；可以包含多个元数据标注，所以能与 Typer 等工具配合。FastAPI 在 0.95.0 版本才添加对 Annotated 的支持，更旧的版本使用它会报错；而在 Annotated 里的 Query 不能再传 default，两处各写一个默认值会不一致。[原文§查询参数和字符串校验 · Annotated 的优势](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#advantages-of-annotated)[原文§查询参数和字符串校验 · 导入 Query 和 Annotated](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#import-query-and-annotated)
- **U3-23** 字符串特有的校验参数是 min_length（最小长度）、max_length（最大长度）和 pattern（要匹配的正则表达式），所以三个空依次是：min_length、max_length、pattern。[原文§查询参数和字符串校验 · 添加更多校验](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#add-more-validations)[原文§查询参数和字符串校验 · 添加正则表达式](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#add-regular-expressions)
- **U3-24** ^ 表示必须以接下来的字符开头，前面没有其他字符，fixedquery 要求值精确等于它，$ 表示到此结束、之后没有更多字符，所以值必须精确等于 fixedquery。[原文§查询参数和字符串校验 · 添加正则表达式](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#add-regular-expressions)
- **U3-25** 不声明默认值就是必填；类型注解写成 str | None，表示这个参数的类型允许 None，所以 q 是“必填，但类型可以为 None”的声明：是否必填取决于有没有默认值，而不是类型里有没有 None。（原文说“客户端必须发送一个值，即使该值是 None”；这里只描述参数声明，不涉及客户端在查询字符串里如何表示 None，?q=None 这样的写法仍会被当作字符串。）[原文§查询参数和字符串校验 · 必填，但可以为 None](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#required-can-be-none)
- **U3-26** 用 Query 显式定义查询参数时可以让它接收值列表，如 Annotated[list[str] | None, Query()]，URL 中重复的 q 会以 Python list 的形式收到；要声明 list 类型的查询参数必须显式使用 Query，否则会被解释为请求体。list[int] 这样的写法还会检查并记录列表内容必须是整数。[原文§查询参数和字符串校验 · 查询参数列表 / 多个值](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#query-parameter-list-multiple-values)[原文§查询参数和字符串校验 · 只使用 list](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#using-just-list)
- **U3-27** 用 alias 参数声明别名，FastAPI 会用该别名在 URL 中查找参数值；deprecated 只是在文档里把参数标为已弃用，include_in_schema 只是控制它是否出现在文档里，title 只是元数据，都不会改变 FastAPI 在 URL 里查找的参数名。[原文§查询参数和字符串校验 · 别名参数](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#alias-parameters)
- **U3-28** 无法通过 Query 内置参数完成的校验，可以在 Annotated 中使用 Pydantic 的 AfterValidator 传入校验函数，它会在正常校验（例如先校验值是 str）之后应用；它适合只需检查请求中同一份数据的校验，需要和数据库等外部组件通信的校验应改用 FastAPI 依赖项。[原文§查询参数和字符串校验 · 自定义校验](https://fastapi.tiangolo.com/zh/tutorial/query-params-str-validations/#custom-validation)

### 路径参数和数值校验

- **U3-29** 不能。路径参数总是必需的，因为它必须是路径的一部分；把它声明为 None 或设置默认值，都不会让这一段路径变成可以省略的。（原文写“即使声明为 None 或设置默认值也不会产生任何影响”；实际上普通签名里的默认值会被忽略，而用 Path(default=...) 或 Annotated[..., Path()] 给路径参数设默认值时，FastAPI 会直接报错“Path parameters cannot have a default value”。）[原文§路径参数和数值校验 · 声明元数据](https://fastapi.tiangolo.com/zh/tutorial/path-params-numeric-validations/#declare-metadata) [核对来源：FastAPI 源码 · params.Path](https://github.com/fastapi/fastapi/blob/master/fastapi/params.py)
- **U3-30** gt 是大于，ge 是大于等于，lt 是小于，le 是小于等于，所以三个空依次是：大于等于、小于、小于等于。[原文§路径参数和数值校验 · 数值校验：大于和小于等于](https://fastapi.tiangolo.com/zh/tutorial/path-params-numeric-validations/#number-validations-greater-than-and-less-than-or-equal)[原文§路径参数和数值校验 · 总结](https://fastapi.tiangolo.com/zh/tutorial/path-params-numeric-validations/#recap)
- **U3-31** FastAPI 通过参数的名称、类型和默认值声明（Query、Path 等）来检测参数，而不关心它们的声明顺序；声明查询参数的顺序同样不重要，FastAPI 靠参数名来识别。[原文§路径参数和数值校验 · 按需对参数排序](https://fastapi.tiangolo.com/zh/tutorial/path-params-numeric-validations/#order-the-parameters-as-you-need)[原文§查询参数 · 多个路径和查询参数](https://fastapi.tiangolo.com/zh/tutorial/query-params/#multiple-path-and-query-parameters)

### 请求体 - 多个参数

- **U3-32** 声明多个请求体参数时，FastAPI 会使用参数名作为请求体中的键（字段名），期望形如 {"item": {...}, "user": {...}} 的请求体；一个请求只能有一个请求体，FastAPI 负责在函数里为你提供正确的数据。[原文§请求体 - 多个参数 · 多个请求体参数](https://fastapi.tiangolo.com/zh/tutorial/body-multiple-params/#multiple-body-parameters)
- **U3-33** 单一值默认会被当作查询参数，要让它成为请求体的另一个键，需要用 Body 指示 FastAPI，如 Annotated[int, Body()]，这样请求体里就会多出 importance 这个键。[原文§请求体 - 多个参数 · 请求体中的单一值](https://fastapi.tiangolo.com/zh/tutorial/body-multiple-params/#singular-values-in-body)
- **U3-34** 单个请求体参数默认期望请求体直接就是模型的内容，使用 Body(embed=True) 后，期望的请求体会多包一层，以 item 作为键、值里放模型内容。[原文§请求体 - 多个参数 · 嵌入单个请求体参数](https://fastapi.tiangolo.com/zh/tutorial/body-multiple-params/#embed-a-single-body-parameter)

### 请求体 - 字段

- **U3-35** Field 用来在 Pydantic 模型内部为模型属性声明校验和元数据（例如 max_length、gt、description），它的工作方式和参数与 Query、Path、Body 相同，只是用在模型属性的位置上，写法也和路径操作函数的参数类似。传给 Field 的额外键也会出现在生成的 OpenAPI 架构里，某些 OpenAPI 工具可能因此无法处理。[原文§请求体 - 字段 · 声明模型属性](https://fastapi.tiangolo.com/zh/tutorial/body-fields/#declare-model-attributes)[原文§请求体 - 字段 · 添加更多信息](https://fastapi.tiangolo.com/zh/tutorial/body-fields/#add-extra-information)

### 请求体 - 嵌套模型

- **U3-36** 可以：模型属性的类型本身可以是另一个 Pydantic 模型，因此能声明拥有特定属性名称、类型和校验的任意深度嵌套的 JSON 对象，也可以把模型用作 list、set 等的子类型。仅靠这样的声明，FastAPI 就能为被嵌入的模型提供编辑器支持（自动补全等）、数据转换、数据校验和自动生成的文档。[原文§请求体 - 嵌套模型 · 嵌套模型](https://fastapi.tiangolo.com/zh/tutorial/body-nested-models/#nested-models)[原文§请求体 - 嵌套模型 · 带有一组子模型的属性](https://fastapi.tiangolo.com/zh/tutorial/body-nested-models/#attributes-with-lists-of-submodels)

### Header 参数

- **U3-37** 大部分标准请求头用连字符分隔，而 user-agent 这样的名字在 Python 里不是有效变量名，所以 Header 默认把参数名里的下划线改成连字符来提取请求头；HTTP 请求头不区分大小写，可以直接用 snake_case 的 user_agent，无需写成 User_Agent。[原文§Header 参数 · 自动转换](https://fastapi.tiangolo.com/zh/tutorial/header-params/#automatic-conversion)
- **U3-38** 必须使用 Header 声明 header 参数，否则该参数会被解释为查询参数；Cookie 参数同理，必须使用 Cookie 声明，否则也会被解释为查询参数。[原文§Header 参数 · 声明 Header 参数](https://fastapi.tiangolo.com/zh/tutorial/header-params/#declare-header-parameters)[原文§Cookie 参数 · 声明 Cookie 参数](https://fastapi.tiangolo.com/zh/tutorial/cookie-params/#declare-cookie-parameters)

### Cookie 参数

### 表单数据

- **U3-39** 接收表单字段和上传文件都需要先安装 python-multipart，因为上传文件和表单字段都是以「表单数据」发送的。[原文§表单数据 · 表单数据](https://fastapi.tiangolo.com/zh/tutorial/request-forms/#form-data)[原文§请求文件 · 请求文件](https://fastapi.tiangolo.com/zh/tutorial/request-files/#request-files)
- **U3-40** 表单数据通常使用 application/x-www-form-urlencoded 编码，但当表单包含文件时会编码为 multipart/form-data，所以两个空依次是：application/x-www-form-urlencoded、multipart/form-data。[原文§表单数据 · 关于「表单字段」](https://fastapi.tiangolo.com/zh/tutorial/request-forms/#about-form-fields)[原文§请求文件 · 什么是「表单数据」](https://fastapi.tiangolo.com/zh/tutorial/request-files/#what-is-form-data)
- **U3-41** 因为此时请求体会使用 application/x-www-form-urlencoded 编码，而不是 application/json；声明了 File 时请求体则使用 multipart/form-data 编码，同样不能再以 JSON 接收 Body 字段。可以在一个路径操作中声明多个 Form 参数或多个 File 参数，但这不是 FastAPI 的限制，而是 HTTP 协议的一部分。[原文§表单数据 · 关于「表单字段」](https://fastapi.tiangolo.com/zh/tutorial/request-forms/#about-form-fields)[原文§请求文件 · 什么是「表单数据」](https://fastapi.tiangolo.com/zh/tutorial/request-files/#what-is-form-data)

### 请求文件

- **U3-42** 声明为 bytes 时（配合 File()），FastAPI 会读取整个文件并以 bytes 形式接收，内容会全部存储在内存中，适用于小型文件。UploadFile 使用「spooled」文件：先存储在内存中，达到最大上限后写入磁盘，所以适合处理图像、视频、大型二进制等大文件而不占满内存；它还能获取上传文件的元数据，提供 file-like 的 async 接口，并暴露实际的 SpooledTemporaryFile 对象，且不必在参数默认值中使用 File()。[原文§请求文件 · 定义 File 参数](https://fastapi.tiangolo.com/zh/tutorial/request-files/#define-file-parameters)[原文§请求文件 · 含 UploadFile 的文件参数](https://fastapi.tiangolo.com/zh/tutorial/request-files/#file-parameters-with-uploadfile)
- **U3-43** UploadFile 的属性有 filename（上传的原始文件名）、content_type（内容类型，即 MIME 类型）和 file（SpooledTemporaryFile，一个 file-like 对象），所以三个空依次是：filename、content_type、file。[原文§请求文件 · 含 UploadFile 的文件参数 · UploadFile](https://fastapi.tiangolo.com/zh/tutorial/request-files/#uploadfile)

## 4. 响应模型、状态码与异常处理

原文：[FastAPI 官方文档 · 响应模型 - 返回类型](https://fastapi.tiangolo.com/zh/tutorial/response-model/)。

### 响应模型 - 返回类型

- **U4-1** 返回类型会让 FastAPI 校验返回数据（数据无效说明应用代码有问题，返回服务器错误而不是错误数据）、在 OpenAPI 的路径操作中为响应添加 JSON Schema，并在默认的 JSON 响应处理下使用 Pydantic 把返回数据序列化为 JSON。数据无效时仍照常发送的说法与原文相反；先用 `jsonable_encoder` 转换再交给 `JSONResponse` 是默认处理下没有声明响应模型时的做法（显式指定 `response_class=JSONResponse` 时，即使声明了响应模型也会走这条路径，所以题干限定了默认处理）。[原文§响应模型 - 返回类型 · 返回类型](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-return-type) [原文§直接返回响应 · 响应模型如何工作](https://fastapi.tiangolo.com/zh/advanced/response-directly/#how-a-response-model-works) [原文§自定义响应 - HTML、流、文件等 · JSON 响应](https://fastapi.tiangolo.com/zh/advanced/custom-response/#json-responses)
- **U4-2** 缺少字段说明应用代码有问题、没有返回应有的数据，FastAPI 会返回服务器错误而不是返回错误的数据，这样你和客户端都能确定收到的数据及其结构符合预期。照常返回、自动补全缺失字段、返回客户端错误都不是原文的行为。[原文§响应模型 - 返回类型 · 返回类型](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-return-type)
- **U4-3** 如果加了返回类型注解，工具和编辑器会（正确地）报错，提示函数返回的类型（例如 dict）与声明的 Pydantic 模型不同，所以这种情况改用路径操作装饰器的 `response_model` 参数。其余选项对返回类型注解的限制都是原文没有的说法。[原文§响应模型 - 返回类型 · response_model 参数](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-parameter)
- **U4-4** response_model 具有优先级，由 FastAPI 使用。这样即使返回的类型与响应模型不同，你也能给函数加上供编辑器和 mypy 使用的正确注解，同时仍让 FastAPI 用 response_model 做校验、文档等。[原文§响应模型 - 返回类型 · response_model 的优先级](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-priority)
- **U4-5** 同一个模型作输出时，API 会在响应里原样返回密码，若其他路径操作也用它，就可能把用户密码发给每个客户端。应另建一个不含密码的输出模型（如 `UserOut`），用 `response_model=UserOut` 声明；函数即使返回含密码的输入对象，FastAPI 也会过滤掉输出模型中未声明的数据。[原文§响应模型 - 返回类型 · 返回与输入相同的数据](https://fastapi.tiangolo.com/zh/tutorial/response-model/#return-the-same-input-data) [原文§响应模型 - 返回类型 · 添加输出模型](https://fastapi.tiangolo.com/zh/tutorial/response-model/#add-an-output-model)
- **U4-6** 用类继承：把公共字段放在 `BaseUser`，`UserIn` 继承它并多出 `password`，函数注解返回 `BaseUser`、实际返回 `UserIn`。类型系统里子类可以代替基类，所以工具不报错；FastAPI 按返回类型只保留其中声明的字段，并做了处理，不会因类继承而返回比预期更多的数据。[原文§响应模型 - 返回类型 · 返回类型与数据过滤](https://fastapi.tiangolo.com/zh/tutorial/response-model/#return-type-and-data-filtering) [原文§响应模型 - 返回类型 · FastAPI 的数据过滤](https://fastapi.tiangolo.com/zh/tutorial/response-model/#fastapi-data-filtering)
- **U4-7** FastAPI 会尝试基于该注解创建响应模型并失败，因为它既不是 Pydantic 类型，也不是单个 Response 类或其子类，而是两者的联合类型。后面三个选项描述的都是原文没有的行为。[原文§响应模型 - 返回类型 · 无效的返回类型注解](https://fastapi.tiangolo.com/zh/tutorial/response-model/#invalid-return-type-annotations)
- **U4-8** 响应只包含实际设置过值的字段，不包含靠默认值填上的字段；只要数据里给了某个有默认值的字段的值，它就会出现。只排除 None 或只排除等于默认值的字段是另外的参数（`response_model_exclude_none`、`response_model_exclude_defaults`）。[原文§响应模型 - 返回类型 · 使用 response_model_exclude_unset 参数](https://fastapi.tiangolo.com/zh/tutorial/response-model/#use-the-response-model-exclude-unset-parameter)
- **U4-9** 因为即使用这两个参数省略了一些属性，应用在 OpenAPI（和文档）里生成的 JSON Schema 仍然是完整模型。它们只是在只有一个 Pydantic 模型时从输出中移除数据的快捷方式。[原文§响应模型 - 返回类型 · response_model_include 和 response_model_exclude](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-include-and-response-model-exclude)

### 更多模型

- **U4-10** 输入模型应该包含密码，输出模型不应含密码，数据库模型可能需要包含哈希后的密码。不要存储明文密码，始终只存储之后可用于校验的“安全哈希”；输出模型也不应带上密码。[原文§更多模型 · 更多模型](https://fastapi.tiangolo.com/zh/tutorial/extra-models/#extra-models)
- **U4-11** 声明一个 `UserBase` 作为基类，其他模型继承它，只声明各自差异的部分（明文 `password`、`hashed_password`、不含密码），数据转换、校验、文档等仍正常运行。减少重复是 FastAPI 的核心思想之一，重复会导致 bug、安全问题、代码失步。[原文§更多模型 · 减少重复](https://fastapi.tiangolo.com/zh/tutorial/extra-models/#reduce-duplication)

### 响应状态码

- **U4-12** 两者都是 `@app.get()`、`@app.post()` 等装饰器方法的参数，而不是路径操作函数的参数（与查询参数、请求体不同）；`status_code` 接收表示 HTTP 状态码的数字，也可以接收 `IntEnum`（如 `http.HTTPStatus`）。写在函数参数列表里、只能接收 int 的说法都不对。[原文§响应状态码 · 响应状态码](https://fastapi.tiangolo.com/zh/tutorial/response-status-code/#response-status-code) [原文§响应模型 - 返回类型 · response_model 参数](https://fastapi.tiangolo.com/zh/tutorial/response-model/#response-model-parameter)
- **U4-13** 100–199 是信息，200–299 是成功，300–399 是重定向，400–499 是客户端错误，500–599 是服务器端错误。所以五个空依次是：信息、成功、重定向、客户端错误、服务器错误。[原文§响应状态码 · 关于 HTTP 状态码](https://fastapi.tiangolo.com/zh/tutorial/response-status-code/#about-http-status-codes)
- **U4-14** 100–199 的信息类状态码、204（无内容）和 304（未修改）的响应都不能包含响应体。201 表示“已创建”，示例里照常返回内容；404 是客户端错误，用 `HTTPException` 触发时响应带有 `detail` 的 JSON。[原文§响应状态码 · 关于 HTTP 状态码](https://fastapi.tiangolo.com/zh/tutorial/response-status-code/#about-http-status-codes) [原文§处理错误 · 响应结果](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#the-resulting-response)
- **U4-15** 几乎永远不会直接使用这些状态码，应用代码或服务器出现问题时会自动返回它们。“最常用”指的是 200–299，“客户端错误”指的是 400–499，“不能包含响应体”则对应信息类、204、304。[原文§响应状态码 · 关于 HTTP 状态码](https://fastapi.tiangolo.com/zh/tutorial/response-status-code/#about-http-status-codes)
- **U4-16** 两者数字代码相同，`fastapi.status` 里的变量只是一种快捷方式，好处是可以使用编辑器的自动补全；它与 `starlette.status` 完全相同，直接来自 Starlette。[原文§响应状态码 · 状态码名称快捷方式](https://fastapi.tiangolo.com/zh/tutorial/response-status-code/#shortcut-to-remember-the-names)

### 处理错误

- **U4-17** HTTPException 是额外包含 API 相关数据的常规 Python 异常，所以只能 raise。raise 之后后续代码不再执行，请求立刻终止并把 HTTP 错误发给客户端，即使异常是路径操作函数所调用的工具函数内部触发的也一样。[原文§处理错误 · 在代码中触发 HTTPException](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#raise-an-httpexception-in-your-code)
- **U4-18** 可以传任何能转换为 JSON 的值，不仅限于 `str`，还支持 `dict`、`list` 等数据结构，FastAPI 会自动处理并转换成 JSON。[原文§处理错误 · 响应结果](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#the-resulting-response)
- **U4-19** 用 `@app.exception_handler(该异常类)` 装饰一个异常处理器函数，它接收 `Request` 和该异常，返回要发给客户端的响应（如指定状态码的 `JSONResponse`）；路径操作里 raise 该异常时就由它处理。[原文§处理错误 · 安装自定义异常处理器](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#install-custom-exception-handlers)
- **U4-20** 触发的是 `RequestValidationError`；要覆盖默认处理器，导入它并用 `@app.exception_handler(RequestValidationError)` 装饰自己的处理器。[原文§处理错误 · 覆盖请求验证异常](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#override-request-validation-exceptions)
- **U4-21** FastAPI 的 HTTPException 继承自 Starlette 的，唯一区别是 FastAPI 的 `detail` 接受任意可转换为 JSON 的数据，而 Starlette 的只接受字符串。[原文§处理错误 · FastAPI 的 HTTPException vs Starlette 的 HTTPException](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#fastapis-httpexception-vs-starlettes-httpexception)
- **U4-22** 这样当 Starlette 的内部代码、扩展或插件触发 Starlette 的 HTTPException 时，你的处理器也能捕获并处理；而在代码中触发时仍可照常使用 FastAPI 的 HTTPException。[原文§处理错误 · FastAPI 的 HTTPException vs Starlette 的 HTTPException](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#fastapis-httpexception-vs-starlettes-httpexception)
- **U4-23** 因为 `RequestValidationError` 包含发生验证错误的文件名和行号信息，直接转成字符串返回可能泄露系统细节；需要时可以把这些信息记录到日志里。[原文§处理错误 · 覆盖 HTTPException 错误处理器](https://fastapi.tiangolo.com/zh/tutorial/handling-errors/#override-the-httpexception-error-handler)

### JSON 兼容编码器

- **U4-24** 它把 Pydantic 模型等转换成与 JSON 兼容的 Python 数据：模型变成 `dict`，`datetime` 变成 ISO 格式的 `str`。这样数据才能存入只接受 JSON 兼容数据的数据库（不接受 `datetime` 对象和 Pydantic 模型）；FastAPI 内部也用它转换数据。[原文§JSON 兼容编码器 · 使用 jsonable_encoder](https://fastapi.tiangolo.com/zh/tutorial/encoder/#using-the-jsonable-encoder)
- **U4-25** 它不会返回一个包含 JSON 格式数据的庞大字符串，而是返回 Python 标准数据结构（例如 `dict`），其值和子值都与 JSON 兼容；之后可以再用 `json.dumps()` 序列化。[原文§JSON 兼容编码器 · 使用 jsonable_encoder](https://fastapi.tiangolo.com/zh/tutorial/encoder/#using-the-jsonable-encoder)

### 请求体 - 更新数据

- **U4-26** 按教程的全量替换实现，输入模型对没提供的 `tax` 取默认值 10.5，整个模型编码后直接替换已存储的记录，保存的数据就会带上这个“新的” `tax` 值，覆盖原来的 20.2。覆盖是这种全量替换的保存逻辑造成的；FastAPI 并不限制 PUT 的用法，很多团队也用 PUT 实现部分更新，那样就可以保留原值。[原文§请求体 - 更新数据 · 关于替换的警告](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#warning-about-replacing) [原文§请求体 - 更新数据 · 用 PATCH 进行部分更新](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#partial-updates-with-patch)
- **U4-27** PUT 用于接收替换现有数据的数据；PATCH 用于部分更新，只需发送想更新的数据，其余数据保持不变；FastAPI 不限制怎么用，很多团队甚至只用 PUT 实现部分更新。PATCH 没有 PUT 知名、也没那么常用，FastAPI 也不强制部分更新必须用 PATCH。[原文§请求体 - 更新数据 · 用 PUT 替换式更新](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#update-replacing-with-put) [原文§请求体 - 更新数据 · 用 PATCH 进行部分更新](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#partial-updates-with-patch)
- **U4-28** （可选）使用 PATCH；取出已存储的数据并放入 Pydantic 模型；用输入模型的 `model_dump(exclude_unset=True)` 生成只含请求里实际设置值的 dict；对已存储的模型用 `model_copy(update=...)` 创建副本并更新属性；用 `jsonable_encoder` 转成可存入数据库的形式，保存后返回更新后的模型。[原文§请求体 - 更新数据 · 部分更新小结](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#partial-updates-recap)
- **U4-29** 目的是得到只含请求中实际设置的数据的 dict（不含默认值），这样只会更新用户实际设置的值，不会用模型里的默认值覆盖已存储的值。[原文§请求体 - 更新数据 · 使用 Pydantic 的 exclude_unset 参数](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#using-pydantics-exclude-unset-parameter)
- **U4-30** 输入模型仍会被验证，所以需要一个所有属性都标记为可选（带默认值或 None）的模型；可以参考“更多模型”里的思路，把用于更新（全部可选）和用于创建（必填）的模型区分开。[原文§请求体 - 更新数据 · 部分更新小结](https://fastapi.tiangolo.com/zh/tutorial/body-updates/#partial-updates-recap)

### 直接返回响应

- **U4-31** 返回 Response 时 FastAPI 直接传递它，不会用 Pydantic 模型做数据转换（即使声明了 `response_model`），也不会根据实际返回的 Response 对象自动推导响应文档；装饰器里声明的 `response_model`、`response_class` 等信息仍可用于生成 OpenAPI 文档。它不会按 `response_model` 过滤字段，也不会替你对 `content` 调用 `jsonable_encoder`，数据要自己准备好。[原文§直接返回响应 · 返回 Response](https://fastapi.tiangolo.com/zh/advanced/response-directly/#return-a-response) [原文§直接返回响应 · 说明](https://fastapi.tiangolo.com/zh/advanced/response-directly/#notes) [原文§自定义响应 - HTML、流、文件等 · 自定义响应 - HTML、流、文件等](https://fastapi.tiangolo.com/zh/advanced/custom-response/#custom-response-html-stream-file-others) [原文§自定义响应 - HTML、流、文件等 · 在 OpenAPI 中文档化并重载 Response](https://fastapi.tiangolo.com/zh/advanced/custom-response/#document-in-openapi-and-override-response)
- **U4-32** FastAPI 不会改动你返回的 Response，所以必须先准备好内容：用 `jsonable_encoder` 把模型转成 dict、把 `datetime` 等转成兼容 JSON 的类型，再传给 `JSONResponse`。[原文§直接返回响应 · 在 Response 中使用 jsonable_encoder](https://fastapi.tiangolo.com/zh/advanced/response-directly/#using-the-jsonable-encoder-in-a-response)
- **U4-33** 在默认的 JSON 响应处理下：声明了响应模型时，FastAPI 用 Pydantic 直接生成 JSON 字节并返回带 `application/json` 媒体类型的 Response，不使用 `jsonable_encoder`，也不使用 `JSONResponse` 类；这部分在 Rust 侧完成，性能好得多。没有声明时，则先用 `jsonable_encoder` 转换，再放进 `JSONResponse`。如果显式指定了 `response_class=JSONResponse`，即使声明了响应模型，也只用它转换和过滤数据，序列化仍走 `jsonable_encoder` 加 `JSONResponse`，所以想要最佳性能就不要声明 response_class。[原文§直接返回响应 · 响应模型如何工作](https://fastapi.tiangolo.com/zh/advanced/response-directly/#how-a-response-model-works) [原文§直接返回响应 · 直接返回响应](https://fastapi.tiangolo.com/zh/advanced/response-directly/#return-a-response-directly) [原文§自定义响应 - HTML、流、文件等 · JSON 响应](https://fastapi.tiangolo.com/zh/advanced/custom-response/#json-responses)

### 自定义响应 - HTML、流、文件等

- **U4-34** 它声明要使用的 Response 类（任意 Response 子类），函数返回的内容会被放进该响应里；它也用来定义响应的媒体类型（如 `HTMLResponse` 的 `text/html`），并记录到 OpenAPI 文档中。[原文§自定义响应 - HTML、流、文件等 · 自定义响应 - HTML、流、文件等](https://fastapi.tiangolo.com/zh/advanced/custom-response/#custom-response-html-stream-file-others) [原文§自定义响应 - HTML、流、文件等 · HTML 响应](https://fastapi.tiangolo.com/zh/advanced/custom-response/#html-response)
- **U4-35** `StreamingResponse` 接收异步生成器或普通生成器/迭代器并流式传输响应主体；`FileResponse` 异步传输文件；`RedirectResponse` 返回 HTTP 重定向。返回 `application/json` 编码响应的是 `JSONResponse`，`PlainTextResponse` 返回纯文本；`HTMLResponse` 返回 HTML，不是用来传输大文件的。[原文§自定义响应 - HTML、流、文件等 · StreamingResponse](https://fastapi.tiangolo.com/zh/advanced/custom-response/#streamingresponse) [原文§自定义响应 - HTML、流、文件等 · FileResponse](https://fastapi.tiangolo.com/zh/advanced/custom-response/#fileresponse) [原文§自定义响应 - HTML、流、文件等 · RedirectResponse](https://fastapi.tiangolo.com/zh/advanced/custom-response/#redirectresponse) [原文§自定义响应 - HTML、流、文件等 · PlainTextResponse](https://fastapi.tiangolo.com/zh/advanced/custom-response/#plaintextresponse)
- **U4-36** 默认使用 307（临时重定向）；也可以配合 `status_code` 参数改用其他状态码（例如示例里的 302）。[原文§自定义响应 - HTML、流、文件等 · RedirectResponse](https://fastapi.tiangolo.com/zh/advanced/custom-response/#redirectresponse)

## 5. 依赖注入

原文：[FastAPI 官方文档 · 依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/)。

### 依赖项

- **U5-1** 依赖注入指你的代码（这里是路径操作函数）声明自己运行所需要使用的东西，也就是“依赖”，再由系统（这里是 FastAPI）负责执行所有必要的逻辑，把这些依赖提供（“注入”）给你的代码。它适合用来共享业务逻辑、共享数据库连接、实施安全、认证和角色权限等要求，同时尽量减少代码重复。 [原文§依赖项 · 什么是「依赖注入」](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#what-is-dependency-injection)
- **U5-2** 官方列出的场景有：共享业务逻辑（同一段代码逻辑反复复用）、共享数据库连接、实施安全、认证、角色权限等要求，并且能减少代码重复。依赖项的返回值只在同一个请求内缓存，不是跨请求长期缓存；依赖项只是一个没有 `@app.get(...)` 这类装饰器的路径操作函数，并不会替代路径操作。 [原文§依赖项 · 什么是「依赖注入」](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#what-is-dependency-injection) [原文§依赖项 · 第一步 · 创建依赖项，或“dependable”](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#create-a-dependency-or-dependable) [原文§子依赖项 · 多次使用同一个依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times)
- **U5-3** 最基本的依赖项只是一个函数，它可以接收与路径操作函数相同的所有参数，可以当作没有 `@app.get(...)` 装饰器的路径操作函数，并且可以返回任何你想要的内容。不需要创建专门的类去向 FastAPI “注册”；依赖项也不需要路径操作装饰器；它可以返回任何内容，也可以用 `def` 或 `async def` 定义。 [原文§依赖项 · 第一步 · 创建依赖项，或“dependable”](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#create-a-dependency-or-dependable) [原文§依赖项 · 第一步 · 在“dependant”中声明依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#declare-the-dependency-in-the-dependant)
- **U5-4** 把一个依赖项（类似函数的可调用对象）本身传给 `Depends()`；你不需要直接调用它（不要在末尾加括号），FastAPI 会在处理请求时去调用它。一次 `Depends` 只声明一个依赖项，不能同时传入多个依赖项让 FastAPI 依次调用。（原文此处写“只能给 Depends 传入一个参数”，指的是一个依赖项；同一文档的子依赖项一节还演示了 `Depends(get_value, use_cache=False)`，可以另加关键字参数。） [原文§依赖项 · 第一步 · 在“dependant”中声明依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#declare-the-dependency-in-the-dependant) [原文§子依赖项 · 多次使用同一个依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times)
- **U5-5** FastAPI 会做三件事：用正确的参数调用你的依赖项（“dependable”）函数；获取函数返回的结果；把这个结果赋值给路径操作函数中对应的参数。这样共享代码只需写一次，FastAPI 会在各个路径操作中为你调用它。 [原文§依赖项 · 第一步 · 在“dependant”中声明依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#declare-the-dependency-in-the-dependant)
- **U5-6** 它把 `Annotated` 的值存到一个变量里，在多个地方复用，减少重复书写；这只是标准 Python 的“类型别名”，并不是 FastAPI 特有的。类型信息会被保留，编辑器的自动补全、行内报错以及 mypy 等工具照常可用，在大型代码库里反复使用同一依赖时尤其有用。 [原文§依赖项 · 共享 Annotated 依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#share-annotated-dependencies)
- **U5-7** 依赖项也由 FastAPI 调用，所以定义函数时与路径操作函数相同的规则同样适用：可以用 `async def` 或普通 `def`，既可以在 `def` 路径操作函数中声明 `async def` 依赖项，也可以在 `async def` 路径操作函数中声明 `def` 依赖项，FastAPI 知道该怎么处理。所以“必须同为 async def”“必须统一写法”都不对。 [原文§依赖项 · 要不要使用 async？](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#to-async-or-not-to-async)
- **U5-8** 它们都会集成到同一个 OpenAPI 模式中，因此交互式文档里也会包含这些依赖项的所有信息；FastAPI 会负责把依赖项带来的参数、验证等内容全部加到 OpenAPI 模式里。 [原文§依赖项 · 与 OpenAPI 集成](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#integrated-with-openapi) [原文§依赖项 · 与 OpenAPI 集成（层级依赖）](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#integrated-with-openapi_1)
- **U5-9** 依赖项可以再依赖其他依赖项，最终构成一棵依赖项层级树，依赖注入系统会处理所有依赖及其子依赖，并在每一步注入相应的结果。官方示例：`active_user` 依赖 `current_user`，`admin_user` 和 `paying_user` 又依赖 `active_user`；`/items/public/` 只依赖 `current_user`，`/items/private/` 依赖 `active_user`，`/users/{user_id}/activate` 依赖 `admin_user`，`/items/pro/` 依赖 `paying_user`，各端点因此有不同的权限要求。 [原文§依赖项 · 简单而强大](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#simple-and-powerful)

### 类作为依赖项

- **U5-10** 关键因素是依赖项应该是“可调用对象”，也就是 Python 能像函数一样“调用”的对象；函数、类或其他任何可调用对象都行。声明成函数只是更常见的方式，并不是唯一方式；类和带 `__call__` 的类实例都只是可调用对象的具体情形，并不是必须条件。 [原文§类作为依赖项 · 什么构成了依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#what-makes-a-dependency) [原文§高级依赖项 · “可调用”的实例](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#a-callable-instance)
- **U5-11** 创建类实例的语法和调用函数一样（例如 `Cat(name="Mr Fluffy")`），所以 Python 类也是可调用对象。FastAPI 检查的是它是不是可调用对象以及它定义的参数，并像处理路径操作函数的参数那样处理这些参数，包括子依赖项；FastAPI 调用这个类，创建出类的一个实例，再把它作为参数传给路径操作函数。 [原文§类作为依赖项 · 类作为依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#classes-as-dependencies_1) [原文§类作为依赖项 · 使用它](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#use-it)
- **U5-12** 原来路径操作函数拿到的是 `dict`，编辑器不知道它的键和值类型，所以不能提供补全等支持；改用类并声明类型后，编辑器就知道传入的是什么，可以帮助补全、类型检查。两种写法下参数都会被转换、验证并在 OpenAPI 模式中文档化，所以并不是 dict 版本缺这些能力。 [原文§类作为依赖项 · 来自前一个例子的dict](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#a-dict-from-the-previous-example) [原文§类作为依赖项 · 类作为依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#classes-as-dependencies_1) [原文§类作为依赖项 · 类型注解 vs Depends](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#type-annotation-vs-depends)
- **U5-13** FastAPI 实际使用的是最后的 `Depends(CommonQueryParams)`：它据此提取依赖项声明的参数，并调用它。第一个 `CommonQueryParams` 类型注解对 FastAPI 没有任何特殊意义，不用于数据转换、验证等，写成 `Annotated[Any, Depends(CommonQueryParams)]` 同样可以工作；但仍鼓励声明类型，这样编辑器知道会传入什么，能补全和做类型检查。 [原文§类作为依赖项 · 类型注解 vs Depends](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#type-annotation-vs-depends)
- **U5-14** 这是官方提供的快捷方式：依赖项明确是一个类时，把依赖项声明为参数类型，并使用不带参数的 `Depends()`，就等同于 `Depends(CommonQueryParams)`，避免把类写两遍，FastAPI 知道该怎么处理。官方提示这只是快捷方式，看着更混乱的话可以忽略。 [原文§类作为依赖项 · 快捷方式](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#shortcut)

### 子依赖项

- **U5-15** 路径操作函数里只声明了一个依赖项 `query_or_cookie_extractor`，但 FastAPI 必须先处理 `query_extractor`，以便在调用 `query_or_cookie_extractor` 时使用 `query_extractor` 返回的结果，并把它赋给参数 `q`。因此路径操作函数无需重复声明子依赖项，子依赖项也不会被忽略。 [原文§子依赖项 · 使用依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#use-the-dependency) [原文§子依赖项 · 第二层依赖项，“dependable”和“dependant”](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#second-dependency-dependable-and-dependant)
- **U5-16** FastAPI 在处理同一请求时只调用一次该依赖项：它不会为同一个请求多次调用同一个依赖项，而是把依赖项的返回值“缓存”起来，并传给同一请求中所有需要它的依赖项。这里的缓存针对的是同一个请求，而不是在应用启动时只调用一次。 [原文§子依赖项 · 多次使用同一个依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times)
- **U5-17** 两个空依次是：`use_cache`、`False`，即 `Depends(get_value, use_cache=False)`。 [原文§子依赖项 · 多次使用同一个依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/sub-dependencies/#using-the-same-dependency-multiple-times)

### 路径操作装饰器依赖项

- **U5-18** 当你不需要在路径操作函数里使用依赖项的返回值，或者依赖项本来就不返回值，但仍要执行或解析这个依赖项时，就可以在路径操作装饰器里添加由 `Depends()` 组成的 `dependencies` 列表。装饰器依赖项同样可以声明请求头等需求项或子依赖项，也可以抛出异常，但这些普通依赖项也能做到，并不是选用它的理由；需要使用返回值时则应在参数里用 `Depends`。 [原文§路径操作装饰器依赖项 · 在路径操作装饰器中添加 dependencies 参数](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#add-dependencies-to-the-path-operation-decorator) [原文§路径操作装饰器依赖项 · 依赖项错误和返回值 · 依赖项的需求项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#dependency-requirements)
- **U5-19** 该参数的值是由 `Depends()` 组成的 list；这类依赖项的执行或解析方式和普通依赖项一样，可以声明请求头等需求项或子依赖项，也可以 `raise` 异常；但就算依赖项会返回值，路径操作也不会使用这些值，所以可以复用在其他位置用过的、会返回值的普通依赖项，即使没使用这个值也会执行它。“返回值传给路径操作函数”和“不能复用普通依赖项”都与此相反。 [原文§路径操作装饰器依赖项 · 在路径操作装饰器中添加 dependencies 参数](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#add-dependencies-to-the-path-operation-decorator) [原文§路径操作装饰器依赖项 · 依赖项错误和返回值 · 触发异常](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#raise-exceptions) [原文§路径操作装饰器依赖项 · 依赖项错误和返回值 · 返回值](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#return-values)
- **U5-20** 在装饰器里使用 `dependencies` 参数，可以确保依赖项被执行，同时避免编辑器或工具因为“未使用的函数参数”而报错，也避免开发新人误以为代码里包含无用的未使用参数。 [原文§路径操作装饰器依赖项 · 在路径操作装饰器中添加 dependencies 参数](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#add-dependencies-to-the-path-operation-decorator)

### 全局依赖项

- **U5-21** 两个空依次是：`dependencies`、路径操作。把依赖项放进 `FastAPI(dependencies=[...])`，就会对应用里的所有路径操作生效，思路与在路径操作装饰器中添加 `dependencies` 类似。 [原文§全局依赖项 · 全局依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/global-dependencies/#global-dependencies)
- **U5-22** 一是在路径操作函数的参数里用 `Depends` 声明，只作用于这个路径操作，依赖项的结果会注入到对应的参数；二是在路径操作装饰器的 `dependencies=[Depends(...)]` 里声明，同样只作用于这个路径操作，但即使依赖项有返回值也不会传给路径操作函数；三是创建应用时用 `FastAPI(dependencies=[Depends(...)])` 声明全局依赖项，应用于所有路径操作。文档还提到，后面会讲到如何为一组路径操作声明单个 `dependencies` 参数。 [原文§依赖项 · 第一步 · 在“dependant”中声明依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/#declare-the-dependency-in-the-dependant) [原文§路径操作装饰器依赖项 · 在路径操作装饰器中添加 dependencies 参数](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-in-path-operation-decorators/#add-dependencies-to-the-path-operation-decorator) [原文§全局依赖项 · 全局依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/global-dependencies/#global-dependencies)

### 使用 yield 的依赖项

- **U5-23** 在创建响应之前，只会执行 `yield` 语句及其之前的代码；`yield` 语句后面的代码会在响应之后执行。依赖产生的值会注入路径操作和其他依赖项，退出步骤（如关闭数据库会话）放在 `yield` 之后。 [原文§使用 yield 的依赖项 · 使用 yield 的数据库依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#a-database-dependency-with-yield)
- **U5-24** 带 `yield` 的依赖项用 `yield` 而不是 `return`，并把完成后要执行的额外步骤写在后面；每个依赖里应只使用一次 `yield`；`yield` 产生的值会注入到路径操作和其他依赖项中；可以使用 `async` 或普通函数，FastAPI 会像处理普通依赖一样正确处理。所以“只有 async def 才能 yield”和“值只能注入路径操作函数”都不对。 [原文§使用 yield 的依赖项 · 使用 yield 的依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#dependencies-with-yield) [原文§使用 yield 的依赖项 · 使用 yield 的数据库依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#a-database-dependency-with-yield)
- **U5-25** 用 `try` 包住 `yield` 后，使用该依赖时抛出的任何异常（无论发生在另一个依赖还是路径操作中）都会在依赖里收到，所以可以用 `except SomeException` 捕获特定异常；也可以用 `finally` 确保退出步骤一定会被执行，无论是否发生异常。所以“finally 只在没有异常时执行”和“路径操作里的异常不会传到依赖项”都不对。 [原文§使用 yield 的依赖项 · 同时使用 yield 和 try 的依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#a-dependency-with-yield-and-try)
- **U5-26** FastAPI 会确保每个带 `yield` 的依赖中的“退出代码”按正确的顺序运行：`dependency_c` 在执行退出代码时需要 `dependency_b` 的值仍然可用，而 `dependency_b` 又需要 `dependency_a` 的值在其退出代码中可用。“最先创建就最先退出”“顺序无保证”“只有 dependency_c 会退出”都与此不符。 [原文§使用 yield 的依赖项 · 使用 yield 的子依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#sub-dependencies-with-yield)
- **U5-27** FastAPI 将无法察觉发生过异常，就像普通 Python 代码那样：客户端会看到 HTTP 500 Internal Server Error，但服务器没有任何日志或提示说明错误是什么。除非抛出另一个 `HTTPException` 或类似异常，否则应该用 `raise` 重新抛出原始异常，这样客户端仍得到 500，但服务器日志中会有这个自定义的异常。 [原文§使用 yield 的依赖项 · 同时使用 yield 和 except 的依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#dependencies-with-yield-and-except) [原文§使用 yield 的依赖项 · 同时使用 yield 和 except 的依赖项 · 务必 raise](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#always-raise-in-dependencies-with-yield-and-except)
- **U5-28** 在路径操作函数的代码中引发的任何异常，包括 `HTTPException`，都会被传递给带 `yield` 的依赖项；大多数情况下，你会希望在带 `yield` 的依赖中重新抛出相同的异常或一个新的异常，以确保它被正确处理。 [原文§使用 yield 的依赖项 · 使用 yield 的依赖项的执行](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#execution-of-dependencies-with-yield)
- **U5-29** FastAPI 用的是 Python 的上下文管理器：任何可以与 `@contextlib.contextmanager` 或 `@contextlib.asynccontextmanager` 一起使用的函数都可以作为依赖项，FastAPI 在内部就用这两个装饰器。上下文管理器是可以在 `with` 语句中使用的对象，`with` 代码块结束时会确保清理（如关闭文件），即使发生了异常；但你不需要也不应该为 FastAPI 的依赖去使用这些装饰器。 [原文§使用 yield 的依赖项 · 使用 yield 的依赖项](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#dependencies-with-yield) [原文§使用 yield 的依赖项 · 上下文管理器 · 什么是“上下文管理器”](https://fastapi.tiangolo.com/zh/tutorial/dependencies/dependencies-with-yield/#what-are-context-managers)

### 高级依赖项

- **U5-30** 声明类的 `__call__` 方法，让类的实例成为可调用对象；用 `__init__` 接收参数来“参数化”实例，例如 `checker = FixedContentQueryChecker("bar")`，FastAPI 不会接触或关心 `__init__`。然后用 `Depends(checker)` 传入实例而不是类，解析依赖时 FastAPI 会像 `checker(q="somequery")` 这样调用它，用 `__call__` 来检查附加参数和子依赖项，并把返回值传给路径操作函数里的参数。 [原文§高级依赖项 · “可调用”的实例](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#a-callable-instance) [原文§高级依赖项 · 参数化实例](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#parameterize-the-instance) [原文§高级依赖项 · 把实例作为依赖项](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#use-the-instance-as-a-dependency)
- **U5-31** 要让类的实例成为可调用对象，需要声明 `__call__` 方法；FastAPI 会用这个 `__call__` 来检查附加参数和子依赖项，并在稍后调用它；FastAPI 不会接触或关心 `__init__`，它由我们在自己的代码中使用。因为依赖项是实例 `checker` 而不是类本身，所以应写 `Depends(checker)` 而不是 `Depends(FixedContentQueryChecker)`；FastAPI 也不会调用 `__init__` 去传查询参数。 [原文§高级依赖项 · “可调用”的实例](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#a-callable-instance) [原文§高级依赖项 · 参数化实例](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#parameterize-the-instance) [原文§高级依赖项 · 把实例作为依赖项](https://fastapi.tiangolo.com/zh/advanced/advanced-dependencies/#use-the-instance-as-a-dependency)

## 6. 安全与认证

原文：[FastAPI 官方文档 · 安全性](https://fastapi.tiangolo.com/zh/tutorial/security/)。

### 安全性

- **U6-1** OAuth2 是一个规范，定义了几种处理身份认证和授权的方法，涵盖使用“第三方”（如 Facebook、Google、X、GitHub）登录的场景。A 说的是 JWT；C 与原文相反，原文说 OAuth2 没有指定如何加密通信，而是期望使用 HTTPS；D 说的是 OpenAPI。[原文§安全性 · OAuth2](https://fastapi.tiangolo.com/zh/tutorial/security/#oauth2)
- **U6-2** OAuth2 没有指定如何加密通信，而是期望你为应用使用 HTTPS 进行通信。（原文在对比时写 OAuth 1“直接包含了如何加密通信的规范，因此更复杂”；OAuth 1 规范定义的是请求签名，用来校验请求的完整性和来源，并不保证请求内容的机密性，敏感内容仍要靠传输层加密。）[原文§安全性 · OAuth 1](https://fastapi.tiangolo.com/zh/tutorial/security/#oauth-1) [核对来源：RFC 5849 §4.2](https://www.rfc-editor.org/rfc/rfc5849.html#section-4.2)
- **U6-3** OpenID Connect 是基于 OAuth2 的规范，只是对 OAuth2 做扩展，并明确了一些 OAuth2 中相对模糊的内容，让它更具互操作性；例如 Google 登录使用 OpenID Connect，而 Facebook 登录不支持它，使用的是自己的 OAuth2 风格。单独的“OpenID”试图解决同样的问题，但不基于 OAuth2，是一个完整的附加系统，如今已不流行。[原文§安全性 · OpenID Connect](https://fastapi.tiangolo.com/zh/tutorial/security/#openid-connect)[原文§安全性 · OpenID（非「OpenID Connect」）](https://fastapi.tiangolo.com/zh/tutorial/security/#openid-not-openid-connect)
- **U6-4** FastAPI 基于 OpenAPI（以前称为 Swagger），这使多个自动交互式文档界面、代码生成等成为可能；OpenAPI 还定义了多种安全“方案”，用它们可以利用这些基于标准的工具，包括交互式文档系统。[原文§安全性 · OpenAPI](https://fastapi.tiangolo.com/zh/tutorial/security/#openapi)
- **U6-5** apiKey（来自查询参数、请求头或 cookie 的应用特定密钥）、http（标准 HTTP 身份认证，包括 bearer、HTTP Basic、HTTP Digest 等）、oauth2（OAuth2 处理安全性的各种方式，称为“流程”）、openIdConnect（提供自动发现 OAuth2 身份认证数据的方法）。[原文§安全性 · OpenAPI](https://fastapi.tiangolo.com/zh/tutorial/security/#openapi)
- **U6-6** password 流程可以完美地用于直接在同一应用程序中处理身份认证（接下来几章的示例就用它）；implicit、clientCredentials、authorizationCode 这几种流程适合构建 OAuth 2.0 身份认证的提供者，例如 Google、Facebook、X、GitHub。[原文§安全性 · OpenAPI](https://fastapi.tiangolo.com/zh/tutorial/security/#openapi)

### 安全 - 第一步

- **U6-7** 用户在前端输入 username 和 password，前端把它们发送到 API 中由 tokenUrl 声明的 URL；API 校验后返回一个“令牌”，它只是一个包含某些内容、之后可用来验证该用户的字符串，通常会过期；前端把令牌临时存起来，之后访问需要认证的端点时发送 Authorization 请求头，值为 Bearer 加上令牌，例如 Bearer foobar。[原文§安全 - 第一步 · password 流](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#the-password-flow)
- **U6-8** 令牌通常会在一段时间后过期，用户过一段时间需要重新登录；这样即使令牌被窃取，风险也更小，因为它不像一把永久有效的钥匙（在大多数情况下）。B、C 不是原文给出的理由，D 与“需要重新登录”相反。[原文§安全 - 第一步 · password 流](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#the-password-flow)
- **U6-9** OAuth2 的设计目标是让后端或 API 与负责用户认证的服务器解耦；本章示例是简化的情形，由 FastAPI 应用同时处理 API 和认证，这并不是 OAuth2 的设计目标。[原文§安全 - 第一步 · password 流](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#the-password-flow)
- **U6-10** Authorization 请求头的值是 Bearer 加上令牌，所以令牌是 foobar 时，请求头内容就是 Bearer foobar。[原文§安全 - 第一步 · password 流](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#the-password-flow)
- **U6-11** tokenUrl 参数包含客户端（运行在用户浏览器中的前端）用来发送 username 和 password 以获取令牌的 URL。[原文§安全 - 第一步 · FastAPI 的 OAuth2PasswordBearer](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#fastapis-oauth2passwordbearer)
- **U6-12** tokenUrl 不会创建端点或路径操作，只是声明客户端应使用 /token 这个 URL 来获取令牌，这些信息会用于 OpenAPI 和交互式文档，对应的路径操作要自己创建。它是相对 URL（等价于 ./token），而使用相对 URL 很重要，能确保应用在使用代理等高级用例中依然正常工作，所以 B、D 错误。[原文§安全 - 第一步 · FastAPI 的 OAuth2PasswordBearer](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#fastapis-oauth2passwordbearer)
- **U6-13** 它在请求中查找 Authorization 请求头，检查其值是否为 Bearer 加上一些令牌，并把令牌作为 str 返回给路径操作函数，FastAPI 还据此在 OpenAPI 中定义“安全方案”。如果没有 Authorization 请求头，或者其值不包含 Bearer 令牌，它会直接返回 401 状态码错误，因此只要函数被执行，就一定能拿到一个 str 类型的令牌。[原文§安全 - 第一步 · 使用](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#use-it)[原文§安全 - 第一步 · 它做了什么](https://fastapi.tiangolo.com/zh/tutorial/security/first-steps/#what-it-does)

### 获取当前用户

- **U6-14** get_current_user 把 oauth2_scheme 作为子依赖项，从中接收 str 类型的 token，再用工具函数把令牌转成用户（示例是返回 Pydantic 的 User 模型）。路径操作用 Depends(get_current_user) 注入当前用户，并把参数类型声明为 User，这样函数内部可以使用代码补全和类型检查。[原文§获取当前用户 · 创建 get_current_user 依赖项](https://fastapi.tiangolo.com/zh/tutorial/security/get-current-user/#create-a-get-current-user-dependency)[原文§获取当前用户 · 注入当前用户](https://fastapi.tiangolo.com/zh/tutorial/security/get-current-user/#inject-the-current-user)
- **U6-15** 开发者可以使用任何模型、类或数据满足安全需求，本例的 Pydantic User 模型只是示例，不局限于 username 字段，所以 B 错；登录的可以是机器人等只拥有访问令牌的系统；安全和依赖注入的代码只写一次，数千个端点都可以共用，每个路径操作只需很少的几行代码，所以 D 错。[原文§获取当前用户 · 其它模型](https://fastapi.tiangolo.com/zh/tutorial/security/get-current-user/#other-models)[原文§获取当前用户 · 代码大小](https://fastapi.tiangolo.com/zh/tutorial/security/get-current-user/#code-size)

### OAuth2 实现简单的 Password 和 Bearer 验证

- **U6-16** OAuth2 规范要求密码流中客户端必须以表单数据形式发送 username 和 password 字段，不能使用 JSON 对象，字段名也必须就是 username 和 password。前端仍可显示终端用户所需的名称，数据库模型也可以用所需的名称，但登录路径操作要使用兼容规范的这两个名称。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 获取 username 和 password](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#get-the-username-and-password)
- **U6-17** scope 表单字段名是单数，实际是以空格分隔的多个作用域组成的长字符串；作用域只是不带空格的字符串，常用于声明权限（如 users:read），是否用冒号或 URL 形式不重要，对 OAuth2 来说都只是字符串，所以 B 错。表单类的实例没有长字符串属性 scope，而是提供 scopes 属性，由已发送的 scope 字符串列表组成，所以 E 错。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · scope](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#scope)[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 使用表单数据](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#use-the-form-data)
- **U6-18** OAuth2PasswordRequestForm 并不像 OAuth2PasswordBearer 那样是被识别为安全方案的特殊类，它只是可以自行编写的类依赖项（也可以直接声明 Form 参数），FastAPI 因为用例常见才直接支持，所以 B 错。它声明 username、password，以及可选的 scope、grant_type、client_id、client_secret；它没有强制 grant_type 为 password，要强制须改用 OAuth2PasswordRequestFormStrict，所以 E 错。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · OAuth2PasswordRequestForm](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#oauth2passwordrequestform)
- **U6-19** 哈希是把内容（这里是密码）转换成形似乱码的字节序列，可以用来校验密码，但无法从结果转换回原密码。这样数据库被盗时，窃贼拿到的只是哈希值而不是明文密码，也就无法把密码拿去其它应用登录，而很多用户在各个系统里用的是同一个密码，风险很大。（原文写“每次传入完全相同的内容（完全相同的密码）时，都会得到完全相同的乱码”；教程采用的 Argon2 等密码哈希会加入随机盐，同一密码每次生成的哈希字符串通常不同，校验时从哈希字符串里取出盐和参数重新计算。）[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 为什么使用密码哈希](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#why-use-password-hashing)[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 为什么使用密码哈希](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#why-use-password-hashing) [核对来源：pwdlib 指南 · Hash a password](https://frankie567.github.io/pwdlib/guide/#hash-a-password) [核对来源：argon2-cffi API · PasswordHasher.hash](https://argon2-cffi.readthedocs.io/en/stable/api.html#argon2.PasswordHasher.hash)
- **U6-20** 哈希是把密码转换成形似乱码的字节序列，可以用来校验密码，但这个结果无法转换回传入的密码，所以窃贼只拿到哈希值也还原不出明文；它也不是用 SECRET_KEY 加密或简单编码。（原文写“每次传入完全相同的内容得到的都是完全相同的结果”；教程采用的 Argon2 会加入随机盐，同一密码每次生成的哈希字符串通常不同。）[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 密码哈希](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#password-hashing) [核对来源：pwdlib 指南 · Hash a password](https://frankie567.github.io/pwdlib/guide/#hash-a-password) [核对来源：argon2-cffi API · PasswordHasher.hash](https://argon2-cffi.readthedocs.io/en/stable/api.html#argon2.PasswordHasher.hash)
- **U6-21** access_token（包含访问令牌的字符串）、token_type（本例使用 Bearer 令牌，所以类型应为 bearer）。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 返回 Token](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#return-the-token)
- **U6-22** get_current_active_user 以 get_current_user 为基础：用户不存在时 get_current_user 报错，用户未激活时它再返回 HTTP 错误，这样端点只有在用户存在、通过身份验证且处于激活状态时才能拿到该用户。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 更新依赖项](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#update-the-dependencies)
- **U6-23** 按规范，任何 401 UNAUTHORIZED 响应都应返回 WWW-Authenticate 响应头，使用 Bearer 令牌时它的值就是 Bearer。忽略它实际上也不会有问题，提供它是为了符合规范，并且现在或将来可能有工具期望并使用它。[原文§OAuth2 实现简单的 Password 和 Bearer 验证 · 更新依赖项](https://fastapi.tiangolo.com/zh/tutorial/security/simple-oauth2/#update-the-dependencies)

### 使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌

- **U6-24** JWT 意为 JSON Web Tokens，是一种把 JSON 对象编码成没有空格、很密集的一长串字符串的标准。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 关于 JWT](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#about-jwt)
- **U6-25** 本教程使用的 JWT 没有加密，所以任何人都可以从内容中恢复信息；但它是“签名”的，因此收到自己签发的令牌时，可以验证它确实是你签发的。（原文写“JWT 不是加密的”，指的是教程里这种只签名的令牌；JWT 标准本身也定义了加密形式的令牌。）[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 关于 JWT](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#about-jwt) [核对来源：RFC 7519 §3](https://www.rfc-editor.org/rfc/rfc7519.html#section-3)
- **U6-26** 可以创建一个有效期例如为 1 周的令牌，用户第二天带着令牌回来，就能知道该用户仍处于登录状态；一周后令牌过期，用户不再被授权，需要重新登录以获取新令牌。如果用户或第三方尝试修改令牌来更改过期时间，也能被发现，因为签名将不匹配。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 关于 JWT](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#about-jwt)
- **U6-27** pwdlib 推荐的算法是 Argon2；它也支持 bcrypt，但推荐的是 Argon2。HS256 是示例里用来签名 JWT 令牌的算法，RSA 属于数字签名算法，都不是密码哈希算法。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 安装 pwdlib](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#install-pwdlib)
- **U6-28** 这样可以确保无论用户名是否有效，端点的响应时间都大致相同，从而防止可用于枚举已存在用户名的时序攻击。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 哈希并校验密码](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#hash-and-verify-the-passwords)
- **U6-29** SECRET_KEY 是用来对 JWT 令牌签名的随机密钥，要用命令生成安全的随机密钥并复制到变量里，不要使用示例中的那个，所以 B 错；ALGORITHM 是签名 JWT 所用的算法，示例设为 HS256，不是密码哈希算法（推荐 Argon2），所以 D 错；过期时间由一个变量设置，签发时以 exp 键写入令牌内容。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 处理 JWT 令牌](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#handle-jwt-tokens)
- **U6-30** sub 表示令牌的“主题”，可选，通常放用户标识，不是过期时间；它在整个应用中应是唯一标识符，并且应该是字符串，不是整数 ID；当用户、车、博客文章等不同实体可能有相同 ID 时，可以给 sub 的值加上前缀，例如 username:johndoe，以避免 ID 冲突。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 关于 JWT “主题” sub 的技术细节](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#technical-details-about-the-jwt-subject-sub)
- **U6-31** 它先用 oauth2_scheme 拿到令牌，再用 SECRET_KEY 和 ALGORITHM 解码并校验令牌，从内容里取出 sub 作为用户名，据此到（伪）数据库里查用户。令牌无效、取不到 sub，或者查不到用户时，都会抛出 401 的 HTTPException（Could not validate credentials），并带上 WWW-Authenticate: Bearer 响应头。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 更新依赖项](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#update-the-dependencies)
- **U6-32** 密码只会在第一个请求中用于认证用户并获取访问令牌，之后就不会再发送密码了，发送的数据只包含令牌（Authorization 请求头的值以 Bearer 开头）。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 检查](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#check-it)
- **U6-33** OAuth2 支持 scopes，可以用它们为 JWT 令牌添加一组特定权限，然后把这个令牌直接交给用户或第三方，让他们在一组限制条件下与 API 交互；具体用法在高级用户指南中讲解。[原文§使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 · 使用 scopes 的高级用法](https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/#advanced-usage-with-scopes)

## 7. 中间件、CORS、后台任务与生命周期

原文：[FastAPI 官方文档 · 中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/)。

### 中间件

- **U7-1** 中间件是一个函数，它会在每个特定的路径操作处理每个请求之前运行，也会在返回每个响应之前运行：先接收请求并做一些处理，再把请求交给路径操作，拿到响应后可以再处理，最后返回响应。A 说的是 lifespan 的启动逻辑，C 说的是 lifespan 的关闭逻辑，D 说的是后台任务，三者都不是中间件。[原文§中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#middleware)
- **U7-2** 中间件函数接收 `request` 和 `call_next`，所以两个空是：request、call_next。[原文§中间件 · 创建中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#create-a-middleware)
- **U7-3** call_next 是中间件接收的一个函数，它把 request 作为参数，把请求传递给相应的路径操作，然后返回路径操作生成的 response。所以在 `await call_next(request)` 之前写的代码会在路径操作接收请求之前运行，之后写的代码可以在返回之前进一步修改 response，例如添加 `X-Process-Time` 响应头。[原文§中间件 · 创建中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#create-a-middleware) [原文§中间件 · 在 response 之前与之后](https://fastapi.tiangolo.com/zh/tutorial/middleware/#before-and-after-the-response)
- **U7-4** 官方文档的技术细节说明：如果有使用 yield 的依赖，依赖中的退出代码会在中间件之后运行。它既不早于中间件，也不是与中间件并行，更不是等到应用关闭才运行。[原文§中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#middleware)
- **U7-5** 官方文档说明：如果有任何后台任务，它们会在所有中间件之后运行。因此后台任务不会先于中间件，也不是等到应用关闭才运行。[原文§中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#middleware)
- **U7-6** 可以用 X- 前缀添加专有的自定义请求头，但如果希望浏览器中的客户端能看到这些自定义头，需要把它们加到 CORS 配置的 expose_headers 参数中。allow_headers 针对的是请求头，allow_origins 列的是允许的源；只加 X- 前缀只是命名约定，并不会让浏览器中的客户端读到它。[原文§中间件 · 创建中间件](https://fastapi.tiangolo.com/zh/tutorial/middleware/#create-a-middleware)
- **U7-7** 使用 `@app.middleware()` 装饰器或 `app.add_middleware()` 添加多个中间件时，每个新中间件都会包裹应用，形成一个栈：最后添加的中间件是“最外层”，最先添加的是“最内层”。在请求路径上，最外层的中间件先运行；在响应路径上，它最后运行。[原文§中间件 · 多个中间件的执行顺序](https://fastapi.tiangolo.com/zh/tutorial/middleware/#multiple-middleware-execution-order)

### CORS（跨域资源共享）

- **U7-8** 源是协议（http、https）、域（如 myapp.com、localhost）以及端口（如 80、443、8080）的组合，所以三个空是：协议、域、端口。[原文§CORS（跨域资源共享） · 源](https://fastapi.tiangolo.com/zh/tutorial/cors/#origin)
- **U7-9** 官方文档指出，即使都在 localhost 上，只要协议或端口不同就是不同的源；这里协议都是 http、域都是 localhost，区别只在端口（8080 与默认的 80）。后端有没有配置允许的源列表影响的是是否放行，而不是是否属于不同的源。[原文§CORS（跨域资源共享） · 源](https://fastapi.tiangolo.com/zh/tutorial/cors/#origin) [原文§CORS（跨域资源共享） · 步骤](https://fastapi.tiangolo.com/zh/tutorial/cors/#steps)
- **U7-10** 对于需要预检的请求，浏览器会先向后端发送一个 HTTP OPTIONS 预检请求；如果后端发送了适当的 headers 来授权这个不同源的通信，浏览器才允许前端中的 JavaScript 向后端发送实际请求。为此后端必须有一个“允许的源”列表，并且其中要包含前端所在的源（例如 http://localhost:8080）。简单请求则不需要预检，中间件照常传递请求，再在响应上添加适当的 CORS 头。[原文§CORS（跨域资源共享） · 步骤](https://fastapi.tiangolo.com/zh/tutorial/cors/#steps) [原文§CORS（跨域资源共享） · CORS 预检请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#cors-preflight-requests) [原文§CORS（跨域资源共享） · 简单请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#simple-requests)
- **U7-11** 使用 "*" 表示允许全部源，但这只允许某些类型的通信，不包括所有涉及凭据的内容，比如 Cookies，以及使用 Bearer 令牌的 Authorization 请求头等。所以为了一切都能正常工作，最好显式指定允许的源。[原文§CORS（跨域资源共享） · 通配符](https://fastapi.tiangolo.com/zh/tutorial/cors/#wildcards)
- **U7-12** allow_origins 是允许跨域请求的源列表，allow_methods 是允许跨域请求的 HTTP 方法列表，allow_headers 是跨域请求支持的 HTTP 请求头列表；expose_headers 指示可以被浏览器访问的响应头，max_age 设定浏览器缓存 CORS 响应的最长时间，都不是这三项配置。（原文参数说明写 allow_credentials 为 True 时，allow_origins、allow_methods 和 allow_headers 都不能设为 ['*']，但同页示例在 allow_credentials=True 时仍把 allow_methods 和 allow_headers 设为 ['*']；按 CORSMiddleware 的实现，方法通配符会展开成全部方法，请求头通配符在预检时回显请求的头，并不是原样返回 *。）[原文§CORS（跨域资源共享） · 使用 CORSMiddleware](https://fastapi.tiangolo.com/zh/tutorial/cors/#use-corsmiddleware) [核对来源：FastAPI 参考 · CORSMiddleware](https://fastapi.tiangolo.com/zh/reference/middleware/#fastapi.middleware.cors.CORSMiddleware)
- **U7-13** allow_origin_regex 用正则匹配允许的源；allow_credentials 默认是 False；expose_headers 指示可以被浏览器访问的响应头。allow_methods 默认只有 ['GET']，要允许所有标准方法需显式设为 ['*']；max_age 的单位是秒（默认 600），不是毫秒。[原文§CORS（跨域资源共享） · 使用 CORSMiddleware](https://fastapi.tiangolo.com/zh/tutorial/cors/#use-corsmiddleware)
- **U7-14** 三个参数依次是：allow_origins（允许跨域请求的源列表）、allow_origin_regex（匹配允许源的正则表达式字符串）、max_age（浏览器缓存 CORS 响应的最长时间，单位秒）。[原文§CORS（跨域资源共享） · 使用 CORSMiddleware](https://fastapi.tiangolo.com/zh/tutorial/cors/#use-corsmiddleware)
- **U7-15** CORS 预检请求是带有 Origin 和 Access-Control-Request-Method 请求头的 OPTIONS 请求，CORSMiddleware 会拦截它并直接响应。B 描述的是简单请求；预检请求是 OPTIONS 请求且带有 Origin 请求头，所以 C、D 都不对。[原文§CORS（跨域资源共享） · CORS 预检请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#cors-preflight-requests)
- **U7-16** 一种是 CORS 预检请求（带有 Origin 和 Access-Control-Request-Method 请求头的 OPTIONS 请求）：中间件会拦截并直接响应，出于提供信息的目的返回带有适当 CORS headers 的 200 或 400 响应。另一种是简单请求（任何带有 Origin 请求头的请求）：中间件像平常一样把请求传下去，只是在响应中包含适当的 CORS headers。[原文§CORS（跨域资源共享） · CORS 预检请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#cors-preflight-requests) [原文§CORS（跨域资源共享） · 简单请求](https://fastapi.tiangolo.com/zh/tutorial/cors/#simple-requests)

### 后台任务

- **U7-17** 后台任务在返回响应后运行，适合需要在请求之后执行、但客户端不必等待的操作，例如发送邮件通知，或把收到的文件在后台慢慢处理并先返回 202 响应。A 是 lifespan 的用途，D 是中间件的用途，C 恰好相反：后台任务的结果进不了已返回的响应。[原文§后台任务](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#background-tasks)
- **U7-18** 首先导入 BackgroundTasks，并在路径操作函数中用类型声明 BackgroundTasks 定义一个参数；FastAPI 会创建一个 BackgroundTasks 对象并作为该参数传入，然后在函数里用 .add_task() 把任务函数加进去。其余做法分别属于中间件、lifespan 和 startup 事件，都不是添加后台任务的方式。[原文§后台任务 · 使用 BackgroundTasks](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#using-backgroundtasks) [原文§后台任务 · 添加后台任务](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#add-the-background-task)
- **U7-19** add_task() 接收：在后台运行的任务函数（如 write_notification）、按顺序传给任务函数的任意参数序列（位置参数）、传给任务函数的任意关键字参数，所以三个空依次是：任务函数、位置参数（参数序列）、关键字参数。[原文§后台任务 · 添加后台任务](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#add-the-background-task)
- **U7-20** 任务函数只是一个可以接收参数的标准函数，它可以是 async def 或普通的 def 函数，FastAPI 知道如何正确处理。示例里写文件的操作不使用 async 和 await，所以用普通 def 定义。[原文§后台任务 · 创建一个任务函数](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#create-a-task-function)
- **U7-21** BackgroundTasks 也适用于依赖注入，可以在路径操作函数、依赖、子依赖等多个级别声明；FastAPI 知道如何复用同一对象，所以所有后台任务被合并在一起并随后在后台运行。[原文§后台任务 · 依赖注入](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#dependency-injection)
- **U7-22** 如果需要执行繁重的后台计算，并且不一定需要由同一进程运行（例如不需要共享内存、变量），用 Celery 之类更大的工具可能更好：它们往往需要更复杂的配置和消息/作业队列管理器（如 RabbitMQ 或 Redis），但允许在多个进程甚至多台服务器中运行后台任务。如果需要从同一个 FastAPI 应用访问变量和对象，或者只是执行小型后台任务（如发送邮件通知），直接使用 BackgroundTasks 即可。[原文§后台任务 · 告诫](https://fastapi.tiangolo.com/zh/tutorial/background-tasks/#caveat)

### 生命周期事件

- **U7-23** lifespan 用来定义应用开始接收请求前只执行一次的启动逻辑，以及应用关闭时执行一次的关闭逻辑，适合设置在整个应用中共享、之后需要释放的资源，例如数据库连接池或共享的机器学习模型。模型在请求之间共享，并非每个请求或每个用户各一份；修改响应头是中间件的事。[原文§生命周期事件](https://fastapi.tiangolo.com/zh/advanced/events/#lifespan-events) [原文§生命周期事件 · 用例](https://fastapi.tiangolo.com/zh/advanced/events/#use-case) [原文§生命周期事件 · Lifespan](https://fastapi.tiangolo.com/zh/advanced/events/#lifespan)
- **U7-24** 放在模块顶部意味着即使只是运行一个简单的自动化测试也会加载模型，测试要等待模型加载完成而变慢。要解决的问题是：在应用开始接收请求之前加载模型，而不是在代码被加载时。模型本来就是在请求之间共享的，并非每个用户各自一份。[原文§生命周期事件 · 用例](https://fastapi.tiangolo.com/zh/advanced/events/#use-case)
- **U7-25** yield 之前的部分在应用启动前执行（例如加载模型），yield 之后的部分在应用完成请求处理后、即关闭之前执行（例如卸载模型、释放内存或 GPU）。它们只执行一次，不是每个请求各执行一次。[原文§生命周期事件 · 生命周期函数](https://fastapi.tiangolo.com/zh/advanced/events/#lifespan-function) [原文§生命周期事件 · Lifespan](https://fastapi.tiangolo.com/zh/advanced/events/#lifespan)
- **U7-26** FastAPI 的 lifespan 参数接受一个异步上下文管理器：带有 yield 的异步函数加上 @asynccontextmanager 装饰器，就被转化为异步上下文管理器，进入时执行 yield 之前的代码，离开时执行 yield 之后的代码。on_event 是另一套已不推荐的做法。[原文§生命周期事件 · 异步上下文管理器](https://fastapi.tiangolo.com/zh/advanced/events/#async-context-manager)
- **U7-27** 官方文档的警告：配置启动和关闭的推荐方法是使用 lifespan 参数；如果提供了 lifespan 参数，startup 和 shutdown 事件处理器将不再生效。要么使用 lifespan，要么配置所有事件，两者不能共用。事件处理器属于已不推荐的替代方式。[原文§生命周期事件 · 替代事件（弃用）](https://fastapi.tiangolo.com/zh/advanced/events/#alternative-events-deprecated)
- **U7-28** 启动和关闭的逻辑很可能是连在一起的，例如启动某个东西再结束它、获取一个资源再释放它。如果把它们放在不共享逻辑或变量的两个不同函数里，就比较困难，需要借助全局变量存值之类的方式；而 lifespan 把前后两段逻辑放在同一个带 yield 的函数里，所以官方推荐 lifespan，startup/shutdown 事件属于已弃用的替代方式。[原文§生命周期事件 · startup 和 shutdown 一起使用](https://fastapi.tiangolo.com/zh/advanced/events/#startup-and-shutdown-together) [原文§生命周期事件 · 替代事件（弃用）](https://fastapi.tiangolo.com/zh/advanced/events/#alternative-events-deprecated)

### 高级中间件

- **U7-29** 因为 FastAPI 基于 Starlette，且执行 ASGI 规范，所以可以使用任意 ASGI 中间件；中间件不必是专为 FastAPI 或 Starlette 定制的，只要遵循 ASGI 规范即可。[原文§高级中间件 · 添加 ASGI 中间件](https://fastapi.tiangolo.com/zh/advanced/middleware/#adding-asgi-middlewares)
- **U7-30** 三个中间件依次是：HTTPSRedirectMiddleware（强制 https 或 wss，http 或 ws 的请求会被重定向到安全方案）、TrustedHostMiddleware（强制请求正确设置 Host 请求头）、GZipMiddleware（处理 Accept-Encoding 包含 gzip 的请求）。[原文§高级中间件 · HTTPSRedirectMiddleware](https://fastapi.tiangolo.com/zh/advanced/middleware/#httpsredirectmiddleware) [原文§高级中间件 · TrustedHostMiddleware](https://fastapi.tiangolo.com/zh/advanced/middleware/#trustedhostmiddleware) [原文§高级中间件 · GZipMiddleware](https://fastapi.tiangolo.com/zh/advanced/middleware/#gzipmiddleware)
- **U7-31** TrustedHostMiddleware 用 allowed_hosts 列出允许的主机名（可用 *.example.com 这样的通配符匹配子域名）；如果传入的请求没有通过验证，则发送 400 响应。重定向到安全方案是 HTTPSRedirectMiddleware 的行为。[原文§高级中间件 · TrustedHostMiddleware](https://fastapi.tiangolo.com/zh/advanced/middleware/#trustedhostmiddleware)

### WebSockets

- **U7-32** 用 @app.websocket("/ws") 声明 WebSocket 路由，函数接收 WebSocket 参数，先 `await websocket.accept()`，之后在循环里用 `await websocket.receive_text()` 等待消息、`await websocket.send_text(...)` 发送消息；可以接收和发送二进制、文本和 JSON 数据。[原文§WebSockets · 创建 websocket](https://fastapi.tiangolo.com/zh/advanced/websockets/#create-a-websocket) [原文§WebSockets · 等待消息并发送消息](https://fastapi.tiangolo.com/zh/advanced/websockets/#await-for-messages-and-send-messages)
- **U7-33** 在 WebSocket 端点中同样可以使用 Depends、Security、Cookie、Header、Path、Query。但由于这是 WebSocket，抛出 HTTPException 并不合理，应当抛出 WebSocketException，并可以使用规范中定义的有效关闭代码（示例里是 `status.WS_1008_POLICY_VIOLATION`）。WebSocketDisconnect 是连接断开时由接收消息的调用引发的，不是用来拒绝连接的。[原文§WebSockets · 使用 Depends 和其他依赖项](https://fastapi.tiangolo.com/zh/advanced/websockets/#using-depends-and-others)
- **U7-34** 当 WebSocket 连接关闭时，`await websocket.receive_text()` 将引发 WebSocketDisconnect 异常，可以捕获并处理，例如把连接从活动连接列表里移除，再向其他客户端广播有人离开。[原文§WebSockets · 处理断开连接和多个客户端](https://fastapi.tiangolo.com/zh/advanced/websockets/#handling-disconnections-and-multiple-clients)
- **U7-35** 示例用一个 ConnectionManager 在 active_connections 列表中保存所有连接：连接时 accept 并加入列表，在端点里用 try/except 捕获 WebSocketDisconnect，断开时把连接从列表移除并向其他客户端广播离开的消息。局限是所有内容都在内存里以单个列表处理，只能在进程运行期间、且只能在单个进程中工作；需要更简单但更健壮、支持 Redis、PostgreSQL 等的方案，可以看 encode/broadcaster。[原文§WebSockets · 处理断开连接和多个客户端](https://fastapi.tiangolo.com/zh/advanced/websockets/#handling-disconnections-and-multiple-clients)

## 8. 项目结构、数据库、配置与测试

原文：[FastAPI 官方文档 · 更大的应用 - 多个文件](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/)。

### 更大的应用 - 多个文件

- **U8-1** `APIRouter` 可以视为一个“迷你 FastAPI”类，支持相同的 parameters、responses、dependencies、tags 等选项。它让你把某一类路径操作（例如与用户相关的）放进各自的模块，与其他代码分开、井井有条，而它们仍是同一个 FastAPI 应用的一部分，最后用 `app.include_router()` 加进主应用。[原文§更大的应用 - 多个文件 · APIRouter](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#apirouter)
- **U8-2** 四个参数是 `prefix`（路径前缀，例如 `/items`）、`tags`、`dependencies`、`responses`，它们帮助你避免在每个路径操作里重复声明。[原文§更大的应用 - 多个文件 · 其他使用 APIRouter 的模块](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#another-module-with-apirouter)
- **U8-3** 路由器的 `dependencies` 会加到它所有的路径操作上，并针对向它们发起的每个请求先于路径操作执行；和路径操作装饰器里的依赖项一样，没有值会传给路径操作函数。它可用来对一整组路径操作要求身份认证。[原文§更大的应用 - 多个文件 · 其他使用 APIRouter 的模块](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#another-module-with-apirouter)
- **U8-4** 路由器的依赖项最先执行，然后是路径操作装饰器中的 `dependencies`，再然后是普通的参数依赖项。[原文§更大的应用 - 多个文件 · 其他使用 APIRouter 的模块](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#another-module-with-apirouter)
- **U8-5** 在 `FastAPI(dependencies=[...])` 里声明的全局依赖项，会和每个 `APIRouter` 的依赖项组合在一起；它既不是被路由器的依赖项覆盖，也不是只管 `app` 自己的路径操作，更不必在每个路由器上重复声明。[原文§更大的应用 - 多个文件 · 导入 FastAPI](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#import-fastapi)
- **U8-6** 把 `prefix`、`tags`、`dependencies`、`responses` 作为参数传给 `app.include_router(admin.router, ...)`，不必修改原始的 `APIRouter`。这些设置只影响本应用中包含的这个路由器，原来的 `app/internal/admin.py` 仍可与组织内其他项目共享，其他项目甚至可以用不同的身份认证方法使用同一个 `APIRouter`。[原文§更大的应用 - 多个文件 · 包含一个有自定义 prefix、tags、responses 和 dependencies 的 APIRouter](https://fastapi.tiangolo.com/zh/tutorial/bigger-applications/#include-an-apirouter-with-a-custom-prefix-tags-responses-and-dependencies)

### SQL（关系型）数据库 · 含有单一模型的应用

- **U8-7** SQLModel 基于 SQLAlchemy 和 Pydantic 构建，旨在完美匹配需要使用 SQL 数据库的 FastAPI 应用程序。[原文§SQL（关系型）数据库](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#sql-relational-databases)
- **U8-8** `table=True` 告诉 SQLModel 这是一个表模型，它要表示 SQL 数据库中的一个表；不含 `table=True` 的类只是数据模型，实际上就是普通的 Pydantic 模型（附带一些小的额外功能）。[原文§SQL（关系型）数据库 · 创建模型](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-models)[原文§SQL（关系型）数据库 · 创建多个模型](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-multiple-models)
- **U8-9** `engine`（本质是 SQLAlchemy 的 engine）用来与数据库保持连接，只需构建一个，让所有代码连接到同一个数据库；`Session` 会存储内存中的对象并跟踪数据中所需的更改，再用 engine 与数据库通信，并且每个请求使用单独的一个。[原文§SQL（关系型）数据库 · 创建引擎（Engine）](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-an-engine)[原文§SQL（关系型）数据库 · 创建会话（Session）依赖项](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-a-session-dependency)
- **U8-10** `get_session` 用 `with Session(engine) as session:` 打开会话并 `yield session`，是一个带 `yield` 的 FastAPI 依赖项，为每个请求提供一个新的 `Session`，确保每个请求使用一个单独的会话。再用 `Annotated[Session, Depends(get_session)]` 定义 `SessionDep`，简化其他要用到它的代码。[原文§SQL（关系型）数据库 · 创建会话（Session）依赖项](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-a-session-dependency)
- **U8-11** 示例在应用启动事件里创建表；官方说在生产环境你可能会使用一个在启动应用程序之前运行的迁移脚本，SQLModel 将会拥有封装 Alembic 的迁移工具，但目前你可以直接使用 Alembic。[原文§SQL（关系型）数据库 · 在启动时创建数据库表](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-database-tables-on-startup)

### SQL（关系型）数据库 · 使用多个模型更新应用

- **U8-12** 只用一个 `Hero` 模型时，客户端可以自己决定要创建的 Hero 的 `id`，可能覆盖数据库里已分配的 id，而 id 应由后端或数据库来决定；同时 `secret_name` 被到处返回，就不再保密。所以增加了几个数据模型，并借助继承避免重复字段，以提高安全性和多功能性。[原文§SQL（关系型）数据库 · 使用多个模型更新应用](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#update-the-app-with-multiple-models)
- **U8-13** 正确的是 B、C、E：`HeroBase` 放共享字段，其他模型靠继承避免重复；`HeroPublic` 不含 `secret_name` 且 `id` 声明为 `int`（不会是 `None`）；`HeroUpdate` 的字段全是可选的，更新时只发想改的字段。A 错在 `HeroPublic` 是不带 `table=True` 的数据模型；D 错在 `HeroCreate` 的 `secret_name` 会存入数据库，但不会通过 API 返回给客户端。[原文§SQL（关系型）数据库 · HeroBase - 基类](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#herobase-the-base-class)[原文§SQL（关系型）数据库 · HeroPublic - 公共数据模型](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#heropublic-the-public-data-model)[原文§SQL（关系型）数据库 · HeroCreate - 用于创建 hero 的数据模型](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#herocreate-the-data-model-to-create-a-hero)[原文§SQL（关系型）数据库 · HeroUpdate - 用于更新 hero 的数据模型](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#heroupdate-the-data-model-to-update-a-hero)
- **U8-14** 路径操作函数里实际返回的是表模型 `Hero`，不是 `HeroPublic`；若声明 `-> HeroPublic`，编辑器和代码检查工具会（理所应当地）抱怨。用 `response_model=HeroPublic`，FastAPI 会用它验证和序列化数据，而不干扰类型注解以及编辑器和其他工具提供的帮助。[原文§SQL（关系型）数据库 · 使用 HeroCreate 创建并返回 HeroPublic](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#create-with-herocreate-and-return-a-heropublic)
- **U8-15** 使用 HTTP 的 PATCH 操作。取数据时用 `exclude_unset=True` 得到一个 dict，其中只含客户端发送的数据，排除仅作为默认值存在的值，这是最主要的技巧；再用 `hero_db.sqlmodel_update(hero_data)` 用这些数据更新数据库里的 hero。因为 `HeroUpdate` 的字段都是可选的，客户端只需发送想更新的字段。[原文§SQL（关系型）数据库 · 使用 HeroUpdate 更新单个 Hero](https://fastapi.tiangolo.com/zh/tutorial/sql-databases/#update-a-hero-with-heroupdate)

### 设置和环境变量

- **U8-16** 环境变量存在于 Python 之外，只能处理文本字符串，所以从中读到的任何值都是 `str`，到其他类型的转换和任何验证都必须在代码中完成；这正是要用 Pydantic 的 Settings 来处理的原因。[原文§设置和环境变量 · 类型和验证](https://fastapi.tiangolo.com/zh/advanced/settings/#types-and-validation)
- **U8-17** Pydantic 会以不区分大小写的方式读取环境变量（大写的 `APP_NAME` 也会用于属性 `app_name`），接着转换并验证数据，所以 `items_per_user` 会是 `int`；没有提供的设置则保持默认值。[原文§设置和环境变量 · 创建 Settings 对象](https://fastapi.tiangolo.com/zh/advanced/settings/#create-the-settings-object)
- **U8-18** 在某些情况下从依赖项中提供设置更有用，这在测试期间尤其有用：可以很容易地用自己的自定义设置覆盖该依赖项，例如创建依赖项覆盖，返回把 `admin_email` 换成测试值的 `Settings` 对象。[原文§设置和环境变量 · 在依赖项中提供设置](https://fastapi.tiangolo.com/zh/advanced/settings/#settings-in-a-dependency)[原文§设置和环境变量 · 设置与测试](https://fastapi.tiangolo.com/zh/advanced/settings/#settings-and-testing)
- **U8-19** 每次执行 `Settings()` 都会创建新对象并再次读取 `.env`，而读磁盘文件通常代价较高；不加缓存就会为每个请求都创建对象并读文件。加上 `@lru_cache` 后，`Settings` 对象只在第一次调用时创建，之后一遍遍返回同一个对象。`get_settings` 不接受参数，所以始终返回同一个值，行为几乎像全局变量，但它仍是依赖项函数，测试时可以很容易地覆盖。[原文§设置和环境变量 · 使用 lru_cache 仅创建一次 Settings](https://fastapi.tiangolo.com/zh/advanced/settings/#creating-the-settings-only-once-with-lru-cache)[原文§设置和环境变量 · lru_cache 技术细节](https://fastapi.tiangolo.com/zh/advanced/settings/#lru-cache-technical-details)

### 测试

- **U8-20** `TestClient` 基于 HTTPX（HTTPX 又是基于 Requests 设计的，所以用法相似），使用前要先 `uv add httpx` 安装 `httpx`；有了它就可以直接与 FastAPI 一起使用 pytest。[原文§测试](https://fastapi.tiangolo.com/zh/tutorial/testing/#testing)[原文§测试 · 使用 TestClient](https://fastapi.tiangolo.com/zh/tutorial/testing/#using-testclient)
- **U8-21** 测试函数是普通的 `def`，不是 `async def`；`client` 的调用也是普通调用，不用 `await`。这让你可以直接使用 pytest，而不会遇到麻烦。[原文§测试 · 使用 TestClient](https://fastapi.tiangolo.com/zh/tutorial/testing/#using-testclient)

### 使用覆盖测试依赖项

- **U8-22** 例如依赖项要调用外部第三方身份验证服务：对方可能按请求收费、耗时也更长，而测试不必每次都真的去调用，这时可以覆盖该依赖项，换成返回模拟测试用户的自定义依赖项。做法是：`app.dependency_overrides` 是一个字典，键是原依赖项（函数），值是覆盖依赖项（另一个函数），之后 FastAPI 就会调用覆盖依赖项，不再调用原依赖项。[原文§使用覆盖测试依赖项 · 用例：外部服务](https://fastapi.tiangolo.com/zh/advanced/testing-dependencies/#use-cases-external-service)[原文§使用覆盖测试依赖项 · 使用 app.dependency_overrides 属性](https://fastapi.tiangolo.com/zh/advanced/testing-dependencies/#use-the-app-dependency-overrides-attribute)
- **U8-23** FastAPI 应用中的任何位置都可以覆盖依赖项：原依赖项可用于路径操作函数、路径操作装饰器（不需要返回值时）、`.include_router()` 调用等，FastAPI 都可以覆盖这些位置的依赖项。[原文§使用覆盖测试依赖项 · 使用 app.dependency_overrides 属性](https://fastapi.tiangolo.com/zh/advanced/testing-dependencies/#use-the-app-dependency-overrides-attribute)
- **U8-24** 用 `app.dependency_overrides = {}` 把覆盖依赖项重置为空字典；如果只在某些测试时覆盖，可以在测试函数内开头设置覆盖，并在测试函数结尾重置覆盖依赖项。[原文§使用覆盖测试依赖项 · 使用 app.dependency_overrides 属性](https://fastapi.tiangolo.com/zh/advanced/testing-dependencies/#use-the-app-dependency-overrides-attribute)

### 异步测试

- **U8-25** 当测试里需要调用 async 函数（例如用异步数据库库验证后端是否写入了正确数据）时，测试函数本身必须是异步的。`TestClient` 内部靠一些“魔法”让你能在普通 `def` 测试里调用异步的 FastAPI 应用，但在异步函数里这种魔法不再生效，所以无法继续用它。`TestClient` 基于 HTTPX，可以直接用 HTTPX 的 `AsyncClient`（配合 `ASGITransport(app=app)`），用 `await` 发送请求来测试 API。[原文§异步测试 · HTTPX](https://fastapi.tiangolo.com/zh/advanced/async-tests/#httpx)[原文§异步测试 · 示例](https://fastapi.tiangolo.com/zh/advanced/async-tests/#example)
- **U8-26** AnyIO 提供了一个插件，允许我们指定某些测试函数要异步调用；`@pytest.mark.anyio` 标记就是告诉 pytest 该测试函数应该被异步调用，这样测试函数才能写成 `async def` 并在里面使用 `await`。[原文§异步测试 · pytest.mark.anyio](https://fastapi.tiangolo.com/zh/advanced/async-tests/#pytest-mark-anyio)[原文§异步测试 · 详细说明](https://fastapi.tiangolo.com/zh/advanced/async-tests/#in-detail)
- **U8-27** `AsyncClient` 不会触发应用的生命周期事件；为了确保它们被触发，要使用 florimondmanca/asgi-lifespan 中的 `LifespanManager`。[原文§异步测试 · 详细说明](https://fastapi.tiangolo.com/zh/advanced/async-tests/#in-detail)

## 9. 部署

原文：[FastAPI 官方文档 · 部署概念](https://fastapi.tiangolo.com/zh/deployment/concepts/)。

### 部署概念

- **U9-1** 六个概念是：安全性 - HTTPS、启动时运行、重新启动、复制（运行的进程数）、内存、启动前的先前步骤。[原文§部署概念 · 部署概念](https://fastapi.tiangolo.com/zh/deployment/concepts/#deployments-concepts)
- **U9-2** HTTPS 通常由应用程序服务器之外的组件（TLS 终止代理）提供，并且还要有组件负责更新 HTTPS 证书，可以是同一个组件，也可以是不同的组件。A 错在应用自身并不负责 HTTPS；C 的 Systemd、Supervisor 是负责启动时运行与重启的工具，D 的进程管理器负责把请求转给 worker，都不是 HTTPS 的提供者。[原文§部署概念 · 安全性 - HTTPS](https://fastapi.tiangolo.com/zh/deployment/concepts/#security-https)[原文§部署概念 · 启动时运行的示例工具](https://fastapi.tiangolo.com/zh/deployment/concepts/#example-tools-to-run-at-startup)[原文§部署概念 · 多进程 - 一个例子](https://fastapi.tiangolo.com/zh/deployment/concepts/#multiple-processes-an-example)
- **U9-3** 进程特指在操作系统中运行的特定程序，不是文件也不是代码，而是操作系统正在执行和管理的东西，同一个程序可以同时有多个进程（例如浏览器通常每个标签页一个进程）。A、B 是“程序”一词的另外两种含义（代码、可执行文件），C 与“同一程序可以有多个进程”相反。[原文§部署概念 · 什么是程序](https://fastapi.tiangolo.com/zh/deployment/concepts/#what-is-a-program)[原文§部署概念 · 什么是进程](https://fastapi.tiangolo.com/zh/deployment/concepts/#what-is-a-process)
- **U9-4** 手动运行时，如果与服务器的连接丢失，正在运行的进程可能终止；服务器重启（例如更新后或迁移后）时你也可能没注意到，API 就会一直处于挂掉的状态。所以通常要有一个单独的程序（如 Docker、Kubernetes、Docker Compose、Systemd、Supervisor 等）在服务器启动时自动运行服务器程序，不需要人为干预。[原文§部署概念 · 在远程服务器中](https://fastapi.tiangolo.com/zh/deployment/concepts/#in-a-remote-server)[原文§部署概念 · 启动时自动运行](https://fastapi.tiangolo.com/zh/deployment/concepts/#run-automatically-on-startup)
- **U9-5** FastAPI 通常把错误限制在触发它的单个请求里，该请求的客户端收到 500 内部服务器错误，应用继续处理下一个请求；只有在某些情况下，代码才会导致整个应用崩溃（Uvicorn 和 Python 一起崩溃）。B 把“某些情况”说成了“任何 bug”，C、D 描述的行为文中都没有出现。[原文§部署概念 · 自动处理小错误](https://fastapi.tiangolo.com/zh/deployment/concepts/#small-errors-automatically-handled)[原文§部署概念 · 更大的错误 - 崩溃](https://fastapi.tiangolo.com/zh/deployment/concepts/#bigger-errors-crashes)
- **U9-6** 进程崩溃时，运行同一应用的 Uvicorn 和 Python 已经崩溃了，同一应用的代码里没有任何东西能对此做什么，所以需要外部组件来负责重启（通常就是负责启动时运行的那个工具，如 Docker、Kubernetes、Systemd、Supervisor）。500 错误属于只影响单个请求的小错误，与崩溃重启无关；文档也提示，如果应用一启动就立刻崩溃，永远重启它没有意义；重启组件并不会修复 bug。[原文§部署概念 · 崩溃后重新启动](https://fastapi.tiangolo.com/zh/deployment/concepts/#restart-after-crash)[原文§部署概念 · 自动重新启动的示例工具](https://fastapi.tiangolo.com/zh/deployment/concepts/#example-tools-to-restart-automatically)
- **U9-7** 服务器上同一个 IP 和端口的组合只能有一个进程监听，所以必须有一个单个进程（例如 Uvicorn 的管理器进程）监听端口，再把通信转发给各个工作进程；真正运行应用、执行主要计算并加载你放进内存的内容的是这些工作进程。[原文§部署概念 · 工作进程和端口](https://fastapi.tiangolo.com/zh/deployment/concepts/#worker-processes-and-ports)[原文§部署概念 · 多进程 - 一个例子](https://fastapi.tiangolo.com/zh/deployment/concepts/#multiple-processes-an-example)
- **U9-8** 多个进程通常不共享任何内存，每个进程都有自己的变量和内存，所以 1 GB 的模型在 4 个 worker 下总共约消耗 4 GB；如果服务器只有 3 GB 内存，就会出问题。A 说共享内存，与原文相反；B、D 原文都没有这种说法。[原文§部署概念 · 每个进程的内存](https://fastapi.tiangolo.com/zh/deployment/concepts/#memory-per-process)[原文§部署概念 · 服务器内存](https://fastapi.tiangolo.com/zh/deployment/concepts/#server-memory)
- **U9-9** 这类前置步骤大多只需要执行一次，所以应由单个进程在启动应用之前完成。如果由多个进程运行，它们会并行重复工作，像数据库迁移这样需要小心处理的步骤还可能导致彼此冲突；当然，多次运行也没有问题的前置步骤就好办得多。[原文§部署概念 · 启动之前的步骤](https://fastapi.tiangolo.com/zh/deployment/concepts/#previous-steps-before-starting)

### 手动运行服务器

- **U9-10** FastAPI 本质上是 ASGI Web 框架，要在远程服务器上运行就需要 ASGI 服务器程序，Uvicorn 就是 fastapi 命令默认使用的那个；安装 FastAPI 时还自带一个可用于生产环境的 Uvicorn。B 把框架说成了服务器，C 是代理的职责，D 与“自带生产环境服务器”相反。[原文§手动运行服务器 · ASGI 服务器](https://fastapi.tiangolo.com/zh/deployment/manually/#asgi-servers)[原文§手动运行服务器 · 安装服务器程序](https://fastapi.tiangolo.com/zh/deployment/manually/#install-the-server-program)
- **U9-11** 官方文档列出的 ASGI 服务器有：Uvicorn（高性能 ASGI 服务器）、Hypercorn（兼容 HTTP/2 和 Trio 等）、Daphne（为 Django Channels 构建）、Granian（基于 Rust 的 HTTP 服务器）。Traefik 和 Caddy 是可用作 TLS 终止代理的工具，不是 ASGI 服务器。[原文§手动运行服务器 · ASGI 服务器](https://fastapi.tiangolo.com/zh/deployment/manually/#asgi-servers)[原文§部署概念 · HTTPS 示例工具](https://fastapi.tiangolo.com/zh/deployment/concepts/#example-tools-for-https)
- **U9-12** 第一个空：main.py 文件（即 Python 模块）；第二个空：main.py 中通过 `app = FastAPI()` 创建的对象。整条命令等价于 `from main import app`。[原文§手动运行服务器 · 运行服务器程序](https://fastapi.tiangolo.com/zh/deployment/manually/#run-the-server-program)
- **U9-13** Uvicorn 和其他服务器支持 `--reload`，它在开发过程中非常有用，但会消耗更多资源且相对不稳定，所以生产环境中不应该使用。C 与原文相反（原文说 Uvicorn 和其他服务器都支持）；D 说的是 `--workers` 的作用。[原文§手动运行服务器 · 运行服务器程序](https://fastapi.tiangolo.com/zh/deployment/manually/#run-the-server-program)[原文§服务器工作进程（Workers） · 多个工作进程](https://fastapi.tiangolo.com/zh/deployment/server-workers/#multiple-workers)

### 服务器工作进程（Workers）

- **U9-14** `--workers` 让 Uvicorn 启动指定数量的工作进程，并行执行应用、利用多核 CPU 处理更多请求，而 fastapi 命令默认是单进程模式。它主要有助于“复制”这个部署概念，对重启只有一点帮助，HTTPS、启动时运行、内存、前置步骤等仍要另外处理。A 说的是多台服务器，B 是 `--reload`，C 是 `--forwarded-allow-ips`。[原文§服务器工作进程（Workers） · 多个工作进程](https://fastapi.tiangolo.com/zh/deployment/server-workers/#multiple-workers)[原文§服务器工作进程（Workers） · 部署概念](https://fastapi.tiangolo.com/zh/deployment/server-workers/#deployment-concepts)[原文§使用代理 · 启用代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers)

### 容器中的 FastAPI - Docker

- **U9-15** Linux 容器复用宿主机的同一个 Linux 内核，而不是像虚拟机那样模拟整个操作系统，所以资源消耗很少，大致相当于直接运行进程。A 与此相反；容器有各自隔离的文件系统和网络（B 错）；容器是把应用及其所有依赖和必要文件一起打包（D 错）。[原文§容器中的 FastAPI - Docker · 什么是容器](https://fastapi.tiangolo.com/zh/deployment/docker/#what-is-a-container)
- **U9-16** 容器镜像是容器中所有文件、环境变量和默认命令的静态版本，本身不在运行；容器是从镜像启动的运行实例，运行时创建或修改的内容只存在于该容器中，不会写回镜像。容器只有在有进程（通常是主进程）运行时才处于运行状态，主进程停止，容器也就停止，所以 D 错；B 把两者说反了。[原文§容器中的 FastAPI - Docker · 什么是容器镜像](https://fastapi.tiangolo.com/zh/deployment/docker/#what-is-a-container-image)[原文§容器中的 FastAPI - Docker · 容器与进程](https://fastapi.tiangolo.com/zh/deployment/docker/#containers-and-processes)
- **U9-17** Docker 按 Dockerfile 的顺序逐层构建，并且会重用上次构建中文件没有变化的那一层。依赖文件不常变化，先单独复制它，该步骤就能使用缓存，下一步下载并安装依赖也能使用缓存，把几分钟的安装缩短到几秒；而应用代码是变化最频繁的部分，放在靠后的位置，只有它之后的步骤用不到缓存，从而缩短反复构建镜像的时间。[原文§容器中的 FastAPI - Docker · Docker 缓存](https://fastapi.tiangolo.com/zh/deployment/docker/#docker-cache)[原文§容器中的 FastAPI - Docker · Dockerfile](https://fastapi.tiangolo.com/zh/deployment/docker/#dockerfile)
- **U9-18** 官方文档要求务必始终使用 `CMD` 的 exec 形式（例如 `CMD ["fastapi", "run", "app/main.py", "--port", "80"]`），以确保 FastAPI 可以优雅停机并触发生命周期事件，不要使用 shell 形式。使用 docker compose 时这一点尤为明显，但并不是只有那时才需要，所以 C 错。[原文§容器中的 FastAPI - Docker · 使用 CMD - Exec 形式](https://fastapi.tiangolo.com/zh/deployment/docker/#use-cmd-exec-form)
- **U9-19** 在 Nginx 或 Traefik 等 TLS 终止代理（负载均衡器）后面运行容器时，要添加 `--proxy-headers`，它通过 FastAPI CLI 告诉 Uvicorn 处理代理发送的标头，从而知道应用运行在 HTTPS 之后等；只有来自可信来源（用 `--forwarded-allow-ips` 配置）的转发标头才会被采用。A 是多进程选项，C 是开发时的自动重载，D 的 `--port` 是应用自己监听的端口，都不是用来处理代理标头的。（原文只写“信任代理发送的标头”，没有提可信来源；代理与应用不在同一台机器或容器时，还要用 `--forwarded-allow-ips` 配置可信地址。）[原文§容器中的 FastAPI - Docker · 在 TLS 终止代理后面](https://fastapi.tiangolo.com/zh/deployment/docker/#behind-a-tls-termination-proxy) [原文§使用代理 · 启用代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers) [核对来源：Uvicorn 设置 · HTTP](https://uvicorn.dev/settings/#http)
- **U9-20** 使用容器时，通常有某个组件监听主端口，承接请求的负载并（期望）均衡地分发给各个应用容器，所以也常被称为负载均衡器；用于 HTTPS 的 TLS 终止代理组件通常也会是负载均衡器。A 运行的是应用，B 是静态的打包文件，C 是容器内启动多个 worker 的方式，都不负责在多个容器之间分发请求。[原文§容器中的 FastAPI - Docker · 负载均衡器](https://fastapi.tiangolo.com/zh/deployment/docker/#load-balancer)
- **U9-21** 在集群层面处理复制时，应让每个容器只运行一个 Uvicorn 进程，靠集群内置的容器复制和负载均衡来扩展；不要在容器内再用 `--workers` 或进程管理器，那只会引入不必要的复杂性。D 与“每个进程有自己的内存”不符。[原文§容器中的 FastAPI - Docker · 每个容器一个进程](https://fastapi.tiangolo.com/zh/deployment/docker/#one-process-per-container)[原文§容器中的 FastAPI - Docker · 复制 - 进程数](https://fastapi.tiangolo.com/zh/deployment/docker/#replication-number-of-processes)
- **U9-22** 官方文档列出的特殊情况有：应用足够简单，可在单台服务器（不是集群）上运行；用 Docker Compose 部署到单台服务器，不容易在保留共享网络与负载均衡的同时管理容器复制，这时可用单个容器加进程管理器启动多个 worker。C 是应在集群层面复制、每个容器一个进程的情形；D 恰恰是每个容器只有一个进程的好处。[原文§容器中的 FastAPI - Docker · 具有多个进程和特殊情况的容器](https://fastapi.tiangolo.com/zh/deployment/docker/#containers-with-multiple-processes-and-special-cases)
- **U9-23** 每个容器只运行一个进程时，它的内存消耗更容易定义、较为稳定且有限，你可以在 Kubernetes 等容器管理系统的配置里设置同样的内存限制与需求，让它在可用机器上复制容器。如果使用大量内存（例如机器学习模型），仍应检查内存消耗并调整每台机器上的容器数量，所以 D 错；多个进程通常不共享内存，B 也错。[原文§容器中的 FastAPI - Docker · 内存](https://fastapi.tiangolo.com/zh/deployment/docker/#memory)
- **U9-24** 有多个容器时，可以用一个单独的容器运行一个进程来执行前置步骤，完成之后再启动复制的 worker 容器。只有当并行多次运行没有问题（例如只是检查数据库是否就绪）时，才可以把这些步骤放进每个容器，所以 A 对数据库迁移不合适；B、C 文中没有这样的做法。（原文说在 Kubernetes 中这个单独的容器通常是 Init Container；但 Init Container 是按 Pod 运行的，每个副本 Pod 都会各自执行一次，Pod 重建时还可能再执行，不能保证所有副本只执行一次迁移，需要由部署流程另行协调。）[原文§容器中的 FastAPI - Docker · 多个容器](https://fastapi.tiangolo.com/zh/deployment/docker/#multiple-containers) [核对来源：Kubernetes 文档 · Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#detailed-behavior)

### 使用代理

- **U9-25** 三个请求头是：X-Forwarded-For（原始客户端的 IP 地址）、X-Forwarded-Proto（原始协议，如 https）、X-Forwarded-Host（原始主机，如 mysuperapp.com）。[原文§使用代理 · 代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-forwarded-headers)[原文§使用代理 · 代理转发请求头如何工作](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#how-proxy-forwarded-headers-work)
- **U9-26** 代理转发的请求头会让服务器知道原始的公网 URL、域名和是否使用 HTTPS，但出于安全考虑，服务器并不知道自己处在受信任的代理之后，所以不能直接采用任意来源的这些请求头，要用 `--forwarded-allow-ips` 显式配置可信的代理地址。B、C、D 在文中都没有这样的原因。（原文写服务器默认不会解析这些请求头、需要显式启用；Uvicorn 实际默认开启转发头处理，只是默认只采用来自本机回环地址的转发头。）[原文§使用代理 · 代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-forwarded-headers) [原文§使用代理 · 启用代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers) [核对来源：Uvicorn 设置 · HTTP](https://uvicorn.dev/settings/#http)
- **U9-27** `--forwarded-allow-ips` 传入应被信任、允许读取转发请求头的 IP 地址列表，设为 `"*"` 就是信任所有来源 IP；如果服务器位于受信任的代理之后且只有代理与它通信，这相当于接受该代理的任何 IP。B 说的是监听 0.0.0.0，是另一回事；D 与它的作用相反。[原文§使用代理 · 启用代理转发的请求头](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#enable-proxy-forwarded-headers)
- **U9-28** 应用只声明了 `/items/` 时，访问 `/items` 会被重定向。没有启用代理转发的请求头时，服务器不知道原始的公网地址和协议，重定向可能指向 http://localhost:8000/items/，而应用实际托管在 https://mysuperapp.com，应该重定向到 https://mysuperapp.com/items/。用 `--forwarded-allow-ips` 把代理配置为可信来源后，服务器信任并使用代理加上的 X-Forwarded-* 请求头，就能生成指向正确公网地址的重定向。[原文§使用代理 · 使用 HTTPS 的重定向](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#redirects-with-https)[原文§使用代理 · 代理转发请求头如何工作](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#how-proxy-forwarded-headers-work)
- **U9-29** 这种代理在顶层给应用加一个路径前缀（例如 /api/v1），转发给服务器之前再把前缀移除，所以应用代码里仍只声明 /app。这时文档界面（在浏览器中运行的前端）会去请求 /openapi.json，而不是 /api/v1/openapi.json，拿不到 OpenAPI 模式；需要用 `root_path`（ASGI 规范提供的机制）告诉应用前缀，文档界面才能找到正确的位置。[原文§使用代理 · 移除路径前缀的代理](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-with-a-stripped-path-prefix)
- **U9-30** 第一个空：命令行选项 `--root-path`（例如 `fastapi run main.py --root-path /api/v1`）；第二个空：参数 `root_path`（例如 `FastAPI(root_path="/api/v1")`），两者等价。[原文§使用代理 · 提供 root_path](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#providing-the-root-path)[原文§使用代理 · 在 FastAPI 应用中设置 root_path](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#setting-the-root-path-in-the-fastapi-app)
- **U9-31** 已把 root_path 配置为 /api/v1 时，FastAPI 用 root_path 在 OpenAPI 模式中创建默认的 server，url 取自 root_path（即 /api/v1），文档界面据此通过代理的前缀访问，所以通过 /api/v1/docs 打开文档能正常工作。A、C、D 文中都没有这样的机制。[原文§使用代理 · 查看文档界面](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#check-the-docs-ui)[原文§使用代理 · 移除路径前缀的代理](https://fastapi.tiangolo.com/zh/advanced/behind-a-proxy/#proxy-with-a-stripped-path-prefix)
