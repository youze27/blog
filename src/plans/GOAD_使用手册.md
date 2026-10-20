# GOAD 靶场环境使用手册

> **Game of Active Directory** — 由 Orange Cyber Defense 开发的 Active Directory 渗透测试实验环境
>
> 文档版本: 2026-08-02 | 部署方式: VMware Workstation Pro + Vagrant

---

## 目录

1. [环境概览](#1-环境概览)
2. [虚拟机清单](#2-虚拟机清单)
3. [域结构与信任关系](#3-域结构与信任关系)
4. [服务部署详情](#4-服务部署详情)
5. [关键用户账户与凭据](#5-关键用户账户与凭据)
6. [攻击路径与漏洞场景](#6-攻击路径与漏洞场景)
7. [ADCS 证书服务漏洞](#7-adcs-证书服务漏洞)
8. [MSSQL 配置与攻击链](#8-mssql-配置与攻击链)
9. [日常使用指南](#9-日常使用指南)
10. [网络与连接方式](#10-网络与连接方式)
11. [故障排查](#11-故障排查)
12. [参考资源](#12-参考资源)

---

## 1. 环境概览

| 项目 | 说明 |
|------|------|
| 名称 | GOAD (Game Of Active Directory) |
| 用途 | AD 渗透测试练习（漏洞复现、攻击路径演练） |
| 虚拟化平台 | VMware Workstation Pro v26 |
| 管理工具 | Vagrant 2.4.9 + vagrant-vmware-desktop |
| 自动化部署 | Ansible (通过 PROVISIONING VM) |
| 网络模式 | VMnet1 Host-Only (192.168.56.0/24) |
| 总资源需求 | ~22GB RAM, 12 vCPU |
| 仓库路径 | `C:\Users\youze\WorkBuddy\2026-07-09-13-56-50\GOAD\` |

### 实验室包含

- **2 个林 (Forest)**: sevenkingdoms.local + essos.local
- **3 个域**: sevenkingdoms.local, north.sevenkingdoms.local (子域), essos.local
- **5 台域机器**: 3× DC + 2× 成员服务器
- **1 台 Ansible 控制器**: PROVISIONING (Ubuntu, 不加入域)
- **30+ 个域用户**, 涵盖 AS-REP Roasting、Kerberoasting、ACL 滥用、ADCS 漏洞等攻击场景

---

## 2. 虚拟机清单

### 2.1 总览表

| VM 名称 | 主机名 | IP 地址 | 操作系统 | CPU | RAM | 域 | 角色 |
|---------|--------|---------|----------|-----|-----|-----|------|
| GOAD-DC01 | kingslanding | 192.168.56.10 | Win Server 2019 | 2 | 3GB | sevenkingdoms.local | 父域 DC |
| GOAD-DC02 | winterfell | 192.168.56.11 | Win Server 2019 | 2 | 3GB | north.sevenkingdoms.local | 子域 DC |
| GOAD-DC03 | meereen | 192.168.56.12 | Win Server 2016 | 2 | 3GB | essos.local | 林2 DC |
| GOAD-SRV02 | castelblack | 192.168.56.22 | Win Server 2019 | 2 | 6GB | north.sevenkingdoms.local | 成员服务器 |
| GOAD-SRV03 | braavos | 192.168.56.23 | Win Server 2016 | 2 | 5GB | essos.local | 成员服务器 |
| PROVISIONING | — | 192.168.56.3 | Ubuntu 22.04 | 2 | 2GB | — (独立) | Ansible 控制器 |

### 2.2 VM 文件路径

所有 VM 由 Vagrant 管理，文件位于：

```
GOAD\workspace\4421a0-goad-vmware\provider\.vagrant\machines\
├── GOAD-DC01\vmware_desktop\<UUID>\WindowsServer2019.vmx
├── GOAD-DC02\vmware_desktop\<UUID>\WindowsServer2019.vmx
├── GOAD-DC03\vmware_desktop\<UUID>\WindowsServer2016.vmx
├── GOAD-SRV02\vmware_desktop\<UUID>\WindowsServer2019.vmx
├── GOAD-SRV03\vmware_desktop\<UUID>\WindowsServer2016.vmx
└── PROVISIONING\vmware_desktop\<UUID>\ubuntu-22.04-amd64.vmx
```

### 2.3 安全配置

| VM | Windows Defender | 防火墙 | 其他安全设置 |
|----|-----------------|--------|-------------|
| DC01 (kingslanding) | ✅ 启用 | ❌ 禁用 | renly.baratheon 标记为敏感账户 |
| DC02 (winterfell) | ✅ 启用 | ❌ 禁用 | LLMNR + NBT-NS 启用 |
| DC03 (meereen) | ✅ 启用 | ❌ 禁用 | NTLM 降级 |
| SRV02 (castelblack) | ❌ 禁用 | ❌ 禁用 | — |
| SRV03 (braavos) | ✅ 启用 | ❌ 禁用 | 受保护进程 (PPL) |

### 2.4 更新策略

| VM | Windows Update |
|----|---------------|
| DC01, DC02, DC03, SRV03 | ❌ 不更新 |
| SRV02 (castelblack) | ✅ 允许更新 |

---

## 3. 域结构与信任关系

### 3.1 域拓扑图

```
┌─────────────────────────────────────────────────────────┐
│                    Forest 1                              │
│                  sevenkingdoms.local                      │
│                                                           │
│  ┌─────────────────────┐    ┌──────────────────────┐    │
│  │  sevenkingdoms.local │    │ north.sevenkingdoms   │    │
│  │  (父域)              │◄──►│ .local (子域)         │    │
│  │  DC: kingslanding    │    │ DC: winterfell        │    │
│  │  (DC01)              │    │ (DC02)                │    │
│  │  192.168.56.10       │    │ 192.168.56.11         │    │
│  └─────────────────────┘    └──────────────────────┘    │
│           │                        │                     │
│           │     SRV02: castelblack  │                     │
│           │     192.168.56.22       │                     │
│           │     (north 域成员)       │                     │
└───────────┼────────────────────────┼─────────────────────┘
            │                        │
            │  ← 双向外部信任 →       │
            │  (SID History 启用)     │
            │                        │
┌───────────┼────────────────────────┼─────────────────────┐
│           ▼           Forest 2     ▼                      │
│                    essos.local                            │
│  ┌──────────────────────────┐                             │
│  │  essos.local              │                             │
│  │  DC: meereen (DC03)       │                             │
│  │  192.168.56.12            │                             │
│  │                           │                             │
│  │  SRV03: braavos           │                             │
│  │  192.168.56.23            │                             │
│  │  (essos 域成员)            │                             │
│  └──────────────────────────┘                             │
└───────────────────────────────────────────────────────────┘
```

### 3.2 域凭据

| 域 | FQDN | NetBIOS | 域管理员密码 | DC 机器名 |
|----|------|---------|-------------|-----------|
| 七大王国 | sevenkingdoms.local | SEVENKINGDOMS | `8dCT-DJjgScp` | kingslanding (DC01) |
| 北境 | north.sevenkingdoms.local | NORTH | `NgtI75cKV+Pu` | winterfell (DC02) |
| 厄斯索斯 | essos.local | ESSOS | `Ufe-bVXSx9rk` | meereen (DC03) |

> 域管理员用户名统一为 `administrator`

### 3.3 信任关系

| 关系 | 类型 | 特殊配置 |
|------|------|----------|
| sevenkingdoms.local ↔ north.sevenkingdoms.local | 父子域 (同林) | 自动建立 |
| sevenkingdoms.local ↔ essos.local | 双向外部信任 | **SID History 启用** (`/enablesidhistory:yes`) |

### 3.4 跨域组

| 组名 | 所在域 | 成员 | 意义 |
|------|--------|------|------|
| AcrossTheNarrowSea | sevenkingdoms.local | essos\daenerys.targaryen | 跨林访问 |
| AcrossTheSea | north.sevenkingdoms.local | (跨林组) | 跨林访问 |
| DragonsFriends | essos.local | sevenkingdoms\tyron.lannister, essos\daenerys.targaryen | 跨林协作 |
| Spys | essos.local | sevenkingdoms\Small Council | 间谍组, 可读 LAPS |

---

## 4. 服务部署详情

### 4.1 服务分布矩阵

| 服务 | DC01 (kingslanding) | DC02 (winterfell) | DC03 (meereen) | SRV02 (castelblack) | SRV03 (braavos) |
|------|:---:|:---:|:---:|:---:|:---:|
| AD DS (域控) | ✅ | ✅ | ✅ | — | — |
| DNS | ✅ | ✅ | ✅ | — | — |
| ADCS (证书服务) | ✅ | — | ✅ (自定义模板) | — | ✅ |
| IIS (Web) | — | — | — | ✅ (ASP上传) | — |
| MSSQL | — | — | — | ✅ (+SSMS) | ✅ |
| WebDAV | — | — | — | ✅ | ✅ |
| LAPS | — | — | ✅ (DC端) | — | ✅ (服务端) |

### 4.2 IIS 配置 (SRV02 - castelblack)

- 网站: 默认网站, 端口 80
- ASP 上传目录: `C:\inetpub\wwwroot\upload`
- 上传权限: `IIS_IUSRS` 组有 **FullControl**
- 应用程序池身份: `NT Authority\Network`

### 4.3 WebDAV 配置

| VM | 共享路径 | 说明 |
|----|----------|------|
| SRV02 (castelblack) | WebDAV 共享 | north.sevenkingdoms.local |
| SRV03 (braavos) | WebDAV 共享 | essos.local |

### 4.4 LAPS 配置

| VM | LAPS 状态 | 说明 |
|----|-----------|------|
| DC03 (meereen) | ✅ DC 端 | essos.local 的 LAPS 管理 |
| SRV03 (braavos) | ✅ 服务端 | `use_laps = true` |
| SRV02 (castelblack) | ❌ 未启用 | `use_laps = false` |

**LAPS 读取者** (essos.local): `jorah.mormont`, `Spys` 组

---

## 5. 关键用户账户与凭据

### 5.1 sevenkingdoms.local 域用户

| 用户名 | 密码 | 所属组 | 攻击场景 |
|--------|------|--------|----------|
| tywin.lannister | `powerkingftw135` | Lannister | 可强制更改 jaime 密码; SYSVOL 加密密码 |
| jaime.lannister | `cersei` | Lannister | 对 joffrey 有 GenericWrite |
| cersei.lannister | `il0vejaime` | Lannister, Baratheon, **Domain Admins**, Small Council | **域管理员** |
| tyron.lannister | `Alc00L&S3x` | Lannister | 可自添加到 Small Council 组 |
| robert.baratheon | `iamthekingoftheworld` | Baratheon, **Domain Admins**, Protected Users | **域管理员**, 受保护用户 |
| joffrey.baratheon | `1killerlion` | Baratheon, Lannister | 对 tyron 有 WriteDacl |
| renly.baratheon | `lorastyrell` | Baratheon, Small Council | 对 Crownlands OU 有 WriteDacl; 敏感账户 |
| stannis.baratheon | `Drag0nst0ne` | Baratheon, Small Council | 对 kingslanding$ 有 GenericAll |
| petyer.baelish | `@littlefinger@` | Small Council | — |
| lord.varys | `_W1sper_$` | Small Council | 对 Domain Admins 和 AdminSDHolder 有 GenericAll |
| maester.pycelle | `MaesterOfMaesters` | Small Council | — |

### 5.2 north.sevenkingdoms.local 域用户

| 用户名 | 密码 | 所属组 | 攻击场景 |
|--------|------|--------|----------|
| arya.stark | `Needle` | Stark | MSSQL Execute as User → dbo |
| eddard.stark | `FightP3aceAndHonor!` | Stark, **Domain Admins** | **域管理员**; NTLM Relay Bot (5分钟) |
| catelyn.stark | `robbsansabradonaryarickon` | Stark | — |
| robb.stark | `sexywolfy` | Stark | Responder LLMNR Bot (3分钟); 自动登录凭据; RDP Bot |
| sansa.stark | `345ertdfg` | Stark | 非约束委派; SPN: HTTP/eyrie |
| brandon.stark | `iseedeadpeople` | Stark | **AS-REP Roasting** (不需要预认证) |
| rickon.stark | `Winter2022` | Stark | 密码喷涂 WinterYYYY |
| jon.snow | `iknownothing` | Stark, Night Watch | MSSQL 管理员; **Kerberoasting**; SPN: HTTP/thewall; 约束委派 |
| hodor | `hodor` | Stark | 密码喷涂 (用户名=密码) |
| samwell.tarly | `Heartsbane` | Night Watch | LDAP 描述中密码; MSSQL Execute as Login → sa; GPO 滥用 |
| jeor.mormont | `_L0ngCl@w_` | Night Watch, Mormont | castelblack 管理员; SYSVOL 脚本中密码 |
| sql_svc | `YouWillNotKerberoast1ngMeeeeee` | — | SQL 服务账户; SPN: MSSQLSvc/castelblack |

### 5.3 essos.local 域用户

| 用户名 | 密码 | 所属组 | 攻击场景 |
|--------|------|--------|----------|
| daenerys.targaryen | `BurnThemAll!` | Targaryen, **Domain Admins** | **域管理员** |
| viserys.targaryen | `GoldCrown` | Targaryen | CA 管理员 (ESC7); 对 jorah 有 WriteProperty |
| khal.drogo | `horse` | Dothraki | MSSQL 管理员; 对 viserys 有 GenericAll (Shadow Credentials); 对 ESC4 模板有 GenericAll |
| jorah.mormont | `H0nnor!` | Targaryen | MSSQL Execute as Login → sa; 读取 LAPS 密码 |
| missandei | `fr3edom` | — | **AS-REP Roasting**; 对 khal 有 GenericAll; 对 viserys 有 GenericWrite |
| sql_svc | `YouWillNotKerberoast1ngMeeeeee` | — | SQL 服务账户; SPN: MSSQLSvc/braavos |

### 5.4 gMSA 账户

| 账户 | 域 | SPN | 关键权限 |
|------|-----|-----|----------|
| gmsaDragon$ | essos.local | HTTP/braavos, HTTP/braavos.essos.local | 对 drogon 有 GenericAll |

### 5.5 本地凭据

| VM | 账户 | 密码 | 说明 |
|----|------|------|------|
| 所有 Windows VM | vagrant | `vagrant` | Vagrant 默认本地管理员 |
| 所有域 DC | administrator | 见 [3.2 域凭据](#32-域凭据) | 域管理员 |
| SRV02 (castelblack) | (自动登录) | robb.stark / `sexywolfy` | 自动登录凭据 |
| SRV02 (castelblack) | (凭据管理器) | TERMSRV/castelblack: robb.stark / `sexywolfy` | RDP 保存凭据 |

---

## 6. 攻击路径与漏洞场景

### 6.1 ACL 攻击链 — sevenkingdoms.local

```
tywin.lannister ──(强制改密)──→ jaime.lannister ──(GenericWrite)──→ joffrey.baratheon
                                                                         │
                                                                    (WriteDacl)
                                                                         │
                                                                    tyron.lannister
                                                                         │
                                                                (自添加到 Small Council)
                                                                         │
                                                                   Small Council
                                                                         │
                                                              (写入 DragonStone 成员)
                                                                         │
                                                                    DragonStone
                                                                         │
                                                                  (WriteOwner)
                                                                         │
                                                                    KingsGuard
                                                                         │
                                                                  (GenericAll)
                                                                         │
                                                              stannis.baratheon
                                                                         │
                                                                  (GenericAll)
                                                                         │
                                                               kingslanding$ (DC)
```

**另路径:**
- `lord.varys` → Domain Admins (GenericAll)
- `lord.varys` → AdminSDHolder (GenericAll)
- `renly.baratheon` → Crownlands OU (WriteDacl)

### 6.2 ACL 攻击链 — essos.local

```
missandei ──(AS-REP Roasting, 无预认证)
    │
    ├──(GenericAll)──→ khal.drogo ──(GenericAll, Shadow Credentials)──→ viserys.targaryen
    │                        │                                              │
    │                        └──(GenericAll)──→ ESC4 模板                (CA 管理员, ESC7)
    │
    └──(GenericWrite)──→ viserys.targaryen ──(WriteProperty)──→ jorah.mormont

gmsaDragon$ ──(GenericAll)──→ drogon
Spys ──(GenericAll)──→ jorah.mormont (可读 LAPS)
```

### 6.3 漏洞场景清单

| 漏洞类型 | 目标 VM/用户 | 技术细节 |
|----------|-------------|----------|
| **AS-REP Roasting** | brandon.stark (north) | `DoesNotRequirePreAuth=true` |
| **AS-REP Roasting** | missandei (essos) | `DoesNotRequirePreAuth=true` |
| **Kerberoasting** | jon.snow (north) | SPN: HTTP/thewall |
| **Kerberoasting** | sql_svc (两个域) | SPN: MSSQLSvc/castelblack, MSSQLSvc/braavos |
| **NTLM Relay** | eddard.stark → DC02 | 计划任务每5分钟连接 `\\Meren\Private` |
| **LLMNR/NBT-NS 欺骗** | robb.stark → DC02 | 计划任务每2分钟连接 `\\Bravos\private` |
| **RDP Bot** | robb.stark → DC02 | 计划任务每1分钟执行 RDP |
| **约束委派 (Kerberos)** | castelblack$ | 委派到 HTTP/winterfell (仅 Kerberos) |
| **约束委派 (任意协议)** | jon.snow | 委派到 CIFS/winterfell |
| **非约束委派** | sansa.stark | SPN: HTTP/eyrie |
| **GPO 滥用** | samwell.tarly | 可编辑 "StarkWallpaper" GPO |
| **密码喷涂** | hodor | 用户名=密码 |
| **密码喷涂** | rickon.stark | WinterYYYY 模式 |
| **SYSVOL 凭据** | DC02 | `script.ps1` 和 `secret.ps1` 含密码 |
| **LDAP 描述中密码** | samwell.tarly | LDAP description 字段含密码 |
| **自动登录凭据** | DC02 | robb.stark 自动登录 (密码在注册表) |
| **凭据管理器** | DC02 | TERMSRV/castelblack 保存的 RDP 凭据 |
| **开放共享** | SRV02 | `thewall` 共享 (Stark 组完全控制) |
| **IIS 上传** | SRV02 | `C:\inetpub\wwwroot\upload` 可写 |
| **NTLM 降级** | DC03 | NTLMv1 允许 |
| **LDAP 签名禁用** | DC03 | LDAP 签名未启用 |
| **匿名 RPC** | DC02 (north) | ANONYMOUS LOGON 可读 north 域属性 |
| **SID History** | 跨林信任 | sevenkingdoms ↔ essos 启用 SID History |

---

## 7. ADCS 证书服务漏洞

### 7.1 ADCS 部署

| CA 服务器 | 域 | 角色 |
|----------|-----|------|
| DC01 (kingslanding) | sevenkingdoms.local | 企业 CA |
| DC03 (meereen) | essos.local | 企业 CA + 自定义漏洞模板 |
| SRV03 (braavos) | essos.local | 企业 CA |

### 7.2 ESC 漏洞清单

| ESC 编号 | 所在 CA | 漏洞描述 | 攻击方式 |
|----------|---------|----------|----------|
| **ESC1** | meereen (DC03) | 任意主体可申请, SAN 可写 | 伪造任意用户身份申请证书 |
| **ESC2** | meereen (DC03) | 模板允许任何用途 | 可用于认证 + 代码签名等 |
| **ESC3** | meereen (DC03) | 证书请求代理 | 用代理证书代表其他用户申请 |
| **ESC3-CRA** | meereen (DC03) | 证书请求代理变体 | 同上, 变体配置 |
| **ESC4** | meereen (DC03) | 模板 ACL 可被修改 | khal.drogo 有 GenericAll, 可改模板 |
| **ESC6** | braavos (SRV03) | EDITF_ATTRIBUTESUBJECTALTNAME2 | CA 级别 SAN 忽略 |
| **ESC7** | meereen (DC03) | viserys.targaryen 是 CA 管理员 | 可管理 CA 配置 |
| **ESC9** | meereen (DC03) | CT_FLAG_NO_SECURITY_EXTENSION | 无安全扩展 |
| **ESC10 (Case 1)** | kingslanding (DC01) | SubjectAltName + User 模板 | CA 级别 User 类型 SAN |
| **ESC10 (Case 2)** | kingslanding (DC01) | SubjectAltName + Computer 模板 | CA 级别 Computer 类型 SAN |
| **ESC11** | braavos (SRV03) | RPC 隔离禁用 | 可通过 RPC 交互请求 |
| **ESC13** | meereen (DC03) | 证书策略 + 组成员资格 | 证书绑定特定组 |
| **ESC15** | meereen (DC03) | 应用策略 + 证书模板 | 模板应用策略滥用 |

---

## 8. MSSQL 配置与攻击链

### 8.1 SRV02 (castelblack) — north.sevenkingdoms.local

| 配置项 | 值 |
|--------|-----|
| SA 密码 | `Sup1_sa_P@ssw0rd!` |
| SQL 服务账户 | `sql_svc` (`YouWillNotKerberoast1ngMeeeeee`) |
| 系统管理员 | `NORTH\jon.snow` |
| 链接服务器 | → BRAAVOS (映射: jon.snow → sa) |

**模拟权限 (Impersonation):**

```
samwell.tarly ──(EXECUTE AS LOGIN)──→ sa
brandon.stark ──(EXECUTE AS LOGIN)──→ jon.snow
arya.stark ──(EXECUTE AS USER)──→ dbo (master)
arya.stark ──(EXECUTE AS USER)──→ dbo (msdb)
```

### 8.2 SRV03 (braavos) — essos.local

| 配置项 | 值 |
|--------|-----|
| SA 密码 | `sa_P@ssw0rd!Ess0s` |
| SQL 服务账户 | `sql_svc` (`YouWillNotKerberoast1ngMeeeeee`) |
| 系统管理员 | `ESSOS\khal.drogo` |
| 链接服务器 | → CASTELBLACK (映射: khal.drogo → sa) |

**模拟权限 (Impersonation):**

```
jorah.mormont ──(EXECUTE AS LOGIN)──→ sa
```

### 8.3 MSSQL 攻击链示例

```
arya.stark (north 域普通用户)
    │
    │ 连接 castelblack MSSQL
    ▼
EXECUTE AS USER = 'dbo' (master/msdb)
    │
    │ 通过链接服务器跳转到 braavos
    ▼
castelblack → braavos (以 jon.snow → sa 身份)
    │
    │ 在 braavos 上执行 xp_cmdshell
    ▼
获得 braavos (SRV03) SYSTEM 权限
```

```
samwell.tarly (night watch 成员)
    │
    │ 连接 castelblack MSSQL
    ▼
EXECUTE AS LOGIN = 'sa'
    │
    │ 通过链接服务器跳转到 braavos
    ▼
castelblack → braavos (以 sa 身份)
    │
    ▼
获得 braavos (SRV03) SYSTEM 权限
```

```
jorah.mormont (essos 域用户)
    │
    │ 连接 braavos MSSQL
    ▼
EXECUTE AS LOGIN = 'sa'
    │
    │ 通过链接服务器跳转到 castelblack
    ▼
braavos → castelblack (以 sa 身份)
    │
    ▼
获得 castelblack (SRV02) SYSTEM 权限
```

---

## 9. 日常使用指南

### 9.1 启动靶场

#### 方式一: 快速启动 (推荐)

使用 vmrun 直接启动, 速度远快于 vagrant up:

```powershell
# 在 PowerShell 中执行
$vmrun = "C:\Program Files\VMware\VMware Workstation\vmrun.exe"
$base = "C:\Users\youze\WorkBuddy\2026-07-09-13-56-50\GOAD\workspace\4421a0-goad-vmware\provider\.vagrant\machines"

# 逐台启动
$vms = @("GOAD-DC01","GOAD-DC02","GOAD-DC03","GOAD-SRV02","GOAD-SRV03","PROVISIONING")
foreach ($vm in $vms) {
    $vmx = Get-ChildItem "$base\$vm\vmware_desktop" -Filter "*.vmx" -Recurse | Select-Object -First 1
    & $vmrun start $vmx.FullName nogui
}

# 查看运行状态
& $vmrun list
```

#### 方式二: Vagrant 启动

```bash
cd C:\Users\youze\WorkBuddy\2026-07-09-13-56-50\GOAD\workspace\4421a0-goad-vmware\provider
vagrant up
```

> ⚠️ Vagrant 启动较慢, 建议优先使用 vmrun

### 9.2 网络配置 (首次使用需要)

主机需要添加 VMnet1 的 IP 地址才能访问 192.168.56.x 网络:

```powershell
# 以管理员身份运行
netsh interface ip add address "VMware Network Adapter VMnet1" 192.168.56.1 255.255.255.0
```

或运行预置脚本:
```powershell
# 以管理员身份运行
C:\Users\youze\WorkBuddy\2026-07-09-13-56-50\add_ip.bat
```

### 9.3 关闭靶场

```powershell
# 关闭所有 VM
$vmrun = "C:\Program Files\VMware\VMware Workstation\vmrun.exe"
& $vmrun list  # 查看运行中的 VM

# 逐台关闭 (软关机)
& $vmrun stop "<vmx路径>" soft

# 或强制关闭 (硬关机, 不推荐)
& $vmrun stop "<vmx路径>" hard
```

### 9.4 验证环境

```powershell
# 检查所有 VM 是否在线
$hosts = @(
    @{Name="DC01"; IP="192.168.56.10"},
    @{Name="DC02"; IP="192.168.56.11"},
    @{Name="DC03"; IP="192.168.56.12"},
    @{Name="SRV02"; IP="192.168.56.22"},
    @{Name="SRV03"; IP="192.168.56.23"},
    @{Name="PROVISIONING"; IP="192.168.56.3"}
)
foreach ($h in $hosts) {
    $r = Test-Connection $h.IP -Count 1 -Quiet
    Write-Host "$($h.Name) ($($h.IP)): $(if($r){'ONLINE'}else{'OFFLINE'})"
}
```

### 9.5 重置环境

如果环境损坏需要重新 provisioning:

```bash
# 1. SSH 到 PROVISIONING VM
ssh -i .vagrant/machines/PROVISIONING/vmware_desktop/private_key vagrant@192.168.56.3

# 2. 运行 ansible playbook
export PATH=$PATH:/home/vagrant/.local/bin
cd /home/vagrant/GOAD
ansible-playbook ansible/main.yml \
  -i workspace/4421a0-goad-vmware/inventory \
  -i ad/GOAD/data/inventory \
  -i globalsettings.ini
```

---

## 10. 网络与连接方式

### 10.1 网络拓扑

```
┌──────────────────────────────────────────┐
│              主机 (Windows)               │
│         VMnet1: 192.168.56.1/24          │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │     VMnet1 (Host-Only)             │  │
│  │     192.168.56.0/24                │  │
│  │                                    │  │
│  │  .3  PROVISIONING (Ubuntu)         │  │
│  │  .10 DC01  .11 DC02  .12 DC03      │  │
│  │  .22 SRV02 .23 SRV03               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  攻击机 (Kali 等) 也在此网段              │
└──────────────────────────────────────────┘
```

### 10.2 连接方式

#### RDP 远程桌面 (Windows VM)

```powershell
# 域账户登录
mstsc /v:192.168.56.10    # DC01 - sevenkingdoms.local
mstsc /v:192.168.56.11    # DC02 - north.sevenkingdoms.local
mstsc /v:192.168.56.12    # DC03 - essos.local
mstsc /v:192.168.56.22    # SRV02
mstsc /v:192.168.56.23    # SRV03

# 登录凭据:
# 本地: vagrant / vagrant
# 域管理员: SEVENKINGDOMS\administrator / 8dCT-DJjgScp
#           NORTH\administrator / NgtI75cKV+Pu
#           ESSOS\administrator / Ufe-bVXSx9rk
```

#### SSH (PROVISIONING VM)

```bash
ssh -i .vagrant/machines/PROVISIONING/vmware_desktop/private_key vagrant@192.168.56.3
# 密码: vagrant
```

#### WinRM (Windows VM, Ansible 管理用)

```bash
# 端口 5985 (HTTP) 和 5986 (HTTPS)
# 用户: vagrant / vagrant
```

#### 攻击机接入

将攻击机 (如 Kali Linux) 的网卡设置为 VMnet1 (Host-Only), 配置 192.168.56.x 网段 IP 即可:

```bash
# Kali 中配置 IP
sudo ip addr add 192.168.56.100/24 dev eth0
sudo ip link set eth0 up

# 添加 DNS (指向域控)
# sevenkingdoms.local → 192.168.56.10
# north.sevenkingdoms.local → 192.168.56.11
# essos.local → 192.168.56.12
echo "nameserver 192.168.56.10" | sudo tee /etc/resolv.conf
```

### 10.3 端口清单

| 端口 | 服务 | VM |
|------|------|-----|
| 53/tcp | DNS | DC01, DC02, DC03 |
| 88/tcp | Kerberos | DC01, DC02, DC03 |
| 135/tcp | RPC | DC01, DC02, DC03, SRV02, SRV03 |
| 139/tcp | SMB | DC01, DC02, DC03, SRV02, SRV03 |
| 389/tcp | LDAP | DC01, DC02, DC03 |
| 445/tcp | SMB | DC01, DC02, DC03, SRV02, SRV03 |
| 464/tcp | Kerberos 密码修改 | DC01, DC02, DC03 |
| 593/tcp | RPC over HTTP | DC01, DC02, DC03 |
| 636/tcp | LDAPS | DC01, DC02, DC03 |
| 1433/tcp | MSSQL | SRV02, SRV03 |
| 3268/tcp | Global Catalog | DC01, DC02, DC03 |
| 3269/tcp | Global Catalog (SSL) | DC01, DC02, DC03 |
| 5985/tcp | WinRM HTTP | 所有 Windows VM |
| 5986/tcp | WinRM HTTPS | 所有 Windows VM |
| 80/tcp | IIS / WebDAV | SRV02 |
| 443/tcp | ADCS Web 注册 | DC01, SRV03 |
| 3389/tcp | RDP | 所有 Windows VM |

---

## 11. 故障排查

### 11.1 常见问题

#### Q: VMware 提示 "hv.capable was 0"

**A:** Hyper-V 占用了 VT-x。以管理员运行:
```bat
bcdedit /set hypervisorlaunchtype off
```
然后**重启电脑**。

#### Q: VMware 提示 "Virtualized Intel VT-x/EPT is not supported"

**A:** 同上, Hyper-V 未完全禁用。重启后生效。如果急需使用, 点击 **"Continue"** 继续, GOAD VM 不需要嵌套虚拟化。

#### Q: 主机无法 ping 通 192.168.56.x

**A:** VMnet1 缺少 192.168.56.1 地址:
```powershell
# 管理员运行
netsh interface ip add address "VMware Network Adapter VMnet1" 192.168.56.1 255.255.255.0
```

#### Q: VMware 库不保存虚拟机列表

**A:** 库文件权限问题。已修复, 如复发运行:
```powershell
# 管理员运行
C:\Users\youze\WorkBuddy\2026-07-09-13-56-50\fix_vmware_perms.bat
```

#### Q: Ansible 连接 SRV02 超时

**A:** SRV02 的 WinRM HTTPS (5986) 可能未启动。已手动修复, 如复发:
```powershell
cd GOAD\workspace\4421a0-goad-vmware\provider
vagrant winrm -c "New-SelfSignedCertificate -DnsName '192.168.56.22' -CertStoreLocation 'Cert:\LocalMachine\My' -NotAfter (Get-Date).AddYears(10) | Select Thumbprint" -s powershell -e GOAD-SRV02
# 用返回的 Thumbprint 创建监听器
vagrant winrm -c "New-Item -Path WSMan:\localhost\Listener -Transport HTTPS -Address * -CertificateThumbPrint '<THUMBPRINT>' -Force" -s powershell -e GOAD-SRV02
vagrant winrm -c "netsh advfirewall firewall add rule name='WinRM HTTPS' dir=in action=allow protocol=TCP localport=5986" -e GOAD-SRV02
```

#### Q: DC03 (meereen) AD 状态异常

**A:** DC03 的 dcpromo 曾失败过。检查 AD 状态:
```powershell
# RDP 到 DC03 后运行
Get-ADDomain essos.local
Get-ADDomainController -Filter * -Server essos.local
repadmin /showrepl
```

### 11.2 已知问题

| 问题 | 状态 | 说明 |
|------|------|------|
| DC03 dcpromo 曾失败 | ⚠️ 需检查 | 可能影响 essos.local 域功能 |
| PROVISIONING VM 无法访问 GitHub | ✅ 已绕过 | GOAD 仓库从主机 SCP 传输 |
| SRV02 WinRM HTTPS | ✅ 已修复 | 手动创建自签名证书 + HTTPS 监听器 |
| Ansible provisioning 不完整 | ⚠️ 需验证 | 部分 playbook 可能未跑完 |

### 11.3 日志文件

| 日志 | 位置 |
|------|------|
| Ansible 运行日志 | PROVISIONING VM: `/home/vagrant/ansible_run*.log` |
| 看门狗状态 | 主机: `goad_watchdog_state.json` |
| 监控仪表盘 | 主机: `http://localhost:8790` |
| Vagrant 日志 | `GOAD\workspace\4421a0-goad-vmware\provider\.vagrant\` |

---

## 12. 参考资源

### 12.1 官方资源

| 资源 | 链接 |
|------|------|
| GOAD 官方文档 | https://orange-cyberdefense.github.io/GOAD/ |
| GOAD GitHub 仓库 | https://github.com/Orange-Cyberdefense/GOAD |
| GOAD Writeup 教程 | https://mayfly277.github.io/categories/goad/ |

### 12.2 常用攻击工具

| 工具 | 用途 | 典型场景 |
|------|------|----------|
| BloodHound | AD 关系图可视化 | 分析 ACL 攻击路径 |
| Impacket | Python AD 攻击套件 | psexec, wmiexec, secretsdump, GetUserSPNs |
| Rubeus | Kerberos 攻击 | AS-REP Roasting, Kerberoasting, S4U |
| Certipy | ADCS 攻击 | ESC1-ESC15 漏洞利用 |
| CrackMapExec (NetExec) | 内网扫描 | 密码喷洒, 枚举, 执行命令 |
| Mimikatz | 凭据提取 | LSASS dump, golden/silver ticket |
| Responder | LLMNR/NBT-NS 欺骗 | 捕获 NTLMv2 hash |
| evil-winrm | WinRM 远程 shell | 通过 WinRM 执行命令 |
| PowerView | PowerShell AD 枚举 | ACL 分析, 用户/组枚举 |
| ldapsearch | LDAP 查询 | 用户/组/计算机枚举 |

### 12.3 推荐练习路径

```
1. 信息收集
   ├─ nmap 扫描 192.168.56.0/24
   ├─ enum4linux 枚举域信息
   └─ BloodHound 收集 AD 数据

2. 初始访问
   ├─ AS-REP Roasting: brandon.stark / missandei
   ├─ 密码喷涂: hodor/hodor, rickon/Winter2022
   ├─ LLMNR 欺骗: 捕获 robb.stark 的 hash
   └─ IIS 上传 WebShell (SRV02)

3. 横向移动
   ├─ MSSQL 链接服务器: castelblack ↔ braavos
   ├─ Kerberoasting: jon.snow, sql_svc
   ├─ ACL 滥用: tywin → jaime → joffrey → tyron → Small Council
   └─ ADCS 漏洞: ESC1-ESC15

4. 域控接管
   ├─ stannis.baratheon → kingslanding$ (GenericAll)
   ├─ lord.varys → Domain Admins (GenericAll)
   ├─ Shadow Credentials: khal.drogo → viserys
   └─ ESC7: viserys (CA 管理员) → 任意证书

5. 跨域攻击
   ├─ SID History: sevenkingdoms ↔ essos
   ├─ 跨林组: DragonsFriends, Spys
   └─ MSSQL 跨域链接
```

---

## 附录 A: 快速参考卡

### 域凭据速查

```
sevenkingdoms.local\administrator  /  8dCT-DJjgScp
north.sevenkingdoms.local\administrator  /  NgtI75cKV+Pu
essos.local\administrator  /  Ufe-bVXSx9rk

所有 VM 本地:  vagrant / vagrant
```

### 常用域控 IP

```
DNS (sevenkingdoms):    192.168.56.10  (DC01)
DNS (north):            192.168.56.11  (DC02)
DNS (essos):            192.168.56.12  (DC03)
Global Catalog:         192.168.56.10, .11, .12
```

### 快速连接命令

```bash
# RDP
xfreerdp /v:192.168.56.10 /u:administrator /d:sevenkingdoms.local

# WinRM
evil-winrm -i 192.168.56.10 -u administrator -p '8dCT-DJjgScp'

# MSSQL
sqsh -S 192.168.56.22 -U sa -P 'Sup1_sa_P@ssw0rd!'

# SMB
smbclient -L //192.168.56.22 -U 'NORTH\robb.stark%sexywolfy'

# LDAP
ldapsearch -x -H ldap://192.168.56.10 -D 'CN=administrator,CN=Users,DC=sevenkingdoms,DC=local' -w '8dCT-DJjgScp' -b 'DC=sevenkingdoms,DC=local'
```

---

*本文档基于 GOAD 实验环境实际部署情况编写。如需重新运行 Ansible provisioning 或修改环境配置，请参考第 9.5 节。*
