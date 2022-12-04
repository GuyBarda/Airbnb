<template>
  <section class="main-search-container">
    <div v-if="whichSearch" class="main-search">

      <button @click="openZone('Where')" class="search-btn">{{ setDestination }}</button>
      <span></span>
      <button @click="openZone('In')" class="search-btn">{{ setDate }}</button>
      <span></span>
      <button @click="openZone('Who')" class="search-btn last">Add guests</button>
      <section class="search-in-mobile">
          <search-icon class="img" />
          <div>
          <label>Where to?</label>
          <p>Anywhere &bull; Any week &bull; Add guests</p>
          </div>
      </section>
    </div>
    <div v-else class="start-search">Start your search</div>
    <div class="little-search-icon">
      <img src="../assets/svg/search.svg" class="svg-for-desktop" />
      <img src="../assets/svg/filter-btn.svg" class="svg-for-mobile" />
    </div>
  </section>
</template>

<script>
import searchIcon from '../assets/svg/search.vue'
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
  components:{
    searchIcon
  }
}
</script>
