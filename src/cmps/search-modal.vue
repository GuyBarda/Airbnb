<template>
    <section @click.prevent class="search-modal full">
        <section :class="{'btn-selected': isSelect !== ' ' }" class="search-input">
            <div @click.prevent="openZone('Where')" :class="{selected: isSelect === 'Where'}" class="search-zone">
                <label>Where</label>
                <input type="text" placeholder="Search destinations">
            </div>
            <div @click.prevent="openZone('In')" :class="{selected: isSelect === 'In'}" class="search-zone">
                <label>Check in</label>
                <input type="text" placeholder="Add dates" disabled>
            </div>
            <div @click.prevent="openZone('Out')" :class="{selected: isSelect === 'Out'}" class="search-zone">
                <label>Check out</label>
                <input type="text" placeholder="Add dates" disabled>
            </div>
            <div @click.prevent="openZone('Who')" :class="{selected: isSelect === 'Who'}" class="search-zone">
                <label>Who</label>
                <input type="text" placeholder="Add guests" disabled>
            </div>
        </section>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                isSelect: ' '
            }
        },
        methods: {
            openZone(val){
                this.isSelect = val
            }
        },
    }
</script>
