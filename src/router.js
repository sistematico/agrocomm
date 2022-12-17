export const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') },
  { path: '/', component: () => import('@/views/home.vue') },
  { path: '/sobre', component: () => import('@/views/sobre.vue') },
  { path: '/arroba-do-boi', component: () => import('@/views/arrobadoboi.vue') },
  { path: '/arroba-da-vaca', component: () => import('@/views/arrobadavaca.vue') },
  { path: '/milho', component: () => import('@/views/milho.vue') },
  { path: '/soja', component: () => import('@/views/soja.vue') },
  { path: '/:estado', component: () => import('@/views/estado.vue') },
  { path: '/arroba-do-boi/:estado', component: () => import('@/views/arrobadoboi.vue') },
  { path: '/arroba-da-vaca/:estado', component: () => import('@/views/arrobadavaca.vue') },
  { path: '/milho/:estado', component: () => import('@/views/milho.vue') },
  { path: '/soja/:estado', component: () => import('@/views/soja.vue') },
]
