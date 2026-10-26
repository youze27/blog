---
title: EDR逃逸
feed: false      # 从 RSS 订阅中排除
sidebar: false   # 让思维导图铺满整页
category:
  - 思维导图
tag:
  - EDR
---
## 逃逸深度关系
```mermaid
%%{init: {"theme": "base", "flowchart": {"nodeSpacing": 10, "rankSpacing": 20}}}%%
flowchart LR
    L1["文件层 免杀<br/>————<br/>加壳/加密壳<br/>特征码修改<br/>字符串加密<br/>资源节隐藏<br/>签名伪造<br/>白加黑<br/>DLL侧加载<br/>分离加载<br/>代码混淆<br/>控制流平坦化<br/>花指令<br/>API混淆<br/>反沙箱<br/>反虚拟机<br/>反调试<br/>延时执行<br/>睡眠混淆<br/><br/><br/><br/>"]

    L2["行为层<br/>————<br/>Direct Syscall<br/>Indirect Syscall<br/>SSN解析<br/>Hell's Gate<br/>Halo's Gate<br/>NTDLL Unhooking<br/>磁盘副本<br/>PPID伪造<br/>命令行篡改<br/>进程镂空<br/>Fork&Run<br/>Early Bird<br/>Thread Hijacking<br/>APC注入<br/>反射DLL注入<br/>Call Stack Spoofing<br/>Sleep Mask<br/>Module Stomping<br/>父进程伪造<br/>签名进程注入"]

    L3["遥测层<br/>————<br/>ETW Provider<br/>EtwTi<br/>Patch EtwEventWrite<br/>ETW致盲<br/>AMSI绕过<br/>AMSI Patch<br/>AMSI干扰<br/>脚本混淆<br/>PS降级<br/>进程通知规避<br/>线程通知规避<br/>镜像通知规避<br/>对象通知规避<br/>句柄最小化<br/>注册表规避<br/>离线蜂巢修改<br/>Inline Hook<br/>IAT Hook<br/>EAT Hook<br/>微筛选器识别"]

    L4["内核层 Ring0<br/>————<br/>BYOVD<br/>签名漏洞驱动<br/>IOCTL滥用<br/>白名单滥用<br/>终止EDR<br/>内核内存读写<br/>回调移除<br/>隐藏活动<br/>ELAM机制<br/>启动信任链<br/>驱动签名滥用<br/>早期加载<br/>Minifilter<br/>直接存储访问<br/>WFP对抗<br/>NDIS对抗<br/>网络过滤<br/><br/><br/><br/>"]

    L1 --> L2 --> L3 --> L4

    classDef fileLayer fill:#FF6B6B,stroke:#C0392B,color:#fff
    classDef behaviorLayer fill:#4ECDC4,stroke:#16A085,color:#003333
    classDef telemetryLayer fill:#FFD93D,stroke:#F39C12,color:#663300
    classDef kernelLayer fill:#6C5CE7,stroke:#4834D4,color:#fff

    class L1 fileLayer
    class L2 behaviorLayer
    class L3 telemetryLayer
    class L4 kernelLayer
```
- **文件层**：用户态最外层，解决“文件别被认出来”
- **行为层**：用户态运行时，解决“动作别被判定为恶意”
- **遥测层**：横跨用户态与内核态，是 EDR 的“传感器”，解决“别让 EDR 看见”
- **内核层**：Ring 0，解决“直接在驱动层对抗安全产品”


##  EDR逃逸层级
```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((EDR逃逸层级))
    文件层 免杀
      静态特征
        特征码修改
        字符串加密
        资源节隐藏
        签名伪造
        签名窃取
      打包与加载
        加壳
        压缩壳
        加密壳
        分离加载
        Staged Loader
        白加黑
        DLL侧加载
      混淆
        代码混淆
        控制流平坦化
        花指令
        API混淆
      环境对抗
        反沙箱
        反虚拟机
        反调试
        延时执行
        睡眠混淆
    行为层
      系统调用
        Direct Syscall
        Indirect Syscall
        SSN动态解析
        Hell's Gate
        Halo's Gate
        FreshyCalls
      用户态Hook规避
        NTDLL Unhooking
        磁盘干净副本
        Peruns Fart
        Hook Trampoline
      进程行为
        PPID伪造
        命令行篡改
        进程镂空
        Fork&Run
        Early Bird
        Thread Hijacking
        APC注入
      内存行为
        Call Stack Spoofing
        Sleep Mask
        Module Stomping
        反射式DLL注入
        内存加密
      执行链伪装
        合法进程代理
        父进程链伪造
        签名进程注入
    遥测层
      ETW
        ETW Provider
        EtwTi
        Patch EtwEventWrite
        ETW致盲
        Provider干扰
      AMSI
        AmsiScanBuffer
        AMSI Provider
        AMSI Patch
        脚本混淆
        PowerShell降级
      内核回调
        进程创建通知
        线程创建通知
        镜像加载通知
        对象通知
        注册表回调
      用户态Hook
        Inline Hook
        IAT Hook
        EAT Hook
        微筛选器回调
    内核层
      BYOVD
        合法签名漏洞驱动
        IOCTL滥用
        驱动加载
        驱动白名单滥用
      驱动对抗
        终止EDR进程
        内核内存读写
        隐藏活动
        回调移除
      启动与信任
        ELAM
        启动信任链
        驱动签名滥用
        早期加载攻击面
      文件与网络内核
        Minifilter对抗
        WFP对抗
        NDIS对抗
        直接存储访问
```
## 第1章 理解EDR

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((理解EDR))
    架构
      Agent
      Telemetry
      Sensor
      Detection
    检测逻辑
      脆弱检测
      鲁棒检测
      弹性规则
    代理设计
      基础设计
      中级设计
      高级设计
    规避挑战
      恶意活动识别
      上下文考量
      检测规则分析
