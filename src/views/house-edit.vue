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
                        <h2><input type="text" placeholder="Stay name"></h2>
                        <div>
                            <p><star-icon style="display: inline;" /> New (0 Reviews)</p>
                            <p>Adress <input type="text"></p>
                        </div>
                    </section>
                    <section class="imgs-container">
                        <upload-img v-for="x in 5" :key="x" :idx="x" />
                    </section>
                    <section class="below-imgs">
                        <div style="display: flex; gap: 5px;">
                            <label for="capacity">Capacity</label>
                            <input type="text" name="capacity">
                            <label for="stay-type">Stay type</label>
                            <select name="stay-type">
                                <option value="entire place">Entire place</option>
                                <option value="private room">Private room</option>
                                <option value="shared room">Shared room</option>
                            </select>
                            <label for="property-type">Property type</label>
                            <select name="property-type">
                                <option value="House">House</option>
                                <option value="apartment">Apartment</option>
                                <!-- <option value="Shared room">Shared room</option> -->
                            </select>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <textarea></textarea>
                        </div>
                        <div class="amenities-container">
                            <h3>Amenities</h3>
                            <div class="house-amenities">
                                <div v-for="a in allAmenities" style="display: flex; gap: 13px;">
                                    <input type="checkbox" :name="a">
                                    <img :src="`/src/assets/svg/amenities/${a.split(' ')[0].toLowerCase()}.svg`"
                                        alt="np" style="width: 1.2em;">
                                    <!-- <img src="../assets/svg/amenities/tv.svg" alt=""> -->
                                    <label :for="a">{{ a }}</label>
                                </div>
                            </div>
                        </div>
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

export default {
    data() {
        return {
            allAmenities: ['air', 'cooking', 'dedicated', 'free', 'garden', 'kitchen', 'mountain', 'private hot tub', 'private pation', 'smoking', 'tv', 'washer', 'wifi']
        }
    },

    components: {
        starIcon,
        plusIcon,
        uploadImg
    }
}
</script>