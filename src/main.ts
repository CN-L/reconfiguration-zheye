import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from '@/router/index'
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
console.log(store.state.count)
store.commit('increment')
console.log(store.state.count)
const app = createApp(App)
// app.use(store)
app.use(router)
app.mount('#app')
