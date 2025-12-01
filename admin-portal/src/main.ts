import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@fortawesome/fontawesome-free/css/all.min.css'
import router from "./routes";
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount("#app");
