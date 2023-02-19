<template>
    <div class="app-mobile-footer">
        <section class="wrapper">
            <router-link class="icon-container" to="/">
                <search-icon />
                <h1>Explore</h1>
            </router-link>

            <router-link class="icon-container" to="/dashboard/buyer/wishlist">
                <loveIcon />
                <h1>Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img
                    v-if="!loggedInUser"
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
            <div v-if="loggedInUser" class="icon-container" @click="logout">
                <logout-icon class="logout" />
                <h1>Logout</h1>
            </div>
        </section>
    </div>
</template>

<script>
import searchIcon from "../assets/svg/search-icon.vue"
import loveIcon from "../assets/svg/love-icon.vue"
import logoutIcon from "../assets/svg/logout.vue"

export default {
    methods: {
        openLogIn() {
            if (this.loggedInUser) {
                this.$router.push("/dashboard/host/orders")
                return
            }
            this.$store.commit({ type: "toggleLogInModal", bool: true })
        },
        logout() {
            this.$store.dispatch("logout")
            this.$router.push("/")
        },
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
    components: {
        searchIcon,
        loveIcon,
        logoutIcon,
    },
}
</script>
