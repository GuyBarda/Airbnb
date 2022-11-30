<template>
  <app-header :close="isOpen" />
  <RouterView />
  <!-- <section
    @click="toggleSearch"
    class="dark-site"
    :class="{ open: isOpen}"
  ></section> -->
  <section @click="toggleSearch" class="dark-site" :class="{ open: isOpen || isOrderComplete }"></section>

</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import appHeader from "./cmps/app-header.vue";

export default {
  components: {
    appHeader,
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    toggleSearch() {
      this.$store.commit({ type: "toggleSearch", bool: false });
      this.$store.commit({ type: "toggleSuccessModal", bool: false });

    },
  },
  computed: {
    isOpen() {
      return this.$store.getters.open;
    },
    isOrderComplete() {
      return this.$store.state.isOrderComplete
    },
  },
};
</script>
