<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="login" class="navbar-brand">小亮专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="login" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${user.name}`">
        <DropdownItem>
          <a href="#" class="dropdown-item">新建文章</a>
        </DropdownItem>
        <DropdownItem>
          <a href="#" class="dropdown-item">编辑资料</a>
        </DropdownItem>
        <DropdownItem>
          <a href="#" class="dropdown-item">退出登陆</a>
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
export interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number
}
export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    return {
    }
  },
  components: {
    Dropdown,
    DropdownItem
  }
})
</script>
