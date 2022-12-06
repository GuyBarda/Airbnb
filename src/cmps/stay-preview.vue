<template>
    <router-link :to="'stay/' + stay._id" target="_blank">
        <article class="stay-preview">
            <heart-icon @click.prevent="setWishlist(stay._id)" :class="{ mark: isMark }" class="heart-btn" />
            <img-carousel @click.prevent :imgs="stay.imgUrls" />
            <section>
                <p class="location">{{ location }}</p>
                <main>
                    <p class="stay-name">{{ stay.name }}</p>
                    <p class="date">{{ date }}</p>
                </main>
                <p class="price"><span class="price-label">{{ formattedPrice }}</span> night</p>
                <p class="rate"><star-icon />&nbsp {{ rate }}</p>
            </section>
        </article>
    </router-link>
</template>

<script>
import arrowLeft from '../assets/svg/arrow-left.vue'
import arrowRight from '../assets/svg/arrow-right.vue'
import starIcon from '../assets/svg/star.vue'
import heartIcon from '../assets/svg/heart.vue'
import imgCarousel from '../cmps/img-carousel.vue'

//temporary
import { utilService } from '../services/utils-service.js'

export default {
    props: {
        stay: Object
    },
    data() {
        return {
            isMark: false,
        }
    },
    created() {
        const wishlist = this.loggedinUser?.wishlist
        if (!wishlist) return
        const idx = wishlist.findIndex(stay => stay._id === this.stay._id)
        this.isMark = idx > -1 ? true : false
    },
    methods: {
        setWishlist(stayId) {
            this.isMark = !this.isMark
            this.$store.dispatch({ type: 'setWishlist', stayId })
        },
    },
    computed: {
        date() {
            return utilService.getDates()
        },
        rate() {
            if (this.stay.reviews.length === 0) return 'New'
            // let sum = this.stay.reviews.reduce((acc, { rate }) => acc += rate, 0)
            // sum /= this.stay.reviews.length
            let num = Math.round(Math.random()) * utilService.getRandomIntInclusive(1, 5)
            return `${num} (${this.stay.reviews.length})`
        },
        location() {
            return `${this.stay.loc.city}, ${this.stay.loc.country}`
        },
        distanceFromMe() {
            return this.stay.position
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            })
            let num = Number(formatter.format(this.stay.price))
            return formatter.format(this.stay.price)
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    components: {
        arrowLeft,
        arrowRight,
        starIcon,
        heartIcon,
        imgCarousel,
    }
} 
</script>