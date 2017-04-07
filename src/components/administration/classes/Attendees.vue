<template>
  <div class="attendee-container">
    <h5 class="title is-5">
      Attendees for Period {{ period }}
      <span v-if="scouts.length > 0">
        ({{ scouts.length }})
      </span>
      <div class="is-pulled-right"
           v-if="scouts.length > 0">
        <button class="titlebar-button button is-light">
          Edit Completions
        </button>
      </div>
    </h5>
    <div v-if="scouts.length < 1"
         class="notification">
      There are no scouts attending this period.
    </div>
    <table v-else
           class="table is-striped">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Troop</th>
          <th>Completed Requirements</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in scouts"
            :key="scout.id">
          <td>{{ scout.fullname }}</td>
          <td>{{ scout.troop }}</td>
          <td>{{ scout.completions | commaSeparated }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    period: {
      type: Number,
      required: true
    },
    scouts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>
  .attendee-container {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
</style>