import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

// 更新用户
export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { name, password } = body

    // 验证用户ID
    if (!id) {
      return {
        status: 'error',
        message: '用户ID为必填项'
      }
    }

    // 检查用户是否存在
    const existingUser = await prisma.$queryRaw`
      SELECT id FROM User WHERE id = ${id}
    `

    if (!existingUser || (existingUser as any[]).length === 0) {
      return {
        status: 'error',
        message: '用户不存在'
      }
    }

    // 开始事务
    const result = await prisma.$transaction(async (tx) => {
      // 更新用户信息
      const now = new Date()
      if (password) {
        // 如果提供了密码，更新密码
        await tx.$executeRaw`
          UPDATE User 
          SET name = ${name}, password = ${password}, updatedAt = ${now}
          WHERE id = ${id}
        `
      } else {
        // 如果没有提供密码，只更新名字
        await tx.$executeRaw`
          UPDATE User 
          SET name = ${name}, updatedAt = ${now}
          WHERE id = ${id}
        `
      }

      // 获取更新后的用户信息
      const updatedUser = await tx.$queryRaw<User[]>`
        SELECT id, email, name, createdAt, updatedAt 
        FROM User 
        WHERE id = ${id}
      `

      return updatedUser
    })

    return {
      status: 'success',
      message: '更新成功',
      data: result[0]
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '更新失败：' + (error.message || '未知错误')
    }
  }
})