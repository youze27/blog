---
title: ELK：把散落的安全日志变成可查的线索
index: true
isOriginal: true
date: 2026-10-25
category:
  - 主机安全
tag:
  - ELK
  - Elasticsearch
  - 日志分析
  - SIEM
---

# ELK 是什么

入侵发生后最怕的一种局面：日志散在几百台机器上，这台的 auth.log、那台的 Windows 事件、应用自己的 error.log，格式各不相同，留存周期各自为政，想还原攻击路径只能一台一台登录上去 grep。ELK 是 Elastic 公司围绕 Elasticsearch 攒出的一套日志栈，名字来自三个组件的首字母：Elasticsearch、Logstash、Kibana，后来加上轻量采集器 Beats，官方改称 Elastic Stack。四个组件各管一段，合起来覆盖"采集、传输、存储、分析"整条链路，下文统一叫它 Elastic Stack。

安全团队接触它通常有两条路：自己搭一套做日志平台，或者在商用 SIEM 的底层组件里认出它。

## 理解 Elastic Stack

```mermaid
flowchart LR
    A[Beats<br>装在每台主机上<br>Filebeat / Winlogbeat] --> B[Logstash<br>解析 / 富化 / 过滤]
    B --> C[Elasticsearch<br>分布式存储与索引]
    C --> D[Kibana<br>检索 / 仪表盘 / 告警]
    A -.小流量场景可直连.-> C
```

- **Beats** 回答"日志怎么从机器上出来"：轻量采集器，资源占用小，按日志类型分不同的 Beat
- **Logstash** 回答"脏数据怎么变干净"：服务端的处理管道，把非结构化日志切成字段、补上地理信息等上下文
- **Elasticsearch** 回答"几百 TB 日志怎么查得动"：分布式搜索引擎，靠倒排索引做全文检索
- **Kibana** 回答"人怎么和这些数据打交道"：Web 界面，检索、画图、配告警都在这里

流量不大的环境可以省掉 Logstash，Beats 直连 Elasticsearch，链路越短，要维护的东西越少。

## 各组件分工

| 组件 | 角色 | 关键能力 |
|------|------|----------|
| Beats | 采集 | Filebeat 读日志文件，Winlogbeat 收 Windows 事件日志，资源占用远小于 Logstash |
| Logstash | 清洗 | input / filter / output 三段式管道，filter 里用 grok 把一行文本拆成结构化字段 |
| Elasticsearch | 存储与检索 | 分布式分片存储，倒排索引，写入后近实时可查 |
| Kibana | 展示与分析 | Discover 交互式检索，Dashboard 可视化，内置告警规则管理 |

## 核心功能特点

### Elasticsearch：为搜索而生的存储

对安全分析直接有用的两点：全文检索可以不打 schema 先搜关键词，应急排查时先找到线索再回头补解析；聚合查询可以一条语句算出"过去 24 小时各源 IP 的失败登录次数"这类统计。支撑这两点的机制值得拆开看。

#### 倒排索引：关键词检索为什么快

