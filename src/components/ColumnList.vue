<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in ColumnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img class="rounded-circle border border-light my-3" :src="column.avatar?.url" :alt="column.title">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="{name: 'column', params: { id: column._id}}" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
</div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store/store'
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const ColumnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/colmun.webp')
          }
        } else {
          item = {
            ...item,
            avatar: {
              ...item.avatar,
              url: item.avatar.url + '?x-oss-process=image/resize,m_fixed,h_50,w_50'
            }
          }
        }
        return item
      })
    })
    return {
      ColumnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
