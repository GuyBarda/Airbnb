<template>
    <section class="order-preview list-preview-all">

        <p class="img-buyer"><img :src="order.buyer.imgUrl" alt="" />{{ order.buyer.fullname }}</p>
        <p>{{ order.stay.name }}</p>
        <p>{{ formattedStartDate }}</p>
        <!-- <p>{{ formattedEndDate }}</p> -->
        <!-- <p>{{ order.endDate }}</p> -->
        <p>{{ order.totalPrice }}$</p>
        <p :class="orderStatus">{{ order.status }}</p>
        <div v-if="order.status === 'pending'" class="actions">
            <button class="approve" @click="$emit('changeStatus', 'approve', order._id)">
                <i class="fa fa-check"></i>
                Approve
            </button>
            <button class="decline" @click="$emit('changeStatus', 'decline', order._id)">
                <i class="fa fa-times-circle"></i>
                Decline
            </button>
        </div>
        <div v-else-if="order.status === 'decline'" class="actions">
            <button class="pending" @click="$emit('changeStatus', 'pending', order._id)">
                <i class="fa fa-times-circle"></i>
                Pending
            </button>
            <button class="approve" @click="$emit('changeStatus', 'approve', order._id)">
                <i class="fa fa-check"></i>
                Approve
            </button>
        </div>
        <div v-else class="actions">
            <button class="pending" @click="$emit('changeStatus', 'pending', order._id)">
                <i class="fa fa-check"></i>
                Pending
            </button>
            <button class="decline" @click="$emit('changeStatus', 'decline', order._id)">
                <i class="fa fa-times-circle"></i>
                Decline
            </button>
        </div>

        <!-- <pre>{{ order }}</pre> -->
    </section>
</template>

<script>
export default {
    props: {
        order: Object,
    },
    created() {
        console.log("this.orders ", this.order);
    },
    computed: {
        formattedStartDate() {
            return this.formatDate(this.order.startDate);
        },
        formattedEndDate() {
            return this.formatDate(this.order.endDate);
        },
        orderStatus() {
            return this.order.status;
        },
    },
    methods: {
        formatDate(date) {
            const DATE = new Date(date);
            return `${DATE.getMonth() + 1
                }/${DATE.getDate()}/${DATE.getFullYear()}`;
        },
    },
};
</script>
