<template>
    <div class="app-mobile-footer" :class="whichContainer" :style="whichLayout">
        <section class="wrapper">
            <router-link class="icon-container" @click="goToHome">
                <img
                    v-if="isMenu"
                    src="../../src/assets/svg/search1.svg"
                    alt=""
                />
                <img
                    v-if="!isMenu"
                    src="../../src/assets/svg/search2.svg"
                    alt=""
                />
                <h1>Explore</h1>
            </router-link>

            <router-link
                class="icon-container"
                @click="handelClick()"
                to="/dashboard/buyer/wishlist"
            >
                <img v-if="isMenu" src="../../src/assets/svg/love.svg" alt="" />
                <img
                    v-if="!isMenu"
                    src="../../src/assets/svg/love2.svg"
                    alt=""
                />
                <h1>Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img
                    v-if="!loggedIn"
                    src="../../src/assets/svg/user.svg"
                    alt=""
                />
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
        goToHome() {
            this.isMenu = true;
            this.$router.push("/");
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
};
</script>
