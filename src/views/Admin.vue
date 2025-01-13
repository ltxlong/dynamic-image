<template>
  <div class="min-h-screen"
    :class="[
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100 to-white'
    ]"
  >
    <!-- 装饰光晕 -->
    <div class="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full mix-blend-soft-light filter blur-3xl z-0"
      :class="[isDark ? 'bg-sky-500/20' : 'bg-sky-300/20']"
    ></div>

    <!-- 顶部导航栏 -->
    <nav class="relative z-10 border-b"
      :class="[
        isDark 
          ? 'bg-white/5 backdrop-blur-lg border-white/10' 
          : 'bg-white/70 backdrop-blur-lg border-slate-200'
      ]"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold tracking-wide"
            :class="[isDark ? 'text-white' : 'text-slate-800']"
          >
            图片链接管理系统
          </h1>
          
          <div class="flex items-center gap-4">
            <!-- 主题切换开关 -->
            <button 
              @click="toggleTheme"
              class="relative inline-flex h-7 w-12 items-center rounded-full"
              :class="[isDark ? 'bg-sky-600' : 'bg-slate-200']"
            >
              <span class="sr-only">切换主题</span>
              <!-- 滑块 -->
              <span
                class="absolute left-0.5 inline-block h-6 w-6 transform rounded-full bg-white shadow-sm"
                :class="[isDark ? 'translate-x-5' : 'translate-x-0']"
              ></span>
              <!-- 太阳图标 -->
              <svg 
                class="absolute left-0.5 w-6 h-6 p-1"
                :class="[isDark ? 'opacity-0' : 'opacity-100 text-amber-500']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- 月亮图标 -->
              <svg 
                class="absolute right-0.5 w-6 h-6 p-1"
                :class="[isDark ? 'opacity-100 text-slate-800' : 'opacity-0']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- 退出登录按钮 -->
            <button 
              v-if="isAuthenticated"
              @click="logout"
              class="flex items-center gap-2 px-4 py-2 rounded-lg"
              :class="[
                isDark 
                  ? 'bg-white/10 backdrop-blur-lg border border-white/10 text-white hover:bg-white/20' 
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- 登录界面 -->
      <div v-if="!isAuthenticated" 
        class="max-w-md mx-auto mt-20 relative"
      >
        <!-- 登录卡片 -->
        <div class="backdrop-blur-lg rounded-3xl shadow-2xl border overflow-hidden"
          :class="[
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/80 border-slate-200'
          ]"
        >
          <!-- 登录标题区域 -->
          <div class="p-8 text-center relative">
            <div class="absolute inset-0 bg-gradient-to-b"
              :class="[isDark ? 'from-sky-500/20' : 'from-sky-500/10']"
            ></div>
            <div class="relative">
              <h2 class="text-3xl font-bold"
                :class="[isDark ? 'text-white' : 'text-slate-800']"
              >
                管理员登录
              </h2>
            </div>
          </div>

          <!-- 登录表单区域 -->
          <div class="p-8 pt-4">
            <div class="space-y-6">
              <!-- 密码输入框 -->
              <div class="relative">
                <input 
                  type="password" 
                  v-model="password"
                  @keyup.enter="login"
                  class="w-full px-4 py-3 rounded-lg"
                  :class="[
                    isDark 
                      ? 'bg-slate-800/50 text-white placeholder-slate-400 border border-white/10 focus:border-sky-500 focus:outline-none' 
                      : 'bg-white text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:outline-none'
                  ]"
                  placeholder="请输入密码"
                >
              </div>

              <!-- 登录按钮 -->
              <button 
                @click="login"
                class="w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                :class="[
                  isDark 
                    ? 'bg-gradient-to-r from-sky-500 to-slate-600 text-white hover:from-sky-600 hover:to-slate-700'
                    : 'bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:from-sky-500 hover:to-blue-600'
                ]"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他内容保持不变 -->
      <div v-else class="space-y-6">
        <!-- 显示模式设置卡片 -->
        <div class="rounded-lg shadow-sm overflow-hidden"
          :class="[
            isDark 
              ? 'bg-slate-800/50 border border-white/10' 
              : 'bg-white border border-slate-200'
          ]"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex items-center gap-2 w-32">
                <svg class="w-5 h-5" 
                  :class="[isDark ? 'text-slate-400' : 'text-gray-500']" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <h2 class="text-lg font-semibold"
                  :class="[isDark ? 'text-white' : 'text-slate-800']"
                >
                  显示模式
                </h2>
              </div>
              <div class="flex-1 flex justify-center items-center gap-4">
                <div class="relative group" style="z-index: 9999;">
                  <svg class="w-5 h-5 cursor-help relative"
                    :class="[isDark ? 'text-slate-400' : 'text-gray-500']" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    ref="helpIcon"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <!-- 提示弹窗 -->
                  <div class="fixed w-64 p-4 rounded-lg shadow-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200"
                    style="z-index: 10000;"
                    :style="{
                      top: helpIconPosition.bottom + 8 + 'px',
                      left: helpIconPosition.left + 'px'
                    }"
                    :class="[
                      isDark 
                        ? 'bg-slate-700 border border-white/10' 
                        : 'bg-white border border-slate-200'
                    ]"
                  >
                    <div class="relative">
                      <div class="space-y-2">
                        <div>
                          <span class="font-medium"
                            :class="[isDark ? 'text-white' : 'text-slate-800']"
                          >随机模式：</span>
                        </div>
                        <div>
                          <span :class="[isDark ? 'text-slate-300' : 'text-slate-600']">所有链接随机返回一条</span>
                        </div>
                        <div>
                          <span class="font-medium"
                            :class="[isDark ? 'text-white' : 'text-slate-800']"
                          >标签模式：优先级</span>
                        </div>
                        <div>
                          <span :class="[isDark ? 'text-slate-300' : 'text-slate-600']">日标签>周标签>月标签</span>
                        </div>
                        <div :class="[isDark ? 'text-slate-400' : 'text-slate-500']" class="text-sm">
                          如果有多个url有相同的标签，
                        </div>
                        <div :class="[isDark ? 'text-slate-400' : 'text-slate-500']" class="text-sm">
                          那么这些链接随机返回一条
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <select 
                  v-model="displayMode"
                  class="w-[30%] p-2.5 rounded-lg"
                  :class="[
                    isDark 
                      ? 'bg-slate-800/50 text-white border border-white/10 focus:border-sky-500 focus:outline-none' 
                      : 'bg-white text-slate-800 border border-slate-200 focus:border-sky-500 focus:outline-none'
                  ]"
                >
                  <option value="1">随机模式</option>
                  <option value="2">标签模式</option>
                </select>
                <button 
                  @click="updateMode"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  style="z-index: 1;"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  保存设置
                </button>
                <button 
                  @click="showAccessDialog = true"
                  class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2 ml-auto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  限制访问
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 链接列表卡片 -->
        <div class="rounded-lg shadow-sm overflow-hidden"
          :class="[
            isDark 
              ? 'bg-slate-800/50 border border-white/10' 
              : 'bg-white border border-slate-200'
          ]"
        >
          <div class="p-6">
            <!-- 标题和添加按钮 -->
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" 
                  :class="[isDark ? 'text-slate-400' : 'text-gray-500']" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 class="text-lg font-semibold"
                  :class="[isDark ? 'text-white' : 'text-slate-800']"
                >
                  现有链接
                </h2>
              </div>
              <button 
                @click="showAddDialog = true"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                新增链接
              </button>
            </div>

            <!-- 搜索和过滤 -->
            <div class="flex gap-4 mb-6">
              <div class="flex-1 relative">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  v-model="searchQuery"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg"
                  :class="[
                    isDark 
                      ? 'bg-slate-800/50 text-white placeholder-slate-400 border border-white/10 focus:border-sky-500 focus:outline-none' 
                      : 'bg-white text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:outline-none'
                  ]"
                  placeholder="通过链接的【说明】来过滤..."
                >
              </div>
              <select 
                v-model="filterType"
                class="w-40 p-2.5 rounded-lg"
                :class="[
                  isDark 
                    ? 'bg-slate-800/50 text-white border border-white/10 focus:border-sky-500 focus:outline-none' 
                    : 'bg-white text-slate-800 border border-slate-200 focus:border-sky-500 focus:outline-none'
                ]"
              >
                <option value="all">全部的</option>
                <option value="active">已激活</option>
                <option value="inactive">已停用</option>
              </select>
            </div>

            <!-- 表格部分 -->
            <table class="min-w-full divide-y"
              :class="[
                isDark 
                  ? 'divide-white/10' 
                  : 'divide-gray-200'
              ]"
            >
              <thead :class="[isDark ? 'bg-slate-800/30' : 'bg-gray-50']">
                <tr>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    预览
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    链接
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    说明
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    月标签
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    周标签
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    日标签
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    :class="[isDark ? 'text-slate-300' : 'text-gray-500']"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y"
                :class="[
                  isDark 
                    ? 'divide-white/10' 
                    : 'divide-gray-200'
                ]"
              >
                <tr v-for="link in filteredLinks" 
                  :key="link.id"
                  class=""
                  :class="[
                    isDark 
                      ? 'hover:bg-slate-700/50 text-slate-300' 
                      : 'hover:bg-gray-50 text-gray-600'
                  ]"
                >
                  <!-- 状态列 -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center justify-center">
                      <button 
                        @click="toggleLinkStatus(link.id)"
                        class="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none shrink-0"
                        :class="link.active ? 'bg-green-500' : 'bg-gray-300'"
                      >
                        <span class="sr-only">切换状态</span>
                        <span 
                          class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out"
                          :class="link.active ? 'translate-x-6' : 'translate-x-1'"
                        ></span>
                      </button>
                      <span 
                        class="ml-2 text-sm whitespace-nowrap"
                        :class="link.active ? 'text-green-600' : 'text-gray-500'"
                      >
                        {{ link.active ? '已激活' : '已停用' }}
                      </span>
                    </div>
                  </td>

                  <!-- 预览列 -->
                  <td class="px-6 py-4">
                    <div class="flex justify-center">
                      <div class="w-20 h-20 relative group">
                        <img 
                          :src="link.url" 
                          class="object-cover w-full h-full rounded cursor-pointer"
                          @error="handleImageError($event, link.id)"
                          @click="previewImage = link.url"
                          alt="预览图"
                        >
                        <!-- 悬停时显示的放大图标 -->
                        <div 
                          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200"
                          @click="previewImage = link.url"
                        >
                          <svg 
                            class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
                              stroke-width="2" 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                            />
                          </svg>
                        </div>
                        <div 
                          v-if="imageErrors[link.id]" 
                          class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded"
                        >
                          <span class="text-xs text-gray-500">加载失败</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- 链接列 -->
                  <td class="px-6 py-4">
                    <div class="flex justify-center">
                      <div class="truncate w-32">{{ link.url }}</div>
                    </div>
                  </td>

                  <!-- 说明列 -->
                  <td class="px-6 py-4">
                    <div class="relative group" :data-link-id="link.id">
                      <div class="truncate w-32 cursor-help mx-auto">
                        {{ link.description }}
                      </div>
                      <!-- 悬停提示框 -->
                      <div 
                        class="absolute z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 
                          invisible opacity-0 transition-all duration-200"
                        :class="[
                          tooltipPositions[link.id] 
                            ? 'bottom-full mb-2' 
                            : 'top-full mt-2'
                        ]"
                      >
                        <!-- 小箭头 -->
                        <div 
                          class="absolute w-3 h-3 bg-white border border-gray-200 transform rotate-45"
                          :class="[
                            tooltipPositions[link.id]
                              ? 'bottom-[-6px] border-r border-b left-8' 
                              : 'top-[-6px] border-l border-t left-8'
                          ]"
                        ></div>
                        <!-- 内容容器 -->
                        <div class="relative bg-white rounded-lg overflow-hidden">
                          <!-- 内容 -->
                          <div class="p-4 text-sm text-gray-600 whitespace-pre-wrap break-words">
                            {{ link.description }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- 月标签列 -->
                  <td class="px-6 py-4">
                    <div class="flex flex-col gap-1 items-center">
                      <span 
                        v-for="month in link.monthTags" 
                        :key="month"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-16 justify-center"
                      >
                        {{ month }}月
                      </span>
                      <span v-if="!link.monthTags?.length" class="text-gray-400 text-xs">无</span>
                    </div>
                  </td>

                  <!-- 周标签列 -->
                  <td class="px-6 py-4">
                    <div class="flex flex-col gap-1 items-center">
                      <span 
                        v-for="day in link.weekTags" 
                        :key="day"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 justify-center whitespace-nowrap"
                      >
                        星期{{ ['日', '一', '二', '三', '四', '五', '六'][day % 7] }}
                      </span>
                      <span v-if="!link.weekTags?.length" class="text-gray-400 text-xs">无</span>
                    </div>
                  </td>

                  <!-- 日标签列 -->
                  <td class="px-6 py-4 text-center w-40">
                    <div class="w-36 mx-auto whitespace-pre-line text-xs">
                      <template v-if="link.holidayTag && Array.isArray(link.holidayTag)">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-lg font-medium"
                          :class="['bg-red-100 text-red-800']"
                        >
                          {{ link.holidayTag[0] === link.holidayTag[1] 
                            ? link.holidayTag[0] 
                            : `${link.holidayTag[0]}\n至\n${link.holidayTag[1]}` 
                          }}
                        </span>
                      </template>
                      <span v-else class="text-gray-400 text-xs">无</span>
                    </div>
                  </td>

                  <!-- 操作列 -->
                  <td class="px-6 py-4 w-32">
                    <div class="flex flex-col items-center space-y-2">
                      <button
                        @click="viewLink(link)"
                        class="inline-flex items-center justify-center px-3 py-1.5 w-24 rounded-md text-sm font-medium"
                        :class="[
                          isDark 
                            ? 'bg-slate-700/50 text-sky-400 hover:bg-slate-600/50' 
                            : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                        ]"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        查看
                      </button>

                      <button
                        @click="editLink(link)"
                        class="inline-flex items-center justify-center px-3 py-1.5 w-24 rounded-md text-sm font-medium"
                        :class="[
                          isDark 
                            ? 'bg-slate-700/50 text-emerald-400 hover:bg-slate-600/50' 
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        ]"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        编辑
                      </button>

                      <button
                        @click="confirmDeleteLink(link)"
                        class="inline-flex items-center justify-center px-3 py-1.5 w-24 rounded-md text-sm font-medium"
                        :class="[
                          isDark 
                            ? 'bg-slate-700/50 text-rose-400 hover:bg-slate-600/50' 
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        ]"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <div v-if="previewImage" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click.self="previewImage = null"
    >
      <div class="relative max-w-4xl w-full">
        <!-- 关闭按钮 -->
        <button 
          @click="previewImage = null"
          class="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- 图片容器 -->
        <div class="bg-white rounded-lg overflow-hidden">
          <img 
            :src="previewImage" 
            class="w-full h-auto"
            alt="预览图"
          >
        </div>
      </div>
    </div>

    <!-- 查看链接对话框 -->
    <div v-if="showViewDialog" 
      class="fixed inset-0 z-[70] overflow-y-auto"
    >
      <!-- 遮罩层 -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="showViewDialog = false"
      ></div>

      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden max-h-[calc(100vh-2rem)]"
          :class="[
            isDark 
              ? 'bg-slate-800 border border-white/10' 
              : 'bg-white'
          ]"
        >
          <!-- 弹窗头部 -->
          <div class="px-6 py-4 border-b flex justify-between items-center"
            :class="[
              isDark 
                ? 'border-white/10' 
                : 'border-gray-200'
            ]"
          >
            <h3 class="text-xl font-bold"
              :class="[isDark ? 'text-white' : 'text-gray-800']"
            >查看链接</h3>
            <button 
              @click="showViewDialog = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- 弹窗内容 -->
          <div class="overflow-y-auto" style="max-height: calc(100vh - 8rem);">
            <div class="p-6">
              <div class="space-y-6">
                <!-- 链接和说明 -->
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1"
                      :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                    >链接地址</label>
                    <div class="p-3 rounded-lg border overflow-y-auto max-h-32"
                      :class="[
                        isDark 
                          ? 'bg-slate-700/50 border-white/10 text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      ]"
                    >{{ viewingLink.url }}</div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1"
                      :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                    >备注说明</label>
                    <div class="p-3 rounded-lg border overflow-y-auto max-h-32"
                      :class="[
                        isDark 
                          ? 'bg-slate-700/50 border-white/10 text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      ]"
                    >{{ viewingLink.description }}</div>
                  </div>
                </div>

                <!-- 标签组 -->
                <div>
                  <label class="block text-sm font-medium mb-2"
                    :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                  >标签信息</label>
                  <div class="grid grid-cols-3 gap-4">
                    <div class="rounded-lg border p-3"
                      :class="[
                        isDark 
                          ? 'bg-slate-700/50 border-white/10' 
                          : 'bg-gray-50 border-gray-200'
                      ]"
                    >
                      <span class="block text-xs mb-2"
                        :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
                      >月标签</span>
                      <div class="grid grid-cols-3 gap-2">
                        <span 
                          v-for="month in viewingLink.monthTags" 
                          :key="month"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 justify-center"
                        >
                          {{ month }}月
                        </span>
                        <span v-if="!viewingLink.monthTags?.length" class="text-gray-500 text-sm">无</span>
                      </div>
                    </div>
                    <div class="rounded-lg border p-3"
                      :class="[
                        isDark 
                          ? 'bg-slate-700/50 border-white/10' 
                          : 'bg-gray-50 border-gray-200'
                      ]"
                    >
                      <span class="block text-xs mb-2"
                        :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
                      >周标签</span>
                      <div class="grid grid-cols-3 gap-2">
                        <span 
                          v-for="day in viewingLink.weekTags" 
                          :key="day"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 justify-center whitespace-nowrap"
                        >
                          星期{{ ['日', '一', '二', '三', '四', '五', '六'][day % 7] }}
                        </span>
                        <span v-if="!viewingLink.weekTags?.length" class="text-gray-500 text-sm">无</span>
                      </div>
                    </div>
                    <div class="rounded-lg border p-3"
                      :class="[
                        isDark 
                          ? 'bg-slate-700/50 border-white/10' 
                          : 'bg-gray-50 border-gray-200'
                      ]"
                    >
                      <span class="block text-xs mb-1"
                        :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
                      >日标签</span>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium whitespace-pre-line text-center"
                        :class="viewingLink.holidayTag ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'"
                      >
                        <template v-if="viewingLink.holidayTag && Array.isArray(viewingLink.holidayTag)">
                          {{ viewingLink.holidayTag[0] === viewingLink.holidayTag[1] 
                            ? viewingLink.holidayTag[0] 
                            : `${viewingLink.holidayTag[0]}\n至\n${viewingLink.holidayTag[1]}` 
                          }}
                        </template>
                        <template v-else>无</template>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 查看链接弹窗底部 -->
          <div class="px-6 py-4 border-t flex justify-end"
            :class="[
              isDark 
                ? 'bg-slate-700/50 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <button 
              @click="showViewDialog = false"
              class="px-4 py-2 rounded-md transition-colors"
              :class="[
                isDark 
                  ? 'bg-slate-600 text-white hover:bg-slate-500' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              ]"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加新链接弹窗 -->
    <div v-if="showAddDialog" 
      class="fixed inset-0 z-[70] overflow-y-auto"
    >
      <!-- 遮罩层 -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="showAddDialog = false"
      ></div>
      
      <!-- 弹窗内容 -->
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden"
          :class="[
            isDark 
              ? 'bg-slate-800 border border-white/10' 
              : 'bg-white'
          ]"
        >
          <!-- 弹窗标题 -->
          <div class="px-6 py-4 border-b flex justify-between items-center"
            :class="[
              isDark 
                ? 'border-white/10 text-white' 
                : 'border-gray-200 text-gray-800'
            ]"
          >
            <h3 class="text-lg font-semibold">新增链接</h3>
            <button 
              @click="showAddDialog = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 弹窗内容 -->
          <div class="p-6">
            <div class="space-y-6">
              <!-- 链接和说明 -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">链接地址</label>
                  <input 
                    v-model="newLink.url" 
                    class="w-full p-2.5 border rounded-lg transition-colors focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    :class="[
                      isDark 
                        ? 'bg-slate-700/50 text-white border-white/10' 
                        : 'bg-white text-slate-800 border-slate-200'
                    ]"
                    placeholder="请输入链接地址"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">备注说明</label>
                  <input 
                    v-model="newLink.description" 
                    class="w-full p-2.5 border rounded-lg transition-colors focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    :class="[
                      isDark 
                        ? 'bg-slate-700/50 text-white border-white/10' 
                        : 'bg-white text-slate-800 border-slate-200'
                    ]"
                    placeholder="请输入备注说明"
                  >
                </div>
              </div>

              <!-- 标签组 -->
              <div class="grid gap-6">
                <label class="block text-sm font-medium text-gray-700">标签信息</label>
                <div class="grid grid-cols-3 gap-4">
                  <!-- 新增链接弹窗中的月标签选择 -->
                  <div class="grid gap-1 content-start">
                    <span class="text-xs text-center" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">月标签</span>
                    <div class="grid grid-cols-3 auto-rows-min gap-4 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <button
                        v-for="month in 12"
                        :key="month"
                        @click="toggleMonthTag(month, newLink)"
                        class="px-2 py-0.5 rounded-full text-sm font-medium transition-colors w-12 justify-self-center"
                        :class="[
                          newLink.monthTags?.includes(month)
                            ? (isDark ? 'bg-blue-900/50 text-blue-100' : 'bg-blue-100 text-blue-800')
                            : (isDark ? 'bg-slate-700/50 text-white/60' : 'bg-gray-100 text-gray-600')
                        ]"
                      >
                        {{ month }}月
                      </button>
                    </div>
                  </div>

                  <!-- 新增链接弹窗中的周标签选择 -->
                  <div class="grid gap-1 content-start">
                    <span class="text-xs text-center" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">周标签</span>
                    <div class="grid auto-rows-min gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <button
                        v-for="day in 7"
                        :key="day-1"
                        @click="toggleWeekTag(day-1, newLink)"
                        class="px-2 py-0.5 rounded-full text-sm font-medium transition-colors w-24 justify-self-center"
                        :class="[
                          newLink.weekTags?.includes(day-1)
                            ? (isDark ? 'bg-green-900/50 text-green-100' : 'bg-green-100 text-green-800')
                            : (isDark ? 'bg-slate-700/50 text-white/60' : 'bg-gray-100 text-gray-600')
                        ]"
                      >
                        星期{{ ['日', '一', '二', '三', '四', '五', '六'][day-1] }}
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-1 content-start">
                    <label class="text-xs text-center text-gray-500">日标签</label>
                    <div class="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <DateRangePicker 
                        @update="updateNewLinkDateRange"
                        :initial-value="newLink.holidayTag"
                        :is-dark="isDark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 弹窗底部 -->
          <div class="px-6 py-4 border-t flex justify-between items-center"
            :class="[
              isDark 
                ? 'bg-slate-700/50 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <button 
              @click="showAddDialog = false"
              class="px-4 py-2 border rounded-lg transition-colors"
              :class="[
                isDark 
                  ? 'border-white/10 bg-slate-600 text-white hover:bg-slate-500' 
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              ]"
            >
              取消
            </button>
            <button 
              @click="addNewLink"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示组件 -->
    <div 
      v-if="notification.show"
      class="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform z-[100]"
      :class="{
        'bg-green-500 text-white': notification.type === 'success',
        'bg-red-500 text-white': notification.type === 'error'
      }"
    >
      {{ notification.message }}
    </div>

    <!-- 在其他弹窗后面添加编辑弹窗 -->
    <div v-if="showEditDialog" 
      class="fixed inset-0 z-[70] overflow-y-auto"
    >
      <!-- 遮罩层 -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="showEditDialog = false"
      ></div>

      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden"
          :class="[
            isDark 
              ? 'bg-slate-800 border border-white/10' 
              : 'bg-white'
          ]"
        >
          <!-- 弹窗头部 -->
          <div class="px-6 py-4 border-b flex justify-between items-center"
            :class="[
              isDark 
                ? 'border-white/10' 
                : 'border-gray-200'
            ]"
          >
            <h3 class="text-xl font-bold"
              :class="[isDark ? 'text-white' : 'text-gray-800']"
            >编辑链接</h3>
            <button 
              @click="showEditDialog = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- 弹窗内容 -->
          <div class="p-6">
            <div class="space-y-6">
              <!-- 链接和说明 -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                  >链接地址</label>
                  <input 
                    v-model="editingLink.url" 
                    class="w-full p-2.5 border rounded-lg transition-colors focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    :class="[
                      isDark 
                        ? 'bg-slate-700/50 text-white border-white/10' 
                        : 'bg-white text-slate-800 border-slate-200'
                    ]"
                    placeholder="请输入链接地址"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1"
                    :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                  >备注说明</label>
                  <input 
                    v-model="editingLink.description" 
                    class="w-full p-2.5 border rounded-lg transition-colors focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none"
                    :class="[
                      isDark 
                        ? 'bg-slate-700/50 text-white border-white/10' 
                        : 'bg-white text-slate-800 border-slate-200'
                    ]"
                    placeholder="请输入备注说明"
                  >
                </div>
              </div>

              <!-- 标签组 -->
              <div class="grid gap-6">
                <label class="block text-sm font-medium"
                  :class="[isDark ? 'text-gray-300' : 'text-gray-700']"
                >标签信息</label>
                <div class="grid grid-cols-3 gap-4">
                  <!-- 编辑弹窗中的月标签选择 -->
                  <div class="grid gap-1 content-start">
                    <span class="text-xs text-center" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">月标签</span>
                    <div class="grid grid-cols-3 auto-rows-min gap-4 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <button
                        v-for="month in 12"
                        :key="month"
                        @click="toggleMonthTag(month, editingLink)"
                        class="px-2 py-0.5 rounded-full text-sm font-medium transition-colors w-12 justify-self-center"
                        :class="[
                          editingLink.monthTags?.includes(month)
                            ? (isDark ? 'bg-blue-900/50 text-blue-100' : 'bg-blue-100 text-blue-800')
                            : (isDark ? 'bg-slate-700/50 text-white/60' : 'bg-gray-100 text-gray-600')
                        ]"
                      >
                        {{ month }}月
                      </button>
                    </div>
                  </div>

                  <!-- 编辑弹窗中的周标签选择 -->
                  <div class="grid gap-1 content-start">
                    <span class="text-xs text-center" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">周标签</span>
                    <div class="grid auto-rows-min gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <button
                        v-for="day in 7"
                        :key="day-1"
                        @click="toggleWeekTag(day-1, editingLink)"
                        class="px-2 py-0.5 rounded-full text-sm font-medium transition-colors w-24 justify-self-center"
                        :class="[
                          editingLink.weekTags?.includes(day-1)
                            ? (isDark ? 'bg-green-900/50 text-green-100' : 'bg-green-100 text-green-800')
                            : (isDark ? 'bg-slate-700/50 text-white/60' : 'bg-gray-100 text-gray-600')
                        ]"
                      >
                        星期{{ ['日', '一', '二', '三', '四', '五', '六'][day-1] }}
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-1 content-start">
                    <label class="text-xs text-center text-gray-500">日标签</label>
                    <div class="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <DateRangePicker 
                        @update="updateEditingLinkDateRange"
                        :initial-value="editingLink.holidayTag"
                        :is-dark="isDark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 编辑链接弹窗底部 -->
          <div class="px-6 py-4 border-t flex justify-between items-center"
            :class="[
              isDark 
                ? 'bg-slate-700/50 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <button 
              @click="showEditDialog = false"
              class="px-4 py-2 border rounded-lg transition-colors"
              :class="[
                isDark 
                  ? 'border-white/10 bg-slate-600 text-white hover:bg-slate-500' 
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              ]"
            >
              取消
            </button>
            <button 
              @click="saveEdit"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 在其他弹窗后面添加删除确认弹窗 -->
    <div v-if="showDeleteDialog" 
      class="fixed inset-0 z-[70] overflow-y-auto"
    >
      <!-- 遮罩层 -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="showDeleteDialog = false"
      ></div>

      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative max-w-md w-full rounded-2xl shadow-xl overflow-hidden"
          :class="[
            isDark 
              ? 'bg-slate-800 border border-white/10' 
              : 'bg-white'
          ]"
        >
          <!-- 弹窗头部 -->
          <div class="px-6 py-4 border-b flex items-center"
            :class="[
              isDark 
                ? 'border-white/10' 
                : 'border-gray-200'
            ]"
          >
            <div class="flex items-center"
              :class="[isDark ? 'text-red-400' : 'text-red-600']"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 class="text-xl font-bold">确认删除</h3>
            </div>
          </div>
          
          <!-- 弹窗内容 -->
          <div class="p-6">
            <p class="text-sm"
              :class="[isDark ? 'text-gray-300' : 'text-gray-600']"
            >确定要删除以下链接吗？此操作不可恢复。</p>
            <div class="mt-4 rounded-lg border overflow-y-auto overflow-x-hidden max-h-48"
              :class="[
                isDark 
                  ? 'bg-slate-700/50 border-white/10' 
                  : 'bg-gray-50 border-gray-200'
              ]"
            >
              <div class="p-4">
                <p class="text-sm break-all whitespace-normal"
                  :class="[isDark ? 'text-gray-200' : 'text-gray-700']"
                >{{ deletingLink?.url }}</p>
                <p v-if="deletingLink?.description" 
                  class="mt-2 text-sm break-all whitespace-normal"
                  :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
                >
                  说明：
                  {{ deletingLink.description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- 弹窗底部 -->
          <div class="px-6 py-4 border-t flex justify-between items-center"
            :class="[
              isDark 
                ? 'bg-slate-700/50 border-white/10' 
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <button 
              @click="showDeleteDialog = false"
              class="px-4 py-2 border rounded-lg transition-colors"
              :class="[
                isDark 
                  ? 'border-white/10 hover:bg-slate-700 text-white' 
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              ]"
            >
              取消
            </button>
            <button 
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 访问限制弹窗 -->
    <div v-if="showAccessDialog" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showAccessDialog = false"></div>
      
      <!-- 弹窗内容 -->
      <div class="relative w-full max-w-lg p-6 rounded-2xl shadow-xl"
        :class="[
          isDark 
            ? 'bg-slate-800 border border-white/10' 
            : 'bg-white border border-slate-200'
        ]"
      >
        <h3 class="text-xl font-semibold mb-2"
          :class="[isDark ? 'text-white' : 'text-slate-800']"
        >
          访问限制设置
        </h3>
        <p class="text-sm mb-4"
          :class="[isDark ? 'text-gray-400' : 'text-gray-600']"
        >
          如果设置url，那么只有这些url才可以成功访问 /api
        </p>
        
        <!-- URL输入区域 -->
        <div class="mb-4">
          <div class="flex gap-2 mb-2">
            <input 
              v-model="newAccessUrl"
              type="text"
              placeholder="输入允许访问的URL（例如：example.com）"
              class="flex-1 px-4 py-2 rounded-lg"
              :class="[
                isDark 
                  ? 'bg-slate-700/50 text-white border border-white/10 focus:border-sky-500 focus:outline-none' 
                  : 'bg-white text-slate-800 border border-slate-200 focus:border-sky-500 focus:outline-none'
              ]"
              @keyup.enter="addAccessUrl"
            >
            <button 
              @click="addAccessUrl"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              添加
            </button>
          </div>
          
          <!-- URL列表 -->
          <div class="max-h-48 overflow-y-auto space-y-2">
            <div 
              v-for="(url, index) in accessUrls" 
              :key="index"
              class="flex items-center justify-between p-2 rounded-lg"
              :class="[
                isDark 
                  ? 'bg-slate-700/30 text-white' 
                  : 'bg-slate-50 text-slate-800'
              ]"
            >
              <span>{{ url }}</span>
              <button 
                @click="removeAccessUrl(index)"
                class="p-1 text-red-500 hover:text-red-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 按钮组 -->
        <div class="flex justify-end gap-4">
          <div class="flex-1">
            <button 
              @click="showAccessDialog = false"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="[
                isDark 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              取消
            </button>
          </div>
          <button 
            @click="saveAccessUrls"
            class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, inject, watch } from 'vue'
