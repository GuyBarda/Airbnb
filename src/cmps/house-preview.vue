<template>
    <router-link :to="'house/'+house._id" target="_blank">
    <article class="house-preview">
        <heart-icon @click.prevent="isMark = !isMark" :class="{mark: isMark}" class="heart-btn"/>
            <img-carousel @click.prevent :imgs="house.imgUrls"/>
        <section>
        <p class="location">{{ location }}</p>
        <p class="createdAt">{{createdAt}}</p>
        <p class="date">{{date}}</p>
        <p class="price"><span class="price-label">{{ formattedPrice }}</span> night</p>
        <p class="rate"><star-icon />&nbsp;{{rate}}</p>
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
    data() {
        return {
            isMark: false,
        }
    },
    computed: {
        createdAt() {
            return utilService.time_ago(new Date(this.house.createdAt))
        },
        date() {
            return utilService.getDates()
        },
        rate() {
            if (this.house.reviews.length === 0) return 'New'
            let sum = this.house.reviews.reduce((acc, { rate }) => acc += rate, 0)
            sum /= this.house.reviews.length
            return `${sum} (${this.house.reviews.length})`
        },
        location() {
            return `${this.house.loc.city},${this.house.loc.country}`
        },
        distanceFromMe() {
            return this.house.position;
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            });
            console.log(typeof formatter.format(this.house.price));
            let num = Number(formatter.format(this.house.price))
            console.log('num',num)
            return formatter.format(this.house.price)
        }
    },
    components: {
        arrowLeft,
        arrowRight,
        starIcon,
        heartIcon,
        imgCarousel,
    }
};
</script>