<template>
  <div class="flex items-center justify-between w-full">
    <ul class="flex items-center gap-8 mb-0">
      <catalog-filter-modal />
      <li
        v-for="landType in placeTypeOptions"
        :key="landType.value"
        class="cursor-pointer"
        :class="{ 'font-bold': selectedLangTypes.includes(landType.value) }"
        @click="onClickFilter(landType)"
      >
        <img :src="landType.icon" alt="slider" class="w-[40px] mx-auto" />
        <div class="mt-2 capitalize">{{ landType.label }}</div>
      </li>
    </ul>
    <div class="text text-gray-400">
      {{ filtersApplied ? 'Found' : 'Total' }}
      <b>{{ filteredProducts.length }}</b> products
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import CatalogFilterModal from '@/components/CatalogFilterModal.vue';
import { placeTypeOptions } from '@/constants/index.js';

const catalogStore = useCatalogStore();
const { selectedLangTypes, products, filteredProducts } = storeToRefs(catalogStore);

function onClickFilter(landType) {
  if (selectedLangTypes.value.includes(landType.value)) {
    selectedLangTypes.value = selectedLangTypes.value.filter((t) => t !== landType.value);
  } else {
    selectedLangTypes.value.push(landType.value);
  }
}

const filtersApplied = computed(() => filteredProducts.value.length !== products.value.length);
</script>

<style lang="scss" scoped></style>
