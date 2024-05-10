<template>
  <TheHeader />
  <main class="bg-gray-100 flex-grow">
    <RouterView />
  </main>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
</script>
