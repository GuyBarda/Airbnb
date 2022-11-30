<template>
  <carousel class="carousel" :items-to-show="7">
    <slide v-for="slide in btns" :key="slide">
            <div style="width:100px" @click="setSort(slide.key)">
                <img :src="slide.url" alt="" width="24" height="24">
                <div>{{slide.key}}</div>
            </div>
    </slide>

    <template #addons>
        <div class="filter-navigation">
            <navigation />
            <pagination />
        </div>
    </template>
  </carousel>
</template>

<script>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import  btns from './filter-btns.vue'
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
      btns,
      Navigation,
    },
    data() {
        return {
          labels: '',
        }
    },
    created() {
    },
  computed: {},
  methods: {
    setSort(labels) {
      this.labels = {labels}
      this.$emit("filtered", this.labels);
    },
  },

}
</script>