```

---

## 第2章 函数挂钩DLL

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((函数挂钩DLL))
    Hook类型
      Inline Hook
      IAT Hook
      EAT Hook
    系统调用
      Direct Syscall
      Indirect Syscall
      SSN动态解析
    NTDLL恢复
      NTDLL Unhooking
      磁盘干净副本
      Hell's Gate
      Halo's Gate
      FreshyCalls
    对抗思路
      绕过被挂钩API
      规避用户态监控
```

---

## 第3章 进程与线程创建通知

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((进程线程通知))
    内核回调
      PsSetCreateProcessNotifyRoutine
      PsSetCreateThreadNotifyRoutine
    规避策略
      命令行篡改
      PPID伪造
      进程镜像修改
      进程镂空
      Fork&Run
      Early Bird
      Thread Hijacking
    目标
      切断行为链
      伪装合法父子关系
```

---

## 第4章 对象通知

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((对象通知))
    机制
      ObRegisterCallbacks
      句柄请求监控
    检测目标
      凭据窃取
      LSASS访问
      高权限句柄
    规避策略
      句柄权限最小化
      对象类型识别
      替代路径获取信息
```

---

## 第5章 镜像加载与注册表通知

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((镜像注册表通知))
    机制
      PsSetLoadImageNotifyRoutine
      CmRegisterCallback
    规避策略
      隧道工具
      KAPC注入阻断
      离线蜂巢修改
      注册表回调规避
    目标
      规避DLL加载监控
      规避敏感键修改监控
```

---

## 第6章 文件系统微筛选器驱动

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((文件系统微筛选器))
    机制
      Minifilter驱动
      IRP监控
      文件操作回调
    规避策略
      监控范围识别
      合法操作掩护
      直接存储访问
      RAW磁盘读写
      文件加密分裂
```

---

## 第7章 网络过滤驱动

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((网络过滤驱动))
    机制
      WFP过滤驱动
      NDIS
      网络流量监控
    规避策略
      流量混淆
      合法协议封装
      Domain Fronting
      隐蔽信道
      分片传输
    目标
      规避C2检测
      规避数据外泄检测
```

---

## 第8章 Windows事件追踪ETW

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((ETW))
    机制
      ETW Provider
      事件订阅
      高粒度行为追踪
    高级威胁情报
      EtwTi
      Microsoft-Windows-Threat-Intelligence
    规避策略
      ETW致盲
      Provider干扰
      Patch EtwEventWrite
```

---

## 第9章 扫描器

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((扫描器))
    检测方式
      静态签名
      启发式
      内存扫描
    规避策略
      签名绕过
      加密编码分裂
      Call Stack Spoofing
      Sleep Mask
      Module Stomping
```

---

## 第10章 反恶意软件扫描接口AMSI

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((AMSI))
    机制
      AmsiScanBuffer
      AMSI Provider
      脚本运行时扫描
    规避策略
      AMSI Patch
      AmsiScanBuffer绕过
      脚本混淆
      反射式DLL注入
      PowerShell降级
```

---

## 第11章 早期启动反恶意软件驱动ELAM

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((ELAM))
    机制
      ELAM驱动加载
      启动信任链
      早期保护
    规避策略
      加载机制分析
      启动攻击面
      签名信任滥用
      BYOVD
```

---

## 第12章 Microsoft Windows威胁情报

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((Windows威胁情报))
    数据来源
      MDE
      Defender for Endpoint
      事件关联
    规避策略
      事件来源分析
      信噪比降低
      情报盲区
      TTP覆盖缺口
```

---

## 第13章 综合案例

```mermaid
%%{init: {"theme": "base"}}%%
mindmap
  root((综合案例))
    方法论
      检测感知
      攻击链整合
    阶段
      侦察
      横向移动
      规避技术组合
    目标
      完整攻击链验证
```
