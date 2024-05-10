<template>
  <footer>
    <div class="container">
      <nav class="flex items-center justify-between border-b-2 border-b-gray-600 pb-10 mb-10">
        <router-link to="/" class="text-lg font-bold hover-underline">Community</router-link>
        <router-link to="/" class="text-lg font-bold hover-underline">Company</router-link>
        <router-link to="/" class="flex items-center mr-16">
          <img src="@/assets/img/logo.png" alt="logo" />
          <h1 class="text-3xl mb-0 ml-2">korshi</h1>
        </router-link>
        <router-link to="/" class="text-lg font-bold hover-underline">Helpdesk</router-link>
        <router-link to="/" class="text-lg font-bold hover-underline">Blog</router-link>
      </nav>
      <ul class="flex justify-center items-center gap-5">
        <li
          v-for="item in socials"
          :key="item.href"
          class="transition ease-in-out duration-200 hover:-translate-y-1"
        >
          <a :href="item.href" target="_blank">
            <img :src="item.src" :alt="item.title" class="w-[40px]" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { socials } from '@/constants/index.js';
</script>

<style lang="scss" scoped></style>
