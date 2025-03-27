import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const startDate = query.startDate ? new Date(query.startDate as string) : undefined
  const endDate = query.endDate ? new Date(query.endDate as string) : undefined

  try {
    const errors = await prisma.errorMsg.findMany({
      where: {
        cTime: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    return {
      status: 'success',
      data: errors
    }
  } catch (error) {
    console.error('Error fetching errors:', error)
    return {
      status: 'error',
      message: '获取错误信息失败'
    }
  }
})