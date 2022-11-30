<template>
    <section class="house-filter">
        <!-- <filterBtns /> -->
        <filter-btns :btns="btnsAryy()" />
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
            return [
                {
                    key: 'new',
                    url: "https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
                },
                {
                    key: 'top',
                    url: "https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
                },
                {
                    key: 'Trending',
                    url: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
                },
                {
                    key: 'Adapted',
                    url: "https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg",
                },
                {
                    key: 'Play',
                    url: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
                },
                {
                    key: 'Hanoks',
                    url: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
                },
                {
                    key: 'Private',
                    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
                },
                {
                    key: 'OMG!',
                    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
                },
                {
                    key: 'Play',
                    url: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
                },
                {
                    key: 'Hanoks',
                    url: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
                },
                {
                    key: 'Private',
                    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
                },
                {
                    key: 'OMG!',
                    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
                },
                {
                    key: 'Hanoks',
                    url: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
                },
                {
                    key: 'Private',
                    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
                },
                {
                    key: 'OMG!',
                    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
                },
                {
                    key: 'Hanoks',
                    url: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
                },
                {
                    key: 'Private',
                    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
                },
                {
                    key: 'OMG!',
                    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
                }
            ]
        },
    },
};
</script>
