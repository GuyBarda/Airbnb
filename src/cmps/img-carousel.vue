<template>
  <carousel :items-to-show="1">
    <slide v-for="slide in imgs" :key="slide">
      <img :src="slide">
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'App',
  props: {
    imgs: {
      type: Array,
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
}
</script>

<style>
.carousel__slide {
  width:100% !important;
}
.carousel__pagination-button::after{
  padding: 2px;
  width: 0;
  height: 0;
  border-radius: 10em;
}
.carousel__pagination {
    padding: 0;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
</style>