import { useLinkStore } from '../stores/linkStore'
import { storeToRefs } from 'pinia'
import DateRangePicker from '../components/DateRangePicker.vue'

const store = useLinkStore()
const { links, displayMode } = storeToRefs(store)
const isAuthenticated = ref(false)
const password = ref('')
const newLink = ref({
  url: '',
  description: '',
  monthTags: [],
  weekTags: [],
  holidayTag: null,
  active: true
})

const searchQuery = ref('')
const filterType = ref('all')
const showEditDialog = ref(false)
const editingLink = ref(null)

// 添加图片错误状态管理
const imageErrors = ref({})

// 添加图片错误处理函数
function handleImageError(event, linkId) {
  imageErrors.value[linkId] = true
}

// 计算过滤后的链接列表（纯本地过滤）
const filteredLinks = computed(() => {
  let result = links.value || []

  // 状态过滤
  switch (filterType.value) {
    case 'active':
      result = result.filter(link => link.active)
      break
    case 'inactive':
      result = result.filter(link => !link.active)
      break
  }

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(link => 
      link.description.toLowerCase().includes(query)
    )
  }

  return result
})

// 确保在页面加载时获取链接列表
onMounted(async () => {
  const authStatus = sessionStorage.getItem('token')
  if (authStatus) {
    isAuthenticated.value = true
    await store.fetchLinks() // 获取链接列表
    await store.fetchSettings() // 获取设置
    await getAccessUrls() // 获取访问限制URL列表
  }
})

