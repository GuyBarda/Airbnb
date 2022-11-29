<template>
    <router-link :to="'house/'+house._id">
    <article class="house-preview">
        <heart-icon @click.prevent="isMark = !isMark" :class="{mark: isMark}" class="heart-btn"/>
        <!-- <div class="carousel"> -->
            <!-- <button class="arrow-btn arrow-left"><arrow-left /></button> -->
            <img-carousel @click.prevent :imgs="house.imgUrls"/>
            <!-- <img :src="house.imgUrls[0]"> -->
            <!-- <img :src="house.assets[0]" alt="house"> -->
            <!-- <button class="arrow-btn arrow-right"><arrow-right /></button> -->
        <!-- </div> -->
        <section>
        <p class="location">{{ location }}</p>
        <p>{{ house.name }}</p>
        <p><span class="price">{{ formattedPrice }}</span> night</p>
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

export default {
    props: {
        house: Object
    },
    data(){
        return{
            isMark: false,
        }
    },
    computed: {
        rate(){
            let sum = this.house.reviews.reduce((acc,{rate}) => acc+= rate,0)
            sum /=this.house.reviews.length
            return `${sum} (${this.house.reviews.length})`
        },
        location(){
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
        imgCarousel,
    }
};
</script>