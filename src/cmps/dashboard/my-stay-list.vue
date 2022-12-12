<template>
    <section class="my-stay-list">
        <section class="my-stay-list-header">
            <h4>stay name</h4>
            <h4>location</h4>
            <h4>price</h4>
            <h4>capacity</h4>
            <h4>propertyType</h4>
            <h4>Actions</h4>
        </section>
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
