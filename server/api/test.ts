import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    await prisma.$connect()
    return {
      status: 'success',
      message: '数据库连接成功！'
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '数据库连接失败：' + (error.message || '未知错误')
    }
  }
}) 