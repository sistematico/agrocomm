import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/routes";
import { estados } from "@/composables/estados";

export const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((_to, _from, next) => {
  const host = window.location.host;
  const subdomain = host.split('.')[1] ? host.split('.')[0] : false;
  
  if (typeof subdomain === 'string') {
    const estadoValido = estados.find((e) => e.sigla.toLocaleLowerCase() === subdomain.toLocaleLowerCase());
    if (estadoValido) {
      console.log(estadoValido)  
    }
  }
  console.log("Host:", host, "Subdomain:", subdomain);

  next();
});

// router.beforeEach((to, from, next) => {
//   if (/* sua condição para redirecionar */) {
//     window.location.href = "http://subdominio.seudominio.com";
//   } else {
//     next(); // continua com a navegação normal se não for para redirecionar
//   }
// });