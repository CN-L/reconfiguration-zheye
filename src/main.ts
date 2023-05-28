import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import store from '@/store/store'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios'
// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
// Add a request interceptor
const icode = '4CB97C9D7FB84B63'
axios.interceptors.request.use(function (config) {
  store.commit('setLoading', true)
  config.params = { ...config.params, icode }
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    config.data = { ...config.data, icode }
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
})
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
