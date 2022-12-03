<template>
    <header class="details-header full secondary-container ">
        <section>
            <nav class="details-nav">
                <a href="#photos">Photos</a>
                <a href="#amenities">Amenities</a>
                <a href="#reviews">Reviews</a>
                <!-- <a href="#">Location</a> -->
            </nav>
            <div v-if="false" class="reserve-container">
                <div class="reserve-container">
                    <p>{{ formattedPrice }} night</p>
                    <review-average :reviews="house.reviews" />
                </div>
                <button class="reserve-btn">Reserve</button>
            </div>
        </section>
    </header>
</template>

<script>
import reviewAverage from '../cmps/review-average.vue'

export default {
    props: {
        house: Object
    },
    computed: {
        formattedPrice() {
            return 1300
        }
    },
    components: {
        reviewAverage
    }
}
</script>