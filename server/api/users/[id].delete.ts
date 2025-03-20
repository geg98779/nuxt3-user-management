import { H3Event } from 'h3'
import { users } from './types'

// 删除用户
export default defineEventHandler(async (event: H3Event) => {
  const userId = getRouterParam(event, 'id')
  const userIndex = users.findIndex(u => u.id === parseInt(userId))
  
  if (userIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: '用户不存在'
    })
  }
  
  // 删除用户并返回被删除的用户信息
  const deletedUser = users[userIndex]
  users.splice(userIndex, 1)
  
  return deletedUser
})