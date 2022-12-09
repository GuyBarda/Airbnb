<template>
    <div v-if="stay" class="stay-details secondary-container">
        <div class="subtitle">
            <h2>{{ stay.name }}</h2>
            <div class="subtitle-text" style="display: flex; align-items: center; gap: 4px">
                <review-average :reviews="stay.reviews.length" :rateMap="rate" /><span>·</span>
                <p>{{ stay.loc.city }}, {{ stay.loc.country }}</p>
                <div class="share-save-actions">
                    <span class="share-stay">
                        <img src="../assets/svg/share.svg" alt="" />
                        <span>Share</span>
                    </span>
                    <span @click="addToWishlist" class="save-stay">
                        <!-- <img src="../assets/svg/love.svg" alt="" /> -->
                        <heart-icon @click.prevent="setWishlist" :class="{ mark: isMark }" class="heart-btn" />
                        <span style="outline: 0px">Save</span>
                    </span>
                </div>
            </div>
        </div>
        <div ref="imgsContainer" class="imgs-container" id="photos">
            <img v-for="img in stay.imgUrls.slice(0, 5)" :src="img" />
        </div>

        <details-header :showReserve="getIsReserve" :sticky="getSticky" :stay="stay" :reviews="stay.reviews.length"
            :rateMap="rate" />

        <div class="stay-info">
            <section class="content">
                <div class="subtitle">
                    <h2>
                        {{ stay.roomType }} hosted by {{ stay.host.fullname }}
                    </h2>
                    <div style="margin-top: 3px;">
                        <span>{{ stay.capacity }} guests </span>
                        <span class="gray"> • </span>
                        <span>{{ stay.bathrooms }} bathrooms </span>
                        <span class="gray"> • </span>
                        <span>{{ stay.bedrooms }} bedrooms </span>
                    </div>
                    <img class="host-image" :src="`${stay.host.thumbnailUrl || stay.host.imgUrl}`" alt="" />
                </div>
                <div class="user-stay-info">
                    <img v-if="stay.host.isSuperhost" src="../assets/svg/folder1/superhost.svg" alt="" />
                    <div v-if="stay.host.isSuperhost">
                        <p style="font-weight: bold">Renata is a Superhost</p>
                        <p class="subtext">
                            Superhosts are experienced, highly rated hosts who
                            are committed to providing great stays for guests.
                        </p>
                    </div>
                    <img src="../assets/svg/folder1/location.svg" alt="" />
                    <div>
                        <p style="font-weight: bold">Great location</p>
                        <p class="subtext">
                            100% of recent guests gave the location a 5-star
                            rating.
                        </p>
                    </div>
                    <img src="../assets/svg/folder1/checkin.svg" alt="" />
                    <div>
                        <p style="font-weight: bold">
                            Great check-in experience
                        </p>
                        <p class="subtext">
                            95% of recent guests gave the check-in process a
                            5-star rating.
                        </p>
                    </div>
                </div>

                <div class="air-cover">
                    <h3 style="font-family: CerealMd">
                        <span style="color: #fe385c">air</span>cover
                    </h3>
                    <p>
                        Every booking includes free protection from Host
                        cancellations, listing inaccuracies, and other issues
                        like trouble checking in.
                    </p>
                    <!-- <a href="#">Learn more</a> -->
                </div>

                <div class="summary">
                    {{ stay.summary }}
                </div>
                <div class="amenities-container" id="amenities">
                    <h2>What this place offers</h2>
                    <div class="stay-amenities">
                        <div v-for="a in stay.amenities" style="display: flex; gap: 13px">
                            <img :src="`/src/assets/svg/amenities/${a
                            .split(' ')[0]
                            .toLowerCase()}.svg`" alt="np" style="width: 1.2em" />
                            <p>{{ a }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <reserve-modal @addOrder="addOrder" :stay="stay" :reviews="stay.reviews.length" :rateMap="rate" />
        </div>

        <section v-if="stay.reviews.length" id="reviews">
            <header>
                <review-average :reviews="stay.reviews.length" :rateMap="rate" />
            </header>
            <div class="rating">
                <p>Cleanliness</p>
                <span class="progress-container"><progress :value="rate.Cleanliness" max="5"></progress>{{
                        rate.Cleanliness.toFixed(1)
                }}</span>
                <p>Communication</p>
                <span class="progress-container"><progress :value="rate.Communication" max="5"></progress>{{
                        rate.Communication.toFixed(1)
                }}</span>
                <p>Check-in</p>
                <span class="progress-container"><progress :value="rate['Check-in']" max="5"></progress>{{
                        rate['Check-in'].toFixed(1)
                }}</span>
                <p>Accuracy</p>
                <span class="progress-container"><progress :value="rate.Accuracy" max="5"></progress>{{
                        rate.Accuracy.toFixed(1)
                }}</span>
                <p>Location</p>
                <span class="progress-container"><progress :value="rate.Location" max="5"></progress>{{
                        rate.Location.toFixed(1)
                }}</span>
                <p>Value</p>
                <span class="progress-container"><progress :value="rate.Value" max="5"></progress>{{
                        rate.Value.toFixed(1)
                }}</span>
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
        <section v-else class="reviews-else">
            <!-- <h4>No reviews yet...</h4> -->
            <h4>This stay have 0 reviews</h4>
        </section>
        <section class="map">
            <h2>Where you'll be</h2>
            <h1>{{ stay.loc.city }}, {{ stay.loc.country }}</h1>
            <details-map class="map-for-details" :lat="stay.loc.lat" :lng="stay.loc.lan" :title="stay.loc.address" />
        </section>
        <reservation-success @close="isOrderComplete = false" v-if="isOrderComplete" :order="order" :stay="stay"
            :rateMap="rate" />
    </div>
</template>

<script>
import { stayService } from "../services/stay-service.js";
import { orderService } from "../services/order-service.js";
import { userService } from "../services/user-service.js";
import { wishlistMsg } from '../services/event-bus-service.js';

import heartIcon from '../assets/svg/heart.vue'

import reviewPreview from "../cmps/review-preview.vue";
import reservationSuccess from "../cmps/reservation-success.vue";
import reviewAverage from "../cmps/review-average.vue";
import reserveModal from "../cmps/reserve-modal.vue";
import detailsHeader from "../cmps/details-header.vue";
import detailsMap from "../cmps/details-map.vue";

export default {
    data() {
        return {
            stay: null,
            order: null,
            cleaningFee: 0,
            serviceFee: 0,
            amenitiesSrc: [],
            showMore: false,
            sticky: false,
            isReserveInHeader: false,
            isMark: false,
        };
    },
    async created() {
        const { id } = this.$route.params;
        this.stay = await stayService.getById(id);
        this.order = orderService.getEmptyOrder();
        this.$store.commit({
            type: "setLoggedinUser",
            user: userService.getLoggedinUser(),
        });
    },
    mounted() {
        setTimeout(() => {
            const imgsContainer = this.$refs.imgsContainer;
            const elReserveBtn = document.querySelector(
                ".reserve-modal .btn-reserve"
            );

            const observerForImgs = new IntersectionObserver((entries) => {
                entries.forEach(
                    (entry) => (this.sticky = !entry.isIntersecting)
                );
            },);
            const observerForReserveBtn = new IntersectionObserver(
                (entries) => {
                    entries.forEach(
                        (entry) =>
                            (this.isReserveInHeader = !entry.isIntersecting)
                    );
                }, { threshold: 1 }
            );
            observerForImgs.observe(imgsContainer);
            observerForReserveBtn.observe(elReserveBtn);
        }, 1000);
    },
    methods: {
        addOrder(order) {
            this.order = order;
            this.order.buyer = {
                _id: this.$store.getters.loggedinUser._id,
                fullname: this.$store.getters.loggedinUser.fullname,
            };
            this.order.stay = {
                _id: this.stay._id,
                name: this.stay.name,
                price: this.stay.price,
                imgUrls: this.stay.imgUrls.slice(0, 3),
                loc: {
                    address: this.stay.loc.address,
                },
            };
            this.order.hostId = this.stay.host._id;

            this.$store.commit({ type: "toggleSuccessModal", bool: true });
            this.$store.dispatch({ type: "addOrder", order: this.order });
        },
        totalDays() {
            const date1 = new Date(this.order.startDate);
            const date2 = new Date(this.order.endDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        },
        format(num) {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            return formatter.format(num);
        },
        async addToWishlist() {
            this.isMark = !this.isMark
            await this.$store.dispatch({ type: 'setWishlist', stayId: this.stay._id })
            wishlistMsg(`${this.stay.name} saved to wishlist`);

        },
    },
    computed: {
        rate() {
            if (this.stay.reviews.length === 0) return 'new'
            const rateKeys = Object.keys(this.stay.reviews[0].rate);
            const rateMap = {};
            rateKeys.forEach((key) => {
                let sum = this.stay.reviews.reduce((acc, { rate }) => {
                    return (acc += rate[key]);
                }, 0);
                rateMap[key] = sum / this.stay.reviews.length;
            });
            return rateMap;
        },
        totalReviews() {
            const { reviews } = this.stay;
            if (reviews.length === 1) return "1 review";
            if (reviews.length > 1) return `${reviews.length} reviews`;
            if (!reviews.length) return `No reviews yet...`;
        },
        formattedPerNightPrice() {
            return this.format(this.stay.price);
        },
        formattedTotalNightsPrice() {
            return this.format(this.totalDays() * this.stay.price);
        },
        isOrderComplete() {
            return this.$store.state.isOrderComplete;
        },
        getTotalDays() {
            return this.totalDays();
        },
        formattedCleaningFee() {
            return this.format(this.cleaningFee);
        },
        formattedServiceFee() {
            return this.format(this.serviceFee);
        },
        formattedTotal() {
            return this.format(
                this.serviceFee +
                this.cleaningFee +
                this.totalDays() * this.stay.price
            );
        },
        getSticky() {
            return this.sticky;
        },
        getIsReserve() {
            return this.isReserveInHeader;
        },
    },
    components: {
        reviewPreview,
        reservationSuccess,
        reviewAverage,
        reserveModal,
        detailsHeader,
        detailsMap,
        heartIcon
    },
};
</script>
