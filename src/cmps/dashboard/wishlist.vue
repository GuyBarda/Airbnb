<template>
    <div v-if="user" class="wishlist-container">
        <wish-stay-list :wishStays="wishlist" />
    </div>
</template>

<script>
import wishStayList from './wish-stay-list.vue';
import { showErrorMsg } from '../../services/event-bus-service.js'

export default {

    data(){
        return {
            wishlist: null,
            user: null
        }
    },
    created(){
        this.user = this.$store.getters.loggedinUser
        if(!this.user) {
            showErrorMsg('Log in first')
            return this.$router.push('/')
        }
        this.wishlist = this.user.wishlist
    },
    components: {
        wishStayList
    }
}
</script>