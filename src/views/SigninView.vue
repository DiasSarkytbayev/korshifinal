<template>
  <div class="container pb-5 relative h-full">
    <div
      class="bg-white rounded-xl p-14 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 max-w-[600px] w-full mx-5"
    >
      <form class="grid-cols-12 grid gap-5" @submit.prevent="submit">
        <div class="col-span-12">
          <a-input
            v-model:value="data.email"
            size="large"
            placeholder="Email address"
            type="email"
          />
        </div>
        <div class="col-span-12">
          <a-input-password v-model:value="data.password" size="large" placeholder="Password" />
        </div>
        <div class="col-span-12">
          <a-button
            type="primary"
            class="w-full"
            html-type="submit"
            size="large"
            :loading="pending"
          >
            Sign in
          </a-button>
        </div>
      </form>
    </div>
    <div class="absolute bottom-[10%] left-[50%] translate-x-[-50%]">
      Doesn't have an account? <router-link to="/sign-up" class="font-bold">Sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = ref({
  email: '',
  password: '',
});

const pending = ref(false);

async function submit() {
  try {
    pending.value = true;
    await useAuthStore().signIn(data.value);
    message.success('You have been logged in!');
    await router.push('/profile');
  } catch (e) {
    message.error('Error');
  } finally {
    pending.value = false;
  }
}
</script>
