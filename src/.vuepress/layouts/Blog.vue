<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 定义一个函数，处理data中的text属性，确保不为null
const processHeroData = (data: any) => {
  return {
    ...data,
    text: data.text || '' // 如果data.text为null或undefined，则转换为空字符串
  };
};

// 音乐播放器功能

// 状态管理
const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.7);
const songTitle = ref('未选择音乐');
const songArtist = ref('');
const lyrics = ref<LyricItem[]>([{ time: 0, text: '等待加载音乐...' }]);
const currentLyricIndex = ref(0);
const audioFile = ref<File | null>(null);
const albumCover = ref('/assets/icon/music-cover.jpg');
const isMuted = ref(false);
const previousVolume = ref(0.7);

// 初始化音频对象
onMounted(() => {
  audio.value = new Audio();
  audio.value.volume = volume.value;
  
  // 音频事件监听
  audio.value.addEventListener('timeupdate', handleTimeUpdate);
  audio.value.addEventListener('loadedmetadata', handleLoadedMetadata);
  audio.value.addEventListener('ended', handleEnded);
  
  // 获取音乐文件列表
  fetchMusicFiles();
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('timeupdate', handleTimeUpdate);
    audio.value.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.value.removeEventListener('ended', handleEnded);
    audio.value.pause();
  }
});

// 播放/暂停控制
const togglePlay = () => {
  if (!audio.value) return;
  
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

// 博客统计信息 - 运行天数统计
const startDate = new Date('2024-04-15');
const now = new Date();
const diffTime = Math.abs(now.getTime() - startDate.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// 统计数据
const statsData = ref({
  viewCount: 0, // 从API获取总访问量
  dailyStats: [], // 从API获取每日访问数据
});

// 从API获取统计数据
const fetchStats = () => {
  
  
  // 验证URL格式
  const apiUrl = 'https://empty-dream-6647.youze27.workers.dev/';
  
  
  // 使用fetch API请求数据，更现代的方式
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors', // 启用CORS
    cache: 'no-cache' // 禁用缓存
  })
  .then(response => {
    
    
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  })
  .then(data => {
    
    
    // 验证数据格式
    if (data && typeof data === 'object') {
      // 更新总访问量
      if (typeof data.total === 'number') {
        statsData.value.viewCount = data.total;
        
      } else {
        
        // 尝试将其转换为数字
        const totalNum = Number(data.total);
        if (!isNaN(totalNum)) {
          statsData.value.viewCount = totalNum;
          
        } else {
          statsData.value.viewCount = 0;
          
        }
      }
      
      // 更新每日统计数据
      if (Array.isArray(data.daily)) {
        
        
        // 过滤并验证数据
        const validData = data.daily.filter(item => {
          if (!item || typeof item !== 'object') {
            
            return false;
          }
          
          if (typeof item.date !== 'string') {
            
            return false;
          }
          
          if (typeof item.requests !== 'number') {
            
            // 尝试转换
            const reqNum = Number(item.requests);
            if (!isNaN(reqNum)) {
              item.requests = reqNum;
              return true;
            }
            return false;
          }
          
          return true;
        });
        
        statsData.value.dailyStats = validData;
        
      } else {
        
        statsData.value.dailyStats = [];
      }
      
      // 初始化图表
      initCharts();
      
    } else {
      
      statsData.value.viewCount = 0;
      statsData.value.dailyStats = [];
      initCharts();
    }
  })
  .catch(error => {
    
    
    // 详细的错误类型处理
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      
      
    }
    
    // 使用模拟数据作为回退方案
    
    statsData.value.viewCount = 15678;
    
    // 生成过去30天的模拟数据
    const mockDailyStats = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      // 生成更真实的随机请求数 (20-200)
      const requests = Math.floor(Math.random() * 180) + 20;
      
      mockDailyStats.push({
        date: `${year}-${month}-${day}`,
        requests: requests
      });
    }
    
    statsData.value.dailyStats = mockDailyStats;
    
    initCharts();
  });
};

// 访问量趋势图实例
let visitChart: echarts.ECharts | null = null;

// 读取当前站点主题色
const getThemeAccent = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--vp-c-accent').trim() ||
  '#42b983';

// 初始化图表
const initCharts = () => {
  // 访问量趋势图
  const chartDom = document.getElementById('visitChart');
  if (!chartDom) return;
  visitChart = echarts.init(chartDom);

  // 跟随站点主题色
  const themeAccent = getThemeAccent();

  // 准备图表数据
  let formattedDates = [];
  let requests = [];
  
  // 确保数据存在且是数组
  if (Array.isArray(statsData.value.dailyStats) && statsData.value.dailyStats.length > 0) {
    formattedDates = statsData.value.dailyStats.map(item => {
      // 将日期格式从YYYY-MM-DD转换为MM-DD，使其在图表上显示更友好
      const date = new Date(item.date);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    });
    requests = statsData.value.dailyStats.map(item => item.requests);
  } else {
    
  }
  
  // 确保横坐标显示30个数据点，不使用默认月份数据
  let xAxisData = formattedDates;
  let seriesData = requests;
  

  
  const visitOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['访问量'],
      right: 0,
      top: 0,
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 4,
      textStyle: {
        fontSize: 10
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '14%', // 为顶部图例留出空间，避免被裁切
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: true,
      axisLabel: {
        show: false // 隐藏横坐标文字
      },
      axisTick: {
        show: false // 隐藏横坐标刻度
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'bar', // 改为条形图
        barWidth: '60%', // 设置条形宽度
        data: seriesData,
        itemStyle: {
          color: themeAccent // 设置柱子颜色，跟随站点主题色
        }
      }
    ]
  };
  visitChart.setOption(visitOption);

  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    visitChart.resize();
  });
};

