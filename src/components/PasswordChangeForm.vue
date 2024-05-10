<template>
  <a-modal
    :open="open"
    title="Change password"
    @update:open="emit('update:open', $event)"
    @ok="handleOk"
  >
    <div class="flex flex-col gap-5">
      <a-input-password v-model:value="data.oldPassword" size="large" placeholder="Old password" />
      <a-input-password v-model:value="data.newPassword" size="large" placeholder="New password" />
      <a-input-password
        v-model:value="data.confirmPassword"
        size="large"
        placeholder="Confirm password"
      />
    </div>
    <template #footer>
      <a-button class="mt-8" type="primary" :loading="pending" @click="changePassword">
        Save changes
      </a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import UsersApi from '@/api/UsersApi.js';
import { useAuthStore } from '@/stores/useAuthStore.js';

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:open']);

function handleOk() {
  emit('update:open', false);
}

const pending = ref(false);

const data = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

async function changePassword() {
  try {
    pending.value = true;
    await UsersApi.changePassword(useAuthStore().userData.id, data.value);
    message.success('Your password has been changed!');
    data.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    handleOk();
  } catch (e) {
    message.error('Error');
  } finally {
    pending.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
