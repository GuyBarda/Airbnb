<template>
    <header class="main-header">
        <div class="logo"></div>
        <app-search></app-search>
        <button class="user">Login</button>
    </header>
</template>

<script>
import appSearch from './app-search.vue';

export default {
    components: {
        appSearch
    }
}
</script>