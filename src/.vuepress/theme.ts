import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",

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
  footer: "天行健，君子以自强不息。",
  displayFooter: true,
  copyright : "Copyright © 2023-present Juan",

  // 博客相关
  blog: {
    description: "网络安全知识库",
    intro: "/intro.html",
    medias: {
      Gitee: "https://gitee.com/youzezhang",
      GitHub: "https://github.com/youze27",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
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
    // mermaid: true,

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
    

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    comment: {
      provider: "Giscus",
      repo:"youze27/youze_blog",
      repoId:"R_kgDONoDE_w",
      category:"Announcements",
      categoryId:"DIC_kwDONoDE_84Cl4Gt",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      assets: "fontawesome-with-brands",
    },

  }

 
});