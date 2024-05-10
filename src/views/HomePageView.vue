<template>
  <section class="homepage bg-white">
    <div class="mb-20">
      <img
        src="@/assets/img/home/hero-banner.jpg"
        alt="hero banner"
        class="homepage__hero w-full mt-[-10px]"
      />
    </div>
    <div class="container grid grid-cols-12 gap-10 pb-24">
      <div class="col-span-6">
        <img src="@/assets/img/home/image%203.jpg" alt="apartment image" class="w-full" />
      </div>
      <div class="col-span-6 flex flex-col justify-center">
        <h2 class="text-2xl">About us</h2>
        <p class="text-lg">
          Korshi addresses the complexities of urban living by creating multifunctional shared
          spaces that promote both privacy and community. We transform bustling city environments
          into serene yet social habitats, balancing solitude with connectivity. Join our mission to
          enhance urban lifestyles, making city living more manageable and enjoyable for all.
        </p>
      </div>
    </div>
    <div class="bg-gray-100">
      <div class="container grid grid-cols-12 gap-10 py-24 mb-24">
        <div class="col-span-6 flex flex-col justify-center">
          <h2 class="text-2xl">Simplify Your Housing Search</h2>
          <p class="text-lg">
            At Korshi, we make finding the right roommate as easy as finding the right home. Our
            platform connects you with like-minded individuals who share your lifestyle and
            preferences, ensuring a harmonious living environment. Say goodbye to the stress of
            roommate hunting and hello to hassle-free living with Korshi.
          </p>
        </div>
        <div class="col-span-6">
          <img src="@/assets/img/home/image%205.jpg" alt="apartment image" class="w-full" />
        </div>
      </div>
    </div>
    <div class="container py-24">
      <h2 class="text-4xl mb-10">Meet our partners</h2>
      <div class="grid grid-cols-12 gap-8">
        <div v-for="item in partnersOrCommunities" :key="item.title" class="col-span-6">
          <h3 class="text-xl mb-5">{{ item.title }}</h3>
          <p class="text-lg">{{ item.text }}</p>
          <a-button
            size="large"
            class="border-blue-400 text-blue-400"
            :href="item.href"
            target="_blank"
          >
            Learn more
          </a-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { partnersOrCommunities } from '@/constants/index.js';
</script>

<style lang="scss" scoped>
.homepage {
  &__hero {
  }
}
</style>
