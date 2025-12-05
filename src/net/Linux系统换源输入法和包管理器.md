---
title: Linux系统换源输入法和包管理器
index: true
order: 6
isOriginal : true
category:
  - 计网基础
tag:
  - 计网基础
  - 操作系统
---
## 源 sources.list

更新本地软件包索引：sudo apt update

更新系统中已安装软件包：sudo apt upgrade

安装指定的软件命令：sudo apt install [package_name]

更新指定的软件命令：sudo apt update [package_name]

删除软件包命令：sudo apt remove [package_name]

清理不再使用的依赖和库文件: sudo apt autoremove

移除软件包及配置文件: sudo apt purge [package_name]

查找软件包命令： sudo apt search [keyword]

查看源 cat /etc/apt/sources.list

```

ubuntu@ubuntu-cmp:~$ cat /etc/apt/sources.list
# See https://www.kali.org/docs/general-use/kali-linux-sources-list-repositories/
deb https://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

```

## Kali换源？

```bash
sudo apt-get update
sudo apt-get upgrade
```

1. 提前下载和安装数字签名，否则可能报错。

    ```Linux
    wget archive.kali.org/archive-key.asc   //下载签名
    apt-key add archive-key.asc   //安装签名
    ```

2. 到 `vi etc/apt/sources.list `​ 换源

    ```Linux
    deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
    deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
    ```

## venv配置

创建

```
python3 -m venv venvname
```

创建后在该目录下存在venvname 文件

激活

```
source venvname/bin/activate
```

依赖下载

```
 pip install -r requirements.txt 
```

退出

```
deactivate
```

## 卸载fcitx安装fcitx5

sudo apt-get remove --purge fcitx fcitx-* -y    卸载fcitx

​`--purge`​ 选项将删除配置文件。

​`fcitx fcitx-*`​ 会删除 `fcitx`​ 和所有与 `fcitx`​ 相关的包。

sudo apt-get update    更新 Ubuntu 的软件包列

sudo apt-get install fcitx5 fcitx5-configtool fcitx5-chinese-addons -y

* ​`fcitx5`​：安装 Fcitx5 输入法框架。
* ​`fcitx5-configtool`​：安装 Fcitx5 的图形配置工具。
* ​`fcitx5-chinese-addons`​：安装中文输入法插件（例如拼音输入法）。

## 卸载fcitx5安装sougo

1.首先需要卸载系统已有的fcitx5,否则无法安装fcitx4.

sudo apt purge fcitx5  
2.更新一下系统

sudo apt update  
sudo apt upgrade  
3.此时系统应该会提醒有未卸载的fcitx5依赖项,卸载这些依赖包

sudo apt autoremove  
4.此时再安装fcitx4

sudo apt install fcitx  
如果依然提示有未满足的依赖关系，比如：“fcitx5-chinese-addons-data : 冲突: fcitx-data 但是 1:4.2.9.9-2build2 正要被安装”，那么卸载掉fcitx5-chinese-addons-data：

sudo apt remove fcitx5-chinese-addons-data

## fcitx5更改皮肤

将皮肤clone到本地：

```shell
git clone https://github.com/thep0y/fcitx5-themes.git
```

将想要使用的皮肤复制到 ~/.local/share/fcitx5/themes/

```shell
cd fcitx5-themes
cp macOS-light ~/.local/share/fcitx5/themes/ -r
```

修改皮肤配置文件(若没有配置文件则自动创建)：

```shell
vim ~/.config/fcitx5/conf/classicui.conf
```

将下面的参数复制进去（记得修改字体）：

```apache-config
# 垂直候选列表
Vertical Candidate List=False

# 按屏幕 DPI 使用
PerScreenDPI=True

# Font (设置成你喜欢的字体)
Font="Smartisan Compact CNS 13"

# 主题(这里要改成你想要使用的主题名，主题名就在下面)
Theme=macOS-light
```

其中的主题名与各主题的文件夹名相同，即：

* spring
* summer
* autumn
* winter
* green
* transparent-green
* macOS-light
* macOS-dark

若想输入法变成单行模式，还得再修改一个配置文件。 以fcitx5-rime为例：

```shell
vim ~/.config/fcitx5/conf/rime.conf
```

添加：

```apache-config
PreeditInApplication=True
```

保存后，重启输入法皮肤即可生效。

```bash
fcitx5 -r
```

通过 \~/.xprofile 或 \~/.profile文件来设置开机自启。

```bash
vim ~/.xprofile
```

在文件中添加以下内容：

```bash
# 设置 fcitx5 开机自启
export XMODIFIERS=@im=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
fcitx5 &
```

## cat、more、less命令区别详解

众所周知linux中命令cat、more、less均可用来查看文件内容

cat是`一次性显示整个文件`​的内容，还可以将多个文件连接起来显示，它常与重定向符号配合使用，适用于文件内容少的情况；

more和less一般用于显示文件内容超过一屏的内容，并且提供翻页的功能。more比cat强大，提供分页显示的功能，less比more更强大，提供翻页，跳转，查找等命令。而且more和less都支持：用空格显示下一页，按键b显示上一页。

more命令，功能类似 cat ，cat命令是整个文件的内容从上到下显示在屏幕上。 more会以一页一页的显示方便使用者逐页阅读，而最基本的指令就是按空白键（space）就往下一页显示，按 b 键就会往回（back）一页显示，而且还有搜寻字串的功能 。more命令从前向后读取文件，因此在启动时就加载整个文件。

