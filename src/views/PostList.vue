<template>
   <div class="post-list">
    <article v-for="post in newList" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><router-link :to="`/posts/${post._id}`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image && typeof post.image !== 'string'" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps, ImageProps } from '@/store/store'
import { generateFitUrl, addColumnAvatar } from '@/help'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const newList = computed(() => {
      return props.list.map(item => {
        generateFitUrl(item.image as ImageProps, 200, 110, ['m_fill'])
        return item
      })
    })
    return {
      newList
    }
  }
})
</script>
