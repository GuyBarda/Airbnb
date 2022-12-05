<template>
    <div class="order-preview">
        <!-- <p>{{ order.buyer.fullname }}</p>
        <p>{{ order.house.name }}</p>
        <p>{{ order.startDate }}</p>
        <p>{{ order.endDate }}</p>
        <p>{{ order.totalPrice }}</p>
        <p>{{ order.status }}</p>
        <div class="actions">
            <button class="approve" @click="$emit('changeStatus', 'approve')">Approve</button>
            <button class="decline" @click="$emit('changeStatus', 'decline')">Decline</button>
        </div> -->
        <pre>{{ trip }}</pre>
    </div>
</template>

<script>
export default {
    props: {
        order: Object
    },

}
</script>