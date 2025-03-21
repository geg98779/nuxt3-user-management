<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">欢迎使用 Nuxt 3 用户管理系统</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 用户管理卡片 -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">用户管理</h2>
        <p class="text-gray-600 mb-4">
          管理系统用户，包括添加、编辑、删除用户等功能。
        </p>
        <NuxtLink 
          to="/users"
          class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          进入用户管理
        </NuxtLink>
      </div>

      <!-- 系统信息卡片 -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">系统信息</h2>
        <div class="space-y-2 text-gray-600">
          <p>框架：Nuxt 3</p>
          <p>数据库：MySQL</p>
          <p>ORM：Prisma</p>
          <p>UI：Tailwind CSS</p>
        </div>
      </div>

      <!-- 功能特点卡片 -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">功能特点</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>用户 CRUD 操作</li>
          <li>分页显示</li>
          <li>时间范围查询</li>
          <li>响应式设计</li>
          <li>数据验证</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: 'Nuxt 3 用户管理系统',
  meta: [
    { name: 'description', content: '基于 Nuxt 3 的用户管理系统' }
  ]
})
</script> 