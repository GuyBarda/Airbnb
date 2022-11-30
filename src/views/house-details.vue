<template>
    <div v-if="house" class="house-details main-container">
        <div class="subtitle">
            <h2>{{ house.name }}</h2>
            <div class="">
                <star></star>
                <span>{{ averageReviews }}</span> ·
                <p>{{ totalReviews }}</p>·
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
                        <div>
                            <star></star>
                            <span>{{ averageReviews }}</span> ·
                            <p>{{ totalReviews }}</p>
                        </div>
                    </header>
                    <div class="date-picker"></div>
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
                <p>{{ averageReviews }}</p>
                <p>{{ totalReviews }}</p>
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


        <pre>{{ house }}</pre>
    </div>

</template>
  
<script>
import { houseService } from '../services/house-service-local'
import star from '../assets/svg/star.vue'
import reviewPreview from '../cmps/review-preview.vue'

export default {
    data() {
        return {
            house: null,
            order: {
                checkIn: Date.now(),
                checkOut: Date.now() + (1000 * 60 * 60 * 24 * 5),
                guests: 0
            }
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
    },
    methods: {
        addOrder(ev) {
            console.log(ev)

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
        }
    },
    components: {
        star,
        reviewPreview
    }
}
</script>