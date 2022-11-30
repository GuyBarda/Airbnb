import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store.js';

import './assets/main.scss';
import './assets/setup/_typography.scss';
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
