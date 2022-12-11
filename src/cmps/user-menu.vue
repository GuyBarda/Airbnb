<template>
    <div class="user-nav">
        <div class="user-nav-in">
            <a v-if="!user" href="#" @click="openLogIn()">Login</a>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard">Dashboard</router-link>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard">My Trips</router-link>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard">Wishlist</router-link>
            <a v-if="user" @click.stop="logout">Logout</a>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        openLogIn() {
            this.$store.commit({ type: "toggleLogInModal", bool: true });
        },
        closeMenu() {
            this.$emit("closeMenu");
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push('/')
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser;
        },
    },

};
</script>

