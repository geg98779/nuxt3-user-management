import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // 清空现有数据
    await prisma.$executeRaw`TRUNCATE TABLE t_device`
    await prisma.$executeRaw`TRUNCATE TABLE t_error_msg`

    // 插入设备数据
    const devices = [
      { deviceName: '测试设备1', number: 'DEV001', remarks: '这是测试设备1的备注' },
      { deviceName: '测试设备2', number: 'DEV002', remarks: '这是测试设备2的备注' },
      { deviceName: '测试设备3', number: 'DEV003', remarks: '这是测试设备3的备注' },
      { deviceName: '测试设备4', number: 'DEV004', remarks: '这是测试设备4的备注' },
      { deviceName: '测试设备5', number: 'DEV005', remarks: '这是测试设备5的备注' },
      { deviceName: '测试设备6', number: 'DEV006', remarks: '这是测试设备6的备注' },
      { deviceName: '测试设备7', number: 'DEV007', remarks: '这是测试设备7的备注' },
      { deviceName: '测试设备8', number: 'DEV008', remarks: '这是测试设备8的备注' },
      { deviceName: '测试设备9', number: 'DEV009', remarks: '这是测试设备9的备注' },
      { deviceName: '测试设备10', number: 'DEV010', remarks: '这是测试设备10的备注' }
    ]

    for (const device of devices) {
      await prisma.device.create({
        data: {
          ...device,
          ctime: new Date()
        }
      })
    }

    // 插入错误消息数据
    const errorMsgs = [
      { dNo: 'DEV001', eMsg: '设备温度过高', eNo: 'ERR001', type: '1' },
      { dNo: 'DEV001', eMsg: '设备连接断开', eNo: 'ERR002', type: '2' },
      { dNo: 'DEV002', eMsg: '设备压力异常', eNo: 'ERR003', type: '1' },
      { dNo: 'DEV002', eMsg: '设备响应超时', eNo: 'ERR004', type: '2' },
      { dNo: 'DEV003', eMsg: '设备电量不足', eNo: 'ERR005', type: '1' },
      { dNo: 'DEV003', eMsg: '设备通信失败', eNo: 'ERR006', type: '2' },
      { dNo: 'DEV004', eMsg: '设备离线', eNo: 'ERR007', type: '2' },
      { dNo: 'DEV005', eMsg: '设备参数异常', eNo: 'ERR008', type: '1' },
      { dNo: 'DEV006', eMsg: '设备重启', eNo: 'ERR009', type: '2' },
      { dNo: 'DEV007', eMsg: '设备过载', eNo: 'ERR010', type: '1' }
    ]

    for (const errorMsg of errorMsgs) {
      await prisma.errorMsg.create({
        data: {
          ...errorMsg,
          cTime: new Date()
        }
      })
    }

    console.log('数据初始化成功')
  } catch (error) {
    console.error('数据初始化失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 