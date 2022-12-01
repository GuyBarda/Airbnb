<template>
  <header class="main-header main-container full">
    <div class="logo">
      <img src="../assets/svg/logo.svg" alt="" />
    </div>
    <app-search @toggleSearch="openZone" :class="{ close: isOpen }" @click="toggleSearch()" />
    <button class="user">
      <img src="../assets/svg/user.svg" alt="" />
    </button>
    <search-modal :zone="zone" :class="{ open: isOpen }" />
  </header>
</template>

<script>
import appSearch from "./house-search.vue";
import searchModal from "./search-modal.vue";
export default {
  props: {
    close: {
      type: Boolean
    }
  },
  components: {
    appSearch,
    searchModal,
  },
  data() {
    return {
      currZone: ''
    };
  },
  methods: {
    openZone(key) {
      console.log(key);
      this.currZone = key
      console.log(this.currZone);
    },
    toggleSearch() {
      this.$store.commit({ type: 'toggleSearch', bool: true })
      console.log(this.isOpen)
    },
  },
  computed: {
    zone() {
      console.log(this.currZone);
      return this.currZone
    },
    isOpen() {
      return this.$store.getters.open
    }
  }
};
</script>
