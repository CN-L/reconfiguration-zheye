<template>
  <div class="home-page">
    <Uploader action="/upload"></Uploader>
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
    <ColumnList :list="list"></ColumnList>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/store'
import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  name: 'homeView',
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    return {
      list
    }
  },
  components: {
    Uploader,
    ColumnList
  }
})
</script>
