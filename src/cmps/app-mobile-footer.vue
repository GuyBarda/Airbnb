<template>
    <div class="app-mobile-footer" :class="whichContainer" :style="whichLayout">
        <section class="wrapper">
            <div class="icon-container">
                <img src="../../src/assets/svg/serch.svg" alt="">
                <h1>Explore</h1>
            </div>

            <router-link class="icon-container" to="/dashboard/buyer/wishlist">
                <img src="../../src/assets/svg/love.svg" alt="">
                <h1>Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img src="../../src/assets/svg/user.svg" alt="">
                <h1>Log in</h1>
            </div>

        </section>
    </div>
</template>

<script>
export default {
    computed: {},
    methods: {
        openLogIn() {
            this.$store.commit({ type: "toggleLogInModal", bool: true });
        },
}        
};
</script>
