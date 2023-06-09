// import { defineAsyncComponent } from 'vue'
import store from '@/store/store'
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { useUsers } from '@/store/user'
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
      meta: { requiredLogin: true },
      component: () => import('@/views/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: { requiredLogin: true },
      component: () => import('@/views/CreatePost.vue')
    },
    {
      path: '/signUp',
      name: 'SignUp',
      meta: { requiredLogin: false },
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/posts/:id',
      name: 'posts',
      meta: { requiredLogin: true },
      component: () => import('@/views/PostDetail.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/EditProfile.vue'),
      meta: {
        requiredLogin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // const { user, token } = store.state
  const userStore = useUsers()
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!userStore.isLogin) {
    if (userStore.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${userStore.token}`
      userStore.fetchCurrentUser().then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        userStore.loginOut()
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
