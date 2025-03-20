import { H3Event } from 'h3'
import { users } from './types'

// 更新用户
export default defineEventHandler(async (event: H3Event) => {
  const userId = getRouterParam(event, 'id')
  const userIndex = users.findIndex(u => u.id === parseInt(userId))
  
  if (userIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: '用户不存在'
    })
  }
  
  const body = await readBody(event)
  
  // 更新用户信息
  users[userIndex] = {
    ...users[userIndex],
    ...body
  }
  
  return users[userIndex]
})