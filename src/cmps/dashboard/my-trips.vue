<template>
    <div v-if="user" class="trips-container">
        <!-- <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending trips</h2> -->
        <trip-list @openToDisplay="setTripDisplay" :trips="trips" />
        <section class="trip-display">
            <details-map class="map-for-dashboard" :lat="currTrip.stay.loc.position" :lng="stay.loc.lan" :title="stay.loc.address"/>
        </section>
    </div>
</template>

<script>
import tripList from './trip-list.vue';
import detailsMap from '../details-map.vue'

export default {
    props: {
        trips: Array,
        user: Object
    },
    data(){
        return{
            currTrip: ''
        }
    },
    components: {
        tripList,
        detailsMap
    },
    methods:{
        setTripDisplay(trip){
            this.currTrip = trip
        }
    }
}
</script>