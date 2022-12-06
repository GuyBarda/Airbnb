<template>
    <div v-if="user" class="order-container">
        <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending trips</h2>
        <trip-list :trips="trips" />
    </div>
    <pre>{{ trips }}</pre>
</template>

<script>
import tripList from './trip-list.vue';
export default {
    props: {
        trips: Array,
        user: Object
    },
    created() {
        console.log(this.user);
        console.log('hi')
    },
    updated() {
        // console.log(this.user);
    },
    components: {
        tripList
    }
}
</script>