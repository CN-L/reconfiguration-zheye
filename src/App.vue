<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <h1 v-if="isLoading">正在读取中...</h1>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    }
  },
  components: {
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
</style>
