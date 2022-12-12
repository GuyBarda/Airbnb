import { createRouter, createWebHistory } from "vue-router";
import stayEdit from "../views/stay-edit.vue";
import stayDetails from "../views/stay-details.vue";
import stayApp from "../views/stay-app.vue";
import userDashboard from "../views/user-dashboard.vue";
import stayUpdate from "../views/stay-update.vue";
import myOrders from '../cmps/dashboard/orders.vue'
import myStays from '../cmps/dashboard/my-stays.vue'
import myTrips from '../cmps/dashboard/my-trips.vue'
import wishlist from '../cmps/dashboard/wishlist.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: stayApp,
        },
        {
            path: "/explore",
            name: "explore",
            component: stayApp,
        },
        {
            path: "/stay/:id",
            name: "details",
            component: stayDetails,
        },
        {
            path: "/stay/update/:id?",
            name: "update",
            component: stayUpdate,
        },
        {
            path: "/stay/edit/:id?",
            name: "edit",
            component: stayEdit,
        },
        {
            path: "/dashboard/host/:type?",
            name: "dashboard-host",
            component: userDashboard,
            children: [
                {
                    path: "orders",
                    name: "orders",
                    component: myOrders,
                },
                {
                    path: "stays",
                    name: "stays",
                    component: myStays,
                },
            ],
        },
        {
            path: "/dashboard/buyer/:type?",
            name: "dashboard-buyer",
            component: userDashboard,
            children: [
                {
                    path: "trips",
                    name: "trips",
                    component: myTrips,
                },
                {
                    path: "wishlist",
                    name: "wishlist",
                    component: wishlist,
                },
            ],
        },
    ],
});

export default router;
