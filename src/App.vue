<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <Vnode1 msg="我是你爹"></Vnode1>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import axios from 'axios'
import { GlobalDataProps } from './store/store'
import createdMessage from '@/hooks/createMessage'
import Vnode1 from '@/components/Vnode'
export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createdMessage(message, 'error')
      }
    })
    onMounted(() => {
      const message = createdMessage('check me', 'success')
      setTimeout(() => {
        message.destory()
      }, 2000)
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      error,
      currentUser,
      isLoading
    }
  },
  components: {
    Vnode1,
    Loader,
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
</style>
