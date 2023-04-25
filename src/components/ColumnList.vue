<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number,
  title: string,
  avatar: string,
  description: string
}
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup () {
    return {

    }
  }
})
</script>
