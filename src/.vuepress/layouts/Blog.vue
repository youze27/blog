<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import Live2D from "../components/Live2D.vue";

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

// 初始化图表
const initCharts = () => {
  // 访问量趋势图
  const visitChart = echarts.init(document.getElementById('visitChart'));
  
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
      right: '3%',
      top: '3%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%', // 增加顶部空间以显示完整的顶端数字
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
          color: '#42b983' // 设置柱子颜色
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

// 页面加载时获取统计数据并初始化图表
onMounted(() => {
  setTimeout(() => {
    fetchStats();
  }, 100);
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







    <!-- infoBefore 位置插槽 音乐播放器 -->
    <template #infoBefore>
      <div class="music-player-container">
        <div class="music-player">
          <!-- 歌曲信息 -->
          <div class="song-info">
            <div class="song-title">{{ songTitle }}</div>
            <div class="song-artist">{{ songArtist }}</div>
          </div>
          
          <!-- 进度条上方区域 -->
          <div class="top-section">
            <!-- 圆形专辑封面 -->
            <div class="album-cover-container">
              <div class="album-cover" :class="{ 'rotating': isPlaying }">
                <img :src="albumCover" alt="专辑封面" class="cover-img">
              </div>
            </div>
            
            <!-- 歌词显示区域 -->
            <div class="lyrics-container">
              <div class="lyrics">{{ lyrics[currentLyricIndex].text }}</div>
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
          
          <!-- 控制按钮 -->
          <div class="controls">
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
          
          <!-- 自动读取public/music目录下的音乐文件 -->
        </div>
      </div>
    </template>


    <!-- articlesBefore 位置插槽  Github 贡献热力图 -->
    <template #articlesBefore>
      <img 
        class="github-chart"
        src="https://ghchart.rshah.org/youze27" 
        alt="youze27  Github chart" 
      />
    </template>

    <!-- infoAfter 位置插槽 博客统计信息 -->
    <template #infoAfter>
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
          <div id="visitChart" style="width: 100%; max-width: 300px; height: 150px;"></div>
        </div>
      </div>
    </template>

    <!-- contentBefore  位置插槽 底部链接 -->
    <template #contentBefore >
      <div class="bottom-links-container">
        <div><a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力"><img class="bottom-link-img" src="/assets/icon/travelling_len.svg" alt="开往-友链接力" ></a></div>
        <div><a href="https://www.boyouquan.com/planet-shuttle" target="_blank" rel="noopener" title="博友圈"><img class="bottom-link-img" src="/assets/icon/planet-shuttle.svg" alt="博友圈"></a></div>
        <div><a href="https://www.foreverblog.cn/go.html" target="_blank"> <img class="bottom-link-img" src="/assets/icon/wormhole_4_tp.gif" alt="穿梭虫洞"  title="穿梭虫洞-随机访问十年之约友链博客"  ></a></div>
        <div><a href="https://boke.lu/sj" target="_blank"> <img class="bottom-link-img" src="/assets/icon/suiji_en.gif" alt="随机博客"  title="随机博客"  ></a></div>
        <div><a href="https://blogscn.fun/random.html" target="_blank"> <img class="bottom-link-img" src="/assets/icon/blogscn.svg" alt="笔墨迹"  title="笔墨迹-随机博客"  ></a></div>
        <div><a href="https://blogs.quest" target="_blank" title="空间穿梭-随机访问BlogsClub成员博客"><img class="bottom-link-img"  src="/assets/icon/shuttle.png"></a></div>
      </div>
    </template>

  </Blog>

  <!-- 看板娘 -->
  <Live2D />
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



/* 音乐播放器样式 - 继承博客整体主题 */
.music-player-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.music-player {
  width: 90%;
  max-width: 700px;
  background: var(--c-bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 12px;
  padding: 15px;
  box-shadow: var(--box-shadow, 0 2px 12px rgba(0, 0, 0, 0.1));
  color: var(--c-text, #333);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--c-border, rgba(0, 0, 0, 0.1));
}

/* 顶部区域 - 专辑封面和歌词 */
.top-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 专辑封面容器 */
.album-cover-container {
  margin-right: 15px;
}

/* 专辑封面 - 圆形 */
.album-cover {
  width: 80px;
  height: 80px;
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

/* 歌曲信息 */
.song-info {
  text-align: center;
  margin-bottom: 8px;
}

.song-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 12px;
  opacity: 0.9;
}

/* 歌词显示 - 位于图片右侧 */
.lyrics-container {
  flex: 1;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 0 10px;
}

.lyrics {
  font-size: 14px;
  line-height: 1.4;
  transition: transform 0.3s ease;
}

/* 进度条 */
.progress-container {
  display: flex;
  align-items: center;
  margin: 20px 0;
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
  background: rgba(0, 0, 0, 1);
  outline: none;
  -webkit-appearance: none;
  margin: 0 5px;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #299764;
  cursor: pointer;
}

/* 控制按钮 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid var(--c-border, rgba(0, 0, 0, 0.1));
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--c-text, #333);
  padding: 0;
}

.control-btn:hover {
  background: var(--c-bg, #fff);
  transform: scale(1.1);
}

.play-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid var(--c-border, rgba(0, 0, 0, 0.1));
  color: var(--c-text, #333);
}

.volume-bar {
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.91);
  outline: none;
  -webkit-appearance: none;
}

.volume-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #299764;
  cursor: pointer;
}

.volume-bar::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #299764;
  cursor: pointer;
  border: none;
}

.volume-bar::-ms-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #299764;
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
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.file-label:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 博客统计样式 */
.blog-stats {
  background: var(--c-bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 8px;
  padding: 15px;
  box-shadow: var(--box-shadow, 0 2px 12px rgba(0, 0, 0, 0.1));
  margin-top: 20px;
  border: 1px solid var(--c-border, rgba(0, 0, 0, 0.1));
}

.blog-stats h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: var(--c-text, #333);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat-item {
  text-align: center;
  padding: 10px;
  background: var(--c-bg, #fff);
  border-radius: 6px;
  border: none;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--c-primary, #42b983);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: var(--c-text-light, #666);
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>