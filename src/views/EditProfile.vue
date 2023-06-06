<template>
  <div>
    <ul class="nav nav-tabs">
    <li @click="changeTabs(0)" class="nav-item">
      <a :class="['nav-link', activeIndex === 0 ? 'active' : '']" href="#">更新个人资料</a>
    </li>
    <li  @click="changeTabs(1)" class="nav-item">
      <a :class="['nav-link', activeIndex === 1 ? 'active' : '']" href="#">更新专栏信息</a>
    </li>
  </ul>
  <h4 class="mt-5">{{ activeIndex === 0 ? '编辑个人资料' : '编辑专栏信息' }}</h4>
  <div>
    <Uploader action="/upload">
      <img src="" class="img-fluid" alt="...">
    </Uploader>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import Uploader from '@/components/Uploader.vue'
const activeIndex = ref(0)
const changeTabs = (index: number) => {
  activeIndex.value = index * 1
}
</script>

<style scoped>
.nav-link.active {
  color: #0d6efd;
}
.nav-link {
  color: #000;
}
</style>
