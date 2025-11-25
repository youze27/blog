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
  </Blog>
</template>