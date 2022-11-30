<template>
    <div class="review-totals">
        <star></star>
        <span>{{ averageReviews }}</span> ·
        <p>{{ totalReviews }}</p>
    </div>
</template>

<script>
import star from '../assets/svg/star.vue'

export default {
    props: {
        reviews: Array
    },
    computed: {
        totalReviews() {
            if (this.reviews.length === 1) return '1 review'
            if (this.reviews.length > 1) return `${this.reviews.length} reviews`
            if (!this.reviews.length) return `No reviews yet...`
        },
        averageReviews() {
            // return this.reviews.reduce((r, acc) => r)
            return 4.5
        }
    },
    components: {
        star
    }
}
</script>