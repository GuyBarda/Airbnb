<template>
    <filterBtns />
    <button class="btn-filters">Filters</button>
    <filter-modal />
</template>

<script>
import filterBtns from './filter-btns.vue'
import filterModal from './filter-modal.vue'
export default {
    components: {
        filterBtns,
        filterModal
    }
}

</script>

