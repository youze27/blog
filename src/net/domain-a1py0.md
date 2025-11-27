---
title: 域环境相关概念及实操
short_title: ''
date: 2024-11-11 01:23:47
description: 这篇文章主要介绍了Windows域环境
tag:
  - 域环境
category:
  - 渗透测试
article: true
timeline: false
isOriginal: true
---
这篇文章主要介绍了Windows域环境

<!-- more -->




# 域环境相关概念及实操

## 域相关概念

由于企业中服务器、个人PC电脑、笔记本电脑的管理和维护难度越来越大，在大规模的网络、个人用户薄弱的安全意识、软件 部署、软件管理的难度和复杂的系统设置等种种问题面前，使用域环境可以对这些电脑进行统一管理。

加入域的目的：

1. 权限集中管理，降低成本。
2. 设置下发并执行安全策略，安全性能加强，权限更加分明。
3. 域控会将域成员机桌面上的文件同步到域服务器上，对员工资料进行备份。
4. 用户只需使用域账号登录一次域，即可无限地访问允许访问的所有资源，无需反复进行身份验证，网络访问更方便。

![image](http://127.0.0.1:42405/assets/image-20241111092527-walcsoh.png)

### 活动目录 (Active Directory )

Active Directory（AD），即活动目录，是Windows Server网络操作系统中非常重要的目录服务。以下是对活动目录的详细介绍：

#### 定义与功能

活动目录是Windows网络中的核心目录服务，由微软开发，用于管理用户、计算机和其他网络资源。它提供了一种集中管理和控制企业网络资源的方法，确保网络的高可用性、安全性和一致性。活动目录的主要功能包括：

1. 帐号集中管理：所有帐号（包括用户、计算机等）均存储在服务器中，便于管理员进行统一管理和控制。
2. 身份验证与授权：活动目录能够验证用户凭据（如用户名和密码），并授予或拒绝用户执行特定操作（如访问文件或应用程序）的权限。
3. 软件集中管理：管理员可以统一推送软件、安装网络打印机等，提高管理效率。
4. 环境集中管理：统一客户端桌面、IE、TCP/IP协议等设置，确保网络环境的一致性。
5. 增强安全性：通过统一部署杀毒软件和病毒扫描任务、集中管理用户的计算机权限、统一制定用户密码策略等方式，提高网络的安全性。

#### 架构与组件

活动目录的架构包括多个组件和层次结构，其中一些关键组件包括：

1. 域控制器（Domain Controller）：保存了活动目录信息的副本，并负责把这些信息及其最新的变化复制到其他域控制器上，使各个域控制器上的信息保持同步。
2. 架构目录分区（Schema Directory Partition）：存储着整个林中所有对象与属性的定义数据，以及建立新对象与属性的规则。
3. 配置目录分区（Configuration Directory Partition）：存储着整个活动目录域服务（AD DS）的结构，如有哪些域、哪些站点等数据。

#### 逻辑结构

##### 域（Domain）

域是AD的基本单位，是一个逻辑组，包含一组共享共同的目录数据库的对象。域提供了一种安全边界，用于管理用户和计算机，并通过域控制器（Domain Controller, DC）存储和复制目录信息。域控制器负责存储目录数据，处理身份验证请求，以及管理用户和计算机的交互。

##### 组织单位（Organizational Unit, OU）

组织单位是域内的一个容器，用于组织和管理对象。OU可以嵌套，以创建层次结构。管理员可以使用OU来代表公司的结构，如部门、团队等，并通过委派权限来分配管理任务。OU使得对象的管理更加灵活和高效。

##### 树（Tree）

一组共享一个命名空间的域组成一棵树。树中的第一个域是根域（Root Domain），其余的域是子域（Child Domain）。树中的域通过双向的、可传递的信任关系连接在一起。

##### 与森林（Forest)

一组共享共同架构（Schema）、配置（Configuration）和全局编录（Global Catalog）的树组成森林。森林中的每棵树可以有不同的命名空间，但它们通过信任关系连接在一起。森林是AD中的最高层次结构，提供了跨树的安全边界和信任关系。

### 域控制器（Domain Controller, DC）

本质上是一台计算机，域控制器是运行Active Directory服务的服务器，负责存储和复制目录数据，处理身份验证请求，以及管理用户和计算机的交互。

- 存储AD数据库，包括用户、计算机、组、策略等对象的信息。
- 处理用户登录和身份验证请求。
- 复制目录数据到其他域控制器，确保数据的一致性和容错性。
- 提供DNS服务，解析网络中的域名。

### 域用户（Domain Users）

域用户是AD中定义的用户帐户，用于身份验证和访问控制。

- 使用用户名和密码登录到网络。
- 访问被授权的网络资源和应用程序。
- 接受组策略的管理和配置。

### 域计算机（Domain Computers）

域计算机是加入AD域的计算机，可以是工作站、服务器或其他设备。

- 使用域用户帐户进行登录和身份验证。
- 访问域中的资源和应用程序。
- 接受域控制器的管理和配置，如软件分发、安全更新等。

### 组（Groups）

组是AD中用于管理用户和其他对象的容器。

- 简化权限管理，通过为组分配权限，而不是为每个用户单独分配。
- 支持嵌套组，即一个组可以包含其他组。
- 便于用户管理，如添加、删除或移动用户到不同的组。

### 策略（Policies）

策略是AD中用于定义和管理网络行为和安全性的规则。

- 组策略（Group Policy）用于管理用户和工作站的配置，如桌面设置、软件安装、安全设置等。
- 站点策略（Site Policy）用于定义站点内的复制关系和拓扑结构。
- 密码策略（Password Policy）用于定义用户密码的复杂性、长度、有效期等要求。

## NTLM认证流程（NTLMv2）

NTLM认证机制在工作组环境下和在域环境下是不同的。Windows机器都用NTLM算法在本地保存用户的密码，密码的NTLM哈希保存在 SAM 文件中，通常可从 Windows系统中的SAM文件和域控的NTDS.dit文件中获得所有用户的Hash。

SAM文件路径:C:/Windows/system32/config/SAM

NTDS.dit文件路径:C:/Windows/NTDS/NTDS.dit

> **NTLM**（New Technology LAN Manager）是一套Windows安全协议，被设计用于为用户提供包含完整性和机密性的身份验证技术。NTLM主要有NTLMv1、NTLMv2和NTLMv2 Session三个版本，最常见的是NTLMv2。

> NTLM提供了一种在客户端和服务器之间进行身份验证的方式。
>
> 它使用了质询-响应机制，其中服务器发送质询给客户端，客户端通过计算响应来证明其身份。NTLM协议还提供了数据完整性和加密的功能，以确保通信的安全性。

### 在工作组中

 ![在这里插入图片描述](http://127.0.0.1:42405/assets/network-asset-e2f2dac2974531184c7b3ae7676e430b-20250107094537-kbfx7ag.png)

 ①发送协商请求(Negotiate)

- 客户端在访问受限服务时，需要输入相应的<span data-type="text" style="color: var(--b3-font-color8);">用户名和密码</span>，此时客户端将其进行预处理和转换，得到一份`NTLM Hash`进行缓存（并不是直接哈希得到的）；
- 然后发送协商请求包，包含（`NTLM Hash`​以及申请认证的服务信息等），记为`TYPE 1`。

 ②发送质询请求(Challenge)

- 服务端根据收到的协商请求包`TYPE 1`​后，如果判断其中的用户名存在，那么就会生成一个<span data-type="text" style="color: var(--b3-font-color8);">16字节的随机值</span>`Challenge`（NTLMv1为8字节）；
- 并结合支持的服务信息，生成一个质询请求包，包含（`Challenge`​随机值以及支持的服务信息等），记为`TYPE 2`。

 ③发送认证响应(Authenticate)

- 客户端使用`HMAC-MD5`​[算法](https://edu.csdn.net/cloud/pm_summit?utm_source=blogglc)来对`TYPE 2`​中的`Challenge`​值进行消息摘要并得到`NTLMv2 Response`​，并结合`用户名`​、`Challenge`​等生成`Authenticate`​响应包，记为`TYPE 3`；
- 具体来说，客户端将①中得到的`NTLM Hash`​和`TYPE 2`​中的`Challenge`​等作为`HMAC-MD5`​的输入，得到一个摘要值，即`NTLMv2 Response`。

 ④服务端验证并应答(Reply)

服务端在收到`TYPE 3`​后，根据用户名检索到缓存于本地的`NTLM Hash`​，`Challenge`​等传入`HMAC-MD5`​，并将得到的数据和`TYPE 3`​中的`NTLMv2 Response`进行比对，若相同则验证客户端身份成功，否则拒绝客户端的访问请求。

### 在域环境中

> 在域环境中，由于域控制器的存在（所有域用户的哈希值都存储在域控上的`NTDS.dit`中），服务器没办法直接进行“工作组验证流程”中的步骤④，只能作为“中间安全人”连通客户端和域控，并将验证过程交给域控。

 ![在这里插入图片描述](http://127.0.0.1:42405/assets/network-asset-35da2520c71862b33ac426ef13f40577-20250107094538-dbhuzdh.png)

 前三个步骤基本和工作组类似（①协商请求、②质询请求和③认证请求），下面介绍域中新增的几个步骤：

 ④验证转发

- 服务器将收到的`TYPE 3`转发给域控制器，请求验证。

 ⑤验证回复

- 采用和在工作组中的步骤④相同的方法来对认证请求进行验证，随后域控制器将验证结果返回给服务器。

 ⑥回复转达

- 服务器将验证结果转达给客户端。

![image](http://127.0.0.1:42405/assets/image-20241112092551-3t61u6o.png)

## Kerberos(网络身份验证协议)认证流程

Kerberos认证用于域环境中,它是一种基于票据(Ticket)的认证方式。他的整个认证过程涉及到三方:客户端、服务端 和KDC(Key Distribution Center)。在Windows域环境中,由DC(域控)来作为KDC。

针对Kerberos协议的攻击:黄金票据、白银票据、各种中继攻击、各种委派、kerberos协议漏洞等等

|简写|简述|
| ------| ----------------------------------------------------------------------------------------------------------|
|KDC|密钥分发中心（Key Distribution Center）：负责Kerberos认证过程中的票据生成管理服务，包含AS和TGS两个服务。|
|AS|认证服务（Authentication Service）：KDC的一部分，用于为客户端生成TGT（票据授予票据）。|
|TGS|票据授予服务（Ticket-Granting Service）：KDC的一部分，用于为客户端生成访问特定服务的票据。|
|TGT|票据授予票据（Ticket-Granting Ticket）：由AS生成的票据，用于获取访问特定服务的票据。|
|ST|服务票据（Service Ticket）：由TGS生成的票据，允许客户端访问特定的服务。|

> 在Kerberos的工作流程中，需要至少三个实体的参与：**客户端Client**、**服务器Server**以及**密钥分发中心KDC**，其中KDC包括了**认证服务器AS**及**票据授权服务器TGS**。
>
> 在使用Kerberos协议的网络环境中，新加入的客户端若想要访问某项应用服务时，通常需要经历以下流程：


![在这里插入图片描述](http://127.0.0.1:42405/assets/network-asset-f7e6ad2eeaa55ef26136a3b83578fc6c-20250107094538-hcu09v6.png)

- ①向**认证服务器AS**请求
- 客户端向AS发送一个包含密文的请求包（除了密文，还包括能体现用户身份的主体名等）；
- 密文：客户端使用密钥对一系列数据（如`ClientID`​、随机生成的`Challenge`​及`时间戳`等）进行加密得到密文，加密算法往往是对称加密算法（如AES）
- 密钥的产生：通常是向**密钥派生函数**输入**客户端密码的哈希值**得到的一个临时密钥
- ②**认证服务器AS**响应

  - AS根据请求中所提及的用户，在本地存储中找到该用户的密码哈希值；
  - 使用和客户端相同的方法（**密钥派生函数**）以期获得一个相同的密钥；
  - AS使用生成的临时密钥对请求包中的密文进行解密，倘若解密成功，说明客户端的确拥有正确的密码（在对称密码算法中，要求加密和解密的密钥相同）；
  - 接下来，AS会在响应包中放入**票据授权凭证TGT**（Ticket Granting Ticket），TGT中包含**用户特权证书PAC**（Privilege Attribute Certificate），**PAC**指明了该用户所持有的权限信息等。

    > TGT是使用`krbtgt`​账户的`NTLM Hash`来对对客户端身份等进行对称加密得到的；
    >
    > ​`krbtgt`是KDC中的一个特殊账户，用于生成和分发TGT。
    >
- ③向**票据授权服务器TGS**请求

  - 客户端携带着**密文TGT**，向TGS发起针对目的应用服务的请求。

![image](http://127.0.0.1:42405/assets/image-20241112092814-yhu42b1.png)

## windows10入域

参考文章：Windows域环境搭建

1. 在服务器端先配置静态ip，DNS服务器​![image](http://127.0.0.1:42405/assets/image-20241111144153-gmzzzcr.png)
2. 修改计算机全名，方便好记。​

    ![image](http://127.0.0.1:42405/assets/image-20241111144402-lhk9zkk.png)
3. 安装服务器的角色  AD​![image](http://127.0.0.1:42405/assets/image-20241111142624-d6wd8ws.png)
4. 安装完成后将该服务器升级为域控制器​![image](http://127.0.0.1:42405/assets/image-20241111142540-xlcvuj0.png)
5. 安装过程如果没有密码要设置强密码​

    ![image](http://127.0.0.1:42405/assets/image-20241111143408-w9ii1pc.png)
6. 完了之后就显示在域了​![image](http://127.0.0.1:42405/assets/image-20241111144121-tmu4qqe.png)
7. 转到用户计算机windows10用户加入域，加入域之前需要先配置用户的IP和DNS等![image](http://127.0.0.1:42405/assets/image-20241111145003-gg13umb.png)
8. 输入域管理账密后就可加入![image](http://127.0.0.1:42405/assets/image-20241111145027-dg1d33s.png)
9. 加入之后重启计算机。
10. 在域控制服务器端可查看到用户已经添加进来。​![image](http://127.0.0.1:42405/assets/image-20241111150337-h8rhhka.png)
11. 我们将该域用户加入到某部门​![image](http://127.0.0.1:42405/assets/image-20241111150522-ww1ftlh.png)
12. 设置域用户的密码及相关策略。​![image](http://127.0.0.1:42405/assets/image-20241111151204-sr2vag2.png)
13. 查看域用户的登录方式​

     ![image](http://127.0.0.1:42405/assets/image-20241111151814-t08hsy7.png)
14. 输入域用户名登录​

     ![image](http://127.0.0.1:42405/assets/image-20241111151620-zlj86d9.png)

## windows7入域

1. Windows7使用相同的方法创建和加入域​![image](http://127.0.0.1:42405/assets/image-20241111161924-akw6l9x.png)
2. 用户也可以在域控制器添加​

    ![image](http://127.0.0.1:42405/assets/image-20241111162927-6kxprhl.png)

## 域相关命令

![image](http://127.0.0.1:42405/assets/image-20241111165218-p78wz15.png)

![image](http://127.0.0.1:42405/assets/image-20241111165155-p6nmq0h.png)

![image](http://127.0.0.1:42405/assets/image-20241111185659-qzrvfhw.png)

net view /domain  #查看所有域

![image](http://127.0.0.1:42405/assets/image-20241111184658-ed7oc4r.png)

net user /domain      #查看域用户

![image](http://127.0.0.1:42405/assets/image-20241111184921-22bfn54.png)

net group /domain      #查看域里面有哪些组

![image](http://127.0.0.1:42405/assets/image-20241111185005-fzwfy4e.png)

net group "domain admins" /domain #查看域管理员账户

![image](http://127.0.0.1:42405/assets/image-20241111185114-1rpbkyr.png)

net group "domain controllers" /domain    #查看域控制器

![image](http://127.0.0.1:42405/assets/image-20241111185158-wr9eiv1.png)

net group "domain computers" /domain     #查看加入域中的所有普通计算机名称

![image](http://127.0.0.1:42405/assets/image-20241111185229-upusrh1.png)

![image](http://127.0.0.1:42405/assets/image-20241111185628-vms3cis.png)

![image](http://127.0.0.1:42405/assets/image-20241111185551-tq2kmi6.png)

dsquery server    #查询活动目录中的域控制器

dsquery use   r #查询活动目录所有用户，也就是域用户

![image](http://127.0.0.1:42405/assets/image-20241111185727-xxaelse.png)

net config workstation    #查询当前计算机属于那个域

![image](http://127.0.0.1:42405/assets/image-20241111190154-p516xb5.png)

net time /domain #查看主域服务器的时间

![image](http://127.0.0.1:42405/assets/image-20241111190443-pmvwcvy.png)

Ipconfig /all

![image](http://127.0.0.1:42405/assets/image-20241111190537-c8htfud.png)

net user xiaomi passwd /add /domain    #添加普通域用户xiaomi

net group "Domain Admins" xiaomi /add /domain    #将普通域用户提升为域管理员

![image](http://127.0.0.1:42405/assets/image-20241111190938-6ocvh8w.png)
