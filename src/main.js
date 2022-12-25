import './assets/scss/bootstrap.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import * as bootstrap from 'bootstrap'

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'text-decoration-underline'
})

createApp(App)
  .provide('appName', import.meta.env.VITE_APP_NAME)
  .provide('apiUrl', import.meta.env.VITE_API_URL)
  .use(router)  
  .mount('#app')
