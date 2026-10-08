# youze_blog

> 我的博客仓库 —— 基于 VuePress 2.0 + vuepress-theme-hope 搭建的网络安全知识库，博主"卷卷"，定位"用工程思维解构安全"。

## 技术栈

- **构建工具**：VuePress 2.0 (rc.26) + Webpack Bundler
- **主题**：vuepress-theme-hope
- **包管理器**：pnpm 9.15.3
- **附加功能**：Waline 评论系统、Mermaid 图表、Markmap 思维导图、ECharts、Live2D 看板娘（oh-my-live2d）、Moefy 鼠标点击特效、视频播放（vidstack）

## 目录结构

`src/` 为内容源目录，按主题分类：

| 目录 | 标题 | 内容 |
|------|------|------|
| `perm/` | 攻防对抗 🐛 | Web 漏洞、渗透测试、提权、靶场实战 |
| `response/` | 防守之道 🦠 | 应急响应、日志分析、安全加固 |
| `reverse/` | 逆向免杀 🦠 | 逆向工程、调试笔记 |
| `net/` | 开发运维 🔌 | Linux/Docker/Git/Python/PHP 等技术笔记 |
| `com/` | 生活杂谈 💼 | 工作/阅读/思考/旅行随笔 |
| `like/` | 转载 👍 | 转载的安全资讯文章 |
| `ai/` | AI笔记 💬 | 与 AI 对话整理的知识点 |

每个目录下包含 `README.md`（分类首页配置）和 `assets/`（图片资源）。

## 关键配置

- `src/.vuepress/config.ts`：站点基础配置（标题"卷卷"、语言 zh-CN、鼠标特效插件等）
- `src/.vuepress/navbar.ts`：导航栏配置
- `src/.vuepress/sidebar.ts`：侧边栏配置
- `src/.vuepress/theme.ts`：主题详细配置（评论、Feed、加密、Markdown 增强等）
- `src/intro.md`：关于我 + 友链页面
- `src/clause.md`：免责声明（渗透测试相关法律声明）

## 构建与部署

### 环境要求

- Node.js
- pnpm 9.15.3+

### 本地开发

```bash
pnpm install        # 安装依赖
pnpm docs:dev       # 启动本地开发服务器
```

### 构建生产版本

```bash
pnpm docs:build     # 构建到 src/.vuepress/dist
```

### 清理缓存开发

```bash
pnpm docs:clean-dev # 清理缓存后启动开发服务器
```

### 部署

构建产物位于 `src/.vuepress/dist`，可部署到任意静态托管服务（如 GitHub Pages、Vercel、Netlify）。站点域名配置为 `https://min168.top/`。

## 许可证

MIT


你的网站配置了 Cloudflare 代理（橙色云朵），这会导致 GitHub 无法直接验证你的域名，从而无法自动续期 SSL 证书。证书过期后，你的 Cloudflare 又处于“完全（严格）”模式，它发现源站证书失效，就会立刻报 526 错误，阻断访问。

🛠️ 根本解决步骤
要彻底解决这个问题，需要暂时调整设置，让 GitHub 能成功续期证书：

暂时切换 SSL 模式：在 Cloudflare 的 SSL/TLS 设置中，先把模式从 “完全（严格）” 改为 “完全”，让网站先恢复访问。

暂时关闭代理：在 Cloudflare 的 DNS 设置里，找到指向 GitHub 的 CNAME 记录（例如 min168.top 或 www），点击橙色云朵将其变为灰色（仅 DNS），暂时关闭代理。

触发 GitHub 重新签发证书：等待几分钟后，进入 GitHub 仓库的 Settings > Pages，先移除（Remove） 自定义域名，再重新添加（Save）。这能强制 GitHub 重新发起验证。当 GitHub 显示证书状态为 Active 且 Enforce HTTPS 可用后，说明续期成功。

恢复 Cloudflare 代理：证书续期成功后，再回到 Cloudflare DNS，把云朵重新点亮为橙色（已代理）。

恢复严格模式：确认网站通过 https 正常访问后，最后将 SSL/TLS 模式改回 “完全（严格）” 即可。

💡 预防建议
为了避免证书再次因代理而续期失败，你可以考虑让 Cloudflare 代理状态保持为灰色（仅 DNS），完全依赖 GitHub Pages 自己的 CDN 服务。如果必须使用 Cloudflare 的代理功能，建议在证书临近到期时（约每 3 个月），手动执行一次上述第 2 步来确保续期成功。

