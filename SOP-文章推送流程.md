# 文章推送 SOP（节省 Token 版）

## 流程概述

```
用户给URL → 抓取内容 → 生成文章 → 批量下载图片 → 批量替换路径 → 推送
```

## 详细步骤

### 1. 抓取内容
- 使用 webfetch 获取内容，format=markdown
- 只提取文章正文部分，不需要完整页面

### 2. 创建文章（含文件头）
```yaml
---
title: '标题'
short_title: '短标题'
date: 2026-XX-XX XX:XX:XX
description: 描述
tag:
  - 标签
category:
  - 转载  # like 目录用
  - AI对话笔记  # ai 目录用
timeline: false
isOriginal: false
index: true
---
```
- like 目录：category 用 "转载"
- ai 目录：category 用 "AI对话笔记"
- 文件保存到 `C:\blog\src\like\` 或 `C:\blog\src\ai\`

### 3. 批量下载图片（一次性脚本）
创建并运行下载脚本，一次性下载所有图片：
```powershell
# 在 C:\blog 根目录运行
$urls = @(
    @{url="图片URL1";name="图片名1.png"},
    @{url="图片URL2";name="图片名2.png"}
)
$outDir = "C:\blog\src\like\assets"  # 或 "C:\blog\src\ai\assets"
foreach ($item in $urls) {
    Invoke-WebRequest -Uri $item.url -OutFile (Join-Path $outDir $item.name)
}
```

### 4. 批量替换路径（一次性替换）
- 使用单一正则表达式替换所有远程 URL 为本地路径
- 不逐个手动 edit

### 5. 推送 GitHub
```bash
git add . && git commit -m "add: 新增文章标题" && git push
```

## 节省 Token 的关键点

| 环节 | 原做法 | 优化做法 |
|------|--------|----------|
| 抓取 | 获取完整��容 | 只取文章正文 |
| 下载图片 | 逐个下载 | 脚本批量下载 |
| 替换路径 | 逐个 edit | 正则批量替换 |
| git add | 逐个指定 | `git add .` |

## 文件头模板

```yaml
---
title: '标题'
short_title: '短标题'
date: YYYY-MM-DD HH:MM:SS
description: 描述
tag:
  - 标签
category:
  - 转载  # like 目录
  - AI对话笔记  # ai 目录
timeline: false
isOriginal: false
index: true
---
```

## 注意事项

- 图片保存到 `src/like/assets/` 或 `src/ai/assets/`
- 图片路径用 `./assets/xxx.png`
- 用户直接粘贴内容：不需要添加原文链接
- 可抓取的URL：自动添加原文链接到末尾