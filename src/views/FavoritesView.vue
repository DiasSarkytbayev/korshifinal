<template>
  <div class="container py-24">
    <h4 class="text-3xl font-bold mb-8 my-14">My favorites</h4>
    <div v-if="!loading && loaded && !favourites.length" class="text-lg text-gray-500">
      You don't have any favourites yet
    </div>
    <div class="grid grid-cols-12 gap-8">
      <template v-if="loading">
        <div
          v-for="idx in 7"
          :key="idx"
          class="col-span-4 bg-gray-200 animate-pulse h-[400px] rounded-lg"
        />
      </template>
      <template v-else>
        <router-link
          v-for="product in favourites"
          :key="product.id"
          :to="{ name: 'catalog.product', params: { id: product.id } }"
          class="col-span-4"
        >
          <a-card hoverable>
            <template #cover>
              <img :alt="product.title" :src="product.photos?.[0] ?? noImagePng" />
            </template>
            <template #actions>
              <info-circle-outlined key="info" style="font-size: 1.5em" />
              <heart-filled
                key="heart"
                style="font-size: 1.5rem"
                class="!text-red-500"
                @click.prevent="useFavsStore().toggleFavourite(product.id)"
              />
            </template>
            <a-card-meta :title="product.title">
              <template #description>
                <span class="text-lg">{{ formatCurrency(product.price) }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '@/utils/utils.js';
import { InfoCircleOutlined, HeartFilled } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useFavsStore } from '@/stores/useFavsStore.js';
import noImagePng from '@/assets/img/noimage.png';
import { storeToRefs } from 'pinia';

const userStore = useFavsStore();
const { favourites } = storeToRefs(userStore);

const loading = ref(false);
const loaded = ref(false);
async function loadFavs() {
  loading.value = true;

  await userStore.loadFavs();

  loading.value = false;
  loaded.value = true;
}

loadFavs();
</script>

<style lang="scss" scoped></style>
