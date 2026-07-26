---
title: H-worm (VBS蠕虫) 感染事件溯源分析报告
index: false
isOriginal : true
category:
  - 应急响应
tag:
  - H-worm
  - VBS蠕虫
---

***

# H-worm (VBS蠕虫) 感染事件溯源分析报告

---

### 1. 执行摘要

本报告详细记录了对主机感染 **H-worm (VBS蠕虫)** 的完整溯源分析过程。

**核心结论：**
主机在系统安装过程中，通过IT人员使用的、已被感染的 **金士顿 (Kingston) DataTraveler 3.0 U盘** 引入了病毒。IT人员在安装系统后，运行了U盘中被捆绑病毒的 **KMS激活工具 (KMS_X64.EXE)** 或 **驱动工具 (驱动总裁.TMP, DRVCEO.EXE)**，导致病毒在后台释放并执行。

**关键发现：**
- **感染源:** 被污染的IT维护U盘 (Kingston DataTraveler 3.0)。
- **感染母体:** U盘中的 `KMS_X64.EXE` (或同类激活/驱动工具)。
- **恶意载荷:** 释放的 `Microsoft Excel.WsF` 脚本文件。
- **感染时间:** 2026年4月4日 15:19:57 (系统安装完成后4分44秒)。
- **持久化机制:** 注册表 `HKLM\...\Run` 键值，实现开机自启。
- **攻击行为:** 通过 `wscript.exe` 静默执行恶意脚本，实现远程控制。

本报告提供了完整的事件时间线、技术分析、溯源证据以及用于排查的脚本和IOC。

---

### 2. 事件概述

| 项目 | 内容 |
| :--- | :--- |
| **操作系统** | Microsoft Windows 10 专业版 (Build 18362) |
| **感染用户** | Administrator |
| **病毒名称** | H-worm (VBS/Worm.H) |
| **主要传播方式** | U盘传播，通过捆绑在激活/驱动工具中执行 |
| **初始感染时间** | 2026年4月4日 15:19:57 (UTC+8) |
| **首次恶意行为时间** | 2026年4月21日 09:53 (脚本首次执行) |
| **发现时间** | 2026年4月22日 (用户报告杀软持续告警) |
| **事件状态** | 已定位感染源，已清除持久化机制，部分恶意文件已清理 |

---

### 3. 感染时间线与病毒生命周期分析

本次感染的生命周期可分为四个阶段：**初始入侵、文件落地与持久化、潜伏期、命令与控制(C2)活动**。

| 阶段 | 时间 (UTC+8) | 事件描述 | 关键证据 |
| :--- | :--- | :--- | :--- |
| **1. 初始入侵 (Delivery)** | 2026/04/04 15:15:13 | **系统安装完成**。系统于该日安装。 | `systeminfo` 输出结果 |
| | 2026/04/04 15:20:00 | **执行感染母体**。IT人员从U盘运行了`KMS_X64.EXE`、`驱动总裁.TMP`、`DRVCEO.EXE`等工具。 | Prefetch文件记录 (`C:\Windows\Prefetch\KMS_X64.EXE-2C32FC27.pf` 等) |
| **2. 文件落地与持久化 (Installation & Persistence)** | 2026/04/04 15:19:57 | **病毒文件落地**。感染母体将H-worm核心脚本释放到 `C:\Users\Administrator\AppData\Roaming\Microsoft Office\Microsoft Excel.WsF`。 | `wmic datafile` 查询文件的 `CreationDate` |
| | (推断) 2026/04/04 15:20 | **建立持久化**。病毒写入注册表启动项 `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Microsoft Excel`，确保每次开机自启。 | 注册表查询结果 |
| **3. 潜伏期 (Dormancy)** | 2026/04/04 - 2026/04/21 | **静默驻留**。病毒在系统中潜伏17天，未触发执行。在此期间，攻击者可能尚未激活对主机的控制。 | `RecentDocs` 记录为空，`Prefetch` 在此期间无 `WSCRIPT.EXE` 记录 |
| **4. 命令与控制 (C2 Activity)** | 2026/04/21 09:53 | **首次C2通信/任务执行**。病毒通过某种触发机制（可能是计划任务或C2指令），首次调用`wscript.exe`执行恶意脚本。 | Prefetch记录 `WSCRIPT.EXE-7DB9834D.pf` |
| | 2026/04/22 07:52 | **第二次C2活动**。病毒再次被触发，`wscript.exe` 以隐藏窗口模式 (`//B`) 执行 `Microsoft Excel.WsF`。此时杀毒软件检测到异常行为并持续告警。 | `wmic process` 查询到的完整命令行；Prefetch记录 `WSCRIPT.EXE-3FF4D889.pf` |

