<template>
    <!-- <pre v-if="stay">{{stay}}</pre> -->

    <section class="my-stay-preview">
        <router-link :to="('/stay/' + stay._id)">
                <p>{{ stay.name }}</p>
                <p>{{stay.loc.city}}, {{stay.loc.country}}</p>
                <p>{{stay.price}}</p>
                <p>{{stay.capacity}}</p>
                <p>{{stay.propertyType}}</p>
                <section class="stay-actions">
                    <button class="update-btn" @click.prevent="navigateToUpdate()">Update</button>
                    <button v-if="!subMenu" class="elipsis-btn" @click.prevent="openSubMenu">
                        <elipsisIcon />
                    </button>
                    <button v-else @click.stop.prevent="deleteStay()" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </section>
        </router-link>
    </section>
</template>

<script>
import elipsisIcon from '../../assets/svg/ellipsis.vue'
export default {
    props: {
        stay: Object
    },
    created() {
    },
    data() {
        return {
            subMenu: false,
        }
    },
    components: {
        elipsisIcon
    },
    methods: {
        openSubMenu() {
            this.subMenu = !this.subMenu
        },
        navigateToUpdate() {
            this.$router.push('/stay/edit/' + this.stay._id)
        },
        deleteStay() {
            this.$emit('deleteStay', this.stay._id)
        }
    },
}
</script>
