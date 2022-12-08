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
    created() {
        console.log(this.stays);
    },
    components: {
        myStayPreview,
    },
    methods: {
        deleteStay(stayId) {
            console.log('hi');
            this.$emit("deleteStay", stayId);
        },
    },
};
</script>
