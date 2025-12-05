---
title: 学习Linux命令
index: true
order: 1
isOriginal : true
date: 2024-01-10
category:
  - 计网基础
tag:
  - 计网基础
  - Linux命令
---
在Linux和类Unix操作系统中，波浪号（`~`​）代表当前用户的主目录（home directory）

例如，如果当前用户是`alice`​，并且她的主目录是`/home/alice`​，那么`~`​就代表`/home/alice`​。

全局可执行程序会被放置在`/usr/local/bin`​（对于本地安装的软件）或`/usr/bin`​（对于系统级的软件包）目录中。

### 用户

1. 简介：多用户、多任务、多线程、多处理器、高稳定、高安全
2. 内核：进程调度、内存管理、虚拟文件系统、网络接口
3. 特点：模块化程度高、源码公开、设备独立性、广泛硬件支持、安全性可靠性好、可以执行强、良好网络和文件系统支持
4. 用户名 @ 计算机名 用户目录
5. 创建用户：adduser zhangsan
6. 修改密码：passwd zhangsan
7. 显示当前工作目录：pwd
8. 更改工作目录：cd
9. 创建工作目录：mkdir
10. 切换用户：su

### 文件

11. 删除空工作目录：rmdir

12. 使用较长格式列出文件：ls -l

     ​![](assets/clip_image008-20240814092133-ldo7csd.jpg)​
13. 列出所有文件和目录：ls 包括隐藏：-a
14. 强制删除：rm -rf xxx   谨慎使用
15. 移动目录或文件：mv xxx xxx
16. 复制/重命名目录或文件：cp xxx xxx
17. 创建文件：touch xxx
18. 查看文件最后编辑时间：ls -l xxx
19. 查看文件最后访问时间：ls -lu xxx
20. 修改文件最后访问时间：touch -at 02011011 xxx
21. 创建和显示文件：cat xxx
22. 更改文件权限：chmod 777(组合权值) xxx

     ​![](assets/clip_image006-20240814092133-9l9xzot.jpg)​
23. 分页显示：more/less xxx
24. 显示文件前 n 行：head n xxx
25. 显示文件后 n 行：tail n xxx
26. 文件内容排序：sort xxx
27. 检查文件重复内容：uniq xxx
28. 文件中查找内容：grep ‘a’ xxx
29. 文件字节比对：cpm xxx xxx
30. 有序文件比对：comm xxx xxx
31. **文件内容查找：find -name “ex*”   （ex 开头）**
32. 1 天内存取过：Fiand -atime -1
33. **查看指定文件所在位置：where is ls**
34. **查看可执行文件位置：which pwd**
35. 显示磁盘空间：df -h
36. 列文件系统类型：df -T
37. 统计目录或磁盘占用空间大小：du -h xxx
38. **将某个分区挂载到某个目录下： mount /x/x  /x/x**
39. **取消该分区的挂载：umount /dev/sdb**
40. **查看磁盘 uuid：  lsblk -f**

### 压缩

41. Ubuntu安装deb软件：sudo dpkg -i 文件名.deb
42. 压缩文件：zip name.zip name;   bzip2 name ;

42. 删除压缩包中文件：zip -d name.zip xxx
43. 压缩包中添文件：zip -m name.zip xxx
44. 覆盖解压缩：unzip -o name.zip; bzip2/bunzip2 name.bz2
45. 另存为解压缩：unzip -n name.zip

[47.  List 压缩包信息]()：zipinfo name.zip

|后缀|压缩命令|解压命令|其他|其他|
| ----| ---------------------| --------------------------------| --------------------------------------| --------------------------------|
| **.zip**|zip name.zip name|unzip -o(覆盖)/n（另存）name.zip|zip -d/m(包中增删) name.zip name|list 压缩包信息 zipinfo name.zip|
| **.gz**|gzexe name|gunzip name.gz|gizp \*目录下全压|gzip -dv \*（目录下全解）|
| **.bz2**|bzip2 name|bzip2/ bunzip2 name.bz2|Bzip2recover name.bz2(修复)||
| **.z**|compress ‘’/-f name|Uncompress/(compress -d) name.z|未安装:root 执行 apt install ncompress|下载完切换为普通用户|

