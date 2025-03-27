<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ isEdit ? '编辑设备' : '添加设备' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">设备名称</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">设备ID</label>
          <input
            v-model="form.id"
            type="text"
            required
            :disabled="isEdit"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">状态</label>
          <select
            v-model="form.status"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="online">在线</option>
            <option value="offline">离线</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {{ isEdit ? '保存' : '添加' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Device, CreateDeviceDto } from '~/types/device'

interface Props {
  isOpen: boolean
  isEdit: boolean
  device: Device | {}
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: CreateDeviceDto): void
}>()

const form = ref<CreateDeviceDto>({
  name: '',
  id: '',
  status: 'offline'
})

watch(() => props.device, (newDevice) => {
  if (newDevice && Object.keys(newDevice).length > 0) {
    form.value = { ...newDevice as Device }
  }
}, { immediate: true })

const close = () => {
  form.value = {
    name: '',
    id: '',
    status: 'offline'
  }
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  close()
}
</script> 