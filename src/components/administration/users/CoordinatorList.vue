<template>
  <table class="table is">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Troop</th>
        <th>District</th>
        <th>Council</th>
      </tr>
    </thead>
    <tbody>
      <coordinator-row v-for="coordinator in coordinators"
                      :coordinator="coordinator"></coordinator-row>
    </tbody>
  </table>
</template>

<script>
import CoordinatorRow from './CoordinatorRow.vue';

export default {
  props: {
    coordinators: {
      required: true,
      type: Array
    }
  },
  components: {
    'coordinator-row': CoordinatorRow
  }
}
</script>