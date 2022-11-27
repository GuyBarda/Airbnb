<template>
    <div class="">
        <ul class="">
            <li v-for="toy in toys">
                <router-link :to="'/toy/' + toy._id" class="details">
                    <toy-preview :toy="toy"></toy-preview>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import toyPreview from './toy-preview.vue';

export default {
    props: ['toys'],
    components: {
        toyPreview,
    },
};
</script>