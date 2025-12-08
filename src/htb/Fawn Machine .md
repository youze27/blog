---
title: Fawn Machine 
tag:
  - every Easy
  - Linux
category:
  - HTB
timeline: false
isOriginal: false  # 原创
index: true
---
- [https://app.hackthebox.com/machines/Fawn?tab=play_machine](https://app.hackthebox.com/machines/Fawn?tab=play_machine)

![avatar =200x](assets/network-asset-b64f85071e626e4cc2272d54332e4131-20251208224618-dkq0brn.png)


- What does the 3-letter acronym FTP stand for?  
  FTP 这个三字母缩写代表什么？

  !!File Transfer Protocol!!
- Which port does the FTP service listen on usually?  
  FTP 服务通常监听哪个端口？

  !!21!!
- FTP sends data in the clear, without any encryption. What acronym is used for a later protocol designed to provide similar functionality to FTP but securely, as an extension of the SSH protocol?  
  FTP 以明文方式发送数据，无需任何加密。后来设计为提供类似 FTP 功能但安全且作为 SSH 协议扩展的协议，使用了什么缩写？

  !!SFTP!!
- What is the command we can use to send an ICMP echo request to test our connection to the target?  
  我们可以用什么命令发送 ICMP 回声请求来测试与目标的连接？

  !!ping!!
- From your scans, what version is FTP running on the target?  
  根据你的扫描，目标上的 FTP 运行的是哪个版本？

  !!vsftpd 3.0.3!!

  ```bash
  ┌─[eu-starting-point-1-dhcp]─[10.10.15.29]─[youze27@htb-sxf3wxjoxq]─[~]
  └──╼ [★]$ nmap -A 10.129.15.130
  Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-12-08 09:06 CST
  Nmap scan report for 10.129.15.130
  Host is up (0.0081s latency).
  Not shown: 999 closed tcp ports (reset)
  PORT   STATE SERVICE VERSION
  21/tcp open  ftp     vsftpd 3.0.3   <-----
  | ftp-syst: 
  |   STAT: 
  | FTP server status:
  |      Connected to ::ffff:10.10.15.29
  |      Logged in as ftp
  |      TYPE: ASCII
  |      No session bandwidth limit
  |      Session timeout in seconds is 300
  |      Control connection is plain text
  |      Data connections will be plain text
  |      At session startup, client count was 4
  |      vsFTPd 3.0.3 - secure, fast, stable
  |_End of status
  | ftp-anon: Anonymous FTP login allowed (FTP code 230)
  |_-rw-r--r--    1 0        0              32 Jun 04  2021 flag.txt
  No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
  TCP/IP fingerprint:
  OS:SCAN(V=7.94SVN%E=4%D=12/8%OT=21%CT=1%CU=40674%PV=Y%DS=2%DC=T%G=Y%TM=6936
  OS:E99F%P=x86_64-pc-linux-gnu)SEQ(SP=102%GCD=1%ISR=10C%TI=Z%CI=Z%II=I%TS=A)
  OS:OPS(O1=M552ST11NW7%O2=M552ST11NW7%O3=M552NNT11NW7%O4=M552ST11NW7%O5=M552
  OS:ST11NW7%O6=M552ST11)WIN(W1=FE88%W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)
  OS:ECN(R=Y%DF=Y%T=40%W=FAF0%O=M552NNSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%
  OS:F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T
  OS:5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=
  OS:Z%F=R%O=%RD=0%Q=)T7(R=N)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK
  OS:=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)

  Network Distance: 2 hops
  Service Info: OS: Unix   <------

  TRACEROUTE (using port 111/tcp)
  HOP RTT     ADDRESS
  1   7.30 ms 10.10.14.1
  2   7.93 ms 10.129.15.130

  OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
  Nmap done: 1 IP address (1 host up) scanned in 12.31 seconds

  ```
- From your scans, what OS type is running on the target?  
  根据你的扫描，目标上运行的是哪种作系统类型？

  !!Unix!!
- What is the command we need to run in order to display the 'ftp' client help menu?  
  我们需要运行什么命令才能显示“ftp”客户端帮助菜单？

  !!ftp -?!!
- What is username that is used over FTP when you want to log in without having an account?  
  当你想在没有账户的情况下登录时，通过 FTP 使用的用户名是什么？

  !!anonymous!!
- What is the response code we get for the FTP message 'Login successful'?  
  我们收到的 FTP 消息“登录成功”的响应代码是什么？

  !!230!!
- There are a couple of commands we can use to list the files and directories available on the FTP server. One is dir. What is the other that is a common way to list files on a Linux system.  
  我们可以用几个命令来列出 FTP 服务器上可用的文件和目录。其中一个是 dir。在 Linux 系统上，列出文件的另一种常见方式是什么？

  !!ls!!
- What is the command used to download the file we found on the FTP server?  
  下载我们在 FTP 服务器上找到的文件用的命令是什么？

  !!get!!
- Submit root flag  提交根标志

  ```bash
  ┌─[eu-starting-point-1-dhcp]─[10.10.15.29]─[youze27@htb-sxf3wxjoxq]─[~]
  └──╼ [★]$ ftp 10.129.15.107
  Connected to 10.129.15.107.
  220 (vsFTPd 3.0.3)
  Name (10.129.15.107:root): anonymous
  331 Please specify the password.
  Password: 
  230 Login successful.
  Remote system type is UNIX.
  Using binary mode to transfer files.
  ftp> ls
  229 Entering Extended Passive Mode (|||36792|)
  150 Here comes the directory listing.
  -rw-r--r--    1 0        0              32 Jun 04  2021 flag.txt
  226 Directory send OK.
  ftp> get flag.txt
  local: flag.txt remote: flag.txt
  229 Entering Extended Passive Mode (|||37768|)
  150 Opening BINARY mode data connection for flag.txt (32 bytes).
  100% |***********************************|    32       20.94 KiB/s    00:00 ETA
  226 Transfer complete.
  32 bytes received in 00:00 (3.54 KiB/s)
  ftp> bye
  221 Goodbye.
  ┌─[eu-starting-point-1-dhcp]─[10.10.15.29]─[youze27@htb-sxf3wxjoxq]─[~]
  └──╼ [★]$ ls
  cacert.der  Documents  flag.txt  my_data   Public     Videos
  Desktop     Downloads  Music     Pictures  Templates
  ┌─[eu-starting-point-1-dhcp]─[10.10.15.29]─[youze27@htb-sxf3wxjoxq]─[~]
  └──╼ [★]$ cat flag.txt
  035db21c881520061c53e0536e44f815
  ```

‍
