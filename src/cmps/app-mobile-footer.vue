<template>
    <div class="app-mobile-footer" :class="whichContainer" :style="whichLayout">
        <section class="wrapper">
            <router-link to="/" class="icon-container">
                <img src="../../src/assets/svg/serch.svg" alt="" />
                <h1>Explore</h1>
            </router-link>

            <router-link class="icon-container" to="/dashboard/buyer/wishlist">
                <img src="../../src/assets/svg/love.svg" alt="" />
                <h1>Wishlist</h1>
            </router-link>

            <div class="icon-container" @click="openLogIn()">
                <img v-if="!loggedIn" src="../../src/assets/svg/user.svg" alt="" />
                <img class="user-img" v-else :src="loggedInUser?.imgUrl" alt="">
                <h1>{{loggedInUser?.username || 'Log in'}}</h1>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loggedIn: null
        }
    },
    methods: {
        openLogIn() {
            if(this.loggedIn) return
            this.$store.commit({ type: "toggleLogInModal", bool: true });
        },
},
computed:{
    loggedInUser(){
        return this.$store.getters.loggedinUser
    }
},
watch:{
    loggedInUser(user){
        this.loggedIn = user ? true : false
    }
}

};
</script>
