<template>
    <section class="my-stay-list">
        <my-stay-preview
            @deleteStay="deleteStay"
            v-for="stay in stays"
            :stay="stay"
        />
    </section>
</template>

<script>
import myStayPreview from "./my-stay-preview.vue";
export default {
    props: {
        stays: Array,
    },
    components: {
        myStayPreview,
    },
    methods: {
        deleteStay(stayId) {
            this.$emit("deleteStay", stayId);
        },
    },
};
</script>
