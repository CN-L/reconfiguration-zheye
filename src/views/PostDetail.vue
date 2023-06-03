<template>
<div class="post-detail-page w-100 mx-auto">
  <div class="post-detail-container">
    <div class="header-image-container text-center rounded">
        <img :src="imgInfo" alt="" class="rounded" />
      </div>
  </div>
  <div class="title-container mb-2 pb-2">
        <h2 class="mb-2">{{ currentPost?.title }}</h2>
    </div>
    <div v-if="currentPost.author && typeof currentPost.author === 'object'" class="user-profile mb-2 pb-4">
        <user-propfile
          :user="currentPost?.author"
          :createdAt="currentPost?.createdAt"
        ></user-propfile>
      </div>
      <div v-html="currentHtml"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link :to="{name: 'create', query: { id: currentPost._id}}" type="button" class="btn btn-success">编辑</router-link>
        <a  href="javascript:void(0)" @click="modalOpen = true" type="button" class="btn btn-danger">删除</a>
      </div>
      <modal @modal-close="modalClose" @modal-confirm="modalConfirm" title="提示" :visible="modalOpen">
        <p>确定要删除这篇文章吗</p>
      </modal>
</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PostProps, GlobalDataProps, UserProps, ResponseType } from '@/store/store'
import UserPropfile from '@/components/UserPropfile.vue'
import Modal from '@/components/Modal.vue'
import createMessage from '@/hooks/createMessage'
import { marked } from 'marked'
export default defineComponent({
  name: 'post-detail',
  components: {
    Modal,
    UserPropfile
  },
  setup () {
    const modalOpen = ref(false)
    const route = useRoute()
    const router = useRouter()
    const currentId = route.params.id
    const store = useStore<GlobalDataProps>()
    const currentPost = computed<PostProps>(() => store.state.currentPost)
    const imgInfo = ref()
    onMounted(() => {
      store.dispatch('fetchPost', currentId).then(post => {
        if (typeof post.data.image === 'object') {
          imgInfo.value = post.data.image.url || require('@/assets/column.jpg')
          console.log(imgInfo.value)
        }
      })
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      }
      return null
    })
    const currentHtml = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return marked.parse(currentPost.value.content)
      } else {
        return null
      }
    })
    // 关闭modal
    const modalClose = () => {
      modalOpen.value = false
    }
    // 删除操作
    const modalConfirm = () => {
      modalOpen.value = false
      store.dispatch('deletePost', currentId).then((resp: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => router.push({ name: 'column', params: { id: resp.data.column } }), 2000)
      })
    }
    return {
      imgInfo,
      modalOpen,
      modalClose,
      modalConfirm,
      showEditArea,
      currentHtml,
      currentPost
    }
  }
})
</script>
<style scoped>
.post-detail-page .header-image-container {
  height: 210px;
  margin-bottom: 20px;
}
.post-detail-page .header-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