// 主题切换监听：明暗模式或主题色变化时同步柱体颜色
let themeObserver: MutationObserver | null = null;

// 页面加载时获取统计数据并初始化图表
onMounted(() => {
  setTimeout(() => {
    fetchStats();
  }, 100);

  themeObserver = new MutationObserver(() => {
    // 等样式计算完成后再取变量值
    requestAnimationFrame(() => {
      visitChart?.setOption({
        series: [{ itemStyle: { color: getThemeAccent() } }]
      });
    });
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class', 'style']
  });
});

onUnmounted(() => {
  themeObserver?.disconnect();
});

// 格式化数字
const formatNumber = (num: number): string => {
  return num.toString();
};

// 计算博客运行天数（从2023年1月1日算起）
const calculateDays = (): number => {
  const start = new Date('2023-01-01');
  const end = new Date();
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// 更新进度
const handleTimeUpdate = () => {
  if (!audio.value) return;
  currentTime.value = audio.value.currentTime;
  updateLyrics();
};

// 加载音频元数据
const handleLoadedMetadata = () => {
  if (!audio.value) return;
  duration.value = audio.value.duration;
};

// 播放结束
const handleEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
  currentLyricIndex.value = 0;
  
  // 自动播放下一首歌曲
  playNext();
};

// 更新歌词显示
const updateLyrics = () => {
  if (!audio.value || lyrics.value.length === 0) return;
  
  // 查找当前时间对应的歌词索引
  let newIndex = currentLyricIndex.value;
  for (let i = 0; i < lyrics.value.length; i++) {
    if (lyrics.value[i].time > currentTime.value) {
      newIndex = Math.max(0, i - 1);
      break;
    }
    newIndex = i;
  }
  
  if (newIndex !== currentLyricIndex.value) {
    currentLyricIndex.value = newIndex;
  }
};

// 进度条控制
const handleProgressChange = (e: Event) => {
  if (!audio.value) return;
  const target = e.target as HTMLInputElement;
  const newTime = parseFloat(target.value);
  audio.value.currentTime = newTime;
  currentTime.value = newTime;
};

// 音量控制
const handleVolumeChange = (e: Event) => {
  if (!audio.value) return;
  const target = e.target as HTMLInputElement;
  const newVolume = parseFloat(target.value);
  volume.value = newVolume;
  audio.value.volume = newVolume;
  // 如果音量不为0，取消静音状态
  if (newVolume > 0) {
    isMuted.value = false;
  }
};

// 静音切换
const toggleMute = () => {
  if (!audio.value) return;
  
  if (isMuted.value) {
    // 从静音恢复
    isMuted.value = false;
    volume.value = previousVolume.value;
    audio.value.volume = previousVolume.value;
  } else {
    // 切换到静音
    isMuted.value = true;
    previousVolume.value = volume.value;
    volume.value = 0;
    audio.value.volume = 0;
  }
};

// 音乐文件列表
const musicFiles = ref<string[]>([]);
const currentTrackIndex = ref(0);

// 获取music目录下的文件列表
const fetchMusicFiles = async () => {
  try {
    // 注意：由于VuePress是静态站点生成器，无法在运行时直接读取服务器文件系统
    // 因此我们需要手动维护这个音乐文件列表
    // 当您在 /public/music/ 目录下添加新歌曲时，请在此处添加对应的文件路径
    musicFiles.value = [
      '/music/后来的我们.mp3',
      '/music/See You Again.mp3',
      '/music/再见.mp3',
      '/music/平凡之路.mp3',
      '/music/倒数.mp3',
      // 添加新歌曲的格式：'/music/歌曲文件名.mp3',
    ];
    
    // 加载第一个音乐文件
    if (musicFiles.value.length > 0) {
      loadMusicFile(musicFiles.value[0]);
    }
  } catch (error) {
    
  }
};

// 加载指定的音乐文件
const loadMusicFile = (fileUrl: string) => {
  if (!audio.value) return;
  
  // 设置音频源
  audio.value.src = fileUrl;
  
  // 提取文件名（不带扩展名）
  const fileName = fileUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '未知歌曲';
  
  // 直接使用文件名作为歌曲标题
  songTitle.value = fileName;
  songArtist.value = '';
  
  // 加载对应的图片文件
  const imageUrl = fileUrl.replace(/\.mp3$/, '.jpg');
  // 尝试加载JPG图片，如果失败则尝试PNG
  fetch(imageUrl)
    .then(response => {
      if (response.ok) {
        albumCover.value = imageUrl;
      } else {
        // 尝试PNG格式
        const pngUrl = fileUrl.replace(/\.mp3$/, '.png');
        albumCover.value = pngUrl;
      }
    })
    .catch(() => {
      // 如果都失败，使用默认封面
      albumCover.value = '/assets/icon/music-cover.jpg';
    });
  
  // 尝试加载对应的歌词文件
  const lyricsUrl = fileUrl.replace(/\.mp3$/, '.lrc');
  loadLyricsFile(lyricsUrl);
};

// 从文件名提取标题
const extractTitleFromFileName = (fileUrl: string): string => {
  const fileName = fileUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '未知歌曲';
  const nameParts = fileName.split('-');
  if (nameParts.length >= 2) {
    return nameParts.slice(1).join('-').trim();
  }
  return fileName;
};

// 从文件名提取艺术家
const extractArtistFromFileName = (fileUrl: string): string => {
  const fileName = fileUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || '未知歌曲';
  const nameParts = fileName.split('-');
  if (nameParts.length >= 2) {
    return nameParts[0].trim();
  }
  return '未知艺术家';
};

