<template>
    <div class="user-dashboard secondary-container">
        <section class="dashboard-container">
            <nav :style="checkPath" class="dashboard-nav">
                <router-link class="btn-nav" v-if="path === 'host'" to="/dashboard/host/orders">Orders</router-link>
                <router-link class="btn-nav" v-if="path === 'buyer'" to="/dashboard/buyer/trips">My Trips</router-link>
                <router-link class="btn-nav" v-if="path === 'host'" to="/dashboard/host/stays">My Stays</router-link>
                <router-link class="btn-nav" v-if="path === 'buyer'"
                    to="/dashboard/buyer/wishlist">wishlist</router-link>
                <router-link class="btn-nav" v-if="path === 'host'" to="/stay/edit/">add a stay</router-link>
            </nav>
            <RouterView />
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            path: "host",
        };
    },
    created() {
        const path = this.$route.path.split("/")[2];
        this.path = path;
    },
    computed: {
        currPath() {
            return this.$route.path.split("/")[2];
        },
        checkPath() {
            if (this.path === "host")
                return { "grid-template-columns": "repeat(3, 1fr)" };
            if (this.path === "buyer")
                return { "grid-template-columns": "repeat(2, 1fr)" };
        },
    },
    watch: {
        currPath(path) {
            this.path = path
        }
    },
};
</script>
