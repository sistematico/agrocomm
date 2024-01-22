export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  //{ path: '/agricultura', name: 'Agricultura', component: () => import('@/views/agricultura/index.vue') },
  {
    path: '/agricultura',
    children: [
      {
        path: '',
        name: 'Agricultura',
        component: () => import('@/views/agricultura/index.vue'),
      },
      {
        path: 'soja',
        name: 'Soja',
        component: () => import('@/views/agricultura/soja.vue'),
      },
      {
        path: 'milho',
        name: 'Milho',
        component: () => import('@/views/agricultura/milho.vue'),
      },
    ],
  },
  {
    path: '/pecuaria',
    children: [
      {
        path: '',
        name: 'Pecuaria',
        component: () => import('@/views/pecuaria/index.vue'),
      },
      {
        path: 'boi',
        name: 'Boi',
        component: () => import('@/views/pecuaria/boi.vue'),
      },
      {
        path: 'vaca',
        name: 'vaca',
        component: () => import('@/views/pecuaria/vaca.vue'),
      },
    ],
  },
  { path: '/contato', name: 'Table', component: () => import('@/views/home.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') }
]
