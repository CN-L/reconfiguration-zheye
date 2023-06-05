<template>
  <nav class="navbar navbar-dark sticky-top justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">小亮专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/setup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${user.nickName}`">
        <DropdownItem>
          <router-link class="dropdown-item" :to="{name: 'create'}">新建文章</router-link>
        </DropdownItem>
        <DropdownItem>
          <router-link class="dropdown-item" :to="{ name: 'column', params: {id: user.column}}">我的专栏</router-link>
        </DropdownItem>
        <DropdownItem>
          <a href="#" class="dropdown-item">编辑资料</a>
        </DropdownItem>
        <DropdownItem>
          <a href="#" @click="setOut" class="dropdown-item">退出登陆</a>
        </DropdownItem>

      </Dropdown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { UserProps } from '@/store/store'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const setOut = () => {
      store.commit('loginOut')
      router.push({ name: 'login' })
    }
    return {
      setOut
    }
  },
  components: {
    Dropdown,
    DropdownItem
  }
})
</script>
<style scoped>
.navbar {
  background: linear-gradient(to right, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
}
</style>
