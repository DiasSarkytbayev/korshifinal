import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePageView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SigninView.vue'),
      meta: {
        layout: 'AuthLayout',
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        layout: 'AuthLayout',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/MapView.vue'),
      meta: {
        hideFooter: true,
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
    },
    {
      path: '/catalog/product/:id',
      name: 'catalog.product',
      component: () => import('@/views/ProductView.vue'),
    },
  ],
});

export default router;
