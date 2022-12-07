<template>
    <div v-if="user" class="wishlist-container">
        <wish-stay-list :wishStays="wishlist" />
    </div>
</template>

<script>
import wishStayList from './wish-stay-list.vue';

export default {
    props: {
        wishlist: Array,
        user: Object
    },
    created(){
        console.log(this.user);
    },
    components: {
        wishStayList
    }
}
</script>