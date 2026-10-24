---
title: Splunk：按索引数据量计费的商业日志分析与 SIEM 平台
index: true
isOriginal: true
date: 2026-10-25
category:
  - 主机安全
tag:
  - Splunk
  - SIEM
  - 日志分析
---

# Splunk 是什么

排查一次跨机器的故障，或者还原一次入侵的完整路径，都绕不开同一个动作：把散落在几十上百台机器上的日志收拢到一个地方查。Splunk 是这个领域历史最长的商业产品之一，核心产品是 Splunk Enterprise——一套把机器数据收进来、建索引、支持实时搜索的平台。安全团队说"拿 Splunk 当 SIEM 用"，指的是跑在它之上的付费应用 Splunk Enterprise Security（ES）。

它不开源，授权费用按每天索引的数据量（GB/天）或 vCPU 数计。官方同时提供一个永不过期、每天限索引 500 MB 的 Splunk Free 授权，适合练手和小数据量场景。

## 理解 Splunk

```mermaid
flowchart LR
    A[数据输入层<br>Universal Forwarder] --> B[索引层<br>Indexer：解析 + 写索引]
    B --> C[搜索层<br>Search Head：SPL / ES]
```

官方文档把数据在 Splunk 里走过的路叫 data pipeline，分四段：

- **Input**：消费原始数据流，切成 64K 的块，打上 host、source、sourcetype 等元数据。这一阶段不看内容，还没有"事件"的概念
- **Parsing**：把数据流拆成独立事件，识别并提取时间戳，按正则规则做转换
- **Indexing**：解析后的事件写入磁盘，同时保存压缩的原始数据和索引文件
- **Search**：用户通过 SPL 访问索引数据，报表、仪表盘、告警这类知识对象也归这一段管

