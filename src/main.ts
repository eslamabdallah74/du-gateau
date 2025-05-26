import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/styles/main.scss';
import App from './App.vue';
import router from './router';
import MdiIcon from './components/MdiIcon.vue';

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

const pinia = createPinia();
const app = createApp(App);

// Register MdiIcon component globally
app.component('mdi-icon', MdiIcon);

app.use(pinia);
app.use(router);
app.mount('#app');