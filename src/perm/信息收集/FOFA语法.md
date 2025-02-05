---
title: FOFA
index: true
order: 2
date: 2023-01-10
category:
  - 渗透测试
tag:
  - 信息收集
  - FOFA
---
高级搜索

| 逻辑连接符 | 具体含义                                                                           |
| ------------ | ------------------------------------------------------------------------------------ |
| \=      | 匹配，\=""时，可查询不存在字段或者值为空的情况。                                |
| \=\= | 完全匹配，\=\=""时，可查询存在且值为空的情况。                               |
| &&         | 与                                                                                 |
| \|\| | 或                                                                                 |
| !\=     | 不匹配，!\=""时，可查询值不为空的情况。                                         |
| \*\= | 模糊匹配，使用\*或者?进行搜索，比如banner\*\="mys??" (个人版及以上可用)。 |
| ()         | 确认查询优先级，括号内容优先级最高。                                               |

关于建站软件的搜索语法请参考：[组件列表](https://fofa.info/library)

基础类（General）
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ------------------- | -------------------------- | -------------------------- | ---- | ---- | ---- |
| ip                | [ip=&quot;1.1.1.1&quot;](https://fofa.info/result?qbase64=aXA9IjEuMS4xLjEi)                         | 通过单一IPv4地址进行查询 | ✓ | ✓ | -  |
| [ip=&quot;220.181.111.1/24&quot;](https://fofa.info/result?qbase64=aXA9IjIyMC4xODEuMTExLjEvMjQi)                  | 通过IPv4 C段进行查询     | ✓                       | ✓ | -  |    |
| [ip=&quot;ipv6&quot;](https://fofa.info/result?qbase64=aXA9IjI2MDA6OTAwMDoyMDJhOjI2MDA6MTg6NGFiNzpmNjAwOjkzYTEi)                  | 通过单一Ipv6地址进行查询 | ✓                       | ✓ | -  |    |
| port              | [port=&quot;6379&quot;](https://fofa.info/result?qbase64=cG9ydD0iNjM3OSI=)                         | 通过端口号进行查询       | ✓ | ✓ | ✓ |
| domain            | [domain=&quot;qq.com&quot;](https://fofa.info/result?qbase64=ZG9tYWluPSJxcS5jb20i)                         | 通过根域名进行查询       | ✓ | ✓ | ✓ |
| host              | [host=&quot;.fofa.info&quot;](https://fofa.info/result?qbase64=aG9zdD0iLmZvZmEuaW5mbyI=)                         | 通过主机名进行查询       | ✓ | ✓ | ✓ |
| os                | [os=&quot;centos&quot;](https://fofa.info/result?qbase64=b3M9ImNlbnRvcyI=)                         | 通过操作系统进行查询     | ✓ | ✓ | ✓ |
| server            | [server=&quot;Microsoft-IIS/10&quot;](https://fofa.info/result?qbase64=c2VydmVyPSJNaWNyb3NvZnQtSUlTLzEwIg==)                         | 通过服务器进行查询       | ✓ | ✓ | ✓ |
| asn               | [asn=&quot;19551&quot;](https://fofa.info/result?qbase64=YXNuPSIxOTU1MSI=)                         | 通过自治系统号进行搜索   | ✓ | ✓ | ✓ |
| org               | [org=&quot;LLC Baxet&quot;](https://fofa.info/result?qbase64=b3JnPSJMTEMgQmF4ZXQi)                         | 通过所属组织进行查询     | ✓ | ✓ | ✓ |
| is\_domain     | [is_domain=true](https://fofa.info/result?qbase64=aXNfZG9tYWluPXRydWU=)                         | 筛选拥有域名的资产       | ✓ | -  | -  |
| [is_domain=false](https://fofa.info/result?qbase64=aXNfZG9tYWluPWZhbHNl)                  | 筛选没有域名的资产       | ✓                       | -  | -  |    |
| is\_ipv6       | [is_ipv6=true](https://fofa.info/result?qbase64=aXNfaXB2Nj10cnVl)                         | 筛选是ipv6的资产         | ✓ | -  | -  |
| [is_ipv6=false](https://fofa.info/result?qbase64=aXNfaXB2Nj1mYWxzZQ==)                  | 筛选是ipv4的资产         | ✓                       | -  | -  |    |

标记类（Special Label）
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ------------------------- | ------------------------------------------ | ------------------------------------------- | ---- | ---- | ---- |
| app                     | [app=&quot;Microsoft-Exchange&quot;](https://fofa.info/result?qbase64=YXBwPSJNaWNyb3NvZnQtRXhjaGFuZ2Ui)                                         | 通过FOFA整理的规则进行查询                | ✓ | -  | -  |
| fid                     | [fid=&quot;sSXXGNUO2FefBTcCLIT/2Q==&quot;](https://fofa.info/result?qbase64=ZmlkPSJzU1hYR05VTzJGZWZCVGNDTElULzJRPT0i)                                         | 通过FOFA聚合的站点指纹进行查询            | ✓ | ✓ | -  |
| product                 | [product=&quot;NGINX&quot;](https://fofa.info/result?qbase64=cHJvZHVjdD0iTkdJTlgi)                                         | 通过FOFA标记的产品名进行查询              | ✓ | ✓ | -  |
| category                | [category=&quot;服务&quot;](https://fofa.info/result?qbase64=Y2F0ZWdvcnk9IuacjeWKoSI=)                                         | 通过FOFA标记的分类进行查询                | ✓ | ✓ | -  |
| type                    | [type=&quot;service&quot;](https://fofa.info/result?qbase64=dHlwZT0ic2VydmljZSI=)                                         | 筛选协议资产                              | ✓ | -  | -  |
| [type=&quot;subdomain&quot;](https://fofa.info/result?qbase64=dHlwZT0ic3ViZG9tYWluIg==)                        | 筛选服务（网站类）资产                   | ✓                                        | -  | -  |    |
| cloud\_name          | [cloud_name=&quot;Aliyundun&quot;](https://fofa.info/result?qbase64=Y2xvdWRfbmFtZT0iQWxpeXVuZHVuIg==)                                         | 通过云服务商进行查询                      | ✓ | ✓ | ✓ |
| is\_cloud            | [is_cloud=true](https://fofa.info/result?qbase64=aXNfY2xvdWQ9dHJ1ZQ==)                                         | 筛选是云服务的资产                        | ✓ | -  | -  |
| [is_cloud=false](https://fofa.info/result?qbase64=aXNfY2xvdWQ9ZmFsc2U=)                        | 筛选不是云服务的资产                     | ✓                                        | -  | -  |    |
| is\_fraud            | [is_fraud=true](https://fofa.info/result?qbase64=aXNfZnJhdWQ9dHJ1ZQ==)                                         | 筛选是仿冒垃圾站群的资产 （专业版及以上） | ✓ | -  | -  |
| [is_fraud=false](https://fofa.info/result?qbase64=aXNfZnJhdWQ9ZmFsc2U=)                        | 筛选不是仿冒垃圾站群的资产（已默认筛选） | ✓                                        | -  | -  |    |
| is\_honeypot         | [is_honeypot=true](https://fofa.info/result?qbase64=aXNfaG9uZXlwb3Q9dHJ1ZQ==)                                         | 筛选是蜜罐的资产 （专业版及以上）         | ✓ | -  | -  |
| [is_honeypot=false](https://fofa.info/result?qbase64=aXNfaG9uZXlwb3Q9ZmFsc2U=)                        | 筛选不是蜜罐的资产（已默认筛选）         | ✓                                        | -  | -  |    |

协议类 (type\=service) 
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ---------------------------- | --------------------------- | --------------------------- | ---- | ---- | ---- |
| protocol                   | [protocol=&quot;quic&quot;](https://fofa.info/result?qbase64=cHJvdG9jb2w9InF1aWMi)                          | 通过协议名称进行查询      | ✓ | ✓ | ✓ |
| banner                     | [banner=&quot;users&quot;](https://fofa.info/result?qbase64=YmFubmVyPSJ1c2VycyI=)                          | 通过协议返回信息进行查询  | ✓ | ✓ | ✓ |
| base\_protocol          | [base_protocol=&quot;udp&quot;](https://fofa.info/result?qbase64=YmFzZV9wcm90b2NvbD0idWRwIg==)                          | 查询传输层为udp协议的资产 | ✓ | ✓ | -  |
| [base_protocol=&quot;tcp&quot;](https://fofa.info/result?qbase64=YmFzZV9wcm90b2NvbD0idGNwIg==)                           | 查询传输层为tcp协议的资产 | ✓                        | ✓ | -  |    |

网站类（type\=subdomain）
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ------------------------------ | -- | --------------------------------------------------------------- | ---- | ---- | ---- |
| title                        | [title=&quot;beijing&quot;](https://fofa.info/result?qbase64=dGl0bGU9ImJlaWppbmci) | 通过网站标题进行查询                                          | ✓ | ✓ | ✓ |
| header                       | [header=&quot;elastic&quot;](https://fofa.info/result?qbase64=aGVhZGVyPSJlbGFzdGljIg==) | 通过响应标头进行查询                                          | ✓ | ✓ | ✓ |
| header\_hash              | [header_hash=&quot;1258854265&quot;](https://fofa.info/result?qbase64=aGVhZGVyX2hhc2g9IjEyNTg4NTQyNjUi) | 通过http/https响应头计算的hash值进行查询 （个人版及以上）     | ✓ | ✓ | ✓ |
| body                         | [body=&quot;网络空间测绘&quot;](https://fofa.info/result?qbase64=Ym9keT0i572R57uc56m66Ze05rWL57uYIg==) | 通过HTML正文进行查询                                          | ✓ | ✓ | -  |
| body\_hash                | [body_hash=&quot;-2090962452&quot;](https://fofa.info/result?qbase64=Ym9keV9oYXNoPSItMjA5MDk2MjQ1MiI=) | 通过HTML正文计算的hash值进行查询                              | ✓ | ✓ | -  |
| js\_name                  | [js_name=&quot;js/jquery.js&quot;](https://fofa.info/result?qbase64=anNfbmFtZT0ianMvanF1ZXJ5LmpzIg==) | 通过HTML正文包含的JS进行查询                                  | ✓ | ✓ | ✓ |
| js\_md5                   | [js_md5=&quot;82ac3f143&quot;](https://fofa.info/result?qbase64=anNfbWQ1PSI4MmFjM2YxNDMyN2E4YjdiYTQ5YmFhMjA4ZDRlYWExNSI=) | 通过JS源码进行查询                                            | ✓ | ✓ | ✓ |
| cname                        | [cname=&quot;ap21.inst.siteforce.com&quot;](https://fofa.info/result?qbase64=Y25hbWU9ImFwMjEuaW5zdC5zaXRlZm9yY2UuY29tIg==) | 通过别名记录进行查询                                          | ✓ | ✓ | ✓ |
| cname\_domain             | [cname_domain=&quot;siteforce.com&quot;](https://fofa.info/result?qbase64=Y25hbWVfZG9tYWluPSJzaXRlZm9yY2UuY29tIg==) | 通过别名记录解析的主域名进行查询                              | ✓ | ✓ | ✓ |
| icon\_hash                | [icon_hash=&quot;-247388890&quot;](https://fofa.info/result?qbase64=aWNvbl9oYXNoPSItMjQ3Mzg4ODkwIg==) | 通过网站图标的hash值进行查询                                  | ✓ | ✓ | -  |
| status\_code              | [status_code=&quot;402&quot;](https://fofa.info/result?qbase64=c3RhdHVzX2NvZGU9IjQwMiI=) | 筛选服务状态为402的服务（网站）资产                           | ✓ | ✓ | -  |
| icp                          | [icp=&quot;京ICP证030173号&quot;](https://fofa.info/result?qbase64=aWNwPSLkuqxJQ1Dor4EwMzAxNzPlj7ci) | 通过HTML正文包含的ICP备案号进行查询                           | ✓ | ✓ | ✓ |
| sdk\_hash                 | [sdk_hash==&quot;Mkb4Ms4R9&quot;](https://fofa.info/result?qbase64=c2RrX2hhc2g9PSJNa2I0TXM0Ujk2Z2x2L1Q2VFJ6d1BXaDNVRGF0QnFlRiI=) | 通过网站嵌入的第三方代码计算的hash值进行查询 （商业版及以上） | ✓ | ✓ | -  |

地理位置
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ---------------------- | ------------------------------------------------- | ------------------------------- | ---- | ---- | --- |
| country              | [country=&quot;CN&quot;](https://fofa.info/result?qbase64=Y291bnRyeT0iQ04i)                                                | 通过国家的简称代码进行查询    | ✓ | ✓ | - |
| [country=&quot;中国&quot;](https://fofa.info/result?qbase64=Y291bnRyeT0i5Lit5Zu9Ig==)                     | 通过国家中文名称进行查询                        | ✓                            | ✓ | -  |   |
| region               | [region=&quot;Zhejiang&quot;](https://fofa.info/result?qbase64=cmVnaW9uPSJaaGVqaWFuZyI=)                                                | 通过省份/地区英文名称进行查询 | ✓ | ✓ | - |
| [region=&quot;浙江&quot;](https://fofa.info/result?qbase64=cmVnaW9uPSLmtZnmsZ8i)                     | 通过省份/地区中文名称进行查询（仅支持中国地区） | ✓                            | ✓ | -  |   |
| city                 | [city=&quot;Hangzhou&quot;](https://fofa.info/result?qbase64=Y2l0eT0iSGFuZ3pob3Ui)                                                | 通过城市英文名称进行查询      | ✓ | ✓ | - |

证书类 
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| --------------------- | ----------------------------------------- | ------------------------------------------- | ---- | ---- | ---- |
| cert                | [cert=&quot;baidu&quot;](https://fofa.info/result?qbase64=Y2VydD0iYmFpZHUi)                                        | 通过证书进行查询                          | ✓ | ✓ | ✓ |
| cert.subject        | [cert.subject=&quot;Oracle Corporation&quot;](https://fofa.info/result?qbase64=Y2VydC5zdWJqZWN0PSJPcmFjbGUgQ29ycG9yYXRpb24i)                                        | 通过证书的持有者进行查询                  | ✓ | ✓ | ✓ |
| cert.issuer         | [cert.issuer=&quot;DigiCert&quot;](https://fofa.info/result?qbase64=Y2VydC5pc3N1ZXI9IkRpZ2lDZXJ0Ig==)                                        | 通过证书的颁发者进行查询                  | ✓ | ✓ | ✓ |
| cert.subject.org    | [cert.subject.org=&quot;Oracle Corporation&quot;](https://fofa.info/result?qbase64=Y2VydC5zdWJqZWN0Lm9yZz0iT3JhY2xlIENvcnBvcmF0aW9uIg==)                                        | 通过证书持有者的组织进行查询              | ✓ | ✓ | ✓ |
| cert.subject.cn     | [cert.subject.cn=&quot;baidu.com&quot;](https://fofa.info/result?qbase64=Y2VydC5zdWJqZWN0LmNuPSJiYWlkdS5jb20i)                                        | 通过证书持有者的通用名称进行查询          | ✓ | ✓ | ✓ |
| cert.issuer.org     | [cert.issuer.org=&quot;cPanel, Inc.&quot;](https://fofa.info/result?qbase64=Y2VydC5pc3N1ZXIub3JnPSJjUGFuZWwsIEluYy4i)                                        | 通过证书颁发者的组织进行查询              | ✓ | ✓ | ✓ |
| cert.issuer.cn      | [cert.issuer.cn=&quot;Synology Inc. CA&quot;](https://fofa.info/result?qbase64=Y2VydC5pc3N1ZXIuY249IlN5bm9sb2d5IEluYy4gQ0Ei)                                        | 通过证书颁发者的通用名称进行查询          | ✓ | ✓ | ✓ |
| cert.is\_valid   | [cert.is_valid=true](https://fofa.info/result?qbase64=Y2VydC5pc192YWxpZD10cnVl)                                        | 筛选证书是有效证书的资产 （个人版及以上） | ✓ | -  | -  |
| [cert.is_valid=false](https://fofa.info/result?qbase64=Y2VydC5pc192YWxpZD1mYWxzZQ==)                    | 筛选证书是无效证书的资产 （个人版上）   | ✓                                        | -  | -  |    |
| cert.is\_match   | [cert.is_match=true](https://fofa.info/result?qbase64=Y2VydC5pc19tYXRjaD10cnVl)                                        | 筛选证书和域名匹配的资产 （个人版及以上） | ✓ | -  | -  |
| [cert.is_match=false](https://fofa.info/result?qbase64=Y2VydC5pc19tYXRjaD1mYWxzZQ==)                    | 筛选证书和域名不匹配的资产 （个人版上） | ✓                                        | -  | -  |    |
| cert.is\_expired | [cert.is_expired=true](https://fofa.info/result?qbase64=Y2VydC5pc19leHBpcmVkPXRydWU=)                                        | 筛选证书已过期的资产 （个人版及以上）     | ✓ | -  | -  |
| [cert.is_expired=false](https://fofa.info/result?qbase64=Y2VydC5pc19leHBpcmVkPWZhbHNl)                    | 筛选证书未过期的资产 （个人版及以上）   | ✓                                        | -  | -  |    |
| jarm                | [jarm=&quot;2ad2ad0002ad2ad22c2ad2ad2a&quot;](https://fofa.info/result?qbase64=amFybT0iMmFkMmFkMDAwMmFkMmFkMjJjMmFkMmFkMmFkMmFkMmVhYzkyZWMzNGJjYzBjZjc1MjBlOTc1NDdmODNlODEi)                                        | 通过JARM指纹进行查询                      | ✓ | ✓ | ✓ |
| tls.version         | [tls.version=&quot;TLS 1.3&quot;](https://fofa.info/result?qbase64=dGxzLnZlcnNpb249IlRMUyAxLjMi)                                        | 通过tls的协议版本进行查询                 | ✓ | ✓ | -  |
| tls.ja3s            | [tls.ja3s=&quot;15af977ce25de452b96&quot;](https://fofa.info/result?qbase64=dGxzLmphM3M9IjE1YWY5NzdjZTI1ZGU0NTJiOTZhZmZhMmFkZGIxMDM2Ig==)                                        | 通过tls的ja3s指纹进行查询                 | ✓ | ✓ | ✓ |

| 时间类（Last update time） |  |                              |    |   |   |
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ---------------------------- | -- | ------------------------------ | ---- | --- | --- |
| after                      | [after=&quot;2023-01-01&quot;](https://fofa.info/result?qbase64=YWZ0ZXI9IjIwMjMtMDEtMDEi) | 筛选某一时间之后有更新的资产 | ✓ | - | - |
| before                     | [before=&quot;2023-12-01&quot;](https://fofa.info/result?qbase64=YmVmb3JlPSIyMDIzLTEyLTAxIg==) | 筛选某一时间之前有更新的资产 | ✓ | - | - |
| after&before               | [after=&quot;2023-01-01&quot; &amp;&amp; before=&quot;2023-12-01&quot;](https://fofa.info/result?qbase64=YWZ0ZXI9IjIwMjMtMDEtMDEiICYmIGJlZm9yZT0iMjAyMy0xMi0wMSI=) | 筛选某一时间区间有更新的资产 | ✓ | - | - |

| 独立IP语法（独立IP系列语法，不可和上面其他语法共用） |  |                                                   |    |    |   |
| 语法 | 例句 | 用途说明 | \= | !\= | \*\= |
| ------------------------------------------------------ | -- | --------------------------------------------------- | ---- | ---- | --- |
| port\_size                                        | [port_size=&quot;6&quot;](https://fofa.info/result?qbase64=cG9ydF9zaXplPSI2Ig==) | 筛选开放端口数量等于6个的独立IP （个人版及以上）  | ✓ | ✓ | - |
| port\_size\_gt                                 | [port_size_gt=&quot;6&quot;](https://fofa.info/result?qbase64=cG9ydF9zaXplX2d0PSI2Ig==) | 筛选开放端口数量大于6个的独立IP （个人版及以上）  | ✓ | -  | - |
| port\_size\_lt                                 | [port_size_lt=&quot;12&quot;](https://fofa.info/result?qbase64=cG9ydF9zaXplX2x0PSIxMiI=) | 筛选开放端口数量小于12个的独立IP （个人版及以上） | ✓ | -  | - |
| ip\_ports                                         | [ip_ports=&quot;80,161&quot;](https://fofa.info/result?qbase64=aXBfcG9ydHM9IjgwLDE2MSI=) | 筛选同时开放不同端口的独立IP                      | ✓ | -  | - |
| ip\_country                                       | [ip_country=&quot;CN&quot;](https://fofa.info/result?qbase64=aXBfY291bnRyeT0iQ04i) | 通过国家的简称代码进行查询独立IP                  | ✓ | -  | - |
| ip\_region                                        | [ip_region=&quot;Zhejiang&quot;](https://fofa.info/result?qbase64=aXBfcmVnaW9uPSJaaGVqaWFuZyI=) | 通过省份/地区英文名称进行查询独立IP               | ✓ | -  | - |
| ip\_city                                          | [ip_city=&quot;Hangzhou&quot;](https://fofa.info/result?qbase64=aXBfY2l0eT0iSGFuZ3pob3Ui) | 通过城市英文名称进行查询独立IP                    | ✓ | -  | - |
| ip\_after                                         | [ip_after=&quot;2021-03-18&quot;](https://fofa.info/result?qbase64=aXBfYWZ0ZXI9IjIwMjEtMDMtMTgi) | 筛选某一时间之后有更新的独立IP                    | ✓ | -  | - |
| ip\_before                                        | [ip_before=&quot;2019-09-09&quot;](https://fofa.info/result?qbase64=aXBfYmVmb3JlPSIyMDE5LTA5LTA5Ig==) | 筛选某一时间之前有更新的独立IP                    | ✓ | -  | - |