// 移除模拟的音频元数据读取函数，直接从文件名处理

// 加载歌词文件
const loadLyricsFile = async (lyricsUrl: string) => {
  try {
    const response = await fetch(lyricsUrl);
    if (response.ok) {
      const content = await response.text();
      parseLyricsContent(content);
    } else {
      // 如果没有找到歌词文件，使用默认歌词
      lyrics.value = ['暂无歌词', '🎵🎵🎵'];
      currentLyricIndex.value = 0;
    }
  } catch (error) {
    
    lyrics.value = ['暂无歌词', '🎵🎵🎵'];
    currentLyricIndex.value = 0;
  }
};

// 定义歌词类型
interface LyricItem {
  time: number; // 时间戳（秒）
  text: string; // 歌词内容
}

// 解析歌词内容
const parseLyricsContent = (content: string) => {
  const lyricLines = content.split('\n');
  const parsedLyrics: LyricItem[] = [];
  
  lyricLines.forEach(line => {
    // 匹配LRC格式：[mm:ss.xx]歌词内容
    const lrcMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (lrcMatch && lrcMatch[4].trim()) {
      const minutes = parseInt(lrcMatch[1]);
      const seconds = parseInt(lrcMatch[2]);
      const milliseconds = parseInt(lrcMatch[3]);
      // 计算总时间（秒）
      const time = minutes * 60 + seconds + milliseconds / (lrcMatch[3].length === 2 ? 100 : 1000);
      parsedLyrics.push({ time, text: lrcMatch[4].trim() });
    }
  });
  
  // 如果没有找到标准LRC格式歌词，使用默认歌词
  if (parsedLyrics.length === 0) {
    lyrics.value = [{ time: 0, text: '音乐播放中...' }, { time: 3, text: '享受美好的音乐时光' }, { time: 6, text: '🎵🎵🎵' }];
    currentLyricIndex.value = 0;
    return;
  }
  
  // 按时间排序
  parsedLyrics.sort((a, b) => a.time - b.time);
  
  // 保存完整的歌词对象（包含时间戳）
  lyrics.value = parsedLyrics;
  currentLyricIndex.value = 0;
};

// 解析歌词（简单实现）
const parseLyrics = (file: File) => {
  // 这里使用简单的歌词解析逻辑，实际应用中可以使用更复杂的解析器
  // 支持 LRC 格式歌词：[mm:ss.xx]歌词内容
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    const lyricLines = content.split('\n');
    const parsedLyrics: LyricItem[] = [];
    
    lyricLines.forEach(line => {
      const lrcMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
      if (lrcMatch && lrcMatch[4].trim()) {
        const minutes = parseInt(lrcMatch[1]);
        const seconds = parseInt(lrcMatch[2]);
        const milliseconds = parseInt(lrcMatch[3]);
        const time = minutes * 60 + seconds + milliseconds / 100;
        parsedLyrics.push({ time, text: lrcMatch[4].trim() });
      }
    });
    
    // 如果没有找到标准LRC格式歌词，使用默认歌词
    if (parsedLyrics.length === 0) {
      parsedLyrics.push({ time: 0, text: '音乐播放中...' });
      parsedLyrics.push({ time: 3, text: '享受美好的音乐时光' });
      parsedLyrics.push({ time: 6, text: '🎵🎵🎵' });
    }
    
    lyrics.value = parsedLyrics;
    currentLyricIndex.value = 0;
  };
  
  reader.readAsText(file);
};

// 上一曲
const playPrevious = () => {
  if (musicFiles.value.length === 0) return;
  
  currentTrackIndex.value = (currentTrackIndex.value - 1 + musicFiles.value.length) % musicFiles.value.length;
  loadMusicFile(musicFiles.value[currentTrackIndex.value]);
  
  // 如果当前正在播放，继续播放新歌曲
  if (isPlaying.value) {
    audio.value?.play();
  }
};

// 下一曲
const playNext = () => {
  if (musicFiles.value.length === 0) return;
  
  currentTrackIndex.value = (currentTrackIndex.value + 1) % musicFiles.value.length;
  loadMusicFile(musicFiles.value[currentTrackIndex.value]);
  
  // 如果当前正在播放，继续播放新歌曲
  if (isPlaying.value) {
    audio.value?.play();
  }
};

