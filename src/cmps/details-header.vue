<template>
    <div class="">
        <header ref="elDetailsHeader" :class="{ sticky: sticky }" class="details-header full secondary-container ">
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
    </div>
</template>

<script>
import reviewAverage from '../cmps/review-average.vue';

export default {
    props: {
        house: Object,
        sticky: Boolean
    },
    computed: {
        formattedPrice() {
            return 1300;
        }
    },
    mounted() {
        // const detailsHeader = this.$refs.detailsHeader;
        // const observer = new IntersectionObserver(entries => {
        //     entries.forEach(entry => {

        //         if (!entry.isIntersecting) {
        //             entry.target.classList.add('true')
        //             entry.target.classList.remove('false')
        //         }
        //         else {
        //             entry.target.classList.add('false')
        //             entry.target.classList.remove('true')
        //         }
        //         console.log(entry)
        //         // entry.target.classList.remove(entry.isIntersecting)
        //         // if (entry.isIntersecting) observer.observe(detailsHeader)
        //         // observer.unobserve(detailsHeader)
        //     })
        // })
        // observer.observe(detailsHeader)
    },
    updated() {
        console.log('update', this.sticky)
    },
    components: {
        reviewAverage
    }
}
</script>