---
title: 学习python高级语法特性例题笔记

index: true
order: 6
isOriginal : true
category:
  - python
  - 编程开发
tag:
  - python高级特性
---

#### 1.面向对象


```python
from types import new_class


class Student:
    student_num = 0  # 在类下面定义的变量为类变量

    def __init__(self,name,sex):  #构造方法，也就是构造函数，是用来初始化对象的。在构造函数中定义的变量，通常指的是在构造函数内部声明的变量
        self.name = name
        self.sex = sex
        # self.student_num += 1
        Student.student_num += 1 #通过类名来访问，每创建一个学生，学生数量+1

    @classmethod #类方法使用使用装饰器classmethod
    def add_student(cls,add_num):  # 类方法的第一个参数需要类本身,可以访问到类方法类变量
        cls.student_num += add_num

    @classmethod
    def from_string(cls,info):  # 使用类方法代替构造方法是一种常用的方法
        name,sex = info.split(' ')
        return cls(name,sex)

    @staticmethod # 静态方法 寄宿在类里不能访问类里的内容，但需要在类里面
    def name_len(name):
        return len(name)

s1 =  Student('Qiqi','Female')
s2 = Student.from_string('Qiqi Female')
print(f'Student.student_num:{Student.student_num}')
print(f's1.student_num:{s1.student_num}')
print(f's2.name:{s2.name},s2.name.len:{Student.name_len(s2.name)}')

```

    Student.student_num:2
    s1.student_num:2
    s2.name:Qiqi,s2.name.len:4
    

#### 局部变量的特性：
作用域：仅在该构造方法内部有效，无法被类中的其他方法访问。
生命周期：随着构造方法的调用而创建，方法执行结束后自动销毁。
存储位置：存放在栈内存中。
#### 与成员变量的核心区别：
成员变量在类中声明（类体内部、方法外部），作用域覆盖整个类。
局部变量在方法（含构造方法）内部声明，仅限方法内使用。

#### 2.推导式
是一种简洁的语法结构，用于快速创建列表、字典、集合等数据结构。推导式通过一行代码即可生成新的序列，避免了显式的循环和条件判断，使代码更加简洁易读。


```python
# 例一：常规方法复制一个列表
nums = [1,2,3,4,5,6,7,8,9]
my_list = []
for i in nums:
    my_list.append(i)
print(my_list)
```

    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    


```python
# 例一：推导式复制一个列表
my_list = [i for i in nums]
print(my_list)
```

    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    


```python
# 例二：常规方法计算一个列表
nums = [1,2,3,4,5,6,7,8,9]
my_list = []
for i in nums:
    my_list.append(i**2)
print(my_list)
```

    [1, 4, 9, 16, 25, 36, 49, 64, 81]
    


```python
# 例二：推导式计算一个列表
my_list = [i**2 for i in nums]
print(my_list)
```

    [1, 4, 9, 16, 25, 36, 49, 64, 81]
    


```python
# 例三：常规方法计算一个列表偶数的平方
nums = [1,2,3,4,5,6,7,8,9]
my_list = []
for i in nums:
    if i % 2 == 0:
        my_list.append(i**2)
print(my_list)
```

    [4, 16, 36, 64]
    


```python
# 例三：推导式计算一个列表偶数的平方
my_list = [i**2 for i in nums if i % 2 == 0]  # 这里是先 for 后 条件
print(my_list)
```

    [4, 16, 36, 64]
    


```python
# 例四：常规方法计算一个列表偶数的平方奇数的立方
nums = [1,2,3,4,5,6,7,8,9]
my_list = []
for i in nums:
    if i % 2 == 0:
        my_list.append(i**2)
    else:
        my_list.append(i**3)
print(my_list)
```

    [1, 4, 27, 16, 125, 36, 343, 64, 729]
    


```python
# 例四：推导式计算一个列表偶数的平方奇数的立方
my_list = [i**2 if i % 2 == 0 else i**3 for i in nums]  # 注意：这里变成了先条件后for
print(my_list)
```

    [1, 4, 27, 16, 125, 36, 343, 64, 729]
    


