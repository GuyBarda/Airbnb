<template>
    <section v-if="order" class="stay-book secondary-container full">
        <header class="stay-book-header">
            <h1>Your order has been sent to host</h1>
        </header>
        <div class="info-container">
            <div class="info">
                <div class="wont-confirm">
                    <h3>Attention!</h3>
                    <p>Your reservation won't be confirmed until the host accepts your request (within 24 hours).
                    </p>
                    <span>You won't be charged until then.</span>
                </div>
                <div class="cancellation">
                    <h3>Cancellation policy</h3>
                    <p>Free cancellation before {{ twoDaysNotice }}. Cancel before {{ weekNotice }} for a partial
                        refund.
                    </p>
                </div>
                <div class="ground-rules">
                    <h3>Ground rules</h3>
                    <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                    <ul>
                        <li>Follow the house rules</li>
                        <li>Treat your Host's home like your own</li>
                    </ul>
                </div>
                <div class="">
                    <button @click="goToOrders" class="btn-reserve" @mousemove="hoverEffect">Check your orders</button>
                </div>
            </div>
            <div class="sticky">
                <div class="content">
                    <div class="your-stay-details-container">
                        <div class="stay-details-info-container">
                            <img :src="order.stay?.imgUrls[0]" alt="">
                            <p>{{ order.stay.name }}</p>
                            <review-average :reviews="reviews?.length" :rateMap="rate" />
                        </div>
                    </div>
                    <div class="protected">
                        Your booking is protected by <span>Air</span><span>Cover</span>
                    </div>
                    <div class="price-details-container">
                        <h3>Price details</h3>
                        <div class="prices">
                            <p>${{ order.stay.price }} x {{ totalDays }} nights</p>
                            <p>{{ totalPrice }}</p>
                            <p>total guests</p>
                            <p>{{ Object.values(order.guests).reduce((cur, acc) => acc + cur) }}</p>
                        </div>
                    </div>
                    <div class="total">
                        <p>Total after fees</p>
                        <p>{{ formattedTotalPriceAfterFees }}</p>
                    </div>
                </div>
            </div>
        </div>
        <h1>Continue your search</h1>
        <stay-list :stays="stays.slice(10, 15)" />
    </section>
</template>

<script>
import { orderService } from '../services/order-service.js'
import { utilService } from '../services/utils-service'
import { stayService } from '../services/stay-service'

import reviewAverage from "../cmps/review-average.vue";

import stayList from '../cmps/stay-list.vue'

export default {
    async created() {
        const { orderId } = this.$route.query
        this.order = await orderService.getById(orderId)
        this.reviews = await stayService.getById(this.order.stay._id).then(stay => stay.reviews)
        await this.$store.dispatch({ type: 'loadStays' })
    },
    data() {
        return {
            order: null,
            reviews: null
        }
    },
    methods: {
        hoverEffect(ev) {
            utilService.hoverEffect(ev)
        },
        goToOrders() {
            this.$router.push('dashboard/host/orders')
        }
    },
    computed: {
        stays() {
            return this.$store.getters.stays
        },
        twoDaysNotice() {
            return utilService.formatDate(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        weekNotice() {
            return utilService.formatDate(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        totalDays() {
            const date1 = new Date(this.order.startDate);
            const date2 = new Date(this.order.endDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        },
        totalPrice() {
            return utilService.format(this.order.stay.price * this.totalDays)
        },
        formattedTotalPriceAfterFees() {
            return utilService.format(this.order.totalPrice)
        },
        rate() {
            if (!this.reviews.length) return "new";
            const rateKeys = Object.keys(this.reviews[0].rate);
            const rateMap = {};
            rateKeys.forEach((key) => {
                let sum = this.reviews.reduce((acc, { rate }) => (acc += rate[key]), 0);
                rateMap[key] = sum / this.reviews.length;
            });
            return rateMap;
        },
    },
    components: {
        stayList,
        reviewAverage
    }
}
</script>