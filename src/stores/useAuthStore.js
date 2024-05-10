import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import UsersApi from '@/api/UsersApi.js';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userData = ref({});
    const token = ref(null);

    const isLoggedIn = computed(() => token.value != null);

    async function signIn(data) {
      const res = await UsersApi.login(data);
      token.value = res.token;
      userData.value = res.user;
    }

    async function signUp(data) {
      await UsersApi.register(data);
    }

    async function signout() {
      token.value = null;
      userData.value = {};
    }

    async function updateUserProfile(data) {
      userData.value = await UsersApi.updateUserProfile(userData.value.id, data);
    }

    async function loadData() {
      userData.value = await UsersApi.loadUserProfile(userData.value.id);
    }

    return {
      token,
      userData,
      isLoggedIn,
      signIn,
      signUp,
      signout,
      loadData,
      updateUserProfile,
    };
  },
  {
    persist: {
      paths: ['userData', 'token'],
    },
  }
);
