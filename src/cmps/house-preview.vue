<template>
    <div class="house-preview">
        <div class="carousel">
            <button>←</button>
            <img src="" alt="house">
            <button>→</button>
        </div>
        <p>{{ house.locationName }}</p>
        <p>{{ distanceFromMe }}</p>
        <p>{{ formattedPrice }}</p>
    </div>
</template>

<script>
export default {
    props: {
        house: Object
    },
    computed: {
        distanceFromMe() {
            return this.house.position;
        },
        formattedPrice() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            return formatter.format(this.house.price)
        }
    },
};
</script>