---

### 4. 溯源路径与证据分析

以下是定位感染源和攻击链的完整分析路径。

#### 4.1 第一阶段：确认感染与定位恶意载荷

**目标:** 确认主机是否感染，并找到恶意程序实体。

1.  **检查进程执行记录:** 通过查询Prefetch文件，发现存在 `WSCRIPT.EXE` 的执行记录，这表明系统上有VBS/JS脚本被执行。
    ```cmd
    dir C:\Windows\Prefetch | findstr WSCRIPT
    ```
    *   **结果:** 发现两个文件: `WSCRIPT.EXE-3FF4D889.pf` (2026/4/22) 和 `WSCRIPT.EXE-7DB9834D.pf` (2026/4/21)，确认为脚本执行活动。

2.  **捕获恶意命令行:** 查询`wscript.exe`进程的完整命令行，以定位执行的脚本文件。
    ```cmd
    wmic process where "name='wscript.exe'" get processid,commandline,creationdate /format:table
    ```
    *   **结果:** 捕获到关键恶意命令: `"C:\Windows\System32\wscript.exe" //B "C:\Users\Administrator\AppData\Roaming\Microsoft Office\\Microsoft Excel.WsF"`。
    *   **分析:** 参数 `//B` 表示以静默、无窗口的后台模式运行。脚本路径伪装在 `Microsoft Office` 目录下，文件名 `Microsoft Excel.WsF` 极具欺骗性。确认病毒载荷为 `.WsF` (Windows Script File) 文件。

3.  **检查文件系统元数据:** 查询 `Microsoft Excel.WsF` 的文件属性，获取创建和修改时间。
    ```cmd
    wmic datafile where "name='C:\\Users\\Administrator\\AppData\\Roaming\\Microsoft Office\\Microsoft Excel.WsF'" get CreationDate,LastModified
    ```
    *   **结果:**
        *   `CreationDate`: `20260404151957` (2026年4月4日 15:19:57)
        *   `LastModified`: `20150423204742` (2015年4月23日)
    *   **分析:** `CreationDate` 揭示了病毒进入系统的时间点。`LastModified` 时间是2015年，远早于系统安装时间，这强烈表明该文件不是在本地生成的，而是从外部存储介质直接复制而来。

#### 4.2 第二阶段：溯源感染源

**目标:** 定位病毒是如何进入系统的。

1.  **关联系统安装时间:** 查询系统初始安装日期。
    ```cmd
    systeminfo | findstr /i "初始安装日期"
    ```
    *   **结果:** `初始安装日期: 2026/4/4, 15:15:13`。
    *   **分析:** 病毒文件的创建时间 (15:19:57) 与系统安装完成时间 (15:15:13) **仅相差4分44秒**。这几乎可以断定感染发生在系统安装过程中或刚安装完毕时的初始化配置阶段。

