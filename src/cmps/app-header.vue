<template>
  <header class="main-header">
    <div class="logo">
     <img src="../assets/svg/logo.svg" alt="" />
    </div>
    <app-search></app-search>
    <button class="user">
      
      <img src="../assets/svg/user.svg" alt="" />
    </button>
  </header>
</template>

<script>
import appSearch from "./app-search.vue";

export default {
  components: {
    appSearch,
  },
};
</script>
