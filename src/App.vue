<template>
  <app-header :close="isOpen" @open-search="setDark" />
  <RouterView />
  <section
    @click="toggleSearch"
    class="dark-site"
    :class="{ open: isOpen}"
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
    toggleSearch() {
      this.$store.commit({ type: "toggleSearch" });
    },
  },
  computed: {
    isOpen() {
      return this.$store.getters.open;
    },
  },
};
</script>
