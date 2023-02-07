<template>
    <section class="date-picker-mobile">
            <section class="day-names">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span
                ><span>Th</span><span>Fr</span><span>Sa</span>
            </section>
        <section v-for="currMonth in currMonth + 1" class="month">
            <p class="month-info">{{ months[currMonth] }} {{ currYear }}</p>
            <section class="days">
                <article v-for="i in monthsMap[months[currMonth]].firstDay"></article>
                <article
                    class="day"
                    @click="setDate(i)"
                    :class="{ disabled: i < date.getDate() }"
                    v-for="i in monthsMap[months[currMonth]].days"
                >
                    {{ i }}
                </article>
            </section>
        </section>

        <!-- <section class="month this-month">
            <section class="day-names">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span
                ><span>Th</span><span>Fr</span><span>Sa</span>
            </section>
            <p class="month-info">
                {{ months[date.getMonth()] }} {{ currYear }}
            </p>
            <section class="days">
                <article v-for="i in firstDay"></article>
                <article
                    class="day"
                    @click="setDate(i)"
                    :class="{ disabled: i < date.getDate() }"
                    v-for="i in getDaysInMonth"
                >
                    {{ i }}
                </article>
            </section>
        </section>
        <section class="month next-month">
                    <section class="day-names">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span
                ><span>Th</span><span>Fr</span><span>Sa</span>
            </section>
            <p class="month-info">
                {{ months[date.getMonth()+1] }} {{ currYear }}
            </p>
            <section class="days">
                <article v-for="i in firstDay"></article>
                <article
                    class="day"
                    @click="setDate(i)"
                    :class="{ disabled: i < date.getDate() }"
                    v-for="i in getDaysInMonth"
                >
                    {{ i }}
                </article>
            </section>
        </section> -->
    </section>
</template>

<script>
import { utilService } from "../services/utils-service.js"
export default {
    created() {
        this.date = new Date()
        console.log("this.date", this.date)
        this.currMonth = this.date.getMonth() + 1
        this.checkFirstDay()
        this.monthsMap= utilService.getMonthsMap()
    },
    data() {
        return {
            dayNames: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            date: null,
            currMonth: null,
            firstDay: null,
            monthsMap: null,
        }
    },
    methods: {
        setDate(val) {
            console.log("val", val)
        },
        checkFirstDay() {
            const dateInString =
                this.date.getMonth() + 1 + "/" + "01/" + this.date.getFullYear()
            this.firstDay = new Date(dateInString).getDay()
        },
    },
    computed: {
        getFirstDay() {
            const dateInString =
                month + 1 + "/" + "01/" + this.date.getFullYear()
            return new Date(dateInString).getDay()
        },
        getDaysInMonth() {
            // if(!this.date) return
            return this.daysInMonth[this.date.getMonth() + 1]
        },
        currYear() {
            return this.date.getFullYear()
        },
    },
}
</script>
