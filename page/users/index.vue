<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">用户管理</h1>
    
    <!-- 时间范围选择 -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold mb-4">时间范围</h2>
      <div class="flex space-x-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700">开始时间</label>
          <input 
            v-model="startDate" 
            type="datetime-local"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">结束时间</label>
          <input 
            v-model="endDate" 
            type="datetime-local"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">时间差</label>
          <div class="mt-1 text-lg font-semibold text-indigo-600">
            {{ timeDifference }}
          </div>
        </div>
        <button 
          @click="handleDateChange"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          查询
        </button>
      </div>
    </div>

    <!-- 添加用户表单 -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold mb-4">添加新用户</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">邮箱</label>
          <input 
            v-model="newUser.email" 
            type="email" 
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">用户名</label>
          <input 
            v-model="newUser.name" 
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">密码</label>
          <input 
            v-model="newUser.password" 
            type="password" 
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <button 
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          添加用户
        </button>
      </form>
    </div>

    <!-- 用户列表 -->
    <div class="bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(user.createdAt) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button 
                @click="editUser(user)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                编辑
              </button>
              <button 
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900"
              >
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分页控件 -->
      <div class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-sm text-gray-700">
              每页显示
              <select 
                v-model="pageSize" 
                @change="handlePageSizeChange"
                class="mx-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
              条
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              上一页
            </button>
            <span class="text-sm text-gray-700">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑用户对话框 -->
    <div v-if="showEditDialog" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4">编辑用户</h2>
        <form @submit.prevent="handleUpdate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">邮箱</label>
            <input 
              v-model="editingUser.email" 
              type="email" 
              disabled
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">用户名</label>
            <input 
              v-model="editingUser.name" 
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">新密码 (留空则不修改)</label>
            <input 
              v-model="editingUser.password" 
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              type="button"
              @click="showEditDialog = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// 时间范围相关
const startDate = ref('')
const endDate = ref('')
const timeDifference = computed(() => {
  if (!startDate.value || !endDate.value) return '请选择时间范围'
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const diff = end.getTime() - start.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return `${days}天${hours}小时${minutes}分${seconds}秒`
})

const users = ref<User[]>([])
const showEditDialog = ref(false)
const newUser = ref({
  email: '',
  name: '',
  password: ''
})
const editingUser = ref<User & { password?: string }>({
  id: 0,
  email: '',
  name: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  password: ''
})

// 获取用户列表
const fetchUsers = async () => {
  try {
    console.log('Fetching users...')
    const queryParams = new URLSearchParams({
      page: currentPage.value.toString(),
      pageSize: pageSize.value.toString(),
      startDate: startDate.value,
      endDate: endDate.value
    })
    const response = await fetch(`/api/users?${queryParams}`)
    console.log('Response:', response)
    const result = await response.json()
    console.log('Result:', result)
    if (result.status === 'success') {
      users.value = result.data.users
      totalItems.value = result.data.total
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    alert('获取用户列表失败')
  }
}

// 处理页码变化
const handlePageChange = () => {
  fetchUsers()
}

// 处理每页条数变化
const handlePageSizeChange = () => {
  currentPage.value = 1
  fetchUsers()
}

// 处理时间范围变化
const handleDateChange = () => {
  currentPage.value = 1
  fetchUsers()
}

// 监听页码变化
watch(currentPage, handlePageChange)

// 添加用户
const handleSubmit = async () => {
  try {
    console.log('Submitting new user:', newUser.value)
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser.value)
    })
    console.log('Response:', response)
    const result = await response.json()
    console.log('Result:', result)
    if (result.status === 'success') {
      alert('添加成功')
      newUser.value = { email: '', name: '', password: '' }
      currentPage.value = 1
      await fetchUsers()
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error adding user:', error)
    alert('添加用户失败')
  }
}

// 编辑用户
const editUser = (user: User) => {
  editingUser.value = { ...user, password: '' }
  showEditDialog.value = true
}

// 更新用户
const handleUpdate = async () => {
  try {
    const response = await fetch(`/api/users/${editingUser.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editingUser.value.name,
        password: editingUser.value.password || undefined
      })
    })
    const result = await response.json()
    if (result.status === 'success') {
      alert('更新成功')
      showEditDialog.value = false
      fetchUsers()
    } else {
      alert(result.message)
    }
  } catch (error) {
    alert('更新用户失败')
  }
}

// 删除用户
const deleteUser = async (id: number) => {
  if (!confirm('确定要删除这个用户吗？')) return
  
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
    const result = await response.json()
    if (result.status === 'success') {
      alert('删除成功')
      fetchUsers()
    } else {
      alert(result.message)
    }
  } catch (error) {
    alert('删除用户失败')
  }
}

// 格式化日期
const formatDate = (date: Date) => {
  return new Date(date).toLocaleString()
}

// 页面加载时获取用户列表
onMounted(() => {
  fetchUsers()
})
</script> 