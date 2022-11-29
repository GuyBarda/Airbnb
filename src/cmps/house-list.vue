<template>
  <div class="house-list">
    <house-preview v-for="house in houses" :house="house" />
  </div>
</template>

<script>
import housePreview from "./house-preview.vue";

export default {
  props: {
    houses: {
      type: Array,
    },
  },
  components: {
    housePreview,
  },
};
</script>