async function login() {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: password.value })
    })

    const data = await response.json()
    
    if (response.ok && data.success && data.token) {
      isAuthenticated.value = true
      sessionStorage.setItem('token', data.token)
      await store.fetchLinks()
      password.value = '' // 清空密码
    } else {
      showNotification('登录失败！', 'error')
      password.value = '' // 清空密码
    }
  } catch (error) {
    showNotification('登录失败！', 'error')
    password.value = '' // 清空密码
  }
}

async function deleteLink(id) {
  deletingLinkId.value = id
  showDeleteDialog.value = true
}

function logout() {
  isAuthenticated.value = false
  sessionStorage.removeItem('token')
  store.links = []
}

async function updateMode() {
  try {
    await store.updateDisplayMode(Number(displayMode.value))
    showNotification('显示模式设置已保存')
  } catch (error) {
    showNotification('显示模式设置保存失败', 'error')
  }
}

function editLink(link) {
  editingLink.value = { 
    ...link,
    monthTags: Array.isArray(link.monthTags) ? link.monthTags : [],
    weekTags: Array.isArray(link.weekTags) ? link.weekTags : [],
    holidayTag: Array.isArray(link.holidayTag) ? link.holidayTag : null
  }
  showEditDialog.value = true
}

async function saveEdit() {
  if (!editingLink.value?.url?.trim()) {
    showNotification('链接地址不能为空', 'error')
    return
  }
  try {
    const linkToSave = {
      ...editingLink.value,
      monthTags: (editingLink.value.monthTags || []).sort((a, b) => a - b),
      weekTags: (editingLink.value.weekTags || []).sort((a, b) => a - b),
      holidayTag: editingLink.value.holidayTag || null
    }
    await store.updateLink(linkToSave)
    showNotification('链接更新成功')
    showEditDialog.value = false
  } catch (error) {
    console.error('保存失败:', error)
    showNotification('链接更新失败', 'error')
  }
}

