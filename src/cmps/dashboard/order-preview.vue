<template>
    <section class="order-preview">
        <img :src="order.buyer.imgUrl" alt="">
        <p>{{ order.buyer.fullname }}</p>
        <p>{{ order.stay.name }}</p>
        <p>{{ order.startDate }}</p>
        <!-- <p>{{ order.endDate }}</p> -->
        <p>{{ order.totalPrice }}$</p>
        <p>{{ order.status }}</p>
        <div class="actions">
            <button class="approve" @click="$emit('changeStatus', 'approve', order._id)">Approve</button>
            <button class="decline" @click="$emit('changeStatus', 'decline', order._id)">Decline</button>
        </div>
        <!-- <pre>{{ order }}</pre> -->
    </section>
</template>

<script>
export default {
    props: {
        order: Object
    },
     created() {
        console.log('this.orders ', this.order )
    },
}
</script>