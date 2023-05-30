<template>
  <div class="file-upload">
    <button @click="triggerUpload" class="btn btn-primary">点击上传</button>
    <input class="file-input d-none" ref="fileInput" type="file">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'u-ploader',
  setup () {
    const fileInput = ref<HTMLInputElement | null>(null)
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    return {
      triggerUpload,
      fileInput
    }
  }
})
</script>
