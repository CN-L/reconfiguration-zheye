<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <home></home>
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
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
    Login,
    Home
  }
})
</script>

<style>
</style>
