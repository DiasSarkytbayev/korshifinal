<template>
  <Teleport to="body">
    <Transition name="fade" @after-enter="showContent = true" @before-leave="showContent = false">
      <div
        v-show="model"
        :class="$style.wrapper"
        class="w-[100vw] h-[100vh] fixed top-0 left-0"
        @click="
          showContent = false;
          $emit('update:modelValue', false);
        "
      >
        <Transition name="slide-right">
          <aside
            v-show="showContent"
            :class="$style.aside"
            class="bg-white w-full fixed top-0 right-0 h-full"
            v-bind="$attrs"
            :style="{ maxWidth }"
            @click.stop
          >
            <slot />
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({ type: Boolean, default: false });

defineProps({
  maxWidth: {
    type: String,
    default: '700px',
  },
});

defineEmits(['update:modelValue']);

const showContent = ref(false);

watch(
  () => model.value,
  () => {
    if (model.value) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }
);
</script>

<style lang="scss">
.fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.slide-right {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s ease;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
  }
}
</style>

<style lang="scss" module>
.wrapper {
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.aside {
}
</style>
