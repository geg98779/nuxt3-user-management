import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 删除用户
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
    await prisma.$transaction(async (tx) => {
      // 删除用户
      await tx.$executeRaw`
        DELETE FROM User WHERE id = ${id}
      `
    })
    
    return {
      status: 'success',
      message: '删除成功'
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '删除失败：' + (error.message || '未知错误')
    }
  }
})