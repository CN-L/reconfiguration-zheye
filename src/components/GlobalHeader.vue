<template>
  <nav class="navbar navbar-dark justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">小亮专栏</router-link>
    <ul v-if="!isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signUp" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${data?.nickName}`">
        <DropdownItem>
          <router-link class="dropdown-item" :to="{name: 'create'}">新建文章</router-link>
        </DropdownItem>
        <DropdownItem>
          <router-link class="dropdown-item" :to="{ name: 'column', params: {id: data?.column}}">我的专栏</router-link>
        </DropdownItem>
        <DropdownItem>
          <router-link class="dropdown-item" :to="{ name: 'edit'}">编辑资料</router-link>
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
import { useRouter } from 'vue-router'
import { useUsers, UserProps } from '@/store/user'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  props: {
    isLogin: {
      type: Boolean,
      required: true,
      default: false
    },
    data: {
      type: Object as PropType<UserProps | null>,
      required: true
    }
  },
  setup () {
    const useUserStore = useUsers()
    const router = useRouter()
    const setOut = () => {
      useUserStore.loginOut()
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
