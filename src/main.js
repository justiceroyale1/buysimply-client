// import "./assets/main.css";

// import { createApp } from 'vue'
// import App from './App.vue'
// import Vuetify from 'vuetify'

// const vuetify = new Vuetify({})

// App.use(vuetify);

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

import { createApp } from "vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: false,
  sameSite: "None",
});

// Components
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
