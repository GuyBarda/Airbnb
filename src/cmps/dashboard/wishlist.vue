<template>
    <div v-if="user" class="wishlist-container">
        <wish-house-list :wishHouses="wishlist" />
    </div>
</template>

<script>
import wishHouseList from './wish-house-list.vue';

export default {
    props: {
        wishlist: Array,
        user: Object
    },
    created() {
        console.log(this.user)
    },
    components: {
        wishHouseList
    }
}
</script>