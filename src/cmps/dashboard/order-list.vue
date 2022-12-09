<template>
    <div class="order-list">
        <!-- <section class="order-list-header"> -->
            <p>Stay Name</p>
            <p>Buyer</p>
            <p>Date</p>
            <p>Total Price</p>
            <p>Status</p>
            <p>Actions</p>
        <!-- </section> -->
        <order-preview v-for="order in orders" :order="order" />
    </div>
</template>
  
<script>
import orderPreview from "./order-preview.vue";

export default {
    props: {
        orders: {
            type: Array,
        },
    },
    components: {
        orderPreview,
    },
};
</script>