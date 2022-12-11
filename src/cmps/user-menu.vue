<template>
    <div class="user-nav">
        <div class="user-nav-in">
            <a v-if="!user" href="#" @click="openLogIn()">Login</a>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard/orders">My Orders</router-link>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard/stays">My Stays</router-link>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard/trips">My Trips</router-link>
            <router-link v-if="user" @click.stop="closeMenu()" to="/dashboard/wishlist">Wishlist</router-link>
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
            // if(type) this.$router.push({path: '/dashboard', query: type})
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

