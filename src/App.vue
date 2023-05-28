<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <Loader v-if="isLoading"></Loader>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import axios from 'axios'
import { GlobalDataProps } from './store/store'
export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading
    }
  },
  components: {
    Loader,
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
</style>
