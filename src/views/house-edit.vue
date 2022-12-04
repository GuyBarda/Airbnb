<template>
  <section class="secondary-container">
    <section v-if="this.house" class="house-edit">
      <nav>
        <ul>
          <li><plus-icon style="width: 24px; height: 24px" />Add Stay</li>
          <li><img src="../assets/svg/stay-at-home.png" />My Stays</li>
          <li><img src="../assets/svg/check-list.png" />Orders</li>
          <li><star-icon style="width: 24px; height: 24px" />Rates</li>
        </ul>
      </nav>
      <section class="edit-section">
        <section class="house-data">
          <div>Total Rate <span>0</span></div>
          <div>Monthly Earning <span>0</span></div>
          <div>Orders <span>0</span></div>
          <div>Active Guests <span>0</span></div>
        </section>
        <section class="house-info">
          <section class="house-name">
            <h2>
              <input type="text" v-model="house.name" placeholder="Stay name" />
            </h2>
            <div>

              <label>
                Address <input type="text" v-model="house.loc.address" />
              </label>
            </div>
          </section>
          <section class="imgs-container">
            <upload-img v-for="x in 5" @setImg="setImg" :img="house.imgUrls[x]" :key="x" :idx="x" />
          </section>
          <section class="below-imgs">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;">
              <label for="capacity">Capacity</label>
              <input type="text" name="capacity" v-model="house.capacity" />
              <label for="stay-type">Stay type:</label>
              <select name="stay-type" v-model="house.stayType">
                <option value="Entire place">
                  Entire place
                </option>
                <option value="Private room">
                  Private room
                </option>
                <option value="Shared room">
                  Shared room
                </option>
              </select>
              <label for="property-type">Property type:</label>
              <select name="property-type" v-model="house.propertyType">
                <option value="House">House</option>
                <option value="apartment">Apartment</option>
                <option value="Guesthouse">Guesthouse</option>
                <option value="Hotel">Hotel</option>

              </select>
              <div>
                Price:
                <input style="width: 40px" type="text" v-model="house.price" />
                /night
              </div>
            </div>
            <div>
              <h3>Description</h3>
              <textarea v-model="house.summary"></textarea>
            </div>
            <div class="amenities-container">
              <h3>Amenities</h3>
              <div class="house-amenities">
                <div v-for="a in allAmenities" style="display: flex; gap: 13px">
                  <input @change="checkAmenities(a)" type="checkbox" :name="a" :checked="house.amenities.includes(a)" />
                  <img :src="`/src/assets/svg/amenities/${a
                  .split(' ')[0]
                  .toLowerCase()}.svg`" alt="np" style="width: 1.2em" />
                  <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                  <label :for="a">{{
                      a.charAt(0).toUpperCase() + a.slice(1).replaceAll("-", " ")
                  }}</label>
                </div>
              </div>
            </div>
            <section class="confirm-area">
              <button class="confirm-btn" type="button">Save</button>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section v-if="!user">
    <loginSignupModal @closeModal="close" />
  </section>
</template>

<script>
import starIcon from "../assets/svg/star.vue";
import plusIcon from "../assets/svg/plus.vue";
import uploadImg from "../cmps/upload-img.vue";
import loginSignupModal from "../cmps/login-signup-modal.vue";
import { houseService } from "../services/house-service-local.js";
import { userService } from "../services/user-service.js";

export default {
  data() {
    return {
      allAmenities: [
        "Garden view",
        "TV",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Cooking basics",
        "Dedicated workspace",
        "Washer",
        "Smoking allowed",
      ],
      house: null,
      user: null,
    };
  },
  async created() {
    // console.log('house');
    const user = userService.getLoggedinUser();
    if (user) {
      this.user = user;
    } else {
      this.$store.commit({ type: "toggleMustLogin", bool: true });
    }

    const { id } = this.$route.params;
    if (id) {
      this.house = await houseService.getById(id);
    } else {
      this.house = houseService.getEmptyHouse();
    }
    console.log("created", this.house);
  },
  computed: {
    rate() {
      if (!this.house.reviews) return;
      if (this.house.reviews.length === 0) return "New";
      let sum = this.house.reviews.reduce((acc, { rate }) => (acc += rate), 0);
      sum /= this.house.reviews.length;
      return `${sum} (${this.house.reviews.length} ${this.house.reviews.length === 1 ? "Review" : "Reviews"
        })`;
    },
  },
  methods: {
    close() {
      this.user = userService.getLoggedinUser();
      this.$store.commit({ type: "toggleMustLogin", bool: false });
    },
    setImg({ url, idx }) {
      this.house.imgUrls[idx] = url
    },
    checkAmenities(amenity) {
      if (this.house.amenities.includes(amenity)) {
        const idx = this.house.amenities.findIndex((a) => a === amenity);
        this.house.amenities.splice(idx, 1);
      } else {
        this.house.amenities.push(amenity);
      }
      console.log("this.house.amenities", this.house.amenities);
    },
  },

  components: {
    starIcon,
    plusIcon,
    uploadImg,
    loginSignupModal,
  },
}
</script>
