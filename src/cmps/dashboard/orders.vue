<template>
    <div v-if="orders" class="order-container">
        <div class="order-header">
            <h2>Hi {{ userFullname }}, you have {{ orders.length }} orders </h2>
            <h3>{{ pendingLength }}
                pending <i class="fa fa-solid fa-circle"></i>{{ approveLength }}
                approved <i class="fa fa-solid fa-circle"></i>{{ declineLength }} declined
                <i class="fa fa-solid fa-circle"></i>
            </h3>
        </div>
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
        },
        calcLength(status) {
            return this.orders.filter(order => order.status === status).length
        }
    },
    computed: {
        userFullname() {
            return `${this.user.fullname[0].toUpperCase()}${this.user.fullname.slice(1, this.user.fullname.length)}`
        },
        pendingLength() {
            return this.calcLength('pending')
        },
        approveLength() {
            return this.calcLength('approve')
        },
        declineLength() {
            return this.calcLength('decline')
        }
    },
    components: {
        orderList
    }
}
</script>
