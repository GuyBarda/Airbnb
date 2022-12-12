<template>
    <section class="order-preview list-preview-all">

        <p class="img-buyer"><img :src="order.buyer.imgUrl" alt="" />{{ order.buyer.fullname }}</p>
        <p>{{ order.stay.name }}</p>
        <p>{{ formattedStartDate }}</p>
        <!-- <p>{{ formattedEndDate }}</p> -->
        <!-- <p>{{ order.endDate }}</p> -->
        <p>{{ order.totalPrice }}$</p>
        <p :class="orderStatus">{{ order.status }}</p>
        <div class="actions">
            <button v-if="order.status !== 'approve'" class="approve"
                @click="$emit('changeStatus', 'approve', order._id)">
                <i class="fa fa-check"></i>
                Approve
            </button>
            <button v-if="order.status !== 'decline'" class="decline"
                @click="$emit('changeStatus', 'decline', order._id)">
                <i class="fa fa-times-circle"></i>
                Decline
            </button>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        order: Object,
    },
    created() {
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
