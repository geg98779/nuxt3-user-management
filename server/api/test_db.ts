import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    await prisma.$connect()
    
    // 获取数据库连接信息
    const dbInfo = await prisma.$queryRaw`SELECT DATABASE() as db_name`
    
    // 尝试插入一条测试数据
    const now = new Date()
    const testEmail = `test${Date.now()}@test.com` // 使用时间戳生成唯一的邮箱
    await prisma.$executeRaw`
      INSERT INTO User (email, name, password, createdAt, updatedAt)
      VALUES (${testEmail}, 'Test User', 'test123', ${now}, ${now})
    `
    
    // 查询所有用户
    const users = await prisma.$queryRaw`
      SELECT * FROM User
    `
    
    return {
      status: 'success',
      message: '数据库连接和操作测试成功',
      dbInfo,
      data: users
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '数据库测试失败：' + (error.message || '未知错误')
    }
  }
}) 