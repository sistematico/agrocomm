import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/routes";
import "@/assets/scss/tailwind.scss";
import App from "@/app.vue";
// import { store } from "@/store"

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((_to, _from, next) => {
  const host = window.location.host;
  const subdomain = host.split('.')[1] ? host.split('.')[0] : false;

  // if 

  console.log("Host:", host, "Sub-domain:", subdomain);
  next();
});

const app = createApp(App);

app.use(router);
app.mount("#app");
