# 计算机网络面试题 原文章节摘编

仅依据各题所列的小林coding原文小节整理；本文件只整理原文口径，不作现行规格认证。原文未覆盖的部分不出题，不使用其他网站补充。整理日期：2026-10-15。

## 1. 网络模型

原文：[计算机网络面试题 · 网络模型](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9E%8B)。

### 网络OSI模型和TCP/IP模型分别介绍一下

- **T1-1** OSI 模型主要有 7 层，从上到下依次是应用层、表示层、会话层、传输层、网络层、数据链路层和物理层，所以三个空依次是：表示层、会话层、数据链路层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-2** 为了使多种设备能通过网络相互通信，并解决各种不同设备在网络互联中的兼容性问题，国际标准化组织制定了开放式系统互联通信参考模型，也就是 OSI 网络模型。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-3** 表示层负责把数据转换成兼容另一个系统能识别的格式；会话层负责建立、管理和终止通信会话，应用层负责给应用程序提供统一的接口，数据链路层负责封帧、差错检测和 MAC 寻址。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-4** 会话层负责建立、管理和终止表示层实体之间的通信会话；表示层负责数据格式转换，传输层负责端到端的数据传输，网络层负责数据的路由、转发和分片。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-5** 网络层负责数据的路由、转发、分片；传输层负责端到端的数据传输，数据链路层负责封帧、差错检测和 MAC 寻址，物理层负责在物理介质上传输比特流。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-6** 数据链路层负责数据的封帧和差错检测，以及 MAC 寻址。路由和转发属于网络层，建立、管理和终止通信会话属于会话层，给应用程序提供统一的接口属于应用层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-7** 应用层负责给应用程序提供统一的接口，传输层负责端到端的数据传输，物理层负责在物理介质上传输比特流（bit stream）。三个空依次是：应用层、传输层、物理层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-8** 由于 OSI 模型实在太复杂，提出的也只是概念理论上的分层，并没有提供具体的实现方案；实际上比较常见、也比较实用的是四层的 TCP/IP 网络模型。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-9** TCP/IP 四层网络模型比较常见也比较实用，Linux 系统正是按照这套网络模型来实现网络协议栈的。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-10** TCP/IP 网络通常由上到下分成 4 层，依次是应用层、传输层、网络层和网络接口层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-11** TCP/IP 模型把 OSI 模型中的应用层、表示层和会话层合并成应用层，所以三个空是：应用层、表示层、会话层（顺序不限）。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-12** TCP/IP 模型把 OSI 模型中数据链路层和物理层的功能放到网络接口层，所以两个空是：数据链路层、物理层（顺序不限）。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-13** 应用层支持 HTTP、SMTP 等最终用户进程，传输层通过端口号提供进程到进程的通信（TCP、UDP），网络层负责寻址和路由数据包（IP 协议），网络接口层负责在相邻节点之间传输数据，包括封帧、MAC 寻址和物理传输。四个空依次是：应用层、传输层、网络层、网络接口层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T1-14** 原文指出，实际通信时网络接口层可以使用以太网、Wi-Fi 等技术。HTTP、SMTP 属于应用层支持的协议，TCP、UDP 属于传输层。[原文§网络OSI模型和TCP/IP模型分别介绍一下](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9Cosi%E6%A8%A1%E5%9E%8B%E5%92%8Ctcp-ip%E6%A8%A1%E5%9E%8B%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)

### tcp、ip分别位于哪一层？