2.  **排查同时期活动:** 检查同一时间段 (15:15-15:22) 的Prefetch文件，寻找潜在感染载体。
    ```cmd
    dir C:\Windows\Prefetch\*.pf /a /od | findstr "2026/04/04"
    ```
    *   **结果:** 发现在15:20左右，多个可疑程序被执行:
        *   `KMS_X64.EXE` (KMS激活工具)
        *   `驱动总裁.TMP` (驱动工具)
        *   `DRVCEO.EXE` (驱动工具)
        *   `百度网盘.EXE`
        *   `WINRAR-X64.EXE`
    *   **分析:** `KMS_X64.EXE` 和各类驱动工具是典型的、极易携带病毒的“灰色软件”。它们通常在系统安装后由IT人员运行，与病毒文件的落地时间高度吻合。由此推断，感染母体极有可能是这些工具之一。

3.  **确认U盘来源:**
    *   **假设:** 如果病毒来自外部，且发生在系统安装时，那么IT人员使用的系统安装/工具U盘是最大嫌疑。
    *   **验证:** 检查系统USB存储设备记录。
        ```cmd
        reg query HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR /s | findstr "FriendlyName"
        ```
    *   **结果:** 发现名为 `Kingston DataTraveler 3.0 USB Device` 的U盘记录，并提取到其唯一序列号 `E0D55EA574B419606887181F` 和 `408D5CE4B66DE971291122A9`。

#### 4.3 第三阶段：确认持久化机制

**目标:** 查明病毒如何在重启后存活并反复触发告警。

1.  **检查注册表启动项:**
    ```cmd
    reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
    ```
    *   **结果:** 发现名为 `Microsoft Excel` 的键值，其数据为 `wscript.exe //B "C:\Users\Administrator\AppData\Roaming\Microsoft Office\\Microsoft Excel.WsF"`。
    *   **分析:** 这是病毒的持久化机制。每次系统启动，该注册表项都会导致恶意脚本被执行，解释了为何杀毒软件会持续告警。

---

### 5. 溯源结论

**感染链条已完整还原：**

```mermaid
graph TD
    A[IT人员U盘<br>Kingston DT 3.0<br>(已被H-worm感染)] -->|插入并运行| B(执行感染母体<br>KMS_X64.EXE/驱动总裁.TMP等)
    B -->|释放| C[写入核心载荷<br>Microsoft Excel.WsF<br>时间: 2026/04/04 15:19:57]
    B -->|创建| D[写入持久化机制<br>注册表Run键值]
    D --> E[系统重启]
    E -->|触发| F(wscript.exe静默执行<br>Microsoft Excel.WsF)
    F -->|发起| G[C2通信/恶意行为]
    G -->|触发| H[杀毒软件持续告警]
```

**关键IOC (失陷指标):**

| 类型 | IOC | 备注 |
| :--- | :--- | :--- |
| **文件名** | `Microsoft Excel.WsF` | 核心恶意载荷 |
| **文件路径** | `%AppData%\Roaming\Microsoft Office\Microsoft Excel.WsF` | |
| **命令行** | `wscript.exe //B "C:\Users\*\AppData\Roaming\Microsoft Office\\Microsoft Excel.WsF"` | EDR/SIEM监控重点 |
| **注册表** | `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Microsoft Excel` | 持久化机制 |
| **感染母体(高度怀疑)** | `KMS_X64.EXE`, `驱动总裁.TMP`, `DRVCEO.EXE` | 需从原始U盘提取MD5进行威胁情报碰撞 |
| **U盘硬件指纹** | **Vendor:** Kingston<br>**Product:** DataTraveler 3.0<br>**Serial:** `E0D55EA574B419606887181F`, `408D5CE4B66DE971291122A9` | 用于全网排查使用过此U盘的其他主机 |
| **感染时间窗口** | 2026-04-04 15:15 - 15:25 (UTC+8) | 重点排查此时间窗口内新装机的系统 |

---

### 6. 关键排查脚本

本次溯源过程中，以下脚本被证明是有效的。

#### 6.1 一键取证脚本 (批处理)

保存为 `Forensics_Collector.bat`，以管理员身份运行，可快速收集关键证据。

