<template>
  <div class="house-list">
    <pre>{{houses}}</pre>
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
