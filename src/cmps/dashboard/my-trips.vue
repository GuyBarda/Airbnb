<template>
    <div v-if="user" class="order-container">
        <h2>Hi {{ user.fullname }}, you have {{ 2 }} pending trips</h2>
        <trip-list :trips="trips" />
    </div>
</template>

<script>
import tripList from './trip-list.vue';
export default {
    props: {
        trips: Array,
        user: Object
    },
    components: {
        tripList
    }
}
</script>