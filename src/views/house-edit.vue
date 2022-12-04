<template>
    <section class="secondary-container">
        <section v-if="this.houseToEdit" class="house-edit">
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
                            <label>
                                Name
                                <input type="text" v-model="houseToEdit.name" placeholder="Stay name" />
                            </label>
                        </h2>
                        <div>
                            <label>
                                Country <input type="text" v-model="houseToEdit.loc.country" />
                            </label>
                            <label>
                                City <input type="text" v-model="houseToEdit.loc.city" />
                            </label>
                            <label>
                                Address <input type="text" v-model="houseToEdit.loc.address" />
                            </label>
                        </div>
                    </section>
                    <section class="imgs-container">
                        <upload-img v-for="x in 5" @setImg="setImg" :img="houseToEdit.imgUrls[x]" :key="x" :idx="x" />
                    </section>
                    <section class="below-imgs">
                        <div style="display: flex;justify-content: space-between;align-items: center;">
                            <label for="capacity">Capacity
                                <input type="text" name="capacity" v-model="houseToEdit.capacity" />
                            </label>
                            <label for="stay-type">Stay type:
                                <select name="stay-type" v-model="houseToEdit.stayType">
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
                            </label>
                            <label for="property-type">Property type:
                                <select name="property-type" v-model="houseToEdit.propertyType">
                                    <option value="House">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="Guesthouse">Guesthouse</option>
                                    <option value="Hotel">Hotel</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input style="width: 40px" type="text" v-model="houseToEdit.price" />
                                /night
                            </label>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <textarea v-model="houseToEdit.summary"></textarea>
                        </div>
                        <div class="amenities-container">
                            <h3>Amenities</h3>
                            <div class="house-amenities">
                                <div v-for="a in allAmenities" style="display: flex; gap: 13px">
                                    <input @change="checkAmenities(a)" type="checkbox" :name="a"
                                        :checked="houseToEdit.amenities.includes(a)" />
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
                            <button @mousemove="hoverEffect" @click="saveHouse" class="btn-reserve">Save</button>
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
import { houseService } from "../services/house-service-local.js";
import { userService } from "../services/user-service.js";
import { utilService } from "../services/utils-service.js";


import starIcon from "../assets/svg/star.vue";
import plusIcon from "../assets/svg/plus.vue";
import uploadImg from "../cmps/upload-img.vue";
import loginSignupModal from "../cmps/login-signup-modal.vue";

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
            houseToEdit: null,
            user: null,
        };
    },
    async created() {
        const user = userService.getLoggedinUser();
        const { id } = this.$route.params;

        user ? this.user = user : this.$store.commit({ type: "toggleMustLogin", bool: true });

        this.houseToEdit = id ? await houseService.getById(id) : houseService.getEmptyHouse();

        console.log("created", this.houseToEdit);
    },
    methods: {
        close() {
            this.user = userService.getLoggedinUser();
            this.$store.commit({ type: "toggleMustLogin", bool: false });
        },
        setImg({ url, idx }) {
            this.houseToEdit.imgUrls[idx] = url
        },
        checkAmenities(amenity) {
            if (this.houseToEdit.amenities.includes(amenity)) {
                const idx = this.houseToEdit.amenities.findIndex((a) => a === amenity);
                this.houseToEdit.amenities.splice(idx, 1);
            } else {
                this.houseToEdit.amenities.push(amenity);
            }
            console.log("this.house.amenities", this.houseToEdit.amenities);
        },
        hoverEffect(ev) {
            utilService.hoverEffect(ev)
        },
        async saveHouse() {
            await this.$store.dispatch({ type: 'updateHouse', house: this.houseToEdit })
            this.$router.push('/')
        }
    },
    components: {
        starIcon,
        plusIcon,
        uploadImg,
        loginSignupModal,
    },
}
</script>
  