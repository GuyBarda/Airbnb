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
            <article @click="setSort(btn.key)" v-for="btn in btns" :key="btn">
                <div
                    class="article-box"
                    :class="{ selected: isSelected === btn.key }"
                >
                    <img :src="btn.url" alt="" />
                    <p>{{ btn.key }}</p>
                </div>
            </article>
        </section>
        <button
            :class="{ hidden: hidden === 'right' }"
            @click="scroll('right')"
            class="scroll right"
        >
            <arrow-right />
        </button>
    </section>
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
        },
    },
    components: {
        Carousel,
        Slide,
        Navigation,
        arrowRight,
        arrowLeft,
    },
}
</script>
