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
type clearAllFunc = () => void
type Events = {
  'form-item-created': ValidateFunc,
  'form-item-clear': () => void
}
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArray: ValidateFunc[] = []
    let clearArray: clearAllFunc[] = []
    const clearInputs = () => {
      clearArray.map(item => item())
    }
    const submitForm = () => {
      const result = funcArray.map(func => func()).every((item) => item)
      if (result) context.emit('form-submit', result); clearInputs()
    }
    const callBack = (func: ValidateFunc) => {
      funcArray.push(func)
    }
    // 清空input函数集合
    const clearAllBack = (func: clearAllFunc) => {
      clearArray.push(func)
    }
    // 注册事件form-item-created
    emitter.on('form-item-created', callBack)
    emitter.on('form-item-clear', clearAllBack)
    onUnmounted(() => {
      // 移除注销此事件
      emitter.off('form-item-created', callBack)
      emitter.off('form-item-clear', clearAllBack)
      funcArray = []
      clearArray = []
    })
    return {
      submitForm
    }
  }
})
</script>
