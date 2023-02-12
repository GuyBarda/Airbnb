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
                    <span :class="{ set: filterBy.destination }">{{
                        filterBy.destination || "Choose Location"
                    }}</span>
                </div>
                <div class="dest-info second" v-else>
                    <span class="heading">Where to?</span>
                    <input
                        v-model="filterBy.destination"
                        type="search"
                        placeholder="Search destinations"
                    />
                </div>
                <destination-modal
                    @setDestination="setDestination"
                    :class="{ open: currZone === 'Where' }"
                />
            </section>

            <section class="date-wrapper">
                <div
                    class="date-info"
                    v-if="currZone !== 'Date'"
                    @click="currZone = 'Date'"
                >
                    <button>When</button>
                    <span :class="{ set: dateToDisplay }">{{
                        dateToDisplay || "Choose Date"
                    }}</span>
                </div>
                <div class="date-info second" v-else>
                    <span class="heading">When's your trip?</span>
                </div>
                <mobile-date-picker
                    @setDates="setDates"
                    :class="{ open: currZone === 'Date' }"
                />
            </section>
            <section class="guests-wrapper">
                <div
                    class="guests-info"
                    v-if="currZone !== 'Guests'"
                    @click="currZone = 'Guests'"
                >
                    <button>Guests</button>
                    <span :class="{ set: guestsCount }">{{
                        guestsCount || "Add Guests"
                    }}</span>
                </div>
                <div class="guests-info second" v-else>
                    <span class="heading">Who's coming?</span>
                </div>
                <guests-modal
                    @setGuests="setGuests"
                    :class="{ open: currZone === 'Guests' }"
                />
            </section>
        </main>
        <section class="search">
            <p @click="clearSearch">Clear All</p>
            <button @click.stop.prevent="setSearch" @mousemove="hoverEffect">
                Search
            </button>
        </section>
    </section>
</template>

<script>
import { utilService } from "../services/utils-service.js"
import { eventBus } from "../services/event-bus-service.js"

import destinationModal from "./destination-modal.vue"
import mobileDatePicker from "./date-picker-mobile.vue"
import guestsModal from "./guests-modal.vue"

import closeBtn from "../assets/svg/x-button.vue"
export default {
    data() {
        return {
            currZone: "",
            dateToDisplay: "",
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
        setSearch() {
            this.filterBy.guests = Object.values(this.filterBy.guests).reduce(
                (v, c) => v + c,
                0
            )
            this.$router.push({
                path: "/explore",
                query: {
                    destination: this.filterBy.destination,
                    guests: this.filterBy.guests,
                },
            })
        },
        clearSearch(){
            this.filterBy = {
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
            }
            eventBus.emit('clearGuests')
            eventBus.emit('clearDates')
            this.dateToDisplay =''
        },
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
        setGuests(guests) {
            this.filterBy.guests = { ...guests }
            let formattedGuests = Object.values(this.filterBy.guests).reduce(
                (v, c) => v + c,
                0
            )
            this.$emit("setGuests", formattedGuests)
        },
        setDestination(dest) {
            this.filterBy.destination = dest
            this.$emit("setDest", dest)
        },
        setDates(dates) {
            this.filterBy.dates.start = dates.start
            this.filterBy.dates.end = dates.end

            this.dateToDisplay =
                this.formattedStartDate + " - " + this.formattedEndDate
            // this.$emit("setDate", str)
        },
    },
    computed: {
        guestsCount() {
            const { adults, children, infants, pets } = this.filterBy.guests
            let str =
                adults || children
                    ? `${adults + children} ${
                          adults + children !== 1 ? "guests" : "guest"
                      }`
                    : ""
            str += infants
                ? `, ${infants} ${infants !== 1 ? "infants" : "infant"}`
                : ""
            str += pets ? `, ${pets} ${pets !== 1 ? "pets" : "pet"}` : ""
            return str
        },
        formattedStartDate() {
            let date = new Date(this.filterBy.dates.start).toLocaleDateString(
                "en-us",
                { month: "short", day: "numeric" }
            )
            if (date === "Invalid Date") return ""
            return date
        },
        formattedEndDate() {
            let date = new Date(this.filterBy.dates.end).toLocaleDateString(
                "en-us",
                { month: "short", day: "numeric" }
            )
            if (date === "Invalid Date") return ""
            return date
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
