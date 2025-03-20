// 用户类型定义
export interface User {
  id: number
  username: string
  email: string
}

// 模拟数据库
export let users: User[] = [
  { id: 1, username: '张三', email: 'zhangsan@example.com' },
  { id: 2, username: '李四', email: 'lisi@example.com' }
]