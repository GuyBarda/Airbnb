<template>
    <div class="trip-list">
        <trip-preview @click="openToDisplay(trip)" v-for="trip in trips" :trip="trip" :key="trip._id"/>
    </div>
</template>
  
<script>
import tripPreview from "./trip-preview.vue";

export default {
    props: {
        trips: {
            type: Array,
        },
    },
    components: {
        tripPreview,
    },
    methods:{
        openToDisplay(trip){
            this.$emit('openToDisplay',trip)
        }
    }
};
</script>