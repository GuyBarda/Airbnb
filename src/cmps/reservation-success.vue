<template>
    <div class="reservation-success">
        <header>
            <h2>Reservation success</h2>
            <button @click="$emit('close')">
                <img src="../assets/svg/close.svg" alt="">
            </button>
        </header>
        <div class="content">
            <div class="your-trip-container">
                <h3>Your trip:</h3>
                <div class="info-container">
                    <p>Check-In</p>
                    <p>{{ order.startDate }}</p>
                    <p>Check-Out</p>
                    <p>{{ order.endDate }}</p>
                    <p>Host name</p>
                    <!-- <p>{{ order.host.fullname }}</p> -->
                </div>
            </div>
            <div class="your-stay-details-container">
                <h3>Stay details</h3>
                <div class="stay-details-info-container">
                    <!-- <img :src="house.imgUrls[0]" alt=""> -->
                    <p>{{ house.name }}</p>
                    <review-average :reviews="house.reviews" />
                </div>
            </div>
            <div class="price-details-container">
                <h3>Price details</h3>
                <div class="info-container">
                    <p>Adults</p>
                    <p>{{ order.guests.adults }}</p>
                    <p>Total price</p>
                    <p>{{ order.totalPrice }}</p>
                    <p>Total nights</p>
                    <!-- <p>{{ order.totalNights }}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import reviewAverage from './review-average.vue';

export default {
    props: {
        order: Object,
        house: Object
    },
    created() {
        console.log(this.order)
    },
    components: {
        reviewAverage,
    }
}
</script>