<template>
    <router-link :to="'house/'+house._id" target="_blank">
    <article class="house-preview">
        <heart-icon @click.prevent="setWishlist(house._id)" :class="{mark: isMark}" class="heart-btn"/>
            <img-carousel @click.prevent :imgs="house.imgUrls"/>
        <section>
        <p class="location">{{ location }}</p>
        <div>
        <p class="house-name">{{house.name}}</p>
        <p class="date">{{date}}</p>
        </div>
        <p class="price"><span class="price-label">{{ formattedPrice }}</span> night</p>
        <p class="rate"><star-icon />&nbsp {{rate}}</p>
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
        house: Object
    },
    created(){
        const {wishlist} = this.loggedinUser
        if(!wishlist) return
        const idx = wishlist.findIndex(house => house._id === this.house._id)
        this.isMark = idx > -1 ? true : false  
    },
    data() {
        return {
            isMark: false,
        }
    },
    methods: {
        setWishlist(houseId){
            this.isMark = !this.isMark
            this.$store.dispatch({type: 'setWishlist', houseId})
        },
    },
    computed: {
        date() {
            return utilService.getDates()
        },
        rate() {
            if (this.house.reviews.length === 0) return 'New'
            // let sum = this.house.reviews.reduce((acc, { rate }) => acc += rate, 0)
            // sum /= this.house.reviews.length
            let num = Math.round(Math.random()) * utilService.getRandomIntInclusive(1,5)
            return `${num} (${this.house.reviews.length})`
        },
        location() {
            return `${this.house.loc.city}, ${this.house.loc.country}`
        },
        distanceFromMe() {
            return this.house.position 
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }) 
            let num = Number(formatter.format(this.house.price))
            return formatter.format(this.house.price)
        },
        loggedinUser(){
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