48. 用 man 查看 ls 命令帮助：man ls；help ls；info ls
49. 查看命令功能：whatis ls
50. 清除屏幕：clear
51. 显示文本：echo
52. 查看时间/日期：date ；cal；cal  2024；
53. **查看所有进程：ps -A**
54. 查看某进程：ps -ef | grep xxx
55. **终止某进程：pkill xxx**
56. 显示最近登陆系统的用户信息：last
57. 显示历史指令 10 条：history 10
58. 定义别名：alias l \= ‘ls’
59. 删除别名：unalias l

### vi

60. Vi 编辑器：命令模式、插入模式、底线模式
61. 按：进入底线模式；按 a、i、o 进入插入模式；esc 退出；
62. 退出/强制修改退出：wq/wq！
63. 查看 more name
64. 保存内容：:w
65. 打开下/上一个文件：:n/N
66. 不存盘退出/强制不存盘退出：q  /  q！
67. 文件存盘退出：：wq  /  wq
68. 撤销队稳健的修改：命令模式 u
69. 移动光标：方向键上下左右
70. 移动光标：kjhl（科技含量）
71. 将光标移动下一个单词开头：w
72. 将光标向前移动一个单词：b
73. 将光标移动到单词尾：e
74. 将光标移动到文本中的某字母：f+ 字母
75. 将光标移动到·该行的 n 位：n+|
76. 将光标移动到当前行末：\$
77. 将光标移动到当前行首：\^
78. **跳文首 gg 文末 GG**
79. 数字 +G/ ：+ 数字：将光标移动到对应行首
80. :\$  将光标移动到文件最后一行首
81. 光标上移一行    + 光标下移一行·
82. M 光标移动到屏幕中间
83. L 光标移动到当前屏幕下方
84. H 光标移动到·屏幕最上方
85. Ctrl+D  向下移动半屏文本内容
86. Ctrl+U  移动半屏内容
87. Ctrl+F  下一屏
88. Ctrl+B  上一屏
89. 插入：左 i 右 a  上 O 下 o  首 I 尾 A
90. 查找字符串：\\a  向前查找 n  向后查找 N
91. 替换一个字符 r  逐行替换 R  替换整个单词  cw  整行替换 cc
92. 查找替换 ：:s/tow/data  将该行中 tow 替换为 data
93. 替换光标到行末间的内容：C
94. 对所有内容进行替换：：1,\$ s/owe/one(从第一行到最后一行内容进行替换)
95. 搜索所有行内容并替换：:1,\$ s/three/003/g  g 表示全局

||字符|单词|行|
| ------| ----| ----| --|
|复制|yl|yw|yy|
|剪切|x|dw|Dd|
|粘贴·|p|p|P|

