<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <input type="file" name="file">
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
import { GlobalDataProps, PostProps } from '@/store/store'
import axios from 'axios'
export default defineComponent({
  setup () {
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
    const handleFileChage = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit
    }
  },
  components: {
    ValidateForm,
    ValidateInput
  }
})
</script>
