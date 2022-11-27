<template>
  <app-header></app-header>
  <RouterView />
</template>

<script >
import { RouterLink, RouterView } from 'vue-router'
import appHeader from './cmps/app-header.vue';

export default {
  components: {
    appHeader
  }
}
</script>
