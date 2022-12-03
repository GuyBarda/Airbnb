<template>
  <div class="user-nav" v-if="!isLogin">
    <div class="user-nav-in">
      <a href="#" @click="openLogIn()">Log in</a>
      <!-- <a href="#">Sign up</a> -->
      <a href="#/wishList" class="a1">Wish List</a>
      <a href="#/dashboard">Dashboard</a>
      <a>Logout</a>
    </div>
  </div>
  <loginSignupModal v-if="isLogin" />
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
  },
  components: {
    loginSignupModal,
  },
};
</script>
<style></style>
