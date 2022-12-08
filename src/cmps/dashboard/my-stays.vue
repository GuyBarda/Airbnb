<template>
    <section v-if="user && stays" class="my-stay-container">
        <my-stays-list :stays="stays" />
    </section>
    <section v-else class="my-stay-else">
        <main class="stay-wrapper">
            <h3>You have 0 stays</h3>
            <button @click="navigate" @mousemove="hoverEffect">
                Become a host now
            </button>
        </main>
    </section>
</template>

<script>
import {userService} from '../../services/user-service.js'
import myStaysList from "./my-stay-list.vue";

export default {
    props:{
        user: Object,
    },
    async created() {
        this.stays = await userService.getStaysByUserId(this.user._id);
        console.log(this.stays);
        if (!this.stays) return
    },
    data(){
        return {
            stays:null,
        }
    },
    methods:{
        hoverEffect(ev) {
            const button = ev.target;
            const { x, y } = button.getBoundingClientRect();
            button.style.setProperty('--x', ev.clientX - x + 'px');
            button.style.setProperty('--y', ev.clientY - y + 'px');
        },
        navigate(){
            this.$router.push('/stay/edit')
        },
    },
    computed:{
        
    },
    components: {
        myStaysList,
    },
};
</script>
