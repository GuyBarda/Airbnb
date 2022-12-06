<template>
  <section class="house-app main-container">
    <house-filter v-if="this.$route.path !== '/explore'" :houses="houses" />
    <section class="exolore-sub-header" v-else>Found {{houses.length}} homes</section>
    <house-list v-if="houses" :houses="houses" />
  </section>
</template>

<script>
import houseFilter from "../cmps/house-filter.vue";
import houseList from "../cmps/house-list.vue";

export default {
  data() {
    return {
      //   houses: null,
      num: 1,
      currPath: "/",
    };
  },

  async created() {
    this.changeData();
    try {
      await this.$store.dispatch("loadHouses");
    } catch {
      console.log("cant load houses");
    }
  },
  methods: {
    changeData() {
      setInterval(() => {
        this.num += this.num;
      }, 1000);
    },
  },
  computed: {
    houses() {
      return this.$store.getters.houses;
    },
    changePath() {
      return this.$route.query;
    },
  },
  components: {
    houseFilter,
    houseList,
  },
  watch: {
    changePath(query) {
      if (this.$route.path === "/explore") {
        const filterBy = query;
        this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
        this.$store.dispatch({ type: "loadHouses" });
      }
    },
  },
};
</script>
