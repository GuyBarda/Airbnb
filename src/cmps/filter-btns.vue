<template>
    <div class="filter-buttons">
        <button @click="setSort('New')">
            <div>
                <img src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg" alt="" width="24" height="24">
                <div>New</div>
            </div>
        </button>
        <button @click="setSort('Top')">
            <img src="https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg" alt="" width="24" height="24">
            <div>Top</div>
        </button>
        <button @click="setSort('Trending')">
            <img src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt="" width="24" height="24">
            <div>Trending</div>
        </button>
        <button @click="setSort('Adapted')">
            <img src="https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg" alt="" width="24" height="24">
            <div>Adapted</div>
        </button>
        <button @click="setSort('Play')">
            <img src="https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg" alt="" width="24" height="24">
            <div>Play</div>
        </button>
        <button @click="setSort('Hanoks')">
            <img src="https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg" alt="" width="24" height="24">
            <div>Hanoks</div>
        </button>
        <button @click="setSort('Private')">
            <img src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt="" width="24" height="24">
            <div>Private</div>
        </button>
        <button @click="setSort('OMG!')">
            <img src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg" alt="" width="24" height="24">
            <div>OMG!</div>
        </button>
        <button @click="setSort('Amazing')">
            <img src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="" width="24" height="24">
            <div>Amazing</div>
        </button>
        <button @click="setSort('Private')">
            <img src="https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" alt="" width="24" height="24">
            <div>Private</div>
        </button>
        <button @click="setSort('Castles')">
            <img src="https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg" alt="" width="24" height="24">
            <div>Castles</div>
        </button>
        <button @click="setSort('Cabins')">
            <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="" width="24" height="24">
            <div>Cabins</div>
        </button>
        <button @click="setSort('Mansions')">
            <img src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg" alt="" width="24" height="24">
            <div>Mansions</div>
        </button>
        <button @click="setSort('Cabins')">
            <img src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" alt="" width="24" height="24">
            <div>Cabins</div>
        </button>
        <button @click="setSort('Luxe')">
            <img src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="" width="24" height="24">
            <div>Luxe</div>
        </button>
        <button @click="setSort('Design')">
            <img src="https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg" alt="" width="24" height="24">
            <div>Design</div>
        </button>
        <button @click="setSort('Treehouses')">
            <img src="https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" alt="" width="24" height="24">
            <div>Treehouses</div>
        </button>
        <button @click="setSort('Tropical')">
            <img src="https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg" alt="" width="24" height="24">
            <div>Tropical</div>
        </button>
        <button @click="setSort('Iconic cities')">
            <img src="https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg" alt="" width="24" height="24">
            <div>Iconic cities</div>
        </button>
        <button @click="setSort('Amazing pools')">
            <img src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" alt="" width="24" height="24">
            <div>Amazing pools</div>
        </button>
        <button @click="setSort('Creative spaces')">
            <img src="https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg" alt="" width="24" height="24">
            <div>Creative spaces</div>
        </button>
    </div>
</template>

<script>


export default {
    components: {},
    data() {
        return {
           sortBy: '',
        }
    },
    created() {},
  computed: {},
  methods: {
    setSort(val) {
      console.log('val', val)
      this.$emit("sorted", this.filterBy);
    },
    
  },
    
}
</script>
