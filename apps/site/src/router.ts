import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  const publicPages = ['/', '/entrar', '/cadastro', '/recuperar']
  const authRequired = !publicPages.includes(to.path)
 
  // if (states.some(e => e.abbr === subdomain.toUpperCase())) {
  //   next({ name: 'PricesByState', params: { state: subdomain.toUpperCase() } })
  // } else if (to.name !== 'Login' && !isAuthenticated) {
  //   next({ name: 'Login' }) 
  // } else {
  //   next()
  // }

  if (authRequired && !authStore.user) {
    next({ path: '/entrar', query: { return: to.path } })
  } else {
    next()
  } 
})

export { router }