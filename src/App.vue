<template>
    <app-header />
    <app-filter-buttons />
    <RouterView />
</template>
  
<script >
import { RouterLink, RouterView } from 'vue-router'
import appHeader from './cmps/app-header.vue';
import appFilterButtons from './cmps/app-filter-buttons.vue';

export default {
    components: {
        appHeader,
        appFilterButtons
    }
}
</script>