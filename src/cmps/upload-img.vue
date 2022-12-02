<template>
    <section
        class="img-upload"
        :class="{ 'drag-zone': isDragover }"
        @drop.prevent="handleFile"
        @dragover.prevent="isDragover = true"
        @dragleave="isDragover = false"
    >
        <label v-if="!isLoading" :class="{ drag: isDragover }">
            <p>Upload Image</p>
            <input type="file" @change="handleFile" hidden />
        </label>
        <!-- <img v-else src="../assets/loader.gif" alt="" /> -->
    </section>
</template>

<script>
import { uploadImg } from '../services/upload-service.js'

export default {
    name: 'img-upload',
    props: {
        idx: Number,
    },
    // components: { uploadIcon },
    data() {
        return {
            isLoading: false,
            isDragover: false,
            imgUrls: ['','','','',''],
        }
    },
    methods: {
        setImg(url){
            this.imgUrls[this.idx] = url
        },
        handleFile(ev) {
            console.log('ev', ev)
            let file
            if (ev.type === 'change') file = ev.target.files[0]
            else if (ev.type === 'drop') file = ev.dataTransfer.files[0]
            this.onUploadFile(file)
        },
        async onUploadFile(file) {
            this.isLoading = true
            this.isDragover = false
            const res = await uploadImg(file)
            this.setImg(res.url)
            // this.$emit('saved', res.url)
            this.isLoading = false
            console.log('res:', res)
        },
    },
    computed:{
        background(){
            if(this.imgUrls[this.idx]) return this.imgUrls[this.idx]
            return 'background-color: lightgray'
        }
    }
}
</script>

<style>

</style>
