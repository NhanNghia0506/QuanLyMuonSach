import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@fortawesome/fontawesome-free/css/all.min.css'

import router from "./router";
import App from './App.vue'
import { createApp } from 'vue'

createApp(App).use(router).mount("#app");
