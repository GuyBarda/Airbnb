<template>
  <header class="main-header main-container full">
    <div class="logo">
      <img src="../assets/svg/logo.svg" alt="" />
    </div>

    <app-search  @toggleSearch="openZone" :class="{ close: isOpen }"  @click="toggleSearch($event)" />
    <search-modal  @updateZone="openZone" :zone="zone"  :class="{ open: isOpen }" />

    <div class="user">
      <a class="become-host" href="/#/login">Become a host</a>

      <a href="/#/explore">
        <img
          class="explore-btn"
          src="https://air2be.onrender.com/assets/en.60386c32.svg"
        />
      </a>

      <div class="user-menu-btn">
        <button>
          <img class="menu-btn" src="	https://air2be.onrender.com/assets/menu.67879f9a.svg">
          <img class="host-image" src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png">
        </button>
      </div>
    </div>

  </header>

</template>

<script>
import appSearch from "./house-search.vue";
import searchModal from "./search-modal.vue";
export default {
  props: {
    close: {
      type: Boolean,
    },
  },
  components: {
    appSearch,
    searchModal,
  },
  data() {
    return {
      currZone: "",
    };
  },
  methods: {
    openZone(key) {
      this.currZone = key;
    },
    toggleSearch(event) {
      if (event.target.innerText === "Any week") {
        this.$emit("clickDate");
      }
      this.$store.commit({ type: "toggleSearch", bool: true });
    },
  },
  computed: {
    zone() {
      return this.currZone;
    },
    isOpen() {
      return this.$store.getters.open;
    },
  },
};
</script>
