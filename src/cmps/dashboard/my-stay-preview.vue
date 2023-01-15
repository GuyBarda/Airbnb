<template>
    <!-- <pre v-if="stay">{{stay}}</pre> -->

    <section class="my-stay-preview">
        <router-link :to="'/stay/' + stay._id">
            <p><span class="prop">Name:&nbsp;</span>{{ stay.name }}</p>
            <p><span class="prop">Location:&nbsp;</span>{{ stay.loc.city }}, {{ stay.loc.country }}</p>
            <p><span class="prop">Price:&nbsp;</span>{{ stay.price }}</p>
            <p><span class="prop">Capacity:&nbsp;</span>{{ stay.capacity }}</p>
            <p><span class="prop">Property Type:&nbsp;</span>{{ stay.propertyType }}</p>
            <section class="stay-actions">
                <button class="update-btn" @click.prevent="navigateToUpdate()">
                    <i class="fa fa-solid fa-pencil"></i>Update
                </button>
                <button class="elipsis-btn" @click.prevent="openSubMenu">
                    <elipsisIcon />
                    <button
                        v-if="subMenu"
                        @click.stop.prevent="deleteStay()"
                        class="delete-btn"
                    >
                        <i class="fa fa-solid fa-trash"></i>Delete
                    </button>
                </button>
            </section>
        </router-link>
    </section>
</template>

<script>
import elipsisIcon from "../../assets/svg/ellipsis.vue";
export default {
    props: {
        stay: Object,
    },
    created() {},
    data() {
        return {
            subMenu: false,
        };
    },
    components: {
        elipsisIcon,
    },
    methods: {
        openSubMenu() {
            this.subMenu = !this.subMenu;
        },
        navigateToUpdate() {
            this.$router.push("/stay/edit/" + this.stay._id);
        },
        deleteStay() {
            this.$emit("deleteStay", this.stay._id);
        },
    },
};
</script>
