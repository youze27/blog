---
title: 学习Mysql基础知识
index: true
order: 5
isOriginal : true
date: 2023-11-12
category:
  - 计网基础
tag:
  - 计网基础
  - Mysql
---

# MySQL环境

1. Windows 下检查是否安装：`mysql`
2. 注册 MySQL 为系统服务 开机自启  `mysqld install`
3. 初始化数据库：`mysqld --initialize-insecure`
4. 启动 mysql 服务：`net start mysql`
5. 停止 mysql 服务：`net stop mysql`
6. 修改默认账户密码：[`mysqladmin -u root password 123`]()   123 指默认管理员 root 账户密码。
7. 登录 mysql  ：`mysql -u root -p 123 `
8. 退出：`exit`

远程连接方式：mysql -u 用户名 -p 密码 [-h 服务器 ip -p 端口号]

# SQL语法

1. SQL 操作关系型数据库的编程语言，定义操作所有关系型数据库的统一标准。
2. 通用语法：可以单行或多行书写，`分号结尾`。Sql 语句可以使用空格/缩进来增强语句的可读性。
3. Mysql 数据库的语句 `不区分大小写`；单行注释使用--/#，多行注释/\*\*/
4. SQL 分类：DDL 数据库定义语言（定义库、表、字段）；DML 数据库操作语言（增删改）；DQL 数据库查询语言；DCL 数据库控制语言（用户、权限）；

# MySQL数据类型

| 类型         | 用途                            | 范围（无符号）                                                    |
| -------------- | --------------------------------- | ------------------------------------------------------------------- |
| TINYINT      | 小整数值                        | (0，255)                                                          |
| SMALLINT     | 大整数值                        | (0，65 535)                                                       |
| MEDIUMINT    | 大整数值                        | (0，16 777 215)                                                   |
| INT或INTEGER | 大整数值                        | (0，4 294 967 295)                                                |
| BIGINT       | 极大整数值                      | (0，18 446 744 073 709 551 615)                                   |
| FLOAT        | 单精度浮点数值                  | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                       |
| DOUBLE       | 双精度浮点数值                  | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) |
| DECIMAL      | 小数值                          | 依赖于M和D的值                                                    |
| <span data-type="text" style="background-color: var(--b3-font-background11);">DATE</span>             | 日期值                          | YYYY-MM-DD                                                        |
| <span data-type="text" style="background-color: var(--b3-font-background11);">TIME</span>             | 时间值或持续时间                | HH:MM:SS                                                          |
| <span data-type="text" style="background-color: var(--b3-font-background11);">YEAR</span>             | 年份值                          | YYYY                                                              |
| <span data-type="text" style="background-color: var(--b3-font-background11);">DATETIME</span>             | 混合日期和时间值                | YYYY-MM-DD hh:mm:ss                                               |
| TIMESTAMP    | 混合日期和时间值，时间戳        | YYYY-MM-DD hh:mm:ss                                               |
| <span data-type="text" style="background-color: var(--b3-font-background11);">CHAR</span>             | 定长字符串                      |                                                                   |
| <span data-type="text" style="background-color: var(--b3-font-background11);">VARCHAR</span>             | 变长字符串                      |                                                                   |
| TINYBLOB     | 不超过 255 个字符的二进制字符串 |                                                                   |
| TINYTEXT     | 短文本字符串                    |                                                                   |
| BLOB         | 二进制形式的长文本数据          |                                                                   |
| TEXT         | 长文本数据                      |                                                                   |
| MEDIUMBLOB   | 二进制形式的中等长度文本数据    |                                                                   |
| MEDIUMTEXT   | 中等长度文本数据                |                                                                   |
| LONGBLOB     | 二进制形式的极大文本数据        |                                                                   |
| LONGTEXT     | 极大文本数据                    |                                                                   |

# DDL（数据定义语言）

