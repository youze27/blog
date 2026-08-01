# Skills

此目录用于存储文章写作相关的 Skill（技能/提示词模板）。每个 Skill 职责单一，可组合协作完成完整的文章发布流程。

## Skill 索引

| Skill | 职责 | 输入 | 输出 |
|-------|------|------|------|
| [`抓取文章.md`](抓取文章.md) | 从 URL 抓取文章正文 | 文章 URL | Markdown 正文 |
| [`生成文章头.md`](生成文章头.md) | 生成 VuePress frontmatter | 文章元信息 | YAML 文件头 |
| [`下载图片.md`](下载图片.md) | 批量下载远程图片到本地 | URL 列表 + 目标目录 | 本地图片文件 |
| [`替换图片路径.md`](替换图片路径.md) | 远程 URL 替换为本地路径 | Markdown + URL 映射 | 替换后的 Markdown |
| [`推送GitHub.md`](推送GitHub.md) | 提交并推送到远程仓库 | 提交信息 | Git 推送结果 |

## 协作流程

以"转载文章"为例，各 Skill 按序协作：

```
抓取文章 → 生成文章头 → 下载图片 → 替换图片路径 → 推送GitHub
```

1. **抓取文章**：从用户提供的 URL 获取 Markdown 正文
2. **生成文章头**：根据文章信息生成 frontmatter（category 为"转载"）
3. **下载图片**：批量下载正文中的远程图片到 `src/like/assets/`
4. **替换图片路径**：将正文中的远程 URL 替换为 `./assets/xxx.png`
5. **推送GitHub**：`git add . && git commit -m "add: 标题" && git push`

## 说明

- 此目录为开发辅助目录，不参与 VuePress 站点构建（不在 `src/` 下）
- 每个 Skill 独立可用，也可按需组合
- 后续新增的写作相关 Skill 请放入此目录并更新本索引