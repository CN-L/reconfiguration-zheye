<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <!-- prevent停止事件默认行为 -->
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type Events = {
  'form-item-create': string,
   callBack: string
}
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => context.emit('form-submit', true)
    const callBack = (test: string) => {
      console.log(test)
    }
    // 注册事件form-item-create
    emitter.on('form-item-create', callBack)
    onUnmounted(() => {
      emitter.off('form-item-create', callBack)
    })
    return {
      submitForm
    }
  }
})
</script>
