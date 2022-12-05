<template>
    <div v-if="house" class="house-details secondary-container">
        <div class="subtitle">
            <h2>{{ house.name }}</h2>
            <div class="subtitle-text" style="display: flex; align-items: center; gap: 4px;">
                <review-average :reviews="house.reviews" />·
                <span v-if="house.host.isSuperhost"> &#127894; Superhost ·</span>

                <p>{{ house.loc.city }}, {{ house.loc.country }}</p>
                <div class="share-save-actions">
                    <span class="share-stay">
                        <img src="../assets/svg/share.svg" alt="">
                        <span>Share</span>
                    </span>
                    <span class="save-stay">
                        <img src="../assets/svg/love.svg" alt="">
                        <span style="outline: 0px;">Save</span>
                    </span>
                </div>
            </div>
        </div>
        <!-- <shareModal/> -->
        <div ref="imgsContainer" class="imgs-container" id="photos">
            <img v-for="img in house.imgUrls.slice(0, 5)" :src="img" :style="setBorderRadius">
        </div>

        <details-header :sticky="getSticky" :house="house" />

        <div class="house-info">
            <section class="content">
                <div class="subtitle">
                    <h2>Entire home hosted by {{ house.host.fullname }}</h2>
                    <div>
                        <span>{{ house.capacity }} guests </span>
                        <span class="gray"> • </span>
                        <span>{{ house.bathrooms }} Bathrooms </span>
                        <span class="gray"> • </span>
                        <span>{{ house.bedrooms }} bedrooms </span>
                    </div>
                    <img class="host-image" :src="`${house.host.thumbnailUrl}`" alt="">
                </div>
                <div class="user-house-info">
                    <img v-if="house.host.isSuperhost" src="../assets/svg/folder1/superhost.svg" alt="">
                    <div v-if="house.host.isSuperhost">
                        <p style="font-weight: bold;">Renata is a Superhost</p>
                        <p class="subtext">
                            Superhosts are experienced, highly rated hosts who are committed to providing great stays
                            for
                            guests.
                        </p>
                    </div>
                    <img src="../assets/svg/folder1/location.svg" alt="">
                    <div>
                        <p style="font-weight: bold;">Great location</p>
                        <p class="subtext">100% of recent guests gave the location a 5-star rating.</p>
                    </div>
                    <img src="../assets/svg/folder1/checkin.svg" alt="">
                    <div>
                        <p style="font-weight: bold;">Great check-in experience</p>
                        <p class="subtext">95% of recent guests gave the check-in process a 5-star rating.</p>
                    </div>

                </div>

                <div class="air-cover">
                    <h3 style="font-family: CerealMd;"><span style="color: #fe385c;">air</span>cover</h3>
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
                <div class="amenities-container" id="amenities">
                    <h2>What this place offers</h2>
                    <div class="house-amenities">
                        <div v-for="a in house.amenities" style="display: flex; gap: 13px;">
                            <img :src="`/src/assets/svg/amenities/${a.split(' ')[0].toLowerCase()}.svg`" alt="np"
                                style="width: 1.2em;">
                            <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                            <p>{{ a }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <reserve-modal :house="house" />

        </div>

        <section id="reviews">
            <header>
                <review-average :reviews="house.reviews" />
            </header>
            <div class="rating">
                <p>Cleanliness</p>
                <span class="progress-container"><progress value="4" max="5"></progress></span>
                <p>Communication</p>
                <span class="progress-container"><progress value="3" max="5"></progress></span>
                <p>Check-in</p>
                <span class="progress-container"><progress value="4.5" max="5"></progress></span>
                <p>Accuracy</p>
                <span class="progress-container"><progress value="3.8" max="5"></progress></span>
                <p>Location</p>
                <span class="progress-container"><progress value="3.9" max="5"></progress></span>
                <p>Value</p>
                <span class="progress-container"><progress value="4.2" max="5"></progress></span>
            </div>
            <main class="review-container">
                <review-preview v-for="(review, idx) in !showMore ? house.reviews.slice(0, 6) : house.reviews"
                    :review="review" :idx="idx" />
            </main>
            <button v-if="(house.reviews.length >= 6)" @click="(showMore = !showMore)" class="show-more">{{ `Show
                            ${!showMore ? `all
                            ${house.reviews.length} reviews` : 'less'}`
            }}</button>
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
import reserveModal from '../cmps/reserve-modal.vue'
import detailsHeader from '../cmps/details-header.vue'
// import shareModal from '../cmps/share-modal.vue'

export default {
    data() {
        return {
            house: null,
            order: null,
            cleaningFee: 0,
            serviceFee: 0,
            amenitiesSrc: [],
            showMore: false,
            sticky: false
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
        this.order = orderService.getEmptyOrder()
        console.log(this.house)
    },
    mounted() {
        setTimeout(() => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => this.sticky = !entry.isIntersecting)
            })
            const imgsContainer = this.$refs.imgsContainer;
            observer.observe(imgsContainer)
        }, 1000);
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
        getSticky() {
            return this.sticky
        }

    },
    components: {
        star,
        reviewPreview,
        reservationSuccess,
        reviewAverage,
        reserveModal,
        detailsHeader,
        // shareModal
    }
}
</script>