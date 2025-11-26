---
title: java环境配置
index: true
isOriginal : true
date: 2023-12-18
order: 13
category:
  - 渗透测试
tag:
  - 渗透测试
  - java环境配置
---
# java环境配置

### windows     Linux见： Linux centos7 java环境配置

JRE8安装目录为C:\Program Files\Java\jre1.8.0_221

​![image](assets/image-20240920202423-9og9r1k.png)​

打开环境变量的步骤：

点击开始，右键选中我的电脑，点击属性-->高级系统设置-->高级-->环境变量-->系统变量。

1、设置JAVA_HOME

JAVA_HOME：C:\Program Files\Java\jre1.8.0_221（JRE安装路径）

​![image](assets/image-20240920202450-lug130m.png)​

​​

2、设置CLASSPATH

CLASSPATH：.;%java_home%\lib;%java_home%\lib\tools.jar（注意前面的.）

​![image](assets/image-20240920202505-evxzcqb.png)​

3、设置Path

Path: C:\Program Files\Java\jre1.8.0_221\bin

​![image](assets/image-20240920202515-hqdbglj.png)​

我们可以验证一下

在CMD窗口输入：java -version

​![image](assets/image-20240920202524-1yiwx8v.png)​

可以正常显示版本号，这样就可以正确使用JRE了  

‍
