<template>
  <a-tooltip>
    <template #title>
      If you buy advertising, your ad will be seen first. <br />
      1000tg for 3 days
    </template>
    <a-button class="border-yellow-600 text-yellow-600" size="large" @click="showModal">
      Promote ad
    </a-button>
  </a-tooltip>
  <Teleport to="body">
    <a-modal v-model:open="open" title="Purchase advertisement for your ad" @ok="handleOk">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12">
          <label for="name">Name</label>
          <a-input v-model="form.name" name="name" size="large" placeholder="Name on the card" />
        </div>
        <div class="col-span-12">
          <label for="card">Card Number</label>
          <a-input
            v-model="form.card"
            v-maska
            name="card"
            data-maska="#### #### #### ####"
            size="large"
            placeholder="Label"
          >
            <template #addonBefore> <credit-card-outlined /> </template>
          </a-input>
        </div>
        <div class="col-span-6">
          <label for="expiration">MM/YY</label>
          <a-input
            v-model="form.expiration"
            v-maska
            data-maska="##/##"
            name="expiration"
            size="large"
            placeholder="MM/YY"
          />
        </div>
        <div class="col-span-6">
          <label for="cvc">CVC</label>
          <a-input
            v-model="form.cvc"
            v-maska
            type="password"
            data-maska="###"
            name="cvc"
            size="large"
            placeholder="Security Code"
          />
        </div>
      </div>
    </a-modal>
  </Teleport>
</template>

<script setup>
import { CreditCardOutlined } from '@ant-design/icons-vue';
import { vMaska } from 'maska';
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  message.success('You have successfully purchase an advertisement for you ad!');
  open.value = false;
};

const form = ref({
  name: '',
  card: '',
  expiration: '',
  cvc: '',
});
</script>

<style lang="scss" scoped></style>
