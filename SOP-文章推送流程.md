# 文章推送 SOP

## 流程概述

```
获取原文URL → 抓取内容 → 生成中文文章 → 下载图片 → 更新图片路径 → 推送到GitHub
```

## 详细步骤

### 1. 获取原文并抓取内容
- 用户提供原文链接（如 `https://www.iru.com/blog/xxx`）
- 使用 webfetch 工具获取内容，格式设为 markdown

### 2. 创建文章文件
- 参考现有模板格式添加文件头：
```yaml
---
title: '标题'
short_title: '短标题'
date: 2026-XX-XX XX:XX:XX
description: 描述
tag:
  - 标签1
  - 标签2
category:
  - 分类
timeline: false
isOriginal: false
index: true
---
```
- 文章标题使用中文，将英文标题翻译为中文
- 将内容翻译为中文（技术术语可保留英文）
- 文件保存到 `C:\blog\src\like\`

### 3. 下载图片
- 从文章中提取所有 `iru.com` 图片链接
- 创建 `C:\blog\src\like\assets\` 目录（如果不存在）
- 下载所有图片到 assets 目录
- 图片文件名使用小写和连字符（如 `image-name.png`）

### 4. 更新图片路径
- 将文章中的远程图片 URL 替换为本地路径
- 格式：`./assets/文件名.png`

### 5. 添加原文链接（末尾）
- 在文章末尾添加原文链接标注：
```markdown
> 原文链接：https://www.iru.com/blog/xxx
```

### 6. 推送到 GitHub
```bash
git add src/like/文章名.md src/like/assets/
git commit -m "add: 新增文章标题"
git push
```

### 7. 读者评论（未来）
- 用户提供评论后，在原文链接前添加评论内容
- 再次提交并推送

## 文件头模板

```yaml
---
title: '文章标题'
short_title: '短标题'
date: YYYY-MM-DD HH:MM:SS
description: 文章描述摘要
tag:
  - 标签1
  - 标签2
category:
  - 分类
timeline: false
isOriginal: false
index: true
---
```

## 注意事项

- 图片必须下载到 `src/like/assets/` 目录（与 md 文件同级）
- 图片路径使用相对路径 `./assets/xxx.png`
- 原文链接添加到文章末尾
- 提交信息使用中文描述