<template>
    <section class="stay-book secondary-container full">
        <header>
            <!-- <router-link></router-link> -->
            <button>←</button>
            <h1>Confirm and pay</h1>
        </header>
        <div class="info">
            <div class="your-trip">
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
            </div>
            <div class="choose-payment">
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
            </div>
            <div class="pay-with">
                <input type="text">
                <div class="pay-with-group">
                    <input type="text">
                    <input type="text">
                    <input type="text">
                </div>
                <input type="text">
                <select name="" id=""></select>
                <button>Enter a coupon</button>
            </div>
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
            <button>Confirm and pay</button>
        </div>
        <div class="sticky">
            <div class="">
                <img src="" alt="">
                <p>{{ stay?.type }}</p>
                <p>{{ stay?.name }}</p>
                <!-- <review></review> -->
            </div>
            <div class="">
                <p>Your booking is protected by AirCover</p>
            </div>
            <div class="">
                <h2>Price details</h2>
                <div class=""></div>
            </div>
        </div>
    </section>
</template>

<script>
import {orderService} from '../services/order-service.js'

export default {
    async created(){
        const {orderId} = this.$route.query
        this.order = await orderService.getById(orderId)
    },
    data(){
        return {
            order: null
        }
    }
}
</script>