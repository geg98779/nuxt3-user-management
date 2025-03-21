import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

// 获取用户列表
export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)
    console.log('Query params:', query)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const startDate = query.startDate ? new Date(query.startDate as string) : null
    const endDate = query.endDate ? new Date(query.endDate as string) : null

    console.log('Parsed params:', { page, pageSize, startDate, endDate })

    let users: User[] = []
    let totalResult: { total: bigint }[] = []

    if (startDate && endDate) {
      // 有时间范围条件的查询
      totalResult = await prisma.$queryRaw`
        SELECT COUNT(*) as total 
        FROM User 
        WHERE createdAt BETWEEN ${startDate} AND ${endDate}
      `

      users = await prisma.$queryRaw`
        SELECT id, email, name, createdAt, updatedAt 
        FROM User 
        WHERE createdAt BETWEEN ${startDate} AND ${endDate}
        ORDER BY id ASC
        LIMIT ${(page - 1) * pageSize}, ${pageSize}
      `
    } else {
      // 无时间范围条件的查询
      totalResult = await prisma.$queryRaw`
        SELECT COUNT(*) as total 
        FROM User
      `

      users = await prisma.$queryRaw`
        SELECT id, email, name, createdAt, updatedAt 
        FROM User 
        ORDER BY id ASC
        LIMIT ${(page - 1) * pageSize}, ${pageSize}
      `
    }

    console.log('Query results:', { users, totalResult })
    
    const response = {
      status: 'success',
      data: {
        users,
        total: Number(totalResult[0].total),
        page,
        pageSize
      }
    }

    console.log('Response:', response)
    return response
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return {
      status: 'error',
      message: '获取用户列表失败：' + (error.message || '未知错误')
    }
  }
})