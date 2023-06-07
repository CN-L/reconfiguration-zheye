<template>
  <div>
    <ul class="nav nav-tabs">
      <li @click="changeTabs('profile')" class="nav-item">
        <a :class="['nav-link', activeIndex === 'profile' ? 'active' : '']" href="#">更新个人资料</a>
      </li>
      <li  @click="changeTabs('column')" class="nav-item">
        <a :class="['nav-link', activeIndex === 'column' ? 'active' : '']" href="#">更新专栏信息</a>
      </li>
    </ul>
    <h4 class="mt-5">{{ activeIndex === 'profile' ? '编辑个人资料' : '编辑专栏信息' }}</h4>
      <div class="bg-secondary-subtle d-flex flex-column justify-content-center mx-auto align-items-center my-4 custome-class">
        <Uploader :uploaded="avatarImgInfo" @file-uploaded="successUpload" class="text-secondary" :before-upload="checkUpload" action="/upload">
          <h5>点击上传头像</h5>
          <template #loading>
            <div class="d-flex">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only"></span>
              </div>
              <h5>正在上传</h5>
            </div>
          </template>
          <template #uploaded="{ upLoadedData }">
              <img :src="upLoadedData?.data?.url" alt="">
          </template>
        </Uploader>
      </div>
      <ValidateForm ref="formRef" class="mt-3" @form-submit="submitClick">
        <ValidateInput v-model="nickName" :rules="nickNameRules" class="mb-3" placeholder="名称（2～8个字符）"></ValidateInput>
        <ValidateInput v-model="description" :rules="descriptionRules" class="mb-3" tag="textarea" placeholder="简介信息"></ValidateInput>
        <template #submit>
          <button type="submit" class="btn btn-primary">{{ activeIndex === "profile" ? '更新资料' : '提交修改' }}</button>
        </template>
      </ValidateForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/hooks/createMessage'
import { beforeUploadCheck } from '@/help'
import { useRouter } from 'vue-router'
import { GlobalDataProps, ResponseType, ImageProps } from '@/store/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
type TabType = 'profile' | 'column'
const router = useRouter()
const activeIndex = ref<TabType>('profile')
const store = useStore<GlobalDataProps>()
const storeInfo = computed(() => store.state.user)
const columnDetail = ref()
const formRef = ref()
const checkUpload = (file: File) => {
  const { passed, error } = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 2 })
  if (!passed && error === 'size') {
    createMessage('图片太大，请上传低2MB的图片', 'error', 2000)
  } else if (!passed && error === 'format') {
    (
      createMessage('图片格式不正确，只能上传png、JPG、JPEG图片', 'error', 2000)
    )
  }
  return passed
}
const submitClick = (info: boolean) => {
  if (info) {
    const api = activeIndex.value === 'profile' ? 'updatePersonal' : 'updateMyPost'
    const form = {
      ...(activeIndex.value === 'profile' ? storeInfo.value : columnDetail.value),
      nickName: nickName.value,
      description: description.value,
      avatar: avatarImgInfo.value.data?.id || ''
    }
    const id = activeIndex.value === 'profile' ? storeInfo.value._id : storeInfo.value.column
    store.dispatch(api, { id, data: form }).then(res => {
      createMessage('更新成功，两秒后将跳转首页', 'success', 2000)
      setTimeout(() => router.push('/'), 2000)
    }).catch((error) => {
      console.log(error.data)
    })
  }
}
const avatarImgInfo = ref()
const nickName = ref()
const description = ref()
// 个人信息验证规则
const nickNameRules: RulesProp = [
  { type: 'required', message: '请输入名称' },
  { type: 'range', max: { length: 8, message: '最长8个字符' }, min: { length: 2, message: '最低2个字符' } }
]
const descriptionRules: RulesProp = [{ type: 'required', message: '请输入简介' }]
const changeTabs = (index: TabType) => {
  if (formRef.value) {
    formRef.value.clearInputs()
  }
  activeIndex.value = index
  if (activeIndex.value === 'profile') {
    avatarImgInfo.value = {
      data: {
        url: storeInfo.value?.avatar?.url || ''
      }
    }
    nickName.value = storeInfo.value.nickName
    description.value = storeInfo.value.description
  } else if (activeIndex.value === 'column') {
    avatarImgInfo.value = {
      data: {
        url: columnDetail.value.avatar?.url
      }
    }
    nickName.value = columnDetail.value.title
    description.value = columnDetail.value.description
  }
}
// 上传成功
const successUpload = (rawData: ResponseType<ImageProps>) => {
  avatarImgInfo.value.data.url = rawData.data.url
  avatarImgInfo.value.data.id = rawData.data._id
}
// 更新专栏信息
onMounted(async () => {
  await store.dispatch('userColumnsDetail', store.state.user.column)
  const column = computed(() => store.state.columnsDetail)
  columnDetail.value = toRefs(column.value)
  changeTabs('profile')
})
</script>

<style scoped>
.custome-class {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.custome-class img {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
.nav-link.active {
  color: #0d6efd;
}
.nav-link {
  color: #000;
}
</style>
