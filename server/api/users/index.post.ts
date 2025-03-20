import { H3Event } from 'h3'
import { users } from './types'

// 创建新用户
export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  
  // 创建新用户对象
  const newUser = {
    id: users.length + 1,
    username: body.username,
    email: body.email
  }
  
  // 添加到用户列表
  users.push(newUser)
  
  return newUser
})