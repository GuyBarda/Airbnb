<template>
    <div class="order-list">
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