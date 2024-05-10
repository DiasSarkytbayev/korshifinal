<template>
  <div class="container pb-5 relative h-full">
    <div
      class="bg-white rounded-xl p-14 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 max-w-[600px] w-full mx-5"
    >
      <form class="grid-cols-12 grid gap-5" @submit.prevent="submit">
        <div class="col-span-6">
          <a-input v-model:value="data.firstName" size="large" placeholder="Firstname" />
        </div>
        <div class="col-span-6">
          <a-input v-model:value="data.surname" size="large" placeholder="Surname" />
        </div>
        <div class="col-span-6">
          <a-input
            v-model:value="data.phoneNumber"
            v-maska
            size="large"
            placeholder="Phone number"
            type="tel"
            data-maska="+7-7##-###-##-##"
          />
        </div>
        <div class="col-span-6">
          <a-input
            v-model:value="data.email"
            size="large"
            placeholder="Email address"
            type="email"
          />
        </div>
        <div class="col-span-6">
          <a-input-password v-model:value="data.password" size="large" placeholder="Password" />
        </div>
        <div class="col-span-6">
          <a-select
            v-model:value="data.sex"
            size="large"
            placeholder="Gender"
            class="w-full"
            :options="genderOptions"
          />
        </div>
        <div class="col-span-6">
          <a-input v-model:value="data.age" size="large" placeholder="Your age" type="number" />
        </div>
        <div class="col-span-6">
          <a-select
            v-model:value="data.interests"
            mode="multiple"
            class="w-full"
            size="large"
            placeholder="Your interests"
            :options="interestOptions"
          />
        </div>
        <div class="col-span-12">
          <a-textarea
            v-model:value="data.description"
            show-count
            :maxlength="100"
            placeholder="About me"
            size="large"
          />
        </div>
        <div class="col-span-12">
          <a-button
            type="primary"
            class="w-full"
            html-type="submit"
            size="large"
            :loading="pending"
          >
            Sign up
          </a-button>
        </div>
      </form>
    </div>
    <div class="absolute bottom-[10%] left-[50%] translate-x-[-50%]">
      Already have an account? <router-link to="/sign-in" class="font-bold">Sign in</router-link>
    </div>
  </div>
</template>

<script setup>
import { vMaska } from 'maska';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { genderOptions, interestOptions } from '@/constants/index.js';

const router = useRouter();

const data = ref({
  firstName: '',
  surname: '',
  phoneNumber: '',
  email: '',
  password: '',
  sex: null,
  age: null,
  interests: [],
  description: '',
});

const pending = ref(false);

async function submit() {
  try {
    pending.value = true;
    await useAuthStore().signUp(data.value);
    message.success('You have been registered successfully!');
    await router.push('/sign-in');
  } catch (e) {
    message.error('Error');
  } finally {
    pending.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
