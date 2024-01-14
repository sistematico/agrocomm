import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import '@/assets/scss/tailwind.scss'
import App from '@/app.vue'

const router = createRouter({ history: createWebHistory(), routes })
const app = createApp(App)

app.use(router)
app.mount('#app')
