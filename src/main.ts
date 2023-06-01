import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import store from '@/store/store'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios'
// 深色模式
import Darkmode from 'darkmode-js'
import 'easymde/dist/easymde.min.css' // css文件
const options = {
  bottom: '64px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#100f2c', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options)
darkmode.showWidget()

// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
// Add a request interceptor
const icode = '4CB97C9D7FB84B63'
axios.interceptors.request.use(function (config) {
  store.commit('setLoading', true)
  store.commit('setError', { status: true, message: '' })
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
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
