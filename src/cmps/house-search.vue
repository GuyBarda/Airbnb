<template>
  <section class="main-search-container">
    <div class="main-search">

      <button @click="openZone('Where')" class="search-btn">Anywhere</button>
      <span></span>
      <button @click="openZone('In')" class="search-btn">Any week</button>
      <span></span>
      <button @click="openZone('Who')" class="search-btn">Add guests</button>

    </div>
    <div class="little-search-icon">
      <img src="../assets/svg/search.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  methods:{
    openZone(key){
      this.$emit('toggleSearch', key)
    }
  }
}
</script>
