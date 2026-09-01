---
title: 旅行相册
icon: camera
sidebar: false
order: 1
---

# 旅行相册

<p style="text-align: center; margin: 40px 0; color: #666;">
  照片已去除经纬度等隐私信息，仅保留拍摄时间作为记录。
  <br />
  如需查看原始元数据，请参考站点脚本。
</p>

<TravelGallery :photos="travelPhotos" />

<script setup>
import { ref, onMounted } from 'vue'
// 照片数据由服务端渲染注入，通过 gallery-manifest.json 传递
// 客户端通过 window.__TRAVEL_PHOTOS__ 获取
const travelPhotos = window.__TRAVEL_PHOTOS__ || []
</script>

<style>
/* Ensure gallery component styles are applied correctly */
.masonry-grid { font-size: 14px; }
</style>
</script>