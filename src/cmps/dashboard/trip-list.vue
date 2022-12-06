<template>
    <div class="order-list">
        <div class="order-preview">
            <p>stay name</p>
            <p>host name</p>
            <p>check in</p>
            <p>check out</p>
            <p>total</p>
            <p>status</p>
            <p>actions</p>
        </div>
        <trip-preview v-for="trip in trips" :trip="trip" />
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