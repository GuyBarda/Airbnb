<template>
    <div class="user-dashboard secondary-container">
        <section class="dashboard-container">
            <nav class="dashboard-nav">
                <input
                    type="radio"
                    id="orders"
                    name="btn-nav"
                    value="orders"
                    v-model="type"
                />
                <label for="orders" class="btn-nav">orders</label>

                <input
                    type="radio"
                    id="trips"
                    name="btn-nav"
                    value="trips"
                    v-model="type"
                />
                <label for="trips" class="btn-nav">my trips</label>

                <input
                    type="radio"
                    id="stays"
                    name="btn-nav"
                    value="stays"
                    v-model="type"
                />
                <label for="stays" class="btn-nav">my stays</label>

                <input
                    type="radio"
                    id="wishlist"
                    name="btn-nav"
                    value="wishlist"
                    v-model="type"
                />
                <label for="wishlist" class="btn-nav">wishlist</label>

                <router-link class="btn-nav" to="/stay/edit/"
                    >add a stay</router-link
                >
            </nav>
            <orders v-if="typeToShow === 'orders'" :user="getLoggedinUser" />
            <my-trips v-if="typeToShow === 'trips'" :user="getLoggedinUser" />
            <wishlist
                v-if="typeToShow === 'wishlist'"
                :user="getLoggedinUser"
            />
            <my-stays v-if="typeToShow === 'stays'" :user="getLoggedinUser" />
        </section>
    </div>
</template>

<script>
// import { userService } from "../services/user-service";
// import { orderService } from "../services/order-service-local";

import orders from "../cmps/dashboard/orders.vue";
import myTrips from "../cmps/dashboard/my-trips.vue";
import wishlist from "../cmps/dashboard/wishlist.vue";
import myStays from "../cmps/dashboard/my-stays.vue";

export default {
    data() {
        return {
            type: "trips",
        };
    },
    created(){
        const {type} = this.$route.params
        this.type = type
    },
    methods: {
        changeType(str) {
            this.type = str;
        },
    },
    computed: {
        typeToShow() {
            return this.type;
        },
        getLoggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        currPath(){
            return this.$router.params
        }
    },
    components: {
        orders,
        myTrips,
        wishlist,
        myStays,
    },
    watch:{
        type(type) {
            this.$router.push('/dashboard/'+ type)
        },
    }
};
</script>
