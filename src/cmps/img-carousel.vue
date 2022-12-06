<template>
    <carousel :items-to-show="1">
        <slide v-for="slide in imgs" :key="slide">
            <img :src="slide" />
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
</template>
  
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
    name: "App",
    props: {
        imgs: {
            type: Array,
        },
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
};
</script>