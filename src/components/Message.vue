<template>
  <teleport to="#message">
    <div v-if="isVisible" :class="classObject" class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2">
      <span>{{message}}</span>
      <button type="button" class="close" aria-label="Close" @click.prevent="hide">
          <span aria-hidden="true">&times;</span>
        </button>
   </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onUnmounted } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  name: 'fjw-sqj',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, contxt) {
    useDomCreate('message') // 创建dom
    const isVisible = ref(true)
    const hide = () => {
      isVisible.value = false
      contxt.emit('close-message', true)
    }
    const classObject = {
      'alert-scuccess': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    return {
      hide,
      isVisible,
      classObject
    }
  }
})
</script>
