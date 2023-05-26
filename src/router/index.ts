// import { defineAsyncComponent } from 'vue'
import store from '@/store/store'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { redirectAleadyLogin: true },
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/views/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: { requiredLogin: true },
      component: () => import('@/views/CreatePost.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAleadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
