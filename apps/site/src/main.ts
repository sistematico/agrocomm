import '@/assets/scss/bootstrap.scss'
import { createApp } from 'vue'
import { router } from '@/router'
import Vue3Lottie from 'vue3-lottie'
import App from '@/app.vue'
import 'bootstrap'

createApp(App).use(router).use(Vue3Lottie).mount('#app')
