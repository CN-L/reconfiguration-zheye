<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser

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
