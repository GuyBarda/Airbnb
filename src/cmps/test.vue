<template>
  <div class="login-container">

    <div class="login-title-cont">
      <div class="login-title">Log in or sign up</div>
      <div class="exit-login-btn">
        <img src="../assets/svg/close.svg" alt="" />
      </div>
    </div>

    <form @submit.prevent="login" class="login-main-content" v-if="isLogIn" >
        <div class="login-header"> Welcome to Airbxb </div>

        <div class="login-form-cont">
            <input v-model="cred.username" autocomplete="username"  class="login-username" placeholder="Username">
            <div class="form-line"></div>
            <input v-model="cred.password" class="login-password" placeholder="Password" type="password" autocomplete="password">
        </div>
        <button>Log in </button>
        <div class="login-line-text">or</div>
        <button>Continue as a guest</button>
        <div @click="openSingUp()" class="move-to-signup">Don't have an acount yet? sign up</div>
    </form>

    <form @submit.prevent="signup" class="signup-main-content" v-if="!isLogIn">
        <div class="login-header"> Welcome to Airbxb </div>

        <div class="login-form-cont">
            <input v-model="signupCred.fullname" class="fullname-input" type="text" placeholder="Full name">
            <div class="form-line"></div>
            <input v-model="signupCred.username" class="login-username" placeholder="Username">
            <div class="form-line"></div>
            <input v-model="signupCred.password" class="login-password" autocomplete="password" placeholder="Password" type="password">
        </div>
        <button>Log in </button>
        <div class="login-line-text">or</div>
        <button>Continue as a guest</button>
        <div @click="openSingUp()" class="move-to-signup">Already signed up?</div>
    </form>

    
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style></style>
