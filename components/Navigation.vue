<template>
  <nav 
    class="fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 z-50"
    :class="[isCollapsed ? 'w-16' : 'w-64']"
  >
    <div class="p-4">
      <div class="flex items-center justify-between mb-8">
        <NuxtLink to="/" class="text-xl font-bold" :class="{ 'hidden': isCollapsed }">
          设备管理系统
        </NuxtLink>
        <button 
          @click="toggleCollapse"
          class="p-2 rounded-lg hover:bg-gray-700"
        >
          <svg 
            v-if="!isCollapsed"
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <svg 
            v-else
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="space-y-2">
        <NuxtLink
          to="/"
          class="flex items-center px-4 py-2 rounded-lg transition-colors"
          :class="[
            $route.path === '/'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span :class="{ 'hidden': isCollapsed }" class="ml-3">首页</span>
        </NuxtLink>
        <NuxtLink
          to="/devices"
          class="flex items-center px-4 py-2 rounded-lg transition-colors"
          :class="[
            $route.path.startsWith('/devices')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span :class="{ 'hidden': isCollapsed }" class="ml-3">设备管理</span>
        </NuxtLink>
        <NuxtLink
          to="/errors"
          class="flex items-center px-4 py-2 rounded-lg transition-colors"
          :class="[
            $route.path.startsWith('/errors')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span :class="{ 'hidden': isCollapsed }" class="ml-3">错误信息</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          class="flex items-center px-4 py-2 rounded-lg transition-colors"
          :class="[
            $route.path.startsWith('/dashboard')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span :class="{ 'hidden': isCollapsed }" class="ml-3">数据大屏</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const isCollapsed = inject('isCollapsed', ref(false))

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script> 