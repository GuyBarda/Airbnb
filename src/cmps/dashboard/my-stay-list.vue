<template>
<section class="my-stay-list">
    <my-stay-preview v-for="stay in stays" :stay="stay"/>
</section>
</template>

<script>
import myStayPreview from './my-stay-preview.vue'
    export default {
        props:{
            stays: Array,
        },
        created(){
            console.log(this.stays);
        },
        components:{
            myStayPreview
        }
    }
</script>
