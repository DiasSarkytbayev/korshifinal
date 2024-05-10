import { defineStore } from 'pinia';
import { ref } from 'vue';
import AdsApi from '@/api/AdsApi.js';
import { message } from 'ant-design-vue';

export const useFavsStore = defineStore(
  'favourites',
  () => {
    const favourites = ref([]);

    function isFavourite(adId) {
      return favourites.value.find((f) => f.id === adId) != null;
    }

    async function toggleFavourite(adId) {
      if (isFavourite(adId)) {
        await removeFromFarvourites(adId);
      } else {
        await AdsApi.addToFavs(adId);
        message.success('Product has been added to your favourites list!');
      }

      await loadFavs();
    }

    async function removeFromFarvourites(adId) {
      await AdsApi.removeFromFavs(adId);
      message.success('Product has been removed from your favourites list!');
    }

    async function loadFavs() {
      favourites.value = await AdsApi.favourites();
    }

    return { favourites, loadFavs, isFavourite, toggleFavourite, removeFromFarvourites };
  },
  {}
);
