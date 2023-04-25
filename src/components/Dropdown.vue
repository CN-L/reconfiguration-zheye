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
import { defineComponent, PropType, ref, onMounted, onUnmounted } from 'vue'

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
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // 类型断言e.target是个htmlElement类型
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
