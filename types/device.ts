export interface Device {
  id: number
  deviceName: string
  remarks: string | null
  ctime: string | null
  number: string | null
}

export interface ErrorMsg {
  id: number
  dNo: string | null
  cTime: string | null
  eMsg: string | null
  eNo: string | null
  type: '1' | '2'  // 1: 告警, 2: 错误
}

export interface CreateDeviceDto {
  name: string
  id: string
  status: 'online' | 'offline'
}

export interface UpdateDeviceDto {
  name?: string
  status?: 'online' | 'offline'
}

export interface PaginationParams {
  page: number
  pageSize: number
  search?: string
  type?: '1' | '2'
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message?: string
  error?: any
}

export interface PaginatedData<T> {
  devices: T[]
  total: number
  currentPage: number
  pageSize: number
  totalPages: number
} 