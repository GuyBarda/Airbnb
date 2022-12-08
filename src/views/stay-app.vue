<template>
  <section class="stay-app main-container">
    <stay-filter v-if="this.$route.path !== '/explore'" :stays="stays" />
    <section class="exolore-sub-header" v-else>Found {{stays.length}} homes</section>
    <stay-list v-if="!isLoading" :stays="stays" />

    <div class="stay-list"  v-else>
      <skeleton v-for="num in 12" :key="num"/>
    </div>

  </section>
</template>

<script>
import stayFilter from "../cmps/stay-filter.vue";
import stayList from "../cmps/stay-list.vue";
import skeleton from "../cmps/skeleton.vue";
export default {
  data() {
    return {
      isLoading: false,
      currPath: "/",
    };
  },

  async created() {
    try {
      this.isLoading = true
      console.log(' this.isLoading', this.isLoading )
      await this.$store.dispatch("loadStays");
      this.isLoading = false
      console.log(' this.isLoading', this.isLoading )
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
    skeleton
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
