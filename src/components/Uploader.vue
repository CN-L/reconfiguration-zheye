<template>
  <div class="file-upload">
    <div class="file-upload-container" @click="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :upLoadedData="upLoadedData">
        <button class="btn btn-primary" disabled>上传成功</button>
      </slot>
      <slot v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input @change="handleFileChage" class="file-input d-none" ref="fileInput" type="file">
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, PropType, watch } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'error' | 'success'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'u-ploader',
  emits: ['file-uploaded', 'file-uploaded-error'],
  inheritAttrs: false, // 不在根节点继承属性
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    watch(() => props.uploaded, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        upLoadedData.value = newValue
      }
    }, { immediate: true })
    const upLoadedData = ref()
    const handleFileChage = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        const files = Array.from(target.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return false
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          fileStatus.value = 'success'
          upLoadedData.value = resp.data
          emit('file-uploaded', resp.data)
        }).catch(error => {
          fileStatus.value = 'error'
          emit('file-uploaded-error', error)
        }).finally(() => {
          // 上传后进行value清空
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      triggerUpload,
      handleFileChage,
      upLoadedData,
      fileInput,
      fileStatus
    }
  }
})
</script>
