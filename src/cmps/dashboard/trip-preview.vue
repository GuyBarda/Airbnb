<template>
    <tr>
        <td>{{ trip.hostId }}</td>
        <td>{{ trip.stay.name }}</td>
        <td>{{ trip.startDate }}</td>
        <td>{{ trip.endDate }}</td>
        <td>{{ formattedPrice }}</td>
        <td>
            <span :class="status">{{ trip.status }}</span>
        </td>
        <td class="actions">
            <button class="approve" @click="$emit('changeStatus', 'approve')">
                Approve
            </button>
            <button class="reject" @click="$emit('changeStatus', 'decline')">
                Reject
            </button>
        </td>
    </tr>
</template>
  
<script>
export default {
    props: {
        trip: Object,
    },
    data() {
        return {
            status: "pending",
        };
    },
    computed: {
        status() {
            return this.status;
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            });
            return formatter.format(this.trip.totalPrice);
        },
    },
};
</script>
  