async function toggleLinkStatus(id) {
  try {
    await store.toggleStatus(id)
    showNotification('状态更新成功')
  } catch (error) {
    showNotification('状态更新失败', 'error')
  }
}

const previewImage = ref(null)

// 添加查看链接对话框的逻辑
const showViewDialog = ref(false)
const viewingLink = ref(null)

function viewLink(link) {
  viewingLink.value = { ...link }
  showViewDialog.value = true
}

// 添加新链接弹窗的逻辑
const showAddDialog = ref(false)

// 添加通知状态
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

// 显示通知的函数
function showNotification(message, type = 'success') {
  notification.value = {
    show: true,
    message,
    type
  }
  // 3秒后自动隐藏
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

async function addNewLink() {
  if (!newLink.value.url?.trim()) {
    showNotification('链接地址不能为空', 'error')
    return
  }
  try {
    const linkToAdd = {
      ...newLink.value,
      monthTags: (newLink.value.monthTags || []).sort((a, b) => a - b),
      weekTags: (newLink.value.weekTags || []).sort((a, b) => a - b),
      holidayTag: newLink.value.holidayTag || null
    }
    await store.addLink(linkToAdd)
    showNotification('链接添加成功')
    showAddDialog.value = false
    newLink.value = {
      url: '',
      description: '',
      monthTags: [],
      weekTags: [],
      holidayTag: null,
      active: true
    }
  } catch (error) {
    console.error('添加失败:', error)
    showNotification('链接添加失败', 'error')
  }
}

// 修改删除相关的状态和函数
const showDeleteDialog = ref(false)
const deletingLink = ref(null)

// 显示删除确认弹窗
function confirmDeleteLink(link) {
  deletingLink.value = link
  showDeleteDialog.value = true
}

// 执行删除操作
async function confirmDelete() {
  if (!deletingLink.value) return
  
  try {
    await store.deleteLink(deletingLink.value.id)
    showNotification('链接删除成功')
    showDeleteDialog.value = false
  } catch (error) {
    showNotification('链接删除失败', 'error')
  } finally {
    deletingLink.value = null
  }
}

// 存储每个提示框的位置信息
const tooltipPositions = ref({})

// 监听滚动事件，更新提示框位置
onMounted(() => {
  const updateTooltipPositions = () => {
    const tooltipContainers = document.querySelectorAll('[data-link-id]')
    const windowHeight = window.innerHeight
    const middleScreen = windowHeight / 2

    tooltipContainers.forEach(container => {
      const linkId = container.getAttribute('data-link-id')
      if (linkId) {
        const rect = container.getBoundingClientRect()
        const elementMiddle = rect.top + rect.height / 2
        tooltipPositions.value[linkId] = elementMiddle > middleScreen
      }
    })
  }

  // 初始更新和监听滚动事件
  updateTooltipPositions()
  window.addEventListener('scroll', updateTooltipPositions)
  window.addEventListener('resize', updateTooltipPositions)
  
  // 清理事件监听
  onUnmounted(() => {
    window.removeEventListener('scroll', updateTooltipPositions)
    window.removeEventListener('resize', updateTooltipPositions)
  })
})

// 修改判断提示框位置的函数
function isTooltipTop(linkId) {
  return tooltipPositions.value[linkId] ?? false
}

// 注入主题状态
const isDark = inject('isDark')

// 切换主题
function toggleTheme() {
  isDark.value = !isDark.value
}

// 添加访问URL
const showAccessDialog = ref(false)
const accessUrls = ref([])
const newAccessUrl = ref('')

// 监听对话框显示状态
watch(showAccessDialog, async (newVal) => {
  if (newVal) {
    await getAccessUrls() // 当对话框打开时，重新获取URL列表
  }
})

function addAccessUrl() {
  if (newAccessUrl.value.trim()) {
    accessUrls.value.push(newAccessUrl.value.trim())
    newAccessUrl.value = ''
  }
}

function removeAccessUrl(index) {
  accessUrls.value.splice(index, 1)
}

async function saveAccessUrls() {
  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        accessUrls: accessUrls.value
      })
    })
    
    if (response.ok) {
      showNotification('访问限制设置已保存')
      showAccessDialog.value = false
    } else {
      showNotification('保存访问限制设置失败', 'error')
    }
  } catch (error) {
    console.error('保存访问限制设置失败:', error)
    showNotification('保存访问限制设置失败', 'error')
  }
}

