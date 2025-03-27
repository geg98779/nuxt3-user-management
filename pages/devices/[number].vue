<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow p-6">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <NuxtLink
          to="/devices"
          class="inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回设备列表
        </NuxtLink>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {{ error }}
      </div>

      <!-- 设备详情 -->
      <div v-else>
        <h1 class="text-2xl font-bold mb-6">设备详情</h1>

        <!-- 基本信息 -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold mb-4">基本信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex">
              <span class="w-24 text-gray-600">设备名称：</span>
              <span class="text-gray-900">{{ device?.deviceName }}</span>
            </div>
            <div class="flex">
              <span class="w-24 text-gray-600">设备编号：</span>
              <span class="text-gray-900">{{ device?.number }}</span>
            </div>
            <div class="flex">
              <span class="w-24 text-gray-600">备注：</span>
              <span class="text-gray-900">{{ device?.remarks || '无' }}</span>
            </div>
            <div class="flex">
              <span class="w-24 text-gray-600">创建时间：</span>
              <span class="text-gray-900">{{ device?.ctime }}</span>
            </div>
          </div>
        </div>

        <!-- 数据统计图表 -->
        <DeviceChart :error-msgs="errorMsgs" class="mb-8" />

        <!-- 错误消息列表 -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">错误消息</h2>
            <div class="flex space-x-2">
              <button
                v-for="type in ['1', '2']"
                :key="type"
                @click="handleTypeChange(type)"
                :class="[
                  'px-3 py-1 rounded-md text-sm font-medium',
                  currentType === type
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                ]"
              >
                {{ type === '1' ? '告警' : '错误' }}
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消息</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误编号</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="msg in errorMsgs" :key="msg.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ msg.cTime }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {{ msg.eMsg }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ msg.eNo }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 错误消息分页 -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="handleErrorPageChange(currentErrorPage - 1)"
                :disabled="currentErrorPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                上一页
              </button>
              <button
                @click="handleErrorPageChange(currentErrorPage + 1)"
                :disabled="currentErrorPage === totalErrorPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  显示第
                  <span class="font-medium">{{ (currentErrorPage - 1) * errorPageSize + 1 }}</span>
                  到
                  <span class="font-medium">{{ Math.min(currentErrorPage * errorPageSize, totalErrors) }}</span>
                  条，共
                  <span class="font-medium">{{ totalErrors }}</span>
                  条记录
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="handleErrorPageChange(currentErrorPage - 1)"
                    :disabled="currentErrorPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">上一页</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button
                    v-for="page in displayedErrorPages"
                    :key="page"
                    @click="handleErrorPageChange(page)"
                    :class="[
                      page === currentErrorPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="handleErrorPageChange(currentErrorPage + 1)"
                    :disabled="currentErrorPage === totalErrorPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">下一页</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Device, ErrorMsg, PaginationParams } from '~/types/device'
import { deviceApi } from '~/api/device'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const device = ref<Device | null>(null)
const errorMsgs = ref<ErrorMsg[]>([])
const loading = ref(false)
const error = ref('')

// 错误消息分页相关
const currentErrorPage = ref(1)
const errorPageSize = ref(10)
const totalErrors = ref(0)
const totalErrorPages = ref(1)
const currentType = ref<'1' | '2'>('1')

// 计算显示的页码
const displayedErrorPages = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = 5
  let start = Math.max(1, currentErrorPage.value - Math.floor(maxVisiblePages / 2))
  let end = Math.min(totalErrorPages.value, start + maxVisiblePages - 1)
  
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 获取设备详情
const fetchDevice = async () => {
  loading.value = true
  error.value = ''
  try {
    const number = route.params.number as string
    device.value = await deviceApi.getDeviceByNumber(number)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取设备详情失败'
  } finally {
    loading.value = false
  }
}

// 获取错误消息列表
const fetchErrorMsgs = async () => {
  loading.value = true
  error.value = ''
  try {
    const number = route.params.number as string
    const params: PaginationParams = {
      page: currentErrorPage.value,
      pageSize: errorPageSize.value,
      type: currentType.value,
      search: number
    }
    const response = await deviceApi.getErrorMsgs(params)
    errorMsgs.value = response.items
    totalErrors.value = response.total
    totalErrorPages.value = response.totalPages
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取错误消息失败'
  } finally {
    loading.value = false
  }
}

// 处理错误消息类型变化
const handleTypeChange = (type: '1' | '2') => {
  currentType.value = type
  currentErrorPage.value = 1
  fetchErrorMsgs()
}

// 处理错误消息页码变化
const handleErrorPageChange = (page: number) => {
  if (page >= 1 && page <= totalErrorPages.value) {
    currentErrorPage.value = page
    fetchErrorMsgs()
  }
}

onMounted(() => {
  fetchDevice()
  fetchErrorMsgs()
})
</script> 