<template>
    <router-link :to="'house/' + house._id">
        <article class="house-preview">
            <heart-icon @click.prevent="isMark = !isMark" :class="{ mark: isMark }" class="heart-btn" />
            <!-- <div class="carousel"> -->
            <!-- <button class="arrow-btn arrow-left"><arrow-left /></button> -->
            <!-- <img-carousel @click.prevent :imgs="house.imgUrls"/> -->
            <!-- <img :src="house.imgUrls[0]"> -->
            <!-- <img :src="house.assets[0]" alt="house"> -->
            <!-- <button class="arrow-btn arrow-right"><arrow-right /></button> -->
<<<<<<< HEAD
            <!-- </div> -->
            <section>
                <p class="location">{{ location }}</p>
                <p>{{ house.name }}</p>
                <p><span class="price">{{ formattedPrice }}</span> night</p>
                <p class="rate"><star-icon />&nbsp;{{ rate }}</p>
            </section>
        </article>
=======
        <!-- </div> -->
        <section>
        <p class="location">{{ location }}</p>
        <p class="createdAt">{{createdAt}}</p>
        <p class="date">{{date}}</p>
        <p class="price"><span class="price-label">{{ formattedPrice }}</span> night</p>
        <p class="rate"><star-icon />&nbsp;{{rate}}</p>
        </section>
    </article>
>>>>>>> 3b93e7268aeccad324309d2f112a291dc6445a4c
    </router-link>
</template>

<script>
import arrowLeft from '../assets/svg/arrow-left.vue'
import arrowRight from '../assets/svg/arrow-right.vue'
import starIcon from '../assets/svg/star.vue'
import heartIcon from '../assets/svg/heart.vue'
// import imgCarousel from '../cmps/img-carousel.vue'

//temporary
import {utilService} from '../services/utils-service.js'

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
<<<<<<< HEAD
        rate() {
            let sum = this.house.reviews.reduce((acc, { rate }) => acc += rate, 0)
            sum /= this.house.reviews.length
=======
        createdAt(){
            return utilService.time_ago(new Date(this.house.createdAt))
        },
        date(){
            return utilService.getDates()
        },
        rate(){
            if(this.house.reviews.length === 0) return 'New'
            let sum = this.house.reviews.reduce((acc,{rate}) => acc+= rate,0)
            sum /=this.house.reviews.length
>>>>>>> 3b93e7268aeccad324309d2f112a291dc6445a4c
            return `${sum} (${this.house.reviews.length})`
        },
        location() {
            return `${this.house.loc.country},${this.house.loc.city}`
        },
        distanceFromMe() {
            return this.house.position;
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            return formatter.format(this.house.price)
        }
    },
    components: {
        arrowLeft,
        arrowRight,
        starIcon,
        heartIcon,
        // imgCarousel,
    }
};
</script>