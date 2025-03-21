import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // 先删除表（如果存在）
    await prisma.$executeRaw`DROP TABLE IF EXISTS User`
    
    // 创建用户表
    await prisma.$executeRaw`
      CREATE TABLE User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        name VARCHAR(191),
        password VARCHAR(191) NOT NULL,
        createdAt DATETIME,
        updatedAt DATETIME
      )
    `
    
    return {
      status: 'success',
      message: '用户表创建成功！'
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: '创建表失败：' + (error.message || '未知错误')
    }
  }
}) 