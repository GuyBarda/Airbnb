<template>
  <carousel class="carousel" :items-to-show="13">
    <slide v-for="slide in btns" :key="slide">
            <div @click="setSort(slide.key)">
                <img class="img-btn" :src="slide.url" alt="" width="24" height="24">
                <div class="imgKey"><span>{{slide.key}}</span></div>
            </div>
    </slide>

    <template #addons>
        <div class="filter-navigation">
            <navigation />
        </div>
    </template>
  </carousel>
</template>

<script>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'

  export default {
    name: 'App',
    props: {
    btns: {
      type: Array,
    }
  },
    components: {
      Carousel,
      Slide,
      Navigation,
    },
    data() {
        return {
          filterBy:{
            labels: [],

          },
        }
    },
    created() {
    },
  computed: {},
  methods: {
    setSort(label) {
      this.filterBy.labels.push(label) 
      this.$emit("filtered", this.filterBy);
    },
  },

}
</script>
