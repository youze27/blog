---
title: 学习python基础语法特性解题笔记
index: true
order: 2
isOriginal : true
date: 2023-12-10
category:
  - python
  - 编程开发
tag:
  - 计网基础
  - python
---
**使用输入函数input输入人的身高、体重。计算BMI值，并输出。 BMI=体重/身高的平方**

```python
height = float(input("请输入身高：")) 
weight = int(input("请输入体重：")) 
BMI = weight / (height * height) 
print("你的BMI是：", BMI)
```

**List item已知温度转换的公式是 C=（F-32）/1.8F=C*1.8+32输入一个摄氏温度以C或c结尾,转换成华氏温度。输入一个华氏温度以F或f结尾,转换成摄氏温度。**

```python
temp = input("请输入摄氏或华氏温度：")
#切出最后一位用来判断是华氏还是摄氏
last = temp[-1]
print(last)
temp_number = float(temp[:-1])
if (last == 'f' or last == 'F'):
    C = (temp_number - 32) / 1.8
    print("华氏转摄氏温度为：", C ,'C')

elif (last == 'c' or last == 'C'):
    F = temp_number * 1.8 + 32
    print("摄氏转华氏温度为：", F ,'F')
else:
    print("输入温度格式不对")
```

**使用range函数生成1到100（包含100）之间的偶数数列。使用range函数生成20到0（）包含0）的整数数列。**

* 使用列表推导式生成偶数数列

```python
even_numbers = [i for i in range(1, 101) if i % 2 == 0] print(even_numbers)
```

* 使用range函数生成递减的整数数列

```python
 decreasing_numbers = list(range(20, -1, -1))
 print(decreasing_numbers)
```

**计算圆的周长、面积和球体的表面积、体积。**

```python
 r = int(input("半径："))
PI = 3.1415926
print("圆的周长为：", round(2 * PI * r, 2))
print("圆的面积为：", round(PI * r * r, 2))
print("球的表面积为：", round(4 * PI * pow(r, 2), 2))
print("球的体积为：", round((4 / 3) * PI * pow(r, 3), 2))
```

```python
import random
from functools import reduce
```

**输入一个整数，以列表的形式输出每一位，并输出列表的和。**

```python
 number = int(input("请输入一个整数: "))
 numberList = list(map(int, str(number)))
 print("每一位组成的列表:", numberList)
 listSum = sum(numberList)
 print("列表的和:", listSum)
```

> 请输入一个整数: 233
> 每一位组成的列表: [2, 3, 3]
> 列表的和: 8

**输入一个整数，输出对应的二进制、八进制、十六进制。**

```python
 scale = int(input("输入一个整数: "))
 print("转二进制：", bin(scale))
 print("转八进制:", oct(scale))
 print("转十六进制：", hex(scale))
```

> 请输入一个整数: 234
> 转二进制为： 0b11101010
> 转八进制为: 0o352
> 转十六进制为： 0xea

**输入一些整数，以逗号分隔，计算并输出这些数的平均值。**

```python
 averageStr = input("请输入一些整数，以逗号分隔：")
 averageList = list(map(int, averageStr.split(',')))
 print("平均值为：", sum(averageList)/len(averageList))
```

> 请输入一些整数，以逗号分隔：12,12,34
> 平均值为： 19.333333333333332

**以列表的形式输入一些整数，计算并输出这些数的平均值、最大值、最小值。**

```python
 from statistics import mean
 listStr = input("请输入列表[xOne,xTow,...]：")
 listNumber = eval(listStr)  eval像什么转什么，字符串转列表
 print("平均值", mean(listNumber))
 print("最大值", max(listNumber))
 print("最小值", min(listNumber))
```

> 请输入列表[xOne,xTow,...]：[11,22,33]
> 平均值 22
> 最大值 33
> 最小值 11

**以列表的形式输入一些整数，降序输出。**

```python
 listStr = input("请输入列表[xOne,xTow,...]：")
 listNumber = eval(listStr)  eval像什么转什么，字符串转列表
 print(sorted(listNumber, reverse=True))
# reverse：一个布尔值，表示排序是降序还是升序。
# 默认为 False，表示升序排序；
# 如果为 True，则进行降序排序。
```

> 请输入列表[xOne,xTow,...]：[11,22,33,44,12,45,90,67]   [90, 67, 45, 44,
> 33, 22, 12, 11]

**编写程序，输入两个各包含2个实数的列表，分别表示点的坐标，计算两点间的欧式距离和曼哈顿距离。**

```python
 point1 =list(map(float, input("请输入第一个逗号分割的点坐标：").split(',')))
 point2 =list(map(float, input("请输入第二个逗号分割的点坐标：").split(',')))
 import math
 def euclidean_distance(point1, point2):   计算欧式距离
     xOne, y1 = point1
     xTow, y2 = point2
     return math.sqrt((xTow - xOne) ** 2 + (y2 - y1) ** 2)
 def manhattan_distance(point1, point2):  计算曼哈顿距离
     xOne, y1 = point1
     xTow, y2 = point2
     return abs(xTow - xOne) + abs(y2 - y1)
 euc_dist = euclidean_distance(point1, point2)
 man_dist = manhattan_distance(point1, point2)
 print(f"两点间的欧式距离为: {euc_dist:.2f}")
 print(f"两点间的曼哈顿距离为: {man_dist:.2f}")  注意格式化有大括号和f
```

> 请输入第一个逗号分割的点坐标：2,3
> 请输入第二个逗号分割的点坐标：4,5
> 两点间的欧式距离为: 2.83
> 两点间的曼哈顿距离为: 4.00

**输入一个列表，如果列表全为真，输出True，否则输出False**

```python
 listStr = input("请输入列表[xOne,xTow,...]：")
 print(all(eval(listStr)))  eval像什么转什么，字符串转列表
```

> 请输入列表[xOne,xTow,...]：[1,2,3,4,5]
> True

**输入一个列表，如果列表中有一个为真，输出True,否则输出False**

```python
 listStr = input("请输入列表[xOne,xTow,...]：")
 print(any(eval(listStr)))  eval像什么转什么，字符串转列表
```

> 请输入列表[xOne,xTow,...]：[1,2,3,4,5,6]
> True

**输入一个整数，输出整数分离后的和。例如输入1234，输出10**

```python
 number = int(input("请输入一个整数: "))
 print("列表的和:", sum(list(map(int, str(number)))))
```

> 请输入一个整数: 234567
> 列表的和: 27

**输入一个整数，输出分离后的整数，以逗号分隔。例如输入1234，输出：1,2,3,4**

```python
 number = int(input("请输入一个整数: "))
 print(','.join(str(number)))
```

> 请输入一个整数: 2023
> 2,0,2,3

**编写一个函数，测试字符串是否包含列表中某个元素作为子串**

```python
 def text(s, lst):
     for element in lst:
         if element in s:
             return True
     return False
 s = "Hello, world!"   s里包含Hello
 lst = ["python", "Hello"]
 print(text(s, lst))
```

> True

**生成一个1到1e20的随机整数，对这个数进行分离，依次输出每位数，用逗号分隔。**

```python
 def randomFun():
     number = random.randint(0,9)
     return number
 number = randomFun()
 while number==0:
     number = randomFun()
 print(number)
 #-----------------以上为确保第一位不为0------------
 listOne =[random.randint(0, 9) for _ in range(19)]  #使用列表生成式生成19个0到9的随机整数
 print(listOne)
 print([number]+listOne) # []是让数值变为列表类型
```

> 1
> [9, 7, 1, 2, 3, 6, 8, 9, 2, 5, 1, 8, 4, 5, 7, 5, 2, 1, 9]
> [1, 9, 7, 1, 2, 3, 6, 8, 9, 2, 5, 1, 8, 4, 5, 7, 5, 2, 1, 9]

**用列表生成式，随机生成20个0到100的整数，分别计算平均值、最大值、最小值。**

```python
 random_number = [random.randint(0, 100) for _ in range(20)]  使用列表生成式生成20个0到100的随机整数
 print("平均值:", sum(random_number) / len(random_number))
 print("最大值:", max(random_number))
 print("最小值:", min(random_number))
```

> 平均值: 45.7
> 最大值: 94
> 最小值: 1

**用列表生成式，随机生成4x5的列表，即该列表有5个元素，每个元素是一个列表，列表含有4个元素。分别求最大的列表，和求和最大的列表，并输出。**

```python
 import random
 # 随机生成4x5的列表，每个子列表包含4个随机整数
 matrix = [[random.randint(0, 100) for _ in range(4)] for _ in range(5)]
 # 分别用于存储包含最大元素的子列表和元素和最大的子列表
 maxList = None
 maxSumList = None
  #用于存储最大元素值和最大元素和
 max_element_value = float('-inf')
 max_sum_value = float('-inf')
 for sublist in matrix:
      #计算当前子列表的元素和
     current_sum = sum(sublist)
     # 检查当前子列表是否包含最大元素
     if max(sublist) > max_element_value:
         max_element_value = max(sublist)
         maxList = sublist
         # 检查当前子列表的元素和是否最大
     if current_sum > max_sum_value:
         max_sum_value = current_sum
         maxSumList = sublist
 print("包含最大元素的子列表:", maxList)
 print("元素和最大的子列表:", maxSumList)
```

> 包含最大元素的子列表: [58, 97, 59, 77]
> 元素和最大的子列表: [58, 97, 59, 77]

**任意输入3个英文单词，以空格分隔分隔，输出字符串长度最大的。**

```python
 words = input("请输入3个英文单词，以空格分隔：").split()
 if len(words) != 3:
     print("请输入3个单词！")
 else:
     maxLen = 0
     max_word = ""
     for word in words:
         if len(word) > maxLen:
             maxLen = len(word)
             max_word = word
     print("字符串长度最大的单词是：", max_word)
```

> 请输入3个英文单词，以空格分隔：hello world youzezhang
> 字符串长度最大的单词是： youzezhang

**随机生成10个整数，分别按字符的字典顺序、按长度、转换为整数比较大小。   Key**

```python
 integers = [random.randint(1, 100) for _ in range(10)]
 strings = [str(i) for i in integers]
 print("按字符的字典顺序排序:", sorted(strings))
 print("按长度排序:", sorted(strings, key=len))
 print("按整数大小排序:", sorted(integers))
```

> 按字符的字典顺序排序: ['30', '36', '46', '47', '52', '63', '64', '64', '74', '84']
> 按长度排序: ['30', '46', '74', '36', '64', '63', '47', '84', '64', '52']
> 按整数大小排序: [30, 36, 46, 47, 52, 63, 64, 64, 74, 84]

**随机生成两个长度为10列表，将两个列表对应位置的数相加；将两个列表对应位置的数相乘；将两个列表对应位置的数相乘后得到的列表求和（向量内积）。**

```python
 integers1 = [random.randint(1, 10) for _ in range(10)]
 integers2 = [random.randint(1, 10) for _ in range(10)]
 print("列表1：", integers1)
 print("列表2：", integers2)
 listSun = [a + b for a, b in zip(integers1, integers2)]
 print("相加后的列表:", listSun)
 productLIst = [a * b for a, b in zip(integers1, integers2)]
 print("相乘后的列表:", productLIst)
 print("列表求和:", sum(productLIst))
```

