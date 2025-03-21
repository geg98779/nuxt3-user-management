import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    // 验证用户ID
    if (!id) {
      return {
        status: 'error',
        message: '用户ID为必填项'
      }
    }

    // 查询用户信息
    const users = await prisma.$queryRaw<User[]>`
      SELECT id, email, name, createdAt, updatedAt 
      FROM User 
      WHERE id = ${id}
    `

    if (!users || users.length === 0) {
      return {
        status: 'error',
        message: '用户不存在'
      }
    }

    return {
      status: 'success',
      data: users[0]
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '获取用户信息失败：' + (error.message || '未知错误')
    }
  }
})