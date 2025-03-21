import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空现有数据
  await prisma.$executeRaw`TRUNCATE TABLE User`

  // 创建测试用户
  const testUsers = [
    {
      email: 'test1@example.com',
      name: '测试用户1',
      password: 'password123' // 使用明文密码，实际项目中应该使用加密
    },
    {
      email: 'test2@example.com',
      name: '测试用户2',
      password: 'password123'
    },
    {
      email: 'test3@example.com',
      name: '测试用户3',
      password: 'password123'
    }
  ]

  for (const user of testUsers) {
    await prisma.$executeRaw`
      INSERT INTO User (email, name, password, createdAt, updatedAt)
      VALUES (${user.email}, ${user.name}, ${user.password}, NOW(), NOW())
    `
  }

  console.log('测试数据已添加')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 