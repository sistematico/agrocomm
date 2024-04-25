export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/boi', name: 'Quotes', component: () => import('@/views/quotes/boi.vue') },
  { path: '/vaca', name: 'Vaca', component: () => import('@/views/quotes/vaca.vue') },
  { path: '/soja', name: 'Soja', component: () => import('@/views/quotes/soja.vue') },
  { path: '/milho', name: 'Milho', component: () => import('@/views/quotes/milho.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') },
  {
    path: '/auth',
    children: [
      { path: 'signin', component: () => import('@/views/auth/signin.vue') },
      { path: 'signup', component: () => import('@/views/auth/signup.vue') },
    ],
  },
]