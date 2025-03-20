import { H3Event } from 'h3'
import { users } from './types'

// 获取用户列表
export default defineEventHandler(async (event: H3Event) => {
  return users
})