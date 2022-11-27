<template>
    <div class="house-preview">
        <p :class="{ stock: !house.inStock }">{{ house.name }}</p>
        <span :class="{ stock: !house.inStock }" :style="spanStyle">{{ formattedPrice }}</span>
        <div class="actions">
            <router-link :to="'/house/edit/' + house._id" class="edit">Edit</router-link>
            <!-- <button @click.prevent="deleteHouse">Delete</button> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        house: Object
    },
    // props: {
    //     house: {
    //         type: Object,
    //         required: true,
    //     }
    // },  
    methods: {
        async deleteHouse() {
            if (!confirm('Are you sure?')) return;
            await this.$store.dispatch({ type: 'removeHouse', houseId: this.houseToEdit._id, })
            this.his.$store.dispatch({ type: 'loadHouses', })
        },
    },
    computed: {
        spanStyle() {
            return {
                color: this.house.price >= 50 ? 'red' : 'black',
            };
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