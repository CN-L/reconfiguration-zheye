<template>
<div class="post-detail-page w-75 mx-auto">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { PostProps } from '@/store/store'
export default defineComponent({
  name: 'post-detail',
  setup () {
    const route = useRoute()
    const currentId = route.params.id
    const store = useStore()
    // const currentPost = computed(() => store.getters.currendPostDetail(currentId))
    // console.log(currentPost.value, '呜呜呜')
    onMounted(() => {
      // store.dispatch('fetchPost', route.params.id).then(res => {
      //   console.log(res, '结果')
      // })
    })
    return {
    }
  }
})
</script>
