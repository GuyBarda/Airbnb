<template>
    <div class="order-container">
        <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending orders</h2>
        <order-list :orders="orders" />
    </div>
</template>

<script>
import orderList from './order-list.vue';
export default {
    props: {
        user: Object
    },
    async created(){
        // this.orders = await orderService.getOrdersByUserId(this.user._id);
    },
    components: {
        orderList
    }
}
</script>
