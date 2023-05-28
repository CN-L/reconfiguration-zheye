<template>
  <div :style="{backgroundColor: background || ''}" class="d-flex justify-content-center align-items-center h-100 w-100 loading-container">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || 'loading' }}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-loader',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    return {

    }
  }
})
</script>
<style>
.loading-container {
  background-color: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* right: 0;
  bottom: 0; */
}
.loading-container {
  text-align: center;
}
</style>