> 列表1： [1, 9, 2, 4, 4, 3, 9, 10, 8, 4]
> 列表2： [5, 5, 7, 5, 10, 1, 1, 8, 6, 10]
> 相加后的列表: [6, 14, 9, 9, 14, 4, 10, 18, 14, 14]
> 相乘后的列表: [5, 45, 14, 20, 40, 3, 9, 80, 48, 40]
> 列表求和: 304

**用range函数生成首项为1，公差为3，小于50的等差数列。用reduce函数求该数列的和。**

```python
 from functools import reduce
 numberList = range(1, 50, 3)
 numberSum = reduce(lambda x, y: x + y, numberList)
 print("等差数列:", list(numberList))
 print("数列和:", numberSum)
```

> 等差数列: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]
> 数列和: 425

用range函数生成1到10的数字，计算这些数字的乘积。随机生成三个小于10的整数，计算这些数字的乘积。

```python
 numberList = range(1, 11, 1)
 numberListTow = random.choices((range(1, 11, 1)), k=3)
 print("1到10的数字:", list(numberList))
 print("1-10的3个数字:", list(numberListTow))
 numberSum = reduce(lambda x, y: x * y, numberList)
 numberSumTow = reduce(lambda x, y: x * y, numberListTow)
 print("数字乘积:", numberSum)
 print("1-10的3个数字乘积:", numberSumTow)
```

> 1到10的数字: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> 1-10的3个数字: [10, 6, 1]
> 数字乘积: 3628800
> 1-10的3个数字乘积: 60

**随机生成200个在[0到100]的整数，并把奇数放到一个列表中，偶数放到另一个列表中，计算奇数和偶数的个数。**

```python
integers1 = [random.randint(1, 101) for _ in range(200)]
 odd_number = []
 even_number = []
 for number in integers1:
     if number % 2 == 0:
         even_number.append(number)
     else:
         odd_number.append(number)
 print("200个随机数：", integers1)
 print("奇数列表：", odd_number)
 print("偶数列表：", even_number)
 print("奇数个数：", len(odd_number))
 print("偶数个数：", len(even_number))
 
  #200个随机数： [42, 37, 100, 4, 13, 87, 46, 89, 61, 20, 7, 22, 84, 86, 9, 31, 20, 94, 40, 65, 93, 23, 22, 24, 71, 49, 67, 43, 48, 14, 72, 53, 31, 82, 17, 43, 7, 67, 15, 66, 45, 41, 6, 73, 9, 92, 80, 27, 39, 53, 10, 64, 11, 67, 67, 26, 60, 99, 72, 100, 86, 37, 99, 55, 45, 79, 32, 100, 97, 56, 47, 39, 29, 88, 14, 94, 32, 84, 52, 59, 86, 17, 41, 66, 61, 53, 45, 16, 35, 80, 10, 38, 67, 16, 72, 99, 85, 36, 70, 65, 23, 67, 101, 63, 33, 39, 77, 95, 61, 35, 38, 85, 71, 1, 29, 12, 96, 49, 29, 34, 53, 71, 8, 25, 80, 54, 87, 14, 2, 27, 63, 51, 36, 79, 5, 93, 43, 9, 57, 17, 15, 38, 22, 60, 88, 27, 92, 1, 52, 18, 85, 52, 93, 99, 75, 32, 15, 62, 30, 79, 53, 38, 45, 63, 1, 1, 96, 1, 13, 46, 81, 49, 82, 41, 95, 37, 2, 73, 13, 5, 65, 13, 73, 22, 39, 31, 41, 51, 90, 5, 30, 3, 93, 66, 69, 92, 22, 48, 65, 68]
  #奇数列表： [37, 13, 87, 89, 61, 7, 9, 31, 65, 93, 23, 71, 49, 67, 43, 53, 31, 17, 43, 7, 67, 15, 45, 41, 73, 9, 27, 39, 53, 11, 67, 67, 99, 37, 99, 55, 45, 79, 97, 47, 39, 29, 59, 17, 41, 61, 53, 45, 35, 67, 99, 85, 65, 23, 67, 101, 63, 33, 39, 77, 95, 61, 35, 85, 71, 1, 29, 49, 29, 53, 71, 25, 87, 27, 63, 51, 79, 5, 93, 43, 9, 57, 17, 15, 27, 1, 85, 93, 99, 75, 15, 79, 53, 45, 63, 1, 1, 1, 13, 81, 49, 41, 95, 37, 73, 13, 5, 65, 13, 73, 39, 31, 41, 51, 5, 3, 93, 69, 65]
  #偶数列表： [42, 100, 4, 46, 20, 22, 84, 86, 20, 94, 40, 22, 24, 48, 14, 72, 82, 66, 6, 92, 80, 10, 64, 26, 60, 72, 100, 86, 32, 100, 56, 88, 14, 94, 32, 84, 52, 86, 66, 16, 80, 10, 38, 16, 72, 36, 70, 38, 12, 96, 34, 8, 80, 54, 14, 2, 36, 38, 22, 60, 88, 92, 52, 18, 52, 32, 62, 30, 38, 96, 46, 82, 2, 22, 90, 30, 66, 92, 22, 48, 68]
  #奇数个数： 119
  #偶数个数： 81
```

**随机生成两个长度为10列表，用zip函数把两个列表压缩。**

```python
 integers1 = [random.randint(1, 100) for _ in range(10)]
 print(list(integers1))
 integers2 = [random.randint(1, 100) for _ in range(10)]
 print(list(integers2))
 zip1 = zip(integers1, integers2)
 print(list(zip1))
```

> [19, 49, 99, 62, 71, 41, 43, 4, 58, 85]
> [49, 96, 38, 94, 42, 65, 61, 16, 36, 2]
> [(19, 49), (49, 96), (99, 38), (62, 94), (71, 42), (41, 65), (43, 61), (4, 16), (58, 36), (85, 2)]

**编写程序，输入一个正整数，然后输出各位数字之和。**

```python
 number = int(input("请输入一个正整数: "))
 if number > 0:
     print("列表的和:", sum(list(map(int, str(number)))))
 else:
     print("输入的不是正整数")
```

**编写程序，输入一个字符串，输出翻转（首尾交换）后的字符串，要求使用内置函数来实现。例如，12345，输出54321**

```python
  s = input("请输入一个字符串: ")
  print("翻转后的字符串是: ", s[::-1])
```

> 请输入一个字符串: dwjefkelf
> 翻转后的字符串是:  flekfejwd

**编写程序，输入一个包含若干整数的列表，输出列表中，最大值。**

```python
number = input("请输入列表空格分隔: ").split( )
 max_number = max(list(map(int, number)))
 print(max_number)
```

**编写程序，输入一个包含若干整数的列表，把列表中所有整数转换为字符串，然后输出包含这些字符串的列表。**

```python
listStr = eval(input("请输入列表[xOne,xTow,...]："))
print(list(map(str,listStr)))
```

**编写程序，输入一个包含若干任意数据的列表，输出该列表中等价于True的元素组成的列表。例如，输入[1,2,0,[]]，输出[1,2]**

```python
 number = input("请输入任意数据类型的列表空格分隔: ").split( )
 listOne = [eval(number) for number in number]
 print(listOne)
 listTow = [item for item in listOne if item]  item被放入列表值  if item 求布尔
 print(listTow)
```

> 请输入任意数据类型的列表空格分隔: [] 0 8 9 90 6 8
> [[], 0, 8, 9, 90, 6, 8]
> [8, 9, 90, 6, 8]

**编写程序，输入一个包含若干整数的列表，输出一个只包含奇数的新列表。**

```python
import math
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 oddNumber = [item for item in number if item % 2 == 1]
 print(oddNumber)
```

> 请输入列表空格分隔: 1 2 3 4 5 6
> [1, 3, 5]

**编写程序，输入一个包含若干整数的列表，输出一个只包含偶数的新列表。**

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 evenNomber = [item for item in number if item % 2 == 0]
 print(evenNomber)
```

> 请输入列表空格分隔: 1 2 3 4 5 6
> [2, 4, 6]

**编写程序，输入一个包含若干整数的列表，输出一个一个新列表，列表中奇数在前前偶数在后，并且奇数之间的相对顺序不变，偶数之间的相对顺序也不变。**

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 oddNumber = [item for item in number if item % 2 == 1]
 ouhsu = [item for item in number if item % 2 == 0]
 heb = oddNumber + ouhsu
 print(heb)
```

> 请输入列表空格分隔: 1 2 3 4 5 6 7 8 9
> [1, 3, 5, 7, 9, 2, 4, 6, 8]

**输入一个包含若干自然数的列表，输出这些自然数的平均值，结果保留3小数。**

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 avg = round(sum(number)/len(number),3)
 print(avg)
```

> 请输入列表空格分隔: 1 2 3 4 5 4 3 2 1
> 2.778

**输入一个包含若干自然数的列表，输出这些自然数降序排列后的新列表。**

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 sort = sorted(number,reverse=True)
 print(sort)
```

> 请输入列表空格分隔: 54675678 33 21312 6786
> [54675678, 21312, 6786, 33]

**输入一个包含若干自然数的列表，输出一个新列表，新列表中每个元素为原列表中每个自然数的位数。**

```python
 number = input("请输入列表空格分隔: ").split()
 len_list = [len(item) for item in number]
 print(len_list)
```

> 请输入列表空格分隔: 23234 34 56 7 88 987
> [5, 2, 2, 1, 2, 3]

**输入一个包含若干数字的列表，输出其中绝对值最小的数字。**

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 abs_list = [abs(item) for item in number]
 min_number = min(abs_list)
 print(min_number)
```

> 请输入列表空格分隔: 11 -11 2 3 -1 34
> 1

**输入一个包含若干整数的列表，输出这些整数的乘积**。

```python
 number = input("请输入列表空格分隔: ").split()
 number = list(map(int, number))
 chen =1
 for number in number:
     chen *=number
 print(chen)
```

> 请输入列表空格分隔: 4 5 5
> 100

**输入两个包含若干整数的等长列表，把这两个列表看作两个向量，输出这两个向量的内积。**

```python
 numberOne = list(map(int, (input("请输入列表空格分隔: ").split())))
 numberTow = list(map(int, (input("请输入列表空格分隔: ").split())))
 if len(numberOne) == len(numberTow):
     sum = sum(a * b for a, b in zip(numberOne, numberTow))
     print(sum)
 else:
     print("不等长")
```

> 请输入列表空格分隔: 1 2 3 4 5 6
> 请输入列表空格分隔: 6 5 4 3 2 1
> 56

**输出奇数索引元素**

```python

num = [2,5,8,1,5,8,9,3,6]
print(num[1::2])
[5, 1, 8, 3]
```

**输出列表中奇数**

```python
 num = [1,3,7,9,2,5,8,3,7,8,3,6,9,5]
 for i in num:
     if i%2==1:
         print(i,end=',')
```

> 1,3,7,9,5,3,7,3,9,5,

**将元素*2**

```python
 print([i*2 for i in range(1,11)])
