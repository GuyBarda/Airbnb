<template>
  <app-header :close="isOpen" />
  <RouterView />
  <!-- <section
    @click="toggleSearch"
    class="dark-site"
    :class="{ open: isOpen}"
  ></section> -->
  <section
    @click="toggleSearch"
    class="dark-site"
    :class="{
      open: isOpen || isOrderComplete || isFilterOpen || isMustLogin,
      search: isOpen,
      modals: isOrderComplete || isFilterOpen || isMustLogin,
      must: isMustLogin,
    }"
  ></section>
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
  methods: {
    toggleSearch(ev) {
      console.log(ev)
      this.$store.commit({ type: "toggleSearch", bool: false });
      this.$store.commit({ type: "toggleSuccessModal", bool: false });
      this.$store.commit({ type: "toggleFilterModal", bool: false });
    },
  },
  computed: {
    isMustLogin(){
      return this.$store.getters.isMustLogin
    },
    isFilterOpen() {
      return this.$store.getters.isFilterOpen
    },
    isOpen() {
      return this.$store.getters.open;
    },
    isOrderComplete() {
      return this.$store.state.isOrderComplete
    },
  },
};
</script>
