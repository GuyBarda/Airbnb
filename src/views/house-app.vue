<template>
<section class="house-app main-layout">
    <house-filter />
    <house-list v-if="houses" :houses="houses" />
</section>
</template>

<script>
import houseFilter from '../cmps/house-filter.vue'
import houseList from '../cmps/house-list.vue'

export default {
    components:{
        houseFilter,
        houseList
    },
    data(){
        return{
            houses: null
        }
    },
    async created() {
        try{
            await this.$store.dispatch('loadHouses')
            this.houses = this.$store.getters.houses
        }
        catch{
            console.log('cant load houses')
        }
    },
    computed: {
        houses(){
            return this.$store.getters.houses
        }
    },
}
</script>