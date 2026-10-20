---
title: Frontmatter配置语法
index: true
feed: false      # 从 RSS 订阅中排除
category:
  - markdown
tag:
  - markdown
---

## 一、页面信息类（Info Frontmatter）

这些字段用于定义页面的核心元数据，对应主题的“信息 Frontmatter”配置。

| 字段 | 类型 | 默认值 / 说明 |
|---|---|---|
| `title` | `string` | 页面标题，默认为 Markdown 第一个 `h1` |
| `shortTitle` | `string` | 短标题，优先显示在导航栏、侧边栏、路径导航中 |
| `description` | `string` | 页面描述 |
| `icon` | `string` | 页面图标的 FontClass 或文件路径 |
| `author` | `string \| boolean \| Author` | 作者；设为 `false` 可阻止回退到全局默认作者 |
| `isOriginal` | `boolean` | 是否原创，默认 `false` |
| `date` | `string` | 写作时间，格式 `YYYY-MM-DD` 或 `YYYY-MM-DD hh:mm:ss` |
| `category` | `string \| string[]` | 文章分类 |
| `tag` | `string \| string[]` | 文章标签（注意是 `tag`，官方未使用 `tags` 作为主题字段） |
| `license` | `string` | 页面协议名称，默认继承主题选项 |
| `copyright` | `string \| false` | 页面版权信息，显示在页脚 |
| `pageview` | `boolean` | 是否显示浏览量，需配合 Waline |
| `article` | `boolean` | 是否加入文章列表，默认 `true` |
| `timeline` | `boolean` | 是否加入时间线，默认 `true` |
| `sticky` | `boolean \| number` | 列表置顶；数字越大越靠前 |
| `star` | `boolean \| number` | 星标文章；数字越大越靠前 |
| `cover` | `string` | 页面预览图 |

---

## 二、页面布局与导航类（Layout Frontmatter）

这些字段控制页面在站内如何被索引、导航和展示。

| 字段 | 类型 | 默认值 / 说明 |
|---|---|---|
| `pageInfo` | `PageInfo[] \| false` | 自定义页面信息条目，可选值见官方表 |
| `breadcrumb` | `boolean` | 是否开启路径导航 |
| `breadcrumbIcon` | `boolean` | 路径导航中是否显示图标 |
| `breadcrumbExclude` | `boolean` | 当前页是否被路径导航排除，默认 `false` |
| `navbar` | `boolean` | 设为 `false` 禁用导航栏 |
| `sidebar` | `false \| SidebarArrayOptions` | 设为 `false` 禁用侧边栏；设为 `[]` 仅渲染插槽 |
| `index` | `boolean` | 是否在侧边栏或目录中索引，默认 `true` |
| `order` | `number` | 侧边栏/目录中的排序；正数靠前，负数靠后 |
| `dir.text` | `string` | 结构侧边栏分组标题，默认取 `README.md` 标题 |
| `dir.icon` | `string` | 分组图标 |
| `dir.collapsible` | `boolean` | 分组是否可折叠，默认 `true` |
| `dir.link` | `boolean` | 分组是否可点击，默认 `false` |
| `dir.index` | `boolean` | 是否索引该目录，默认 `true` |
| `dir.order` | `number` | 分组在侧边栏中的顺序 |
| `comment` | `boolean` | 当前页是否开启评论 |
| `lastUpdated` | `boolean` | 是否显示最后更新时间 |
| `editLink` | `boolean` | 是否显示“编辑此页”链接 |
| `contributors` | `boolean` | 是否显示贡献者 |
| `changelog` | `boolean` | 是否显示变更日志 |
| `prev` | `AutoLinkConfig \| string \| false` | 手动指定上一篇 |
| `next` | `AutoLinkConfig \| string \| false` | 手动指定下一篇 |
| `footer` | `boolean \| string \| HTMLString` | 页脚内容；`false` 禁用，`""` 移除默认内容 |
| `copyright` | `string \| false` | 版权信息（与“信息类”中的 `copyright` 同名字段，布局文档中再次列出） |
| `backToTop` | `boolean` | 是否显示返回顶部按钮，默认 `true` |
| `toc` | `GetHeadersOptions \| boolean` | 标题列表（TOC）配置，默认继承主题选项 |
| `containerClass` | `string` | 额外的页面容器 Class |

---

## 三、首页 / 博客首页专属字段

需设置 `home: true` 并配合 `layout: Blog`（博客首页）或 `home: true` + `portfolio: true`（作品集首页）使用。

