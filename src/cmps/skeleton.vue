<template>
    <article class="stay-preview">
        <div class="img-skeleton skeleton"></div>
        <!-- <img class="skeleton" src="######" alt="" /> -->
        <section>
            <div class="location">
                <div class="skeleton skeleton-txt"></div>
            </div>
            <main>
                <p class="stay-name skeleton-txt"></p>
                <div class="skeleton skeleton-txt"></div>
                <p class="date skeleton-txt"></p>
            </main>
            <p class="price skeleton-txt"></p>
            <div class="skeleton skeleton-txt"></div>
        </section>
    </article>
</template>

<script>
export default {
    props: {
        stay: Object,
    },
    data() {
        return {};
    },
    created() {
        console.log("hey skeleton");
    },
    methods: {},
    components: {},
};
</script>
<style></style>
