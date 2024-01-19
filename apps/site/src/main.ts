import { createApp } from "vue";
import { router } from "@/router";
import "@/assets/scss/tailwind.scss";
import App from "@/app.vue";
// import { store } from "@/store"

const app = createApp(App);

app.use(router);
app.mount("#app");
