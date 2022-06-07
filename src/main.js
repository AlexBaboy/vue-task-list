import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/js/materialize.min'
import router from "@/routes";
import store from "@/store";

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
