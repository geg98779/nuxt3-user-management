import { defineEventHandler, getQuery } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const search = query.search as string
    const type = query.type as '1' | '2'

    // 构建查询条件
    const where: any = {}
    if (search) {
      where.OR = [
        { dNo: { contains: search } },
        { eMsg: { contains: search } },
        { eNo: { contains: search } }
      ]
    }
    if (type) {
      where.type = type
    }

    // 获取总数
    const total = await prisma.errorMsg.count({ where })

    // 获取分页数据
    const items = await prisma.errorMsg.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        cTime: 'desc'
      }
    })

    return {
      status: 'success',
      data: {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    }
  } catch (error) {
    console.error('获取错误信息列表失败:', error)
    return {
      status: 'error',
      message: '获取错误信息列表失败'
    }
  }
}) 