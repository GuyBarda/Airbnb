<template>
    <div class="review-preview">
        <div class="mini-user-details">
            <img :src="review.by.imgUrl" alt="" />
            <p>{{ review.by.fullname }}</p>
            <span>{{ formattedDate }}</span>
        </div>
        <p :class="`text${idx}`">{{ review.txt }}</p>
        <button @click="showMore">Show more</button>
    </div>
</template>

<script>
export default {
    props: {
        review: Object,
        idx: Number,
    },
    data() {
        return {
            isShowMore: true,
        };
    },
    methods: {
        showMore(ev) {
            ev.target.innerText = `Show ${this.isShowMore ? "less" : "more"}`;
            document.querySelector(`.text${this.idx}`).style.display = this
                .isShowMore
                ? "block"
                : "-webkit-box";
            this.isShowMore = !this.isShowMore;
        },
    },
    computed: {
        formattedDate() {
            let date = new Date(this.review.at).toLocaleDateString("en-us", {
                month: "short",
                year: "numeric",
            });
            return date === "Invalid Date" ? "" : date;
        },
    },
};
</script>
