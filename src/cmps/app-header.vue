<template>
  <header class="main-header full" :class="whichLayout">
    
    <div @click="goToHome" class="logo">
      <img src="../assets/svg/logo.svg" alt="" /> 
    </div>

    <house-search :date="currDate" :dest="currDest" @toggleSearch="openZone" :class="{ close: isOpen }"
      @click="toggleSearch($event, key)" />
    <search-modal @setDate="setDate" @setDest="setDest" @updateZone="openZone" :zone="zone" :class="{ open: isOpen }" />

    <div class="user">
      <a class="become-host" href="/#/login">Become a host</a>

      <a href="/#/explore">
        <img class="explore-btn" src="../assets/svg/i18n.svg" />
      </a>

      <div class="user-menu-btn" @click="toggleUserMenu()">
        <button>
          <img class="menu-btn" src="../assets/svg/menu.svg">
          <img v-if="!user" class="host-image" 
           src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png">
          <img v-else class="host-image" :src="user.imgUrl">
        </button>
      </div>

      <userMenu v-if="isMenu" />
    </div>

  </header>
</template>

<script>
import houseSearch from "./house-search.vue";
import searchModal from "./search-modal.vue";
import userMenu from "./user-menu.vue";

export default {
  props: {
    close: {
      type: Boolean,
    },
  },
  components: {
    houseSearch,
    searchModal,
    userMenu,
  },
  data() {
    return {
      logInUser: {},
      isMenu: false,
      currZone: "",
      currDest: '',
      currDate: '',
                  headerObserver: null,
      stickyNav: false,
    };
  },
  async created() {
    try {
      await this.$store.getters.loggedinUser
    } catch {
      console.log("cant load");
    }
  },
    mounted() {
    this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
      rootMargin: "-80px 0px 0px",
    });
    const elHeader = document.querySelector('header')
    this.headerObserver.observe(elHeader);
  },
  methods: {
        onHeaderObserved(entries) {
      entries.forEach((entry) => {
        this.stickyNav = entry.isIntersecting ? false : true;
      });
    },
    setDate(str) {
      this.currDate = str
    },
    setDest(val) {
      this.currDest = val
    },
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
    toggleUserMenu() {
      if (!this.isMenu) {
        this.isMenu = true
      } else {
        this.isMenu = false
      }
    },
    goToHome() {
      this.$router.push('/')
    },
    
  },
  computed: {
    user() {
      console.log('hey',this.$store.getters.loggedinUser)
        return this.$store.getters.loggedinUser
    },
    getDest() {
      return this.currDest
    },
    zone() {
      return this.currZone;
    },
    isOpen() {
      return this.$store.getters.open;
    },
    whichLayout() {
      const layout = this.$route.path.split('/')[1]
      return layout === 'house' ? 'secondary-container' : 'main-container'
    },
    
  },
}

</script>
