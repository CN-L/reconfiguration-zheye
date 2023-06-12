<template>
  {{ storeTest.doubleCount }}-{{ storeTest.doubleCountPlusOne }}
  {{ selectColumn }}
  <div class="container">
    <h2>{{ storeTest.getDataById('123') }}</h2>
    <h1>{{ storeTest.data }}-{{ storeTest.total }}你说</h1>
    <h3>{{ getDataById('123') }}</h3>
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <!-- <Vnode1 msg="我是你爹"></Vnode1> -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <GlobalFooter></GlobalFooter>
    <button @click="updateStore">更新pinia</button>
    <!-- <button class="keyframs1" @click="cut = ! cut">点击过渡动画</button>
    <div :class=" { transtion1: true, transtion2: cut}">测试数据transtion</div> -->
  </div>
</template>

<script lang="ts">
import { useTestStore } from '@/store/piniaTest'
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store/store'
import createdMessage from '@/hooks/createMessage'
import Vnode1 from '@/components/Vnode'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { testPosts } from './testData'
export default defineComponent({
  name: 'App',
  setup () {
    const cut = ref(true)
    const storeTest = useTestStore()
    // 将state结构后变成响应式对象
    const { data, getDataById } = storeToRefs(storeTest)
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createdMessage(message, 'error', 2000)
      }
    })

    // pinia
    const updateStore = () => {
      const data1 = storeTest.fetchColumns()
      console.log(data1)
      // storeTest.data.push({
      //   _id: '123',
      //   title: '你说啥',
      //   description: '我说我说你真的爱我'
      // })
      // storeTest.total++
      // storeTest.$patch((state) => {
      //   state.data.push({
      //     _id: '123',
      //     title: '你说啥',
      //     description: '我说我说你真的爱我'
      //   })
      // storeTest.total = 20
      // })
      // storeTest.$patch({ total: 24 }
      // storeTest.$reset() // 重置
      // 订阅
      // storeTest.$subscribe((mutation, state) => {
      //   console.log('sub', mutation, state)
      // })
      // storeTest.$patch({
      //   data: [],
      //   total: 20
      // })
    }
    storeTest.increaseTotal()
    const selectColumn = computed(() => storeTest.getDataById('123'))
    return {
      data,
      cut,
      error,
      currentUser,
      storeTest,
      getDataById, // 取值方式1
      updateStore,
      selectColumn,
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

<style scoped>
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
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
