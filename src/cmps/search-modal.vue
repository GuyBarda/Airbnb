<template>
  <section @click.prevent class="search-modal full">
    <section :class="{ 'btn-selected': isSelect !== ' ' }" class="search-input">
      <div
        @click.prevent="openZone('Where')"
        :class="{ selected: isSelect === 'Where' }"
        class="search-zone destination"
      >
        <label>Where</label>
        <input type="text" placeholder="Search destinations" />
        <destination-modal :class="{ open: isSelect === 'Where' }" />
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
        v-model="value"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        :default-time="defaultTime"
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
          class="guest-input"
          type="text"
          placeholder="Add guests"
          disabled
        />
        <button class="sub-search">
          <img src="../assets/svg/search.svg" alt="" />Search
        </button>
        <guests-modal />
      </div>
    </section>
  </section>
</template>

<script>
import reactiveBtn from "./reactive-btn.vue";
import destinationModal from "./destination-modal.vue";
import datePicker from "./date-picker.vue";
import guestsModal from "./guests-modal.vue";

export default {
  data() {
    return {
      isSelect: " ",
    };
  },
  methods: {
    openZone(val) {
      // const element = document.getElementById("myList");
      document.body.lastElementChild.style.display = "block";

      this.isSelect = val;
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