1. 显示所有数据库：`show databases；`
2. 使用/切换数据库：`use zhangDB;`
3. 创建数据库：`create database zhangDB; ` [`create database if not exists zhangDB;`]()
4. 删除数据库：`drop database zhangdb;`  `drop database if exists zhangdb;`
5. 查看当前在使用那个数据库：`select database();`
6. 创建表：`create table table_name(字段 1 类型 [约束] [comment 注释]，字段 1 类型 [约束] [comment 注释]...)[comment 注释]`

    ```python
    create table tb_emp
    (
        id          int auto_increment           primary key,
        username    varchar(20)                  not null comment '用户名',
        passworld   varchar(32) default '123456' not null comment '密码',
        name        varchar(10)                  not null comment '姓名',
        gender      tinyint unsigned             not null comment '性别 1男 2女',
        image       varchar(300)                 null comment '图片URL',
        job         tinyint unsigned             null,
        entrydate   date                         null comment '入职日期',
        create_time datetime                     not null comment '创建时间',
        update_time datetime                     not null comment '更新时间',
        qq          varchar(11)                  null comment 'QQ号'
    )
        comment '员工表';
    ```

7. 查看表结构：`show tables ;`
8. 查看指定表结构：`desc tb_emp;`
9. 查看数据库的建表语句：`show create table tb_emp;`
10. 添加字段：`alter table tb_emp add qq varchar(11) comment 'QQ号';`
11. 修改字段类型：`alter table tb_emp modify job tinyint unsigned ;`
12. 修改字段名：`alter table tb_emp change qq qq_num varchar(13) comment `'QQ';
13. 删除字段：`alter table tb_emp drop column qq_num;`
14. 修改表名：`rename table tb_emp to emp;     rename table emp to tb_emp;`

# DML（数据操纵语言）

1. 指定字段添加数据：`insert into 表名（字段名1，字段名2）value(值1，值2)；`
2. 全部字段添加数据：`insert into value（值1，值2...);`
3. 批量添加数据（部分字段）：`insert into 表名(字段名,字段名2)values(值1,值2),(值1,值2)；`
4. 批量添加数据（全部字段）：`insert  into 表名 values(value1,value2...),(value1,value2...)...;`

    ```python

    insert into tb_emp (username,name,gender,create_time,update_time) value ('zhnag','张有泽','1',now(),now());
    insert  into tb_emp (id,username,passworld,name,gender,image,job,entrydate,create_time,update_time) value (null,'YOU','123','李土豆','2','2.jpg',1,'2010-01-01',now(),now());
    insert  into tb_emp value (null,'YOU','123','周杰伦','2','2.jpg',1,'2010-01-01',now(),now());
    insert into tb_emp (username,name,gender,create_time,update_time) value ('liu','鲁智深','1',now(),now()),('libai','李白','1',now(),now());
    insert  into tb_emp value (null,'YOU','123','周杰伦','2','2.jpg',1,'2010-01-01',now(),now());
    insert  into tb_emp value (null,'me','234','薛之谦','2','3.jpg',1,'2010-01-01',now(),now()),(null,'LH','345','鹿晗','2','3.jpg',1,'2010-01-01',now(),now());
    ```
5. 修改数据：`update table_name set key_name=value1,key2=value2,....[where 条件]`

    ```python
    #update
    # 将id 为 1的员工姓名设置为”欧阳娜娜“
    update tb_emp set username='yang', name = '欧阳娜娜',update_time = now() where id = 1;
    #将所有员工入职日期更新
    update tb_emp set entrydate = '2020-02-02',update_time=now();

    ```

# DQL（数据查询语言）

1. 查询多个字段：select 字段1，字段2，字段3 from 表名；

    `select id, username, password, name, gender, image, job, entrydate, create_time, update_time from emp;`
2. 查询所有字段：`select * from 表名；`
3. 设置别名：select 字段1[as 别名1]，字段2[as 别名2] form 表名；

    `select name as '姓名' ,entrydate as '入职日期' from emp ;`
4. 去除重复记录：select distinct 字段列表 from 表明；

    `select distinct job from emp;`
