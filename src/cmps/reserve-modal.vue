<template>
    <section class="reserve-modal">
        <form @submit.prevent="addOrder">
            <header>
                <h4><span>{{ formattedPerNightPrice }}</span> per night</h4>
                <review-average :reviews="house.reviews" />
            </header>
            <div class="picker-container">
                <div class="check-in">
                    <label for="check-in">CHECK-IN</label>
                    <input type="text" placeholder="MM/DD/YYYY" v-model="order.startDate">
                    <!-- <button v-if="order.startDate" @click="order.startDate = ''">
                        <img src="../assets/svg/close.svg" alt="">
                    </button> -->
                </div>
                <div class="check-out">
                    <label for="check-out">CHECK-OUT</label>
                    <input type="text" placeholder="MM/DD/YYYY" v-model="order.endDate">
                    <!-- <button v-if="order.endDate" @click="order.endDate = ''">
                        <img src="../assets/svg/close.svg" alt="">
                    </button> -->
                </div>
                <div class="guests">
                    <label for="guests">GUESTS</label>
                    <p>{{ order.guests.adults }} guest</p>
                    <!-- <button v-if="order.endDate" @click="order.endDate = ''">
                        <img src="../assets/svg/close.svg" alt="">
                    </button> -->
                </div>
            </div>
            <button @mousemove="hoverEffect" class="btn-reserve">Reserve</button>
            <!-- <reactive-btn :text="'Reserve'" /> -->

            <div style="display: flex; gap: 25px; flex-direction: column;" v-if="(order.startDate && order.endDate)">
                <p style="text-align: center;">You won't be charged yet</p>
                <div class="prices">
                    <p>{{ formattedPerNightPrice }} x {{ getTotalDays }} nights</p>
                    <p>{{ formattedTotalNightsPrice }}</p>
                    <p>cleaning fee</p>
                    <p>{{ formattedCleaningFee }}</p>
                    <p>service fee</p>
                    <p>{{ formattedServiceFee }}</p>
                </div>
                <div class="total">
                    <p>Total</p>
                    <p>{{ formattedTotal }}</p>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { orderService } from '../services/order-service-local.js'

import reviewAverage from '../cmps/review-average.vue'
import reactiveBtn from './reactive-btn.vue'


export default {
    props: {
        house: Object
    },
    data() {
        return {
            order: null,
            cleaningFee: 0,
            serviceFee: 0,
            amenitiesSrc: []
        }
    },
    async created() {
        const { id } = this.$route.params
        this.order = orderService.getEmptyOrder()
    },
    methods: {
        addOrder() {
            this.$store.commit({ type: "toggleSuccessModal", bool: true });
            this.$store.dispatch({ type: 'addOrder', order: this.order })
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
            const button = ev.target
            const { x, y } = button.getBoundingClientRect();
            button.style.setProperty("--x", ev.clientX - x + 'px');
            button.style.setProperty("--y", ev.clientY - y + 'px');
        }

    },
    computed: {
        totalReviews() {
            const { reviews } = this.house
            if (reviews.length === 1) return '1 review'
            if (reviews.length > 1) return `${reviews.length} reviews`
            if (!reviews.length) return `No reviews yet...`
        },
        formattedPerNightPrice() {
            return this.format(this.house.price)
        },
        formattedTotalNightsPrice() {
            return this.format(this.totalDays() * this.house.price)
        },
        isOrderComplete() {
            return this.$store.state.isOrderComplete
        },
        getTotalDays() {
            return this.totalDays()
        },
        formattedCleaningFee() {
            return this.format(this.cleaningFee)
        },
        formattedServiceFee() {
            return this.format(this.serviceFee)
        },
        formattedTotal() {
            return this.format(this.serviceFee + this.cleaningFee + (this.totalDays() * this.house.price))
        },
        // getSrcSvg() {
        //     return
        // },
        // setBorderRadius() {
        // }
    },
    components: {
        reviewAverage,
        reactiveBtn
    }
}
</script>