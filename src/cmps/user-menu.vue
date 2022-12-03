<template>
  <div class="user-nav" v-if="!isLogin">
    <div class="user-nav-in">
      <a v-if="!user" href="#" @click="openLogIn()">Log in</a>
      <!-- <a href="#">Sign up</a> -->
      <a v-if="user" href="#/wishList" class="a1">Wish List</a>
      <a v-if="user" href="#/dashboard">Dashboard</a>
      <a v-if="user" @click="logout" >Logout</a>
    </div>
  </div>
  <loginSignupModal v-if="isLogin" @closeModal="close" />
</template>

<script>
import loginSignupModal from "../cmps/login-signup-modal.vue";

export default {
  props: {},
  data() {
    return {
      isLogin: false,
    };
  },
  created() {},
  methods: {
    openLogIn() {
      if (!this.isLogin) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    close() {
      console.log('hey',)
      this.isLogin = false;
    },
    logout() {
      this.$store.dispatch("logout")
    },
  },
  computed: {
    user() {
      console.log('hey',this.$store.getters.loggedinUser)
        return this.$store.getters.loggedinUser
    },
  },
  components: {
    loginSignupModal,
  },
};
</script>
<style></style>
