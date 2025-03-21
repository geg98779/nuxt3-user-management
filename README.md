# Nuxt 3 前后端联通 Demo

这是一个使用 Nuxt 3 框架开发的前后端联通的示例项目，包含用户管理功能。

## 功能特点

- 用户列表展示
- 用户添加
- 用户编辑
- 用户删除
- 分页功能
- 时间范围筛选

## 技术栈

- Nuxt 3
- TypeScript
- Prisma ORM
- MySQL
- Tailwind CSS

## 项目设置

1. 克隆项目
```bash
git clone [你的仓库地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
```
然后编辑 `.env` 文件，填入你的数据库连接信息。

4. 初始化数据库
```bash
npx prisma generate
npx prisma db push
```

5. 启动开发服务器
```bash
npm run dev
```

## 数据库设计

### User 表
- id: 用户ID
- email: 用户邮箱
- name: 用户名称
- password: 用户密码
- createdAt: 创建时间
- updatedAt: 更新时间

## API 接口

### 用户管理
- GET /api/users - 获取用户列表
- POST /api/users - 创建新用户
- GET /api/users/:id - 获取单个用户信息
- PUT /api/users/:id - 更新用户信息
- DELETE /api/users/:id - 删除用户
