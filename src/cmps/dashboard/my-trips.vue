<template>
    <div v-if="user && trips && currTrip" class="trips-container">
        <!-- <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending trips</h2> -->
        <trip-list @openToDisplay="setTripDisplay" :trips="trips" />
        <section class="trip-display">
            <!-- <details-map
                v-if="currTrip"
                class="map-for-dashboard"
                :lat="getTripLocLat"
                :lng="getTripLocLng"
                :title="currTrip.stay.loc.address"
            /> -->
            <main class="trip-info">
                <h3>{{ currTrip?.stay?.loc?.address }}</h3>
                <p>
                    Dates: {{ currTrip?.startDate }} - {{ currTrip?.endDate }}
                </p>
                <p>Guests: {{ currTrip?.guests?.adults }}</p>
                <p>Total price: {{ currTrip?.totalPrice }}</p>
                <p class="last">Order Status: {{ currTrip.status }}</p>
            </main>
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
import tripList from "./trip-list.vue";
import detailsMap from "../details-map.vue";

export default {
    props: {
        trips: Array,
        user: Object,
    },
    created() {
        console.log(this.trips);
        if (!this.trips) return;
        this.currTrip = this.trips[0];
        console.log(this.currTrip);
    },
    data() {
        return {
            currTrip: "",
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
