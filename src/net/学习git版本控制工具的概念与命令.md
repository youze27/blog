---
title: 学习git版本控制工具的概念与命令
index: true
order: 3
isOriginal : true
date: 2024-04-12
category:
  - 编程开发
tag:
  - 计网基础
  - git
  - ssh
  - 版本控制
---


## ssh密钥设置方法

### windows

* 打开命令提示符（CMD）或PowerShell。
* 输入命令`ssh-keygen`。这个命令会启动密钥生成过程。默认情况下，它会生成一个RSA密钥对。
* 系统会提示你输入密钥的保存位置。如果你直接回车，密钥将保存在用户主目录下的`.ssh`文件夹中。
* 接下来，系统会提示你输入一个密码（passphrase）。这个密码用于保护你的私钥，增加安全性。如果你不想设置密码，直接回车即可，但这会使私钥在没有密码的情况下也能被使用，存在一定风险。
* 生成完成后，你会在指定的路径看到两个文件。例如，在默认路径下，`C:\Users\你的用户名\.ssh\id_rsa`是私钥文件，`C:\Users\你的用户名\.ssh\id_rsa.pub`是公钥文件。

### linux

* 终端输入命令`ssh-keygen`。
* 系统会提示你输入密钥的保存位置。你可以直接回车使用默认路径。
* 接下来，输入一个密码（passphrase）来保护你的私钥。如果你不想设置密码，直接回车即可，但同样存在安全风险。
* 生成完成后，你可以在指定路径看到生成的密钥文件。例如，在默认路径下，`~/.ssh/id_rsa`是私钥文件，`~/.ssh/id_rsa.pub`是公钥文件。

## 登录GitHub并添加SSH密钥

* **登录GitHub账户**
* 选择“Settings”（设置）。
* 在左侧菜单栏中，点击“SSH and GPG keys”（SSH和GPG密钥）选项。
* 点击“New SSH key”（新建SSH密钥）按钮。
* 在“Title”（标题）输入框中，输入一个易于识别的名称来标识是哪个设备的。
* 在“Key”（密钥）输入框中，粘贴之前复制的**公钥****内容**。确保公钥内容完整，不要遗漏任何字符。
* 点击“Add SSH key”（添加SSH密钥）按钮，完成添加操作。
* 终端  `ssh -T git@github.com`。这个命令会尝试通过SSH连接到GitHub服务器。如果连接成功，并且你的SSH密钥已经正确添加到GitHub

## git相关概念

1. 版本控制记录文件内容变化，以便查看和修改对应的版本的系统，
2. 集中式版本控制工具（c/s模式）：svn、cvs、vss，优点：权限控制、会单点故障（服务器坏…）
3. 分布式版本控制工具：客户端本地有完整项目仓库，git、mercurial、bazaar、darcs
4. Git发展历史：1991年linus手动合并-2002年bitkeeper授权社区使用-2005年linus用c开发git-两周后linux由git托管-2008linus上线托管jquery、ruby、php……
5. 工作区：存放代码的位置。修改的内容没有历史记录。
6. 暂存区：工作区的代码需要添加到暂存区零时存储。内容可被销毁。
7. 本地库：提交到本地库的内容有了历史记录，内容不可销毁。
8. 代码托管中心（远程库）：局域网：gitlab、互联网：github、gitee

## 设置签名

9. 设置签名：`git config --global user.name username`
10. 设置签名邮箱：`git config --global user.email xxx@xxx.com`
11. 签名信息存放在：`C:\Users\xxx\ .gitconfig`
12. 签名的作用是区分不同的操作者，用户签名信息在每一个版本提交信息中可以看到，确认是谁的操作，git首次使用必须设置用户签名，否则无法提交代码。和远程仓库账号无关系。

## 初始化

13. 初始化本地库：获取该文件的git管理权限，初始化管理信息：在该目录下使用`git init`
14. 查看本地库状态：`git status`  //on branch mast 当前项目在mast分支 no commits yet当前没有内容需要提交。
15. 使用linux命令创建文件并编辑：vim hello.txt \\ i(插入模式)hello(插入内容) \\esc \\:(命令模式)yy(复制)\\p(粘贴)\\:(命令模式)wq（保存退出）\\ll/l查看\\cat hello.txt(打开)

## 提交

