---
title: 应急响应靶场Web3
short_title: ''
date: 2024-10-19 02:46:49
description: 本文记录了针对Web3靶场应急响应
tag:
  - 靶机
category:
  - 应急响应
article: true
timeline: false
isOriginal: true
---
本文记录了针对Web3靶场应急响应

<!-- more -->




# 应急响应靶场Web3

登录系统

![image](http://127.0.0.1:59544/assets/image-20241019132631-o6evd0x.png)

D盾检查发现隐藏账户

![image](http://127.0.0.1:59544/assets/image-20241019104740-bovpcy4.png)

查看系统日志账户变更历史发现ip

![image](http://127.0.0.1:59544/assets/image-20241019111712-suxzovf.png)

recent查看历史文件

![image](http://127.0.0.1:59544/assets/image-20241019110552-fgc5to3.png)

去后台数据库有发现可疑账户

![image](http://127.0.0.1:59544/assets/image-20241019113200-f5u3c8j.png)

有密码登录不了

![image](http://127.0.0.1:59544/assets/image-20241019132442-69zhmre.png)

发现可重置密码

![image](http://127.0.0.1:59544/assets/image-20241019132423-1wfyd1q.png)

![image](http://127.0.0.1:59544/assets/image-20241019132546-wlpkr4k.png)

登录管理员账户，在编辑用户发现flag

![image](http://127.0.0.1:59544/assets/image-20241019132236-t7gqy7t.png)

查看定时任务发现可疑程序

![image](http://127.0.0.1:59544/assets/image-20241019133102-96n9fuv.png)

打开发现shell、路径、flag

![image](http://127.0.0.1:59544/assets/image-20241019114117-mhl5anq.png)

echo flag{888666abc}

找到路径发现shell

![image](http://127.0.0.1:59544/assets/image-20241019114249-6xlr8b9.png)

刚开始找access.log没找到，用evering扫一下发现了。

![image](http://127.0.0.1:59544/assets/image-20241019114957-fs6ealg.png)

192.168.75.129

![image](http://127.0.0.1:59544/assets/image-20241019132306-auaquvw.png)

靶机：知攻善防 侵删

‍

‍
