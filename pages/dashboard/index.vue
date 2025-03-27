<template>
  <div class="min-h-screen bg-gray-900 text-white p-4">
    <div class="container mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold">设备监控大屏</h1>
        <p class="text-gray-400 mt-2">实时监控设备状态和错误信息</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-2">设备总数</h3>
          <p class="text-3xl font-bold text-blue-400">{{ stats.totalDevices }}</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-2">告警数量</h3>
          <p class="text-3xl font-bold text-yellow-400">{{ stats.totalAlerts }}</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-2">错误数量</h3>
          <p class="text-3xl font-bold text-red-400">{{ stats.totalErrors }}</p>
        </div>
      </div>

      <!-- 错误信息列表 -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">最新错误信息</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="text-left border-b border-gray-700">
                <th class="pb-3">时间</th>
                <th class="pb-3">设备编号</th>
                <th class="pb-3">错误编号</th>
                <th class="pb-3">错误信息</th>
                <th class="pb-3">类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="error in errorMsgs" :key="error.id" class="border-b border-gray-700">
                <td class="py-3">{{ error.cTime }}</td>
                <td class="py-3">{{ error.dNo }}</td>
                <td class="py-3">{{ error.eNo }}</td>
                <td class="py-3">{{ error.eMsg }}</td>
                <td class="py-3">
                  <span :class="[
                    error.type === '1' ? 'text-yellow-400' : 'text-red-400',
                    'px-2 py-1 rounded-full text-sm'
                  ]">
                    {{ error.type === '1' ? '告警' : '错误' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ErrorMsg } from '~/types/device'
import { deviceApi } from '~/api/device'

definePageMeta({
  layout: 'default'
})

const stats = ref({
  totalDevices: 0,
  totalAlerts: 0,
  totalErrors: 0
})

const errorMsgs = ref<ErrorMsg[]>([])

// 获取统计数据
const fetchStats = async () => {
  try {
    const [devicesResponse, alertsResponse, errorsResponse] = await Promise.all([
      deviceApi.getDevices({ page: 1, pageSize: 1 }),
      deviceApi.getErrorMsgs({ page: 1, pageSize: 1, type: '1' }),
      deviceApi.getErrorMsgs({ page: 1, pageSize: 1, type: '2' })
    ])

    stats.value = {
      totalDevices: devicesResponse.data.total,
      totalAlerts: alertsResponse.data.total,
      totalErrors: errorsResponse.data.total
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

// 获取错误信息
const fetchErrorMsgs = async () => {
  try {
    const response = await deviceApi.getErrorMsgs({
      page: 1,
      pageSize: 10,
      type: '2' // 只获取错误类型
    })
    errorMsgs.value = response.data.items
  } catch (error) {
    console.error('获取错误信息失败:', error)
  }
}

// 定时刷新数据
let refreshInterval: NodeJS.Timeout

onMounted(() => {
  fetchStats()
  fetchErrorMsgs()
  
  // 每30秒刷新一次数据
  refreshInterval = setInterval(() => {
    fetchStats()
    fetchErrorMsgs()
  }, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script> 