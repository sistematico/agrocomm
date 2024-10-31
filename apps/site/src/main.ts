import '@/styles/main.scss'
import 'notivue/notification.css'
import 'notivue/animations.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { createNotivue } from 'notivue'
import App from '@/app.vue'
import { useAuthStore, usePriceStore } from '@/stores'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { states } from '@/utils'

library.add(fas, far, fab)  

startApp()

async function startApp () {
  const subdomain = window.location.host.split('.')[0]
  const pinia = createPinia()
  const notivue = createNotivue({
    position: 'top-right',
    limit: 4,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 10000
      }
    }
  })
  const app = createApp(App)
  
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(pinia)
  app.use(router)

  try {
    await useAuthStore().start()

    if (subdomain && states.some(e => e.abbr === subdomain.toUpperCase())) {
      usePriceStore().start(subdomain.toUpperCase())
    }
  } catch(e) {
    console.error('Erro ao inicializar store:', e)
  }

  app.use(notivue)
  app.mount('#app')
}