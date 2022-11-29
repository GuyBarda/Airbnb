<template>
    <div v-if="house" class="house-details">
        <h2>{{ house.name }}</h2>
        <div class="subtitle">
            <span>{{ totalReviews }}</span>
            <span>{{ house.loc.city }}, {{ house.loc.country }}</span>
        </div>
        <div class="imgs-container">
            <img v-for="img in house.imgUrls" :src="img" alt="">
        </div>

        <div style="display: flex;">
            <setion class="content">
                <h3>Entire home hosted by {{ house.host.fullname }}</h3>
                <div class="subtitle">
                    <span>{{ house.capacity }} guests</span>
                    <span></span>
                </div>
                <div class="air-cover">
                    <h3><span style="color: #fe385c;">air</span>cover</h3>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other
                        issues like trouble checking in.</p>
                    <a href="#">Learn more</a>
                </div>
                <div class="summary">
                    {{ house.summary }}
                </div>
                <div class="choose-beds">
                    <h3>Where you'll sleep</h3>
                    <div class="beds-btns">
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                        <button>
                            <img src="../assets/svg/bed.svg" alt="">
                            <p>Bedroom 1</p>
                            <span>1 single bed</span>
                        </button>
                    </div>
                    <div class="house-amenities">
                        <div v-for="a in house.amenities">
                            <p>{{ a }}</p>
                        </div>
                    </div>
                </div>
            </setion>
            <setion class="reserve-modal">
                <div class="header">
                    <h3>{{ formattedPerNightPrice }} per night</h3>
                    <span>{{ totalReviews }}</span>
                    <div class="date-picker"></div>
                    <button class="reserve">Reserve</button>
                    <p>You won't be charged yet</p>
                    <div class="prices">
                        <p>{{ formattedPerNightPrice }} x {{ totalNights }} nights</p>
                        <p>{{ formattedTotalsNightsPrice }}</p>
                        <p>cleaning fee</p>
                        <p>{{ formattedFeePrice }}</p>
                        <p>service fee</p>
                        <p>{{ formattedFeePrice }}</p>
                    </div>
                    <div class="total">
                        <p>Total</p>
                        <p>{{ formattedTotalPrice }}</p>
                    </div>
                </div>
            </setion>
        </div>

        <section class="reviews">
            <header>
                <p>{{ averageReviews }}</p>
                <p>{{ totalReviews }}</p>
            </header>
        </section>


        <pre>{{ house }}</pre>
    </div>

</template>
  
<script>
import { computed } from '@vue/reactivity'
import { houseService } from '../services/house-service-local'

export default {
    data() {
        return {
            house: null
        }
    },
    async created() {
        const { id } = this.$route.params
        this.house = await houseService.getById(id)
    },
    computed: {
        totalReviews() {
            const { reviews } = this.house
            if (reviews.length === 1) return '1 review'
            if (reviews.length > 1) return `${reviews.length} reviews`
            if (!reviews.length) return `No reviews yet...`
        }
    }
}
</script>