96. 复制和移动文本块：2 copy 15 第 2 行复制到 15 行之后
97. :1,6 copy 16 将 1-6 行的文本块复制到 16 行
98. :8,13 move 23 将 8-13 的文本块移动到 23 行之后
99. ·删除单个字符：x     7x（删除光标后的 7 个字符）
100. 删除单个单词：dw  删除多个单词：2dw
101. 删除单行：dd 删除光标后的部分内容 D
102. 删除光标到某字符间内容:dfy（删除光标后到 y 的内容）
103. 3dd 删除光标后 3 行内容
104. :2d  删除第二行内容
105. :1,4d 删除 1-4 行内容
106. ;1,\$d 删除全部
107. 重复删除：.
108. 撤销 u  撤销一行上所有修改 U
109. 更改 vi 编辑器设置\*\*\*\*\*
110. 显示行号： :set number / :set nonumber
111. 字符缩进： :set autoindent  / :set noautoindent
112. 显示编辑状态： :set showmode  / :set noshowmode
113. 搜索时忽略大小写：:set ignorecase / :set noignorecase
114. 显示何隐藏特殊字符：:set list / :set nolist
115. 特殊字符匹配：:set showmatch / :set noshowmatch
116. 显示；长文本行：:set wrapmargin\=10   :set wrapmargin \=0
117. 查看编辑器当前设置：:set all
118. **编辑器配置文件：.vimrc**
119. 按多列格式输出：column ex02 | more   用 column 程序显示文件内容
120. 按不同行列：column-x  ex02 | more
121. 在多个文件中查找：grep string file1 file2   (string 为待查找内容
122. 在当前目录下所有文件中查找：grep computer \*
123. 在文件中查找多个单词：grep ‘joy chen’ exam\_01    grep -i  ‘joy chen’ exam\_01 忽略大小写
124. 输出不包含目标字符串的行：grep -v  joy eam\_01
125. 输出包含目标字符串·的文件名：grep -i joy eam\_01
126. 输出包含目标字符串的行和行号：grep -n  joy eam\_01
127. 查找以某字符开头的行：grep ‘\^a’ eam\_01
128. 查找以某字符结尾 grep ‘t\$’ eam\_01
129. 查找指定长度得行：grep ‘\^……\$’ exam\_01  (6 个字符的行
130. 基本数学运算：bc  退出：quit
131. linux 中复制当前目录中的目录到当前目录并重命名 cp -r source\_dir target\_dir  -r 选项表示递归复制，即复制整个目录及其子目录和文件。
132. 文件内容排序：先决条件：设置系统环境；
133. 系统环境：bash/ksh 中：输入 export LC\_ALL \= “POSIX”,csh/tcsh 中: setenv LC\_ALL\=“POSIX“
134. 对文件内容进行排序：sort ex0504\_01\_sort
135. 对文件内容不区分字母大小写排序： -f 忽略大小写 sort -f ex0504\_01\_sort
136. 对文件内容反向排序：sort -r ex0504
137. 对文件内容按数值大小排序：sort ex0405 (按照 ASSCII 升序) sort -n ex0506 按照数值大小升序
138. 将文件内容 2 按照某字段排序：如果该字段重复，根据重复字段的下一字段排序，

sort -k 2 ex0506   根据第 2 列排序，重复按照第 3 列排序。

139. sort -k 2 -t: ex0506  按照 ex0506 中第二列冒号后的值进行排序；
140. 对文件排序后重写：写入新文件需要参数原文件不需要，\>全新写入：写入之前，文件内容会被清空，\>\>追加：要带 -o 否则写入为空
141. 将排序结果全新写入 sort ex0506 \> ex0607
142. 查看文件：more ex0607
143. 将文件排序后重写：sort -o ex0506 \> ex0607 重写在当前文件，**不写-o 输入为空**
144. 文件内容比较：行之间关系：相邻重复、相邻不重复、不相邻重复、不相邻不重复
145. 显示相邻重复次数：uniq  **-c** ex0506
146. 查看相邻重复行的其中一行：uniq  **-d** ex0506
147. 查看不相邻不充分的行：uniq  **-u** ex0506
148. 识别和删除所有重复行：sort ex0506 | uniq
149. 按行比较两个文件：比较之前需要排序： sort -o ex0501 ex0501

      sort -o ex0502 ex0502

      comm ex0501 ex0502
150. comm 结果解释：第一列为第一个文件独有的，第二列为第二个文件独有的，第三列为共有的
151. 查看文件不同之处：diff ex0501 ex0502
152. **解释比较结果***：c：修改 d：删除   a：添加**   **&lt;:前一文件**   **&gt;:后一文件**
153. 将文件中 r 全部替换为 R:  tr ‘r’ ‘R’ \<ex0506
154. 将 p 替 P、e 替 E、-替，、tr ‘pe-’ ‘PE,’\<ex0506
155. 按照范围替换：a-g 替换为 A-G：tr ‘[a-g]’‘[A-G]’\<ex0506
156. 删除指定字符：删除文件中所有 o：tr  **-d** ‘o’\<ex0506
157. 删除重复字符或多余空格：tr  **-s**‘ ‘\<ex0506
158. | 为管道符，左侧命令的输出，会作为右侧命令的输入
159. 对文件进行连续编号，并将所有内容变为大写：cat -n filename | tr ‘[a – z]’ ‘[A – Z]’
160. 将文件按第一个字母排序，删除重复空格：sort filename | tr -s ‘ ‘
161. 替换单词:sed ‘s/world/free/’  其中 s 指替换每一行的第一个，world 替换为 free
162. 文中所有包含 court 的行中 world 替换为 free：sed ‘/court/s/world/free/g’ filename
163. 所有 sed ‘s/court/free/g’ filename
164. 包含 world 的行全部删除：sed ‘/world/d’ filename
165. 删除第 4 行：sed ‘4d’ filename
166. 将 c 开头的全部 world 替换为 free：sed ‘/\^c/s/world/free filename
167. 删除 f 结尾的行：sed ‘/f\$/d’ filename
168. 将 sed ‘s/world/& hight/g filename 将 world 替换为 hight  &代表被替换单词
