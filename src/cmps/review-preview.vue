<template>
    <div class="review-preview">
        <div class="mini-user-details">
            <img :src="review.by.imgUrl" alt="">
            <p>{{ review.by.fullname }}</p>
            <!-- <span>{{ review.createdAt }}</span> -->
            <span>{{ 'sep 2022' }}</span>
        </div>
        <p>{{ review.txt }}</p>
    </div>
</template>

<script>
export default {
    props: {
        review: Object
    },
    computed: {
        formattedDate() {
            return this.review.createdAt
        }
    }
}
</script>