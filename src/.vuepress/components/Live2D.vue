<template>
  <div class="live2d-container">
    <iframe
      src="https://oml2d.com/"
      frameborder="0"
      scrolling="no"
      class="live2d-iframe"
    ></iframe>
  </div>
</template>

<script setup>
// 看板娘 iframe 嵌入组件
</script>

<style scoped>
.live2d-container {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 300px;
  z-index: 9999;
  pointer-events: none;
}

.live2d-iframe {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>