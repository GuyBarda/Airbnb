<template>
    <section class="secondary-container">
        <section v-if="this.stayToEdit" class="stay-edit">
            <section class="edit-section">
                <form @submit.prevent="saveStay" class="stay-info">
                    <section class="stay-name">
                        <h2>
                            <input type="text" v-model="stayToEdit.name" placeholder="Stay name" />
                        </h2>
                        <div>
                            <label>
                                <!-- Country -->
                                <input type="text" v-model="stayToEdit.loc.country" placeholder="Enter Country" />
                            </label>
                            <label>
                                <!-- City -->
                                <input type="text" v-model="stayToEdit.loc.city" placeholder="Enter City" />
                            </label>
                            <label>
                                <!-- Address -->
                                <input type="text" v-model="stayToEdit.loc.address" placeholder="Enter address" />
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
                                <select name="stay-type" v-model="stayToEdit.roomType">
                                    <option value="entire place">
                                        Entire place
                                    </option>
                                    <option value="private room">
                                        Private room
                                    </option>
                                    <option value="shared room">
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
                            <button class="btn-reserve">
                                Save
                            </button>
                        </section>
                    </section>
                </form>
            </section>
        </section>
        <section class="redirect" v-else>
            <h2>Your screen is too small switch to desktop</h2>
            <h3>Redirecting to home page in 3 seconds...</h3>
        </section>
    </section>
    <section v-if="!user">
        <loginSignupModal @closeModal="close" />
    </section>
</template>

<script>
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
            allAmenities: this.$store.getters.amenities,
            stayToEdit: null,
            user: null,
        };
    },
    async created() {
        const width = window.innerWidth
        const user = userService.getLoggedinUser();
        const { id } = this.$route.params;

        user
            ? (this.user = user)
            : this.$store.commit({ type: "toggleMustLogin", bool: true });

        if(width < 500) {
            setTimeout(() => {
                this.$router.push('/')
            }, 3000);
            return
        }
        this.stayToEdit = id
            ? await stayService.getById(id)
            : stayService.getEmptyStay();
        this.stayToEdit.host = this.user;
    },
    methods: {
        close() {
            this.user = userService.getLoggedinUser();
            this.$store.commit({ type: "toggleMustLogin", bool: false });
        },
        setImg({ url, idx }) {
            this.stayToEdit.imgUrls[idx] = url;
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
        },
        hoverEffect(ev) {
            utilService.hoverEffect(ev);
        },
        async saveStay() {
            this.stayToEdit.capacity = +this.stayToEdit.capacity
            this.stayToEdit.price = +this.stayToEdit.price
            this.stayToEdit.bedrooms = 1
            this.stayToEdit.bathrooms = 1
            this.stayToEdit.beds = 1
            let stay = await this.$store.dispatch({
                type: "updateStay",
                stay: this.stayToEdit,
            });
            const miniStay = {
                _id: stay._id,
                name: stay.name,
                propertyType: stay.propertyType,
                loc: stay.loc,
                capacity: stay.capacity,
                price: stay.price
            };
            if (!this.stayToEdit._id) {
                await this.$store.dispatch({
                    type: "addToUserStays",
                    miniStay,
                });
            }
            setTimeout(() => this.$router.push("/stay/" + stay._id), 1500);
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
