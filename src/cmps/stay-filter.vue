<template>
  <section class="stay-filter main-container full">
    <section class="main-container" style="display: flex; align-items: center">
      <!-- <filterBtns /> -->
      <filter-btns :btns="btnsAryy()" @filtered="setFilterBy" />
      <button @click="toggleFilterModal(true)" class="btn-filters">
        <div>
          <img src="../assets/svg/filter-btn.svg" alt="" />
          <span>Filters</span>
        </div>
      </button>
    </section>
  </section>
  <filter-modal :stays="stays" @close="toggleFilterModal(false)" v-if="isFilterOpen" />
</template>

<script>
import filterBtns from "./filter-btns.vue";
import filterModal from "./filter-modal.vue";
import { stayService } from "../services/stay-service-local.js";

export default {
  props: {
    stays: Array,
  },
  components: {
    filterBtns,
    filterModal,
  },
  data() {
    return {

    };
  },

  created() { },
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
      return stayService.btnsAryy();
    },
  },
};
</script>
