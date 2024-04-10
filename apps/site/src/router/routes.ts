export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/boi', name: 'Boi', component: () => import('@/views/boi.vue') },
  { path: '/vaca', name: 'Vaca', component: () => import('@/views/vaca.vue') },
  { path: '/soja', name: 'Soja', component: () => import('@/views/soja.vue') },
  { path: '/milho', name: 'Milho', component: () => import('@/views/milho.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') },
]