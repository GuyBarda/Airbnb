<template>
    <section class="secondary-container">
        <section v-if="this.stayToEdit" class="stay-edit">
            <section class="edit-section">
                <!-- <section class="stay-data">
                    <div>Total Rate <span>0</span></div>
                    <div>Monthly Earning <span>0</span></div>
                    <div>Orders <span>0</span></div>
                    <div>Active Guests <span>0</span></div> 
                </section> -->
                <section class="stay-info">
                    <section class="stay-name">
                        <h2>

                            <input type="text" v-model="stayToEdit.name" placeholder="Stay name" />

                        </h2>
                        <div>
                            <label>
                                Country
                                <input type="text" v-model="stayToEdit.loc.country" />
                            </label>
                            <label>
                                City
                                <input type="text" v-model="stayToEdit.loc.city" />
                            </label>
                            <label>
                                Address
                                <input type="text" v-model="stayToEdit.loc.address" />
                            </label>
                        </div>
                    </section>
                    <section class="imgs-container">
                        <upload-img v-for="x in 5" @setImg="setImg" :img="stayToEdit.imgUrls[x - 1]" :key="x"
                            :idx="x - 1" />
                    </section>
                    <section class="below-imgs">
                        <div style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            ">
                            <label for="capacity">Capacity
                                <input type="text" name="capacity" v-model="stayToEdit.capacity" />
                            </label>
                            <label for="stay-type">Stay type:
                                <select name="stay-type" v-model="stayToEdit.stayType">
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
                                <select name="property-type" v-model="stayToEdit.propertyType">
                                    <option value="Stay">Stay</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="Gueststay">Gueststay</option>
                                    <option value="Hotel">Hotel</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input style="width: 40px" type="text" v-model="stayToEdit.price" />
                                /night
                            </label>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <textarea v-model="stayToEdit.summary"></textarea>
                        </div>
                        <div class="amenities-container">
                            <h3>Amenities</h3>
                            <div class="stay-amenities">
                                <div v-for="a in allAmenities" style="display: flex; gap: 13px">
                                    <input @change="checkAmenities(a)" type="checkbox" :name="a" :checked="
                                        stayToEdit.amenities.includes(a)
                                    " />
                                    <img :src="`/src/assets/svg/amenities/${a
                                    .split(' ')[0]
                                    .toLowerCase()}.svg`" alt="np" style="width: 1.2em" />
                                    <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                                    <label :for="a">{{
                                            a.charAt(0).toUpperCase() +
                                            a.slice(1).replaceAll("-", " ")
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <section class="confirm-area">
                            <button @mousemove="hoverEffect" @click="saveStay" class="btn-reserve">
                                Save
                            </button>
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
// import { stayService } from "../services/stay-service-local.js";
import { stayService } from "../services/stay-service.js";

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
            stayToEdit: null,
            user: null,
        };
    },
    async created() {
        const user = userService.getLoggedinUser();
        const { id } = this.$route.params;

        user
            ? (this.user = user)
            : this.$store.commit({ type: "toggleMustLogin", bool: true });

        this.stayToEdit = id
            ? await stayService.getById(id)
            : stayService.getEmptyStay();
        this.stayToEdit.host = this.user;
        console.log("created", this.stayToEdit);
    },
    methods: {
        close() {
            this.user = userService.getLoggedinUser();
            this.$store.commit({ type: "toggleMustLogin", bool: false });
        },
        setImg({ url, idx }) {
            console.log("idx", idx);
            this.stayToEdit.imgUrls[idx] = url;
            // this.stayToEdit.imgUrls.push(url)
            console.log("this.stayToEdit", this.stayToEdit);
        },
        checkAmenities(amenity) {
            if (this.stayToEdit.amenities.includes(amenity)) {
                const idx = this.stayToEdit.amenities.findIndex(
                    (a) => a === amenity
                );
                this.stayToEdit.amenities.splice(idx, 1);
            } else {
                this.stayToEdit.amenities.push(amenity);
            }
            console.log("this.stay.amenities", this.stayToEdit.amenities);
        },
        hoverEffect(ev) {
            utilService.hoverEffect(ev);
        },
        async saveStay() {
            await this.$store.dispatch({
                type: "updateStay",
                stay: this.stayToEdit,
            });
            setTimeout(
                () => this.$router.push("/stay/" + this.stayToEdit._id),
                1500
            );
        },
    },
    components: {
        starIcon,
        plusIcon,
        uploadImg,
        loginSignupModal,
    },
};
</script>
