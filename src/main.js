import './assets/scss/bootstrap.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import * as bootstrap from 'bootstrap'


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'text-decoration-underline'
})

createApp(App)
  .provide('appName', import.meta.env.VITE_APP_NAME)
  .use(router)  
  .mount('#app')
