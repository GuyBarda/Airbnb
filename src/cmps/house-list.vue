<template>
    <div class="house-list">
        <ul class="clean-list">
            <li v-for="house in houses">
                <router-link :to="'/house/' + house._id" class="details">
                    <house-preview :house="house"></house-preview>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import housePreview from './house-preview.vue';

export default {
    props: ['houses'],
    components: {
        housePreview,
    },
};
</script>
