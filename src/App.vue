<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <Loader v-if="isLoading"></Loader>
    <Message v-if="error.status" :message="error.message" type="error"></Message>
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
import Message from './components/Message.vue'
export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
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
    Loader,
    Message,
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
</style>
