<template>
    <div class="filter-modal">
        <header>
            <button @click="close()">
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
        <br />
        <section>
            <h2>Type of place</h2>
            <input type="checkbox" name="entire">
            <label for="entire">Entire place</label>
            <input type="checkbox" name="private">
            <label for="entire">Private room</label>
            <input type="checkbox" name="shared">
            <label for="shared">Shared room</label>
        </section>
        <br />
        <section>
            <h2>Rooms and beds</h2>
            <p>Bedrooms</p>
            <p>Beds</p>
            <p>Bathrooms</p>
        </section>
        <br />
        <section>
            <h2>Property type</h2>

        </section>
    </div>
</template>

<script>
export default {
    methods: {
        close() {

        }
    },
    computed: {
        formattedPrice() {
            // return this.house.price
        }
    }
}
</script>