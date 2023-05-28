<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <Loader v-if="isLoading"></Loader>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
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
    Loader,
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
</style>
