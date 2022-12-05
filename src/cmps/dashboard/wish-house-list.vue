<template>
    <div class="wish-house-list">
        <wish-house-preview v-for="wishHouse in wishHouses" :wishHouse="wishHouse" />
    </div>
</template>
  
<script>
import wishHousePreview from "./wish-house-preview.vue";

export default {
    props: {
        wishHouses: Array,
    },
    components: {
        wishHousePreview,
    },
};
</script>