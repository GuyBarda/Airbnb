<template>
  <header class="main-header main-container full">
    <div class="logo">
      <img src="../assets/svg/logo.svg" alt="" />
    </div>

    <app-search @toggleSearch="openZone" :class="{ close: isOpen }" @click="toggleSearch($event,key)" />
    <search-modal @updateZone="openZone" :zone="zone" :class="{ open: isOpen }" />

    <div class="user">
      <a class="become-host" href="/#/login">Become a host</a>

      <a href="/#/explore">
        <img class="explore-btn" src="https://air2be.onrender.com/assets/en.60386c32.svg" />
      </a>

      <div class="user-menu-btn" @click="toggleUserMenu()">
        <button>
          <img class="menu-btn" src="	https://air2be.onrender.com/assets/menu.67879f9a.svg">
          <img class="host-image" src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png">
        </button>
      </div>
      <userMenu v-if="isMenu"/>
    </div>
  </header>
</template>

<script>
import appSearch from "./house-search.vue";
import searchModal from "./search-modal.vue";
import userMenu from "./user-menu.vue";

export default {
  props: {
    close: {
      type: Boolean,
    },
  },
  components: {
    appSearch,
    searchModal,
    userMenu,
  },
  data() {
    return {
      isMenu: false,
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
        this.currZone = key;
      }
    },
    // toggleSearch(event,key) {
    //   if (event.target.innerText === "Any week") {
    //     this.$emit("clickDate");
    //   }
    //   this.currZone = key
    //   console.log('hi');
    // },
    toggleSearch(event) {
      if (event.target.innerText === "Any week") {
        this.$emit("clickDate");
      }
      console.log('hi');
      this.$store.commit({ type: "toggleSearch", bool: true });
    },
    toggleUserMenu(){
      if(!this.isMenu){
        this.isMenu = true
      }else{
        this.isMenu = false
      }
    }
  
  },
  computed: {
    zone() {
      return this.currZone;
    },
    isOpen() {
      return this.$store.getters.open;
    },
  },
}

</script>
