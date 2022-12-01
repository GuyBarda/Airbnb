<template>
  <section @click.prevent class="search-modal full">
    <section :class="{ 'btn-selected': isSelect !== ' ' }" class="search-input">
      <div
        @click.prevent="openZone('Where')"
        :class="{ selected: isSelect === 'Where' }"
        class="search-zone destination"
      >
        <label>Where</label>
        <input
          type="text"
          v-model="filterBy.destination"
          placeholder="Search destinations"
        />
        <destination-modal
          @setDestination="setDestination"
          :class="{ open: isSelect === 'Where' }"
        />
      </div>
      <section class="date">
        <div
          @click.prevent="openZone('In')"
          :class="{ selected: isSelect === 'In' }"
          class="search-zone"
        >
          <label>Check in</label>
          <input
            class="date-input"
            type="text"
            placeholder="Add dates"
            disabled
          />
        </div>
        <el-date-picker
          ref="datePicker"
          v-model="dates"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="x"
        />
        <div
          @click.prevent="openZone('Out')"
          :class="{ selected: isSelect === 'Out' }"
          class="search-zone"
        >
          <label>Check out</label>
          <input
            class="date-input"
            type="text"
            placeholder="Add dates"
            disabled
          />
        </div>
      </section>
      <div
        @click.prevent="openZone('Who')"
        :class="{ selected: isSelect === 'Who' }"
        class="search-zone search-btn"
      >
        <label>Who</label>
        <input
          :value="guestsCount"
          class="guest-input"
          type="text"
          placeholder="Add guests"
          disabled
        />
        <button class="sub-search">
          <img src="../assets/svg/search.svg" alt="" />Search
        </button>
        <guests-modal
          @setGuests="setGuests"
          :class="{ open: isSelect === 'Who' }"
        />
      </div>
    </section>
  </section>
</template>

<script>
import reactiveBtn from "./reactive-btn.vue";
import destinationModal from "./destination-modal.vue";
import datePicker from "./date-picker.vue";
import guestsModal from "./guests-modal.vue";
import { ref } from 'vue'


export default {
  props: {
    zone: {
      type: String,
    },
  },
  data() {
    return {
      isSelect: "",
      dates: ref(''),
      filterBy: {
        destination: "",
        dates: {
          start: "",
          end: "",
        },
        guests: {
          adults: 0,
          children: 0,
          infants: 0,
          pets: 0,
        },
      },
    };
  },
  updated() {
    this.isSelect = this.zone;
    if (this.zone === "In") {
      setTimeout(() => {
        this.$refs.datePicker.focus();
      }, 300);
    }
    console.log('this.dates',this.dates)
  },
  methods: {
    openZone(val) {
      this.isSelect = val;
      this.$emit("updateZone", val);
    },
    setDestination(dest) {
      this.filterBy.destination = dest;
    },
    setGuests(guests) {
      this.filterBy.guests = { ...guests };
      console.log(guests);
    },
    setDates(dates){
      this.filterBy.dates.start = dates["0"]
      this.filterBy.dates.start = dates["1"]
    }
  },
  computed: {
    guestsCount() {
      const {adults,children,infants,pets} = this.filterBy.guests
      let str = adults || children ? `${adults + children} ${adults + children !== 1 ? 'guests' : 'guest'},` : ''
      str += infants ? ` ${infants} ${infants !== 1 ? 'infants': 'infant'},` : ''
      str += pets ? ` ${pets} ${pets !== 1 ? 'pets' : 'pet'}` : ''
      return str
    },
  },
  components: {
    reactiveBtn,
    destinationModal,
    datePicker,
    guestsModal,
  },
};
</script>
