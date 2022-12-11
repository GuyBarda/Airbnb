<template>
    <div v-if="orders" class="order-container">
        <h2>Hi {{ userFullname }}, you have {{ orders.length }} pending orders</h2>
        <order-list @changeStatus="updateStatus" :orders="orders" />
    </div>
</template>

<script>
import { orderService } from '../../services/order-service';
import { userService } from '../../services/user-service.js'
import { socketService } from '../../services/socket-service.js'
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
        socketService.on('order-about-you', order => {
            this.orders.unshift(order)
        })
        this.orders = this.orders.reverse()
    },
    methods: {
        async updateStatus(val, id) {
            let order = await orderService.getById(id)
            order.status = val
            let updatedOrder = await this.$store.dispatch({ type: 'addOrder', order })
            this.orders = await userService.getOrdersByUserId(this.user._id);
        }
    },
    computed: {
        userFullname() {
            return `${this.user.fullname[0].toUpperCase()}${this.user.fullname.slice(1, this.user.fullname.length)}`
        }
    },
    components: {
        orderList
    }
}
</script>
