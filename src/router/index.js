import { createRouter, createWebHistory } from 'vue-router';
import houseEdit from '../views/house-edit.vue';
import houseDetails from '../views/house-details.vue';
import houseApp from '../views/house-app.vue';
import userDashboard from '../views/user-dashboard.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: houseApp,
        },
        {
            path: '/explore',
            name: 'explore',
            component: houseApp,
        },
        {
            path: '/house/:id',
            name: 'details',
            component: houseDetails,
        },
        {
            path: '/house/edit/:id?',
            name: 'edit',
            component: houseEdit,
        },
        {
            path: '/dashboard',
            name: 'dashnoard',
            component: userDashboard,
        },
    ],
});

export default router;
