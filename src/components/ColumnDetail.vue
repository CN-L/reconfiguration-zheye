<template>
  <div>
    <pre>
      <!-- {{router}} -->
      {{ route }}
    </pre>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    return {
      router,
      route
    }
  }
})
</script>
