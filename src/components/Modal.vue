<template>
  <teleport to="#modal">
    <div v-if="visible" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button @click="onClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button @click="onClose" type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            <button @click="onConfirm" type="button" class="btn btn-primary">确认</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export default defineComponent({
  name: 'I-modal',
  emits: ['modal-close', 'modal-confirm'],
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    useDomCreate('modal') // 建立dom节点
    const onClose = () => {
      context.emit('modal-close')
    }
    const onConfirm = () => {
      context.emit('modal-confirm')
    }
    return {
      onConfirm,
      onClose
    }
  }
})
</script>
