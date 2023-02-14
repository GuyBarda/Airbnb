<template>
    <div class="user-dashboard secondary-container">
        <section class="dashboard-container">
            <nav :style="checkPath" class="dashboard-nav">
                <router-link
                    class="btn-nav"
                    v-if="path === 'host'"
                    to="/dashboard/host/orders"
                >
                    <i class="fa fa-solid fa-list"></i>
                    <span>Orders</span>
                </router-link>

                <router-link
                    class="btn-nav"
                    v-if="path === 'buyer'"
                    to="/dashboard/buyer/trips"
                    >My Trips</router-link
                >

                <router-link
                    class="btn-nav"
                    v-if="path === 'host'"
                    to="/dashboard/host/stays"
                >
                    <i class="fa-solid fa-house"></i>
                    <span> My Stays</span>
                </router-link>

                <router-link
                    class="btn-nav"
                    v-if="path === 'buyer'"
                    to="/dashboard/buyer/wishlist"
                    >wishlist
                </router-link>

                <router-link
                    class="btn-nav"
                    v-if="path === 'host'"
                    to="/stay/edit/"
                >
                    <i class="fa fa-regular fa-circle-plus"></i>
                    <span> add a stay</span>
                </router-link>
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
        }
    },
    created() {
        const path = this.$route.path.split("/")[2]
        this.path = path
    },
    computed: {
        currPath() {
            return this.$route.path.split("/")[2]
        },
        checkPath() {
            if (this.path === "host")
                return { "grid-template-columns": "repeat(3, 1fr)" }
            if (this.path === "buyer")
                return { "grid-template-columns": "repeat(2, 1fr)" }
        },
    },
    watch: {
        currPath(path) {
            this.path = path
        },
    },
}
</script>
