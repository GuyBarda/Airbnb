import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store.js';

import { clickOutsideDirective, scrollEvent } from './directives';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/main.scss';
import './assets/setup/_typography.scss';

const app = createApp(App);

app.directive('outside',clickOutsideDirective)
app.directive('scroll',scrollEvent)

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
