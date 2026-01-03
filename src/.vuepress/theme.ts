import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { commentPlugin } from '@vuepress/plugin-comment'
export default hopeTheme({
  hostname: "https://min168.top",
  print: true,
  darkmode: "disable", // 或 "toggle", "auto", "enable", "disable"
  // "switch": 在深色模式，浅色模式和自动之间切换 (默认)
  // "toggle": 在深色模式和浅色模式之间切换
  // "auto": 自动根据用户设备主题或当前时间决定是否应用深色模式
  // "enable": 强制深色模式
  // "disable": 禁用深色模式

  author: {
    name: "卷卷",
  },

  logo: "/assets/logo.png",
  favicon: "/assets/favicon.ico",



  docsDir: "src",
  focus: true,


  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚已移至 Blog 布局的 pageBottom 插槽中

  footer: "少即是多，慢即是快.",
  // <div><a href="" target="_blank" rel="noopener" title="开往-友链接力"><img src="/assets/icon/travelling_len.svg" alt="开往-友链接力" style="width:auto;height:30px;" ></a></div>
  // <div><a href="" target="_blank" rel="noopener" title="博友圈"><img src="/assets/icon/planet-shuttle.svg" alt="博友圈" style="width:auto;height:30px;"></a></div>
  // <div><a href="" target="_blank"> <img src="/assets/icon/wormhole_4_tp.gif" alt="穿梭虫洞"  title="穿梭虫洞-随机访问十年之约友链博客"  style="width:auto;height:30px;" ></a></div>
  // <div><a href="" target="_blank"> <img src="/assets/icon/suiji_en.gif" alt="随机博客"  title="随机博客"  style="width:auto;height:18px;" ></a></div>
  // <div><a href="" target="_blank"> <img src="/assets/icon/blogscn.svg" alt="笔墨迹"  title="笔墨迹-随机博客"  style="width:auto;height:30px;" ></a></div></div>`,


  displayFooter: true,
  // 博客相关
  blog: {
    description: "网络安全知识库",
    intro: "/intro.html",
    medias: {
      Rss: "https://min168.top/rss.xml",
      blogscn: {
        icon: "https://photo.xiangming.site/img/blogscn_icon.png",
        link: "https://blogscn.fun/",
      },
       boke: {
        icon: "https://boke.lu/logo/%E9%80%8F%E6%98%8E%E5%BA%95%E5%9C%86%E5%BA%95.png",
        link: "https://boke.lu/",
      },
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/com/think/": ["youze"],
      "/com/job/": ["youze"],
    },
  },


  // metaLocales: {
  //   editLink: "在 GitHub 上编辑此页",
  // },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    markmap: true,
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },
  fullscreen: true,
  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    // blog: {
    //   excerptLength: 200,      // 自动生成 200 字符的摘要
    // },
    search: true,
    slimsearch: true,
    
    feed: {

      rss: true,
      atom: true,
      json: true,
      channel: {
        title: "卷卷",
        link: "https://min168.top/", // 包含 base 路径
        description: "网络安全知识库",
        language: "zh-CN",
      },
    },

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    comment: {


      //Giscus 评论系统配置
      // provider: "Giscus",
      // repo:"youze27/blog",
      // repoId:"R_kgDON1I9iA",
      // category:"Announcements",
      // categoryId:"DIC_kwDON1I9iM4Cnaa_",



      // Waline评论系统配置
      provider: "Waline",
      serverURL: "https://blogcomment-ashen.vercel.app",

      // 其他 Waline 配置项（可选）...
      // 例如：暗黑模式适配、表情设置等
      // dark: 'auto',
      emoji: [
        '//unpkg.com/@waline/emojis@1.4.0/soul-emoji',
        '//unpkg.com/@waline/emojis@1.4.0/tw-flag',
        '//unpkg.com/@waline/emojis@1.1.0/weibo',
        '//unpkg.com/@waline/emojis@1.4.0/qq',
        '//unpkg.com/@waline/emojis@1.4.0/tw-object',
        '//unpkg.com/@waline/emojis@1.4.0/tw-people',
        '//unpkg.com/@waline/emojis@1.1.0/bilibili',
        '//unpkg.com/@waline/emojis@1.4.0/bmoji',
        '//unpkg.com/@waline/emojis@1.4.0/alus',
        '//unpkg.com/@waline/emojis@1.4.0/tieba'

      ],
      // 全局启用评论
      comment: true,
      // 页面访问量
      pageview: true,
    },

    components: {
    components: [
      "ArtPlayer",
      "Badge",
      "BiliBili",
      "CodePen",
      "PDF",
      "Share",
      "SiteInfo",
      "StackBlitz",
      "VPBanner",
      "VPCard",
      "VidStack",
    ],
  },

    icon: {
      assets: "fontawesome-with-brands",
    },
  }
});