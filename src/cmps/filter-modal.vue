<template>
  <div class="filter-modal-container">
    <div class="filter-modal">
      <header class="form-header">
        <button @click="$emit('close')">X</button>
        <p>Filters</p>
      </header>

      <section>
        <h2>Price range</h2>
        <p>The average nightly price is {{ formattedPrice }}</p>
        <!-- <chart></chart> -->

        <div class="range">
          <input type="text" v-model.number="filterBy.maxPrice" />
          -
          <input type="text" v-model.number="filterBy.minPrice" />
        </div>
      </section>

      <hr />
      <section>
        <h2>Type of place</h2>
        <input
          type="checkbox"
          name="entire"
          v-model="filterBy.type"
          value="Entire place"
        />
        <label for="entire">Entire place</label>

        <input
          type="checkbox"
          name="private"
          v-model="filterBy.type"
          value="Private room"
        />
        <label for="entire">Private room</label>

        <input
          type="checkbox"
          name="shared"
          v-model="filterBy.type"
          value="Shared room"
        />
        <label for="shared">Shared room</label>
      </section>

      <hr />
      <section>
        <h2>Rooms and beds</h2>

        <div>
          <p>Bedrooms</p>
          <button
            @click="setRoomsBeds('bedrooms', num)"
            v-for="num in 10"
            :key="num"
          >
            {{ num }}
          </button>
        </div>

        <div>
          <p>Beds</p>
          <button
            @click="setRoomsBeds('beds', num)"
            v-for="num in 10"
            :key="num"
          >
            {{ num }}
          </button>
        </div>

        <div>
          <p>Bathrooms</p>
          <button
            @click="setRoomsBeds('bedrooms', num)"
            v-for="num in 10"
            :key="num"
          >
            {{ num }}
          </button>
        </div>
      </section>

      <hr />
      <section>
        <h2>Property type</h2>
        <button @click="setPropertyType('house')">House</button>
        <button @click="setPropertyType('apartment')">Apartment</button>
        <button @click="setPropertyType('guesthouse')">Guesthouse</button>
        <button @click="setPropertyType('hotel')">Hotel</button>
      </section>

      <section>
        <h2>Amenities</h2>
        <div class="checkboxes">
          <input type="checkbox" name="wifi" />
          <label for="wifi">Wifi</label>
          <input type="checkbox" name="washer" />
          <label for="washer">Washer</label>
          <input type="checkbox" name="ac" />
          <label for="ac">Ac</label>
          <input type="checkbox" name="kitchen" />
          <label for="kitchen">Kitchen</label>
        </div>
      </section>

      <section>Booking options</section>

      <label>
        Instant Book
        <input type="checkbox" />
      </label>

      <label>
        Self check-in
        <input type="checkbox" />
      </label>

      <footer>
        <button>Clear all</button>
        <button @click="filterHouses">Show {{ totalHouses }} homes</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      filterBy: {
        maxPrice: 0,
        minPrice: 0,
        type: [],
        roomsBeds: {
          bedrooms: 0,
          beds: 0,
          bathrooms: 0,
        },
        PropertyType: [],
        Amenities: [],
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    filterHouses() {
      console.log("this.filterBy", this.filterBy);
      //   this.$emit("filtered", this.filterBy);
    },
    setRoomsBeds(key, val) {
      this.filterBy.roomsBeds[key] = val;
      console.log("this.filterBy", this.filterBy);
    },
    setPropertyType(key) {
      this.filterBy.PropertyType.push(key) 
      console.log("this.filterBy", this.filterBy);
    },
  },
};
</script>

<style></style>
