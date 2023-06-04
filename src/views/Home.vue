<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="" class="w-50">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link :to="{name: 'create'}" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    {{ list.length }}
    <ColumnList :list="list"></ColumnList>
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
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/store'
import Uploader from '@/components/Uploader.vue'
import useLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  name: 'homeView',
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.getters.getColumns)
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, { pageSize: 3, currentPage: (currentPage.value ? currentPage.value + 1 : 2) })
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 3 })
    })
    return {
      list,
      isLastPage,
      loadMorePage
    }
  },
  components: {
    Uploader,
    ColumnList
  }
})
</script>
