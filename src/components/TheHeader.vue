<template>
  <header class="border-b-2">
    <div class="container p-5 xl:px-0 flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/" class="flex items-center mr-16">
          <img src="@/assets/img/logo.png" alt="logo" />
          <h1 class="text-3xl mb-0 ml-2">korshi</h1>
        </router-link>
        <nav>
          <ul class="flex items-center gap-7 mb-0 text-lg">
            <li>
              <RouterLink to="/map" class="text-blue-400 hover-underline">Map</RouterLink>
            </li>
            <li>
              <RouterLink to="/catalog" class="text-blue-400 hover-underline">To rent</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <HeaderAccount class="justify-self-end" />
    </div>
  </header>
</template>

<script setup>
import HeaderAccount from '@/components/HeaderAccount.vue';
</script>

<style lang="scss" scoped></style>
