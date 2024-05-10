<template>
  <div>
    <h2 class="text-xl mb-5">Comments</h2>
    <p v-if="!loading && loaded && comments.length === 0" class="text-gray-500 text-lg">
      No comments yet
    </p>
    <ul v-else class="list-none flex flex-col gap-y-5">
      <template v-if="!loading">
        <li
          v-for="comment in comments"
          :key="comment.id"
          class="shadow p-4 rounded-lg flex items-center gap-x-5"
        >
          <img
            :src="comment.author.profilePicture || noImagePng"
            alt="author profile pic"
            class="rounded-full h-[80px] w-[80px]"
          />
          <div>
            <div class="font-bold capitalize mb-2">
              {{ comment.author.firstName }} {{ comment.author.surname }}
            </div>
            <div class="text-gray-600">{{ comment.content }}</div>
          </div>
        </li>
      </template>
      <template v-else>
        <li v-for="idx in 3" :key="idx" class="h-[110px] rounded-lg bg-gray-200 animate-pulse" />
      </template>
    </ul>
    <form
      v-if="authStore.isLoggedIn"
      id="comment"
      class="max-w-[700px] mt-5"
      @submit.prevent="submitComment"
    >
      <a-textarea
        v-model:value="myComment"
        show-count
        :maxlength="200"
        placeholder="Description"
        size="large"
      />
      <a-button
        html-type="submit"
        type="primary"
        :loading="isSending"
        class="flex items-center mt-5"
        size="large"
      >
        Send my comment
        <template #icon> <SendOutlined /> </template>
      </a-button>
    </form>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { SendOutlined } from '@ant-design/icons-vue';
import CommentsApi from '@/api/CommentsApi.js';
import UsersApi from '@/api/UsersApi.js';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { message } from 'ant-design-vue';
import noImagePng from '@/assets/img/noimage.png';

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();

const route = useRoute();

const loading = ref(false);
const loaded = ref(false);

const comments = ref([]);

async function loadComments() {
  loading.value = true;
  const response = await CommentsApi.getProductComments({ advertisementId: props.productId });
  comments.value = response.content;
  const authors = await Promise.allSettled(
    comments.value.map((comment) => UsersApi.loadUserProfile(comment.authorId))
  );
  authors.forEach((author, index) => (comments.value[index].author = author.value));
  loading.value = false;
  loaded.value = true;
}

loadComments();

const myComment = ref('');
const isSending = ref(false);

async function submitComment() {
  const data = {
    authorId: authStore.userData.id,
    content: myComment.value,
    advertisementId: props.productId,
    parentId: null,
  };

  try {
    isSending.value = true;
    await CommentsApi.sendComment(data);
    await loadComments();
    myComment.value = '';
    message.success('Your comment has been posted!');
  } catch (e) {
    message.error(e.response.data.detail);
  } finally {
    isSending.value = false;
  }
}
</script>

<style lang="scss" module></style>
