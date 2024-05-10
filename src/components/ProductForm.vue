<template>
  <a-modal
    :title="props.product ? 'Edit advertisement' : 'Create an advertisement'"
    :width="700"
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <form id="product_form" name="product_form" @submit.prevent="onSubmit">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12">
          <a-input v-model:value="form.title" size="large" placeholder="Advertisement title" />
        </div>
        <div class="col-span-6">
          <a-input v-model:value="form.address" size="large" placeholder="Address" />
        </div>
        <div class="col-span-6">
          <a-select
            v-model:value="form.city"
            :options="cityOptions"
            size="large"
            placeholder="City"
            class="w-full"
          />
        </div>
        <div class="col-span-6">
          <a-input-number
            v-model:value="form.price"
            size="large"
            placeholder="Price"
            class="w-full"
            :min="0"
            :max="9999999"
          />
        </div>
        <div class="col-span-6">
          <a-input-number
            v-model:value="form.numberOfRooms"
            size="large"
            placeholder="Number of rooms"
            class="w-full"
            :min="1"
            :max="5"
          />
        </div>
        <div class="col-span-6">
          <a-select
            v-model:value="form.type"
            :options="placeTypeOptions"
            size="large"
            placeholder="Type"
            class="w-full"
          />
        </div>
        <div class="col-span-12">
          <a-select
            v-model:value="form.conditions"
            placeholder="Conditions"
            mode="multiple"
            class="w-full"
            :options="conditionsOptions"
            size="large"
          />
        </div>
        <div class="col-span-12">
          <a-textarea
            v-model:value="form.content"
            show-count
            :maxlength="100"
            placeholder="Description"
            size="large"
          />
        </div>
        <div class="col-span-12">
          <file-upload v-model="form.photos" />
        </div>
      </div>
    </form>
    <template #footer>
      <div class="col-span-12 flex justify-end gap-2">
        <a-button size="large" @click="handleCancel">Cancel</a-button>
        <purchase-ad-modal />
        <a-button
          type="primary"
          html-type="submit"
          for="product_form"
          size="large"
          :loading="loading"
          @click="onSubmit"
        >
          {{ props.product != null ? 'Save changes' : 'Publish my ad' }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import PurchaseAdModal from '@/components/PurchaseAdModal.vue';
import { message } from 'ant-design-vue';
import { cityOptions, conditionsOptions, placeTypeOptions } from '@/constants/index.js';
import AdsApi from '@/api/AdsApi.js';
import lodash from 'lodash';
import { useAuthStore } from '@/stores/useAuthStore.js';
import FileUpload from '@/components/FileUpload.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:open']);

const initForm = () => ({
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

const form = ref(initForm());

function handleCancel() {
  emit('update:open', false);
}

const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const photos = form.value.photos.map((p) => p.thumbUrl);
  const data = { ...form.value, photos };
  console.log(photos);
  console.log(data);

  try {
    if (props.product == null) {
      await AdsApi.create(data);
      message.success('You have successfully published a new ad!');
    } else {
      await AdsApi.update(props.product.id, data);
      message.success('You have successfully edited the ad!');
    }
    await useAuthStore().loadData();
    emit('update:open', false);
  } catch (e) {
    message.error('Error');
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.product,
  () => {
    form.value = lodash.cloneDeep(props.product);
  }
);
</script>

<style lang="scss" scoped></style>
