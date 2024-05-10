import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import AdsApi from '@/api/AdsApi.js';

export const useCatalogStore = defineStore('catalog', () => {
  const selectedLangTypes = ref([]);
  const filters = ref({
    price: [0, 9999999],
    numberOfRooms: [1, 5],
    interests: [],
    age: [0, 70],
    sex: null,
  });

  const products = ref([]);

  const filteredProducts = computed(() => {
    return products.value
      .filter((p) => !selectedLangTypes.value.length || selectedLangTypes.value.includes(p.type))
      .filter((p) => p.price >= filters.value.price[0] && p.price <= filters.value.price[1])
      .filter(
        (p) =>
          p.numberOfRooms >= filters.value.numberOfRooms[0] &&
          p.numberOfRooms <= filters.value.numberOfRooms[1]
      );
  });

  async function loadProducts() {
    const res = await AdsApi.getAll();
    products.value = res.content;
  }

  return { selectedLangTypes, filters, filteredProducts, products, loadProducts };
});
