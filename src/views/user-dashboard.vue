<template>
    <div class="user-dashboard secondary-container">
        <nav class="dashboard-nav">
            <button class="btn-nav" @click="whichToShow('orders')">orders</button>
            <button class="btn-nav" @click="whichToShow('my trips')">my trips</button>
            <button class="btn-nav" @click="whichToShow('my stays')">my stays</button>
            <button class="btn-nav" @click="whichToShow('wishlist')">wishlist</button>
            <button class="btn-nav" @click="whichToShow('add a stay')">add a stay</button>
            <!-- <a href="#">ADD A STAY</a> -->
        </nav>
        <!-- <orders :user="userToShow" :orders="ordersToShow" /> -->
        <!-- <my-trips :user="userToShow" :trips="tripsToShow" /> -->
        <wishlist :user="userToShow" :wishlist="wishListToShow" />
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
            wishlist: null
        }
    },
    async created() {
        const { _id } = await userService.getLoggedinUser()
        console.log('from session storage', _id)
        this.user = await userService.getById(_id)
        this.orders = await orderService.getOrdersByUserId(this.user._id)
        // console.log(this.orders)
        this.trips = await userService.getTripsByUserId(this.user._id)
        console.log('wishlist', this.user.wishlist)
        this.wishlist = this.user.wishlist

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
        }
    },
    components: {
        orders,
        myTrips,
        wishlist
    }
}
</script>