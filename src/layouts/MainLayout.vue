<template>
  <TheHeader />
  <main class="flex-grow">
    <RouterView />
  </main>
  <TheFooter v-if="!route.meta.hideFooter" />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
