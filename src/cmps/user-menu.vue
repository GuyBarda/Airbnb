<template>
  <div class="user-nav" v-if="!isLogin">
    <div class="user-nav-in">
      <a v-if="!user" href="#" @click="openLogIn()">Log in</a>
      <!-- <a href="#">Sign up</a> -->
      <a v-if="user" href="#/wishList" class="a1">Wish List</a>
      <router-link v-if="user" to="/dashboard">Dashboard</router-link>
      <!-- <a v-if="user" href="#/dashboard">Dashboard</a> -->
      <a v-if="user" @click.stop="logout">Logout</a>
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
  created() {

  },
  methods: {
    openLogIn() {
      if (!this.isLogin) {
        this.isLogin = true;
        this.$store.commit({ type: "toggleLogInModal", bool: true });
      } else {
        this.isLogin = false;
        this.$store.commit({ type: "toggleLogInModal", bool: false });
      }
    },
    close() {
      this.isLogin = false;
    },
    logout() {
      this.$store.dispatch("logout")
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    loginSignupModal,
  },
};
</script>
<style>

</style>
