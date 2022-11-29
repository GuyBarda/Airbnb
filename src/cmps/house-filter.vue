<template>
    <section class="house-filter">
        <filterBtns />
        <button @click="isShown = true" class="btn-filters">Filters</button>
        <filter-modal @close="isShown = false" v-if="isShown" />
    </section>
</template>

<script>
import filterBtns from './filter-btns.vue'
import filterModal from './filter-modal.vue'

export default {
    data() {
        return {
            isShown: false
        }
    },
    components: {
        filterBtns,
        filterModal
    }
}
</script>

