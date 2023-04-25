<template>
  <li class="drop-option" :class="{'is-disabled': disabled}">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup () {
    return {

    }
  }
})
</script>
<style>
.is-disabled.drop-option * {
  color: #6c757d;
  pointer-events: none;
  background: transparent;
}
</style>
