import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/home-view.vue';
import aboutView from '../views/about-view.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: homeView,
        },
        {
            path: '/about',
            name: 'about',
            component: aboutView,
        },
    ],
});

export default router;
