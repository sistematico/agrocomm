import './assets/scss/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import * as bootstrap from 'bootstrap'
import Alert from './components/alert.vue'

const appName = import.meta.env.VITE_APP_NAME
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'text-decoration-underline'
})

createApp(App)
  .provide('appName', appName)
  .provide('apiUrl', import.meta.env.VITE_API_URL)
  .use(pinia)
  .use(router)  
  .component('Alert', Alert)
  .mount('#app')

router.afterEach((to, from) => {
  document.title = `${appName} - ${to.meta.title}` || appName
})