```

> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

**键盘输入 5 个数判断是否是回文**

```python
 num = list(input("请输入数"))
 nums = list(reversed(num))
 print(nums)
 print(num)
 for i in num:
     for j in nums:
         if i==j:
             tag = 0
         else:
             tag =1
 if tag:
     print("不是回文")
 else:
     print("是回文")
```

> 请输入数 12345
> ['5', '4', '3', '2', '1']
> ['1', '2', '3', '4', '5']
> 不是回文

> ['1', '2', '3', '2', '1']
> ['1', '2', '3', '2', '1']
> 是回文

**生成一个包含个整数的随机列表，对偶数索引进行降序排列，奇数索引的元素不变**

```python
 lst=random.choices(range(1,100),k=20)
 print("随机生成20个1~100的数字：\n",lst)
 list_one=lst[: : 2]
 list_tow=sorted(list_one,reverse=True)
 print(f"列表中偶数索引元素为{list_one}偶数降序排列为{list_tow}")
```

> 随机生成 20 个 1~100 的数字：
> [34, 12, 64, 72, 51, 23, 43, 88, 71, 81, 38, 34, 70, 97, 47, 77, 93, 15, 95, 6]
> 列表中偶数索引元素为[34, 64, 51, 43, 71, 38, 70, 47, 93, 95]偶数降序排列为[95, 93, 71, 70, 64, 51, 47, 43, 38, 34]

**nums=[2,7,11,15,1,8],找到列表中任意相加等于 9 的元素集合如[(0,9),(4,5)]**

```python
 nums=[2,7,11,15,1,8]
 lst=[(i,j)for i in nums for j in nums if i+j==9]
 print("找到的组合为",lst)
```

> 找到的组合为 [(2, 7), (7, 2), (1, 8), (8, 1)]

**序列**

**编写程序，将用户输入的数字转换成相应的中文大写数字。例如，1.23 转换为壹点贰叁。**

```python
 def f(num):
     chinese = {0: '零',1: '壹',2: '贰',3: '叁',4: '肆',5: '伍',6: '陆',7: '柒',8: '捌',9: '玖' }
     num_str = str(num)
     int_chinese = ''
     for i in num_str if '.' not in num_str else num_str.split('.')[0]:
         int_chinese += chinese[int(i)]
     decimal_chinese = ''
     if '.' in num_str:
         for i in num_str.split('.')[1]:
             decimal_chinese += chinese[int(i)]
     return '{}点{}'.format(int_chinese, decimal_chinese) if decimal_chinese else int_chinese
 input_num = float(input("请输入一个数字："))
 print(f(input_num))
```

> 请输入一个数字：100.918
> 壹零零点玖壹捌

**编写程序，随机生成 5 个 0~10 之间不相等的数。**

```python
 num_list = []
 num = random.randint(0, 10)
 num_list.append(num)
 while len(num_list) < 5:
     num = random.randint(0, 10)
     for i in num_list:
         if i == num:
             tag = 1
         else:
             tag = 0
     if tag == 0:
         num_list.append(num)
 print(num_list)
```

> [10, 6, 2, 9, 1]

**随机生成 6 位的验证码，验证码是小写字母、大写字母、数字三种类型中的一种。【数字 0**​<sub>**9;小写字母 a**</sub>​**z 的 ASCII 是 97**​<sub>**97+25;大写字母 A**</sub>​**Z 的 ASCII 是 65~65+25】**

```python
 num = [i for i in range(48,58)]
 s_str = [i for i in range(97, 97 + 26)]
 m_str = [i for i in range(65, 65 + 26)]
 list = []
 list.extend(num)
 list.extend(s_str)
 list.extend(m_str)
 for i in range(0, 6):
     check = random.choices(list)
      print(check,end='')
     print(chr(check[0]),end='')
```

> b1AQtc

**创建一个 20 以内奇数列表，计算列表中所有数的和。Sum(Range(1,20,2))**

```python
 sum = sum(range(1,20,2))
 print(sum)
```

> 100

**输入一个字符串和一个字符，计算字符在字符串的出现的次数。     Count()**

```python
 str = input("请输入一字符串:")
 for i in str:
     print(i, ':', str.count(i))
```

> 请输入一字符串:sdxsaxs
> s : 3
> d : 1
> x : 2
> s : 3
> a : 1
> x : 2
> s : 3

**将下面表格中的数据按成绩从高到低进行排序，输出排序结果。输出结果如下图所示。** 
姓名 成绩
吴忱 76
杨九莲    99
安芸芸    84
刘洋 70
兰成 89

```python
 data = [
     {"姓名": "吴忱", "成绩": 76},
     {"姓名": "杨九莲", "成绩": 99},
     {"姓名": "安芸芸", "成绩": 84},
     {"姓名": "刘洋", "成绩": 70},
     {"姓名": "兰成", "成绩": 89}
 ]
 sorted_data = sorted(data, key=lambda item: item['成绩'], reverse=True)
 print("排名\t姓名\t成绩")
 for index, item in enumerate(sorted_data, start=1):
     print(f"{index}\t{item['姓名']}\t{item['成绩']}")
```

> 排名 姓名 成绩
> 1  杨九莲 99
> 2  兰成  89
> 3  安芸芸 84
> 4  吴忱  76

**随机生成 1000 个由 0、1 组成的字符串，统计 0、1 的个数。**

```python
nums=random.choices(range(2),k=1000)
for i in nums:
 if i==0:
     lst1=nums.count(i)
for j in nums:
 if j==1:
     lst2=nums.count(j)
print(f"0字符在字符串中一共出现了{lst1}次")
print(f"1字符在字符串中一共出现了{lst2}次")
```

> 0 字符在字符串中一共出现了 479 次
> 1 字符在字符串中一共出现了 521 次

**输入 5 个数，将其分别按从小到大，从大到小的顺序输出。** 
接收用户输入的 5 个数

```python
numbers = []
for i in range(5):
 num = float(input(f"请输入第{i + 1}个数: "))
 numbers.append(num)
# 按从小到大排序
sorted_asc = sorted(numbers)
print("从小到大排序:", sorted_asc)
# 按从大到小排序
sorted_desc = sorted(numbers, reverse=True)
print("从大到小排序:", sorted_desc)
```

> 请输入第 1 个数: 110.23
> 请输入第 2 个数: 23.89
> 请输入第 3 个数: 349.678
> 请输入第 4 个数: 23.101
> 请输入第 5 个数: 1999.99
> 从小到大排序: [23.101, 23.89, 110.23, 349.678, 1999.99]
> 从大到小排序: [1999.99, 349.678, 110.23, 23.89, 23.101]

```bash
有两个集合，集合 A 为{1,2,3,4,5}，集合 B 为{4,5,6,7,8}，计算这两个集合的并集 |、交集&、差集-和对称差集 ^。从键盘输入一个数据，判断其是否在集合 A 或集合 B 中。
```

```python
A={1,2,3,4,5}
B={4,5,6,7,8}
print("集合A：{1,2,3,4,5}\n集合B：{4,5,6,7,8}")
lst1=A|B
lst2=A&B
lst3=A-B
lst4=A^B
print("这两个集合的并集为：",lst1)
print("这两个集合的交集为：",lst2)
print("这两个集合的差集为：",lst3)
print("这两个集合的对称差集为：",lst4)
n=int(input("请输入一个数："))
if n in A and n in B:
 print(f"输入的数{n}即在集合A也在集合B中")
elif n in A or n in B:
 print(f"输入的{n}数在集合A或集合B中")
else:
 print(f"输入的数{n}不在集合A和集合B中")
```

> 集合 A：{1, 2, 3, 4, 5}
> 集合 B：{4, 5, 6, 7, 8}
> 这两个集合的并集为： {1, 2, 3, 4, 5, 6, 7, 8}
> 这两个集合的交集为： {4, 5}
> 这两个集合的差集为： {1, 2, 3}
> 这两个集合的对称差集为： {1, 2, 3, 6, 7, 8}
> 请输入一个数：0
> 输入的数 0 不在集合 A 和集合 B 中

**输入一个字符串和一个字符，计算字符在字符串中出现的次数。**

```python
str = input('输入字符串：')
i= input('输入统计的字符')
print(i,'在',str,'中出现:',str.count(i),'次。')
```

> 输入字符串：hello world
> 输入统计的字符 l
> l 在 hello world  中出现: 3 次。

**对 zip 对象结果进行序列解包，并循环遍历；对 enumerate 对象结果进行序列解包，并循环遍历。**

```python
lst1=random.choices(range(101),k=10)
lst2=random.choices(range(50,101),k=10)
print(f"随机生成10个0~100的列表{lst1}\n随机生成10个50~100的列表{lst2}")
lst=zip(lst1,lst2)
for i,j in lst:
    print("循环遍历:",i,j)

lst3=random.choices(range(100,1001),k=10)
print("随机生成10个100~1000的列表为：\n",lst3)
lst4=enumerate(lst3)
for x,y in lst4:
    print("解包并循环遍历",x,y)
```

> 随机生成 10 个 0<sub>100 的列表[75, 70, 4, 67, 16, 51, 62, 28, 90, 2]随机生成 10 个 50</sub>100 的列表[71, 70, 89, 80, 72, 84, 51, 68, 52, 90]
> 循环遍历: 75 71
> 循环遍历: 70 70
> 循环遍历: 4 89
> 循环遍历: 67 80
> 循环遍历: 16 72
> 循环遍历: 51 84
> 循环遍历: 62 51
> 循环遍历: 28 68
> 循环遍历: 90 52
> 循环遍历: 2 90
> 随机生成 10 个 100~1000 的列表为：
> [110, 573, 285, 513, 270, 798, 748, 901, 312, 895]
> 解包并循环遍历 0 110
> 解包并循环遍历 1 573
> 解包并循环遍历 2 285
> 解包并循环遍历 3 513
> 解包并循环遍历 4 270
> 解包并循环遍历 5 798
> 解包并循环遍历 6 748
> 解包并循环遍历 7 901
> 解包并循环遍历 8 312
> 解包并循环遍历 9 895

**随机生成 20 个数字的列表，保留奇数列表。filter**

```python
lst=random.choices(range(101),k=20)
print("随机生成20个数字的列表为：\n",lst)
def f(n):
 return n%2==1