- **T1-15** TCP 位于传输层。[原文§tcp、ip分别位于哪一层？](https://xiaolincoding.com/interview/network.html#tcp%E3%80%81ip%E5%88%86%E5%88%AB%E4%BD%8D%E4%BA%8E%E5%93%AA%E4%B8%80%E5%B1%82)
- **T1-16** IP 位于网络层。[原文§tcp、ip分别位于哪一层？](https://xiaolincoding.com/interview/network.html#tcp%E3%80%81ip%E5%88%86%E5%88%AB%E4%BD%8D%E4%BA%8E%E5%93%AA%E4%B8%80%E5%B1%82)

## 2. 应用层

原文：[计算机网络面试题 · 应用层](https://xiaolincoding.com/interview/network.html#%E5%BA%94%E7%94%A8%E5%B1%82)。

### 应用层有哪些协议？

- **T2-1** 常见的应用层协议有 HTTP、DNS、FTP、SMTP、SSH、WebSocket 等，HTTPS 则是在 HTTP 通信中加入 TLS 安全保护，所以它不是与 HTTP 无关的独立协议，也不是在 DNS 或 FTP 上加 TLS。[原文§应用层有哪些协议？](https://xiaolincoding.com/interview/network.html#%E5%BA%94%E7%94%A8%E5%B1%82%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8D%8F%E8%AE%AE)
- **T2-2** CDN 容易被误当成应用层协议，其实它是内容分发网络，是一种加速服务的架构，不是一种协议；它通常结合 DNS 调度、HTTP 缓存和边缘节点来提供服务。[原文§应用层有哪些协议？](https://xiaolincoding.com/interview/network.html#%E5%BA%94%E7%94%A8%E5%B1%82%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8D%8F%E8%AE%AE)

### HTTP报文有哪些部分？

- **T2-3** 依次是：请求行（请求方法、请求目标和 HTTP 协议版本）、请求头部（如 Host、User-Agent、Content-Type 等）、空行（分隔请求头部和请求体）、请求体（可选，通常用于 POST 请求等需要传输数据的情况）。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-4** 依次是：状态行（HTTP 协议版本、状态码和状态信息）、响应头部（如 Content-Type、Content-Length 等）、空行（分隔响应头部和响应体）、响应体（服务器返回的 HTML、JSON 等内容）。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-5** 请求行包含请求方法、请求目标（URL 或 URI）和 HTTP 协议版本；Host、User-Agent、Content-Type 等附加信息在请求头部，POST 等请求传输的数据在请求体，HTTP 协议版本、状态码和状态信息则是响应报文状态行的内容。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-6** 状态行包含 HTTP 协议版本、状态码和状态信息；Content-Type、Content-Length 等附加信息在响应头部，HTML、JSON 等内容在响应体，请求方法和请求目标属于请求行。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-7** 请求头部和请求体之间、响应头部和响应体之间都用空行分隔，空行的作用就是分隔头部和报文体，它不表示报文体长度，也不表示连接结束。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-8** 请求体是可选的，包含请求的数据，通常用于 POST 请求等需要传输数据的情况；它位于空行之后，Host 等信息放在请求头部。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)
- **T2-9** 原文以 HTTP/1.1 为例讲解报文结构，并说明 HTTP/2 和 HTTP/3 使用帧来传递报文，不能直接套用 HTTP/1.1 的文本格式。[原文§HTTP报文有哪些部分？](https://xiaolincoding.com/interview/network.html#http%E6%8A%A5%E6%96%87%E6%9C%89%E5%93%AA%E4%BA%9B%E9%83%A8%E5%88%86)

### HTTP常用的状态码？

- **T2-10** 依次是：1xx 提示信息（请求还在处理中，如 100 Continue）；2xx 成功处理请求（如 200 OK）；3xx 需要进一步操作（如重定向，或使用已经缓存的资源）；4xx 请求存在问题（如参数错误、身份认证失败或资源不存在）；5xx 服务器处理请求时发生错误（也包括网关访问上游服务失败）。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-11** 304 Not Modified 表示协商缓存命中，客户端使用本地缓存的响应体。它属于 3xx，但原文特别提醒：304 并不是跳转到另一个 URL。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-12** 201 Created 表示成功创建资源，204 No Content 表示请求成功但是没有响应体；成功返回部分资源是 206，协商缓存命中是 304。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-13** 206 Partial Content 表示成功返回部分资源，常用于断点续传。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-14** 401 Unauthorized 表示缺少有效的身份凭证；403 Forbidden 表示服务器拒绝访问，常见于权限不足。400 是请求格式等有问题，404 是资源不存在，429 是请求过于频繁被限流，503 是服务暂时不可用。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-15** 404 Not Found 表示资源不存在，405 Method Not Allowed 表示资源不支持该请求方法，429 Too Many Requests 表示请求过于频繁、被限流了；400 Bad Request 表示请求格式等有问题，服务器内部错误是 500。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)
- **T2-16** 503 Service Unavailable 表示服务暂时不可用；服务器内部错误是 500，网关访问上游失败或收到无效响应是 502，网关等待上游响应超时是 504。[原文§HTTP常用的状态码？](https://xiaolincoding.com/interview/network.html#http%E5%B8%B8%E7%94%A8%E7%9A%84%E7%8A%B6%E6%80%81%E7%A0%81)

### HTTP返回状态301 302分别是什么？

- **T2-17** 301 Moved Permanently 是永久重定向，表示资源以后应该使用新的 URL 访问，比如网站更换了域名；302 Found 是临时重定向，表示这次先去另一个 URL，但以后仍然可以使用原来的地址，比如用户未登录时跳转到登录页。[原文§HTTP返回状态301 302分别是什么？](https://xiaolincoding.com/interview/network.html#http%E8%BF%94%E5%9B%9E%E7%8A%B6%E6%80%81301-302%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-18** 301 和 302 都是重定向状态码，通常通过响应头里的 Location 告诉客户端新的地址。[原文§HTTP返回状态301 302分别是什么？](https://xiaolincoding.com/interview/network.html#http%E8%BF%94%E5%9B%9E%E7%8A%B6%E6%80%81301-302%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-19** 302 Found 是临时重定向，表示这次先去另一个 URL，但以后仍然可以使用原来的地址，用户未登录时跳转到登录页就是原文的例子；网站更换了域名这类永久迁移才用 301。[原文§HTTP返回状态301 302分别是什么？](https://xiaolincoding.com/interview/network.html#http%E8%BF%94%E5%9B%9E%E7%8A%B6%E6%80%81301-302%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-20** 原文指出，对于 301 和 302，浏览器可能把 POST 改成 GET。[原文§HTTP返回状态301 302分别是什么？](https://xiaolincoding.com/interview/network.html#http%E8%BF%94%E5%9B%9E%E7%8A%B6%E6%80%81301-302%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-21** 可以使用 307 临时重定向或者 308 永久重定向，这样重定向后会保留原来的请求方法和请求体。[原文§HTTP返回状态301 302分别是什么？](https://xiaolincoding.com/interview/network.html#http%E8%BF%94%E5%9B%9E%E7%8A%B6%E6%80%81301-302%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### http 502和 504 的区别？

- **T2-22** 502 Bad Gateway：作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应；504 Gateway Time-out：作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器收到响应。以 nginx 为代理、后端为 tomcat 等为例：当 nginx 收到了无效的响应时返回 502；当 nginx 超过自己配置的等待时间还没有收到上游的响应时返回 504。[原文§http 502和 504 的区别？](https://xiaolincoding.com/interview/network.html#http-502%E5%92%8C-504-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-23** 代理服务器从上游服务器接收到无效响应时，返回 502 Bad Gateway。[原文§http 502和 504 的区别？](https://xiaolincoding.com/interview/network.html#http-502%E5%92%8C-504-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-24** 代理服务器超过自己配置的等待时间还没有收到上游的响应时，返回 504 Gateway Time-out。[原文§http 502和 504 的区别？](https://xiaolincoding.com/interview/network.html#http-502%E5%92%8C-504-%E7%9A%84%E5%8C%BA%E5%88%AB)

### HTTP层请求的类型有哪些？

- **T2-25** 依次是 GET（请求获取指定资源，通常用于获取数据）、POST（向服务器提交数据，通常用于提交表单数据或进行资源的创建）、PUT（向服务器更新指定资源，通常用于更新已存在的资源）、DELETE（请求服务器删除指定资源）。[原文§HTTP层请求的类型有哪些？](https://xiaolincoding.com/interview/network.html#http%E5%B1%82%E8%AF%B7%E6%B1%82%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)
- **T2-26** HEAD 的语义与 GET 类似，但响应没有响应体，用于获取资源的元数据。删除指定资源是 DELETE，局部修改是 PATCH，查询通信选项是 OPTIONS。[原文§HTTP层请求的类型有哪些？](https://xiaolincoding.com/interview/network.html#http%E5%B1%82%E8%AF%B7%E6%B1%82%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)
- **T2-27** PATCH 用于对资源进行局部修改；PUT 用于向服务器更新指定资源，通常用于更新已存在的资源。[原文§HTTP层请求的类型有哪些？](https://xiaolincoding.com/interview/network.html#http%E5%B1%82%E8%AF%B7%E6%B1%82%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)
- **T2-28** OPTIONS 用于查询资源支持的通信选项，浏览器的 CORS 预检请求也会用到它。[原文§HTTP层请求的类型有哪些？](https://xiaolincoding.com/interview/network.html#http%E5%B1%82%E8%AF%B7%E6%B1%82%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)
- **T2-29** GET 用于请求获取指定资源，POST 用于向服务器提交数据（如提交表单、创建资源），DELETE 用于请求服务器删除指定资源；PUT 用于向服务器更新指定资源，对资源进行局部修改的是 PATCH。[原文§HTTP层请求的类型有哪些？](https://xiaolincoding.com/interview/network.html#http%E5%B1%82%E8%AF%B7%E6%B1%82%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)

### GET和POST的使用场景，有哪些区别？

- **T2-30** 根据 RFC 规范，GET 的语义是从服务器获取指定的资源，这个资源可以是静态的文本、页面、图片视频等；POST 的语义是根据请求负荷（报文 body）对指定的资源做出处理，具体的处理方式视资源类型而不同。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-31** GET 请求的参数一般写在 URL 的查询字符串中，中文等字符可以经过百分号编码后传输，并不是只能传 ASCII 内容；写在报文 body 中是 POST 的常见做法。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-32** HTTP 没有统一规定 URL 的最大长度，但浏览器、代理和服务器通常都有各自的限制。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-33** POST 请求携带数据的位置一般是报文 body，body 中的数据可以是任意格式的数据，只要客户端与服务端协商好即可；HTTP 同样没有统一规定 body 的最大大小，但客户端、网关和服务端可以配置大小限制，比如上传文件过大时可能收到 413。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-34** 「幂等」表示执行一次和执行多次，对服务器产生的预期效果相同，并不是每次返回的内容都必须相同。「请求的语义不要求修改服务器资源」说的是「安全」，传输保密则要靠 HTTPS。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-35** 「安全」表示请求的语义不要求修改服务器资源；执行一次和执行多次效果相同说的是「幂等」；传输保密要靠 HTTPS，URL 参数还容易出现在浏览历史、日志等位置。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-36** 幂等表示执行一次和执行多次，对服务器产生的预期效果相同，并不是每次返回的内容都必须相同。查询商品价格时价格变了，GET 返回的结果也会变，但它仍然可以是幂等的。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-37** 因为 GET 是安全且幂等的，可以对 GET 请求的数据做缓存，缓存既可以做在浏览器本身上（彻底避免浏览器发请求），也可以做在代理上（如 nginx），而且在浏览器中 GET 请求可以保存为书签；重复提交可能创建多笔订单、不能默认随便重试的是 POST。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-38** POST 方法的语义不保证安全和幂等。比如创建订单，重复提交可能创建多笔订单，所以不能默认随便重试。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-39** POST 响应并不是绝对不能缓存，在满足明确的缓存条件时也可以缓存，只是常见实现对它的支持比较有限。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-40** 实际开发中，开发者不一定按 RFC 语义实现：可以用 GET 实现新增或删除数据的请求，这样的 GET 自然就不是安全和幂等；可以用 POST 实现没有副作用的查询，也可以通过业务请求号把创建接口设计成幂等，但这些都需要业务自己保证，方法名本身不会自动带来保证。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-41** POST 不会因为参数放在 body 里就自动变得安全。GET、POST 走明文 HTTP 时都可能被窃听，传输保密要靠 HTTPS；只是 URL 参数还容易出现在浏览历史、日志等位置，不适合随便放密码和令牌。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)
- **T2-42** 按 RFC，GET 的语义是从服务器获取指定的资源，参数一般写在 URL 的查询字符串中（中文可经百分号编码），HTTP 没有统一规定 URL 最大长度，但浏览器、代理和服务器通常有各自限制；POST 的语义是根据请求负荷（body）对指定资源做出处理，数据一般写在 body 中，格式由客户端与服务端协商，大小也没有统一规定但可被配置限制。GET 是安全且幂等的（安全指语义不要求修改服务器资源，幂等指执行一次和多次预期效果相同），所以可以缓存在浏览器或 nginx 等代理上，也可以保存为书签；POST 不保证安全和幂等，比如创建订单重复提交可能创建多笔订单，不能默认随便重试，其响应并非绝对不能缓存但常见实现支持有限。实际开发中开发者不一定遵守这些语义，可以用 GET 实现增删数据，也可以用 POST 实现无副作用的查询，需要业务自己保证。另外 POST 不会因为参数在 body 里就自动安全，明文 HTTP 下两者都可能被窃听，保密要靠 HTTPS，URL 参数还容易出现在浏览历史、日志中。[原文§GET和POST的使用场景，有哪些区别？](https://xiaolincoding.com/interview/network.html#get%E5%92%8Cpost%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF-%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8C%BA%E5%88%AB)

### HTTP的长连接是什么？

- **T2-43** HTTP 采用「请求-应答」模式，基于 TCP，通信前先建立 TCP 连接。如果每次请求都经历「建立 TCP -> 请求资源 -> 响应资源 -> 释放连接」，就是 HTTP 短连接，一次连接只能请求一次资源。HTTP 的 Keep-Alive 让第一个请求完成后先不断开 TCP 连接，后续请求继续使用同一个连接，可以用同一个 TCP 连接发送和接收多个 HTTP 请求/应答，避免了连接建立和释放的开销，这个方法称为 HTTP 长连接。[原文§HTTP的长连接是什么？](https://xiaolincoding.com/interview/network.html#http%E7%9A%84%E9%95%BF%E8%BF%9E%E6%8E%A5%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-44** 依次是：建立 TCP 连接 -> 请求资源 -> 响应资源 -> 释放连接，一次连接只能请求一次资源。[原文§HTTP的长连接是什么？](https://xiaolincoding.com/interview/network.html#http%E7%9A%84%E9%95%BF%E8%BF%9E%E6%8E%A5%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-45** HTTP 的 Keep-Alive 可以使用同一个 TCP 连接来发送和接收多个 HTTP 请求/应答，避免了连接建立和释放的开销，这个方法称为 HTTP 长连接。探测空闲连接对端是否存活的是 TCP Keepalive。[原文§HTTP的长连接是什么？](https://xiaolincoding.com/interview/network.html#http%E7%9A%84%E9%95%BF%E8%BF%9E%E6%8E%A5%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-46** HTTP 长连接允许在一次请求结束后继续复用连接，但客户端、服务端或者中间代理都可能因为空闲超时、请求数量限制等原因关闭连接。[原文§HTTP的长连接是什么？](https://xiaolincoding.com/interview/network.html#http%E7%9A%84%E9%95%BF%E8%BF%9E%E6%8E%A5%E6%98%AF%E4%BB%80%E4%B9%88)

### HTTP Keep-Alive 和 TCP Keepalive 有什么区别？

- **T2-47** 两者名字很像，但解决的问题不一样：HTTP Keep-Alive 解决连接复用的问题，让多个 HTTP 请求使用同一个连接，减少反复建立和关闭连接的开销，HTTP/1.1 默认使用持久连接；TCP Keepalive 解决空闲连接的存活探测问题。[原文§HTTP Keep-Alive 和 TCP Keepalive 有什么区别？](https://xiaolincoding.com/interview/network.html#http-keep-alive-%E5%92%8C-tcp-keepalive-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-48** TCP Keepalive 解决空闲连接的存活探测问题：如果连接长时间没有数据交互，内核可以发送探测报文，判断对端是否还能响应，需要通过 SO_KEEPALIVE 等选项开启。[原文§HTTP Keep-Alive 和 TCP Keepalive 有什么区别？](https://xiaolincoding.com/interview/network.html#http-keep-alive-%E5%92%8C-tcp-keepalive-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-49** 一个 HTTP 长连接完全可以没有开启 TCP Keepalive；反过来，一个数据库的 TCP 连接也可以开启 TCP Keepalive，它和 HTTP 没有关系。[原文§HTTP Keep-Alive 和 TCP Keepalive 有什么区别？](https://xiaolincoding.com/interview/network.html#http-keep-alive-%E5%92%8C-tcp-keepalive-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-50** TCP 探测能收到回复，只能说明对端的 TCP 协议栈还能响应，不代表业务线程还能正常处理请求。[原文§HTTP Keep-Alive 和 TCP Keepalive 有什么区别？](https://xiaolincoding.com/interview/network.html#http-keep-alive-%E5%92%8C-tcp-keepalive-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-51** 通常还需要应用层心跳和请求超时。[原文§HTTP Keep-Alive 和 TCP Keepalive 有什么区别？](https://xiaolincoding.com/interview/network.html#http-keep-alive-%E5%92%8C-tcp-keepalive-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### HTTP默认的端口是什么？

- **T2-52** http 默认端口是 80，https 默认端口是 443。[原文§HTTP默认的端口是什么？](https://xiaolincoding.com/interview/network.html#http%E9%BB%98%E8%AE%A4%E7%9A%84%E7%AB%AF%E5%8F%A3%E6%98%AF%E4%BB%80%E4%B9%88)

### HTTP1.1怎么对请求做拆包，具体来说怎么拆的？

- **T2-53** HTTP/1.1 通常跑在 TCP 上，而 TCP 是字节流，不会帮应用程序保留消息边界，所以一次 read 不一定能读到一个完整请求，也可能同时读到多个请求的一部分。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-54** HTTP/1.1 先用 \r\n\r\n 找到请求头的结束位置，再根据头部字段判断请求体的边界。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-55** Content-Length 声明请求体的字节数。比如值为 100，就继续读取 100 个字节，才算读完请求体。它解决的是报文边界问题，不负责保证网络可靠传输。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-56** 每块先写十六进制的长度，再写数据；读到大小为 0 的最后一个块，并处理完可选的尾部字段，才算结束。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-57** 如果请求既没有 Transfer-Encoding，也没有 Content-Length，那么按 HTTP/1.1 的规则，这个请求没有请求体。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-58** HEAD 的响应、204 和 304 的响应都没有响应体。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-59** 有些响应也可以靠关闭连接表示结束，但这样就不能继续复用这条连接了。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-60** Content-Length 解决的是报文边界问题，不负责保证网络可靠传输。如果连接中断，实际收到的正文不足声明长度，应用仍然要把报文当作不完整来处理。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)
- **T2-61** HTTP/1.1 通常跑在 TCP 上，TCP 是字节流，不保留消息边界，所以一次 read 不一定能读到一个完整请求，也可能同时读到多个请求的一部分。拆包时，首先用 \r\n\r\n 找到请求头的结束位置，再根据头部字段判断请求体的边界：Content-Length 声明请求体的字节数，读完这么多字节才算读完请求体；Transfer-Encoding: chunked 把请求体分成多个块，每块先写十六进制的长度再写数据，读到大小为 0 的最后一个块并处理完可选的尾部字段才算结束；如果既没有 Transfer-Encoding 也没有 Content-Length，按 HTTP/1.1 的规则这个请求没有请求体。响应还要结合状态码和请求方法判断，HEAD 的响应、204 和 304 都没有响应体，有些响应靠关闭连接表示结束，但这样就不能继续复用连接。Content-Length 只解决报文边界问题，不保证可靠传输，连接中断导致正文不足声明长度时，要把报文当作不完整。[原文§HTTP1.1怎么对请求做拆包，具体来说怎么拆的？](https://xiaolincoding.com/interview/network.html#http1-1%E6%80%8E%E4%B9%88%E5%AF%B9%E8%AF%B7%E6%B1%82%E5%81%9A%E6%8B%86%E5%8C%85-%E5%85%B7%E4%BD%93%E6%9D%A5%E8%AF%B4%E6%80%8E%E4%B9%88%E6%8B%86%E7%9A%84)

### http 断点重传是什么？

- **T2-62** 断点续传就是下载中断之后，接着上次的位置下载，不用把整个文件重新下载一遍，HTTP 可以通过 Range 请求来实现。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-63** 文件共 1048576 字节、已下载前 524288 字节，字节位置从 0 开始，所以剩余部分从位置 524288 开始，客户端发送 Range: bytes=524288-。结束位置是包含在范围里的，该文件最后一个字节的位置是 1048575。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-64** 如果服务端支持范围请求，就返回 206 Partial Content。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-65** Content-Range 的结束位置是 1048575，Content-Length 是 524288；字节位置从 0 开始，结束位置包含在范围里，所以剩余长度是 1048575 - 524288 + 1 = 524288。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-66** Range 由客户端指定要下载的字节范围；Content-Range 由服务端说明这次返回的范围和资源总大小；Accept-Ranges: bytes 表示服务端支持按字节请求，客户端也可以在没看到这个字段时尝试发送 Range；Content-Length 说明的是本次响应体的长度，并不是整个文件的长度。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-67** 如果请求范围无法满足，服务端可以返回 416。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-68** 如果服务端忽略 Range，返回了 200 和完整文件，客户端就不能直接把它追加到已下载内容后面，否则前面已下载的部分会被重复拼接。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-69** 可以用 If-Range 携带上次的强 ETag，或者符合要求的 Last-Modified 时间：资源没变就继续返回部分内容，变了就返回完整资源，避免把两个版本的文件拼到一起。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-70** 断点续传就是下载中断之后，接着上次的位置下载，不用把整个文件重新下载一遍，HTTP 通过 Range 请求实现。例如 1048576 字节（1 MiB）的文件下载了前 524288 字节后断网，恢复后客户端发送 Range: bytes=524288-；服务端支持范围请求就返回 206 Partial Content，并带上 Content-Range: bytes 524288-1048575/1048576 和 Content-Length: 524288（字节位置从 0 开始，结束位置包含在范围内，剩余长度为 1048575 - 524288 + 1）。相关字段：Range 由客户端指定字节范围；Content-Range 由服务端说明本次返回的范围和资源总大小；Accept-Ranges: bytes 表示服务端支持按字节请求，客户端也可在没看到时尝试发送 Range；Content-Length 是本次响应体的长度，不是整个文件的长度。请求范围无法满足时服务端可返回 416；如果服务端忽略 Range 返回 200 和完整文件，客户端不能直接追加到已下载内容后面。下载期间文件可能变化，可以用 If-Range 携带上次的强 ETag 或符合要求的 Last-Modified，资源没变就继续返回部分内容，变了就返回完整资源，避免拼出两个版本混合的文件。[原文§http 断点重传是什么？](https://xiaolincoding.com/interview/network.html#http-%E6%96%AD%E7%82%B9%E9%87%8D%E4%BC%A0%E6%98%AF%E4%BB%80%E4%B9%88)

### HTTP为什么不安全？

- **T2-71** 三个风险是窃听风险（通信链路上可以获取通信内容）、篡改风险（比如强制植入垃圾广告）、冒充风险（比如冒充淘宝网站）。[原文§HTTP为什么不安全？](https://xiaolincoding.com/interview/network.html#http%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%AE%89%E5%85%A8)
- **T2-72** HTTPS 在 HTTP 与 TCP 层之间加入了 SSL/TLS 协议，可以很好地解决明文传输带来的风险。[原文§HTTP为什么不安全？](https://xiaolincoding.com/interview/network.html#http%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%AE%89%E5%85%A8)
- **T2-73** 依次是信息加密（交互信息无法被窃取）、校验机制（无法篡改通信内容，篡改了就不能正常显示）、身份证书（证明淘宝是真的淘宝网）。[原文§HTTP为什么不安全？](https://xiaolincoding.com/interview/network.html#http%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%AE%89%E5%85%A8)

### HTTP和HTTPS 的区别？

- **T2-74** HTTP 是超文本传输协议，信息是明文传输，存在安全风险的问题；HTTPS 则解决 HTTP 不安全的缺陷，通过 TLS 安全协议保护 HTTP 通信，使得报文能够加密传输。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-75** 以基于 TCP 的 HTTP/1.1、HTTP/2 为例，HTTPS 在 TCP 建连后还要进行 TLS 握手，协商密钥并验证身份。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-76** HTTP/3 通过基于 UDP 的 QUIC 集成 TLS 1.3 来提供安全连接；基于 TCP 的 HTTP/1.1、HTTP/2 则是在 TCP 建连后再进行 TLS 握手。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-77** 两者的默认端口不一样，HTTP 默认端口号是 80，HTTPS 默认端口号是 443。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-78** 公开网站的 HTTPS 通常使用由可信 CA 签发的数字证书来验证服务器身份，证书也可以免费申请。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-79** 自签名证书也能加密通信，但客户端需要另行建立信任；公开网站通常使用由可信 CA 签发的数字证书。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-80** 区别主要有四点：第一，HTTP 是超文本传输协议，信息是明文传输，存在安全风险；HTTPS 通过 TLS 安全协议保护 HTTP 通信，使报文能够加密传输。第二，以基于 TCP 的 HTTP/1.1、HTTP/2 为例，HTTPS 在 TCP 建连后还要进行 TLS 握手，协商密钥并验证身份；HTTP/3 则通过基于 UDP 的 QUIC 集成 TLS 1.3 来提供安全连接。第三，默认端口不同，HTTP 是 80，HTTPS 是 443。第四，公开网站的 HTTPS 通常使用由可信 CA 签发的数字证书来验证服务器身份，证书也可以免费申请；自签名证书也能加密通信，但客户端需要另行建立信任。[原文§HTTP和HTTPS 的区别？](https://xiaolincoding.com/interview/network.html#http%E5%92%8Chttps-%E7%9A%84%E5%8C%BA%E5%88%AB)

### HTTPS握手过程说一下

- **T2-81** 三件事是协商通信参数、验证服务器身份、生成双方使用的会话密钥。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-82** HTTPS 握手具体过程要看 TLS 版本和密钥交换方式，不能把所有 HTTPS 都说成「四次握手」；原文用 Wireshark 抓到的 TLS 1.2 使用 RSA 密钥交换的握手经历了四次。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-83** 服务端证书包含公钥、域名、有效期和 CA 的签名等信息，握手时会发给客户端。证书不是只有一把公钥，它还要帮助客户端确认这把公钥属于谁；对应的私钥留在服务端，不会通过网络发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-84** 证书对应的私钥留在服务端，不会通过网络发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-85** 在 RSA 密钥协商算法中，客户端会生成随机密钥，并使用服务端的公钥加密后再传给服务端；根据非对称加密算法，公钥加密的消息仅能通过私钥解密，所以服务端解密后，双方就得到了相同的预主密钥，再结合客户端和服务端的随机数派生出后续使用的会话密钥。双方各自生成临时公钥并交换是 ECDHE 的做法。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-86** 第一次握手 ClientHello 中，客户端主要发送：客户端支持的 TLS 协议版本（如 TLS 1.2）、客户端生成的随机数 Client Random（后面用于生成会话密钥的条件之一）、客户端支持的密码套件列表（如 RSA 加密算法）。服务器的数字证书和选定的密码套件是第二次握手服务器回应的内容。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-87** 第二次握手服务器发送 ServerHello、Certificate 等一组握手消息，主要回应：确认 TLS 协议版本（如果浏览器不支持则关闭加密通信）、服务器生成的随机数 Server Random、选定的密码套件（规定密钥交换、认证和数据加密等使用的算法）、服务器的数字证书。预主密钥由客户端在第三次握手中发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-88** 客户端收到服务器的回应之后，先验证证书链是否能追溯到受信任的 CA，还要检查证书有效期和证书中的域名是否与访问的域名匹配。私钥留在服务端，客户端并不保存。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-89** 第三次握手客户端验证证书无误后，向服务器发送：一个用服务器公钥加密的随机数（Pre-Master Secret）、加密通信算法改变通知（表示随后的信息都将用会话密钥加密通信）、客户端握手结束通知。客户端支持的密码套件列表在第一次握手发送，服务器握手结束通知在第四次握手由服务器发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-90** 三个随机数是 Client Random、Server Random 和 Pre-Master Secret；其中 Pre-Master Secret 是整个握手阶段的第三个随机数，会发给服务端，所以客户端和服务端的这个随机数是一样的。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-91** 第三次握手中的客户端握手结束通知，使用协商出的密钥和此前的握手记录计算校验数据，供服务端验证握手内容没有被修改；服务器的握手结束通知同样使用密钥和握手记录计算校验数据，供客户端验证。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-92** 第四次握手，服务器收到客户端的第三个随机数（Pre-Master Secret）之后，通过协商的加密算法计算出本次通信的会话密钥，然后向客户端发送加密通信算法改变通知和服务器握手结束通知，至此握手结束，接下来的 HTTP 数据由会话密钥加密保护。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-93** ECDHE 不会把会话密钥用证书公钥加密后发过去。双方交换临时公钥，各自结合自己的临时私钥算出相同的共享秘密，再派生出会话密钥。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-94** 在 ECDHE 中，证书对应的私钥主要用于签名，证明握手的一方确实持有该私钥；解密客户端用公钥加密的预主密钥是 RSA 密钥交换的做法。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-95** ECDHE 支持前向安全：即使将来服务器的证书私钥泄露，只要之前的临时私钥已经销毁，攻击者也不能仅凭录下来的流量还原过去的会话密钥。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-96** TLS 1.3 移除了 RSA 密钥交换。以常见的、基于证书和 ECDHE 的完整握手为例，用临时公钥（key share）交换来计算密钥。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-97** 以常见的、基于证书和 ECDHE 的 TLS 1.3 完整握手为例，第一空为密码套件，第二空为临时公钥（key share）。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-98** 以常见的、基于证书和 ECDHE 的 TLS 1.3 完整握手为例，服务端返回 ServerHello 和自己的 key share，双方由此计算握手密钥。服务端随后发送加密保护的证书、证书签名和 Finished 消息；客户端验证证书、签名和 Finished，再发送自己的 Finished，完成握手。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-99** 在不需要额外协商往返的情况下，TLS 1.3 完整握手是 1-RTT，比典型的 TLS 1.2 完整握手少一次往返。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-100** 会话恢复还可以使用 PSK，符合条件时支持 0-RTT 早期数据，不过这些数据有重放风险，不能把它理解成所有业务都可以安全地零延迟发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-101** HTTPS 握手要完成协商通信参数、验证服务器身份、生成会话密钥三件事。服务端证书包含公钥、域名、有效期和 CA 的签名等信息，对应的私钥留在服务端。RSA 密钥交换的 TLS 1.2 握手经历四次：第一次，客户端发送 ClientHello，包含客户端支持的 TLS 版本、客户端随机数 Client Random 和支持的密码套件列表；第二次，服务器发送 ServerHello、Certificate 等，确认 TLS 版本、Server Random、选定的密码套件和数字证书；第三次，客户端验证证书链能追溯到受信任的 CA、证书有效期和域名匹配后，取出服务器公钥，发送用它加密的随机数 Pre-Master Secret、加密通信算法改变通知和客户端握手结束通知（校验数据由协商出的密钥和握手记录计算，供服务端验证握手内容没被修改），双方有了三个随机数后各自计算出会话密钥；第四次，服务器用私钥解出 Pre-Master Secret，计算会话密钥，发送加密通信算法改变通知和服务器握手结束通知。握手结束后，HTTP 数据由会话密钥加密保护。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T2-102** ECDHE 不会把会话密钥用证书公钥加密后发过去，而是双方交换临时公钥，各自结合自己的临时私钥算出相同的共享秘密，再派生会话密钥；证书对应的私钥主要用于签名，证明握手的一方确实持有该私钥。它支持前向安全：即使将来证书私钥泄露，只要之前的临时私钥已销毁，攻击者也不能仅凭录下的流量还原过去的会话密钥。TLS 1.3 移除了 RSA 密钥交换，以基于证书和 ECDHE 的完整握手为例：客户端发送 ClientHello，带上支持的版本、密码套件和临时公钥（key share）；服务端返回 ServerHello 和自己的 key share，双方由此计算握手密钥，随后服务端发送加密保护的证书、证书签名和 Finished；客户端验证证书、签名和 Finished 后发送自己的 Finished，完成握手。不需要额外协商往返时，TLS 1.3 完整握手是 1-RTT，比典型的 TLS 1.2 完整握手少一次往返；会话恢复可使用 PSK，符合条件时支持 0-RTT 早期数据，但有重放风险，不能认为所有业务都能安全零延迟发送。[原文§HTTPS握手过程说一下](https://xiaolincoding.com/interview/network.html#https%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)

### HTTPS是如何防范中间人的攻击？

- **T2-103** 防范中间人的关键不只是加密，而是确认正在和谁通信，再保护通信内容；所以只说「用了非对称加密」还不够。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-104** 攻击者也可以自己生成一对公私钥，如果客户端不验证这把公钥属于谁，就可能把数据加密给攻击者，所以只说「用了非对称加密」还不够。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-105** HTTPS 主要通过四个机制防范中间人：证书校验（验证证书链、有效期和域名）、证明私钥的持有（在 ECDHE 等握手中，服务端用证书对应的私钥对握手内容签名，客户端用公钥验证）、握手完整性校验（Finished 消息验证握手记录）、数据加密和完整性保护（后续用协商出的对称密钥保护 HTTP 数据，篡改的数据无法通过校验）。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-106** 客户端验证证书链、有效期和域名，确认公钥绑定的是要访问的服务器，而不是攻击者的服务器。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-107** 在 ECDHE 等握手中，服务端使用证书对应的私钥对握手内容签名，客户端用公钥验证。攻击者即使拿到了公开的证书，没有私钥也不能完成相应的身份认证。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-108** 握手完整性校验通过 Finished 消息验证握手记录，防止协商参数等内容被中途修改。检查证书有效期和域名属于证书校验，加密后续数据属于数据加密和完整性保护。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-109** 这里有个前提：客户端要正确验证证书。如果用户忽略证书错误，或者客户端关闭了证书校验，那么这些身份保证就可能失效。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)
- **T2-110** 关键不只是加密，而是确认正在和谁通信，再保护通信内容。攻击者可以自己生成一对公私钥冒充服务器，如果客户端不验证这把公钥属于谁，就可能把数据加密给攻击者，所以只说「用了非对称加密」还不够。HTTPS 主要通过四个机制防范：一是证书校验，客户端验证证书链、有效期和域名，确认公钥绑定的是要访问的服务器；二是证明私钥的持有，在 ECDHE 等握手中服务端用证书对应的私钥对握手内容签名，客户端用公钥验证，攻击者没有私钥就不能完成身份认证；三是握手完整性校验，通过 Finished 消息验证握手记录，防止协商参数等被中途修改；四是数据加密和完整性保护，后续用协商出的对称密钥保护 HTTP 数据，攻击者难以读出内容，篡改的数据也无法通过校验。前提是客户端要正确验证证书，如果用户忽略证书错误或客户端关闭了证书校验，这些身份保证就可能失效。[原文§HTTPS是如何防范中间人的攻击？](https://xiaolincoding.com/interview/network.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E9%98%B2%E8%8C%83%E4%B8%AD%E9%97%B4%E4%BA%BA%E7%9A%84%E6%94%BB%E5%87%BB)

### Http1.1和2.0的区别是什么？

- **T2-111** HTTP/2 保留了 HTTP 的方法、状态码等语义，主要改进的是报文传输方式，也就是头部压缩、二进制分帧、多路复用和流量控制这些方面。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-112** 头部压缩、二进制分帧、多路复用、流量控制。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-113** HTTP/2 使用 HPACK 做头部压缩，结合静态表、动态表和编码来减少重复头字段的传输。比如多个请求都带着相同的头部，就不必每次都完整传一遍。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-114** 二进制分帧把头部和数据拆成不同类型的帧，每个帧都有明确的长度和类型，方便解析和复用。HTTP/1.1 本身在网络上也是字节，区别不在于“计算机是否认识文本”，而在于报文的组织方式不同。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-115** 在 HTTP/2 中每个请求和响应属于一个 Stream，帧携带 Stream ID，因此多个请求可以在同一条 TCP 连接上交错传输，不必等待前一个响应完整发完。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-116** HTTP/2 的流量控制可以在连接和 Stream 两个层面限制数据发送，避免接收方来不及处理。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-117** HTTP/2 还设计了服务器推送功能，但主流浏览器对它的支持有限，实际面试更应该把多路复用和队头阻塞讲清楚。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-118** HTTP/2 解决了 HTTP/1.1 在一条连接上按序返回响应的队头阻塞，但没有解决 TCP 层的队头阻塞。底层 TCP 丢了一个数据段，即使后面的字节已经到达，也要先补齐缺口，连接上的多个 Stream 都可能被拖住。[原文§Http1.1和2.0的区别是什么？](https://xiaolincoding.com/interview/network.html#http1-1%E5%92%8C2-0%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### HTTP/3 相比 HTTP/2 有什么改进？

- **T2-119** 第一空是 TCP，第二空是 QUIC。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-120** HTTP/2 使用 TCP，HTTP/3 使用基于 UDP 的 QUIC，但 HTTP 的请求方法和状态码这些语义并没有因此改变。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-121** QUIC 为不同 Stream 分别维护数据顺序。某个流丢包时，其他不依赖它的流可以继续交付数据。不过丢包的那个流本身仍然要等待重传，共享的拥塞控制也可能影响整个连接。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-122** QUIC 集成 TLS 1.3，完整握手通常需要 1-RTT；满足条件的恢复连接可以发送 0-RTT 早期数据，所以连接建立更快。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-123** QUIC 使用 Connection ID 标识连接。在满足路径验证等条件时，客户端从 Wi-Fi 切到移动网络，即使 IP 和端口变化，也可以继续使用原来的连接。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-124** HTTP/3 使用 QPACK 压缩头部，它考虑了多个流之间独立传输的特点，从而减少头部压缩带来的阻塞。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)
- **T2-125** HTTP/3 并不是放弃可靠性、把 HTTP 数据直接丢给 UDP。可靠传输、拥塞控制和加密等工作由 QUIC 完成。[原文§HTTP/3 相比 HTTP/2 有什么改进？](https://xiaolincoding.com/interview/network.html#http-3-%E7%9B%B8%E6%AF%94-http-2-%E6%9C%89%E4%BB%80%E4%B9%88%E6%94%B9%E8%BF%9B)

### HTTP 强制缓存和协商缓存有什么区别？

- **T2-126** 强制缓存决定“能不能直接用缓存”，协商缓存决定“缓存还能不能继续用”。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-127** 浏览器收到响应后，根据 Cache-Control: max-age=... 等字段判断缓存的新鲜度。缓存还新鲜时，可以直接使用，不用向服务器发送这次资源请求。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-128** Expires 也可以指定过期时间，不过通常优先使用 Cache-Control，浏览器根据 Cache-Control: max-age=... 等字段判断缓存的新鲜度。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-129** 第一空是 If-None-Match，第二空是 If-Modified-Since。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-130** 资源没变，服务端返回 304，不再发送响应体，浏览器继续使用本地缓存；资源变了，就返回 200 和新的内容。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-131** 协商缓存的两组条件如果同时出现，If-None-Match 优先。[原文§HTTP 强制缓存和协商缓存有什么区别？](https://xiaolincoding.com/interview/network.html#http-%E5%BC%BA%E5%88%B6%E7%BC%93%E5%AD%98%E5%92%8C%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### Cache-Control 里的 no-cache 和 no-store 有什么区别？

- **T2-132** no-cache 不是不允许缓存，而是使用缓存前必须向服务器重新验证；no-store 才是不允许存储这次请求或响应。[原文§Cache-Control 里的 no-cache 和 no-store 有什么区别？](https://xiaolincoding.com/interview/network.html#cache-control-%E9%87%8C%E7%9A%84-no-cache-%E5%92%8C-no-store-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-133** no-store 才是不允许存储这次请求或响应，对于不希望被缓存保存的敏感响应，可以设置 no-store。[原文§Cache-Control 里的 no-cache 和 no-store 有什么区别？](https://xiaolincoding.com/interview/network.html#cache-control-%E9%87%8C%E7%9A%84-no-cache-%E5%92%8C-no-store-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-134** 一个页面设置了 no-cache，浏览器仍然可以保存内容，下次发起协商请求，资源没变就使用缓存。[原文§Cache-Control 里的 no-cache 和 no-store 有什么区别？](https://xiaolincoding.com/interview/network.html#cache-control-%E9%87%8C%E7%9A%84-no-cache-%E5%92%8C-no-store-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-135** private 表示响应只允许浏览器等私有缓存保存，不允许 CDN、代理这类共享缓存保存。不能把某个用户的个人页面当作公共内容缓存起来，再发给另一个用户。[原文§Cache-Control 里的 no-cache 和 no-store 有什么区别？](https://xiaolincoding.com/interview/network.html#cache-control-%E9%87%8C%E7%9A%84-no-cache-%E5%92%8C-no-store-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### HTTP进行TCP连接之后，在什么情况下会中断

- **T2-136** 正常关闭、连接被重置、重传超时、HTTP 连接管理。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)
- **T2-137** 正常关闭是指客户端或服务端不再使用连接，关闭最后一个 socket 引用，或者调用 shutdown 关闭发送方向，通常通过 FIN 进行关闭。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)
- **T2-138** 连接被重置：收到有效的 RST 报文，连接被立即终止，应用可能看到 Connection reset。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)
- **T2-139** 重传超时是指发送数据之后长期收不到确认，达到系统或应用设置的超时条件，内核会报告连接失败。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)
- **T2-140** HTTP 连接管理：使用 Connection: close，或者达到服务端的空闲超时、最大请求次数等限制，由应用决定关闭连接。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)
- **T2-141** 网线被拔掉或者对端突然断电，不一定会立刻让本地连接消失。如果连接没有数据交互，也没有开启保活或应用层超时，本地可能仍然显示 ESTABLISHED。题中错误选项描述的是最终重传失败、保活失败或应用层超时触发后，连接已经关闭的情形；仅开启保活或开始等待确认，不等于已经关闭连接。[原文§HTTP进行TCP连接之后，在什么情况下会中断](https://xiaolincoding.com/interview/network.html#http%E8%BF%9B%E8%A1%8Ctcp%E8%BF%9E%E6%8E%A5%E4%B9%8B%E5%90%8E-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E4%B8%AD%E6%96%AD)

### HTTP、SOCKET和TCP的区别

- **T2-142** 第一空是应用，第二空是传输。[原文§HTTP、SOCKET和TCP的区别](https://xiaolincoding.com/interview/network.html#http%E3%80%81socket%E5%92%8Ctcp%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-143** HTTP 是应用层协议，定义了客户端和服务器之间交换的数据格式和规则，用于传输超文本数据，在客户端和服务器之间传输和显示 Web 页面。[原文§HTTP、SOCKET和TCP的区别](https://xiaolincoding.com/interview/network.html#http%E3%80%81socket%E5%92%8Ctcp%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-144** Socket 是计算机网络中的一种抽象，用于描述通信链路的一端，提供了底层的通信接口，可实现不同计算机之间的数据交换。[原文§HTTP、SOCKET和TCP的区别](https://xiaolincoding.com/interview/network.html#http%E3%80%81socket%E5%92%8Ctcp%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-145** TCP 是一种面向连接的、可靠的传输层协议，负责在通信的两端之间建立可靠的数据传输连接。[原文§HTTP、SOCKET和TCP的区别](https://xiaolincoding.com/interview/network.html#http%E3%80%81socket%E5%92%8Ctcp%E7%9A%84%E5%8C%BA%E5%88%AB)

### DNS的全称了解么？

- **T2-146** DNS 的全称是 Domain Name System（域名系统），它是互联网中用于将域名转换为对应 IP 地址的分布式数据库系统，使得人们可以通过易记的域名访问互联网资源，而无需记住复杂的 IP 地址。[原文§DNS的全称了解么？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%85%A8%E7%A7%B0%E4%BA%86%E8%A7%A3%E4%B9%88)
- **T2-147** DNS 中的域名都是用句点来分隔的，句点代表了不同层次之间的界限。在域名中，越靠右的位置表示其层级越高。[原文§DNS的全称了解么？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%85%A8%E7%A7%B0%E4%BA%86%E8%A7%A3%E4%B9%88)
- **T2-148** 实际上域名最后还有一个点，比如 www.server.com.，这个最后的一个点代表根域名。[原文§DNS的全称了解么？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%85%A8%E7%A7%B0%E4%BA%86%E8%A7%A3%E4%B9%88)
- **T2-149** 依次是根、顶级域、权威。[原文§DNS的全称了解么？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%85%A8%E7%A7%B0%E4%BA%86%E8%A7%A3%E4%B9%88)
- **T2-150** 客户端可以通过可向其提供递归服务的 DNS 解析器完成域名查找，而不必自行逐层查询根域及下级 DNS 服务器。权威服务与递归服务职责不同，递归服务可选，也可以限制客户端；不能保证任意 DNS 服务器都为客户端完成递归解析。（原文写“根域的 DNS 服务器信息保存在互联网中所有的 DNS 服务器中”，并据此认为客户端找到“任意一台 DNS 服务器”即可逐层完成查找；这一说法泛化了服务器配置和递归服务范围。）[原文§DNS的全称了解么？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%85%A8%E7%A7%B0%E4%BA%86%E8%A7%A3%E4%B9%88) [核对来源：RFC 1034 §4.3.1 Queries and responses](https://www.rfc-editor.org/rfc/rfc1034.html#section-4.3.1)

### DNS 域名解析的工作流程？

- **T2-151** 在真正发出 DNS 请求前，客户端通常会先检查浏览器、操作系统的解析缓存，以及 hosts 等本地配置。如果已经找到了可用结果，就不必走完后面的查询。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-152** 客户端首先会发出一个 DNS 请求，问 www.server.com 的 IP 是啥，并发给本地 DNS 服务器（也就是客户端的 TCP/IP 设置中填写的 DNS 服务器地址）。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-153** 本地域名服务器收到客户端的请求后，如果缓存里的表格能找到 www.server.com，则它直接返回 IP 地址。如果没有，本地 DNS 才会去问它的根域名服务器。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-154** 依次是根域名服务器、顶级域名服务器、权威 DNS 服务器。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-155** 根域名服务器是最高层次的，它不直接用于域名解析，但能指明一条道路。它发现后缀是 .com，就告诉本地 DNS：这个域名归 .com 区域管理，并给出 .com 顶级域名服务器的地址，让它去问。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-156** 顶级域名服务器会给出负责 www.server.com 区域的权威 DNS 服务器的地址，让本地 DNS 去问它，应该能问到。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-157** server.com 的权威 DNS 服务器是域名解析结果的原出处。为啥叫权威呢？就是我的域名我做主。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-158** 第一空是递归，第二空是迭代。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
- **T2-159** 查询结果会按 TTL 缓存，因此不是每次访问都要从根服务器查起。[原文§DNS 域名解析的工作流程？](https://xiaolincoding.com/interview/network.html#dns-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)

### DNS的端口是多少？

- **T2-160** 默认端口号是 53。[原文§DNS的端口是多少？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E7%AB%AF%E5%8F%A3%E6%98%AF%E5%A4%9A%E5%B0%91)

### 改过host文件吗？

- **T2-161** host 文件的核心作用是把域名和 IP 地址绑在一起。想让电脑访问某个域名时直接指向特定 IP，不用走公共 DNS 解析，改 host 文件就行。[原文§改过host文件吗？](https://xiaolincoding.com/interview/network.html#%E6%94%B9%E8%BF%87host%E6%96%87%E4%BB%B6%E5%90%97)
- **T2-162** 还没上线的项目只有服务器 IP，就在 host 里写“192.168.1.100 www.test.com”，这样输入域名就能直接访问测试服，不用记一串难背的 IP。[原文§改过host文件吗？](https://xiaolincoding.com/interview/network.html#%E6%94%B9%E8%BF%87host%E6%96%87%E4%BB%B6%E5%90%97)

### DNS的底层使用TCP还是UDP？

- **T2-163** DNS 同时支持 UDP 和 TCP，传统 DNS 服务的端口号都是 53。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-164** 普通查询通常先使用 UDP，因为请求和响应一般比较小，不需要先建立连接。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-165** 第一空是 TC，第二空是 TCP。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-166** 传统 DNS 的 UDP 消息大小限制为 512 字节，EDNS(0) 可以让客户端通告能够接收的 UDP 消息大小，但不是所有查询都固定使用 4096 字节。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-167** 即使 EDNS(0) 可以通告更大的 UDP 消息，消息越大，也越容易遇到 IP 分片和丢包，所以 TCP 仍然有必要。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-168** 完整区域传送 AXFR 使用 TCP；增量区域传送 IXFR 可以使用 UDP 或 TCP，不能把所有区域传送都说成只能用 TCP。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)
- **T2-169** 依次是 DoT、DoH、DoQ。[原文§DNS的底层使用TCP还是UDP？](https://xiaolincoding.com/interview/network.html#dns%E7%9A%84%E5%BA%95%E5%B1%82%E4%BD%BF%E7%94%A8tcp%E8%BF%98%E6%98%AFudp)

### HTTP到底是不是无状态的？

- **T2-170** HTTP 是无状态的，指协议不要求服务器记住前一次请求才能理解后一次请求。每个请求应该提供理解它所需的信息。[原文§HTTP到底是不是无状态的？](https://xiaolincoding.com/interview/network.html#http%E5%88%B0%E5%BA%95%E6%98%AF%E4%B8%8D%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)
- **T2-171** 无状态并不是说服务器不能保存用户数据，也不是说 TCP 连接没有状态。比如服务端当然可以保存购物车，TCP 也会维护序列号和连接状态，只是它们不等于 HTTP 协议本身的会话状态。[原文§HTTP到底是不是无状态的？](https://xiaolincoding.com/interview/network.html#http%E5%88%B0%E5%BA%95%E6%98%AF%E4%B8%8D%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)
- **T2-172** Cookie、Session、Token。[原文§HTTP到底是不是无状态的？](https://xiaolincoding.com/interview/network.html#http%E5%88%B0%E5%BA%95%E6%98%AF%E4%B8%8D%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)

### 携带Cookie的HTTP请求是有状态还是无状态的？Cookie是HTTP协议簇的一部分，那为什么还说HTTP是无状态的？

- **T2-173** HTTP 仍然是无状态协议，不过应用可以借助 Cookie 实现有状态的会话。[原文§携带Cookie的HTTP请求是有状态还是无状态的？Cookie是HTTP协议簇的一部分，那为什么还说HTTP是无状态的？](https://xiaolincoding.com/interview/network.html#%E6%90%BA%E5%B8%A6cookie%E7%9A%84http%E8%AF%B7%E6%B1%82%E6%98%AF%E6%9C%89%E7%8A%B6%E6%80%81%E8%BF%98%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84-cookie%E6%98%AFhttp%E5%8D%8F%E8%AE%AE%E7%B0%87%E7%9A%84%E4%B8%80%E9%83%A8%E5%88%86-%E9%82%A3%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%AF%B4http%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)
- **T2-174** 第一次登录成功后，服务端把 Session ID 写进 Cookie。后续每次请求，浏览器都按 Cookie 的规则带上这个 ID，服务端拿它去找对应的登录信息，就知道“还是刚才那个用户”。[原文§携带Cookie的HTTP请求是有状态还是无状态的？Cookie是HTTP协议簇的一部分，那为什么还说HTTP是无状态的？](https://xiaolincoding.com/interview/network.html#%E6%90%BA%E5%B8%A6cookie%E7%9A%84http%E8%AF%B7%E6%B1%82%E6%98%AF%E6%9C%89%E7%8A%B6%E6%80%81%E8%BF%98%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84-cookie%E6%98%AFhttp%E5%8D%8F%E8%AE%AE%E7%B0%87%E7%9A%84%E4%B8%80%E9%83%A8%E5%88%86-%E9%82%A3%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%AF%B4http%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)
- **T2-175** 这里并不是 HTTP 自动记住了上一个请求，而是当前请求又带来了用于识别用户的信息，应用再用这个信息查找会话。所以，协议无状态和业务有登录状态并不矛盾。[原文§携带Cookie的HTTP请求是有状态还是无状态的？Cookie是HTTP协议簇的一部分，那为什么还说HTTP是无状态的？](https://xiaolincoding.com/interview/network.html#%E6%90%BA%E5%B8%A6cookie%E7%9A%84http%E8%AF%B7%E6%B1%82%E6%98%AF%E6%9C%89%E7%8A%B6%E6%80%81%E8%BF%98%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84-cookie%E6%98%AFhttp%E5%8D%8F%E8%AE%AE%E7%B0%87%E7%9A%84%E4%B8%80%E9%83%A8%E5%88%86-%E9%82%A3%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%AF%B4http%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84)

### cookie和session有什么区别？

- **T2-176** 存储位置、数据容量、安全性、生命周期、性能。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-177** Cookie 的数据存储在客户端（通常是浏览器），浏览器向服务器发送请求时会自动附带 Cookie 中的数据。Session 的数据存储在服务器端，服务器为每个用户分配一个唯一的 Session ID，这个 ID 通常通过 Cookie 或 URL 重写的方式发送给客户端，客户端后续的请求会带上这个 Session ID，服务器根据 ID 查找对应的 Session 数据。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-178** 单个 Cookie 的大小限制通常在 4KB 左右，而且大多数浏览器对每个域名的总 Cookie 数量也有限制。由于 Session 存储在服务器上，理论上不受数据大小的限制，主要受限于服务器的内存大小。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-179** Cookie 相对不安全，因为数据存储在客户端，容易受到 XSS（跨站脚本攻击）的威胁。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-180** 可以通过设置 HttpOnly 属性来防止 JavaScript 访问 Cookie，减少 XSS 攻击的风险，但仍然可能受到 CSRF（跨站请求伪造）的攻击。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-181** Session 通常认为比 Cookie 更安全，因为敏感数据存储在服务器端。但仍然需要防范 Session 劫持（通过获取他人的 Session ID）和会话固定攻击。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-182** Cookie 可以设置过期时间，过期后自动删除；也可以设置为会话 Cookie，通常在浏览器会话结束后被清除，但浏览器的会话恢复功能也可能把它恢复。服务端 Session 的有效期由服务器控制，关闭浏览器并不会直接通知服务端删除 Session，所以两者的生命周期不能简单画等号。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-183** 使用 Cookie 时，因为数据随每个请求发送到服务器，可能会影响网络传输效率，尤其是在 Cookie 数据较大时。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-184** 使用 Session 时，因为数据存储在服务器端，每次请求都需要查询服务器上的 Session 数据，这可能会增加服务器的负载，特别是在高并发场景下。[原文§cookie和session有什么区别？](https://xiaolincoding.com/interview/network.html#cookie%E5%92%8Csession%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### token，session，cookie的区别？

- **T2-185** Cookie 是浏览器存储和发送小段数据的机制。满足域名、路径、Secure、SameSite 等规则时，浏览器会自动携带 Cookie。[原文§token，session，cookie的区别？](https://xiaolincoding.com/interview/network.html#token-session-cookie%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-186** Session 是服务端保存会话状态的方式。客户端通常只持有 Session ID，服务端根据这个 ID 查找登录信息。Session ID 经常放在 Cookie 中，但也可以通过其他方式传递。[原文§token，session，cookie的区别？](https://xiaolincoding.com/interview/network.html#token-session-cookie%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-187** Token 是客户端用来证明身份或权限的凭证。它可以是一个随机字符串，由服务端查表验证，也可以是 JWT 这样的自包含令牌；可以放在 Authorization 请求头中，也可以放进 Cookie。[原文§token，session，cookie的区别？](https://xiaolincoding.com/interview/network.html#token-session-cookie%E7%9A%84%E5%8C%BA%E5%88%AB)
- **T2-188** Token 不一定无状态（随机字符串形式的 Token 由服务端查表验证），JWT 也不一定加密，Session 也不是必须依赖 Cookie。把 JWT 放进 Cookie，并不会让 Cookie 和 JWT 变成同一个概念。[原文§token，session，cookie的区别？](https://xiaolincoding.com/interview/network.html#token-session-cookie%E7%9A%84%E5%8C%BA%E5%88%AB)

### 如果客户端禁用了cookie，session还能用吗？

- **T2-189** 默认情况下禁用 Cookie 后，Session 是无法正常使用的，因为大多数 Web 服务器都是依赖于 Cookie 来传递 Session 的会话 ID 的。客户端浏览器禁用 Cookie 时，服务器将无法把会话 ID 发送给客户端，客户端也无法在后续请求中携带会话 ID 返回给服务器，从而导致服务器无法识别用户会话。[原文§如果客户端禁用了cookie，session还能用吗？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%A6%81%E7%94%A8%E4%BA%86cookie-session%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)
- **T2-190** URL 重写、隐藏表单字段。[原文§如果客户端禁用了cookie，session还能用吗？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%A6%81%E7%94%A8%E4%BA%86cookie-session%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)
- **T2-191** URL 重写：每当服务器响应需要保持状态的请求时，将 Session ID 附加到 URL 中作为参数，例如 http://example.com/page 变为 http://example.com/page;jsessionid=XXXXXX，服务器端需要相应地解析 URL 来获取 Session ID，并维护用户的会话状态。[原文§如果客户端禁用了cookie，session还能用吗？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%A6%81%E7%94%A8%E4%BA%86cookie-session%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)
- **T2-192** URL 重写的缺点是 URL 变得不那么整洁，且如果用户通过电子邮件或其他方式分享了这样的链接，可能导致 Session ID 的意外泄露。[原文§如果客户端禁用了cookie，session还能用吗？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%A6%81%E7%94%A8%E4%BA%86cookie-session%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)
- **T2-193** 隐藏表单字段：在每个需要 Session 信息的 HTML 表单中包含一个隐藏字段用来存储 Session ID，表单提交时 Session ID 随表单数据一起发送回服务器，服务器通过解析表单数据中的 Session ID 来获取用户的会话状态。这种方法仅适用于通过表单提交的交互模式，不适合链接点击或 Ajax 请求。[原文§如果客户端禁用了cookie，session还能用吗？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%A6%81%E7%94%A8%E4%BA%86cookie-session%E8%BF%98%E8%83%BD%E7%94%A8%E5%90%97)

### 如果我把数据存储到 localStorage，和Cookie有什么区别？

- **T2-194** 容量上，单个 Cookie 通常限制在 4 KB 左右，localStorage 通常能存几 MB，具体限制取决于浏览器。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-195** 符合匹配规则的 Cookie 会自动随请求发送；localStorage 不会，需要 JavaScript 读取后主动放进请求。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-196** localStorage 按同源隔离，也就是协议、主机和端口都要相同；Cookie 主要按域名、路径等规则匹配，不按端口隔离，也不能任意跨域使用。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-197** Cookie 可以设置 Max-Age 或 Expires。localStorage 没有内置的过期时间，但用户清理数据、浏览器存储策略等仍然可能让它被删除，所以不能认为写进去就永远存在。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-198** localStorage 可以被同源 JavaScript 读取，发生 XSS 时里面的令牌可能被窃取；Cookie 可以设置 HttpOnly 来阻止 JavaScript 读取，但自动携带身份 Cookie 又需要考虑 CSRF。因此不能断言 localStorage 一定比 Cookie 安全。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-199** 因为 localStorage 可以被同源 JavaScript 读取，发生 XSS 时里面的令牌可能被窃取；Cookie 虽然会自动携带，但可以设置 HttpOnly 阻止 JavaScript 读取，只是自动携带身份 Cookie 要考虑 CSRF。所以要看保存什么数据，以及如何防范 XSS、CSRF 和凭证泄露，不能只凭是否自动发送就断言谁更安全。[原文§如果我把数据存储到 localStorage，和Cookie有什么区别？](https://xiaolincoding.com/interview/network.html#%E5%A6%82%E6%9E%9C%E6%88%91%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%88%B0-localstorage-%E5%92%8Ccookie%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 什么数据应该存在到cookie，什么数据存放到 Localstorage

- **T2-200** Cookie 适合保存需要随请求发送的小型数据，比如 Session ID；身份 Cookie 还要配合 HttpOnly、Secure 和合适的 SameSite 属性，并在服务端做好会话验证。[原文§什么数据应该存在到cookie，什么数据存放到 Localstorage](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E5%AD%98%E5%9C%A8%E5%88%B0cookie-%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%AD%98%E6%94%BE%E5%88%B0-localstorage)
- **T2-201** localStorage 适合保存只在浏览器端使用的偏好和非敏感缓存，比如主题、列表展示方式。[原文§什么数据应该存在到cookie，什么数据存放到 Localstorage](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E5%AD%98%E5%9C%A8%E5%88%B0cookie-%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%AD%98%E6%94%BE%E5%88%B0-localstorage)
- **T2-202** 身份 Cookie 通常要配合 HttpOnly、Secure 和合适的 SameSite 属性，并在服务端做好会话验证；设置属性不能代替服务端验证。[原文§什么数据应该存在到cookie，什么数据存放到 Localstorage](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E5%AD%98%E5%9C%A8%E5%88%B0cookie-%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%AD%98%E6%94%BE%E5%88%B0-localstorage)
- **T2-203** localStorage 没有内置过期机制，需要过期时可以由业务代码保存时间戳并主动清理。[原文§什么数据应该存在到cookie，什么数据存放到 Localstorage](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E5%AD%98%E5%9C%A8%E5%88%B0cookie-%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%AD%98%E6%94%BE%E5%88%B0-localstorage)
- **T2-204** 无论放在 Cookie 还是 localStorage，客户端的数据都不能直接当成权限依据。localStorage 里写着「管理员」，不代表服务端就应该给这个用户管理员权限。[原文§什么数据应该存在到cookie，什么数据存放到 Localstorage](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%BA%94%E8%AF%A5%E5%AD%98%E5%9C%A8%E5%88%B0cookie-%E4%BB%80%E4%B9%88%E6%95%B0%E6%8D%AE%E5%AD%98%E6%94%BE%E5%88%B0-localstorage)

### Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？

- **T2-205** 依次是 HttpOnly、Secure、SameSite。HttpOnly 不允许 JavaScript 通过 document.cookie 读取 Cookie；Secure 要求 Cookie 通过安全连接（通常是 HTTPS）发送；SameSite 控制跨站请求是否携带 Cookie，用来减少 CSRF 风险。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **T2-206** HttpOnly 不允许 JavaScript 通过 document.cookie 读取 Cookie，减少身份凭证被 XSS 脚本直接窃取的风险。但浏览器仍然会发送它，恶意脚本也可能借用户的身份发请求。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **T2-207** Secure 要求 Cookie 通过安全连接发送，通常就是 HTTPS。它不负责限制 JavaScript 读取，限制 JavaScript 读取的是 HttpOnly。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **T2-208** SameSite 控制跨站请求是否携带 Cookie：Strict 比较严格；Lax 允许部分场景，比如从其他网站点击普通 GET 链接；None 允许跨站发送，通常必须同时设置 Secure。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **T2-209** 跨站和跨域不是完全相同的概念。两个同协议、同主域下的子域名可能属于同站，但仍然不同源。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- **T2-210** SameSite 也不能替代所有 CSRF 防护，服务端还要根据业务使用 CSRF Token、来源校验等措施。[原文§Cookie 的 HttpOnly、Secure 和 SameSite 分别有什么作用？](https://xiaolincoding.com/interview/network.html#cookie-%E7%9A%84-httponly%E3%80%81secure-%E5%92%8C-samesite-%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

### JWT 令牌和传统方式有什么区别？

- **T2-211** 这里通常是把 JWT 和「服务端保存 Session、客户端保存 Session ID」的方式比较。Session 方式下，客户端持有一个标识，服务端通过它查询会话数据；集群通常需要共享 Session 或做会话保持；服务端删除会话后可以立即让对应登录失效。验证签名后直接得到身份信息、不必查询 Session 的是 JWT 方式。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-212** JWT 方式是把必要的身份声明放进令牌，并对它签名。服务端验证签名和声明后，可以直接得到身份信息，不必为每个请求查询 Session。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-213** JWT 的好处是方便多个服务独立验证，但代价是撤销和更新权限比较麻烦。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-214** 如果引入黑名单或令牌版本校验，服务端仍然需要维护状态，JWT 就不再是完全不依赖服务端状态。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-215** 常见的签名 JWT 只是防篡改，不是加密，任何拿到令牌的人通常都能解码 Header 和 Payload，里面不要放密码等敏感信息。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-216** 跨域能否访问由浏览器的 CORS 等规则决定，并不是用了 JWT 就自动允许跨域。[原文§JWT 令牌和传统方式有什么区别？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%92%8C%E4%BC%A0%E7%BB%9F%E6%96%B9%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### JWT 令牌都有哪些字段？

- **T2-217** 依次是 Header、Payload、Signature，三部分中间用点号分隔。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-218** Header 描述令牌类型和签名算法，比如 typ、alg，也可以用 kid 标识密钥；身份声明在 Payload 里，防篡改的签名在 Signature 里。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-219** iss 是签发者，aud 是接收方，exp 是过期时间，jti 是令牌标识。哪些字段需要携带，要看业务约定。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-220** sub 是主题（常用于用户标识），nbf 是生效时间，iat 是签发时间。哪些字段需要携带，要看业务约定。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-221** Signature 是对编码后的 Header 和 Payload 进行签名或计算消息认证码，防止内容被篡改；它不负责加密。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-222** 这里使用的是 Base64URL 编码，不是加密，所以不能把敏感信息放进去指望被保护。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-223** 如果使用 HMAC，签发和验证使用共享密钥；如果使用 RSA、ECDSA 等签名算法，则用私钥签名、公钥验证。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)
- **T2-224** 服务端不能只解码 Payload 就信任里面的数据，还要限制允许的算法，验证签名，并检查过期时间、签发者和接收方等业务需要的声明。[原文§JWT 令牌都有哪些字段？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E9%83%BD%E6%9C%89%E5%93%AA%E4%BA%9B%E5%AD%97%E6%AE%B5)

### JWT 令牌为什么能解决集群部署，什么是集群部署？

- **T2-225** 集群部署就是把同一个服务部署到多台服务器，通过负载均衡把请求分发到不同实例。一台机器故障时，其他实例还可以继续提供服务。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)
- **T2-226** 传统方式下会话信息通常存储在服务器的内存或数据库中，但集群部署中不同服务器之间没有共享的会话信息，会导致用户在不同服务器之间切换时需要重新登录，或者需要引入额外的共享机制（如 Redis），增加了复杂性和性能开销。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)
- **T2-227** JWT 令牌在令牌中包含必要的身份验证和会话信息，服务器无需存储会话信息。用户登录认证后，服务器生成 JWT 返回给客户端，客户端后续请求携带该令牌，服务器通过验证和解析令牌就能获取用户身份和权限信息，无需访问共享的会话存储。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)
- **T2-228** 集群中的实例需要有一致的验证规则，并持有对应的共享密钥或验证公钥，才能独立验证同一个 JWT；验证时不需要访问共享的会话存储。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)
- **T2-229** 权限更新、令牌撤销和密钥轮换仍然需要设计。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)
- **T2-230** JWT 解决的是会话验证的一部分问题，并不会自动解决所有集群问题；Session 配合 Redis 共享也同样可以用于集群。[原文§JWT 令牌为什么能解决集群部署，什么是集群部署？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%83%BD%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2-%E4%BB%80%E4%B9%88%E6%98%AF%E9%9B%86%E7%BE%A4%E9%83%A8%E7%BD%B2)

### jwt的缺点是什么？

- **T2-231** 最常见的问题是：只靠签名和过期时间验证的 JWT，签发后很难立即撤销。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-232** 前端删除令牌并不能让别人已经复制走的令牌失效，因为只靠签名和过期时间验证的 JWT 签发后很难立即撤销。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-233** 权限更新不及时、体积较大、内容可能泄露、实现容易出错。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-234** 权限更新不及时：令牌里保存的角色和权限可能已经过时，如果不额外查询，服务端要等旧令牌过期才看到变化。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-235** 实现容易出错：只解码不验签、不检查 exp 或接受不允许的算法，都可能造成安全问题。用 Base64URL 编码本身是常见签名 JWT 的正常做法。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-236** 常见做法是设置较短的访问令牌有效期，配合刷新令牌。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)
- **T2-237** 可以用 Redis 保存 jti 黑名单，或者保存用户的令牌版本，验证时检查，从而立即撤销令牌；代价是要承担状态存储和查询的成本。[原文§jwt的缺点是什么？](https://xiaolincoding.com/interview/network.html#jwt%E7%9A%84%E7%BC%BA%E7%82%B9%E6%98%AF%E4%BB%80%E4%B9%88)

### JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？

- **T2-238** 重新签发一个 JWT，不会自动让旧 JWT 失效。攻击者持有的旧令牌，如果仍能通过签名、有效期和业务校验，就还可以继续使用。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)
- **T2-239** 可以把令牌的 jti 或摘要加入服务端黑名单并让各实例验证时检查（黑名单可在原令牌过期后清理）；如果业务维护了令牌版本或会话状态，可以更新版本、撤销该会话，要求相关用户重新登录；刷新令牌也泄露的话要一起撤销。重新登录获得新令牌不会让旧令牌自动失效。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)
- **T2-240** 如果刷新令牌也泄露了，要一起撤销，否则攻击者仍然可以继续换取新的访问令牌。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)
- **T2-241** 限制损失窗口的做法是：访问令牌使用较短的有效期，使用 HTTPS，并避免把令牌放进 URL、日志等容易泄露的位置。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)
- **T2-242** 签名密钥泄露时，攻击者可能自行伪造令牌，需要轮换密钥，并在验证端停止接受受影响的旧密钥，不能只拉黑某一个 JWT。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)
- **T2-243** 令牌泄露是某个具体令牌被他人拿到，可以把其 jti 或摘要加入黑名单、更新令牌版本或撤销会话，刷新令牌泄露要一并撤销，并用短有效期、HTTPS 等限制损失窗口。签名密钥泄露时，攻击者可能自行伪造令牌，需要轮换密钥并让验证端停止接受受影响的旧密钥，不能只拉黑某一个 JWT。[原文§JWT 令牌如果泄露了，怎么解决，JWT是怎么做的？](https://xiaolincoding.com/interview/network.html#jwt-%E4%BB%A4%E7%89%8C%E5%A6%82%E6%9E%9C%E6%B3%84%E9%9C%B2%E4%BA%86-%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3-jwt%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84)

### 前端是如何存储JWT的？

- **T2-244** Cookie、localStorage、sessionStorage 和内存，要根据登录体验和安全需求选择。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-245** 服务端可以通过 Set-Cookie 写入令牌，配合 HttpOnly、Secure、SameSite。HttpOnly 可以避免 JavaScript 直接读取令牌，但自动携带 Cookie 的认证方式要防范 CSRF。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-246** localStorage 刷新页面、重新打开浏览器后通常还能保留，方便保持登录。但它可以被 JavaScript 读取，发生 XSS 时可能被窃取，因此不适合无条件地保存长期有效的敏感凭证。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-247** sessionStorage 通常按来源和标签页隔离，刷新当前页面不会清空，标签页会话结束后通常被清除。它同样可以被 JavaScript 读取，所以也有 XSS 风险。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-248** 可以把短期访问令牌保存在 JavaScript 内存中，主动放入 Authorization 请求头。刷新页面后通常会丢失，需要通过刷新令牌等机制恢复。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-249** 内存保存也不能让应用免受 XSS，恶意脚本仍然可能调用业务接口。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)
- **T2-250** 一种常见设计是短期访问令牌放内存，刷新令牌放 HttpOnly Cookie。但刷新接口仍要考虑 CSRF，并不是换个存储位置就能解决所有安全问题。[原文§前端是如何存储JWT的？](https://xiaolincoding.com/interview/network.html#%E5%89%8D%E7%AB%AF%E6%98%AF%E5%A6%82%E4%BD%95%E5%AD%98%E5%82%A8jwt%E7%9A%84)

### 为什么有HTTP协议了?还要用RPC?

- **T2-251** HTTP 是协议，RPC 是远程调用的方式，它们并不互斥。RPC 底层完全可以使用 HTTP，比如 gRPC 通常基于 HTTP/2。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-252** RPC 希望让程序员像调用本地方法一样调用远端服务。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-253** 接口契约、序列化、服务治理、流式调用。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-254** 接口契约：用 IDL 定义接口和数据类型，生成客户端、服务端代码，减少手工拼请求和解析结果。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-255** 服务治理：结合相关框架处理服务发现、负载均衡、超时、重试、调用链追踪等。客户端流、服务端流和双向流属于流式调用，是另一类能力。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-256** 选择 RPC 框架更多是为了接口约束和配套能力，不能笼统地说「RPC 一定比 HTTP 快」。性能要看底层协议、序列化方式、连接复用和实际业务。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)
- **T2-257** HTTP 是协议，RPC 是远程调用的方式，二者并不互斥：RPC 希望让程序员像调用本地方法一样调用远端服务，底层完全可以使用 HTTP（如 gRPC 通常基于 HTTP/2）。服务调用除了发送数据，还要处理接口契约（用 IDL 生成客户端和服务端代码）、序列化（如 Protobuf）、服务治理（服务发现、负载均衡、超时、重试、调用链追踪）和流式调用等，所以选择 RPC 更多是为了接口约束和配套能力，而不是它一定比 HTTP 快。[原文§为什么有HTTP协议了?还要用RPC?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89http%E5%8D%8F%E8%AE%AE%E4%BA%86-%E8%BF%98%E8%A6%81%E7%94%A8rpc)

### HTTP长连接与WebSocket有什么区别？

- **T2-258** HTTP 长连接解决连接复用，WebSocket 解决持续的双向消息通信。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-259** HTTP/1.1 长连接让多个请求和响应复用同一个 TCP 连接，但通信仍然围绕请求和响应展开。长连接本身不会让服务端可以随时向客户端发送一条新的独立业务消息。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-260** 依次是 Upgrade、101 Switching Protocols、帧：先通过 HTTP/1.1 发起 Upgrade 握手，服务端返回 101 Switching Protocols 后，双方在连接上传输 WebSocket 帧。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-261** 连接建立后，客户端和服务端都可以主动发送消息，适合聊天室、实时协作等场景。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-262** 这里不要简单地说 HTTP「只能半双工」。底层 TCP 本来就是全双工的，HTTP 也能通过流式响应等方式持续发送数据，区别主要在应用层的通信方式。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-263** 如果只是服务端持续推送，比如消息通知或 AI 输出，也可以使用 SSE：通过 HTTP 的 text/event-stream 响应发送事件，浏览器原生 EventSource 支持重连。需要双向交互、客户端和服务端都主动发送消息的是 WebSocket。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-264** 需要频繁的双向交互时，WebSocket 通常更合适；如果只是服务端持续推送，也可以使用 SSE。[原文§HTTP长连接与WebSocket有什么区别？](https://xiaolincoding.com/interview/network.html#http%E9%95%BF%E8%BF%9E%E6%8E%A5%E4%B8%8Ewebsocket%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### 什么是跨域？CORS 是怎么解决跨域问题的？

- **T2-265** 浏览器用同源策略限制不同来源之间访问数据，协议、主机或端口任意一个不同，就属于不同源。比如 https://api.example.com 和 https://www.example.com 不同源。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-266** CORS 的思路是：服务端通过响应头告诉浏览器，哪些来源可以读取这个响应。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-267** 满足条件的简单请求可以直接发送，浏览器再检查响应中的 Access-Control-Allow-Origin 等字段。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-268** 使用 PUT、Authorization 或 application/json 等不满足简单请求条件的请求，浏览器通常先发 OPTIONS 预检，询问服务端是否允许对应来源、方法和请求头，允许后再发实际请求。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-269** 要携带 Cookie 等凭证时，客户端和服务端都要做相应配置，服务端允许的来源不能写成通配符 *，需要返回允许的具体来源，并设置 Access-Control-Allow-Credentials。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-270** 出现跨域错误，不代表请求一定没发到服务器。简单请求可能已经执行了，只是浏览器不让页面读取响应。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-271** 简单请求可能已经执行了，只是浏览器不让页面读取响应，所以 CORS 不能当作通用的 CSRF 防护，也不能代替服务端鉴权。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)
- **T2-272** 浏览器用同源策略限制不同来源之间访问数据，协议、主机或端口任意一个不同就属于不同源。CORS 的思路是服务端通过响应头告诉浏览器哪些来源可以读取响应：简单请求直接发送，浏览器再检查 Access-Control-Allow-Origin 等字段；使用 PUT、Authorization 或 application/json 等的请求，浏览器通常先发 OPTIONS 预检，允许后再发实际请求；要携带 Cookie 等凭证时，服务端允许的来源不能写成 *，需要返回具体来源并设置 Access-Control-Allow-Credentials。[原文§什么是跨域？CORS 是怎么解决跨域问题的？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-cors-%E6%98%AF%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E7%9A%84)

### 正向代理和反向代理有什么区别？

- **T2-273** 正向代理主要替客户端访问服务器，反向代理主要替服务器接收客户端请求。[原文§正向代理和反向代理有什么区别？](https://xiaolincoding.com/interview/network.html#%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-274** 公司员工通过统一代理访问外部网站，这是正向代理：客户端把请求交给代理，再由代理访问目标服务器。[原文§正向代理和反向代理有什么区别？](https://xiaolincoding.com/interview/network.html#%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-275** 网站前面放一层 Nginx，把请求分配给后端多个服务实例，这是反向代理。用户访问的是网站的统一入口，不需要知道后面具体是哪台机器处理。[原文§正向代理和反向代理有什么区别？](https://xiaolincoding.com/interview/network.html#%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-276** 反向代理通常还能做 TLS 终止、负载均衡、缓存和限流。替员工通过统一出口访问外部网站是正向代理的例子。[原文§正向代理和反向代理有什么区别？](https://xiaolincoding.com/interview/network.html#%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T2-277** 实际排查时，要把「客户端到代理」和「代理到后端」当作两段连接来看，前一段正常不代表后一段也正常。[原文§正向代理和反向代理有什么区别？](https://xiaolincoding.com/interview/network.html#%E6%AD%A3%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### CDN 是怎么加速访问的？

- **T2-278** CDN 的核心是把内容缓存到靠近用户的边缘节点，减少到源站的传输距离和重复请求。比如一张图片被各地用户反复访问，没有 CDN 时都要到源站下载，有了 CDN 就可以在多个地区的边缘节点复用缓存。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)
- **T2-279** 典型过程中，用户访问网站，DNS 或其他调度机制把请求引导到合适的 CDN 节点。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)
- **T2-280** 节点命中有效缓存，就直接返回资源。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)
- **T2-281** 回源：没有命中或缓存需要更新时向源站请求内容，然后按缓存规则保存和返回。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)
- **T2-282** CDN 是否有效还要看缓存命中率、回源耗时和资源类型。用户登录信息、个人订单等内容不能随便放进共享缓存，因此不是提升有效性的做法。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)
- **T2-283** 用户登录信息、个人订单等内容不能随便放进共享缓存，缓存 key 和缓存规则配错了，可能把一个用户的数据返回给另一个用户。[原文§CDN 是怎么加速访问的？](https://xiaolincoding.com/interview/network.html#cdn-%E6%98%AF%E6%80%8E%E4%B9%88%E5%8A%A0%E9%80%9F%E8%AE%BF%E9%97%AE%E7%9A%84)

### Nginx有哪些负载均衡算法？

- **T2-284** 轮询、最少连接（least_conn）、IP 哈希（ip_hash）、通用哈希（hash）、最短时间（least_time）。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-285** 轮询是默认方式，依次把请求分配给后端服务器，也可以通过 weight 配置权重，让处理能力强的节点承担更多请求。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-286** 最少连接 least_conn 优先选择活跃连接较少的后端，适合不同请求耗时差异较大的场景。不过连接少不一定代表 CPU 负载低。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-287** IP 哈希 ip_hash 根据客户端 IP 选择后端，可以做一定程度的会话保持。但多个用户经过同一个 NAT 出口时，可能集中到同一个节点。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-288** 通用哈希 hash 根据指定的 key 选择后端，比如使用请求 URI。加上 consistent 可以使用一致性哈希，减少节点变化时的映射调整。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-289** 最短时间 least_time 结合响应时间和连接情况选择后端。官方文档注明，该指令在 1.31.0 以前仅商业订阅提供；自 1.31.0 起不再仅限商业订阅，但仍需显式配置 least_time，不能理解为所有开源 Nginx 版本默认采用此算法。（原文写“这是 NGINX Plus 的能力，不能当作所有开源 Nginx 都默认具备的功能”，未注明 1.31.0 的版本分界。）[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95) [核对来源：NGINX upstream least_time 官方文档](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#least_time)
- **T2-290** 面试里最好把算法和场景对应起来：静态资源缓存可以考虑按 URI 做哈希，耗时不均的请求可以考虑 least_conn。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)
- **T2-291** 会话保持不是 Session 共享的替代品，节点故障时仍然要考虑会话能不能在其他节点继续使用。[原文§Nginx有哪些负载均衡算法？](https://xiaolincoding.com/interview/network.html#nginx%E6%9C%89%E5%93%AA%E4%BA%9B%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%AE%97%E6%B3%95)

### Nginx位于七层网络结构中的哪一层？

- **T2-292** 要看使用哪个模块。同一个 Nginx 可以按配置提供不同层面的代理能力，所以不能直接说「Nginx 只能工作在应用层」。[原文§Nginx位于七层网络结构中的哪一层？](https://xiaolincoding.com/interview/network.html#nginx%E4%BD%8D%E4%BA%8E%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E5%93%AA%E4%B8%80%E5%B1%82)
- **T2-293** 使用 HTTP 模块做反向代理时，会解析请求的域名、路径、头部等信息，通常说它是七层负载均衡。[原文§Nginx位于七层网络结构中的哪一层？](https://xiaolincoding.com/interview/network.html#nginx%E4%BD%8D%E4%BA%8E%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E5%93%AA%E4%B8%80%E5%B1%82)
- **T2-294** 依次是七、四：HTTP 模块解析域名、路径、头部，通常说是七层负载均衡；stream 模块主要按连接或数据流转发，通常说是四层负载均衡。[原文§Nginx位于七层网络结构中的哪一层？](https://xiaolincoding.com/interview/network.html#nginx%E4%BD%8D%E4%BA%8E%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E5%93%AA%E4%B8%80%E5%B1%82)
- **T2-295** 所以不能直接说「Nginx 只能工作在应用层」。同一个 Nginx 可以按配置提供不同层面的代理能力。[原文§Nginx位于七层网络结构中的哪一层？](https://xiaolincoding.com/interview/network.html#nginx%E4%BD%8D%E4%BA%8E%E4%B8%83%E5%B1%82%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84%E4%B8%AD%E7%9A%84%E5%93%AA%E4%B8%80%E5%B1%82)

## 3. 传输层

原文：[计算机网络面试题 · 传输层](https://xiaolincoding.com/interview/network.html#%E4%BC%A0%E8%BE%93%E5%B1%82)。

### 一条 TCP 连接是由什么唯一确定的？

- **T3-1** 通常由源 IP、源端口、目的 IP、目的端口这四个字段确定，也就是四元组。[原文§一条 TCP 连接是由什么唯一确定的？](https://xiaolincoding.com/interview/network.html#%E4%B8%80%E6%9D%A1-tcp-%E8%BF%9E%E6%8E%A5%E6%98%AF%E7%94%B1%E4%BB%80%E4%B9%88%E5%94%AF%E4%B8%80%E7%A1%AE%E5%AE%9A%E7%9A%84)
- **T3-2** 服务监听 443 端口可以同时接受很多客户端连接。虽然它们的服务端 IP 和端口相同，但客户端的 IP 或端口不同，也就是四元组不同，内核就能区分不同连接。[原文§一条 TCP 连接是由什么唯一确定的？](https://xiaolincoding.com/interview/network.html#%E4%B8%80%E6%9D%A1-tcp-%E8%BF%9E%E6%8E%A5%E6%98%AF%E7%94%B1%E4%BB%80%E4%B9%88%E5%94%AF%E4%B8%80%E7%A1%AE%E5%AE%9A%E7%9A%84)
- **T3-3** 不能因为端口号只有 16 位，就说一台服务器最多只能建立约 6 万条 TCP 连接。连接数还取决于四元组组合、文件描述符、内存和应用处理能力。[原文§一条 TCP 连接是由什么唯一确定的？](https://xiaolincoding.com/interview/network.html#%E4%B8%80%E6%9D%A1-tcp-%E8%BF%9E%E6%8E%A5%E6%98%AF%E7%94%B1%E4%BB%80%E4%B9%88%E5%94%AF%E4%B8%80%E7%A1%AE%E5%AE%9A%E7%9A%84)
- **T3-4** 连接数取决于四元组组合、文件描述符、内存和应用处理能力，而不是简单地被 16 位端口号限制在约 6 万条；客户端向固定目标主动建连时，可用源端口则可能成为限制。因此“最多约 6 万条”和“不再受系统资源限制”这两种说法都不成立。[原文§一条 TCP 连接是由什么唯一确定的？](https://xiaolincoding.com/interview/network.html#%E4%B8%80%E6%9D%A1-tcp-%E8%BF%9E%E6%8E%A5%E6%98%AF%E7%94%B1%E4%BB%80%E4%B9%88%E5%94%AF%E4%B8%80%E7%A1%AE%E5%AE%9A%E7%9A%84)
- **T3-5** 如果连接经过 NAT，转换设备还需要维护对应的映射，NAT 的端口和状态表也可能限制连接数量。[原文§一条 TCP 连接是由什么唯一确定的？](https://xiaolincoding.com/interview/network.html#%E4%B8%80%E6%9D%A1-tcp-%E8%BF%9E%E6%8E%A5%E6%98%AF%E7%94%B1%E4%BB%80%E4%B9%88%E5%94%AF%E4%B8%80%E7%A1%AE%E5%AE%9A%E7%9A%84)

### 说一下tcp的头部

- **T3-6** TCP 首部最少是 20 字节，带选项时最多是 60 字节。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-7** 窗口大小是接收方通告还能接收多少数据，用于流量控制。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-8** 校验和用来检测报文在传输中是否发生损坏，它不是用于抵抗攻击的密码学校验。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-9** 序列号的初始值是建立连接时由计算机生成的随机数，通过 SYN 包传给接收端主机；之后每发送一次数据，就累加一次该数据字节数的大小。它用来解决网络包乱序问题。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-10** 确认应答号指下一次期望收到的数据的序列号，发送端收到这个确认应答以后可以认为在这个序号以前的数据都已经被正常接收，用来解决丢包的问题。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-11** RST 位为 1 表示 TCP 连接中出现异常必须强制断开连接；SYN 位为 1 表示希望建立连接，并在其序列号字段进行序列号初始值的设定；FIN 位为 1 表示今后不会再有数据发送，希望断开连接。答案依次是 RST、SYN、FIN。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)
- **T3-12** ACK 位为 1 时，确认应答字段变为有效，连接建立后的数据报文通常会带 ACK，但不能说所有其他报文都必须带 ACK，比如某些 RST 报文就可以不带。[原文§说一下tcp的头部](https://xiaolincoding.com/interview/network.html#%E8%AF%B4%E4%B8%80%E4%B8%8Btcp%E7%9A%84%E5%A4%B4%E9%83%A8)

### TCP三次握手过程说一下？

- **T3-13** 客户端随机初始化序号 client_isn，填入 TCP 首部的序号字段，同时把 SYN 标志位置为 1，发送第一个 SYN 报文向服务端发起连接；该报文不包含应用层数据，之后客户端处于 SYN-SENT 状态。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-14** 服务端收到客户端的 SYN 报文后，也随机初始化自己的序号 server_isn 填入序号字段，把确认应答号字段填入 client_isn + 1，并把 SYN 和 ACK 标志位置为 1，该报文也不包含应用层数据，之后服务端处于 SYN-RCVD 状态。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-15** 客户端收到服务端报文后，还要向服务端回应最后一个应答报文：该报文 TCP 首部的 ACK 标志位置为 1，确认应答号字段填入 server_isn + 1，然后发送给服务端，之后客户端处于 ESTABLISHED 状态。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-16** 普通 TCP 三次握手通常不在前两个报文里携带应用数据，第三次握手可以携带数据。不过这不是绝对限制，比如 TCP Fast Open 就允许在满足条件时让 SYN 携带数据。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-17** 服务端主动监听端口后处于 LISTEN 状态；客户端发出第一个 SYN 后处于 SYN-SENT 状态；服务端发出 SYN + ACK 后处于 SYN-RCVD 状态（也写作 SYN_RCVD）；客户端发出最后一个应答报文后处于 ESTABLISHED 状态，服务端收到该应答后也进入 ESTABLISHED。答案依次是 LISTEN、SYN-SENT、SYN-RCVD、ESTABLISHED。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-18** SYN 会消耗一个序列号，所以确认号是初始序列号加 1；单纯的 ACK 不消耗序列号。[原文§TCP三次握手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)

### tcp为什么需要三次握手建立连接？

- **T3-19** 三次握手的原因：可以阻止重复历史连接的初始化（主要原因）、可以同步双方的初始序列号、可以避免资源浪费。答案依次是：重复历史连接、初始序列号、资源浪费。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-20** 原文引用 RFC 793 指出，三次握手的首要原因是为了防止旧的重复连接初始化造成混乱，也就是防止“历史连接”初始化了连接；这是主要原因，同步初始序列号和避免资源浪费是另外两个原因。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-21** 在两次 SYN 使用相同四元组、客户端当前已以 seq = 100 发起新连接的前提下，旧 SYN 先到达服务端时，服务端会回一个 SYN + ACK 报文，确认号是 91（90 + 1）；客户端收到后发现自己期望的确认号应该是 100 + 1，而不是 90 + 1，于是回 RST 报文；服务端收到 RST 报文后释放连接；后续最新的 SYN 抵达服务端后，双方就可以正常完成三次握手。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-22** 两次握手的情况下，服务端收到 SYN 报文后就进入 ESTABLISHED 状态，这时它可以发送数据，但客户端若判断出这是历史连接会回 RST 断开；服务端没有中间状态来提前阻止历史连接，也不知道这是历史连接，只有收到 RST 后才断开，导致服务端建立了历史连接、白白发送数据，浪费资源。要在服务端发送数据前阻止历史连接，就需要三次握手。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-23** 序列号是可靠传输的关键因素，它的作用有：接收方可以去除重复的数据；接收方可以根据数据包的序列号按序接收；可以标识发送出去的数据包中哪些已经被对方收到（通过 ACK 报文中的确认号知道）。检测报文损坏是校验和的作用，通告可接收数据量是窗口大小的作用。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-24** 客户端发送带初始序列号的 SYN 后需要服务端回 ACK 确认，服务端发送初始序列号时也要得到客户端的应答，这样一来一回才能确保双方的初始序列号被可靠同步。两次握手只保证了一方的初始序列号能被对方成功接收，没办法保证双方的初始序列号都能被确认接收。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-25** 四次握手其实也能够可靠地同步双方的初始化序号，但由于第二步和第三步可以优化成一步，所以就成了三次握手。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-26** 如果只有两次握手，服务端发出 SYN + ACK 后就认为连接已建立，却不知道客户端是否收到并接受了这个响应；比如一个旧 SYN 在网络里绕了很久才到达服务端，客户端已不需要这条连接，服务端若直接建立完整连接并发送业务数据，就会白白占用资源。三次握手让服务端在得到客户端的确认之后再建立正常的完整连接。不过第三次握手到达前，服务端通常仍要占用半连接资源，所以三次握手不能直接消除 SYN Flood 的风险。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)
- **T3-27** 客户端重启后又重新向服务端建立连接，发送的是新的 SYN（如 seq = 100），不是重传 SYN，因为重传的 SYN 的序列号是一样的。[原文§tcp为什么需要三次握手建立连接？](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5)

### TCP 三次握手，客户端第三次发送的确认包丢失了发生什么？

- **T3-28** 第三次握手的 ACK 是对第二次握手的 SYN 的确认报文，所以当它丢失、服务端迟迟收不到时，服务端会触发超时重传机制，重传 SYN-ACK 报文，直到收到第三次握手，或者达到最大重传次数。[原文§TCP 三次握手，客户端第三次发送的确认包丢失了发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AC%AC%E4%B8%89%E6%AC%A1%E5%8F%91%E9%80%81%E7%9A%84%E7%A1%AE%E8%AE%A4%E5%8C%85%E4%B8%A2%E5%A4%B1%E4%BA%86%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-29** 纯 ACK 不会像数据或 SYN 那样启动自己的超时重传定时器，丢失后是服务端因收不到确认而重传 SYN-ACK，客户端收到后会再次回复 ACK；如果第三次握手携带了数据，那么数据仍然受重传机制保护。[原文§TCP 三次握手，客户端第三次发送的确认包丢失了发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AC%AC%E4%B8%89%E6%AC%A1%E5%8F%91%E9%80%81%E7%9A%84%E7%A1%AE%E8%AE%A4%E5%8C%85%E4%B8%A2%E5%A4%B1%E4%BA%86%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-30** 客户端已进入 ESTABLISHED 并发送了数据时，数据报文也会携带有效 ACK。如果服务端收到的报文满足握手完成条件，也可以据此完成握手，不一定非要等最开始的那个纯 ACK。[原文§TCP 三次握手，客户端第三次发送的确认包丢失了发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AC%AC%E4%B8%89%E6%AC%A1%E5%8F%91%E9%80%81%E7%9A%84%E7%A1%AE%E8%AE%A4%E5%8C%85%E4%B8%A2%E5%A4%B1%E4%BA%86%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-31** 服务端超时重传 2 次 SYN-ACK 后，由于 tcp_synack_retries 为 2，已达到最大重传次数，于是再等待一段时间（时间为上一次超时时间的 2 倍），如果还是没能收到客户端的第三次握手（ACK 报文），服务端就会断开连接。[原文§TCP 三次握手，客户端第三次发送的确认包丢失了发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AC%AC%E4%B8%89%E6%AC%A1%E5%8F%91%E9%80%81%E7%9A%84%E7%A1%AE%E8%AE%A4%E5%8C%85%E4%B8%A2%E5%A4%B1%E4%BA%86%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)

### 服务端发送第二个报文后连接的状态进入什么状态

- **T3-32** 服务端发送第二个报文（SYN + ACK）后进入 SYN_RCVD，表示已经收到了客户端的 SYN，并发出了自己的 SYN + ACK，正在等待客户端确认。[原文§服务端发送第二个报文后连接的状态进入什么状态](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8F%91%E9%80%81%E7%AC%AC%E4%BA%8C%E4%B8%AA%E6%8A%A5%E6%96%87%E5%90%8E%E8%BF%9E%E6%8E%A5%E7%9A%84%E7%8A%B6%E6%80%81%E8%BF%9B%E5%85%A5%E4%BB%80%E4%B9%88%E7%8A%B6%E6%80%81)
- **T3-33** 客户端此时可能还在 SYN_SENT，也可能已经收到 SYN + ACK 并进入 ESTABLISHED，不能认为两端状态总是同步变化。[原文§服务端发送第二个报文后连接的状态进入什么状态](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8F%91%E9%80%81%E7%AC%AC%E4%BA%8C%E4%B8%AA%E6%8A%A5%E6%96%87%E5%90%8E%E8%BF%9E%E6%8E%A5%E7%9A%84%E7%8A%B6%E6%80%81%E8%BF%9B%E5%85%A5%E4%BB%80%E4%B9%88%E7%8A%B6%E6%80%81)

### 三次握手和 accept 是什么关系？ accept 做了哪些事情？

- **T3-34** 三次握手由内核完成，accept 负责取出已经建立的连接，不负责发起或完成握手。[原文§三次握手和 accept 是什么关系？ accept 做了哪些事情？](https://xiaolincoding.com/interview/network.html#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C-accept-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB-accept-%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85)
- **T3-35** 服务端调用 listen 后，内核开始处理连接请求。正常完成三次握手的连接会进入全连接队列，也叫 accept 队列，等待应用程序取走。[原文§三次握手和 accept 是什么关系？ accept 做了哪些事情？](https://xiaolincoding.com/interview/network.html#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C-accept-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB-accept-%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85)
- **T3-36** 应用调用 accept 时，会从队列中取出连接，返回一个新的已连接 socket 文件描述符，后续用这个描述符收发数据。原来的监听 socket 继续接收其他连接。[原文§三次握手和 accept 是什么关系？ accept 做了哪些事情？](https://xiaolincoding.com/interview/network.html#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C-accept-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB-accept-%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85)
- **T3-37** 队列为空时，阻塞 accept 会等待；非阻塞 accept 会返回 EAGAIN 或 EWOULDBLOCK。[原文§三次握手和 accept 是什么关系？ accept 做了哪些事情？](https://xiaolincoding.com/interview/network.html#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C-accept-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB-accept-%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85)
- **T3-38** 即使应用暂时没有调用 accept，内核也可能已经完成握手并接收数据，只是如果应用长期不取连接，全连接队列可能被占满。[原文§三次握手和 accept 是什么关系？ accept 做了哪些事情？](https://xiaolincoding.com/interview/network.html#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C-accept-%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB-accept-%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85)

### 客户端发送的第一个 SYN 报文，服务器没有收到怎么办？

- **T3-39** 客户端发送 SYN 后进入 SYN_SENT。如果一直没有收到服务端的 SYN + ACK，就会超时重传 SYN，同一次连接的 SYN 重传使用相同的初始序列号。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-40** 在 Linux 中，可以通过 cat /proc/sys/net/ipv4/tcp_syn_retries 查看主动建连的 SYN 重试配置。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-41** 具体重试次数和间隔要看内核版本、系统配置及 socket 选项，不能把“默认一定重传 5 次、一定等 63 秒”当成所有系统的规则。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-42** 重传前的等待时间依次是 1、2、4、8、16 秒，最后再等 32 秒，总共 63 秒。这些是每一轮的等待时长，不是从第一次发包起算的重传时刻。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-43** 部分较新的 Linux 内核还支持 tcp_syn_linear_timeouts，可能先使用若干次相同间隔，再进入指数退避。实际排查应该以本机配置和抓包时间为准。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-44** 最终超过重试或超时限制，connect 会失败；应用也可以设置更短的建连超时。[原文§客户端发送的第一个 SYN 报文，服务器没有收到怎么办？](https://xiaolincoding.com/interview/network.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%94%B6%E5%88%B0%E6%80%8E%E4%B9%88%E5%8A%9E)

### 服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？

- **T3-45** 第二次握手的 SYN-ACK 报文有两个目的：其中的 ACK 是对第一次握手的确认报文；其中的 SYN 是服务端发起建立 TCP 连接的报文。[原文§服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%B6%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E5%9B%9E%E5%A4%8D%E7%9A%84-syn-ack-%E6%8A%A5%E6%96%87%E4%B8%A2%E5%A4%B1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-46** 第二次握手里包含对第一次握手的 ACK 确认，客户端迟迟收不到，会认为自己的 SYN（第一次握手）可能丢失，于是触发超时重传，重传 SYN 报文。第二次握手里还包含服务端的 SYN，客户端收到后需要回 ACK（第三次握手），服务端才会认为该 SYN 被客户端收到；第二次握手丢了，服务端就收不到第三次握手，于是服务端触发超时重传，重传 SYN-ACK 报文。所以客户端和服务端都会重传。[原文§服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%B6%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E5%9B%9E%E5%A4%8D%E7%9A%84-syn-ack-%E6%8A%A5%E6%96%87%E4%B8%A2%E5%A4%B1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-47** 客户端会重传 SYN 报文，也就是第一次握手，最大重传次数由 tcp_syn_retries 内核参数决定；服务端会重传 SYN-ACK 报文，也就是第二次握手，最大重传次数由 tcp_synack_retries 内核参数决定。答案依次是 tcp_syn_retries、tcp_synack_retries。[原文§服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%B6%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E5%9B%9E%E5%A4%8D%E7%9A%84-syn-ack-%E6%8A%A5%E6%96%87%E4%B8%A2%E5%A4%B1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-48** 原文写明，在 Linux 下，SYN-ACK 报文的最大重传次数由 tcp_synack_retries 内核参数决定，默认值是 5。[原文§服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%B6%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E5%9B%9E%E5%A4%8D%E7%9A%84-syn-ack-%E6%8A%A5%E6%96%87%E4%B8%A2%E5%A4%B1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-49** 按原文的指数退避示例，客户端超时重传 1 次 SYN 后，由于 tcp_syn_retries 为 1，已达到最大重传次数，再等待一段时间（上一次超时时间的 2 倍），仍没收到 SYN-ACK 就断开连接；服务端超时重传 2 次 SYN-ACK 后，由于 tcp_synack_retries 为 2，已达到最大重传次数，再等待一段时间（上一次超时时间的 2 倍），仍没收到 ACK 就断开连接。[原文§服务器收到第一个 SYN 报文，回复的 SYN + ACK 报文丢失了怎么办？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%B6%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA-syn-%E6%8A%A5%E6%96%87-%E5%9B%9E%E5%A4%8D%E7%9A%84-syn-ack-%E6%8A%A5%E6%96%87%E4%B8%A2%E5%A4%B1%E4%BA%86%E6%80%8E%E4%B9%88%E5%8A%9E)

### 假设客户端重传了 SYN 报文，服务端这边又收到重复的 SYN 报文怎么办？

- **T3-50** 如果服务端仍然处于 SYN_RCVD，并且收到的是同一个连接、相同初始序列号的 SYN 重传，通常会继续回复 SYN + ACK，等待第三次握手。这不是再创建一条完整连接。[原文§假设客户端重传了 SYN 报文，服务端这边又收到重复的 SYN 报文怎么办？](https://xiaolincoding.com/interview/network.html#%E5%81%87%E8%AE%BE%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%87%8D%E4%BC%A0%E4%BA%86-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%BF%99%E8%BE%B9%E5%8F%88%E6%94%B6%E5%88%B0%E9%87%8D%E5%A4%8D%E7%9A%84-syn-%E6%8A%A5%E6%96%87%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T3-51** 如果连接已经建立，或者新 SYN 的序列号不同，就要根据当前状态和序列号等规则处理，不能把所有 SYN 都当成相同的重传。[原文§假设客户端重传了 SYN 报文，服务端这边又收到重复的 SYN 报文怎么办？](https://xiaolincoding.com/interview/network.html#%E5%81%87%E8%AE%BE%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%87%8D%E4%BC%A0%E4%BA%86-syn-%E6%8A%A5%E6%96%87-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%BF%99%E8%BE%B9%E5%8F%88%E6%94%B6%E5%88%B0%E9%87%8D%E5%A4%8D%E7%9A%84-syn-%E6%8A%A5%E6%96%87%E6%80%8E%E4%B9%88%E5%8A%9E)

### 第一次握手，服务端收到 SYN 并回复 SYN + ACK 时，内部做了哪些工作？

- **T3-52** 服务端收到客户端的 SYN 后，内核会把该连接存储到半连接队列，并向客户端响应 SYN + ACK；收到第三次握手的 ACK 后，内核把连接从半连接队列移除，创建新的完全连接并添加到 accept 队列（全连接队列），等待进程调用 accept 函数时取出。答案依次是半连接、accept（全连接）。[原文§第一次握手，服务端收到 SYN 并回复 SYN + ACK 时，内部做了哪些工作？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8F%A1%E6%89%8B-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%94%B6%E5%88%B0-syn-%E5%B9%B6%E5%9B%9E%E5%A4%8D-syn-ack-%E6%97%B6-%E5%86%85%E9%83%A8%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E5%B7%A5%E4%BD%9C)
- **T3-53** 半连接队列保存握手尚未完成的请求，全连接队列保存已经建立、等待 accept 的连接，它们都有容量限制。[原文§第一次握手，服务端收到 SYN 并回复 SYN + ACK 时，内部做了哪些工作？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8F%A1%E6%89%8B-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%94%B6%E5%88%B0-syn-%E5%B9%B6%E5%9B%9E%E5%A4%8D-syn-ack-%E6%97%B6-%E5%86%85%E9%83%A8%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E5%B7%A5%E4%BD%9C)
- **T3-54** 半连接队列满时，可能丢弃 SYN，也可能在开启 SYN Cookies 后使用 Cookie 响应。[原文§第一次握手，服务端收到 SYN 并回复 SYN + ACK 时，内部做了哪些工作？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8F%A1%E6%89%8B-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%94%B6%E5%88%B0-syn-%E5%B9%B6%E5%9B%9E%E5%A4%8D-syn-ack-%E6%97%B6-%E5%86%85%E9%83%A8%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E5%B7%A5%E4%BD%9C)
- **T3-55** 全连接队列满时，Linux 的处理还取决于 tcp_abort_on_overflow 等配置，可能暂时忽略握手确认，也可能返回 RST，不能把两种队列的行为混为一谈。[原文§第一次握手，服务端收到 SYN 并回复 SYN + ACK 时，内部做了哪些工作？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8F%A1%E6%89%8B-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%94%B6%E5%88%B0-syn-%E5%B9%B6%E5%9B%9E%E5%A4%8D-syn-ack-%E6%97%B6-%E5%86%85%E9%83%A8%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E5%B7%A5%E4%BD%9C)

### 大量SYN包发送给服务端服务端会发生什么事情？

- **T3-56** 如果大量 SYN 请求没有完成第三次握手，就可能把 TCP 半连接队列占满，正常用户的请求也就难以建立连接，这就是 SYN Flood 的典型影响。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-57** 如果握手都完成了，但应用来不及 accept，压力主要在全连接队列和应用处理能力，不是 SYN Flood 那种半连接队列被占满的问题。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-58** Linux 可以在半连接队列压力较大时，把必要信息编码进 SYN + ACK 的初始序列号，不为这次请求保存常规半连接状态。收到第三次握手后，再验证 Cookie 并尝试建立连接。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-59** net.ipv4.tcp_syncookies 常见取值：0 表示关闭；1 表示半连接队列溢出时启用；2 表示无条件使用，具体支持情况要看内核版本。答案依次是：关闭、半连接队列溢出时启用、无条件使用。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-60** SYN Cookies 只是缓解半连接资源耗尽，不保证任何攻击下都能正常建连。如果带宽、CPU 或全连接队列也被打满，仍然会影响服务。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-61** tcp_max_syn_backlog 与半连接容量相关；listen 的 backlog 和 somaxconn 主要限制全连接队列。可以结合丢包和队列指标调整，但扩大队列并不能替代提升 accept 和业务处理速度。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-62** netdev_max_backlog 管的是部分接收路径上来不及处理的数据包队列，不是 TCP 半连接队列，不能把它作为 SYN Flood 的通用解法。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-63** 可以结合接入层限速、SYN 代理、上游流量清洗等手段过滤攻击。如果带宽已经在服务器之前被耗尽，只调服务器参数解决不了问题。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)
- **T3-64** 适当减少 SYN + ACK 重试可以更快释放半连接资源，但也会降低高延迟、丢包环境下正常用户的建连成功率，要结合实际情况调整。[原文§大量SYN包发送给服务端服务端会发生什么事情？](https://xiaolincoding.com/interview/network.html#%E5%A4%A7%E9%87%8Fsyn%E5%8C%85%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85)

### TCP 四次挥手过程说一下？

- **T3-65** 客户端主动调用关闭连接的函数，发送 FIN 报文（表示不再发送数据），进入 FIN_WAIT_1；服务端收到 FIN 后回复 ACK，进入 CLOSE_WAIT，客户端收到这个 ACK 后进入 FIN_WAIT_2；服务端应用读完 FIN 之前的所有数据后 read 返回 0，如果有数据要发送就发完数据后再调用关闭连接的函数，没有就可以直接调用，这时服务端发出 FIN，进入 LAST_ACK；客户端收到服务端的 FIN 后发送 ACK，进入 TIME_WAIT；服务端收到 ACK 后进入 CLOSED；客户端经过 2MSL 时间后也进入 CLOSED。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-66** 客户端发送 FIN 后进入 FIN_WAIT_1；收到服务端的 ACK 后进入 FIN_WAIT_2；收到服务端的 FIN 并回复 ACK 后进入 TIME_WAIT；经过 2MSL 时间后进入 CLOSED。答案依次是 FIN_WAIT_1、FIN_WAIT_2、TIME_WAIT、CLOSED。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-67** 服务端收到 FIN 后回复 ACK，进入 CLOSE_WAIT；之后发出自己的 FIN，进入 LAST_ACK；收到客户端的 ACK 后进入 CLOSED。答案依次是 CLOSE_WAIT、LAST_ACK、CLOSED。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-68** FIN 表示对端的发送方向结束，并不是在缓冲区里放入一个普通的 EOF 字符。服务端应用先读完 FIN 之前的所有数据，之后 read 才会返回 0，表示这个方向不会再有数据。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-69** 服务端在 read 到 EOF（read 返回 0）后，如果应用程序有数据要发送，就发完数据后才调用关闭连接的函数；如果没有数据要发送，可以直接调用关闭连接的函数。调用后服务端会发一个 FIN 包，之后处于 LAST_ACK 状态。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)
- **T3-70** 在客户端主动关闭、正常四次挥手且最后 ACK 正常到达的前提下，客户端接收到服务端的 FIN 包并发送 ACK 后进入 TIME_WAIT 状态；服务端收到 ACK 确认包后进入最后的 CLOSED 状态；客户端经过 2MSL 时间之后也进入 CLOSED 状态。[原文§TCP 四次挥手过程说一下？](https://xiaolincoding.com/interview/network.html#tcp-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%BF%87%E7%A8%8B%E8%AF%B4%E4%B8%80%E4%B8%8B)

### 为什么 TCP 关闭连接通常需要四次挥手？

- **T3-71** 服务器收到客户端的 FIN 报文时，内核会马上回一个 ACK 应答报文，但是服务端应用程序可能还有数据要发送，所以并不能马上发送 FIN 报文，而是将发送 FIN 报文的控制权交给服务端应用程序。[原文§为什么 TCP 关闭连接通常需要四次挥手？](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88-tcp-%E5%85%B3%E9%97%AD%E8%BF%9E%E6%8E%A5%E9%80%9A%E5%B8%B8%E9%9C%80%E8%A6%81%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B)
- **T3-72** 是否要发送第三次挥手的控制权不在内核，而在被动关闭方的应用程序，因为应用程序可能还有数据要发送，由应用程序决定什么时候调用关闭连接的函数；当调用了关闭连接的函数，内核就会发送 FIN 报文，所以服务端的 ACK 和 FIN 一般都会分开发送。[原文§为什么 TCP 关闭连接通常需要四次挥手？](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88-tcp-%E5%85%B3%E9%97%AD%E8%BF%9E%E6%8E%A5%E9%80%9A%E5%B8%B8%E9%9C%80%E8%A6%81%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B)

### 第二次和第三次挥手能合并嘛

- **T3-73** 可以合并，四次挥手不是固定必须发四个独立报文。服务端收到 FIN 后，如果已经没有数据要发送，应用也及时关闭了发送方向，内核就有机会把对客户端 FIN 的确认和自己的 FIN 放在同一个报文中，发送 FIN + ACK。[原文§第二次和第三次挥手能合并嘛](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%92%8C%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%83%BD%E5%90%88%E5%B9%B6%E5%98%9B)
- **T3-74** 能不能合并，要看关闭时机和具体实现。延迟确认可能给合并提供机会，但不是协议规定必须满足的开关条件。关键是发送这个 ACK 的时候，自己的发送方向是否也已经可以结束。[原文§第二次和第三次挥手能合并嘛](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%92%8C%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%83%BD%E5%90%88%E5%B9%B6%E5%98%9B)

### 第三次挥手一直没发，会发生什么？

- **T3-75** 主动关闭方只收到对本端 FIN 的 ACK、尚未收到对方 FIN 时进入 FIN_WAIT_2，等待对方的 FIN；此时被动关闭方可能还在 CLOSE_WAIT，继续处理剩余数据。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-76** 应用只调用 shutdown(SHUT_WR) 时，本端不能继续发送数据，但还保留接收能力，可以继续读取对端发来的内容。因此其余三种说法（既不能收也不能发、还能发但不能收、立即成为孤儿连接）都不对：成为孤儿连接要求应用关闭了最后一个 socket 引用，而不是仅调用 shutdown。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-77** 应用只调用 shutdown(SHUT_WR) 时，本端仍保留接收能力；如果没有其他超时，等待可能持续很久。不能认为所有 FIN_WAIT_2 都在 60 秒后关闭，60 秒的说法只与孤儿连接有关。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-78** 应用关闭最后一个 socket 引用后，连接成为孤儿连接，内核不能一直为它保留资源。Linux 的 tcp_fin_timeout 会影响这类 FIN_WAIT_2 连接的等待时长，socket 的 TCP_LINGER2 等设置也可能影响实际行为。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-79** 影响孤儿连接 FIN_WAIT_2 等待时长的参数是 tcp_fin_timeout，常见默认值为 60 秒；socket 的 TCP_LINGER2 等设置也可能影响实际行为。标准答案：tcp_fin_timeout、60。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-80** 原文的结论是：不能把「对端不发 FIN，就一定一直等待」或者「所有 FIN_WAIT_2 都在 60 秒后关闭」当成通用结论，还要回头检查被动关闭方的应用为什么没有完成关闭。第四项错误：只调用 shutdown(SHUT_WR) 时，本端不能继续发送，但仍保留接收能力。[原文§第三次挥手一直没发，会发生什么？](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%80%E7%9B%B4%E6%B2%A1%E5%8F%91-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)

### 第二次和第三次挥手之间，主动断开的那端能干什么

- **T3-81** 如果主动断开的一方调用 shutdown 函数来关闭连接，并且只选择了关闭发送能力且没有关闭接收能力，那么它在第二次和第三次挥手之间还可以接收数据。[原文§第二次和第三次挥手之间，主动断开的那端能干什么](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%92%8C%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E9%97%B4-%E4%B8%BB%E5%8A%A8%E6%96%AD%E5%BC%80%E7%9A%84%E9%82%A3%E7%AB%AF%E8%83%BD%E5%B9%B2%E4%BB%80%E4%B9%88)
- **T3-82** 只关闭发送能力、没有关闭接收能力时，主动断开的一方在第二次和第三次挥手之间还可以接收数据。标准答案：发送、接收。[原文§第二次和第三次挥手之间，主动断开的那端能干什么](https://xiaolincoding.com/interview/network.html#%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%92%8C%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E9%97%B4-%E4%B8%BB%E5%8A%A8%E6%96%AD%E5%BC%80%E7%9A%84%E9%82%A3%E7%AB%AF%E8%83%BD%E5%B9%B2%E4%BB%80%E4%B9%88)

### 断开连接时客户端 FIN 包丢失，服务端的状态是什么？

- **T3-83** 如果第一次挥手的 FIN 一直没有到达服务端，服务端通常仍然处于 ESTABLISHED，因为它还不知道客户端已经决定关闭发送方向。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-84** 客户端发送 FIN 后进入 FIN_WAIT_1，迟迟收不到确认就会重传 FIN。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-85** 只要某次重传的 FIN 到达服务端，服务端就能回复 ACK，并进入 CLOSE_WAIT。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-86** 如果一直无法得到确认，客户端最终可能因为重传超时而释放连接。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-87** 对于 Linux 中已经没有应用持有的孤儿连接，tcp_orphan_retries 等配置会影响处理，但不能把它当成所有 FIN 重传场景的统一次数限制。标准答案：tcp_orphan_retries。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-88** 客户端超时，不代表服务端同时关闭。服务端可能要到后续发送数据、收到 RST，或者自己的超时机制触发时，才能感知这条连接已经失效。[原文§断开连接时客户端 FIN 包丢失，服务端的状态是什么？](https://xiaolincoding.com/interview/network.html#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5%E6%97%B6%E5%AE%A2%E6%88%B7%E7%AB%AF-fin-%E5%8C%85%E4%B8%A2%E5%A4%B1-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%9A%84%E7%8A%B6%E6%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

### 为什么四次挥手之后要等2MSL?

- **T3-89** 通常由主动关闭连接的一方进入 TIME_WAIT，等待 2MSL。以客户端主动关闭为例，它收到服务端的 FIN 并回复最后一个 ACK 后，并不会立即删除连接状态。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-90** MSL 是 Maximum Segment Lifetime，也就是报文最大生存时间。它是时间概念，不要与 MSS（最大报文段长度）、MTU（最大传输单元）混淆。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-91** 等待 2MSL 主要有两个目的：一是让被动关闭方有机会收到最后的 ACK，如果 ACK 丢失，服务端会重传 FIN，客户端保留 TIME_WAIT 状态就还能识别这个 FIN 并再次回复 ACK；二是让旧连接的报文在网络里消失，降低它们混入相同四元组新连接的干扰。原文还指出 MSL 是时间概念、TTL 主要限制跳数，不能说「TTL 为 64，所以 30 秒内一定消失」。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-92** 如果最后的 ACK 丢失，服务端会重传 FIN。客户端保留 TIME_WAIT 状态，就还能识别这个 FIN，再次回复 ACK；否则服务端可能无法正常结束关闭过程。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-93** 收到重传 FIN 并再次回复 ACK 后，TIME_WAIT 计时通常会重新开始。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-94** 如果立即用相同的四元组建立新连接，旧报文可能混入新连接。等待一段时间，可以降低这种干扰。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-95** MSL 是时间概念，IP 的 TTL 主要限制跳数，两者不能直接换算，不能说「TTL 为 64，所以 30 秒内一定消失」。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-96** Linux 中常见的 TIME_WAIT 等待时长是 60 秒，但这是实现选择，不是所有系统都统一的值。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)
- **T3-97** 不能直接这样理解：tcp_fin_timeout 主要影响孤儿连接在 FIN_WAIT_2 的等待时间，不是 TIME_WAIT 的计时参数。[原文§为什么四次挥手之后要等2MSL?](https://xiaolincoding.com/interview/network.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B9%8B%E5%90%8E%E8%A6%81%E7%AD%892msl)

### 服务端出现大量的timewait有哪些原因?

- **T3-98** 按原文的 HTTP/1.x 场景，服务端主动断开连接的三个场景是：HTTP 没有使用长连接、HTTP 长连接超时、HTTP 长连接的请求数量达到上限。主动关闭的一方才会进入 TIME_WAIT，所以这三种情况都会让服务端出现 TIME_WAIT。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-99** 在 HTTP/1.0 中长连接默认是关闭的，如果浏览器要开启 Keep-Alive，必须在请求的 header 中添加 Connection: Keep-Alive；服务器作出回应时，也把它添加到响应的 header 里。这样 TCP 连接就不会中断，客户端再发请求时会使用同一个 TCP 连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-100** HTTP/1.1 默认使用持久连接，不需要每次显式发送 Connection: Keep-Alive。这里讨论的是 HTTP/1.x，HTTP/2、HTTP/3 的连接管理不能直接套用这个头字段。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-101** 如果要关闭 HTTP Keep-Alive，需要在 HTTP 请求或者响应的 header 里添加 Connection:close 信息，也就是说，只要客户端和服务端任意一方的 HTTP header 中有 Connection:close 信息，就无法使用 HTTP 长连接机制。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-102** 关闭 HTTP 长连接机制后，每次请求都要经历：建立 TCP → 请求资源 → 响应资源 → 释放连接，这种方式就是 HTTP 短连接。标准答案：建立 TCP、请求资源、响应资源、释放连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-103** 在 RFC 文档中，并没有明确由谁来关闭连接，请求和响应的双方都可以主动关闭 TCP 连接。不过，根据大多数 Web 服务的实现，不管哪一方禁用了 HTTP Keep-Alive，都是由服务端主动关闭连接，所以服务端上就会出现 TIME_WAIT 状态的连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-104** HTTP 长连接可以在同一个 TCP 连接上接收和发送多个 HTTP 请求/应答，避免了连接建立和释放的开销。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-105** nginx 提供 keepalive_timeout 参数指定 HTTP 长连接的超时时间；keepalive_requests 参数则是一条 HTTP 长连接上最多能处理的请求数量，达到后 nginx 会主动关闭该连接。标准答案：keepalive_timeout、keepalive_requests。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-106** 设置了 60 秒的长连接超时时间后，nginx 会启动一个「定时器」，如果客户端在完成一个 HTTP 请求后的 60 秒内都没有再发起新请求，定时器时间一到，nginx 就会触发回调函数来关闭该连接，此时服务端上就会出现 TIME_WAIT 状态的连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-107** 在原文的 HTTP/1.x 长连接场景中，如果大量客户端已完成一次请求，此后很长一段时间服务端没有收到新请求，那么大概率就是因为 HTTP 长连接超时，导致服务端主动关闭连接，产生大量处于 TIME_WAIT 状态的连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-108** 在上述请求已完成、等待连接复用而发生空闲超时的场景中，原文建议可以往网络问题的方向排查，比如是否因为网络问题，导致客户端发送的数据一直没有被服务端接收到，以至于 HTTP 长连接超时。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-109** keepalive_requests 指一个 HTTP 长连接建立之后，nginx 会为这个连接设置一个计数器，记录这个长连接上已经接收并处理的客户端请求数量；达到参数设置的最大值时，nginx 会主动关闭这个长连接，服务端上就会出现 TIME_WAIT 状态的连接。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-110** keepalive_requests 的默认值与版本有关，Nginx 1.19.10 之前是 100，之后改为 1000。实际排查时要看运行版本和生效配置，不能只记一个固定默认值。标准答案：100、1000。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-111** 对于一些 QPS 比较高的场景（超过 10000 QPS，甚至 30000、50000 或更高），如果 keepalive_requests 是 100，nginx 就会很频繁地关闭连接，此时服务端上就会出现大量 TIME_WAIT 状态。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-112** 如果确认连接因为请求次数限制频繁关闭，可以适当调大 keepalive_requests。不过它不是越大越好，连接周期性关闭也有释放相关内存的作用，还要结合连接数量和内存占用判断。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)
- **T3-113** TIME_WAIT 多不等于一定有故障，要看是否造成端口、内存等资源压力，再从减少短连接、改善连接复用和调整连接生命周期入手。服务端作为监听方时，也不能简单把 TIME_WAIT 数量等同于临时端口被耗尽。[原文§服务端出现大量的timewait有哪些原因?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F%E7%9A%84timewait%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0)

### 服务端出现大量 CLOSE_WAIT 是什么原因？

- **T3-114** CLOSE_WAIT 表示对端已经关闭发送方向，本端也已经确认，但本端应用还没有关闭自己的发送方向。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)
- **T3-115** 客户端发送 FIN，服务端内核回复 ACK 后进入 CLOSE_WAIT；服务端把剩余数据发送完，并关闭对应 socket 后，才会继续发送 FIN，进入 LAST_ACK。标准答案：CLOSE_WAIT、LAST_ACK。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)
- **T3-116** 短暂的 CLOSE_WAIT 很正常，但如果大量连接长期停在这里，就需要排查应用为什么没有关闭连接。调小 tcp_fin_timeout 也不能直接清掉 CLOSE_WAIT。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)
- **T3-117** 大量连接长期停在 CLOSE_WAIT，常见原因是：程序发现 read 返回 0 后没有关闭连接；异常分支漏掉了连接释放（比如超时、解析失败时直接返回）；业务线程卡住了，一直没有执行到关闭逻辑；连接池、流对象或 socket 的引用没有正确释放。CLOSE_WAIT 本身就表示本端已经对对端的 FIN 做了确认，所以「内核没有回复 ACK」不是原因。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)
- **T3-118** 排查时可以用 ss -tanp 找到对应进程，再结合文件描述符、线程栈和业务日志检查。标准答案：ss -tanp。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)
- **T3-119** 排查 CLOSE_WAIT 问题通常要修复应用的资源释放逻辑；调小 tcp_fin_timeout 不能直接清掉 CLOSE_WAIT。[原文§服务端出现大量 CLOSE_WAIT 是什么原因？](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%87%BA%E7%8E%B0%E5%A4%A7%E9%87%8F-close-wait-%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0)

### TCP和UDP区别是什么？

- **T3-120** TCP 是面向连接的协议，通常先握手再传数据；UDP 本身不需要握手。UDP socket 也可以调用 connect，但这主要是设置默认对端等，并不会变成 TCP 式的连接。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-121** UDP socket 也可以调用 connect，但这主要是设置默认对端等，并不会变成 TCP 式的连接。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-122** TCP 提供有序、不重复的可靠字节流，通过确认和重传应对丢包。如果连接最终失败，仍然会向应用报告错误，并不是永远保证发送成功。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-123** UDP 本身不提供确认、重传和按序交付；但 UDP 按数据报传输，会保留数据报边界。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-124** TCP 是字节流，没有应用消息边界；UDP 按数据报传输，会保留数据报边界。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-125** TCP 有流量控制和拥塞控制，UDP 本身没有，但上层协议可以实现，比如 QUIC。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-126** TCP 首部通常是 20～60 字节，UDP 首部固定为 8 字节。标准答案：20、60、8。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-127** TCP 一条连接对应两个端点；UDP 还可以配合 IP 实现组播，IPv4 下也可以广播。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-128** 选择时不能简单说「要快就用 UDP，要可靠就用 TCP」。DNS 查询、实时媒体等场景经常使用 UDP，但还要考虑重试、实时性、拥塞控制等需求。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T3-129** 使用 UDP 不等于应用就不能可靠传输，只是这些能力要由上层负责。[原文§TCP和UDP区别是什么？](https://xiaolincoding.com/interview/network.html#tcp%E5%92%8Cudp%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)

### TCP为什么可靠传输

- **T3-130** TCP 主要通过序列号、确认应答、重传、校验和，以及流量控制和拥塞控制来提供可靠字节流。标准答案：序列号、确认应答、重传、校验和。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-131** 序列号对字节编号，接收方据此重组乱序数据、识别重复数据，保证交给应用的字节按顺序排列。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-132** ACK 里的确认号表示下一次期望收到的字节序号。比如 ACK=1001，表示序号 1001 之前的字节已经连续收到，这叫累计确认。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-133** 发送方在超时或者判断某段数据丢失后重发。如果 ACK 丢失，后续累计 ACK 也可能确认前面的数据，不一定每丢一个 ACK 就重传一次。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-134** 校验和用来检测传输损坏，出错的报文会被丢弃，再由重传补上。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-135** 流量控制：接收方通告窗口，防止发送方把接收缓冲区撑满。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-136** 拥塞控制：根据网络反馈调整发送量，避免不断重传让网络更加拥堵。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-137** 收到 TCP ACK，说明数据到了对端的 TCP 接收端，不代表对端应用已经处理成功，更不代表数据已经写入数据库。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)
- **T3-138** TCP ACK 只说明数据到了对端的 TCP 接收端。比如下单接口收到数据后宕机，订单是否创建成功，还要靠业务响应、查询和幂等机制判断。[原文§TCP为什么可靠传输](https://xiaolincoding.com/interview/network.html#tcp%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AF%E9%9D%A0%E4%BC%A0%E8%BE%93)

### 怎么用udp实现http？

- **T3-139** HTTP/3 的做法是：在 UDP 上实现 QUIC，再在 QUIC 上传输 HTTP，而不是直接把原来的 HTTP/1.1 报文换成 UDP 发送。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-140** QUIC 补上的能力有：可靠传输、有序交付、流量控制和拥塞控制、安全通信、连接迁移。标准答案：可靠传输、有序交付、流量控制和拥塞控制、安全通信、连接迁移。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-141** QUIC 利用包编号、ACK、丢包检测和重传等机制保证流数据交付。丢失的是包，但重传的是仍然需要发送的帧信息，新包使用新的包编号。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-142** 有序交付：每个 Stream 有自己的偏移量和顺序，不同 Stream 之间可以独立处理。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-143** 安全通信：QUIC 集成 TLS 1.3，为数据提供加密和完整性保护。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-144** 连接迁移：使用 Connection ID 等机制，在符合条件的网络切换中继续使用原连接。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)
- **T3-145** 标准 QUIC 并不依赖前向纠错来保证可靠性。面试里把确认、丢包检测和重传讲清楚就可以，不要把早期实验方案当成必备功能。[原文§怎么用udp实现http？](https://xiaolincoding.com/interview/network.html#%E6%80%8E%E4%B9%88%E7%94%A8udp%E5%AE%9E%E7%8E%B0http)

### tcp粘包怎么解决？

- **T3-146** TCP 是字节流，一次 send 不对应一次 read。两次发送的内容可能被一次读到，一条消息也可能分多次才能读完，这就是应用里常说的粘包和拆包。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-147** 它不是 TCP 传错了数据，而是应用没有正确处理消息边界。所以解决办法是在应用层定义消息格式，并持续解析接收到的字节。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-148** 三种分包方式：固定长度的消息、特殊字符作为边界、自定义消息结构。标准答案：固定长度的消息、特殊字符作为边界、自定义消息结构。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-149** 固定长度的消息是最简单的方法：每个用户消息都是固定长度的（如 64 字节），接收方接满 64 个字节就认为是一个完整有效的消息。但这种方式灵活性不高，实际中很少用。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-150** 作为边界点的特殊字符，如果刚好消息内容里有这个特殊字符，要对这个字符转义，避免被接收方当作消息的边界点而解析到无效的数据。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-151** HTTP/1.1 的头字段用回车换行分隔，头部以 \r\n\r\n 结束，但这不等于整个报文都结束了。正文还要结合 Content-Length 或 chunked 等规则读取，不能在正文里看到回车换行就当作消息结束。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-152** 可以自定义一个消息结构，由包头和数据组成，其中包头是固定大小的，包头里有一个字段来说明紧随其后的数据有多大。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-153** 当接收方接收到包头的大小（比如 4 个字节）后，就解析包头的内容，于是就可以知道数据的长度，然后继续读取数据，直到读满数据的长度，就可以组装成一个完整的用户消息来处理了。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-154** 实际写代码时，还要处理包头只读到一部分、一次读到多条消息等情况，并校验长度字段，限制最大消息大小。TCP 是字节流，一次 read 读到的字节不一定恰好是一条完整消息。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)
- **T3-155** 关闭 Nagle 或改成一次 send，只会影响发送行为，不能替代应用层分包。[原文§tcp粘包怎么解决？](https://xiaolincoding.com/interview/network.html#tcp%E7%B2%98%E5%8C%85%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)

### TCP 流量控制和拥塞控制有什么区别？

- **T3-156** 流量控制管「接收方来不来得及收」，拥塞控制管「网络承不承受得住」。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-157** 流量控制由接收方通过接收窗口 rwnd 通告自己还能接收多少数据；拥塞控制由发送方维护拥塞窗口 cwnd。标准答案：接收窗口 rwnd、拥塞窗口 cwnd。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-158** 拥塞控制：发送方维护拥塞窗口 cwnd，根据 ACK、丢包、ECN 等反馈判断网络情况，控制在网络里的数据量。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-159** 发送方在途、尚未确认的数据量，通常要同时受接收窗口和拥塞窗口约束，可以近似理解为：允许的在途数据上限 = min(rwnd, cwnd)。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-160** 如果上限是 10 KB，但已经有 6 KB 尚未确认，就不能再直接发 10 KB，而是还剩大约 4 KB 的空间。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-161** 接收方处理很快，但网络链路已经拥堵，这时主要受 cwnd 限制。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-162** 网络很空闲，但接收方业务线程不读数据，这时主要受 rwnd 限制。[原文§TCP 流量控制和拥塞控制有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E5%92%8C%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### TCP 接收窗口变成 0，会发生什么？

- **T3-163** 接收方来不及读取数据，缓冲区没有空间时，可以通告零窗口。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-164** 发送方收到零窗口后，会暂停发送新的普通数据，但连接不会因此立即断开。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-165** 接收方此前已通告零窗口，发送方因此暂停发送。若窗口重开的更新报文丢失，暂不考虑持续计时器和零窗口探测，双方可能互相等待：发送方等窗口打开，接收方等新数据。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-166** TCP 有持续计时器和零窗口探测，发送方隔一段时间发出探测，让接收方回复当前窗口，避免因为窗口更新丢失而一直卡住。标准答案：持续计时器、零窗口探测。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-167** 发送方隔一段时间发出探测，让接收方回复当前窗口，避免因为窗口更新丢失而一直卡住。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)
- **T3-168** 排障时，如果抓包经常出现 Zero Window，要先看接收端是不是没及时读数据、业务线程卡住了，或者处理能力不足，不能一看到传输慢就判断网络拥堵。[原文§TCP 接收窗口变成 0，会发生什么？](https://xiaolincoding.com/interview/network.html#tcp-%E6%8E%A5%E6%94%B6%E7%AA%97%E5%8F%A3%E5%8F%98%E6%88%90-0-%E4%BC%9A%E5%8F%91%E7%94%9F%E4%BB%80%E4%B9%88)

### TCP 超时重传、快速重传和 SACK 有什么区别？

- **T3-169** 它们主要区别在于什么时候判断丢包，以及怎么知道需要补哪些数据。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-170** 超时重传：发出数据之后，超过 RTO 仍未收到对应确认，就重传。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-171** RTO 根据往返时间 RTT 及其波动估算，不是固定不变的值，连续超时通常还会退避。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-172** 快速重传：经典机制里，发送方收到 3 个重复 ACK，就认为可能有数据丢失，不等 RTO 到期便重传缺失的数据。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-173** SACK，选择性确认：接收方在 ACK 选项中告诉发送方，除了连续收到的部分，还收到了哪些不连续的数据块，让发送方更准确地补缺口。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-174** 第 2 段丢了而第 3、4、5 段都到了，接收方仍然累计确认第 2 段之前的内容，但可以通过 SACK 告诉发送方后面哪些区间已经收到，减少重复发送。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-175** 重复 ACK 也可能由乱序等情况造成，不一定是报文真的丢了。实际协议栈还可能使用更丰富的丢包检测机制，面试时先把经典机制讲清楚。[原文§TCP 超时重传、快速重传和 SACK 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E8%B6%85%E6%97%B6%E9%87%8D%E4%BC%A0%E3%80%81%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E5%92%8C-sack-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### TCP 的 MSS 和 MTU 有什么区别？

- **T3-176** MTU 限制一层能装下多大的包，MSS 限制一个 TCP 段能携带多大的 TCP 数据。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-177** 以常见以太网为例，MTU 为 1500 字节，表示 IP 包通常不能超过 1500 字节。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-178** 1500 - 20 - 20 = 1460 字节，这个 1460 就是常见的 MSS 值。标准答案：1460。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-179** 1460 是以 IPv4 首部、TCP 首部各 20 字节为例得到的。IPv6、TCP 选项、隧道封装和实际路径都可能影响有效载荷大小，不能把 MSS 永远记成 1460。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-180** 握手时，双方可以分别通告自己愿意接收的 MSS；发送方还需要考虑路径 MTU。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T3-181** 减少 IP 分片通常有利于传输，不能认为 TCP 数据越大越好。[原文§TCP 的 MSS 和 MTU 有什么区别？](https://xiaolincoding.com/interview/network.html#tcp-%E7%9A%84-mss-%E5%92%8C-mtu-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### TCP的拥塞控制介绍一下？

- **T3-182** 网络出现拥堵时，如果继续发送大量数据包，可能导致数据包时延、丢失，TCP 就会重传，但一重传就会让网络负担更重，导致更大的延迟和更多的丢包，形成恶性循环。所以 TCP 被设计成一个「无私」的协议，网络拥塞时会自我牺牲，降低发送的数据量，这就是拥塞控制。拥塞控制的目的是避免「发送方」的数据填满整个网络。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-183** 拥塞窗口 cwnd 是发送方维护的状态变量，会根据网络反馈动态变化：只要网络中没有出现拥塞，cwnd 就会增大；网络中出现了拥塞，cwnd 就减少。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-184** 发送窗口可以近似理解为 swnd = min(cwnd, rwnd)，也就是拥塞窗口和接收窗口中的较小值。已经发送但尚未确认的数据，会占用这部分窗口。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-185** 怎么知道当前网络是否出现了拥塞？只要「发送方」没有在规定时间内接收到 ACK 应答报文，也就是发生了超时重传，就会认为网络出现了拥塞。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-186** 经典 Reno 的四个机制：慢启动、拥塞避免、快速重传、快速恢复。实际系统也可能使用 CUBIC、BBR 等算法，增长和退让规则并不完全相同。标准答案：慢启动、拥塞避免、快速重传、快速恢复。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-187** TCP 在刚建立连接完成后，首先有个慢启动的过程，意思就是一点一点地提高发送数据包的数量；如果一上来就发大量数据，这不是给网络添堵吗？[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-188** 在简化例子里，以 MSS 为单位，并假设每个新 ACK 都确认一个完整数据段：慢启动时，每收到这样的 ACK，cwnd 增加 1 个 MSS，整体上约每个 RTT 翻倍，发包的个数是指数性增长。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-189** 收到 4 个 ACK 后，每个确认 cwnd 增加 1，共增加 4，于是可以比之前多发 4 个，所以这一次能够发送 8 个。需要说明的是，这里初始 cwnd = 1 只是为了方便说明，实际初始窗口不一定只有 1 个 MSS。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-190** 按原文模型，有一个叫慢启动门限 ssthresh 的状态变量：当 cwnd < ssthresh 时，使用慢启动算法；当 cwnd >= ssthresh 时，就会使用「拥塞避免算法」。标准答案：慢启动、拥塞避免。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-191** ssthresh 是发送方维护的慢启动门限，并不是固定的 65535 字节，也不是 TCP 首部里的接收窗口字段。它会受到实现和拥塞反馈等因素影响。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-192** 按原文经典 Reno 简化模型，窗口数值以 MSS 为单位，进入拥塞避免算法后，每收到确认一个完整新数据段的 ACK 时，cwnd 增加 1/cwnd。拥塞避免算法就是将原本慢启动算法的指数增长变成了线性增长，还是增长阶段，但增长速度缓慢了一些。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-193** 按原文按轮次近似计算，该轮每个 ACK 增加 1/8，8 个 ACK 共增加 1，因此 cwnd 从 8 MSS 增长到约 9 MSS。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-194** 不能。真实丢包也可能来自链路错误；乱序可能产生重复 ACK，使发送方误判丢包，并不等于数据段真的被丢弃。经典 Reno 会根据丢包反馈收缩拥塞窗口，拥塞发生时主要区分超时重传和快速重传两种处理方式。（原文写作“丢包也可能来自链路错误或乱序”，这里将乱序引起的丢包误判与真实丢包区分。）[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B) [核对来源：RFC 5681 §3.2](https://www.rfc-editor.org/rfc/rfc5681.html#section-3.2)
- **T3-195** 发生超时重传时使用拥塞发生算法：ssthresh 设为 cwnd/2，cwnd 重置为初始值（原文假定为 1）。实际 ssthresh 通常按在途数据量计算，并有最小值限制。标准答案：cwnd/2、1。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-196** 按原文经典 Reno 简化模型，窗口数值以 MSS 为单位，发生超时重传后，cwnd 重置为 1 并重新开始慢启动，慢启动会突然减少数据流，一旦超时重传就马上回到解放前，这种方式太激进，反应也很强烈，会造成网络卡顿。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-197** 如果接收方连续收到缺口之后的数据，会重复发送指向缺口的累计 ACK。发送方收到 3 个重复 ACK 后，就可以触发快速重传，不必等到超时。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-198** TCP 认为这种情况不严重，因为大部分没丢，只丢了一小部分。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-199** 按原文经典 Reno 近似模型，将在途数据量近似看作 cwnd，窗口数值以 MSS 为单位；进入快速恢复前，快速重传触发的拥塞发生：cwnd = cwnd/2，也就是设置为原来的一半；ssthresh = cwnd；然后进入快速恢复算法。标准答案：一半、cwnd、快速恢复。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-200** 快速重传和快速恢复算法一般同时使用，快速恢复算法认为：你还能收到 3 个重复 ACK，说明网络也不那么糟糕，所以没有必要像 RTO 超时那么强烈。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-201** 按原文经典 Reno 简化模型，cwnd 和 ssthresh 的数值以 MSS 为单位，进入快速恢复算法后：拥塞窗口 cwnd = ssthresh + 3（3 的意思是确认有 3 个数据包被收到）；重传丢失的数据包。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-202** 以下窗口数值以 MSS 为单位。快速恢复中，如果再收到重复的 ACK，那么 cwnd 增加 1；在这个经典 Reno 的简化模型里，收到确认新数据的 ACK 后，把 cwnd 收缩到 ssthresh，退出快速恢复，进入拥塞避免。一次丢多个数据段时，NewReno、SACK 等机制还会采用更细致的恢复处理。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)
- **T3-203** 使用快速恢复时，没有像「超时重传」一夜回到解放前，而是 cwnd 还在比较高的值，后续呈线性增长。[原文§TCP的拥塞控制介绍一下？](https://xiaolincoding.com/interview/network.html#tcp%E7%9A%84%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B)

## 4. 网络层和链路层

原文：[计算机网络面试题 · 网络层和链路层](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9C%E5%B1%82%E5%92%8C%E9%93%BE%E8%B7%AF%E5%B1%82)。

### IP 地址和 MAC 地址有什么区别？

- **T4-1** IP 地址主要负责跨网络的寻址和路由，MAC 地址主要用于当前链路上的帧传输。[原文§IP 地址和 MAC 地址有什么区别？](https://xiaolincoding.com/interview/network.html#ip-%E5%9C%B0%E5%9D%80%E5%92%8C-mac-%E5%9C%B0%E5%9D%80%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T4-2** 访问外网服务器时，IP 包的目标地址写的是服务器 IP，但从电脑发出的以太网帧，目标 MAC 通常写的是网关 MAC，不是远端服务器的 MAC。[原文§IP 地址和 MAC 地址有什么区别？](https://xiaolincoding.com/interview/network.html#ip-%E5%9C%B0%E5%9D%80%E5%92%8C-mac-%E5%9C%B0%E5%9D%80%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T4-3** 路由器收到帧后，取出 IP 包，根据路由表选择下一跳，再为下一段链路重新封装帧。[原文§IP 地址和 MAC 地址有什么区别？](https://xiaolincoding.com/interview/network.html#ip-%E5%9C%B0%E5%9D%80%E5%92%8C-mac-%E5%9C%B0%E5%9D%80%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T4-4** 路由器要为下一段链路重新封装帧，所以 MAC 地址会随着经过的链路变化；没有 NAT 等地址转换时，源和目的 IP 通常保持不变，TTL 则逐跳减少。[原文§IP 地址和 MAC 地址有什么区别？](https://xiaolincoding.com/interview/network.html#ip-%E5%9C%B0%E5%9D%80%E5%92%8C-mac-%E5%9C%B0%E5%9D%80%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- **T4-5** MAC 也不是绝对不能修改，更不能拿它作为跨互联网识别用户身份的可靠依据。[原文§IP 地址和 MAC 地址有什么区别？](https://xiaolincoding.com/interview/network.html#ip-%E5%9C%B0%E5%9D%80%E5%92%8C-mac-%E5%9C%B0%E5%9D%80%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

### ARP 是什么？访问外网时查询谁的 MAC 地址？

- **T4-6** ARP 用于在 IPv4 的本地链路上，根据 IP 地址查询对应的 MAC 地址。[原文§ARP 是什么？访问外网时查询谁的 MAC 地址？](https://xiaolincoding.com/interview/network.html#arp-%E6%98%AF%E4%BB%80%E4%B9%88-%E8%AE%BF%E9%97%AE%E5%A4%96%E7%BD%91%E6%97%B6%E6%9F%A5%E8%AF%A2%E8%B0%81%E7%9A%84-mac-%E5%9C%B0%E5%9D%80)
- **T4-7** 主机会在本地以太网链路上广播询问「谁拥有这个下一跳 IP」，拥有该 IP 的主机再回复自己的 MAC 地址；访问外网时，待解析的是网关的 IP，而不是最终外网服务器的 IP。[原文§ARP 是什么？访问外网时查询谁的 MAC 地址？](https://xiaolincoding.com/interview/network.html#arp-%E6%98%AF%E4%BB%80%E4%B9%88-%E8%AE%BF%E9%97%AE%E5%A4%96%E7%BD%91%E6%97%B6%E6%9F%A5%E8%AF%A2%E8%B0%81%E7%9A%84-mac-%E5%9C%B0%E5%9D%80)
- **T4-8** 访问同一子网的主机时，通常查询目标主机的 MAC；访问外网时，要先看路由表，通常把数据交给默认网关，查询的是网关的 MAC。[原文§ARP 是什么？访问外网时查询谁的 MAC 地址？](https://xiaolincoding.com/interview/network.html#arp-%E6%98%AF%E4%BB%80%E4%B9%88-%E8%AE%BF%E9%97%AE%E5%A4%96%E7%BD%91%E6%97%B6%E6%9F%A5%E8%AF%A2%E8%B0%81%E7%9A%84-mac-%E5%9C%B0%E5%9D%80)
- **T4-9** ARP 广播不会被普通路由器转发到整个互联网，所以你的电脑不会通过 ARP 直接查出百度服务器的 MAC。[原文§ARP 是什么？访问外网时查询谁的 MAC 地址？](https://xiaolincoding.com/interview/network.html#arp-%E6%98%AF%E4%BB%80%E4%B9%88-%E8%AE%BF%E9%97%AE%E5%A4%96%E7%BD%91%E6%97%B6%E6%9F%A5%E8%AF%A2%E8%B0%81%E7%9A%84-mac-%E5%9C%B0%E5%9D%80)
- **T4-10** IPv6 使用邻居发现机制，不使用 ARP。[原文§ARP 是什么？访问外网时查询谁的 MAC 地址？](https://xiaolincoding.com/interview/network.html#arp-%E6%98%AF%E4%BB%80%E4%B9%88-%E8%AE%BF%E9%97%AE%E5%A4%96%E7%BD%91%E6%97%B6%E6%9F%A5%E8%AF%A2%E8%B0%81%E7%9A%84-mac-%E5%9C%B0%E5%9D%80)

### ICMP 是什么？ping 和 traceroute 的原理是什么？

- **T4-11** ICMP 用于传递网络错误和控制信息，不使用 TCP、UDP 那样的端口。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-12** ping 通常发送 ICMP Echo Request，收到 Echo Reply 后估算往返时间和丢包情况。两个空依次是：Echo Request（回显请求）、Echo Reply（回显应答）。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-13** traceroute 从较小的 TTL 开始探测，逐步增加 TTL。路由器发现 TTL 耗尽时，通常返回 ICMP Time Exceeded，借此就能观察到经过了哪些跳。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-14** 路由器发现 TTL 耗尽，通常返回 ICMP Time Exceeded，traceroute 借此观察经过哪些跳。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-15** 不同实现的 traceroute 可能用 UDP、ICMP 或 TCP 发送探测，所以三个空是：UDP、ICMP、TCP（顺序不限）。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-16** 路由器可能限制或不回应探测，所以 traceroute 出现星号不一定表示业务流量在那一跳被丢弃。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
- **T4-17** 路由器可能限制或不回应探测，ping 不通也不等于 TCP 服务一定不可用。[原文§ICMP 是什么？ping 和 traceroute 的原理是什么？](https://xiaolincoding.com/interview/network.html#icmp-%E6%98%AF%E4%BB%80%E4%B9%88-ping-%E5%92%8C-traceroute-%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)

### NAT 是什么？为什么内网多个设备能共用一个公网 IP？

- **T4-18** 家用路由器常见的是同时转换地址和端口，也叫 NAPT/PAT，所以两个空是：NAPT、PAT（顺序不限）。[原文§NAT 是什么？为什么内网多个设备能共用一个公网 IP？](https://xiaolincoding.com/interview/network.html#nat-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%86%85%E7%BD%91%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%87%E8%83%BD%E5%85%B1%E7%94%A8%E4%B8%80%E4%B8%AA%E5%85%AC%E7%BD%91-ip)
- **T4-19** 路由器可以把两台内网电脑的源地址和端口改成同一个公网 IP 下的两个不同端口，并保存映射关系；服务器回包后，路由器再根据映射，把响应转回对应的内网电脑。[原文§NAT 是什么？为什么内网多个设备能共用一个公网 IP？](https://xiaolincoding.com/interview/network.html#nat-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%86%85%E7%BD%91%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%87%E8%83%BD%E5%85%B1%E7%94%A8%E4%B8%80%E4%B8%AA%E5%85%AC%E7%BD%91-ip)
- **T4-20** 多个设备可以共用一个公网 IP，靠的不只是替换 IP，还要通过端口等信息区分会话。[原文§NAT 是什么？为什么内网多个设备能共用一个公网 IP？](https://xiaolincoding.com/interview/network.html#nat-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%86%85%E7%BD%91%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%87%E8%83%BD%E5%85%B1%E7%94%A8%E4%B8%80%E4%B8%AA%E5%85%AC%E7%BD%91-ip)
- **T4-21** 如果没有已有映射、端口转发或其他连通机制，路由器不知道该把外部发来的请求交给哪台内网设备，所以外部通常不能直接主动连接内网服务。[原文§NAT 是什么？为什么内网多个设备能共用一个公网 IP？](https://xiaolincoding.com/interview/network.html#nat-%E6%98%AF%E4%BB%80%E4%B9%88-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%86%85%E7%BD%91%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%87%E8%83%BD%E5%85%B1%E7%94%A8%E4%B8%80%E4%B8%AA%E5%85%AC%E7%BD%91-ip)

## 5. 网络场景

原文：[计算机网络面试题 · 网络场景](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9C%E5%9C%BA%E6%99%AF)。

### 描述一下打开百度首页后发生的网络过程

- **T5-1** 依次是：DNS 解析 → 确定下一跳 → 建立 TCP 连接 → TLS 握手。DNS 解析获取 IP；确定下一跳由操作系统根据路由表决定网卡和下一跳；建立 TCP 连接即完成三次握手；TLS 握手协商版本和密钥、验证服务端证书后建立加密通信。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-2** 浏览器确定协议、主机、端口和资源路径后，会根据缓存规则判断是否需要请求网络；如果能直接使用有效缓存，就可以省掉对应的网络请求，不必再走后面的网络步骤。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-3** 浏览器会根据自己的配置、解析缓存、系统解析机制和 hosts 等获取 IP，没有可用结果时才向 DNS 解析服务查询。具体路径会受浏览器加密 DNS、代理等配置影响，不是固定经过「路由器缓存、ISP 缓存」。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-4** 确定下一跳时，操作系统根据路由表决定从哪个网卡、向哪个下一跳发送；hosts 属于 DNS 解析阶段可能用到的来源，缓存规则用于判断是否请求网络，TLS 密钥用于加密通信，都不是用来选下一跳的。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-5** 同一子网时通过 ARP 查目标 MAC；访问外网时通常查网关的 MAC。故第一空填 ARP，第二空填网关。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-6** 客户端和服务端完成三次握手，但这里可能连接到的是 CDN 或反向代理，而不是最终的业务服务器。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-7** TLS 握手负责协商版本和密钥、验证服务端证书，再建立加密通信。具体往返次数取决于 TLS 版本和是否恢复会话，不能统一说成四次握手。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-8** 服务端返回响应有两种情况：缓存节点直接返回内容，或者后端处理请求后返回状态码、响应头和响应体。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-9** 依次填：DOM、样式计算、布局、绘制。浏览器解析 HTML 并构建 DOM，加载 CSS、JavaScript、图片等资源，再进行样式计算、布局和绘制；页面里的资源请求也可能复用现有连接。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-10** 原文补充的要点是：这些步骤不是每次都完整重走，连接可以复用，DNS 和资源可以缓存；使用 HTTP/3 时则通过 QUIC 建立安全连接，不再先做 TCP 三次握手。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)
- **T5-11** 面试时要补一句：使用 HTTP/3 时，通过 QUIC 建立安全连接，不再先做 TCP 三次握手。[原文§描述一下打开百度首页后发生的网络过程](https://xiaolincoding.com/interview/network.html#%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E6%89%93%E5%BC%80%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5%E5%90%8E%E5%8F%91%E7%94%9F%E7%9A%84%E7%BD%91%E7%BB%9C%E8%BF%87%E7%A8%8B)

### 网页非常慢转圈圈的时候，要定位问题需要从哪些角度？

- **T5-12** 页面慢可能是 DNS、建连、服务端处理、下载资源，也可能是浏览器渲染慢，所以先不要一上来就判断「网络不好」，而要先找时间花在哪一段；之后先定位阶段，再找原因。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-13** 填 Timing 和瀑布图：先看请求的 Timing 和瀑布图，找出时间花在哪一段。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-14** DNS 慢要检查解析服务器、缓存和网络情况，确认解析到的 IP 是否正确；解析失败不一定代表域名写错。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-15** 连接或 TLS 握手慢，要检查往返时延、丢包、代理、防火墙和证书相关问题，必要时抓包看 SYN、重传和 TLS 消息；资源大小、CDN 命中率属于内容下载慢的检查项，长任务和布局开销属于页面渲染卡顿的检查项。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-16** TTFB 很长时，请求可能已经到了服务器，要结合网关日志、调用链、数据库和下游接口排查。TTFB 也包含网络等待，不能直接等同于后端代码执行时间。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-17** 内容下载慢，要看资源大小、带宽、压缩、CDN 命中率和重传情况，尤其注意大图片、大脚本等资源；解析服务器和 IP 属于 DNS 慢的检查项，脚本执行和布局开销属于页面渲染卡顿的检查项。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-18** 请求结束但页面仍然卡，要看 Performance、控制台报错、长任务、脚本执行和布局开销。返回 200 只说明请求成功，不代表页面已经正常渲染。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-19** 原文建议同时比较「所有网站都慢，还是只有这个网站慢」「所有用户都慢，还是某个地区或网络慢」，这能帮助缩小范围；状态码是 200 与否不能说明页面是否正常，域名是否写错也不是这里的比较维度。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)
- **T5-20** 填 curl、tcpdump、Wireshark（顺序不限）。curl 可查看分段耗时，tcpdump 或 Wireshark 可用于抓包；还可以把客户端时间和服务端日志对起来。[原文§网页非常慢转圈圈的时候，要定位问题需要从哪些角度？](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E9%A1%B5%E9%9D%9E%E5%B8%B8%E6%85%A2%E8%BD%AC%E5%9C%88%E5%9C%88%E7%9A%84%E6%97%B6%E5%80%99-%E8%A6%81%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E9%9C%80%E8%A6%81%E4%BB%8E%E5%93%AA%E4%BA%9B%E8%A7%92%E5%BA%A6)

### server a和server b，如何判断两个服务器正常连接？出错怎么办？

- **T5-21** 在题干假设下，仅靠闲置 TCP 连接不能感知对端故障，服务端连接会继续保留在 ESTABLISHED 状态，占用系统资源。原文后文介绍的 TCP 保活、应用心跳、超时和空闲连接回收不在本题假设范围内。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-22** 为了避免无数据交互时无法感知对端存活，TCP 搞了保活机制：定义一个时间段，在这个时间段内如果没有任何连接相关的活动，保活机制开始作用，每隔一个时间间隔发送一个探测报文（包含的数据非常少）；如果连续几个探测报文都没有得到响应，就认为当前的 TCP 连接已经死亡，系统内核将错误信息通知给上层应用程序。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-23** 依次是 tcp_keepalive_time（保活时间）、tcp_keepalive_probes（保活探测次数）、tcp_keepalive_intvl（保活探测的时间间隔）。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-24** 依次填 7200、75、9：tcp_keepalive_time=7200 表示 2 小时内没有任何连接相关活动就启动保活机制；tcp_keepalive_intvl=75 表示每次检测间隔 75 秒；tcp_keepalive_probes=9 表示检测 9 次无响应就认为对方不可达并中断连接。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-25** 按这组常见默认参数估算，要经过大约 2 小时（保活时间）再加上数分钟（9 次、每次间隔 75 秒的探测），才可能判断连接失效。实际耗时取决于运行系统、socket 配置和探测结果，不能把这个等待时间当成业务请求超时。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-26** 填 SO_KEEPALIVE：应用程序需要通过 socket 接口设置 SO_KEEPALIVE 选项，如果没有设置，就无法使用 TCP 保活机制。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-27** 对端程序正常工作时会正常响应探测报文，这样 TCP 保活时间会被重置，等待下一个 TCP 保活时间的到来。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-28** 对端主机宕机并重启后，保活探测报文发过去，对端是可以响应的，但由于没有该连接的有效信息，会产生一个 RST 报文，这样很快就会发现 TCP 连接已经被重置。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-29** 对端主机宕机或报文不可达时，探测报文石沉大海，没有响应；连续几次、达到保活探测次数后，TCP 会报告该 TCP 连接已经死亡。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-30** 进程崩溃后，操作系统会回收 socket，通常能够发起关闭（也可能因未读数据等情况发送 RST）；而主机宕机是无法感知的，所以需要 TCP 保活机制来探测对方是不是发生了主机宕机。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-31** TCP 保活主要判断对端的协议栈能不能响应，检测间隔也可能比较长。如果要判断业务服务是否正常，还需要应用层心跳和请求超时。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-32** 应用层心跳的做法是定期发送心跳请求，要求对端在约定时间内回复，持续没有回复就把连接或服务实例判为不可用；但心跳超时也可能由网络抖动、进程暂停等造成，要结合连续失败次数，避免频繁误判，所以一次超时不足以断定进程崩溃。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-33** HTTP 服务里的 keepalive_timeout 主要用于回收空闲长连接，不是在检测业务心跳。比如设置为 60 秒，完成请求后 60 秒都没有新请求，就可以关闭连接。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)
- **T5-34** 发现连接不可用后，要按业务决定重连、摘除节点或报错。不能把失败请求全部无条件重试，尤其是支付、下单这类请求，要考虑操作是否已经执行以及是否支持幂等。[原文§server a和server b，如何判断两个服务器正常连接？出错怎么办？](https://xiaolincoding.com/interview/network.html#server-a%E5%92%8Cserver-b-%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E4%B8%A4%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5-%E5%87%BA%E9%94%99%E6%80%8E%E4%B9%88%E5%8A%9E)

### 服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?

- **T5-35** 进程启动成功，不代表端口已经监听，更不代表客户端到服务端的整条链路都正常，所以要分几层检查。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-36** 这一层要确认域名、IP、端口、协议和路径，用 ss -lntp 查看服务是否在对应端口上监听；容器内监听还要确认端口映射。服务只监听 127.0.0.1 时，远程客户端无法直接访问。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-37** 在 DNS 和路由这一层，要确认客户端解析到的是正确环境的地址，并检查客户端是否有到目标的路由；ping 只能作参考，不能替代端口和应用探测。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-38** DNS 和路由这一层要确认客户端解析到的是正确环境的地址，并检查客户端是否有到目标的路由；端口映射属于地址和监听，安全组与防火墙属于访问策略，CORS 属于应用处理。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-39** TCP 连通性可以用 nc -vz 目标IP 端口 等工具探测。Connection refused 常见于没有监听或主动拒绝；一直超时则可能是丢包、策略丢弃或链路问题。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-40** 访问策略这一层要检查云安全组、防火墙、网关和白名单是否允许对应的来源、协议和端口，按需放行，而不是直接关闭防火墙。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-41** 代理和 TLS 这一层要检查客户端代理、反向代理到上游的连通性，以及 HTTPS 的证书、域名和协议配置；ss -lntp 属于地址和监听，安全组属于访问策略，解析地址属于 DNS 和路由。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-42** 应用处理这一层用 curl 发起真实请求，再结合接入日志、应用日志和调用链确认请求到了哪一层；浏览器还要检查是否因 CORS 拒绝读取响应。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-43** 400 检查请求格式、参数和 Content-Type；500 查看服务端异常日志。401 / 403 要检查身份凭证和访问权限，也要看是否被网关规则拦截；404 要检查 URL、路由和部署版本，不一定只是客户端拼错地址。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-44** 502 / 503 / 504 要分别检查上游连接和响应、服务可用性以及超时；既可能是配置问题，也可能是资源耗尽，不能只凭状态码就认定后端挂了。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-45** 两端同时抓包，可以看客户端是否发出 SYN，服务端是否收到并回复，HTTP 请求和响应分别走到了哪里，从而把问题范围进一步缩小。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)
- **T5-46** 六层是：地址和监听、DNS 和路由、TCP 连通性、访问策略、代理和 TLS、应用处理。[原文§服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%AD%A3%E5%B8%B8%E5%90%AF%E5%8A%A8%E4%BA%86-%E4%BD%86%E6%98%AF%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%B7%E6%B1%82%E4%B8%8D%E5%88%B0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0-%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)

### 接口超时了，可以直接重试吗？

- **T5-47** 超时只代表客户端没有及时得到结果，不代表服务端一定没有执行。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-48** 超时不代表服务端没有执行：服务端已经扣款成功但响应丢了，客户端就会看到超时，这时如果立刻重新发起一次普通扣款，用户可能被扣两次。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-49** 是否重试要结合业务语义：查询等符合幂等语义的操作，通常可以在合理范围内重试。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-50** 创建订单、支付等操作需要使用业务唯一请求号、幂等键、去重记录等机制，让重复请求对应同一次业务操作；仅靠调长超时时间无法避免响应丢失。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-51** 不确定结果时，可以先查询原请求状态，再决定后续动作。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-52** 重试本身也会增加负载，应该限制次数和总时间，结合退避和随机抖动，避免大量客户端同时重试，把短暂故障放大。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)
- **T5-53** 是否可以安全重试取决于业务是否幂等，而不是请求方法本身：即使用 POST，只要业务实现了幂等，也可以设计成安全重试。[原文§接口超时了，可以直接重试吗？](https://xiaolincoding.com/interview/network.html#%E6%8E%A5%E5%8F%A3%E8%B6%85%E6%97%B6%E4%BA%86-%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E9%87%8D%E8%AF%95%E5%90%97)

### TCP 连接里，send 成功是不是说明对方收到数据了？

- **T5-54** send 成功不等于对方收到数据，通常只说明数据已经被本地协议栈接受；对端是否收到、是否被应用读取、是否处理成功，是后面的事情。[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)
- **T5-55** send 成功通常只说明数据已经被本地协议栈接受；对端是否收到、是否被应用读取、是否处理成功，都不能由此保证。[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)
- **T5-56** send 成功返回的 n 表示本次接受的字节数；当 0 < n < 本次要发送的长度时，应用应从已接受的 n 字节之后继续发送剩余部分。（原文说返回值可能小于长度时继续发剩余部分，省略了成功短写的条件；失败则返回 -1，需根据 errno 处理。）[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)[核对来源：POSIX send](https://pubs.opengroup.org/onlinepubs/9799919799/functions/send.html)
- **T5-57** 填 EAGAIN、EWOULDBLOCK（顺序不限）。非阻塞发送因缓冲区暂时没有空间而无法完成时，send 返回 -1，errno 表示 EAGAIN 或 EWOULDBLOCK。（原文把 errno 的错误符号写成了 send 的返回错误码。）[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)[核对来源：POSIX send](https://pubs.opengroup.org/onlinepubs/9799919799/functions/send.html)
- **T5-58** 只有当 TCP ACK 的确认号覆盖本题所讨论的已发送字节时，才能说明对端 TCP 层确认收到了这些字节；这仍不能说明对端应用已读取或业务已处理成功。[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)
- **T5-59** 要知道业务成功，比如订单已创建，仍然需要业务响应和对应的持久化、幂等设计，不能只靠 send 成功或 TCP ACK。[原文§TCP 连接里，send 成功是不是说明对方收到数据了？](https://xiaolincoding.com/interview/network.html#tcp-%E8%BF%9E%E6%8E%A5%E9%87%8C-send-%E6%88%90%E5%8A%9F%E6%98%AF%E4%B8%8D%E6%98%AF%E8%AF%B4%E6%98%8E%E5%AF%B9%E6%96%B9%E6%94%B6%E5%88%B0%E6%95%B0%E6%8D%AE%E4%BA%86)

### 服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?

- **T5-60** 会出现，ping 不通和 HTTP 能不能访问不是同一件事。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)
- **T5-61** 依次填 ICMP Echo、TCP：ping 通常使用 ICMP Echo，HTTP/1.1、HTTP/2 通常使用 TCP。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)
- **T5-62** 因为 ping 通常使用 ICMP Echo，而 HTTP/1.1、HTTP/2 通常使用 TCP。服务器或网络设备可能禁止、限速 ICMP，但允许 TCP 的 80、443 端口，所以 HTTP 仍然可以成功。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)
- **T5-63** HTTP/3 使用 QUIC/UDP，同样不依赖 ping 成功。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)
- **T5-64** 原文提到：域名可能解析出多个地址，ping 和浏览器访问的不一定是同一个地址；浏览器还可能通过代理访问，所以排查时要确认实际目标和路径。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)
- **T5-65** 反过来也一样：ping 通只能说明对应的 ICMP 探测有回应，不代表业务端口有监听，更不代表接口能正常返回。[原文§服务器ping不通但是http能请求成功，会出现这种情况吗?什么原因造成的?](https://xiaolincoding.com/interview/network.html#%E6%9C%8D%E5%8A%A1%E5%99%A8ping%E4%B8%8D%E9%80%9A%E4%BD%86%E6%98%AFhttp%E8%83%BD%E8%AF%B7%E6%B1%82%E6%88%90%E5%8A%9F-%E4%BC%9A%E5%87%BA%E7%8E%B0%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%E5%90%97-%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E9%80%A0%E6%88%90%E7%9A%84)

## 6. 网络攻击

原文：[计算机网络面试题 · 网络攻击](https://xiaolincoding.com/interview/network.html#%E7%BD%91%E7%BB%9C%E6%94%BB%E5%87%BB)。

### 什么是ddos攻击？怎么防范？

- **T6-1** DDoS 是通过大规模互联网流量淹没目标服务器或其周边基础设施，以破坏目标服务器、服务或网络正常流量的恶意行为。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-2** DDoS 攻击通过连接互联网的计算机网络进行，这些网络由计算机和其他设备（例如 IoT 设备）组成，它们感染了恶意软件而被攻击者远程控制。一旦建立了僵尸网络，攻击者就向每个机器人发送远程指令；僵尸网络将目标服务器或网络作为目标时，每个机器人都会把请求发送到目标的 IP 地址，可能使服务器或网络不堪重负，造成对正常流量的拒绝服务。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-3** 感染恶意软件而被攻击者远程控制的个体设备称为机器人（或僵尸），一组机器人称为僵尸网络。两个空依次是：机器人、僵尸网络。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-4** 由于每个机器人都是合法的互联网设备，因而可能很难区分攻击流量与正常流量。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-5** 网络层攻击的典型类型是 UDP 反射攻击，例如 NTP Flood，这类攻击主要利用大流量拥塞被攻击者的网络带宽，导致业务无法正常响应客户访问。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-6** 传输层攻击的典型类型包括 SYN Flood 攻击、连接数攻击等，这类攻击通过占用服务器的连接池资源达到拒绝服务的目的。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-7** 会话层攻击的典型类型是 SSL 连接攻击，这类攻击占用服务器的 SSL 会话资源，以达到拒绝服务的目的。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-8** 应用层攻击的典型类型包括 DNS flood 攻击、HTTP flood 攻击、游戏假人攻击等，它们占用服务器的应用处理资源，极大消耗服务器处理性能。SYN Flood 属于传输层攻击，NTP Flood 属于网络层的 UDP 反射攻击，SSL 连接攻击属于会话层攻击。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-9** 填增强网络基础设施、使用防火墙和入侵检测系统、流量清洗和负载均衡、配置访问控制策略（顺序不限）。这是该列表的四个条目标题，不要求复述各条目的具体做法。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-10** 配置防火墙规则可以限制不必要的网络流量，阻止来自可疑 IP 地址的流量；入侵检测系统可以帮助及时发现并响应 DDoS 攻击。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-11** 流量清洗是使用专业的 DDoS 防护服务提供商，通过清洗技术过滤掉恶意流量，把合法流量转发给目标服务器；负载均衡可以把流量均匀地分发到多台服务器上，减轻单一服务器的压力。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-12** 访问控制策略可以限制特定 IP 地址或 IP 段的访问，并结合账号、接口和行为设置访问频率限制，目的是避免只按 IP 限制时误伤共享出口的正常用户。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-13** 要先区分攻击打满的是带宽、连接资源，还是业务处理能力，所以两个空是：带宽、连接资源（顺序不限）。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-14** 带宽在上游就被打满时，服务器本地限流通常来不及，需要运营商或专业防护服务在上游清洗。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-15** 应用层请求耗尽资源时，要结合缓存、限流、超时、熔断等措施。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)
- **T6-16** 单纯扩容或增加后端节点，不一定能解决所有类型的 DDoS 攻击。[原文§什么是ddos攻击？怎么防范？](https://xiaolincoding.com/interview/network.html#%E4%BB%80%E4%B9%88%E6%98%AFddos%E6%94%BB%E5%87%BB-%E6%80%8E%E4%B9%88%E9%98%B2%E8%8C%83)

### SQL注入问题是什么？

- **T6-17** SQL 注入就是把用户输入当成 SQL 语法的一部分执行了，最典型的原因是拼接 SQL。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-18** 登录查询原本按用户名和密码过滤，如果直接把输入拼进去，攻击者就可能构造特殊内容改变 WHERE 条件，绕过校验，甚至读取或修改本来无权访问的数据。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-19** 填参数化查询、动态结构使用白名单、最小权限、输入校验（顺序不限）。输入校验在原文中是补充措施；防范的核心是让不可信输入不能改变查询结构。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-20** 参数化查询把 SQL 结构和参数值分开处理，让用户输入只作为数据，而不是 SQL 语法。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-21** 使用 ORM 时，也要避免自己拼接原始 SQL。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-22** 表名、列名、排序方向等通常不能直接作为普通值参数绑定，需要映射到业务允许的固定选项，也就是使用白名单。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-23** 最小权限是指应用的数据库账号只授予需要的权限，这样即使出现漏洞，影响也会更小。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-24** 不能只靠过滤引号、屏蔽几个关键词防 SQL 注入，核心是让不可信输入不能改变查询结构；输入校验只是补充措施。[原文§SQL注入问题是什么？](https://xiaolincoding.com/interview/network.html#sql%E6%B3%A8%E5%85%A5%E9%97%AE%E9%A2%98%E6%98%AF%E4%BB%80%E4%B9%88)

### CSRF攻击是什么？

- **T6-25** CSRF 是跨站请求伪造，核心是利用浏览器自动携带身份凭证，使服务端把诱导的请求当成用户自己的操作。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-26** 攻击者的页面会诱导浏览器向原网站发起修改资料等请求；如果浏览器按规则带上了身份 Cookie，而服务端只检查「已经登录」，就可能执行这次操作。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-27** 攻击者通常不需要知道你的 Cookie 内容，让浏览器替他带上 Cookie 就够了。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-28** 「验证用户已经登录」本身不能防住 CSRF，因为浏览器自动携带身份凭证，使服务端把诱导的请求当成用户自己的操作。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-29** 三个空填 CSRF Token、SameSite Cookie、遵守请求语义（顺序不限）。加上题干已给出的「校验来源」，对应原文列表的四个条目标题；二次确认或重新认证是「遵守请求语义」条目中的具体做法。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-30** CSRF Token 由服务端生成难以猜测的令牌，通过表单或自定义请求头传回，并进行验证；跨站攻击页面不能随意读取受同源策略保护的令牌，所以无法带上正确的令牌。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-31** 校验来源是根据业务校验 Origin 或 Referer，确认请求来自允许的来源，对缺失等情况还要制定明确策略。所以两个空是：Origin、Referer（顺序不限）。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-32** SameSite Cookie 限制跨站请求携带 Cookie，可以降低攻击机会，但仍要结合具体请求和部署方式判断，不是绝对可靠。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-33** 遵守请求语义是指 GET 不用于转账、修改密码等有副作用的操作；重要操作还可以要求二次确认或重新认证。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-34** 如果认证令牌由页面代码主动放在 Authorization 请求头里，浏览器不会替任意跨站页面自动添加这个令牌，传统的 Cookie 型 CSRF 风险会减少。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-35** 把 JWT 放进自动发送的 Cookie 后，仍然要防 CSRF。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-36** CSP 主要是辅助防范脚本注入等问题，不是 CSRF Token 的替代品。[原文§CSRF攻击是什么？](https://xiaolincoding.com/interview/network.html#csrf%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)

### XSS攻击是什么？

- **T6-37** XSS 是跨站脚本攻击，攻击者通过在 Web 页面中插入恶意脚本代码，诱使用户访问该页面，使恶意脚本在用户浏览器中执行，从而盗取用户信息、会话信息等敏感数据，甚至控制用户账户。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-38** XSS 攻击分为存储型（持久型）、反射型（非持久型）和 DOM 型三类。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-39** 存储型（持久型）XSS 的注入型脚本永久存储在目标服务器上，当浏览器请求数据时，脚本从服务器上传回并执行。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-40** 反射型（非持久型）XSS 是用户点击恶意链接、提交表单或进入恶意网站时，注入脚本进入被攻击的网站；Web 服务器把注入脚本（比如错误信息、搜索结果）返回到用户的浏览器，由于浏览器认为这个响应来自「可信任」的服务器，所以会执行这段脚本。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-41** 基于 DOM 的 XSS 是通过修改原始的客户端代码，使受害者浏览器的 DOM 环境改变，导致有效载荷执行：页面本身并没有变化，但由于 DOM 环境被恶意修改，有客户端代码被包含进了页面并被意外执行。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-42** 三个空填输入验证、输出编码、使用 HttpOnly（顺序不限；HttpOnly 也可）。加上题干已给出的 Content Security Policy（CSP），对应原文的四个条目。HttpOnly 可以避免脚本直接读取身份 Cookie、减少凭证泄露，但不能阻止 XSS 脚本执行，也不能阻止恶意脚本以用户身份发送请求。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-43** 输入验证是校验数据类型、长度和业务范围，作为补充措施；富文本需要使用可靠的 HTML 净化方案，不能只过滤几个标签或关键词。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-44** 输出编码要按数据所在的上下文编码，HTML 文本、属性、URL、JavaScript 处理方式不同。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-45** 普通文本尽量通过 textContent 等安全接口插入，避免把不可信内容直接交给 innerHTML。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-46** CSP 通过设置策略，限制网页中可执行的脚本源，有效防范 XSS 攻击。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-47** HttpOnly 可以避免脚本直接读取身份 Cookie，减少凭证泄露，但它不能阻止 XSS 脚本执行，也不能阻止恶意脚本以用户身份发送请求。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-48** 和 CSRF 相比，XSS 是让恶意脚本在受信任的网站页面中执行；CSRF 是让用户浏览器带着身份去发送攻击者构造的请求。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)
- **T6-49** XSS 和 CSRF 需要分别防范，发生 XSS 后，部分 CSRF 防护也可能被绕过。[原文§XSS攻击是什么？](https://xiaolincoding.com/interview/network.html#xss%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88)

### 了解过DNS劫持吗？

- **T6-50** DNS 劫持可能通过篡改 hosts、路由器的 DNS 配置、DNS 记录或者解析响应，把正常域名指向错误地址。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-51** 一个典型场景是攻击者在用户查询 DNS 服务器时篡改响应，将用户请求的域名映射到攻击者控制的虚假 IP 地址上，使用户误以为访问的是正常网站，实际上被重定向到攻击者操控的恶意网站。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-52** 可以检查本地 hosts 和 DNS 配置，保护路由器、域名管理账号及权威 DNS，并按需要使用加密 DNS（DoH、DoT）；DNSSEC 则提供 DNS 数据来源认证和完整性校验。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-53** DoH、DoT 主要保护客户端到所选解析器这一段传输，并不保证解析器本身一定可信。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-54** DNSSEC 提供 DNS 数据来源认证和完整性校验，不负责加密。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-55** DNS 被改到错误 IP，也不代表攻击者就能伪造正确的 HTTPS 身份。正确的证书校验仍然可以发现域名与证书等不匹配的问题。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
- **T6-56** 正确的证书校验仍然可以发现域名与证书等不匹配的问题，所以不能因为页面提示证书错误就直接忽略。[原文§了解过DNS劫持吗？](https://xiaolincoding.com/interview/network.html#%E4%BA%86%E8%A7%A3%E8%BF%87dns%E5%8A%AB%E6%8C%81%E5%90%97)
