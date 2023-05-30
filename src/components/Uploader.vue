<template>
  <div class="file-upload">
    <button @click="triggerUpload" class="btn btn-primary">
     <span v-if="fileStatus === 'loading'">正在上传...</span>
     <span v-else-if="fileStatus === 'success'">上传成功</span>
     <span v-else>点击上传</span>
    </button>
    <input @change="handleFileChage" class="file-input d-none" ref="fileInput" type="file">
  </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'error' | 'success'
export default defineComponent({
  name: 'u-ploader',
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChage = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        fileStatus.value = 'loading'
        const files = Array.from(target.files)
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          fileStatus.value = 'success'
        }).catch(erro => {
          fileStatus.value = 'error'
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
      fileInput,
      fileStatus
    }
  }
})
</script>
