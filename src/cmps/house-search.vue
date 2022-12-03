<template>
  <section class="main-search-container">
    <div v-if="whichSearch" class="main-search">

      <button @click="openZone('Where')" class="search-btn">{{ setDestination }}</button>
      <span></span>
      <button @click="openZone('In')" class="search-btn">{{ setDate }}</button>
      <span></span>
      <button @click="openZone('Who')" class="search-btn">Add guests</button>

    </div>
    <div v-else class="start-search">Start your search</div>
    <div class="little-search-icon">
      <img src="../assets/svg/search.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dest: String,
    date: String
  },
  methods: {
    openZone(key) {
      this.$emit('toggleSearch', key)
    }
  },
  computed: {
    setDate() {
      if (this.date) return this.date
      return 'Any week'
    },
    setDestination() {
      const destination = this.dest
      if (destination) return destination
      return 'Anywhere'
    },
    whichSearch() {
      const where = this.$route.path.split('/')[1]
      console.log(where)
      // return true
      return where === 'house' ? false : true
    }
  },

}
</script>
