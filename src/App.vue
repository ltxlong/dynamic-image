<template>
  <div :class="{'dark': isDark}" class="min-h-screen">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch, provide } from 'vue'
import { useStorage } from '@vueuse/core'

// 使用 localStorage 持久化主题设置
const isDark = useStorage('theme-dark', false)

// 监听主题变化，更新 HTML 的 class
watch(isDark, (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

// 提供给其他组件使用
provide('isDark', isDark)
</script> 
