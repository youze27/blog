---
title: upload-labs
index: true
isOriginal : true
date: 2023-05-16
order: 5
category:
  - 渗透测试
tag:
  - 渗透测试
  - upload-labs
---
# upload-labs靶场实验

## Pass-1

上传合法文件，文件写入一句话木马。

​![image-20240903153114-u9pl0gm](assets/image-20240903153114-u9pl0gm.png)​

代理修改文件名，绕过前端检测。

​![image-20240903153359-nys7v1h](assets/image-20240903153359-nys7v1h.png)​

上传成功访问。

​![image-20240903153756-rg3mcmg](assets/image-20240903153756-rg3mcmg.png)​

或者直接删除检测的函数​​

​![image-20240903160113-jbx1q2h](assets/image-20240903160113-jbx1q2h.png)​

​![image-20240903160005-dzo57o7](assets/image-20240903160005-dzo57o7.png)​

清空文件上传

​![image-20240903160710-kz8387y](assets/image-20240903160710-kz8387y.png)​

## Pass-2

同上修改后缀

​![image-20240903154709-pglalk7](assets/image-20240903154709-pglalk7.png)​

访问成功

​![image-20240903155204-kajuprp](assets/image-20240903155204-kajuprp.png)​

## pass-3

AddType指令作用：在给定的文件扩展名与特定的内容类型之间建立映射语法：AddType MIME-type extension

改phpstudy下httpd.conf文件里的#AddType application/x-htpd-php.php.phtml  
AddType application/x-httpd-php .php .phtml .php5 php3

​![image-20240903161031-c93eksv](assets/image-20240903161031-c93eksv.png)​

​![image-20240903163141-4tgu1d3](assets/image-20240903163141-4tgu1d3.png)​

## pass-4

创建.htaccess文件写入如下内容、上传   注意文件名字要和上传的对应

```php
<FilesMatch "pass-4.png"> 
SetHandler application/x-httpd-php
</FilesMatch>
```

写入shell

```php
GIF89a
<?php phpinfo()?>
```

​![image-20240903164111-ggd63l0](assets/image-20240903164111-ggd63l0.png)​

​![image](assets/image-20240904110653-4dyv4qm.png)​

## pass-5

windows对大小写不敏感所以直接大写文件后缀上传。

​![image-20240903171959-fh1kv6c](assets/image-20240903171959-fh1kv6c.png)​

​![image-20240903171915-porpful](assets/image-20240903171915-porpful.png)​

## pass-6

使用空格绕过

​![image-20240903173449-g6b3j6p](assets/image-20240903173449-g6b3j6p.png)​

​![image-20240903173430-0sz3vtx](assets/image-20240903173430-0sz3vtx.png)​

使用. . 绕过

​![image-20240903172737-bj0wvb3](assets/image-20240903172737-bj0wvb3.png)​

​![image-20240903172705-kiyod9d](assets/image-20240903172705-kiyod9d.png)​

## pass-7

​![image-20240903173924-3yqac3s](assets/image-20240903173924-3yqac3s.png)​

​![image-20240903173903-8qiruht](assets/image-20240903173903-8qiruht.png)​

## pass-8

​![image-20240903174218-dobzy91](assets/image-20240903174218-dobzy91.png)​

​![image-20240903174320-y1n1u1u](assets/image-20240903174320-y1n1u1u.png)​

## pass-9

​![image-20240903174411-6x0sjdo](assets/image-20240903174411-6x0sjdo.png)​

​![image-20240903174451-nedfh6x](assets/image-20240903174451-nedfh6x.png)​

## pass-10

双写php但是要注意不能写phphpp这样会变成hpp

​![image-20240903174757-bhmrfxv](assets/image-20240903174757-bhmrfxv.png)​

​![image-20240903174931-5vomu7b](assets/image-20240903174931-5vomu7b.png)​

## 00截断

使用条件：

1. php < 5.3.4
2. gpc off

类型：GET、POST

## pass-11

GET类型截断：上传shell、抓包修改。为GET路径00截断。

​![image](assets/image-20240904090314-nu8dyq4.png)​

​![image](assets/image-20240904090644-a4debq9.png)​

## pass-12

POST类型00截断：上传phpshell，修改文件后缀为png，并为POST指定路径并截断。

​![image](assets/image-20240904091327-y1x3x7i.png)​

16进制里00截断。

​![image](assets/image-20240904091048-d5r27v0.png)​

上传成功显示

​![image](assets/image-20240904091351-xz6agjf.png)​

访问

​![image](assets/image-20240904091619-hvmkji7.png)​

## pass-17

上传写文件的png shell，上传，代理抓包，放入intruder，修改文件为.php的。

​![image](assets/image-20240904095735-dnvrz77.png)​

代理抓取访问shell的GET请求，将其放入inturder，因为只有访问shell才会执行，使其生成另一个shell。

​![image](assets/image-20240904095626-uk87i27.png)​

设置payload集，批量攻击。

​![image](assets/image-20240904102609-c37qlu3.png)​

设置资源池及并发请求延时。

​![image](assets/image-20240904102534-0t2fgdg.png)​

开始发送请求。

​![image](assets/image-20240904102501-yqmrtpj.png)​

访问请求出现200说明竞争到资源执行了脚本，已经生成另一个shell。

​![image](assets/image-20240904102440-cnw0ch4.png)​

访问。

​![image](assets/image-20240904102342-gs1kfiz.png)​

## pass-19

上传shell，发现不能上传png的图片，所以添加一个png后缀，使用00截断。

​![image](assets/image-20240904105233-n7b1xdn.png)​

找到HEX截断位置，添加00截断。

​![image](assets/image-20240904105154-c83lp4l.png)​

发送，上传成功。

​![image](assets/image-20240904105400-nf5xebh.png)​

访问。

​![image](assets/image-20240904105440-dcucdry.png)​

## apache漏洞解析

上传shell.png，修改后缀提示类型不支持。

​![image](assets/image-20240904113732-6vmmt7r.png)​

利用apache漏洞，添加后缀，有php后缀所以文件解析为了php。

​![image](assets/image-20240904113923-mrlouif.png)​

访问成功，注意：文件名和路径需要写完整。

​![image](assets/image-20240904114118-b9ou2m4.png)​

## apache漏洞解析2

上传shell，代理抓包，在保存文件名位置将0da改为了0a0a。

​![image](assets/image-20240904115741-1fazwxn.png)​

上传后，在路径后面加上<span data-type="text" style="color: var(--b3-font-color8);">%0a </span>  访问。

​![image](assets/image-20240904115904-91tirk0.png)​

## 畸形解析漏洞

环境条件：iis 7.0/7.5/nginx 1.x

解析原理：出现该漏洞时，将文件名加上/.php会解析为php文件。

上传shell图片。

​![image](assets/image-20240904130957-rzr2clj.png)​

直接访问图片不成功。

​![image](assets/image-20240904131125-7fbk2kf.png)​

加上/.访问成功。

​![image](assets/image-20240904131206-e0df3yb.png)​

‍
