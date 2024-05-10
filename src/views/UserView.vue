<template>
  <section>
    <div v-if="!user" class="animate-pulse bg-gray-200 w-full h-[500px]"></div>
    <div v-else class="container py-24">
      <div class="rounded-lg p-5 shadow-lg shadow-gray-200 w-[200px] h-[200px] mx-auto">
        <img
          :src="user.profilePicture || noImagePng"
          alt="profile pic"
          class="rounded-full w-full h-full"
        />
      </div>
      <div class="mt-7 font-bold text-xl text-center">{{ user.firstName }} {{ user.surname }}</div>
      <div class="mt-1 mb-12 text-gray-500 text-center">
        {{ user.age }} y.o. {{ user.sex === 'FEMALE' ? 'woman' : 'man' }}
      </div>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-8">
          <div class="text-2xl font-bold">About landlord</div>
          <p class="px-8 mt-4">{{ user.description }}</p>
        </div>
        <div class="col-span-4 border border-gray-400 shadow-lg shadow-gray-200 rounded-lg p-5">
          <div class="mb-3 flex items-center">
            <MailOutlined />
            <a class="inline-block ml-2 text-lg" type="email" :href="`mailto:${user.email}`">
              {{ user.email }}
            </a>
          </div>
          <div class="flex items-center">
            <PhoneOutlined />
            <a class="inline-block ml-2 text-lg" type="tel" :href="user.phoneNumber">
              {{ user.phoneNumber }}
            </a>
          </div>
        </div>
      </div>
      <div class="text-2xl font-bold mt-12">Interests</div>
      <p class="px-8 mt-4">{{ user.interests.join(', ') }}</p>
      <div class="text-2xl font-bold mt-20">{{ user.firstName }}'s advertisements</div>
      <div v-if="products.length" class="grid grid-cols-12 gap-8 mt-5">
        <div v-for="product in products" :key="product.id" class="col-span-3">
          <a-card hoverable>
            <template #cover>
              <img :alt="product.title" :src="product.photos?.[0] || noImagePng" />
            </template>
            <a-card-meta :title="product.title">
              <template #description>
                <span class="">{{ formatCurrency(product.price) }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
      <div class="text-gray-500 mt-5">No any advertisements</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons-vue';
import { formatCurrency } from '@/utils/utils.js';
import AdsApi from '@/api/AdsApi.js';
import noImagePng from '@/assets/img/noimage.png';
import { useRoute } from 'vue-router';
import UsersApi from '@/api/UsersApi.js';

const route = useRoute();

const products = ref([]);

const user = ref(null);

loadUser();

async function loadUser() {
  user.value = await UsersApi.loadUserProfile(route.params.id);
  await loadUserProducts();
}

async function loadUserProducts() {
  const res = await Promise.allSettled(user.value.advertisementIds.map((id) => AdsApi.getOne(id)));
  products.value = res.map(({ value }) => value);
}
</script>

<style lang="scss" scoped></style>
