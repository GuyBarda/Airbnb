<template>
    <section class="stay-app main-container">
        <stay-filter :stays="stays" />
        <section class="explore-sub-header" v-if="this.$route.path === '/explore'">
            Found {{ this.$store.getters.actualStaysLength }} homes
        </section>
        <stay-list v-if="!isLoading" :stays="stays" />

        <div class="stay-list" v-else>
            <skeleton v-for="num in 12" :key="num" />
        </div>
    </section>
</template>

<script>
import { stayService } from "../services/stay-service.js";
import stayFilter from "../cmps/stay-filter.vue";
import stayList from "../cmps/stay-list.vue";
import skeleton from "../cmps/skeleton.vue";

export default {
    data() {
        return {
            isLoading: false,
            filterBy: {
                page: 0
            }
        };
    },
    async created() {
        window.addEventListener('scroll', this.increasePage)
        try {
            this.isLoading = true;
            await this.$store.dispatch({ type: "loadStays" });
            console.log(this.$store.actualStaysLength)
            this.isLoading = false;
        } catch {
            console.log("cant load stays");
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.increasePage)
    },
    methods: {
        increasePage() {
            const { scrollTop, offsetHeight } = document.documentElement
            let bottomOfWindow = scrollTop + window.innerHeight === offsetHeight;
            if (!bottomOfWindow) return
            this.filterBy.page++
            this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy, isPush: true });
        }
    },
    computed: {
        stays() {
            return this.$store.getters.stays;
        },
        changePath() {
            return this.$route.query;
        },
    },
    components: {
        stayFilter,
        stayList,
        skeleton,
    },
    watch: {
        async changePath(query) {
            this.isLoading = true;
            if (this.$route.path === "/explore") {
                const filterBy = query;
                this.$store.commit({
                    type: "setFilter",
                    filterBy: { ...filterBy },
                });
                this.$store.commit({ type: "toggleSearch", bool: false });
            } else {
                this.$store.commit({
                    type: "setFilter",
                    filterBy: stayService.getEmptyFilter(),
                });
            }
            await this.$store.dispatch({ type: "loadStays" });
            this.isLoading = false;
        },
    },
};
</script>