16. **提交**到暂存区：**​`git add .`​**    (.代表全部，也可以直接指定文件名.后缀)
17. **查看**：`git status`
18. **删除**暂存区文件：`git rm --cached hello.txt`（只是删除暂存区，工作区还是存在的）
19. **提交到本地仓库：**​`git commit -m "备注/版本信息" hello.txt`
20. 查看版本信息：`git reflog  /git log`
21. 查看暂存区文件：`git ls-files`
22. 版本回退 ：`git reset --hard 版本号`
23. **清空暂存区文件**  `git reset`

## 分支

24. 分支：在版本控制过程中，同时推进多个任务，我们可以为每个分支单独创建单独的分支，自己开发的时候不影响主干运行。
25. 查看分支：`git branch -v`
26. 创建分支：`git branch hotfix`(分支名字)
27. 切换分支：`git checkout hotfix`
28. 把其他分支合并到当前分支：`git merge hotfix`
29. 冲突产生原因：当两个项目在同一文件，同一位置有两个不同的版本时，git无法替我们决定使用哪一个，必须人为决定内容。
30. 合并冲突：`git commit -m “merge_text”`(不加名字)

## 推送

31. 把代码推送到github：创建仓库/记下仓库http链接
32. 创建别名：`git remote add 别名 http://xxx`
33. 重设仓库：`git remote set-url origin URL   // 更换远程仓库地址，URL为新地址。`
34. 使用 `git remote rm <仓库别名> `命令将指定的别名删除
35. 查看别名：`git remote -v`

35. 推送项目到分支：推送最小单位是分支，没有别名可用链接，**​`git push 别名 master`​**

36. 克隆项目到本地：`git clone xxx`
37. 拉取远程项目：`git pull note master` (note是设置过的别名)
38. Pull request 将自己的分支推送到别的项目
39. 本地生成.ssh密钥：`ssh-keygen -t rsa -C email`（三次回车）
40. 在目录下会生成公钥和私钥：`C:\Users\xxx\.ssh`
41. ignore文件:不能上传大于100MB文件，需要ignore

## 推送最小流程

git add .                                #提交到暂存区
git commit -a -m "09"        #将代码同步到本地仓库
git push siyuan master      #将本地master推送到远程siyuan   第二次以后可用   git push

## 新项目推送流程

确保项目文件没有超过100MB的

网页创建项目

git config --global user.name 'xxx'
git config --global user.email 'xxx@163.com'

git init

网页端复制链接：git@gitee.com:xxx/xxx.git

git remote add 别名 "链接地址"

`git remote -vv` 可以看到添加的仓库信息

使用SSH密钥（有则忽略）

git pull 别名 master  （本地没有项目，把远程的拉下来合并）

git add .

git status

git commit -m "备注"

git push -f 别名 master   第一次需要-f强制推送

## ignore文件不起作用

　　当我们用 git 时常常会习惯把我们不想上传到远程代码库中的一些本地文件（夹）放在一个叫做 .gitignore 的文件中，例如常见的本地 build 文件夹，一些 IDE 如Intellig、Eclipse的项目管理文件，比如下面一些配置

```
// 此为注释 – 将被 Git 忽略
*.a       // 忽略所有 .a 结尾的文件
!lib.a    // 但 lib.a 除外

/TODO     // 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO

node_modules
.project
.vscode

build/    // 忽略 build/ 目录下的所有文件
doc/*.txt    // 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

　　但有些时候我们会遇到这样的问题：放入gitignore文件夹中的文件却还是被 git index，当你通过 git status 显示文件状态时，他们并没有被忽略。

1、问题场景

　　当你在git库中编写某些代码文件，并已经stage该文件之后，你发现某个文件你不想用了，想在以后的改变中忽略它。然后你再你的.gitignore文件中加入该文件名，结果它并没有被忽略。

　　当你从远程代码库中 git clone 一份代码中本地并做些修改，build，然后通过 git add .  等 stage了这些改变，当你通过 git status 查看状态时发现不小心把build/文件夹给add进来了。于是你在.gitignore文件中加入了build/，但发现并不起作用。

2、根本原因

　　.gitignore 文件只是 ignore 没有被 staged(cached) 文件，<span data-type="text" style="background-color: var(--b3-font-background8);">对于已经被 staged 的文件，加入 ignore 文件时一定要先从 staged 移除。</span>

![](https://img2020.cnblogs.com/blog/1158910/202107/1158910-20210715220241440-392288054.png)

　　因此，要想用 ignore 忽略文件，必须先把它们从staged中移除：commit你已有的改变，保存当前的工作。

　　当文件夹是目录时，需要使用 -r 参数（递归）否则会报错

```
git rm -r --cached .
git add .
git commit -m "update .gitignore"  // windows使用的命令时，需要使用双引号
```