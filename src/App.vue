<template>
  <app-header :close="isOpen" />
  <RouterView />

  <section @click="toggleSearch" class="dark-site" :class="{
    open: isOpen || isOrderComplete || isFilterOpen || isMustLogin,
    search: isOpen,
    must: isMustLogin,
  }"></section>
<<<<<<< HEAD
  <user-msg/>
=======
  <app-footer />
>>>>>>> 987ac4fb25f10b043a0d23785245867e9a0e272b
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import appHeader from "./cmps/app-header.vue";
<<<<<<< HEAD
import userMsg from './cmps/user-msg.vue'
import { showSuccessMsg } from './services/event-bus-service.js'
=======
import appFooter from "./cmps/app-footer.vue";
>>>>>>> 987ac4fb25f10b043a0d23785245867e9a0e272b

export default {
  created() {
    this.$store.dispatch({ type: 'loadUser' })
    showSuccessMsg('Admin has updated the store...')
  },
  methods: {
    toggleSearch(ev) {
      this.$store.commit({ type: "toggleSearch", bool: false });
      this.$store.commit({ type: "toggleSuccessModal", bool: false });
      this.$store.commit({ type: "toggleFilterModal", bool: false });
    }
  },
  computed: {
    isMustLogin() {
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
  components: {
    appHeader,
<<<<<<< HEAD
    userMsg
=======
    appFooter
>>>>>>> 987ac4fb25f10b043a0d23785245867e9a0e272b
  },
};
</script>
