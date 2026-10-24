---
title: Elkeid：字节跳动开源的主机安全平台
index: true
isOriginal: true
date: 2026-10-25
category:
  - 主机安全
tag:
  - Elkeid
  - HIDS
  - CWPP
  - RASP
---

# Elkeid 是什么

选主机安全产品时会遇到一个现实问题：物理机、虚拟机、Docker 容器、K8s 集群往往同时存在，传统 HIDS 只覆盖主机这一层，容器里的进程行为基本是盲区。Elkeid 是字节跳动开源的云工作负载保护平台（CWPP），官方定位是一套同时覆盖**主机、容器与容器集群、Serverless** 的反入侵方案，来源于字节内部多年实战部署的版本。

它在 GitHub 上开源，与字节内部使用的版本共享端上能力，也是知道创宇 404 星链计划的项目之一。

## 理解 Elkeid

```mermaid
flowchart LR
    A[数据采集层<br>Agent + Driver + RASP] --> B[接入与管理层<br>AgentCenter / Manager]
    B --> C[检测与展示层<br>HUB 规则引擎 / Console]
```

- **采集层**回答"机器上发生了什么"：内核态抓进程、网络、文件行为，RASP 探针看业务运行时内部
- **接入层**回答"成千上万个 Agent 怎么管"：通信、升级、配置、任务下发
- **检测层**回答"这些数据里哪些是攻击"：规则引擎跑策略，控制台展示告警

三者可以拆开用。不少团队只要它的采集层，拿回数据喂给自己的检测系统。

## 核心能力

### 内核态数据采集（Elkeid Driver）

