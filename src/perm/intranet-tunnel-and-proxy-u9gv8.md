---
title: 内网隧道及代理
short_title: ''
date: 2024-11-08 02:11:05
description: 本文介绍了内网隧道及代理
tag:
  - 代理
  - 隧道
category:
  - 渗透测试
article: true
timeline: false
isOriginal: true
---
本文介绍了内网隧道及代理

<!-- more -->




# 内网隧道及代理-o

## Neo-reGeorg隧道

![image](assets/image-20241120093806-3qn8rn2.png)

1. github上下载项目  这里5.2.0
2. 环境搭建：

    1.攻击机：外网主机，在该主机上生成shell   

    2.连接内外网的服务器：将shell上传到这里  192.168.71.67:80

    边界可以ping 内网主机

    ![image](assets/image-20241108144334-5plhfy0.png)

    外网攻击机不能ping 内网主机

    ![image](assets/image-20241108144646-9u87tnu.png)

    3.内网主机：开启了服务   192.168.135.129:80
3. 内网主机服务  index  （phpinfo）

    ![image](assets/image-20241108143849-cum6usb.png)
4. 攻击机端：  使用前需要先生成shell

    ```python
    python neoreg.py generate -k password
    ```

    ![image](assets/image-20241108101107-3l8um3n.png)
5. 将shell上传到服务器端

    ![image](assets/image-20241108113043-n3pjdzs.png)
6. 攻击机和服务器建立连接

    ```python
    python neoreg.py -k password -u http://192.168.71.67/server_shell.php
    ```

    ![image](assets/image-20241108113245-jir3myq.png)

## 浏览器插件代理

在浏览器使用SOCKS5代理到隧道1080

![image](assets/image-20241108145245-uebdnfp.png)

## proxifier代理

1. 或者使用proxifier在攻击机使用proxifile建立规则，和建立隧道的1080端口连接。使用上方建立隧道时所使用的协议SOCKS5.使用proxifier后浏览器里就不用代理。

    ![image](assets/image-20241108132625-6ecr0n1.png)
2. python.exe要和边界主机建立隧道，所以放在最前面直连。   第二个将firefox的流量代理到隧道。Target Hosts   Target Ports  到达任何主机和端口的都代理到隧道。这里将浏览器的HTTP请求转为SOCKS5

    ![image](assets/image-20241108143336-x066l22.png)
3. 建立规则mstsc.exe的流量代理。

    ![image](assets/image-20241108152502-dyf4mwr.png)

## SocksCap代理

1. 添加代理

    ![image](assets/image-20241108161511-68q4n80.png)
2. 添加代理程序并访问

    ![image](assets/image-20241108162305-07ikxhk.png)

‍
