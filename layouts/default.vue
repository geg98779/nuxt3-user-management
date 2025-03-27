<template>
  <div class="flex min-h-screen">
    <Navigation />
    <main class="flex-1 transition-all duration-300" :class="[isCollapsed ? 'ml-16' : 'ml-64']">
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

const isCollapsed = ref(false)
provide('isCollapsed', isCollapsed)
</script> 