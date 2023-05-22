import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import store from '@/store/store'
import App from './App.vue'
import router from '@/router/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
