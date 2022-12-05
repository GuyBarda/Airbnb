<template>
    <div class="order-list">
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