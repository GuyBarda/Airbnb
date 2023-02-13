<template>
    <div class="app-mobile-footer" :class="whichContainer" :style="whichLayout">
        <section class="wrapper">
            <router-link class="icon-container" to="/" @click="handelClick()">
                <search-icon :class="{selected: isMenu}"/>
                <h1 :class="{selected: isMenu}">Explore</h1>
            </router-link>

            <router-link class="icon-container"  @click="handelClick()" to="/dashboard/buyer/wishlist">
                <loveIcon :class="{selected: !isMenu}"/>
                <h1 :class="{selected: !isMenu}">Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img v-if="!loggedIn" src="../../src/assets/svg/user.svg"  alt="" />
                <img
                    class="user-img"
                    v-else
                    :src="loggedInUser?.imgUrl"
                    alt=""
                />
                <h1>{{ loggedInUser?.username || "Log in" }}</h1>
            </div>
        </section>
    </div>
</template>

<script>
import searchIcon from "../assets/svg/search-icon.vue";
import loveIcon from "../assets/svg/love-icon.vue";
export default {
    data() {
        return {
            isMenu: true,
            loggedIn: null,
        };
    },
    created() {
        this.isMenu = true;
    },
    methods: {
        openLogIn() {
            if (this.loggedIn) return;
            this.$store.commit({ type: "toggleLogInModal", bool: true });
        },
        handelClick() {
            this.isMenu = !this.isMenu;
        },
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    watch: {
        loggedInUser(user) {
            this.loggedIn = user ? true : false;
        },
    },
    components:{
        searchIcon,
        loveIcon
    }
};
</script>
