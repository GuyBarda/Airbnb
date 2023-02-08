<template>
    <section class="search-modal-mobile">
        <section class="search-modal-header">
            <button @click.stop.prevent="toggleSearch" class="back-btn">
                <close-btn />
            </button>
        </section>
        <main class="modals">
            <section class="destination-wrapper">
                <div
                    class="dest-info"
                    v-if="currZone !== 'Where'"
                    @click="currZone = 'Where'"
                >
                    <button>Where</button>
                    <span>Choose Location</span>
                </div>
                <div class="dest-info second" v-else>
                    <span class="heading">Where to?</span>
                    <input type="search" placeholder="Search destinations" />
                </div>
                <destination-modal :class="{ open: currZone === 'Where' }" />
            </section>

            <section class="date-wrapper">
                <div
                    class="date-info"
                    v-if="currZone !== 'Date'"
                    @click="currZone = 'Date'"
                >
                    <button>When</button>
                    <span>Choose Date</span>
                </div>
                <div class="date-info second" v-else>
                    <span class="heading">When's your trip?</span>
                </div>
                <mobile-date-picker :class="{ open: currZone === 'Date' }" />
            </section>
            <section class="guests-wrapper">
                <div
                    class="guests-info"
                    v-if="currZone !== 'Guests'"
                    @click="currZone = 'Guests'"
                >
                    <button>Guests</button>
                    <span>Add Guests</span>
                </div>
                <div class="guests-info second" v-else>
                    <span class="heading">Who's coming?</span>
                </div>
                <guests-modal :class="{ open: currZone === 'Guests' }" />
            </section>
        </main>
        <section class="search">
            <p>Clear All</p>
            <button @mousemove="hoverEffect">Search</button>
        </section>
    </section>
</template>

<script>
import { utilService } from "../services/utils-service.js"

import destinationModal from "./destination-modal.vue"
import mobileDatePicker from "./date-picker-mobile.vue"
import guestsModal from "./guests-modal.vue"

import closeBtn from "../assets/svg/x-button.vue"
export default {
    data() {
        return {
            currZone: "",
            filterBy: {
                destination: "",
                dates: {
                    start: "",
                    end: "",
                },
                guests: {
                    adults: 0,
                    children: 0,
                    infants: 0,
                    pets: 0,
                },
            },
        }
    },
    methods: {
        setZone(value) {
            this.currZone = value
        },
        toggleSearch() {
            this.$store.commit({ type: "toggleSearch", bool: false })
        },
        hoverEffect(ev) {
            const button = ev.target
            const { x, y } = button.getBoundingClientRect()
            button.style.setProperty("--x", ev.clientX - x + "px")
            button.style.setProperty("--y", ev.clientY - y + "px")
        },
    },
    components: {
        destinationModal,
        mobileDatePicker,
        guestsModal,
        closeBtn,
    },
}
</script>
