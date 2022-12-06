<template>
    <header class="main-header full" :class="whichLayout">
        <div @click="goToHome" class="logo-container">
            <img src="../assets/img/favicon.png" alt="" />
            <p>airbxb</p>
        </div>

<<<<<<< HEAD
        <stay-search
            :date="currDate"
            :dest="currDest"
            @toggleSearch="openZone"
            :class="{ close: isOpen }"
            @click="toggleSearch($event, key)"
        />
        <search-modal
            @setDate="setDate"
            @setDest="setDest"
            @updateZone="openZone"
            :zone="zone"
            :class="{ open: isOpen }"
        />
=======
        <stay-search :date="currDate" :dest="currDest" @toggleSearch="openZone" :class="{ close: isOpen }"
            @click="toggleSearch($event, key)" />
        <search-modal @setDate="setDate" @setDest="setDest" @updateZone="openZone" :zone="zone"
            :class="{ open: isOpen }" />
>>>>>>> 9f71fe8c4c9febb19444a61c38f7048211f7fdb8

        <div class="user">
            <a class="become-host" href="/#/login">Become a host</a>

            <!-- <a href="/#/explore">
<<<<<<< HEAD
                <img class="explore-btn" src="../assets/svg/i18n.svg" />
            </a> -->
=======
                  <img class="explore-btn" src="../assets/svg/i18n.svg" />
              </a> -->
>>>>>>> 9f71fe8c4c9febb19444a61c38f7048211f7fdb8

            <div class="user-menu-btn" @click="toggleUserMenu()">
                <button>
                    <img class="menu-btn" src="../assets/svg/menu.svg" />
<<<<<<< HEAD
                    <img
                        v-if="!user"
                        class="host-image"
                        src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png"
                    />
=======
                    <img v-if="!user" class="host-image"
                        src="https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png" />
>>>>>>> 9f71fe8c4c9febb19444a61c38f7048211f7fdb8
                    <img v-else class="host-image" :src="user.imgUrl" />
                </button>
            </div>

<<<<<<< HEAD
            <userMenu v-if="isMenu" @closeMenu="closeMenu" />
=======
            <userMenu v-if="isMenu" />
>>>>>>> 9f71fe8c4c9febb19444a61c38f7048211f7fdb8
        </div>
    </header>
</template>
  
<script>
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
    methods: {
        setDate(str) {
            this.currDate = str;
        },
        setDest(val) {
            this.currDest = val;
        },
        openZone(key) {
            this.currZone = key;
        },
        // toggleSearch(event) {
        //     if (event.target.innerText === 'Any week') {
        //         this.$emit('clickDate');
        //         this.currZone = key;
        //     }
        // },

        toggleSearch(event) {
            if (event.target.innerText === "Any week") {
                this.$emit("clickDate");
            }
            console.log("hi");
            this.$store.commit({ type: "toggleSearch", bool: true });
        },
        toggleUserMenu() {
            if (!this.isMenu) {
                this.isMenu = true;
            } else {
                this.isMenu = false;
            }
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
  