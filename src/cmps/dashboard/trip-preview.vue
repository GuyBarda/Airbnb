<template>
    <section class="trip-preview">
        <div class="">
            <h4>{{ trip.stay.name }}</h4>
            
            <p>
                <span>{{ formattedStartDate }}</span>
                <span>{{ formattedEndedDate }}</span>
            </p>
        </div>
        <span class="trip-status" :class="tripStatus"><i class="fa fa-check"></i>  {{ trip.status }}</span> 
        <!-- <i class="fa fa-regular fa-comments"></i> -->

    </section>
</template>

<script>
export default {
    props: {
        trip: Object,
    },
    created() {
    },
    data() {
        return {
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
        formattedStartDate() {
            let date = new Date(this.trip.startDate).toLocaleDateString(
                "en-us",
                { month: "short", day: "numeric" }
            );
            if (date === "Invalid Date") return "";
            return date;
        },
        formattedEndedDate() {
            let date = new Date(this.trip.endDate).toLocaleDateString(
                "en-us",
                { month: "short", day: "numeric" }
            );
            if (date === "Invalid Date") return "";
            return date;
        },
        tripStatus() {
            return this.trip.status
        }
    },
};
</script>
