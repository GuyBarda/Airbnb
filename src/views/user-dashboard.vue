<template>
    <div class="user-dashboard secondary-container">
        <nav class="dashboard-nav" @mousemove="hoverEffect">
            <!-- <button class="btn-nav" @click="changeType('orders')">orders</button>
            <button class="btn-nav" @click="changeType('trips')">my trips</button>
            <button class="btn-nav" @click="changeType('wishlist')">my houses</button>
            <button class="btn-nav" @click="changeType('wishlist')">wishlist</button> -->

            <input type="radio" id="orders" name="btn-nav" value="orders" v-model="type" />
            <label for="orders" class="btn-nav">orders</label>

            <input type="radio" id="trips" name="btn-nav" value="trips" v-model="type" />
            <label for="trips" class="btn-nav">my trips</label>

            <input type="radio" id="stays" name="btn-nav" value="stays" v-model="type" />
            <label for="stays" class="btn-nav">my stays</label>

            <input type="radio" id="wishlist" name="btn-nav" value="wishlist" v-model="type" />
            <label for="wishlist" class="btn-nav">wishlist</label>

            <router-link class="btn-nav" to="/stay/edit/">add a stay</router-link>
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
        },
        hoverEffect(ev) {
            const button = ev.target;
            const { x, y } = button.getBoundingClientRect();
            console.log(x, y)
            button.style.setProperty('--x', ev.clientX - x + 'px');
            button.style.setProperty('--y', ev.clientY - y + 'px');
        },
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