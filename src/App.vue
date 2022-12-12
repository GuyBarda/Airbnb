<template>
    <app-header :close="isOpen" />
    <RouterView />
    <section
        @click.stop.prevent="toggleSearch"
        class="dark-site"
        :class="{
            open: isOpen,
            search: isOpen,
            must: isMustLogin,
        }"
    ></section>
    <section
        @click="closeDarkForModals"
        class="dark-for-modals"
        :class="{
            open: isOrderComplete || isFilterOpen || isMustLogin || isLogInOpen,
            must: isMustLogin,
        }"
    ></section>
    <loginSignupModal v-if="isLogInOpen" @closeModal="close" />
    <user-msg />
    <app-footer />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import appHeader from "./cmps/app-header.vue";
import userMsg from "./cmps/user-msg.vue";
import { eventBus, showSuccessMsg } from "./services/event-bus-service.js";
import appFooter from "./cmps/app-footer.vue";
import loginSignupModal from "./cmps/login-signup-modal.vue";
import { socketService } from "./services/socket-service.js";

export default {
    created() {
        this.$store.dispatch({ type: "loadUser" });
        socketService.on("order-updated", (order) => {
            showSuccessMsg("Order updated, check your trips");
        });
    },
    methods: {
        toggleSearch() {
            this.$store.commit({ type: "toggleSearch", bool: false });
            eventBus.emit("closeDatePicker");
        },
        closeDarkForModals() {
            this.$store.commit({ type: "toggleSuccessModal", bool: false });
            this.$store.commit({ type: "toggleFilterModal", bool: false });
            this.$store.commit({ type: "toggleLogInModal", bool: false });
        },
    },
    computed: {
        isMustLogin() {
            return this.$store.getters.isMustLogin;
        },
        isFilterOpen() {
            return this.$store.getters.isFilterOpen;
        },
        isLogInOpen() {
            return this.$store.getters.isLogInOpen;
        },
        isOpen() {
            return this.$store.getters.open;
        },
        isOrderComplete() {
            return this.$store.state.isOrderComplete;
        },
        emptyZone() {
            return this.zone;
        },
    },
    components: {
        appHeader,
        userMsg,
        appFooter,
        loginSignupModal,
    },
};
</script>
