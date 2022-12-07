<template>
    <!-- <tr>
        <td>{{ trip.hostId }}</td>
        <td>{{ trip.stay.name }}</td>
        <td>{{ trip.startDate }}</td>
        <td>{{ trip.endDate }}</td>
        <td>{{ formattedPrice }}</td>
        <td>
            <span :class="status">{{ trip.status }}</span>
        </td>
    </tr> -->
    <section class="trip-preview">
        <h4>{{trip.stay.name}}</h4>
        <p><span>{{trip.startDate}}</span> {{trip.status}} </p>
    </section>
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
  