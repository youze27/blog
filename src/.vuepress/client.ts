import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
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


  },
  
});