三种部署角色对应这四段：Forwarder 负责输入，Indexer 负责解析和索引，Search Head 负责搜索管理。职责划分有个容易忽略的细节：Forwarder 只做最轻量的预处理，真正的解析发生在 Indexer 上；搜索也不是 Search Head 自己跑——它把用户的搜索分发到各台 Indexer，由 Indexer 在本地数据上执行，结果回传后由 Search Head 汇总。所以搜索变慢先看 Indexer 的负载，数据源侧的 Forwarder 资源占用很小，可以和业务装在同一台机器上。小环境一台机器全装，大流量环境拆成分布式集群。详见官方[数据流水线文档](https://docs.splunk.com/Documentation/Splunk/latest/Deploy/Datapipeline)和[扩展部署文档](https://help.splunk.com/en/splunk-enterprise/administer/distributed-deployment-manual/10.6/overview-of-splunk-enterprise-distributed-deployments/scale-your-deployment-with-splunk-enterprise-components)。

### 索引里的数据怎么老去：分桶生命周期

写进索引的数据并不堆在一起。Indexer 把每个索引切成一批按时间范围限定的目录，叫桶（bucket），桶里同时保存压缩的原始数据和指向它的索引文件。桶随年龄沿一条固定路径滚动，[官方存储文档](https://docs.splunk.com/Documentation/Splunk/latest/Indexer/HowSplunkstoresindexes)列出的状态如下：

| 状态 | 含义 | 可搜索 |
|------|------|--------|
| hot | 新数据写入处，一个索引可同时开着多个 hot 桶 | √ |
| warm | hot 桶写满或实例重启后滚动而来，只读不写，数量可以很多 | √ |
| cold | warm 桶按年龄继续滚动而来，可配置挪到更便宜的存储位置 | √ |
| frozen | 到达保留策略终点，默认直接删除，也可先归档 | × |
| thawed | 归档过的桶解冻回索引，用于事后回溯取证 | √ |

滚动条件（桶大小、桶数量、数据年龄）都由 indexes.conf 控制。保留策略就落在这条链上：热数据放快盘保搜索速度，冷数据挪慢盘省成本，到期归档或删除。一个例外是启用了 SmartStore 的索引——数据放 S3 这类远端存储，cold 状态通常不存在。

## 核心功能特点

### SPL 搜索语言

所有分析最终都落到 SPL 查询上：过滤、统计、关联、可视化都在搜索框里完成。按[官方定义](https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutthesearchlanguage)，SPL 是全部搜索命令连同它们的函数、参数、子句的总称，命令负责对从索引取回的事件做过滤、提取字段、算统计、排序、画图。

SPL 查询是管道结构，拿一条典型的排错查询拆开看：

```spl
sourcetype=access_* status=500
| stats count AS errors by uri_path
| sort -errors
| head 10
```

- 第一段是基础搜索，从索引里捞出 sourcetype 以 `access_` 开头、状态码 500 的事件。这一段决定搜索的代价：索引和时间范围限定得越准，后面越轻松
- 管道符把上一段的结果交给下一段。`stats count AS errors by uri_path` 按访问路径分组计数，把事件流压成一张统计表
- `sort -errors` 按计数排序，`-` 表示降序
- `head 10` 只留前 10 行，即报错最多的 10 个路径

命令的参数分必需和可选，文档里尖括号是必需参数、方括号是可选参数，这套约定见 [Understanding SPL syntax](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/UnderstandingSPLsyntax)。学习曲线主要集中在 SPL，官方的 [Search Tutorial](https://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/WelcometotheSearchTutorial) 用一份示例数据带完整个流程。

### Universal Forwarder

轻量采集器，装在每台被监控的机器上把数据流式发给 Indexer。它没有 Web 界面，资源占用低，官方称一个部署装几千个也不会压垮网络。功能上支持元数据打标、可配置的缓冲、数据压缩和 SSL 加密。细节见 [Universal Forwarder 文档](https://docs.splunk.com/Documentation/Forwarder/latest/Forwarder/Abouttheuniversalforwarder)。

### Splunkbase 应用生态

[Splunkbase](https://splunkbase.splunk.com/) 是官方应用市场，第三方厂商在这里发布 App 和 Add-on，负责解析自家设备的日志格式、提供现成仪表盘。接新数据源时先到上面找现成 Add-on，能省掉大量手写解析规则的时间。

### Splunk Enterprise Security 与 Splunk SOAR

Splunk Enterprise 本身只是数据底座：采集、索引、搜索，外加告警、报表这类知识对象。安全检测能力由跑在底座之上的付费产品补齐，核心是两件：

- **Splunk Enterprise Security（ES）**：单独付费的 SIEM 应用，装在 Splunk Enterprise 或 Splunk Cloud 之上，官方定位是统一的威胁检测、调查与响应（TDIR）平台，集成了 UEBA（用户与实体行为分析）做内部威胁和零日攻击检测。产品页见 [Splunk Enterprise Security](https://www.splunk.com/en_us/products/enterprise-security.html)，文档单列在 [docs.splunk.com/Documentation/ES](https://docs.splunk.com/Documentation/ES)
- **Splunk SOAR**：独立的自动化编排产品，[官方文档入口](https://help.splunk.com/en/splunk-soar)给它的定位是集成编排、playbook 自动化和案件管理。典型分工是 ES 产出告警和调查结论，SOAR 接管处置流程：封 IP、禁账号、开工单

买授权时这是三笔单独的账：Enterprise 按数据量或 vCPU 买的是底座，ES 和 SOAR 各自另计。

### 授权模式：选型绕不开的变量

Splunk 的授权种类很多，官方有[完整说明](https://docs.splunk.com/Documentation/Splunk/latest/Admin/TypesofSplunklicenses)，挑常见的：

| 授权类型 | 索引额度 | 有效期 | 功能范围 |
|----------|----------|--------|----------|
| Enterprise 按量授权 | 按购买的 GB/天 | 依合同 | 全部功能 |
| Enterprise 基础设施授权 | 按 vCPU 数 | 依合同 | 全部功能 |
| Enterprise Trial | 500 MB/天 | 60 天 | 全部功能，仅单机 |
| Dev/Test（个人版） | 50 GB/天 | 6 个月，可续 | 有限功能，仅单机 |
| Developer | 10 GB/天 | 6 个月，可续 | 全部功能，供开发测试 |
| Free | 500 MB/天 | 永不过期 | 砍掉一批功能，见下 |

Splunk Free 砍掉的功能，官方[逐条列出](https://docs.splunk.com/Documentation/Splunk/latest/Admin/MoreaboutSplunkFree)：

- 告警（监控）不可用
- 没有用户和角色体系：无登录页，任何人连上实例就是管理员
- 分布式搜索、搜索头集群、索引器集群不可用
- 不能以 TCP/HTTP 格式把数据转发给非 Splunk 软件
- 报表加速摘要不可用

超限的后果也要知道：滚动 30 天内累计 3 次授权警告，搜索功能被禁用，索引照常写入，降到 3 次以下后恢复。一个例外：官方允许 30 天内做最多 2 次大批量导入，方便对大数据集做一次性的取证分析。

### 免费版与开源替代的关系

500 MB/天决定了 Splunk Free 的定位：学 SPL、做小数据量分析可以，扛生产日志不行。不想按数据量付费的话，开源阵营里定位接近的是 Wazuh——GPLv2 协议、无数据量限制、自带检测规则和主动响应能力，代价是生态成熟度和搜索语言表现力不如 Splunk。两者不是简单的平替关系，选型时按团队预算和运营能力权衡。

## 部署形态怎么选

| 形态 | 结构 | 适用 |
|------|------|------|
| 单机单实例 | 一台机器包揽输入、索引、搜索 | 测试评估、部门级环境 |
| 分布式 | 三层拆开各自扩容：Forwarder 群采集，多台 Indexer 解析存储并执行本地搜索，Search Head 分发搜索、汇总结果 | 数据量大、搜索用户多的企业环境 |
| 分布式 + 集群 | Indexer 组集群做数据复制，Search Head 组集群保搜索层高可用 | 有可用性和容灾要求的环境 |
| Splunk Cloud | 同样三层结构，由 Splunk 托管基础设施的 SaaS 形态 | 不想自己运维底座、数据驻留和合规要求允许的团队 |

[扩展部署文档](https://help.splunk.com/en/splunk-enterprise/administer/distributed-deployment-manual/10.6/overview-of-splunk-enterprise-distributed-deployments/scale-your-deployment-with-splunk-enterprise-components)对扩容的描述很直白：哪层不够就往哪层加实例，Forwarder 可以成百上千地铺。选 Splunk Cloud 还是自管 Enterprise，主要变量是数据驻留要求和运维人手——Splunk 把 [Cloud 的文档](https://help.splunk.com/en/splunk-cloud-platform)和 Enterprise 文档分成两条产品线维护，功能集和升级节奏并不完全对齐。

## 典型应用场景

1. **企业 SOC 的 SIEM**：Enterprise 授权 + ES，集中做告警关联、调查和响应
2. **IT 运维排障**：把应用、系统、网络设备日志集中检索，跨机器关联时间线
3. **合规审计**：日志集中留存和报表，支撑审计取证
4. **个人学习与实验**：Splunk Free 或 60 天 Trial，跟着 Search Tutorial 练手
5. **一次性取证分析**：利用 Free 版 30 天内两次大批量导入的口子，载入历史日志做回溯

## 学习资源

- **官方文档站**：[docs.splunk.com/Documentation/Splunk](https://docs.splunk.com/Documentation/Splunk)，Admin Manual 管部署运维，Search Manual 管查询语言
- **数据与存储**：[数据流水线](https://docs.splunk.com/Documentation/Splunk/latest/Deploy/Datapipeline)、[索引分桶机制](https://docs.splunk.com/Documentation/Splunk/latest/Indexer/HowSplunkstoresindexes)、[扩展部署](https://help.splunk.com/en/splunk-enterprise/administer/distributed-deployment-manual/10.6/overview-of-splunk-enterprise-distributed-deployments/scale-your-deployment-with-splunk-enterprise-components)
- **SPL**：[About the search language](https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutthesearchlanguage)、[Understanding SPL syntax](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/UnderstandingSPLsyntax)、[Search Tutorial](https://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/WelcometotheSearchTutorial)
- **产品页**：[Splunk Enterprise](https://www.splunk.com/en_us/products/splunk-enterprise.html) 与 [Splunk Enterprise Security](https://www.splunk.com/en_us/products/enterprise-security.html)
- **授权细则**：[Types of Splunk Enterprise licenses](https://docs.splunk.com/Documentation/Splunk/latest/Admin/TypesofSplunklicenses)、[About Splunk Free](https://docs.splunk.com/Documentation/Splunk/latest/Admin/MoreaboutSplunkFree)
- **ES 与 SOAR 文档**：[docs.splunk.com/Documentation/ES](https://docs.splunk.com/Documentation/ES)、[help.splunk.com/en/splunk-soar](https://help.splunk.com/en/splunk-soar)
- **托管版**：[Splunk Cloud Platform 文档](https://help.splunk.com/en/splunk-cloud-platform)
- **应用市场**：[splunkbase.splunk.com](https://splunkbase.splunk.com/)
- **下载入口**：[splunk.com 下载页](https://www.splunk.com/en_us/download.html)（需注册账号）
