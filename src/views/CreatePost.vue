<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <Uploader :uploaded="uploadData" @file-uploaded="handleFileUpload" :before-upload="uploadCheck" action="/upload" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
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
import { defineComponent, ref, onMounted } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store/store'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/help'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  setup () {
    const uploadData = ref()
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是JPG/PNG格式', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片只能是JPG/PNG格式', 'error')
      }
      return passed
    }
    let imageId = ''
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const handleFileUpload = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const titleVal = ref()
    const contentVal = ref()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            author: _id,
            title: titleVal.value,
            content: contentVal.value,
            column
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'updatePost' : 'createpost'
          const sendData = isEditMode
            ? {
                id: route.query.id,
                // url: upLoadedData.data.url
                payload: newPost
              }
            : newPost
          console.log(sendData, '结果')
          store.dispatch(actionName, sendData).then(res => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', route.query.id).then((rowData: ResponseType<PostProps>) => {
          const currentPost = rowData.data
          if (currentPost.image) {
            uploadData.value = { data: currentPost.image }
            contentVal.value = currentPost.content
            titleVal.value = currentPost.title
          }
        })
      }
    })
    return {
      titleVal,
      isEditMode,
      contentVal,
      uploadData,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck,
      Uploader,
      handleFileUpload
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
