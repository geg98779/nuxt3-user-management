import { defineEventHandler, getQuery } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    console.log('开始处理设备查询请求')
    
    const query = getQuery(event)
    console.log('原始查询参数:', query)
    
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const search = query.search as string

    console.log('解析后的查询参数:', { page, pageSize, search })

    // 构建查询条件
    const where = search
      ? {
          OR: [
            { deviceName: { contains: search } },
            { number: { contains: search } },
            { remarks: { contains: search } }
          ]
        }
      : {}

    console.log('构建的查询条件:', where)

    // 测试数据库连接
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('数据库连接正常')
    } catch (dbError) {
      console.error('数据库连接失败:', dbError)
      throw new Error('数据库连接失败')
    }

    // 获取总数
    const total = await prisma.device.count({ where })
    console.log('查询到的总数:', total)

    // 获取分页数据
    const items = await prisma.device.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        ctime: 'desc'
      }
    })

    console.log('查询到的设备列表:', items)

    const response = {
      status: 'success',
      data: {
        devices: items,
        total,
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    }

    console.log('返回的响应:', response)
    return response
  } catch (error) {
    console.error('获取设备列表失败:', error)
    // 返回更详细的错误信息
    const errorResponse = {
      status: 'error',
      message: error instanceof Error ? error.message : '获取设备列表失败',
      error: error
    }
    console.error('错误响应:', errorResponse)
    return errorResponse
  } finally {
    console.log('设备查询请求处理完成')
  }
}) 