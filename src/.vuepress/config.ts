import { defineUserConfig } from "vuepress";
import { feedPlugin } from '@vuepress/plugin-feed'
import theme from "./theme.js";
// import { PopperShape } from "@moefy-canvas/theme-popper";
//vuepress-plugin-popper 基于 @moefy-canvas/theme-popper 插件，为 VuePress-v2 版本提供了鼠标点击特效功能
import { popperPlugin } from "./plugins/vuepress-plugin-popper/index.js";
import { hopeTheme } from 'vuepress-theme-hope';
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d';




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

      oml2dPlugin({  //看板娘 Live2D
        // @ts-ignore
      }),


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