lst1=filter(f,lst)
print("其中的奇数列表为：",list(lst1))
```

> 随机生成 20 个数字的列表为：
> [86, 31, 46, 43, 41, 64, 96, 61, 62, 28, 53, 32, 89, 97, 82, 77, 75, 20, 54, 29]
> 其中的奇数列表为： [31, 43, 41, 61, 53, 89, 97, 77, 75, 29]

**输入一些数字，作为元组的元素，查找最后一个数字在元组中出现多少次？**

```python
tup = input("请输入一些数字：")
print(f"最后一个元素{tup[-1]}出现次数是{tup.count(tup[-1])}")
```

> 请输入一些数字：867843697234857435098707887
> 最后一个元素 7 出现次数是 6

**输入一些数字，作为元组的元素，在元组中随机确定一个数字，查找这个数字首次出现的位置。**

```python
tup = input("请输入一些数字：")
n = input("请输入一个数字：")
print(f"你输入的这个数字{n}在这些数字中首次出现的位置是第{tup.index(n)}个位置")
```

> 请输入一些数字：5376560874643
> 请输入一个数字：7
> 你输入的这个数字 7 在这些数字中首次出现的位置是第 2 个位置

**随机生成 10 个小写字母，随机生成 10 个大写字母。**

```python
lst = random.sample(string.ascii_lowercase, 10)
print("随机生成的小写字母:", lst)
LST= random.sample(string.ascii_uppercase, 10)
print("随机生成的大写字母:", LST)
```

> 随机生成的小写字母: ['z', 'v', 'x', 'u', 'e', 'r', 'n', 'a', 'm', 't']
> 随机生成的大写字母: ['J', 'T', 'K', 'N', 'W', 'G', 'M', 'Y', 'O', 'U']

**创建一个 20 以内奇数列表，计算列表中所有数的和。**

```python
lst=random.choices(range(21),k=30)
print("随机生成30个20以内的数字列表为：",lst)
lst1=[]
for i in lst:
 if i%2==1:
     lst1.append(i)
