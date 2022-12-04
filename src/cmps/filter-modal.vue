<template>
    <div class="form-filter">
        <div class="form-header">
            <div class="close-filter">
                <img @click="$emit('close')" src="../assets/svg/close.svg" alt="" />
            </div>
            <h3>Filters</h3>
        </div>

        <div class="form-wrapper">
            <div class="form-price">
                <h2>Price range</h2>
                <p>The average nightly price is $206</p>
                <section style="background-color: red">
                    <HistogramSlider style="margin: 200px auto" :width="600" :height="300" :bar-height="100"
                        :data="prices" :force-edges="true" :colors="['#4facfe', '#00f2fe']" :min="0" :max="1000" />
                </section>

                <div class="form-inputs">
                    <div class="price-inner">
                        <label for="min">min price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input name="min" type="text" v-model.number="filterBy.minPrice" min="25$" />
                        </div>
                    </div>

                    <div class="between-prices">-</div>

                    <div class="price-inner">
                        <label for="max"> max price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input type="text" v-model.number="filterBy.maxPrice" max="$800" />
                        </div>
                    </div>
                </div>
            </div>

            <section class="Type-of-place">
                <h2>Type of place</h2>
                <section class="place-types">
                    <article class="place-type">
                        <input type="checkbox" name="entire" v-model="filterBy.type" value="entire place" />
                        <div class="label-p">
                            <label for="entire">Entire place</label>
                            <p>A place all to yourself</p>
                        </div>
                    </article>
                    <article class="place-type">
                        <input type="checkbox" name="private" v-model="filterBy.type" value="private room" />
                        <div class="label-p">
                            <label for="private">Private room</label>
                            <p>Your own room in a home or a hotel, plus some shared common spaces</p>
                        </div>
                    </article>
                    <article class="place-type">
                        <input type="checkbox" name="shared" v-model="filterBy.type" value="shared room" />
                        <div class="label-p">
                            <label for="shared">Shared room</label>
                            <p>A sleeping space and common areas that may be shared with others</p>
                        </div>
                    </article>
                </section>

                <!-- <div class="first-tow">
  
          <div class="checkbox">
            <input type="checkbox" name="entire" v-model="filterBy.type" value="Entire place"/>
  
            <div class="label-p">
              <label>Entire place</label>
              <p>A place all to yourself</p>
            </div>
          </div>
          
          <div class="checkbox">
            <input type="checkbox" name="private" v-model="filterBy.type" value="Private room" />
  
             <div class="label-p">
              <label>Private room</label>
              <p>Your own room in a home or a hotel, plus some shared common spaces</p>
             </div>
          </div>
  
        </div>
  
          <div class="checkbox">
            <input type="checkbox" name="shared" v-model="filterBy.type" value="Shared room"/>
  
            <div class="label-p">
            <label>Shared room</label>
            <p>A sleeping space and common areas that may be shared with others</p>
           </div>
          </div> -->
            </section>

            <div class="form-rooms-and-beds">
                <h2>Rooms and beds</h2>
                <h3>Bedrooms</h3>
                <div id="row1">
                    <input type="radio" id="bedroom0" name="bedroom" :value="all" v-model="filterBy.roomsBeds
                    .bedrooms" />
                    <label for="bedroom0" class="btn-btn">All</label>
                    <div class="btns-group" v-for="num in 8">
                        <input type="radio" :id="`bedroom${num}`" name="bedroom" :value="num" v-model="filterBy.roomsBeds
                        .bedrooms" />
                        <label :for="`bedroom${num}`" class="btn-btn">{{ num }}</label>
                    </div>
                </div>

                <h3>beds</h3>
                <div id="row2">
                    <input type="radio" id="bed0" name="bed" :value="all" v-model="filterBy.roomsBeds
                    .beds" />
                    <label for="bed0" class="btn-btn">All</label>
                    <div class="btns-group" v-for="num in 8">
                        <input type="radio" :id="`bed${num}`" name="bed" :value="num" v-model="filterBy.roomsBeds
                        .beds" />
                        <label :for="`bed${num}`" class="btn-btn">{{ num }}</label>
                    </div>

                    <!-- <button class="btn-btn" @click="setRoomsBeds('beds', num, $event, 'row2')" v-for="num in 8"
                                            :key="num">
                                            {{ num }}
                                        </button> -->
                </div>

                <h3>Bathrooms</h3>
                <div id="row3">
                    <input type="radio" id="bathroom0" name="bathroom" :value="all" v-model="filterBy.roomsBeds
                    .bathrooms" />
                    <label for="bathroom0" class="btn-btn">All</label>
                    <!-- <button class="btn-btn" @click="setRoomsBeds('bedrooms', num)" v-for="num in 8" :key="num">
                        {{ num }}
                    </button> -->
                    <div class="btns-group" v-for="num in 8">
                        <input type="radio" :id="`bathroom${num}`" name="bathroom" :value="num" v-model="filterBy.roomsBeds
                        .bathrooms" />
                        <label :for="`bathroom${num}`" class="btn-btn">{{ num }}</label>
                    </div>
                </div>
            </div>

            <div class="form-property-type">
                <h2>Property type</h2>
                <div class="flex">
                    <div class="property-type" @click="setPropertyType('house')">
                        <div>
                            <img src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg"
                                alt="" />
                            <span>House</span>
                        </div>
                    </div>

                    <div class="property-type" @click="setPropertyType('apartment')">
                        <div>
                            <img src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg"
                                alt="" />
                            <span>Apartment</span>
                        </div>
                    </div>

                    <div class="property-type" @click="setPropertyType('guesthouse')">
                        <div>
                            <img src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg"
                                alt="" />
                            <span>guesthouse</span>
                        </div>
                    </div>

                    <div class="property-type" @click="setPropertyType('hotel')">
                        <div>
                            <img src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg"
                                alt="" />
                            <span>Hotel</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-amenities">
                <div class="form-title-amenities">
                    <h2>Amenities</h2>
                </div>

                <div class="essentials">
                    <h3>Essentials</h3>
                    <div>
                        <div class="el-checkbox-group">
                            <label class="el-checkbox">
                                <span class="el-checkbox__input">
                                    <input class="el-checkbox__original" type="checkbox" aria-hidden="false"
                                        value="Wifi" />
                                    <span class="el-checkbox__inner"></span>
                                </span>
                                <span class="el-checkbox__label">Wifi</span>
                            </label>
                            <label class="el-checkbox">
                                <span class="el-checkbox__input">
                                    <input class="el-checkbox__original" type="checkbox" aria-hidden="false"
                                        value="Kitchen" />
                                    <span class="el-checkbox__inner"></span>
                                </span>
                                <span class="el-checkbox__label">Kitchen</span>
                            </label>
                            <label class="el-checkbox">
                                <span class="el-checkbox__input">
                                    <input class="el-checkbox__original" type="checkbox" aria-hidden="false"
                                        value="Washer" />
                                    <span class="el-checkbox__inner"></span> </span><span
                                    class="el-checkbox__label">Washer</span>
                            </label>
                            <label class="el-checkbox">
                                <span class="el-checkbox__input">
                                    <input class="el-checkbox__original" type="checkbox" aria-hidden="false"
                                        value="TV" />
                                    <span class="el-checkbox__inner"></span>
                                </span>
                                <span class="el-checkbox__label">TV</span>
                            </label>
                            <label class="el-checkbox"><span class="el-checkbox__input">
                                    <input class="el-checkbox__original" type="checkbox" aria-hidden="false"
                                        value="Air conditioning" />
                                    <span class="el-checkbox__inner"></span>
                                </span>
                                <span class="el-checkbox__label">Air conditioning</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-footer">
            <button>Clear all</button>
            <button @click="filterHouses">Show {{ totalHouses }} homes</button>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        houses: Array,
    },
    components: {

    },
    data() {
        return {
            filterBy: {
                minPrice: 25,
                maxPrice: 800,
                type: [],
                roomsBeds: {
                    bedrooms: 1,
                    beds: 1,
                    bathrooms: 1,
                },
                PropertyType: [],
                Amenities: [],
            },
            isSelect: false,
        };
    },
    updated() {
        console.log(this.filterBy)
    },
    computed: {
        prices() {
            const prices = this.houses.map(house => house.price + '')
            console.log('prices', prices);
            return prices
        }
    },
    methods: {
        filterHouses() {
            this.$store.commit({ type: "setFilter", filterBy: { ...this.filterBy } });
            this.$store.dispatch({ type: "loadHouses" });
        },
        setRoomsBeds(key, num, ev, id) {
            console.log("ev", ev);
            console.log("ev", id);
            ev.target.classList.toggle("selected");

            this.filterBy.roomsBeds[key] = num;
        },
        setPropertyType(key) {
            this.filterBy.PropertyType.push(key);
        },
    },
};
</script>
  
<style>

</style>
  