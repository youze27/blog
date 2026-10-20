---
title: Markdown 原生图片
index: true
order: 11
isOriginal : true
category:
  - markdown 
tag:
  - markdown 图片
---
### 基本图片
![雪山风景](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop)

### 带标题和居中对齐
<div align="center">

![海滩日落](https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700 "美丽的日落景色")
*图：金色的阳光洒在海面上*

</div>



### Hope 主题的 Figure 组件图片（带标题样式）

![森林小径](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800=700x500)
*清晨的阳光穿过森林，形成美丽的光影效果*

![沙漠风光](https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w-800)
_一望无际的沙漠，金色的沙丘在阳光下闪闪发光_

### CSS 网格图片墙

<style>
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
}
.grid-item {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.grid-item:hover {
  transform: scale(1.03);
}
</style>

<div class="grid-gallery">
  <img class="grid-item" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400" alt="山脉云雾">
  <img class="grid-item" src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400" alt="森林小路">
  <img class="grid-item" src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400" alt="湖泊倒影">
  <img class="grid-item" src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400" alt="秋日枫叶">
  <img class="grid-item" src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400" alt="森林小路">
  <img class="grid-item" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400" alt="山脉云雾">
  <img class="grid-item" src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400" alt="雪山之巅">
  <img class="grid-item" src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400" alt="雪山之巅">
  <img class="grid-item" src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400" alt="雪山之巅">
</div>

### 图片卡片设计

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin: 30px 0;
}
.image-card {
  width: 300px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.4s ease;
}
.image-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-content {
  padding: 20px;
}
.card-title {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2rem;
}
.card-desc {
  color: #7f8c8d;
  line-height: 1.5;
  margin: 0;
}
</style>

<div class="card-container">
  <div class="image-card">
    <img class="card-img" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600" alt="海边日落">
    <div class="card-content">
      <h3 class="card-title">海边日落</h3>
      <p class="card-desc">金色的夕阳洒在海面上，波光粼粼，渔船静静地停泊在岸边。</p>
    </div>
  </div>
  
  <div class="image-card">
    <img class="card-img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600" alt="山间日出">
    <div class="card-content">
      <h3 class="card-title">山间日出</h3>
      <p class="card-desc">清晨的第一缕阳光穿过云层，照亮了整个山谷，温暖而宁静。</p>
    </div>
  </div>
  
  <div class="image-card">
    <img class="card-img" src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400" alt="城市夜景">
    <div class="card-content">
      <h3 class="card-title">城市夜景</h3>
      <p class="card-desc">都市的夜晚灯火辉煌，摩天大楼的灯光在夜色中闪烁，繁华而美丽。</p>
    </div>
  </div>


  <div class="image-card">
    <img class="card-img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600" alt="湖泊倒影">
    <div class="card-content">
      <h3 class="card-title">湖泊倒影</h3>
      <p class="card-desc">清晨的第一缕阳光穿过云层，照亮了整个山谷，温暖而宁静。</p>
    </div>
  </div>


</div>

### 响应式图片排列

<style>
.responsive-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 25px 0;
}
.responsive-img {
  flex: 1 1 calc(25% - 15px);
  max-width: calc(25% - 15px);
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.responsive-img:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
@media (max-width: 1024px) {
  .responsive-img { flex: 1 1 calc(33.333% - 15px); max-width: calc(33.333% - 15px); }
}
@media (max-width: 768px) {
  .responsive-img { flex: 1 1 calc(50% - 15px); max-width: calc(50% - 15px); }
}
@media (max-width: 480px) {
  .responsive-img { flex: 1 1 100%; max-width: 100%; }
}
</style>

<div class="responsive-group">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300" alt="瀑布">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300" alt="雪山">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300" alt="枫叶">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300" alt="海滩">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300" alt="湖泊">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300" alt="沙漠">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300" alt="森林">
  <img class="responsive-img" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300" alt="日落">
</div>


### 瀑布流模拟（纯CSS）


<style>
.masonry-grid {
  column-count: 3;
  column-gap: 20px;
  margin: 30px 0;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
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
}
@media (max-width: 768px) {
  .masonry-grid { column-count: 2; }
}
@media (max-width: 480px) {
  .masonry-grid { column-count: 1; }
}
</style>

<div class="masonry-grid">

  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop" alt="雪山">
    <div class="masonry-caption">雄伟的雪山</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop" alt="海边">
    <div class="masonry-caption">宁静的海边</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop" alt="森林">
    <div class="masonry-caption">神秘的森林</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" alt="云雾山">
    <div class="masonry-caption">云雾缭绕</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h-450&fit=crop" alt="秋叶">
    <div class="masonry-caption">秋日色彩</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=350&fit=crop" alt="日落">
    <div class="masonry-caption">金色日落</div>
  </div>


  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop" alt="雪山">
    <div class="masonry-caption">雄伟的雪山</div>
  </div>

  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h-450&fit=crop" alt="秋叶">
    <div class="masonry-caption">秋日色彩</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=350&fit=crop" alt="日落">
    <div class="masonry-caption">金色日落</div>
  </div>

  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop" alt="海边">
    <div class="masonry-caption">宁静的海边</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop" alt="森林">
    <div class="masonry-caption">神秘的森林</div>
  </div>
  
  <div class="masonry-item">
    <img class="masonry-img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" alt="云雾山">
    <div class="masonry-caption">云雾缭绕</div>
  </div>

</div>
