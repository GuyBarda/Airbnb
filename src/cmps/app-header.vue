<template>
  <header class="main-header main-container full">
    <div class="logo">
      <img src="../assets/svg/logo.svg" alt="" />
    </div>
    <app-search @toggleSearch="openZone" :class="{ close: isOpen }" @click="toggleSearch($event)" />
    <button ref="user" class="user">
      <img src="../assets/svg/user.svg" alt="" />
    </button>
    <search-modal @updateZone="openZone" :zone="zone" :class="{ open: isOpen }" />
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
    openZone(key){
      this.currZone = key
    },
    toggleSearch(event) {
      if(event.target.innerText === 'Any week') {
          this.$emit('clickDate')
      }
      this.$store.commit({ type: 'toggleSearch', bool: true })
    },
  },
  computed: {
    zone(){
      return this.currZone
    },
    isOpen() {
      return this.$store.getters.open
    }
  }
};
</script>
