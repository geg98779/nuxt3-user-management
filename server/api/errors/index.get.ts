import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const type = query.type as string || ''
    const startDate = query.startDate ? new Date(query.startDate as string) : null
    const endDate = query.endDate ? new Date(query.endDate as string) : null
    const search = query.search as string || ''

    // 构建查询条件
    const where: any = {
      OR: [
        { dNo: { contains: search } },
        { eMsg: { contains: search } },
        { eNo: { contains: search } }
      ]
    }

    if (type) {
      where.type = type
    }

    if (startDate && endDate) {
      where.cTime = {
        gte: startDate,
        lte: endDate
      }
    }

    // 获取总数
    const total = await prisma.errorMsg.count({ where })

    // 获取分页数据
    const errors = await prisma.errorMsg.findMany({
      where,
      orderBy: { cTime: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return {
      status: 'success',
      data: {
        errors,
        total,
        page,
        pageSize
      }
    }
  } catch (error: any) {
    console.error('Error fetching errors:', error)
    return {
      status: 'error',
      message: '获取错误消息列表失败：' + (error.message || '未知错误')
    }
  }
}) 