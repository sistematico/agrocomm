export const routes = [
  { name: 'Inicio',   path: '/',                component: () => import('@/views/home.vue'),      alias: ['/home', '/inicio'],  meta: { title: 'Início' } },
  { name: 'Sobre',    path: '/sobre',           component: () => import('@/views/sobre.vue'),     meta: { title: 'Sobre o Site' } },
  { name: 'Boi',      path: '/boi',             component: () => import('@/views/cotacao.vue'),   alias: ['/arroba-do-boi'],    meta: { title: 'Arroba do Boi', apiurl: '/boi', tipo: 'Pecuaria' } },
  { name: 'Vaca',     path: '/vaca',            component: () => import('@/views/cotacao.vue'),   alias: ['/arroba-da-vaca'],   meta: { title: 'Arroba da Vaca', apiurl: '/vaca', tipo: 'Pecuaria' } },
  { name: 'Milho',    path: '/milho',           component: () => import('@/views/cotacao.vue'),                                 meta: { title: 'Saca de Milho', apiurl: '/milho', tipo: 'Agricultura' } },
  { name: 'Soja',     path: '/soja',            component: () => import('@/views/cotacao.vue'),                                 meta: { title: 'Saca de Soja', apiurl: '/soja', tipo: 'Agricultura'} },
  { name: 'Estado',   path: '/:estado',         component: () => import('@/views/estado.vue'),    meta: { title: 'Estados' } },
  { name: 'NotFound', path: '/:pathMatch(.*)*', component: () => import('@/views/notfound.vue'),  meta: { title: 'Erro 404' } },
]
