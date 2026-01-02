<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";

// 定义一个函数，处理data中的text属性，确保不为null
const processHeroData = (data: any) => {
  return {
    ...data,
    text: data.text || '' // 如果data.text为null或undefined，则转换为空字符串
  };
};
</script>

<template>
  <Blog>
    <template #heroBg>
      <BingHeroBackground />
    </template>

    <template #heroInfo="data">
      <HitokotoBlogHero v-bind="processHeroData(data)" />
    </template>


    <!-- articlesBefore 位置插槽  Github 贡献热力图 -->
    <template #articlesBefore>
      <img 
        class="github-chart"
        src="https://ghchart.rshah.org/youze27" 
        alt="youze27  Github chart" 
      />
    </template>

    <!-- contentBefore  位置插槽 底部链接 -->
    <template #contentBefore >
      <div class="bottom-links-container">
        <div><a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力"><img class="bottom-link-img" src="/assets/icon/travelling_len.svg" alt="开往-友链接力" ></a></div>
        <div><a href="https://www.boyouquan.com/planet-shuttle" target="_blank" rel="noopener" title="博友圈"><img class="bottom-link-img" src="/assets/icon/planet-shuttle.svg" alt="博友圈"></a></div>
        <div><a href="https://www.foreverblog.cn/go.html" target="_blank"> <img class="bottom-link-img" src="/assets/icon/wormhole_4_tp.gif" alt="穿梭虫洞"  title="穿梭虫洞-随机访问十年之约友链博客"  ></a></div>
        <div><a href="https://boke.lu/sj" target="_blank"> <img class="bottom-link-img random-blog" src="/assets/icon/suiji_en.gif" alt="随机博客"  title="随机博客"  ></a></div>
        <div><a href="https://blogscn.fun/random.html" target="_blank"> <img class="bottom-link-img" src="/assets/icon/blogscn.svg" alt="笔墨迹"  title="笔墨迹-随机博客"  ></a></div>
      </div>
    </template>

  </Blog>
</template>

<style scoped>
/* GitHub贡献图表样式 */
.github-chart {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

/* 底部链接容器样式 */
.bottom-links-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 底部链接图片通用样式 */
.bottom-link-img {
  width: 80px;
  height: auto;
}

/* 随机博客图片特殊样式 */
.bottom-link-img.random-blog {
  height: 18px;
}
</style>