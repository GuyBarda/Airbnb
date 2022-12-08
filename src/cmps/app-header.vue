<template>
    <header class="main-header full" :class="whichLayout">
        <div @click="goToHome" class="logo-container">
            <img src="../assets/img/favicon.png" alt="" />
            <p>airbxb</p>
        </div>

        <stay-search :date="currDate" :dest="currDest" @toggleSearch="openZone" :class="{ close: isOpen }" />
        <!-- @click="toggleSearch($event, key)" -->
        <search-modal @setDate="setDate" @setDest="setDest" @updateZone="openZone" :zone="zone"
            :class="{ open: isOpen }" />

        <div class="user">
            <a class="become-host" href="/#/login">Become a host</a>

            <!-- <a href="/#/explore">
                <img class="explore-btn" src="../assets/svg/i18n.svg" />
            </a> -->

            <div class="user-menu-btn" @click="toggleUserMenu()">
                <button>
                    <img class="menu-btn" src="../assets/svg/menu.svg" />
                    <img v-if="!user" class="host-image"
                        src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png" />
                    <img v-else class="host-image" :src="user.imgUrl" />
                </button>
            </div>

            <userMenu v-if="isMenu" @closeMenu="closeMenu" />
        </div>

    </header>

    <!-- <div class="alert alert-Wishlist">
        <i class="fa fa-duotone fa-heart"></i>
        user are updet
    </div> -->




</template>
  
<script>
import { eventBus } from "../services/event-bus-service";

import staySearch from "./stay-search.vue";
import searchModal from "./search-modal.vue";
import userMenu from "./user-menu.vue";

export default {
    props: {
        close: {
            type: Boolean,
        },
        emptyZone: String,
    },
    data() {
        return {
            logInUser: {},
            isMenu: false,
            currZone: "",
            currDest: "",
            currDate: "",
            isSearch: false
        };
    },
    created() {
        eventBus.on('closeDatePicker', this.closeDatePicker)
    },
    methods: {
        closeDatePicker() {
            this.currZone = ''
        },
        setDate(str) {
            this.currDate = str;
        },
        setDest(val) {
            this.currDest = val;
        },
        openZone( ev, key ) {
            console.log('key', key)
            console.log('ev', ev)
            this.currZone = key;
            if (ev.target.innerText === "Any week") this.$emit("clickDate");
            this.$store.commit({ type: "toggleSearch", bool: true });
        },
        toggleUserMenu() {
            this.isMenu = !this.isMenu
        },
        closeMenu() {
            this.isMenu = false
        },
        goToHome() {
            this.$router.push("/");
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser;
        },
        getDest() {
            return this.currDest;
        },
        zone() {
            return this.currZone;
        },
        isOpen() {
            return this.$store.getters.open;
        },
        whichLayout() {
            const layout = this.$route.path.split("/")[1];
            return layout === "stay" || layout === 'dashboard' ? "secondary-container" : "main-container";
        },
    },
    components: {
        staySearch,
        searchModal,
        userMenu,
    },
};
</script>
  