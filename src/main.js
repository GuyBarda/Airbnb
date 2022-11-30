import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
<<<<<<< HEAD
import {store} from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
=======
import { store } from './store/store.js';
>>>>>>> e369b8b7b97fffb49f567f131753abacafca077e

import './assets/main.scss';
import './assets/setup/_typography.scss';

const app = createApp(App);

app.use(ElementPlus)
app.use(router);
app.use(store);
app.mount('#app');
