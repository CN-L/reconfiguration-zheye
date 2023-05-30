// import { defineAsyncComponent } from 'vue'
import store from '@/store/store'
import axios from 'axios'
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
    },
    {
      path: '/setup',
      name: 'setUp',
      meta: { requiredLogin: false },
      component: () => import('@/views/Setup.vue')
    },
    {
      path: '/posts/:id',
      name: 'posts',
      meta: { requiredLogin: true },
      component: () => import('@/views/PostDetail.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('loginOut')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