```batch
@echo off
set OUTPUT_DIR=C:\Forensics_%COMPUTERNAME%_%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%OUTPUT_DIR%" 2>nul

echo [*] 正在收集取证数据到: %OUTPUT_DIR%

echo [1] 收集系统信息...
systeminfo > "%OUTPUT_DIR%\systeminfo.txt" 2>nul

echo [2] 收集进程列表...
tasklist /v > "%OUTPUT_DIR%\tasklist.txt" 2>nul

echo [3] 收集注册表启动项...
reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run > "%OUTPUT_DIR%\run_HKLM.txt" 2>nul
reg query HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run > "%OUTPUT_DIR%\run_HKCU.txt" 2>nul

echo [4] 收集USB设备历史...
reg query HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR /s > "%OUTPUT_DIR%\usb_history.txt" 2>nul

echo [5] 收集WScript执行记录...
dir C:\Windows\Prefetch\ | findstr WSCRIPT > "%OUTPUT_DIR%\wscript_prefetch.txt" 2>nul

echo [6] 搜索恶意脚本文件...
dir /s /b C:\*.WsF > "%OUTPUT_DIR%\wsf_files.txt" 2>nul
dir /s /b C:\Users\%USERNAME%\*.vbs > "%OUTPUT_DIR%\vbs_files.txt" 2>nul

echo [*] 取证完成。请将 %OUTPUT_DIR% 目录打包发送给安全团队。
pause
```

#### 6.2 USB指纹提取脚本 (PowerShell)

保存为 `Get-USB_Fingerprint.ps1`，用于提取U盘详细指纹信息。

```powershell
$outputDir = "C:\USB_Fingerprint_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

Write-Host "[*] 正在提取USB指纹..." -ForegroundColor Cyan

# 导出完整USB存储注册表项
reg export "HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR" "$outputDir\USBSTOR_Export.reg" /y

# 提取关键信息并生成IOC
$iocFile = "$outputDir\IOC_USB_Serial_Numbers.txt"
"===== 可疑U盘序列号 =====`n" | Out-File $iocFile
reg query HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR /s | Select-String "FriendlyName|Disk&Ven" | Out-File $iocFile -Append

Write-Host "[*] 完成。结果保存在: $outputDir" -ForegroundColor Green
Invoke-Item $outputDir
```

### 7. 处置与修复建议

| 优先级 | 操作项 | 说明 |
| :--- | :--- | :--- |
| **紧急** | **隔离感染源U盘** | 立即定位并禁用该IT人员的 `Kingston DataTraveler 3.0` U盘，在隔离环境中进行取证和查杀。 |
| **紧急** | **全网排查** | 1. 使用U盘序列号 `E0D55EA574B419606887181F` 和 `408D5CE4B66DE971291122A9` 在EDR或终端管理系统中搜索所有连接过该U盘的主机。<br>2. 搜索注册表项 `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Microsoft Excel`。<br>3. 搜索文件名 `Microsoft Excel.WsF` 和命令行 `wscript.exe //B *Microsoft Excel.WsF`。 |
| **高** | **彻底清除感染主机** | 1. 删除注册表启动项: `reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "Microsoft Excel" /f`<br>2. 删除恶意脚本: `del "C:\Users\Administrator\AppData\Roaming\Microsoft Office\Microsoft Excel.WsF" /f /q`<br>3. 结束恶意进程: `taskkill /F /IM wscript.exe`<br>4. 使用多款杀毒软件进行全盘扫描。 |
| **中** | **加固防御策略** | 1. **规范IT维护流程**: 严禁使用来源不明的激活/驱动工具，所有维护U盘/工具应来自官方渠道并定期查杀。<br>2. **配置组策略**: 禁用Office宏、禁用可移动存储设备的自动播放功能。<br>3. **加强终端监控**: 部署EDR并配置针对 `wscript.exe` 和 `cscript.exe` 调用非系统目录脚本的告警规则。 |
| **建议** | **重装系统** | 考虑到感染的深度和潜在的后门风险，强烈建议对该主机进行格式化并重新安装操作系统。 |