[Elkeid Driver](https://github.com/bytedance/Elkeid/blob/main/driver/README-zh_CN.md) 的实现方式是用 Kprobe 挂钩内核函数，在事件发生的现场直接取数，而不是走用户态轮询。挂钩点按数据类型编号，每个点有独立的默认开关，摘几个常用的：

| Hook 点 | 数据类型 | 默认状态 | 能看到什么 |
|---------|----------|----------|-----------|
| execve | 59 | ON | 进程执行：argv、运行路径、pid_tree、tty，还从进程 fd 和环境变量里取 socket 五元组、SSH 连接信息、LD_PRELOAD |
| connect / bind | 42 / 49 | ON | 网络外连与监听 |
| dns query | 601 | ON | DNS 请求与响应码 |
| create_file | 602 | ON | 文件创建 |
| load_module | 603 | ON | 内核模块加载 |
| update_cred | 604 | ON | 权限变更（仅 old uid 非 0 且 new uid 为 0，即提权瞬间） |
| privilege_escalation | 611 | ON | 提权行为，带父子进程 cred 对比 |
| write / open | 1 / 2 | OFF | 高频调用默认关，需要时再开 |

性能敏感的 Hook 默认关闭、安全价值高的默认开，这个取舍本身就是一份可参考的采集策略。驱动还带白名单过滤（exe 和 argv 两种，容量各 64 条），通过 `/dev/hids_driver_allowlist` 设备文件读写，用来压掉已知正常的噪音数据。

**容器可见性**来自对 Linux Namespace 的支持：驱动在内核态拿到的是真实的 namespace 信息，输出里的 nodename 字段在宿主机上是 hostname，在 Docker 里是容器名，在 K8s 里是 Pod 名。所以一套宿主机部署就能区分行为发生在哪个容器，不用 per-container 装东西。

另外驱动内置了针对内核级 Rootkit 的对抗检测，四类默认全开：syscall table hook、interrupt table hook、proc file hook、隐藏内核模块。这正好补了用户态采集被内核级 Rootkit 欺骗的短板。

工程上的两个细节：

- 内核模块与内核版本强绑定，官方在 release 里预置了 3400 多个预编译 ko 文件覆盖主流发行版，也支持 DKMS 或自行编译，兼容内核 2.6.32 到 6.3，含 ARM64
- 官方用 LTP 压测过关键 Hook 的耗时，execve 处理函数平均延迟约 15 微秒量级，原始数据在 driver 目录的 benchmark 里

采集到的数据字段很全，官方专门维护了一份 [数据说明文档](https://github.com/bytedance/Elkeid/blob/main/server/docs/ElkeidData.xlsx)，做二次开发时基本靠它。

### RASP 运行时防护

传统 Agent 看不到进程内部，比如 Java 应用收到一个恶意反序列化请求，网络层只能看到流量。[Elkeid RASP](https://github.com/bytedance/Elkeid/tree/main/rasp) 直接注入到运行时里，支持 JVM、CPython、Golang、NodeJS、PHP，且支持**动态 Attach**——业务不用重启，运维也不用再装一个独立 Agent。

动态注入的链路分两段。端上的 RASP Plugin 负责分析系统里进程的运行时类型并上报，收到平台下发的 Attach 指令后执行注入，再回收各探针上报的数据。真正往进程里"打"探针的是注入器 [pangolin](https://github.com/Hackerl/pangolin)，它能把 ELF 文件注入到远程进程，静态链接和动态链接的程序都可以作为目标，注入后以 daemon 线程驻留。

注入进去之后干什么，拿 [Golang 探针](https://github.com/bytedance/Elkeid/blob/main/rasp/golang/README.md)举例最直观：从二进制的 `gopclntab` 段解析 Go 符号表，对关键 API 做 inline hook，把命中的调用参数和堆栈通过 unix socket 传出来，支持 Go 1.2 及以上版本。其他语言探针思路类似，都是挂钩语言运行时里的敏感函数入口。想手动验证单进程注入，可以直接跑 `elkeid_rasp -p <pid>`。

### K8s 安全

支持接入 K8s Audit Log，对集群层面的操作（谁建了什么 Pod、谁进了哪个容器）做入侵检测和风险识别，和主机侧数据互补。

### 策略引擎 Elkeid HUB

独立的[规则引擎项目](https://github.com/bytedance/Elkeid-HUB)，社区版附带少量示例策略。它的定位接近"安全版的数据流处理引擎"，可以和外部系统对接联动。需要注意：社区版只给了引擎和样例，**完整的检测策略要自己写**——这是使用 Elkeid 最大的工作量所在。

数据从 Agent 流到告警的完整链路：

```mermaid
flowchart LR
    A[Agent / Driver / RASP] --> B[AgentCenter]
    B --> C[(Kafka<br>原始数据 topic)]
    C --> D[HUB INPUT]
    D --> E[RULESET 链<br>detect / filter / push]
    E --> F[HUB OUTPUT<br>Kafka / ES]
    F --> G[Console 告警 / Kibana]
```

- AgentCenter 把端上数据写进 Kafka，HUB 的 INPUT 从 Kafka 消费——社区版输入只支持 Kafka，输出支持 Kafka 和 ES
- 检测逻辑写在 RuleSet 里，用 XML 描述，分 **rule** 和 **whitelist** 两类：rule 命中后继续向后传递（相当于检出），whitelist 命中后不再传递（相当于过滤）。一个 RuleSet 里多条 rule 之间是"或"的关系
- 数据按 SMITH_DSL 描述的顺序流过各级 RuleSet。官方示例的 HIDS 告警流是 `hids_detect` → `hids_filter` → `push_hids_alert`，最后一级把告警推到 Console
- RuleSet 之外可以挂 Python 插件，做告警推送（如发飞书）这类规则本身不擅长的动作

按官方公布的字节内部实践数据，HUB 处理 HIDS/RASP/沙箱/K8s 审计等原始数据，TPS 在 1.2 亿条/秒以上，调度实例 6000+。但社区版有硬限制：只做流式处理，离线数据处理、持久化、集群模式、在线升级策略都不在内，部署上 HUB 和 HUB Leader 也只能单机。写策略的具体语法见 [HUB 快速上手教程](https://github.com/bytedance/Elkeid-HUB/blob/main/docs/quick_start/quick_start_zh-CN.md)。

### 端上插件体系

Agent 本身是个用户态管理进程，具体能力由插件提供：

| 插件 | 作用 |
|------|------|
| Driver Plugin | 对接内核驱动，处理上报数据 |
| Collector | 资产采集：用户、定时任务、软件包等 |
| Scanner | 静态恶意文件扫描，支持 Yara 规则 |
| Baseline | 基线风险检查 |
| Journal Watcher | 监控 systemd 日志，目前主要采 SSH 相关日志 |
| RASP Plugin | 管理探针注入与数据回收 |

## 社区版和企业版差在哪

这是选型前必须搞清楚的事。官方 README 里有完整对照表，挑重点：

| 能力 | 社区版 | 企业版 |
|------|--------|--------|
| Linux 数据采集 / RASP 探针 / K8s 审计接入 | √ | √ |
| Agent 控制面、资产采集、告警白名单 | √ | √ |
| 基础入侵检测 | 少量样例策略 | √ |
| 行为序列入侵检测、告警溯源 | × | √ |
| 威胁处置（进程/网络/文件） | × | √ |
| 漏洞检测 | 少量情报 | √ |
| Windows 支持 | × | √ |

简单说：**社区版给的是采集底座和引擎，检测能力要自己建**。如果团队没有安全运营和策略编写能力，直接用社区版做告警会发现"装上了但没东西报"。

## 部署资源要求

官方用 [elkeidup](https://github.com/bytedance/Elkeid/tree/main/elkeidup) 一键拉起后端，约束比多数开源安全产品严格，先看能不能接受再动手：

- 后端服务器要**仅供 Elkeid 使用**，机器间内网互通，只支持内网部署（用局域网 IP，不能用 127.0.0.1 或公网 IP）
- 部署时需要 root 权限，执行 elkeidup 的机器要能 root 免密 SSH 到所有后端服务器
- 操作系统限 CentOS 7+、Ubuntu 16+、Debian 9+

后端组件多，按官方[资源配置手册](https://github.com/bytedance/Elkeid/blob/main/elkeidup/configuration-zh_CN.md)，测试环境可以全部单机，生产环境的建议形态是：

| 组件 | 角色 | 测试最小配额 | 生产建议 |
|------|------|--------------|----------|
| Agent Center | HIDS 接入层，对 Agent 通信 | 1C2G | 按 Agent 量扩，单个 AC 的 gRPC 连接上限 1500 |
| Manager | HIDS 控制层 | 2C4G | 两至三台 |
| Kafka | 消息通道 | 2C4G | 三台，按 Agent 量算 |
| MongoDB | 数据库 | 2C4G | 三台副本集 |
| Redis | 缓存 | 1C2G | 三台哨兵 |
| HUB / HUB Leader | 规则引擎及控制层 | 2C4G / 1C2G | 社区版仅支持单机，这点直接决定社区版能扛多大规模 |
| Nginx | 文件服务器与反向代理 | 1C2G | 单台或多台，下载量大的建议接内部 CDN |

配额最终会转成 cgroup 限制。另有 Prometheus、Grafana、Kibana、Service Discovery 等配套组件，单机测试时可以全部指向同一台机器。

## 典型应用场景

1. **自建 HIDS**：直接用全套社区版 + 自己写 HUB 策略，适合有安全团队的甲方
2. **安全数据采集底座**：只要 Driver + Agent，数据接进自己的 Kafka/SIEM，在上面做自己的检测逻辑。官方有专门的[数据接入手册](https://github.com/bytedance/Elkeid/blob/main/elkeidup/raw_data_usage_tutorial/raw_data_usage_tutorial-zh_CN.md)
3. **容器/云原生环境反入侵**：宿主机部署一套覆盖所有容器，比 per-container 方案省事
4. **业务运行时防护**：RASP 动态注入，适合没法改代码、没法重启的在运业务
5. **学习与研究**：内核采集、RASP 注入、规则引擎的实现都开源，是学习主机安全工程化的好材料

## 学习资源

- **项目主仓库**：[github.com/bytedance/Elkeid](https://github.com/bytedance/Elkeid)（README 有中英双语，含架构图和功能对照表）
- **官方文档站**：[elkeid.bytedance.com/Chinese](https://elkeid.bytedance.com/Chinese/)（部署、配置、使用的权威入口）
- **Driver 原理**：[driver/README-zh_CN.md](https://github.com/bytedance/Elkeid/blob/main/driver/README-zh_CN.md)（完整 Hook 清单、数据协议、白名单接口、性能压测原始数据）
- **RASP 探针**：[rasp 目录](https://github.com/bytedance/Elkeid/tree/main/rasp)（各语言探针源码，注入器见 [pangolin](https://github.com/Hackerl/pangolin)）
- **快速部署**：[elkeidup 部署工具](https://github.com/bytedance/Elkeid/tree/main/elkeidup)，一条命令拉起完整后端；规划资源先看[资源配置手册](https://github.com/bytedance/Elkeid/blob/main/elkeidup/configuration-zh_CN.md)
- **规则引擎**：[github.com/bytedance/Elkeid-HUB](https://github.com/bytedance/Elkeid-HUB)，写策略从[快速上手教程](https://github.com/bytedance/Elkeid-HUB/blob/main/docs/quick_start/quick_start_zh-CN.md)开始
- **控制台手册**：[Elkeid Console 使用指南](https://github.com/bytedance/Elkeid/blob/main/server/docs/console_tutorial/Elkeid_Console_manual.md)
