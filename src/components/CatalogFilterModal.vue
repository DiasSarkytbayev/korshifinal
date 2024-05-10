<template>
  <li class="cursor-pointer" @click="showModal">
    <img src="@/assets/img/icons/slider.svg" alt="slider" class="w-[40px]" :width="700" />
  </li>
  <Teleport to="body">
    <a-modal v-model:open="open" title="Additional filters" @ok="handleOk">
      <div class="mt-6 mb-3">
        Price {{ formatCurrency(filters.price[0]) }} - {{ formatCurrency(filters.price[1]) }}
      </div>
      <a-slider v-model:value="filters.price" range :marks="priceMarks" :min="0" :max="9_999_999" />
      <div class="mt-6 mb-3">Number of rooms</div>
      <a-slider v-model:value="filters.numberOfRooms" range :marks="roomsMarks" :min="1" :max="5" />
      <div class="mt-6 mb-3">Your age</div>
      <a-slider v-model:value="filters.age" range :marks="ageMarks" :min="0" :max="70" />
      <div class="mt-6 mb-3">Interests</div>
      <a-select
        v-model:value="filters.interests"
        mode="multiple"
        class="w-full"
        size="large"
        placeholder="Your interests"
        :options="interestOptions"
      ></a-select>
      <div class="mt-6 mb-3">Your gender</div>
      <a-select
        v-model:value="filters.sex"
        size="large"
        placeholder="Gender"
        class="w-full"
        :options="genderOptions"
      />
    </a-modal>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../utils/utils.js';
import { genderOptions, interestOptions } from '@/constants/index.js';

const catalogStore = useCatalogStore();
const { filters } = storeToRefs(catalogStore);

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  open.value = false;
};

const roomsMarks = computed(() => ({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }));
const ageMarks = computed(() => ({ 0: 0, 70: 70 }));
const priceMarks = computed(() => ({ 1: 0, 9_999_999: '9,999,999' }));
</script>

<style lang="scss" scoped></style>
