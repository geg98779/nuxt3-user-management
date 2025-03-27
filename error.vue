<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ error.statusCode }}
        </h1>
        <p class="text-gray-600 mb-6">
          {{ error.message }}
        </p>
        <button
          @click="handleError"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script> 