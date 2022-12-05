<template>
    <div class="user-dashboard secondary-container">
        <nav class="dashboard-nav">
            <a href="">ORDERS</a>
            <a href="">MY TRIPS</a>
            <a href="">MY STAYS</a>
            <a href="">WISHLIST</a>
            <a href="">ADD A STAY</a>
        </nav>
        <orders :orders="ordersToShow" />
    </div>
</template>

<script>
import { userService } from '../services/user-service';

import orders from '../cmps/dashboard/orders.vue';

export default {
    data() {
        return {
            user: null,
            orders: null
        }
    },
    async created() {
        const { _id } = await userService.getLoggedinUser()
        console.log('from session storage', _id)
        this.user = await userService.getById(_id)
        // this.orders = 's';
    },
    computed: {
        userToShow() {
            return this.user
        }
    },
    components: {
        orders
    }
}
</script>