import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/home-view.vue';
import houseDetails from '../views/house-details.vue';
import houseApp from '../views/house-app.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: houseApp,
        },
        {
            path: '/details',
            name: 'details',
            component: houseDetails,
        },
    ],
});

export default router;
