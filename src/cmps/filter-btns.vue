<template>
    <section class="filter-wrapper">
        <button
            :class="{ hidden: hidden === 'left' }"
            @click="scroll('left')"
            class="scroll left"
        >
            <arrow-left />
        </button>
        <section ref="btns" class="filter-btns">
            <article
                @click="setSort(btn.key)"
                :class="{ selected: isSelected === btn.key }"
                v-for="btn in btns"
                :key="btn"
            >
                <img :src="btn.url" alt="" />
                <p>{{ btn.key }}</p>
            </article>
        </section>
        <button
            :class="{ hidden: hidden === 'right' }"
            @click="scroll('right')"
            class="scroll right"
        >
            <arrow-right />
        </button>
        <!-- <section class="scrollers">
            <button  @click="scroll('left')" class="scroll left">
                <arrow-left />
            </button>
            <button @click="scroll('right')" class="scroll right">
                <arrow-right />
            </button>
        </section> -->
    </section>
    <!-- <carousel class="carousel" :settings="settings" :breakpoints="breakpoints">
        <slide v-for="slide in btns" :key="slide">

            <div class="slide-wrapper" @click="setSort(slide.key)">
                <div class="img-wrapper" :class="{ selected: isSelected === slide.key }">
                    <img class="img-btn" :src="slide.url" alt="" width="24" height="24" />
                    <div class="imgKey">
                        <span>{{ slide.key }}</span>
                    </div>
                </div>
            </div>

        </slide>

        <template #addons>
            <div class="filter-navigation">
                <navigation :slideWidth="100" />
            </div>
        </template>
    </carousel> -->
</template>

<script>
import "vue3-carousel/dist/carousel.css"
import { Carousel, Slide, Navigation } from "vue3-carousel"
import arrowLeft from "../assets/svg/arrow-left.vue"
import arrowRight from "../assets/svg/arrow-right.vue"

export default {
    props: {
        btns: Array,
    },
    data() {
        return {
            hidden: "left",
            isSelected: null,
            filterBy: {
                type: "",
            },
            settings: {
                itemsToShow: 4,
                itemsToScroll: 4,
                snapAlign: "center",
            },
            breakpoints: {
                // 700px and up
                700: {
                    itemsToShow: 7,
                    itemsToScroll: 4,
                    snapAlign: "center",
                },
                // 1024 and up
                1024: {
                    itemsToShow: 13,
                    itemsToScroll: 4,
                    snapAlign: "center",
                },
            },
        }
    },
    methods: {
        setSort(type) {
            if (this.$store.getters.isLoading) return
            this.filterBy.type = type
            this.isSelected = type
            this.$emit("filtered", this.filterBy)
        },

        scroll(direction) {
            const { scrollLeft, clientWidth, scrollWidth } = this.$refs.btns

            const scrollTo = Math.round(
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth
            )
            this.$refs.btns.scrollTo({
                left: scrollTo,
                behavior: "smooth",
            })

            if (scrollTo <= 0) this.hidden = "left"
            else this.hidden = "between"
            if (scrollTo + clientWidth >= scrollWidth) this.hidden = "right"
            console.log("scrollTo", scrollTo)
            // if (this.$refs.btns.scrollLeft === 0) this.hidden = "left"
            // else this.hidden = "between"
            // if (scrollLeft === 0) this.hidden = "left"
            // else this.hidden = "between"
            // console.log("scrollLeft", scrollLeft)
        },
    },
    computed: {},
    components: {
        Carousel,
        Slide,
        Navigation,
        arrowRight,
        arrowLeft,
    },
}
</script>
