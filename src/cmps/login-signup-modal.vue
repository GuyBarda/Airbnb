<template>
  <form @submit.prevent="login" class="login-form" v-if="isLogIn" >

    <div class="login-form-body">
      <h1>Welcome to Airbnb</h1>
      <input v-model="cred.username" autocomplete="username" type="text" class="login-input" placeholder="Username"/>
      <input v-model="cred.password"  autocomplete="password" type="password" class="login-input"   placeholder="Password" />
      <button type="submit" class="login-btn">Continue</button>
      <div class="login-actions-btns flex">
        <button type="button" class="actions-btn" @click="openSingUp()">
          New user
        </button>
      </div>
    </div>
  </form>

  <form @submit.prevent="signup" class="login-form" v-if="!isLogIn">
    <div class="login-form-body">
      <h1>Sign up</h1>
      <input type="text" class="login-input" ref="fullname" v-model="signupCred.fullname" placeholder="Full name" />

      <input autocomplete="username" type="text" v-model="signupCred.username" class="login-input" name="username" placeholder="Username"/>

      <input autocomplete="password" name="password" v-model="signupCred.password" class="login-input" type="password" placeholder="Password" />
      
      <button class="login-btn" type="submit">Sign up</button>
      <div class="login-actions-btns flex">
        <button type="button" class="actions-btn" @click="openSingUp()" > I already have an account</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login-page',
  props: {},
  data() {
    return {
      isLogIn: true,
      cred: {
          username: '',
          password: '',
        },
        signupCred: {
        fullname: '',
        username: '',
        password: '',
      },
    };
  },
  created() {
    
  },
  methods: {
    openSingUp() {
      if (this.isLogIn) {
        this.isLogIn = false;
      } else {
        this.isLogIn = true;
      }
    },
    async login() {
      await this.$store.dispatch({type: 'login', cred: this.cred});
      this.$emit("closeModal");
      },
    async signup() {
     await this.$store.dispatch({type: 'signup', cred: this.signupCred});
     this.$emit("closeModal");
    },
  },
  computed: {
    users() {
      console.log('this.$store.getters.loggedinUser', this.$store.getters.loggedinUser)
      return this.$store.getters.loggedinUser;
    },
  },
  components: {},
};
</script>
<style></style>
