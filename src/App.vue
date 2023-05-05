<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
export default defineComponent({
  name: 'App',
  setup () {
    const emailVal = ref('123456@163.com')
    const passWord = ref('123456789l')

    const currentUser: UserProps = {
      id: 1,
      name: 'viking',
      isLogin: true
    }
    return {
      currentUser,
      emailVal,
      passWord

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
