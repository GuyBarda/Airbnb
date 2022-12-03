<template>
  <section class="house-filter">
    <!-- <filterBtns /> -->
    <filter-btns :btns="btnsAryy()" @filtered="setFilterBy" />
    <button @click="toggleFilterModal(true)" class="btn-filters">
      <div>
        <img src="../assets/svg/filter-btn.svg" alt="" />
        <span>Filters</span>
      </div>
    </button>
  </section>
    <filter-modal :houses="houses" @close="toggleFilterModal(false)" v-if="isFilterOpen" />
</template>

<script>
import filterBtns from "./filter-btns.vue";
import filterModal from "./filter-modal.vue";
import { houseService } from "../services/house-service-local.js";

export default {
  props:{
    houses: Array,
  },
  components: {
    filterBtns,
    filterModal,
  },
  data() {
    return {};
  },

  created() {},
  computed: {
        isFilterOpen() {
      return this.$store.getters.isFilterOpen;
    },
  },
  methods: {
    toggleFilterModal(isShown) {
      this.$store.commit({ type: "toggleFilterModal", bool: isShown });
    },
    setFilterBy(filterBy) {
      console.log("filterBy", filterBy);
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
    btnsAryy() {
      return houseService.btnsAryy();
    },
  },
};
</script>
