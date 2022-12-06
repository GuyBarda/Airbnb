<template>
  <tr>
    <td>{{ trip.hostId }}</td>
    <td>{{ trip.stay.name }}</td>
    <td>{{ trip.startDate }}</td>
    <td>{{ trip.endDate }}</td>
    <td>{{ trip.totalPrice }}</td>
    <td><span :class="status">{{ trip.status }}</span></td>
    <td class="actions">
      <button class="approve" @click="$emit('changeStatus', 'approve')">
        Approve
      </button>
      <button class="decline" @click="$emit('changeStatus', 'decline')">
        Reject
      </button>
    </td>
  </tr>

</template>

<script>
export default {
  props: {
    trip: Object,
  },
  data(){
    return{
        status: 'pending',
    }
  },
  computed: {
    status(){
        return this.status
    }
  },
};
</script>
