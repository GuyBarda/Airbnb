<template>
    <div class="full">
        <header ref="elDetailsHeader" :class="{ sticky: sticky }" class="details-header full secondary-container ">
            <section class="secondary-container">
                <nav class="details-nav">
                    <a href="#photos">Photos</a>
                    <a href="#amenities">Amenities</a>
                    <a href="#reviews">Reviews</a>
                    <!-- <a href="#">Location</a> -->
                </nav>
                <div v-if="false" class="reserve-container">
                    <div class="reserve-container">
                        <p>{{ formattedPrice }} night</p>
                        <review-average :reviews="stay.reviews" />
                    </div>
                    <button class="reserve-btn">Reserve</button>
                </div>
            </section>
        </header>
    </div>
</template>

<script>
import reviewAverage from '../cmps/review-average.vue';

export default {
    props: {
        stay: Object,
        sticky: Boolean
    },
    computed: {
        formattedPrice() {
            return 1300;
        }
    },
    components: {
        reviewAverage
    }
}
</script>