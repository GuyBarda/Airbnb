<template>
    <section class="secondary-container">
        <section class="house-edit">
            <nav>
                <ul>
                    <li><plus-icon style="width: 24px;height: 24px" />Add Stay</li>
                    <li><img src="../assets/svg/stay-at-home.png" />My Stays</li>
                    <li><img src="../assets/svg/check-list.png" />Orders</li>
                    <li><star-icon style="width: 24px;height: 24px" />Rates</li>
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
                        <h2><input type="text" v-model="house.name" placeholder="Stay name"></h2>
                        <div>
                            <p><star-icon style="display: inline;" />{{rate}}</p>
                            <p>&#183;Address <input type="text" v-model="house.loc.address"></p>
                        </div>
                    </section>
                    <section class="imgs-container">
                        <upload-img v-for="x in 5" :img="house.imgUrls[x]" :key="x" :idx="x" />
                    </section>
                    <section class="below-imgs">
                        <div style="display: flex; justify-content: space-between; align-items:center">
                            <label for="capacity">Capacity</label>
                            <input type="text" name="capacity" v-model="house.capacity">
                            <label for="stay-type">Stay type:</label>
                            <select name="stay-type" :value="house.type">
                                <option value="entire place">Entire place</option>
                                <option value="private room">Private room</option>
                                <option value="shared room">Shared room</option>
                            </select>
                            <label for="property-type">Property type:</label>
                            <select name="property-type">
                                <option value="House">House</option>
                                <option value="apartment">Apartment</option>
                                <!-- <option value="Shared room">Shared room</option> -->
                            </select>
                            <div>Price: <input style="width:40px" type="text" v-model="house.price"> /night</div>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <textarea v-model="house.summary"></textarea>
                        </div>
                        <div class="amenities-container">
                            <h3>Amenities</h3>
                            <div class="house-amenities">
                                <div v-for="a in allAmenities" style="display: flex; gap: 13px;">
                                    <input type="checkbox" :name="a">
                                    <img :src="`/src/assets/svg/amenities/${a.split(' ')[0].toLowerCase()}.svg`"
                                        alt="np" style="width: 1.2em;">
                                    <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                                    <label :for="a">{{ a.charAt(0).toUpperCase() + a.slice(1).replaceAll('-',' ') }}</label>
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
</template>
  
<script>
import starIcon from '../assets/svg/star.vue'
import plusIcon from '../assets/svg/plus.vue'
import uploadImg from '../cmps/upload-img.vue'
import { houseService } from '../services/house-service-local.js'

export default {
    data() {
        return {
            allAmenities: ['air', 'cooking', 'dedicated', 'free', 'garden', 'kitchen', 'mountain', 'private-hot-tub', 'private-pation', 'smoking', 'tv', 'washer', 'wifi'],
            house: {
                imgUrls: ['','','','',''],
                loc:{
                    address: ''
                }
            },
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
        console.log('created',typeof this.house.imgUrls);
    },
    computed:{
        rate() {
            if (this.house.reviews.length === 0) return 'New'
            let sum = this.house.reviews.reduce((acc, { rate }) => acc += rate, 0)
            sum /= this.house.reviews.length
            return `${sum} (${this.house.reviews.length} ${(this.house.reviews.length === 1) ? 'Review' : 'Reviews'})`
        },
    },

    components: {
        starIcon,
        plusIcon,
        uploadImg
    }
}
</script>