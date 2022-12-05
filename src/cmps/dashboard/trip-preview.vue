<template>
    <div class="order-preview">
        <p>{{ trip.hostId }}</p>
        <p>{{ trip.house.name }}</p>
        <p>{{ trip.startDate }}</p>
        <p>{{ trip.endDate }}</p>
        <p>{{ trip.totalPrice }}</p>
        <p>{{ trip.status }}</p>
        <div class="actions">
            <button class="approve" @click="$emit('changeStatus', 'approve')">Approve</button>
            <button class="decline" @click="$emit('changeStatus', 'decline')">Decline</button>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        trip: Object
    },

}
</script>