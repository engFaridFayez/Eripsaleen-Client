import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import App from './App.vue'
import router from './router'
import './assets/main.css'
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.error("Global Vue error:", err, info);
};

// ✅ Pinia instance واحدة فقط
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

app.mount("#app")