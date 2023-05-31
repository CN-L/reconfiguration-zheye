<template>
  <div class="d-flex align-items-center p-3 bg-opacity-10 border-top border-bottom border-grey border-start-0">
    <div class="col-2 text-center">
      <img :src="newUser?.avatar?.fitUrl" class="rounded-circle border w-50 img-thumbnail" />
    </div>
    <div class="col-7">
      <h6>{{ newUser?.nickName }}</h6>
      <span class="text-truncate text-muted d-block" v-if="newUser?.description">
        {{ newUser.description }}
      </span>
    </div>
    <div class="col-3">
      <em>Publish at {{ createdAt }}</em>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { UserProps } from '@/store/store'
export default defineComponent({
  props: {
    user: {} as PropType<UserProps>,
    createdAt: String
  },
  setup (props) {
    const newUser = ref(props.user)
    if (newUser.value?.avatar) {
      newUser.value.avatar.fitUrl = newUser.value.avatar.url
    } else {
      newUser.value = {
        ...newUser.value as UserProps,
        avatar: {
          fitUrl: require('@/assets/avatar.jpg')
        }
      }
    }
    console.log(newUser.value, '你说啥')
    return {
      newUser
    }
  }
})
</script>
