<template>
  <div class="container py-20">
    <catalog-filter />
    <div class="grid grid-cols-12 gap-8 pt-16">
      <template v-if="loading">
        <div
          v-for="idx in 20"
          :key="idx"
          class="col-span-3 bg-gray-200 animate-pulse h-[400px] rounded-lg"
        />
      </template>
      <template v-else>
        <router-link
          v-for="(product, idx) in filteredProducts"
          :key="idx"
          :to="{ name: 'catalog.product', params: { id: product.id } }"
          class="col-span-3 rounded-lg"
          :class="{ 'border border-green-300': product.isPromoted }"
        >
          <a-card hoverable>
            <template #cover>
              <img
                :alt="product.title"
                :src="product.photos[0] || noImagePng"
                class="h-[250px] w-full"
              />
            </template>
            <template #actions>
              <info-circle-outlined key="info" style="font-size: 1.5em" />
              <heart-outlined
                key="heart"
                :class="{ '!text-red-500': useFavsStore().isFavourite(product.id) }"
                style="font-size: 1.5rem"
                @click.prevent="toggleFavourite(product.id)"
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
import { InfoCircleOutlined, HeartOutlined } from '@ant-design/icons-vue';
import CatalogFilter from '@/components/CatalogFilter.vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../utils/utils.js';
import noImagePng from '@/assets/img/noimage.png';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useFavsStore } from '@/stores/useFavsStore.js';

const catalogStore = useCatalogStore();
const { filteredProducts } = storeToRefs(catalogStore);

const loading = ref(false);

async function loadProducts() {
  loading.value = true;
  await catalogStore.loadProducts();
  loading.value = false;
}

loadProducts();

async function toggleFavourite(productId) {
  if (!useAuthStore().isLoggedIn) {
    message.error('First, log in to your account to add to favorites');
  }

  try {
    await useFavsStore().toggleFavourite(productId);
  } catch (e) {
    message.error('Could not add to your favourites list');
  }
}
</script>

<style lang="scss" scoped></style>
