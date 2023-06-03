<template>
  <div class="vue-easymde-editor">
    <textarea ref="textAreaRef" id="my-text-area"></textarea>
    <!-- <input type="text" v-bind="$attrs"> -->
  </div>
</template>
<script lang="ts" setup :inheritAttrs="true">
import { onMounted, defineEmits, watch, ref, defineProps, onUnmounted, defineExpose, nextTick } from 'vue'
import EasyMDE, { Options } from 'easymde'
interface EditorProps {
  modelValue?: string;
  options?: Options
}
interface EditorEvents {
  (type: 'update:modelValue', value: string): void,
  (type: 'change', value: string): void,
  (type: 'blur', value?: string): void
}
const props = defineProps<EditorProps>() // 定义props的值
const emits = defineEmits<EditorEvents>() // 定义emits
let easyMDEInstance: EasyMDE | null = null
const innerValue = ref(props.modelValue || '')
watch(() => props.modelValue, (newVal) => {
  if (easyMDEInstance) {
    if (newVal !== innerValue.value) {
      easyMDEInstance.value(newVal || '')
    }
  }
}, { immediate: true })
const textAreaRef = ref(null)
onMounted(() => {
  // const vNode = document.getElementById('my-text-area') as HTMLTextAreaElement
  console.log(innerValue.value, '90')
  if (textAreaRef.value) {
    const config:Options = {
      ...(props.options || {}),
      element: textAreaRef.value,
      initialValue: innerValue.value
    }
    easyMDEInstance = new EasyMDE(config)
    easyMDEInstance.codemirror.on('change', () => {
      if (easyMDEInstance) {
        const updateValue = easyMDEInstance.value()
        innerValue.value = updateValue
        emits('update:modelValue', updateValue)
        emits('change', updateValue)
      }
    })
    easyMDEInstance.codemirror.on('blur', () => {
      if (easyMDEInstance) {
        emits('blur')
      }
    })
  }
})
// 清空
const clear = () => {
  if (easyMDEInstance) {
    easyMDEInstance.value('')
  }
}
const getMDEInstance = () => {
  return easyMDEInstance
}
defineExpose({
  clear,
  textAreaRef, // 暴露属性
  getMDEInstance
})
onUnmounted(() => {
  // 销毁easyMDE实例
  if (easyMDEInstance) {
    easyMDEInstance.toTextArea()
    easyMDEInstance = null
  }
})
</script>
<style>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>