// 格式化时间
const formatTime = (time: number) => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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







    <!-- infoAfter 位置插槽 音乐播放器（位于运行天数卡片上方） -->
    <template #infoAfter>
      <div class="music-player-container">
        <div class="music-player">
          <!-- 进度条上方区域：封面 + 歌名/歌手 + 歌词 -->
          <div class="top-section">
            <!-- 圆形专辑封面 -->
            <div class="album-cover-container">
              <div class="album-cover" :class="{ 'rotating': isPlaying }">
                <img :src="albumCover" alt="专辑封面" class="cover-img">
              </div>
            </div>
            
            <!-- 歌名在上、歌词在下 -->
            <div class="song-details">
              <div class="song-meta">
                <span class="song-title">{{ songTitle }}</span>
                <span class="song-artist">{{ songArtist }}</span>
              </div>
              <div class="lyrics-container">
                <div class="lyrics">{{ lyrics[currentLyricIndex].text }}</div>
              </div>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div class="progress-container">
            <div class="time current-time">{{ formatTime(currentTime) }}</div>
            <input 
              type="range" 
              class="progress-bar" 
              :min="0" 
              :max="duration || 100" 
              :value="currentTime" 
              @input="handleProgressChange"
            >
            <div class="time duration">{{ formatTime(duration) }}</div>
          </div>
          
          <!-- 控制按钮：左侧播放控制，右侧音量，两端对齐 -->
          <div class="controls">
            <div class="control-group">
              <button class="control-btn" id="prev-btn" title="上一曲" @click="playPrevious">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>
            </button>
            <button class="control-btn play-btn" @click="togglePlay" title="播放/暂停">
              <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96z"/></svg>
            </button>
            <button class="control-btn" id="next-btn" title="下一曲" @click="playNext">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M149 100.8C161.9 93.8 177.7 94.5 190 102.6L448 272.1L448 128C448 110.3 462.3 96 480 96C497.7 96 512 110.3 512 128L512 512C512 529.7 497.7 544 480 544C462.3 544 448 529.7 448 512L448 367.9L190 537.5C177.7 545.6 162 546.3 149 539.3C136 532.3 128 518.7 128 504L128 136C128 121.3 136.1 107.8 149 100.8z"/></svg>
            </button>
            </div>
            <div class="volume-group">
            <button class="control-btn" id="volume-btn" title="音量" @click="toggleMute">
              <svg v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M533.6 96.5C523.3 88.1 508.2 89.7 499.8 100C491.4 110.3 493 125.4 503.3 133.8C557.5 177.8 592 244.8 592 320C592 395.2 557.5 462.2 503.3 506.3C493 514.7 491.5 529.8 499.8 540.1C508.1 550.4 523.3 551.9 533.6 543.6C598.5 490.7 640 410.2 640 320C640 229.8 598.5 149.2 533.6 96.5zM473.1 171C462.8 162.6 447.7 164.2 439.3 174.5C430.9 184.8 432.5 199.9 442.8 208.3C475.3 234.7 496 274.9 496 320C496 365.1 475.3 405.3 442.8 431.8C432.5 440.2 431 455.3 439.3 465.6C447.6 475.9 462.8 477.4 473.1 469.1C516.3 433.9 544 380.2 544 320.1C544 260 516.3 206.3 473.1 171.1zM412.6 245.5C402.3 237.1 387.2 238.7 378.8 249C370.4 259.3 372 274.4 382.3 282.8C393.1 291.6 400 305 400 320C400 335 393.1 348.4 382.3 357.3C372 365.7 370.5 380.8 378.8 391.1C387.1 401.4 402.3 402.9 412.6 394.6C434.1 376.9 448 350.1 448 320C448 289.9 434.1 263.1 412.6 245.5zM80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com  License - https://fontawesome.com/license/free  Copyright 2026 Fonticons, Inc.--><path d="M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z"/></svg>
            </button>
            <input 
              type="range" 
              class="volume-bar" 
              min="0" 
              max="1" 
              step="0.01" 
              v-model="volume" 
              @input="handleVolumeChange"
              title="音量控制"
            >
            </div>
          </div>
          
          <!-- 自动读取public/music目录下的音乐文件 -->
        </div>
      </div>

      <!-- 博客统计信息 -->
      <div class="blog-stats">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ calculateDays() }}</div>
            <div class="stat-label">运行天数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatNumber(statsData.viewCount) }}</div>
            <div class="stat-label">总访问量</div>
          </div>
        </div>
        <div class="charts-container">
          <div id="visitChart" style="width: 100%; max-width: 300px; height: 160px;"></div>
        </div>
      </div>
    </template>


    <!-- articlesBefore 位置插槽 贪吃蛇动画 -->
    <template #articlesBefore>
      <!-- 热力图暂时停用
      <img 
        class="github-chart"
        src="https://ghchart.rshah.org/youze27" 
        alt="youze27  Github chart" 
      />
      -->
      
      <img 
        class="github-snake"
        src="/assets/widgets/snake-light.svg" 
        alt="Snake animation" 
      />
    </template>

    <!-- infoBefore 位置插槽 侧边栏 Commits 卡片 -->
    <template #infoBefore>
      <div class="commits-card">
        <!-- 浅色/深色两套图，按站点主题自动切换 -->
        <img 
          class="commits-light"
          src="/assets/widgets/commits-light.svg" 
          alt="Commits" 
        />
        <img 
          class="commits-dark"
          src="/assets/widgets/commits-dark.svg" 
          alt="Commits" 
        />
      </div>
    </template>

    <!-- contentBefore  位置插槽 底部链接 -->
    <template #contentBefore >
      <div class="bottom-links-container">
        <div><a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="#ffffff" class="bottom-link-img" role="img" aria-label="开往-友链接力"><path class="cls-2" d="M243.79,325V295h44.42v30Zm14.77-3.41-.76.86-.13.15c-.23.26-.25.5-.06.68s.44.13.67-.13c.4-.46.79-.92,1.21-1.36a.68.68,0,0,1,.42-.19h10.95a.54.54,0,0,1,.46.2c.41.49.83,1,1.26,1.42a.4.4,0,0,0,.61.06.43.43,0,0,0,0-.6l-.76-.86-.17-.22a2.4,2.4,0,0,0,.27,0,12.48,12.48,0,0,0,1.94-.13,4.33,4.33,0,0,0,3.35-4c0-1.11,0-2.22,0-3.33a2.06,2.06,0,0,0,0-.21c-.19.1-.34.21-.51.28a.43.43,0,0,0-.28.47c0,1,0,2,0,3a3.53,3.53,0,0,1-3.38,3.13c-.93,0-1.86,0-2.79,0H257.7a3.69,3.69,0,0,1-2.63-.95,3.51,3.51,0,0,1-.93-1.36,68.93,68.93,0,0,0,16.29-3.13,2.61,2.61,0,0,0,2,2.47A2.36,2.36,0,0,0,275,317a2.56,2.56,0,0,0,.19-3.35l.19-.09c1-.45,2.06-.87,3.07-1.34a27.34,27.34,0,0,0,6.35-3.87,6.73,6.73,0,0,0,1.84-2.23,2,2,0,0,0-.68-2.65,5.88,5.88,0,0,0-2.12-.91,21.93,21.93,0,0,0-5.54-.46h-.4c0-.56,0-1.09-.11-1.61a4.39,4.39,0,0,0-4.33-3.7H257.51a4.42,4.42,0,0,0-4.44,4.43v4.66c0,.09,0,.18,0,.3a5.22,5.22,0,0,1,.54-.31.45.45,0,0,0,.27-.48c0-1.24,0-2.48,0-3.71a6.18,6.18,0,0,1,.05-1.06,3.57,3.57,0,0,1,3.65-3h15.69a3.5,3.5,0,0,1,.65,0,3.66,3.66,0,0,1,3.1,3.85c0,1.34,0,2.68,0,4a.29.29,0,0,0,.08.21c.22.15.45.27.73.43V303H280a16.29,16.29,0,0,1,3.81.47,4.24,4.24,0,0,1,1.82.85,1,1,0,0,1,.33,1.33,5.1,5.1,0,0,1-.71,1.15,11.05,11.05,0,0,1-2.48,2.14,40.54,40.54,0,0,1-8.11,4.08.43.43,0,0,1-.33,0,2.58,2.58,0,0,0-3.6,1.24.53.53,0,0,1-.35.3q-3.4,1.08-6.9,1.83c-1.17.25-2.35.46-3.61.71a2.75,2.75,0,0,0,.64-2.12,2.55,2.55,0,0,0-1.13-1.82,2.63,2.63,0,0,0-3.33.34,2.56,2.56,0,0,0-.75,1.72,2.69,2.69,0,0,0,1.17,2.31l-2.51.18c0-.1,0-.15,0-.2,0-.95,0-1.9,0-2.85,0-.12,0-.29-.1-.35a6,6,0,0,0-.72-.44v3.84c-.56,0-1.1,0-1.64,0a15.82,15.82,0,0,1-3.56-.42,4.56,4.56,0,0,1-2.06-.94,1.1,1.1,0,0,1-.3-1.27,4.27,4.27,0,0,1,1.07-1.55,14.47,14.47,0,0,1,3.38-2.54c1.44-.79,2.92-1.51,4.37-2.26.11-.06.27-.13.29-.22a6.85,6.85,0,0,0,0-.79l-.2.07c-.66.3-1.32.59-2,.91a26,26,0,0,0-6,3.78,6.19,6.19,0,0,0-1.65,2.08,2,2,0,0,0,.77,2.7,6.33,6.33,0,0,0,2,.82,20.9,20.9,0,0,0,5.4.48c.21,0,.3,0,.38.25a4.4,4.4,0,0,0,4.17,2.84Zm5.56-16.35,2-.52c.07,0,.17-.09.18-.15,0-.23,0-.46,0-.73l-2.17.54c0-1,0-2,0-2.93a1,1,0,0,0-1.08-1.1h-3.72c-1,0-2,0-3,0a1.06,1.06,0,0,0-1.16,1.13v8.05a1,1,0,0,0,1.1,1.08c2.23,0,4.47,0,6.7,0a1.08,1.08,0,0,0,1.13-1.13c0-.94,0-1.88,0-2.82Zm11.61-3a7.82,7.82,0,0,0,0-.84,1,1,0,0,0-1.19-1.09H268a1,1,0,0,0-1.18,1.19v8a1,1,0,0,0,1,1h6.84a1.19,1.19,0,0,0,.55-.15,1.1,1.1,0,0,0,.49-1.08v-6.23l.7-.09v-.78Z" transform="translate(-238 -290)"/><path class="cls-2" d="M258.56,321.59h-1a4.4,4.4,0,0,1-4.17-2.84c-.08-.21-.17-.25-.38-.25a20.9,20.9,0,0,1-5.4-.48,6.33,6.33,0,0,1-2-.82,2,2,0,0,1-.77-2.7,6.19,6.19,0,0,1,1.65-2.08,26,26,0,0,1,6-3.78c.65-.32,1.31-.61,2-.91l.2-.07a6.85,6.85,0,0,1,0,.79c0,.09-.18.16-.29.22-1.45.75-2.93,1.47-4.37,2.26a14.47,14.47,0,0,0-3.38,2.54,4.27,4.27,0,0,0-1.07,1.55,1.1,1.1,0,0,0,.3,1.27,4.56,4.56,0,0,0,2.06.94,15.82,15.82,0,0,0,3.56.42c.54,0,1.08,0,1.64,0v-3.84a6,6,0,0,1,.72.44c.08.06.1.23.1.35,0,.95,0,1.9,0,2.85,0,.05,0,.1,0,.2l2.51-.18a2.69,2.69,0,0,1-1.17-2.31,2.56,2.56,0,0,1,.75-1.72,2.63,2.63,0,0,1,3.33-.34,2.55,2.55,0,0,1,1.13,1.82,2.75,2.75,0,0,1-.64,2.12c1.26-.25,2.44-.46,3.61-.71q3.49-.75,6.9-1.83a.53.53,0,0,0,.35-.3,2.58,2.58,0,0,1,3.6-1.24.43.43,0,0,0,.33,0,40.54,40.54,0,0,0,8.11-4.08,11.05,11.05,0,0,0,2.48-2.14,5.1,5.1,0,0,0,.71-1.15,1,1,0,0,0-.33-1.33,4.24,4.24,0,0,0-1.82-.85A16.29,16.29,0,0,0,280,303h-2.12v3.24c-.28-.16-.51-.28-.73-.43a.29.29,0,0,1-.08-.21c0-1.34,0-2.68,0-4a3.66,3.66,0,0,0-3.1-3.85,3.5,3.5,0,0,0-.65,0H257.59a3.57,3.57,0,0,0-3.65,3,6.18,6.18,0,0,0-.05,1.06c0,1.23,0,2.47,0,3.71a.45.45,0,0,1-.27.48,5.22,5.22,0,0,0-.54.31c0-.12,0-.21,0-.3v-4.66a4.42,4.42,0,0,1,4.44-4.43h15.92a4.39,4.39,0,0,1,4.33,3.7c.08.52.07,1,.11,1.61h.4a21.93,21.93,0,0,1,5.54.46,5.88,5.88,0,0,1,2.12.91,2,2,0,0,1,.68,2.65,6.73,6.73,0,0,1-1.84,2.23,27.34,27.34,0,0,1-6.35,3.87c-1,.47-2,.89-3.07,1.34l-.19.09A2.56,2.56,0,0,1,275,317a2.36,2.36,0,0,1-2.52.77,2.61,2.61,0,0,1-2-2.47,68.93,68.93,0,0,1-16.29,3.13,3.51,3.51,0,0,0,.93,1.36,3.69,3.69,0,0,0,2.63.95h13.1c.93,0,1.86,0,2.79,0a3.53,3.53,0,0,0,3.38-3.13c.08-1,0-2,0-3a.43.43,0,0,1,.28-.47c.17-.07.32-.18.51-.28a2.06,2.06,0,0,1,0,.21c0,1.11,0,2.22,0,3.33a4.33,4.33,0,0,1-3.35,4,12.48,12.48,0,0,1-1.94.13,2.4,2.4,0,0,1-.27,0l.17.22.76.86a.43.43,0,0,1,0,.6.4.4,0,0,1-.61-.06c-.43-.46-.85-.93-1.26-1.42a.54.54,0,0,0-.46-.2H259.91a.68.68,0,0,0-.42.19c-.42.44-.81.9-1.21,1.36-.23.26-.47.31-.67.13s-.17-.42.06-.68l.13-.15Z" transform="translate(-238 -290)"/><path class="cls-2" d="M264.12,305.24v1.41c0,.94,0,1.88,0,2.82A1.08,1.08,0,0,1,263,310.6c-2.23,0-4.47,0-6.7,0a1,1,0,0,1-1.1-1.08v-8.05a1.06,1.06,0,0,1,1.16-1.13c1,0,2,0,3,0H263a1,1,0,0,1,1.08,1.1c0,1,0,1.93,0,2.93l2.17-.54c0,.27,0,.5,0,.73,0,.06-.11.13-.18.15Z" transform="translate(-238 -290)"/><path class="cls-2" d="M275.73,302.25h.71V303l-.7.09v6.23a1.1,1.1,0,0,1-.49,1.08,1.19,1.19,0,0,1-.55.15h-6.84a1,1,0,0,1-1-1v-8a1,1,0,0,1,1.18-1.19h6.53a1,1,0,0,1,1.19,1.09A7.82,7.82,0,0,1,275.73,302.25Z" transform="translate(-238 -290)"/><path class="cls-3" d="M301.66,302v1.41h-5.05v15.12h-1.55V303.39H290V302Z" transform="translate(-238 -290)"/><path class="cls-3" d="M307.38,305.94a7.7,7.7,0,0,1,1.38.12,4.15,4.15,0,0,1,.9.24l-.3,1.33a3.34,3.34,0,0,0-.74-.2,8.16,8.16,0,0,0-1.47-.11,6.39,6.39,0,0,0-1.54.15,3.38,3.38,0,0,0-.76.24v10.8h-1.48V306.75a10.83,10.83,0,0,1,1.57-.53A9,9,0,0,1,307.38,305.94Z" transform="translate(-238 -290)"/><path class="cls-3" d="M315.46,305.89a5,5,0,0,1,2,.35,3.39,3.39,0,0,1,1.31.95,3.75,3.75,0,0,1,.73,1.45,6.9,6.9,0,0,1,.23,1.81v7.78a4.81,4.81,0,0,1-.66.15l-1,.18c-.38.07-.8.12-1.27.16s-.94.06-1.42.06a6.23,6.23,0,0,1-1.72-.22,3.75,3.75,0,0,1-1.37-.68,3.29,3.29,0,0,1-.91-1.19,4.32,4.32,0,0,1-.33-1.78,3.67,3.67,0,0,1,.37-1.72,3.22,3.22,0,0,1,1-1.18,4.67,4.67,0,0,1,1.57-.68,8.84,8.84,0,0,1,2-.21l.68,0,.68.1.57.12a1.23,1.23,0,0,1,.33.11v-.77a8.55,8.55,0,0,0-.09-1.25,2.9,2.9,0,0,0-.4-1.1,2.2,2.2,0,0,0-.87-.78,3.09,3.09,0,0,0-1.47-.3,7.11,7.11,0,0,0-1.93.19c-.43.13-.74.23-.93.31l-.21-1.36a5.14,5.14,0,0,1,1.2-.36A9.7,9.7,0,0,1,315.46,305.89Zm.14,11.5c.58,0,1.08,0,1.51-.06a10.76,10.76,0,0,0,1.11-.15v-4.34a3.82,3.82,0,0,0-.8-.25,6.45,6.45,0,0,0-1.5-.14,7.49,7.49,0,0,0-1.14.09,2.92,2.92,0,0,0-1.09.36,2.1,2.1,0,0,0-1.14,2,2.91,2.91,0,0,0,.21,1.17,1.86,1.86,0,0,0,.62.76,2.48,2.48,0,0,0,1,.42A5.36,5.36,0,0,0,315.6,317.39Z" transform="translate(-238 -290)"/><path class="cls-3" d="M327,316.84c.32-.68.65-1.46,1-2.35s.66-1.79,1-2.74.6-1.9.87-2.86.49-1.87.67-2.71H332c-.27,1.13-.58,2.24-.92,3.34s-.69,2.17-1.06,3.22-.77,2.06-1.17,3-.8,1.89-1.18,2.74h-1.38c-.4-.85-.8-1.77-1.19-2.74s-.79-2-1.16-3-.73-2.12-1.07-3.22-.64-2.21-.91-3.34h1.57c.18.84.41,1.75.67,2.71s.56,1.91.87,2.86.64,1.86,1,2.74S326.72,316.16,327,316.84Z" transform="translate(-238 -290)"/><path class="cls-3" d="M333.71,312.34a8.29,8.29,0,0,1,.44-2.83,6.27,6.27,0,0,1,1.16-2,4.6,4.6,0,0,1,1.64-1.2,4.7,4.7,0,0,1,1.9-.4,4.34,4.34,0,0,1,3.45,1.48,6.82,6.82,0,0,1,1.29,4.56c0,.13,0,.25,0,.38l0,.36h-8.27a5.57,5.57,0,0,0,1.07,3.48,3.91,3.91,0,0,0,3.19,1.22,6.13,6.13,0,0,0,1.91-.24,9,9,0,0,0,1-.4l.27,1.33a5.46,5.46,0,0,1-1.2.45,7,7,0,0,1-2.06.27,6.55,6.55,0,0,1-2.64-.48,4.68,4.68,0,0,1-1.8-1.34,5.3,5.3,0,0,1-1-2A9.55,9.55,0,0,1,333.71,312.34Zm8.36-1a5.05,5.05,0,0,0-.87-3,2.74,2.74,0,0,0-2.32-1.07,3,3,0,0,0-1.43.33,3.6,3.6,0,0,0-1.09.9,4.22,4.22,0,0,0-.73,1.3,5.69,5.69,0,0,0-.31,1.55Z" transform="translate(-238 -290)"/><path class="cls-3" d="M349.88,318.73a4.94,4.94,0,0,1-1.31-.2,2.44,2.44,0,0,1-.94-.55,2.41,2.41,0,0,1-.57-1,5,5,0,0,1-.19-1.46V300.29l1.48-.29v15.51a3.73,3.73,0,0,0,.1.92,1.12,1.12,0,0,0,.85.84,5.79,5.79,0,0,0,.78.17Z" transform="translate(-238 -290)"/><path class="cls-3" d="M355.69,318.73a4.88,4.88,0,0,1-1.31-.2,2.37,2.37,0,0,1-.94-.55,2.41,2.41,0,0,1-.57-1,4.7,4.7,0,0,1-.19-1.46V300.29l1.48-.29v15.51a3.3,3.3,0,0,0,.1.92,1.28,1.28,0,0,0,.31.55,1.24,1.24,0,0,0,.53.29,6,6,0,0,0,.79.17Z" transform="translate(-238 -290)"/><path class="cls-3" d="M360.33,302.46a1.17,1.17,0,0,1-.32.87,1.06,1.06,0,0,1-.77.32,1.08,1.08,0,0,1-.78-.32,1.2,1.2,0,0,1-.31-.87,1.17,1.17,0,0,1,.31-.87,1.05,1.05,0,0,1,.78-.33,1,1,0,0,1,.77.33A1.14,1.14,0,0,1,360.33,302.46ZM360,318.51h-1.48V306.18H360Z" transform="translate(-238 -290)"/><path class="cls-3" d="M363.91,306.61c.44-.13,1-.27,1.77-.43a13.34,13.34,0,0,1,2.74-.24,5.47,5.47,0,0,1,2.24.41,3.5,3.5,0,0,1,1.44,1.15,5,5,0,0,1,.76,1.8,11.19,11.19,0,0,1,.23,2.32v6.89h-1.48v-6.39a11.7,11.7,0,0,0-.18-2.22,3.85,3.85,0,0,0-.56-1.48,2.29,2.29,0,0,0-1.05-.82,4.54,4.54,0,0,0-1.63-.25,11.82,11.82,0,0,0-1.81.12,5.77,5.77,0,0,0-1,.21v10.83h-1.48Z" transform="translate(-238 -290)"/><path class="cls-3" d="M384.54,317.08a3.11,3.11,0,0,1-.41.28,6.13,6.13,0,0,1-.67.32,5.16,5.16,0,0,1-.91.27,5.1,5.1,0,0,1-1.15.11,6,6,0,0,1-2-.33,4.59,4.59,0,0,1-1.68-1.05,5.4,5.4,0,0,1-1.15-1.85,7.77,7.77,0,0,1-.43-2.76,7.37,7.37,0,0,1,.39-2.43,5.82,5.82,0,0,1,1.1-1.95,5.16,5.16,0,0,1,1.76-1.28,5.64,5.64,0,0,1,2.33-.47,12.29,12.29,0,0,1,2.63.23c.66.15,1.2.3,1.63.44v11.26a5,5,0,0,1-1.37,3.95,6.14,6.14,0,0,1-4.12,1.18,10.75,10.75,0,0,1-2.06-.18,10.45,10.45,0,0,1-1.58-.42l.29-1.4a7,7,0,0,0,1.49.45,9.45,9.45,0,0,0,1.91.19,4.47,4.47,0,0,0,3-.85,3.74,3.74,0,0,0,.94-2.9Zm0-9.4a8.24,8.24,0,0,0-1-.22,10,10,0,0,0-1.76-.11,4,4,0,0,0-1.69.34,3.71,3.71,0,0,0-1.27,1,4.35,4.35,0,0,0-.79,1.51,6.82,6.82,0,0,0,0,4,4.07,4.07,0,0,0,.83,1.42,3,3,0,0,0,1.18.8,3.66,3.66,0,0,0,1.34.25,5.09,5.09,0,0,0,1.83-.31,3.87,3.87,0,0,0,1.29-.71Z" transform="translate(-238 -290)"/></svg></a></div>
        <div><a href="https://www.foreverblog.cn/go.html" target="_blank" title="虫洞 · 随机访问十年之约成员博客"><img class="bottom-link-img" src="/assets/icon/wormhole_v2_light.webp" alt="十年之约虫洞" style="width:auto;height:32px;"></a></div>
        <div><a href="https://www.boyouquan.com/planet-shuttle" target="_blank" rel="noopener" title="博友圈"><img class="bottom-link-img" src="/assets/icon/planet-shuttle.svg" alt="博友圈"></a></div>
        <div><a href="https://boke.lu/sj" target="_blank"> <img class="bottom-link-img" src="/assets/icon/suiji_en.gif" alt="随机博客"  title="随机博客"  ></a></div>
        <div><a href="https://blogscn.fun/random.html" target="_blank"> <img class="bottom-link-img" src="/assets/icon/blogscn.svg" alt="笔墨迹"  title="笔墨迹-随机博客"  ></a></div>
        <div><a href="https://blogs.quest" target="_blank" title="空间穿梭-随机访问BlogsClub成员博客"><img class="bottom-link-img"  src="/assets/icon/shuttle.png"></a></div>
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

