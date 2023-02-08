<template>
    <section class="date-picker-mobile">
        <section class="day-names">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span
            ><span>Th</span><span>Fr</span><span>Sa</span>
        </section>
        <section v-for="(currMonth, idx) in currMonth + 1" class="month">
            <p class="month-info">{{ months[currMonth] }} {{ currYear }}</p>
            <section class="days">
                <article
                    v-for="i in monthsMap[months[currMonth]].firstDay"
                ></article>
                <article
                    class="day"
                    @click="setDate(i, currMonth + 1, currYear)"
                    :class="{
                        disabled: i < date.getDate() && idx === 0,
                        today: i === date.getDate() && idx === 0,
                        selected: selectedDates.start === formatDate(i,currMonth+1,currYear) || selectedDates.end === formatDate(i,currMonth+1,currYear)
                    }"
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
        this.currMonth = this.date.getMonth() + 1
        this.monthsMap = utilService.getMonthsMap()
    },
    data() {
        return {
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
            monthsMap: null,
            selectedDates: {
                start: "",
                end: "",
            },
        }
    },
    methods: {
        setDate(day, month, year) {
            const dateToSave = this.formatDate(day, month, year)
            if (this.selectedDates.start === "")
                return (this.selectedDates.start = dateToSave)
            const startDate = new Date(this.selectedDates.start).getTime()
            const selectedDate = new Date(dateToSave).getTime()
            if (startDate > selectedDate)
                return (this.selectedDates.start = dateToSave)
            if(this.selectedDates.end !== '' && startDate < selectedDate) return (this.selectedDates.start = dateToSave)
            return (this.selectedDates.end = dateToSave)
        },
        formatDate(day, month, year) {
            if (day < 10) day = "0" + day
            if (month < 10) month = "0" + month
            return month + "/" + day + "/" + year
        },
    },
    computed: {
        currYear() {
            return this.date.getFullYear()
        },
    },
}
</script>