```python
# 例五：常规方法创建字典
nums = [1,2,3,4,5,6,7,8,9]
letters = ['a','b','c','d','e','f','g','h','i']

my_dict = {}
for i,j in zip(nums,letters):  # zip 函数将 nums 和 letters 中的元素一一配对，生成一个可迭代的 zip 对象。
    # 例如，zip(nums, letters) 的结果类似于 [(1, 'a'), (2, 'b'), (3, 'c'), ...]。
    # 使用 for 循环遍历 zip 对象，每次取出一个元组 (i, j)，其中 i 是 nums 中的元素，j 是 letters 中的元素。
    my_dict[i] = j  # 将 i 作为键，j 作为值，存入字典 my_dict 中。
print(my_dict)
```

    {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i'}
    


```python
# 例五：推导式法创建字典
my_dict = {i:j for i,j in zip(nums,letters)}
print(my_dict)
```

    {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i'}
    


```python
# 例六：常规方法创建集合
l = [1,2,3,4,5,6,7,8,9]
my_set = set()  #创建一个空集合
for i in l:
    my_set.add(i)  #将元素 i 添加到集合 my_set 中。如果元素已经存在，集合不会重复添加（因为集合中的元素是唯一的）。
print(my_set)
```

    {1, 2, 3, 4, 5, 6, 7, 8, 9}
    


```python
# 例六：推导式方法创建集合
my_set = {i for i in l}
print(my_set)
```

    {1, 2, 3, 4, 5, 6, 7, 8, 9}
    

#### 3.生成器
生成器是一种特殊的迭代器，它通过 惰性计算 的方式生成值，而不是一次性将所有值存储在内存中。生成器使用 yield 关键字来返回值，并在每次调用时从上次暂停的地方继续执行。
- **生成器适合处理大量数据，因为它不会一次性将所有数据加载到内存中。**
- 生成器是一次性的，遍历结束后无法再次使用。
- 生成器不能通过索引访问元素，只能顺序遍历。


```python
# 1.使用生成器函数
def my_generator():
    yield 1
    yield 2
    yield 3

gen = my_generator()  # 生成器函数是一个包含 yield 关键字的函数。调用生成器函数时，它不会立即执行，而是返回一个生成器对象。
print(next(gen))  # 输出: 1
print(next(gen))  # 输出: 2
print(next(gen))  # 输出: 3
```

    1
    2
    3
    


```python
#2. 使用生成器推导式
gen = (x**2 for x in range(5))  #生成器表达式类似于列表推导式，但使用圆括号 () 而不是方括号 []。
print(gen)
print(next(gen))  # 输出: 0
print(next(gen))  # 输出: 1
print(next(gen))  # 输出: 4
```

    <generator object <genexpr> at 0x00000230FC54F5E0>
    0
    1
    4
    

生成器vs列表
|特性	|生成器	|列表|
|:------|:----:|:------:|
|内存占用|小（按需生成值）|大（一次性存储所有值）|
|计算方式|惰性计算（按需生成）|立即计算（一次性生成）|
|遍历次数|只能遍历一次|可以多次遍历|
|索引访问|不支持|支持|
|适用场景|大数据集、无限序列、流式处理 |小数据集、需要多次访问的场景|



```python
def square_number(nums):
    result = []
    for i in nums:
        result.append(i**i)
    return result

my_nums = square_number([1,2,3,4,5,6])
print(my_nums)
```

    [1, 4, 27, 256, 3125, 46656]
    


```python
def square_number(nums):
    for i in nums:
        yield i**i

my_gen = square_number([1,2,3,4,5,6])
print(my_gen)  # 打印的是生成器对象在内存的值/地址
```

    <generator object square_number at 0x00000230FC4EEC20>
    


```python
my_gen = square_number([1,2,3,4,5,6])
print('first next function: ',next(my_gen))
print('Then runing for loop')
for num in my_gen:
    print(num)
```

    first next function:  1
    Then runing for loop
    4
    27
    256
    3125
    46656
    


```python
# 推导式生成列表
my_list = [i*i for i in [1,2,3,4,5,6]]
print(my_list)
```

    [1, 4, 9, 16, 25, 36]
    


```python
my_gen = (i*i for i in [1,2,3,4,5,6])
print(my_gen)
```

    <generator object <genexpr> at 0x00000230FC4EEC20>
    

#### 4.匿名函数/lambda函数
匿名函数（Anonymous Function）是一种没有名称的函数，使用 lambda 关键字定义。匿名函数通常用于简化代码，尤其是在需要传递简单函数作为参数的场景中。

`lambda 参数1, 参数2, ... : 表达式`
- lambda 是定义匿名函数的关键字。
- 参数可以有多个，用逗号分隔。
- 表达式是函数的返回值，不需要写 return。


```python
# 传统函数
def add(a,b):
    return a+b
print(add(1,2))
```

    3
    


```python
# lambda函数
add = lambda a,b: a+b
print(add(1,2))
```

    3
    

lambda函数的一个重要作用是作为其他函数的参数使用


```python
# 在map函数中
my_list = [1,2,3,4,5,6,7,8,9]
new_list = list(map(lambda x:x**2,my_list)) # 将my_list数组元素作为x传入计算x**2的结果返回
print(new_list)
```

    [1, 4, 9, 16, 25, 36, 49, 64, 81]
    

将lambda作为字典的value来处理多个分支，这样就不用写else if了


```python
# eg. 对用户登陆进行判断等级后加相应积分
def user_logging(level):
    credits = 0
    if level == 1:
        credits += 2
    elif level == 2:
        credits += 5
    elif level == 3:
        credits += 10
    elif level == 4:
        credits += 15
    return credits
print(user_logging(3))
```

    10
    


```python
def user_logging(level, credits):
    # 定义等级与积分计算规则的映射
    level_credit_map = {
        1: lambda x: x + 2,
        2: lambda x: x + 5,
        3: lambda x: x + 10,
        4: lambda x: x + 15,
    }
    # 根据用户等级计算积分
    credits = level_credit_map[level](credits)
    return credits

# 示例调用
level = 2  # 用户等级
initial_credits = 100  # 初始积分
final_credits = user_logging(level, initial_credits)
print(final_credits)  # 输出: 105
```

    105
    
