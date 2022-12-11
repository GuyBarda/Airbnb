import { createRouter, createWebHistory } from 'vue-router';
import stayEdit from '../views/stay-edit.vue';
import stayDetails from '../views/stay-details.vue';
import stayApp from '../views/stay-app.vue';
import userDashboard from '../views/user-dashboard.vue';
import stayUpdate from '../views/stay-update.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: stayApp,
        },
        {
            path: '/explore',
            name: 'explore',
            component: stayApp,
        },
        {
            path: '/stay/:id',
            name: 'details',
            component: stayDetails,
        },
        {
            path: '/stay/update/:id?',
            name: 'update',
            component: stayUpdate,
        },
        {
            path: '/stay/edit/:id?',
            name: 'edit',
            component: stayEdit,
        },
        {
            path: '/dashboard/:type?',
            name: 'dashnoard',
            component: userDashboard,
        },
    ],
});

export default router;
