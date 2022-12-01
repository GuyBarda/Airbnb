<template>
    <section class="house-filter">
        <!-- <filterBtns /> -->
        <filter-btns :btns="btnsAryy()" @filtered="setFilterBy"/>
        <button @click="isShown = true" class="btn-filters">
            <div>
                <img src="../assets/svg/filter-btn.svg" alt="" />
                <span>Filters</span>
            </div>
        </button>
        <filter-modal @close="isShown = false" v-if="isShown" />
    </section>
</template>

<script>
import filterBtns from "./filter-btns.vue";
import filterModal from "./filter-modal.vue";
import { houseService } from '../services/house-service-local.js'


export default {
    components: {
    filterBtns,
    filterModal,
  },
  data() {
    return {
      isShown: false,
    };
  },
  
  created() {},
  computed: {},
  methods: {
    setFilterBy(filterBy) {
      console.log('filterBy',filterBy )
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
     btnsAryy() {
          return houseService.btnsAryy()  
        },
    },
};
</script>