/* 侧边栏 Commits 卡片样式 —— 与下方博主信息卡保持一致 */
.commits-card {
  margin-bottom: 20px;
  background: var(--vp-c-bg-elv);
  border-radius: 8px;
  box-shadow: 0 1px 3px 1px var(--vp-c-shadow);
  overflow: hidden;
  padding: 8px;
}

.commits-card img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

/* Commits 卡片跟随站点明暗主题切换 */
.commits-card img.commits-dark {
  display: none;
}

html[data-theme='dark'] .commits-card img.commits-light {
  display: none;
}

html[data-theme='dark'] .commits-card img.commits-dark {
  display: block;
}

/* 贪吃蛇动画样式 */
.github-snake {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 10px;
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



/* 音乐播放器样式 - 继承博客整体主题 */
.music-player-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.music-player {
  width: 90%;
  max-width: 700px;
  background: var(--vp-c-bg-elv);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  color: var(--vp-c-text);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-border);
}

/* 顶部区域 - 专辑封面和歌词 */
.top-section {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

/* 专辑封面容器 */
.album-cover-container {
  margin-right: 12px;
  flex-shrink: 0;
}

/* 专辑封面 - 圆形 */
.album-cover {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* 播放时旋转动画 */
.album-cover.rotating {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 歌曲信息 - 位于封面右侧、歌词上方 */
.song-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.song-meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 5px;
  overflow: hidden;
}

.song-title {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.song-artist {
  font-size: 11px;
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

/* 歌词显示 - 位于歌名下方 */
.lyrics-container {
  flex: 1;
  min-width: 0;
  height: 32px;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: left;
}

.lyrics {
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.3s ease;
}

/* 进度条 */
.progress-container {
  display: flex;
  align-items: center;
  margin: 6px 0 8px;
}

.time {
  font-size: 10px;
  width: 35px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-border);
  outline: none;
  -webkit-appearance: none;
  margin: 0 5px;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-accent);
  cursor: pointer;
}

/* 控制按钮：左右两组两端对齐 */
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.control-group,
.volume-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--vp-c-text);
  padding: 0;
}

