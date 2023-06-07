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
import { defineComponent, computed, onMounted, watch } from 'vue'
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
      store.dispatch('fetchColumns', route.params.id)
      store.dispatch('fetchPosts', { cid: route.params.id, params: { pageSize: 3 } })
      return route.params.id
    })
    const column = computed(() => {
      store.dispatch('userColumnsDetail', store.state.user.column)
      const selectColumn = store.getters.getColumnById(currentId.value) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    // watch(()=> route.params, (params) => {
    //   const jumpId = params && params.id
    //   const column = store.state.user.column
    //   if (jumpId && column && (jumpId === column)) {
    //     // 重新发送请求，在 store 中有对应的缓存设置
    //     store.dispatch('fetchColumn', jumpId)
    //     store.dispatch('fetchPosts', { cid: jumpId })
    //     // 重新赋值，这样 computed 会变化
    //     currentId.value = params.id
    //   }
    // })
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