async function getAccessUrls() {
  try {
    const response = await fetch('/api/settings', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      accessUrls.value = data.accessUrls || []
    }
  } catch (error) {
    console.error('获取访问限制设置失败:', error)
  }
}

// 添加图标位置计算
const helpIcon = ref(null)
const helpIconPosition = ref({ top: 0, left: 0, bottom: 0 })

// 更新图标位置
function updateHelpIconPosition() {
  if (helpIcon.value) {
    const rect = helpIcon.value.getBoundingClientRect()
    helpIconPosition.value = {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom
    }
  }
}

// 监听窗口大小变化和滚动
onMounted(() => {
  updateHelpIconPosition()
  window.addEventListener('resize', updateHelpIconPosition)
  window.addEventListener('scroll', updateHelpIconPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHelpIconPosition)
  window.removeEventListener('scroll', updateHelpIconPosition)
})

// 添加日期范围更新处理函数
function updateNewLinkDateRange(data) {
  newLink.value = {
    ...newLink.value,
    holidayTag: data?.holidayTag ?? null
  }
}

function updateEditingLinkDateRange(data) {
  editingLink.value = {
    ...editingLink.value,
    holidayTag: data?.holidayTag ?? null
  }
}

// 添加处理函数
function toggleMonthTag(month, target) {
  const tags = target.monthTags || []
  const index = tags.indexOf(month)
  if (index === -1) {
    // 添加标签并排序
    target.monthTags = [...tags, month].sort((a, b) => a - b)
  } else {
    // 移除标签并保持排序
    target.monthTags = tags.filter(m => m !== month).sort((a, b) => a - b)
  }
}

