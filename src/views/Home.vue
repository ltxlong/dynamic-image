<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
    <!-- 装饰元素 - 移到最底层 -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-soft-light filter blur-3xl z-0"></div>
    
    <!-- 粒子背景 - 中间层 -->
    <div id="particles-js" class="absolute inset-0 opacity-40 z-10"></div>

    <!-- 主要内容 - 最上层 -->
    <div class="relative z-20 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
      <!-- 玻璃拟态卡片 -->
      <div class="backdrop-blur-lg bg-white/5 p-8 rounded-3xl shadow-2xl border border-white/10 max-w-2xl w-full">
        <h1 class="text-5xl font-bold text-center mb-6 text-white tracking-wider bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
          灵动小尾巴
          <span class="inline-block animate-bounce">~</span>
        </h1>
        
        <p class="text-center text-slate-300 mb-8 text-lg leading-relaxed flex items-center justify-center gap-2">
          这是一个基于 
          <span class="font-semibold text-sky-300">Cloudflare Pages</span> 
          的智能图片链接管理系统
          <a 
            href="https://github.com/ltxlong/dynamic-image" 
            target="_blank"
            class="text-slate-300 hover:text-white transition-colors"
            title="GitHub 仓库"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
          </a>
        </p>

        <!-- 动态按钮 -->
        <div class="text-center">
          <router-link 
            to="/admin" 
            class="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-sky-500 to-slate-600 rounded-full hover:from-sky-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <span>进入管理页面</span>
            <svg class="w-5 h-5 ml-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { tsParticles } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'

onMounted(async () => {
  // 初始化粒子效果
  await loadFull(tsParticles)
  await tsParticles.load('particles-js', {
    particles: {
      number: { 
        value: 80, 
        density: { enable: true, value_area: 800 } 
      },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { 
        value: 0.5, 
        random: false 
      },
      size: { 
        value: 3, 
        random: true 
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        outModes: 'out',
        bounce: false
      }
    },
    interactivity: {
      events: {
        onHover: { 
          enable: true, 
          mode: 'repulse' 
        },
        onClick: { 
          enable: true, 
          mode: 'push' 
        },
        resize: true
      }
    },
    retina_detect: true
  })
})
</script>

<style>
/* 移除原有的 z-index 相关样式 */
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style> 
