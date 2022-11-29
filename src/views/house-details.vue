<template>
  <pre>{{ house }}</pre>
</template>

<script>
import { houseService } from '../services/house-service-local'

export default {
  data() {
    return {
      house: null
    }
  },
  async created() {
    const { id } = this.$route.params
    this.house = await houseService.getById(id)
  }
}
</script>

