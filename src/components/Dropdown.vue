<template>
   <div class="dropdown">
      <a @click="toggleOpen" class="btn btn-outline-light my-2 dropdown-toggle">
        {{ title }}
      </a>
      <ul class="dropdown-menu" v-if="isOpen" :style="{ display: 'block' }" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">新建文章</a></li>
        <li><a class="dropdown-item" href="#">编辑资料</a></li>
      </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'dropDown',
  props: {
    title: {
      type: String as PropType<string>

    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>
