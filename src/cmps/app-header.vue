<template>
  <header class="main-header">
    <div class="logo">
      <img src="../assets/svg/logo.svg" alt="" />
    </div>
    <app-search></app-search>

    <div>
      <div><div>Switch to hosting</div></div>

      <button class="user">
        <img src="../assets/img/nadir.PNG" alt="" />
      </button>
    </div>
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
