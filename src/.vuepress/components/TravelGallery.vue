/*
 * Travel Photo Gallery - Masonry (瀑布流) Style
 * Features:
 * - Pure CSS masonry layout using column-count
 * - Shows capture time as caption
 * - Photos not displayed on blog homepage (controlled via sidebar config)
 * - EXIF GPS data stripped, capture time preserved
 * - Photos organized by capture date
 */

<style>
.masonry-grid {
  column-count: 3;
  column-gap: 20px;
  margin: 30px 0;
  font-size: 0;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  display: inline-block;
  font-size: 14px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}
.masonry-item:hover {
  transform: translateY(-5px);
}
.masonry-img {
  width: 100%;
  height: auto;
  display: block;
}
.masonry-caption {
  padding: 12px;
  background: white;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}
.masonry-img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>

<div class="masonry-grid">
<!-- Photos injected by VuePress script: each photo shows capture time as caption -->
<!-- v-for="photo in photos" :key="photo.finalName" -->
<!-- Example structure:
  <div class="masonry-item">
    <img class="masonry-img" :src="photo.thumbUrl" alt="旅行照片">
    <div class="masonry-caption">{{ photo.captureTime }}</div>
  </div>
-->
</div>