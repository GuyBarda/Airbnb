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
          class="dest-input"
          :class="{ set: filterBy.destination }"
          type="text"
          v-model="filterBy.destination"
          placeholder="Search destinations"
        />
        <destination-modal
          @setDestination="setDestination"
          :class="{ open: isSelect === 'Where' }"
        />
      </div>
      <span></span>
      <section class="date">
        <div
          @click.prevent="openZone('In')"
          :class="{ selected: isSelect === 'In' }"
          class="search-zone"
        >
          <label>Check in</label>
          <input
            :class="{ set: formattedStartDate }"
            :value="formattedStartDate"
            class="date-input"
            type="text"
            placeholder="Add dates"
            disabled
          />
        </div>
        <el-date-picker
          @change="setDates"
          ref="datePicker"
          popper-class="datePicker"
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
            :class="{ set: formattedEndDate }"
            :value="formattedEndDate"
            class="date-input"
            type="text"
            placeholder="Add dates"
            disabled
          />
        </div>
      </section>
      <span></span>

      <div
        @click.prevent="openZone('Who')"
        :class="{ selected: isSelect === 'Who' }"
        class="search-zone search-btn"
      >
        <label>Who</label>
        <input
          :value="guestsCount"
          :class="{ set: guestsCount }"
          class="guest-input"
          type="text"
          placeholder="Add guests"
          disabled
        />
        <button @click="setSearch" class="sub-search">
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
import { ref } from "vue";

export default {
  props: {
    zone: {
      type: String,
    },
  },
  data() {
    return {
      isSelect: "",
      dates: ref(""),
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
  },
  methods: {
    setSearch() {
      this.filterBy.guests = Object.values(this.filterBy.guests).reduce(
        (v, c) => v + c,
        0
      );
      
      this.$store.commit({ type: "setFilter", filterBy: { ...this.filterBy } });
      this.$store.dispatch({ type: "loadHouses" });
      
      const queryStringParams = `?dest=${this.filterBy.destination}&guests=${this.filterBy.guests}`;
      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        queryStringParams;
      window.history.pushState({ path: newUrl }, "", newUrl);
    },
    openZone(val) {
      this.isSelect = val;
      this.$emit("updateZone", val);
    },
    setDestination(dest) {
      this.filterBy.destination = dest;
      this.$emit("setDest", dest);
    },
    setGuests(guests) {
      this.filterBy.guests = { ...guests };
    },
    setDates(dates) {
      this.filterBy.dates.start = this.dates["0"];
      this.filterBy.dates.end = this.dates["1"];
      let str = this.formattedStartDate + " - " + this.formattedEndDate;
      console.log(str);
      this.$emit("setDate", str);
    },
  },
  computed: {
    guestsCount() {
      const { adults, children, infants, pets } = this.filterBy.guests;
      let str =
        adults || children
          ? `${adults + children} ${
              adults + children !== 1 ? "guests" : "guest"
            },`
          : "";
      str += infants
        ? ` ${infants} ${infants !== 1 ? "infants" : "infant"},`
        : "";
      str += pets ? ` ${pets} ${pets !== 1 ? "pets" : "pet"}` : "";
      return str;
    },
    formattedStartDate() {
      let date = new Date(this.filterBy.dates.start).toLocaleDateString(
        "en-us",
        { month: "short", day: "numeric" }
      );
      if (date === "Invalid Date") return "";
      return date;
    },
    formattedEndDate() {
      let date = new Date(this.filterBy.dates.end).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      if (date === "Invalid Date") return "";
      return date;
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
