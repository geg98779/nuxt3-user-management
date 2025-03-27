import type { Device, ErrorMsg, PaginationParams, ApiResponse, PaginatedData } from '~/types/device'

const API_BASE_URL = '/api'
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1秒

async function fetchWithRetry(url: string, options: any, retries = MAX_RETRIES): Promise<any> {
  try {
    const response = await $fetch(url, options)
    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`请求失败，${retries}秒后重试...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

export const deviceApi = {
  // 获取设备列表（分页）
  async getDevices(params: PaginationParams): Promise<ApiResponse<PaginatedData<Device>>> {
    try {
      console.log('开始获取设备列表:', params)
      const response = await fetchWithRetry(`${API_BASE_URL}/devices`, {
        method: 'GET',
        params: {
          page: params.page,
          pageSize: params.pageSize,
          search: params.search
        }
      })
      console.log('设备列表获取成功:', response)
      return response
    } catch (error) {
      console.error('获取设备列表失败:', error)
      throw error
    }
  },

  // 获取错误消息列表（分页）
  async getErrorMsgs(params: PaginationParams): Promise<ApiResponse<PaginatedData<ErrorMsg>>> {
    try {
      console.log('开始获取错误消息列表:', params)
      const response = await fetchWithRetry(`${API_BASE_URL}/error-msgs`, {
        method: 'GET',
        params: {
          page: params.page,
          pageSize: params.pageSize,
          search: params.search,
          type: params.type
        }
      })
      console.log('错误消息列表获取成功:', response)
      return response
    } catch (error) {
      console.error('获取错误消息列表失败:', error)
      throw error
    }
  },

  // 根据设备编号获取设备信息
  async getDeviceByNumber(number: string): Promise<ApiResponse<Device>> {
    try {
      console.log('开始获取设备信息:', number)
      const response = await fetchWithRetry(`${API_BASE_URL}/devices/${number}`, {
        method: 'GET'
      })
      console.log('设备信息获取成功:', response)
      return response
    } catch (error) {
      console.error('获取设备信息失败:', error)
      throw error
    }
  }
} 