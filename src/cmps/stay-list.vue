<template>
  <div class="stay-list">
    <stay-preview v-for="stay in stays" :stay="stay" />
    <skeleton v-if="isLoading" v-for="num in 12" :key="num" />
  </div>
</template>

<script>
import skeleton from "../cmps/skeleton.vue";

import stayPreview from "./stay-preview.vue"

export default {
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  props: {
    stays: {
      type: Array,
    },
  },
  components: {
    stayPreview,
    skeleton
  },
} 
</script>
