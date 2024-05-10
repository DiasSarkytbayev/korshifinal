<template>
  <a-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    class="avatar-uploader"
    :max-count="4"
    multiple
    :custom-request="customRequest"
    :before-upload="beforeUpload"
    @change="handleChange"
    @preview="handlePreview"
  >
    <div v-if="fileList.length < 8">
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getBase64 } from '@/utils/utils.js';

defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const fileList = ref([]);
const loading = ref(false);

watch(
  () => fileList.value,
  () => emit('update:modelValue', fileList.value)
);

const handleChange = async (info) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }

  if (info.file.status === 'done') {
    loading.value = false;
  }

  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const customRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 300px;
  height: 300px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
