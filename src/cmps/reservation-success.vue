<template>
    <div class="reservation-success">
        <header>
            <h2>Reservation success!</h2>
            <button @click="closeSuccessModal">
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
                    <img :src="house.imgUrls[0]" alt="">
                    <p>{{ house.name }}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <review-average :reviews="house.reviews" />
                        <p>{{ formattedPerNightPrice }}</p>
                    </div>
                </div>
            </div>
            <div class="price-details-container">
                <h3>Price details</h3>
                <div class="info-container">
                    <p>Adults</p>
                    <p>{{ order.guests.adults }}</p>
                    <p>Total price</p>
                    <p>{{ formattedTotalPrice }}</p>
                    <p>Total nights</p>
                    <p>{{ getTotalDays }}</p>
                </div>
            </div>
        </div>
        <button @mousemove="hoverEffect" class="btn-reserve">Look for more places to stay</button>
    </div>
</template>

<script>
import { utilService } from '../services/utils-service.js';
import reviewAverage from './review-average.vue';

export default {
    props: {
        order: Object,
        house: Object
    },
    created() {
        console.log(this.order)
        this.order.startDate = '2022-12-16';
        this.order.endDate = '2022-12-18';
    },
    methods: {
        closeSuccessModal() {
            this.$store.commit({ type: "toggleSuccessModal", bool: false });
        },
        totalDays() {
            const date1 = new Date(this.order.startDate);
            const date2 = new Date(this.order.endDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays
        },
        format(num) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            return formatter.format(num)
        },
        hoverEffect(ev) {
            utilService.hoverEffect(ev)
        }
    },
    computed: {
        formattedPerNightPrice() {
            return this.format(this.house.price)
        },
        formattedTotalPrice() {
            let diffDays = this.totalDays()

            return this.format(diffDays * this.house.price)
        },
        getTotalDays() {
            return this.totalDays()
        }

    },
    components: {
        reviewAverage,
    }
}
</script>