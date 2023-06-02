<template>
  <div class="vue-easymde-editor">
    <textarea ref="textAreaRef" id="my-text-area"></textarea>
  </div>
</template>
<script lang="ts" setup>
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
let easyMDEInstace: EasyMDE | null = null
const innerValue = ref(props.modelValue || '')
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    innerValue.value = newVal || ''
  }
}, { immediate: true })
const textAreaRef = ref(null)
onMounted(async () => {
  // const vNode = document.getElementById('my-text-area') as HTMLTextAreaElement
  console.log(textAreaRef)
  if (textAreaRef.value) {
    const config:Options = {
      ...(props.options || {}),
      element: textAreaRef.value,
      initialValue: innerValue.value
    }
    easyMDEInstace = new EasyMDE(config)
    easyMDEInstace.codemirror.on('change', () => {
      if (easyMDEInstace) {
        const updateValue = easyMDEInstace.value()
        innerValue.value = updateValue
        emits('update:modelValue', updateValue)
        emits('change', updateValue)
      }
    })
    easyMDEInstace.codemirror.on('blur', () => {
      if (easyMDEInstace) {
        emits('blur')
      }
    })
  }
})
// 清空
const clear = () => {
  if (easyMDEInstace) {
    easyMDEInstace.value('')
  }
}
const getMDEInstance = () => {
  return easyMDEInstace
}
defineExpose({
  clear,
  getMDEInstance
})
onUnmounted(() => {
  // 销毁easyMDE实例
  if (easyMDEInstace) {
    easyMDEInstace.toTextArea()
    easyMDEInstace = null
  }
})
</script>
<style>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>
