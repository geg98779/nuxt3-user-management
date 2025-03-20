<template>
  <div>
    <NuxtPage ></NuxtPage>
  </div>
</template>

<script setup lang="ts">
const app  = 20;
onMounted(async() => {
  console.log('20')
  await useFetch('/api/hello')
})
</script>

<style>
@import "tailwindcss";
</style>