print("所有数的和为：",sum(lst1))
```

> 随机生成 30 个 20 以内的数字列表为： [12, 9, 1, 16, 2, 20, 9, 3, 16, 5, 15, 1, 14, 4, 13, 6, 9, 2, 19, 8, 9, 1, 0, 15, 0, 7, 4, 5, 14, 13]
> 所有数的和为： 134

**设计一个函数，接受一组数据，分别计算最大值和最小值。**

```python
n=input("请输入一些数：")
print("这些数中最大的为：",max(n))
print("这些数中最小的为：",min(n))
```

> 请输入一些数：80875098314875
> 这些数中最大的为： 9
> 这些数中最小的为： 0

**统计一篇英文文章的词频。**

```python
 import requests
 from collections import Counter
 import re
 url = 'http://en.people.cn/'
 response = requests.get(url)
 text = response.text
 text = text.lower()
 text = re.sub(r'[^\w\s]', '', text)
 words = text.split()
 stopwords = set(['the', 'and', 'a', 'an', 'in', 'on', 'is', 'are', 'was', 'were', 'am', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs'])
 words = [word for word in words if word not in stopwords]
 word_counts = Counter(words)
 for word, count in word_counts.most_common():
     print(f"{word}: {count}")
```

**随机生成 1000 个由大小写英文字母构成的字符串，分别统计每个字符的个数。**

```bash
import random
from collections import Counter
strings = [''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', k=10)) for _ in range(1000)]
char_counts = Counter(''.join(strings))
for char, count in char_counts.items():
print(f"{char}: {count}")
```

> L: 186,n: 191,z: 202,O: 167,u: 183,h: 192,N: 165,J: 175,p: 229,r: 190,k: 180,M: 191,g: 204,o: 192,Z: 190,c: 202,A: 172,V: 180,y: 207,X: 217,l: 197,G: 205,H: 183,Y: 207,s: 203,x: 195,a: 161,K: 184,C: 172,D: 202,U: 184,w: 178,E: 182,P: 184,m: 190,B: 189,d: 184,v: 171,i: 208,f: 197,S: 212,t: 177,e: 193,I: 206,Q: 214,R: 223,W: 192,j: 194,T: 204,q: 202,b: 200,F: 192,

**已知列表 data 中有若干字符串，要求编写程序，对 data 中的字符串进行过滤，只输出重复字符不超过一半的字符串。**

```python
 from collections import Counter
 data = ['hello', 'world', 'python', 'programming', 'code', 'example', 'test', 'hello world']
 def f(data):
     lst= []
     for i in data:
         char_counts = Counter(i)
         half_length = len(i) // 2
         excess_chars = sum(1 for count in char_counts.values() if count > half_length)
         if excess_chars <= half_length:
             lst.append(i)
     return lst
 lst_data = f(data)
 for s in lst_data:
     print(s)
```

**编写程序，生成包含 1000 个[0,100]的随机整数，并统计每个元素的出现次数。**

```python
 nums=random.choices(range(101),k=1000)
 print("生成1000个[0,100]的随机整数:",nums)
 dct={i:0 for i in range(101)}
 for i in nums:
     dct[i]+=1
 for num,count in dct.items():
     print(f"数字{num}:        出现      {count}次")
```

> 数字 0:        出现      11 次
> 数字 1:        出现      18 次
> 数字 2:        出现      6 次
> 数字 3:        出现      9 次
> 数字 4:        出现      13 次
> ......

**编写程序，用户输入一个列表和 2 个整数作为下标，然后输出列表中介于 2 个下标闭区间之间的元素组成的子列表。例如用户输入[1,2,3,4,5,6]和 2，5，程序输出[3,4,5,6]。**

```python
 lst= eval(input("请输入一个列表："))
 start_index = int(input("请输入起始下标："))
 end_index = int(input("请输入结束下标："))
 if start_index < 0 or end_index < 0 or start_index >= len(lst) or end_index >= len(lst) or start_index > end_index:
     print("无效的下标！")
 else:
     print("介于两个下标之间的子列表为：",lst[start_index:end_index+1])
```

> 请输入一个列表：1212,21,2,12,12,2,2,12,12,1,2,33
> 请输入起始下标：2
> 请输入结束下标：7
> 介于两个下标之间的子列表为： (2, 12, 12, 2, 2, 12)

**设计一个字典，并编写程序，用户输入内容作为“键”，然后输出字典对应的“值”，如果用户输入的“键”不存在，则输出“您输入的键不存在！”**

```python
 dct = { "苹果": "apple", "香蕉": "banana","橙子": "orange","葡萄": "grape","西瓜": "watermelon"}
 name= input("请输入一个水果名称：")
 if name in dct:
     print(dct[name])
 else:
     print("您输入的键不存在！")
```

> 请输入一个水果名称：苹果
> apple

**编写程序，生成包含 20 个随机数的列表，然后将前 10 个元素升序排列，后 10 个元素降序排列，并输出结果。**

```python
 nums=random.choices(range(101),k=20)
 print("生成20个随机整数:",nums)
 lst1=nums[0:10]
 lst2=nums[10:21]
 print(f"将前10个元素升序排列{sorted(lst1)}\n将后10个元素降序排列{sorted(lst2,reverse=True)}")
```

> 生成 20 个随机整数: [22, 48, 60, 74, 2, 49, 15, 67, 10, 97, 19, 66, 37, 75, 25, 8, 22, 32, 16, 50]
> 将前 10 个元素升序排列[2, 10, 15, 22, 48, 49, 60, 67, 74, 97]
> 将后 10 个元素降序排列[75, 66, 50, 37, 32, 25, 22, 19, 16, 8]

**编写程序，输入一个字符串，输出其中出现次数最多的字符及其出现次数。**

```python
 lst_str = input("请输入一串字符串：")
 dct = {}
 for char in lst_str:
     if char in dct:
         dct[char] += 1
     else:
         dct[char] = 1
 max_char = max(dct, key=dct.get)
 max_count = dct[max_char]
 print(f"出现次数最多的字符是{max_char}    出现{max_count}次")
```

> 请输入一串字符串：rtewrtry
> 出现次数最多的字符是 r    出现 3 次

**使用字典推导式生成字典，字典的键是所有的英文字母，值是对应的 ASCII 码。**

```python
 d1={}
 for i in range(26):
        d1[chr(i+65)]=i+65
 for i in range(26):
        d1[chr(i+97)]=i+97
 print(d1)
```

```bash
> {'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, 'a': 97, 'b': 98, 'c': 99, 'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104, 'i': 105, 'j': 106, 'k': 107, 'l': 108, 'm': 109, 'n': 110, 'o': 111, 'p': 112, 'q': 113, 'r': 114, 's': 115, 't': 116, 'u': 117, 'v': 118, 'w': 119, 'x': 120, 'y': 121, 'z': 122}
```

**生成从某个字母开始的 n 个元素构成的字典。如 l 开始的 5 个。**

```python
 star = input("请输入开始的字母：")
 n = int(input("几个元素"))
 star_ascll = ord(star)
 d1={}
 print(star_ascll)
 for i in range(n):
        d1[chr(star_ascll)]=0
        star_ascll+=1
 print(d1)
```

```bash
> 请输入开始的字母：t
> 几个元素 7
> 116
> {'t': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0}
```

**编写程序,运行后用户输入4位整数作为年份,判断其是否为闰年。如果年份能400整除,则为间年:如果年份能被4整除但不能被100整除也为年。**

```python
number = int(input("请输入数四位数："))
if number % 4 == 0 and number % 100 != 0 or number % 400 == 0:
    print("Yes,闰年")
else:
    print("No,平年")

```

> 请输入数四位数：3000
> No,平年
> 请输入数四位数：2000
> Yes,闰年

**编写程序,生成一个包含50个随机整数的列表,然后删除其中所有奇数(提示:从后向前删)。**

```python
integers = [random.randint(1, 100) for _ in range(50)]
print(integers)
# 方法一列表推导式
evenList = [x for x in integers if x % 2 != 1]
print(evenList)
# 方法二使用filter
evenList = list(filter(lambda x: x % 2 != 1, integers))
print(evenList)

#[41, 10, 79, 50, 86, 50, 79, 28, 68, 54, 30, 100, 20, 80, 56, 40, 20, 50, 49, 28, 17, 52, 31, 6, 99, 31, 56, 9, 33, 21, 87, 40, 88, 87, 31, 55, 95, 3, 9, 13, 60, 97, 24, 38, 44, 97, 3, 3, 23, 48]
#[10, 50, 86, 50, 28, 68, 54, 30, 100, 20, 80, 56, 40, 20, 50, 28, 52, 6, 56, 40, 88, 60, 24, 38, 44, 48]
```

**编写程序,生成一个包含20个随机整数的列表,然后对其中偶数下标的元素进行降序排列,奇数下标的元素不变(提示:使用切片)。**

```python
integersList = [random.randint(1, 100) for _ in range(20)]
print(integersList)
evenList = integersList[::2]
print(evenList)
evenList.pop(0)  # 下标0不是奇数也不是偶数删除
print(evenList)
evenList.sort(reverse=True)
print(evenList)
needOne = 2
needTow = 0
while needOne < len(integersList):
    integersList[needOne] = evenList[needTow]
    needOne += 2
    needTow += 1
print(integersList)

#[11, 17, 79, 49, 28, 17, 66, 2, 9, 92, 71, 53, 80, 27, 14, 5, 55, 12, 36, 45]
#[11, 79, 28, 66, 9, 71, 80, 14, 55, 36]
#[79, 28, 66, 9, 71, 80, 14, 55, 36]
#[80, 79, 71, 66, 55, 36, 28, 14, 9]
#[11, 17, 80, 49, 79, 17, 71, 2, 66, 92, 55, 53, 36, 27, 28, 5, 14, 12, 9, 45]
```

**编写程序,用户从键盘输入小于1000的整数,对其进行因式分解。例如10=2**​***5，60=2***​**2**​***3***​**5**

```python
def zys(n):
    print(n, "=", end='')
    i = 2
    while i * i <= n:
        if n % i:
            i += 1
        else:
            print(i, end='')
            n //= i
            if n > 1:
                print("*", end='')
    if n > 1:
        print(n, end="")
n = int(input("请输入正整数:"))
zys(n)
```

> 请输入正整数:60
> 60 =2*2*3*5

**编写程序,至少使用两种不同的方法计算100以内所有奇数的和。**

```python
numberList = list(range(0, 101))
print(numberList)
# 方法一使用函数
numberList=numberList[1::2]
print(numberList)
numberSum = sum(numberList)
print(numberSum)
# 方法二直接循环累加
numberSumOne = 0
for i in numberList:
    numberSumOne += i
print(numberSumOne)

#[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
#[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99]
#2500
#2500
```

**编写程序,输出所有由1、2、3、4这四个数字组成的素数,并且在每个素数中每个数字只使用一次。**

```python
import itertools
numbers = [1, 2, 3, 4]
for r in range(1, len(numbers) + 1):  # r表示排列中元素的个数
    permutations = itertools.permutations(numbers, r)  # 生成所有r个元素的排列
    for perm in permutations:
        perm = int(''.join(map(str, perm)))
        print(perm,end=',')  # 输出排列
#1, 2, 3, 4, 12, 13, 14, 21, 23, 24, 31, 32, 34, 41, 42, 43, 123, 124, 132, 134, 142, 143, 213, 214, 231, 234, 241, 243, 312, 314, 321, 324, 341, 342, 412, 413, 421, 423, 431, 432, 1234, 1243, 1324, 1342, 1423, 1432, 2134, 2143, 2314, 2341, 2413, 2431, 3124, 3142, 3214, 3241, 3412, 3421, 4123, 4132, 4213, 4231, 4312, 4321,
```

**编写程序,实现分段函数计算：** 
X             y
X<0           0
0<=x<5        x
5<=x<10       3x-5
10<=x<20      0.5x-2
20<=x         0

```python
x = int(input("请输入x:"))
if x < 0:
    y = 0
elif 0 <= x < 5:
    y = x
elif 5 <= x < 10:
    y = 3 * x - 5
elif 10 <= x < 20:
    y = 0.5 * x - 2
else:
    y = 0
print("y=", y)
```

> 请输入x:8
> y= 19

**输出3位水仙花数。**

```python
def flowerSum(num):
    numStr = str(num)
    n = len(numStr)  #数值长度
    sum_of_powers = sum(int(digit)** n for digit in numStr)  #转换为字符串求和
    return sum_of_powers == num
for num in range(100,1001):
    if flowerSum(num):
        print(num)
```

> 153
> 370
> 371
> 407

**统计考试中优秀、良好、中等、及格、不及格的人数。**

```python
score_list = [random.randint(1, 100) for _ in range(100)]
Y = 0
L = 0
Z = 0
J = 0
N = 0
for i in score_list:
    if i >= 90:
        Y += 1
    elif 80 <= i < 90:
        L += 1
    elif 70 <= i < 80:
        Z += 1
    elif 60 <= i < 70:
        J += 1
    else:
        N += 1
print("优秀：", Y, "良好：", L, "中等：", Z, "及格：", J, "不及格：", N, )
```

> 优秀： 14 良好： 10 中等： 7 及格： 9 不及格： 60

**输入一个数，判断是否为素数。**

```python
def price(i):
    if i < 2:
        return False
    else:
        for j in range(2, int(math.sqrt(i)) + 1):
            if i % j == 0:
                return False
        return True

num = int(input("请输入一个数："))
if price(num):
    print("是素数")
else:
    print("不是素数")
```

**计算前n个自然数的阶乘之和1!+2!+3!+……+n！**

```python
num = int(input("请输入一个数："))
num_list = [i for i in range(1, num + 1)]
print(num_list)
sum = 0
for i in num_list:
    k = 1
    for j in range(1, i + 1):
        k *= j
    sum += k
print("阶乘和为：", sum)
```

> 请输入一个数：5
> [1, 2, 3, 4, 5]
> 阶乘和为： 153

方法二

```python
num = int(input("请输入一个数："))
num_list = [i for i in range(1, num + 1)]
print(num_list)
sum = 0
for i in num_list:
    k=math.factorial(i)
    sum += k
print("阶乘和为：", sum)
```

> 请输入一个数：4
> [1, 2, 3, 4]
> 阶乘和为： 33

**e=1+1/1! + 1/2! + 1/3! + …… +1/n!，编写程序计算e的近似值。要求直到最后一项值小于10-8（表示为10e-8）输出最后一项的值及e的值。（提示：阶乘可用math库的**

```python
math.factorial(x)求）
e = 1
i=1
while i > 0:
    k=1/(math.factorial(i))
    if k <pow(10,-8):
         break
    e += k
    i+=1
print("e为：", e)
```

> e为： 2.718281826198493

**1,2,3,5,8,13,21,34……，观察前面的数字，生成前100个数字组成的序列。**

```python
denominator = 1
molecule = 2
molecule_one =1
i = 0
while molecule_one<100:
    print(molecule_one, end=',')
    molecule_one = molecule + denominator
    denominator_one = molecule
    molecule, denominator = molecule_one, denominator_one
```

> 1,3,5,8,13,21,34,55,89,......

**输出9x9的乘法表**

```python
for i in range(1, 10):
    for j in range(1, i + 1):
        print("{}x{}={}\t".format(j, i, i * j), end="")
    print()

#1x1=1
#1x2=2	2x2=4
#1x3=3	2x3=6	3x3=9
#1x4=4	2x4=8	3x4=12	4x4=16
#1x5=5	2x5=10	3x5=15	4x5=20	5x5=25
#1x6=6	2x6=12	3x6=18	4x6=24	5x6=30	6x6=36
#1x7=7	2x7=14	3x7=21	4x7=28	5x7=35	6x7=42	7x7=49
#1x8=8	2x8=16	3x8=24	4x8=32	5x8=40	6x8=48	7x8=56	8x8=64
#1x9=9	2x9=18	3x9=27	4x9=36	5x9=45	6x9=54	7x9=63	8x9=72	9x9=81
```

**输入若干同学的计算机成绩，成绩分布在[0,100]区间，求出这些同学的计算机成绩的平均值、最小值、最大值。每次提示是否继续输入，输入yes，继续输入，输入no停止输入。输入在数字不在[0,100]区间，给出错误提示。**

```python
def panduan():
    judges = True
    while judges:
        index = input("是否继续输入:")
        if index == "yes" or index == "Y" or index == "y":
            judges = False
            return True
        elif index == "no" or index == "N" or index == "n":
            judges = False
            return False
        else:
            print("输入错误!")

def jisuan(score_list):
    aver = sum(score_list) / len(score_list)
    mins = min(score_list)
    maxs = max(score_list)
    return aver, mins, maxs

def inputscore():
    judge = True
    while judge:
        score = int(input("请输入数字:"))
        if 0 <= score <= 100:
            score_list.append(score)
            print(score_list)
            tag = panduan()
            if tag:
                judge = True
            else:
                return score_list
                judge = False
        else:
            print("格式错误!")

score_list = []
score_list = inputscore()
aver, mins, maxs = jisuan(score_list)
print(f"平均成绩:{aver}")
print(f"最低成绩:{mins}")
print(f"最高成绩:{maxs}")
```

> 请输入数字:67
> [67]
> 是否继续输入:89
> 输入错误!
> 是否继续输入:y
> 请输入数字:56
> [67, 56]
> 是否继续输入:y
> 请输入数字:45
> [67, 56, 45]
> 是否继续输入:78
> 输入错误!
> 是否继续输入:y
> 请输入数字:23
> [67, 56, 45, 23]
> 是否继续输入:yes
> 请输入数字:67
> [67, 56, 45, 23, 67]
> 是否继续输入:n
> 平均成绩:51.6
> 最低成绩:23
> 最高成绩:67

**猜数游戏：游戏开始，随机生成一个[0,100]区间的数字，用户输入一个数字猜测，如果用户输入大了，提示“大了”，如果用户输入小了，提示“小了”，最终计算并输出用户猜了多少次。**

```python
number = random.randint(0, 100)
print(number)
sum = 0
i = 1
while i < 10:
    x1 = eval(input("输入:"))
    if x1 < number:
        print("猜小!")
        continue
    elif x1 > number:
        print("大了")
        continue
    else:
        print("猜对了")
        break
    sum = sum+1
```

**输出1000以内的素数，以及这些素数之和。（素数，是指除了1和该数本身之外，不能被其他任何整数整除的数）**

```python
def price(i):
    if i < 2:
        return False
    else:
        for j in range(2, int(math.sqrt(i)) + 1):
            if i % j == 0:
                return False
        return True

sum = 0
for i in range(1, 1000):
    if price(i):
        sum += i
print("素数和:", sum)
```

> 素数和: 76127

**编写程序，按公式s=12+22+32+……+n2。求累加和s不超过1000的最大项数n。**

```python
index = 12
sum = 0
tag = True
while tag:
    sum += index
    index += 10
    if sum > 1000:
        print("最大项为:", index - 20)
        sum = sum - (index - 10)
        print("最大值:",sum)
        tag = False
```

> 最大项为: 132
> 最大值: 936

**编写程序，将由1、2、3、4这4个数字组成的每位数都不相同的所有三位数，存入列表中。**

```python
import itertools
numbers = [1, 2, 3, 4]
permutations = itertools.permutations(numbers, 3)  # 生成所有r个元素的排列
print(list(int(''.join(map(str, perm))) for perm in permutations))
```

> [123, 124, 132, 134, 142, 143, 213, 214, 231, 234, 241, 243, 312, 314,
> 321, 324, 341, 342, 412, 413, 421, 423, 431, 432]

**百钱买百鸡。** 公鸡5文钱一只，母鸡3文钱一只，小鸡3只一文钱，
用100文钱买一百只鸡,其中公鸡，母鸡，小鸡都必须要有，
问公鸡、母鸡、小鸡分别要买多少只刚好凑足100文钱。
初始化变量

```python
for x in range(1, 20):
    for y in range(1, 33):
        z = 100 - x - y
        if z % 3 == 0 and 5*x + 3*y + z/3 == 100:
            print(f"公鸡: {x} 只，母鸡: {y} 只，小鸡: {int(z)} 只，刚好100文钱。")
            break
```

> 公鸡: 4 只，母鸡: 18 只，小鸡: 78 只，刚好100文钱。
> 公鸡: 8 只，母鸡: 11 只，小鸡: 81 只，刚好100文钱。
> 公鸡: 12 只，母鸡: 4 只，小鸡: 84 只，刚好100文钱。

**编写一个求整数n阶乘（n!）的程序。**

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)
n = int(input("请输入一个整数："))
print(f"{n}的阶乘是：{factorial(n)}")
```

**输入一个字符串，然后依次显示该字符串的每个字符，以及该字符的ASCII码。**

```python
str = input("请输入字符串：")
for i in str:
    print(i,":",ord(i))
```

> d : 100
> f : 102
> j : 106
> s : 115
> n : 110
> d : 100
> f : 102
> j : 106
> n : 110
> s : 115

**数字重复统计问题。（1）随机生成1000个整数，数字的范围[20,100]；
（2）升序输出所有不同的数字，及其每个数字重复的次数。**

```python
lists = [random.randint(20, 100) for _ in range(1000)]
cf = dict([[i,lists.count(i)] for i in lists ])
sorted_dict = dict(sorted(cf.items()))
print(sorted_dict)
#{20: 8, 21: 15, 22: 14, 23: 19, 24: 9, 25: 9, 26: 8, 27: 11, 28: 18, 29: 15, 30: 15, 31: 9, 32: 13, 33: 14, 34: 12, 35: 11, 36: 11, 37: 11, 38: 10, 39: 14, 40: 10, 41: 14, 42: 17, 43: 13, 44: 13, 45: 11, 46: 15, 47: 19, 48: 9, 49: 10, 50: 9, 51: 14, 52: 22, 53: 13, 54: 17, 55: 16, 56: 11, 57: 10, 58: 13, 59: 16, 60: 5, 61: 7, 62: 11, 63: 16, 64: 13, 65: 9, 66: 9, 67: 12, 68: 15, 69: 13, 70: 13, 71: 13, 72: 12, 73: 13, 74: 12, 75: 7, 76: 17, 77: 8, 78: 15, 79: 8, 80: 12, 81: 16, 82: 8, 83: 12, 84: 13, 85: 11, 86: 17, 87: 14, 88: 13, 89: 13, 90: 10, 91: 9, 92: 14, 93: 8, 94: 15, 95: 22, 96: 8, 97: 8, 98: 18, 99: 11, 100: 2}
```

**编写一个判断字符串是否是回文数。回文就是一个字符串从左到右读和从右到左读是完全一样的。例如，level,12321,ABA是回文。**

```python
number_list = input("请输入：")
index_first = 0
i = 0
tag = 0
index_last = int(len(number_list))
while i < int(len(number_list) / 2):
    if number_list[index_first] == number_list[index_last - 1]:
        index_first += 1
        index_last -= 1
        i += 1
        tag = 1
    else:
        print("不是回文")
        break
if tag == 1:
    print("是回文")
```

> 请输入：asdfghgfdsa
> 是回文

**编写程序，求满足以下条件的最大的n值：**

```python
12+22+32+42+……+n2<1000
index = 12
sum = 0
tag = True
while tag:
    sum += index
    index += 10
    if sum > 1000:
        print("最大项为:", index - 20)
        sum = sum - (index - 10)
        print("最大值:",sum)
        tag = False
```

> 最大项为: 132
> 最大值: 936

**输入星号金字塔，要求打印n层。**

```python
n = int(input("金字塔高度："))
for i in range(1, n+1):
    for j in range(0, n-i):
        print(" ", end="")
    for k in range(1, 2*i):
        print("*", end="")
    print()

#金字塔高度：7
#        *
#       ***
#      *****
#     *******
#    *********
#   ***********
#  *************
```

**编写程序打印下图的字符金字塔，要求打印n层。** 
A
BAB
CBABC
DCBABCD
EDCBABCDE
FEDCBABCDEF
GFEDCBABCDEFG

```python
def print_char_pyramid(n):
    # 外层循环控制行数
    for i in range(n):
        # 打印空格 每增加一层,空格数量-1
        print(' ' * (n - i - 1), end='')
        # 打印左侧字母，从A开始
        for j in range(i):
            print(chr(65 + i - j), end='')
        # 打印右侧字母，从倒数第二个开始
        for j in range(i + 1):
            print(chr(65 + j), end='')
            # 换行
        print()

n = int(input("请输入金字塔的层数："))
print_char_pyramid(n)

#请输入金字塔的层数：4
#    A
#   BAB
#  CBABC
# DCBABCD
```

**有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？**

```python
import itertools
numbers = [1, 2, 3, 4]
permutations = itertools.permutations(numbers, 4)  # 生成所有r个元素的排列
print(list(int(''.join(map(str, perm))) for perm in permutations))
#[123, 124, 132, 134, 142, 143, 213, 214, 231, 234, 241, 243, 312, 314, 321, 324, 341, 342, 412, 413, 421, 423, 431, 432]
```

**判断101-200之间有多少个素数，并输出所有素数。**

```python
def price(i):
    if i < 2:
        return False
    else:
        for j in range(2, int(math.sqrt(i)) + 1):
            if i % j == 0:
                return False
        return True

su = []
number = 0
for j in range(101, 201):
    k = price(j)
    if k == True:
        su.append(j)
        number += 1
print("数量：", number, "是：", su)

#数量： 21 是： [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199]
```

**将一个正整数分解质因数。例如：输入90,打印出90=2**​***3***​**3*5。**

```python
def zys(n):
    print(n, "=", end='')
    i = 2
    while i * i <= n:
        if n % i:
            i += 1
        else:
            print(i, end='')
            n //= i
            if n > 1:
                print("*", end='')
    if n > 1:
        print(n, end="")
n = int(input("请输入正整数:"))
zys(n)
```

> 请输入正整数:90
> 90 =2*3*3*5

**输入一行字符，分别统计出其中英文字母、空格、数字和其它字符的个数。**

```python
def count_chars(input_string):
    # 初始化计数器
    letters = 0
    spaces = 0
    digits = 0
    others = 0

    # 遍历字符串中的每个字符
    for char in input_string:
        # 检查字符是否是英文字母
        if char.isalpha():
            letters += 1
            # 检查字符是否是空格
        elif char.isspace():
            spaces += 1
            # 检查字符是否是数字
        elif char.isdigit():
            digits += 1
            # 如果都不是，则属于其他字符
        else:
            others += 1
    return letters, spaces, digits, others
input_line = input("请输入一行字符：")
letters, spaces, digits, others = count_chars(input_line)
print(f"英文字母个数：{letters}")
print(f"空格个数：{spaces}")
print(f"数字个数：{digits}")
print(f"其他字符个数：{others}")
```

> 请输入一行字符：1234567!@#$%^SDFG  FGHJ45678HGF//.,;'[]<br />英文字母个数：11
> 空格个数：2
> 数字个数：12
> 其他字符个数：15

**求1+2!+3!+...+20!的和。**

```python
num_list = [i for i in range(1, 21)]
print(num_list)
sum = 0
for i in num_list:
    k = 1
    for j in range(1, i + 1):
        k *= j
    sum += k
print("阶乘和为：", sum)
```

> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20]
> 阶乘和为： 2561327494111820313

方法二

```python
num_list = [i for i in range(1, 21)]
print(num_list)
sum = 0
for i in num_list:
    k=math.factorial(i)
    sum += k
print("阶乘和为：", sum)
```

> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20]
> 阶乘和为： 2561327494111820313

**一个5位数，判断它是不是回文数。即12321是回文数，个位与万位相同，十位与千位相同。**

```python
number_list = input("请输入：")
index_first = 0
i = 0
tag = 0
index_last = int(len(number_list))
while i < int(len(number_list) / 2):
    if number_list[index_first] == number_list[index_last - 1]:
        index_first += 1
        index_last -= 1
        i += 1
        tag = 1
    else:
        print("不是回文")
        break
if tag == 1:
    print("是回文")
```

> 请输入：45678987654
> 是回文

**编程实现:定义一个类(Person),该类中有两个私有属性分别为姓名(name)和年龄(age)。
 定义构造方法,用于初始化数据成员。定义显示(display)方法,将姓名和年龄显示输出。**

```python
class Person:
     def __init__(self, name, age):
         self.__age = age
         self.__name = name

     def display(self):
         print(self.__age, self.__name)


 student = Person('a', '18')
 student.display()
```

> 18 a

**设计一个学生类,属性为姓名、学号、年龄、成绩。设计一个班级类,属性为班级代号、所有学生
 要求:实现向班级添加学生、删除学生、学生排序(按指定条件)、查询学生信息(姓名、学号等)。**

```python
 class student:
     def __init__(self, name, id, age, score):
         self.name = name
         self.id = id
         self.age = age
         self.score = score

 class classroom:
     def __init__(self, class_id):
         self.class_id = class_id
         self.student_list = []

     def add_stu(self, student):   添加学生
         self.student_list.append(student)

     def del_stu(self, stu_id):
         for student in self.student_list:
             if student.id == stu_id:
                 self.student_list.remove(student)
                 return 1
             return -1

     def sort_stu(self, key):
         self.student_list.sort(key=lambda student: getattr(student, key))

     def find_stu(self, query_value):
         for student in self.student_list:
             if student.id == query_value:
                 print('查询到学生信息：姓名：', student.name, '学号：', student.id, '年龄：', student.age, '成绩：',
                       student.score)
                 return 1
             return -1

     def out_stu(self):
         print(' 姓名 \t',  '学号\t','年龄\t','成绩\t')
         for student in self.student_list:
             print(student.name, '\t', student.id, '\t', student.age,'\t',
                   student.score)


 stu1 = student('youze', '1', 23, 70)
 stu2 = student('lili', '2', 24, 60)
 stu3 = student('zimen', '3', 38, 62)
 stu4 = student('liling', '4', 23, 89)
 stu5 = student('san', '5', 24, 56)
 stu6 = student('wangwu', '6', 19, 99)
  创建班级对象并添加学生
 c1 = classroom('2024')
 c1.add_stu(stu1)
 c1.add_stu(stu2)
 c1.add_stu(stu3)
 c1.add_stu(stu4)
 c1.add_stu(stu5)
 c1.add_stu(stu6)

 c1.out_stu()
  删除一个学生
 print('删除：',c1.del_stu('1'))
  对学生进行排序（按成绩）
 c1.sort_stu('score')
 print('成绩排序输出：')
 c1.out_stu()
  查询学生信息
 c1.find_stu('1')

#   姓名 	 学号	 年龄	 成绩
#  youze 	 1 	 23 	 70
#  lili 	 2 	 24 	 60
#  zimen 	 3 	 38 	 62
#  liling 	 4 	 23 	 89
#  san 	 5 	 24 	 56
#  wangwu 	 6 	 19 	 99
#  删除： 1
#  成绩排序输出：
#   姓名 	 学号	 年龄	 成绩
#  san 	 5 	 24 	 56
#  lili 	 2 	 24 	 60
#  zimen 	 3 	 38 	 62
#  liling 	 4 	 23 	 89
#  wangwu 	 6 	 19 	 99
```

**定义代表二维坐标系上某个点的 Point 类(包括x坐标和y坐标两个属性),为说类提供一个方法用于计算两个点之间的距离,再提供一个方法用于判断三个点组成的?角形是钝角、锐角还是直角三角形。**

```python
class Point:
     def __int__(self):
         self.__x=0
         self.__y=0
         self.__z=0
     def jisuan(x,y):
         return math.sqrt(math.pow(x,2)+math.pow(y,2))
     def panduan(x,y,z):
         if x+y<=z or x+z<=y or y+z<=x:
             return -1
         else:
             if math.pow(x, 2)+math.pow(y, 2)==math.pow(z, 2):
                 return 0
             elif  math.pow(x, 2)+math.pow(y, 2)<math.pow(z, 2):
                 return 1
             else:
                 return 2
 d = Point
 print(d.jisuan(3,4))
 v = d.panduan(3,4,6)
 if v==-1:
     print('不是三角形')
 elif v==1:
     print('锐角')
 else:
     print('钝角')
```

```bash
 4.编程实现:自定义一个字典类 dictclass,并完成下面的功能。dict = dictclass({字典对象))
 (1)删除某个 key。
 (2)判断某个键是否在字典里。如果存在,返回键对应的值;不存在,则返回"not found"
 (3)返回键组成的列表,返回类型为列表
 (4)合并字典并返回由合并后字典的值组成的列表,返回类型为列表提示:update_dict({要合并的字典))。
```

```python
 class dictclass:
     def __init__(self, initial):
         self.data = initial

      删除
     def del_dict(self, key):
         if key in self.data:
             del self.data[key]
             return 1   删除成功返回1
         else:   键不存在返回0
             return 0

      查找
     def get_value(self, key):
         if key in self.data:
             return self.data[key]
         else:
             return 'not found'

      获取
     def get_key(self):
         return list(self.data.keys())

      增加
     def update_dict(self, dict1):
         self.data.update(dict1)
         return list(self.data.values())


 d = dictclass({'a': 1, 'b': 2, 'c': 3, 'd': 4})
 print(d.get_key())   返回键组成的列表
 print(d.del_dict('a'))   删除key
 print(d.get_key())   返回键组成的列表

 print(d.get_value('b'))   查找、返回键对应值

 dict1 = dictclass({'f': 7, 'g': 8, 'h': 9})
 print(d.update_dict(dict1.data))
```

 5.定义交通工具、汽车、火车、飞机4个类,其中交通工具类有 name 属性,move(self,distance)方法,
 调用该方法可显示该交通工具的名字及移动距离。汽车、火车、飞机类均为交通工具类的子类,其中汽车、火车类新增属性color,
 飞机类新增属性company,每个子类都重写了 move()方法,调用时输出 name、新增属性和移动距离。
 注意这些类的继承关系,为这些类提供构造器(构造方法)。

```python
 class vehicle:
     def __init__(self,name):
         self.name=name
         def move(self,distance):
             print('使用的交通工具是：',self.name,'移动的距离是：',distance)
 class cars(vehicle):
     def __init__(self, name,color):
         super().__init__(name)
         self.color = color

     def move(self,distance):
             print('使用的交通工具是：',self.name,'移动的距离是：',distance,'颜色为:',self.color)

 class trains(vehicle):
     def __init__(self, name,color):
         super().__init__(name)
         self.color = color

     def move(self,distance):
             print('使用的交通工具是：',self.name,'移动的距离是：',distance,'颜色为:',self.color)

 class planes(vehicle):
     def __init__(self,name, company):
         super().__init__(name)
         self.company = company

     def move(self,distance):
             print('使用的交通工具是：',self.name,'移动的距离是：',distance,'公司为:',self.company)

 car = cars('宝马','蓝色')
 tra = trains('复兴号','绿色')
 pla = planes('C919','china')

 car.move(200)
 tra.move(2000)
 pla.move(8908)
```

> 使用的交通工具是： 宝马 移动的距离是： 200 颜色为: 蓝色  使用的交通工具是： 复兴号 移动的距离是： 2000 颜色为: 绿色
> 使用的交通工具是： C919 移动的距离是： 8908 公司为: china

```python
def main():
    for i in range(1,10):
        for j in range(1,i+1):
            print(j,'*',i ,'=', str(i*j),' ',end='')
        print()
main()

 '''源文件使用的utf-8编码，所有字符串都是unciode,可以指定'''
 ！/usr/bin/python3
  -*- coding: UTF-8 -*-
 coding=utf-8

 '''1、标识符
     变量、常量、函数、代码块

 '''

  不能使用数字开头,建议：驼峰命名法
 user_input = 1
 user_input2 = 12
 unserInput = 1      驼峰命名法
 User_Input1 = 2       驼峰命名法
 a= 1
 _aa = 1

  保留字,python内置的，不能作为标识符：有函数、语法或连接词
 '''
 C:\Users\root>python
 Python 3.8.10 (tags/v3.8.10:3d8993a, May  3 2021, 11:48:03) [MSC v.1928 64 bit (AMD64)] on win32
 Type "help", "copyright", "credits" or "license" for more information.
 >>> import keyword
 >>> keyword.kwlist
 ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
 >>>'''
 And = 1

 '''2、行缩进----代码块'''

 name = 'zhansgan'
 def userName():
     user_Name = "lisi"
     return user_Name

 print(userName())

 '''多行语句:符号\ '''
 name1 = "admin" + \
     "is" + \
     "me"

 '''注释符号：
 单行注释：
 多行注释：'''   '''
 '''


 '''4、输出函数：
    print()
     print(*objects , sep = '' ,end = '\n')
     objects:输出对象，可以多个，使用','分割
     sep    分割对象，默认是空
     end  用什么结束，默认是\n  ,可以自定义
 '''
 name2 = "张三"
 name3 = '李四'
 print(name1,name2,name3,sep='\n',end='\n')

 '''字符串格式化输出'''
 print('这是字符串：%c的值' %97)   格式化输出assic码
 print('这是字符串s：%s的值' % 'zhangsan') 格式化字符串输出
 print('1 + 1 = %d' %2) 格式化整形输出
 print('u:%u , o:%o , x:%x' % (0x27,0x27,0x27))%u 无符号整形，%o无符号8进制，%x 无符号16进制
 print('浮点float：%.3f' %3.222222)
 print('浮点float：%.11f' %3.222222) 浮点指定长度，不足的以0占位


 '''5、输入函数：
     input()
     '''
 user_Name_new = str(input("请输入您的用户名："))
 if user_Name_new == 'admin':
     print("welcome:admin")
 else:
     print("welcome:",user_Name_new,end='\n')

 user_Age = int(input("请输入年龄："))


 '''数据结构：
 1、列表
     列表内的值使用[]，每一个数据叫一个元素，每个元素使用','隔开
 '''
 list = ['zhangsan' , 18 , 1.1225,'李四']
 print(list[0:2])    从第几位开始，取到第几个，默认是0开始（偏移量）
 print(list[1:2])
 print(list[1:1])    取出空的列表
 print(list[0:4])
 新增
 list.append("王五")
 print(list[0:5])
 删除
 del list[4:5]
 print(list[0:15])

 del list[:] 删除整个
 print(list[0:15])

'''2.字典
是一个可变容器模型，使用键值的形式存储数据，{"jian":'value'}
'''
 dict_new = {"name":'zhangsan','age':18,'sex':'man'} 键的值不能重复，每一个独一无二
 print(dict_new) 全部输出
 print(dict_new['name'],dict_new['age']) 只能访问键，不能访问值，但是可以把取出的值作为参数
 zhangsan_name = dict_new['name']    给变量赋值为键的值
 print(zhangsan_name)

 修改
 dict_new['age'] = 20
 print(dict_new['age'])
 print(dict_new)
 删除
 del dict_new['sex']
  print(dict_new['sex'])
 print(dict_new)
 清空
 dict_new.clear()
 print(dict_new)


'''3、元组
元组是一个不可变的序列，创建后就不能再修改,默认偏移量从0开始
'''
 tup = (1,2,3,4,5,6)
 tup1 = ("zhangsan","lisi","wangwu")
 tup2 = "zhangsan","lisi","wangerxiao"
 tup3 = ("zhangsan",)    如果只有一个元素，要在后面加,不然会识别成字符串

 print(tup,"\n",tup1,"\n",tup2,"\n",tup3)
 print(tup1[0],"\t",tup2[2])
 新增方法
 print(tup+tup1)     (1, 2, 3, 4, 5, 6, 'zhangsan', 'lisi', 'wangwu')
 print(tup*2)    (1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6)
 删除
 del tup1
 print(tup1)     NameError: name 'tup1' is not defined


'''4、集合
无序可变序列，使用set('')去定义个几个，里面的每一个元素都是唯一的，元素之间不能重复
'''
 ss = set("qwerty123")
 print(ss)
 print(type(ss)) 答应定义的方法
 for i in ss:
     if i == 'q':
         print(i)

 新增
 ss.add('A')
 print(ss)
 删除
 ss.remove("A")
 print(ss)
 更新
 ss.update([1,4,5,6,7,"1"])  更新后元素相同的会覆盖，注意：类型要一致才会覆盖
 print(ss)

 ss2 = set("123456QWER")
 并集
 ss3 = ss|ss2
 print(ss3)
 交集
 ss4 = ss & ss2
 print(ss4)
 print(ss.difference(ss2))   去除相同的部分，打印剩下的元素

 运算--计算
 set_number_one = set("1234567890qwertyuiopASDFGHJKL")
 set_number_two = set("1234567890+-")
 print("差运算“-”：",set_number_one - set_number_two)
 print("或运算“|”：",set_number_one | set_number_two)
 print("并运算“&”：",set_number_one & set_number_two)
 print("亦或运算“^”：",set_number_one ^ set_number_two)


'''运算符'''
 1、算术运算符：+-*% ** //
 num1 = 11
 num2 = 4
 print("+:",num1+num2)
 print("-:",num1-num2)
 print("*:",num1*num2)
 print("%取模:",num1%num2) 5/4=1.？？？   ==》 1
 print("**幂运算:",num1**num2)   5的4次方：625
 print("//取整：",num1 // num2)

 2、比较运算符 ： > < >= <= == != (python3已经去除：<>)
 number1 = 3
 number2 = 4
 user_Input = int(input("请输入一个整数（3）："))
 if (number1 == user_Input):
     print("值绝对等于：3")

 if (number1 != user_Input):
     print("你输入的值不是3，是：",user_Input)

 if (number1 > user_Input):
     print("大于3")

 if (number1 < user_Input):
     print("小于3")

 3.赋值运算   ： = += -= *= /=  %= **=  //=
 a=1
 print(a)
 a+=1
 print(a)    a=2

 b=2
 a+=b    a+=2  a+2=4
 print(a)
 a-=1    3
 a-=b     1
 print(a)
 没有a++ a--   ===》 += -=

 aa = 10
 print(aa//2)    5
 aa %= 3
 print(aa)

 aaa=10
 aaa**= 2    相当于10的2次方
 print(aaa)

 三目运算符
 num = 99 if 1>2 else 9
  if 1>2:
      num = 99
  else:
      num =9
 print(num)
 num = 99 if 1<2 else 9
 print(num)


 4、逻辑运算：逻辑非与或   true  flase
 se = 5
 me = 4
 print(se > me or me > se)   True
 print(se > me and me > se)   true  flase
 取反  not
 print(not se < me)  True


'''条件控制语句'''
 1、if单项判断  格式如下：  满足表达式，执行if
 if (表达式):
     print()
     pass
 input_numebr = int(input("input number:"))
 if input_numebr > 0 :
     print("大于0")

 if input_numebr  < 0 :
     print("小于0")

 if input_numebr  == 0 :
     print("等于0")

 双向判断
 if input_numebr > 0:
     print("双向判断：大于0")
 else:
     print("小于或等于：0")
 注意：不满足if时，会执行else下的命令；if和else的条件时相反的（相互排斥的）


 多项目判断
 if input_numebr > 0 :
     print("大于0")
 elif input_numebr < 0 :
     print("小于0")
 else:
     print("等于0")


 嵌套
 if input_numebr > 0 :
     if input_numebr == 3:
         print("大于0，且等于3")
     elif input_numebr > 3:
         print("大于3")
     else:
         print("大于0，且小于3")
 elif input_numebr < 0:
     if input_numebr < -10:
         if input_numebr > -20:
             print("您输入的值在-10和-20之间")
         else:
             print("您输入的值小于-20")
     else:
         print("您输入的值在-10和0之间")
 else:
     print("您输入的等于0")


'''循环语句
    一般是进行顺序执行，在各种控制结构中，可以允许复杂的循环执行路径；可以执行一个语句，或者多个语句

    格式：
        for  ....   in .....
        示例：
            for i in [1,2,3,4,5]:
                print(i)
'''

 word = ["zhangsan","lisi","wangwu","jick"]
 for lin in word:
     print("name:",lin)

 for num in range(2,10):
      print(num)
     for n in range(2,num):
         if num%n == 0:
             print("被整除的值：",num,n)
             break   跳出循环

 for num in range(2,10):
      print(num)
     for n in range(2,num):
         if num%n == 0:
             print("被整除的值：",num,n)
             continue    终止当前循环，继续先一个循环


'''while循环
    在条件为真时循环执行代码块的内容

    死循环：条件为真，会一直循环；注意：在写的过程中，要注意条件能够出现为假的情况
格式：
    while 条件：
        语句

'''
num = 0

while num < 5:   当条件为真时，会循环执行到条件为假为止
    print("当前num的值：", num)
    num += 1
    print(f"第{num}次循环")

 for循环和while循环的区别：
 1、for循环的次数确定，循环到所有次数执行完才会停止循环
 2、while循环次数不确定,只要满足条件就会一直执行，死循环就循环到底.....


num_new = len(str(input("输入的随机字符串:")))
num_ = 0   做计数
while num_new < 5:   当条件为真时，会循环执行到条件为假为止
    print("当前num的值：", num_new)
    num_new += 1
    num_ += 1
    print(f"第{num_}次循环")

  课堂：输入一个同学的成绩,60-70 A   70-80 S  80-90 SS  90-100 SSR
   课堂2: 99乘法表



```

```python
def score_average():
    scores = input("请输入成绩，用,分隔：").split(',')
    scores = [int(scores) for scores in scores]
    score_average = sum(scores) / len(scores)
    scores_666 = []
    scores_A = []
    scores_P = []
    scores_Q = []
    scores_N = []
    scores_D = []
    for score_item in scores:
        result = fenduan(score_item)
        if result == '666':
            scores_666.append(score_item)
        elif result == 'A':
            scores_A.append(score_item)
        elif result == 'P':
            scores_P.append(score_item)
        elif result == 'Q':
            scores_Q.append(score_item)
        elif result == 'N':
            scores_N.append(score_item)
        else:
            scores_D.append(score_item)

    print("班级平均分：", "%.2f" %score_average,'位于',fenduan(score_average),'段')  #保留两位小数
    print("666段有：",len(scores_666), "人，分别为：", scores_666)
    print("A段有：",len(scores_A), "人，分别为：", scores_A)
    print("P段有：",len(scores_P), "人，分别为：", scores_P)
    print("Q段有：",len(scores_Q), "人，分别为：", scores_Q)
    print("不及格段有：",len(scores_N), "人，分别为：", scores_N)
    print("非法成绩为：", scores_D)

def fenduan(score):   #分段函数,用于成绩所属分段
    if score >= 90 and score <= 100:
        return '666'
    elif score >= 80 and score <= 89:
        return 'Q'
    elif score >= 70 and score <= 79:
        return 'P'
    elif score >= 60 and score <= 69:
        return 'A'
    elif score >= 0 and score <= 59:
        return 'N'
    else:
        return '-1'

def guess_number(guess, number):
    if guess == number:
        return False
    elif guess > number:
        return '猜大了！'
    else:
        return '猜小了！'
def guess_number_while():
    import random
    number = random.randint(1, 100)
    count = 0
    while count < 10:
        guess = int(input("while-请输入你猜的数字："))
        count += 1
        guess_result = guess_number(guess, number)
        if guess_result==False:
            print("恭喜你，猜对了！")
            break
        else:
            print(guess_result)
    else:
        print("game over！正确答案是：", number)

def guess_number_for():
    import random
    number = random.randint(1, 100)
    count = 0
    for i in range(10):
        guess = int(input("for-请输入你猜的数字："))
        count += 1
        guess_result = guess_number(guess, number)
        if guess_result == False:
            print("恭喜你，猜对了！")
            break
        else:
            print(guess_result)
    else:
        print("game over！正确答案是：", number)

def daffodil(last):
    for i in range(10, last):
        length = len(str(i))
        number_list = [int(j) for j in str(i)]  # 将数字转化为列表，便于计算
        if i == sum([number_list[j] ** length for j in range(length)]):
            print(i)

if __name__ == '__main__':
    # 1.输入几个同学的成绩，计算平均成绩，60-70位A，70-80位P，80-90位Q，90以上666，最后输出成绩的分段
    score_average()
    # 2.猜数字，一共10次机会，大了输出大了，小了输出小了，正确输出正确：for循环和while循环都要写
    guess_number_while()
    guess_number_for()
    # 3.水仙花，1000以内的水仙花：153=1*1*1+5*5*5+3*3*3
    daffodil(last=1000)

#请输入成绩，用,分隔：12,56,78,90,98,99,67,78,84,96
#班级平均分： 75.80 位于 P 段
#666段有： 4 人，分别为： [90, 98, 99, 96]
#A段有： 1 人，分别为： [67]
#P段有： 2 人，分别为： [78, 78]
#Q段有： 1 人，分别为： [84]
#不及格段有： 2 人，分别为： [12, 56]
# while-请输入你猜的数字：50
# 猜小了！
# while-请输入你猜的数字：75
# 猜小了！
# while-请输入你猜的数字：85
# 猜小了！
# while-请输入你猜的数字：95
# 猜小了！
# while-请输入你猜的数字：97
# 猜小了！
# while-请输入你猜的数字：99
# 猜大了！
# while-请输入你猜的数字：98
# 恭喜你，猜对了！
# for-请输入你猜的数字：50
# 猜小了！
# for-请输入你猜的数字：75
# 猜小了！
# for-请输入你猜的数字：80
# 猜小了！
# for-请输入你猜的数字：90
# 猜小了！
# for-请输入你猜的数字：95
# 猜大了！
# for-请输入你猜的数字：93
# 恭喜你，猜对了！
# 153
# 370
# 371
# 407
```

```python
def score_average():
    scores = input("请输入成绩，用,分隔：").split(',')
    scores = [int(scores) for scores in scores]
    score_average = sum(scores) / len(scores)
    scores_666 = []
    scores_A = []
    scores_P = []
    scores_Q = []
    scores_N = []
    scores_D = []
    for score_item in scores:
        result = fenduan(score_item)
        if result == '666':
            scores_666.append(score_item)
        elif result == 'A':
            scores_A.append(score_item)
        elif result == 'P':
            scores_P.append(score_item)
        elif result == 'Q':
            scores_Q.append(score_item)
        elif result == 'N':
            scores_N.append(score_item)
        else:
            scores_D.append(score_item)

    print("班级平均分：", "%.2f" %score_average,'位于',fenduan(score_average),'段')  #保留两位小数
    print("666段有：",len(scores_666), "人，分别为：", scores_666)
    print("A段有：",len(scores_A), "人，分别为：", scores_A)
    print("P段有：",len(scores_P), "人，分别为：", scores_P)
    print("Q段有：",len(scores_Q), "人，分别为：", scores_Q)
    print("不及格段有：",len(scores_N), "人，分别为：", scores_N)
    print("非法成绩为：", scores_D)

def fenduan(score):   #分段函数,用于成绩所属分段
    if score >= 90 and score <= 100:
        return '666'
    elif score >= 80 and score <= 89:
        return 'Q'
    elif score >= 70 and score <= 79:
        return 'P'
    elif score >= 60 and score <= 69:
        return 'A'
    elif score >= 0 and score <= 59:
        return 'N'
    else:
        return '-1'

def guess_number(guess, number):
    if guess == number:
        return False
    elif guess > number:
        return '猜大了！'
    else:
        return '猜小了！'
def guess_number_while():
    import random
    number = random.randint(1, 100)
    count = 0
    while count < 10:
        guess = int(input("while-请输入你猜的数字："))
        count += 1
        guess_result = guess_number(guess, number)
        if guess_result==False:
            print("恭喜你，猜对了！")
            break
        else:
            print(guess_result)
    else:
        print("game over！正确答案是：", number)

def guess_number_for():
    import random
    number = random.randint(1, 100)
    count = 0
    for i in range(10):
        guess = int(input("for-请输入你猜的数字："))
        count += 1
        guess_result = guess_number(guess, number)
        if guess_result == False:
            print("恭喜你，猜对了！")
            break
        else:
            print(guess_result)
    else:
        print("game over！正确答案是：", number)

def daffodil(last):
    for i in range(10, last):
        length = len(str(i))
        number_list = [int(j) for j in str(i)]  # 将数字转化为列表，便于计算
        if i == sum([number_list[j] ** length for j in range(length)]):
            print(i)

if __name__ == '__main__':
    # 1.输入几个同学的成绩，计算平均成绩，60-70位A，70-80位P，80-90位Q，90以上666，最后输出成绩的分段
    score_average()
    # 2.猜数字，一共10次机会，大了输出大了，小了输出小了，正确输出正确：for循环和while循环都要写
    guess_number_while()
    guess_number_for()
    # 3.水仙花，1000以内的水仙花：153=1*1*1+5*5*5+3*3*3
    daffodil(last=1000)

#请输入成绩，用,分隔：12,56,78,90,98,99,67,78,84,96
#班级平均分： 75.80 位于 P 段
#666段有： 4 人，分别为： [90, 98, 99, 96]
#A段有： 1 人，分别为： [67]
#P段有： 2 人，分别为： [78, 78]
#Q段有： 1 人，分别为： [84]
#不及格段有： 2 人，分别为： [12, 56]
# while-请输入你猜的数字：50
# 猜小了！
# while-请输入你猜的数字：75
# 猜小了！
# while-请输入你猜的数字：85
# 猜小了！
# while-请输入你猜的数字：95
# 猜小了！
# while-请输入你猜的数字：97
# 猜小了！
# while-请输入你猜的数字：99
# 猜大了！
# while-请输入你猜的数字：98
# 恭喜你，猜对了！
# for-请输入你猜的数字：50
# 猜小了！
# for-请输入你猜的数字：75
# 猜小了！
# for-请输入你猜的数字：80
# 猜小了！
# for-请输入你猜的数字：90
# 猜小了！
# for-请输入你猜的数字：95
# 猜大了！
# for-请输入你猜的数字：93
# 恭喜你，猜对了！
# 153
# 370
# 371
# 407

```