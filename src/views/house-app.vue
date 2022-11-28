<template>
    <house-filter />
    <house-list v-if="houses" :houses="houses" />
</template>

<script>
import houseFilter from '../cmps/house-filter.vue'
import houseList from '../cmps/house-list.vue'

export default {
    components:{
        houseFilter,
        houseList
    },
    computed: {
        houses(){
            return this.$store.getters.houses
        }
    },
}
</script>