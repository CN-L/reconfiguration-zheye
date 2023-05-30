<template>
<div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
import { ColumnProps } from '@/store/store'
import { generateFitUrl } from '@/help'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => {
      const storeNew = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (storeNew) {
        generateFitUrl(storeNew, 100, 100)
      }
      return storeNew
    })
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      router,
      route,
      column,
      list
    }
  },
  components: {
    PostList
  }
})
</script>
