<template>
    <div v-if="user && trips && currTrip" class="trips-container">
        <!-- <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending trips</h2> -->
        <trip-list @openToDisplay="setTripDisplay" :trips="trips" />
        <section class="trip-display">
            <section class="trip-img">
            <img v-for="img in currTrip?.stay.imgUrls" :src="img" alt="">
            </section>
            <section class="trip-info">
                <h3>{{ currTrip?.stay?.loc?.address }}</h3>
                <p>
                    Dates: {{ currTrip?.startDate }} - {{ currTrip?.endDate }}
                </p>
                <p>Guests: {{ currTrip?.guests?.adults }}</p>
                <p>Total price: {{ currTrip?.totalPrice }}</p>
                <p class="last">Order Status: {{ currTrip.status }}</p>
            </section>
        </section>
    </div>
    <section v-else class="trips-else">
        <main class="trips-wrapper">
            <h3>You have 0 trips</h3>
            <button @click="navigate" @mousemove="hoverEffect">
                Look for beautiful place to travel
            </button>
        </main>
    </section>
</template>

<script>
import { userService } from "../../services/user-service.js";

import tripList from "./trip-list.vue";
import detailsMap from "../details-map.vue";

export default {
    props: {
        user: Object,
    },
    async created() {
        this.trips = await userService.getTripsByUserId(this.user._id);
        console.log(this.trips);
        console.log(userService);
        if (!this.trips) return;
        this.currTrip = this.trips[0];
    },
    data() {
        return {
            currTrip: "",
            trips: null,
        };
    },
    components: {
        tripList,
        detailsMap,
    },
    methods: {
        setTripDisplay(trip) {
            this.currTrip = trip;
        },
        hoverEffect(ev) {
            const button = ev.target;
            const { x, y } = button.getBoundingClientRect();
            button.style.setProperty('--x', ev.clientX - x + 'px');
            button.style.setProperty('--y', ev.clientY - y + 'px');
        },
        navigate(){
            this.$router.push('/')
        },
    },
    computed: {
    },
};
</script>
