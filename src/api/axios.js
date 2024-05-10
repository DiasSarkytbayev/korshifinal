import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    const authStore = useAuthStore();

    if (authStore.token?.length) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`;
      config.headers['userId'] = authStore.userData.id;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
