<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader action="/upload" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="{ upLoadedData }">
        <img :src="upLoadedData.data.url" alt="">
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">文章标题：</label>
        <ValidateInput :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text"></ValidateInput>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">文章详情：</label>
        <ValidateInput rows="10" cols="100" :rules="contentRules" v-model="contentVal" placeholder="请输入文章详情" tag="textarea"></ValidateInput>
      </div>
    </ValidateForm>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store/store'
import Uploader from '@/components/Uploader.vue'
import axios from 'axios'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  setup () {
    const beforeUpload = (file: File) => {
      const allowType = ['image/jpeg', 'image/png']
      if (!allowType.includes(file.type)) {
        createMessage('仅支持png和jpg图片上传', 'error', 2000)
        return false
      }
      return true
    }
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const titleVal = ref()
    const contentVal = ref()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column: column.toString(),
            createdAt: new Date().toLocaleDateString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      Uploader
    }
  },
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
