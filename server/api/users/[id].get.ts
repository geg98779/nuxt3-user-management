import { H3Event } from 'h3'
import { users } from './types'

// 获取单个用户
export default defineEventHandler(async (event: H3Event) => {
  const userId = getRouterParam(event, 'id')
  const user = users.find(u => u.id === parseInt(userId))
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: '用户不存在'
    })
  }
  
  return user
})