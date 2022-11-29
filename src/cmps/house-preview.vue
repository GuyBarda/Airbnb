<template>
    <router-link :to="'house/'+house._id">
    <section class="house-preview">
        <!-- <div class="carousel"> -->
            <!-- <button class="arrow-btn arrow-left"><arrow-left /></button> -->
            <!-- <img-carousel/> -->
            <img :src="house.imgUrls[0]">
            <!-- <img :src="house.assets[0]" alt="house"> -->
            <!-- <button class="arrow-btn arrow-right"><arrow-right /></button> -->
        <!-- </div> -->
        <p class="location">{{ location }}</p>
        <p>{{ house.name }}</p>
        <p>{{ house.price }}</p>
    </section>
    </router-link>
</template>

<script>
import arrowLeft from '../assets/svg/arrow-left.vue'
import arrowRight from '../assets/svg/arrow-right.vue'
import imgCarousel from '../cmps/img-carousel.vue'

export default {
    props: {
        house: Object
    },
    computed: {
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
    components:{
        arrowLeft,
        arrowRight,
        imgCarousel
    }
};
</script>