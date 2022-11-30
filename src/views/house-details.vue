<template>
    <div v-if="house" class="house-details main-container">
        <div class="subtitle">
            <h2>{{ house.name }}</h2>
            <div style="display: flex; align-items: center; gap: 4px;">
                <review-average :reviews="house.reviews" />·
                <p>{{ house.loc.city }}, {{ house.loc.country }}</p>
            </div>
        </div>
        <div class="imgs-container">
            <img v-for="img in house.imgUrls" :src="img" :style="setBorderRadius">
        </div>

        <div class="house-info">
            <setion class="content">
                <div class="subtitle">
                    <h2>Entire home hosted by {{ house.host.fullname }}</h2>
                    <div>
                        <span>{{ house.capacity }} guests </span>
                        <span class="gray"> • </span>
                        <span>{{ house.roomsAndBeds.Bathrooms }} Bathrooms </span>
                        <span class="gray"> • </span>
                        <span>{{ house.roomsAndBeds.bedrooms }} bedrooms </span>
                    </div>
                    <img class="host-image" :src="`${house.host.imgUrl}`" alt="">
                </div>

                <div class="air-cover">
                    <h3><span style="color: #fe385c;">air</span>cover</h3>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other
                        issues like trouble checking in.</p>
                    <a href="#">Learn more</a>
                </div>

                <div class="summary">
                    {{ house.summary }}
                </div>
                <!-- <div class="choose-beds">
                    <h3>Where you'll sleep</h3>
                    <div class="beds-btns">
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                    </div>
                </div> -->
                <div class="house-amenities">
                    <div v-for="a in house.amenities" style="display: flex; gap: 13px;">
                        <img :src="`/src/assets/svg/amenities/${a.toLowerCase()}.svg`" alt="np" style="width: 1.2em;">
                        <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                        <p>{{ a }}</p>
                    </div>
                </div>
            </setion>

            <setion class="reserve-modal">
                <form @submit.prevent="addOrder">
                    <header>
                        <h4><span>{{ formattedPerNightPrice }}</span> per night</h4>
                        <review-average :reviews="house.reviews" />
                    </header>
                    <div class="date-picker">
                        <input type="date" v-model="order.startDate">
                        <input type="date" v-model="order.endDate">
                        <input type="number" v-model="order.guests.adults">
                    </div>
                    <button class="btn-reserve">Reserve</button>
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
                </form>
            </setion>
        </div>

        <section id="reviews">
            <header>
                <review-average :reviews="house.reviews" />
            </header>
            <div class="rating">
                <p>cleanliness</p>
                <div><span>-</span></div>
                <p>Communication</p>
                <div><span>-</span></div>
                <p>Check-in</p>
                <div><span>-</span></div>
                <p>Accuracy</p>
                <div><span>-</span></div>
                <p>Location</p>
                <div><span>-</span></div>
                <p>Value</p>
                <div><span>-</span></div>
            </div>
            <main class="review-container">
                <review-preview v-for="review in house.reviews" :review="review" />
            </main>
        </section>

        <reservation-success @close="(isOrderComplete = false)" v-if="isOrderComplete" :order="order" :house="house" />
    </div>
</template>

<script>
import { houseService } from '../services/house-service-local.js'
import { orderService } from '../services/order-service-local.js'
import star from '../assets/svg/star.vue'
import reviewPreview from '../cmps/review-preview.vue'
import reservationSuccess from '../cmps/reservation-success.vue'
import reviewAverage from '../cmps/review-average.vue'

export default {
    data() {
        return {
            house: null,
            order: null,
            cleaningFee: 0,
            serviceFee: 0,
            amenitiesSrc: []
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
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
        srcSvg() {
            // return `../assets/svg/amenities/${a}.svg`
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
        getSrcSvg() {
            return
        },
        setBorderRadius() {
        }
    },
    components: {
        star,
        reviewPreview,
        reservationSuccess,
        reviewAverage
    }
}
</script>