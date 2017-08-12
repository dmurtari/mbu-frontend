<template>
  <paginated-table :target="'registrations'"
                   :contents="registrations"
                   :per="20"
                   :showLinks="true">
    <thead slot="header">
      <tr>
        <th>Scout</th>
        <th width="70px">Troop</th>
        <th>Period 1</th>
        <th>Period 2</th>
        <th>Period 3</th>
        <th>Purchases</th>
        <th v-if="event">Total Due</th>
      </tr>
    </thead>
    <template slot="row"
              scope="props">
      <stats-row :event="event"
                 :registration="props.item"></stats-row>
    </template>
  </paginated-table>
</template>

<script>
import StatsRow from './StatsRow.vue';

export default {
  props: {
    event: {
      type: Object
    },
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
