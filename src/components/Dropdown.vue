<template>
   <div ref="dropdownRef" class="dropdown">
      <a @click="toggleOpen" class="btn btn-outline-light my-2 dropdown-toggle">
        {{ title }}
      </a>
      <ul class="dropdown-menu" v-if="isOpen" :style="{ display: 'block' }" aria-labelledby="dropdownMenuButton1">
        <slot></slot>
      </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
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
    const dropdownRef = ref<HTMLElement | null>(null) // 联合类型
    const isClickOutside = useClickOutside(dropdownRef)
    // 监听是否点击到了指定元素外
    watch(isClickOutside, (newVal) => {
      if (newVal && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef,
      isClickOutside
    }
  }
})
</script>
