<template>
  <carousel :items-to-show="1.5">
    <slide v-for="slide in 10" :key="slide">
      <div class="aaaa">1</div>
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
    houseImg: {
      type: String,
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
.aaa {
  background-color: green;
  width: 200px;
  height: 200px;
}
</style>