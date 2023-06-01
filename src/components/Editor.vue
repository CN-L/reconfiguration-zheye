<template>
  <div class="vue-easymde-editor">
    <textarea placeholder="请输入文章详情" id="my-text-area"></textarea>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, defineEmits, ref, defineProps, onUnmounted, defineExpose } from 'vue'
import EasyMDE, { Options } from 'easymde'
import Vnode from './Vnode'
interface EditorProps {
  modeValue?: string;
  options?: Options
}
interface EditorEvents {
  (type: 'update:modalValue', value: string): void,
  (type: 'change', value: string): void,
  (type: 'blur', value?: string): void
}
const props = defineProps<EditorProps>() // 定义props的值
const emit = defineEmits<EditorEvents>() // 定义emits
let easyMDEInstace: EasyMDE | null = null
const innerValue = ref(props.modeValue || '')
onMounted(() => {
  const vNode = document.getElementById('my-text-area') as HTMLTextAreaElement
  if (vNode) {
    const config:Options = {
      ...(props.options || {}),
      element: vNode,
      initialValue: innerValue.value
    }
    easyMDEInstace = new EasyMDE(config)
    easyMDEInstace.codemirror.on('change', () => {
      if (easyMDEInstace) {
        const updateValue = easyMDEInstace.value()
        innerValue.value = updateValue
        emit('update:modalValue', updateValue)
        emit('change', updateValue)
      }
    })
    easyMDEInstace.codemirror.on('blur', () => {
      if (easyMDEInstace) {
        emit('blur')
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
