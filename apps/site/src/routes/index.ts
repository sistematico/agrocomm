export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  {
    path: '/cotacoes',
    component: () => import('@/views/prices.vue'),
    children: [
      {
        path: 'boi',
        name: 'Boi',
        component: () => import('@/views/prices.vue')
      },
      {
        path: 'vaca',
        name: 'Vaca',
        component: () => import('@/views/prices.vue')
      },
      {
        path: 'soja',
        name: 'Soja',
        component: () => import('@/views/prices.vue')
      },
      {
        path: 'milho',
        name: 'Milho',
        component: () => import('@/views/prices.vue')
      },
    ],
  },
  { path: '/entrar', name: 'Login', component: () => import('@/views/login.vue') },
  { path: '/cadastro', name: 'Register', component: () => import('@/views/register.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') },
]