less 工具也是对文件或其它输出进行分页显示的工具，应该说是linux正统查看文件内容的工具，功能极其强大。less 的用法比起 more 更加的有弹性。在 more 的时候，我们并没有办法向前面翻， 只能往后面看，但若使用了 less 时，就可以使用 [pageup] [pagedown] 等按键的功能来往前往后翻看文件，更容易用来查看一个文件的内容！除此之外，在 less 里头可以拥有更多的搜索功能，不止可以向下搜，也可以向上搜。

## Linux安装软件的思路？

1. 查看当前系统架构：`uname -a`​
2. 使用对应包管理器

    |**后缀名**|**安装包管理器**|**支持发行版**||||
    | -------------| ----------| ----------------------------------------| --| --| --|
    |.rpm|rpm/yum|红帽系（如redhat、fedora、centos）||||
    |.deb|dpkg/apt|debian系（如debian、ubuntu、银河麒麟）||||
    |.pkg.tar.xz|pacman|arch系（如Arch Linux、manjaro）||||
    |.sh|bash|任意支持bash的发行版||||
3. 使用相应包管理器安装命令

    |名字|主要发行版|相关命令|
    | ---------| ------------------------------------------| --------------------------------------------------------------------------------------------|
    |APT|Debian, Ubuntu, Linux Mint等|sudo apt update; sudo apt install package\_name; sudo apt upgrade|
    |YUM|CentOS, RHEL (旧版本), Fedora (旧版本)|yum update; yum install package\_name; yum upgrade|
    |DPKG|Debian, Ubuntu等|sudo dpkg -i package\_file.deb; sudo dpkg --configure -a; sudo dpkg -r package\_name|
    |RPM|Red Hat,CentOS (旧版本), Fedora (旧版本)|rpm -Uvh package\_file.rpm; rpm -ivh package\_file.rpm; rpm -e package\_name|
    |Snap|Ubuntu, Debian等|snap install package\_name; snap refresh package\_name; snap remove package\_name|
    |Flatpak|跨发行版|flatpak install flathub package\_name; flatpak update; flatpak remove package\_name|
    |DNF|Fedora, CentOS 8及以后版本|dnf update; dnf install package\_name; dnf upgrade|
    |Pacman|Arch Linux, Manjaro等|sudo pacman -Syu; sudo pacman -S package\_name; sudo pacman -Rns package\_name|
    |Zypper|openSUSE, SLE|zypper refresh; zypper install package\_name; zypper update|
    |Portage|Gentoo Linux|emerge --sync; emerge package\_name; emerge --depclean|

## Centos设置中文？

**方法一：使用命令终端**

1. 打开终端命令，查询本机所有语言包  `locale -a`​
2. 查看是否有zh\_CN.utf8语言包，如果没有就需要手动下载安装字体（如果有就跳过这一步）`yum groupinstall "fonts"`​
3. 设置[虚拟机](https://so.csdn.net/so/search?q=%E8%99%9A%E6%8B%9F%E6%9C%BA&spm=1001.2101.3001.7020)语言为zh\_CN.utf8（中文），然后重启虚拟机`localectl set-locale LANG=zh_CN.UTF-8`​
4. 重启后就成为中文了

**方法二：使用可视化设置中文**

1. 虚拟机左上角点击Applications -\> System Tools -\> Settings  进入设置页面
2. 打开设置页面后点击Region & Language -\> Language 进入语言设置界面
3. 选择 汉语(中国) 然后点击Done完成设置,重启。

## Kali汉化？

1. 在kali的命令行工具输入   dpkg-reconfigure locales之后按enter键
2. 按键盘上下键选择这三个字符编码：en\_US.UTF-8、zh\_CN.GBK、zh\_CN.UTF-8  
    注：按空格键选择，会变成\*号，三个都选择之后，按table 键选择 ok（重要：这个位置一定要选择好，要不重启配置也不生效）
3. reboot

## Kali安装fcitx5拼音中文输入法？

1. sudo apt update
2. 安装 Fcitx5 和 Fcitx5-pinyin

    ```bash
    sudo apt install fcitx5 fcitx5-pinyin

    ```
3. 安装 Fcitx5 和 Fcitx5-pinyin

    ····

    ```
    {: id="20250121155917-t5fanj7" updated="20250121155924"}
    ```

    ···

3. 在系统启动菜单中搜索 Fcitx5，找到 Fcitx5配置 进入设置界面

    ​![image](assets/image-20250121160058-xbg1ny9.png)​

    如图，正常情况下拼音输入法已经自动配置完成，无需进行任何调整即可正常使用。若左[侧边栏](https://so.csdn.net/so/search?q=%E4%BE%A7%E8%BE%B9%E6%A0%8F&spm=1001.2101.3001.7020)中未出现“拼音”选项，则可从右边栏找到“拼音”项，双击将其添加至左侧。

‍

## IDEA 常用快捷键

CREL+ALT+SHIFT+L   重新设置文件格式

CTRL+ALT+L    格式化代码

Ctrl+Shift+F   简繁切换

## ubuntu 常用快捷键

free -h    以GB为单位显示内存使用情况

service --status-all    查看服务命令

CTRL+ALT+T  打开终端

Ctrl + A：光标移动到行首

Ctrl + E：光标移动到行尾

Ctrl + D：关闭终端

Ctrl + W : 关闭标签页

ctrl+alt+d  最小化/显示活动窗口

alt+f4   关闭窗口

‍
