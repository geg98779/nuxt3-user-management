<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-4">欢迎使用设备管理系统</h1>
      <p class="text-gray-600 mb-4">
        这是一个用于管理设备的系统，您可以在这里：
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2">
        <li>查看所有设备列表</li>
        <li>添加新设备</li>
        <li>编辑设备信息</li>
        <li>删除设备</li>
        <li>搜索和筛选设备</li>
      </ul>
      <div class="mt-6">
        <NuxtLink
          to="/devices"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          进入设备管理
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 