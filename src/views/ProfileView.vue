<template>
  <section class="py-24">
    <div class="container">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3">
          <file-input
            :image="profile.profilePicture"
            @file-selected="profile.profilePicture = $event"
          />
        </div>
        <div class="col-span-9">
          <div class="grid gap-5">
            <div class="col-span-6">
              <a-input v-model:value="profile.firstName" size="large" placeholder="First name" />
            </div>
            <div class="col-span-6">
              <a-input v-model:value="profile.surname" size="large" placeholder="Last name" />
            </div>
            <div class="col-span-6">
              <a-input
                v-model:value="profile.phoneNumber"
                v-maska
                size="large"
                placeholder="Phone number"
                type="tel"
                data-maska="+7-7##-###-##-##"
              />
            </div>
            <div class="col-span-6">
              <a-input
                v-model:value="profile.email"
                size="large"
                placeholder="Email address"
                type="email"
              />
            </div>
            <div class="col-span-6">
              <a-select
                v-model:value="profile.sex"
                size="large"
                placeholder="Gender"
                class="w-full"
                :options="genderOptions"
              />
            </div>
            <div class="col-span-6">
              <a-select
                v-model:value="profile.interests"
                mode="multiple"
                class="w-full"
                size="large"
                placeholder="Your interests"
                :options="interestOptions"
              />
            </div>
            <!--            <div class="col-span-12">-->
            <!--              <a-select v-model:value="profile.role" size="large" placeholder="Role" class="w-full">-->
            <!--                <a-select-option value="Landlord">Landlord</a-select-option>-->
            <!--                <a-select-option value="Buyer">Buyer</a-select-option>-->
            <!--                <a-select-option value="Tenant">Tenant</a-select-option>-->
            <!--              </a-select>-->
            <!--            </div>-->
            <div class="col-span-12">
              <a-textarea
                v-model:value="profile.description"
                show-count
                :maxlength="100"
                placeholder="About me"
                size="large"
              />
            </div>

            <div class="col-span-12 flex justify-start gap-3">
              <template v-if="showSettingsBtns">
                <a-button
                  type="primary"
                  size="large"
                  :loading="pending"
                  @click="saveProfileChanges"
                >
                  Save changes
                </a-button>
                <a-button type="primary" ghost size="large" @click="isPasswordFormShown = true">
                  Change password
                </a-button>
              </template>
              <a-button v-else type="primary" ghost size="large" @click="showSettingsBtns = true">
                Change account
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <password-change-form v-model:open="isPasswordFormShown" />
      <div class="flex items-center mb-8 my-14">
        <h4 class="text-3xl font-bold mb-0">My ads</h4>
        <a-button class="ml-4" @click="isProductFormShown = true">Create new ad</a-button>
      </div>
      <div class="grid grid-cols-12 gap-8">
        <div v-for="product in products" :key="product.id" class="col-span-3">
          <a-card hoverable>
            <template #cover>
              <img :alt="product.title" :src="product.photos[0] || noImagePng" />
            </template>
            <template #actions>
              <a-button size="large" @click.prevent="showEditForm(product)">
                <template #icon>
                  <edit-outlined />
                </template>
              </a-button>
              <a-button danger size="large" @click.prevent="deleteAd(product)">
                <template #icon>
                  <delete-outlined />
                </template>
              </a-button>
            </template>
            <a-card-meta :title="product.title">
              <template #description>
                <span class="text-lg">{{ formatCurrency(product.price) }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
      <product-form
        v-model:open="isProductFormShown"
        :product="editProduct"
        @close="closeProductForm"
      />
    </div>
  </section>
</template>

<script setup>
import { vMaska } from 'maska';
import { createVNode, onMounted, ref } from 'vue';
import FileInput from '@/components/FileInput.vue';
import { formatCurrency } from '@/utils/utils.js';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
import ProductForm from '@/components/ProductForm.vue';
import PasswordChangeForm from '@/components/PasswordChangeForm.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import lodash from 'lodash';
import { genderOptions, interestOptions } from '@/constants/index.js';
import AdsApi from '@/api/AdsApi.js';
import noImagePng from '@/assets/img/noimage.png';

const authStore = useAuthStore();

authStore.loadData();

const profile = ref(
  (function () {
    return lodash.cloneDeep(authStore.userData);
  })()
);

const products = ref([]);

async function loadUserProducts() {
  products.value = await AdsApi.getAllUserAds();
}

onMounted(() => {
  loadUserProducts();
});

const editProduct = ref(null);
const isProductFormShown = ref(false);
const isPasswordFormShown = ref(false);

const pending = ref(false);

async function saveProfileChanges() {
  const data = {
    ...profile.value,
  };

  try {
    pending.value = true;
    await authStore.updateUserProfile(data);
    message.success('Profile has been updated!');
  } catch (e) {
    message.error(e.response.data.detail);
  } finally {
    pending.value = false;
  }
}

function showEditForm(product) {
  editProduct.value = product;
  isProductFormShown.value = true;
}

function closeProductForm() {
  editProduct.value = null;
}

function deleteAd(product) {
  Modal.confirm({
    title: 'Are you sure delete this ad?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'This action cannot be undone',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      await AdsApi.deleteOne(product.id);
      message.success('Your ad has been deleted!');
      await loadUserProducts();
    },
  });
}

const showSettingsBtns = ref(false);
</script>

<style lang="scss" scoped></style>
