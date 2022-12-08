<template>
  <div class="stay-list">
    <stay-preview v-for="stay in stays" :stay="stay" />
    <!-- <stay-preview :stay="stays[0]" /> -->
  </div>
</template>

<script>
import stayPreview from "./stay-preview.vue" 
// import skeleton from "./skeleton.vue";

export default {
  props: {
    stays: {
      type: Array,
    },
  },
  components: {
    stayPreview,
  },
} 
</script>
