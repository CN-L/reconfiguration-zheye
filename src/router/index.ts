import { defineAsyncComponent } from 'vue'
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
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/components/ColumnDetail.vue')
    }
  ]
})
export default router