5. 分组查询:

    <span data-type="text" style="color: var(--b3-font-color6);">select</span> 字段列表 <span data-type="text" style="color: var(--b3-font-color6);">  from </span> 表名  [<span data-type="text" style="color: var(--b3-font-color6);">where </span>条件]  <span data-type="text" style="color: var(--b3-font-color6);">group by </span> 分组字段名  [ <span data-type="text" style="color: var(--b3-font-color6);">having  </span>分组后过滤条件];

    ```python
    -- 1. 查询指定字段 name,entrydate 并返回
    select name,entrydate from emp ;
    -- 2. 查询返回所有字段
    -- 方式一:  推荐 , 效率高 . 更直观
    select id, username, password, name, gender, image, job, entrydate, create_time, update_time from emp;


    -- 方式二:
    select * from emp;
    -- 3. 查询所有员工的 name,entrydate, 并起别名(姓名、入职日期)  --- as 关键字可以省略
    select name as '姓名' ,entrydate as '入职日期' from emp ;
    select name '姓名' ,entrydate '入职日期' from emp ;
    -- 4. 查询员工有哪几种职位(不要重复) -- distinct
    select distinct job from emp;

    --  =================== 条件查询 ======================
    -- 1. 查询 姓名 为 杨逍 的员工
    select * from emp where name = '杨逍';
    -- 2. 查询在 id小于等于5 的员工信息
    select * from emp where id <= 5;
    -- 3. 查询 没有分配职位 的员工信息  -- 判断 null , 用 is null
    select * from emp where job is null;
    -- 4. 查询 有职位 的员工信息  -- 判断 不是null , 用 is not null
    select * from emp where job is not null ;
    -- 5. 查询 密码不等于 '123456' 的员工信息
    select * from emp where password <> '123456';
    select * from emp where password != '123456';
    -- 6. 查询入职日期 在 '2000-01-01' (包含) 到 '2010-01-01'(包含) 之间的员工信息
    select * from emp where entrydate between '2000-01-01' and '2010-01-01' ;
    -- 7. 查询 入职时间 在 '2000-01-01' (包含) 到 '2010-01-01'(包含) 之间 且 性别为女 的员工信息
    select * from emp where (entrydate between '2000-01-01' and '2010-01-01') and  gender = 2;
    -- 8. 查询 职位是 2 (讲师), 3 (学工主管), 4 (教研主管) 的员工信息
    select * from emp where job = 2 or job = 3 or job = 4;
    select * from emp where job in (2,3,4);
    -- 9. 查询姓名为两个字的员工信息  一个下划线代表一个字符
    select * from emp where name like '__';
    -- 10. 查询姓 '张' 的员工信息  ---------> 张%
    select * from emp where name like '张%';
    -- 11. 查询姓名中包含 '三' 的员工信息
    select * from emp where name like '%三%';
    ```

    ```python
    --  =================== 排序查询 ======================
    -- 1. 根据入职时间, 对员工进行升序排序  -- 排序条件
    select * from emp order by entrydate asc ; -- 默认升序, asc可以省略的
    select * from emp order by entrydate ;
    -- 2. 根据入职时间, 对员工进行降序排序
    select * from emp order by entrydate desc;
    -- 3. 根据 入职时间 对公司的员工进行 升序排序 ， 入职时间相同 , 再按照 ID 进行降序排序
    select * from emp order by entrydate asc , id desc ;
    -- 练习 : 员工管理列表查询 , 根据最后操作时间, 进行倒序排序
    -- 条件 : name , gender , entrydate
    select * from emp where name like '%张%' and gender = 1 and entrydate between '2000-01-01' and '2010-01-01' order by update_time desc;
    --  =================== 分页查询 ======================
    -- 1. 查询第1页员工数据, 每页展示10条记录
    select * from emp limit 0,10;
    select * from emp limit 10;
    -- 2. 查询第2页员工数据, 每页展示10条记录
    select * from emp limit 10,10;
    -- 公式 : 页码 ---> 起始索引  ------->  起始索引 = (页码 - 1) * 每页记录数

    ```