<template>
  <section class="login-layout">

  
  <div class="login-container">

    <div class="login-title-cont">
      <div class="login-title">Log in or sign up</div>
      <div @click="close" class="exit-login-btn">
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

        <button @mousemove="hoverEffect" class="btn-container">Log in</button>
        
        <div class="login-or-line"></div>
        <div class="login-line-text">or</div>
        
        <button @mousemove="hoverEffect" class="btn-container">Continue as a guest</button>

        <div @click="openSingUp()" class="move-to-signup">Don't have an acount yet? sign up</div>
    </form>

    <form @submit.prevent="signup" class="login-main-content" v-if="!isLogIn">
        <div class="login-header"> Welcome to Airbxb </div>

        <div class="sign-up-form-cont">
            <input v-model="signupCred.fullname" class="fullname-input" type="text" placeholder="Full name">
            <div class="form-line"></div>
            <input v-model="signupCred.username" class="username-input" placeholder="Username">
            <div class="form-line"></div>
            <input v-model="signupCred.password" class="password-input" autocomplete="password" placeholder="Password" type="password">
        </div>

        <button @mousemove="hoverEffect" class="btn-container">Sign up</button>
        
        <div class="login-or-line"></div>
        <div class="login-line-text">or</div>
        
        <button @mousemove="hoverEffect" class="btn-container">Continue as a guest</button>
        <div @click="openSingUp()" class="move-to-signup">Already signed up?</div>
    </form>

    
  </div>
</section>
</template>

<script>
export default {
  name: "login-page",
  props: {},
  data() {
    return {
      isLogIn: true,
      cred: {
        username: "",
        password: "",
      },
      signupCred: {
        fullname: "",
        username: "",
        password: "",
      },
    };
  },
  created() {},
  methods: {
    openSingUp() {
      if (this.isLogIn) {
        this.isLogIn = false;
      } else {
        this.isLogIn = true;
      }
    },
    async login() {
      await this.$store.dispatch({ type: "login", cred: this.cred });
      this.$emit("closeModal");
      this.$store.commit({ type: "toggleLogInModal", bool: false });
    },
    async signup() {
      await this.$store.dispatch({ type: "signup", cred: this.signupCred });
      this.$emit("closeModal");
      this.$store.commit({ type: "toggleLogInModal", bool: false });
    },
    close(){
      this.$emit("closeModal");
      this.$store.commit({ type: "toggleLogInModal", bool: false });
    }
  },
  computed: {
    users() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {},
};
</script>
<style></style>
