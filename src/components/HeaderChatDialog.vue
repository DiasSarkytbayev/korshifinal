<template>
  <div class="bg-gray-200 h-full p-5 flex flex-col">
    <div class="flex justify-end mb-4">
      <a-button class="flex items-center justify-center" @click="$emit('close')">
        <template #icon><CloseOutlined /></template
      ></a-button>
    </div>
    <div class="grid grid-cols-12 flex-grow min-h-0">
      <div class="col-span-6 pr-5">
        <a-input-search v-model:value="search" size="large" placeholder="Search" />
        <ul class="flex flex-col gap-y-4 mt-6">
          <li
            v-for="user in filteredConnectedUsers"
            :key="user.userId"
            class="rounded-lg bg-blue-200 p-4 duration-300 hover:bg-blue-300 cursor-pointer flex items-center gap-x-3"
            :class="{ 'bg-blue-300': selectedUserId === user.userId }"
            @click="userItemClick(user)"
          >
            <img :src="noImagePng" alt="profile pic" class="rounded-full h-[40px] w-[40px]" />
            {{ user.fullName }}
          </li>
        </ul>
      </div>
      <div class="col-span-6 rounded-lg bg-white flex flex-col min-h-0">
        <div
          v-if="!selectedUserId"
          class="flex-grow justify-center items-center flex text-gray-500"
        >
          Select a chat to start messaging
        </div>
        <template v-else>
          <div class="flex gap-x-4 p-4 items-center">
            <img :src="noImagePng" alt="profile pic" class="rounded-full h-[40px] w-[40px]" />
            <div>
              <div class="font-bold">{{ selectedUser.fullName }}</div>
            </div>
          </div>
          <ul class="flex-grow overflow-y-scroll px-4">
            <li
              v-for="msg in userChat"
              :key="msg.senderId + msg.timestamp"
              class="flex"
              :class="[msg.senderId !== userData.id ? 'justify-start' : 'justify-end']"
            >
              <div class="max-w-[70%]">
                <div class="text-sm" :class="{ 'text-right': msg.senderId === userData.id }">
                  {{ msg.fullName }}
                </div>
                <div
                  class="rounded my-3 p-2"
                  :class="[msg.senderId !== userData.id ? 'bg-blue-200' : 'bg-yellow-200']"
                >
                  {{ msg.content }}
                </div>
                <div class="text-xs" :class="{ 'text-right': msg.senderId === userData.id }">
                  {{ formatTimestamp(msg.timestamp) }}
                </div>
              </div>
            </li>
          </ul>
          <form class="flex gap-x-4 p-4" @submit.prevent="sendMessage">
            <a-input v-model:value="message" placeholder="Your message" size="large" />
            <a-button size="large" html-type="submit">Send</a-button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CloseOutlined } from '@ant-design/icons-vue';
import { computed, ref } from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import noImagePng from '@/assets/img/noimage.png';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { storeToRefs } from 'pinia';
import { formatTimestamp } from '@/utils/utils.js';

defineEmits(['close']);

const search = ref('');

const authStore = useAuthStore();
const { userData } = storeToRefs(authStore);

const connectedUsers = ref([
  { timestamp: new Date(), fullName: 'John Doe', userId: '2342' },
  { timestamp: new Date(), fullName: 'Mary Amber', userId: '23423' },
]);
const selectedUserId = ref(null);
const message = ref('');
const fullName = computed(() => `${userData.value.firstName} ${userData.value.surname}`);
const userChat = ref([
  {
    senderId: userData.value.id,
    content: 'Hey hey hey hey',
    timestamp: new Date(),
  },
  {
    senderId: userData.value.id,
    content: 'Test',
    timestamp: new Date(),
  },
  {
    senderId: '23423',
    content: 'Nice job man',
    timestamp: new Date(),
  },
  {
    senderId: '23423',
    content: 'I really like your house',
    timestamp: new Date(),
  },
  {
    senderId: userData.value.id,
    content: 'Thanks!',
    timestamp: new Date(),
  },
]);

const filteredConnectedUsers = computed(() => {
  if (search.value.length === 0) {
    return connectedUsers.value;
  }
  const loweredSearch = search.value.toLowerCase();
  return connectedUsers.value.filter((u) => u.fullName.toLowerCase().includes(loweredSearch));
});

const selectedUser = computed(() => {
  return connectedUsers.value.find((u) => u.userId === selectedUserId.value);
});

connect();

function connect() {
  onConnected();
}

function onConnected() {
  findAndDisplayConnectedUsers();
}

async function findAndDisplayConnectedUsers() {
  const connectedUsersResponse = await fetch('/users');
  connectedUsers.value = await connectedUsersResponse.json();
  connectedUsers.value = connectedUsers.value.filter((user) => user.userId !== userData.value.id);
}

function userItemClick(clickedUser) {
  selectedUserId.value = clickedUser.userId;
}

function sendMessage() {
  userChat.value.push({
    senderId: userData.value.id,
    recipientId: selectedUserId,
    content: message.value.trim(),
    timestamp: new Date(),
  });
  message.value = '';
}
</script>

<style lang="scss" module></style>
