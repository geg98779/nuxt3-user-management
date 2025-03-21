import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

// 创建新用户
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, name, password } = body

    // 验证必填字段
    if (!email || !password) {
      return {
        status: 'error',
        message: '邮箱和密码为必填项'
      }
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.$queryRaw`
      SELECT id FROM User WHERE email = ${email}
    `

    if (existingUser && (existingUser as any[]).length > 0) {
      return {
        status: 'error',
        message: '该邮箱已被注册'
      }
    }

    // 开始事务
    const result = await prisma.$transaction(async (tx) => {
      // 创建新用户
      const now = new Date()
      await tx.$executeRaw`
        INSERT INTO User (email, name, password, createdAt, updatedAt)
        VALUES (${email}, ${name}, ${password}, ${now}, ${now})
      `

      // 获取新创建的用户
      const newUser = await tx.$queryRaw<User[]>`
        SELECT id, email, name, createdAt, updatedAt 
        FROM User 
        WHERE email = ${email}
      `

      return newUser
    })

    return {
      status: 'success',
      message: '用户创建成功',
      data: result[0]
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '创建用户失败：' + (error.message || '未知错误')
    }
  }
})