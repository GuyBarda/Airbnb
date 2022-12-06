<template>
    <div v-if="stay" class="stay-details secondary-container">
        <div class="subtitle">
            <h2>{{ stay.name }}</h2>
            <div class="subtitle-text" style="display: flex; align-items: center; gap: 4px;">
                <review-average :reviews="stay.reviews" />·
                <span v-if="stay.host.isSuperhost"> &#127894; Superhost ·</span>

                <p>{{ stay.loc.city }}, {{ stay.loc.country }}</p>
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
            <img v-for="img in stay.imgUrls.slice(0, 5)" :src="img" :style="setBorderRadius">
        </div>

        <details-header :sticky="getSticky" :stay="stay" />

        <div class="stay-info">
            <section class="content">
                <div class="subtitle">
                    <h2>Entire home hosted by {{ stay.host.fullname }}</h2>
                    <div>
                        <span>{{ stay.capacity }} guests </span>
                        <span class="gray"> • </span>
                        <span>{{ stay.bathrooms }} Bathrooms </span>
                        <span class="gray"> • </span>
                        <span>{{ stay.bedrooms }} bedrooms </span>
                    </div>
                    <img class="host-image" :src="`${stay.host.thumbnailUrl}`" alt="">
                </div>
                <div class="user-stay-info">
                    <img v-if="stay.host.isSuperhost" src="../assets/svg/folder1/superhost.svg" alt="">
                    <div v-if="stay.host.isSuperhost">
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
                    {{ stay.summary }}
                </div>
                <div class="amenities-container" id="amenities">
                    <h2>What this place offers</h2>
                    <div class="stay-amenities">
                        <div v-for="a in stay.amenities" style="display: flex; gap: 13px;">
                            <img :src="`/src/assets/svg/amenities/${a.split(' ')[0].toLowerCase()}.svg`" alt="np"
                                style="width: 1.2em;">
                            <p>{{ a }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <reserve-modal @addOrder="addOrder" :stay="stay" />
        </div>

        <section id="reviews">
            <header>
                <review-average :reviews="stay.reviews" />
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
                <review-preview v-for="(review, idx) in !showMore ? stay.reviews.slice(0, 6) : stay.reviews"
                    :review="review" :idx="idx" />
            </main>
            <button v-if="(stay.reviews.length >= 6)" @click="(showMore = !showMore)" class="show-more">{{ `Show
                            ${!showMore ? `all
                            ${stay.reviews.length} reviews` : 'less'}`
            }}</button>
        </section>
    <section class="map">
    <h2>Where you'll be</h2>
        <details-map :lat="stay.loc.lat" :lng="stay.loc.lan" :title="stay.loc.address"/>
    </section>
        <reservation-success @close="(isOrderComplete = false)" v-if="isOrderComplete" :order="order" :stay="stay" />
    </div>
</template>

<script>
import { stayService } from '../services/stay-service-local.js'
import { orderService } from '../services/order-service-local.js'
import { userService } from '../services/user-service.js'

import star from '../assets/svg/star.vue'

import reviewPreview from '../cmps/review-preview.vue'
import reservationSuccess from '../cmps/reservation-success.vue'
import reviewAverage from '../cmps/review-average.vue'
import reserveModal from '../cmps/reserve-modal.vue'
import detailsHeader from '../cmps/details-header.vue'
import detailsMap from '../cmps/details-map.vue'
// import shareModal from '../cmps/share-modal.vue'

export default {
    data() {
        return {
            stay: null,
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
        this.stay = await stayService.getById(id)
        this.order = orderService.getEmptyOrder()
        this.$store.commit({ type: 'setLoggedinUser', user: userService.getLoggedinUser() })
        console.log(this.$store.getters.loggedinUser)
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
        addOrder(order) {
            if (!this.$store.getters.loggedinUser) return;
            this.order = order
            this.order.buyer = {
                _id: this.$store.getters.loggedinUser._id,
                fullname: this.$store.getters.loggedinUser.fullname
            }
            this.order.stay = {
                _id: this.stay._id,
                name: this.stay.name,
                price: this.stay.price
            }
            this.order.hostId = this.stay.host._id

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
            const { reviews } = this.stay
            if (reviews.length === 1) return '1 review'
            if (reviews.length > 1) return `${reviews.length} reviews`
            if (!reviews.length) return `No reviews yet...`
        },
        formattedPerNightPrice() {
            return this.format(this.stay.price)
        },
        formattedTotalNightsPrice() {
            return this.format(this.totalDays() * this.stay.price)
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
            return this.format(this.serviceFee + this.cleaningFee + (this.totalDays() * this.stay.price))
        },
        getSticky() {
            return this.sticky
        },
    },
    components: {
        star,
        reviewPreview,
        reservationSuccess,
        reviewAverage,
        reserveModal,
        detailsHeader,
        detailsMap,
        // shareModal
    },
}
</script>