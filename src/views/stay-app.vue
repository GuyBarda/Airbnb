<template>
  <section class="stay-app main-container">
    <stay-filter v-if="this.$route.path !== '/explore'" :stays="stays" />
    <section class="exolore-sub-header" v-else>Found {{stays.length}} homes</section>
    <stay-list v-if="stays" :stays="stays" />
  </section>
</template>

<script>
import stayFilter from "../cmps/stay-filter.vue";
import stayList from "../cmps/stay-list.vue";

export default {
  data() {
    return {
      currPath: "/",
    };
  },

  async created() {
    try {
      await this.$store.dispatch("loadStays");
    } catch {
      console.log("cant load stays");
    }
  },
  methods: {
  },
  computed: {
    stays() {
      return this.$store.getters.stays;
    },
    changePath() {
      return this.$route.query;
    },
  },
  components: {
    stayFilter,
    stayList,
  },
  watch: {
    changePath(query) {
      if (this.$route.path === "/explore") {
        const filterBy = query;
        this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
        this.$store.dispatch({ type: "loadStays" });
      }
    },
  },
};
</script>
