<template>
    <section class="stay-book main-container full">
        <header class="stay-book-header">
            <button>←</button>
            <h1>Your order has been confirmed</h1>
        </header>
        <div class="info-container">

            <div class="info">
                <!-- <div class="your-trip">
                    <h3>Your trip</h3>
                    <div class="trip-container">
                        <div>
                            <p>Dates</p>
                            <span>{{ 'may 9' }}</span>
                        </div>
                        <button>Edit</button>
                    </div>
                    <div class="trip-container">
                        <div>
                            <p>Geusts</p>
                            <span>{{ '1 guest' }}</span>
                        </div>
                        <button>Edit</button>
                    </div>
                </div> -->
                <!-- <div class="choose-payment">
                    <div class="group">
                        <label>
                            <div>
                                <p>Pay in full</p>
                                <input type="radio">
                            </div>
                            <span>Pay the total now and you're all set.</span>
                        </label>
                        <label>
                            <div>
                                <p>Pay part now, part later</p>
                                <input type="radio">
                            </div>
                            <span>Pay $2,395.66 now, and the rest ($2,328.96) will be automatically charged to the same
                                payment method on Apr 24, 2023. No extra fees.</span>
                            </label>
                        </div>
                    </div> -->
                <!-- <div class="pay-with">
                        <input type="text">
                        <div class="pay-with-group">
                            <input type="text">
                            <input type="text">
                            <input type="text">
                        </div>
                        <input type="text">
                        <select name="" id=""></select>
                        <button>Enter a coupon</button>
                    </div> -->
                <div class="cancellation">
                    <h3>Cancellation policy</h3>
                    <p>Free cancellation before Apr 9. Cancel before May 2 for a partial refund.</p>
                </div>
                <div class="ground-rules">
                    <h3>Ground rules</h3>
                    <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                    <ul>
                        <li>Follow the house rules</li>
                        <li>Treat your Host's home like your own</li>
                    </ul>
                </div>
                <div class="">

                    <button>Confirm and pay</button>
                </div>
            </div>
            <div class="sticky">

                <div class="content">
                    <div class="your-stay-details-container">
                        <h3>Stay details</h3>
                        <div class="stay-details-info-container">
                            <img :src="stay?.imgUrls[0]" alt="">
                            <!-- <p>{{ stay.name }}</p> -->
                            <!-- <p>Hosted by: {{ stay.host.fullname }}</p> -->
                            <!-- <review-average :reviews="stay.reviews.length" :rateMap="rateMap" /> -->
                            <!-- <p>{{ formattedPerNightPrice }}</p> -->
                        </div>
                    </div>
                    <div class="your-trip-container">
                        <h3>Your trip</h3>
                        <div class="info-container">
                            <p>Check-In</p>
                            <!-- <p>{{ formatedStartDate }}</p> -->
                            <p>Check-Out</p>
                            <!-- <p>{{ formatedEndDate }}</p> -->
                        </div>
                    </div>
                    <div class="price-details-container">
                        <h3>Price details</h3>
                        <div class="info-container">
                            <p>Adults</p>
                            <!-- <p>{{ order.guests.adults }}</p> -->
                            <p>Total price</p>
                            <!-- <p>{{ formattedTotalPrice }}</p> -->
                            <p>Total nights</p>
                            <!-- <p>{{ getTotalDays }}</p> -->
                        </div>
                    </div>
                </div>
                <button @click="goToDashboard" @mousemove="hoverEffect" class="btn-reserve">Check your trips</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>