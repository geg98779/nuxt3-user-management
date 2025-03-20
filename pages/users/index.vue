<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">用户管理</h1>
    
    <!-- 添加用户按钮 -->
    <button
      @click="showAddUserModal = true"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      添加用户
    </button>

    <!-- 用户列表 -->
    <div class="bg-white shadow rounded-lg">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-6 py-3 text-left">ID</th>
            <th class="px-6 py-3 text-left">用户名</th>
            <th class="px-6 py-3 text-left">邮箱</th>
            <th class="px-6 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-t">
            <td class="px-6 py-4">{{ user.id }}</td>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">
              <button
                @click="editUser(user)"
                class="text-blue-500 hover:text-blue-700 mr-2"
              >
                编辑
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑用户模态框 -->
    <div v-if="showAddUserModal || showEditUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ showEditUserModal ? '编辑用户' : '添加用户' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">用户名</label>
            <input
              v-model="userForm.username"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">邮箱</label>
            <input
              v-model="userForm.email"
              type="email"
              class="w-full px-3 py-2 border rounded"
              required
            >
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  username: string
  email: string
}

interface UserForm {
  username: string
  email: string
}

// 状态管理
const users = ref<User[]>([])
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const userForm = ref<UserForm>({ username: '', email: '' })
const editingUserId = ref<number | null>(null)

// 获取用户列表
const fetchUsers = async () => {
const { data: usersData, error: usersError } = await useFetch('/api/users')
if (usersError.value) {
  console.error('获取用户列表失败:', usersError.value)
}
users.value = usersData.value as User[]
}
fetchUsers()
// 添加用户
async function addUser(userData: UserForm) {
  const { error } = await useFetch('/api/users', {
    method: 'POST',
    body: userData
  })
  if (error.value) {
    console.error('添加用户失败:', error.value)
    return
  }
  await fetchUsers()
  closeModal()
}

// 编辑用户
function editUser(user: User) {
  editingUserId.value = user.id
  userForm.value = {
    username: user.username,
    email: user.email
  }
  showEditUserModal.value = true
}

// 更新用户
async function updateUser(userId: number, userData: UserForm) {
  const { error } = await useFetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: userData
  })
  if (error.value) {
    console.error('更新用户失败:', error.value)
    return
  }
  await fetchUsers()
  closeModal()
}

// 删除用户
async function deleteUser(userId: number) {
  if (!confirm('确定要删除这个用户吗？')) return
  
  const { error } = await useFetch(`/api/users/${userId}`, {
    method: 'DELETE'
  })
  if (error.value) {
    console.error('删除用户失败:', error.value)
    return
  }
  await fetchUsers()
}

// 表单提交处理
async function handleSubmit() {
  if (showEditUserModal.value && editingUserId.value) {
    await updateUser(editingUserId.value, userForm.value)
  } else {
    await addUser(userForm.value)
  }
}

// 关闭模态框
function closeModal() {
  showAddUserModal.value = false
  showEditUserModal.value = false
  userForm.value = { username: '', email: '' }
  editingUserId.value = null
}

// 初始化加载
// onMounted(async() => {
//     const { data, error } = await useFetch('/api/users')
//   if (error.value) {
//     console.error('获取用户列表失败:', error.value)
//     return
//   }
//   users.value = data.value as User[]
// })
</script>