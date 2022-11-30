<template>
    <div class="review-preview">
        <div class="mini-user-details">
            <img :src="review.by.imgUrl" alt="">
            <p>{{ review.by.fullname }}</p>
            <p>{{ review.createdAt }}</p>
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