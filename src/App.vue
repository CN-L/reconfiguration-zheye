<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <!-- <Vnode1 msg="我是你爹"></Vnode1> -->
    <Transition name="fade">
      <router-view></router-view>
    </Transition>
    <GlobalFooter></GlobalFooter>
    <!-- <button class="keyframs1" @click="cut = ! cut">点击过渡动画</button>
    <div :class=" { transtion1: true, transtion2: cut}">测试数据transtion</div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store/store'
import createdMessage from '@/hooks/createMessage'
import Vnode1 from '@/components/Vnode'
export default defineComponent({
  name: 'App',
  setup () {
    const cut = ref(true)
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createdMessage(message, 'error')
      }
    })
    return {
      cut,
      error,
      currentUser,
      isLoading
    }
  },
  components: {
    Vnode1,
    Loader,
    GlobalHeader,
    GlobalFooter
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(25px, -10px)
}
/* 测试过渡动画代码 */
.transtion1 {
 transform: translateX(-80px);
 opacity: 0;
 transition: all 0.5s linear;
}
.transtion2 {
  opacity: 1;
  transform: translateX(0);
}
.keyframs1 {
  animation: yu 0.5s linear;
}
/* 测试keyframs动画 */
@keyframes yu {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
