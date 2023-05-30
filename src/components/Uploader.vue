<template>
  <div class="file-upload">
    <button @click="triggerUpload" class="btn btn-primary">
     <span v-if="fileStatus === 'loading'">正在上传...</span>
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
      const files = target.files
      if (files) {
        fileStatus.value = 'loading'
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
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
