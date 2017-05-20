<template>
  <table class="table is-striped">
    <thead>
      <tr>
        <th>Scout</th>
        <th>Troop</th>
        <th>Period 1</th>
        <th>Period 2</th>
        <th>Period 3</th>
        <th>Purchases</th>
      </tr>
    </thead>
    <tbody>
      <stats-row v-for="registration in registrations"
                 :key="registration.id"
                 :registration="registration"></stats-row>
    </tbody>
  </table>
</template>

<script>
import StatsRow from './StatsRow.vue';

export default {
  props: {
    registrations: {
      type: Array,
      required: true
    }
  },
  components: {
    StatsRow
  }
}
</script>
