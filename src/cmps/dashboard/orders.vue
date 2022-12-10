<template>
    <div v-if="orders" class="order-container">
        <h2>Hi {{ user.fullname }}, you have {{ orders.length }} pending orders</h2>
        <order-list @changeStatus="updateStatus" :orders="orders" />
    </div>
</template>

<script>
import { orderService } from '../../services/order-service';
import { userService } from '../../services/user-service.js'

import orderList from './order-list.vue';

export default {
    props: {
        user: Object
    },
    data() {
        return {
            orders: null,
        }
    },
    async created() {
        this.orders = await userService.getOrdersByUserId(this.user._id);
    },
    methods: {
        async updateStatus(val, id) {
            let order = await orderService.getById(id)
            console.log(order)
            order.status = val
            let updatedOrder = await this.$store.dispatch({ type: 'addOrder', order })
            this.orders = await userService.getOrdersByUserId(this.user._id);
        }
    },
    components: {
        orderList
    }
}
</script>
