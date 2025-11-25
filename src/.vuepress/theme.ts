import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { commentPlugin } from '@vuepress/plugin-comment'
export default hopeTheme({
  hostname: "https://youze27.github.io",

  author: {
    name: "卷卷",
  },

  logo: "/assets/logo.png",
  favicon: "/assets/favicon.ico",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",
  focus: true,
  

  
  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "时间就像海绵里的水，挤一挤总会有的！",
  displayFooter: true,
  copyright : "Copyright © 2023-present Juan",

  // 博客相关
  blog: {
    description: "网络安全知识库",
    intro: "/intro.html",
    medias: {
      Gitee: "https://gitee.com/youzezhang",
      GitHub: "https://github.com/youze27",
      Rss: "https://youze27.github.io/blog/rss.xml",
      Email: "mailto:youze27@163.com",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/com/think/": ["youze"],
      "/com/job/": ["youze"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

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
    search: true,
    slimsearch: true,
    feed: {
      rss: true,
      atom: true,
      json: true,
      channel: {
        title: "卷卷", 
        link: "https://youze27.github.io/blog/", // 包含 base 路径
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
      dark: 'auto',
      emoji: [
        '//unpkg.com/@waline/emojis@1.1.0/weibo',
        '//unpkg.com/@waline/emojis@1.1.0/bilibili',
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