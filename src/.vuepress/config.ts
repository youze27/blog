import { defineUserConfig } from "vuepress";
import { feedPlugin } from '@vuepress/plugin-feed'
import { clarityAnalyticsPlugin } from '@vuepress/plugin-clarity-analytics'
import theme from "./theme.js";
import { popperPlugin } from "./plugins/vuepress-plugin-popper/index.js";
import { hopeTheme } from 'vuepress-theme-hope';



export default defineUserConfig({

  base: "/",
  lang: "zh-CN",
  title: "卷卷",
  description: "网络安全知识库",

  plugins:
    [
      
      popperPlugin({  //鼠标动画特效插件
        config: {
          popper: {
            shape: 'star',
            size: 1.95,
            numParticles: 10,
          }
        },
      }),

      clarityAnalyticsPlugin({ id: "z28ghn2hc9" }),  // Microsoft Clarity 行为分析

    ],

    
  theme,

   locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
    },
    // "/en/": {
    //   // 设置正在使用的语言
    //   lang: "en-US",
    // },
  },


});

