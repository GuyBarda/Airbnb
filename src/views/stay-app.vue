<template>
    <section class="stay-app main-container">
        <stay-filter :stays="stays" />
        <section class="explore-sub-header" v-if="this.$route.path === '/explore'">
            Found {{ this.$store.getters.actualStaysLength }} homes
        </section>
        <stay-list v-if="stays.length" :stays="stays" />

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
            filterBy: {
                page: 0
            }
        };
    },
    async created() {
        window.addEventListener('scroll', this.increasePage)
        try {
            // await this.$store.dispatch({ type: "loadStays" });
            await this.$store.dispatch({ type: "setFilter", filterBy: { ...this.changePath } });
        } catch {
            console.log("cant load stays");
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.increasePage)
    },
    methods: {
        increasePage() {
            if (this.stays.length === this.actualStaysLength) return

            const { scrollTop, offsetHeight } = document.documentElement;
            const bottomOfWindow = scrollTop + window.innerHeight === offsetHeight;

            if (!bottomOfWindow) return
            this.filterBy.page++
            this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy, isPush: true });
        }
    },
    computed: {
        actualStaysLength() {
            return this.$store.getters.actualStaysLength
        },
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
        changePath(query) {
            window.scrollTo(0, 0)
            const isExplore = this.$route.path === "/explore"
            const { commit, dispatch } = this.$store
            commit({ type: "toggleSearch", bool: false });
            dispatch({
                type: "setFilter",
                filterBy: isExplore ? { ...query } : stayService.getEmptyFilter(),
            })
        },
    },
};
</script>
