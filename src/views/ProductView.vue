<template>
  <div class="container py-24">
    <div class="flex justify-between items-center mb-10">
      <router-link to="/catalog">
        <a-button class="flex justify-center items-center" type="text" size="large">
          <template #icon>
            <arrow-left-outlined />
          </template>
          Каталог
        </a-button>
      </router-link>
      <a-button
        class="border-gray-400 text-gray-400 flex justify-center items-center"
        :class="{ 'border-red-500 text-red-500': useFavsStore().isFavourite(route.params.id) }"
        size="large"
        @click="toggleFavourite"
      >
        <template #icon>
          <heart-filled />
        </template>
      </a-button>
    </div>
    <template v-if="currentProduct.id">
      <div class="grid grid-cols-12 grid-rows-2 gap-5 max-h-[500px]">
        <div class="col-span-4 row-span-2">
          <a-image
            width="100%"
            height="100%"
            :src="currentProduct.photos?.[0] || noImagePng"
            alt="apartment image"
            class="w-full h-full rounded-lg object-cover object-center"
          />
        </div>
        <div class="col-span-4">
          <a-image
            width="100%"
            height="100%"
            :src="currentProduct.photos?.[1] || noImagePng"
            alt="apartment image"
            class="w-full h-full rounded-lg object-cover object-center"
          />
        </div>
        <div class="col-span-4">
          <a-image
            width="100%"
            height="100%"
            :src="currentProduct.photos?.[2] || noImagePng"
            alt="apartment image"
            class="w-full h-full rounded-lg object-cover object-center"
          />
        </div>
        <div class="col-span-8 row-span-1">
          <a-image
            width="100%"
            height="100%"
            :src="currentProduct.photos?.[3] || noImagePng"
            alt="apartment image"
            class="w-full h-full rounded-lg object-cover object-center"
          />
        </div>
      </div>
      <div>
        <h2 class="text-3xl font-bold mt-16 mb-4">{{ currentProduct.title }}</h2>
        <h3 class="text-2xl font-semibold my-4">
          {{ currentProduct.city }}, {{ currentProduct.address }}
        </h3>
        <h3 class="text-gray-500 my-4">
          {{ formatCurrency(currentProduct.price) }}, {{ currentProduct.numberOfRooms }} rooms,
          {{ placeType }}
        </h3>
        <p class="text-lg text-gray-400">{{ currentProduct.content }}</p>
      </div>
      <div class="h-[300px] my-5"><map-component /></div>
      <h4 class="text-xl">Conditions</h4>
      <div class="flex justify-between">
        <ul class="flex flex-col gap-3 list-disc pl-8">
          <li v-for="condition in currentProduct.conditions" :key="condition" class="lowercase">
            {{ condition }}
          </li>
        </ul>
        <a-tooltip>
          <template #title>Open author's profile</template>
          <router-link
            v-if="author"
            :to="{ name: 'user', params: { id: author.id } }"
            class="border border-solid border-gray-400 rounded-lg p-4 flex items-center gap-x-5"
          >
            <img
              :src="author.profilePicture || noImagePng"
              alt="author profile pic"
              class="rounded-full h-[130px] w-[130px]"
            />
            <div>
              <div class="font-bold">{{ author.firstName }} {{ author.surname }}</div>
              <div>{{ author.phoneNumber }}</div>
            </div>
          </router-link>
        </a-tooltip>
      </div>
      <ProductComments :product-id="route.params.id.toString()" />
      <h4 class="text-xl font-bold mb-8 my-14">Similar to your preferences</h4>
      <div class="grid grid-cols-12 gap-8">
        <router-link
          v-for="product in similarProducts"
          :key="product.id"
          :to="{ name: 'catalog.product', params: { id: product.id } }"
          class="col-span-3"
        >
          <a-card hoverable>
            <template #cover>
              <img :alt="product.title" :src="product.photos[0] || noImagePng" />
            </template>
            <template #actions>
              <info-circle-outlined key="info" style="font-size: 1.5em" />
              <heart-outlined key="heart" style="font-size: 1.5rem" />
            </template>
            <a-card-meta :title="product.title">
              <template #description>
                <span class="text-lg">{{ formatCurrency(product.price) }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="grid grid-cols-12 grid-rows-2 gap-5 max-h-[600px]">
        <div class="col-span-4 row-span-2 animate-pulse bg-gray-200 h-full rounded-lg" />
        <div class="col-span-4 animate-pulse bg-gray-200 h-[200px] rounded-lg" />
        <div class="col-span-4 animate-pulse bg-gray-200 h-[200px] rounded-lg" />
        <div class="col-span-8 row-span-1 animate-pulse bg-gray-200 h-[200px] rounded-lg" />
      </div>
      <h2
        class="text-3xl font-bold mt-16 mb-4 animate-pulse bg-gray-200 h-[20px] rounded-lg w-[50%]"
      ></h2>
      <h3
        class="text-2xl font-semibold my-4 animate-pulse bg-gray-200 h-[20px] rounded-lg w-[40%]"
      ></h3>
      <h3 class="text-gray-500 my-4 animate-pulse bg-gray-200 h-[20px] rounded-lg w-[30%]"></h3>
    </template>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { formatCurrency } from '@/utils/utils.js';
import {
  HeartOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  HeartFilled,
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import MapComponent from '@/components/MapComponent.vue';
import noImagePng from '@/assets/img/noimage.png';
import AdsApi from '@/api/AdsApi.js';
import { placeTypeOptions } from '@/constants/index.js';
import UsersApi from '@/api/UsersApi.js';
import ProductComments from '@/components/ProductComments.vue';
import { message } from 'ant-design-vue';
import { useFavsStore } from '@/stores/useFavsStore.js';
import { useAuthStore } from '@/stores/useAuthStore.js';

const route = useRoute();

const catalogStore = useCatalogStore();
const { products } = storeToRefs(catalogStore);

catalogStore.loadProducts();

const similarProducts = computed(() => products.value.slice(0, 4));

const currentProduct = ref({
  title: '',
  content: '',
  photos: [],
  city: null,
  address: '',
  price: null,
  type: null,
  numberOfRooms: null,
  conditions: [],
  isPromoted: true,
});

const author = ref(null);

const placeType = computed(() => {
  return placeTypeOptions.find((p) => p.value === currentProduct.value.type)?.label;
});
async function loadProduct() {
  currentProduct.value = await AdsApi.getOne(route.params.id);
}

async function loadAuthor() {
  author.value = await UsersApi.loadUserProfile(currentProduct.value.authorId);
}

onMounted(async () => {
  await loadProduct();
  await loadAuthor();
});

async function toggleFavourite() {
  if (!useAuthStore().isLoggedIn) {
    message.error('First, log in to your account to add to favorites');
  }

  await useFavsStore().toggleFavourite(route.params.id);
}

useFavsStore().loadFavs();
</script>