| 字段 | 类型 | 说明 |
|---|---|---|
| `home` | `true` | 启用首页布局 |
| `layout` | `"Blog"` | 博客风格首页需显式指定 |
| `heroText` | `string` | 主标题；设为空字符串可隐藏默认标题 |
| `tagline` | `string` | 副标题 |
| `heroImage` | `string` | 主图（Logo） |
| `heroImageDark` | `string` | 暗色模式主图 |
| `heroAlt` | `string` | 主图替代文本（A11y） |
| `bgImage` | `string` | 背景图（完整 URL 或绝对路径） |
| `bgImageDark` | `string` | 暗色模式背景图 |
| `heroFullScreen` | `boolean` | 信息是否全屏展示 |
| `heroImageStyle` | `Record \| string` | 主图样式 |
| `bgImageStyle` | `Record \| string` | 背景图样式 |
| `projects` | `array` | 项目/书籍/链接列表，每项含 `name`、`link`、`desc`、`icon` |

---

## 四、作品集 / 档案首页专属字段（Portfolio）

需设置 `home: true` + `portfolio: true`。

| 字段 | 类型 | 默认值 / 说明 |
|---|---|---|
| `portfolio` | `true` | 必须为 `true` 以启用作品集布局 |
| `home` | `true` | 建议设为 `true`（作为首页时） |
| `name` | `string` | 作品集名称，默认取 `themeConfig.author.name` |
| `avatar` | `string` | 头像图片（不支持相对路径） |
| `avatarDark` | `string` | 暗色模式头像 |
| `titles` | `string[]` | 头衔列表 |
| `avatarStyle` | `Record \| string` | 头像 CSS 样式 |
| `avatarAlt` | `string` | 头像替代文本，默认同 `name` |
| `bgImage` / `bgImageDark` | `string` | 背景图 / 暗色背景图 |
| `bgImageStyle` | `Record \| string` | 背景图 CSS 样式 |
| `welcome` | `string` | 欢迎语，默认 `"Hi there, I am"` |
| `medias` | `PortfolioMedia[]` | 社交媒体链接数组（`icon`、`name`、`link`） |
| `content` | `"portfolio" \| "doc" \| "none"` | Markdown 内容的渲染方式，默认 `"portfolio"` |

---

## 五、幻灯片专属字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `layout` | `"Slides"` | 将页面渲染为幻灯片；页面内应只包含幻灯片语法 |

---

## 六、Feed 订阅源相关字段（@vuepress/plugin-feed）

 `feed` 字段由 `@vuepress/plugin-feed` 读取。默认情况下**除首页外所有 Markdown 页面都会进入 Feed**，`feed: false` 是显式排除的手段。

### 6.1 控制是否收录

| 字段 | 类型 | 说明 |
|---|---|---|
| `feed` | `false` | 将该页面从 Feed 流中移除 |

### 6.2 Feed 条目覆盖字段（`feed` 设为对象时）

| 字段 | 类型 | 说明 |
|---|---|---|
| `feed.title` | `string` | 该条目在 Feed 中的标题 |
| `feed.description` | `string` | Feed 条目描述 |
| `feed.content` | `string` | Feed 条目正文内容 |
| `feed.author` | `FeedAuthor[] \| FeedAuthor` | 条目作者（含 `name`、`email`、`url`、`avatar`） |
| `feed.contributor` | `FeedContributor[] \| FeedContributor` | 条目贡献者 |
| `feed.guid` | `string` | 条目的唯一标识符 |

### 6.3 插件自动读取的“标准 Frontmatter 字段”

Feed 插件会自动从以下页面字段中取值，无需在 `feed` 对象内重复声明：

`title`、`description`、`date`、`article`（若为 `false`，页面不会进入 Feed）、`copyright`、`cover` / `image` / `banner`（封面图，需完整 URL 或绝对路径）。

---

## 七、VuePress 核心 / 默认主题预定义字段

这些字段由 VuePress 核心或默认主题提供，vuepress-theme-hope 同样兼容。

| 字段 | 类型 | 默认值 / 说明 |
|---|---|---|
| `lang` | `string` | 页面语言，默认 `en-US` |
| `permalink` | `string` | 自定义永久链接 |
| `metaTitle` | `string` | 覆盖 `<title>`，默认 `${page.title} \| ${siteConfig.title}` |
| `meta` | `array` | 注入额外 `<meta>` 标签 |
| `canonicalUrl` | `string` | 规范链接（1.7.1+） |
| `navbar` | `boolean` | 默认主题的导航栏开关 |
| `sidebar` | `boolean \| 'auto'` | 默认主题的侧边栏开关 |
| `prev` / `next` | `boolean \| string` | 默认主题的上一篇/下一篇 |
| `search` | `boolean` | 默认主题的搜索开关 |
| `tags` | `array` | 默认主题的标签字段（注意：主题博客体系用的是 `tag`，而非 `tags`） |

---
