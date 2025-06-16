import '@/assets/main.css'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
const queryClient = new QueryClient()

app.use(VueQueryPlugin, { queryClient })

app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: true,
  closeButton: false,
  transition: 'Vue-Toastification__fade',
})

app.mount('#app')
