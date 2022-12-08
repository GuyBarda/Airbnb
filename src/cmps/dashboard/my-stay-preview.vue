<template>
<!-- <pre v-if="stay">{{stay}}</pre> -->

<section class="my-stay-preview">
<router-link :to="('/stay/' + stay._id)">
    <section class="my-stay-imgs">
            <img v-for="img in stay.imgUrls" :src="img" alt="">
    </section>
    <section class="my-stay-info">
        <h4>{{stay.name}}</h4>
        <section class="my-stay-options">
            <button class="update-btn" @click.prevent="navigateToUpdate()">Update</button>
            <button class="delete-btn" @click.prevent="deleteStay()">Delete</button>
        </section>
    </section>
</router-link>
</section>
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
        },
        methods: {
            navigateToUpdate(){
                this.$router.push('/stay/edit/' + this.stay._id)
            },
            deleteStay(){
                this.$emit('deleteStay',this.stay._id)
            }
        },
    }
</script>
