import '@/assets/scss/main.scss'
import { createApp } from 'vue'
import { router } from '@/router'
import { useAuthStore } from '@/store'
// import Vue3Lottie from 'vue3-lottie'
import App from '@/app.vue'
import 'bootstrap'

startApp()

async function startApp () {
  const app = createApp(App)
  app.use(router)

  try {
    await useAuthStore.refresh()
  } catch(e) {
    console.error(e)
  }

  app.mount('#app')
}

// createApp(App).use(router).use(Vue3Lottie).mount('#app')
