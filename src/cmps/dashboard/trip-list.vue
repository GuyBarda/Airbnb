<template>
    <div class="trip-list">
    <table>
        <thead>
            <th>Stay name</th>
            <th>Host name</th>
            <th>Check in</th>
            <th>Check out</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
        </thead>
        <!-- <div class="order-preview">
            <p>Stay name</p>
            <p>Host name</p>
            <p>Check in</p>
            <p>Check out</p>
            <p>Total</p>
            <p>Status</p>
            <p>Actions</p>
        </div> -->
        <tbody>
        <trip-preview v-for="trip in trips" :trip="trip" />
        </tbody>
    </table>
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
};
</script>