<template>
    <div class="filter-modal">
        <form @submit.prevent="filterHouses">
            <header class="form-header">
                <button @click="$emit('close')">
                    <img src="../assets/svg/close.svg" alt="">
                </button>
                <p>Filters</p>
            </header>
            <section>
                <h2>Price range</h2>
                <p>The average nightly price is {{ formattedPrice }}</p>
                <!-- <chart></chart> -->
                <div class="range">
                    <input type="text" value="30">
                    -
                    <input type="text" value="1000">
                </div>
            </section>
            <hr />
            <section>
                <h2>Type of place</h2>
                <input type="checkbox" name="entire">
                <label for="entire">Entire place</label>
                <input type="checkbox" name="private">
                <label for="entire">Private room</label>
                <input type="checkbox" name="shared">
                <label for="shared">Shared room</label>
            </section>
            <hr />
            <section>
                <h2>Rooms and beds</h2>
                <p>Bedrooms</p>
                <p>Beds</p>
                <p>Bathrooms</p>
            </section>
            <hr />
            <section>
                <h2>Property type</h2>
                <button>House</button>
                <button>Apartment</button>
                <button>Guesthouse</button>
                <button>Hotel</button>
            </section>
            <section>
                <h2>Amenities</h2>
                <div class="checkboxes">
                    <input type="checkbox" name="wifi">
                    <label for="wifi">Wifi</label>
                    <input type="checkbox" name="washer">
                    <label for="washer">Washer</label>
                    <input type="checkbox" name="ac">
                    <label for="ac">Ac</label>
                    <input type="checkbox" name="kitchen">
                    <label for="kitchen">Kitchen</label>
                </div>
            </section>
            <section>Booking options</section>
            <label>
                Instant Book
                <input type="checkbox">
            </label>
            <label>
                Self check-in
                <input type="checkbox">
            </label>
            <footer>
                <button>Clear all</button>
                <button>Show {{ totalHouses }} homes</button>
            </footer>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        filterHouses() {

        }
    },
    computed: {
        formattedPrice() {
            // return this.house.price
            return 12;
        },
        totalHouses() {
            return 100
        }
    }
}
</script>