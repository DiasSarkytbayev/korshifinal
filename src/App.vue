<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const LAYOUTS = {
  MainLayout,
  AuthLayout,
};

const route = useRoute();

const layout = computed(() => LAYOUTS[route.meta.layout] ?? MainLayout);
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
