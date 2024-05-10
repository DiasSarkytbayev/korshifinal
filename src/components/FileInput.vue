<template>
  <div
    class="rounded-lg border-gray-300 border border-dashed cursor-pointer p-2 text-center"
    @dragover.prevent
    @dragenter.prevent
    @drop="handleDrop"
    @click="openFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      accept="image/*"
      @change="handleFileInput"
    />
    <img
      v-if="imagePreview"
      :src="imagePreview"
      alt="Selected Image"
      class="w-100 d-block rounded-lg"
    />
    <img v-else-if="image" :src="image" alt="Selected Image" class="w-100 d-block rounded-lg" />
    <div v-else class="font-weight-bold text-gray-400 py-20">Upload photo</div>
  </div>
  <a-button
    v-if="image || imagePreview"
    class="mt-3 w-full"
    danger
    @click="
      emit('fileSelected', null);
      imagePreview = null;
    "
  >
    Delete photo
  </a-button>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  image: {
    type: [File, String],
    default: null,
  },
});

const imagePreview = ref(null);
const fileInput = ref(null);

const emit = defineEmits(['fileSelected']);

function handleFileInput(event) {
  const file = event.target.files[0];
  previewImage(file);
}

function previewImage(file) {
  if (!file.type.startsWith('image/')) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imagePreview.value = reader.result;
    emit('fileSelected', reader.result);
  };
}

function handleDrop(event) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  emit('fileSelected', file);
  previewImage(file);
}

function openFileInput() {
  if (fileInput.value != null) {
    fileInput.value.click();
  }
}
</script>