/* 图标跟随主题文字色，避免深色模式下仍是黑色 */
.control-btn svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.control-btn:hover {
  background: var(--vp-c-bg-alt);
  transform: scale(1.1);
}

.play-btn {
  width: 34px;
  height: 34px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text);
}

.volume-bar {
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-border);
  outline: none;
  -webkit-appearance: none;
}

.volume-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-accent);
  cursor: pointer;
}

.volume-bar::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-accent);
  cursor: pointer;
  border: none;
}

.volume-bar::-ms-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-accent);
  cursor: pointer;
}

/* 文件上传 */
.file-upload {
  text-align: center;
}

.file-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text);
  border: 1px solid var(--vp-c-border);
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.file-label:hover {
  background: var(--vp-c-bg-alt);
  transform: translateY(-2px);
}

/* 博客统计样式 */
.blog-stats {
  background: var(--vp-c-bg-elv);
  border-radius: 8px;
  padding: 10px 12px 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text);
}

.blog-stats h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: var(--vp-c-text);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

/* 内外背景统一：统计项与卡片同底色，无边框 */
.stat-item {
  text-align: center;
  padding: 4px 8px;
  background: transparent;
  border: none;
}

.stat-value {
  font-size: 22px;
  font-weight: bold;
  color: var(--vp-c-accent);
  margin-bottom: 2px;
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text);
  opacity: 0.65;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>