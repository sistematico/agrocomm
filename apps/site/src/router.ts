import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()
  // const publicPages = ['/', '/entrar', '/cadastro', '/recuperar']
  // const authRequired = !publicPages.includes(to.path)

  if (to.name !== 'Login' && to.meta.requiresAuth === true && !authStore.user) {
    next({ name: 'Login', query: { return: to.path } })
  } else {
    next()
  }
})

export { router }