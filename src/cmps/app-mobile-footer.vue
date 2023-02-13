<template>
    <div class="app-mobile-footer" :class="whichContainer" :style="whichLayout">
        <section class="wrapper">
            <div class="icon-container" @click="goToHome">
                <img v-if="isMenu" src="../../src/assets/svg/search1.svg" alt="" />
                <img v-if="!isMenu" src="../../src/assets/svg/search2.svg" alt="" />
                <h1>Explore</h1>
            </div>

            <router-link class="icon-container" @click="handelClick()" to="/dashboard/buyer/wishlist">
                <img v-if="isMenu" src="../../src/assets/svg/love.svg" alt="" />
                <img v-if="!isMenu" src="../../src/assets/svg/love2.svg" alt="" />
                <h1>Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img src="../../src/assets/svg/user.svg" alt="" />
                <h1>Log in</h1>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMenu: true,
        };
    },
    created() {
        this.isMenu = true;
    },
    computed: {},
    methods: {
        openLogIn() {
            this.$store.commit({ type: "toggleLogInModal", bool: true });
        },
        goToHome() {
            this.isMenu = true;
            this.$router.push("/");
        },

        handelClick(){
            this.isMenu = !this.isMenu;
        }
    },
};
</script>
