import { defineUserConfig } from "vuepress";
import { feedPlugin } from '@vuepress/plugin-feed'
import theme from "./theme.js";
import { PopperShape } from "@moefy-canvas/theme-popper";
//vuepress-plugin-popper 基于 @moefy-canvas/theme-popper 插件，为 VuePress-v2 版本提供了鼠标点击特效功能
import { popperPlugin } from "./plugins/vuepress-plugin-popper/index.js";




export default defineUserConfig({


  base: "/",

  lang: "zh-CN",
  title: "卷卷",
  description: "网络安全知识库",

  plugins: 
    [ 
      popperPlugin({  //鼠标动画特效插件
        config: {
          shape: PopperShape.Star,
          size: 1.95,
          numParticles: 10,
        },
      }),

  ],
  theme,


});

