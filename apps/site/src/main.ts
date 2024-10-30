import '@/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from '@/app.vue'
// import { useAuthStore } from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)  

startApp()

async function startApp () {
  const pinia = createPinia()
  const app = createApp(App)
  
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(pinia)
  app.use(router)

  // try {
  //   await useAuthStore.refresh()
  // } catch(e) {
  //   console.error(e)
  // }

  app.mount('#app')
}