关系型数据库按行存，查"哪台机器出现过这个 IP"得扫全表。Elasticsearch 反着来：写入时先对文本做分词（分析），再建一张从词条到文档的映射。官方在[全文检索原理](https://www.elastic.co/docs/solutions/search/full-text/how-full-text-works)里把这数据结构叫倒排索引，由两部分组成：词典（索引里所有唯一词条的排序列表）和 posting list（每个词条出现在哪些文档，附带词频、位置等信息）。搜 `Failed password` 变成查两个词条的 posting list 再求交集，耗时取决于命中词条的文档列表长度，和日志总行数关系不大。打分默认用 BM25（TF-IDF 的现代变体），词条越稀有、命中越集中得分越高——应急时搜一个罕见 IOC 反而排在最前，这个排序对找线索恰好有用。

#### 分片与近实时

索引不整体存放，而是拆成分片（shard）分散到集群各节点。按[官方文档](https://www.elastic.co/docs/manage-data/data-store/index-basics)，每个分片是一个独立的 Lucene 索引，分两种：主分片，每个文档属于且只属于一个主分片，数量在建索引时定死；副本分片，是主分片的拷贝，提供冗余并分担读流量。写入的文档先进内存缓冲区，默认每秒 refresh 一次落成新的段（segment）后才可搜索——这就是官方说的[近实时](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search)：从写入到可查的延迟通常在 1 秒级。查询并行打在所有相关分片上再合并结果，加节点、让分片迁过去，容量和吞吐随之摊平。

#### 按日期滚动：data stream 与 rollover

日志是只增不改的时间序列，Elasticsearch 为此提供 [data stream](https://www.elastic.co/docs/manage-data/data-store/data-streams)：一组后备索引之上的单一命名资源。写入只进当前最新的后备索引（write index），读请求自动路由到所有后备索引。rollover 按年龄或大小触发，生成新后备索引接替写入，命名形如 `.ds-<data-stream>-<yyyy.MM.dd>-<序号>`。查询侧永远对着 data stream 一个名字查，管理侧靠 ILM 自动 rollover 和清理，"日志留存 180 天"就是一条策略配置，不用手写 cron 删索引。

### Logstash：input / filter / output 三段管道

原始日志千奇百怪，直接进库只能靠全文搜。Logstash 的处理模型是固定三段，[官方文档](https://www.elastic.co/guide/en/logstash/current/pipeline.html)的概括是 "inputs generate events, filters modify them, and outputs ship them elsewhere"。安全场景里一条典型的认证日志管道：

```ruby
input {
  beats {
    port => 5044            # 收 Filebeat / Winlogbeat 发来的事件
  }
}

filter {
  grok {
    match => { "message" => "%{SYSLOGTIMESTAMP:log_time} %{SYSLOGHOST:host} %{SYSLOGPROG}: %{WORD:result} password for (invalid user )?%{USERNAME:account} from %{IP:src_ip} port %{NUMBER:src_port:int} ssh2" }
  }
  date {
    match => [ "log_time", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]   # 用日志时间覆盖 @timestamp
  }
}

output {
  elasticsearch {
    hosts => ["https://es-node:9200"]
    index => "security-auth-%{+YYYY.MM.dd}"   # 按天落到不同索引
  }
}
```

拿这条真实形态的 sshd 日志对一下：

```text
Oct 25 03:12:44 bastion sshd[21871]: Failed password for invalid user admin from 203.0.113.7 port 51122 ssh2
```

[grok 插件](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html)的写法是 `%{模式名:字段名}`：`SYSLOGTIMESTAMP` 吃掉开头时间，`SYSLOGHOST` 取主机名，`SYSLOGPROG` 匹配进程名和方括号里的 PID（自动拆出 `program=sshd`、`pid=21871`），后面 `WORD`、`USERNAME`、`IP`、`NUMBER` 依次取出结果、账号、源 IP、端口，`src_port:int` 顺手把端口转成整数。一行非结构化文本就此变成可聚合的结构化事件，"过去一小时各源 IP 的失败登录次数"这种统计才有了字段基础。grok 内置约 120 个常用模式，匹配不上时可以自定义模式，或在 Kibana 的 Grok Debugger 里逐段调试。filter 段还能串别的插件：mutate 改字段、geoip 给源 IP 补地理位置、drop 丢掉 debug 级噪音。解析放在入库前做，查询时的字段才整齐，后续的聚合、仪表盘、检测规则才有地基。

### ILM：让索引自己走完一生

日志索引有天然的冷热规律：头几天应急排查天天查，之后就很少有人碰。[ILM](https://www.elastic.co/docs/manage-data/lifecycle/index-lifecycle-management/index-lifecycle)（Index Lifecycle Management）把索引的一生定义成五个阶段：

| 阶段 | 官方定义 |
|------|----------|
| Hot | 正在写入、正在查询 |
| Warm | 基本不再写入，仍在被查询 |
| Cold | 很少写也很少查，可查，但查询慢一点没关系 |
| Frozen | 不再更新、极少查询，查询非常慢也能接受 |
| Delete | 不再需要，可以安全删除 |

策略绑在索引模板上，索引 rollover 后自动从 hot 起步，按年龄往下流转。配合[数据分层](https://www.elastic.co/docs/manage-data/lifecycle/data-tiers)，hot 阶段放在快存储节点上扛写入和实时查询，warm、cold 阶段迁到便宜节点，delete 阶段到期清掉。安全日志的典型配法：hot 留 7 天覆盖应急排查高频期，warm 留 30 天，cold 撑到 180 天对齐留存合规，到期 delete。整个过程不需要人盯。

### Beats：按数据类型分家的采集器

Elastic 官方维护的 Beat 有六个，各管一类数据（见 [Beats 参考文档](https://www.elastic.co/guide/en/beats/libbeat/current/beats-reference.html)）：

| Beat | 采集对象 |
|------|----------|
| Filebeat | 日志文件和 journal |
| Winlogbeat | Windows 事件日志 |
| Metricbeat | 系统与服务指标 |
| Packetbeat | 网络流量 |
| Auditbeat | Linux 审计数据 |
| Heartbeat | 可用性探测 |

它们共享同一个底层库 libbeat（Go 编写），部署形态是每台主机一个小进程，都能直连 Elasticsearch，也可以先发给 Logstash 做解析富化。安全采集的主力是前两个：Filebeat 自带常见安全设备和服务的解析模块；Winlogbeat 配 Sysmon 能把进程创建、网络连接、注册表改动统一收上来，是 Windows 域环境做入侵检测的常见组合。

### 许可证变迁，如实捋一遍

这套栈的许可证这几年变过两次，选型和合规评估绕不开：

- **2021 年前**：Elasticsearch 和 Kibana 源码采用 Apache 2.0 许可证
- **2021 年 1 月**：Elastic 把二者改为 Elastic License v2 与 SSPL 双许可，导火索是与 AWS 的托管服务争议；AWS 随后基于最后一个 Apache 2.0 版本 fork 出 OpenSearch
- **Elastic License v2 的三条限制**：不得把软件以托管或代管服务的形式提供给第三方；不得移除或绕过 license key 相关功能；不得抹除版权和许可声明
- **2024 年 8 月 29 日**：Elastic 官方博客宣布在 ELv2 和 SSPL 之外新增 AGPL 作为第三种许可选项，AGPL 是 OSI 认可的开源许可证，Elasticsearch 和 Kibana 由此重新可以被称为开源软件，用户在三种许可证中任选其一

对企业内部安全团队，自建自用基本不受这些条款约束；要拿它做成对外提供的 SaaS 或商业产品，才需要逐条读许可证文本。

## 和 Wazuh 的关系：把这条栈封装成安全产品

开源安全平台 Wazuh 是看清这条栈价值的最好例子。3.x 时代的 [Wazuh 安装文档](https://documentation.wazuh.com/3.13/installation-guide/installing-elastic-stack/index.html)写得直白：装一套由 Filebeat、Elasticsearch、Kibana 组成的 Elastic Stack，再把 Wazuh 应用以 Kibana 插件的形式装进去。那时的 Wazuh 就是"Elastic Stack 加安全检测引擎"。

现在的 Wazuh 把栈里的组件换成了自己的发行。按[官方组件文档](https://documentation.wazuh.com/current/getting-started/components/index.html)，核心组件是四件套：Wazuh agent、Wazuh server、Wazuh indexer、Wazuh dashboard。Wazuh indexer 是全文检索与分析引擎（[4.8.0 发行说明](https://documentation.wazuh.com/current/release-notes/release-4-8-0.html)写明它升级到 OpenSearch 2.10.0，dashboard 升级到 OpenSearch Dashboards 2.10.0——正是上一节许可证分叉的下游后果）；Wazuh dashboard 对应 Kibana 的可视化角色；Wazuh server 做实时检测分析，产出告警后由内置的 Filebeat 经 TLS 发给 indexer 的 9200 端口，dashboard 再查 indexer 出图（链路细节见[架构文档](https://documentation.wazuh.com/current/getting-started/architecture.html)）。

链路还是那条链路，只是每一环都换成了面向安全场景封装好的形态：检测规则、MITRE ATT&CK 映射、合规报表全成了出厂配置。在 Wazuh 的界面上看到 9200 端口、按天滚动的告警索引、Filebeat 进程，看到的就是这套栈在一个成品安全平台里的样子。

## 典型应用场景

1. **安全日志集中化**：把主机、网络设备、应用的日志统一收进 Elasticsearch，应急响应时一处检索代替逐机登录
2. **自建 SIEM 底座**：日志管道搭好后，在 Kibana 里配检测规则做告警，或直接用官方的 Elastic Security 方案
3. **Windows 域环境监控**：Winlogbeat 收 Sysmon 事件，做进程链分析、横向移动检测
4. **入侵溯源**：攻击路径还原依赖跨主机的日志关联，集中存储加时间线检索正好对口
5. **合规留存**：等保对日志留存周期有明确要求，索引按天滚动、按策略归档，比散落在各机的本地文件好管得多

## 学习资源

- **产品官网**：[elastic.co/elastic-stack](https://www.elastic.co/elastic-stack)（组件全景和官方定位）
- **Elasticsearch 文档**：[elastic.co/guide/en/elasticsearch/reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)（索引、查询、集群管理的权威手册）
- **全文检索原理**：[elastic.co/docs/solutions/search/full-text/how-full-text-works](https://www.elastic.co/docs/solutions/search/full-text/how-full-text-works)（倒排索引与 BM25 打分）
- **索引与分片**：[elastic.co/docs/manage-data/data-store/index-basics](https://www.elastic.co/docs/manage-data/data-store/index-basics)、[近实时搜索](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search)
- **data stream 与滚动**：[elastic.co/docs/manage-data/data-store/data-streams](https://www.elastic.co/docs/manage-data/data-store/data-streams)
- **ILM 阶段定义**：[elastic.co/docs/manage-data/lifecycle/index-lifecycle-management/index-lifecycle](https://www.elastic.co/docs/manage-data/lifecycle/index-lifecycle-management/index-lifecycle)、[数据分层](https://www.elastic.co/docs/manage-data/lifecycle/data-tiers)
- **Logstash 文档**：[elastic.co/guide/en/logstash/current](https://www.elastic.co/guide/en/logstash/current/index.html)（[管道模型](https://www.elastic.co/guide/en/logstash/current/pipeline.html)、[grok 插件](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html)的用法都在这里）
- **Beats 文档**：[elastic.co/guide/en/beats/libbeat/current](https://www.elastic.co/guide/en/beats/libbeat/current/index.html)（Filebeat、Winlogbeat 的配置手册）
- **Kibana 文档**：[elastic.co/guide/en/kibana/current](https://www.elastic.co/guide/en/kibana/current/index.html)
- **Wazuh 文档**：[组件说明](https://documentation.wazuh.com/current/getting-started/components/index.html)、[组件间架构](https://documentation.wazuh.com/current/getting-started/architecture.html)（看这套栈被封装成安全产品后的样子）
- **源码仓库**：[github.com/elastic/elasticsearch](https://github.com/elastic/elasticsearch)、[logstash](https://github.com/elastic/logstash)、[beats](https://github.com/elastic/beats)、[kibana](https://github.com/elastic/kibana)
- **许可证原文**：[elastic.co/licensing/elastic-license](https://www.elastic.co/licensing/elastic-license)（ELv2 全文）
- **AGPL 回归公告**：[Elasticsearch Is Open Source. Again!](https://www.elastic.co/blog/elasticsearch-is-open-source-again)（2024 年 8 月 29 日，创始人 Shay Banon 署名）
