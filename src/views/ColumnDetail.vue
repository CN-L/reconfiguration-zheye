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
    <!-- <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/views/PostList.vue'
import { ColumnProps } from '@/store/store'
import { generateFitUrl } from '@/help'
// import useLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentId = computed(() => {
      // store.dispatch('fetchColumn', route.params.id)
      store.dispatch('fetchPosts', route.params.id)
      return route.params.id
    })
    // onMounted(() => {
    //   store.dispatch('fetchColumn', currentId.value)
    //   store.dispatch('fetchPosts', currentId.value)
    // })

    const column = computed(() => {
      const storeNew = store.getters.getColumnById(currentId.value) as ColumnProps
      if (storeNew) {
        generateFitUrl(storeNew, 100, 100)
      }
      return storeNew
    })
    // const total = computed(() => store.state.columns.total)
    // const currentPage = computed(() => store.state.columns.currentPage)
    // const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, { pageSize: 3, currentPage: (currentPage.value ? currentPage.value + 1 : 2) })
    const list = computed(() => store.getters.getPostsByCid(currentId.value))
    console.log(list, 'list')
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
