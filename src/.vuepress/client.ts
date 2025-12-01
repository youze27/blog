import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
// .vuepress/client.js
// 基础样式
import 'vidstack/player/styles/base.css';
// 主题样式
import 'vidstack/player/styles/default/theme.css';
// 音频播放器布局样式
import 'vidstack/player/styles/default/layouts/audio.css';
// 视频播放器布局样式（如果用到视频）
import 'vidstack/player/styles/default/layouts/video.css';
export default defineClientConfig({
  // 注册自定义布局
  layouts: {
    Blog,
  },
 setup() {
      // 设置下雪效果
    setupSnowFall({
      count: 10,      // 雪花数量
      minSize: 3,     // 最小雪花大小
      maxSize: 8,     // 最大雪花大小
      speed: 1,     // 下落速度
    });

    //设置下雪效果
    setupRunningTimeFooter(
        new Date("2023-01-10"),
        {
          "/": "本博客已在线 :day 天 :hour 小时 :minute 分钟 :second 秒",
          "/zh/": "本博客已在线 :day 天 :hour 小时 :minute 分钟 :second 秒",
        },
        true,
      );  
  },
  
});