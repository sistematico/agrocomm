export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/cotacoes', alias: ['/boi', '/vaca', '/soja', '/milho'], name: 'Prices', component: () => import('@/views/prices.vue') },
  { path: '/entrar', name: 'Login', component: () => import('@/views/login.vue') },
  { path: '/cadastro', name: 'Register', component: () => import('@/views/register.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') },
]