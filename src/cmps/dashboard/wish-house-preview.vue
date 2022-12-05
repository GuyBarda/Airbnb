<template>
    <div class="wish-house-preview">
        <!-- <pre>{{ wishHouse }}</pre> -->
        <div class="imgs-container">
            <img v-for="img in wishHouse.imgUrls.slice(0, 3)" :src="img" alt="cool pic of house">
        </div>
        <h3>{{ wishHouse.name }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        wishHouse: Object
    },
}
</script>