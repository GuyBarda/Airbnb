<template>
    <div class="order-container">
        <h2>Hi {{ user.fullname }}, you have {{ orders.length }} pending orders</h2>
        <order-list :orders="orders" />
    </div>
</template>

<script>
import {userService } from '../../services/user-service.js'
import orderList from './order-list.vue';
export default {
    props: {
        user: Object
    },
    data(){
        return{
            orders: null,
        }
    },
    async created(){
        this.orders = await userService.getOrdersByUserId(this.user._id);
    },
    components: {
        orderList
    }
}
</script>
