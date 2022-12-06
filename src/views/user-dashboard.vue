<template>
    <div class="user-dashboard secondary-container">
        <nav class="dashboard-nav">
            <button class="btn-nav" @click="changeType('orders')">orders</button>
            <button class="btn-nav" @click="changeType('trips')">my trips</button>
            <button class="btn-nav" @click="changeType('houses')">my houses</button>
            <button class="btn-nav" @click="changeType('wishlist')">wishlist</button>
            <!-- <button class="btn-nav" >add a stay</button> -->
            <router-link class="btn-nav" to="/house/edit">add a stay</router-link>
        </nav>
        <orders v-if="typeToShow === 'orders'" :user="userToShow" :orders="ordersToShow" />
        <my-trips v-if="typeToShow === 'trips'" :user="userToShow" :trips="tripsToShow" />
        <wishlist v-if="typeToShow === 'wishlist'" :user="userToShow" :wishlist="wishListToShow" />
    </div>
</template>

<script>
import { userService } from '../services/user-service';
import { orderService } from '../services/order-service-local';

import orders from '../cmps/dashboard/orders.vue';
import myTrips from '../cmps/dashboard/my-trips.vue';
import wishlist from '../cmps/dashboard/wishlist.vue';

export default {
    data() {
        return {
            user: null,
            orders: null,
            trips: null,
            wishlist: null,
            type: 'trips'
        }
    },
    async created() {
        const { _id } = await userService.getLoggedinUser()
        this.user = await userService.getById(_id)
        this.orders = await orderService.getOrdersByUserId(this.user._id)
        this.trips = await userService.getTripsByUserId(this.user._id)
        this.wishlist = this.user.wishlist
    },
    methods: {
        changeType(str) {
            this.type = str
        }
    },
    computed: {
        userToShow() {
            return this.user
        },
        ordersToShow() {
            return this.orders
        },
        tripsToShow() {
            return this.trips
        },
        wishListToShow() {
            return this.wishlist
        },
        typeToShow() {
            return this.type
        }
    },
    components: {
        orders,
        myTrips,
        wishlist
    }
}
</script>