function toggleWeekTag(day, target) {
  const tags = target.weekTags || []
  const index = tags.indexOf(day)
  if (index === -1) {
    // 添加标签并排序
    target.weekTags = [...tags, day].sort((a, b) => a - b)
  } else {
    // 移除标签并保持排序
    target.weekTags = tags.filter(d => d !== day).sort((a, b) => a - b)
  }
}
</script>

<style>
/* 添加一些全局样式 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 美化滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 美化下拉列表 - 基础样式 */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* 多选下拉列表样式 */
select[multiple] {
  background-image: none !important;
  padding-right: 0.75rem;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* 下拉列表选项样式 */
option {
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s;
}

option:last-child {
  border-bottom: none;
}

/* 单选下拉列表选中项样式 */
select:not([multiple]) option:checked {
  background-color: #3b82f6;
  color: white;
}

/* 多选下拉列表选中项样式 */
select[multiple] option:checked {
  background-color: #dbeafe;
  color: #1e40af;
  font-weight: 500;
}

option:hover:not(:checked) {
  background-color: #f3f4f6;
}

/* 统一下拉列表和输入框的高度 */
select:not([multiple]), input[type="date"] {
  height: 2.75rem;
}

/* 美化滚动条 */
select[multiple]::-webkit-scrollbar {
  width: 6px;
}

select[multiple]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

select[multiple]::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

select[multiple]::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 移除 Firefox 的默认下拉箭头 */
@-moz-document url-prefix() {
  select {
    text-indent: -2px;
  }
}

/* 移除 IE 的默认下拉箭头 */
select::-ms-expand {
  display: none;
}

/* 提示框容器样式 */
.relative:hover > div[class*="absolute"] {
  visibility: visible;
  opacity: 1;
}

.relative > div[class*="absolute"] {
  transition: all 0.2s ease-in-out;
}

/* 添加提示框方向过渡效果 */
.relative > div[class*="absolute"].bottom-full {
  transform: translateY(10px);
}

.relative > div[class*="absolute"].top-full {
  transform: translateY(-10px);
}

.relative:hover > div[class*="absolute"].bottom-full {
  transform: translateY(0);
}

.relative:hover > div[class*="absolute"].top-full {
  transform: translateY(0);
}

/* 修改提示框样式 */
.group:hover > div[class*="absolute"] {
  visibility: visible !important;
  opacity: 1 !important;
}

/* 添加提示框方向过渡效果 */
.group > div[class*="absolute"] {
  transition: all 0.2s ease-in-out;
}

.group > div[class*="absolute"].bottom-full {
  transform: translateY(10px);
}

.group > div[class*="absolute"].top-full {
  transform: translateY(-10px);
}

.group:hover > div[class*="absolute"].bottom-full {
  transform: translateY(0);
}

.group:hover > div[class*="absolute"].top-full {
  transform: translateY(0);
}

.listbox-button,
.combobox-input,
.listbox-option,
.combobox-option {
  text-align: center !important;
}

/* 显示模式和链接搜索下拉框的文字居中样式 */
:deep(.listbox-button),
:deep(.combobox-input),
:deep(.listbox-options li),
:deep(.combobox-options li) {
  text-align: center !important;
}
</style>
