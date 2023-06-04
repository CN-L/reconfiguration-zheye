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
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/views/PostList.vue'
import { ColumnProps, GlobalDataProps } from '@/store/store'
import { generateFitUrl, addColumnAvatar } from '@/help'
import useLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const currentId = computed(() => {
      store.dispatch('fetchPosts', { cid: route.params.id, params: { pageSize: 3 } })
      return route.params.id
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId.value) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsByCid(currentId.value))
    const count = computed(() => store.getters.getPostsCountByCid(currentId.value))
    const currentPage = computed(() => store.getters.getPostsCurrentPageByCid(currentId.value))
    const { loadMorePage, isLastPage } = useLoadMore('fetchPosts', count, { currentPage: currentPage.value, cid: currentId.value })
    return {
      router,
      loadMorePage,
      isLastPage,
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
