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
import { useColumnStore } from '@/store/column'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/views/PostList.vue'
import { GlobalDataProps } from '@/store/store'
import { useUsers } from '@/store/user'
import { generateFitUrl, addColumnAvatar } from '@/help'
import { usePostStore } from '@/store/post'
import useLoadMore from '@/hooks/useLoadMore2'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const columnStore = useColumnStore()
    const postStore = usePostStore()
    const userStore = useUsers()
    const router = useRouter()
    const route = useRoute()
    const currentId = computed(() => {
      columnStore.fetchColumn((route.params.id) as string)
      postStore.fetchPosts({ cid: (route.params.id) as string })
      return route.params.id
    })
    const column = computed(() => {
      store.dispatch('userColumnsDetail', store.state.user.column)
      const selectColumn = columnStore.getColumnById(currentId.value as string)
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => postStore.getPostsByCid(currentId.value as string))
    const count = computed(() => postStore.getPostsCountByCid(currentId.value as string))
    const currentPage = computed(() => postStore.getPostsCurrentPageByCid(currentId.value as string))
    const { loadMorePage, isLastPage } = useLoadMore(postStore, 'fetchPosts', { total: count, currentPage: currentPage, cid: currentId.value })
    return {
      count,
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
