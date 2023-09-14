// import "bootstrap/dist/css/bootstrap.css"
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-
import { createApp } from "vue/dist/vue.esm-bundler";
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import { createPinia } from 'pinia'
// import store from './store'; // Sesuaikan dengan path Anda ke store
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "./assets/my-theme.css"

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const vuetify = createVuetify({
    components: {
        ...components,
        VSkeletonLoader,
      },
      directives,
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(Toast); // Menerapkan komponen Toast
// app.use(store); // Menerapkan komponen Toast
app.mount('#app');

// import "bootstrap/dist/js/bootstrap.js"