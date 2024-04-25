export const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/contato', name: 'Contact', component: () => import('@/views/contact.vue') },
  { path: '/geo', name: 'Geo', component: () => import('@/views/geo.vue') },
  {
    path: '/auth',
    children: [
      { path: 'signin', component: () => import('@/views/auth/signin.vue') },
      { path: 'signup', component: () => import('@/views/auth/signup.vue') }
    ]
  },
  {
    path: '/cotacoes',
    children: [
      { 
        path: 'boi', 
        name: 'Boi', 
        meta: { title: 'Arroba do Boi', subtitle: 'Cotação da arroba do boi' },
        component: () => import('@/views/quotes.vue') 
      },
      { 
        path: 'vaca', 
        name: 'Vaca', 
        meta: { title: 'Arroba da Vaca', subtitle: 'Cotação da arroba da vaca' },
        component: () => import('@/views/quotes.vue') 
      },
      { 
        path: 'soja', 
        name: 'Soja', 
        meta: { title: 'Saca de Soja', subtitle: 'Cotação da saca de soja' },
        component: () => import('@/views/quotes.vue') 
      },
      { 
        path: 'milho', 
        name: 'Milho', 
        meta: { title: 'Saca de Milho', subtitle: 'Cotação da saca de milho' },
        component: () => import('@/views/quotes.vue') 
      },
      { 
        path: 'leiloes', 
        name: 'Leiloes', 
        meta: { title: 'Leilões', subtitle: 'Cotação de leilões' },
        component: () => import('@/views/quotes.vue') 
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notfound.vue') }
]