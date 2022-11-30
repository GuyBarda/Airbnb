<template>
    <div v-if="house" class="house-details main-container">
        <div class="subtitle">
            <h2>{{ house.name }}</h2>
            <div class="">
                <review-average :reviews="house.reviews" />·
                <p>{{ house.loc.city }}, {{ house.loc.country }}</p>
            </div>
        </div>
        <div class="imgs-container">
            <img v-for="img in house.imgUrls" :src="img" alt="">
        </div>
        <div class="house-info">
            <setion class="content">
                <div class="subtitle">
                    <h3>Entire home hosted by {{ house.host.fullname }}</h3>
                    <span>{{ house.capacity }} guests</span>
                    <span></span>
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
                    <div v-for="a in house.amenities">
                        <p>{{ a }}</p>
                    </div>
                </div>
            </setion>
            <setion class="reserve-modal">
                <form @submit.prevent="addOrder">
                    <header>
                        <h3>{{ formattedPerNightPrice }} per night</h3>
                        <review-average :reviews="house.reviews" />
                    </header>
                    <div class="date-picker">
                        <input type="date" v-model="order.startDate">
                        <input type="date" v-model="order.endDate">
                        <input type="number" v-model="order.guests.adults">
                    </div>
                    <button class="btn-reserve">Reserve</button>
                    <p>You won't be charged yet</p>
                    <div class="prices">
                        <p>{{ formattedPerNightPrice }} x {{ totalNights }} nights</p>
                        <p>{{ formattedTotalsNightsPrice }}</p>
                        <p>cleaning fee</p>
                        <p>{{ formattedFeePrice }}</p>
                        <p>service fee</p>
                        <p>{{ formattedFeePrice }}</p>
                    </div>
                    <div class="total">
                        <p>Total</p>
                        <p>{{ formattedTotalPrice }}</p>
                    </div>
                </form>
            </setion>
        </div>

        <section class="reviews">
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

        <pre>{{ house }}</pre>
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
            // isOrderComplete: false,
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
        this.order = orderService.getEmptyOrder()
    },
    methods: {
        addOrder() {
            // this.isOrderComplete = true
            this.$store.commit({ type: "toggleSuccessModal", bool: true });
            this.$store.dispatch({ type: 'addOrder', order: this.order })
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
            return this.house.price
        },
        isOrderComplete() {
            return this.$store.state.isOrderComplete
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