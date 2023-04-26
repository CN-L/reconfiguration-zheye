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
type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArray: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArray.map(func => func()).every((item) => item)
      context.emit('form-submit', result)
    }
    const callBack = (func: ValidateFunc) => {
      funcArray.push(func)
    }
    // 注册事件form-item-created
    emitter.on('form-item-created', callBack)
    onUnmounted(() => {
      // 移除注销此事件
      emitter.off('form-item-created', callBack)
      funcArray = []
    })
    return {
      submitForm
    }
  }
})
</script>
