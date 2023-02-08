<template>
    <section :class="{ scrolled: isScrolled }" class="stay-filter main-container full">
        <section class="main-container" style="display: flex; align-items: center">
            <filter-btns :btns="btnsAryy()" @filtered="setFilterBy" />

            <button @click="toggleFilterModal(true)" class="btn-filters" :disabled="isLoading">
                <filterBtn />
                <p>Filters</p>
            </button>
        </section>
    </section>
    <filter-modal :stayPrices="prices" @close="toggleFilterModal(false)" v-if="isFilterOpen" />
</template>

<script>
import { stayService } from "../services/stay-service.js";

import filterBtn from '../assets/svg/filter-btn.vue'

import filterBtns from "./filter-btns.vue";
import filterModal from "./filter-modal.vue";

export default {
    props: {
        stays: Array,
    },
    data() {
        return {
            isScrolled: false
        }
    },
    created() {
        window.addEventListener("scroll", this.setIsScrolled);
    },
    methods: {
        setIsScrolled() {
            this.isScrolled = window.scrollY > 0
        },
        toggleFilterModal(isShown) {
            this.$store.commit({ type: "toggleFilterModal", bool: isShown });
        },
        setFilterBy(filterBy) {
            this.$store.dispatch({ type: "setFilter", filterBy });
        },
        btnsAryy() {
            return stayService.btnsAryy();
        },
    },
    computed: {
        isFilterOpen() {
            return this.$store.getters.isFilterOpen;
        },
        prices() {
            const prices = this.stays.map((stay) => stay.price + "");
            return prices;
        },
        isLoading() {
            return this.$store.getters.isLoading
        }
    },
    components: {
        filterBtn,
        filterBtns,
        filterModal,
    },
};
</script>
