<template>
<pre v-if="stay">{{stay}}</pre>
<p v-else>Cantload stay</p>
</template>

<script>
    export default {
        props:{
            stay: Object
        },
        created(){
        },
        data(){
            return{
            }
        }
    }
</script>
