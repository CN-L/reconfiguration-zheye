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
</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { PostProps, GlobalDataProps } from '@/store/store'
import UserPropfile from '@/components/UserPropfile.vue'
import MarkdownIt from 'markdown-it'
export default defineComponent({
  name: 'post-detail',
  components: {
    UserPropfile
  },
  setup () {
    const route = useRoute()
    const markdwon = MarkdownIt()
    const currentId = route.params.id
    const store = useStore<GlobalDataProps>()
    const currentPost = computed<PostProps>(() => store.state.currentPost)
    const imgInfo = ref()
    const currentHtml = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        console.log(currentPost.value.content)
        return markdwon.render(currentPost.value.content)
      } else {
        return null
      }
    })
    onMounted(() => {
      store.dispatch('fetchPost', currentId).then(post => {
        if (typeof post.data.image === 'object') {
          imgInfo.value = post.data.image.url || require('@/assets/column.jpg')
          console.log(imgInfo.value)
        }
      })
    })
    return {
      imgInfo,
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
