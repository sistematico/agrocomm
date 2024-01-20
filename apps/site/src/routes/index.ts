export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/agricultura', name: 'Agricultura', component: () => import('@/views/agricultura.vue') },
  { path: '/pecuaria', name: 'Pecuaria', component: () => import('@/views/pecuaria.vue') },
  { path: '/table', name: 'Table', component: () => import('@/views/table.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') }
]
